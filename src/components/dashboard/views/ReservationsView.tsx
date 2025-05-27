
import { useState } from "react";
import { DataTable } from "../shared/DataTable";
import { ConfirmationDialog } from "../shared/ConfirmationDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Check, X } from "lucide-react";
import { useMockData, Reservation } from "@/hooks/useMockData";

export const ReservationsView = () => {
  const { reservations, setReservations } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState({ 
    customerName: '', 
    customerEmail: '', 
    date: '', 
    time: '',
    tableNumber: '',
    partySize: '',
    notes: ''
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const columns = [
    { key: 'id', label: 'Reservation ID', sortable: true },
    { key: 'customerName', label: 'Customer Name', sortable: true },
    { key: 'customerEmail', label: 'Email', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'time', label: 'Time', sortable: true },
    { key: 'tableNumber', label: 'Table #', sortable: true },
    { key: 'partySize', label: 'Party Size', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      render: (status: string) => (
        <Badge variant={getStatusVariant(status) as any}>
          {status}
        </Badge>
      )
    },
  ];

  const actions = [
    { icon: Eye, label: 'View', onClick: (reservation: Reservation) => handleView(reservation), variant: 'ghost' as const },
    { icon: Edit, label: 'Edit', onClick: (reservation: Reservation) => handleEdit(reservation), variant: 'ghost' as const },
    { icon: Check, label: 'Approve', onClick: (reservation: Reservation) => handleApprove(reservation), variant: 'ghost' as const },
    { icon: X, label: 'Reject', onClick: (reservation: Reservation) => handleReject(reservation), variant: 'ghost' as const },
    { icon: Trash2, label: 'Delete', onClick: (reservation: Reservation) => handleDelete(reservation), variant: 'ghost' as const },
  ];

  const handleApprove = (reservation: Reservation) => {
    setReservations(reservations.map(r => 
      r.id === reservation.id ? { ...r, status: 'approved' } : r
    ));
  };

  const handleReject = (reservation: Reservation) => {
    setReservations(reservations.map(r => 
      r.id === reservation.id ? { ...r, status: 'rejected' } : r
    ));
  };

  const handleAdd = () => {
    setSelectedReservation(null);
    setFormData({ 
      customerName: '', 
      customerEmail: '', 
      date: '', 
      time: '',
      tableNumber: '',
      partySize: '',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleView = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setFormData({
      customerName: reservation.customerName,
      customerEmail: reservation.customerEmail,
      date: reservation.date,
      time: reservation.time,
      tableNumber: reservation.tableNumber.toString(),
      partySize: reservation.partySize.toString(),
      notes: reservation.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setFormData({
      customerName: reservation.customerName,
      customerEmail: reservation.customerEmail,
      date: reservation.date,
      time: reservation.time,
      tableNumber: reservation.tableNumber.toString(),
      partySize: reservation.partySize.toString(),
      notes: reservation.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    const newReservation: Reservation = {
      id: selectedReservation?.id || `RES${Date.now()}`,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      date: formData.date,
      time: formData.time,
      tableNumber: parseInt(formData.tableNumber),
      partySize: parseInt(formData.partySize),
      status: selectedReservation?.status || 'pending',
      notes: formData.notes || undefined,
    };

    if (selectedReservation) {
      setReservations(reservations.map(r => r.id === selectedReservation.id ? newReservation : r));
    } else {
      setReservations([...reservations, newReservation]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedReservation) {
      setReservations(reservations.filter(r => r.id !== selectedReservation.id));
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DataTable
        title="Reservations Management"
        description="Manage restaurant reservations and bookings"
        data={reservations}
        columns={columns}
        actions={actions}
        onAdd={handleAdd}
        searchKey="customerName"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedReservation ? 'Edit Reservation' : 'Add New Reservation'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Customer Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                placeholder="Enter customer email"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="tableNumber">Table Number</Label>
              <Input
                id="tableNumber"
                type="number"
                value={formData.tableNumber}
                onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                placeholder="Enter table number"
              />
            </div>
            <div>
              <Label htmlFor="partySize">Party Size</Label>
              <Input
                id="partySize"
                type="number"
                value={formData.partySize}
                onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                placeholder="Enter party size"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Enter any special notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedReservation ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Reservation"
        description={`Are you sure you want to delete reservation "${selectedReservation?.id}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};
