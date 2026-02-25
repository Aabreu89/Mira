
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, AlertCircle, Bot, Volume2, VolumeX, Play, RotateCcw, Loader2, Square } from 'lucide-react';
import { generateAssistantResponse, generateSpeech } from '../services/geminiService';
import { Message } from '../types';
import { analytics } from '../services/analyticsService';

// Audio Helpers for raw PCM data from Gemini TTS
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface AssistantViewProps {
  language: string;
}

const AssistantView: React.FC<AssistantViewProps> = ({ language }) => {
  const [messages, setMessages] = useState<(Message & { category?: string, audioBase64?: string })[]>([]);

  useEffect(() => {
    const welcomeMsgs: Record<string, string> = {
      'PT': 'Olá! Sou o MIRA, seu amigo e assistente. Estou aqui para caminhar ao seu lado em Portugal em 2026. Como posso tornar sua jornada mais leve hoje?',
      'EN': 'Hello! I am MIRA, your friend and assistant. I am here to walk by your side in Portugal in 2026. How can I make your journey lighter today?',
      'ES': '¡Hola! Soy MIRA, tu amigo y asistente. Estoy aquí para caminar a tu lado en Portugal en 2026. ¿Cómo posso fazer sua jornada mais leve hoje?',
      'FR': 'Bonjour ! Je suis MIRA, votre ami et assistant. Je suis ici pour marcher à vos côtés au Portugal en 2026. Comment puis-je rendre votre voyage plus léger aujourd\'hui ?'
    };

    setMessages([
      {
        id: '1',
        role: 'assistant',
        text: welcomeMsgs[language] || welcomeMsgs['PT'],
        timestamp: new Date(),
        category: 'Comunidade & Solidariedade'
      }
    ]);
  }, [language]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      const langMap: Record<string, string> = {
        'PT': 'pt-PT',
        'EN': 'en-US',
        'ES': 'es-ES',
        'FR': 'fr-FR'
      };
      recognitionRef.current.lang = langMap[language] || 'pt-PT';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        alert("O seu navegador não suporta reconhecimento de voz.");
        return;
      }
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start recognition", err);
      }
    }
  };

  const stopAudio = () => {
    if (activeSourceRef.current) {
      try {
        activeSourceRef.current.stop();
      } catch (e) {
        // Source might already be stopped
      }
      activeSourceRef.current = null;
    }
    setIsPlaying(null);
  };

  const playAudio = async (base64: string, messageId: string) => {
    try {
      stopAudio();
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      setIsPlaying(messageId);
      const audioData = decodeBase64(base64);
      const buffer = await decodeAudioData(audioData, audioContextRef.current, 24000, 1);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => {
        setIsPlaying(null);
        activeSourceRef.current = null;
      };
      activeSourceRef.current = source;
      source.start(0);
    } catch (err) {
      console.error("Playback error:", err);
      setIsPlaying(null);
      activeSourceRef.current = null;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    const history = messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
    const result = await generateAssistantResponse(currentInput, history, undefined, language);
    analytics.track('ai_query', userMsg.id, result.category, { query: currentInput });
    let audioData = null;
    if (voiceEnabled) audioData = await generateSpeech(result.text, language);
    const botMsg = { id: (Date.now() + 1).toString(), role: 'assistant' as const, text: result.text, category: result.category, audioBase64: audioData || undefined, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
    if (audioData && voiceEnabled) playAudio(audioData, botMsg.id);
  };

  const handleAudioAction = async (msg: (Message & { audioBase64?: string })) => {
    if (isPlaying === msg.id) { stopAudio(); return; }
    if (msg.audioBase64) { playAudio(msg.audioBase64, msg.id); } 
    else {
      setIsLoading(true);
      const audioData = await generateSpeech(msg.text, language);
      setIsLoading(false);
      if (audioData) {
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, audioBase64: audioData } : m));
        playAudio(audioData, msg.id);
      }
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-white shadow-sm md:rounded-2xl overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Brand Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-indigo-900 p-6 text-white flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="bg-mira-orange/20 p-3 rounded-2xl backdrop-blur-md relative border border-white/10 group animate-mira-blink">
            <Bot size={32} className="text-mira-orange group-hover:scale-110 transition-transform" />
            <div className="absolute top-4 left-4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          </div>
          <div>
            <h2 className="font-black text-lg uppercase tracking-tighter">
              {language === 'PT' ? 'O MIRA ASSISTANT' : 
               language === 'EN' ? 'THE MIRA ASSISTANT' :
               language === 'ES' ? 'EL MIRA ASSISTANT' :
               'L\'ASSISTANT MIRA'}
            </h2>
            <p className="text-[10px] font-bold text-mira-orange uppercase tracking-widest opacity-80">
              {language === 'PT' ? 'Especialista em Direitos & Integração 2026' : 
               language === 'EN' ? 'Rights & Integration Specialist 2026' :
               language === 'ES' ? 'Especialista en Derechos e Integración 2026' :
               'Spécialiste des Droits et de l\'Intégration 2026'}
            </p>
          </div>
        </div>
        <button onClick={() => { if (voiceEnabled) stopAudio(); setVoiceEnabled(!voiceEnabled); }} className={`p-3 rounded-2xl transition-all ${voiceEnabled ? 'bg-mira-orange/20 text-mira-orange' : 'bg-red-500/20 text-red-100'}`}>
          {voiceEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-[24px] px-5 py-4 shadow-sm border relative ${
              msg.role === 'user' ? 'bg-slate-900 text-white rounded-br-none border-slate-800' : 'bg-white text-slate-800 rounded-bl-none border-slate-100'
            }`}>
              {msg.role === 'assistant' && msg.category && (
                <span className="text-[8px] font-black uppercase tracking-widest text-mira-orange block mb-1.5 opacity-60">{msg.category}</span>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                {msg.role === 'assistant' && (
                  <button onClick={() => handleAudioAction(msg)} className={`ml-2 p-3 rounded-2xl transition-all shadow-sm ${isPlaying === msg.id ? 'text-white bg-mira-orange scale-110' : 'text-mira-orange bg-mira-orange-pastel hover:scale-105 active:scale-95'}`}>
                    {isPlaying === msg.id ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-[24px] px-5 py-4 rounded-bl-none animate-pulse flex gap-2 border border-slate-100 shadow-sm">
              <div className="w-2 h-2 bg-mira-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-mira-orange rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-mira-yellow rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t bg-white">
        <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-[2rem] px-6 py-4 focus-within:ring-4 focus-within:ring-mira-orange/10 transition-all shadow-inner">
          <input 
            type="text" 
            placeholder={
              language === 'PT' ? 'Escreva a sua dúvida para o MIRA...' : 
              language === 'EN' ? 'Write your question for MIRA...' :
              language === 'ES' ? 'Escribe tu duda para MIRA...' :
              'Écrivez votre question para MIRA...'
            } 
            className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
          />
          <button 
            onClick={toggleListening}
            className={`p-2 transition-all rounded-full ${isListening ? 'text-white bg-red-500 animate-pulse' : 'text-slate-400 hover:text-mira-orange'}`}
            title={
              isListening ? 
              (language === 'PT' ? "Parar de ouvir" : language === 'EN' ? "Stop listening" : language === 'ES' ? "Dejar de escuchar" : "Arrêter d'écouter") : 
              (language === 'PT' ? "Falar com o MIRA" : language === 'EN' ? "Talk to MIRA" : language === 'ES' ? "Hablar con MIRA" : "Parler à MIRA")
            }
          >
            <Mic size={22} />
          </button>
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 bg-mira-orange text-white rounded-full disabled:opacity-30 disabled:bg-slate-300 transition-all shadow-lg active:scale-95"><Send size={20} /></button>
        </div>
        <div className="mt-4 flex items-center gap-2 justify-center opacity-40">
          <AlertCircle size={12} />
          <span className="text-[9px] font-black uppercase tracking-widest">
            {language === 'PT' ? 'O MIRA baseia-se em fontes oficiais de 2026.' : 
             language === 'EN' ? 'MIRA is based on official 2026 sources.' :
             language === 'ES' ? 'MIRA se basa en fuentes oficiales de 2026.' :
             'MIRA est basé sur des sources officielles de 2026.'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssistantView;
