import React, { useState } from 'react';
import Header from './components/Header';
import TopicSelector from './components/TopicSelector';
import SheetDisplay from './components/SheetDisplay';
import { generateTrainingSheet } from './services/geminiService';
import { TrainingSheet, ModuleType } from './types';
import { Loader2, AlertCircle, Printer, Save } from 'lucide-react';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleType | null>(null);
  const [sheetData, setSheetData] = useState<TrainingSheet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectTopic = async (module: ModuleType) => {
    setCurrentModule(module);
    setLoading(true);
    setError(null);
    setSheetData(null);

    try {
      const data = await generateTrainingSheet(module);
      setSheetData(data);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez vérifier votre clé API ou votre connexion.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-[#f3f4f6]">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="text-center mb-10 print:hidden">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Centre de Formation Technique
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Générez instantanément vos supports de formation conformes aux standards d'excellence de <strong>CLEANING PRESTIGE</strong>.
          </p>
        </div>

        <div className="print:hidden">
            <TopicSelector 
            onSelect={handleSelectTopic} 
            disabled={loading} 
            currentModule={currentModule} 
            />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-cyan-600 animate-spin mb-4" />
            <p className="text-lg text-slate-600 font-medium animate-pulse">
              Rédaction du module {currentModule} en cours...
            </p>
            <p className="text-sm text-slate-400 mt-2">Adaptation aux standards CLEANING PRESTIGE...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Result State */}
        {!loading && sheetData && (
          <div className="animate-fade-in-up">
            <div className="flex justify-end gap-3 mb-4 print:hidden">
                <button 
                    onClick={() => alert("Fonctionnalité de sauvegarde bientôt disponible !")}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
                >
                    <Save className="h-4 w-4" />
                    Sauvegarder
                </button>
                <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm font-medium shadow-md"
                >
                    <Printer className="h-4 w-4" />
                    Imprimer / PDF
                </button>
            </div>
            <SheetDisplay data={sheetData} />
          </div>
        )}

        {/* Empty State */}
        {!loading && !sheetData && !error && (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200 print:hidden shadow-sm">
            <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <p className="text-gray-500 text-lg">Sélectionnez un module ci-dessus pour générer une fiche CLEANING PRESTIGE.</p>
          </div>
        )}

      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="uppercase text-xs tracking-widest">&copy; {new Date().getFullYear()} CLEANING PRESTIGE. Excellence & Passion Automobile Guadeloupe.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;