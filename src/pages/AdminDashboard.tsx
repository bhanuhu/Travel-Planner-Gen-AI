
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Users, CreditCard, Package } from "lucide-react";

// Sample booking data
const initialBookings = [
  {
    id: "B001",
    user: "John Smith",
    destination: "Paris, France",
    dates: "May 15 - May 22, 2023",
    amount: 2350,
    status: "Confirmed",
  },
  {
    id: "B002",
    user: "Sarah Johnson",
    destination: "Bali, Indonesia",
    dates: "Aug 10 - Aug 20, 2023",
    amount: 3100,
    status: "Pending",
  },
  {
    id: "B003",
    user: "Michael Brown",
    destination: "New York, USA",
    dates: "Dec 5 - Dec 12, 2022",
    amount: 2800,
    status: "Completed",
  },
  {
    id: "B004",
    user: "Emily Davis",
    destination: "Tokyo, Japan",
    dates: "Mar 1 - Mar 10, 2023",
    amount: 3200,
    status: "Cancelled",
  },
  {
    id: "B005",
    user: "David Wilson",
    destination: "London, UK",
    dates: "Jun 20 - Jun 28, 2023",
    amount: 2750,
    status: "Confirmed",
  },
];

// Sample sponsor data
const initialSponsors = [
  {
    id: "S001",
    name: "ZingBus",
    category: "Transportation",
    commission: "12%",
    active: true,
  },
  {
    id: "S002",
    name: "RedBus",
    category: "Transportation",
    commission: "10%",
    active: true,
  },
  {
    id: "S003",
    name: "Ramada",
    category: "Accommodation",
    commission: "15%",
    active: true,
  },
  {
    id: "S004",
    name: "Oyo",
    category: "Accommodation",
    commission: "18%",
    active: true,
  },
  {
    id: "S005",
    name: "Uber",
    category: "Local Transport",
    commission: "8%",
    active: false,
  },
];

const AdminDashboard = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredSponsors = sponsors.filter(sponsor => 
    sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sponsor.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    
    toast({
      title: "Status Updated",
      description: `Booking ${bookingId} has been updated to ${newStatus}`,
    });
  };

  const handleSponsorToggle = (sponsorId: string) => {
    setSponsors(sponsors.map(sponsor => 
      sponsor.id === sponsorId ? { ...sponsor, active: !sponsor.active } : sponsor
    ));
    
    const sponsor = sponsors.find(s => s.id === sponsorId);
    const newStatus = sponsor?.active ? "inactive" : "active";
    
    toast({
      title: "Sponsor Status Updated",
      description: `${sponsor?.name} is now ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Manage bookings and sponsors</p>

      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              <Users className="inline w-5 h-5 mr-2" />
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookings.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              <CreditCard className="inline w-5 h-5 mr-2" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${bookings.reduce((total, booking) => total + booking.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              <Package className="inline w-5 h-5 mr-2" />
              Active Sponsors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {sponsors.filter(sponsor => sponsor.active).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="bookings">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="mt-6">
            <div className="flex flex-col mb-6 space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="relative w-full md:w-64">
                <Search className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex space-x-2">
                {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map(status => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.destination}</TableCell>
                        <TableCell>{booking.dates}</TableCell>
                        <TableCell>${booking.amount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <select
                            className="w-full max-w-[130px] rounded border px-2 py-1 text-sm"
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          >
                            <option value="Confirmed">Confirm</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Complete</option>
                            <option value="Cancelled">Cancel</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="sponsors" className="mt-6">
            <div className="flex flex-col mb-6 space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="relative w-full md:w-64">
                <Search className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                <Input
                  placeholder="Search sponsors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button onClick={() => toast({ title: "Coming Soon", description: "Add new sponsor functionality is coming soon." })}>
                Add New Sponsor
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSponsors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No sponsors found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSponsors.map((sponsor) => (
                      <TableRow key={sponsor.id}>
                        <TableCell>{sponsor.id}</TableCell>
                        <TableCell className="font-medium">{sponsor.name}</TableCell>
                        <TableCell>{sponsor.category}</TableCell>
                        <TableCell>{sponsor.commission}</TableCell>
                        <TableCell>
                          <Badge variant={sponsor.active ? "default" : "outline"}>
                            {sponsor.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={sponsor.active}
                              onCheckedChange={() => handleSponsorToggle(sponsor.id)}
                            />
                            <Label>{sponsor.active ? "On" : "Off"}</Label>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
