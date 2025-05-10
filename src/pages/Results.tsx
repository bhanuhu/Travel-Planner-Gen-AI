import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { MapPin, Hotel, Bus, Car, Calendar, Users, DollarSign, Bookmark } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample trip plan data structure
const sampleTripPlan = {
  destination: "Paris, France",
  duration: "7 days",
  totalCost: 2350,
  places: [
    { name: "Eiffel Tower", description: "Iconic iron lattice tower on the Champ de Mars", dayVisit: 1 },
    { name: "Louvre Museum", description: "World's largest art museum and historic monument", dayVisit: 2 },
    { name: "Notre-Dame Cathedral", description: "Medieval Catholic cathedral", dayVisit: 3 },
    { name: "Montmartre", description: "Large hill in Paris's 18th arrondissement", dayVisit: 4 },
    { name: "Palace of Versailles", description: "Royal château in Versailles", dayVisit: 5 }
  ],
  accommodation: {
    name: "Ramada Paris",
    address: "23 Avenue de la République, 75011 Paris",
    rating: 4.2,
    costPerNight: 180,
    amenities: ["Free WiFi", "Breakfast", "Air Conditioning", "Pool"]
  },
  transportation: {
    toDestination: {
      type: "Bus",
      provider: "ZingBus",
      departureTime: "08:00",
      arrivalTime: "12:30",
      cost: 85
    },
    local: {
      type: "Taxi",
      provider: "Uber",
      cost: 120,
      details: "Available 24/7 for local transportation"
    }
  },
  itinerary: [
    { day: 1, activities: ["Check-in at hotel", "Visit Eiffel Tower", "Dinner at Le Jules Verne"] },
    { day: 2, activities: ["Louvre Museum", "Seine River Cruise", "Wine tasting"] },
    { day: 3, activities: ["Notre-Dame Cathedral", "Latin Quarter exploration", "Evening show"] },
    { day: 4, activities: ["Montmartre and Sacré-Cœur", "Local art galleries", "Dinner in Montmartre"] },
    { day: 5, activities: ["Day trip to Palace of Versailles", "Gardens exploration", "Evening in Saint-Germain"] },
    { day: 6, activities: ["Shopping at Champs-Élysées", "Arc de Triomphe", "Farewell dinner"] },
    { day: 7, activities: ["Check-out", "Last-minute souvenir shopping", "Departure"] }
  ]
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};
  
  // In a real application, this would be the response from the API
  const tripPlan = sampleTripPlan;
  
  if (!formData) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold">No trip data found</h1>
        <p className="mt-2 mb-4">Please start planning your trip from the search page.</p>
        <Button onClick={() => navigate("/search")}>Go to Search</Button>
      </div>
    );
  }

  const handleSaveTrip = () => {
    // In a real app, this would save to the backend
    // For now, we'll just show a toast
    toast({
      title: "Trip Saved",
      description: "Your trip has been saved to your account.",
    });
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold">{tripPlan.destination}</h1>
          <p className="text-lg text-muted-foreground">
            {tripPlan.duration} ({format(formData.date.from, "MMM dd")} - {format(formData.date.to, "MMM dd")})
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4 sm:flex-row md:mt-0">
          <Button onClick={handleSaveTrip} variant="outline">
            <Bookmark className="w-4 h-4 mr-2" />
            Save Trip
          </Button>
          <Button onClick={() => navigate("/search")}>Modify Search</Button>
        </div>
      </div>

      <div className="grid gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Trip Summary</CardTitle>
            <CardDescription>Overview of your planned trip</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{tripPlan.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Travelers</p>
                  <p className="font-medium">{formData.travelers} {formData.travelers === 1 ? "Person" : "People"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="font-medium">${tripPlan.totalCost}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="itinerary">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="places">Places</TabsTrigger>
            <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
            <TabsTrigger value="transportation">Transportation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="itinerary" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Itinerary</CardTitle>
                <CardDescription>Your day-by-day plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tripPlan.itinerary.map((day) => (
                    <div key={day.day} className="pb-4 border-b last:border-0">
                      <h3 className="mb-2 text-lg font-semibold">Day {day.day}</h3>
                      <ul className="pl-6 list-disc space-y-1.5">
                        {day.activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="places" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Places to Visit</CardTitle>
                <CardDescription>Attractions included in your trip</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {tripPlan.places.map((place, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{place.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{place.description}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-muted-foreground">
                          Day {place.dayVisit} of your itinerary
                        </p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="accommodation" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{tripPlan.accommodation.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {tripPlan.accommodation.address}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="px-2 py-1 text-sm font-medium bg-green-100 rounded text-green-800">
                    {tripPlan.accommodation.rating} ★
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Cost</h4>
                    <p className="text-lg font-semibold">${tripPlan.accommodation.costPerNight} / night</p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {tripPlan.accommodation.amenities.map((amenity, index) => (
                        <div key={index} className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground">
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Hotel Details</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="transportation" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bus className="w-5 h-5" />
                    <CardTitle>To Destination</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">{tripPlan.transportation.toDestination.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Provider</p>
                        <p className="font-medium">{tripPlan.transportation.toDestination.provider}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Departure</p>
                        <p className="font-medium">{tripPlan.transportation.toDestination.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Arrival</p>
                        <p className="font-medium">{tripPlan.transportation.toDestination.arrivalTime}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Cost</p>
                      <p className="font-medium">${tripPlan.transportation.toDestination.cost}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    <CardTitle>Local Transportation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">{tripPlan.transportation.local.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Provider</p>
                        <p className="font-medium">{tripPlan.transportation.local.provider}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                      <p className="font-medium">${tripPlan.transportation.local.cost}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Details</p>
                      <p className="font-medium">{tripPlan.transportation.local.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Results;
