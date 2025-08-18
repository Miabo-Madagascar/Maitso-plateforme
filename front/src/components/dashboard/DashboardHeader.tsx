import React, { useState, useContext, createContext, useMemo, useCallback } from "react";
import {Bell,
  CircleAlert,
  TriangleAlert,
  Info,
  Filter,
  CheckCheck,
  Trash2,
  Clock,
  SortAsc,
  SortDesc,
  Download,
  LogOut,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { GlassButton } from "../ui/GlassButton";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale/fr";

type NotificationSeverity = "alert" | "warning" | "normal";
type NotificationType = "water" | "sound" | "temperature" | "air" | "energy";

interface AppNotification {
  id: string;
  title: string;
  percentage: number;
  type: NotificationType;
  severity: NotificationSeverity;
  timestamp: number;
  read: boolean;
}

interface NotificationsContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (n: Omit<AppNotification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  remove: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}

const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const now = Date.now();
    return [
      {
        id: "1",
        title: "Qualité de l'air",
        percentage: 37,
        type: "air",
        severity: "alert",
        timestamp: now - 2460000,
        read: false,
      },
      {
        id: "2",
        title: "Qualité de l'air",
        percentage: 10,
        type: "air",
        severity: "alert",
        timestamp: now - 3600000,
        read: false,
      },
      {
        id: "3",
        title: "Qualité de l'air",
        percentage: 31,
        type: "air",
        severity: "warning",
        timestamp: now - 3660000,
        read: false,
      },
      {
        id: "4",
        title: "Qualité de l'air",
        percentage: 58,
        type: "air",
        severity: "normal",
        timestamp: now - 1380000,
        read: false,
      },
      {
        id: "5",
        title: "Qualité de l'air",
        percentage: 10,
        type: "air",
        severity: "normal",
        timestamp: now - 2040000,
        read: false,
      },
    ];
  });

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const addNotification = useCallback((n: Omit<AppNotification, "id" | "timestamp" | "read">) => {
    const newN: AppNotification = {
      ...n,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      read: false,
    };
    setNotifications((prev) => [newN, ...prev].slice(0, 50));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        remove,
        markAllAsRead,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

const SeverityIcon: React.FC<{ severity: NotificationSeverity }> = ({ severity }) => {
  if (severity === "alert") return <CircleAlert className="h-4 w-4 text-destructive" aria-hidden />;
  if (severity === "warning") return <TriangleAlert className="h-4 w-4 text-warning" aria-hidden />;
  return <Info className="h-4 w-4 text-muted-foreground" aria-hidden />;
};

// Types pour les filtres
type SeverityFilterValue = "all" | NotificationSeverity;
type TypeFilterValue = "all" | NotificationType;
type SortByValue = "date_desc" | "date_asc" | "severity_desc" | "severity_asc";

const NotificationCenter: React.FC = () => {
  const { notifications, unreadCount, markAsRead, remove, markAllAsRead, clearAll } = useNotifications();
  const [severityFilter, setSeverityFilter] = useState<SeverityFilterValue>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilterValue>("all");
  const [sortBy, setSortBy] = useState<SortByValue>("date_desc");

  const hasHighPercentage = useMemo(() => notifications.some((n) => n.percentage > 50), [notifications]);

  const items = useMemo(() => {
    let list = [...notifications];
    if (severityFilter !== "all") list = list.filter((n) => n.severity === severityFilter);
    if (typeFilter !== "all") list = list.filter((n) => n.type === typeFilter);
    const sevRank = { alert: 3, warning: 2, normal: 1 } as const;
    list.sort((a, b) => {
      switch (sortBy) {
        case "date_asc":
          return a.timestamp - b.timestamp;
        case "severity_desc":
          return sevRank[b.severity] - sevRank[a.severity];
        case "severity_asc":
          return sevRank[a.severity] - sevRank[b.severity];
        default:
          return b.timestamp - a.timestamp;
      }
    });
    return list;
  }, [notifications, severityFilter, typeFilter, sortBy]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GlassButton
          variant="ghost"
          size="icon"
          aria-label="Centre de notifications"
          className={`relative backdrop-blur-md bg-white/30 border border-white/20 rounded-full hover:bg-white/40 transition-colors duration-200 group
          ${hasHighPercentage ? "animate-pulse border-red-600 text-red-600" : ""}`}
          style={{
            animation: hasHighPercentage ? "pulseRed 1.5s infinite" : undefined,
          }}
        >
          <style>
            {`
            @keyframes pulseRed {
              0%, 100% { color: #dc2626; }
              50% { color: #f87171; }
            }
            `}
          </style>
          <Bell className={`h-5 w-5 transition-transform group-hover:scale-110 ${hasHighPercentage ? "text-red-600" : ""}`} />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 rounded-full px-1.5 py-0 text-[10px] leading-none flex items-center justify-center min-w-[18px] h-4 animate-pulse"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </GlassButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 bg-card/90 backdrop-blur-xl border border-border/50 shadow-lg rounded-xl overflow-hidden animate-enter"
      >
        {/* En-tête */}
        <div className="bg-gradient-to-r from-red-500/20 to-red-600/30 p-4 rounded-md border border-red-400/50 shadow-md backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold text-lg text-red-700">Notifications</h3>
            </div>
            <span className="text-sm text-red-700 bg-red-100/50 px-2 py-1 rounded-full font-medium select-none">
              {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Filtres */}
        <div className="px-3 py-2 border-b">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={severityFilter} onValueChange={(v: SeverityFilterValue) => setSeverityFilter(v)}>
              <SelectTrigger className="h-8 w-24 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg text-sm font-medium text-gray-900 hover:bg-white/30 shadow-sm transition">
                <SelectValue placeholder="Gravité" />
              </SelectTrigger>
              <SelectContent className="bg-white/30 backdrop-blur-md border border-white/40 rounded-lg shadow-lg">
                <SelectItem value="all" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Toutes
                </SelectItem>
                <SelectItem value="alert" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Alerte
                </SelectItem>
                <SelectItem value="warning" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Warning
                </SelectItem>
                <SelectItem value="normal" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Normale
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={(v: TypeFilterValue) => setTypeFilter(v)}>
              <SelectTrigger className="h-8 w-24 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg text-sm font-medium text-gray-900 hover:bg-white/30 shadow-sm transition">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-white/30 backdrop-blur-md border border-white/40 rounded-lg shadow-lg">
                <SelectItem value="all" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Types
                </SelectItem>
                <SelectItem value="water" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Eau
                </SelectItem>
                <SelectItem value="sound" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Son
                </SelectItem>
                <SelectItem value="temperature" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Température
                </SelectItem>
                <SelectItem value="air" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Air
                </SelectItem>
                <SelectItem value="energy" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Énergie
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v: SortByValue) => setSortBy(v)}>
              <SelectTrigger className="h-8 w-40 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg text-sm font-medium text-gray-900 hover:bg-white/30 shadow-sm transition">
                <SelectValue placeholder="Tri" />
              </SelectTrigger>
              <SelectContent className="bg-white/30 backdrop-blur-md border border-white/40 rounded-lg shadow-lg">
                <SelectItem value="date_desc" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 flex items-center gap-2 text-sm">
                  <SortDesc className="h-4 w-4 text-blue-600" />
                  Plus récentes
                </SelectItem>
                <SelectItem value="date_asc" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 flex items-center gap-2 text-sm">
                  <SortAsc className="h-4 w-4 text-blue-600" />
                  Plus anciennes
                </SelectItem>
                <SelectItem value="severity_desc" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Gravité décroissante
                </SelectItem>
                <SelectItem value="severity_asc" className="hover:bg-white/40 cursor-pointer rounded-md px-3 py-1 text-sm">
                  Gravité croissante
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Liste des notifications */}
        <ScrollArea className="h-72">
          <div className="flex flex-col">
            {items.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Aucune notification</div>}
            <AnimatePresence>
              {items.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownMenuItem className={`focus:bg-accent/50 px-3 py-3 border-b last:border-b-0 transition-colors ${!n.read ? "bg-blue-50/50" : ""}`}>
                    <div className="w-full flex items-start gap-3 relative">
                      {!n.read && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full" />}
                      <div
                        className={`mt-0.5 p-1.5 rounded-full ${
                          n.severity === "alert" ? "bg-destructive/10" : n.severity === "warning" ? "bg-warning/10" : "bg-muted/10"
                        }`}
                      >
                        <SeverityIcon severity={n.severity} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{n.title}</p>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                              n.severity === "alert"
                                ? "text-destructive border-destructive/30"
                                : n.severity === "warning"
                                ? "text-warning border-warning/30"
                                : "text-muted-foreground border-border"
                            }`}
                          >
                            {n.percentage}%
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(n.timestamp, { addSuffix: true, locale: fr })}
                          </span>
                          <span>•</span>
                          <span>{n.type}</span>
                          {!n.read && <span className="ml-2 text-[10px] text-primary">Non lu</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!n.read && (
                          <GlassButton
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(n.id);
                            }}
                            aria-label="Marquer comme lu"
                          >
                            <CheckCheck className="h-4 w-4" />
                          </GlassButton>
                        )}
                        <GlassButton
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(n.id);
                          }}
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </GlassButton>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Pied de page */}
        <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 px-3 py-2 border-t flex justify-between">
          <GlassButton
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
            onClick={markAllAsRead}
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Tout marquer comme lu
          </GlassButton>
          <GlassButton
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={clearAll}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Effacer tout
          </GlassButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ExportRow {
  Capteur: string;
  Valeur: number;
  Unité: string;
  Date: string;
}

interface DashboardHeaderProps {
  onLogout?: () => void;
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const exportData: ExportRow[] = [
    {
      Capteur: "Capteur #12",
      Valeur: 120,
      Unité: "ppm",
      Date: "2025-08-01 14:00",
    },
    {
      Capteur: "Capteur #7",
      Valeur: 90,
      Unité: "ppm",
      Date: "2025-08-01 13:45",
    },
  ];

  function jsonToCsv(data: ExportRow[]): string {
    if (!data.length) return "";
    const keys = Object.keys(data[0]) as (keyof ExportRow)[];
    const csvRows: string[] = [keys.join(",")];
    for (const row of data) {
      const values = keys.map((k) => `"${String(row[k]).replace(/"/g, '""')}"`);
      csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  }

  function downloadCsv(filename: string, csvContent: string) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleExportCsv(data: ExportRow[]) {
    const csv = jsonToCsv(data);
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadCsv(`export_dashboard_${dateStr}.csv`, csv);
  }

  return (
    <NotificationsProvider>
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow-md" />
        <div className="relative p-2">
          <div className="flex justify-between items-center">
            {/* === TITRE === */}
            <div className="ml-2">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Dashboard 
              </h1>
              <p className="text-gray-600 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Surveillance en temps réel
              </p>
            </div>

            {/* === ACTIONS === */}
            <div className="flex items-center gap-2">
              <GlassButton
                variant="ghost"
                size="icon"
                className="sm:hidden p-1.5 hover:bg-white/20 h-7 w-7"
              >
                <Search className="w-3.5 h-3.5" />
              </GlassButton>

              {/* Export */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <GlassButton
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow h-7 px-2 text-xs flex items-center"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" />
                    <span className="hidden sm:inline">Exporter</span>
                  </GlassButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 text-xs bg-white/90 backdrop-blur-xl border-white/20 shadow-md">
                  <DropdownMenuItem onClick={() => handleExportCsv(exportData)}>
                    Exporter en Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <NotificationCenter />

              {/* Profil utilisateur */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <GlassButton variant="ghost" className="p-1 hover:bg-white/20 h-7">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="w-7 h-7 ring-1 ring-white/20">
                        <AvatarImage src="/user.jpeg" alt="Admin" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block text-left">
                        <p className="text-xs font-medium text-gray-900">Admin User</p>
                        <p className="text-[10px] text-gray-500">admin@maitso.com</p>
                      </div>
                    </div>
                  </GlassButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-44 text-xs bg-white/90 backdrop-blur-xl border-white/20 shadow-md"
                >
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 text-red-600 font-medium rounded-md px-2 py-1 transition-all duration-200 hover:bg-red-500/10 hover:text-red-700 hover:shadow-sm active:scale-95 bg-transparent"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4" /> Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </NotificationsProvider>
  );
}