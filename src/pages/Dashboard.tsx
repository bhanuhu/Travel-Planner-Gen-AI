
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { MapPin, Calendar, DollarSign, Trash2, Edit } from "lucide-react";

// Sample user trip data
const userTrips = [
  {
    id: 1,
    destination: "Paris, France",
    dates: "May 15 - May 22, 2023",
    totalCost: 2350,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: 2,
    destination: "Bali, Indonesia",
    dates: "Aug 10 - Aug 20, 2023",
    totalCost: 3100,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop"
  },
  {
    id: 3,
    destination: "New York, USA",
    dates: "Dec 5 - Dec 12, 2022",
    totalCost: 2800,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    destination: "Tokyo, Japan",
    dates: "Mar 1 - Mar 10, 2022",
    totalCost: 3200,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2036&auto=format&fit=crop"
  }
];

const Dashboard = () => {
  const [trips, setTrips] = useState(userTrips);

  const handleDeleteTrip = (id: number) => {
    setTrips(trips.filter(trip => trip.id !== id));
    toast({
      title: "Trip Deleted",
      description: "The trip has been removed from your account.",
    });
  };

  const handleEditTrip = (id: number) => {
    toast({
      title: "Edit Trip",
      description: "This feature would allow editing the trip details.",
    });
  };

  const renderTripCards = (status: string) => {
    const filteredTrips = trips.filter(trip => trip.status === status);
    
    if (filteredTrips.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">No {status.toLowerCase()} trips found</p>
          <Link to="/search" className="mt-4">
            <Button variant="outline">Plan a New Trip</Button>
          </Link>
        </div>
      );
    }
    
    return (
      <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTrips.map(trip => (
          <Card key={trip.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={trip.image} 
                alt={trip.destination} 
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  trip.status === "Upcoming" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                }`}>
                  {trip.status}
                </span>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{trip.destination}</CardTitle>
              <CardDescription className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {trip.dates}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span className="font-medium">${trip.totalCost}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleEditTrip(trip.id)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => handleDeleteTrip(trip.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold">My Trips</h1>
          <p className="text-muted-foreground">Manage your travel plans</p>
        </div>
        <Link to="/search" className="mt-4 md:mt-0">
          <Button>Plan a New Trip</Button>
        </Link>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="completed">Completed Trips</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {renderTripCards("Upcoming")}
          </TabsContent>
          <TabsContent value="completed">
            {renderTripCards("Completed")}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
