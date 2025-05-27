
import { useState } from "react";
import { DataTable } from "../shared/DataTable";
import { ConfirmationDialog } from "../shared/ConfirmationDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { useMockData, MenuItem } from "@/hooks/useMockData";

export const MenuView = () => {
  const { menuItems, setMenuItems } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    category: '', 
    price: '', 
    description: '',
    status: 'available' as 'available' | 'unavailable'
  });

  const columns = [
    { key: 'name', label: 'Item Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { 
      key: 'price', 
      label: 'Price', 
      sortable: true,
      render: (price: number) => `$${price.toFixed(2)}`
    },
    { key: 'description', label: 'Description' },
    { 
      key: 'status', 
      label: 'Status', 
      render: (status: string) => (
        <Badge variant={status === 'available' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      )
    },
  ];

  const actions = [
    { icon: Eye, label: 'View', onClick: (item: MenuItem) => handleView(item), variant: 'ghost' as const },
    { icon: Edit, label: 'Edit', onClick: (item: MenuItem) => handleEdit(item), variant: 'ghost' as const },
    { icon: Trash2, label: 'Delete', onClick: (item: MenuItem) => handleDelete(item), variant: 'ghost' as const },
  ];

  const handleAdd = () => {
    setSelectedItem(null);
    setFormData({ name: '', category: '', price: '', description: '', status: 'available' });
    setIsModalOpen(true);
  };

  const handleView = (item: MenuItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    const newItem: MenuItem = {
      id: selectedItem?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      status: formData.status,
    };

    if (selectedItem) {
      setMenuItems(menuItems.map(i => i.id === selectedItem.id ? newItem : i));
    } else {
      setMenuItems([...menuItems, newItem]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setMenuItems(menuItems.filter(i => i.id !== selectedItem.id));
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DataTable
        title="Menu Management"
        description="Manage restaurant menu items"
        data={menuItems}
        columns={columns}
        actions={actions}
        onAdd={handleAdd}
        searchKey="name"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter item name"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Enter category"
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter price"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter item description"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'available' | 'unavailable') => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedItem ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Menu Item"
        description={`Are you sure you want to delete "${selectedItem?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};
