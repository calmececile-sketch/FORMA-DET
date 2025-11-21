export interface TrainingStep {
  stepTitle: string;
  description: string;
  durationMinutes: number;
}

export interface TrainingSheet {
  title: string;
  moduleType: ModuleType;
  targetAudience: string;
  totalDuration: string;
  difficultyLevel: 'Débutant' | 'Intermédiaire' | 'Expert';
  prerequisites: string[];
  objectives: string[];
  toolsRequired: string[];
  productsRequired: string[];
  steps: TrainingStep[];
  guadeloupeSpecificTips: string; // Crucial for the prompt
  safetyPrecautions: string[];
}

export enum ModuleType {
  EXTERIOR_WASH = 'Lavage Extérieur & Décontamination',
  POLISHING = 'Polissage & Correction',
  PROTECTION = 'Protection (Cire/Céramique)',
  INTERIOR = 'Nettoyage Intérieur & Textiles',
  ENGINE_BAY = 'Baie Moteur & Châssis',
  GLASS = 'Traitement des Vitrages',
  MAINTENANCE = 'Maintenance Tropicale'
}