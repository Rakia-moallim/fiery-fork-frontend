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
  BookOpen, 
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Star,
  Clock,
  DollarSign,
  ChefHat,
  Coffee,
  Utensils,
  Pizza,
  Beef,
  Salad,
  RefreshCw,
  Image,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: 'appetizers' | 'mains' | 'desserts' | 'beverages' | 'specials';
  price: number;
  cost: number;
  preparationTime: number; // in minutes
  availability: 'available' | 'unavailable' | 'limited';
  ingredients: string[];
  allergens: string[];
  image?: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  popularity: number; // 1-5 stars
  calories?: number;
  status: 'active' | 'inactive' | 'seasonal';
  createdDate: string;
  lastUpdated: string;
}

export function AdminMenuPage() {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
      category: "mains",
      price: 15.99,
      cost: 6.50,
      preparationTime: 18,
      availability: "available",
      ingredients: ["pizza dough", "tomato sauce", "mozzarella", "fresh basil", "olive oil"],
      allergens: ["gluten", "dairy"],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: false,
      popularity: 5,
      calories: 280,
      status: "active",
      createdDate: "2024-01-15",
      lastUpdated: "2024-05-15"
    },
    {
      id: 2,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with parmesan, croutons, and caesar dressing",
      category: "appetizers",
      price: 8.99,
      cost: 3.20,
      preparationTime: 8,
      availability: "available",
      ingredients: ["romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
      allergens: ["dairy", "gluten"],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: false,
      popularity: 4,
      calories: 180,
      status: "active",
      createdDate: "2024-01-20",
      lastUpdated: "2024-05-10"
    },
    {
      id: 3,
      name: "Grilled Salmon",
      description: "Atlantic salmon with herbs and lemon, served with vegetables",
      category: "mains",
      price: 22.99,
      cost: 12.50,
      preparationTime: 25,
      availability: "limited",
      ingredients: ["salmon fillet", "mixed herbs", "lemon", "seasonal vegetables"],
      allergens: ["fish"],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isSpicy: false,
      popularity: 4,
      calories: 320,
      status: "active",
      createdDate: "2024-02-01",
      lastUpdated: "2024-05-18"
    },
    {
      id: 4,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      category: "desserts",
      price: 6.99,
      cost: 2.80,
      preparationTime: 5,
      availability: "available",
      ingredients: ["ladyfingers", "mascarpone", "coffee", "cocoa powder", "eggs"],
      allergens: ["dairy", "eggs", "gluten"],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: false,
      popularity: 5,
      calories: 250,
      status: "active",
      createdDate: "2024-01-25",
      lastUpdated: "2024-05-12"
    },
    {
      id: 5,
      name: "Spicy Thai Curry",
      description: "Authentic red curry with coconut milk and fresh vegetables",
      category: "mains",
      price: 18.99,
      cost: 7.20,
      preparationTime: 20,
      availability: "unavailable",
      ingredients: ["red curry paste", "coconut milk", "vegetables", "jasmine rice"],
      allergens: [],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isSpicy: true,
      popularity: 3,
      calories: 380,
      status: "inactive",
      createdDate: "2024-03-10",
      lastUpdated: "2024-05-20"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    category: "mains",
    price: 0,
    cost: 0,
    preparationTime: 15,
    availability: "available",
    ingredients: [],
    allergens: [],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isSpicy: false,
    popularity: 3,
    status: "active"
  });

  // Filter menu items based on search and filters
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesAvailability = availabilityFilter === "all" || item.availability === availabilityFilter;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesAvailability;
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || newItem.price === 0) {
      toast({
        title: "Error",
        description: "Name, description, and price are required",
        variant: "destructive",
      });
      return;
    }

    const item: MenuItem = {
      id: menuItems.length + 1,
      name: newItem.name!,
      description: newItem.description!,
      category: (newItem.category as MenuItem['category']) || "mains",
      price: newItem.price!,
      cost: newItem.cost || 0,
      preparationTime: newItem.preparationTime || 15,
      availability: (newItem.availability as MenuItem['availability']) || "available",
      ingredients: newItem.ingredients || [],
      allergens: newItem.allergens || [],
      isVegetarian: newItem.isVegetarian || false,
      isVegan: newItem.isVegan || false,
      isGlutenFree: newItem.isGlutenFree || false,
      isSpicy: newItem.isSpicy || false,
      popularity: newItem.popularity || 3,
      calories: newItem.calories,
      status: (newItem.status as MenuItem['status']) || "active",
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setMenuItems([...menuItems, item]);
    setNewItem({
      name: "", description: "", category: "mains", price: 0, cost: 0,
      preparationTime: 15, availability: "available", ingredients: [], allergens: [],
      isVegetarian: false, isVegan: false, isGlutenFree: false, isSpicy: false,
      popularity: 3, status: "active"
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Menu item added successfully",
    });
  };

  const handleEditItem = () => {
    if (!selectedItem) return;

    const updatedItem = {
      ...selectedItem,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setMenuItems(menuItems.map(item => 
      item.id === selectedItem.id ? updatedItem : item
    ));
    setIsEditDialogOpen(false);
    setSelectedItem(null);
    
    toast({
      title: "Success",
      description: "Menu item updated successfully",
    });
  };

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast({
      title: "Success",
      description: "Menu item deleted successfully",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appetizers': return <Salad className="h-4 w-4 text-green-500" />;
      case 'mains': return <Utensils className="h-4 w-4 text-blue-500" />;
      case 'desserts': return <Coffee className="h-4 w-4 text-purple-500" />;
      case 'beverages': return <Coffee className="h-4 w-4 text-orange-500" />;
      case 'specials': return <Star className="h-4 w-4 text-yellow-500" />;
      default: return <Utensils className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'limited': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'unavailable': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    const colors = {
      available: "bg-green-100 text-green-800 border-green-300",
      limited: "bg-yellow-100 text-yellow-800 border-yellow-300",
      unavailable: "bg-red-100 text-red-800 border-red-300"
    };
    
    return (
      <Badge className={colors[availability as keyof typeof colors] || colors.available}>
        {getAvailabilityIcon(availability)}
        <span className="ml-1 capitalize">{availability}</span>
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-blue-100 text-blue-800 border-blue-300",
      inactive: "bg-gray-100 text-gray-800 border-gray-300",
      seasonal: "bg-orange-100 text-orange-800 border-orange-300"
    };
    
    return (
      <Badge variant="outline" className={colors[status as keyof typeof colors] || colors.active}>
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  const getProfitMargin = (price: number, cost: number) => {
    if (cost === 0) return 0;
    return ((price - cost) / price * 100);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Calculate statistics
  const totalItems = menuItems.length;
  const activeItems = menuItems.filter(item => item.status === 'active').length;
  const avgPrice = menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length;
  const avgProfitMargin = menuItems.reduce((sum, item) => sum + getProfitMargin(item.price, item.cost), 0) / menuItems.length;

  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            Menu Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage menu items, pricing, and availability
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            Admin Only
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Menu
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <BookOpen className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Menu items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Items</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeItems}</div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgPrice.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per item</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Margin</CardTitle>
            <ChefHat className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProfitMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Profit margin</p>
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
                placeholder="Search by name, description, or ingredients..."
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
                <SelectItem value="appetizers">Appetizers</SelectItem>
                <SelectItem value="mains">Mains</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="specials">Specials</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-28">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="seasonal">Seasonal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Available" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="limited">Limited</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
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

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenuItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <Image className="h-12 w-12 text-gray-400" />
              )}
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(item.category)}
                  <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                    {item.category}
                  </span>
                </div>
                <div className="flex gap-1">
                  {getStatusBadge(item.status)}
                </div>
              </div>
              
              <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
              <CardDescription className="line-clamp-2">{item.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Price and Timing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-bold">${item.price}</span>
                    <span className="text-xs text-gray-500">
                      (${item.cost} cost)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="h-3 w-3" />
                    {item.preparationTime}min
                  </div>
                </div>

                {/* Availability and Rating */}
                <div className="flex items-center justify-between">
                  {getAvailabilityBadge(item.availability)}
                  {renderStars(item.popularity)}
                </div>

                {/* Dietary Info */}
                <div className="flex flex-wrap gap-1">
                  {item.isVegetarian && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                      Vegetarian
                    </Badge>
                  )}
                  {item.isVegan && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                      Vegan
                    </Badge>
                  )}
                  {item.isGlutenFree && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                      Gluten-Free
                    </Badge>
                  )}
                  {item.isSpicy && (
                    <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                      Spicy 🌶️
                    </Badge>
                  )}
                </div>

                {/* Profit Margin */}
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Profit Margin:</span> {getProfitMargin(item.price, item.cost).toFixed(1)}%
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-gray-500">
                    Updated: {item.lastUpdated}
                  </div>
                  
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogDescription>
              Create a new menu item with all details.
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
              <Label htmlFor="description" className="text-right">Description *</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
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
                  <SelectItem value="appetizers">Appetizers</SelectItem>
                  <SelectItem value="mains">Mains</SelectItem>
                  <SelectItem value="desserts">Desserts</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="specials">Specials</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cost" className="text-right">Cost</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={newItem.cost}
                onChange={(e) => setNewItem({...newItem, cost: parseFloat(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prep-time" className="text-right">Prep Time (min)</Label>
              <Input
                id="prep-time"
                type="number"
                value={newItem.preparationTime}
                onChange={(e) => setNewItem({...newItem, preparationTime: parseInt(e.target.value) || 15})}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="availability" className="text-right">Availability</Label>
              <Select 
                value={newItem.availability} 
                onValueChange={(value) => setNewItem({...newItem, availability: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="limited">Limited</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="calories" className="text-right">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={newItem.calories}
                onChange={(e) => setNewItem({...newItem, calories: parseInt(e.target.value) || undefined})}
                className="col-span-3"
              />
            </div>

            {/* Dietary Options */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Dietary</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newItem.isVegetarian}
                    onChange={(e) => setNewItem({...newItem, isVegetarian: e.target.checked})}
                  />
                  <span className="text-sm">Vegetarian</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newItem.isVegan}
                    onChange={(e) => setNewItem({...newItem, isVegan: e.target.checked})}
                  />
                  <span className="text-sm">Vegan</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newItem.isGlutenFree}
                    onChange={(e) => setNewItem({...newItem, isGlutenFree: e.target.checked})}
                  />
                  <span className="text-sm">Gluten-Free</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newItem.isSpicy}
                    onChange={(e) => setNewItem({...newItem, isSpicy: e.target.checked})}
                  />
                  <span className="text-sm">Spicy</span>
                </label>
              </div>
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Update menu item details.
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
                <Label htmlFor="edit-description" className="text-right">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedItem.description}
                  onChange={(e) => setSelectedItem({...selectedItem, description: e.target.value})}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={selectedItem.price}
                  onChange={(e) => setSelectedItem({...selectedItem, price: parseFloat(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-cost" className="text-right">Cost</Label>
                <Input
                  id="edit-cost"
                  type="number"
                  step="0.01"
                  value={selectedItem.cost}
                  onChange={(e) => setSelectedItem({...selectedItem, cost: parseFloat(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-availability" className="text-right">Availability</Label>
                <Select 
                  value={selectedItem.availability} 
                  onValueChange={(value) => setSelectedItem({...selectedItem, availability: value as MenuItem['availability']})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="limited">Limited</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select 
                  value={selectedItem.status} 
                  onValueChange={(value) => setSelectedItem({...selectedItem, status: value as MenuItem['status']})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
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
    </div>
  );
} 