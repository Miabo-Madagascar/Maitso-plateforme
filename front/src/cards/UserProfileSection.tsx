import React, { useState, useRef, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, UploadCloud, CheckCircle, UserPlus, Edit2, Trash2, X, Search, Shield, Users } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: "admin" | "utilisateur";
  createdAt: string;
};

export default function ProfileEditor(): React.JSX.Element {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // États pour la gestion des utilisateurs
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      department: "Développement",
      role: "admin",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Marie Martin",
      email: "marie.martin@example.com",
      department: "Marketing",
      role: "utilisateur",
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      name: "Pierre Dubois",
      email: "pierre.dubois@example.com",
      department: "Support",
      role: "utilisateur",
      createdAt: "2024-03-10",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "utilisateur">("all");

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "utilisateur" as "admin" | "utilisateur",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSaved(false);
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Le nom est requis";
    if (!form.email.trim()) next.email = "L'email est requis";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Email invalide";

    if (form.password) {
      if (form.password.length < 8) next.password = "Minimum 8 caractères";
      if (!/[0-9]/.test(form.password)) next.password = (next.password ? next.password + ", " : "") + "Doit contenir un chiffre";
      if (!/[A-Z]/.test(form.password)) next.password = (next.password ? next.password + ", " : "") + "Doit contenir une majuscule";
    }

    if (form.password !== form.confirm) next.confirm = "Les mots de passe ne correspondent pas";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function passwordStrength(pwd: string) {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  }

  function strengthLabel(score: number) {
    if (score <= 1) return "Très faible";
    if (score === 2) return "Faible";
    if (score === 3) return "Moyen";
    if (score === 4) return "Bon";
    return "Très bon";
  }

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(String(reader.result));
    reader.readAsDataURL(f);
    setSaved(false);
  }

  function triggerAvatar() {
    inputFileRef.current?.click();
  }

  function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 700);
  }

  function handleReset() {
    setForm({ name: "", email: "", password: "", confirm: "" });
    setAvatar(null);
    setErrors({});
    setSaved(false);
  }

  // Gestion des utilisateurs
  function handleAddUser() {
    if (!userForm.name || !userForm.email || !userForm.department) return;

    const newUser: User = {
      id: Date.now().toString(),
      name: userForm.name,
      email: userForm.email,
      department: userForm.department,
      role: userForm.role,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUser]);
    setUserForm({ name: "", email: "", department: "", role: "utilisateur" });
    setShowAddModal(false);
  }

  function handleEditUser() {
    if (!selectedUser || !userForm.name || !userForm.email || !userForm.department) return;

    setUsers(
      users.map((u) =>
        u.id === selectedUser.id
          ? { ...u, name: userForm.name, email: userForm.email, department: userForm.department, role: userForm.role }
          : u
      )
    );
    setShowEditModal(false);
    setSelectedUser(null);
    setUserForm({ name: "", email: "", department: "", role: "utilisateur" });
  }

  function handleDeleteUser(id: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  }

  function openEditModal(user: User) {
    setSelectedUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      department: user.department,
      role: user.role,
    });
    setShowEditModal(true);
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const pwdScore = passwordStrength(form.password);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Personnaliser le profil */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6"
        >
          <header className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400">A</div>
                )}
              </div>
              <button
                type="button"
                onClick={triggerAvatar}
                className="absolute -right-1 -bottom-1 bg-white p-1 rounded-full border shadow-sm hover:scale-105 transition"
                title="Changer avatar"
              >
                <UploadCloud size={16} />
              </button>
              <input ref={inputFileRef} type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold">Profil</h2>
              <p className="text-sm text-gray-500">Modifie ton nom, email ou mot de passe ici.</p>
            </div>

            <div className="text-right">
              {saved ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle size={16} /> Enregistré
                </div>
              ) : (
                <div className="text-sm text-gray-500">Dernière sauvegarde — maintenant</div>
              )}
            </div>
          </header>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ton nom complet"
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.name ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">Adresse email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="exemple@domaine.com"
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.email ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Laisser vide pour ne pas changer"
                  type={showPwd ? "text" : "password"}
                  className={`w-full rounded-lg border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.password ? "border-red-400" : "border-gray-200"}`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                  onClick={() => setShowPwd((s) => !s)}
                  title={showPwd ? "Masquer" : "Afficher"}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}

              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">
                  Robustesse: <strong>{strengthLabel(pwdScore)}</strong>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(pwdScore / 5) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    className={`h-2 rounded-full ${
                      pwdScore <= 1
                        ? "bg-red-400"
                        : pwdScore === 2
                        ? "bg-orange-400"
                        : pwdScore === 3
                        ? "bg-yellow-400"
                        : pwdScore === 4
                        ? "bg-emerald-400"
                        : "bg-green-600"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirmer mot de passe</label>
              <div className="relative">
                <input
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Répéter le mot de passe"
                  type={showConfirm ? "text" : "password"}
                  className={`w-full rounded-lg border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.confirm ? "border-red-400" : "border-gray-200"}`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                  onClick={() => setShowConfirm((s) => !s)}
                  title={showConfirm ? "Masquer" : "Afficher"}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirm && <div className="text-red-500 text-sm mt-1">{errors.confirm}</div>}
            </div>

            <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-3 mt-3">
              <button type="button" onClick={handleReset} className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition">
                Réinitialiser
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium shadow hover:brightness-95 disabled:opacity-60 transition"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-4 text-sm text-gray-500">
            Astuce: laisse le champ mot de passe vide si tu ne veux pas le changer.
          </motion.div>
        </motion.div>

        {/* Card Gestion des utilisateurs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6"
        >
          <header className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Users size={20} className="text-sky-600" />
                  Gestion des utilisateurs
                </h2>
                <p className="text-sm text-gray-500">Consulte et gère les utilisateurs du système</p>
              </div>
              <button
                onClick={() => {
                  setUserForm({ name: "", email: "", department: "", role: "utilisateur" });
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white font-medium shadow hover:brightness-95 transition"
              >
                <UserPlus size={16} />
                Ajouter
              </button>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email ou département..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as "all" | "admin" | "utilisateur")}
                className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">Tous les rôles</option>
                <option value="admin">Admin</option>
                <option value="utilisateur">Utilisateur</option>
              </select>
            </div>
          </header>

          {/* Liste des utilisateurs */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users size={48} className="mx-auto mb-2 opacity-50" />
                <p>Aucun utilisateur trouvé</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role === "admin" ? <Shield size={12} /> : <Users size={12} />}
                          {user.role}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Département:</span> {user.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Ajouté:</span> {user.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition"
                        title="Modifier"
                      >
                        <Edit2 size={16} className="text-sky-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition"
                        title="Supprimer"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Statistiques */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-sky-600">{users.length}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{users.filter((u) => u.role === "admin").length}</div>
                <div className="text-xs text-gray-500">Admins</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === "utilisateur").length}</div>
                <div className="text-xs text-gray-500">Utilisateurs</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal Ajouter utilisateur */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Ajouter un utilisateur</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom complet</label>
                  <input
                    type="text"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    placeholder="Ex: Jean Dupont"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    placeholder="exemple@domaine.com"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Département</label>
                  <input
                    type="text"
                    value={userForm.department}
                    onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
                    placeholder="Ex: Développement"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Rôle</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as "admin" | "utilisateur" })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="utilisateur">Utilisateur</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddUser}
                  className="flex-1 px-4 py-2 rounded-lg bg-sky-600 text-white font-medium shadow hover:brightness-95 transition"
                >
                  Ajouter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Modifier utilisateur */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Modifier l'utilisateur</h3>
                <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom complet</label>
                  <input
                    type="text"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Département</label>
                  <input
                    type="text"
                    value={userForm.department}
                    onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Rôle</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as "admin" | "utilisateur" })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="utilisateur">Utilisateur</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={handleEditUser}
                  className="flex-1 px-4 py-2 rounded-lg bg-sky-600 text-white font-medium shadow hover:brightness-95 transition"
                >
                  Enregistrer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
