import { AlertTriangle, Droplet, Thermometer, Wind, Volume2 } from "lucide-react";

type GlassAlertItemProps = {
  title: string;
  percentage: number;
  status: "alert" | "warning" | "normal";
  type: string; // accepte n’importe quel type de capteur
};

export function GlassAlertItem({ title, percentage, status, type }: GlassAlertItemProps) {
  const getIcon = () => {
    switch (type) {
      case "water":
        return <Droplet className="w-5 h-5" />;
      case "temperature":
        return <Thermometer className="w-5 h-5" />;
      case "wind":
        return <Wind className="w-5 h-5" />;
      case "sound":
        return <Volume2 className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case "alert":
        return {
          bgColor: "from-red-500/20 to-red-600/10",
          textColor: "text-red-700",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          progressColor: "bg-gradient-to-r from-red-400 to-red-500"
        };
      case "warning":
        return {
          bgColor: "from-orange-500/20 to-orange-600/10",
          textColor: "text-orange-700",
          iconBg: "bg-orange-100",
          iconColor: "text-orange-600",
          progressColor: "bg-gradient-to-r from-orange-400 to-orange-500"
        };
      default:
        return {
          bgColor: "from-green-500/20 to-green-600/10",
          textColor: "text-green-700",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          progressColor: "bg-gradient-to-r from-green-400 to-green-500"
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="group relative">
      {/* Glass container */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.bgColor} backdrop-blur-sm rounded-xl border border-white/30 shadow-md`}
      ></div>

      <div className="relative p-3 flex items-center gap-3">
        {/* Icon */}
        <div className={`p-2.5 rounded-lg ${config.iconBg} ${config.iconColor} shadow`}>
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-medium text-sm text-gray-900">{title}</h4>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-semibold text-gray-900">{percentage}%</span>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/30 ${config.textColor}`}
              >
                {status === "alert"
                  ? "Alerte"
                  : status === "warning"
                  ? "Attention"
                  : "Normal"}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-2.5 bg-white/30 backdrop-blur-sm rounded-full border border-white/40 overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full ${config.progressColor} rounded-full transition-all duration-1000 ease-out shadow`}
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
            </div>
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/60"></div>
            <div className="absolute top-0 left-3/4 w-0.5 h-full bg-white/60"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
