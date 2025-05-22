
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  PieChart,
  Users,
  UtensilsCrossed,
  Plus,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react";
import { menuItems, comboItems, categories } from "@/data/menuData";
import { toast } from "sonner";

// Mock staff data
const mockStaff = [
  {
    id: "s1",
    name: "Sarah Johnson",
    email: "sarah.j@tastehub.com",
    role: "Chef",
    status: "active",
  },
  {
    id: "s2",
    name: "Michael Chen",
    email: "michael.c@tastehub.com",
    role: "Waiter",
    status: "active",
  },
  {
    id: "s3",
    name: "Emily Rodriguez",
    email: "emily.r@tastehub.com",
    role: "Manager",
    status: "active",
  },
  {
    id: "s4",
    name: "David Kim",
    email: "david.k@tastehub.com",
    role: "Delivery Driver",
    status: "active",
  },
];

// Mock sales data for charts
const mockSalesData = [
  { name: "Monday", sales: 2400 },
  { name: "Tuesday", sales: 1398 },
  { name: "Wednesday", sales: 9800 },
  { name: "Thursday", sales: 3908 },
  { name: "Friday", sales: 4800 },
  { name: "Saturday", sales: 7800 },
  { name: "Sunday", sales: 4300 },
];

const mockCategoryData = [
  { name: "Burgers", value: 35 },
  { name: "Pizza", value: 25 },
  { name: "Salads", value: 10 },
  { name: "Desserts", value: 15 },
  { name: "Drinks", value: 10 },
  { name: "Other", value: 5 },
];

