import { useState } from "react";
import { GlassSidebar } from "../components/GlassSidebar";
import { GlassDashboard } from "../components/GlassDashboard";
import {LifeBuoy,  Settings as SettingsIcon,  Users,  Calendar as CalendarIcon,  FileText,  CreditCard,  Shield, Bell, Search, Plus, Download, Edit, Trash2, Eye, Star, TrendingUp, Award, Clock
} from "lucide-react";

// Données simulées enrichies
const MOCK_TEAM_MEMBERS = [
  { name: "Alice Dupont", email: "alice@example.com", role: "Admin", active: true, avatar: "https://i.pravatar.cc/150?img=1", added: "2025-01-10", lastLogin: "2025-08-25", department: "Direction", projects: 12, rating: 4.8 },
  { name: "Bob Martin", email: "bob@example.com", role: "Editor", active: false, avatar: "https://i.pravatar.cc/150?img=2", added: "2025-03-12", lastLogin: "2025-08-20", department: "Marketing", projects: 8, rating: 4.5 },
  { name: "Claire Dubois", email: "claire@example.com", role: "Viewer", active: true, avatar: "https://i.pravatar.cc/150?img=3", added: "2025-02-15", lastLogin: "2025-08-26", department: "Design", projects: 15, rating: 4.9 },
  { name: "David Rousseau", email: "david@example.com", role: "Editor", active: true, avatar: "https://i.pravatar.cc/150?img=4", added: "2025-04-20", lastLogin: "2025-08-24", department: "Développement", projects: 20, rating: 4.7 },
  { name: "Emma Laurent", email: "emma@example.com", role: "Admin", active: true, avatar: "https://i.pravatar.cc/150?img=5", added: "2025-01-05", lastLogin: "2025-08-26", department: "RH", projects: 6, rating: 4.6 },
];

const MOCK_ROLES = [
  { name: "Admin", description: "Accès complet à toutes les fonctionnalités", members: ["Alice Dupont", "Emma Laurent"], created: "2025-01-01", permissions: ["Lecture", "Écriture", "Suppression", "Gestion utilisateurs"], color: "bg-red-100 text-red-800" },
  { name: "Editor", description: "Peut modifier le contenu et collaborer", members: ["Bob Martin", "David Rousseau"], created: "2025-02-15", permissions: ["Lecture", "Écriture", "Commentaires"], color: "bg-blue-100 text-blue-800" },
  { name: "Viewer", description: "Accès en lecture seule", members: ["Claire Dubois"], created: "2025-03-01", permissions: ["Lecture", "Commentaires"], color: "bg-green-100 text-green-800" },
  { name: "Guest", description: "Accès limité temporaire", members: [], created: "2025-06-01", permissions: ["Lecture limitée"], color: "bg-gray-100 text-gray-800" },
];

const MOCK_EVENTS = [
  { title: "Réunion projet Alpha", date: "2025-08-28", time: "10:00", responsible: "Alice Dupont", location: "Salle 101", link: "#", type: "meeting", attendees: 8, priority: "high" },
  { title: "Formation React Avancé", date: "2025-08-29", time: "14:00", responsible: "David Rousseau", location: "Salle 202", link: "#", type: "training", attendees: 12, priority: "medium" },
  { title: "Sprint Review", date: "2025-08-30", time: "09:30", responsible: "Bob Martin", location: "Visioconférence", link: "#", type: "review", attendees: 6, priority: "high" },
  { title: "Présentation client", date: "2025-09-02", time: "15:00", responsible: "Claire Dubois", location: "Salle principale", link: "#", type: "presentation", attendees: 15, priority: "high" },
  { title: "Atelier UX Design", date: "2025-09-03", time: "11:00", responsible: "Emma Laurent", location: "Lab Design", link: "#", type: "workshop", attendees: 10, priority: "medium" },
];

