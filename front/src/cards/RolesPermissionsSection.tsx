import { useState } from 'react';
import { Plus, Edit, Trash2, Users, ChevronDown, ChevronUp, Activity, MapPin, AlertTriangle, CheckCircle, Phone, Mail, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from './../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

// Types pour les membres d'équipe
type TeamMember = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Ingénieur IoT' | 'Technicien' | 'Analyste' | 'Superviseur' | 'Maintenance';
  department: 'Production' | 'Maintenance' | 'Qualité' | 'Sécurité' | 'R&D';
  accessLevel: 'Admin' | 'Opérateur' | 'Visualiseur';
  avatar: string;
  
  // Status
  status: 'Disponible' | 'En intervention' | 'Non disponible' | 'Hors service';
  location: string;
  lastSeen: Date;
  workSchedule: string;
  
  // Responsabilités  
  assignedSensors: string[];
  responsibleZones: string[];
  sensorTypes: string[];
  
  // Alertes
  activeAlerts: number;
  pendingInterventions: number;
  avgResponseTime: number; // en minutes
  
  // Compétences
  specialties: string[];
  certifications: string[];
  expertiseLevel: 'Débutant' | 'Intermédiaire' | 'Expert';
  languages: string[];
  
  // Performance
  resolutionRate: number; // %
  interventionsCount: number;
  qualityScore: number; // sur 5
};

