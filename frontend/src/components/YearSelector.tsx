"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface YearSelectorProps {
  availableYears: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

const YearSelector = ({
  availableYears,
  selectedYear,
  setSelectedYear,
}: YearSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[120px] p-4 justify-between font-semibold"
        >
          {selectedYear === "" ? "Select year" : selectedYear}
          <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableYears.map((year) => (
          <DropdownMenuItem
            key={year}
            onClick={() => setSelectedYear(year)}
            className={selectedYear === year ? "bg-muted" : ""}
          >
            {year}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default YearSelector;
