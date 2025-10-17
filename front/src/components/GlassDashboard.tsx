// Composants internes
import { GlassMetricCard } from "./GlassMetricCard";
import { GlassAlertItem } from "./GlassAlertItem";
import { DashboardHeader } from "./DashboardHeader";
import ChatAssistant from "./ChatAssistant"; // ← AJOUTEZ CET IMPORT
import { jsPDF } from "jspdf";

// Types & données
import type { Period, SensorKey, ActivityDataItem, TooltipProps } from "../data/types";
import { mockData, defaultThresholds, mockSensors } from "../data/mockData";
import { sensorMeta } from "../data/sensorConfig";
import { classNames, Chip, SectionTitle } from "../data/utils";

// Composants manquants à créer
import { ChartTooltip } from "./ChartTooltip";
import {
  Activity,
  BarChart,
  Battery,
  Bell,
  Calendar,
  Gauge,
  Leaf,
  Minus,
  Settings,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Wifi,
  X,
  MessageCircle,
  SunIcon,
  RotateCcw,
  Eye,

  TreePine,
  Recycle,
  Wind,
  Droplets,
  FileText
} from "lucide-react";
import {
  AreaChart,
  LineChart,
  Area,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { useEffect, useState } from "react";

const Glass = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={classNames(
      "rounded-2xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-xl",
      className
    )}
  >
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

  // Données mockées pour les capteurs du projet
  const dht22Data = [
    { value: 18 },
    { value: 22 },
    { value: 19 },
    { value: 25 },
    { value: 21 },
    { value: 23 },
    { value: 20 },
    { value: 24 },
    { value: 21 }
  ];
  const mq135Data = [
    { value: 320 },
    { value: 340 },
    { value: 360 },
    { value: 380 },
    { value: 400 },
    { value: 420 },
    { value: 440 },
    { value: 460 },
    { value: 480 }
  ];
  const s801VibrationData = [
    { value: 45 },
    { value: 50 },
    { value: 48 },
    { value: 55 },
    { value: 52 },
    { value: 58 },
    { value: 56 },
    { value: 60 },
    { value: 56 }
  ];
  const yfS401Data = [
    { value: 100 },
    { value: 120 },
    { value: 110 },
    { value: 130 },
    { value: 125 },
    { value: 140 },
    { value: 135 },
    { value: 150 },
    { value: 145 }
  ];
  const ky038Data = [
    { value: 300 },
    { value: 320 },
    { value: 310 },
    { value: 330 },
    { value: 340 },
    { value: 350 },
    { value: 360 },
    { value: 370 },
    { value: 380 }
  ];

  // Aliases pour jeux de données manquants (utilisation des jeux existants pour compilation)
  const mq9Data = mq135Data;        // MQ-9 reuse MQ-135 sample data
  const gyBme280Data = dht22Data;  // GY-BME280 reuse DHT22 sample data

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

  // Dernières valeurs pour recommandations (fonction générique typée)
  function lastValue<T extends { v?: number }>(arr?: T[] | readonly T[]) {
    if (!arr || arr.length === 0) return undefined;
    return arr[arr.length - 1];
  }
  
  const latestVals: Record<SensorKey, number> = {
    temperature: lastValue(mockData.temperature)?.v ?? 0,
    humidity: lastValue(mockData.humidity)?.v ?? 0,
    co2: lastValue(mockData.co2)?.v ?? 0,
    noise: lastValue(mockData.noise)?.v ?? 0,
    pm25: lastValue(mockData.pm25)?.v ?? 0,
    pm10: lastValue(mockData.pm10)?.v ?? 0,
    no2: lastValue(mockData.no2)?.v ?? 0,
    o3: lastValue(mockData.o3)?.v ?? 0
  };

  // Calculs pour synthèse rapide
  const activesSensors = mockSensors.filter((s) => s.online).length;
  const totalSensors = mockSensors.length;
  const connectionPercentage = Math.round((activesSensors / totalSensors) * 100);

  // KPIs calculs
  const maxValue = Math.max(...activityData.map((d) => d.value));
  const avgValue = Math.round(activityData.reduce((sum, d) => sum + d.value, 0) / activityData.length);
  const avgGrowth = Math.round(activityData.reduce((sum, d) => sum + d.growth, 0) / activityData.length);

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getPeriodTitle = () => {
    switch (selectedPeriod) {
      case "week":
        return "Activité Hebdomadaire";
      case "day":
        return "Activité Quotidienne";
      default:
        return "Activité Mensuelle";
    }
  };

  const getMetricTitle = () => {
    return sensorMeta[selectedMetric as keyof typeof sensorMeta].label;
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

 function navigateToBilling(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
  event.preventDefault();

  // Données à inclure dans le PDF
  const recommendations = [
    { title: "Réduire pollution sonore", desc: "KY-038 détecte +15% bruit - Actions nécessaires", priority: "URGENT", impact: "Élevé" },
    { title: "Optimiser consommation eau", desc: "YF-S401 : débit excessif -15% possible", priority: "MOYEN", impact: "Moyen" },
    { title: "Améliorer qualité air", desc: "MQ-135 : taux polluants élevés - ventilation", priority: "URGENT", impact: "Élevé" },
    { title: "Réduire émissions CO₂", desc: "Données capteurs suggèrent économie énergie", priority: "MOYEN", impact: "Élevé" },
    { title: "Zone de confort thermique", desc: "DHT22 : optimiser chauffage -8°C possible", priority: "FAIBLE", impact: "Moyen" },
    { title: "Certification environnementale", desc: "Données conformes ISO 14001 - validation", priority: "FAIBLE", impact: "Faible" },
    { title: "Surveillance vibrations", desc: "801S : réduire nuisances mécaniques", priority: "FAIBLE", impact: "Faible" }
  ];

  // Création du document PDF
  const doc = new jsPDF();
  let y = 20;

  // --- En-tête ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("🌿 Rapport - Démarche Verte", 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Label : ÉCORESPONSABLE", 20, y);
  y += 8;
  doc.text("Impact environnemental :", 20, y);
  doc.setTextColor(0, 150, 0);
  doc.text("Réduction CO₂ potentielle : -23% ce mois", 75, y);
  doc.setTextColor(0, 0, 0);
  y += 10;

  // --- Titre du tableau ---
  doc.setFont("helvetica", "bold");
  doc.text("Recommandations :", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");

  // --- Boucle sur les recommandations ---
  recommendations.forEach((rec) => {
    if (y > 270) { // ajout d’une nouvelle page si nécessaire
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.text(`• ${rec.title}`, 25, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.text(`   Description : ${rec.desc}`, 25, y);
    y += 6;
    doc.text(`   Priorité : ${rec.priority}`, 25, y);
    y += 5;
    doc.text(`   Impact : ${rec.impact}`, 25, y);
    y += 8;
  });

  // --- Pied de page ---
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Généré le : ${new Date().toLocaleString()}`, 20, 285);

  // Téléchargement du PDF
  doc.save("rapport_demarche_verte.pdf");
}
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

        {/* LIGNE 1 : Les 7 capteurs */}
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-3">
          <GlassMetricCard
            title="DHT22 (Temp & Hum)"
            value="21°C"
            trend="neutral"
            data={dht22Data}
            color="#3b82f6"
            gradient="from-blue-500 to-cyan-500"
            icon={<BarChart className="w-3 h-3 text-white" />}
            small
          />

          <GlassMetricCard
            title="MQ-135 (Gaz polluants)"
            value="450 ppm"
            trend="up"
            trendValue="+43%"
            data={mq135Data}
            color="#10b981"
            gradient="from-emerald-500 to-green-500"
            icon={<Calendar className="w-3 h-3 text-white" />}
            small
          />

          <GlassMetricCard
            title="801S (Vibration)"
            value="56 Hz"
            trend="down"
            trendValue="-12%"
            data={s801VibrationData}
            color="#f59e0b"
            gradient="from-orange-500 to-yellow-500"
            icon={<Bell className="w-3 h-3 text-white" />}
            small
          />

          <GlassMetricCard
            title="YF-S401 (Débit eau)"
            value="123 L/min"
            trend="up"
            trendValue="+7%"
            data={yfS401Data}
            color="#8b5cf6"
            gradient="from-purple-500 to-indigo-500"
            icon={<BarChart className="w-3 h-3 text-white" />}
            small
          />

          <GlassMetricCard
            title="GY-BME280 (Pression)"
            value="1012 hPa"
            trend="down"
            trendValue="-5%"
            data={dht22Data}
            color="#06b6d4"
            gradient="from-cyan-500 to-blue-500"
            icon={<Activity className="w-3 h-3 text-white" />}
            small
          />

          <GlassMetricCard
            title="MQ-9 (Gaz toxiques)"
            value="65 ppm"
            trend="neutral"
            data={mq135Data}
            color="#f43f5e"
            gradient="from-pink-500 to-rose-500"
            icon={<Calendar className="w-3 h-3 text-white" />}
            small
          />

          <GlassMetricCard
            title="KY-038 (Bruit)"
            value="35 dB"
            trend="up"
            trendValue="+15%"
            data={ky038Data}
            color="#fde047"
            gradient="from-yellow-400 to-amber-400"
            icon={<SunIcon className="w-3 h-3 text-white" />}
            small
          />
        </div>

        {/* LIGNE 2 : Alertes, état des capteurs et recommandations */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Alertes - Hauteur fixe identique */}
          <div className="h-96 rounded-2xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-500 animate-pulse" />
                <h3 className="text-lg font-semibold text-gray-900">Alertes</h3>
              </div>
              <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-600 text-xs font-medium border border-red-200">7</span>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto">
              <GlassAlertItem title="YF-S401 (Débit eau)" percentage={74} status="alert" type="water" />
              <GlassAlertItem title="KY-038 (Bruit)" percentage={52} status="alert" type="sound" />
              <GlassAlertItem title="MQ-135 (Qualité air)" percentage={89} status="normal" type="air" />
              <GlassAlertItem title="DHT22 (Température)" percentage={36} status="warning" type="temperature" />
              <GlassAlertItem title="DHT22 (Humidité)" percentage={65} status="normal" type="humidity" />
              <GlassAlertItem title="MQ-9 (Gaz toxiques)" percentage={42} status="alert" type="co2" />
              <GlassAlertItem title="801S (Vibration)" percentage={58} status="warning" type="vibration" />
            </div>
          </div>

          {/* État et fonctionnalités des capteurs - Hauteur fixe identique */}
          <div className="h-96 rounded-2xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">État Capteurs</h3>
              </div>
              <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium border border-blue-200">{activesSensors}/{totalSensors}</span>
            </div>

            <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-blue-900">Connectés</span>
                <span className="text-xs font-bold text-blue-700">{connectionPercentage}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${connectionPercentage}%` }} />
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto">
              {[
                { id: 1, name: "DHT22 #001", online: true, rssi: -45, battery: 85, calibrated: true },
                { id: 2, name: "MQ-135 #002", online: true, rssi: -52, battery: 92, calibrated: true },
                { id: 3, name: "MQ-9 #003", online: false, rssi: -78, battery: 15, calibrated: false },
                { id: 4, name: "GY-BME280 #004", online: true, rssi: -48, battery: 78, calibrated: true },
                { id: 5, name: "801S #005", online: true, rssi: -55, battery: 68, calibrated: true },
                { id: 6, name: "KY-038 #006", online: true, rssi: -42, battery: 95, calibrated: true },
                { id: 7, name: "YF-S401 #007", online: false, rssi: -85, battery: 22, calibrated: false },
                { id: 8, name: "DS3231 #008", online: true, rssi: -38, battery: 100, calibrated: true }
              ].slice(0, 7).map((sensor) => (
                <div key={sensor.id} className="flex items-center justify-between p-2 bg-white/30 rounded-lg hover:bg-white/40 transition-all duration-200">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      sensor.online ? 'bg-green-400' : sensor.battery < 20 ? 'bg-red-400' : !sensor.calibrated ? 'bg-orange-400' : 'bg-green-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{sensor.name}</div>
                      <div className="text-xs text-gray-600 flex items-center gap-2">
                        <Wifi className="w-2 h-2" />
                        <span>{sensor.rssi}dBm</span>
                        <Battery className="w-2 h-2" />
                        <span>{sensor.battery}%</span>
                        <ShieldCheck className="w-2 h-2" />
                        <span>{sensor.calibrated ? 'OK' : 'Cal.'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-shrink-0">
                    <button className="p-1 bg-blue-100 hover:bg-blue-200 rounded text-blue-600 transition-colors" title="Redémarrer">
                      <RotateCcw className="w-2 h-2" />
                    </button>
                    <button className="p-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors" title="Détails">
                      <Eye className="w-2 h-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommandations Démarche Verte - Hauteur fixe identique */}
          <div className="h-96 rounded-2xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Démarche Verte</h3>
              </div>
              <Chip>ÉCORESPONSABLE</Chip>
            </div>

            <div className="bg-green-50 p-2 rounded-lg border border-green-200 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-3 h-3 text-green-600" />
                <span className="text-xs font-semibold text-green-900">Impact Environnemental</span>
              </div>
              <div className="text-xs text-green-700">
                Réduction CO₂ potentielle : <strong>-23% ce mois</strong>
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto">
              {[
                { title: "Réduire pollution sonore", desc: "KY-038 détecte +15% bruit - Actions nécessaires", icon: <Wind className="w-3 h-3 text-blue-500" />, priority: "URGENT", color: "red", impact: "Élevé" },
                { title: "Optimiser consommation eau", desc: "YF-S401 : débit excessif -15% possible", icon: <Droplets className="w-3 h-3 text-cyan-500" />, priority: "MOYEN", color: "blue", impact: "Moyen" },
                { title: "Améliorer qualité air", desc: "MQ-135 : taux polluants élevés - ventilation", icon: <Leaf className="w-3 h-3 text-green-500" />, priority: "URGENT", color: "red", impact: "Élevé" },
                { title: "Réduire émissions CO₂", desc: "Données capteurs suggèrent économie énergie", icon: <Recycle className="w-3 h-3 text-emerald-500" />, priority: "MOYEN", color: "green", impact: "Élevé" },
                { title: "Zone de confort thermique", desc: "DHT22 : optimiser chauffage -8°C possible", icon: <SunIcon className="w-3 h-3 text-yellow-500" />, priority: "FAIBLE", color: "orange", impact: "Moyen" },
                { title: "Certification environnementale", desc: "Données conformes ISO 14001 - validation", icon: <ShieldCheck className="w-3 h-3 text-indigo-500" />, priority: "FAIBLE", color: "blue", impact: "Faible" },
                { title: "Surveillance vibrations", desc: "801S : réduire nuisances mécaniques", icon: <Gauge className="w-3 h-3 text-purple-500" />, priority: "FAIBLE", color: "gray", impact: "Faible" }
              ].map((rec, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white/30 rounded-lg hover:bg-white/40 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex-shrink-0">{rec.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{rec.title}</div>
                      <div className="text-xs text-gray-700 truncate">{rec.desc}</div>
                      <div className="text-xs text-green-600 font-medium">Impact : {rec.impact}</div>
                    </div>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ml-2 ${
                    rec.color === "red" ? "bg-red-100 text-red-700" :
                    rec.color === "green" ? "bg-green-100 text-green-700" :
                    rec.color === "blue" ? "bg-blue-100 text-blue-700" :
                    rec.color === "orange" ? "bg-orange-100 text-orange-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {rec.priority}
                  </span>
                </div>
              ))}
            </div>
            <button 
  onClick={navigateToBilling}
  className="w-full mt-2 p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium text-sm hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2"
>
  <FileText className="w-4 h-4" />
  Rapport de Facturation
</button>
          </div>
        </div>

        {/* LIGNE 3 : Activité mensuelle et détail température */}
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          {/* Activité Mensuelle */}
          <div className="rounded-xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl p-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
              <div className="flex-1 mb-2 sm:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{getPeriodTitle()}</h3>
                <p className="text-xs text-gray-600">Suivi {getMetricTitle().toLowerCase()}</p>
              </div>

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

          {/* Détail température */}
          <div className="flex flex-col">
            <Glass className="p-4">
              <SectionTitle
                icon={<Gauge className="w-5 h-5 text-blue-600" />}
                title={`Détail — ${sensorMeta[selectedMetric as keyof typeof sensorMeta].label}`}
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
                      <Line 
                        type="monotone" 
                        dataKey="v" 
                        name={sensorMeta[selectedMetric as keyof typeof sensorMeta].label} 
                        stroke={sensorMeta[selectedMetric as keyof typeof sensorMeta].color} 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="md:col-span-2 space-y-3">
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
                      {latestVals[selectedMetric]} {sensorMeta[selectedMetric as keyof typeof sensorMeta].unit}
                    </div>
                  </Glass>

                  <Glass className="p-3">
                    <div className="text-xs text-gray-500 mb-1">Éditeur de seuil</div>
                    {selectedMetric === "temperature" && (
                      <div className="flex items-center gap-2 text-xs">
                        <span>Min</span>
                        <input 
                          type="number" 
                          value={thresholds.temperature.min}
                          onChange={(e) => setThresholds({ 
                            ...thresholds, 
                            temperature: { ...thresholds.temperature, min: Number(e.target.value) } 
                          })}
                          className="w-16 px-2 py-1 rounded bg-white/70" 
                        />
                        <span>Max</span>
                        <input 
                          type="number" 
                          value={thresholds.temperature.max}
                          onChange={(e) => setThresholds({ 
                            ...thresholds, 
                            temperature: { ...thresholds.temperature, max: Number(e.target.value) } 
                          })}
                          className="w-16 px-2 py-1 rounded bg-white/70" 
                        />
                      </div>
                    )}
                    {selectedMetric === "co2" && (
                      <div className="flex items-center gap-2 text-xs">
                        <span>Warn</span>
                        <input 
                          type="number" 
                          value={thresholds.co2.warn}
                          onChange={(e) => setThresholds({ 
                            ...thresholds, 
                            co2: { ...thresholds.co2, warn: Number(e.target.value) } 
                          })}
                          className="w-20 px-2 py-1 rounded bg-white/70" 
                        />
                        <span>Danger</span>
                        <input 
                          type="number" 
                          value={thresholds.co2.danger}
                          onChange={(e) => setThresholds({ 
                            ...thresholds, 
                            co2: { ...thresholds.co2, danger: Number(e.target.value) } 
                          })}
                          className="w-20 px-2 py-1 rounded bg-white/70" 
                        />
                      </div>
                    )}
                    {selectedMetric === "humidity" && (
                      <div className="flex items-center gap-2 text-xs">
                        <span>Min</span>
                        <input 
                          type="number" 
                          value={thresholds.humidity.min}
                          onChange={(e) => setThresholds({ 
                            ...thresholds, 
                            humidity: { ...thresholds.humidity, min: Number(e.target.value) } 
                          })}
                          className="w-16 px-2 py-1 rounded bg-white/70" 
                        />
                        <span>Max</span>
                        <input 
                          type="number" 
                          value={thresholds.humidity.max}
                          onChange={(e) => setThresholds({ 
                            ...thresholds, 
                            humidity: { ...thresholds.humidity, max: Number(e.target.value) } 
                          })}
                          className="w-16 px-2 py-1 rounded bg-white/70" 
                        />
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

        {/* LIGNE 4 : Capteurs du projet — Comparatif (plein largeur) */}
        <div className="mt-6">
          <Glass className="p-4">
            <SectionTitle icon={<Leaf className="w-5 h-5 text-emerald-600" />} title="Capteurs du Projet — Comparatif" />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mq135Data.map((_, i) => ({
                    t: `${i + 1}h`,
                    MQ135: mq135Data[i].value,
                    MQ9: mq9Data[i].value,
                    DHT22: dht22Data[i].value,
                    KY038: ky038Data[i] ? ky038Data[i].value / 10 : 30,
                    YF_S401: yfS401Data[i] ? yfS401Data[i].value / 5 : 25,
                    GY_BME280: gyBme280Data[i] ? gyBme280Data[i].value - 1000 : 12,
                    S801: s801VibrationData[i] ? s801VibrationData[i].value : 55
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="t" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={<ChartTooltip label={""} payload={[]} />} />
                  <Legend />
                  <Line type="monotone" dataKey="MQ135" name="MQ-135 (ppm)" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="MQ9" name="MQ-9 (ppm)" stroke="#f43f5e" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="DHT22" name="DHT22 (°C)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="KY038" name="KY-038 (dB/10)" stroke="#fde047" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="YF_S401" name="YF-S401 (L/5)" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="GY_BME280" name="GY-BME280 (hPa-1000)" stroke="#06b6d4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="S801" name="801S (Hz)" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Glass>
        </div>

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
            <div className="flex-1 p-4 overflow-y-auto text-gray-800 space-y-2 custom-scrollbar">
              <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-sm shadow w-fit animate-fadeIn">
                Bonjour 👋 ! Je suis votre assistant. Comment puis-je aider ?
              </div>
              <div className="bg-indigo-100 text-indigo-900 rounded-lg p-3 text-sm shadow w-fit ml-auto animate-fadeIn">
                Je veux voir les alertes récentes.
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-sm shadow w-fit animate-fadeIn">
                Voici les 7 alertes les plus récentes affichées dans le dashboard.
              </div>
              <div className="bg-indigo-100 text-indigo-900 rounded-lg p-3 text-sm shadow w-fit ml-auto animate-fadeIn">
                Merci ! Et comment exporter les données ?
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-sm shadow w-fit animate-fadeIn">
                Cliquez sur le bouton "Rapport de Facturation" pour accéder aux exports.
              </div>
            </div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 20l16-8-16-8v6l12 2-12 2v6z" />
                </svg>
              </button>
            </div>
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

        <ChatAssistant />
      </div>
    </div>
  );
}