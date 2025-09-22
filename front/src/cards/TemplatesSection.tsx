import React, { useState } from "react";
import { Plus, Star, TrendingUp, X } from "lucide-react";

interface Sensor {
  name: string;
  category: string;
  measurements: number;
  rating: number;
  description: string;
}

const MOCK_SENSORS: Sensor[] = [
  {
    name: "Capteur de Température",
    category: "Environnement",
    measurements: 12450,
    rating: 4.7,
    description: "Mesure la température ambiante avec haute précision.",
  },
  {
    name: "Capteur d'Humidité",
    category: "Environnement",
    measurements: 9870,
    rating: 4.5,
    description: "Surveille le taux d'humidité dans l'air en temps réel.",
  },
  {
    name: "Capteur de Pression",
    category: "Physique",
    measurements: 15320,
    rating: 4.6,
    description: "Détecte la pression atmosphérique pour diverses applications.",
  },
  {
    name: "Capteur de Luminosité",
    category: "Environnement",
    measurements: 11000,
    rating: 4.4,
    description: "Mesure l'intensité lumineuse ambiante.",
  },
];

const SensorsDashboard: React.FC = () => {
  const [modalContent, setModalContent] = useState<{
    type: "add" | "data" | "details" | null;
    sensor?: Sensor;
  }>({ type: null });

  const closeModal = () => setModalContent({ type: null });

  return (
    <div className="mt-6 p-8 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg text-gray-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">📡 Suivi des Capteurs</h2>
        <button
          onClick={() => setModalContent({ type: "add" })}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-md hover:brightness-110 transition focus:outline-none"
        >
          <Plus className="w-5 h-5" />
          Ajouter capteur
        </button>
      </div>

      {/* Liste capteurs */}
      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_SENSORS.map((sensor, i) => (
          <div
            key={i}
            className="border border-white/40 p-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="font-semibold text-xl">{sensor.name}</h3>
                <span className="inline-block mt-1 px-3 py-1 bg-white/40 backdrop-blur-sm text-gray-700 rounded-full text-xs font-semibold">
                  {sensor.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-base font-medium">{sensor.rating.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-6">{sensor.description}</p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {sensor.measurements.toLocaleString()} mesures
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalContent({ type: "data", sensor })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition focus:outline-none text-sm"
                >
                  Voir données
                </button>
                <button
                  onClick={() => setModalContent({ type: "details", sensor })}
                  className="px-4 py-2 bg-gray-600 text-white rounded-2xl shadow-md hover:bg-gray-700 transition focus:outline-none text-sm"
                >
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modale */}
      {modalContent.type && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md relative">
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-600 hover:text-gray-900 transition"
              aria-label="Fermer la modale"
            >
              <X size={24} />
            </button>

            {/* Contenu dynamique */}
            {modalContent.type === "add" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">➕ Ajouter un capteur</h3>
                <input
                  type="text"
                  placeholder="Nom du capteur"
                  className="w-full p-3 border border-white/50 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70 backdrop-blur-sm"
                />
                <input
                  type="text"
                  placeholder="Catégorie"
                  className="w-full p-3 border border-white/50 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70 backdrop-blur-sm"
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-3 border border-white/50 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70 backdrop-blur-sm resize-none"
                  rows={4}
                />
                <button className="w-full py-3 bg-gradient-to-br from-green-600 to-green-700 text-white font-semibold rounded-3xl shadow-lg hover:brightness-110 transition">
                  Enregistrer
                </button>
              </div>
            )}

            {modalContent.type === "data" && modalContent.sensor && (
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  📊 Données - {modalContent.sensor.name}
                </h3>
                <p className="text-gray-700 mb-6">
                  Total mesures :{" "}
                  <b>{modalContent.sensor.measurements.toLocaleString()}</b>
                </p>
                <div className="p-6 bg-gray-100 rounded-2xl text-center text-gray-700">
                  Exemple graphique ou données temps réel (à intégrer avec Recharts).
                </div>
              </div>
            )}

            {modalContent.type === "details" && modalContent.sensor && (
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  ℹ️ Détails - {modalContent.sensor.name}
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>Catégorie :</strong> {modalContent.sensor.category}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Note :</strong> {modalContent.sensor.rating.toFixed(1)} ⭐
                </p>
                <p className="text-gray-700">{modalContent.sensor.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorsDashboard;
