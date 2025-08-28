// GlassSidebar.tsx
import { BarChart3, HelpCircle, Settings, ChevronRight } from "lucide-react";
import { GlassButton } from "../ui/GlassButton";

// Props attendues par le composant
interface GlassSidebarProps {
  activeItem: string; // Élément actuellement sélectionné
  onItemClick: (item: string) => void; // Fonction de callback quand on clique
}

export function GlassSidebar({ activeItem, onItemClick }: GlassSidebarProps) {
  // Menu principal de navigation
  const menuItems = [
    { id: "reports", label: "Reports", icon: BarChart3 },
  ];

  // Liens de support
  const supportItems = [
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-56 md:w-64 h-screen relative">
      {/* Fond flouté avec bordure */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl">
        <div className="p-6 md:p-8">
          {/* Logo en haut */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/side.jpg" // Change ce chemin si besoin (ex: /side.jpg)
              alt="Logo Maitso"
              className="w-12 h-12 rounded-lg object-contain shadow-md"
            />
            <div>
              <span className="text-lg font-semibold text-gray-900">MAITSO</span>
              <p className="text-[10px] text-gray-600 font-medium leading-tight">
                ENVIRONNEMENT
              </p>
            </div>
          </div>

          {/* Navigation principale */}
          <nav className="space-y-1 mb-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <GlassButton
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start px-3 py-2 h-auto rounded-xl text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30 text-blue-700"
                      : "text-gray-700 hover:bg-white/20 hover:backdrop-blur-sm hover:border hover:border-white/20 hover:shadow-lg"
                  }`}
                  onClick={() => onItemClick(item.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    {/* Icône + label */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-md ${
                          isActive
                            ? "bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-md"
                            : "bg-gray-100/80 text-gray-600"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>

                    {/* Chevron si actif */}
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </GlassButton>
              );
            })}
          </nav>

          {/* Bloc support en bas */}
          <div className="space-y-1">
            <p className="text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Support
            </p>
            {supportItems.map((item) => {
              const Icon = item.icon;

              return (
                <GlassButton
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 h-auto rounded-xl text-sm text-gray-700 hover:bg-white/20 hover:backdrop-blur-sm hover:border hover:border-white/20 hover:shadow-md transition-all duration-300"
                  onClick={() => onItemClick(item.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-gray-100/80 text-gray-600">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                </GlassButton>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
