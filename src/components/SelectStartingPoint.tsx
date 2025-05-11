import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// 1. Import the JSON dataset
//    Ensure tsconfig.json has "resolveJsonModule": true, "esModuleInterop": true
import rawCities from "../cities.json";

// 2. Map to required shape, dedupe, and guard against undefined
const indianCities = Array.isArray(rawCities)
  ? rawCities
      .map((city) => ({
        value: city.name.toLowerCase().replace(/\s+/g, ""),
        label: `${city.name}, ${city.state}`,
      }))
      .filter((v, i, arr) => arr.findIndex(x => x.value === v.value) === i)
  : [];

interface SelectStartingPointProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectStartingPoint({
  value,
  onValueChange,
}: SelectStartingPointProps) {
  const [open, setOpen] = React.useState(false);

  const selected = indianCities.find((c) => c.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected?.label ?? "Select city..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {indianCities.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={() => {
                    onValueChange(city.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === city.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
