import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface GlassMetricCardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue?: string;
  data: { value: number }[];
  color: string;
  gradient: string;
  icon: React.ReactNode;
  small?: boolean;
}

export function GlassMetricCard({
  title,
  value,
  trend,
  trendValue,
  data,
  color,
  gradient,
  icon,
  small = false,
}: GlassMetricCardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-emerald-500"
      : trend === "down"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <div className="relative group transform transition-transform duration-300 hover:scale-105">
      {/* Fond en verre */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-lg border border-white/30 shadow-sm"></div>

      {/* ✅ Halo vert-blanc qui apparaît au hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-green-400/40 to-white/20 pointer-events-none"></div>

      <div className={`relative ${small ? "p-1" : "p-3"}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            {/* Nom du capteur */}
            <p
              className={`text-gray-700 font-semibold ${
                small ? "text-xs mb-0.5" : "text-sm mb-1"
              }`}
            >
              {title}
            </p>

            {/* Valeur */}
            <p
              className={`${
                small ? "text-sm" : "text-lg"
              } font-bold text-gray-900 leading-tight`}
            >
              {value}
            </p>
          </div>

          {/* Icône */}
          <div
            className={`${
              small ? "p-1 rounded-md" : "p-2 rounded-lg"
            } bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <div className={small ? "w-3 h-3" : "w-4 h-4"}>{icon}</div>
          </div>
        </div>

        {/* Pourcentage (trendValue) */}
        {trendValue && (
          <div
            className={`flex items-center gap-1 ${
              small ? "text-xs mb-1" : "text-sm mb-2"
            } ${trendColor} font-medium`}
          >
            <TrendIcon className={small ? "w-3 h-3" : "w-4 h-4"} />
            <span>{trendValue}</span>
          </div>
        )}

        {/* Graphique */}
        <div className={small ? "h-6" : "h-10"}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={small ? 1 : 1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
