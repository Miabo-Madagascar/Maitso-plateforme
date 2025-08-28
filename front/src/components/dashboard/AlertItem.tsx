import { AlertTriangle } from "lucide-react";
import { Progress } from "../ui/progress";

interface AlertItemProps {
  title: string;
  percentage: number;
  status: "alert" | "warning" | "normal";
  icon?: string;
}

export function AlertItem({ title, percentage, status, icon }: AlertItemProps) {

  const getProgressColor = () => {
    switch (status) {
      case "alert":
        return "bg-red-500";
      case "warning":
        return "bg-orange-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex items-center gap-2 flex-1">
        {icon && (
          <div className="w-6 h-6 flex items-center justify-center">
            {icon === "water" && <div className="w-4 h-4 rounded-full bg-blue-100"></div>}
            {icon === "thermometer" && <div className="w-4 h-4 rounded-full bg-orange-100"></div>}
            {icon === "wind" && <AlertTriangle className="w-4 h-4 text-orange-500" />}
          </div>
        )}
        <span className="text-sm font-medium text-gray-900">{title}</span>
      </div>
      
      <div className="flex-1 mx-4">
        <div className="relative">
          <Progress 
            value={percentage} 
            className="h-2"
            style={{ 
              background: "rgb(248 250 252)",
            }}
          />
          <div 
            className={`absolute top-0 left-0 h-2 rounded-full ${getProgressColor()}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900">{percentage}%</span>
        <span className="text-xs text-gray-500 capitalize">{status === "alert" ? "Alert" : status === "warning" ? "Alerte" : "Normal"}</span>
      </div>
    </div>
  );
}