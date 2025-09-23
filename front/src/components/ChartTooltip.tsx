import React from "react";

interface PayloadItem {
  color: string;
  name: string;
  value: number | string;
}

interface ChartTooltipProps {
  label: string;
  payload: PayloadItem[];
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ label, payload }) => (
  <div className="px-3 py-2 rounded-xl bg-white/90 border border-white/50 shadow-md text-xs">
    <div className="font-medium text-gray-900">{label}</div>
    {payload?.map((p, i) => (
      <div key={i} className="flex items-center gap-2 text-gray-700">
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: p.color }} />
        <span>
          {p.name}: <b>{p.value}</b>
        </span>
      </div>
    ))}
  </div>
);