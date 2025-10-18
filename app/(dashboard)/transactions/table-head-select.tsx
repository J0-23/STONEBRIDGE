import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = ["amount", "payee", "date"];

export const TableHeadSelect = ({
  columnIndex,
  selectedColumns,
  onChange,
}: Props) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelection || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 outline-none border border-gray-200 rounded-md bg-white px-2 py-1 text-sm capitalize transition-colors",
          currentSelection ? "text-blue-500" : "text-gray-400",
          "hover:bg-blue-50"
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-md rounded-md p-1">
        <SelectItem
          value="skip"
          className="capitalize text-gray-500 hover:bg-blue-50"
        >
          Skip
        </SelectItem>
        {options.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;
          return (
            <SelectItem
              key={index}
              value={option}
              disabled={disabled}
              className={cn(
                "capitalize",
                disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-blue-50"
              )}
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
