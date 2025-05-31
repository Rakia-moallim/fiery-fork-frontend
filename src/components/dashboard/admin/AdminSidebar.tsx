import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  ShoppingCart,
  Users,
  UserCheck,
  Settings,
  HelpCircle,
  Crown,
  LogOut,
  Package,
  UtensilsCrossed,
  FileText,
  CreditCard,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const adminMenuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    path: "/dashboard/admin",
  },
  {
    title: "Customer Management",
    icon: Users,
    path: "/dashboard/admin/customers",
    badge: "Admin",
  },
  {
    title: "Staff Management",
    icon: UserCheck,
    path: "/dashboard/admin/staff",
    badge: "Admin",
  },
  {
    title: "Orders Management",
    icon: ShoppingCart,
    path: "/dashboard/admin/orders",
  },
  {
    title: "Inventory Control",
    icon: Package,
    path: "/dashboard/admin/inventory",
  },
  {
    title: "Menu Management",
    icon: UtensilsCrossed,
    path: "/dashboard/admin/menu",
  },
  {
    title: "Reports & Analytics",
    icon: FileText,
    path: "/dashboard/admin/reports",
    badge: "Admin",
  },
];

const quickAccessItems = [
  {
    title: "Customer Dashboard",
    icon: Users,
    path: "/dashboard/customer",
    description: "View as customer",
  },
  {
    title: "Staff Dashboard",
    icon: UserCheck,
    path: "/dashboard/staff",
    description: "View as staff",
  },
];

const bottomMenuItems = [
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/admin/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    path: "/dashboard/admin/help",
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActivePath = (path: string) => {
    if (path === "/dashboard/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="p-6 bg-gradient-to-br from-red-600 to-red-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-red-100 text-sm">Full System Control</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-white text-sm font-medium">Welcome, {user?.name}</p>
          <p className="text-red-100 text-xs">{user?.email}</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900 text-slate-300">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {/* Main Admin Menu Items */}
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`w-full justify-start px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActivePath(item.path)
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto text-xs bg-red-500/20 text-red-300 border-red-500/30">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Access Section */}
        <SidebarGroup>
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Access</h3>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {quickAccessItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className="w-full justify-start px-4 py-3 rounded-lg transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-slate-500">{item.description}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-slate-900 border-t border-slate-800">
        <SidebarMenu>
          {/* Settings & Help */}
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  to={item.path}
                  className={`w-full justify-start px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActivePath(item.path)
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          
          {/* Logout Button */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                onClick={logout}
                variant="ghost"
                className="w-full justify-start px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-900/50 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-3" />
                <span className="text-sm">Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
} 