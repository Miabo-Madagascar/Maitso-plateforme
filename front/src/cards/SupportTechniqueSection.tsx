import React, { useState } from 'react';
import { Plus, Search, BookOpen, HelpCircle, Phone, Video, AlertTriangle, Clock, MessageCircle , Star, Paperclip, Users, TrendingUp, Zap, CheckCircle, X } from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  category: string;
  created: string;
  status: string;
  priority: string;
  description?: string;
  sensorType?: string;
  assignedTo?: string;
  responseTime?: string;
  rating?: number;
  attachments?: string[];
  lastUpdate?: string;
}

interface SupportTechniqueSectionProps {
  supportTickets?: SupportTicket[];
  getStatusColor?: (status: string) => string;
  getPriorityColor?: (priority: string) => string;
  onNewTicket?: (ticket: Omit<SupportTicket, 'id' | 'created'>) => void;
}

const SupportTechniqueSection: React.FC<SupportTechniqueSectionProps> = ({
  supportTickets = [],
  getStatusColor = (status: string) => {
    switch (status) {
      case 'Ouvert': return 'bg-blue-100/70 text-blue-900';
      case 'En cours': return 'bg-yellow-100/70 text-yellow-900';
      case 'Résolu': return 'bg-green-100/70 text-green-900';
      case 'Fermé': return 'bg-gray-100/70 text-gray-800';
      default: return 'bg-gray-100/70 text-gray-800';
    }
  },
  getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critique': return 'bg-red-100/70 text-red-900';
      case 'Haute': return 'bg-orange-100/70 text-orange-900';
      case 'Moyenne': return 'bg-yellow-100/70 text-yellow-900';
      case 'Basse': return 'bg-green-100/70 text-green-900';
      default: return 'bg-gray-100/70 text-gray-800';
    }
  },
  onNewTicket
}) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: '',
    priority: 'Moyenne',
    description: '',
    sensorType: '',
    status: 'Ouvert'
  });

  // Mock data enrichi
  const MOCK_TICKETS: SupportTicket[] = [
    {
      id: 'TCK-001',
      title: 'Capteur température ne répond plus',
      category: 'Problème de capteur',
      created: '2025-10-15',
      status: 'Ouvert',
      priority: 'Haute',
      description: 'Le capteur de température du bureau ne transmet plus de données depuis 2h.',
      sensorType: 'Température',
      assignedTo: 'Sophie Martin',
      responseTime: '< 2h',
      attachments: ['screenshot.png', 'error_log.txt'],
      lastUpdate: '2025-10-15 14:30'
    },
    {
      id: 'TCK-002',
      title: 'Erreur de calibration',
      category: 'Configuration',
      created: '2025-10-12',
      status: 'En cours',
      priority: 'Moyenne',
      description: 'Impossible de calibrer le capteur d\'humidité, message d\'erreur affiché.',
      sensorType: 'Humidité',
      assignedTo: 'Pierre Dubois',
      responseTime: '< 4h',
      rating: 4,
      lastUpdate: '2025-10-14 09:15'
    },
    {
      id: 'TCK-003',
      title: 'Facturation incorrecte',
      category: 'Facturation',
      created: '2025-10-10',
      status: 'Résolu',
      priority: 'Critique',
      description: 'La dernière facture ne correspond pas au nombre de capteurs actifs.',
      sensorType: 'Énergie',
      assignedTo: 'Marie Leblanc',
      responseTime: '< 1h',
      rating: 5,
      lastUpdate: '2025-10-11 16:45'
    }
  ];

  const categories = [
    'Problème de capteur',
    'Erreur de données',
    'Configuration',
    'Connectivité',
    'Facturation',
    'Installation',
    'Maintenance',
    'Autre'
  ];

  const sensorTypes = [
    'Température',
    'Humidité',
    'Pression',
    'Qualité air',
    'Vibration',
    'Luminosité',
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

  const tickets = supportTickets.length > 0 ? supportTickets : MOCK_TICKETS;
  const stats = {
    open: tickets.filter(t => t.status === 'Ouvert').length,
    inProgress: tickets.filter(t => t.status === 'En cours').length,
    resolved: tickets.filter(t => t.status === 'Résolu').length,
    urgent: tickets.filter(t => t.priority === 'Critique').length,
    avgResponseTime: '2.5h',
    satisfaction: 4.8
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

      {/* Appliquer hide-scrollbar ici */}
      <div className="flex-1 overflow-auto hide-scrollbar">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                Support Technique
              </h2>
              <p className="text-gray-600 mt-1">Assistance et support pour vos capteurs IoT</p>
            </div>
            <div className="flex gap-3">
              {/* Chat Live button removed */}
              <button 
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl hover:brightness-110 transition shadow-md"
              >
                <Plus className="w-4 h-4" />
                Nouveau ticket
              </button>
            </div>
          </div>

          {/* Statistiques améliorées */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700">{stats.open}</div>
              <div className="text-sm text-gray-600">Ouverts</div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-yellow-700">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">En cours</div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-700">{stats.resolved}</div>
              <div className="text-sm text-gray-600">Résolus</div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-700">{stats.urgent}</div>
              <div className="text-sm text-gray-600">Urgents</div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-700">{stats.avgResponseTime}</div>
              <div className="text-sm text-gray-600">Temps moy.</div>
            </div>
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-600">{stats.satisfaction}</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>

          {/* Filtres et recherche améliorés */}
          <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher par titre, ID ou description..."
                  className="pl-10 pr-4 py-3 w-full rounded-xl border border-white/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/70 transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-3 rounded-xl border border-white/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/70 transition"
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
          </div>
          
          {/* Liste des tickets améliorée */}
          <div className="grid gap-4">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, i) => (
                <div 
                  key={i} 
                  className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{ticket.title}</h3>
                        {ticket.attachments && ticket.attachments.length > 0 && (
                          <Paperclip className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
                        <span className="font-medium">#{ticket.id}</span>
                        <span>•</span>
                        <span>{ticket.category}</span>
                        {ticket.sensorType && (
                          <>
                            <span>•</span>
                            <span className="bg-blue-100/50 px-2 py-1 rounded-full text-blue-800">
                              {ticket.sensorType}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Créé le {ticket.created}</span>
                        {ticket.assignedTo && (
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {ticket.assignedTo}
                          </span>
                        )}
                        {ticket.responseTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Réponse {ticket.responseTime}
                          </span>
                        )}
                      </div>
                      {ticket.description && (
                        <p className="text-sm mt-3 text-gray-700 bg-white/20 p-3 rounded-lg">
                          {ticket.description.length > 150 ? 
                            `${ticket.description.substring(0, 150)}...` : 
                            ticket.description
                          }
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      {ticket.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{ticket.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white/20 rounded-xl">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucun ticket ne correspond à vos critères</p>
              </div>
            )}
          </div>

          {/* Ressources et contact améliorés */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Base de connaissances
              </h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-3 bg-white/20 rounded-lg hover:bg-white/30 transition">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Installation des capteurs</div>
                    <div className="text-sm text-gray-600">Guide complet étape par étape</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-white/20 rounded-lg hover:bg-white/30 transition">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="font-medium">Dépannage courant</div>
                    <div className="text-sm text-gray-600">Solutions aux problèmes fréquents</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-white/20 rounded-lg hover:bg-white/30 transition">
                  <Video className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Tutoriels vidéo</div>
                    <div className="text-sm text-gray-600">Calibration et maintenance</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="bg-white/30 backdrop-blur border border-white/30 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                Nous contacter
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Horaires d'ouverture</div>
                    <div className="text-sm text-gray-600">Lun-Ven: 8h-18h | Sam: 9h-12h</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">+261 34 09 241 65</div>
                    <div className="text-sm text-gray-600">Support technique</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">maitso.madagascar@outlook.com</div>
                    <div className="text-sm text-gray-600">Email support</div>
                  </div>
                </div>
                <div className="bg-red-50/50 p-3 rounded-lg border border-red-200/50">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">Urgences 24h/24</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">Pour les pannes critiques uniquement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de nouveau ticket amélioré */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto hide-scrollbar">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl flex items-center gap-2">
                      <Plus className="w-6 h-6 text-blue-600" />
                      Nouveau ticket de support
                    </h3>
                    <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sujet du problème *</label>
                        <input
                          type="text"
                          required
                          value={newTicket.title}
                          onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70"
                          placeholder="Décrivez brièvement le problème"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type de capteur</label>
                        <select
                          value={newTicket.sensorType}
                          onChange={(e) => setNewTicket({...newTicket, sensorType: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70"
                        >
                          <option value="">Sélectionnez un type</option>
                          {sensorTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
                        <select
                          required
                          value={newTicket.category}
                          onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70"
                        >
                          <option value="">Sélectionnez une catégorie</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                        <select
                          value={newTicket.priority}
                          onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70"
                        >
                          {priorities.map(prio => (
                            <option key={prio} value={prio}>{prio}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description détaillée</label>
                        <textarea
                          value={newTicket.description}
                          onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70"
                          placeholder="Décrivez le problème en détail, incluez les messages d'erreur, etc."
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pièces jointes</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Glissez vos fichiers ici ou cliquez pour sélectionner</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF jusqu'à 10MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl hover:brightness-110 transition shadow-lg"
                      >
                        Créer le ticket
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SupportTechniqueSection;