// Composants internes
import { GlassMetricCard } from "./GlassMetricCard";
import { GlassAlertItem } from "./GlassAlertItem";
import { DashboardHeader } from "./DashboardHeader";

// Types & données
import type { Period, SensorKey, ActivityDataItem, TooltipProps } from "../src/data/types";
import { mockData, defaultThresholds, mockSensors, } from "../data/mockData";
import { sensorMeta } from "../data/sensorConfig";
import { classNames, useRecommendations, Chip, SectionTitle } from "../data/utils";

// Composants manquants à créer
import { CalendarHeatmap } from "./CalendarHeatmap";
import { ChartTooltip } from "./ChartTooltip";

import { Activity, BarChart, Battery, Bell, Calendar, Gauge, Leaf, MapPin, Minus, Settings, 
ShieldCheck, Signal, TrendingDown, TrendingUp, Wifi, Wrench, X, MessageCircle, 
SunIcon} from "lucide-react";
import { AreaChart, LineChart, Area, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useEffect, useMemo, useState } from "react";

const Glass = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={classNames("rounded-2xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-xl", className)}>
    {children}
  </div>
);

export function GlassDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("month");
  const [selectedMetric, setSelectedMetric] = useState<SensorKey>("temperature");
  const [isLoading] = useState(false);
  const [dark] = useState<boolean>(false);
  const [thresholds, setThresholds] = useState(defaultThresholds);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Données mockées
  const tempData = [
    { value: 18 }, { value: 22 }, { value: 19 }, { value: 25 }, { value: 21 },
    { value: 23 }, { value: 20 }, { value: 24 }, { value: 21 }
  ];
  const co2Data = [
    { value: 320 }, { value: 340 }, { value: 360 }, { value: 380 }, { value: 400 },
    { value: 420 }, { value: 440 }, { value: 460 }, { value: 480 }
  ];
  const vibrationData = [
    { value: 45 }, { value: 50 }, { value: 48 }, { value: 55 }, { value: 52 },
    { value: 58 }, { value: 56 }, { value: 60 }, { value: 56 }
  ];
  const energyData = [
    { value: 100 }, { value: 120 }, { value: 110 }, { value: 130 }, { value: 125 },
    { value: 140 }, { value: 135 }, { value: 150 }, { value: 145 }
  ];
  const luminosityData = [
    { value: 300 }, { value: 320 }, { value: 310 }, { value: 330 }, { value: 340 },
    { value: 350 }, { value: 360 }, { value: 370 }, { value: 380 }
  ];

  // Activité mensuelle
  const activityData: ActivityDataItem[] = [
    { month: "JAN", value: 350, growth: 12 },
    { month: "FEV", value: 180, growth: 20 },
    { month: "MAR", value: 200, growth: 11 },
    { month: "APR", value: 170, growth: -15 },
    { month: "MAY", value: 250, growth: 47 },
    { month: "JUN", value: 280, growth: 12 },
    { month: "JUL", value: 290, growth: 4 },
    { month: "AUG", value: 240, growth: -17 },
    { month: "SEP", value: 260, growth: 8 },
    { month: "OCT", value: 320, growth: 23 },
    { month: "NOV", value: 350, growth: 9 },
    { month: "DEC", value: 380, growth: 9 }
  ];

  // Données combinées pour export

  // Dernières valeurs pour recommandations
  const latestVals: Record<SensorKey, number> = {
    temperature: mockData.temperature.at(-1)?.v ?? 0,
    humidity: mockData.humidity.at(-1)?.v ?? 0,
    co2: mockData.co2.at(-1)?.v ?? 0,
    noise: mockData.noise.at(-1)?.v ?? 0,
    pm25: mockData.pm25.at(-1)?.v ?? 0,
    pm10: mockData.pm10.at(-1)?.v ?? 0,
    no2: mockData.no2.at(-1)?.v ?? 0,
    o3: mockData.o3.at(-1)?.v ?? 0
  };

  const recs = useRecommendations(latestVals, thresholds);

  // AQI simplifié (0-120) basé sur normalisation des polluants
  const aqiDays = useMemo(() => {
    const len = mockData.pm25.length;
    const arr: { date: string; aqi: number }[] = [];
    for (let i = 0; i < len; i++) {
      const pm = Math.max(0, Math.min(120, (mockData.pm25[i].v / thresholds.pm25.local) * 100));
      const pm10 = Math.max(0, Math.min(120, (mockData.pm10[i].v / thresholds.pm10.local) * 100));
      const o3 = Math.max(0, Math.min(120, (mockData.o3[i].v / thresholds.o3.local) * 100));
      const no2 = Math.max(0, Math.min(120, (mockData.no2[i].v / thresholds.no2.local) * 100));
      const aqi = Math.round((pm + pm10 + o3 + no2) / 4);
      arr.push({ date: mockData.pm25[i].t, aqi });
    }
    return arr;
  }, [thresholds]);

  // KPIs calculs
  const maxValue = Math.max(...activityData.map(d => d.value));
  const avgValue = Math.round(activityData.reduce((sum, d) => sum + d.value, 0) / activityData.length);
  const avgGrowth = Math.round(activityData.reduce((sum, d) => sum + d.growth, 0) / activityData.length);

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getPeriodTitle = () => {
    switch (selectedPeriod) {
      case "week": return "Activité Hebdomadaire";
      case "day": return "Activité Quotidienne";
      default: return "Activité Mensuelle";
    }
  };

  const getMetricTitle = () => {
    return sensorMeta[selectedMetric].label;
  };

  const bgGrad = "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";

  // Tooltip typé
  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-gray-900">{`${label} : ${payload[0].value}°C`}</p>
          <p className="text-xs text-gray-600">Croissance: {payload[0].payload.growth}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={classNames("min-h-screen", bgGrad)}>
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(120,255,198,0.1),transparent_50%)]"></div>
      </div>

      {/* Content scrollable */}
      <div className="relative z-10 p-3 space-y-4 overflow-y-auto max-h-screen scrollbar-hide">
        <DashboardHeader />

        {/* Capteurs */}
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-3">
          <GlassMetricCard title="Température" value="21°C" trend="neutral"
            data={tempData} color="#3b82f6" gradient="from-blue-500 to-cyan-500"
            icon={<BarChart className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="CO2" value="450 ppm" trend="up" trendValue="+43%"
            data={co2Data} color="#10b981" gradient="from-emerald-500 to-green-500"
            icon={<Calendar className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="Vibration" value="56 Hz" trend="down" trendValue="-12%"
            data={vibrationData} color="#f59e0b" gradient="from-orange-500 to-yellow-500"
            icon={<Bell className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="Énergie" value="123 kWh" trend="up" trendValue="+7%"
            data={energyData} color="#8b5cf6" gradient="from-purple-500 to-indigo-500"
            icon={<BarChart className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="Humidité" value="68%" trend="down" trendValue="-5%"
            data={tempData} color="#06b6d4" gradient="from-cyan-500 to-blue-500"
            icon={<Activity className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="Pression" value="1012 hPa" trend="neutral"
            data={co2Data} color="#f43f5e" gradient="from-pink-500 to-rose-500"
            icon={<Calendar className="w-3 h-3 text-white" />} small />

          {/* Nouveau capteur Luminosité */}
          <GlassMetricCard title="Luminosité" value="350 lx" trend="up" trendValue="+15%"
            data={luminosityData} color="#fde047" gradient="from-yellow-400 to-amber-400"
            icon={<SunIcon className="w-3 h-3 text-white" />} small />

          {/* Bouton flottant pour ouvrir/fermer l'assistant chat */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            aria-label="Ouvrir l'assistant chat"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg text-white hover:brightness-110 transition"
          >
            {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </button>

          {/* Fenêtre assistant chat */}
          {chatOpen && (
            <div className="fixed bottom-20 right-6 z-40 w-80 h-96 rounded-2xl border border-indigo-300 bg-gradient-to-br from-indigo-50 via-purple-50 to-white/80 backdrop-blur-xl shadow-2xl flex flex-col animate-fadeIn">
              {/* Header coloré */}
              <div className="flex items-center justify-between p-4 border-b border-indigo-200 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-t-2xl">
                <h4 className="text-indigo-700 font-bold text-base tracking-wide flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-500" /> Assistant Chat
                </h4>
                <button
                  onClick={() => setChatOpen(false)}
                  aria-label="Fermer le chat"
                  className="text-indigo-500 hover:text-indigo-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Zone de messages stylée */}
              <div className="flex-1 p-4 overflow-y-auto text-gray-800 space-y-2 custom-scrollbar">
                {/* Assistant message */}
                <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-sm shadow w-fit animate-fadeIn">
                  Bonjour 👋 ! Je suis votre assistant. Comment puis-je aider ?
                </div>
                {/* User message */}
                <div className="bg-indigo-100 text-indigo-900 rounded-lg p-3 text-sm shadow w-fit ml-auto animate-fadeIn">
                  Je veux voir les alertes récentes.
                </div>
                {/* Assistant message */}
                <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-sm shadow w-fit animate-fadeIn">
                  Voici les 6 alertes les plus récentes affichées à gauche du dashboard.
                </div>
                {/* User message */}
                <div className="bg-indigo-100 text-indigo-900 rounded-lg p-3 text-sm shadow w-fit ml-auto animate-fadeIn">
                  Merci ! Et comment exporter les données ?
                </div>
                {/* Assistant message */}
                <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-sm shadow w-fit animate-fadeIn">
                  Cliquez sur l’icône PDF dans la section documentation pour exporter vos données.
                </div>
              </div>
              {/* Zone de saisie avec bouton d'envoi */}
              <div className="p-4 border-t border-indigo-200 bg-white/60 rounded-b-2xl flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Tapez votre message..."
                  className="flex-1 rounded-lg border border-indigo-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 shadow"
                />
                <button
                  aria-label="Envoyer"
                  className="p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md hover:scale-105 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20l16-8-16-8v6l12 2-12 2v6z" />
                  </svg>
                </button>
              </div>
              {/* Animation & scrollbar styles */}
              <style>{`
                .animate-fadeIn {
                  animation: fadeIn 0.3s ease-out;
                }
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(99, 102, 241, 0.5);
                  border-radius: 10px;
                }
              `}</style>
            </div>
          )}
         </div>

       {/* --- LIGNE 1 : Activité mensuelle | Détail température --- */}
<div className="mt-4 grid gap-6 lg:grid-cols-2">
  {/* Activité Mensuelle */}
  <div className="rounded-xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl p-3">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
      <div className="flex-1 mb-2 sm:mb-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{getPeriodTitle()}</h3>
        <p className="text-xs text-gray-600">Suivi {getMetricTitle().toLowerCase()}</p>
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        <select 
          value={selectedPeriod} 
          onChange={(e) => setSelectedPeriod(e.target.value as Period)}
          className="w-30 h-8 bg-white/40 backdrop-blur-sm border border-white/50 rounded-lg text-xs font-medium hover:bg-white/50 transition-all duration-200 shadow-sm"
        >
          <option value="month">Mois</option>
          <option value="week">Semaine</option>
          <option value="day">Jour</option>
        </select>

        <select 
          value={selectedMetric} 
          onChange={(e) => setSelectedMetric(e.target.value as SensorKey)}
          className="w-32 h-8 bg-white/40 backdrop-blur-sm border border-white/50 rounded-lg text-xs font-medium hover:bg-white/50 transition-all duration-200 shadow-sm"
        >
          {(Object.keys(sensorMeta) as SensorKey[]).map((key) => (
            <option key={key} value={key}>{sensorMeta[key].label}</option>
          ))}
        </select>
      </div>
    </div>

    {/* KPIs compacts */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/40 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Maximum</p>
            <p className="text-2xl font-bold text-gray-900">{maxValue}°C</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/40 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Moyenne</p>
            <p className="text-2xl font-bold text-gray-900">{avgValue}°C</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <BarChart className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/40 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Tendance</p>
            <p className="text-2xl font-bold text-gray-900">{avgGrowth > 0 ? "+" : ""}{avgGrowth}%</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
            {getTrendIcon(avgGrowth)}
          </div>
        </div>
      </div>
    </div>

    {/* Graphique compact */}
    {isLoading ? (
      <div className="h-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-xs text-gray-600">Chargement...</p>
        </div>
      </div>
    ) : (
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActivityEnhanced" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
                <stop offset="25%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#6b7280', fontWeight: 500 }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorActivityEnhanced)"
              dot={{
                fill: '#3b82f6',
                strokeWidth: 1,
                stroke: '#ffffff',
                r: 2
              }}
              activeDot={{
                r: 4,
                fill: '#3b82f6',
                stroke: '#ffffff',
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>

  {/* Détail température (détail capteur sélectionné) */}
  <div className="flex flex-col">
    <Glass className="p-4">
      <SectionTitle
        icon={<Gauge className="w-5 h-5 text-blue-600" />}
        title={`Détail — ${sensorMeta[selectedMetric].label}`}
        right={<Chip>{selectedPeriod.toUpperCase()}</Chip>}
      />

      <div className="grid md:grid-cols-5 gap-4">
        <div className="md:col-span-3 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData[selectedMetric]} margin={{ top: 5, left: 0, right: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="t" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip content={<ChartTooltip label={""} payload={[]} />} />
              <Line type="monotone" dataKey="v" name={sensorMeta[selectedMetric].label} stroke={sensorMeta[selectedMetric].color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="md:col-span-2 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Glass className="p-3">
              <div className="text-xs text-gray-500">Min/Max cible</div>
              <div className="text-sm font-medium">
                {selectedMetric === "temperature" && `${thresholds.temperature.min}–${thresholds.temperature.max}°C`}
                {selectedMetric === "humidity" && `${thresholds.humidity.min}–${thresholds.humidity.max}%`}
                {selectedMetric === "co2" && `Alerte: ${thresholds.co2.warn}/${thresholds.co2.danger} ppm`}
                {selectedMetric === "noise" && `Alerte: ${thresholds.noise.warn}/${thresholds.noise.danger} dB`}
                {selectedMetric === "pm25" && `OMS: ${thresholds.pm25.who} µg/m³`}
                {selectedMetric === "pm10" && `OMS: ${thresholds.pm10.who} µg/m³`}
                {selectedMetric === "no2" && `OMS: ${thresholds.no2.who} ppb`}
                {selectedMetric === "o3" && `OMS: ${thresholds.o3.who} ppb`}
              </div>
            </Glass>

            <Glass className="p-3">
              <div className="text-xs text-gray-500">Dernière valeur</div>
              <div className="text-xl font-semibold text-gray-900">
                {latestVals[selectedMetric]} {sensorMeta[selectedMetric].unit}
              </div>
            </Glass>
          </div>

          <Glass className="p-3">
            <div className="text-xs text-gray-500 mb-1">Éditeur de seuil</div>
            {selectedMetric === "temperature" && (
              <div className="flex items-center gap-2 text-xs">
                <span>Min</span>
                <input type="number" value={thresholds.temperature.min}
                  onChange={(e) => setThresholds({ ...thresholds, temperature: { ...thresholds.temperature, min: Number(e.target.value) } })}
                  className="w-16 px-2 py-1 rounded bg-white/70" />
                <span>Max</span>
                <input type="number" value={thresholds.temperature.max}
                  onChange={(e) => setThresholds({ ...thresholds, temperature: { ...thresholds.temperature, max: Number(e.target.value) } })}
                  className="w-16 px-2 py-1 rounded bg-white/70" />
              </div>
            )}
            {selectedMetric === "co2" && (
              <div className="flex items-center gap-2 text-xs">
                <span>Warn</span>
                <input type="number" value={thresholds.co2.warn}
                  onChange={(e) => setThresholds({ ...thresholds, co2: { ...thresholds.co2, warn: Number(e.target.value) } })}
                  className="w-20 px-2 py-1 rounded bg-white/70" />
                <span>Danger</span>
                <input type="number" value={thresholds.co2.danger}
                  onChange={(e) => setThresholds({ ...thresholds, co2: { ...thresholds.co2, danger: Number(e.target.value) } })}
                  className="w-20 px-2 py-1 rounded bg-white/70" />
              </div>
            )}
            {selectedMetric === "humidity" && (
              <div className="flex items-center gap-2 text-xs">
                <span>Min</span>
                <input type="number" value={thresholds.humidity.min}
                  onChange={(e) => setThresholds({ ...thresholds, humidity: { ...thresholds.humidity, min: Number(e.target.value) } })}
                  className="w-16 px-2 py-1 rounded bg-white/70" />
                <span>Max</span>
                <input type="number" value={thresholds.humidity.max}
                  onChange={(e) => setThresholds({ ...thresholds, humidity: { ...thresholds.humidity, max: Number(e.target.value) } })}
                  className="w-16 px-2 py-1 rounded bg-white/70" />
              </div>
            )}
            {(["pm25","pm10","no2","o3"] as SensorKey[]).includes(selectedMetric) && (
              <div className="text-xs text-gray-600">Réglez les seuils OMS/locaux dans la section "Polluants" ci-dessous.</div>
            )}
          </Glass>
        </div>
      </div>
    </Glass>
  </div>
</div>
{/* --- LIGNE 2 : Alertes système | Fonctionnalités capteurs | (Calendrier + Recommandations) --- */}
<div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
  
  {/* 1ère colonne : Alertes */}
  <div className="rounded-xl border border-white/20 bg-white/25 backdrop-blur-md p-2.5 flex flex-col shadow-md hover:shadow-lg transition duration-300">
    
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Bell className="w-5 h-5 text-red-500 animate-pulse" />
        <h3 className="text-xl font-semibold text-gray-900">Alertes</h3>
      </div>
      <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-600 text-xs font-medium border border-red-200">
        6
      </span>
    </div>

    {/* Liste des alertes */}
    <div className="space-y-4">
      <GlassAlertItem title="Niveau d'eau" percentage={74} status="alert" type="water" />
      <GlassAlertItem title="Niveau sonore" percentage={52} status="alert" type="sound" />
      <GlassAlertItem title="Qualité de l'air" percentage={89} status="normal" type="air" />
      <GlassAlertItem title="Température ambiante" percentage={36} status="warning" type="temperature" />
      <GlassAlertItem title="Humidité" percentage={65} status="normal" type="humidity" />
      <GlassAlertItem title="CO₂" percentage={42} status="alert" type="co2" />
      <GlassAlertItem title="CO₂" percentage={42} status="alert" type="co2" />
    </div>
  </div>

{/* 2ème colonne : Fonctionnalités des capteurs */}
<div className="rounded-2xl border border-white/20 bg-white/20 backdrop-blur-md p-3 flex flex-col shadow-sm shadow-black/10">
  
  {/* Header */}
<div className="flex items-center justify-between mb-1.5 border-b border-white/20 pb-2">
  <div className="flex items-center gap-3">
    <Settings className="w-6 h-6 text-indigo-600" />
    <h3 className="text-lg md:text-xl font-semibold text-gray-900 tracking-wide">
      Fonctionnalités des capteurs
    </h3>
  </div>
</div>


  {/* Liste compacte des capteurs */}
  <div className="space-y-5">
    {mockSensors.map((s) => (
      <div
        key={s.id}
        className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition duration-200 text-xs"
      >
        {/* Nom + ID */}
        <div className="font-medium text-gray-900 flex items-center gap-1">
          {s.name} <span className="text-gray-500">({s.id})</span>
        </div>

        {/* Statut */}
        <span
          className={`px-2 py-0.5 rounded-full font-medium text-xs border ${
            s.online
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-red-100 text-red-700 border-red-200"
          }`}
        >
          {s.online ? "En ligne" : "Hors ligne"}
        </span>

        {/* Signal */}
        <div className="flex items-center gap-1 text-gray-700">
          <Wifi className="w-3 h-3 text-indigo-500" /> {s.rssi}dBm
        </div>

        {/* Batterie */}
        <div
          className={`flex items-center gap-1 ${
            s.battery < 20 ? "text-red-600" : "text-gray-700"
          }`}
        >
          <Battery className="w-3 h-3 text-indigo-500" /> {s.battery}%
        </div>

        {/* Firmware */}
        <div className="flex items-center gap-1 text-gray-700">
          <ShieldCheck className="w-3 h-3 text-indigo-500" /> {s.firmware}
        </div>

        {/* Calibration */}
        <div
          className={`flex items-center gap-1 ${
            s.calibrated ? "text-green-700" : "text-orange-600"
          }`}
        >
          <Wrench className="w-3 h-3 text-indigo-500" /> {s.calibrated ? "OK" : "À faire"}
        </div>

        {/* Last seen */}
        <div className="flex items-center gap-1 text-gray-700">
          <Signal className="w-3 h-3 text-indigo-500" /> {s.lastSeen}
        </div>

        {/* Localisation */}
        <div className="flex items-center gap-1 text-gray-700">
          <MapPin className="w-3 h-3 text-indigo-500" /> Automatique
        </div>
      </div>
    ))}
  </div>
</div>



  {/* 3ème colonne : Calendrier + Recommandations */}
  <div className="space-y-6">
    <Glass className="p-4">
      <SectionTitle icon={<Calendar className="w-4 h-4 text-blue-600" />} title="Calendrier de suivi (AQI synthétique)" />
      <CalendarHeatmap values={aqiDays} />
    </Glass>

    <Glass className="p-4">
      <SectionTitle icon={<Bell className="w-5 h-5 text-amber-500" />} title="Recommandations" />
      <div className="space-y-2">
        {recs.map((r, i) => (
          <div
            key={i}
            className={classNames(
              "p-3 rounded-xl border flex items-start gap-3",
              r.severity === "danger" && "bg-rose-500/10 border-rose-300/40",
              r.severity === "warn" && "bg-amber-500/10 border-amber-300/40",
              r.severity === "info" && "bg-emerald-500/10 border-emerald-300/40"
            )}
          >
            <div className="mt-0.5">{r.icon}</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{r.title}</div>
              <div className="text-xs text-gray-700">{r.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </Glass>
  </div>
</div>


{/* --- LIGNE 3 : Polluants — Comparatif (plein largeur) --- */}
<div className="mt-6">
  <Glass className="p-4">
    <SectionTitle icon={<Leaf className="w-5 h-5 text-emerald-600" />} title="Polluants — Comparatif" />
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockData.pm25.map((_, i) => ({
            t: mockData.pm25[i].t,
            PM25: mockData.pm25[i].v,
            PM10: mockData.pm10[i].v,
            NO2: mockData.no2[i].v,
            O3: mockData.o3[i].v
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="t" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip content={<ChartTooltip label={""} payload={[]} />} />
          <Legend />
          <Line type="monotone" dataKey="PM25" stroke={sensorMeta.pm25.color} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="PM10" stroke={sensorMeta.pm10.color} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="NO2" stroke={sensorMeta.no2.color} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="O3" stroke={sensorMeta.o3.color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Glass>
</div>
      </div>
    </div>
  );
}