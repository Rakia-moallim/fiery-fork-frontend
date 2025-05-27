
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
import { useMockData, Payment } from "@/hooks/useMockData";

export const PaymentsView = () => {
  const { payments, setPayments } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState({ 
    orderId: '', 
    amount: '', 
    method: 'cash' as 'cash' | 'card' | 'online',
    status: 'pending' as 'pending' | 'completed' | 'failed'
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'completed': return 'default';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const columns = [
    { key: 'id', label: 'Payment ID', sortable: true },
    { key: 'orderId', label: 'Order ID', sortable: true },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (amount: number) => `$${amount.toFixed(2)}`
    },
    { key: 'method', label: 'Method', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      render: (status: string) => (
        <Badge variant={getStatusVariant(status) as any}>
          {status}
        </Badge>
      )
    },
    { key: 'date', label: 'Date', sortable: true },
  ];

  const actions = [
    { icon: Eye, label: 'View', onClick: (payment: Payment) => handleView(payment), variant: 'ghost' as const },
    { icon: Edit, label: 'Edit', onClick: (payment: Payment) => handleEdit(payment), variant: 'ghost' as const },
    { icon: Trash2, label: 'Delete', onClick: (payment: Payment) => handleDelete(payment), variant: 'ghost' as const },
  ];

  const handleAdd = () => {
    setSelectedPayment(null);
    setFormData({ orderId: '', amount: '', method: 'cash', status: 'pending' });
    setIsModalOpen(true);
  };

  const handleView = (payment: Payment) => {
    setSelectedPayment(payment);
    setFormData({
      orderId: payment.orderId,
      amount: payment.amount.toString(),
      method: payment.method,
      status: payment.status
    });
    setIsModalOpen(true);
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setFormData({
      orderId: payment.orderId,
      amount: payment.amount.toString(),
      method: payment.method,
      status: payment.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    const newPayment: Payment = {
      id: selectedPayment?.id || `PAY${Date.now()}`,
      orderId: formData.orderId,
      amount: parseFloat(formData.amount),
      method: formData.method,
      status: formData.status,
      date: selectedPayment?.date || new Date().toISOString(),
    };

    if (selectedPayment) {
      setPayments(payments.map(p => p.id === selectedPayment.id ? newPayment : p));
    } else {
      setPayments([...payments, newPayment]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedPayment) {
      setPayments(payments.filter(p => p.id !== selectedPayment.id));
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DataTable
        title="Payments Management"
        description="Manage payment transactions and records"
        data={payments}
        columns={columns}
        actions={actions}
        onAdd={handleAdd}
        searchKey="orderId"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedPayment ? 'Edit Payment' : 'Add New Payment'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                value={formData.orderId}
                onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                placeholder="Enter order ID"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Enter payment amount"
              />
            </div>
            <div>
              <Label htmlFor="method">Payment Method</Label>
              <Select value={formData.method} onValueChange={(value: any) => setFormData({ ...formData, method: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedPayment ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Payment"
        description={`Are you sure you want to delete payment "${selectedPayment?.id}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};
