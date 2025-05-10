
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
  { value: "agra", label: "Agra, India" },
  { value: "amsterdam", label: "Amsterdam, Netherlands" },
  { value: "athens", label: "Athens, Greece" },
  { value: "bali", label: "Bali, Indonesia" },
  { value: "bangkok", label: "Bangkok, Thailand" },
  { value: "barcelona", label: "Barcelona, Spain" },
  { value: "berlin", label: "Berlin, Germany" },
  { value: "boston", label: "Boston, USA" },
  { value: "cairo", label: "Cairo, Egypt" },
  { value: "cancun", label: "Cancun, Mexico" },
  { value: "capetown", label: "Cape Town, South Africa" },
  { value: "chicago", label: "Chicago, USA" },
  { value: "dubai", label: "Dubai, UAE" },
  { value: "dublin", label: "Dublin, Ireland" },
  { value: "florence", label: "Florence, Italy" },
  { value: "hanoi", label: "Hanoi, Vietnam" },
  { value: "hawaii", label: "Hawaii, USA" },
  { value: "hongkong", label: "Hong Kong" },
  { value: "istanbul", label: "Istanbul, Turkey" },
  { value: "kyoto", label: "Kyoto, Japan" },
  { value: "lasvegas", label: "Las Vegas, USA" },
  { value: "lisbon", label: "Lisbon, Portugal" },
  { value: "london", label: "London, UK" },
  { value: "losangeles", label: "Los Angeles, USA" },
  { value: "madrid", label: "Madrid, Spain" },
  { value: "maldives", label: "Maldives" },
  { value: "marrakech", label: "Marrakech, Morocco" },
  { value: "miami", label: "Miami, USA" },
  { value: "milan", label: "Milan, Italy" },
  { value: "montreal", label: "Montreal, Canada" },
  { value: "moscow", label: "Moscow, Russia" },
  { value: "mumbai", label: "Mumbai, India" },
  { value: "neworleans", label: "New Orleans, USA" },
  { value: "newyork", label: "New York, USA" },
  { value: "paris", label: "Paris, France" },
  { value: "prague", label: "Prague, Czech Republic" },
  { value: "rio", label: "Rio de Janeiro, Brazil" },
  { value: "rome", label: "Rome, Italy" },
  { value: "sanfrancisco", label: "San Francisco, USA" },
  { value: "santorini", label: "Santorini, Greece" },
  { value: "seattle", label: "Seattle, USA" },
  { value: "seoul", label: "Seoul, South Korea" },
  { value: "shanghai", label: "Shanghai, China" },
  { value: "singapore", label: "Singapore" },
  { value: "sydney", label: "Sydney, Australia" },
  { value: "taipei", label: "Taipei, Taiwan" },
  { value: "tokyo", label: "Tokyo, Japan" },
  { value: "toronto", label: "Toronto, Canada" },
  { value: "vancouver", label: "Vancouver, Canada" },
  { value: "venice", label: "Venice, Italy" },
  { value: "vienna", label: "Vienna, Austria" },
  { value: "zurich", label: "Zurich, Switzerland" }
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
          <CommandGroup className="max-h-[300px] overflow-y-auto">
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
