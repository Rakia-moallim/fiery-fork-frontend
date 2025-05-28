import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList } from "lucide-react";
import { useAllOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { Order } from "@/lib/api";

export const OrdersTable = () => {
  const { data: orders = [], isLoading, error } = useAllOrders();
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: number, status: string) => {
    try {
      await updateOrderStatusMutation.mutateAsync({ orderId, status });
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "preparing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "ready":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-32">
            <div className="text-muted-foreground">Loading orders...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-32 text-red-500">
            Error loading orders: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filter out delivered and cancelled orders for staff view
  const activeOrders = orders.filter(order => 
    order.status !== 'DELIVERED' && order.status !== 'CANCELLED'
  );

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-restaurant-orange to-restaurant-red rounded-lg">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Current Orders</CardTitle>
            <CardDescription>View and manage customer orders ({activeOrders.length} active)</CardDescription>
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
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Time</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No active orders at the moment
                  </TableCell>
                </TableRow>
              ) : (
                activeOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors">
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.user?.name || 'Unknown'}</div>
                        {order.phoneNumber && (
                          <div className="text-xs text-muted-foreground">{order.phoneNumber}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {order.orderItems?.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.quantity}x {item.menuItem?.name || 'Unknown Item'}
                            {item.specialInstructions && (
                              <div className="text-xs text-muted-foreground italic">
                                Note: {item.specialInstructions}
                              </div>
                            )}
                          </div>
                        )) || 'No items'}
                        {order.specialInstructions && (
                          <div className="text-xs text-muted-foreground mt-1 italic">
                            Order note: {order.specialInstructions}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-restaurant-orange">
                      ${(order.totalAmount || 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {order.orderType?.replace('_', ' ') || 'DINE_IN'}
                      </Badge>
                      {order.deliveryAddress && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {order.deliveryAddress}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      {order.estimatedDeliveryTime && (
                        <div className="text-xs text-muted-foreground">
                          Est: {new Date(order.estimatedDeliveryTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(order.status)}>
                        {order.status.toLowerCase().replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                        disabled={updateOrderStatusMutation.isPending}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                          <SelectItem value="PREPARING">Preparing</SelectItem>
                          <SelectItem value="READY">Ready</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
