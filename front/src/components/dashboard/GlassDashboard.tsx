import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Skeleton } from "../ui/skeleton";

// Icônes
import { Bell, Calendar, BarChart, Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Composants internes
import { GlassMetricCard } from "./GlassMetricCard";
import { GlassAlertItem } from "./GlassAlertItem";
import { DashboardHeader } from "./DashboardHeader";

// Graphiques (Recharts)
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart, Tooltip } from "recharts";

type ActivityDataItem = {
  month: string;
  value: number;
  growth: number;
};

type TooltipProps = {
  active?: boolean;
  payload?: { value: number; payload: ActivityDataItem }[];
  label?: string;
};

export function GlassDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [isLoading] = useState(false);

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
    switch (selectedMetric) {
      case "humidity": return "Humidité";
      case "co2": return "CO2";
      default: return "Température";
    }
  };

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
    <div className="flex-1 h-screen relative overflow-auto">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(120,255,198,0.1),transparent_50%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-3 space-y-4">
        <DashboardHeader />

        {/* Capteurs */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
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

          <GlassMetricCard title="Qualité Air" value="Bon" trend="up" trendValue="+3%"
            data={tempData} color="#22c55e" gradient="from-green-500 to-emerald-500"
            icon={<BarChart className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="Bruit" value="40 dB" trend="down" trendValue="-2%"
            data={vibrationData} color="#eab308" gradient="from-yellow-500 to-orange-500"
            icon={<Bell className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="Luminosité" value="320 lx" trend="up" trendValue="+12%"
            data={energyData} color="#facc15" gradient="from-yellow-400 to-amber-500"
            icon={<BarChart className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="PM2.5" value="35 µg/m³" trend="down" trendValue="-8%"
            data={co2Data} color="#64748b" gradient="from-gray-400 to-gray-600"
            icon={<Calendar className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="Gaz CH4" value="1.2%" trend="up" trendValue="+2%"
            data={tempData} color="#ef4444" gradient="from-red-500 to-orange-600"
            icon={<Activity className="w-3 h-3 text-white" />} small />

          <GlassMetricCard title="Vitesse Vent" value="15 km/h" trend="neutral"
            data={vibrationData} color="#0ea5e9" gradient="from-sky-500 to-blue-600"
            icon={<BarChart className="w-3 h-3 text-white" />} small />
        </div>

        {/* Sections principales en 2 colonnes avec ratio 2/3 et 1/3 */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {/* Activité Mensuelle 2/3 */}
          <div className="lg:col-span-2 rounded-xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl p-3 animate-slide-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
              <div className="flex-1 mb-2 sm:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{getPeriodTitle()}</h3>
                <p className="text-xs text-gray-600">Suivi {getMetricTitle().toLowerCase()}</p>
              </div>

              {/* Filtres */}
              <div className="flex gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-30 h-8 bg-white/40 backdrop-blur-sm border border-white/50 rounded-lg text-xs font-medium hover:bg-white/50 transition-all duration-200 shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-white/50">
                    <SelectItem value="month">Mois</SelectItem>
                    <SelectItem value="week">Semaine</SelectItem>
                    <SelectItem value="day">Jour</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-32 h-8 bg-white/40 backdrop-blur-sm border border-white/50 rounded-lg text-xs font-medium hover:bg-white/50 transition-all duration-200 shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-white/50">
                    <SelectItem value="temperature">Température</SelectItem>
                    <SelectItem value="humidity">Humidité</SelectItem>
                    <SelectItem value="co2">CO2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* KPIs compacts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/40 transition-all duration-200 hover:scale-105 animate-fade-in" style={{ animationDelay: '0ms' }}>
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

              <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/40 transition-all duration-200 hover:scale-105 animate-fade-in" style={{ animationDelay: '100ms' }}>
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

              <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/40 transition-all duration-200 hover:scale-105 animate-fade-in" style={{ animationDelay: '200ms' }}>
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
                  <Skeleton className="h-3 w-24" />
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

          {/* Alertes Système 1/3 - liste compacte */}
          <div className="lg:col-span-1 rounded-xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl p-3 animate-slide-up flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-red-500 animate-pulse" />
              <h3 className="text-lg font-semibold text-gray-900">Alertes Système</h3>
            </div>
           <div className="flex flex-col space-y-2 overflow-y-auto max-h-[240px]">
              <GlassAlertItem
                title="Niveau d'eau"
                percentage={74}
                status="alert"
                type="water"
              />
              <GlassAlertItem
                title="Niveau sonore"
                percentage={52}
                status="alert"
                type="sound"
              />
              <GlassAlertItem
                title="Température ambiante"
                percentage={36}
                status="warning"
                type="temperature"
              />
              <GlassAlertItem
                title="Qualité de l'air"
                percentage={89}
                status="normal"
                type="air"
              />
            </div>
            </div>
          </div>
        </div>
      </div>
  );
}
