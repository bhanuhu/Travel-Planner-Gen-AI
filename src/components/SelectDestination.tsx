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

// Import the JSON dataset for destinations
// Ensure tsconfig.json has "resolveJsonModule": true, "esModuleInterop": true
import rawCities from "../cities.json";

// Map JSON to required shape and dedupe
const destinations = Array.isArray(rawCities)
  ? rawCities
      .map((city) => ({
        value: city.name.toLowerCase().replace(/\s+/g, ""),
        label: `${city.name}, ${city.state}`,
      }))
      .filter((v, i, arr) => arr.findIndex((x) => x.value === v.value) === i)
  : [];

interface SelectDestinationProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectDestination({ value, onValueChange }: SelectDestinationProps) {
  const [open, setOpen] = React.useState(false);

  const selected = destinations.find((d) => d.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected?.label ?? "Select destination..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search destination..." />
          <CommandList>
            <CommandEmpty>No destination found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {destinations.map((destination) => (
                <CommandItem
                  key={destination.value}
                  value={destination.value}
                  onSelect={() => {
                    onValueChange(destination.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === destination.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {destination.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}