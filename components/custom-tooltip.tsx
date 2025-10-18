import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type TooltipPayload = {
  payload: { date: string; [key: string]: number | string };
  value: number;
  dataKey: string;
}[];

type Props = {
  active?: boolean;
  payload?: TooltipPayload;
};

export const CustomTooltip = ({ active, payload }: Props) => {
  if (!active || !payload || payload.length === 0) return null;

  const date = payload[0].payload.date;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(new Date(date), "MMM dd, yyyy")}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        {payload.map((item) => {
          const { dataKey, value } = item;

          // Handle "balance" separately
          const isBalance = dataKey === "balance";

          return (
            <div
              key={dataKey}
              className="flex items-center justify-between gap-x-4"
            >
              <div className="flex items-center gap-x-2">
                <div
                  className={`size-1.5 rounded-full ${
                    isBalance
                      ? "bg-green-500"
                      : dataKey === "income"
                      ? "bg-blue-500"
                      : "bg-rose-500"
                  }`}
                />
                <p className="text-sm text-muted-foreground capitalize">
                  {isBalance ? "Balance" : dataKey}
                </p>
              </div>
              <p className="text-sm text-right font-medium">
                {formatCurrency(
                  isBalance
                    ? value
                    : dataKey === "expenses"
                    ? value * -1
                    : value
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
