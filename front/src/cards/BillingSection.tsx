import React, { useState } from "react";
import { Plus, Download, Eye, X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MOCK_BILLING } from "../data/mockData";

// Fonction utilitaire pour obtenir la couleur du statut en style glassmorphism
const getStatusColor = (status: string) => {
  switch (status) {
    case "Payé":
      return "bg-green-100/70 text-green-900";
    case "En attente":
      return "bg-yellow-100/70 text-yellow-900";
    case "En retard":
      return "bg-red-100/70 text-red-900";
    default:
      return "bg-gray-100/70 text-gray-800";
  }
};

interface Billing {
  invoice: string;
  amount: number;
  date: string;
  status: string;
  service: string;
  nextDue: string;
  method: string;
}

const BillingSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Billing | null>(null);

  const totalPaid = MOCK_BILLING.filter((b) => b.status === "Payé").reduce(
    (sum, b) => sum + b.amount,
    0
  );

  const totalPending = MOCK_BILLING.filter(
    (b) => b.status === "En attente"
  ).reduce((sum, b) => sum + b.amount, 0);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Factures et Paiements", 14, 15);
    autoTable(doc, {
      head: [["Facture", "Service", "Montant", "Date", "Méthode", "Statut"]],
      body: MOCK_BILLING.map((b) => [
        b.invoice,
        b.service,
        `${b.amount} €`,
        b.date,
        b.method,
        b.status,
      ]),
    });
    doc.save("factures.pdf");
  };

  return (
    <div className="mt-6 p-8 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg text-gray-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">Factures et Paiements</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-2 items-center px-5 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-md hover:brightness-110 transition focus:outline-none"
          >
            <Plus className="w-5 h-5" />
            Nouvelle facture
          </button>
          <button
            onClick={exportPDF}
            className="flex gap-2 items-center px-5 py-3 bg-gray-500/70 text-white rounded-2xl shadow-md hover:bg-gray-600/80 transition focus:outline-none"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-xl border border-white/20 shadow-inner">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-white/30 backdrop-blur-md text-gray-900">
            <tr>
              {["Facture", "Service", "Montant", "Date", "Méthode", "Statut", "Actions"].map((header) => (
                <th key={header} className="px-5 py-3 font-semibold border-b border-white/40">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_BILLING.map((b: Billing, i: number) => (
              <tr
                key={i}
                className="border-b border-white/20 hover:bg-white/20 transition cursor-pointer"
                onClick={() => setSelectedInvoice(b)}
              >
                <td className="px-5 py-3 font-medium">{b.invoice}</td>
                <td className="px-5 py-3">{b.service}</td>
                <td className="px-5 py-3 font-semibold">{b.amount} €</td>
                <td className="px-5 py-3">{b.date}</td>
                <td className="px-5 py-3">{b.method}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(b.status)}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInvoice(b);
                      }}
                      className="p-2 bg-white/40 backdrop-blur-md rounded-lg text-indigo-600 hover:text-indigo-800 hover:bg-white/60 transition"
                      aria-label="Voir facture"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        exportPDF();
                      }}
                      className="p-2 bg-white/40 backdrop-blur-md rounded-lg text-green-600 hover:text-green-800 hover:bg-white/60 transition"
                      aria-label="Télécharger PDF"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statistiques */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-5 bg-green-50/60 rounded-2xl border border-green-100 shadow-inner text-green-900">
          <h3 className="font-semibold text-lg mb-2">Total payé</h3>
          <p className="text-3xl font-extrabold">{totalPaid} €</p>
        </div>
        <div className="p-5 bg-yellow-50/60 rounded-2xl border border-yellow-100 shadow-inner text-yellow-900">
          <h3 className="font-semibold text-lg mb-2">En attente</h3>
          <p className="text-3xl font-extrabold">{totalPending} €</p>
        </div>
        <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 shadow-inner text-blue-900">
          <h3 className="font-semibold text-lg mb-2">Prochain paiement</h3>
          <p className="text-base font-medium">1,200 € le 01/09/2025</p>
        </div>
      </div>

      {/* Modal Nouvelle facture */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Nouvelle facture</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <form className="space-y-5 text-gray-900">
              <input
                type="text"
                placeholder="Numéro de facture"
                className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <input
                type="number"
                placeholder="Montant (€)"
                className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <input
                type="date"
                className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <select className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                <option>Méthode de paiement</option>
                <option>Carte bancaire</option>
                <option>Virement</option>
                <option>Espèces</option>
              </select>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold rounded-3xl shadow-lg hover:brightness-110 transition"
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Voir facture */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full text-gray-900">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                Détails facture {selectedInvoice.invoice}
              </h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                <strong>Service :</strong> {selectedInvoice.service}
              </p>
              <p>
                <strong>Montant :</strong> {selectedInvoice.amount} €
              </p>
              <p>
                <strong>Date :</strong> {selectedInvoice.date}
              </p>
              <p>
                <strong>Méthode :</strong> {selectedInvoice.method}
              </p>
              <p>
                <strong>Statut :</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    selectedInvoice.status
                  )}`}
                >
                  {selectedInvoice.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingSection;
