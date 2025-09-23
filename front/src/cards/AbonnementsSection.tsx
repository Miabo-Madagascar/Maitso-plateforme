import React, { useState } from "react";
import { RefreshCcw, Edit, XCircle } from "lucide-react";

interface BillingItem {
  service: string;
  invoice: string;
  status: string;
  amount: number;
  nextDue: string;
  method: string;
}

interface AbonnementsSectionProps {
  abonnementsData: BillingItem[];
  getStatusColor: (status: string) => string;
}

const AbonnementsSection: React.FC<AbonnementsSectionProps> = ({
  abonnementsData,
  getStatusColor,
}) => {
  const [expandedItem, setExpandedItem] = useState<{
    index: number;
    action: "renew" | "edit" | null;
  } | null>(null);

  return (


      <div className="grid md:grid-cols-2 gap-8">
        {abonnementsData
          .filter((b) => b.nextDue !== "-")
          .map((b, i) => {
            const isOpen = expandedItem?.index === i;
            const action = expandedItem?.action;

            return (
              <div
                key={i}
                className="p-6 bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-xl font-semibold leading-tight">{b.service}</h3>
                    <p className="text-sm text-gray-500 mt-1">{b.invoice}</p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusColor(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </div>

                {/* Détails */}
                <div className="mb-6 space-y-2">
                  <p className="text-3xl font-extrabold text-indigo-600">
                    {b.amount} €
                    <span className="text-base font-medium text-gray-500"> / mois</span>
                  </p>
                  <p className="text-sm text-gray-600">
                     Prochain paiement :{" "}
                    <span className="font-medium text-gray-800">{b.nextDue}</span>
                  </p>
                  <p className="text-sm text-gray-600">💳 Mode : {b.method}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setExpandedItem({ index: i, action: "renew" })}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-2xl shadow-md hover:bg-green-700 hover:scale-105 transition-transform duration-200 ease-in-out text-sm font-semibold"
                  >
                    <RefreshCcw size={18} /> Renouveler
                  </button>
                  <button
                    onClick={() => setExpandedItem({ index: i, action: "edit" })}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-200 ease-in-out text-sm font-semibold"
                  >
                    <Edit size={18} /> Modifier
                  </button>
                  <button
                    onClick={() => setExpandedItem(null)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-2xl shadow-md hover:bg-red-700 hover:scale-105 transition-transform duration-200 ease-in-out text-sm font-semibold"
                  >
                    <XCircle size={18} /> Annuler
                  </button>
                </div>

                {/* Contenu conditionnel */}
                {isOpen && (
                  <div className="mt-6 p-5 bg-indigo-50 rounded-2xl border border-indigo-200 text-indigo-900 text-sm leading-relaxed">
                    {action === "renew" && (
                      <p className="font-semibold text-green-700 flex items-center gap-2">
                        ✅ Cet abonnement sera <b>renouvelé automatiquement</b> à la date prévue.
                      </p>
                    )}
                    {action === "edit" && (
                      <form className="space-y-4">
                        <label className="block font-semibold text-indigo-700">
                          ✏️ Modifier l’abonnement
                          <input
                            type="text"
                            defaultValue={b.service}
                            className="mt-2 w-full p-3 border border-indigo-300 rounded-lg text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                          />
                        </label>
                        <button
                          type="submit"
                          className="inline-block px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                          Enregistrer
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
        );
};

export default AbonnementsSection;
