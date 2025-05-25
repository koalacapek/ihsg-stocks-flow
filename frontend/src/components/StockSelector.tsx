"use client";

import { ChevronDown, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface StockSelectorProps {
  availableStocks: string[];
  selectedStocks: string[];
  setSelectedStocks: (stocks: string[]) => void;
}

const StockSelector = ({
  availableStocks,
  selectedStocks,
  setSelectedStocks,
}: StockSelectorProps) => {
  const toggleStock = (stock: string) => {
    if (selectedStocks.includes(stock)) {
      setSelectedStocks(selectedStocks.filter((s) => s !== stock));
    } else {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] p-4 justify-between font-semibold"
        >
          {selectedStocks.length > 0
            ? `${selectedStocks.length} stock${
                selectedStocks.length > 1 ? "s" : ""
              } selected`
            : "Select stocks"}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Search stocks..." />
          <CommandList>
            <CommandEmpty>No stocks found.</CommandEmpty>
            <CommandGroup>
              {availableStocks.map((stock) => (
                <CommandItem
                  key={stock}
                  onSelect={() => toggleStock(stock)}
                  className="flex items-center gap-2"
                >
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                      selectedStocks.includes(stock)
                        ? "bg-primary border-primary"
                        : "border-input"
                    }`}
                  >
                    {selectedStocks.includes(stock) && (
                      <Check className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                  <span>{stock}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StockSelector;
