import { classNames } from "../data/utils";

interface CalendarHeatmapProps {
  values: { date: string; aqi: number }[];
}

export function CalendarHeatmap({ values }: CalendarHeatmapProps) {
  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - 41);
  const days: { date: string; aqi?: number }[] = [];
  
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({ date: d.toISOString().slice(0, 10) });
  }

  const aqiMap = Object.fromEntries(values.map((v) => [v.date, v.aqi] as const));

  function colorFor(aqi?: number) {
    if (aqi == null) return "bg-gray-200";
    if (aqi < 25) return "bg-emerald-400";
    if (aqi < 50) return "bg-lime-500";
    if (aqi < 75) return "bg-amber-400";
    if (aqi < 100) return "bg-orange-500";
    return "bg-rose-500";
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div 
            key={i} 
            className={classNames("h-6 rounded-md", colorFor(aqiMap[d.date]))} 
            title={`${d.date} – AQI: ${aqiMap[d.date] ?? "n/a"}`} 
          />
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-2 text-xs text-gray-500">
        <span>Léger</span>
        <div className="w-4 h-3 rounded bg-emerald-400" />
        <div className="w-4 h-3 rounded bg-lime-500" />
        <div className="w-4 h-3 rounded bg-amber-400" />
        <div className="w-4 h-3 rounded bg-orange-500" />
        <div className="w-4 h-3 rounded bg-rose-500" />
        <span>Élevé</span>
      </div>
    </div>
  );
}