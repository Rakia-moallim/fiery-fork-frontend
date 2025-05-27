
import { useState } from "react";
import { DataTable } from "../shared/DataTable";
import { ConfirmationDialog } from "../shared/ConfirmationDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { useMockData, Role } from "@/hooks/useMockData";

export const RolesView = () => {
  const { roles, setRoles } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', permissions: '' });

  const columns = [
    { key: 'name', label: 'Role Name', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { 
      key: 'permissions', 
      label: 'Permissions', 
      render: (permissions: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {permissions.map((permission, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {permission}
            </Badge>
          ))}
        </div>
      )
    },
    { key: 'createdAt', label: 'Created Date', sortable: true },
  ];

  const actions = [
    { icon: Eye, label: 'View', onClick: (role: Role) => handleView(role), variant: 'ghost' as const },
    { icon: Edit, label: 'Edit', onClick: (role: Role) => handleEdit(role), variant: 'ghost' as const },
    { icon: Trash2, label: 'Delete', onClick: (role: Role) => handleDelete(role), variant: 'ghost' as const },
  ];

  const handleAdd = () => {
    setSelectedRole(null);
    setFormData({ name: '', description: '', permissions: '' });
    setIsModalOpen(true);
  };

  const handleView = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    const newRole: Role = {
      id: selectedRole?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      permissions: formData.permissions.split(',').map(p => p.trim()),
      createdAt: selectedRole?.createdAt || new Date().toISOString().split('T')[0],
    };

    if (selectedRole) {
      setRoles(roles.map(r => r.id === selectedRole.id ? newRole : r));
    } else {
      setRoles([...roles, newRole]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedRole) {
      setRoles(roles.filter(r => r.id !== selectedRole.id));
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DataTable
        title="Role Management"
        description="Manage user roles and permissions"
        data={roles}
        columns={columns}
        actions={actions}
        onAdd={handleAdd}
        searchKey="name"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedRole ? 'Edit Role' : 'Add New Role'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter role name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter role description"
              />
            </div>
            <div>
              <Label htmlFor="permissions">Permissions (comma-separated)</Label>
              <Input
                id="permissions"
                value={formData.permissions}
                onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
                placeholder="read, write, delete"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedRole ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Role"
        description={`Are you sure you want to delete the role "${selectedRole?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};