export const AdminDashboard = () => {
  const [menu, setMenu] = useState([...menuItems]);
  const [combos, setCombos] = useState([...comboItems]);
  const [staff, setStaff] = useState([...mockStaff]);
  const [editItem, setEditItem] = useState<any>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isAddComboOpen, setIsAddComboOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  // Delete menu item
  const handleDeleteMenuItem = (id: string) => {
    setMenu(menu.filter((item) => item.id !== id));
    toast.success("Menu item deleted successfully");
  };

  // Delete combo
  const handleDeleteCombo = (id: string) => {
    setCombos(combos.filter((combo) => combo.id !== id));
    toast.success("Combo deleted successfully");
  };

  // Delete staff
  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter((member) => member.id !== id));
    toast.success("Staff member removed successfully");
  };

  // Edit menu item
  const handleEditMenuItem = (item: any) => {
    setEditItem(item);
    setIsAddMenuOpen(true);
  };

  // Edit combo
  const handleEditCombo = (combo: any) => {
    setEditItem(combo);
    setIsAddComboOpen(true);
  };

  // Add new menu item
  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newItem = {
      id: editItem ? editItem.id : `m${menu.length + 1}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      image: formData.get("image") as string || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      category: formData.get("category") as string,
      isPopular: formData.get("isPopular") === "true",
      tags: (formData.get("tags") as string).split(",").map(tag => tag.trim()),
    };

    if (editItem) {
      setMenu(menu.map((item) => (item.id === editItem.id ? newItem : item)));
      toast.success("Menu item updated successfully");
    } else {
      setMenu([...menu, newItem]);
      toast.success("Menu item added successfully");
    }

    form.reset();
    setEditItem(null);
    setIsAddMenuOpen(false);
  };

  // Add new combo
  const handleAddCombo = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newCombo = {
      id: editItem ? editItem.id : `c${combos.length + 1}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      image: formData.get("image") as string || "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
      items: (formData.get("items") as string).split("\n").filter(Boolean),
      isPopular: formData.get("isPopular") === "true",
    };

    if (editItem) {
      setCombos(combos.map((combo) => (combo.id === editItem.id ? newCombo : combo)));
      toast.success("Combo updated successfully");
    } else {
      setCombos([...combos, newCombo]);
      toast.success("Combo added successfully");
    }

    form.reset();
    setEditItem(null);
    setIsAddComboOpen(false);
  };

  // Add new staff
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newStaff = {
      id: `s${staff.length + 1}`,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      status: "active",
    };

    setStaff([...staff, newStaff]);
    toast.success("Staff member added successfully");

    form.reset();
    setIsAddStaffOpen(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Full system control and management.
        </p>
      </div>

      <Tabs defaultValue="reports">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="reports">
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="menu">
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            Menu Management
          </TabsTrigger>
          <TabsTrigger value="combos">
            <PieChart className="mr-2 h-4 w-4" />
            Combo Management
          </TabsTrigger>
          <TabsTrigger value="staff">
            <Users className="mr-2 h-4 w-4" />
            Staff Management
          </TabsTrigger>
        </TabsList>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Weekly sales performance
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                  [Sales Chart Visualization - Sales by Day]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>
                  Sales distribution by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                  [Category Chart Visualization - Sales by Category]
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>
                Overview of important business metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Sales (Today)</CardDescription>
                    <CardTitle className="text-3xl">$1,245.89</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-green-600">
                      +12.5% from yesterday
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Orders (Today)</CardDescription>
                    <CardTitle className="text-3xl">48</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-green-600">
                      +8.3% from yesterday
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Avg. Order Value</CardDescription>
                    <CardTitle className="text-3xl">$25.95</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-green-600">
                      +2.1% from last week
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Reservations (Today)</CardDescription>
                    <CardTitle className="text-3xl">12</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-red-600">
                      -5.0% from yesterday
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Menu Management Tab */}
        <TabsContent value="menu" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Menu Items</h3>
            <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setEditItem(null)}
                  className="bg-restaurant-orange hover:bg-restaurant-orange/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>
                    {editItem ? "Edit Menu Item" : "Add New Menu Item"}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details for the menu item.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddMenuItem}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editItem?.name || ""}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editItem?.description || ""}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={editItem?.price || ""}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Image URL
                      </Label>
                      <Input
                        id="image"
                        name="image"
                        defaultValue={editItem?.image || ""}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select
                        name="category"
                        defaultValue={editItem?.category || "burgers"}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .filter((c) => c.id !== "all")
                            .map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tags" className="text-right">
                        Tags
                      </Label>
                      <Input
                        id="tags"
                        name="tags"
                        placeholder="tag1, tag2, tag3"
                        defaultValue={editItem?.tags?.join(", ") || ""}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Popular</Label>
                      <div className="flex items-center col-span-3">
                        <input
                          type="radio"
                          id="popular-yes"
                          name="isPopular"
                          value="true"
                          defaultChecked={editItem?.isPopular || false}
                          className="mr-2"
                        />
                        <Label htmlFor="popular-yes" className="mr-4">
                          Yes
                        </Label>
                        <input
                          type="radio"
                          id="popular-no"
                          name="isPopular"
                          value="false"
                          defaultChecked={
                            editItem ? !editItem.isPopular : true
                          }
                          className="mr-2"
                        />
                        <Label htmlFor="popular-no">No</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddMenuOpen(false);
                        setEditItem(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editItem ? "Update Item" : "Add Item"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Popular</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menu.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {item.description}
                    </TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {
                        categories.find((c) => c.id === item.category)?.name ||
                        item.category
                      }
                    </TableCell>
                    <TableCell>{item.isPopular ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditMenuItem(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteMenuItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Combo Management Tab */}
        <TabsContent value="combos" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Combo Meals</h3>
            <Dialog open={isAddComboOpen} onOpenChange={setIsAddComboOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setEditItem(null)}
                  className="bg-restaurant-orange hover:bg-restaurant-orange/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Combo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>
                    {editItem ? "Edit Combo" : "Add New Combo"}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details for the combo meal.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddCombo}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="combo-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="combo-name"
                        name="name"
                        defaultValue={editItem?.name || ""}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="combo-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="combo-description"
                        name="description"
                        defaultValue={editItem?.description || ""}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="combo-price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="combo-price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={editItem?.price || ""}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="combo-image" className="text-right">
                        Image URL
                      </Label>
                      <Input
                        id="combo-image"
                        name="image"
                        defaultValue={editItem?.image || ""}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="combo-items" className="text-right">
                        Items
                      </Label>
                      <Textarea
                        id="combo-items"
                        name="items"
                        placeholder="One item per line"
                        defaultValue={editItem?.items?.join("\n") || ""}
                        className="col-span-3 min-h-[100px]"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Popular</Label>
                      <div className="flex items-center col-span-3">
                        <input
                          type="radio"
                          id="combo-popular-yes"
                          name="isPopular"
                          value="true"
                          defaultChecked={editItem?.isPopular || false}
                          className="mr-2"
                        />
                        <Label htmlFor="combo-popular-yes" className="mr-4">
                          Yes
                        </Label>
                        <input
                          type="radio"
                          id="combo-popular-no"
                          name="isPopular"
                          value="false"
                          defaultChecked={
                            editItem ? !editItem.isPopular : true
                          }
                          className="mr-2"
                        />
                        <Label htmlFor="combo-popular-no">No</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddComboOpen(false);
                        setEditItem(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editItem ? "Update Combo" : "Add Combo"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Popular</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {combos.map((combo) => (
                  <TableRow key={combo.id}>
                    <TableCell className="font-medium">{combo.name}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {combo.description}
                    </TableCell>
                    <TableCell>${combo.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {combo.items.length} items
                      </span>
                    </TableCell>
                    <TableCell>{combo.isPopular ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditCombo(combo)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteCombo(combo.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Staff Management Tab */}
        <TabsContent value="staff" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Staff Members</h3>
            <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-restaurant-orange hover:bg-restaurant-orange/90"
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Add Staff
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new staff member.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddStaff}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-name" className="text-right">
                        Full Name
                      </Label>
                      <Input
                        id="staff-name"
                        name="name"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="staff-email"
                        name="email"
                        type="email"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="staff-role" className="text-right">
                        Role
                      </Label>
                      <Select name="role" defaultValue="Waiter">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chef">Chef</SelectItem>
                          <SelectItem value="Waiter">Waiter</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Delivery Driver">
                            Delivery Driver
                          </SelectItem>
                          <SelectItem value="Kitchen Staff">
                            Kitchen Staff
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddStaffOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Staff Member</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast.success(
                              `Reset password link sent to ${member.email}`
                            );
                          }}
                        >
                          Reset Password
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteStaff(member.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
