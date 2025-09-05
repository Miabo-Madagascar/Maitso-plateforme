import { useState, useEffect } from "react";
import { HelpCircle, Settings, ChevronLeft, ChevronRight, Home, Users, Calendar, FileText, CreditCard, Menu } from "lucide-react";

interface GlassSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function GlassSidebar({ activeItem, onItemClick }: GlassSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setIsCollapsed(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "team", label: "Team", icon: Users },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const supportItems = [
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const toggleSidebar = () => {
    if (isMobile) setMobileOpen(!mobileOpen);
    else setIsCollapsed(!isCollapsed);
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
            className="fixed top-4 left-4 z-50 bg-white/20 backdrop-blur-md rounded-lg p-2 border border-white/30 shadow-lg text-gray-700 transition-transform duration-300"
          >
            <Menu className="w-5 h-5" />
          </button>
          {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />}
        </>
      )}

      {/* Sidebar */}
      <div className={`
        h-screen fixed md:relative z-40 bg-white/15 backdrop-blur-xl border-r border-white/20 shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isMobile ? `${mobileOpen ? 'translate-x-0' : '-translate-x-full'} w-52` : isCollapsed ? 'w-16' : 'w-52'}
      `}>
        {/* Toggle button */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-6 z-10 bg-white/20 backdrop-blur-md rounded-full p-1.5 border border-white/30 shadow-lg hover:bg-white/30 transition-all"
          >
            {isCollapsed ? <ChevronRight className="w-3 h-3 text-gray-700" /> : <ChevronLeft className="w-3 h-3 text-gray-700" />}
          </button>
        )}

        <div className="p-5">
          {/* Logo */}
          <div className={`flex items-center gap-3 mb-8 ${isCollapsed ? 'justify-center' : ''}`}>
            {!isCollapsed && (
              <>
                <img src="/src/side.jpg" alt="Logo Maitso" className="w-10 h-10 rounded-lg object-contain shadow-md" />
                <div>
                  <span className="text-lg font-semibold text-gray-900">MAITSO</span>
                  <p className="text-[10px] text-gray-600 font-medium leading-tight">ENVIRONNEMENT</p>
                </div>
              </>
            )}
          </div>

          {/* Menu principal */}
          <nav className="space-y-1 mb-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  className={`
                    w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-start px-3'} 
                    py-2.5 rounded-xl text-sm transition-all duration-300
                    ${isActive
                      ? "bg-gradient-to-r from-blue-500/25 to-purple-500/25 backdrop-blur-sm border border-white/30 text-blue-700"
                      : "text-gray-700 hover:bg-white/20 hover:backdrop-blur-sm hover:border hover:border-white/20"
                    }
                  `}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className={`p-1.5 rounded-md flex-shrink-0 ${isActive ? "bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-md" : "bg-gray-100/80 text-gray-600"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {!isCollapsed && <span className="font-medium ml-2">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Support */}
          <div className="space-y-1">
            {!isCollapsed && <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Support</p>}
            {supportItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`
                    w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-start px-3'} 
                    py-2.5 rounded-xl text-sm text-gray-700 transition-all duration-300
                    hover:bg-white/20 hover:backdrop-blur-sm hover:border hover:border-white/20
                  `}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="p-1.5 rounded-md bg-gray-100/80 text-gray-600 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  {!isCollapsed && <span className="font-medium ml-2">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
