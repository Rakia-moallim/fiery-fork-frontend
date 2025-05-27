
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
import { useMockData, TableData } from "@/hooks/useMockData";

export const TablesView = () => {
  const { tables, setTables } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [formData, setFormData] = useState({ 
    number: '', 
    seats: '', 
    status: 'available' as 'available' | 'occupied' | 'reserved' | 'maintenance',
    location: ''
  });

  const columns = [
    { key: 'number', label: 'Table Number', sortable: true },
    { key: 'seats', label: 'Seats', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      render: (status: string) => {
        const variants = {
          available: 'default',
          occupied: 'destructive',
          reserved: 'secondary',
          maintenance: 'outline'
        };
        return <Badge variant={variants[status as keyof typeof variants] as any}>{status}</Badge>;
      }
    },
    { key: 'location', label: 'Location', sortable: true },
  ];

  const actions = [
    { icon: Eye, label: 'View', onClick: (table: TableData) => handleView(table), variant: 'ghost' as const },
    { icon: Edit, label: 'Edit', onClick: (table: TableData) => handleEdit(table), variant: 'ghost' as const },
    { icon: Trash2, label: 'Delete', onClick: (table: TableData) => handleDelete(table), variant: 'ghost' as const },
  ];

  const handleAdd = () => {
    setSelectedTable(null);
    setFormData({ number: '', seats: '', status: 'available', location: '' });
    setIsModalOpen(true);
  };

  const handleView = (table: TableData) => {
    setSelectedTable(table);
    setFormData({
      number: table.number.toString(),
      seats: table.seats.toString(),
      status: table.status,
      location: table.location
    });
    setIsModalOpen(true);
  };

  const handleEdit = (table: TableData) => {
    setSelectedTable(table);
    setFormData({
      number: table.number.toString(),
      seats: table.seats.toString(),
      status: table.status,
      location: table.location
    });
    setIsModalOpen(true);
  };

  const handleDelete = (table: TableData) => {
    setSelectedTable(table);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    const newTable: TableData = {
      id: selectedTable?.id || Date.now().toString(),
      number: parseInt(formData.number),
      seats: parseInt(formData.seats),
      status: formData.status,
      location: formData.location,
    };

    if (selectedTable) {
      setTables(tables.map(t => t.id === selectedTable.id ? newTable : t));
    } else {
      setTables([...tables, newTable]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedTable) {
      setTables(tables.filter(t => t.id !== selectedTable.id));
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DataTable
        title="Table Management"
        description="Manage restaurant tables and seating"
        data={tables}
        columns={columns}
        actions={actions}
        onAdd={handleAdd}
        searchKey="location"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedTable ? 'Edit Table' : 'Add New Table'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="number">Table Number</Label>
              <Input
                id="number"
                type="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="Enter table number"
              />
            </div>
            <div>
              <Label htmlFor="seats">Number of Seats</Label>
              <Input
                id="seats"
                type="number"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                placeholder="Enter number of seats"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter table location"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedTable ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Table"
        description={`Are you sure you want to delete Table ${selectedTable?.number}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};
