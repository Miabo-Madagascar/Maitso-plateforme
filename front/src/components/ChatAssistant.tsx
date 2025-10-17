// ChatAssistant.tsx
import { useState } from 'react';
import { MessageCircle, X, ChevronDown, ChevronUp } from 'lucide-react';

const qaPairs = [
  // Questions sur l'entreprise et la démarche verte
  { question: "Quel est le projet de l'entreprise ?", answer: "Notre entreprise Maitso Madagascar se concentre sur des solutions durables et innovantes pour la gestion des ressources naturelles et la préservation de l'environnement." },
  { question: "Quelle est notre démarche verte ?", answer: "Nous adoptons une approche éco-responsable en utilisant des capteurs intelligents pour surveiller l'eau, l'air et l'énergie, et en favorisant des pratiques durables pour réduire l'empreinte écologique." },
  { question: "Comment nos solutions aident-elles la communauté ?", answer: "Nos technologies permettent aux communautés et entreprises de mieux gérer leurs ressources, d'anticiper les risques environnementaux et de participer activement à la préservation de la nature." },
  { question: "Quels sont nos principaux capteurs ?", answer: "Nous utilisons des capteurs DHT22, MQ-135, MQ-9, GY-BME280, 801S, KY-038 et YF-S401 pour surveiller la température, l'humidité, la qualité de l'air, les vibrations, le bruit et le débit d'eau." },
  { question: "Comment contacter l'entreprise ?", answer: "Vous pouvez nous contacter via notre site web, notre formulaire de contact, ou suivre nos actualités sur les réseaux sociaux pour toute information ou partenariat." },

  // Anciennes questions utiles pour le projet / dashboard
  { question: "Comment exporter les données ?", answer: "Cliquez sur l'icône PDF dans la section documentation pour exporter vos données du dashboard Maitso." },
  { question: "Comment suivre la consommation d'eau ?", answer: "Le capteur YF-S401 vous permet de suivre le débit d'eau en temps réel sur le dashboard." },
  { question: "Quels capteurs surveillent la qualité de l'air ?", answer: "Les capteurs MQ-135 et MQ-9 mesurent la qualité de l'air et la présence de gaz toxiques." },
  { question: "Comment optimiser l'énergie ?", answer: "Vous pouvez consulter les recommandations IA sur le dashboard pour réduire l'échantillonnage et améliorer l'efficacité énergétique." }
];

const ChatAssistant = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, from: 'user' | 'bot'}[]>([
    { text: "Bonjour 👋 ! Je suis votre assistant vert.", from: 'bot' }
  ]);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const handleQuestionClick = (qa: typeof qaPairs[0]) => {
    setMessages(prev => [...prev, { text: qa.question, from: 'user' }, { text: qa.answer, from: 'bot' }]);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Ouvrir l'assistant chat"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg text-white hover:brightness-110 transition"
      >
        {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Fenêtre chat */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 h-96 rounded-2xl border border-green-300 bg-gradient-to-br from-green-50 via-emerald-50 to-white/80 backdrop-blur-xl shadow-2xl flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between p-4 border-b border-green-200 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-t-2xl">
            <h4 className="text-green-700 font-bold text-base tracking-wide flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-500" /> Assistant Vert
            </h4>
            <button
              onClick={() => setChatOpen(false)}
              aria-label="Fermer le chat"
              className="text-green-500 hover:text-green-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-gray-800 space-y-2 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.from === 'bot' ? 'bg-white/80 backdrop-blur-md text-gray-800 ml-0 border-l-4 border-green-500' : 'bg-green-100 text-green-900 ml-auto'
                } rounded-lg p-3 text-sm shadow w-fit animate-fadeIn`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Bouton voir toutes les questions */}
          <div className="p-2 border-t border-green-200 bg-white/60 rounded-b-2xl flex flex-col">
            <button
              onClick={() => setShowAllQuestions(!showAllQuestions)}
              className="flex items-center justify-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs hover:bg-green-600 transition self-center"
            >
              {showAllQuestions ? "Masquer les questions" : "Voir toutes les questions"}
              {showAllQuestions ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Liste complète des questions */}
            {showAllQuestions && (
              <div className="mt-2 max-h-40 overflow-y-auto flex flex-col gap-1 custom-scrollbar">
                {qaPairs.map((qa, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuestionClick(qa)}
                    className="text-left px-2 py-1 rounded-full bg-green-100 text-green-900 text-xs hover:bg-green-200 transition whitespace-nowrap"
                  >
                    {qa.question}
                  </button>
                ))}
              </div>
            )}
          </div>

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
              background: rgba(34,197,94,0.5);
              border-radius: 10px;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
