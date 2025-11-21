import React from 'react';
import { ModuleType } from '../types';
import { Droplets, Sparkles, ShieldCheck, Armchair, Wrench, Component } from 'lucide-react';

interface TopicSelectorProps {
  onSelect: (module: ModuleType) => void;
  disabled: boolean;
  currentModule: ModuleType | null;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelect, disabled, currentModule }) => {
  
  const modules = [
    { type: ModuleType.EXTERIOR_WASH, icon: Droplets, label: "Lavage & Déconta." },
    { type: ModuleType.POLISHING, icon: Sparkles, label: "Polissage" },
    { type: ModuleType.PROTECTION, icon: ShieldCheck, label: "Cire & Céramique" },
    { type: ModuleType.INTERIOR, icon: Armchair, label: "Intérieur & Cuir" },
    { type: ModuleType.ENGINE_BAY, icon: Component, label: "Moteur & Châssis" },
    { type: ModuleType.MAINTENANCE, icon: Wrench, label: "Maintenance Île" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
      {modules.map((mod) => {
        const Icon = mod.icon;
        const isSelected = currentModule === mod.type;
        return (
          <button
            key={mod.type}
            onClick={() => onSelect(mod.type)}
            disabled={disabled}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200
              ${isSelected 
                ? 'bg-cyan-50 border-cyan-500 text-cyan-800 shadow-md ring-2 ring-cyan-200' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-cyan-300 hover:bg-gray-50 shadow-sm'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <Icon className={`h-6 w-6 mb-2 ${isSelected ? 'text-cyan-600' : 'text-gray-500'}`} />
            <span className="text-xs font-medium text-center leading-tight">{mod.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TopicSelector;