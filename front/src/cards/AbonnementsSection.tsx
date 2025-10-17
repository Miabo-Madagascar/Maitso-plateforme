import React, { useState } from "react";
import { Edit, CreditCard, AlertTriangle, CheckCircle, Pause, Play, History, Bell, Euro, Wrench, Settings, Brain, Monitor, Users, TrendingUp, Award, Zap, Thermometer, Droplets, Gauge, Activity, Sun, Eye } from "lucide-react";

interface CapteurInclus {
  nom: string;
  type: string;
  quantite: number;
  status: "Actif" | "Expiré" | "En retard" | "Suspendu" | "En attente";
}

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
  type: "capteur" | "service";
  description?: string;
  capteursInclus?: CapteurInclus[];
  paymentHistory: {
    date: string;
    amount: number;
    status: "Payé" | "Échoué" | "En attente";
  }[];
}

// Abonnement global capteurs
const GLOBAL_SENSOR_SUBSCRIPTION: BillingItem = {
  id: "SUB-GLOBAL-001",
  service: "Abonnement Capteurs IoT Global",
  sensorType: "Multi-capteurs",
  invoice: "INV-2024-GLOBAL",
  status: "Actif",
  amount: 199.99,
  billingPeriod: "Mensuel",
  nextDue: "15 Nov 2024",
  method: "Carte bancaire ****1234",
  autoRenewal: true,
  daysUntilExpiry: 30,
  totalSensors: 37,
  dataTransfer: "213 GB",
  supportLevel: "Premium",
  type: "capteur",
  description: "Pack complet incluant tous vos capteurs IoT avec monitoring 24/7",
  capteursInclus: [
    { nom: "Capteur Température Pro", type: "Température", quantite: 5, status: "Actif" },
    { nom: "Capteur Humidité Standard", type: "Humidité", quantite: 3, status: "En retard" },
    { nom: "Capteur Pression Industrial", type: "Pression", quantite: 10, status: "Actif" },
    { nom: "Capteur Vibration Pro", type: "Vibration", quantite: 2, status: "Suspendu" },
    { nom: "Capteur Qualité Air", type: "Qualité d'air", quantite: 4, status: "Expiré" },
    { nom: "Capteur Luminosité Smart", type: "Luminosité", quantite: 8, status: "Actif" },
    { nom: "Capteur Électrique Enterprise", type: "Consommation", quantite: 6, status: "En attente" }
  ],
  paymentHistory: [
    { date: "15 Oct 2024", amount: 199.99, status: "Payé" },
    { date: "15 Sep 2024", amount: 199.99, status: "Payé" },
    { date: "15 Aoû 2024", amount: 199.99, status: "Payé" }
  ]
};

