
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
import { useMockData, Staff } from "@/hooks/useMockData";

export const StaffView = () => {
  const { staff, setStaff } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    role: '', 
    department: '', 
    status: 'active' as 'active' | 'inactive'
  });

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      render: (status: string) => (
        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      )
    },
    { key: 'hireDate', label: 'Hire Date', sortable: true },
  ];

  const actions = [
    { icon: Eye, label: 'View', onClick: (staff: Staff) => handleView(staff), variant: 'ghost' as const },
    { icon: Edit, label: 'Edit', onClick: (staff: Staff) => handleEdit(staff), variant: 'ghost' as const },
    { icon: Trash2, label: 'Delete', onClick: (staff: Staff) => handleDelete(staff), variant: 'ghost' as const },
  ];

  const handleAdd = () => {
    setSelectedStaff(null);
    setFormData({ name: '', email: '', role: '', department: '', status: 'active' });
    setIsModalOpen(true);
  };

  const handleView = (staff: Staff) => {
    setSelectedStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      department: staff.department,
      status: staff.status
    });
    setIsModalOpen(true);
  };

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      department: staff.department,
      status: staff.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    const newStaff: Staff = {
      id: selectedStaff?.id || Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      status: formData.status,
      hireDate: selectedStaff?.hireDate || new Date().toISOString().split('T')[0],
    };

    if (selectedStaff) {
      setStaff(staff.map(s => s.id === selectedStaff.id ? newStaff : s));
    } else {
      setStaff([...staff, newStaff]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedStaff) {
      setStaff(staff.filter(s => s.id !== selectedStaff.id));
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DataTable
        title="Staff Management"
        description="Manage restaurant staff members"
        data={staff}
        columns={columns}
        actions={actions}
        onAdd={handleAdd}
        searchKey="name"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter staff name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Enter role"
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Enter department"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedStaff ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Staff Member"
        description={`Are you sure you want to delete "${selectedStaff?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};
