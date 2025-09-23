import type { SensorPoint, SensorStatus, Thresholds } from "./types";

export const MOCK_TEAM_MEMBERS = [
  { name: "Alice Dupont", email: "alice@example.com", role: "Admin", active: true, avatar: "https://i.pravatar.cc/150?img=1", added: "2025-01-10", lastLogin: "2025-08-25", department: "Direction", projects: 12, rating: 4.8 },
  { name: "Bob Martin", email: "bob@example.com", role: "Editor", active: false, avatar: "https://i.pravatar.cc/150?img=2", added: "2025-03-12", lastLogin: "2025-08-20", department: "Marketing", projects: 8, rating: 4.5 },
  { name: "Claire Dubois", email: "claire@example.com", role: "Viewer", active: true, avatar: "https://i.pravatar.cc/150?img=3", added: "2025-02-15", lastLogin: "2025-08-26", department: "Design", projects: 15, rating: 4.9 },
  { name: "David Rousseau", email: "david@example.com", role: "Editor", active: true, avatar: "https://i.pravatar.cc/150?img=4", added: "2025-04-20", lastLogin: "2025-08-24", department: "Développement", projects: 20, rating: 4.7 },
  { name: "Emma Laurent", email: "emma@example.com", role: "Admin", active: true, avatar: "https://i.pravatar.cc/150?img=5", added: "2025-01-05", lastLogin: "2025-08-26", department: "RH", projects: 6, rating: 4.6 },
];

export const MOCK_ROLES = [
  { name: "Admin", description: "Accès complet à toutes les fonctionnalités", members: ["Alice Dupont", "Emma Laurent"], created: "2025-01-01", permissions: ["Lecture", "Écriture", "Suppression", "Gestion utilisateurs"], color: "bg-red-100 text-red-800" },
  { name: "Editor", description: "Peut modifier le contenu et collaborer", members: ["Bob Martin", "David Rousseau"], created: "2025-02-15", permissions: ["Lecture", "Écriture", "Commentaires"], color: "bg-blue-100 text-blue-800" },
  { name: "Viewer", description: "Accès en lecture seule", members: ["Claire Dubois"], created: "2025-03-01", permissions: ["Lecture", "Commentaires"], color: "bg-green-100 text-green-800" },
  { name: "Guest", description: "Accès limité temporaire", members: [], created: "2025-06-01", permissions: ["Lecture limitée"], color: "bg-gray-100 text-gray-800" },
];

export const MOCK_EVENTS = [
  { title: "Réunion projet Alpha", date: "2025-08-28", time: "10:00", responsible: "Alice Dupont", location: "Salle 101", link: "#", type: "meeting", attendees: 8, priority: "high" },
  { title: "Formation React Avancé", date: "2025-08-29", time: "14:00", responsible: "David Rousseau", location: "Salle 202", link: "#", type: "training", attendees: 12, priority: "medium" },
  { title: "Sprint Review", date: "2025-08-30", time: "09:30", responsible: "Bob Martin", location: "Visioconférence", link: "#", type: "review", attendees: 6, priority: "high" },
  { title: "Présentation client", date: "2025-09-02", time: "15:00", responsible: "Claire Dubois", location: "Salle principale", link: "#", type: "presentation", attendees: 15, priority: "high" },
  { title: "Atelier UX Design", date: "2025-09-03", time: "11:00", responsible: "Emma Laurent", location: "Lab Design", link: "#", type: "workshop", attendees: 10, priority: "medium" },
];

export const MOCK_TASKS = [
  { day: "Lundi", title: "Analyse des données Q3", responsible: "Alice Dupont", status: "En cours", priority: "Haute", progress: 75, deadline: "2025-08-30", tags: ["analytics", "urgent"] },
  { day: "Mardi", title: "Mise à jour site web", responsible: "Bob Martin", status: "À faire", priority: "Moyenne", progress: 0, deadline: "2025-09-05", tags: ["web", "content"] },
  { day: "Mercredi", title: "Tests utilisateurs", responsible: "Claire Dubois", status: "En cours", priority: "Haute", progress: 45, deadline: "2025-09-01", tags: ["ux", "testing"] },
  { day: "Jeudi", title: "Optimisation base de données", responsible: "David Rousseau", status: "Terminé", priority: "Moyenne", progress: 100, deadline: "2025-08-25", tags: ["database", "performance"] },
  { day: "Vendredi", title: "Rapport mensuel RH", responsible: "Emma Laurent", status: "En cours", priority: "Basse", progress: 60, deadline: "2025-08-31", tags: ["hr", "report"] },
];

export const MOCK_DOCS = [
  { name: "Rapport annuel 2024", type: "PDF", updated: "2025-08-20", owner: "Alice Dupont", size: "2.4 MB", downloads: 45, category: "Rapports" },
  { name: "Contrat client ABC Corp", type: "Word", updated: "2025-08-22", owner: "Bob Martin", size: "856 KB", downloads: 12, category: "Contrats" },
  { name: "Guide style marque", type: "PDF", updated: "2025-08-15", owner: "Claire Dubois", size: "15.2 MB", downloads: 89, category: "Design" },
  { name: "Spécifications techniques", type: "PDF", updated: "2025-08-18", owner: "David Rousseau", size: "3.1 MB", downloads: 23, category: "Technique" },
  { name: "Procédures RH", type: "Word", updated: "2025-08-10", owner: "Emma Laurent", size: "1.2 MB", downloads: 67, category: "RH" },
  { name: "Cahier des charges", type: "PDF", updated: "2025-08-25", owner: "Alice Dupont", size: "4.8 MB", downloads: 34, category: "Projets" },
];

