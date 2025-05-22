
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
import { ClipboardList, Calendar, ChefHat } from "lucide-react";
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

export const StaffDashboard = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [reservations, setReservations] = useState(mockReservations);
  const [tables, setTables] = useState(mockTables);

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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Staff Dashboard</h2>
        <p className="text-muted-foreground">
          Manage orders, reservations, and tables.
        </p>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">
            <ClipboardList className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="reservations">
            <Calendar className="mr-2 h-4 w-4" />
            Reservations
          </TabsTrigger>
          <TabsTrigger value="tables">
            <ChefHat className="mr-2 h-4 w-4" />
            Tables
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Orders</CardTitle>
              <CardDescription>
                View and manage customer orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Order ID</th>
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Items</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">
                          <ul className="list-disc list-inside">
                            {order.items.map((item, index) => (
                              <li key={index} className="text-sm">{item}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">{order.time}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "preparing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "ready"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "on-the-way"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {order.status.replace(/-/g, " ")}
                          </span>
                        </td>
                        <td className="py-3 px-4">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reservations Tab */}
        <TabsContent value="reservations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reservations</CardTitle>
              <CardDescription>
                Approve or reject reservation requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Reservation ID</th>
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-left py-3 px-4">Guests</th>
                      <th className="text-left py-3 px-4">Special Requests</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{reservation.id}</td>
                        <td className="py-3 px-4">{reservation.customer}</td>
                        <td className="py-3 px-4">{reservation.date}</td>
                        <td className="py-3 px-4">{reservation.time}</td>
                        <td className="py-3 px-4">{reservation.guests}</td>
                        <td className="py-3 px-4">
                          {reservation.specialRequests || "None"}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reservation.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {reservation.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tables Tab */}
        <TabsContent value="tables" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Table Management</CardTitle>
              <CardDescription>
                View and update table availability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tables.map((table) => (
                  <Card key={table.id} className="overflow-hidden">
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
      </Tabs>
    </div>
  );
};
