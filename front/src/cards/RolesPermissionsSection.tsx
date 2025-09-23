import { useState } from 'react';
import { Plus, Edit, Trash2, Users, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { Avatar, AvatarFallback } from './../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';

// Données mockées initiales
type Role = {
  id: number;
  name: string;
  description: string;
  color: string;
  badgeVariant: 'destructive' | 'default' | 'secondary' | 'outline';
  members: string[];
  permissions: string[];
};
const INITIAL_ROLES = [
  {
    id: 1,
    name: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités du système",
    color: "bg-red-100 text-red-800",
    badgeVariant: "destructive" as const,
    members: ["Sophie Martin", "Pierre Dubois"],
    permissions: ["Gestion utilisateurs", "Configuration", "Rapports", "Sécurité", "Sauvegarde"],
  },
  {
    id: 2,
    name: "Gestionnaire",
    description: "Gestion des équipes et supervision des projets",
    color: "bg-blue-100 text-blue-800",
    badgeVariant: "default" as const,
    members: ["Marie Leblanc", "Thomas Rousseau", "Julie Moreau"],
    permissions: ["Gestion équipes", "Projets", "Rapports", "Planning"],
  }
];

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [expandedRoles, setExpandedRoles] = useState<Set<number>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Form state pour members et permissions
  const [formMembers, setFormMembers] = useState<string[]>([]);
  const [formPermissions, setFormPermissions] = useState<string[]>([]);

  const toggleRole = (roleId: number) => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded.has(roleId)) newExpanded.delete(roleId);
    else newExpanded.add(roleId);
    setExpandedRoles(newExpanded);
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const openForm = (mode: 'add' | 'edit', role: Role | null = null) => {
    setFormMode(mode);
    setSelectedRole(role);
    setFormMembers(role?.members || []);
    setFormPermissions(role?.permissions || []);
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if (formMode === 'add') {
      const newRole = {
        id: Date.now(),
        name,
        description,
        color: "bg-gray-100 text-gray-800",
        badgeVariant: "default" as const,
        members: formMembers,
        permissions: formPermissions,
      };
      setRoles(prev => [...prev, newRole]);
    } else if (formMode === 'edit' && selectedRole) {
      setRoles(prev => prev.map(r => r.id === selectedRole.id ? {
        ...r, name, description, members: formMembers, permissions: formPermissions
      } : r));
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => setRoles(prev => prev.filter(r => r.id !== id));

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <Card className="mb-8 border-0 shadow-md bg-white">
          <CardHeader className="pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2"><Shield className="h-6 w-6 text-primary" /> Rôles et Permissions</CardTitle>
              <CardDescription>Gérez les rôles utilisateur et leurs permissions</CardDescription>
            </div>
            <Button className="shrink-0" onClick={() => openForm('add')}>
              <Plus className="w-4 h-4 mr-2" /> Nouveau rôle
            </Button>
          </CardHeader>
        </Card>

        {/* Liste des rôles */}
        <div className="grid lg:grid-cols-2 gap-6">
          {roles.map(role => (
            <Card key={role.id} className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4 flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <Badge variant={role.badgeVariant} className="shrink-0">
                      <Users className="w-3 h-3 mr-1" />
                      {role.members.length} membre{role.members.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{role.description}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openForm('edit', role)} className="h-8 w-8 p-0 hover:bg-blue-100"><Edit className="w-4 h-4 text-blue-600" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(role.id)} className="h-8 w-8 p-0 hover:bg-red-100"><Trash2 className="w-4 h-4 text-red-600" /></Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission, idx) => <Badge key={idx} variant="outline" className="text-xs">{permission}</Badge>)}
                  </div>
                </div>
                <Separator />
                <Collapsible open={expandedRoles.has(role.id)} onOpenChange={() => toggleRole(role.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                      <h4 className="text-sm font-medium text-muted-foreground">Membres ({role.members.length})</h4>
                      {expandedRoles.has(role.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-3">
                    {role.members.length > 0 ? (
                      <div className="space-y-2">
                        {role.members.map((member, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                            <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{getInitials(member)}</AvatarFallback></Avatar>
                            <span className="text-sm">{member}</span>
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-sm italic text-muted-foreground">Aucun membre assigné</p>}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal Formulaire rôle */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-lg bg-white rounded-lg shadow-lg p-6">
            <DialogHeader>
              <DialogTitle>{formMode === 'add' ? 'Ajouter un rôle' : 'Modifier le rôle'}</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <Input name="name" defaultValue={selectedRole?.name || ''} placeholder="Nom du rôle" required />
              <Input name="description" defaultValue={selectedRole?.description || ''} placeholder="Description" required />

              {/* Membres dynamiques */}
              <div>
                <label className="text-sm font-medium mb-1 block">Membres</label>
                <div className="flex flex-wrap gap-2">
                  {formMembers.map((m, idx) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      {m}
                      <button type="button" onClick={() => setFormMembers(prev => prev.filter((_, i) => i !== idx))}>×</button>
                    </Badge>
                  ))}
                  <Input
                    placeholder="Ajouter un membre"
                    value={formMembers.slice(-1)[0] || ''}
                    onChange={e => setFormMembers([...formMembers.slice(0, -1), e.target.value])}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        e.preventDefault();
                        setFormMembers(prev => [...prev, e.currentTarget.value.trim(), '']);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>

              {/* Permissions dynamiques */}
              <div>
                <label className="text-sm font-medium mb-1 block">Permissions</label>
                <div className="flex flex-wrap gap-2">
                  {formPermissions.map((p, idx) => (
                    <Badge key={idx} variant="outline" className="flex items-center gap-1">
                      {p}
                      <button type="button" onClick={() => setFormPermissions(prev => prev.filter((_, i) => i !== idx))}>×</button>
                    </Badge>
                  ))}
                  <Input
                    placeholder="Ajouter une permission"
                    value={formPermissions.slice(-1)[0] || ''}
                    onChange={e => setFormPermissions([...formPermissions.slice(0, -1), e.target.value])}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        e.preventDefault();
                        setFormPermissions(prev => [...prev, e.currentTarget.value.trim(), '']);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Valider</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
