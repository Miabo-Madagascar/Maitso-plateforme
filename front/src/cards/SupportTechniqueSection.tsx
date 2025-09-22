// SupportTechniqueSection.tsx
import React, { useState } from 'react';
import { Plus, Search, BookOpen, HelpCircle, Phone, Video, AlertTriangle, Clock } from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  category: string;
  created: string;
  status: string;
  priority: string;
  description?: string;
  sensorType?: string;
}

interface SupportTechniqueSectionProps {
  supportTickets?: SupportTicket[];
  getStatusColor?: (status: string) => string;
  getPriorityColor?: (priority: string) => string;
  onNewTicket?: (ticket: Omit<SupportTicket, 'id' | 'created'>) => void;
}

const SupportTechniqueSection: React.FC<SupportTechniqueSectionProps> = ({
  supportTickets = [],
  getStatusColor = () => "bg-gray-100 text-gray-800",
  getPriorityColor = () => "bg-gray-100 text-gray-800",
  onNewTicket
}) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: '',
    priority: 'Moyenne',
    description: '',
    sensorType: '',
    status: 'Ouvert'
  });

  // Tickets mock par défaut si aucun ticket n'est passé
  const MOCK_TICKETS: SupportTicket[] = [
    {
      id: 'TCK-001',
      title: 'Capteur température ne répond plus',
      category: 'Problème de capteur',
      created: '2025-09-10',
      status: 'Ouvert',
      priority: 'Haute',
      description: 'Le capteur de température du bureau ne transmet plus de données depuis 2h.',
      sensorType: 'Température'
    },
    {
      id: 'TCK-002',
      title: 'Erreur de calibration',
      category: 'Configuration',
      created: '2025-09-12',
      status: 'En cours',
      priority: 'Moyenne',
      description: 'Impossible de calibrer le capteur d’humidité, message d’erreur affiché.',
      sensorType: 'Humidité'
    },
    {
      id: 'TCK-003',
      title: 'Facturation incorrecte',
      category: 'Facturation',
      created: '2025-09-15',
      status: 'Résolu',
      priority: 'Critique',
      description: 'La dernière facture ne correspond pas au nombre de capteurs actifs.',
      sensorType: 'Énergie'
    }
  ];

  const categories = [
    'Problème de capteur',
    'Erreur de données',
    'Configuration',
    'Connexion',
    'Facturation',
    'Autre'
  ];

  const sensorTypes = [
    'Température',
    'Humidité',
    'Pression',
    'Qualité air',
    'Vibration',
    'Énergie',
    'Autre'
  ];

  const priorities = ['Basse', 'Moyenne', 'Haute', 'Critique'];

  const filteredTickets = (supportTickets.length > 0 ? supportTickets : MOCK_TICKETS).filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNewTicket) {
      onNewTicket(newTicket);
      setNewTicket({
        title: '',
        category: '',
        priority: 'Moyenne',
        description: '',
        sensorType: '',
        status: 'Ouvert'
      });
      setShowForm(false);
    }
  };

  const stats = {
    open: supportTickets.filter(t => t.status === 'Ouvert').length,
    inProgress: supportTickets.filter(t => t.status === 'En cours').length,
    resolved: supportTickets.filter(t => t.status === 'Résolu').length,
    urgent: supportTickets.filter(t => t.priority === 'Critique').length
  };

  return (
    <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Support Technique Capteurs</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nouveau ticket
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.open}</div>
          <div className="text-sm">Ouverts</div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-700">{stats.inProgress}</div>
          <div className="text-sm">En cours</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-700">{stats.resolved}</div>
          <div className="text-sm">Résolus</div>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-700">{stats.urgent}</div>
          <div className="text-sm">Urgents</div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un ticket..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="Ouvert">Ouvert</option>
          <option value="En cours">En cours</option>
          <option value="Résolu">Résolu</option>
          <option value="Fermé">Fermé</option>
        </select>
      </div>
      
      {/* Liste des tickets */}
      <div className="grid gap-4 mb-6">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket, i) => (
            <div key={i} className="border border-white/50 p-4 rounded-xl bg-white/30 hover:bg-white/40 transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{ticket.title}</h3>
                  <p className="text-sm text-gray-600">#{ticket.id} • {ticket.category}</p>
                  {ticket.sensorType && (
                    <p className="text-sm text-gray-600">Capteur: {ticket.sensorType}</p>
                  )}
                  <p className="text-sm text-gray-500">Créé le {ticket.created}</p>
                  {ticket.description && (
                    <p className="text-sm mt-2 text-gray-700">{ticket.description.substring(0, 100)}...</p>
                  )}
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
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucun ticket ne correspond à vos critères de recherche.
          </div>
        )}
      </div>

      {/* Ressources et contact */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Ressources techniques
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Guide d'installation des capteurs
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Dépannage des problèmes courants
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                <Video className="w-4 h-4" />
                Tutoriels de calibration
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                FAQ sur les erreurs de données
              </a>
            </li>
          </ul>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Support technique
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Lun-Ven: 8h-18h | Sam: 9h-12h</span>
            </li>
            <li>Email : support@capteurs.com</li>
            <li>Téléphone : +33 1 23 45 67 89</li>
            <li>Chat en direct : Disponible aux heures d'ouverture</li>
            <li className="flex items-center gap-2 mt-3">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-red-600">Urgences techniques : 24h/24</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Formulaire de nouveau ticket */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Nouveau ticket de support</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sujet du problème</label>
                  <input
                    type="text"
                    required
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Décrivez brièvement le problème"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de capteur</label>
                  <select
                    value={newTicket.sensorType}
                    onChange={(e) => setNewTicket({...newTicket, sensorType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Sélectionnez un type de capteur</option>
                    {sensorTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select
                    required
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {priorities.map(prio => (
                      <option key={prio} value={prio}>{prio}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description détaillée</label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Décrivez le problème en détail, incluez les messages d'erreur, etc."
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Créer le ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTechniqueSection;