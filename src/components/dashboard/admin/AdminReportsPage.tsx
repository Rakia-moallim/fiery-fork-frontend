import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Clock,
  Calendar,
  Download,
  Filter,
  Eye,
  Star,
  Package,
  Target,
  Activity,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";

interface ChartDataPoint {
  name: string;
  value: number;
  change?: number;
}

interface ReportData {
  period: string;
  revenue: number;
  orders: number;
  customers: number;
  avgOrderValue: number;
  popularItems: { name: string; count: number; revenue: number }[];
  hourlyData: ChartDataPoint[];
  weeklyData: ChartDataPoint[];
  categoryData: ChartDataPoint[];
}

export function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("this_month");
  const [selectedReport, setSelectedReport] = useState<string>("overview");

  // Mock data - in real app this would come from API
  const reportData: ReportData = {
    period: "May 2024",
    revenue: 45780.50,
    orders: 892,
    customers: 234,
    avgOrderValue: 51.30,
    popularItems: [
      { name: "Margherita Pizza", count: 156, revenue: 2494.44 },
      { name: "Caesar Salad", count: 89, revenue: 800.11 },
      { name: "Grilled Salmon", count: 67, revenue: 1540.33 },
      { name: "Tiramisu", count: 78, revenue: 545.22 },
      { name: "Thai Curry", count: 45, revenue: 854.55 }
    ],
    hourlyData: [
      { name: "6AM", value: 12 },
      { name: "8AM", value: 28 },
      { name: "10AM", value: 45 },
      { name: "12PM", value: 89 },
      { name: "2PM", value: 67 },
      { name: "4PM", value: 34 },
      { name: "6PM", value: 156 },
      { name: "8PM", value: 134 },
      { name: "10PM", value: 78 },
      { name: "12AM", value: 23 }
    ],
    weeklyData: [
      { name: "Mon", value: 89, change: 5.2 },
      { name: "Tue", value: 67, change: -2.1 },
      { name: "Wed", value: 134, change: 12.5 },
      { name: "Thu", value: 156, change: 8.7 },
      { name: "Fri", value: 203, change: 15.3 },
      { name: "Sat", value: 189, change: -6.8 },
      { name: "Sun", value: 145, change: 3.2 }
    ],
    categoryData: [
      { name: "Mains", value: 45.2 },
      { name: "Appetizers", value: 22.8 },
      { name: "Desserts", value: 18.5 },
      { name: "Beverages", value: 13.5 }
    ]
  };

  const getMetricCard = (title: string, value: string | number, change: number, icon: React.ReactNode, format: 'currency' | 'number' | 'percentage' = 'number') => {
    const formattedValue = format === 'currency' ? `$${value}` : 
                          format === 'percentage' ? `${value}%` : value;
    
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formattedValue}</div>
          <p className={`text-xs flex items-center gap-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(change)}% from last period
          </p>
        </CardContent>
      </Card>
    );
  };

  const renderBarChart = (data: ChartDataPoint[], title: string, color: string = "bg-blue-500") => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-sm text-gray-600 dark:text-gray-400">{item.name}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`${color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm font-medium text-right">{item.value}</div>
                    {item.change !== undefined && (
                      <div className={`flex items-center gap-1 text-xs ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(item.change)}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPieChart = (data: ChartDataPoint[], title: string) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-red-500"];
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple pie representation */}
            <div className="space-y-3">
              {data.map((item, index) => {
                const percentage = (item.value / total * 100).toFixed(1);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="text-sm font-medium">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-emerald-600" />
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Business insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            Admin Only
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this_week">This Week</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                  <SelectItem value="last_month">Last Month</SelectItem>
                  <SelectItem value="this_quarter">This Quarter</SelectItem>
                  <SelectItem value="this_year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="sales">Sales Report</SelectItem>
                  <SelectItem value="customers">Customer Analytics</SelectItem>
                  <SelectItem value="inventory">Inventory Report</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getMetricCard(
          "Total Revenue",
          reportData.revenue.toLocaleString(),
          12.5,
          <DollarSign className="h-4 w-4 text-green-600" />,
          'currency'
        )}
        {getMetricCard(
          "Total Orders",
          reportData.orders.toLocaleString(),
          8.2,
          <ShoppingCart className="h-4 w-4 text-blue-600" />
        )}
        {getMetricCard(
          "New Customers",
          reportData.customers.toLocaleString(),
          -3.1,
          <Users className="h-4 w-4 text-purple-600" />
        )}
        {getMetricCard(
          "Avg Order Value",
          reportData.avgOrderValue.toFixed(2),
          5.7,
          <Target className="h-4 w-4 text-orange-600" />,
          'currency'
        )}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderBarChart(reportData.hourlyData, "Orders by Hour", "bg-blue-500")}
        {renderBarChart(reportData.weeklyData, "Weekly Performance", "bg-green-500")}
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderPieChart(reportData.categoryData, "Sales by Category")}
        
        {/* Popular Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Top Selling Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.popularItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.count} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">${item.revenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Returning Customers</span>
              <span className="font-medium">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">4.7</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Orders per Customer</span>
              <span className="font-medium">3.8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Customer Lifetime Value</span>
              <span className="font-medium">$194.50</span>
            </div>
          </CardContent>
        </Card>

        {/* Operational Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Preparation Time</span>
              <span className="font-medium">18 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Order Accuracy</span>
              <span className="font-medium text-green-600">97.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Delivery</span>
              <span className="font-medium text-green-600">94.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Staff Efficiency</span>
              <span className="font-medium">87%</span>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Gross Revenue</span>
              <span className="font-medium">$45,780</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Food Costs</span>
              <span className="font-medium text-red-600">$18,312</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Labor Costs</span>
              <span className="font-medium text-red-600">$13,734</span>
            </div>
            <div className="flex items-center justify-between border-t pt-2">
              <span className="text-sm font-medium">Net Profit</span>
              <span className="font-bold text-green-600">$13,734</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Profit Margin</span>
              <span className="font-medium text-green-600">30.0%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Alerts & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800 dark:text-green-200">High Performance</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Weekend sales increased by 15.3%. Consider extending weekend hours or adding more staff.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800 dark:text-yellow-200">Attention Needed</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Average preparation time increased to 18 minutes. Review kitchen workflow for efficiency.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800 dark:text-blue-200">Inventory Alert</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Mozzarella cheese is running low. Restock recommended before weekend rush.
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800 dark:text-purple-200">Opportunity</span>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Dessert sales are underperforming. Consider promotional campaigns or menu updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 