const MOCK_TASKS = [
  { day: "Lundi", title: "Analyse des données Q3", responsible: "Alice Dupont", status: "En cours", priority: "Haute", progress: 75, deadline: "2025-08-30", tags: ["analytics", "urgent"] },
  { day: "Mardi", title: "Mise à jour site web", responsible: "Bob Martin", status: "À faire", priority: "Moyenne", progress: 0, deadline: "2025-09-05", tags: ["web", "content"] },
  { day: "Mercredi", title: "Tests utilisateurs", responsible: "Claire Dubois", status: "En cours", priority: "Haute", progress: 45, deadline: "2025-09-01", tags: ["ux", "testing"] },
  { day: "Jeudi", title: "Optimisation base de données", responsible: "David Rousseau", status: "Terminé", priority: "Moyenne", progress: 100, deadline: "2025-08-25", tags: ["database", "performance"] },
  { day: "Vendredi", title: "Rapport mensuel RH", responsible: "Emma Laurent", status: "En cours", priority: "Basse", progress: 60, deadline: "2025-08-31", tags: ["hr", "report"] },
];

const MOCK_DOCS = [
  { name: "Rapport annuel 2024", type: "PDF", updated: "2025-08-20", owner: "Alice Dupont", size: "2.4 MB", downloads: 45, category: "Rapports" },
  { name: "Contrat client ABC Corp", type: "Word", updated: "2025-08-22", owner: "Bob Martin", size: "856 KB", downloads: 12, category: "Contrats" },
  { name: "Guide style marque", type: "PDF", updated: "2025-08-15", owner: "Claire Dubois", size: "15.2 MB", downloads: 89, category: "Design" },
  { name: "Spécifications techniques", type: "PDF", updated: "2025-08-18", owner: "David Rousseau", size: "3.1 MB", downloads: 23, category: "Technique" },
  { name: "Procédures RH", type: "Word", updated: "2025-08-10", owner: "Emma Laurent", size: "1.2 MB", downloads: 67, category: "RH" },
  { name: "Cahier des charges", type: "PDF", updated: "2025-08-25", owner: "Alice Dupont", size: "4.8 MB", downloads: 34, category: "Projets" },
];

const MOCK_BILLING = [
  { invoice: "INV-2025-001", amount: 1200, date: "2025-08-01", status: "Payé", service: "Abonnement Pro", nextDue: "2025-09-01", method: "Carte bancaire" },
  { invoice: "INV-2025-002", amount: 800, date: "2025-08-10", status: "En attente", service: "Services additionnels", nextDue: "2025-08-25", method: "Virement" },
  { invoice: "INV-2025-003", amount: 2500, date: "2025-07-15", status: "Payé", service: "Formation équipe", nextDue: "-", method: "Carte bancaire" },
  { invoice: "INV-2025-004", amount: 450, date: "2025-08-20", status: "Payé", service: "Stockage supplémentaire", nextDue: "2025-09-20", method: "PayPal" },
];

const MOCK_TEMPLATES = [
  { name: "Rapport de projet", category: "Gestion", uses: 45, rating: 4.8, description: "Template complet pour rapports de projet avec graphiques" },
  { name: "Contrat freelance", category: "Juridique", uses: 23, rating: 4.6, description: "Modèle de contrat pour freelances et consultants" },
  { name: "Présentation commerciale", category: "Ventes", uses: 67, rating: 4.9, description: "Template PowerPoint pour présentations clients" },
  { name: "Fiche produit", category: "Marketing", uses: 89, rating: 4.7, description: "Template pour fiches produits e-commerce" },
  { name: "Plan de formation", category: "RH", uses: 34, rating: 4.5, description: "Structure type pour plans de formation employés" },
];

const MOCK_SUPPORT_TICKETS = [
  { id: "TICKET-001", title: "Problème connexion", status: "Ouvert", priority: "Haute", created: "2025-08-25", category: "Technique" },
  { id: "TICKET-002", title: "Demande nouvelle fonctionnalité", status: "En cours", priority: "Moyenne", created: "2025-08-20", category: "Fonctionnalité" },
  { id: "TICKET-003", title: "Question facturation", status: "Résolu", priority: "Basse", created: "2025-08-18", category: "Facturation" },
];

