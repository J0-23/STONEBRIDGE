import { format } from "date-fns";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "@/components/custom-tooltip";

type Props = {
  data: { date: string; [key: string]: number | string }[];
  dataKeys: string[];
  colors?: string[];
};

export const BarVariant = ({ data, dataKeys, colors }: Props) => {
  const defaultColors = ["#3d82f6", "#f43f5e", "#10b981", "#f59e0b"];

  const chartData = data.map((d) => ({
    ...d,
    date: new Date(d.date).getTime(),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
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
        {dataKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={
              colors?.[index] || defaultColors[index % defaultColors.length]
            }
            barSize={16}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
