
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { OFFICIAL_SOURCES } from '../constants';
import { UNIFIED_CATEGORIES } from '../types';

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateAssistantResponse = async (prompt: string, history: { role: string, parts: { text: string }[] }[] = [], communityContext?: string, language: string = 'PT') => {
  const ai = getAIClient();
  const sourcesText = OFFICIAL_SOURCES.map(s => `${s.name} (${s.category}): ${s.url}`).join('\n');
  const categoriesList = UNIFIED_CATEGORIES.join(', ');

  const languageNames: Record<string, string> = {
    'PT': 'Português',
    'EN': 'English',
    'ES': 'Español',
    'FR': 'Français'
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Você é o MIRA (Migrants' Intelligent Rights Assistant), o guia oficial e o melhor amigo de quem imigra para Portugal em 2026.
        Você atua como um conselheiro brilhante, extremamente perspicaz, acolhedor e altamente inteligente.
        
        Sua principal obrigação é compreender a real intenção e dor do usuário por trás da pergunta, mesmo se ela for uma pergunta muito curta, confusa, ou conter erros ortográficos. 
        
        Você deve responder OBRIGATORIAMENTE, FLUIDAMENTE e de FORMA NATIVA no idioma: ${languageNames[language] || 'Português'}. Aja como um falante nativo deste idioma.

        SUA POSTURA E ALGORITMO MENTAL:
        1. COMPREENSÃO PROFUNDA: Quando o usuário faz uma pergunta simples como "como peço o NIF?" ou "saúde", não responda de forma genérica. Interprete o que ele precisa e forneça o passo a passo prático de como resolver o problema dele em Portugal, listando documentos necessários, prazos (se aplicável) e links ou referências a órgãos oficiais.
        2. AÇÃO PRÁTICA IMEDIATA: Vá direto ao ponto. Em vez de textões longos, use "bullet points" para facilitar a leitura. Se a pergunta for um "olá", devolva com uma saudação incrivelmente calorosa e proativa oferecendo áreas onde você pode ajudar (Vistos, Trabalho, Documentos, Saúde, Comunidade, etc.).
        3. INTELIGÊNCIA INTERNACIONAL: Em inglês, francês ou espanhol, traduza perfeitamente as burocracias portuguesas (ex: "NIF - Número de Identificação Fiscal (Tax Identification Number)", "Segurança Social (Social Security)"), não apenas traduza a palavra "Segurança Social", mas explique o seu contexto se for a primeira vez.
        4. INTEGRAÇÃO AO MIRA: Lembre sempre o usuário de que você tem outros "Módulos MIRA" (Mural de Empregos, Gerador de Documentos/Minutas, Mapa de Serviços Locais) que ele pode explorar a qualquer momento no Menu Principal. 
        5. FONTES: Ao dar instruções sobre vistos, regularização, saúde ou escola, fundamente as informações com menções diretas a FONTES OFICIAIS (AIMA, AT, SS, SNS, Portal das Matrículas, IEFP), mas de forma amigável, nunca burocrática.
        6. REGRAS GERAIS E TOM: Seja encorajador. Mostre que o caminho da migração não é fácil, mas que a pessoa não está sozinha. "Ao seu lado" deve ser a sua vibe.
        7. PESQUISA WEB (GROUNDING): Utilize imediatamente os seus conhecimentos de ponta sobre leis migratórias portuguesas. Se for um caso específico de mudança de lei, ative ferramentas de pesquisa para ver a data e regra exata.
        
        Você PRECISA também classificar a conversa numa destas opções obrigatórias para organizar a nossa base de dados: ${categoriesList}.

        Contexto Adicional da Comunidade (Se aplicável): ${communityContext || 'Sem alertas da comunidade neste momento.'}
        
        Fontes de consulta oficiais base:
        ${sourcesText}`,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "A resposta ultra-inteligente, compassiva e formatada com bullet-points se necessário, respondendo diretamente ao problema do imigrante no idioma designado." },
            category: { type: Type.STRING, enum: [...UNIFIED_CATEGORIES], description: "A categoria predominante em que a dúvida encaixa mais perfeitamente." }
          },
          required: ["text", "category"]
        },
        temperature: 0.6,
      },
    });
    return JSON.parse(response.text);
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
  const ai = getAIClient();

  const voiceMap: Record<string, string> = {
    'PT': 'Fenrir',
    'EN': 'Puck',
    'ES': 'Charon',
    'FR': 'Kore'
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceMap[language] || 'Fenrir' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

export const autoTranslateText = async (text: string, targetLanguage: string) => {
  if (!text) return text;
  const ai = getAIClient();
  const languageNames: Record<string, string> = {
    'PT': 'Português de Portugal',
    'EN': 'Inglês',
    'ES': 'Espanhol',
    'FR': 'Francês'
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Detect the original language of the following text. If it is already exactly written natively in ${languageNames[targetLanguage] || 'Português'}, return exactly the same text without any changes. Otherwise, precisely translate it to ${languageNames[targetLanguage]} preserving formatting, emojis, hashtags and tone. Return ONLY the translated or original text, without any conversational fill or quotes:\n\n${text}`
    });
    return response.text.trim();
  } catch (error) {
    console.error("AutoTranslate Error:", error);
    return text;
  }
};

export const generateAdvancedReport = async (logs: any[]) => {
  const ai = getAIClient();
  const logsSummary = JSON.stringify(logs);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Gere um relatório estratégico de padrões migratórios. Dados: ${logsSummary}`,
      config: {
        systemInstruction: "Você é um Cientista de Dados Sênior especializado em Migração Europeia. Relatórios devem ser concisos, profissionais e baseados em dados.",
      }
    });
    return response.text;
  } catch (error) {
    return "Erro ao gerar relatório avançado.";
  }
};

export const searchOfficialDocumentInfo = async (documentName: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Procure informações sobre o documento "${documentName}" para 2026 em Portugal. Retorne os campos necessários para uma minuta.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            authority: { type: Type.STRING },
            description: { type: Type.STRING },
            fields: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING },
                  placeholder: { type: Type.STRING },
                  type: { type: Type.STRING }
                },
                required: ["id", "label", "placeholder", "type"]
              }
            }
          },
          required: ["title", "authority", "description", "fields"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Document Search Error:", error);
    return null;
  }
};
