import React from 'react';
import { Car, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-cyan-500/30 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg backdrop-blur-sm">
              <Car className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-wider uppercase">
                CLEANING <span className="text-cyan-400">PRESTIGE</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-cyan-600" /> Académie Guadeloupe
              </p>
            </div>
          </div>
          <div className="hidden md:block text-xs text-gray-500 font-mono border border-gray-700 rounded px-2 py-1">
            V 2.5 - GENERATOR
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;