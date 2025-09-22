import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, LogOut, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NotificationsProvider, NotificationCenter } from "./notifications";

interface ExportRow {
  Capteur: string;
  Valeur: number;
  Unité: string;
  Date: string;
}

export function DashboardHeader() {
  const navigate = useNavigate();
  const [notificationCount] = useState(3); // exemple

  const exportData: ExportRow[] = [
    { Capteur: "Capteur #12", Valeur: 120, Unité: "ppm", Date: "2025-08-01 14:00" },
    { Capteur: "Capteur #7", Valeur: 90, Unité: "ppm", Date: "2025-08-01 13:45" },
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

  function handleLogout() {
    navigate("/login");
  }

  return (
    <NotificationsProvider>
      <div className="relative top-0 z-50">
        {/* Background glass */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow-md" />
        <div className="relative p-3 flex justify-between items-center gap-3">
          {/* === TITRE === */}
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 hover:tracking-wide">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Surveillance en temps réel
            </p>
          </div>

          {/* === ACTIONS === */}
          <div className="flex items-center gap-2">
            {/* Search button mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden p-1.5 hover:bg-white/20 h-7 w-7 transition-transform duration-200 hover:scale-110 active:scale-95"
              aria-label="Recherche"
            >
              <Search className="w-3.5 h-3.5" />
            </Button>

            {/* Export */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow h-7 px-2 text-xs flex items-center transition-transform duration-200 hover:scale-105"
                  aria-label="Exporter données"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  <span className="hidden sm:inline">Exporter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36 text-xs bg-white/90 backdrop-blur-xl border border-white/20 shadow-md">
                <DropdownMenuItem onClick={() => handleExportCsv(exportData)}>
                  Exporter en Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <div className="relative">
              <NotificationCenter />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full animate-pulse shadow-sm">
                  {notificationCount}
                </span>
              )}
            </div>

            {/* Profil utilisateur */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-1 hover:bg-white/20 h-7 transition-transform duration-200 hover:scale-105 active:scale-95"
                  aria-label="Profil utilisateur"
                >
                  <div className="flex items-center gap-1.5">
                    <Avatar className="w-7 h-7 ring-1 ring-white/20 hover:scale-105 transition-transform duration-200">
                      <AvatarImage src="/src/img.png" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-xs font-medium text-gray-900">Admin User</p>
                      <p className="text-[10px] text-gray-500">admin@maitso.com</p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44 text-xs bg-white/30 backdrop-blur-xl border border-white/20 shadow-md"
              >
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className={`
                    gap-2 text-red-600 font-medium rounded-lg px-2 py-1
                    bg-white/20 backdrop-blur-md border border-white/30 shadow-md
                    transition-all duration-200 hover:bg-white/30 hover:scale-105 hover:text-red-700 active:scale-95
                  `}
                >
                  <LogOut className="w-4 h-4" /> Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </NotificationsProvider>
  );
}
