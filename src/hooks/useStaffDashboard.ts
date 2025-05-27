
import { useState } from "react";
import { toast } from "sonner";

// Mock data types
interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: string;
  time: string;
}

interface Reservation {
  id: string;
  customer: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  specialRequests: string;
}

interface Table {
  id: number;
  seats: number;
  status: string;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  shift: string;
}

// Mock data
const mockOrders: Order[] = [
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

const mockReservations: Reservation[] = [
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

const mockTables: Table[] = [
  { id: 1, seats: 2, status: "available" },
  { id: 2, seats: 2, status: "available" },
  { id: 3, seats: 4, status: "occupied" },
  { id: 4, seats: 4, status: "reserved" },
  { id: 5, seats: 6, status: "available" },
  { id: 6, seats: 6, status: "occupied" },
  { id: 7, seats: 8, status: "available" },
  { id: 8, seats: 8, status: "reserved" },
];

const mockStaff: StaffMember[] = [
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

export const useStaffDashboard = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff);

  const handleOrderStatusChange = (orderId: string, status: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  const handleReservationStatusChange = (reservationId: string, status: string) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, status } : reservation
      )
    );
    toast.success(`Reservation ${reservationId} ${status}`);
  };

  const handleTableStatusChange = (tableId: number, status: string) => {
    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, status } : table
      )
    );
    toast.success(`Table ${tableId} status updated to ${status}`);
  };

  return {
    orders,
    reservations,
    tables,
    staff,
    handleOrderStatusChange,
    handleReservationStatusChange,
    handleTableStatusChange,
  };
};
