"use client";

import { AreaChart, BarChart3, FileSearch, LineChart } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AreaVariant } from "@/components/area-variant";
import { BarVariant } from "@/components/bar-variant";
import { LineVariant } from "@/components/line-variant";

type Props = {
  data?: { date: string; income: number; expenses: number }[];
};

export const Chart = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState<"area" | "line" | "bar">("area");
  const [viewType, setViewType] = useState<"balance" | "income-expenses">(
    "balance"
  );

  // Compute cumulative balance
  const balanceData = data.reduce((acc, curr, index) => {
    const prevBalance = index > 0 ? acc[index - 1].balance : 0;
    acc.push({
      date: curr.date,
      balance: prevBalance + (curr.income - curr.expenses),
      income: curr.income,
      expenses: curr.expenses,
    });
    return acc;
  }, [] as { date: string; balance: number; income: number; expenses: number }[]);

  const onTypeChange = (type: string) =>
    setChartType(type as "area" | "line" | "bar");

  // Determine data and keys for chart
  const chartData = viewType === "balance" ? balanceData : data;
  const dataKeys =
    viewType === "balance" ? ["balance"] : ["income", "expenses"];

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>

        <div className="flex gap-2">
          {/* Chart Type */}
          <Select defaultValue={chartType} onValueChange={onTypeChange}>
            <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
              <SelectValue placeholder="Chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="area">
                <div className="flex items-center">
                  <AreaChart className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Area Chart</p>
                </div>
              </SelectItem>
              <SelectItem value="line">
                <div className="flex items-center">
                  <LineChart className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Line Chart</p>
                </div>
              </SelectItem>
              <SelectItem value="bar">
                <div className="flex items-center">
                  <BarChart3 className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Bar Chart</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* View Type */}
          <Select
            defaultValue={viewType}
            onValueChange={(value) =>
              setViewType(value as "balance" | "income-expenses")
            }
          >
            <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
              <SelectValue placeholder="View type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balance">Balance</SelectItem>
              <SelectItem value="income-expenses">Income / Expenses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              {" "}
              No data for this period{" "}
            </p>
          </div>
        ) : (
          <>
            {chartType === "line" && (
              <LineVariant data={chartData} dataKeys={dataKeys} />
            )}
            {chartType === "area" && (
              <AreaVariant data={chartData} dataKeys={dataKeys} />
            )}
            {chartType === "bar" && (
              <BarVariant data={chartData} dataKeys={dataKeys} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
