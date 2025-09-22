import { MessageCircle, X } from "lucide-react";

interface GlassChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlassChatAssistant({ isOpen, onClose }: GlassChatAssistantProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 z-40 w-80 h-96 rounded-2xl border border-indigo-300 bg-gradient-to-br from-indigo-50 via-purple-50 to-white/80 backdrop-blur-xl shadow-2xl flex flex-col animate-fadeIn">
      {/* Header coloré */}
      <div className="flex items-center justify-between p-4 border-b border-indigo-200 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-t-2xl">
        <h4 className="text-indigo-700 font-bold text-base tracking-wide flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-indigo-500" /> Assistant Chat
        </h4>
        <button
          onClick={onClose}
          aria-label="Fermer le chat"
          className="text-indigo-500 hover:text-indigo-700 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Zone de messages stylée */}
      <div className="flex-1 p-4 overflow-y-auto text-gray-800 space-y-2 custom-scrollbar">
        {/* Assistant message */}
        <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-sm shadow w-fit animate-fadeIn">
          Bonjour 👋 ! Je suis votre assistant. Comment puis-je aider ?
        </div>
        {/* User message */}
        <div className="bg-indigo-100 text-indigo-900 rounded-lg p-3 text-sm shadow w-fit ml-auto animate-fadeIn">
          Je veux voir les alertes récentes.
        </div>
        {/* Assistant message */}
        <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-sm shadow w-fit animate-fadeIn">
          Voici les 6 alertes les plus récentes affichées à gauche du dashboard.
        </div>
        {/* User message */}
        <div className="bg-indigo-100 text-indigo-900 rounded-lg p-3 text-sm shadow w-fit ml-auto animate-fadeIn">
          Merci ! Et comment exporter les données ?
        </div>
        {/* Assistant message */}
        <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-sm shadow w-fit animate-fadeIn">
          Cliquez sur l'icône PDF dans la section documentation pour exporter vos données.
        </div>
      </div>
      
      {/* Zone de saisie avec bouton d'envoi */}
      <div className="p-4 border-t border-indigo-200 bg-white/60 rounded-b-2xl flex items-center gap-2">
        <input
          type="text"
          placeholder="Tapez votre message..."
          className="flex-1 rounded-lg border border-indigo-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 shadow"
        />
        <button
          aria-label="Envoyer"
          className="p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md hover:scale-105 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20l16-8-16-8v6l12 2-12 2v6z" />
          </svg>
        </button>
      </div>
      
      {/* Animation & scrollbar styles */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

export function ChatToggleButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Ouvrir l'assistant chat"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg text-white hover:brightness-110 transition"
    >
      {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
    </button>
  );
}