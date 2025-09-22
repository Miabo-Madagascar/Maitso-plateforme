// SecuritySettings.tsx
import { AlertTriangle, LogOut, } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 bg-white min-h-screen">
      {/* Section Historique & Connexions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Connexions récentes */}
          <div className="space-y-4">
            <h3 className="font-medium text-green-600">Connexions récentes</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-sm">Paris, France • Chrome • 15/09/2025</span>
                <AlertTriangle className="text-yellow-500" size={16} />
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-sm">Antananarivo • Edge • 12/09/2025</span>
              </div>
            </div>
          </div>

          {/* Sessions actives */}
          <div className="space-y-4">
            <h3 className="font-medium text-amber-600">Appareils connectés</h3>
            <div className="space-y-3">
              {[
                "MacBook Pro • macOS • Paris",
                "iPhone 14 • iOS • Antananarivo",
              ].map((device, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <span className="text-sm">{device}</span>
                  <button className="text-red-500 hover:text-red-700">
                    <LogOut size={16} />
                  </button>
                </div>
              ))}
              <button className="mt-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors w-full text-sm">
                Déconnecter tous les appareils
              </button>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}