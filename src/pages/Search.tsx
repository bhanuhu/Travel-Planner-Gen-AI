
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { SelectDestination } from "@/components/SelectDestination";
import { SelectStartingPoint } from "@/components/SelectStartingPoint";

const Search = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    startingPoint: "",
    date: {
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }
  });

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

  const handleStartingPointChange = (startingPoint: string) => {
    setFormData({
      ...formData,
      startingPoint,
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

    if (!formData.startingPoint) {
      toast({
        title: "Error",
        description: "Please select a starting point",
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
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <Label htmlFor="startingPoint" className="text-lg font-medium">Starting Point</Label>
              </div>
              <SelectStartingPoint
                value={formData.startingPoint}
                onValueChange={handleStartingPointChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <Label htmlFor="destination" className="text-lg font-medium">Destination</Label>
              </div>
              <SelectDestination
                value={formData.destination}
                onValueChange={handleDestinationChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                <Label className="text-lg font-medium">Travel Dates</Label>
              </div>
              <DatePickerWithRange
                date={formData.date}
                onDateChange={handleDateChange}
              />
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
