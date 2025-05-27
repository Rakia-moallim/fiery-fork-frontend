
import { useState } from 'react';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  hireDate: string;
}

export interface TableData {
  id: string;
  number: number;
  seats: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  location: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  status: 'available' | 'unavailable';
  image?: string;
}

export interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'preparing' | 'out-for-delivery' | 'delivered';
  orderDate: string;
  tableNumber?: number;
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  time: string;
  tableNumber: number;
  partySize: number;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'cash' | 'card' | 'online';
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

export interface BankInfo {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
  isActive: boolean;
}

export const useMockData = () => {
  const [roles, setRoles] = useState<Role[]>([
    { id: '1', name: 'Admin', description: 'Full system access', permissions: ['all'], createdAt: '2024-01-01' },
    { id: '2', name: 'Manager', description: 'Management access', permissions: ['read', 'write'], createdAt: '2024-01-02' },
    { id: '3', name: 'Staff', description: 'Basic staff access', permissions: ['read'], createdAt: '2024-01-03' },
  ]);

  const [staff, setStaff] = useState<Staff[]>([
    { id: '1', name: 'John Doe', email: 'john@tastehub.com', role: 'Manager', department: 'Kitchen', status: 'active', hireDate: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@tastehub.com', role: 'Staff', department: 'Service', status: 'active', hireDate: '2024-02-01' },
    { id: '3', name: 'Mike Johnson', email: 'mike@tastehub.com', role: 'Staff', department: 'Delivery', status: 'inactive', hireDate: '2024-01-20' },
  ]);

  const [tables, setTables] = useState<TableData[]>([
    { id: '1', number: 1, seats: 4, status: 'available', location: 'Main Hall' },
    { id: '2', number: 2, seats: 2, status: 'occupied', location: 'Window Side' },
    { id: '3', number: 3, seats: 6, status: 'reserved', location: 'Private Room' },
    { id: '4', number: 4, seats: 4, status: 'maintenance', location: 'Main Hall' },
  ]);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Burger Deluxe', category: 'Main Course', price: 12.99, description: 'Juicy beef burger with fries', status: 'available' },
    { id: '2', name: 'Caesar Salad', category: 'Salads', price: 8.99, description: 'Fresh romaine with caesar dressing', status: 'available' },
    { id: '3', name: 'Pasta Carbonara', category: 'Main Course', price: 14.99, description: 'Creamy pasta with bacon', status: 'unavailable' },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD001', customer: 'Alice Brown', items: ['Burger Deluxe', 'Fries'], total: 15.99, status: 'preparing', orderDate: '2024-01-15T10:30:00', tableNumber: 1 },
    { id: 'ORD002', customer: 'Bob Wilson', items: ['Caesar Salad'], total: 8.99, status: 'delivered', orderDate: '2024-01-15T11:00:00' },
    { id: 'ORD003', customer: 'Carol Davis', items: ['Pasta Carbonara', 'Garlic Bread'], total: 18.99, status: 'out-for-delivery', orderDate: '2024-01-15T11:30:00' },
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([
    { id: 'RES001', customerName: 'David Lee', customerEmail: 'david@email.com', date: '2024-01-16', time: '19:00', tableNumber: 3, partySize: 4, status: 'pending', notes: 'Anniversary dinner' },
    { id: 'RES002', customerName: 'Emma Watson', customerEmail: 'emma@email.com', date: '2024-01-16', time: '20:00', tableNumber: 2, partySize: 2, status: 'approved' },
    { id: 'RES003', customerName: 'Frank Miller', customerEmail: 'frank@email.com', date: '2024-01-17', time: '18:30', tableNumber: 1, partySize: 6, status: 'rejected', notes: 'Table not available' },
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    { id: 'PAY001', orderId: 'ORD001', amount: 15.99, method: 'card', status: 'completed', date: '2024-01-15T10:35:00' },
    { id: 'PAY002', orderId: 'ORD002', amount: 8.99, method: 'cash', status: 'completed', date: '2024-01-15T11:05:00' },
    { id: 'PAY003', orderId: 'ORD003', amount: 18.99, method: 'online', status: 'pending', date: '2024-01-15T11:35:00' },
  ]);

  const [bankInfo, setBankInfo] = useState<BankInfo[]>([
    { id: '1', accountName: 'Taste Hub Main Account', accountNumber: '1234567890', bankName: 'First National Bank', routingNumber: '123456789', accountType: 'checking', isActive: true },
    { id: '2', accountName: 'Taste Hub Savings', accountNumber: '0987654321', bankName: 'First National Bank', routingNumber: '123456789', accountType: 'savings', isActive: false },
  ]);

  return {
    roles,
    setRoles,
    staff,
    setStaff,
    tables,
    setTables,
    menuItems,
    setMenuItems,
    orders,
    setOrders,
    reservations,
    setReservations,
    payments,
    setPayments,
    bankInfo,
    setBankInfo,
  };
};
