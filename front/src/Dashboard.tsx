import { useState, type JSX, type SetStateAction } from "react";
import { GlassSidebar } from "./components/GlassSidebar";
import { GlassDashboard } from "./components/GlassDashboard";

// Icônes de navigation
import {
  LifeBuoy, 
  Settings as SettingsIcon, 
  Users, 
  Calendar as CalendarIcon,
  FileText, 
  CreditCard,
  ArrowRight,
} from "lucide-react";

// Données simulées
import { MOCK_BILLING } from "./data/mockData";

// Sections du dashboard
import SecuritySettings from "./cards/SecuritySettings";
import DocumentationSection from "./cards/DocumentationSection";
import RolesPermissionsSection from "./cards/RolesPermissionsSection";
import EventsSection from "./cards/EventsSection";
import Planification from "./cards/Planification";
import TeamMembers from "./cards/TeamMembers";
import SharedDocsSection from "./cards/SharedDocsSection";
import TemplatesSection from "./cards/TemplatesSection";
import BillingSection from "./cards/BillingSection";
import AbonnementsSection from "./cards/AbonnementsSection";
import UserProfileSection from "./cards/UserProfileSection";
import SupportTechniqueSection from "./cards/SupportTechniqueSection";

// Configuration des sections avec métadonnées améliorées
const SECTIONS_CONFIG = {
  help: {
    title: "Support & Aide",
    icon: LifeBuoy,
    color: "indigo",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    bgGradient: "from-indigo-50 via-purple-50 to-pink-50",
    glowColor: "indigo-500/20",
    sections: [
      {
        id: "Support Technique",
        title: "Support Technique",
        description: "Assistance technique 24/7 pour tous vos besoins",
        badge: "24/7"
      },
      {
        id: "Documentation",
        title: "Documentation",
        description: "Guides complets et tutoriels détaillés",
        badge: "Nouveau"
      }
    ]
  },
  settings: {
    title: "Paramètres",
    icon: SettingsIcon,
    color: "slate",
    gradient: "from-slate-600 via-gray-600 to-zinc-600",
    bgGradient: "from-slate-50 via-gray-50 to-zinc-50",
    glowColor: "slate-500/20",
    sections: [
      {
        id: "Profil Utilisateur",
        title: "Profil Utilisateur",
        description: "Personnalisez votre profil et préférences",
        badge: "Personnel"
      },
      {
        id: "Sécurité et Authentification",
        title: "Sécurité",
        description: "Protégez votre compte avec des mesures avancées",
        badge: "Sécurisé"
      }
    ]
  },
  team: {
    title: "Équipe",
    icon: Users,
    color: "emerald",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
    glowColor: "emerald-500/20",
    sections: [
      {
        id: "Membres",
        title: "Membres",
        description: "Gérez votre équipe et leurs accès",
        badge: "Actif"
      },
      {
        id: "Rôles et Permissions",
        title: "Rôles & Permissions",
        description: "Définissez les niveaux d'accès et autorisations",
        badge: "Admin"
      }
    ]
  },
  calendar: {
    title: "Calendrier",
    icon: CalendarIcon,
    color: "orange",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    bgGradient: "from-orange-50 via-amber-50 to-yellow-50",
    glowColor: "orange-500/20",
    sections: [
      {
        id: "Événements à venir",
        title: "Événements",
        description: "Planifiez et suivez tous vos événements",
        badge: "Urgent"
      },
      {
        id: "Planification",
        title: "Planification",
        description: "Organisez vos tâches et projets efficacement",
        badge: "Productif"
      }
    ]
  },
  documents: {
    title: "Documents",
    icon: FileText,
    color: "blue",
    gradient: "from-blue-500 via-sky-500 to-cyan-500",
    bgGradient: "from-blue-50 via-sky-50 to-cyan-50",
    glowColor: "blue-500/20",
    sections: [
      {
        id: "Docs partagés",
        title: "Documents Partagés",
        description: "Centralisez et partagez vos fichiers",
        badge: "Partagé"
      },
      {
        id: "Modèles",
        title: "Modèles",
        description: "Utilisez des templates prêts à l'emploi",
        badge: "Premium"
      }
    ]
  },
  billing: {
    title: "Facturation",
    icon: CreditCard,
    color: "purple",
    gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
    bgGradient: "from-purple-50 via-violet-50 to-fuchsia-50",
    glowColor: "purple-500/20",
    sections: [
      {
        id: "Factures",
        title: "Factures",
        description: "Suivez vos paiements et historique",
        badge: "Payé"
      },
      {
        id: "Abonnements",
        title: "Abonnements",
        description: "Gérez vos souscriptions et plans",
        badge: "Pro"
      }
    ]
  }
};

