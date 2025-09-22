import React, { useMemo, useState } from "react";
import {  Calendar as CalendarIcon, List, Grid, Plus,
  ChevronLeft,
  ChevronRight,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Zap,
  ArchiveRestore,
  Settings,
  MapPin,
} from "lucide-react";

/**
 * CalendarPanel.tsx - Version améliorée avec design system premium
 */

/* ----------------------
   Types & données mock
   ---------------------- */

type Criticity = "low" | "medium" | "high";

interface EventItem {
  id: string;
  date: string;
  title: string;
  type?: string;
  detail?: string;
  criticity?: Criticity;
}

interface ForecastItem {
  date: string;
  tempC: number;
  humidity: number;
  predictedAQI: number;
}

const MOCK_EVENTS: EventItem[] = [
  { id: "e1", date: "2025-09-12", title: "Dépassement CO₂ détecté", detail: "CO₂ > 1000 ppm à 14:22", criticity: "high" },
  { id: "e2", date: "2025-09-15", title: "Calibration capteur #A12", detail: "Calibration périodique", criticity: "medium" },
  { id: "e3", date: "2025-09-18", title: "Inspection environnementale", detail: "Visite terrain", criticity: "medium" },
  { id: "e4", date: "2025-09-20", title: "Mise à jour firmware capteurs", detail: "Rolling update", criticity: "low" },
];

const MOCK_FORECAST: ForecastItem[] = [
  { date: "2025-09-17", tempC: 24, humidity: 60, predictedAQI: 45 },
  { date: "2025-09-18", tempC: 26, humidity: 55, predictedAQI: 60 },
  { date: "2025-09-19", tempC: 27, humidity: 58, predictedAQI: 75 },
  { date: "2025-09-20", tempC: 25, humidity: 62, predictedAQI: 50 },
  { date: "2025-09-21", tempC: 23, humidity: 65, predictedAQI: 35 },
  { date: "2025-09-22", tempC: 22, humidity: 67, predictedAQI: 30 },
  { date: "2025-09-23", tempC: 24, humidity: 61, predictedAQI: 40 },
];

/* ----------------------
   Helpers UI améliorés
   ---------------------- */

const criticityColor = (c?: Criticity) => {
  switch (c) {
    case "high":
      return "bg-rose-100/80 text-rose-700 border-rose-200/60 shadow-rose-100/50";
    case "medium":
      return "bg-amber-100/80 text-amber-700 border-amber-200/60 shadow-amber-100/50";
    case "low":
      return "bg-emerald-100/80 text-emerald-700 border-emerald-200/60 shadow-emerald-100/50";
    default:
      return "bg-gray-100/80 text-gray-700 border-gray-200/60 shadow-gray-100/50";
  }
};

const formatDatePretty = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
  } catch {
    return iso;
  }
};

/* ----------------------
   Composants UI améliorés
   ---------------------- */

