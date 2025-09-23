import React, { useState, useRef, type ChangeEvent, type JSX } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, UploadCloud, CheckCircle } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function ProfileEditor(): JSX.Element {
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
    // simple scoring: length + variety
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score; // 0..5
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

    // sauvegarde simulée — remplacez par appel API réel
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

  const pwdScore = passwordStrength(form.password);

  return (
    <div className="max-w-3xl mx-auto p-6">
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
              <div className="text-xs text-gray-500 mb-1">Robustesse: <strong>{strengthLabel(pwdScore)}</strong></div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(pwdScore / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className={`h-2 rounded-full ${pwdScore <= 1 ? "bg-red-400" : pwdScore === 2 ? "bg-orange-400" : pwdScore === 3 ? "bg-yellow-400" : pwdScore === 4 ? "bg-emerald-400" : "bg-green-600"}`}
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
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
            >
              Réinitialiser
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium shadow hover:brightness-95 disabled:opacity-60 transition-flex"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-4 text-sm text-gray-500">
          Astuce: laisse le champ mot de passe vide si tu ne veux pas le changer.
        </motion.div>
      </motion.div>
    </div>
  );
}
