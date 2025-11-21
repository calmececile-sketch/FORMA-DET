import React from 'react';
import { TrainingSheet } from '../types';
import { Clock, CheckCircle2, Hammer, Sun, Droplet, ShieldAlert } from 'lucide-react';

interface SheetDisplayProps {
  data: TrainingSheet;
}

const SheetDisplay: React.FC<SheetDisplayProps> = ({ data }) => {
  
  // Difficulty color mapping
  const diffColor: Record<string, string> = {
    'Débutant': 'bg-green-100 text-green-800 border-green-200',
    'Intermédiaire': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Expert': 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 print:shadow-none print:border-none">
      {/* Header Banner */}
      <div className="relative h-48 bg-slate-900 overflow-hidden print:h-32 print:bg-slate-100">
        <img 
          src={`https://picsum.photos/800/300?random=${Math.random()}&grayscale&blur=2`} 
          alt="Detailing Background" 
          className="w-full h-full object-cover opacity-40 print:hidden"
        />
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white tracking-widest print:text-slate-900 print:border-slate-300 print:bg-transparent">
            CLEANING PRESTIGE ACADEMY
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-slate-900/90 to-transparent print:bg-none print:text-black print:p-0 print:justify-center">
          <div className="flex flex-wrap gap-2 mb-2 print:hidden">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${diffColor[data.difficultyLevel] || 'bg-gray-100'}`}>
              {data.difficultyLevel}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-200 border border-slate-600 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {data.totalDuration}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white print:text-slate-900 print:text-2xl">{data.title}</h2>
          <p className="text-slate-300 text-sm mt-1 print:text-slate-600">Module : {data.moduleType} | Public : {data.targetAudience}</p>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8 print:p-0 print:mt-6">
        
        {/* Objectives */}
        <section>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 border-b pb-2 print:text-sm">
            <CheckCircle2 className="text-cyan-600 h-5 w-5" /> Objectifs de la formation
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 print:gap-1">
            {data.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm bg-slate-50 p-3 rounded-lg print:bg-transparent print:p-0">
                <span className="text-cyan-500 font-bold print:text-slate-900">•</span> {obj}
              </li>
            ))}
          </ul>
        </section>

        {/* Tools & Products */}
        <div className="grid md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
          <section className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 print:bg-transparent print:border-gray-200 print:p-3">
            <h3 className="text-md font-bold text-blue-900 flex items-center gap-2 mb-3 print:text-slate-900">
              <Hammer className="h-4 w-4" /> Matériel Requis
            </h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
              {data.toolsRequired.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="bg-purple-50/50 p-5 rounded-xl border border-purple-100 print:bg-transparent print:border-gray-200 print:p-3">
            <h3 className="text-md font-bold text-purple-900 flex items-center gap-2 mb-3 print:text-slate-900">
              <Droplet className="h-4 w-4" /> Produits Nécessaires
            </h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
              {data.productsRequired.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>
        </div>

        {/* Guadeloupe Specific Warning Block */}
        <section className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl shadow-sm print:border-gray-300 print:bg-gray-50">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 p-2 rounded-full shrink-0 print:bg-transparent print:p-0">
              <Sun className="h-6 w-6 text-amber-600 print:text-slate-800" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 text-lg mb-1 print:text-slate-900">Spécificités Guadeloupe 🇬🇵</h3>
              <p className="text-amber-800 text-sm leading-relaxed print:text-slate-700">
                {data.guadeloupeSpecificTips}
              </p>
            </div>
          </div>
        </section>

        {/* Steps Timeline */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-6 print:mb-4">Déroulé Pédagogique</h3>
          <div className="space-y-6 print:space-y-4">
            {data.steps.map((step, idx) => (
              <div key={idx} className="relative flex gap-4 group break-inside-avoid">
                {/* Line connector - hide on print to save ink/cleaner look */}
                <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-slate-200 group-hover:bg-cyan-200 transition-colors print:hidden"></div>
                
                <div className="shrink-0 w-10 h-10 rounded-full bg-white border-2 border-cyan-500 text-cyan-700 font-bold flex items-center justify-center z-10 shadow-sm print:w-8 print:h-8 print:text-sm print:border-slate-400 print:text-slate-800">
                  {idx + 1}
                </div>
                
                <div className="flex-grow pb-2">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-slate-800 text-lg print:text-base">{step.stepTitle}</h4>
                    <span className="text-xs text-slate-400 font-mono whitespace-nowrap print:text-slate-600">{step.durationMinutes} min</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section className="bg-red-50 rounded-xl p-5 border border-red-100 print:bg-transparent print:border-gray-300">
           <h3 className="text-md font-bold text-red-800 flex items-center gap-2 mb-3 print:text-slate-900">
              <ShieldAlert className="h-5 w-5" /> Sécurité & EPI
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.safetyPrecautions.map((safe, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-red-200 text-red-700 rounded-full text-xs font-medium shadow-sm print:border-slate-300 print:text-slate-700 print:shadow-none">
                  {safe}
                </span>
              ))}
            </div>
        </section>
        
        <div className="text-center pt-6 border-t border-gray-100 print:mt-8">
            <p className="text-xs text-gray-400 italic print:text-slate-500">
                Document interne CLEANING PRESTIGE. Reproduction interdite.
            </p>
        </div>
      </div>
    </div>
  );
};

export default SheetDisplay;