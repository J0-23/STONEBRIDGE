import { format } from "date-fns";
import {
  Tooltip,
  XAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CustomTooltip } from "@/components/custom-tooltip";

type Props = {
  data: { date: string; [key: string]: number | string }[];
  dataKeys: string[];
  colors?: string[];
};

export const AreaVariant = ({ data, dataKeys, colors }: Props) => {
  const defaultColors = ["#3d82f6", "#f43f5e", "#10b981", "#f59e0b"];

  // Convert dates and split balance
  const chartData = data.map((d) => ({
    ...d,
    date: new Date(d.date).getTime(),
    positiveBalance: Number(d.balance ?? 0) > 0 ? Number(d.balance) : 0,
    negativeBalance: Number(d.balance ?? 0) < 0 ? Number(d.balance) : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          type="number"
          dataKey="date"
          scale="time"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(value) => format(new Date(value), "dd MMM")}
          axisLine={false}
          tickLine={false}
          tickMargin={16}
          style={{ fontSize: "12px" }}
        />

        <Tooltip content={<CustomTooltip />} />

        {dataKeys.map((key, index) => {
          if (key === "balance") {
            // Positive area
            return [
              <Area
                key="positiveBalance"
                type="basis"
                dataKey="positiveBalance"
                stroke="#3d82f6"
                fill="#10b981"
                fillOpacity={0.5}
                strokeWidth={2}
              />,
              // Negative area
              <Area
                key="negativeBalance"
                type="basis"
                dataKey="negativeBalance"
                stroke="#3d82f6"
                fill="#f43f5e"
                fillOpacity={0.5}
                strokeWidth={2}
              />,
            ];
          }

          // Other data keys (income, expenses, etc.)
          const fill =
            colors?.[index] || defaultColors[index % defaultColors.length];
          const stroke =
            colors?.[index] || defaultColors[index % defaultColors.length];

          return (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={stroke}
              fill={fill}
              fillOpacity={0.5}
              strokeWidth={2}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};
