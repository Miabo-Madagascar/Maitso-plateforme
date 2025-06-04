import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const emissionsData = [
  { month: 'Janv', value: 35 },
  { month: 'Févr', value: 32 },
  { month: 'Mars', value: 30 },
  { month: 'Avr', value: 28 },
  { month: 'Mai', value: 25 },
  { month: 'Juin', value: 23 },
  { month: 'Juil', value: 22 },
  { month: 'Août', value: 20 },
  { month: 'Sept', value: 19 },
  { month: 'Oct', value: 17 },
  { month: 'Nov', value: 15 },
  { month: 'Déc', value: 14 },
];

const energyData = [
  { month: 'Janv', electricity: 400, renewable: 200 },
  { month: 'Févr', electricity: 380, renewable: 220 },
  { month: 'Mars', electricity: 370, renewable: 250 },
  { month: 'Avr', electricity: 350, renewable: 270 },
  { month: 'Mai', electricity: 340, renewable: 290 },
  { month: 'Juin', electricity: 330, renewable: 310 },
  { month: 'Juil', electricity: 320, renewable: 320 },
  { month: 'Août', electricity: 310, renewable: 340 },
  { month: 'Sept', electricity: 300, renewable: 350 },
  { month: 'Oct', electricity: 290, renewable: 370 },
  { month: 'Nov', electricity: 280, renewable: 380 },
  { month: 'Déc', electricity: 270, renewable: 400 },
];

type ChartType = 'emissions' | 'energy';

interface DataChartProps {
  type: ChartType;
}

const DataChart = ({ type }: DataChartProps) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'emissions' ? (
          <LineChart
            data={emissionsData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Émissions CO2 (tonnes)"
              stroke="#10b981"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <BarChart
            data={energyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <Bar 
              dataKey="electricity" 
              name="Électricité (kWh)" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="renewable" 
              name="Énergie renouvelable (kWh)" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;