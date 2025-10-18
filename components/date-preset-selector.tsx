"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { startOfDay, sub } from "date-fns";
import { cn } from "@/lib/utils";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

const presets = [
  { label: "Last 30 days", value: "30d" },
  { label: "Last 6 months", value: "6m" },
  { label: "Last year", value: "1y" },
  { label: "To this date", value: "tdy" },
];

export const DatePresetSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { data: summary } = useGetSummary();

  const today = startOfDay(new Date());
  const firstTransactionDate = summary?.days
    ? [...summary.days] // create a shallow copy before sorting
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )?.[0]?.date
    : undefined;

  const defaultFrom = sub(today, { days: 30 }).toISOString().slice(0, 10);
  const defaultTo = today.toISOString().slice(0, 10);

  const fromParam = params.get("from") || defaultFrom;
  const toParam = params.get("to") || defaultTo;

  // Ensure URL has default dates on first load
  useEffect(() => {
    const from = params.get("from");
    const to = params.get("to");

    if (!from || !to) {
      const url = new URL(window.location.href);
      url.searchParams.set("from", defaultFrom);
      url.searchParams.set("to", defaultTo);
      router.replace(url.toString());
    }
  }, [params, router, defaultFrom, defaultTo]);

  const handlePresetClick = (preset: string) => {
    let from: string | undefined;
    let to: string = today.toISOString().slice(0, 10);

    switch (preset) {
      case "30d":
        from = sub(today, { days: 30 }).toISOString().slice(0, 10);
        break;
      case "6m":
        from = sub(today, { months: 6 }).toISOString().slice(0, 10);
        break;
      case "1y":
        from = sub(today, { years: 1 }).toISOString().slice(0, 10);
        break;
      case "tdy":
        from = firstTransactionDate
          ? firstTransactionDate.slice(0, 10)
          : sub(today, { years: 1 }).toISOString().slice(0, 10);
        break;
    }

    const query: Record<string, string> = {
      accountId: params.get("accountId") || "",
      to,
    };
    if (from) query.from = from;

    router.push(`${pathname}?${new URLSearchParams(query).toString()}`);
  };

  return (
    <div className="flex gap-2">
      {presets.map((preset) => (
        <button
          key={preset.value}
          onClick={() => handlePresetClick(preset.value)}
          disabled={preset.value === "tdy" && !firstTransactionDate}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white/20 text-white hover:bg-white/30 cursor-pointer hover:text-black"
          )}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
};
