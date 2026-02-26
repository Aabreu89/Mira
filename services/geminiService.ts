import { OFFICIAL_SOURCES } from '../constants';
import { UNIFIED_CATEGORIES } from '../types';
import { supabase } from '../lib/supabase';

export const generateAssistantResponse = async (prompt: string, history: { role: string, parts: { text: string }[] }[] = [], communityContext?: string, language: string = 'PT') => {
  const languageNames: Record<string, string> = {
    'PT': 'Português',
    'EN': 'English',
    'ES': 'Español',
    'FR': 'Français'
  };

  try {
    const { data, error } = await supabase.functions.invoke('gemini-assistant', {
      body: {
        action: 'generateAssistantResponse',
        payload: {
          prompt, history, communityContext, language, OFFICIAL_SOURCES, UNIFIED_CATEGORIES, languageNames
        }
      }
    });

    if (error) throw new Error(error.message);
    return data;

  } catch (error) {
    console.error("Gemini Error:", error);
    const errorMsgs: Record<string, string> = {
      'PT': "Desculpe, meu sistema deu um tropeço! Como seu amigo MIRA, peço que pergunte de novo, estou aqui por você.",
      'EN': "Sorry, my system stumbled! As your friend MIRA, I ask you to ask again, I'm here for you.",
      'ES': "¡Lo siento, mi sistema tropezó! Como tu amigo MIRA, te pido que vuelvas a preguntar, estou aquí para ti.",
      'FR': "Désolé, mon système a trébuché ! En tant que votre ami MIRA, je vous demande de redemander, je suis là pour vous."
    };
    return { text: errorMsgs[language] || errorMsgs['PT'], category: "Comunidade & Solidariedade" };
  }
};

export const generateSpeech = async (text: string, language: string = 'PT') => {
  const voiceMap: Record<string, string> = {
    'PT': 'Fenrir',
    'EN': 'Puck',
    'ES': 'Charon',
    'FR': 'Kore'
  };

  try {
    const { data, error } = await supabase.functions.invoke('gemini-assistant', {
      body: {
        action: 'generateSpeech',
        payload: { text, language, voiceMap }
      }
    });

    if (error) throw new Error(error.message);
    return data?.audio;

  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

export const autoTranslateText = async (text: string, targetLanguage: string) => {
  if (!text) return text;

  const languageNames: Record<string, string> = {
    'PT': 'Português de Portugal',
    'EN': 'Inglês',
    'ES': 'Espanhol',
    'FR': 'Francês'
  };

  try {
    const { data, error } = await supabase.functions.invoke('gemini-assistant', {
      body: {
        action: 'autoTranslateText',
        payload: { text, targetLanguage, languageNames }
      }
    });

    if (error) throw new Error(error.message);
    return data?.text;
  } catch (error) {
    console.error("AutoTranslate Error:", error);
    return text;
  }
};

export const generateAdvancedReport = async (logs: any[]) => {
  const logsSummary = JSON.stringify(logs);

  try {
    const { data, error } = await supabase.functions.invoke('gemini-assistant', {
      body: {
        action: 'generateAdvancedReport',
        payload: { logsSummary }
      }
    });

    if (error) throw new Error(error.message);
    return data?.text;
  } catch (error) {
    return "Erro ao gerar relatório avançado.";
  }
};

export const searchOfficialDocumentInfo = async (documentName: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('gemini-assistant', {
      body: {
        action: 'searchOfficialDocumentInfo',
        payload: { documentName }
      }
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("AI Document Search Error:", error);
    return null;
  }
};
