import { 
  AlertTriangle, 
  LogOut, 
  Shield, 
  MapPin, 
  Calendar,
  Monitor,
  Smartphone,
  Laptop,
  Chrome,
  CheckCircle2,
  X
} from "lucide-react";
import { useState } from "react";

interface Connection {
  id: string;
  location: string;
  browser: string;
  date: string;
  isSuspicious?: boolean;
}

interface Device {
  id: string;
  name: string;
  type: "laptop" | "mobile" | "desktop";
  os: string;
  location: string;
  isActive: boolean;
}

export default function SecuritySettings() {
  const [connections] = useState<Connection[]>([
    { 
      id: "1", 
      location: "Paris, France", 
      browser: "Chrome", 
      date: "15/09/2025",
      isSuspicious: true 
    },
    { 
      id: "2", 
      location: "Antananarivo, Madagascar", 
      browser: "Edge", 
      date: "12/09/2025" 
    },
    { 
      id: "3", 
      location: "Lyon, France", 
      browser: "Safari", 
      date: "10/09/2025" 
    }
  ]);

  const [devices, setDevices] = useState<Device[]>([
    { 
      id: "1", 
      name: "MacBook Pro", 
      type: "laptop", 
      os: "macOS", 
      location: "Paris",
      isActive: true 
    },
    { 
      id: "2", 
      name: "iPhone 14", 
      type: "mobile", 
      os: "iOS", 
      location: "Antananarivo",
      isActive: true 
    },
    { 
      id: "3", 
      name: "iPad Air", 
      type: "mobile", 
      os: "iOS", 
      location: "Lyon",
      isActive: false 
    }
  ]);

  const handleLogoutDevice = (deviceId: string) => {
    setDevices(devices.filter(d => d.id !== deviceId));
  };

  const handleLogoutAll = () => {
    setDevices([]);
  };

  const getDeviceIcon = (type: Device["type"]) => {
    switch (type) {
      case "laptop":
        return <Laptop className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "desktop":
        return <Monitor className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getBrowserIcon = () => {
    return <Chrome className="w-4 h-4" />;
  };

  return (
    <div className="w-full h-screen p-3 sm:p-4 bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg text-gray-900 flex flex-col">
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Recent Connections */}
          <div className="glass rounded-2xl p-6 shadow-glass transition-smooth hover:shadow-hover animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Connexions récentes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Historique des {connections.length} dernières connexions
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {connections.map((connection, idx) => (
                <div 
                  key={connection.id}
                  className="group glass-strong rounded-xl p-4 transition-smooth hover:scale-[1.02] hover:shadow-md"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 text-foreground font-medium">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-sm">{connection.location}</span>
                        </div>
                        {connection.isSuspicious && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">
                            <AlertTriangle className="w-3 h-3" />
                            Suspect
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          {getBrowserIcon()}
                          <span>{connection.browser}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{connection.date}</span>
                        </div>
                      </div>
                    </div>

                    {connection.isSuspicious && (
                      <div className="p-2 rounded-lg bg-warning/10 animate-glow">
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-info/10 border border-info/20">
              <p className="text-xs text-info flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  Si vous ne reconnaissez pas une connexion, changez votre mot de passe immédiatement.
                </span>
              </p>
            </div>
          </div>

          {/* Connected Devices */}
          <div className="glass rounded-2xl p-6 shadow-glass transition-smooth hover:shadow-hover animate-slide-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Monitor className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Appareils connectés
                </h2>
                <p className="text-sm text-muted-foreground">
                  {devices.filter(d => d.isActive).length} appareil(s) actif(s)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {devices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Monitor className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun appareil connecté</p>
                </div>
              ) : (
                devices.map((device, idx) => (
                  <div 
                    key={device.id}
                    className="group glass-strong rounded-xl p-4 transition-smooth hover:scale-[1.02] hover:shadow-md"
                    style={{ animationDelay: `${(idx + 3) * 100}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                          {getDeviceIcon(device.type)}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-foreground">
                              {device.name}
                            </h3>
                            {device.isActive && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                Actif
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="font-medium">{device.os}</span>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3" />
                              <span>{device.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleLogoutDevice(device.id)}
                        className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-smooth opacity-0 group-hover:opacity-100"
                        title="Déconnecter cet appareil"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {devices.length > 0 && (
              <button 
                onClick={handleLogoutAll}
                className="mt-6 w-full px-4 py-3 rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold transition-smooth hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnecter tous les appareils
              </button>
            )}
          </div>
        </div>

        {/* Security Tips */}
        <div className="glass rounded-2xl p-6 shadow-glass animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-info/10">
              <Shield className="w-5 h-5 text-info" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Conseils de sécurité
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Vérifiez régulièrement les connexions suspectes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Déconnectez les appareils que vous n'utilisez plus</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Activez l'authentification à deux facteurs pour plus de sécurité</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
