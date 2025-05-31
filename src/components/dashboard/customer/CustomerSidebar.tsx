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
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
  Heart,
  CalendarDays,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const customerMenuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    path: "/dashboard/customer",
  },
  {
    title: "My Orders",
    icon: ShoppingCart,
    path: "/dashboard/customer/orders",
  },
  {
    title: "My Payments",
    icon: CreditCard,
    path: "/dashboard/customer/payments",
  },
  {
    title: "My Reservations",
    icon: CalendarDays,
    path: "/dashboard/customer/reservations",
  },
  {
    title: "Favorites",
    icon: Heart,
    path: "/dashboard/customer/favorites",
  },
  {
    title: "Profile",
    icon: User,
    path: "/dashboard/customer/profile",
  },
];

const bottomMenuItems = [
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/customer/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    path: "/dashboard/customer/help",
  },
];

export function CustomerSidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActivePath = (path: string) => {
    if (path === "/dashboard/customer") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="p-6 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">My Account</h2>
            <p className="text-blue-100 text-sm">Customer Portal</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-white text-sm font-medium">Welcome, {user?.name}</p>
          <p className="text-blue-100 text-xs">{user?.email}</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900 text-slate-300">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {customerMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`w-full justify-start px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActivePath(item.path)
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.title}</span>
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