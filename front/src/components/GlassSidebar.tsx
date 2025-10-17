import { useState, useEffect, memo } from "react";
import {
  HelpCircle,
  Settings,
  ChevronLeft,
  Home,
  Users,
  Calendar,
  FileText,
  CreditCard,
  Menu,
  X,
} from "lucide-react";

interface GlassSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

interface SidebarItemProps {
  item: { id: string; label: string; icon: React.ElementType };
  isCollapsed: boolean;
  isActive?: boolean;
  onClick: (id: string) => void;
}

// ---------------- Sidebar Item ----------------
const SidebarItem = memo(
  ({ item, isCollapsed, isActive, onClick }: SidebarItemProps) => {
    const Icon = item.icon;

    return (
      <div className="group relative">
        <button
          className={`
            w-full flex items-center ${
              isCollapsed ? "justify-center px-2" : "justify-start px-3"
            }
            py-2 rounded-xl text-sm font-medium transition-transform duration-200 ease-out
            transform hover:scale-[1.02] active:scale-[0.98]
            relative overflow-hidden
            ${isActive
              ? "bg-gradient-to-r from-indigo-500/25 via-purple-500/20 to-pink-500/15 backdrop-blur-sm border border-white/30 text-indigo-800 shadow-lg"
              : "text-gray-700 hover:bg-gradient-to-r hover:from-white/25 hover:via-blue-50/30 hover:to-indigo-50/25 hover:backdrop-blur-sm hover:border hover:border-white/25"
            }
          `}
          onClick={() => onClick(item.id)}
          aria-label={item.label}
          aria-current={isActive ? "page" : undefined}
        >
          {/* Effet de brillance animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />

          <div
            className={`
              p-1.5 rounded-lg flex-shrink-0 transition-all duration-200 relative z-10
              ${isActive
                ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md scale-105"
                : "bg-white/50 backdrop-blur-sm text-gray-600 group-hover:bg-white/70"
              }
            `}
          >
            <Icon className="w-4 h-4" />
          </div>

          {!isCollapsed && (
            <span className="ml-2.5 relative z-10 tracking-wide">{item.label}</span>
          )}

          {/* Indicateur actif vertical */}
          {isActive && !isCollapsed && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-6 w-1.5 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full animate-pulse" />
          )}
        </button>

        {/* Tooltip pour collapsed */}
        {isCollapsed && (
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
            <div className="bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg px-2.5 py-1.5 shadow-xl border border-white/10">
              {item.label}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-gray-900/90 rotate-45 border-l border-b border-white/10" />
            </div>
          </div>
        )}
      </div>
    );
  }
);

// ---------------- Glass Sidebar ----------------
export function GlassSidebar({ activeItem, onItemClick }: GlassSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsCollapsed(true);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "team", label: "Team", icon: Users },
    { id: "calendar", label: "Plan’Event", icon: Calendar },
    { id: "documents", label: "Modudoc", icon: FileText },
    { id: "billing", label: "AbofactX", icon: CreditCard },
  ];

  const supportItems = [
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    if (isMobile) setMobileOpen(false);
  };

  return (
    <>
      {/* Bouton menu mobile */}
      {isMobile && (
        <>
          <button
            onClick={toggleSidebar}
            className={`
              fixed top-4 left-4 z-50 transition-transform duration-200 ease-out
              bg-white/20 backdrop-blur-xl rounded-xl p-2.5 
              border border-white/30 shadow-lg
              text-gray-700 hover:bg-white/30 hover:scale-105 active:scale-95
              ${mobileOpen ? "rotate-90" : "rotate-0"}
            `}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Overlay mobile */}
          {mobileOpen && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
              onClick={() => setMobileOpen(false)}
            />
          )}
        </>
      )}

      {/* Sidebar principale */}
      <div
        className={`
          h-screen fixed md:relative z-40 transition-all duration-300 ease-out
          bg-gradient-to-br from-white/20 via-white/15 to-white/10 
          backdrop-blur-2xl border-r border-white/25 
          shadow-xl shadow-blue-500/5
          ${isMobile
            ? `${mobileOpen ? "translate-x-0" : "-translate-x-full"} w-56`
            : isCollapsed
            ? "w-16"
            : "w-56"
          }
        `}
      >
        {/* Effet de gradient léger animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/3 via-purple-500/3 to-pink-500/3 animate-gradient-x" />

        {/* Toggle desktop */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`
              absolute -right-3 top-6 z-10 transition-transform duration-200 ease-out
              bg-white/25 backdrop-blur-xl rounded-full p-1.5
              border border-white/30 shadow-lg
              hover:bg-white/35 hover:scale-110 active:scale-95
              ${isCollapsed ? "rotate-180" : "rotate-0"}
            `}
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-gray-700" />
          </button>
        )}

        <div className="p-4 h-full flex flex-col relative z-10">
          {/* Logo */}
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-300 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-sm opacity-20 animate-pulse" />
              <img
                src="/side.jpg"
                alt="Logo Maitso"
                className="relative w-9 h-9 rounded-xl object-cover shadow-lg border border-white/20 hover:scale-105 transition-transform duration-200"
              />
            </div>

            {!isCollapsed && (
              <div className="transition-all duration-300">
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                  MAITSO
                </h1>
                <p className="text-[10px] text-gray-600 font-medium tracking-wider uppercase opacity-75">
                  Environnement
                </p>
              </div>
            )}
          </div>

          {/* Menu principal */}
          <nav className="space-y-1 mb-6 flex-1">
            <div className="space-y-0.5">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  isCollapsed={isCollapsed}
                  isActive={activeItem === item.id}
                  onClick={handleItemClick}
                />
              ))}
            </div>
          </nav>

          {/* Section support */}
          <div className="space-y-1 border-t border-white/15 pt-4">
            {!isCollapsed && (
              <p className="text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-wider px-2">
                Support
              </p>
            )}
            <div className="space-y-0.5">
              {supportItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  isCollapsed={isCollapsed}
                  onClick={handleItemClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient animation keyframes */}
      <style>
        {`
          @keyframes gradient-x {
            0%,100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 6s ease infinite;
          }
        `}
      </style>
    </>
  );
}
