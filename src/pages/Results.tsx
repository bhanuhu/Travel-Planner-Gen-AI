import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  MapPin,
  Bus,
  Timer,
  Car,
  Calendar,
  Users,
  DollarSign,
  Bookmark,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";


const GEMINI_API_KEY=import.meta.env.VITE_GEMINI_API_KEY;

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function sanitizeJSON(input) {
    return input.replace(/^```json\s*/, '').replace(/```$/, '').trim();
  }

  const getDays = () => {
    const from = new Date(formData.date.from);
    const to = new Date(formData.date.to);
    const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  const getDuration = () => {
    const diff = getDays();
    return `${diff} day${diff > 1 ? 's' : ''}`;
  };

  const getTotalCost = () => {
    return (
      (tripPlan?.bus_cost || 0) +
      ((tripPlan?.hotel_cost || 0) * getDays()) +
      (tripPlan?.taxi_cost || 0)
    );
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (!formData) return;

    const fetchTripPlan = async () => {
      setLoading(true);
      try {
        const prompt = `¸Now, Assume I am going from "${formData.startingPoint}" to "${formData.destination}" from "${format(
          formData.date.from,
          "yyyy-MM-dd"
        )}" to "${format(formData.date.to, "yyyy-MM-dd")}" for ${formData.travelers} traveler(s), fillup the following details in json structure.

    {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "title": "TripPlan",
      "type": "object",
      "properties": {
        "bus": { "type": "string" },
        "bus_arrival_datetime": { "type": "string", "format": "date-time" },
        "bus_dest_datetime": { "type": "string", "format": "date-time" },
        "bus_cost": { "type": "integer" },
        "hotel": { "type": "string" },
        "hotel_location": { "type": "string" },
        "hotel_cost": { "type": "integer" },
        "recommended_restaurant": { "type": "string" },
        "restaurant_per_serving_cost": { "type": "integer" },
        "taxi": { "type": "string" },
        "taxi_cost": { "type": "integer" },
        "itinerary": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "day": { "type": "integer" },
              "activities": { "type": "array", "items": { "type": "string" } }
            },
            "required": ["day", "activities"]
          }
        }
      },
      "required": [
        "places_to_visit",
        "bus_arrival_datetime",
        "bus_dest_datetime",
        "bus_cost",
        "hotel_location",
        "hotel_cost",
        "recommended_restaurant",
        "restaurant_per_serving_cost",
        "taxi",
        "taxi_cost"
      ],
      "additionalProperties": false
    }

    My sponsors for bus are: ZingBus, RedBus, OkBus,
    My sponsors for Hotels are: Ramada, Udaan, Oyo,
    My sponsors for taxi: FleekTaxi, Uber, Ola

    strictly follow this schema, and give me only JSON.`;

        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        const cleanData = sanitizeJSON(raw);
        const plan = JSON.parse(cleanData);
        console.log(plan)
        setTripPlan(plan);
      } catch (err) {
        console.error(err);
        setTripPlan({
          "bus": "ZingBus",
          "bus_arrival_datetime": "2025-05-12T08:00:00Z",
          "bus_dest_datetime": "2025-05-11T18:00:00Z",
          "bus_cost": 1500,
          "hotel": "Ramada",
          "hotel_location": "Near MG Road, Bengaluru",
          "hotel_cost": 4000,
          "recommended_restaurant": "CTR (Central Tiffin Room)",
          "restaurant_per_serving_cost": 300,
          "taxi": "Uber",
          "taxi_cost": 500,
          "itinerary": [
            {
              "day": 1,
              "activities": [
                "Arrival in Bengaluru, check into hotel.",
                "Visit Bangalore Palace.",
                "Dinner at CTR."
              ]
            },
            {
              "day": 2,
              "activities": [
                "Visit Lal Bagh Botanical Garden.",
                "Explore Tipu Sultan's Summer Palace.",
                "Shopping at Commercial Street."
              ]
            },
            {
              "day": 3,
              "activities": [
                "Relaxing walk at Cubbon Park.",
                "Visit Vidhana Soudha (outside view).",
                "Explore UB City Mall."
              ]
            },
            {
              "day": 4,
              "activities": [
                "Day trip to Nandi Hills (optional).",
                "Visit Bannerghatta National Park (optional)."
              ]
            },
             {
              "day": 5,
              "activities": [
                "Visit Innovative Film City",
                "Explore Wonderla Amusement Park"
              ]
            },
            {
              "day": 6,
              "activities": [
                "Visit the Art of Living International Center",
                "Explore the ISKCON Temple Bangalore"
              ]
            },
               {
              "day": 7,
              "activities": [
                "Departure from Bengaluru"
              ]
            }
          ]
        })
        } finally {
        setLoading(false);
      }
    };

    fetchTripPlan();
  }, [formData]);

  const BuyPro = () => {
    toast({
      title: "Buy Pro Now!",
      description: "This feature is only available in the Pro version.",
    });
  };

  if (!formData) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold">No trip data found</h1>
        <p className="mt-2 mb-4">Please start planning your trip from the search page.</p>
        <Button onClick={() => navigate("/search")}>Go to Search</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 mx-auto">
        <p className="text-lg font-medium">Loading trip plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 mx-auto">
        <p className="text-lg font-medium text-red-500">{error}</p>
        <Button onClick={() => navigate("/search")} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (<div className="container px-4 py-8 mx-auto">
  {/* Header */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
    <div>
      <h1 className="text-3xl font-bold">{capitalizeFirstLetter(formData.startingPoint)} - {capitalizeFirstLetter(formData.destination)}</h1>
      <p className="text-lg text-muted-foreground">
        {getDuration()} ({format(formData.date.from, "MMM dd")} - {format(formData.date.to, "MMM dd")})
      </p>
    </div>
    <div className="flex flex-col gap-2 mt-4 sm:flex-row md:mt-0">

      <Button onClick={() => navigate("/search")}>Modify Search</Button>
    </div>
  </div>

  <div className="grid gap-6 mt-8">
    {/* Summary Card */}
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
              <p className="font-medium">{getDuration()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Total Cost</p>
              <p className="font-medium">INR {getTotalCost()/getDays()} / day (Excluding Food)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Tabs */}
    <Tabs defaultValue="itinerary">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
        <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
        <TabsTrigger value="transportation">Transportation</TabsTrigger>
      </TabsList>

      {/* Itinerary Tab */}
      <TabsContent value="itinerary" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Itinerary</CardTitle>
            <CardDescription>Your day-by-day plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {tripPlan.itinerary.map((day: any) => (
                <div key={day.day} className="pb-4 border-b last:border-0">
                  <h3 className="mb-2 text-lg font-semibold">Day {day.day}</h3>
                  <ul className="pl-6 list-disc space-y-1.5">
                    {day.activities.map((activity: string, idx: number) => (
                      <li key={idx}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Places Tab */}
      {tripPlan.recommended_restaurant&& <TabsContent value="restaurant" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{tripPlan?.recommended_restaurant}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Cost</h4>
                <p className="text-lg font-semibold">INR {tripPlan.restaurant_per_serving_cost} / Serving</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>}

      {/* Accommodation Tab */}
     {tripPlan.hotel&& <TabsContent value="accommodation" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{tripPlan?.hotel}</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tripPlan.hotel_location}
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Cost</h4>
                <p className="text-lg font-semibold">INR {tripPlan.hotel_cost} / night</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>}

      {/* Transportation Tab */}
      {tripPlan.bus&& <TabsContent value="transportation" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{tripPlan?.bus}</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-1">
                    <Timer className="w-4 h-4 mr-1" />
                    {(new Date(tripPlan.bus_arrival_datetime).toGMTString().slice(0,-7))} - {(new Date(tripPlan.bus_dest_datetime).toGMTString().slice(0,-7))}
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Cost</h4>
                <p className="text-lg font-semibold">INR {tripPlan.bus_cost} / passenger</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <br></br>            
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{tripPlan?.taxi}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Cost</h4>
                <p className="text-lg font-semibold">INR {tripPlan.taxi_cost} / day</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>}

    </Tabs>
  </div>
  <div style={{marginTop: "20px"}}>

<Button style={{width: "100%"}} onClick={BuyPro}>Book Everything Now!</Button>
</div>
</div>
);
};

export default Results;
