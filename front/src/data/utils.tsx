import { Activity, AirVent, CloudSun, Factory, ShieldCheck, Thermometer } from "lucide-react";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export function classNames(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

type Thresholds = {
  co2: { warn: number; danger: number };
  pm25: { local: number };
  temperature: { min: number; max?: number };
  humidity: { min?: number; max: number };
  noise: { warn?: number; danger: number };
};

// eslint-disable-next-line react-refresh/only-export-components
export function useRecommendations(latest: Record<string, number>, th: Thresholds) {
  return React.useMemo(() => {
    const recs: { title: string; detail: string; severity: "info" | "warn" | "danger"; icon: React.ReactNode }[] = [];

    if (latest.co2 > th.co2.danger) {
      recs.push({
        title: "CO₂ très élevé",
        detail: "Augmentez l'aération immédiatement (ouvrir fenêtres, activer VMC).",
        severity: "danger",
        icon: <AirVent className="w-4 h-4" />
      });
    } else if (latest.co2 > th.co2.warn) {
      recs.push({
        title: "CO₂ au-dessus du seuil",
        detail: "Planifiez des cycles d'aération réguliers et réduisez l'occupation de la pièce.",
        severity: "warn",
        icon: <AirVent className="w-4 h-4" />
      });
    }

    if (latest.pm25 > th.pm25.local) {
      recs.push({
        title: "Particules fines PM2.5 élevées",
        detail: "Activez la filtration HEPA, limitez l'ouverture vers l'extérieur aux heures de trafic.",
        severity: "danger",
        icon: <Factory className="w-4 h-4" />
      });
    }

    if (latest.temperature < th.temperature.min) {
      recs.push({
        title: "Température basse",
        detail: "Vérifiez le chauffage; cible 20–22°C pour le confort.",
        severity: "info",
        icon: <Thermometer className="w-4 h-4" />
      });
    }

    if (latest.humidity > th.humidity.max) {
      recs.push({
        title: "Humidité élevée",
        detail: "Augmentez la ventilation ou utilisez un déshumidificateur pour rester <60%.",
        severity: "warn",
        icon: <CloudSun className="w-4 h-4" />
      });
    }

    if (latest.noise > th.noise.danger) {
      recs.push({
        title: "Bruit excessif",
        detail: "Identifiez la source; envisagez des panneaux acoustiques.",
        severity: "danger",
        icon: <Activity className="w-4 h-4" />
      });
    }

    if (recs.length === 0) {
      recs.push({ 
        title: "Tout est sous contrôle", 
        detail: "Les mesures sont dans les plages cibles.", 
        severity: "info", 
        icon: <ShieldCheck className="w-4 h-4" /> 
      });
    }

    return recs;
  }, [latest, th]);
}

export const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 text-xs rounded-full bg-white/60 border border-white/40">
    {children}
  </span>
);

export const SectionTitle = ({ icon, title, right }: { icon?: React.ReactNode; title: string; right?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    {right}
  </div>
);