export const MOCK_BILLING = [
  { invoice: "INV-2025-001", amount: 1200, date: "2025-08-01", status: "Payé", service: "Abonnement Pro", nextDue: "2025-09-01", method: "Carte bancaire" },
  { invoice: "INV-2025-002", amount: 800, date: "2025-08-10", status: "En attente", service: "Services additionnels", nextDue: "2025-08-25", method: "Virement" },
  { invoice: "INV-2025-003", amount: 2500, date: "2025-07-15", status: "Payé", service: "Formation équipe", nextDue: "-", method: "Carte bancaire" },
  { invoice: "INV-2025-004", amount: 450, date: "2025-08-20", status: "Payé", service: "Stockage supplémentaire", nextDue: "2025-09-20", method: "PayPal" },
];

export const MOCK_TEMPLATES = [
  { name: "Rapport de projet", category: "Gestion", uses: 45, rating: 4.8, description: "Template complet pour rapports de projet avec graphiques" },
  { name: "Contrat freelance", category: "Juridique", uses: 23, rating: 4.6, description: "Modèle de contrat pour freelances et consultants" },
  { name: "Présentation commerciale", category: "Ventes", uses: 67, rating: 4.9, description: "Template PowerPoint pour présentations clients" },
  { name: "Fiche produit", category: "Marketing", uses: 89, rating: 4.7, description: "Template pour fiches produits e-commerce" },
  { name: "Plan de formation", category: "RH", uses: 34, rating: 4.5, description: "Structure type pour plans de formation employés" },
];

export const MOCK_SUPPORT_TICKETS = [
  { id: "TICKET-001", title: "Problème connexion", status: "Ouvert", priority: "Haute", created: "2025-08-25", category: "Technique" },
  { id: "TICKET-002", title: "Demande nouvelle fonctionnalité", status: "En cours", priority: "Moyenne", created: "2025-08-20", category: "Fonctionnalité" },
  { id: "TICKET-003", title: "Question facturation", status: "Résolu", priority: "Basse", created: "2025-08-18", category: "Facturation" },
];
// Corrigez la structure pour avoir un objet unique avec toutes les propriétés
export const MOCK_USER_PROFILE = {
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


export function genSeries(base: number, spread: number, len = 30, decimals = 0): SensorPoint[] {
  const out: SensorPoint[] = [];
  let value = base;
  for (let i = 0; i < len; i++) {
    value += (Math.random() - 0.5) * spread;
    const day = new Date();
    day.setDate(day.getDate() - (len - 1 - i));
    out.push({ t: day.toISOString().slice(0, 10), v: parseFloat(value.toFixed(decimals)) });
  }
  return out;
}

export const mockData: Record<string, SensorPoint[]> = {
  temperature: genSeries(22, 2.8, 30, 1),
  humidity: genSeries(55, 8, 30, 0),
  co2: genSeries(520, 120, 30, 0),
  noise: genSeries(42, 8, 30, 0),
  pm25: genSeries(18, 12, 30, 0),
  pm10: genSeries(26, 15, 30, 0),
  no2: genSeries(28, 10, 30, 0),
  o3: genSeries(35, 12, 30, 0)
};

export const defaultThresholds: Thresholds = {
  temperature: { min: 20, max: 26 },
  humidity: { min: 35, max: 60 },
  co2: { warn: 800, danger: 1200 },
  noise: { warn: 55, danger: 70 },
  pm25: { who: 15, local: 35 },
  pm10: { who: 45, local: 50 },
  no2: { who: 25, local: 40 },
  o3: { who: 60, local: 100 }
};

export const mockSensors: SensorStatus[] = [
  { id: "S-01", name: "Hall - Nord", online: true, battery: 87, firmware: "1.4.2", lastSeen: "il y a 2 min", calibrated: true, rssi: 82 },
  { id: "S-02", name: "Atelier - Est", online: true, battery: 64, firmware: "1.4.2", lastSeen: "il y a 5 min", calibrated: false, rssi: 61 },
  { id: "S-03", name: "Bureau - Ouest", online: false, battery: 0, firmware: "1.3.9", lastSeen: "il y a 2 h", calibrated: true, rssi: 0 },
  { id: "001", name: "Capteur Température", online: true, rssi: -42, battery: 87, firmware: "v1.2", calibrated: true, lastSeen: "10:30" },
  { id: "002", name: "Capteur Humidité", online: false, rssi: -68, battery: 55, firmware: "v1.1", calibrated: false, lastSeen: "09:45" },
  { id: "003", name: "Capteur Pression", online: true, rssi: -50, battery: 92, firmware: "v1.3", calibrated: true, lastSeen: "11:05" },
];

export const activityData = [
  { month: "JAN", value: 350, growth: 12 },
  { month: "FEV", value: 180, growth: 20 },
  { month: "MAR", value: 200, growth: 11 },
  { month: "APR", value: 170, growth: -15 },
  { month: "MAY", value: 250, growth: 47 },
  { month: "JUN", value: 280, growth: 12 },
  { month: "JUL", value: 290, growth: 4 },
  { month: "AUG", value: 240, growth: -17 },
  { month: "SEP", value: 260, growth: 8 },
  { month: "OCT", value: 320, growth: 23 },
  { month: "NOV", value: 350, growth: 9 },
  { month: "DEC", value: 380, growth: 9 }
];