import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { CountUp } from "@/components/count-up";

import { IconType } from "react-icons/lib";
import { VariantProps, cva } from "class-variance-authority";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const boxVariant = cva(
  "rounded-xl p-3 flex items-center justify-center shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-blue-500/20",
        success: "bg-emerald-500/20",
        danger: "bg-rose-500/20",
        warning: "bg-yellow-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariants, IconVariants {
  icon: IconType;
  title: string;
  value?: number;
  dateRange: string;
  percentageChange?: number;
}

export const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  variant,
  dateRange,
  percentageChange = 0,
}: DataCardProps) => {
  return (
    <Card className="border border-slate-200 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-[17px] font-semibold text-slate-800">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn("shrink-0", boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <h1 className="font-bold text-3xl mb-1 line-clamp-1 break-all">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p
          className={cn(
            "text-sm line-clamp-1",
            // Make Expenses negative values always rose
            title.toLowerCase() === "expenses" && value < 0
              ? "text-rose-500"
              : percentageChange > 0
              ? "text-emerald-500"
              : percentageChange < 0
              ? "text-rose-500"
              : "text-muted-foreground"
          )}
        >
          {formatPercentage(percentageChange, { addPrefix: true })} from last
          period
        </p>
      </CardContent>
    </Card>
  );
};
