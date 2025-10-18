"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { startOfDay, sub } from "date-fns";

export const DatePresetInitializer = () => {
  const router = useRouter();
  const params = useSearchParams();
  const today = startOfDay(new Date());
  const defaultFrom = sub(today, { days: 30 }).toISOString().slice(0, 10);
  const defaultTo = today.toISOString().slice(0, 10);

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

  return null;
};
