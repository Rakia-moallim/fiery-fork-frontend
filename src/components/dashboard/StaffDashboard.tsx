import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ClipboardList, 
  Calendar, 
  ChefHat, 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  CalendarDays,
  Star,
  Award,
  Crown
} from "lucide-react";
import { toast } from "sonner";

// Mock order data
const mockOrders = [
  {
    id: "ORD-12345",
    customer: "John Doe",
    items: ["2x Classic Cheeseburger", "1x Caesar Salad", "1x Chocolate Lava Cake"],
    total: 44.96,
    status: "preparing",
    time: "12:30 PM",
  },
  {
    id: "ORD-12346",
    customer: "Jane Smith",
    items: ["1x Margherita Pizza", "1x Spicy Chicken Wings", "2x Soft Drinks"],
    total: 36.97,
    status: "ready",
    time: "12:15 PM",
  },
  {
    id: "ORD-12347",
    customer: "Mike Johnson",
    items: ["1x Family Feast Combo", "1x Caesar Salad"],
    total: 59.98,
    status: "on-the-way",
    time: "12:00 PM",
  },
  {
    id: "ORD-12348",
    customer: "Sarah Williams",
    items: ["2x Grilled Salmon", "1x Mushroom Risotto", "1x Date Night Special Combo"],
    total: 94.96,
    status: "delivered",
    time: "11:45 AM",
  },
];

// Mock reservation data
const mockReservations = [
  {
    id: "RES-5001",
    customer: "Robert Chen",
    date: "2025-05-22",
    time: "7:00 PM",
    guests: 4,
    status: "pending",
    specialRequests: "Window seat if possible",
  },
  {
    id: "RES-5002",
    customer: "Lisa Garcia",
    date: "2025-05-22",
    time: "8:30 PM",
    guests: 2,
    status: "confirmed",
    specialRequests: "Anniversary celebration",
  },
  {
    id: "RES-5003",
    customer: "James Wilson",
    date: "2025-05-23",
    time: "6:30 PM",
    guests: 6,
    status: "pending",
    specialRequests: "One guest has gluten allergy",
  },
  {
    id: "RES-5004",
    customer: "Emma Thompson",
    date: "2025-05-23",
    time: "7:30 PM",
    guests: 3,
    status: "confirmed",
    specialRequests: "",
  },
];

// Mock table data
const mockTables = [
  { id: 1, seats: 2, status: "available" },
  { id: 2, seats: 2, status: "available" },
  { id: 3, seats: 4, status: "occupied" },
  { id: 4, seats: 4, status: "reserved" },
  { id: 5, seats: 6, status: "available" },
  { id: 6, seats: 6, status: "occupied" },
  { id: 7, seats: 8, status: "available" },
  { id: 8, seats: 8, status: "reserved" },
];

// Mock staff data
const mockStaff = [
  {
    id: "s1",
    name: "Sarah Johnson",
    email: "sarah.j@tastehub.com",
    role: "Chef",
    status: "active",
    shift: "Morning",
  },
  {
    id: "s2",
    name: "Michael Chen",
    email: "michael.c@tastehub.com",
    role: "Waiter",
    status: "active",
    shift: "Evening",
  },
  {
    id: "s3",
    name: "Emily Rodriguez",
    email: "emily.r@tastehub.com",
    role: "Manager",
    status: "active",
    shift: "Full Day",
  },
  {
    id: "s4",
    name: "David Kim",
    email: "david.k@tastehub.com",
    role: "Delivery Driver",
    status: "active",
    shift: "Night",
  },
];

