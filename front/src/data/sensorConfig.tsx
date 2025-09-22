import { 
  Thermometer, 
  CloudSun, 
  AirVent, 
  Activity, 
  Factory, 
  FlameKindling, 
  Leaf 
} from "lucide-react";

export const sensorMeta = {
  temperature: {
    label: "Température",
    unit: "°C",
    color: "#60a5fa",
    gradientFrom: "from-blue-400",
    gradientTo: "to-cyan-400",
    icon: <Thermometer className="w-4 h-4 text-white" />
  },
  humidity: {
    label: "Humidité",
    unit: "%",
    color: "#22d3ee",
    gradientFrom: "from-cyan-400",
    gradientTo: "to-sky-500",
    icon: <CloudSun className="w-4 h-4 text-white" />
  },
  co2: {
    label: "CO₂",
    unit: "ppm",
    color: "#34d399",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-green-500",
    icon: <AirVent className="w-4 h-4 text-white" />
  },
  noise: {
    label: "Bruit",
    unit: "dB",
    color: "#f59e0b",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    icon: <Activity className="w-4 h-4 text-white" />
  },
  pm25: {
    label: "PM2.5",
    unit: "µg/m³",
    color: "#64748b",
    gradientFrom: "from-slate-400",
    gradientTo: "to-slate-600",
    icon: <Factory className="w-4 h-4 text-white" />
  },
  pm10: {
    label: "PM10",
    unit: "µg/m³",
    color: "#94a3b8",
    gradientFrom: "from-slate-300",
    gradientTo: "to-gray-500",
    icon: <Factory className="w-4 h-4 text-white" />
  },
  no2: {
    label: "NO₂",
    unit: "ppb",
    color: "#ef4444",
    gradientFrom: "from-rose-500",
    gradientTo: "to-orange-500",
    icon: <FlameKindling className="w-4 h-4 text-white" />
  },
  o3: {
    label: "O₃",
    unit: "ppb",
    color: "#0ea5e9",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-600",
    icon: <Leaf className="w-4 h-4 text-white" />
  }
};