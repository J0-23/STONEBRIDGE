import { format } from "date-fns";
import {
  Tooltip,
  XAxis,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { CustomTooltip } from "@/components/custom-tooltip";

type Props = {
  data: { date: string; [key: string]: number | string }[];
  dataKeys: string[]; // fields to display as lines, e.g., ["income", "expenses"] or ["balance"]
  colors?: string[]; // optional colors for each line
};

export const LineVariant = ({ data, dataKeys, colors }: Props) => {
  const defaultColors = ["#3b82f6", "#f43f5e", "#10b981", "#f59e0b"];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(new Date(value), "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            dot={false}
            dataKey={key}
            stroke={
              colors?.[index] || defaultColors[index % defaultColors.length]
            }
            strokeWidth={2}
            className="drop-shadow-sm"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
