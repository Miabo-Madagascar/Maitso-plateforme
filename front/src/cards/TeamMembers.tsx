import React, { useState, useMemo } from 'react';
import { Plus, Search, Star, Eye, Edit, Trash2, Users, UserCheck, UserX } from 'lucide-react';
import { Button } from './../components/ui/button';
import { Input } from './../components/ui/input';
import { Badge } from './../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './../components/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './../components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './../components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './../components/ui/dialog';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  avatar: string;
  department: string;
  rating: number;
}

interface Role {
  name: string;
  color: string;
}

const MOCK_ROLES: Role[] = [
  { name: 'Admin', color: 'bg-red-100 text-red-800' },
  { name: 'Developer', color: 'bg-blue-100 text-blue-800' },
  { name: 'Designer', color: 'bg-purple-100 text-purple-800' },
  { name: 'Manager', color: 'bg-green-100 text-green-800' },
  { name: 'Analyst', color: 'bg-yellow-100 text-yellow-800' },
];

const INITIAL_MEMBERS: TeamMember[] = [
  { id:1, name: 'Alice Dupont', email: 'alice.dupont@example.com', role: 'Admin', active: true, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b6e8?w=150&h=150&fit=crop&crop=face', department: 'IT', rating: 4.8 },
  { id:2, name: 'Bob Martin', email: 'bob.martin@example.com', role: 'Developer', active: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', department: 'Engineering', rating: 4.6 },
  { id:3, name: 'Claire Moreau', email: 'claire.moreau@example.com', role: 'Designer', active: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', department: 'Design', rating: 4.9 },
  { id:4, name: 'David Wilson', email: 'david.wilson@example.com', role: 'Manager', active: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', department: 'Operations', rating: 4.5 },
  { id:5, name: 'Emma Garcia', email: 'emma.garcia@example.com', role: 'Analyst', active: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', department: 'Analytics', rating: 4.7 },
];

const TeamMembersSection: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  const stats = useMemo(() => {
    const total = members.length;
    const active = members.filter(m => m.active).length;
    const inactive = total - active;
    const avgRating = members.reduce((sum, m) => sum + m.rating, 0) / total;
    return { total, active, inactive, avgRating };
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' && member.active) || (statusFilter === 'inactive' && !member.active);
      const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      return matchesSearch && matchesStatus && matchesDepartment && matchesRole;
    });
  }, [members, searchTerm, statusFilter, departmentFilter, roleFilter]);

  const departments = [...new Set(members.map(m => m.department))];

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const department = formData.get('department') as string;

    if(formMode === 'add') {
      const newMember: TeamMember = { id: Date.now(), name, email, role, department, active: true, avatar: 'https://via.placeholder.com/150', rating: 5 };
      setMembers(prev => [...prev, newMember]);
    } else if(selectedMember) {
      setMembers(prev => prev.map(m => m.id === selectedMember.id ? { ...m, name, email, role, department } : m));
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => setMembers(prev => prev.filter(m => m.id !== id));

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Gestion d'équipe</h1>
              <p className="text-slate-600 mt-1">Gérez vos membres d'équipe et leurs permissions</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button className="gap-2 bg-blue-600 text-white hover:bg-blue-700" onClick={() => { setFormMode('add'); setSelectedMember(null); setShowForm(true); }}>
                <Plus className="w-4 h-4" /> Inviter un membre
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-md">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-slate-600">Total</p>
                  <p className="text-xl font-bold text-slate-900">{stats.total}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardContent className="p-4 flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-600">Actifs</p>
                  <p className="text-xl font-bold text-green-700">{stats.active}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardContent className="p-4 flex items-center gap-3">
                <UserX className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-slate-600">Inactifs</p>
                  <p className="text-xl font-bold text-red-700">{stats.inactive}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardContent className="p-4 flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-slate-600">Note moy.</p>
                  <p className="text-xl font-bold text-yellow-700">{stats.avgRating.toFixed(1)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Table */}
          <Card className="shadow-lg">
            <CardContent className="p-6 flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Statut" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Département" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Rôle" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {MOCK_ROLES.map(r => <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="shadow-lg">
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Membres ({filteredMembers.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 text-left font-semibold text-slate-700">Membre</th>
                    <th className="p-4 text-left font-semibold text-slate-700">Département</th>
                    <th className="p-4 text-left font-semibold text-slate-700">Rôle</th>
                    <th className="p-4 text-left font-semibold text-slate-700">Statut</th>
                    <th className="p-4 text-left font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map(member => (
                    <tr key={member.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors group">
                      <td className="p-4 flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-1 ring-slate-200 shadow-sm">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-slate-300 text-white">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900">{member.name}</p>
                          <p className="text-sm text-slate-500">{member.email}</p>
                        </div>
                      </td>
                      <td className="p-4">{member.department}</td>
                      <td className="p-4">
                        <Badge className={`${MOCK_ROLES.find(r => r.name === member.role)?.color} border-0`}>{member.role}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={`${member.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border-0`}>
                          {member.active ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                      <td className="p-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => { setSelectedMember(member); setShowProfile(true); }}><Eye className="w-4 h-4" /></Button>
                          </TooltipTrigger>
                          <TooltipContent>Voir profil</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => { setFormMode('edit'); setSelectedMember(member); setShowForm(true); }}><Edit className="w-4 h-4" /></Button>
                          </TooltipTrigger>
                          <TooltipContent>Modifier</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)}><Trash2 className="w-4 h-4" /></Button>
                          </TooltipTrigger>
                          <TooltipContent>Supprimer</TooltipContent>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && <tr><td colSpan={5} className="text-center p-12 text-slate-500">Aucun membre trouvé</td></tr>}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Modal Form */}
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-lg p-6">
              <DialogHeader>
                <DialogTitle>{formMode === 'add' ? 'Ajouter un membre' : 'Modifier le membre'}</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <Input name="name" defaultValue={selectedMember?.name || ''} placeholder="Nom" required />
                <Input name="email" defaultValue={selectedMember?.email || ''} placeholder="Email" required />
                <Select name="role" defaultValue={selectedMember?.role || ''}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Rôle" /></SelectTrigger>
                  <SelectContent>{MOCK_ROLES.map(r => <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>)}</SelectContent>
                </Select>
                <Input name="department" defaultValue={selectedMember?.department || ''} placeholder="Département" required />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Valider</Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Modal Profil */}
          <Dialog open={showProfile} onOpenChange={setShowProfile}>
            <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-lg p-6">
              <DialogHeader><DialogTitle>Détails du profil</DialogTitle></DialogHeader>
              {selectedMember && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedMember.avatar} />
                      <AvatarFallback>{selectedMember.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">{selectedMember.name}</p>
                      <p className="text-sm text-slate-500">{selectedMember.email}</p>
                      <Badge className={`${MOCK_ROLES.find(r => r.name === selectedMember.role)?.color} border-0 mt-1`}>{selectedMember.role}</Badge>
                    </div>
                  </div>
                  <p>Département : {selectedMember.department}</p>
                  <p>Statut : {selectedMember.active ? 'Actif' : 'Inactif'}</p>
                  <p>Note moyenne : {selectedMember.rating}</p>
                </div>
              )}
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </TooltipProvider>
  );
};

export default TeamMembersSection;
