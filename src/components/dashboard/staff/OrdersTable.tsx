
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: string;
  time: string;
}

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: string) => void;
}

export const OrdersTable = ({ orders, onStatusChange }: OrdersTableProps) => {
  return (
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
                      onValueChange={(value) => onStatusChange(order.id, value)}
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
  );
};