// Données pour les 6 services
const SERVICE_SUBSCRIPTIONS: BillingItem[] = [
  {
    id: "SUB-FAB-008",
    service: "Fabrication Capteur",
    sensorType: "Service",
    invoice: "INV-2024-008",
    status: "Actif",
    amount: 199.99,
    billingPeriod: "Annuel",
    nextDue: "20 Déc 2024",
    method: "Virement bancaire",
    autoRenewal: true,
    daysUntilExpiry: 65,
    totalSensors: 0,
    dataTransfer: "N/A",
    supportLevel: "Enterprise",
    type: "service",
    description: "Service complet de fabrication de capteurs personnalisés",
    paymentHistory: [
      { date: "20 Déc 2023", amount: 199.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-IA-009",
    service: "Analyse IA",
    sensorType: "Service",
    invoice: "INV-2024-009",
    status: "Actif",
    amount: 89.99,
    billingPeriod: "Mensuel",
    nextDue: "25 Nov 2024",
    method: "Carte bancaire ****5678",
    autoRenewal: true,
    daysUntilExpiry: 40,
    totalSensors: 0,
    dataTransfer: "Illimité",
    supportLevel: "Premium",
    type: "service",
    description: "Intelligence artificielle avancée pour l'analyse des données",
    paymentHistory: [
      { date: "25 Oct 2024", amount: 89.99, status: "Payé" },
      { date: "25 Sep 2024", amount: 89.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-MAITSO-010",
    service: "Plateforme MAITSO",
    sensorType: "Service",
    invoice: "INV-2024-010",
    status: "Actif",
    amount: 49.99,
    billingPeriod: "Mensuel",
    nextDue: "30 Nov 2024",
    method: "PayPal ****@company.com",
    autoRenewal: true,
    daysUntilExpiry: 45,
    totalSensors: 0,
    dataTransfer: "50 GB",
    supportLevel: "Premium",
    type: "service",
    description: "Accès complet à la plateforme de gestion MAITSO",
    paymentHistory: [
      { date: "30 Oct 2024", amount: 49.99, status: "Payé" },
      { date: "30 Sep 2024", amount: 49.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-PART-011",
    service: "Mise en relation Partenaires",
    sensorType: "Service",
    invoice: "INV-2024-011",
    status: "En attente",
    amount: 25.99,
    billingPeriod: "Mensuel",
    nextDue: "15 Nov 2024",
    method: "Carte bancaire ****9999",
    autoRenewal: false,
    daysUntilExpiry: 30,
    totalSensors: 0,
    dataTransfer: "N/A",
    supportLevel: "Basic",
    type: "service",
    description: "Réseau de partenaires industriels et commerciaux",
    paymentHistory: [
      { date: "15 Oct 2024", amount: 25.99, status: "En attente" },
      { date: "15 Sep 2024", amount: 25.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-SUIVI-012",
    service: "Suivi Avancé",
    sensorType: "Service",
    invoice: "INV-2024-012",
    status: "Actif",
    amount: 39.99,
    billingPeriod: "Mensuel",
    nextDue: "10 Nov 2024",
    method: "Virement bancaire",
    autoRenewal: true,
    daysUntilExpiry: 25,
    totalSensors: 0,
    dataTransfer: "25 GB",
    supportLevel: "Premium",
    type: "service",
    description: "Monitoring et suivi en temps réel de vos équipements",
    paymentHistory: [
      { date: "10 Oct 2024", amount: 39.99, status: "Payé" },
      { date: "10 Sep 2024", amount: 39.99, status: "Payé" }
    ]
  },
  {
    id: "SUB-RSE-013",
    service: "Certificat RSE",
    sensorType: "Service",
    invoice: "INV-2024-013",
    status: "Actif",
    amount: 299.99,
    billingPeriod: "Annuel",
    nextDue: "01 Jan 2025",
    method: "Carte bancaire ****7777",
    autoRenewal: true,
    daysUntilExpiry: 77,
    totalSensors: 0,
    dataTransfer: "N/A",
    supportLevel: "Enterprise",
    type: "service",
    description: "Certification RSE complète avec audit et rapport",
    paymentHistory: [
      { date: "01 Jan 2024", amount: 299.99, status: "Payé" }
    ]
  }
];

// Combiner tous les abonnements
const ALL_SUBSCRIPTIONS = [GLOBAL_SENSOR_SUBSCRIPTION, ...SERVICE_SUBSCRIPTIONS];

const AbonnementsSection: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<{
    index: number;
    action: "renew" | "edit" | "payment" | "history" | "suspend" | "sensors" | null;
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

  const getServiceIcon = (service: string) => {
    if (service.includes("Fabrication")) return <Wrench className="w-5 h-5" />;
    if (service.includes("IA")) return <Brain className="w-5 h-5" />;
    if (service.includes("MAITSO")) return <Monitor className="w-5 h-5" />;
    if (service.includes("Partenaires")) return <Users className="w-5 h-5" />;
    if (service.includes("Suivi")) return <TrendingUp className="w-5 h-5" />;
    if (service.includes("RSE")) return <Award className="w-5 h-5" />;
    return <Settings className="w-5 h-5" />;
  };

  const getCapteurIcon = (type: string) => {
    switch (type) {
      case "Température": return <Thermometer className="w-4 h-4" />;
      case "Humidité": return <Droplets className="w-4 h-4" />;
      case "Pression": return <Gauge className="w-4 h-4" />;
      case "Vibration": return <Activity className="w-4 h-4" />;
      case "Qualité d'air": return <Eye className="w-4 h-4" />;
      case "Luminosité": return <Sun className="w-4 h-4" />;
      case "Consommation": return <Zap className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getUrgencyIndicator = (daysUntil: number) => {
    if (daysUntil < 0) return "🔴";
    if (daysUntil <= 7) return "🟠";
    if (daysUntil <= 30) return "🟡";
    return "🟢";
  };

  const handlePayment = (subscriptionId: string) => {
    console.log(`Traitement du paiement pour ${subscriptionId}`, paymentData);
    setExpandedItem(null);
  };

  const renderGlobalSensorCard = (subscription: BillingItem, index: number) => {
    const isOpen = expandedItem?.index === index;
    const action = expandedItem?.action;

    return (
      <div
        key={subscription.id}
        className="p-6 bg-white/30 backdrop-blur border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 col-span-full"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Settings className="w-6 h-6 text-cyan-600" />
              <h3 className="text-xl font-semibold">{subscription.service}</h3>
              <span className="text-lg">{getUrgencyIndicator(subscription.daysUntilExpiry)}</span>
            </div>
            <p className="text-sm text-gray-500">{subscription.invoice}</p>
            <p className="text-xs text-gray-600 mt-1">{subscription.description}</p>
            <div className="flex gap-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(subscription.status)}`}>
                {subscription.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSupportColor(subscription.supportLevel)}`}>
                {subscription.supportLevel}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800">
                Pack Global
              </span>
            </div>
          </div>
        </div>

        {/* Détails de l'abonnement global */}
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <p className="text-3xl font-extrabold text-indigo-600">
              {subscription.amount}€
              <span className="text-sm font-medium text-gray-500">
                /{subscription.billingPeriod === "Mensuel" ? "mois" : "an"}
              </span>
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📅 Prochain paiement: <span className="font-medium">{subscription.nextDue}</span></p>
              <p>🔄 Renouvellement auto: <span className={subscription.autoRenewal ? "text-green-600" : "text-red-600"}>{subscription.autoRenewal ? "Activé" : "Désactivé"}</span></p>
              <p>📊 Total capteurs: <span className="font-medium">{subscription.totalSensors}</span> • Data: <span className="font-medium">{subscription.dataTransfer}</span></p>
              <p>💳 {subscription.method}</p>
            </div>
          </div>

          {/* Liste compacte des capteurs inclus */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-sm font-semibold text-gray-700">Capteurs inclus:</h4>
              <button
                onClick={() => setExpandedItem({ index, action: "sensors" })}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                {isOpen && action === "sensors" ? "Masquer" : "Voir détails"}
              </button>
            </div>
            {!isOpen || action !== "sensors" ? (
              <div className="grid grid-cols-2 gap-1 text-xs">
                {subscription.capteursInclus?.map((capteur, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    {getCapteurIcon(capteur.type)}
                    <span>{capteur.quantite}x {capteur.type}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 bg-white/10 rounded-lg p-3 max-h-32 overflow-y-auto">
                {subscription.capteursInclus?.map((capteur, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {getCapteurIcon(capteur.type)}
                      <span className="font-medium">{capteur.nom}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{capteur.quantite}x</span>
                      <span className={`px-1 py-0.5 rounded text-xs ${getStatusColor(capteur.status)}`}>
                        {capteur.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
          <button
            onClick={() => setExpandedItem({ index, action: "payment" })}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition text-sm"
          >
            <CreditCard className="w-4 h-4" />
            Payer
          </button>
          <button
            onClick={() => setExpandedItem({ index, action: "edit" })}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-sm"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
          <button
            onClick={() => setExpandedItem({ index, action: "history" })}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition text-sm"
          >
            <History className="w-4 h-4" />
            Historique
          </button>
          <button
            onClick={() => setExpandedItem({ index, action: subscription.status === "Suspendu" ? "renew" : "suspend" })}
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

        {/* Contenu conditionnel pour l'abonnement global */}
        {isOpen && (
          <div className="mt-4 p-4 bg-white/20 backdrop-blur rounded-lg border border-white/30">
            {action === "payment" && (
              <div>
                <p className="font-semibold text-green-700 flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4" />
                  Confirmer le paiement global
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

            {/* Autres actions similaires aux services... */}
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
          </div>
        )}
      </div>
    );
  };

  const renderServiceCard = (subscription: BillingItem, index: number) => {
    const isOpen = expandedItem?.index === index;
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
              {getServiceIcon(subscription.service)}
              <h3 className="text-lg font-semibold">{subscription.service}</h3>
              <span className="text-lg">{getUrgencyIndicator(subscription.daysUntilExpiry)}</span>
            </div>
            <p className="text-sm text-gray-500">{subscription.invoice}</p>
            <p className="text-xs text-gray-600 mt-1">{subscription.description}</p>
            <div className="flex gap-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(subscription.status)}`}>
                {subscription.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSupportColor(subscription.supportLevel)}`}>
                {subscription.supportLevel}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                Service
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
            <p>📊 Data: {subscription.dataTransfer}</p>
            <p>💳 {subscription.method}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => setExpandedItem({ index, action: "payment" })}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition text-sm"
          >
            <CreditCard className="w-4 h-4" />
            Payer
          </button>
          <button
            onClick={() => setExpandedItem({ index, action: "edit" })}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-sm"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
          <button
            onClick={() => setExpandedItem({ index, action: "history" })}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition text-sm"
          >
            <History className="w-4 h-4" />
            Historique
          </button>
          <button
            onClick={() => setExpandedItem({ index, action: subscription.status === "Suspendu" ? "renew" : "suspend" })}
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

        {/* Contenu conditionnel similaire à l'abonnement global */}
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
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-screen p-3 sm:p-4 bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg text-gray-900 flex flex-col">
      {/* CSS local pour cacher la scrollbar */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="flex-1 overflow-auto hide-scrollbar">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
                <CreditCard className="w-8 h-8 text-blue-600" />
                Abonnements & Services
              </h2>
              <p className="text-gray-600 mt-1">Gestion de vos 7 abonnements (1 pack capteurs + 6 services)</p>
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
                    {ALL_SUBSCRIPTIONS.filter(s => s.status === "Actif").length}
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
                    {ALL_SUBSCRIPTIONS.filter(s => s.daysUntilExpiry <= 7 && s.daysUntilExpiry > 0).length}
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
                    {ALL_SUBSCRIPTIONS.reduce((sum, s) => 
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
                    {ALL_SUBSCRIPTIONS.filter(s => s.daysUntilExpiry < 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Abonnement Global Capteurs */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-cyan-600" />
              <h3 className="text-2xl font-bold text-cyan-600">Abonnement Global Capteurs</h3>
            </div>
            <div className="grid">
              {renderGlobalSensorCard(GLOBAL_SENSOR_SUBSCRIPTION, 0)}
            </div>
          </div>

          {/* Section Services */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-indigo-600" />
              <h3 className="text-2xl font-bold text-indigo-600">Abonnements Services ({SERVICE_SUBSCRIPTIONS.length})</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_SUBSCRIPTIONS.map((subscription, i) => 
                renderServiceCard(subscription, i + 1)
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AbonnementsSection;