/**
 * Composant principal du Dashboard avec design system amélioré
 */
export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [, setSelectedCard] = useState<string | null>(null);
  const [, setIsCardExpanded] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  /**
   * Couleurs de statut optimisées avec design tokens
   */
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      "Terminé": "bg-emerald-100/80 text-emerald-700 border-emerald-200/60 shadow-emerald-100/50",
      "Payé": "bg-emerald-100/80 text-emerald-700 border-emerald-200/60 shadow-emerald-100/50",
      "Résolu": "bg-emerald-100/80 text-emerald-700 border-emerald-200/60 shadow-emerald-100/50",
      "En cours": "bg-blue-100/80 text-blue-700 border-blue-200/60 shadow-blue-100/50",
      "Ouvert": "bg-blue-100/80 text-blue-700 border-blue-200/60 shadow-blue-100/50",
      "À faire": "bg-orange-100/80 text-orange-700 border-orange-200/60 shadow-orange-100/50",
      "En attente": "bg-yellow-100/80 text-yellow-700 border-yellow-200/60 shadow-yellow-100/50",
    };
    return statusMap[status] || "bg-gray-100/80 text-gray-700 border-gray-200/60 shadow-gray-100/50";
  };

  /**
   * Rendu des détails de carte avec composants optimisés
   */
  const renderCardDetails = (title: string) => {
    const components: Record<string, JSX.Element> = {
      "Membres": <TeamMembers />,
      "Rôles et Permissions": <RolesPermissionsSection />,
      "Événements à venir": <EventsSection />,
      "Planification": <Planification />,
      "Docs partagés": <SharedDocsSection />,
      "Modèles": <TemplatesSection />,
      "Factures": <BillingSection />,
      "Abonnements": <AbonnementsSection abonnementsData={MOCK_BILLING} getStatusColor={getStatusColor} />,
      "Profil Utilisateur": <UserProfileSection />,
      "Support Technique": <SupportTechniqueSection />,
      "Documentation": <DocumentationSection />,
      "Sécurité et Authentification": <SecuritySettings />,
    };

    return components[title] || null;
  };

  /**
   * Rendu du contenu principal avec design system premium et responsive
   */
  const renderContent = () => {
    const config = SECTIONS_CONFIG[activeItem as keyof typeof SECTIONS_CONFIG];

    if (config) {
      const IconComponent = config.icon;

      return (
        <div className="w-full h-full relative overflow-y-auto scrollbar-hide">
          {/* Background animé premium */}
          <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} transition-all duration-1000`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,182,193,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(99,102,241,0.03)_60deg,transparent_120deg)]" />
          </div>
          
          {/* Contenu responsive sans marges */}
          <div className="relative z-10 w-full h-full">
            <div className="w-full h-full p-2 sm:p-3 md:p-4 lg:p-6">
              {/* Layout vertical responsive */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {config.sections.map((section, index) => (
                  <div 
                    key={section.id}
                    className={`group relative bg-white/70 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-500 p-3 sm:p-4 md:p-5 hover:-translate-y-1 ${
                      hoveredSection === section.id ? 'ring-2 ring-purple-200/50' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Header de section responsive */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`relative p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${config.gradient} text-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                          <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors truncate">
                            {section.title}
                          </h2>
                          {section.badge && (
                            <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${config.gradient} text-white shadow-sm`}>
                              {section.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    </div>

                    <div className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      {section.description}
                    </div>

                    {/* Contenu avec bordure premium */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent h-px top-0" />
                      <div className="pt-3 sm:pt-4">
                        <div className="w-full overflow-hidden">
                          {renderCardDetails(section.id)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Dashboard par défaut avec transition
    return (
      <div className="w-full h-full transition-all duration-500">
        <GlassDashboard />
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Pattern de fond amélioré */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[length:24px_24px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(99,102,241,0.02)_50%,transparent_51%)] bg-[length:20px_20px]" />
      </div>

      {/* Sidebar avec z-index optimisé */}
      <div className="relative z-30 flex-shrink-0">
        <GlassSidebar
          activeItem={activeItem}
          onItemClick={(item: SetStateAction<string>) => {
            setActiveItem(item);
            setSelectedCard(null);
            setIsCardExpanded(false);
          }}
        />
      </div>

      {/* Contenu principal - occupe tout l'espace restant */}
      <div className="relative z-10 flex-1 min-w-0">
        {renderContent()}
      </div>

      {/* Styles CSS améliorés */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}