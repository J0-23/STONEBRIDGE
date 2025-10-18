import { AccountFilter } from "@/components/account-filter";
import { DateFilter } from "@/components/date-filter";
import { DatePresetSelector } from "@/components/date-preset-selector";
import { DatePresetInitializer } from "@/components/date-preset-initializer";

export const Filters = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-2 mt-4 w-full">
      <DatePresetInitializer />
      {/* Left side: Account + Date picker */}
      <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto">
        <AccountFilter />
        <DateFilter />
      </div>

      {/* Right side: Preset buttons */}
      <div className="flex gap-2 mt-2 lg:mt-0">
        <DatePresetSelector />
      </div>
    </div>
  );
};
