
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { SelectDestination } from "@/components/SelectDestination";

const Search = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    travelers: 1,
    budget: 1000,
    date: {
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    preferences: {
      adventure: false,
      relaxation: false,
      culture: false,
      food: false,
      shopping: false,
    },
    sponsors: {
      zingBus: false,
      redBus: false,
      ramada: false,
      oyo: false,
      uber: false,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      const category = name.split(".")[0];
      const item = name.split(".")[1];
      
      setFormData({
        ...formData,
        [category]: {
          ...formData[category as "preferences" | "sponsors"],
          [item]: checkbox.checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date: { from: Date | undefined; to: Date | undefined }) => {
    setFormData({
      ...formData,
      date: {
        from: date.from || new Date(),
        to: date.to || new Date(),
      },
    });
  };

  const handleDestinationChange = (destination: string) => {
    setFormData({
      ...formData,
      destination,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destination) {
      toast({
        title: "Error",
        description: "Please select a destination",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // In a real application, this would be your backend API
      // For now, we'll simulate a response
      setTimeout(() => {
        navigate("/results", { state: { formData } });
        setIsLoading(false);
      }, 1500);

      /*
      // Uncomment when backend is ready
      const response = await axios.post("/api/plan-trip", formData);
      navigate("/results", { state: { tripPlan: response.data } });
      */
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate trip plan. Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Plan Your Trip</h1>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <SelectDestination
                value={formData.destination}
                onValueChange={handleDestinationChange}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="travelers">Number of Travelers</Label>
                <Input
                  id="travelers"
                  name="travelers"
                  type="number"
                  min="1"
                  value={formData.travelers}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="budget">Budget (USD)</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  min="100"
                  value={formData.budget}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <Label>Travel Dates</Label>
              <DatePickerWithRange
                date={formData.date}
                onDateChange={handleDateChange}
              />
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 text-lg font-medium">Trip Preferences</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
              {Object.keys(formData.preferences).map((pref) => (
                <div key={pref} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`preferences.${pref}`}
                    name={`preferences.${pref}`}
                    checked={formData.preferences[pref as keyof typeof formData.preferences]}
                    onCheckedChange={(checked) => {
                      setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          [pref]: checked === true,
                        }
                      });
                    }}
                  />
                  <Label htmlFor={`preferences.${pref}`} className="capitalize">
                    {pref}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 text-lg font-medium">Preferred Sponsors</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
              {Object.keys(formData.sponsors).map((sponsor) => (
                <div key={sponsor} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`sponsors.${sponsor}`}
                    name={`sponsors.${sponsor}`}
                    checked={formData.sponsors[sponsor as keyof typeof formData.sponsors]}
                    onCheckedChange={(checked) => {
                      setFormData({
                        ...formData,
                        sponsors: {
                          ...formData.sponsors,
                          [sponsor]: checked === true,
                        }
                      });
                    }}
                  />
                  <Label htmlFor={`sponsors.${sponsor}`} className="capitalize">
                    {sponsor === 'zingBus' ? 'ZingBus' : 
                     sponsor === 'redBus' ? 'RedBus' : 
                     sponsor === 'oyo' ? 'OYO' : sponsor}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating Trip Plan..." : "Plan My Trip"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Search;
