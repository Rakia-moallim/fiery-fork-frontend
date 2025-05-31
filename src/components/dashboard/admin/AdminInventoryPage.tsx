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
  Package, 
  PackagePlus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  RefreshCw,
  Truck,
  Calendar,
  BarChart3,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InventoryItem {
  id: number;
  name: string;
  category: 'ingredients' | 'beverages' | 'supplies' | 'equipment';
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
  location: string;
  notes: string;
}

export function AdminInventoryPage() {
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "ingredients",
      currentStock: 25,
      minStock: 10,
      maxStock: 100,
      unit: "kg",
      unitPrice: 3.50,
      totalValue: 87.50,
      supplier: "Fresh Farm Co.",
      lastRestocked: "2024-05-18",
      expiryDate: "2024-05-25",
      status: "in_stock",
      location: "Cold Storage A",
      notes: "Organic variety"
    },
    {
      id: 2,
      name: "Mozzarella Cheese",
      category: "ingredients",
      currentStock: 5,
      minStock: 8,
      maxStock: 50,
      unit: "kg",
      unitPrice: 12.99,
      totalValue: 64.95,
      supplier: "Dairy Best Ltd.",
      lastRestocked: "2024-05-16",
      expiryDate: "2024-05-30",
      status: "low_stock",
      location: "Refrigerator B",
      notes: "Premium quality"
    },
    {
      id: 3,
      name: "Olive Oil",
      category: "ingredients",
      currentStock: 15,
      minStock: 5,
      maxStock: 30,
      unit: "bottles",
      unitPrice: 8.99,
      totalValue: 134.85,
      supplier: "Mediterranean Imports",
      lastRestocked: "2024-05-10",
      status: "in_stock",
      location: "Dry Storage",
      notes: "Extra virgin"
    },
    {
      id: 4,
      name: "Coca Cola",
      category: "beverages",
      currentStock: 0,
      minStock: 24,
      maxStock: 200,
      unit: "cans",
      unitPrice: 0.75,
      totalValue: 0,
      supplier: "Beverage Distributors",
      lastRestocked: "2024-05-15",
      status: "out_of_stock",
      location: "Beverage Storage",
      notes: "330ml cans"
    },
    {
      id: 5,
      name: "Disposable Cups",
      category: "supplies",
      currentStock: 500,
      minStock: 100,
      maxStock: 2000,
      unit: "pieces",
      unitPrice: 0.05,
      totalValue: 25.00,
      supplier: "PackCorp",
      lastRestocked: "2024-05-12",
      status: "in_stock",
      location: "Supply Room",
      notes: "16oz paper cups"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [restockQuantity, setRestockQuantity] = useState<number>(0);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "ingredients",
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: "",
    unitPrice: 0,
    supplier: "",
    location: "",
    notes: ""
  });

  // Filter inventory based on search and filters
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.supplier || !newItem.unit) {
      toast({
        title: "Error",
        description: "Name, supplier, and unit are required",
        variant: "destructive",
      });
      return;
    }

    const currentStock = newItem.currentStock || 0;
    const unitPrice = newItem.unitPrice || 0;
    const status = getItemStatus(currentStock, newItem.minStock || 0, newItem.expiryDate);

    const item: InventoryItem = {
      id: inventory.length + 1,
      name: newItem.name!,
      category: (newItem.category as InventoryItem['category']) || "ingredients",
      currentStock,
      minStock: newItem.minStock || 0,
      maxStock: newItem.maxStock || 0,
      unit: newItem.unit!,
      unitPrice,
      totalValue: currentStock * unitPrice,
      supplier: newItem.supplier!,
      lastRestocked: new Date().toISOString().split('T')[0],
      expiryDate: newItem.expiryDate,
      status,
      location: newItem.location || "",
      notes: newItem.notes || "",
    };

    setInventory([...inventory, item]);
    setNewItem({
      name: "", category: "ingredients", currentStock: 0, minStock: 0, maxStock: 0,
      unit: "", unitPrice: 0, supplier: "", location: "", notes: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Inventory item added successfully",
    });
  };

  const handleEditItem = () => {
    if (!selectedItem) return;

    const updatedItem = {
      ...selectedItem,
      totalValue: selectedItem.currentStock * selectedItem.unitPrice,
      status: getItemStatus(selectedItem.currentStock, selectedItem.minStock, selectedItem.expiryDate)
    };

    setInventory(inventory.map(item => 
      item.id === selectedItem.id ? updatedItem : item
    ));
    setIsEditDialogOpen(false);
    setSelectedItem(null);
    
    toast({
      title: "Success",
      description: "Inventory item updated successfully",
    });
  };

  const handleRestock = () => {
    if (!selectedItem || restockQuantity <= 0) return;

    const updatedItem = {
      ...selectedItem,
      currentStock: selectedItem.currentStock + restockQuantity,
      lastRestocked: new Date().toISOString().split('T')[0],
      totalValue: (selectedItem.currentStock + restockQuantity) * selectedItem.unitPrice
    };
    updatedItem.status = getItemStatus(updatedItem.currentStock, updatedItem.minStock, updatedItem.expiryDate);

    setInventory(inventory.map(item => 
      item.id === selectedItem.id ? updatedItem : item
    ));
    setIsRestockDialogOpen(false);
    setSelectedItem(null);
    setRestockQuantity(0);
    
    toast({
      title: "Success",
      description: `Restocked ${restockQuantity} ${selectedItem.unit} of ${selectedItem.name}`,
    });
  };

  const handleDeleteItem = (id: number) => {
    setInventory(inventory.filter(item => item.id !== id));
    toast({
      title: "Success",
      description: "Inventory item deleted successfully",
    });
  };

  const getItemStatus = (currentStock: number, minStock: number, expiryDate?: string): InventoryItem['status'] => {
    if (expiryDate && new Date(expiryDate) < new Date()) {
      return 'expired';
    }
    if (currentStock === 0) {
      return 'out_of_stock';
    }
    if (currentStock <= minStock) {
      return 'low_stock';
    }
    return 'in_stock';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'low_stock': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'out_of_stock': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'expired': return <Clock className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      in_stock: "bg-green-100 text-green-800 border-green-300",
      low_stock: "bg-yellow-100 text-yellow-800 border-yellow-300",
      out_of_stock: "bg-red-100 text-red-800 border-red-300",
      expired: "bg-red-100 text-red-800 border-red-300"
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors] || colors.in_stock}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status.replace('_', ' ')}</span>
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ingredients': return <Package className="h-4 w-4 text-blue-500" />;
      case 'beverages': return <Package className="h-4 w-4 text-purple-500" />;
      case 'supplies': return <Package className="h-4 w-4 text-green-500" />;
      case 'equipment': return <Package className="h-4 w-4 text-orange-500" />;
      default: return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  // Calculate statistics
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.status === 'low_stock').length;
  const outOfStockItems = inventory.filter(item => item.status === 'out_of_stock').length;
  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const expiredItems = inventory.filter(item => item.status === 'expired').length;

  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Package className="h-8 w-8 text-purple-600" />
            Inventory Control
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage stock levels, suppliers, and inventory operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Admin Only
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PackagePlus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Inventory items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">Urgent action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredItems}</div>
            <p className="text-xs text-muted-foreground">Need disposal</p>
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
                placeholder="Search by name, supplier, or category..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="ingredients">Ingredients</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
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

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items ({filteredInventory.length})</CardTitle>
          <CardDescription>
            Track stock levels and manage inventory operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Item</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Category</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Stock</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Unit Price</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Total Value</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Supplier</th>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ID: {item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm capitalize text-gray-900 dark:text-white">
                        {item.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.currentStock} {item.unit}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${item.unitPrice.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${item.totalValue.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-gray-900 dark:text-white">{item.supplier}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          Last: {item.lastRestocked}
                        </div>
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
                              setSelectedItem(item);
                              setIsRestockDialogOpen(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Restock
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedItem(item);
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
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
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

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogDescription>
              Add a new item to your inventory with stock details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name *</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category *</Label>
              <Select 
                value={newItem.category} 
                onValueChange={(value) => setNewItem({...newItem, category: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ingredients">Ingredients</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="supplies">Supplies</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-stock" className="text-right">Current Stock</Label>
              <Input
                id="current-stock"
                type="number"
                value={newItem.currentStock}
                onChange={(e) => setNewItem({...newItem, currentStock: parseInt(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="min-stock" className="text-right">Min Stock</Label>
              <Input
                id="min-stock"
                type="number"
                value={newItem.minStock}
                onChange={(e) => setNewItem({...newItem, minStock: parseInt(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="max-stock" className="text-right">Max Stock</Label>
              <Input
                id="max-stock"
                type="number"
                value={newItem.maxStock}
                onChange={(e) => setNewItem({...newItem, maxStock: parseInt(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">Unit *</Label>
              <Input
                id="unit"
                value={newItem.unit}
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                className="col-span-3"
                placeholder="kg, bottles, pieces, etc."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit-price" className="text-right">Unit Price</Label>
              <Input
                id="unit-price"
                type="number"
                step="0.01"
                value={newItem.unitPrice}
                onChange={(e) => setNewItem({...newItem, unitPrice: parseFloat(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">Supplier *</Label>
              <Input
                id="supplier"
                value={newItem.supplier}
                onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input
                id="location"
                value={newItem.location}
                onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry-date" className="text-right">Expiry Date</Label>
              <Input
                id="expiry-date"
                type="date"
                value={newItem.expiryDate}
                onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Textarea
                id="notes"
                value={newItem.notes}
                onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>
              Update item details and stock information.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedItem.name}
                  onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-current-stock" className="text-right">Current Stock</Label>
                <Input
                  id="edit-current-stock"
                  type="number"
                  value={selectedItem.currentStock}
                  onChange={(e) => setSelectedItem({...selectedItem, currentStock: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-min-stock" className="text-right">Min Stock</Label>
                <Input
                  id="edit-min-stock"
                  type="number"
                  value={selectedItem.minStock}
                  onChange={(e) => setSelectedItem({...selectedItem, minStock: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-max-stock" className="text-right">Max Stock</Label>
                <Input
                  id="edit-max-stock"
                  type="number"
                  value={selectedItem.maxStock}
                  onChange={(e) => setSelectedItem({...selectedItem, maxStock: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-unit-price" className="text-right">Unit Price</Label>
                <Input
                  id="edit-unit-price"
                  type="number"
                  step="0.01"
                  value={selectedItem.unitPrice}
                  onChange={(e) => setSelectedItem({...selectedItem, unitPrice: parseFloat(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-supplier" className="text-right">Supplier</Label>
                <Input
                  id="edit-supplier"
                  value={selectedItem.supplier}
                  onChange={(e) => setSelectedItem({...selectedItem, supplier: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedItem.location}
                  onChange={(e) => setSelectedItem({...selectedItem, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-expiry-date" className="text-right">Expiry Date</Label>
                <Input
                  id="edit-expiry-date"
                  type="date"
                  value={selectedItem.expiryDate}
                  onChange={(e) => setSelectedItem({...selectedItem, expiryDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedItem.notes}
                  onChange={(e) => setSelectedItem({...selectedItem, notes: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditItem}>Update Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restock Dialog */}
      <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Restock Item</DialogTitle>
            <DialogDescription>
              Add stock to {selectedItem?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4">
              <div className="text-sm space-y-2">
                <p><strong>Current Stock:</strong> {selectedItem.currentStock} {selectedItem.unit}</p>
                <p><strong>Min Stock:</strong> {selectedItem.minStock} {selectedItem.unit}</p>
                <p><strong>Max Stock:</strong> {selectedItem.maxStock} {selectedItem.unit}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="restock-quantity" className="text-right">Add Quantity</Label>
                <Input
                  id="restock-quantity"
                  type="number"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(parseInt(e.target.value) || 0)}
                  className="col-span-3"
                  placeholder={`Enter ${selectedItem.unit} to add`}
                />
              </div>
              {restockQuantity > 0 && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  <p><strong>New Stock Level:</strong> {selectedItem.currentStock + restockQuantity} {selectedItem.unit}</p>
                  <p><strong>Additional Cost:</strong> ${(restockQuantity * selectedItem.unitPrice).toFixed(2)}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsRestockDialogOpen(false);
              setRestockQuantity(0);
            }}>
              Cancel
            </Button>
            <Button onClick={handleRestock} disabled={restockQuantity <= 0}>
              <Plus className="h-4 w-4 mr-2" />
              Restock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 