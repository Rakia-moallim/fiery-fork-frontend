import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserCheck, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  DollarSign,
  Crown,
  Calendar,
  AlertTriangle,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

export function AdminDashboardContent() {
  // Mock data - replace with real API calls
  const stats = {
    totalCustomers: 1234,
    totalStaff: 45,
    totalOrders: 2856,
    totalRevenue: 125430,
    pendingOrders: 23,
    lowStockItems: 8,
    monthlyGrowth: 12.5,
    todayOrders: 67
  };

  const recentActivities = [
    { id: 1, action: "New customer registered", user: "John Doe", time: "2 minutes ago", type: "customer" },
    { id: 2, action: "Order completed", user: "Order #2856", time: "5 minutes ago", type: "order" },
    { id: 3, action: "Staff member added", user: "Sarah Wilson", time: "1 hour ago", type: "staff" },
    { id: 4, action: "Low stock alert", user: "Chicken Wings", time: "2 hours ago", type: "alert" },
  ];

  const quickActions = [
    {
      title: "Manage Customers",
      description: "View and manage customer accounts",
      icon: Users,
      path: "/dashboard/admin/customers",
      color: "bg-blue-500",
    },
    {
      title: "Manage Staff",
      description: "Add and manage staff members",
      icon: UserCheck,
      path: "/dashboard/admin/staff",
      color: "bg-green-500",
    },
    {
      title: "View Orders",
      description: "Monitor and manage orders",
      icon: ShoppingCart,
      path: "/dashboard/admin/orders",
      color: "bg-orange-500",
    },
    {
      title: "Inventory Control",
      description: "Manage stock and inventory",
      icon: Package,
      path: "/dashboard/admin/inventory",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Crown className="h-8 w-8 text-red-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Complete system overview and management controls
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Full Access
          </Badge>
          <Button asChild>
            <Link to="/dashboard/admin/reports">
              <Eye className="h-4 w-4 mr-2" />
              View Reports
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              +2 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.todayOrders} orders today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.path}>
                  <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className={`p-1 rounded-full ${
                    activity.type === 'customer' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'order' ? 'bg-green-100 text-green-600' :
                    activity.type === 'staff' ? 'bg-purple-100 text-purple-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {activity.type === 'customer' && <Users className="h-3 w-3" />}
                    {activity.type === 'order' && <ShoppingCart className="h-3 w-3" />}
                    {activity.type === 'staff' && <UserCheck className="h-3 w-3" />}
                    {activity.type === 'alert' && <AlertTriangle className="h-3 w-3" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="text-orange-800 dark:text-orange-200 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {stats.pendingOrders}
            </div>
            <p className="text-orange-700 dark:text-orange-300 text-sm">
              Orders awaiting processing
            </p>
            <Button variant="outline" size="sm" className="mt-3" asChild>
              <Link to="/dashboard/admin/orders">View Orders</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-red-800 dark:text-red-200 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">
              {stats.lowStockItems}
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm">
              Items need restocking
            </p>
            <Button variant="outline" size="sm" className="mt-3" asChild>
              <Link to="/dashboard/admin/inventory">Manage Inventory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 