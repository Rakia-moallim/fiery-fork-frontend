
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
import { useMockData, Order } from "@/hooks/useMockData";

export const OrdersView = () => {
  const { orders, setOrders } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({ 
    customer: '', 
    items: '', 
    total: '', 
    status: 'pending' as 'pending' | 'preparing' | 'out-for-delivery' | 'delivered',
    tableNumber: ''
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'preparing': return 'secondary';
      case 'out-for-delivery': return 'default';
      case 'delivered': return 'default';
      default: return 'outline';
    }
  };

  const columns = [
    { key: 'id', label: 'Order ID', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { 
      key: 'items', 
      label: 'Items', 
      render: (items: string[]) => items.join(', ')
    },
    { 
      key: 'total', 
      label: 'Total', 
      sortable: true,
      render: (total: number) => `$${total.toFixed(2)}`
    },
    { 
      key: 'status', 
      label: 'Status', 
      render: (status: string, row: Order) => (
        <Select 
          value={status} 
          onValueChange={(value) => handleStatusChange(row.id, value as any)}
        >
          <SelectTrigger className="w-auto">
            <Badge variant={getStatusVariant(status) as any}>
              {status}
            </Badge>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      )
    },
    { key: 'orderDate', label: 'Order Date', sortable: true },
    { key: 'tableNumber', label: 'Table #' },
  ];

  const actions = [
    { icon: Eye, label: 'View', onClick: (order: Order) => handleView(order), variant: 'ghost' as const },
    { icon: Edit, label: 'Edit', onClick: (order: Order) => handleEdit(order), variant: 'ghost' as const },
    { icon: Trash2, label: 'Delete', onClick: (order: Order) => handleDelete(order), variant: 'ghost' as const },
  ];

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleAdd = () => {
    setSelectedOrder(null);
    setFormData({ customer: '', items: '', total: '', status: 'pending', tableNumber: '' });
    setIsModalOpen(true);
  };

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setFormData({
      customer: order.customer,
      items: order.items.join(', '),
      total: order.total.toString(),
      status: order.status,
      tableNumber: order.tableNumber?.toString() || ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setFormData({
      customer: order.customer,
      items: order.items.join(', '),
      total: order.total.toString(),
      status: order.status,
      tableNumber: order.tableNumber?.toString() || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    const newOrder: Order = {
      id: selectedOrder?.id || `ORD${Date.now()}`,
      customer: formData.customer,
      items: formData.items.split(',').map(item => item.trim()),
      total: parseFloat(formData.total),
      status: formData.status,
      orderDate: selectedOrder?.orderDate || new Date().toISOString(),
      tableNumber: formData.tableNumber ? parseInt(formData.tableNumber) : undefined,
    };

    if (selectedOrder) {
      setOrders(orders.map(o => o.id === selectedOrder.id ? newOrder : o));
    } else {
      setOrders([...orders, newOrder]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedOrder) {
      setOrders(orders.filter(o => o.id !== selectedOrder.id));
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DataTable
        title="Orders Management"
        description="Manage restaurant orders and track status"
        data={orders}
        columns={columns}
        actions={actions}
        onAdd={handleAdd}
        searchKey="customer"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedOrder ? 'Edit Order' : 'Add New Order'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customer">Customer Name</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label htmlFor="items">Items (comma-separated)</Label>
              <Input
                id="items"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                placeholder="Enter items"
              />
            </div>
            <div>
              <Label htmlFor="total">Total Amount</Label>
              <Input
                id="total"
                type="number"
                step="0.01"
                value={formData.total}
                onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                placeholder="Enter total amount"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tableNumber">Table Number (optional)</Label>
              <Input
                id="tableNumber"
                type="number"
                value={formData.tableNumber}
                onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                placeholder="Enter table number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedOrder ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Order"
        description={`Are you sure you want to delete order "${selectedOrder?.id}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};
