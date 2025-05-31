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
import {
  BarChart3,
  ShoppingCart,
  Package,
  UtensilsCrossed,
  CalendarDays,
  Settings,
  HelpCircle,
  LogOut,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const staffMenuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    path: "/dashboard/staff",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    path: "/dashboard/staff/orders",
  },
  {
    title: "Inventory",
    icon: Package,
    path: "/dashboard/staff/inventory",
  },
  {
    title: "Menu",
    icon: UtensilsCrossed,
    path: "/dashboard/staff/menu",
  },
  {
    title: "Reservations",
    icon: CalendarDays,
    path: "/dashboard/staff/reservations",
  },
];

const bottomMenuItems = [
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/staff/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    path: "/dashboard/staff/help",
  },
];

export function StaffSidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActivePath = (path: string) => {
    if (path === "/dashboard/staff") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="p-6 bg-gradient-to-br from-green-600 to-green-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <UserCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Staff Panel</h2>
            <p className="text-green-100 text-sm">Operations Control</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-white text-sm font-medium">Welcome, {user?.name}</p>
          <p className="text-green-100 text-xs">{user?.email}</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900 text-slate-300">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {staffMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`w-full justify-start px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActivePath(item.path)
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
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