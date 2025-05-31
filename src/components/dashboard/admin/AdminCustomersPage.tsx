import { useState, useEffect } from "react";
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
  Users, 
  UserPlus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Star,
  ShoppingCart,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Calendar,
  RefreshCw,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Loader2,
  UserX,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { customerService } from "@/utils/customerService";

// Using the existing User interface but extending it for customer-specific data
interface CustomerUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'customer'; // This will always be 'customer' for this page
  phone?: string;
  address?: string;
  dateJoined: string;
  lastLogin?: string;
  status: 'active' | 'inactive' | 'blocked';
  customerLevel: 'regular' | 'premium' | 'vip';
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  notes?: string;
}

export function AdminCustomersPage() {
  const { toast } = useToast();
  
  // State management
  const [customers, setCustomers] = useState<CustomerUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerUser | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Partial<CustomerUser>>({
    username: "",
    email: "",
    fullName: "",
    role: "customer",
    phone: "",
    address: "",
    status: "active",
    customerLevel: "regular",
    notes: ""
  });

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCustomers = await customerService.getCustomers();
      setCustomers(fetchedCustomers as CustomerUser[]);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to fetch customers from the server');
      setCustomers([]); // Clear any existing data
      toast({
        title: "Error",
        description: "Failed to fetch customers from the server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter customers based on search and filters
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(searchTerm));
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesLevel = levelFilter === "all" || customer.customerLevel === levelFilter;
    
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const handleAddCustomer = async () => {
    if (!newCustomer.username || !newCustomer.email || !newCustomer.fullName) {
      toast({
        title: "Error",
        description: "Username, email, and full name are required",
        variant: "destructive",
      });
      return;
    }

    // Check if username or email already exists
    const usernameExists = customers.some(c => c.username === newCustomer.username);
    const emailExists = customers.some(c => c.email === newCustomer.email);
    
    if (usernameExists) {
      toast({
        title: "Error",
        description: "Username already exists",
        variant: "destructive",
      });
      return;
    }
    
    if (emailExists) {
      toast({
        title: "Error",
        description: "Email already exists",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      
      // Create customer via API
      const createdCustomer = await customerService.createCustomer({
        username: newCustomer.username!,
        email: newCustomer.email!,
        fullName: newCustomer.fullName!,
        role: "customer",
        phone: newCustomer.phone,
        address: newCustomer.address,
        status: newCustomer.status || "active",
        customerLevel: newCustomer.customerLevel || "regular",
        notes: newCustomer.notes || "",
      });

      // Update local state
      setCustomers([...customers, createdCustomer as CustomerUser]);
      setNewCustomer({
        username: "", email: "", fullName: "", role: "customer", phone: "", 
        address: "", status: "active", customerLevel: "regular", notes: ""
      });
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Customer account created successfully",
      });
    } catch (error) {
      console.error('Error creating customer:', error);
      toast({
        title: "Error",
        description: "Failed to create customer account",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditCustomer = async () => {
    if (!selectedCustomer) return;

    try {
      setSubmitting(true);
      
      // Update customer via API
      const updatedCustomer = await customerService.updateCustomer(
        selectedCustomer.id, 
        selectedCustomer
      );

      // Update local state
      setCustomers(customers.map(customer => 
        customer.id === selectedCustomer.id ? updatedCustomer as CustomerUser : customer
      ));
      setIsEditDialogOpen(false);
      setSelectedCustomer(null);
      
      toast({
        title: "Success",
        description: "Customer updated successfully",
      });
    } catch (error) {
      console.error('Error updating customer:', error);
      toast({
        title: "Error",
        description: "Failed to update customer",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    try {
      // Delete customer via API
      await customerService.deleteCustomer(id);
      
      // Update local state
      setCustomers(customers.filter(customer => customer.id !== id));
      
      toast({
        title: "Success",
        description: "Customer account deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: "Error",
        description: "Failed to delete customer account",
        variant: "destructive",
      });
    }
  };

  const handleRefreshData = async () => {
    await fetchCustomers();
    toast({
      title: "Success",
      description: "Customer data refreshed",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'blocked': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-300",
      inactive: "bg-yellow-100 text-yellow-800 border-yellow-300",
      blocked: "bg-red-100 text-red-800 border-red-300"
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors] || colors.active}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'vip': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'premium': return <Star className="h-4 w-4 text-blue-500" />;
      case 'regular': return <Users className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      vip: "bg-yellow-100 text-yellow-800 border-yellow-300",
      premium: "bg-blue-100 text-blue-800 border-blue-300",
      regular: "bg-gray-100 text-gray-800 border-gray-300"
    };
    
    return (
      <Badge variant="outline" className={colors[level as keyof typeof colors] || colors.regular}>
        {getLevelIcon(level)}
        <span className="ml-1 capitalize">{level}</span>
      </Badge>
    );
  };

  // Calculate statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = customers.length > 0 
    ? customers.reduce((sum, c) => sum + c.averageOrderValue, 0) / customers.length 
    : 0;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading customers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <XCircle className="h-12 w-12 text-red-500 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Failed to Load Customers</h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
          <Button onClick={fetchCustomers}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            Customer Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage customer accounts and view customer analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Admin Only
          </Badge>
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per order</p>
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
                placeholder="Search by name, email, username, or phone..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
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

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Accounts ({filteredCustomers.length})</CardTitle>
          <CardDescription>
            Manage customer accounts created from the user registration system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            // Empty state when no customers
            <div className="text-center py-12">
              <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Customers Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                There are no customers in the system yet. Create your first customer account to get started.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add First Customer
              </Button>
            </div>
          ) : filteredCustomers.length === 0 ? (
            // Empty state when search/filter returns no results
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Customers Match Your Search</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or filters to find customers.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setLevelFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            // Table with customers
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Customer</th>
                    <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Contact</th>
                    <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Level</th>
                    <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Orders</th>
                    <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Total Spent</th>
                    <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Joined</th>
                    <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{customer.fullName}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">@{customer.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-900 dark:text-white">{customer.email}</span>
                          </div>
                          {customer.phone && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">{customer.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(customer.status)}
                      </td>
                      <td className="p-4">
                        {getLevelBadge(customer.customerLevel)}
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900 dark:text-white">{customer.totalOrders}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            ${customer.averageOrderValue.toFixed(2)} avg
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${customer.totalSpent.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Calendar className="h-3 w-3" />
                            {customer.dateJoined}
                          </div>
                          {customer.lastLogin && (
                            <p className="text-xs text-gray-500">
                              Last: {new Date(customer.lastLogin).toLocaleDateString()}
                            </p>
                          )}
                        </div>
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
                                setSelectedCustomer(customer);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Orders
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Customer Account</DialogTitle>
            <DialogDescription>
              Create a new user account with customer role.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">Username *</Label>
              <Input
                id="username"
                value={newCustomer.username}
                onChange={(e) => setNewCustomer({...newCustomer, username: e.target.value})}
                className="col-span-3"
                placeholder="john_doe"
                disabled={submitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                className="col-span-3"
                placeholder="john@example.com"
                disabled={submitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">Full Name *</Label>
              <Input
                id="fullName"
                value={newCustomer.fullName}
                onChange={(e) => setNewCustomer({...newCustomer, fullName: e.target.value})}
                className="col-span-3"
                placeholder="John Doe"
                disabled={submitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input
                id="phone"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                className="col-span-3"
                placeholder="+1 (555) 123-4567"
                disabled={submitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">Address</Label>
              <Textarea
                id="address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                className="col-span-3"
                placeholder="123 Main St, City, State 12345"
                disabled={submitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select 
                value={newCustomer.status} 
                onValueChange={(value) => setNewCustomer({...newCustomer, status: value})}
                disabled={submitting}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">Customer Level</Label>
              <Select 
                value={newCustomer.customerLevel} 
                onValueChange={(value) => setNewCustomer({...newCustomer, customerLevel: value})}
                disabled={submitting}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Textarea
                id="notes"
                value={newCustomer.notes}
                onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                className="col-span-3"
                placeholder="Customer notes..."
                disabled={submitting}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomer} disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Create Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Customer Account</DialogTitle>
            <DialogDescription>
              Update customer account information.
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-username" className="text-right">Username</Label>
                <Input
                  id="edit-username"
                  value={selectedCustomer.username}
                  onChange={(e) => setSelectedCustomer({...selectedCustomer, username: e.target.value})}
                  className="col-span-3"
                  disabled={submitting}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedCustomer.email}
                  onChange={(e) => setSelectedCustomer({...selectedCustomer, email: e.target.value})}
                  className="col-span-3"
                  disabled={submitting}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-fullName" className="text-right">Full Name</Label>
                <Input
                  id="edit-fullName"
                  value={selectedCustomer.fullName}
                  onChange={(e) => setSelectedCustomer({...selectedCustomer, fullName: e.target.value})}
                  className="col-span-3"
                  disabled={submitting}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">Phone</Label>
                <Input
                  id="edit-phone"
                  value={selectedCustomer.phone}
                  onChange={(e) => setSelectedCustomer({...selectedCustomer, phone: e.target.value})}
                  className="col-span-3"
                  disabled={submitting}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">Address</Label>
                <Textarea
                  id="edit-address"
                  value={selectedCustomer.address}
                  onChange={(e) => setSelectedCustomer({...selectedCustomer, address: e.target.value})}
                  className="col-span-3"
                  disabled={submitting}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select 
                  value={selectedCustomer.status} 
                  onValueChange={(value) => setSelectedCustomer({...selectedCustomer, status: value as CustomerUser['status']})}
                  disabled={submitting}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-level" className="text-right">Customer Level</Label>
                <Select 
                  value={selectedCustomer.customerLevel} 
                  onValueChange={(value) => setSelectedCustomer({...selectedCustomer, customerLevel: value as CustomerUser['customerLevel']})}
                  disabled={submitting}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedCustomer.notes}
                  onChange={(e) => setSelectedCustomer({...selectedCustomer, notes: e.target.value})}
                  className="col-span-3"
                  disabled={submitting}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleEditCustomer} disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Update Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 