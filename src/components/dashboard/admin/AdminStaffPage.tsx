import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  UserCheck, 
  UserPlus, 
  Users,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Crown,
  User,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'STAFF' | 'MANAGER';
  department: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  address: string;
  notes: string;
  permissions: string[];
  lastActive: string;
}

export function AdminStaffPage() {
  const { toast } = useToast();
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@restaurant.com",
      phone: "+1 (555) 123-4567",
      role: "MANAGER",
      department: "Kitchen",
      hireDate: "2023-01-15",
      salary: 55000,
      status: "active",
      address: "123 Main St, City, State 12345",
      notes: "Excellent performance, promoted recently",
      permissions: ["manage_orders", "manage_inventory", "view_reports"],
      lastActive: "2024-05-20"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@restaurant.com",
      phone: "+1 (555) 987-6543",
      role: "STAFF",
      department: "Service",
      hireDate: "2023-06-20",
      salary: 35000,
      status: "active",
      address: "456 Oak Ave, City, State 12345",
      notes: "Reliable server, customer favorite",
      permissions: ["manage_orders", "view_inventory"],
      lastActive: "2024-05-20"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@restaurant.com",
      phone: "+1 (555) 456-7890",
      role: "ADMIN",
      department: "Administration",
      hireDate: "2022-03-10",
      salary: 70000,
      status: "active",
      address: "789 Pine Rd, City, State 12345",
      notes: "System administrator, IT support",
      permissions: ["full_access"],
      lastActive: "2024-05-20"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@restaurant.com",
      phone: "+1 (555) 321-0987",
      role: "STAFF",
      department: "Kitchen",
      hireDate: "2024-01-05",
      salary: 32000,
      status: "on_leave",
      address: "321 Elm St, City, State 12345",
      notes: "On medical leave, expected back next month",
      permissions: ["manage_inventory"],
      lastActive: "2024-04-15"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: "",
    email: "",
    phone: "",
    role: "STAFF",
    department: "",
    salary: 0,
    status: "active",
    address: "",
    notes: "",
    permissions: []
  });

  // Filter staff based on search, role, and status
  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.department) {
      toast({
        title: "Error",
        description: "Name, email, and department are required",
        variant: "destructive",
      });
      return;
    }

    const staffMember: Staff = {
      id: staff.length + 1,
      name: newStaff.name!,
      email: newStaff.email!,
      phone: newStaff.phone || "",
      role: (newStaff.role as Staff['role']) || "STAFF",
      department: newStaff.department!,
      hireDate: new Date().toISOString().split('T')[0],
      salary: newStaff.salary || 0,
      status: (newStaff.status as Staff['status']) || "active",
      address: newStaff.address || "",
      notes: newStaff.notes || "",
      permissions: newStaff.permissions || [],
      lastActive: new Date().toISOString().split('T')[0],
    };

    setStaff([...staff, staffMember]);
    setNewStaff({ 
      name: "", email: "", phone: "", role: "STAFF", department: "", 
      salary: 0, status: "active", address: "", notes: "", permissions: [] 
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Staff member added successfully",
    });
  };

  const handleEditStaff = () => {
    if (!selectedStaff) return;

    setStaff(staff.map(member => 
      member.id === selectedStaff.id ? selectedStaff : member
    ));
    setIsEditDialogOpen(false);
    setSelectedStaff(null);
    
    toast({
      title: "Success",
      description: "Staff member updated successfully",
    });
  };

  const handleDeleteStaff = (id: number) => {
    setStaff(staff.filter(member => member.id !== id));
    toast({
      title: "Success",
      description: "Staff member deleted successfully",
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN': return <Crown className="h-4 w-4 text-red-500" />;
      case 'MANAGER': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'STAFF': return <User className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'on_leave': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'terminated': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: "bg-red-100 text-red-800 border-red-300",
      MANAGER: "bg-blue-100 text-blue-800 border-blue-300",
      STAFF: "bg-green-100 text-green-800 border-green-300"
    };
    
    return (
      <Badge className={colors[role as keyof typeof colors] || colors.STAFF}>
        {getRoleIcon(role)}
        <span className="ml-1">{role}</span>
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-300",
      inactive: "bg-yellow-100 text-yellow-800 border-yellow-300",
      on_leave: "bg-blue-100 text-blue-800 border-blue-300",
      terminated: "bg-red-100 text-red-800 border-red-300"
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors] || colors.active}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status.replace('_', ' ')}</span>
      </Badge>
    );
  };

  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserCheck className="h-8 w-8 text-green-600" />
            Staff Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage staff members, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Admin Only
          </Badge>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
            <p className="text-xs text-muted-foreground">All employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {staff.filter(s => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Managers</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {staff.filter(s => s.role === 'MANAGER').length}
            </div>
            <p className="text-xs text-muted-foreground">Management level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Salary</CardTitle>
            <div className="h-4 w-4 text-green-600">$</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(staff.reduce((sum, s) => sum + s.salary, 0) / staff.length).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Per year</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or department..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
                <SelectItem value="STAFF">Staff</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on_leave">On Leave</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff List ({filteredStaff.length})</CardTitle>
          <CardDescription>
            Manage all staff members and their information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Employee</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Contact</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Role</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Department</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Hire Date</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Salary</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ID: {member.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {getRoleBadge(member.role)}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-900 dark:text-white">{member.department}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {member.hireDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${member.salary.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedStaff(member);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteStaff(member.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Staff Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Staff Member</DialogTitle>
            <DialogDescription>
              Create a new staff account. Fill in the required information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name *</Label>
              <Input
                id="name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newStaff.email}
                onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input
                id="phone"
                value={newStaff.phone}
                onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role *</Label>
              <Select 
                value={newStaff.role} 
                onValueChange={(value) => setNewStaff({...newStaff, role: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STAFF">Staff</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Department *</Label>
              <Input
                id="department"
                value={newStaff.department}
                onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">Salary</Label>
              <Input
                id="salary"
                type="number"
                value={newStaff.salary}
                onChange={(e) => setNewStaff({...newStaff, salary: parseInt(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">Address</Label>
              <Textarea
                id="address"
                value={newStaff.address}
                onChange={(e) => setNewStaff({...newStaff, address: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Textarea
                id="notes"
                value={newStaff.notes}
                onChange={(e) => setNewStaff({...newStaff, notes: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStaff}>Add Staff Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
            <DialogDescription>
              Update staff member information.
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name *</Label>
                <Input
                  id="edit-name"
                  value={selectedStaff.name}
                  onChange={(e) => setSelectedStaff({...selectedStaff, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedStaff.email}
                  onChange={(e) => setSelectedStaff({...selectedStaff, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">Phone</Label>
                <Input
                  id="edit-phone"
                  value={selectedStaff.phone}
                  onChange={(e) => setSelectedStaff({...selectedStaff, phone: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">Role</Label>
                <Select 
                  value={selectedStaff.role} 
                  onValueChange={(value) => setSelectedStaff({...selectedStaff, role: value as Staff['role']})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STAFF">Staff</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">Department</Label>
                <Input
                  id="edit-department"
                  value={selectedStaff.department}
                  onChange={(e) => setSelectedStaff({...selectedStaff, department: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-salary" className="text-right">Salary</Label>
                <Input
                  id="edit-salary"
                  type="number"
                  value={selectedStaff.salary}
                  onChange={(e) => setSelectedStaff({...selectedStaff, salary: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select 
                  value={selectedStaff.status} 
                  onValueChange={(value) => setSelectedStaff({...selectedStaff, status: value as Staff['status']})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on_leave">On Leave</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">Address</Label>
                <Textarea
                  id="edit-address"
                  value={selectedStaff.address}
                  onChange={(e) => setSelectedStaff({...selectedStaff, address: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedStaff.notes}
                  onChange={(e) => setSelectedStaff({...selectedStaff, notes: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditStaff}>Update Staff Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 