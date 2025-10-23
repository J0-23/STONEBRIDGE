import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatPercentage } from "@/lib/utils";
import { CategoryTooltip } from "@/components/category-tooltip";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

// Fully typed data item compatible with Recharts
interface DataItem {
  name: string;
  value: number;
  [key: string]: string | number; // for Recharts ChartDataInput
}

// Legend render prop item type
interface LegendPayloadItem {
  color: string;
  value: string;
  payload: DataItem;
}

// Custom Legend props
interface CustomLegendProps {
  payload?: readonly LegendPayloadItem[];
}

type Props = {
  data: DataItem[];
};

// Fully typed custom legend
const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  if (!payload) return null;

  // total sum of all values
  const total: number = payload.reduce(
    (sum: number, entry: LegendPayloadItem) => sum + (entry.payload.value ?? 0),
    0
  );

  return (
    <ul className="flex flex-col space-y-2">
      {payload.map((entry: LegendPayloadItem, index: number) => {
        const value = entry.payload.value ?? 0;
        const name = entry.payload.name ?? "";

        return (
          <li key={`item-${index}`} className="flex items-center space-x-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <div className="space-x-1">
              <span className="text-sm">{name}</span>
              <span className="text-sm text-muted-foreground">
                {total > 0 ? formatPercentage((value / total) * 100) : "0%"}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const PieVariant: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={<CustomLegend />}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data} // compatible with ChartDataInput[]
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
