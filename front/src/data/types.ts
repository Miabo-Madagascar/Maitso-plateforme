export type Period = "day" | "week" | "month";
export type SensorKey = "temperature" | "humidity" | "co2" | "noise" | "pm25" | "pm10" | "no2" | "o3";

export interface SensorPoint {
  t: string;
  v: number;
}

export interface ActivityDataItem {
  month: string;
  value: number;
  growth: number;
}

export interface Thresholds {
  temperature: { min: number; max: number };
  humidity: { min: number; max: number };
  co2: { warn: number; danger: number };
  noise: { warn: number; danger: number };
  pm25: { who: number; local: number };
  pm10: { who: number; local: number };
  no2: { who: number; local: number };
  o3: { who: number; local: number };
}

export interface SensorStatus {
  id: string;
  name: string;
  online: boolean;
  battery: number;
  firmware: string;
  lastSeen: string;
  calibrated: boolean;
  rssi: number;
}

export interface PayloadItem {
  color: string;
  name: string;
  value: number | string;
}

export interface ChartTooltipProps {
  label: string;
  payload: PayloadItem[];
}

export interface TooltipProps {
  active?: boolean;
  payload?: { value: number; payload: ActivityDataItem }[];
  label?: string;
}