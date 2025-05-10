
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

const startingPoints = [
  { value: "bangalore", label: "Bangalore, India" },
  { value: "berlin", label: "Berlin, Germany" },
  { value: "boston", label: "Boston, USA" },
  { value: "chicago", label: "Chicago, USA" },
  { value: "delhi", label: "Delhi, India" },
  { value: "dubai", label: "Dubai, UAE" },
  { value: "hongkong", label: "Hong Kong" },
  { value: "london", label: "London, UK" },
  { value: "losangeles", label: "Los Angeles, USA" },
  { value: "melbourne", label: "Melbourne, Australia" },
  { value: "mexico", label: "Mexico City, Mexico" },
  { value: "miami", label: "Miami, USA" },
  { value: "montreal", label: "Montreal, Canada" },
  { value: "mumbai", label: "Mumbai, India" },
  { value: "newyork", label: "New York, USA" },
  { value: "paris", label: "Paris, France" },
  { value: "sanfrancisco", label: "San Francisco, USA" },
  { value: "singapore", label: "Singapore" },
  { value: "sydney", label: "Sydney, Australia" },
  { value: "tokyo", label: "Tokyo, Japan" },
  { value: "toronto", label: "Toronto, Canada" },
];

interface SelectStartingPointProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectStartingPoint({ value, onValueChange }: SelectStartingPointProps) {
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
            ? startingPoints.find((point) => point.value === value)?.label
            : "Select starting point..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search starting point..." />
          <CommandEmpty>No starting point found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {startingPoints.map((point) => (
              <CommandItem
                key={point.value}
                value={point.value}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === point.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {point.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
