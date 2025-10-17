import React, { useState } from "react";
import { Plus, Download, Eye, X, CreditCard, CheckCircle, AlertTriangle, Bell, Calendar } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// MOCK DATA
const MOCK_BILLING = [
  {
    invoice: "INV-2024-001",
    amount: 29.99,
    date: "15/10/2024",
    status: "Payé",
    service: "Capteur Température Pro",
    nextDue: "15/11/2024",
    method: "Carte bancaire ****1234",
  },
  {
    invoice: "INV-2024-002",
    amount: 19.99,
    date: "10/10/2024",
    status: "En attente",
    service: "Capteur Humidité Standard",
    nextDue: "10/11/2024",
    method: "PayPal ****@email.com",
  },
  {
    invoice: "INV-2024-003",
    amount: 299.99,
    date: "20/12/2023",
    status: "Payé",
    service: "Capteur Pression Industrial",
    nextDue: "20/12/2024",
    method: "Virement bancaire",
  },
  {
    invoice: "INV-2024-004",
    amount: 39.99,
    date: "25/09/2024",
    status: "Payé",
    service: "Capteur Vibration Pro",
    nextDue: "25/11/2024",
    method: "Carte bancaire ****5678",
  },
  {
    invoice: "INV-2024-005",
    amount: 24.99,
    date: "01/10/2024",
    status: "En retard",
    service: "Capteur Qualité Air",
    nextDue: "01/11/2024",
    method: "Carte bancaire ****9999",
  },
  {
    invoice: "INV-2024-006",
    amount: 179.99,
    date: "05/01/2024",
    status: "Payé",
    service: "Capteur Luminosité Smart",
    nextDue: "05/01/2025",
    method: "PayPal ****@company.com",
  },
  {
    invoice: "INV-2024-007",
    amount: 49.99,
    date: "30/10/2024",
    status: "En attente",
    service: "Capteur Électrique Enterprise",
    nextDue: "30/11/2024",
    method: "Carte bancaire ****7777",
  }
];

// Utilité pour le glassmorphism color dans le thème commun
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

const getNextDueColor = (status: string) => {
  if (status === "Payé") return "text-green-700";
  if (status === "En retard") return "text-red-700";
  if (status === "En attente") return "text-yellow-700";
  return "text-gray-700";
};

const getCardIcon = (service: string) => {
  if (service.includes("Température")) return <Calendar className="w-5 h-5 text-blue-600" />;
  if (service.includes("Humidité")) return <Bell className="w-5 h-5 text-indigo-600" />;
  if (service.includes("Pression")) return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
  if (service.includes("Vibration")) return <CheckCircle className="w-5 h-5 text-green-600" />;
  if (service.includes("Qualité")) return <AlertTriangle className="w-5 h-5 text-yellow-700" />;
  if (service.includes("Luminosité")) return <Bell className="w-5 h-5 text-yellow-400" />;
  if (service.includes("Électrique")) return <CreditCard className="w-5 h-5 text-purple-600" />;
  return <CreditCard className="w-5 h-5 text-gray-500" />;
};

// Type pour les factures
interface Invoice {
  invoice: string;
  amount: number;
  date: string;
  status: string;
  service: string;
  nextDue: string;
  method: string;
}

// --- Section Facturation ---
const BillingSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const totalPaid = MOCK_BILLING.filter((b) => b.status === "Payé").reduce(
    (sum, b) => sum + b.amount,
    0
  );

  const totalPending = MOCK_BILLING.filter(
    (b) => b.status === "En attente"
  ).reduce((sum, b) => sum + b.amount, 0);

  const totalLate = MOCK_BILLING.filter(
    (b) => b.status === "En retard"
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
    <div className="mt-6 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg text-gray-900 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 py-6 gap-4 bg-white/20">
        <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <CreditCard className="w-7 h-7 text-indigo-700" />
          Factures et Paiements
        </h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-2 items-center px-5 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-md hover:brightness-110 transition"
          >
            <Plus className="w-5 h-5" />
            Nouvelle facture
          </button>
          <button
            onClick={exportPDF}
            className="flex gap-2 items-center px-5 py-3 bg-gray-500/70 text-white rounded-2xl shadow-md hover:bg-gray-600/80 transition"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid md:grid-cols-3 gap-6 px-8 py-4">
        <div className="bg-green-100/50 rounded-2xl border border-green-100 shadow-inner text-green-900 flex flex-col items-center justify-center p-4">
          <h3 className="font-semibold text-lg mb-1">Total payé</h3>
          <p className="text-3xl font-extrabold">{totalPaid} €</p>
        </div>
        <div className="bg-yellow-100/60 rounded-2xl border border-yellow-100 shadow-inner text-yellow-900 flex flex-col items-center justify-center p-4">
          <h3 className="font-semibold text-lg mb-1">En attente</h3>
          <p className="text-3xl font-extrabold">{totalPending} €</p>
        </div>
        <div className="bg-red-100/60 rounded-2xl border border-red-100 shadow-inner text-red-900 flex flex-col items-center justify-center p-4">
          <h3 className="font-semibold text-lg mb-1">En retard</h3>
          <p className="text-3xl font-extrabold">{totalLate} €</p>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-xl border border-white/20 shadow-inner bg-white/10">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-white/30 backdrop-blur-md text-gray-900">
            <tr>
              {["Facture", "Service", "Montant", "Date", "Méthode", "Prochain paiement", "Statut", "Actions"].map((header) => (
                <th key={header} className="px-5 py-3 font-semibold border-b border-white/40">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_BILLING.map((b: Invoice, i: number) => (
              <tr
                key={i}
                className="border-b border-white/20 hover:bg-white/20 transition cursor-pointer"
                onClick={() => setSelectedInvoice(b)}
              >
                <td className="px-5 py-3 font-medium">{b.invoice}</td>
                <td className="px-5 py-3 flex items-center gap-2">
                  {getCardIcon(b.service)}
                  {b.service}
                </td>
                <td className="px-5 py-3 font-semibold">{b.amount} €</td>
                <td className="px-5 py-3">{b.date}</td>
                <td className="px-5 py-3">{b.method}</td>
                <td className={`px-5 py-3 font-medium ${getNextDueColor(b.status)}`}>{b.nextDue}</td>
                <td className="px-5 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(b.status)}`}>
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

      {/* Modal Nouvelle facture */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-lg w-full">
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
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full text-gray-900">
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
                <strong>Prochain paiement :</strong> {selectedInvoice.nextDue}
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