const Glass: React.FC<{ children?: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => (
  <div className={`rounded-xl sm:rounded-2xl border border-white/60 bg-white/70 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-500 ${className}`.trim()}>
    {children}
  </div>
);

const Pill: React.FC<{ children?: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => (
  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${className}`.trim()}>
    {children}
  </span>
);

/* ----------------------
   Composant principal amélioré
   ---------------------- */

const CalendarPanel: React.FC = () => {
  const [view, setView] = useState<"heatmap" | "list">("heatmap");
  const [period, setPeriod] = useState<"day" | "week" | "month">("week");
  const [selectedDate, setSelectedDate] = useState<string>("2025-09-17");
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(selectedDate);
  const [newCrit, setNewCrit] = useState<Criticity>("low");

  const heatmapRange = useMemo(() => {
    const base = new Date(selectedDate);
    const days = period === "day" ? 1 : period === "week" ? 7 : 30;
    const arr: { dateISO: string; aqi: number }[] = [];

    for (let i = -Math.floor(days / 2); i < Math.ceil(days / 2); i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const found = events.find((ev) => ev.date === iso && ev.criticity === "high");
      let aqi = 30 + ((d.getDate() * 7) % 60);
      if (found) aqi = Math.min(150, aqi + 60);
      arr.push({ dateISO: iso, aqi });
    }

    return arr;
  }, [selectedDate, period, events]);

  const addEvent = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newTitle || !newDate) return;

    const newEv: EventItem = {
      id: Math.random().toString(36).slice(2, 9),
      title: newTitle,
      date: newDate,
      detail: "Ajouté manuellement",
      criticity: newCrit,
    };

    setEvents((s) => [newEv, ...s]);
    setShowAdd(false);
    setNewTitle("");
    setNewCrit("low");
  };

  const eventsForSelected = events.filter((ev) => ev.date === selectedDate);

  const summary = useMemo(() => {
    const days = heatmapRange.length;
    const avgAQI = Math.round(heatmapRange.reduce((s, d) => s + d.aqi, 0) / days);
    const alertsCount = events.filter((e) => e.criticity === "high").length;
    return { days, avgAQI, alertsCount };
  }, [heatmapRange, events]);

  return (
    <div className="w-full h-full relative overflow-y-auto scrollbar-hide">
      {/* Background premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,182,193,0.12),transparent_60%)]" />
      </div>

      <div className="relative z-10 w-full h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <Glass className="p-3 sm:p-4 md:p-6 w-full">
          {/* Header responsive */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-gray-900">Calendrier & Prévisions</div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Vue {period.toUpperCase()} • {formatDatePretty(selectedDate)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Sélecteur de période */}
                <div className="inline-flex items-center gap-1 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg overflow-hidden">
                  {["day", "week", "month"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p as never)}
                      className={`px-2 sm:px-3 py-1 text-xs transition-all duration-300 ${
                        period === p 
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md" 
                          : "text-gray-700 hover:bg-white/40"
                      }`}
                    >
                      {p === "day" ? "Jour" : p === "week" ? "Semaine" : "Mois"}
                    </button>
                  ))}
                </div>

                {/* Navigation date */}
                <div className="inline-flex items-center gap-1 border border-white/40 rounded-lg overflow-hidden bg-white/40">
                  <button 
                    className="px-2 py-2 hover:bg-white/40 transition-colors" 
                    onClick={() => {
                      const d = new Date(selectedDate); 
                      d.setDate(d.getDate() - 1); 
                      setSelectedDate(d.toISOString().slice(0, 10));
                    }}
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <input
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-24 sm:w-32 text-xs sm:text-sm px-2 py-1 bg-transparent border-l border-white/20 focus:outline-none"
                    type="date"
                  />
                  <button 
                    className="px-2 py-2 hover:bg-white/40 transition-colors" 
                    onClick={() => {
                      const d = new Date(selectedDate); 
                      d.setDate(d.getDate() + 1); 
                      setSelectedDate(d.toISOString().slice(0, 10));
                    }}
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Boutons d'action */}
                <button
                  onClick={() => setView(view === "heatmap" ? "list" : "heatmap")}
                  className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-white/60 border border-white/40 text-xs sm:text-sm hover:bg-white/80 transition-all duration-300"
                >
                  {view === "heatmap" ? <List className="w-3 h-3 sm:w-4 sm:h-4" /> : <Grid className="w-3 h-3 sm:w-4 sm:h-4" />}
                  <span className="hidden sm:inline">{view === "heatmap" ? "Liste" : "Heatmap"}</span>
                </button>

                <button
                  onClick={() => setShowAdd((s) => !s)}
                  className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs sm:text-sm hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Ajouter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Corps principal responsive */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {/* Colonne principale */}
            <div className="xl:col-span-2 space-y-3 sm:space-y-4">
              {/* Heatmap ou liste */}
              <Glass className="p-3 sm:p-4">
                {view === "heatmap" ? (
                  <div>
                    <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="text-sm sm:text-base font-semibold text-gray-800">Heatmap AQI</div>
                      <div className="text-xs text-gray-600">Gradient: vert → orange → rouge</div>
                    </div>
                    
                    <div className={`grid gap-1 sm:gap-2 ${
                      period === "month" ? "grid-cols-6 sm:grid-cols-10" : 
                      period === "week" ? "grid-cols-7" : "grid-cols-1"
                    }`}>
                      {heatmapRange.map((h) => {
                        const a = h.aqi;
                        let band = "bg-emerald-200/80";
                        if (a >= 100) band = "bg-rose-300/80";
                        else if (a >= 70) band = "bg-amber-300/80";
                        else if (a >= 40) band = "bg-yellow-200/80";

                        return (
                          <button
                            key={h.dateISO}
                            onClick={() => setSelectedDate(h.dateISO)}
                            className={`flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                              selectedDate === h.dateISO 
                                ? "ring-2 ring-indigo-400 shadow-lg" 
                                : "border-white/20 hover:border-white/40"
                            }`}
                          >
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md ${band} flex items-center justify-center text-xs font-semibold shadow-sm`}>
                              {a}
                            </div>
                            <div className="text-xs text-gray-600 mt-1 hidden sm:block">
                              {formatDatePretty(h.dateISO)}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3 sm:mt-4 text-xs text-gray-600 flex flex-wrap gap-2 sm:gap-3 items-center">
                      {[
                        { color: "bg-emerald-300/80", label: "Bon" },
                        { color: "bg-yellow-200/80", label: "Modéré" },
                        { color: "bg-amber-300/80", label: "Mauvais" },
                        { color: "bg-rose-300/80", label: "Très mauvais" }
                      ].map(({ color, label }) => (
                        <div key={label} className="flex items-center gap-1">
                          <div className={`w-3 h-3 ${color} rounded-sm border border-white/30`}></div>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="text-sm sm:text-base font-semibold text-gray-800">Événements programmés</div>
                      <Pill className="bg-indigo-100/80 text-indigo-700 border border-indigo-200/60 self-start">
                        {events.length} événements
                      </Pill>
                    </div>
                    
                    <div className="space-y-2 max-h-48 sm:max-h-64 overflow-auto pr-2 scrollbar-hide">
                      {events
                        .sort((a, b) => (a.date < b.date ? 1 : -1))
                        .map((ev) => (
                          <div key={ev.id} className={`p-2 sm:p-3 rounded-lg border ${criticityColor(ev.criticity)} flex items-start justify-between transition-all duration-300 hover:shadow-md`}>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-gray-900 truncate">{ev.title}</div>
                              <div className="text-xs text-gray-700">{formatDatePretty(ev.date)} — {ev.detail}</div>
                            </div>
                            <div className="text-right text-xs ml-2 flex-shrink-0">
                              <div className="text-gray-600">{ev.type ?? "Technique"}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </Glass>

              {/* Événements du jour sélectionné */}
              <Glass className="p-3 sm:p-4">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="text-sm sm:text-base font-semibold text-gray-800">
                      Événements — {formatDatePretty(selectedDate)}
                    </div>
                    <div className="text-xs text-gray-600">{eventsForSelected.length} trouvés</div>
                  </div>

                  {eventsForSelected.length === 0 ? (
                    <div className="text-sm text-gray-600 py-4 text-center">
                      Aucun événement ce jour — vous pouvez ajouter un rappel.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {eventsForSelected.map((ev) => (
                        <div key={ev.id} className={`p-2 sm:p-3 rounded-lg border ${criticityColor(ev.criticity)} flex items-center justify-between transition-all duration-300 hover:shadow-md`}>
                          <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                            {ev.criticity === "high" ? 
                              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 flex-shrink-0" /> : 
                              ev.criticity === "medium" ? 
                              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" /> : 
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                            }
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-gray-900 truncate">{ev.title}</div>
                              <div className="text-xs text-gray-700">{ev.detail}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-700 ml-2 flex-shrink-0">{ev.date}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 border-t border-white/20">
                    <div className="text-xs sm:text-sm text-gray-700 mb-2 font-semibold">Recommandations du jour</div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <div className="p-2 sm:p-3 rounded-lg bg-amber-50/80 border border-amber-100/60 text-xs transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                          <div className="font-semibold">Seuil probable</div>
                        </div>
                        <div className="text-gray-700">Probable dépassement PM/CO₂ — limiter les activités extérieures.</div>
                      </div>
                      <div className="p-2 sm:p-3 rounded-lg bg-emerald-50/80 border border-emerald-100/60 text-xs transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                          <div className="font-semibold">Bon créneau</div>
                        </div>
                        <div className="text-gray-700">Fenêtre matinale avec AQI bas — prévoir calibrations extérieures.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Glass>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-3 sm:space-y-4">
              {/* Prévisions */}
              <Glass className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="text-sm sm:text-base font-semibold text-gray-800">Prévisions (7 jours)</div>
                  <Pill className="bg-white/60 text-gray-700 border border-white/30 self-start">AQI prévu</Pill>
                </div>
                <div className="space-y-2">
                  {MOCK_FORECAST.map((f) => (
                    <div key={f.date} className="flex items-center justify-between text-xs text-gray-700 p-2 rounded-lg hover:bg-white/40 transition-colors">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 sm:w-10 text-xs font-medium">{formatDatePretty(f.date)}</div>
                        <div className="text-sm font-semibold">{f.tempC}°C</div>
                        <div className="text-xs text-gray-500">• {f.humidity}%</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        f.predictedAQI >= 70 ? "bg-rose-100/80 text-rose-700" : 
                        f.predictedAQI >= 50 ? "bg-amber-100/80 text-amber-700" : 
                        "bg-emerald-100/80 text-emerald-700"
                      }`}>
                        AQI {f.predictedAQI}
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>

              {/* Ressources & interventions */}
              <Glass className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="text-sm sm:text-base font-semibold text-gray-800">Ressources & Interventions</div>
                  <Pill className="bg-indigo-100/80 text-indigo-700 border border-indigo-200/60 self-start">
                    Agenda technique
                  </Pill>
                </div>
                <div className="space-y-3 text-xs text-gray-700">
                  {[
                    { icon: ArchiveRestore, title: "Remplacement batterie", detail: "Capteur #B3 — prévu le 2025-09-25" },
                    { icon: Settings, title: "Historique interventions", detail: "3 interventions ce mois — voir rapport" },
                    { icon: MapPin, title: "Planning maintenance automatique", detail: "Next: 2025-10-01" }
                  ].map(({ icon: Icon, title, detail }, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-white/40 transition-colors">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold">{title}</div>
                        <div className="text-gray-500">{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>

              {/* Rappels & synthèse */}
              <Glass className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="text-sm sm:text-base font-semibold text-gray-800">Rappels & Synthèse</div>
                  <Pill className="bg-white/60 text-gray-700 self-start">Rapide</Pill>
                </div>
                <div className="text-xs text-gray-700 space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/40 transition-colors">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <div>Rappel récurrent: vérifier humidité — chaque lundi</div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/40 transition-colors">
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <div>Notifications push: activées pour AQI 100</div>
                  </div>
                  <div className="pt-2 border-t border-white/20 text-xs text-gray-700 space-y-1">
                    <div>Moyenne AQI (vue) : <strong>{summary.avgAQI}</strong></div>
                    <div>Jours affichés : <strong>{summary.days}</strong></div>
                    <div>Alertes critiques totales : <strong>{summary.alertsCount}</strong></div>
                  </div>
                </div>
              </Glass>
            </div>
          </div>

          {/* Formulaire d'ajout */}
          {showAdd && (
            <Glass className="mt-4 sm:mt-6 p-3 sm:p-4 animate-fadeIn">
              <form onSubmit={addEvent} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-700 font-medium">Titre</label>
                    <input 
                      value={newTitle} 
                      onChange={(e) => setNewTitle(e.target.value)} 
                      className="w-full p-2 rounded-lg border border-white/30 bg-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" 
                      placeholder="Ex: Calibration capteur #A12" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-700 font-medium">Date</label>
                    <input 
                      value={newDate} 
                      onChange={(e) => setNewDate(e.target.value)} 
                      type="date" 
                      className="w-full p-2 rounded-lg border border-white/30 bg-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-700 font-medium">Criticité</label>
                    <select 
                      value={newCrit} 
                      onChange={(e) => setNewCrit(e.target.value as Criticity)} 
                      className="w-full p-2 rounded-lg border border-white/30 bg-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button 
                    type="submit" 
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md"
                  >
                    <Zap className="w-4 h-4" /> 
                    Ajouter au calendrier
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowAdd(false)} 
                    className="px-4 py-2 rounded-lg bg-white/40 border border-white/30 text-sm hover:bg-white/60 transition-all duration-300"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </Glass>
          )}
        </Glass>
      </div>

      {/* Styles CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CalendarPanel;