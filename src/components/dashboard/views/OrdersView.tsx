import { useState } from "react";
import { DataTable } from "../shared/DataTable";
import { ConfirmationDialog } from "../shared/ConfirmationDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { useAllOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { Order } from "@/lib/api";
import { toast } from "sonner";

export const OrdersView = () => {
  const { data: orders = [], isLoading, error } = useAllOrders();
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading orders...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">
      Error loading orders: {error instanceof Error ? error.message : 'Unknown error'}
    </div>;
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'outline';
      case 'confirmed': return 'secondary';
      case 'preparing': return 'secondary';
      case 'ready': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatusMutation.mutateAsync({ orderId, status: newStatus });
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const columns = [
    { key: 'id', label: 'Order ID', sortable: true },
    { 
      key: 'user', 
      label: 'Customer', 
      sortable: true,
      render: (user: any) => user?.name || 'Unknown'
    },
    { 
      key: 'orderItems', 
      label: 'Items', 
      render: (orderItems: any[]) => {
        if (!orderItems || orderItems.length === 0) return 'No items';
        return orderItems.map(item => 
          `${item.quantity}x ${item.menuItem?.name || 'Unknown Item'}`
        ).join(', ');
      }
    },
    { 
      key: 'totalAmount', 
      label: 'Total', 
      sortable: true,
      render: (total: number) => `$${total?.toFixed(2) || '0.00'}`
    },
    { 
      key: 'orderType', 
      label: 'Type', 
      render: (type: string) => type?.replace('_', ' ') || 'DINE_IN'
    },
    { 
      key: 'status', 
      label: 'Status', 
      render: (status: string, row: Order) => (
        <Select 
          value={status} 
          onValueChange={(value) => handleStatusChange(row.id, value)}
          disabled={updateOrderStatusMutation.isPending}
        >
          <SelectTrigger className="w-auto">
            <Badge variant={getStatusVariant(status) as any}>
              {status?.toLowerCase().replace('_', ' ') || 'pending'}
            </Badge>
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
      )
    },
    { 
      key: 'createdAt', 
      label: 'Order Date', 
      sortable: true,
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    { 
      key: 'phoneNumber', 
      label: 'Phone',
      render: (phone: string) => phone || 'N/A'
    },
  ];

  const actions = [
    { icon: Eye, label: 'View', onClick: (order: Order) => handleView(order), variant: 'ghost' as const },
  ];

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <>
      <DataTable
        title="Orders Management"
        description="Manage restaurant orders and track status"
        data={orders}
        columns={columns}
        actions={actions}
        searchKey="user.name"
      />

      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Customer</Label>
                  <p className="text-sm text-muted-foreground">{selectedOrder.user?.name || 'Unknown'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedOrder.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">{selectedOrder.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Order Type</Label>
                  <p className="text-sm text-muted-foreground">{selectedOrder.orderType?.replace('_', ' ') || 'DINE_IN'}</p>
                </div>
              </div>

              {/* Delivery Address (if applicable) */}
              {selectedOrder.deliveryAddress && (
                <div>
                  <Label className="text-sm font-medium">Delivery Address</Label>
                  <p className="text-sm text-muted-foreground">{selectedOrder.deliveryAddress}</p>
                </div>
              )}

              {/* Order Items */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Order Items</Label>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">Item</th>
                        <th className="text-center p-3 text-sm font-medium">Qty</th>
                        <th className="text-right p-3 text-sm font-medium">Unit Price</th>
                        <th className="text-right p-3 text-sm font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.orderItems?.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{item.menuItem?.name || 'Unknown Item'}</p>
                              {item.specialInstructions && (
                                <p className="text-xs text-muted-foreground">Note: {item.specialInstructions}</p>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-center">{item.quantity}</td>
                          <td className="p-3 text-right">${item.unitPrice?.toFixed(2) || '0.00'}</td>
                          <td className="p-3 text-right font-medium">${item.totalPrice?.toFixed(2) || '0.00'}</td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan={4} className="p-3 text-center text-muted-foreground">No items found</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot className="bg-muted">
                      <tr>
                        <td colSpan={3} className="p-3 text-right font-medium">Total Amount:</td>
                        <td className="p-3 text-right font-bold">${selectedOrder.totalAmount?.toFixed(2) || '0.00'}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Special Instructions */}
              {selectedOrder.specialInstructions && (
                <div>
                  <Label className="text-sm font-medium">Special Instructions</Label>
                  <p className="text-sm text-muted-foreground">{selectedOrder.specialInstructions}</p>
                </div>
              )}

              {/* Order Timestamps */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Order Date</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                {selectedOrder.estimatedDeliveryTime && (
                  <div>
                    <Label className="text-sm font-medium">Estimated Delivery</Label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedOrder.estimatedDeliveryTime).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
