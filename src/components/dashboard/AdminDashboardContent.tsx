
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Users,
  CalendarDays,
  Search,
  Bell,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for KPIs
const kpiData = {
  totalOrders: { value: "1,462", change: "+12%", trend: "up" },
  totalRevenue: { value: "$48,294", change: "+8%", trend: "up" },
  newCustomers: { value: "275", change: "-3%", trend: "down" },
  reservations: { value: "156", change: "+24%", trend: "up" },
};

// Mock chart data
const monthlyData = [
  { month: "Jan", revenue: 3800, orders: 2400 },
  { month: "Feb", revenue: 2800, orders: 1600 },
  { month: "Mar", revenue: 1800, orders: 10000 },
  { month: "Apr", revenue: 2600, orders: 3800 },
  { month: "May", revenue: 4800, orders: 1800 },
  { month: "Jun", revenue: 2200, orders: 3600 },
  { month: "Jul", revenue: 3200, orders: 4000 },
];

const revenueSourcesData = [
  { name: "Dine-In", percentage: 42, color: "from-restaurant-red to-red-600" },
  { name: "Takeaway", percentage: 28, color: "from-restaurant-orange to-orange-600" },
  { name: "Delivery", percentage: 30, color: "from-orange-400 to-orange-500" },
];

export function AdminDashboardContent() {
  const { user } = useAuth();

  return (
    <SidebarInset className="flex-1">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <SidebarTrigger className="text-slate-600 dark:text-slate-400" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back, {user?.name}!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-restaurant-red rounded-full text-xs"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {user?.name}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-6 p-6 bg-slate-50 dark:bg-slate-900">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
                    Total Orders
                  </CardDescription>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                    {kpiData.totalOrders.value}
                  </CardTitle>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-restaurant-orange" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">
                  {kpiData.totalOrders.change}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
                    Total Revenue
                  </CardDescription>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                    {kpiData.totalRevenue.value}
                  </CardTitle>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <DollarSign className="h-5 w-5 text-restaurant-red" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">
                  {kpiData.totalRevenue.change}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
                    New Customers
                  </CardDescription>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                    {kpiData.newCustomers.value}
                  </CardTitle>
                </div>
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <Users className="h-5 w-5 text-pink-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-500">
                  {kpiData.newCustomers.change}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-restaurant-red to-red-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-red-100 font-medium">
                    Reservations
                  </CardDescription>
                  <CardTitle className="text-2xl font-bold text-white">
                    {kpiData.reservations.value}
                  </CardTitle>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <CalendarDays className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-200" />
                <span className="text-sm font-medium text-green-200">
                  {kpiData.reservations.change}
                </span>
                <span className="text-sm text-red-100">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue & Orders Chart */}
          <Card className="lg:col-span-2 border-0 shadow-sm bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                Revenue & Orders
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Monthly performance overview
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full flex items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div className="text-center space-y-3">
                  <BarChart3 className="h-16 w-16 text-restaurant-orange mx-auto" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-restaurant-red rounded"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-restaurant-orange rounded"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">orders</span>
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      Chart visualization coming soon
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Sources Chart */}
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                Revenue Sources
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Distribution by service type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-40 flex items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg mb-4">
                <PieChart className="h-16 w-16 text-restaurant-red" />
              </div>
              <div className="space-y-3">
                {revenueSourcesData.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded bg-gradient-to-r ${source.color}`}></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {source.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {source.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Overview */}
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Staff Overview
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Current team status and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="text-center space-y-2">
                <Users className="h-12 w-12 text-restaurant-orange mx-auto" />
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Staff management panel coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  );
}