/**
 * Composant Dashboard principal
 * Affiche le tableau de bord complet avec la barre latérale et le contenu principal
 */
export default function Dashboard() {
  // État pour suivre l'élément actif dans la navigation
  const [activeItem, setActiveItem] = useState("Dashboard");
  
  // État pour suivre la carte sélectionnée pour afficher les détails
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  /**
   * Bascule la sélection d'une carte
   * @param card - Identifiant de la carte à basculer
   */
  const toggleSelectedCard = (card: string) => {
    setSelectedCard(selectedCard === card ? null : card);
  };

  /**
   * Détermine la couleur CSS en fonction du statut
   * @param status - Statut de la tâche
   * @returns Classes CSS pour la couleur de fond et de texte
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terminé": return "bg-green-100 text-green-800";
      case "En cours": return "bg-blue-100 text-blue-800";
      case "À faire": return "bg-orange-100 text-orange-800";
      case "En attente": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  /**
   * Détermine la couleur CSS en fonction de la priorité
   * @param priority - Niveau de priorité
   * @returns Classes CSS pour la couleur de fond et de texte
   */
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute": case "high": return "bg-red-100 text-red-800";
      case "Moyenne": case "medium": return "bg-yellow-100 text-yellow-800";
      case "Basse": case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderCardDetails = (title: string) => {
    switch (title) {
      case "Membres":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Membres de l'équipe</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Inviter
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
              </div>
            </div>
            
            <div className="mb-4 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-3 font-semibold">Membre</th>
                    <th className="px-4 py-3 font-semibold">Département</th>
                    <th className="px-4 py-3 font-semibold">Rôle</th>
                    <th className="px-4 py-3 font-semibold">Projets</th>
                    <th className="px-4 py-3 font-semibold">Note</th>
                    <th className="px-4 py-3 font-semibold">Statut</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TEAM_MEMBERS.map((m, i) => (
                    <tr key={i} className="border-b hover:bg-white/50 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-medium">{m.name}</p>
                            <p className="text-sm text-gray-500">{m.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{m.department}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${MOCK_ROLES.find(r => r.name === m.role)?.color || 'bg-gray-100 text-gray-800'}`}>
                          {m.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">{m.projects}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{m.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${m.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          <span className={`w-2 h-2 rounded-full ${m.active ? "bg-green-500" : "bg-red-500"}`}></span>
                          {m.active ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">💡 Suggestions d'amélioration :</h3>
              <ul className="text-sm space-y-1 text-blue-800">
                <li>• Activez la double authentification pour tous les admins</li>
                <li>• Organisez une formation pour les nouveaux membres</li>
                <li>• Créez des groupes par département pour une meilleure collaboration</li>
              </ul>
            </div>
          </div>
        );

      case "Rôles et Permissions":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Rôles et Permissions</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouveau rôle
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {MOCK_ROLES.map((r, i) => (
                <div key={i} className="border border-white/50 p-4 rounded-xl bg-white/30 hover:bg-white/40 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{r.name}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${r.color}`}>
                        {r.members.length} membre{r.members.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{r.description}</p>
                  
                  <div className="mb-3">
                    <h4 className="font-medium mb-2">Permissions :</h4>
                    <div className="flex flex-wrap gap-1">
                      {r.permissions.map((perm, pi) => (
                        <span key={pi} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Membres :</h4>
                    <p className="text-sm text-gray-600">{r.members.join(", ") || "Aucun membre"}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">🔒 Recommandations sécurité :</h3>
              <ul className="text-sm space-y-1 text-green-800">
                <li>• Révisez les permissions tous les 3 mois</li>
                <li>• Limitez le nombre d'administrateurs</li>
                <li>• Activez les logs d'audit pour tracer les actions</li>
                <li>• Créez un rôle "Stagiaire" pour les accès temporaires</li>
              </ul>
            </div>
          </div>
        );

      case "Événements à venir":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Événements à venir</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouvel événement
              </button>
            </div>
            
            <div className="grid gap-4">
              {MOCK_EVENTS.map((e, i) => (
                <div key={i} className="border border-white/50 p-4 rounded-xl bg-white/30 hover:bg-white/40 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{e.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {e.date} à {e.time}
                        </span>
                        <span>{e.location}</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {e.attendees} participants
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(e.priority)}`}>
                        {e.priority === 'high' ? 'Haute' : e.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {e.type}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">Responsable : {e.responsible}</p>
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
                      Participer
                    </button>
                    <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm">
                      Détails
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold mb-2">📅 Suggestions planning :</h3>
              <ul className="text-sm space-y-1 text-yellow-800">
                <li>• Planifiez un point hebdomadaire d'équipe</li>
                <li>• Organisez des formations techniques mensuelles</li>
                <li>• Prévoyez des rétrospectives après chaque projet</li>
                <li>• Intégrez un système de rappels automatiques</li>
              </ul>
            </div>
          </div>
        );

      case "Planification":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Planification des tâches</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle tâche
              </button>
            </div>
            
            <div className="grid gap-4">
              {MOCK_TASKS.map((t, i) => (
                <div key={i} className="border border-white/50 p-4 rounded-xl bg-white/30 hover:bg-white/40 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{t.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(t.status)}`}>
                          {t.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(t.priority)}`}>
                          {t.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span><strong>{t.day}</strong></span>
                        <span>Responsable : {t.responsible}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Échéance : {t.deadline}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression</span>
                          <span>{t.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all"
                            style={{ width: `${t.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {t.tags.map((tag, ti) => (
                          <span key={ti} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold mb-2">⚡ Optimisation workflow :</h3>
              <ul className="text-sm space-y-1 text-purple-800">
                <li>• Utilisez des templates de tâches récurrentes</li>
                <li>• Automatisez les notifications d'échéance</li>
                <li>• Créez des tableaux Kanban par projet</li>
                <li>• Intégrez un système de time tracking</li>
              </ul>
            </div>
          </div>
        );

      case "Docs partagés":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Documents partagés</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Uploader
                </button>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option>Toutes catégories</option>
                  <option>Rapports</option>
                  <option>Contrats</option>
                  <option>Design</option>
                  <option>Technique</option>
                </select>
              </div>
            </div>
            
            <div className="grid gap-3">
              {MOCK_DOCS.map((d, i) => (
                <div key={i} className="flex items-center justify-between border border-white/50 p-4 rounded-xl bg-white/30 hover:bg-white/40 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{d.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{d.type} • {d.size}</span>
                        <span>Modifié le {d.updated}</span>
                        <span>Par {d.owner}</span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {d.downloads}
                        </span>
                      </div>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs mt-1">
                        {d.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">📁 Gestion documentaire :</h3>
              <ul className="text-sm space-y-1 text-blue-800">
                <li>• Créez une structure de dossiers par projet</li>
                <li>• Mettez en place un système de versioning</li>
                <li>• Définissez des règles de nommage claires</li>
                <li>• Activez la signature électronique pour les contrats</li>
              </ul>
            </div>
          </div>
        );

      case "Modèles":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Modèles et Templates</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Créer template
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {MOCK_TEMPLATES.map((t, i) => (
                <div key={i} className="border border-white/50 p-4 rounded-xl bg-white/30 hover:bg-white/40 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{t.name}</h3>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {t.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{t.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{t.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {t.uses} utilisations
                    </span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
                        Utiliser
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm">
                        Aperçu
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold mb-2">🎨 Idées de nouveaux templates :</h3>
              <ul className="text-sm space-y-1 text-indigo-800">
                <li>• Template de réunion one-on-one</li>
                <li>• Modèle d'évaluation employé</li>
                <li>• Template de brief créatif</li>
                <li>• Modèle de plan de projet Agile</li>
              </ul>
            </div>
          </div>
        );

      case "Factures":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Factures et Paiements</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Nouvelle facture
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-3 font-semibold">Facture</th>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Montant</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Méthode</th>
                    <th className="px-4 py-3 font-semibold">Statut</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_BILLING.map((b, i) => (
                    <tr key={i} className="border-b hover:bg-white/50 transition">
                      <td className="px-4 py-3 font-medium">{b.invoice}</td>
                      <td className="px-4 py-3">{b.service}</td>
                      <td className="px-4 py-3 font-semibold">{b.amount} €</td>
                      <td className="px-4 py-3">{b.date}</td>
                      <td className="px-4 py-3">{b.method}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">Total payé</h3>
                <p className="text-2xl font-bold text-green-600">4,150 €</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-800">En attente</h3>
                <p className="text-2xl font-bold text-yellow-600">800 €</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">Prochain paiement</h3>
                <p className="text-sm text-blue-600">1,200 € le 01/09/2025</p>
              </div>
            </div>
          </div>
        );

      case "Abonnements":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <h2 className="text-xl font-bold mb-6">Gestion des abonnements</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {MOCK_BILLING.filter(b => b.nextDue !== "-").map((b, i) => (
                <div key={i} className="p-4 bg-white/60 backdrop-blur-xl rounded-2xl shadow border border-white/40">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold mb-1">{b.service}</h3>
                      <p className="text-sm text-gray-600">{b.invoice}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-2xl font-bold">{b.amount} €<span className="text-sm font-normal text-gray-500">/mois</span></p>
                    <p className="text-sm text-gray-600">Prochain paiement : {b.nextDue}</p>
                    <p className="text-sm text-gray-600">Mode : {b.method}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">
                      Renouveler
                    </button>
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
                      Modifier
                    </button>
                    <button className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm">
                      Annuler
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold mb-2">💰 Optimisation des coûts :</h3>
              <ul className="text-sm space-y-1 text-orange-800">
                <li>• Considérez un abonnement annuel pour économiser 20%</li>
                <li>• Évaluez l'utilisation réelle de chaque service</li>
                <li>• Négociez un tarif groupe pour plusieurs licences</li>
                <li>• Configurez des alertes de renouvellement</li>
              </ul>
            </div>
          </div>
        );

      case "Profil Utilisateur":
        { const MOCK_USER_PROFILE = {
          name: "Alice Dupont",
          email: "alice@example.com",
          role: "Admin",
          joined: "2025-01-10",
          lastLogin: "2025-08-25",
          avatar: "https://i.pravatar.cc/150?img=3",
          phone: "+261 34 12 345 67",
          address: "Antananarivo, Madagascar",
          department: "Direction",
          projects: 12,
          rating: 4.8,
          loginStreak: 45,
          totalHours: 340
        };

        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <div className="relative">
                <img
                  src={MOCK_USER_PROFILE.avatar}
                  alt={MOCK_USER_PROFILE.name}
                  className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{MOCK_USER_PROFILE.name}</h2>
                <p className="text-lg text-gray-600 mb-4">{MOCK_USER_PROFILE.role} • {MOCK_USER_PROFILE.department}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">{MOCK_USER_PROFILE.projects}</p>
                    <p className="text-sm text-gray-500">Projets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{MOCK_USER_PROFILE.rating}</p>
                    <p className="text-sm text-gray-500">Note moyenne</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{MOCK_USER_PROFILE.loginStreak}</p>
                    <p className="text-sm text-gray-500">Jours consécutifs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{MOCK_USER_PROFILE.totalHours}h</p>
                    <p className="text-sm text-gray-500">Temps total</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informations personnelles</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p>{MOCK_USER_PROFILE.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Téléphone</label>
                    <p>{MOCK_USER_PROFILE.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Adresse</label>
                    <p>{MOCK_USER_PROFILE.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informations compte</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Membre depuis</label>
                    <p>{MOCK_USER_PROFILE.joined}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Dernière connexion</label>
                    <p>{MOCK_USER_PROFILE.lastLogin}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Statut</label>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      En ligne
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <button className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition text-center">
                <Edit className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                <p className="font-medium">Modifier le profil</p>
              </button>
              <button className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="font-medium">Sécurité</p>
              </button>
              <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition text-center">
                <Bell className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="font-medium">Notifications</p>
              </button>
            </div>

            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <h3 className="font-semibold mb-2">🏆 Badges et réalisations :</h3>
              <div className="flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <Award className="w-4 h-4" />
                  Expert technique
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <Star className="w-4 h-4" />
                  Mentor de l'année
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <TrendingUp className="w-4 h-4" />
                  Leader projet
                </span>
              </div>
            </div>
          </div>
        ); }

      case "Support Technique":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Support Technique</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouveau ticket
              </button>
            </div>
            
            <div className="grid gap-4 mb-6">
              {MOCK_SUPPORT_TICKETS.map((ticket, i) => (
                <div key={i} className="border border-white/50 p-4 rounded-xl bg-white/30 hover:bg-white/40 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{ticket.title}</h3>
                      <p className="text-sm text-gray-600">#{ticket.id} • {ticket.category}</p>
                      <p className="text-sm text-gray-500">Créé le {ticket.created}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-3">🔗 Liens utiles</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-blue-600 hover:underline">Base de connaissances</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Guides d'utilisation</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">FAQ</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Vidéos tutoriels</a></li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-3">📞 Contact direct</h3>
                <ul className="space-y-2 text-sm">
                  <li>Email : support@exemple.com</li>
                  <li>Téléphone : +33 1 23 45 67 89</li>
                  <li>Chat en direct : Disponible 9h-18h</li>
                  <li>Urgences : 24h/24, 7j/7</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "Documentation":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
            <h2 className="text-xl font-bold mb-6">Documentation</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 border border-white/50 rounded-xl bg-white/30 hover:bg-white/40 transition cursor-pointer">
                <h3 className="font-semibold mb-2">Guide de démarrage</h3>
                <p className="text-sm text-gray-600">Premiers pas avec la plateforme</p>
              </div>
              <div className="p-4 border border-white/50 rounded-xl bg-white/30 hover:bg-white/40 transition cursor-pointer">
                <h3 className="font-semibold mb-2">API Documentation</h3>
                <p className="text-sm text-gray-600">Intégrez vos outils externes</p>
              </div>
              <div className="p-4 border border-white/50 rounded-xl bg-white/30 hover:bg-white/40 transition cursor-pointer">
                <h3 className="font-semibold mb-2">Bonnes pratiques</h3>
                <p className="text-sm text-gray-600">Optimisez votre workflow</p>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold mb-2">📚 Ressources recommandées :</h3>
              <ul className="text-sm space-y-1 text-yellow-800">
                <li>• Webinaire mensuel "Nouvelles fonctionnalités"</li>
                <li>• Cours en ligne certifiants</li>
                <li>• Communauté d'entraide</li>
                <li>• Blog avec cas d'usage</li>
              </ul>
            </div>
          </div>
        );

      case "Sécurité et Authentification":
        return (
          <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
      <h2 className="text-2xl font-bold mb-6">⚙️ Sécurité et Authentification</h2>

      <div className="space-y-6">
        {/* Actions de sécurité */}
        <div>
          <h3 className="text-lg font-semibold mb-3">🔑 Actions de sécurité</h3>

          {/* Changer le mot de passe */}
          <div className="p-4 border rounded-lg hover:shadow-md transition mb-3">
            <h4 className="font-semibold">🔑 Changer le mot de passe</h4>
            <p className="text-sm mt-1"><strong>But :</strong> Permettre à l’utilisateur de modifier son mot de passe actuel.</p>
            <p className="text-sm mt-1"><strong>Contenu typique :</strong></p>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              <li>Saisie du mot de passe actuel (vérification de l’identité).</li>
              <li>Saisie d’un nouveau mot de passe (longueur minimale, chiffres, majuscules, caractères spéciaux).</li>
              <li>Confirmation du nouveau mot de passe.</li>
              <li>Bouton <strong>Enregistrer</strong>.</li>
            </ul>
            <p className="text-sm mt-1"><strong>Comportement :</strong> Une fois validé, toutes les sessions actives peuvent être déconnectées pour sécuriser le compte.</p>
          </div>

          {/* Mettre à jour le mot de passe principal */}
          <div className="p-4 border rounded-lg hover:shadow-md transition mb-3">
            <h4 className="font-semibold">🔄 Mettre à jour votre mot de passe principal</h4>
            <p className="text-sm mt-1"><strong>But :</strong> Renforcer la sécurité en remplaçant le mot de passe par un nouveau, surtout après une suspicion de fuite.</p>
            <p className="text-sm mt-1"><strong>Contenu typique :</strong></p>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              <li>Vérification par authentification à deux facteurs (2FA) (SMS, App).</li>
              <li>Création d’un nouveau mot de passe principal.</li>
              <li>Confirmation obligatoire.</li>
              <li>Option d’envoyer un email de confirmation à l’utilisateur.</li>
            </ul>
            <p className="text-sm mt-1"><strong>Comportement :</strong> Si activé, toutes les sessions existantes sont invalidées → l’utilisateur doit se reconnecter partout.</p>
          </div>
        </div>

        {/* Sécurité et historique */}
        <div>
          <h3 className="text-lg font-semibold mb-3">🔒 Sécurité et historique</h3>

          {/* Voir toutes les connexions récentes */}
          <div className="p-4 border rounded-lg hover:shadow-md transition mb-3">
            <h4 className="font-semibold">📜 Voir toutes vos connexions récentes</h4>
            <p className="text-sm mt-1"><strong>But :</strong> Afficher l’historique des connexions au compte.</p>
            <p className="text-sm mt-1"><strong>Contenu typique :</strong></p>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              <li>📍 Localisation (ville, pays)</li>
              <li>🖥️ Type d’appareil (PC, iPhone, Android)</li>
              <li>🌐 Navigateur utilisé (Chrome, Safari, Edge…)</li>
              <li>⏰ Date et heure</li>
              <li>⚠️ Icône si connexion suspecte</li>
            </ul>
            <p className="text-sm mt-1"><strong>Comportement :</strong> L’utilisateur peut signaler une activité suspecte et déclencher un changement de mot de passe immédiat.</p>
          </div>

          {/* Déconnecter des appareils spécifiques */}
          <div className="p-4 border rounded-lg hover:shadow-md transition mb-3">
            <h4 className="font-semibold">📱 Déconnecter des appareils spécifiques</h4>
            <p className="text-sm mt-1"><strong>But :</strong> Permettre à l’utilisateur de gérer les sessions actives.</p>
            <p className="text-sm mt-1"><strong>Contenu typique :</strong></p>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              <li>Liste des appareils connectés (nom, OS, localisation, dernier accès)</li>
              <li>Bouton Déconnecter à côté de chaque appareil</li>
              <li>Option "Déconnecter de tous les appareils" (sauf celui en cours)</li>
            </ul>
            <p className="text-sm mt-1"><strong>Comportement :</strong> Une fois un appareil déconnecté, il faut ressaisir les identifiants + 2FA pour s’y reconnecter.</p>
          </div>

          {/* Générer de nouveaux codes de sauvegarde */}
          <div className="p-4 border rounded-lg hover:shadow-md transition">
            <h4 className="font-semibold">🛡️ Générer de nouveaux codes de sauvegarde</h4>
            <p className="text-sm mt-1"><strong>But :</strong> Fournir des codes de récupération en cas de perte d’accès au 2FA.</p>
            <p className="text-sm mt-1"><strong>Contenu typique :</strong></p>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              <li>Génération d’une liste de 10 codes uniques à usage unique</li>
              <li>Option pour télécharger (PDF/TXT) ou imprimer les codes</li>
              <li>Message : "Ces codes doivent être conservés en lieu sûr. Chaque code ne peut être utilisé qu’une seule fois."</li>
            </ul>
            <p className="text-sm mt-1"><strong>Comportement :</strong> L’ancienne série de codes est automatiquement invalidée.</p>
          </div>
        </div>
      </div>
    </div>

        );

      default:
        return null;
    }
  };

  const renderContent = () => {
    const sectionsMap: Record<string, string[]> = {
      help: ["Support Technique", "Documentation"],
      settings: ["Profil Utilisateur", "Sécurité et Authentification"],
      team: ["Membres", "Rôles et Permissions"],
      calendar: ["Événements à venir", "Planification"],
      documents: ["Docs partagés", "Modèles"],
      billing: ["Factures", "Abonnements"],
    };

    if (activeItem in sectionsMap) {
      const sections = sectionsMap[activeItem];
      return (
        <div className="flex-1 min-h-screen relative bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 overflow-y-auto p-8">
          <div className="relative z-10 max-w-6xl mx-auto bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl p-8">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
              {activeItem === "help" && <LifeBuoy className="w-7 h-7 text-indigo-600" />}
              {activeItem === "settings" && <SettingsIcon className="w-7 h-7 text-gray-700" />}
              {activeItem === "team" && <Users className="w-7 h-7 text-green-600" />}
              {activeItem === "calendar" && <CalendarIcon className="w-7 h-7 text-orange-500" />}
              {activeItem === "documents" && <FileText className="w-7 h-7 text-blue-500" />}
              {activeItem === "billing" && <CreditCard className="w-7 h-7 text-purple-600" />}
              {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
            </h1>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
              {sections.map((section) => (
                <div
                  key={section}
                  className={`p-6 rounded-xl border shadow cursor-pointer transform transition hover:scale-105 hover:shadow-xl active:scale-95 backdrop-blur-sm
                    ${selectedCard === section ? "bg-indigo-100/80 border-indigo-400 shadow-indigo-200" : "bg-white/50 border-white/60 hover:bg-white/60"}`}
                  onClick={() => toggleSelectedCard(section)}
                >
                  <h2 className="text-lg font-semibold mb-2">{section}</h2>
                  <p className="text-sm text-gray-600">
                    {section === "Membres" && "Gérez votre équipe et leurs accès"}
                    {section === "Rôles et Permissions" && "Définissez les niveaux d'accès"}
                    {section === "Événements à venir" && "Planifiez et suivez vos événements"}
                    {section === "Planification" && "Organisez vos tâches et projets"}
                    {section === "Docs partagés" && "Centralisez vos documents"}
                    {section === "Modèles" && "Utilisez des templates prêts"}
                    {section === "Factures" && "Suivez vos paiements"}
                    {section === "Abonnements" && "Gérez vos souscriptions"}
                    {section === "Profil Utilisateur" && "Personnalisez votre compte"}
                    {section === "Support Technique" && "Obtenez de l'aide"}
                    {section === "Documentation" && "Consultez les guides"}
                    {section === "Sécurité et Authentification" && "Protégez votre compte"}
                  </p>
                </div>
              ))}
            </div>
            {selectedCard && renderCardDetails(selectedCard)}
          </div>
        </div>
      );
    }

    return <GlassDashboard />;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(156,146,172,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>
      <div className="relative z-20">
        <GlassSidebar
          activeItem={activeItem}
          onItemClick={(item) => {
            setActiveItem(item);
            setSelectedCard(null);
          }}
        />
      </div>
      <div className="relative z-10 flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
}