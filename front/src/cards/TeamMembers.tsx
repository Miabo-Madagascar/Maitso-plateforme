import { useState, useMemo } from 'react';
import { Search, Eye, Trash2, Users, UserCheck, UserX } from 'lucide-react';
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
  { id:1, name: 'Alice Dupont', email: 'alice.dupont@example.com', role: 'Admin', active: true, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b6e8?w=150', department: 'IT', rating: 4.8 },
  { id:2, name: 'Bob Martin', email: 'bob.martin@example.com', role: 'Developer', active: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', department: 'Engineering', rating: 4.6 },
  { id:3, name: 'Claire Moreau', email: 'claire.moreau@example.com', role: 'Designer', active: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', department: 'Design', rating: 4.9 },
  { id:4, name: 'David Wilson', email: 'david.wilson@example.com', role: 'Manager', active: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', department: 'Operations', rating: 4.5 },
  { id:5, name: 'Emma Garcia', email: 'emma.garcia@example.com', role: 'Analyst', active: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', department: 'Analytics', rating: 4.7 },
];

export default function TeamMembersSection() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const stats = useMemo(() => {
    const total = members.length;
    const active = members.filter(m => m.active).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && member.active) ||
        (statusFilter === 'inactive' && !member.active);
      const matchesDepartment =
        departmentFilter === 'all' || member.department === departmentFilter;
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      return matchesSearch && matchesStatus && matchesDepartment && matchesRole;
    });
  }, [members, searchTerm, statusFilter, departmentFilter, roleFilter]);

  const departments = [...new Set(members.map(m => m.department))];

  const handleDelete = (id: number) => setMembers(prev => prev.filter(m => m.id !== id));

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full p-6 sm:p-4 bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg text-gray-900 flex flex-col">
        <div className="flex-1 w-full space-y-6 animate-fade-in">
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-slate-600">Total</p>
                  <p className="text-xl font-bold text-slate-900">{stats.total}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-600">Actifs</p>
                  <p className="text-xl font-bold text-green-700">{stats.active}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <UserX className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-slate-600">Inactifs</p>
                  <p className="text-xl font-bold text-red-700">{stats.inactive}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
            <CardContent className="p-6 flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Rechercher nom ou email..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 border-white/50"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 bg-white/30 border-white/30">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40 bg-white/30 border-white/30">
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32 bg-white/30 border-white/30">
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {MOCK_ROLES.map(r => <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-white/30 backdrop-blur border border-white/30 shadow-lg">
            <CardHeader className="border-b border-white/30">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" /> Membres ({filteredMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-white/20">
                  <tr>
                    <th className="p-4 text-left">Membre</th>
                    <th className="p-4 text-left">Département</th>
                    <th className="p-4 text-left">Rôle</th>
                    <th className="p-4 text-left">Statut</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map(member => (
                    <tr key={member.id} className="border-b border-white/30 hover:bg-white/10 group">
                      <td className="p-4 flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-1 ring-white/50 shadow-sm">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-slate-500">{member.email}</p>
                        </div>
                      </td>
                      <td className="p-4">{member.department}</td>
                      <td className="p-4">
                        <Badge className={`${MOCK_ROLES.find(r => r.name === member.role)?.color} border-0`}>
                          {member.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={`${member.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border-0`}>
                          {member.active ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                      <td className="p-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button onClick={() => { setSelectedMember(member); setShowProfile(true); }}>
                              <Eye className="w-4 h-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Voir profil</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button onClick={() => handleDelete(member.id)}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Supprimer</TooltipContent>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center p-12 text-slate-500">
                        Aucun membre trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Profile Modal */}
          <Dialog open={showProfile} onOpenChange={setShowProfile}>
            <DialogContent className="sm:max-w-md bg-white/30 backdrop-blur rounded-lg shadow-lg p-6">
              <DialogHeader>
                <DialogTitle>Détails du profil</DialogTitle>
              </DialogHeader>
              {selectedMember && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-1 ring-white/50">
                      <AvatarImage src={selectedMember.avatar} />
                      <AvatarFallback>
                        {selectedMember.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">{selectedMember.name}</p>
                      <p className="text-sm text-slate-500">{selectedMember.email}</p>
                      <Badge className={`${MOCK_ROLES.find(r => r.name === selectedMember.role)?.color} border-0 mt-1`}>
                        {selectedMember.role}
                      </Badge>
                    </div>
                  </div>
                  <p>Département : {selectedMember.department}</p>
                  <p>Statut : {selectedMember.active ? 'Actif' : 'Inactif'}</p>
                  {/* Note moyenne supprimée */}
                </div>
              )}
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </TooltipProvider>
  );
}
