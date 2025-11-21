import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TrainingSheet, ModuleType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const trainingSheetSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Titre accrocheur de la formation (Doit inclure 'CLEANING PRESTIGE' ou 'CP' si pertinent)" },
    targetAudience: { type: Type.STRING, description: "Public cible (ex: Propriétaires, Pros)" },
    totalDuration: { type: Type.STRING, description: "Durée estimée (ex: 4 heures)" },
    difficultyLevel: { type: Type.STRING, enum: ['Débutant', 'Intermédiaire', 'Expert'] },
    prerequisites: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Pré-requis nécessaires"
    },
    objectives: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Objectifs pédagogiques"
    },
    toolsRequired: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Liste du matériel physique (Marques haut de gamme suggérées)"
    },
    productsRequired: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Liste des produits chimiques/nettoyants"
    },
    steps: {
      type: Type.ARRAY, 
      items: {
        type: Type.OBJECT,
        properties: {
          stepTitle: { type: Type.STRING },
          description: { type: Type.STRING },
          durationMinutes: { type: Type.INTEGER }
        },
        required: ["stepTitle", "description", "durationMinutes"]
      }
    },
    guadeloupeSpecificTips: { 
      type: Type.STRING, 
      description: "Conseils cruciaux spécifiques au climat de la Guadeloupe (chaleur, UV, humidité, sel marin, sable)." 
    },
    safetyPrecautions: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }
    }
  },
  required: [
    "title", "targetAudience", "totalDuration", "difficultyLevel", 
    "objectives", "toolsRequired", "productsRequired", "steps", 
    "guadeloupeSpecificTips", "safetyPrecautions"
  ]
};

export const generateTrainingSheet = async (moduleType: ModuleType): Promise<TrainingSheet | null> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      Tu es le Responsable Formation de "CLEANING PRESTIGE", la référence absolue du Detailing Automobile en Guadeloupe.
      
      Ta mission : Créer une fiche de formation technique d'élite pour le module : "${moduleType}".
      
      CONTEXTE GUADELOUPE (CRUCIAL) :
      - Tu dois impérativement adapter les techniques au climat tropical (chaleur intense qui sèche les produits trop vite, humidité ambiante, sel marin corrosif, sable).
      - Le ton doit être expert, exigeant et valorisant pour la marque CLEANING PRESTIGE.
      
      STRUCTURE ATTENDUE :
      - Titre: Professionnel et percutant.
      - Contenu: Techniques avancées mais expliquées clairement.
      - Sécurité: Primordiale.
      
      Génère la réponse STRICTEMENT au format JSON selon le schéma fourni.
      Réponds entièrement en FRANÇAIS.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: trainingSheetSchema,
        temperature: 0.3, 
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text) as TrainingSheet;
      return { ...data, moduleType };
    }
    
    return null;
  } catch (error) {
    console.error("Error generating training sheet:", error);
    throw error;
  }
};