import { useState, type ChangeEvent, type FormEvent } from "react";
import { GlassDashboard } from "../components/dashboard/GlassDashboard";
import { GlassSidebar } from "../components/dashboard/GlassSidebar";
import {LifeBuoy,Settings as SettingsIcon,UserPlus, ExternalLink,BookOpen,UploadCloud,ShieldCheck,} from "lucide-react";

const MOCK_CONNECTION_HISTORY = [
  { date: "2025-08-08 12:34", ip: "192.168.1.10" },
  { date: "2025-08-07 09:15", ip: "192.168.1.14" },
  { date: "2025-08-06 21:08", ip: "192.168.1.9" },
];

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("reports");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Profil utilisateur state
  const [profile, setProfile] = useState({
    name: "Tiana Njato",
    email: "tiana.njato@example.com",
    newEmail: "",
    avatarUrl: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [emailChanged, setEmailChanged] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  // Sécurité
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [connectionHistory] = useState(MOCK_CONNECTION_HISTORY);

  // Gestion formulaire profil
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
    if (name === "newEmail") setEmailChanged(true);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((p) => ({ ...p, avatarUrl: url }));
    }
  };

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (emailChanged && !profile.newEmail.includes("@")) {
      setProfileMessage("Email invalide.");
      return;
    }
    if (profile.newPassword !== profile.confirmPassword) {
      setProfileMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    if (profile.newPassword && profile.newPassword.length < 6) {
      setProfileMessage("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (emailChanged) {
      setProfileMessage(`Un email de confirmation a été envoyé à ${profile.newEmail}.`);
      setProfile((p) => ({ ...p, email: p.newEmail, newEmail: "" }));
      setEmailChanged(false);
    } else {
      setProfileMessage("Profil mis à jour avec succès !");
    }

    setProfile((p) => ({
      ...p,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  // Sécurité
  const toggleTwoFA = () => setTwoFAEnabled(!twoFAEnabled);
  const logoutAllSessions = () => alert("Toutes les sessions ont été déconnectées.");

  // Gestion cartes sélectionnées dans help/settings
  const toggleSelectedCard = (card: string) => {
    if (selectedCard === card) setSelectedCard(null);
    else setSelectedCard(card);
  };

  const renderCardDetails = (title: string) => {
    switch (title) {
      case "Support Technique":
  return (
    <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700 space-y-4">
      <div className="flex items-center gap-3">
        <LifeBuoy className="w-8 h-8 text-indigo-500" />
        <h2 className="text-xl font-bold">Support Technique</h2>
      </div>
      <p>
        Contactez notre équipe technique ou ouvrez un ticket d’assistance via :
      </p>
      <ul className="list-disc ml-6 space-y-1">
<li>
  <span className="font-medium">Email :</span>{" "}
  <a href="/support" className="text-blue-600 hover:underline">
    support@maitso-madagascar.net
  </a>
</li>
        <li>
          <span className="font-medium">Téléphone :</span> +261 34 00 00 000
        </li>
        <li>Chat en ligne disponible 24/7</li>
      </ul>
      <p>
        Nous garantissons une prise en charge rapide et efficace de vos problèmes
        liés aux capteurs et au système.
      </p>
    </div>
  );


     case "Documentation":
  return (
    <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700 space-y-4">
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-indigo-600" />
        <h2 className="text-xl font-bold">Documentation</h2>
      </div>
      <p>
        Consultez notre documentation complète pour exploiter toutes les fonctionnalités
        et découvrir des astuces pour optimiser votre utilisation.
      </p>
      <button
        onClick={() => window.open("https://docs.example.com", "_blank")}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg active:scale-95 transition-all"
      >
        <span>Ouvrir la documentation</span>
        <ExternalLink className="w-5 h-5" />
      </button>
    </div>
  );


case "Profil Utilisateur":
  return (
    <div className="mt-6 max-w-4xl mx-auto flex gap-8">
      {/* Colonne 1 : Formulaire de modification */}
      <form
        onSubmit={handleProfileSubmit}
        className="flex-1 p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60"
      >
        <h2 className="text-2xl font-semibold mb-4">Modifier Profil</h2>

        <div className="flex items-center gap-6 mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-gray-600">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UploadCloud size={40} />
            )}
          </div>
          <label className="cursor-pointer text-indigo-600 hover:underline">
            Changer Avatar
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <label className="block mb-2 font-medium text-gray-700">
          Nom complet
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </label>

        <label className="block mb-2 font-medium text-gray-700">
          Email actuel
          <input
            type="email"
            name="email"
            value={profile.email}
            disabled
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
          <small className="text-gray-500">
            Pour changer l&apos;email, saisissez un nouvel email ci-dessous et validez.
          </small>
        </label>

        <label className="block mb-4 font-medium text-gray-700">
          Nouvel email
          <input
            type="email"
            name="newEmail"
            value={profile.newEmail}
            onChange={handleProfileChange}
            placeholder="Laissez vide pour ne pas changer"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block mb-2 font-medium text-gray-700">
          Mot de passe actuel
          <input
            type="password"
            name="currentPassword"
            value={profile.currentPassword}
            onChange={handleProfileChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required={profile.newPassword.length > 0}
          />
        </label>

        <label className="block mb-2 font-medium text-gray-700">
          Nouveau mot de passe
          <input
            type="password"
            name="newPassword"
            value={profile.newPassword}
            onChange={handleProfileChange}
            placeholder="Laissez vide pour ne pas changer"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </label>

        <label className="block mb-4 font-medium text-gray-700">
          Confirmer nouveau mot de passe
          <input
            type="password"
            name="confirmPassword"
            value={profile.confirmPassword}
            onChange={handleProfileChange}
            placeholder="Laissez vide pour ne pas changer"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </label>

        {profileMessage && (
          <p
            className={`mb-4 font-semibold ${
              profileMessage.includes("succès") ? "text-green-600" : "text-red-600"
            }`}
          >
            {profileMessage}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Enregistrer les modifications
        </button>

        <button
          type="button"
          onClick={() => setSelectedCard(null)}
          className="mt-3 w-full py-2 rounded-md border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
        >
          Annuler
        </button>
      </form>

      {/* Colonne 2 : Affichage du profil */}
      <div className="flex-1 p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Votre Profil</h2>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden mb-4 flex items-center justify-center text-gray-600">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UploadCloud size={64} />
            )}
          </div>
          <p className="text-lg font-medium">{profile.name || "Nom non défini"}</p>
          <p className="text-gray-600">{profile.email}</p>
          {/* Tu peux ajouter d'autres infos profil ici */}
        </div>
      </div>
    </div>
  );

      case "Sécurité et Authentification":
        return (
          <section className="mt-6 p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 max-w-md mx-auto text-gray-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck /> Sécurité et Authentification
            </h2>

            <label className="inline-flex items-center gap-2 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={twoFAEnabled}
                onChange={toggleTwoFA}
                className="form-checkbox"
              />
              <span>Activer l’authentification à deux facteurs (2FA)</span>
            </label>

            <div className="mb-6 max-h-40 overflow-auto border border-gray-300 rounded p-3 bg-gray-50">
              <h3 className="font-semibold mb-2">Historique des connexions</h3>
              <ul className="text-sm space-y-1">
                {connectionHistory.map((item, i) => (
                  <li key={i}>
                    {item.date} — IP: {item.ip}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={logoutAllSessions}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold"
            >
              Déconnecter toutes les sessions
            </button>
          </section>
        );

      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case "reports":
        return <GlassDashboard />;

      case "help":
      case "settings":
        return (
          <div className="flex-1 min-h-screen relative bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 overflow-y-auto max-h-screen p-8">
            <div className="fixed inset-0">
              <div
                className={`absolute inset-0 ${
                  activeItem === "help"
                    ? "bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.2),transparent_50%)]"
                    : "bg-[radial-gradient(circle_at_80%_20%,rgba(71,85,105,0.2),transparent_50%)]"
                }`}
              ></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl p-8">
              <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                {activeItem === "help" ? (
                  <>
                    <LifeBuoy className="w-7 h-7 text-indigo-600" /> Centre d&apos;Aide
                  </>
                ) : (
                  <>
                    <SettingsIcon className="w-7 h-7 text-gray-700" /> Paramètres
                  </>
                )}
              </h1>
              <p className="mb-6">
                {activeItem === "help"
                  ? "Voici des ressources adaptées aux entreprises :"
                  : "Configurez vos préférences système et utilisateurs."}
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {(activeItem === "help"
                  ? ["Support Technique", "Documentation"]
                  : ["Profil Utilisateur", "Sécurité et Authentification"]
                ).map((section) => (
                  <div
                    key={section}
                    className={`p-4 rounded-xl border shadow cursor-pointer transform transition hover:scale-105 hover:shadow-xl active:scale-95
                      ${selectedCard === section ? (activeItem === "help" ? "bg-indigo-100 border-indigo-400" : "bg-gray-100 border-gray-400") : "bg-white/40 border-white/50"}`}
                    onClick={() => toggleSelectedCard(section)}
                  >
                    {/* Icônes */}
                    {section === "Support Technique" && <LifeBuoy className="w-6 h-6 text-indigo-500 mb-2" />}
                    {section === "Documentation" && <BookOpen className="w-6 h-6 text-indigo-600 mb-2" />}
                    {section === "Profil Utilisateur" && <UserPlus className="w-6 h-6 text-gray-700 mb-2" />}
                    {section === "Sécurité et Authentification" && <ShieldCheck className="w-6 h-6 text-gray-700 mb-2" />}

                    <h2 className="text-lg font-semibold mb-1">{section}</h2>
                    <p className="text-sm">
                      {section === "Support Technique" && "Assistance 24/7 pour vos problèmes techniques."}
                      {section === "Documentation" && "Accédez à la documentation complète."}
                      {section === "Profil Utilisateur" && "Modifiez votre nom, email, mot de passe et avatar."}
                      {section === "Sécurité et Authentification" && "Gérez 2FA, historique et sessions."}
                    </p>
                  </div>
                ))}
              </div>

              {selectedCard && renderCardDetails(selectedCard)}
            </div>
          </div>
        );

      default:
        return <GlassDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Background with animated gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(156,146,172,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Sidebar */}
      <div className="relative z-20">
        <GlassSidebar
          activeItem={activeItem}
          onItemClick={(item) => {
            setActiveItem(item);
            setSelectedCard(null);
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
}
