import { TrendingUp, TrendingDown } from "lucide-react";
import { GlassCard, CardContent } from "../ui/GlassCard";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue?: string;
  data: Array<{ value: number }>;
  color?: string;
}

export function MetricCard({ title, value, trend, trendValue, data, color = "#3b82f6" }: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (trend === "down") return <TrendingDown className="w-3 h-3 text-red-600" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-600";
  };

  return (
    <GlassCard className="p-4">
      <CardContent className="p-0">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm text-gray-600">{title}</p>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-2xl font-semibold text-gray-900">{value}</span>
              {trendValue && (
                <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span className="text-sm font-medium">{trendValue}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-20 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </GlassCard>
  );
}