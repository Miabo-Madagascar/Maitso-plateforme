import { BarChart3, Users, Zap, HelpCircle, Settings, Library } from "lucide-react";
import { GlassButton } from "../ui/GlassButton";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const menuItems = [
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'people', label: 'People', icon: Users },
    { id: 'activities', label: 'Activities', icon: Zap },
  ];

  const supportItems = [
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-semibold text-gray-900">MAITSO</span>
          <span className="text-sm text-gray-500 ml-1">ENVIRONNEMENT</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <nav className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <GlassButton
                key={item.id}
                variant={activeItem === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start mb-1 ${
                  activeItem === item.id 
                    ? "bg-blue-50 text-blue-700 border-blue-200" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => onItemClick(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </GlassButton>
            );
          })}
        </nav>

        {/* Support Section */}
        <div className="px-3 mt-8">
          <p className="text-xs font-medium text-gray-500 mb-3">Support</p>
          {supportItems.map((item) => {
            const Icon = item.icon;
            return (
              <GlassButton
                key={item.id}
                variant="ghost"
                className="w-full justify-start mb-1 text-gray-700 hover:bg-gray-50"
                onClick={() => onItemClick(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </GlassButton>
            );
          })}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="p-6 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <p className="font-medium text-gray-900">MAITSO</p>
          <p>Maitrisetonenvironnement.com</p>
        </div>
      </div>
    </div>
  );
}