
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const destinations = [
  { value: "bali", label: "Bali, Indonesia" },
  { value: "bangkok", label: "Bangkok, Thailand" },
  { value: "barcelona", label: "Barcelona, Spain" },
  { value: "dubai", label: "Dubai, UAE" },
  { value: "london", label: "London, UK" },
  { value: "newyork", label: "New York, USA" },
  { value: "paris", label: "Paris, France" },
  { value: "rome", label: "Rome, Italy" },
  { value: "sydney", label: "Sydney, Australia" },
  { value: "tokyo", label: "Tokyo, Japan" },
];

interface SelectDestinationProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectDestination({ value, onValueChange }: SelectDestinationProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? destinations.find((destination) => destination.value === value)?.label
            : "Select destination..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search destination..." />
          <CommandEmpty>No destination found.</CommandEmpty>
          <CommandGroup>
            {destinations.map((destination) => (
              <CommandItem
                key={destination.value}
                value={destination.value}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue);
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
        </Command>
      </PopoverContent>
    </Popover>
  );
}
