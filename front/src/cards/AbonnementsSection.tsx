import React, { useState } from "react";
import { RefreshCcw, Edit, CreditCard, AlertTriangle, CheckCircle, Pause, Play, History, Bell, Euro } from "lucide-react";

interface BillingItem {
  id: string;
  service: string;
  sensorType: string;
  invoice: string;
  status: "Actif" | "Expiré" | "En retard" | "Suspendu" | "En attente";
  amount: number;
  billingPeriod: "Mensuel" | "Annuel";
  nextDue: string;
  method: string;
  autoRenewal: boolean;
  daysUntilExpiry: number;
  totalSensors: number;
  dataTransfer: string;
  supportLevel: "Basic" | "Premium" | "Enterprise";
  paymentHistory: {
    date: string;
    amount: number;
    status: "Payé" | "Échoué" | "En attente";
  }[];
}

// Données d'exemple pour 7 capteurs
const SENSOR_SUBSCRIPTIONS: BillingItem[] = [
  {
    id: "SUB-TEMP-001",
    service: "Capteur Température Pro",
    sensorType: "Température",
    invoice: "INV-2024-001",
    status: "Actif",
    amount: 29.99,
    billingPeriod: "Mensuel",
    nextDue: "15 Nov 2024",
    method: "Carte bancaire ****1234",
    autoRenewal: true,
    daysUntilExpiry: 30,
    totalSensors: 5,
    dataTransfer: "10 GB",
    supportLevel: "Premium",
    paymentHistory: [
      { date: "15 Oct 2024", amount: 29.99, status: "Payé" },
      { date: "15 Sep 2024", amount: 29.99, status: "Payé" },
      { date: "15 Aoû 2024", amount: 29.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-HUM-002",
    service: "Capteur Humidité Standard",
    sensorType: "Humidité",
    invoice: "INV-2024-002",
    status: "En retard",
    amount: 19.99,
    billingPeriod: "Mensuel",
    nextDue: "10 Nov 2024",
    method: "PayPal ****@email.com",
    autoRenewal: false,
    daysUntilExpiry: -5,
    totalSensors: 3,
    dataTransfer: "5 GB",
    supportLevel: "Basic",
    paymentHistory: [
      { date: "10 Oct 2024", amount: 19.99, status: "Échoué" },
      { date: "10 Sep 2024", amount: 19.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-PRESS-003",
    service: "Capteur Pression Industrial",
    sensorType: "Pression",
    invoice: "INV-2024-003",
    status: "Actif",
    amount: 299.99,
    billingPeriod: "Annuel",
    nextDue: "20 Déc 2024",
    method: "Virement bancaire",
    autoRenewal: true,
    daysUntilExpiry: 65,
    totalSensors: 10,
    dataTransfer: "100 GB",
    supportLevel: "Enterprise",
    paymentHistory: [
      { date: "20 Déc 2023", amount: 299.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-VIB-004",
    service: "Capteur Vibration Pro",
    sensorType: "Vibration",
    invoice: "INV-2024-004",
    status: "Suspendu",
    amount: 39.99,
    billingPeriod: "Mensuel",
    nextDue: "25 Nov 2024",
    method: "Carte bancaire ****5678",
    autoRenewal: false,
    daysUntilExpiry: 40,
    totalSensors: 2,
    dataTransfer: "15 GB",
    supportLevel: "Premium",
    paymentHistory: [
      { date: "25 Sep 2024", amount: 39.99, status: "Payé" },
      { date: "25 Aoû 2024", amount: 39.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-AIR-005",
    service: "Capteur Qualité Air",
    sensorType: "Qualité d'air",
    invoice: "INV-2024-005",
    status: "Expiré",
    amount: 24.99,
    billingPeriod: "Mensuel",
    nextDue: "01 Nov 2024",
    method: "Carte bancaire ****9999",
    autoRenewal: false,
    daysUntilExpiry: -15,
    totalSensors: 4,
    dataTransfer: "8 GB",
    supportLevel: "Basic",
    paymentHistory: [
      { date: "01 Oct 2024", amount: 24.99, status: "Échoué" },
      { date: "01 Sep 2024", amount: 24.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-LUM-006",
    service: "Capteur Luminosité Smart",
    sensorType: "Luminosité",
    invoice: "INV-2024-006",
    status: "Actif",
    amount: 179.99,
    billingPeriod: "Annuel",
    nextDue: "05 Jan 2025",
    method: "PayPal ****@company.com",
    autoRenewal: true,
    daysUntilExpiry: 51,
    totalSensors: 8,
    dataTransfer: "50 GB",
    supportLevel: "Premium",
    paymentHistory: [
      { date: "05 Jan 2024", amount: 179.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-ELEC-007",
    service: "Capteur Électrique Enterprise",
    sensorType: "Consommation",
    invoice: "INV-2024-007",
    status: "En attente",
    amount: 49.99,
    billingPeriod: "Mensuel",
    nextDue: "30 Nov 2024",
    method: "Carte bancaire ****7777",
    autoRenewal: true,
    daysUntilExpiry: 45,
    totalSensors: 6,
    dataTransfer: "25 GB",
    supportLevel: "Enterprise",
    paymentHistory: [
      { date: "30 Oct 2024", amount: 49.99, status: "En attente" },
      { date: "30 Sep 2024", amount: 49.99, status: "Payé" }
    ]
  }
];

const AbonnementsSection: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<{
    index: number;
    action: "renew" | "edit" | "payment" | "history" | "suspend" | null;
  } | null>(null);

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif": return "bg-green-100 text-green-800";
      case "Expiré": return "bg-red-100 text-red-800";
      case "En retard": return "bg-orange-100 text-orange-800";
      case "Suspendu": return "bg-gray-100 text-gray-800";
      case "En attente": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSupportColor = (level: string) => {
    switch (level) {
      case "Enterprise": return "bg-purple-100 text-purple-800";
      case "Premium": return "bg-blue-100 text-blue-800";
      case "Basic": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyIndicator = (daysUntil: number) => {
    if (daysUntil < 0) return "🔴";
    if (daysUntil <= 7) return "🟠";
    if (daysUntil <= 30) return "🟡";
    return "🟢";
  };

  const handlePayment = (subscriptionId: string) => {
    // Simuler le traitement du paiement
    console.log(`Traitement du paiement pour ${subscriptionId}`, paymentData);
    setExpandedItem(null);
    // Ici vous ajouteriez la logique de paiement réelle
  };

  return (
    <div className="w-full h-screen p-3 sm:p-4 bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg text-gray-900 flex flex-col">
      {/* Ajout CSS local pour cacher la scrollbar tout en conservant le scroll */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* WebKit */
        }
      `}</style>

      <div className="flex-1 overflow-auto hide-scrollbar">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
                <CreditCard className="w-8 h-8 text-blue-600" />
                Abonnements Capteurs
              </h2>
              <p className="text-gray-600 mt-1">Gestion de vos 7 abonnements de capteurs IoT</p>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Actifs</p>
                  <p className="text-2xl font-bold">
                    {SENSOR_SUBSCRIPTIONS.filter(s => s.status === "Actif").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">À renouveler</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {SENSOR_SUBSCRIPTIONS.filter(s => s.daysUntilExpiry <= 7 && s.daysUntilExpiry > 0).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Euro className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Coût mensuel</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {SENSOR_SUBSCRIPTIONS.reduce((sum, s) => 
                      sum + (s.billingPeriod === "Mensuel" ? s.amount : s.amount / 12), 0
                    ).toFixed(0)}€
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">En retard</p>
                  <p className="text-2xl font-bold text-red-600">
                    {SENSOR_SUBSCRIPTIONS.filter(s => s.daysUntilExpiry < 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grille des abonnements */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SENSOR_SUBSCRIPTIONS.map((subscription, i) => {
              const isOpen = expandedItem?.index === i;
              const action = expandedItem?.action;

              return (
                <div
                  key={subscription.id}
                  className="p-6 bg-white/30 backdrop-blur border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{subscription.service}</h3>
                        <span className="text-lg">{getUrgencyIndicator(subscription.daysUntilExpiry)}</span>
                      </div>
                      <p className="text-sm text-gray-500">{subscription.invoice}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(subscription.status)}`}>
                          {subscription.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSupportColor(subscription.supportLevel)}`}>
                          {subscription.supportLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Détails de l'abonnement */}
                  <div className="mb-4 space-y-2">
                    <p className="text-2xl font-extrabold text-indigo-600">
                      {subscription.amount}€
                      <span className="text-sm font-medium text-gray-500">
                        /{subscription.billingPeriod === "Mensuel" ? "mois" : "an"}
                      </span>
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📅 Prochain paiement: <span className="font-medium">{subscription.nextDue}</span></p>
                      <p>🔄 Renouvellement auto: <span className={subscription.autoRenewal ? "text-green-600" : "text-red-600"}>{subscription.autoRenewal ? "Activé" : "Désactivé"}</span></p>
                      <p>📊 Capteurs: {subscription.totalSensors} • Data: {subscription.dataTransfer}</p>
                      <p>💳 {subscription.method}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                      onClick={() => setExpandedItem({ index: i, action: "payment" })}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition text-sm"
                      disabled={subscription.status === "Actif" && subscription.daysUntilExpiry > 7}
                    >
                      <CreditCard className="w-4 h-4" />
                      Payer
                    </button>
                    <button
                      onClick={() => setExpandedItem({ index: i, action: "edit" })}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => setExpandedItem({ index: i, action: "history" })}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition text-sm"
                    >
                      <History className="w-4 h-4" />
                      Historique
                    </button>
                    <button
                      onClick={() => setExpandedItem({ index: i, action: subscription.status === "Suspendu" ? "renew" : "suspend" })}
                      className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg shadow-md transition text-sm ${
                        subscription.status === "Suspendu" 
                          ? "bg-green-600 text-white hover:bg-green-700" 
                          : "bg-gray-600 text-white hover:bg-gray-700"
                      }`}
                    >
                      {subscription.status === "Suspendu" ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      {subscription.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                    </button>
                  </div>

                  {/* Contenu conditionnel */}
                  {isOpen && (
                    <div className="mt-4 p-4 bg-white/20 backdrop-blur rounded-lg border border-white/30">
                      {action === "payment" && (
                        <div>
                          <p className="font-semibold text-green-700 flex items-center gap-2 mb-3">
                            <CreditCard className="w-4 h-4" />
                            Confirmer le paiement
                          </p>
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Numéro de carte"
                              value={paymentData.cardNumber}
                              onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                              className="w-full p-2 border border-white/50 rounded bg-white/20 text-sm"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="MM/AA"
                                value={paymentData.expiryDate}
                                onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                                className="p-2 border border-white/50 rounded bg-white/20 text-sm"
                              />
                              <input
                                type="text"
                                placeholder="CVV"
                                value={paymentData.cvv}
                                onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                                className="p-2 border border-white/50 rounded bg-white/20 text-sm"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Nom du titulaire"
                              value={paymentData.holderName}
                              onChange={(e) => setPaymentData({...paymentData, holderName: e.target.value})}
                              className="w-full p-2 border border-white/50 rounded bg-white/20 text-sm"
                            />
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handlePayment(subscription.id)}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                              >
                                Payer {subscription.amount}€
                              </button>
                              <button 
                                onClick={() => setExpandedItem(null)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {action === "edit" && (
                        <div>
                          <p className="font-semibold text-blue-700 flex items-center gap-2 mb-3">
                            <Edit className="w-4 h-4" />
                            Modifier l'abonnement
                          </p>
                          <div className="space-y-3">
                            <select className="w-full p-2 border border-white/50 rounded bg-white/20 text-sm">
                              <option>Mensuel - {subscription.amount}€</option>
                              <option>Annuel - {(subscription.amount * 10).toFixed(2)}€ (2 mois gratuits)</option>
                            </select>
                            <label className="flex items-center gap-2 text-sm">
                              <input 
                                type="checkbox" 
                                defaultChecked={subscription.autoRenewal}
                                className="rounded"
                              />
                              Renouvellement automatique
                            </label>
                            <select className="w-full p-2 border border-white/50 rounded bg-white/20 text-sm">
                              <option>Basic - 5GB</option>
                              <option>Premium - 25GB</option>
                              <option>Enterprise - 100GB</option>
                            </select>
                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                              Sauvegarder les modifications
                            </button>
                          </div>
                        </div>
                      )}

                      {action === "history" && (
                        <div>
                          <p className="font-semibold text-purple-700 flex items-center gap-2 mb-3">
                            <History className="w-4 h-4" />
                            Historique des paiements
                          </p>
                          <div className="space-y-2 max-h-40 overflow-y-auto hide-scrollbar">
                            {subscription.paymentHistory.map((payment, idx) => (
                              <div key={idx} className="flex justify-between items-center p-2 bg-white/10 rounded text-sm">
                                <div>
                                  <p className="font-medium">{payment.date}</p>
                                  <p className="text-xs text-gray-600">{payment.amount}€</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  payment.status === "Payé" ? "bg-green-100 text-green-800" :
                                  payment.status === "Échoué" ? "bg-red-100 text-red-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {payment.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {action === "suspend" && (
                        <div>
                          <p className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                            <Pause className="w-4 h-4" />
                            Suspendre l'abonnement
                          </p>
                          <p className="text-sm mb-3">Êtes-vous sûr de vouloir suspendre cet abonnement ? Vos capteurs seront désactivés.</p>
                          <div className="flex gap-2">
                            <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm">
                              Confirmer la suspension
                            </button>
                            <button 
                              onClick={() => setExpandedItem(null)}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      )}

                      {action === "renew" && (
                        <div>
                          <p className="font-semibold text-green-700 flex items-center gap-2 mb-3">
                            <RefreshCcw className="w-4 h-4" />
                            Réactiver l'abonnement
                          </p>
                          <p className="text-sm mb-3">Réactivez votre abonnement pour reprendre la surveillance de vos capteurs.</p>
                          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                            Réactiver maintenant
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AbonnementsSection;