export const StaffDashboard = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [reservations, setReservations] = useState(mockReservations);
  const [tables, setTables] = useState(mockTables);
  const [staff, setStaff] = useState(mockStaff);

  // Update order status
  const handleOrderStatusChange = (orderId: string, status: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  // Update reservation status
  const handleReservationStatusChange = (reservationId: string, status: string) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, status } : reservation
      )
    );
    toast.success(`Reservation ${reservationId} ${status}`);
  };

  // Update table status
  const handleTableStatusChange = (tableId: number, status: string) => {
    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, status } : table
      )
    );
    toast.success(`Table ${tableId} status updated to ${status}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-red-950 dark:to-orange-950">
      <div className="space-y-8 p-6">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-restaurant-red via-red-600 to-restaurant-orange p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Staff Dashboard</h1>
                <p className="text-red-100 text-lg">
                  Manage daily operations and customer service
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-300/20 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-emerald-100 font-medium">Active Orders</CardDescription>
                  <CardTitle className="text-3xl font-bold text-white">{orders.filter(o => o.status !== 'delivered').length}</CardTitle>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <ClipboardList className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-emerald-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Current workload</span>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-blue-100 font-medium">Pending Reservations</CardDescription>
                  <CardTitle className="text-3xl font-bold text-white">{reservations.filter(r => r.status === 'pending').length}</CardTitle>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-blue-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Awaiting approval</span>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-restaurant-orange to-orange-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-orange-100 font-medium">Available Tables</CardDescription>
                  <CardTitle className="text-3xl font-bold text-white">{tables.filter(t => t.status === 'available').length}</CardTitle>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-orange-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Ready for seating</span>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-restaurant-red to-red-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-red-100 font-medium">Staff On Duty</CardDescription>
                  <CardTitle className="text-3xl font-bold text-white">{staff.filter(s => s.status === 'active').length}</CardTitle>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-red-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Currently working</span>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full h-14 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-red-100 dark:border-red-900">
            <TabsTrigger 
              value="orders" 
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-restaurant-orange data-[state=active]:to-restaurant-red data-[state=active]:text-white transition-all duration-300"
            >
              <ClipboardList className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger 
              value="reservations"
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-restaurant-orange data-[state=active]:to-restaurant-red data-[state=active]:text-white transition-all duration-300"
            >
              <Calendar className="h-4 w-4" />
              Reservations
            </TabsTrigger>
            <TabsTrigger 
              value="tables"
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-restaurant-orange data-[state=active]:to-restaurant-red data-[state=active]:text-white transition-all duration-300"
            >
              <ChefHat className="h-4 w-4" />
              Tables
            </TabsTrigger>
            <TabsTrigger 
              value="team"
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-restaurant-orange data-[state=active]:to-restaurant-red data-[state=active]:text-white transition-all duration-300"
            >
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-restaurant-orange to-restaurant-red rounded-lg">
                    <ClipboardList className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Current Orders</CardTitle>
                    <CardDescription>View and manage customer orders</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-restaurant-orange/10 to-restaurant-red/10 border-restaurant-orange/20">
                        <TableHead className="font-semibold">Order ID</TableHead>
                        <TableHead className="font-semibold">Customer</TableHead>
                        <TableHead className="font-semibold">Items</TableHead>
                        <TableHead className="font-semibold">Total</TableHead>
                        <TableHead className="font-semibold">Time</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors">
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>
                            <ul className="list-disc list-inside">
                              {order.items.map((item, index) => (
                                <li key={index} className="text-sm">{item}</li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell className="font-semibold text-restaurant-orange">${order.total.toFixed(2)}</TableCell>
                          <TableCell>{order.time}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              order.status === "preparing"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : order.status === "ready"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                : order.status === "on-the-way"
                                ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}>
                              {order.status.replace(/-/g, " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(value) =>
                                handleOrderStatusChange(order.id, value)
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Change status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="preparing">Preparing</SelectItem>
                                <SelectItem value="ready">Ready</SelectItem>
                                <SelectItem value="on-the-way">On the way</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-restaurant-red to-red-600 rounded-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Upcoming Reservations</CardTitle>
                    <CardDescription>Approve or reject reservation requests</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-restaurant-orange/10 to-restaurant-red/10 border-restaurant-orange/20">
                        <TableHead className="font-semibold">Reservation ID</TableHead>
                        <TableHead className="font-semibold">Customer</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Time</TableHead>
                        <TableHead className="font-semibold">Guests</TableHead>
                        <TableHead className="font-semibold">Special Requests</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservations.map((reservation) => (
                        <TableRow key={reservation.id} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors">
                          <TableCell className="font-medium">{reservation.id}</TableCell>
                          <TableCell>{reservation.customer}</TableCell>
                          <TableCell>{reservation.date}</TableCell>
                          <TableCell>{reservation.time}</TableCell>
                          <TableCell>{reservation.guests}</TableCell>
                          <TableCell>
                            {reservation.specialRequests || "None"}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${
                              reservation.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}>
                              {reservation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {reservation.status === "pending" ? (
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-600 border-green-600 hover:bg-green-50"
                                  onClick={() =>
                                    handleReservationStatusChange(
                                      reservation.id,
                                      "confirmed"
                                    )
                                  }
                                >
                                  Confirm
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() =>
                                    handleReservationStatusChange(
                                      reservation.id,
                                      "rejected"
                                    )
                                  }
                                >
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleReservationStatusChange(
                                    reservation.id,
                                    "pending"
                                  )
                                }
                              >
                                Reset
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-restaurant-orange to-orange-600 rounded-lg">
                    <ChefHat className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Table Management</CardTitle>
                    <CardDescription>View and update table availability</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tables.map((table) => (
                    <Card key={table.id} className="overflow-hidden border border-orange-200 dark:border-orange-800">
                      <CardHeader className="pb-2">
                        <CardTitle>Table {table.id}</CardTitle>
                        <CardDescription>{table.seats} seats</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              table.status === "available"
                                ? "bg-green-500"
                                : table.status === "occupied"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}
                          ></div>
                          <span className="capitalize">{table.status}</span>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-4">
                        <Select
                          value={table.status}
                          onValueChange={(value) =>
                            handleTableStatusChange(table.id, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="occupied">Occupied</SelectItem>
                            <SelectItem value="reserved">Reserved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-restaurant-red to-red-600 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Team Overview</CardTitle>
                    <CardDescription>Current staff and their shifts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-restaurant-orange/10 to-restaurant-red/10 border-restaurant-orange/20">
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Role</TableHead>
                        <TableHead className="font-semibold">Shift</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staff.map((member) => (
                        <TableRow key={member.id} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors">
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell className="text-muted-foreground">{member.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-restaurant-orange/30 text-restaurant-orange">
                              {member.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{member.shift}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              member.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }`}>
                              {member.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
