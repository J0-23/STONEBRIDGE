"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AccountFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const { isLoading: isLoadingSummary } = useGetSummary();
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue === "all" ? "" : newValue,
      from,
      to,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger
        className="lg:w-56 w-full h-11 rounded-xl px-4 font-medium 
                   border border-slate-200 bg-white text-slate-800 shadow-sm
                   hover:border-blue-400 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 
                   transition-all duration-150 cursor-pointer"
      >
        <SelectValue placeholder="Select account" />
      </SelectTrigger>

      <SelectContent className="bg-white border border-slate-200 shadow-lg rounded-xl">
        <SelectItem
          value="all"
          className="relative cursor-pointer text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 
                     [&_[data-radix-select-item-indicator]]:hidden"
        >
          All accounts
        </SelectItem>
        {accounts?.map((account) => (
          <SelectItem
            key={account.id}
            value={account.id}
            className="relative cursor-pointer text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 
                       [&_[data-radix-select-item-indicator]]:hidden "
          >
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
