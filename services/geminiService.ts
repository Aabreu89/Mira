
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { OFFICIAL_SOURCES } from '../constants';
import { UNIFIED_CATEGORIES } from '../types';

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateAssistantResponse = async (prompt: string, history: {role: string, parts: {text: string}[]}[] = [], communityContext?: string, language: string = 'PT') => {
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
        systemInstruction: `Você é o MIRA (Migrants' Intelligent Rights Assistant). 
        Você é o melhor amigo, ajudante e conselheiro de quem imigra para Portugal.
        Seu tom deve ser amigável, empático, acolhedor e extremamente prático.
        Você deve responder obrigatoriamente no idioma: ${languageNames[language] || 'Português'}.

        MISSÃO:
        Ser indispensável no dia a dia do imigrante, ajudando em integração, apoio, acolhimento e burocracia.
        Aprenda com o comportamento dos usuários e busque sempre as informações mais recentes.

        DIRETRIZES DE RESPOSTA E BUSCA DE INFORMAÇÃO:
        1. BUSCA EXTERNA (GROUNDING): Utilize a ferramenta de busca para encontrar notícias de hoje e atualizações legais em Portugal (fontes como Público, Expresso, Diário da República).
        2. FONTES OFICIAIS: Sempre priorize e cite fontes oficiais (AIMA, Segurança Social, SNS, IEFP).
        3. DADOS DA COMUNIDADE: Utilize relatos da comunidade. Ao dar uma informação vinda de usuários, exiba a "Probabilidade de Veracidade".
           - Use a lógica: Probabilidade = (VotosÚteis * ReputaçãoMédia) / (VotosTotais).
           - Expresse isso como: "Baseado em relatos da comunidade (Veracidade Estimada: 85%)".
        4. RECOMENDAÇÕES INTERNAS: Sempre sugira módulos do MIRA (Vagas, Documentos, Mapa, Estudos).
        5. TOM: Caloroso, como um conselheiro que realmente se importa.
        6. CATEGORIZAÇÃO: Classifique obrigatoriamente em: ${categoriesList}.

        Contexto Adicional da Comunidade: ${communityContext || 'Nenhum relato recente sobre este tema específico.'}

        Fontes oficiais de referência:
        ${sourcesText}`,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "A resposta amigável e assertiva no idioma solicitado." },
            category: { type: Type.STRING, enum: [...UNIFIED_CATEGORIES], description: "A categoria predominante do assunto." }
          },
          required: ["text", "category"]
        },
        temperature: 0.7,
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
