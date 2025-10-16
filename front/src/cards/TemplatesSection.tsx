import React, { useState } from "react";
import { Plus, TrendingUp, X, Wrench, AlertTriangle, CheckCircle, Clock , Activity, Settings } from "lucide-react";

interface MaintenanceTemplate {
  id: string;
  name: string;
  category: "Préventive" | "Corrective" | "Périodique" | "Urgente";
  sensorType: string;
  status: "Actif" | "Inactif" | "En maintenance" | "Défaillant";
  lastMaintenance: Date;
  nextMaintenance: Date;
  maintenanceCount: number;
  uptime: number; // pourcentage
  mtbf: number; // heures
  mttr: number; // heures
  description: string;
  manufacturer: string;
  model: string;
  installationDate: Date;
  warrantyExpiry: Date;
  location: string;
  responsible: string;
  criticalLevel: "Faible" | "Moyen" | "Élevé" | "Critique";
  checklistItems: string[];
  requiredTools: string[];
  estimatedDuration: number; // minutes
  cost: number;
  alerts: {
    type: "Maintenance due" | "Threshold exceeded" | "Offline" | "Battery low";
    message: string;
    severity: "Info" | "Warning" | "Critical";
    timestamp: Date;
  }[];
}

const MOCK_MAINTENANCE_TEMPLATES: MaintenanceTemplate[] = [
  {
    id: "TEMP-001",
    name: "Capteur Température Salle Serveur",
    category: "Préventive",
    sensorType: "Température",
    status: "Actif",
    lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 jours
    nextMaintenance: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000), // dans 75 jours
    maintenanceCount: 8,
    uptime: 99.2,
    mtbf: 2160, // 90 jours en heures
    mttr: 2.5,
    description: "Surveillance continue de la température en salle serveur avec alertes automatiques.",
    manufacturer: "SensorTech Pro",
    model: "ST-TEMP-4000",
    installationDate: new Date(2023, 2, 15),
    warrantyExpiry: new Date(2026, 2, 15),
    location: "Salle serveur - Rack A3",
    responsible: "Sophie Martin",
    criticalLevel: "Élevé",
    checklistItems: [
      "Vérifier la précision des mesures",
      "Nettoyer le capteur",
      "Contrôler les connexions",
      "Calibrer si nécessaire",
      "Vérifier l'alimentation"
    ],
    requiredTools: ["Multimètre", "Kit de nettoyage", "Étalon de température"],
    estimatedDuration: 45,
    cost: 150,
    alerts: [
      {
        type: "Threshold exceeded",
        message: "Température > 25°C détectée",
        severity: "Warning",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ]
  },
  {
    id: "HUM-002",
    name: "Capteur Humidité Laboratoire",
    category: "Périodique",
    sensorType: "Humidité",
    status: "En maintenance",
    lastMaintenance: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    nextMaintenance: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    maintenanceCount: 12,
    uptime: 97.8,
    mtbf: 1440, // 60 jours
    mttr: 3.2,
    description: "Contrôle de l'humidité relative dans le laboratoire de recherche.",
    manufacturer: "HumidityMax",
    model: "HM-RH-2500",
    installationDate: new Date(2022, 8, 10),
    warrantyExpiry: new Date(2025, 8, 10),
    location: "Laboratoire R&D - Zone stérile",
    responsible: "Pierre Dubois",
    criticalLevel: "Moyen",
    checklistItems: [
      "Remplacer le filtre d'humidité",
      "Vérifier l'étalonnage",
      "Contrôler l'étanchéité",
      "Tester les alertes"
    ],
    requiredTools: ["Hygromètre de référence", "Filtres de rechange", "Tournevis"],
    estimatedDuration: 30,
    cost: 80,
    alerts: []
  },
  {
    id: "PRESS-003",
    name: "Capteur Pression Ligne Production",
    category: "Corrective",
    sensorType: "Pression",
    status: "Défaillant",
    lastMaintenance: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    nextMaintenance: new Date(), // maintenance immédiate
    maintenanceCount: 15,
    uptime: 94.5,
    mtbf: 720, // 30 jours
    mttr: 4.8,
    description: "Surveillance de la pression dans la ligne de production principale.",
    manufacturer: "PressurePro Industries",
    model: "PP-PRESS-8000",
    installationDate: new Date(2021, 11, 5),
    warrantyExpiry: new Date(2024, 11, 5),
    location: "Ligne production #2 - Station 4",
    responsible: "Marie Leblanc",
    criticalLevel: "Critique",
    checklistItems: [
      "Remplacer le capteur défaillant",
      "Vérifier la membrane",
      "Contrôler la calibration",
      "Tester sous pression",
      "Valider les mesures"
    ],
    requiredTools: ["Manomètre étalon", "Kit de remplacement", "Clés spécialisées"],
    estimatedDuration: 120,
    cost: 350,
    alerts: [
      {
        type: "Offline",
        message: "Capteur hors ligne depuis 2h",
        severity: "Critical",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        type: "Maintenance due",
        message: "Maintenance corrective requise",
        severity: "Critical",
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      }
    ]
  },
  {
    id: "VIB-004",
    name: "Capteur Vibration Compresseur",
    category: "Préventive",
    sensorType: "Vibration",
    status: "Actif",
    lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    nextMaintenance: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    maintenanceCount: 6,
    uptime: 98.7,
    mtbf: 2880, // 120 jours
    mttr: 1.8,
    description: "Détection des vibrations anormales sur compresseur principal.",
    manufacturer: "VibroSense",
    model: "VS-VIB-1200",
    installationDate: new Date(2023, 5, 20),
    warrantyExpiry: new Date(2026, 5, 20),
    location: "Salle technique - Compresseur A1",
    responsible: "Thomas Rousseau",
    criticalLevel: "Élevé",
    checklistItems: [
      "Vérifier la fixation du capteur",
      "Contrôler les seuils d'alerte",
      "Analyser les spectres de vibration",
      "Nettoyer les contacts"
    ],
    requiredTools: ["Analyseur de vibrations", "Clé dynamométrique", "Spray contact"],
    estimatedDuration: 60,
    cost: 200,
    alerts: [
      {
        type: "Threshold exceeded",
        message: "Pic de vibration détecté à 3.2mm/s",
        severity: "Warning",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ]
  }
];

const TemplatesSection: React.FC = () => {
  const [modalContent, setModalContent] = useState<{
    type: "add" | "maintenance" | "details" | "alerts" | null;
    template?: MaintenanceTemplate;
  }>({ type: null });

  const closeModal = () => setModalContent({ type: null });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif": return "bg-green-100 text-green-800";
      case "En maintenance": return "bg-yellow-100 text-yellow-800";
      case "Défaillant": return "bg-red-100 text-red-800";
      case "Inactif": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCriticalColor = (level: string) => {
    switch (level) {
      case "Critique": return "bg-red-500";
      case "Élevé": return "bg-orange-500";
      case "Moyen": return "bg-yellow-500";
      case "Faible": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Préventive": return <CheckCircle className="w-4 h-4" />;
      case "Corrective": return <Wrench className="w-4 h-4" />;
      case "Périodique": return <Clock className="w-4 h-4" />;
      case "Urgente": return <AlertTriangle className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getDaysUntilMaintenance = (date: Date) => {
    const now = new Date();
    const diff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="w-full h-screen p-3 sm:p-4 bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg text-gray-900 flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
                <Activity className="w-8 h-8 text-blue-600" />
                Templates de Maintenance
              </h2>
              <p className="text-gray-600 mt-1">Suivi et planification de l'entretien des capteurs</p>
            </div>
            <button
              onClick={() => setModalContent({ type: "add" })}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-md hover:brightness-110 transition focus:outline-none"
            >
              <Plus className="w-5 h-5" />
              Nouveau template
            </button>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Capteurs actifs</p>
                  <p className="text-2xl font-bold">
                    {MOCK_MAINTENANCE_TEMPLATES.filter(t => t.status === "Actif").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Défaillants</p>
                  <p className="text-2xl font-bold text-red-600">
                    {MOCK_MAINTENANCE_TEMPLATES.filter(t => t.status === "Défaillant").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Maintenance due</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {MOCK_MAINTENANCE_TEMPLATES.filter(t => getDaysUntilMaintenance(t.nextMaintenance) <= 7).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Uptime moyen</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {(MOCK_MAINTENANCE_TEMPLATES.reduce((sum, t) => sum + t.uptime, 0) / MOCK_MAINTENANCE_TEMPLATES.length).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des templates */}
          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_MAINTENANCE_TEMPLATES.map((template) => {
              const daysUntil = getDaysUntilMaintenance(template.nextMaintenance);
              const isOverdue = daysUntil < 0;
              const isDueSoon = daysUntil <= 7 && daysUntil >= 0;

              return (
                <div
                  key={template.id}
                  className="border border-white/40 p-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-md hover:shadow-lg transition"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full ${getCriticalColor(template.criticalLevel)} mt-1`}></div>
                      <div>
                        <h3 className="font-semibold text-lg">{template.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                            {getCategoryIcon(template.category)}
                            {template.status}
                          </span>
                          <span className="text-xs text-gray-500">#{template.id}</span>
                        </div>
                      </div>
                    </div>
                    {template.alerts.length > 0 && (
                      <button
                        onClick={() => setModalContent({ type: "alerts", template })}
                        className="relative p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {template.alerts.length}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Informations principales */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Localisation:</span>
                      <span className="font-medium">{template.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Responsable:</span>
                      <span className="font-medium">{template.responsible}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Uptime:</span>
                      <span className="font-medium text-green-600">{template.uptime}%</span>
                    </div>
                  </div>

                  {/* Maintenance info */}
                  <div className="bg-white/20 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Prochaine maintenance</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isOverdue ? 'bg-red-100 text-red-800' : 
                        isDueSoon ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {isOverdue ? `En retard de ${Math.abs(daysUntil)} jour(s)` :
                         isDueSoon ? `Dans ${daysUntil} jour(s)` :
                         `Dans ${daysUntil} jour(s)`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{formatDate(template.nextMaintenance)}</p>
                  </div>

                  {/* Métriques */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center bg-white/20 rounded p-2">
                      <div className="text-sm font-bold">{template.maintenanceCount}</div>
                      <div className="text-xs text-gray-600">Maintenances</div>
                    </div>
                    <div className="text-center bg-white/20 rounded p-2">
                      <div className="text-sm font-bold">{template.mtbf}h</div>
                      <div className="text-xs text-gray-600">MTBF</div>
                    </div>
                    <div className="text-center bg-white/20 rounded p-2">
                      <div className="text-sm font-bold">{template.estimatedDuration}min</div>
                      <div className="text-xs text-gray-600">Durée est.</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setModalContent({ type: "maintenance", template })}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-sm"
                    >
                      <Wrench className="w-4 h-4 inline mr-1" />
                      Maintenance
                    </button>
                    <button
                      onClick={() => setModalContent({ type: "details", template })}
                      className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition text-sm"
                    >
                      Détails
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modales */}
          {modalContent.type && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
                >
                  <X size={24} />
                </button>

                {modalContent.type === "add" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Plus className="w-6 h-6" />
                      Nouveau Template de Maintenance
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nom du capteur"
                        className="w-full p-3 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <select className="p-3 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70">
                          <option>Type de maintenance</option>
                          <option>Préventive</option>
                          <option>Corrective</option>
                          <option>Périodique</option>
                          <option>Urgente</option>
                        </select>
                        <select className="p-3 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70">
                          <option>Niveau critique</option>
                          <option>Faible</option>
                          <option>Moyen</option>
                          <option>Élevé</option>
                          <option>Critique</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        placeholder="Localisation"
                        className="w-full p-3 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70"
                      />
                      <textarea
                        placeholder="Description"
                        className="w-full p-3 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70 resize-none"
                        rows={3}
                      />
                      <button className="w-full py-3 bg-gradient-to-br from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:brightness-110 transition">
                        Créer le template
                      </button>
                    </div>
                  </div>
                )}

                {modalContent.type === "maintenance" && modalContent.template && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Wrench className="w-6 h-6" />
                      Maintenance - {modalContent.template.name}
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <h4 className="font-semibold mb-2">Check-list de maintenance:</h4>
                        <ul className="space-y-2">
                          {modalContent.template.checklistItems.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold mb-2">Outils requis:</h4>
                        <div className="flex flex-wrap gap-2">
                          {modalContent.template.requiredTools.map((tool, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-200 rounded text-sm">{tool}</span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Durée estimée</p>
                          <p className="text-lg font-bold">{modalContent.template.estimatedDuration} min</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Coût estimé</p>
                          <p className="text-lg font-bold">{modalContent.template.cost}€</p>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition">
                        Démarrer la maintenance
                      </button>
                    </div>
                  </div>
                )}

                {modalContent.type === "details" && modalContent.template && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Settings className="w-6 h-6" />
                      Détails - {modalContent.template.name}
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Fabricant</p>
                          <p className="font-semibold">{modalContent.template.manufacturer}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Modèle</p>
                          <p className="font-semibold">{modalContent.template.model}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Installation</p>
                          <p className="font-semibold">{formatDate(modalContent.template.installationDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Fin de garantie</p>
                          <p className="font-semibold">{formatDate(modalContent.template.warrantyExpiry)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">MTBF</p>
                          <p className="font-semibold">{modalContent.template.mtbf} heures</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">MTTR</p>
                          <p className="font-semibold">{modalContent.template.mttr} heures</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Description</p>
                        <p className="text-sm bg-gray-50 p-3 rounded-xl">{modalContent.template.description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {modalContent.type === "alerts" && modalContent.template && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6" />
                      Alertes - {modalContent.template.name}
                    </h3>
                    <div className="space-y-3">
                      {modalContent.template.alerts.map((alert, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border-l-4 ${
                          alert.severity === 'Critical' ? 'bg-red-50 border-red-500' :
                          alert.severity === 'Warning' ? 'bg-yellow-50 border-yellow-500' :
                          'bg-blue-50 border-blue-500'
                        }`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{alert.type}</p>
                              <p className="text-sm text-gray-600">{alert.message}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              alert.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            {alert.timestamp.toLocaleString('fr-FR')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TemplatesSection;
