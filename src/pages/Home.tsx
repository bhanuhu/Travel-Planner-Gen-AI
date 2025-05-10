
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Plan Your Perfect Trip
        </h1>
        <p className="max-w-2xl mt-4 text-xl text-muted-foreground">
          Find the best travel plans, accommodations, and transportation all in one place.
        </p>
        
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Find Your Trip</CardTitle>
              <CardDescription>Search for your next adventure</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Choose from a wide range of destinations and find the perfect travel plan for your needs.</p>
            </CardContent>
            <CardFooter>
              <Link to="/search" className="w-full">
                <Button className="w-full">Start Planning</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Account</CardTitle>
              <CardDescription>Login to manage your trips</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Access your saved trips, view your booking history, and manage your travel preferences.</p>
            </CardContent>
            <CardFooter>
              <Link to="/auth" className="w-full">
                <Button variant="outline" className="w-full">Login / Sign Up</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Admin Portal</CardTitle>
              <CardDescription>Manage bookings and sponsors</CardDescription>
            </CardHeader>
            <CardContent>
              <p>For administrators to manage bookings, sponsors, and monitor the platform.</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/login" className="w-full">
                <Button variant="secondary" className="w-full">Admin Login</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