// Données mockées initiales
const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Sophie Martin",
    email: "sophie.martin@company.com",
    phone: "+33 6 12 34 56 78",
    role: "Ingénieur IoT",
    department: "R&D",
    accessLevel: "Admin",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b6e8?w=150",
    status: "Disponible",
    location: "Bureau R&D",
    lastSeen: new Date(),
    workSchedule: "8h-17h",
    assignedSensors: ["TEMP-001", "HUM-002", "PRESS-003"],
    responsibleZones: ["Bâtiment A", "Laboratoire"],
    sensorTypes: ["Température", "Humidité", "Pression"],
    activeAlerts: 2,
    pendingInterventions: 1,
    avgResponseTime: 15,
    specialties: ["Capteurs industriels", "IoT", "Maintenance prédictive"],
    certifications: ["Habilitation électrique", "Sécurité industrielle"],
    expertiseLevel: "Expert",
    languages: ["Français", "Anglais"],
    resolutionRate: 95,
    interventionsCount: 47,
    qualityScore: 4.8
  },
  {
    id: 2,
    name: "Pierre Dubois",
    email: "pierre.dubois@company.com",
    phone: "+33 6 98 76 54 32",
    role: "Technicien",
    department: "Maintenance",
    accessLevel: "Opérateur",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    status: "En intervention",
    location: "Zone production",
    lastSeen: new Date(Date.now() - 3600000),
    workSchedule: "6h-14h",
    assignedSensors: ["VIB-004", "NOISE-005"],
    responsibleZones: ["Zone production", "Atelier mécanique"],
    sensorTypes: ["Vibration", "Acoustique"],
    activeAlerts: 0,
    pendingInterventions: 3,
    avgResponseTime: 25,
    specialties: ["Maintenance mécanique", "Vibrations"],
    certifications: ["Habilitation électrique B1V"],
    expertiseLevel: "Intermédiaire",
    languages: ["Français"],
    resolutionRate: 88,
    interventionsCount: 32,
    qualityScore: 4.2
  },
  {
    id: 3,
    name: "Marie Leblanc",
    email: "marie.leblanc@company.com",
    phone: "+33 6 11 22 33 44",
    role: "Analyste",
    department: "Qualité",
    accessLevel: "Visualiseur",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    status: "Disponible",
    location: "Bureau qualité",
    lastSeen: new Date(Date.now() - 1800000),
    workSchedule: "9h-18h",
    assignedSensors: ["AIR-006", "CO2-007", "PART-008"],
    responsibleZones: ["Salle blanche", "Laboratoire qualité"],
    sensorTypes: ["Qualité d'air", "Particules", "CO2"],
    activeAlerts: 1,
    pendingInterventions: 0,
    avgResponseTime: 12,
    specialties: ["Analyse environnementale", "Qualité d'air"],
    certifications: ["ISO 14001"],
    expertiseLevel: "Expert",
    languages: ["Français", "Anglais", "Allemand"],
    resolutionRate: 92,
    interventionsCount: 28,
    qualityScore: 4.6
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponible': return 'bg-green-100 text-green-800';
    case 'En intervention': return 'bg-yellow-100 text-yellow-800';
    case 'Non disponible': return 'bg-gray-100 text-gray-800';
    case 'Hors service': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getExpertiseColor = (level: string) => {
  switch (level) {
    case 'Expert': return 'bg-green-100 text-green-800';
    case 'Intermédiaire': return 'bg-blue-100 text-blue-800';
    case 'Débutant': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function TeamMembersSection() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [expandedMembers, setExpandedMembers] = useState<Set<number>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Form states
  const [formAssignedSensors, setFormAssignedSensors] = useState<string[]>([]);
  const [formResponsibleZones, setFormResponsibleZones] = useState<string[]>([]);
  const [formSensorTypes, setFormSensorTypes] = useState<string[]>([]);
  const [formSpecialties, setFormSpecialties] = useState<string[]>([]);
  const [formCertifications, setFormCertifications] = useState<string[]>([]);
  const [formLanguages, setFormLanguages] = useState<string[]>([]);

  const toggleMember = (memberId: number) => {
    const newExpanded = new Set(expandedMembers);
    if (newExpanded.has(memberId)) newExpanded.delete(memberId);
    else newExpanded.add(memberId);
    setExpandedMembers(newExpanded);
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const openForm = (mode: 'add' | 'edit', member: TeamMember | null = null) => {
    setFormMode(mode);
    setSelectedMember(member);
    setFormAssignedSensors(member?.assignedSensors || []);
    setFormResponsibleZones(member?.responsibleZones || []);
    setFormSensorTypes(member?.sensorTypes || []);
    setFormSpecialties(member?.specialties || []);
    setFormCertifications(member?.certifications || []);
    setFormLanguages(member?.languages || []);
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const memberData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      role: formData.get('role') as TeamMember['role'],
      department: formData.get('department') as TeamMember['department'],
      accessLevel: formData.get('accessLevel') as TeamMember['accessLevel'],
      status: formData.get('status') as TeamMember['status'],
      location: formData.get('location') as string,
      workSchedule: formData.get('workSchedule') as string,
      expertiseLevel: formData.get('expertiseLevel') as TeamMember['expertiseLevel'],
      assignedSensors: formAssignedSensors,
      responsibleZones: formResponsibleZones,
      sensorTypes: formSensorTypes,
      specialties: formSpecialties,
      certifications: formCertifications,
      languages: formLanguages,
    };

    if (formMode === 'add') {
      const newMember: TeamMember = {
        id: Date.now(),
        avatar: "https://via.placeholder.com/150",
        lastSeen: new Date(),
        activeAlerts: 0,
        pendingInterventions: 0,
        avgResponseTime: 0,
        resolutionRate: 0,
        interventionsCount: 0,
        qualityScore: 0,
        ...memberData,
      };
      setMembers(prev => [...prev, newMember]);
    } else if (formMode === 'edit' && selectedMember) {
      setMembers(prev => prev.map(m => m.id === selectedMember.id ? { ...m, ...memberData } : m));
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => setMembers(prev => prev.filter(m => m.id !== id));

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diff < 1) return "À l'instant";
    if (diff < 60) return `Il y a ${diff} min`;
    if (diff < 1440) return `Il y a ${Math.floor(diff / 60)}h`;
    return `Il y a ${Math.floor(diff / 1440)} jour(s)`;
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
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">

          {/* Header */}
          <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
            <CardHeader className="pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" /> 
                  Équipe de surveillance
                </CardTitle>
                <CardDescription>
                  Gestion de l'équipe de surveillance des capteurs IoT
                </CardDescription>
              </div>
              <Button className="shrink-0" onClick={() => openForm('add')}>
                <Plus className="w-4 h-4 mr-2" /> Nouveau membre
              </Button>
            </CardHeader>
          </Card>

          {/* Stats rapides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-slate-600">Total membres</p>
                  <p className="text-xl font-bold">{members.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-600">Disponibles</p>
                  <p className="text-xl font-bold text-green-700">
                    {members.filter(m => m.status === 'Disponible').length}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <Activity className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-slate-600">En intervention</p>
                  <p className="text-xl font-bold text-yellow-700">
                    {members.filter(m => m.status === 'En intervention').length}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-slate-600">Alertes actives</p>
                  <p className="text-xl font-bold text-red-700">
                    {members.reduce((sum, m) => sum + m.activeAlerts, 0)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des membres */}
          <div className="grid lg:grid-cols-2 gap-6">
            {members.map(member => (
              <Card key={member.id} className="bg-white/30 backdrop-blur border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 ring-1 ring-white/50">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {member.role}
                          </Badge>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openForm('edit', member)} className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)} className="h-8 w-8 p-0">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Infos rapides */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{formatLastSeen(member.lastSeen)}</span>
                    </div>
                  </div>

                  {/* Métriques */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/20 rounded p-2">
                      <div className="text-lg font-bold text-red-600">{member.activeAlerts}</div>
                      <div className="text-xs text-gray-600">Alertes</div>
                    </div>
                    <div className="bg-white/20 rounded p-2">
                      <div className="text-lg font-bold text-blue-600">{member.interventionsCount}</div>
                      <div className="text-xs text-gray-600">Interventions</div>
                    </div>
                    <div className="bg-white/20 rounded p-2">
                      <div className="text-lg font-bold text-green-600">{member.resolutionRate}%</div>
                      <div className="text-xs text-gray-600">Résolution</div>
                    </div>
                  </div>

                  <Separator />
                  
                  {/* Détails expandables */}
                  <Collapsible open={expandedMembers.has(member.id)} onOpenChange={() => toggleMember(member.id)}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                        <span className="text-sm font-medium">Détails techniques</span>
                        {expandedMembers.has(member.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 mt-3">
                      {/* Capteurs assignés */}
                      <div>
                        <h5 className="text-xs font-medium text-gray-600 mb-1">Capteurs assignés</h5>
                        <div className="flex flex-wrap gap-1">
                          {member.assignedSensors.map((sensor, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{sensor}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Zones de responsabilité */}
                      <div>
                        <h5 className="text-xs font-medium text-gray-600 mb-1">Zones de responsabilité</h5>
                        <div className="flex flex-wrap gap-1">
                          {member.responsibleZones.map((zone, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{zone}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Spécialités */}
                      <div>
                        <h5 className="text-xs font-medium text-gray-600 mb-1">Spécialités</h5>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="default" className="text-xs">{specialty}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Niveau d'expertise */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-600">Niveau d'expertise</span>
                        <Badge className={getExpertiseColor(member.expertiseLevel)}>
                          {member.expertiseLevel}
                        </Badge>
                      </div>

                      {/* Score qualité */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-600">Score qualité</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{member.qualityScore}/5</span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Modal Formulaire membre */}
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogContent className="sm:max-w-4xl bg-white/30 backdrop-blur rounded-lg shadow-lg p-6 max-h-[90vh] overflow-auto hide-scrollbar">
              <DialogHeader>
                <DialogTitle>
                  {formMode === 'add' ? 'Ajouter un membre' : 'Modifier le membre'}
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Informations de base */}
                  <Input name="name" defaultValue={selectedMember?.name || ''} placeholder="Nom complet" required />
                  <Input name="email" type="email" defaultValue={selectedMember?.email || ''} placeholder="Email" required />
                  <Input name="phone" defaultValue={selectedMember?.phone || ''} placeholder="Téléphone" required />
                  <Input name="workSchedule" defaultValue={selectedMember?.workSchedule || ''} placeholder="Horaires (ex: 8h-17h)" />

                  {/* Sélecteurs */}
                  <Select name="role" defaultValue={selectedMember?.role}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ingénieur IoT">Ingénieur IoT</SelectItem>
                      <SelectItem value="Technicien">Technicien</SelectItem>
                      <SelectItem value="Analyste">Analyste</SelectItem>
                      <SelectItem value="Superviseur">Superviseur</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select name="department" defaultValue={selectedMember?.department}>
                    <SelectTrigger>
                      <SelectValue placeholder="Département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Production">Production</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Qualité">Qualité</SelectItem>
                      <SelectItem value="Sécurité">Sécurité</SelectItem>
                      <SelectItem value="R&D">R&D</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select name="accessLevel" defaultValue={selectedMember?.accessLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Niveau d'accès" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Opérateur">Opérateur</SelectItem>
                      <SelectItem value="Visualiseur">Visualiseur</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select name="status" defaultValue={selectedMember?.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponible">Disponible</SelectItem>
                      <SelectItem value="En intervention">En intervention</SelectItem>
                      <SelectItem value="Non disponible">Non disponible</SelectItem>
                      <SelectItem value="Hors service">Hors service</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input name="location" defaultValue={selectedMember?.location || ''} placeholder="Localisation actuelle" />

                  <Select name="expertiseLevel" defaultValue={selectedMember?.expertiseLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Niveau d'expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Débutant">Débutant</SelectItem>
                      <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Listes dynamiques */}
                <div className="space-y-4">
                  {/* Capteurs assignés */}
                  <div>
                    <label className="text-sm font-medium mb-1 block">Capteurs assignés</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formAssignedSensors.filter(s => s.trim()).map((sensor, idx) => (
                        <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                          {sensor}
                          <button type="button" onClick={() => setFormAssignedSensors(prev => prev.filter((_, i) => i !== idx))}>×</button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Ajouter un capteur (ex: TEMP-001)"
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          e.preventDefault();
                          setFormAssignedSensors(prev => [...prev, e.currentTarget.value.trim()]);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>

                  {/* Zones de responsabilité */}
                  <div>
                    <label className="text-sm font-medium mb-1 block">Zones de responsabilité</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formResponsibleZones.filter(z => z.trim()).map((zone, idx) => (
                        <Badge key={idx} variant="outline" className="flex items-center gap-1">
                          {zone}
                          <button type="button" onClick={() => setFormResponsibleZones(prev => prev.filter((_, i) => i !== idx))}>×</button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Ajouter une zone (ex: Bâtiment A)"
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          e.preventDefault();
                          setFormResponsibleZones(prev => [...prev, e.currentTarget.value.trim()]);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>

                  {/* Spécialités */}
                  <div>
                    <label className="text-sm font-medium mb-1 block">Spécialités</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formSpecialties.filter(s => s.trim()).map((specialty, idx) => (
                        <Badge key={idx} variant="default" className="flex items-center gap-1">
                          {specialty}
                          <button type="button" onClick={() => setFormSpecialties(prev => prev.filter((_, i) => i !== idx))}>×</button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Ajouter une spécialité"
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          e.preventDefault();
                          setFormSpecialties(prev => [...prev, e.currentTarget.value.trim()]);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Valider
                </Button>
              </form>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </div>
  );
}
