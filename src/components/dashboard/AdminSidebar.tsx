
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  ShoppingCart,
  CalendarDays,
  Users,
  FileText,
  Settings,
  HelpCircle,
  Crown,
  Zap,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "#dashboard",
    isActive: true,
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    url: "#orders",
  },
  {
    title: "Reservations",
    icon: CalendarDays,
    url: "#reservations",
  },
  {
    title: "Staff",
    icon: Users,
    url: "#staff",
  },
  {
    title: "Reports",
    icon: FileText,
    url: "#reports",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    url: "#help",
  },
];

export function AdminSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="p-6 bg-gradient-to-br from-restaurant-red to-red-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <span className="text-2xl font-bold text-white">RM</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Resto</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900 text-slate-300">
        <div className="p-4">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => setActiveItem(item.title)}
                  className={`w-full justify-start px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeItem === item.title
                      ? "bg-gradient-to-r from-restaurant-orange to-restaurant-red text-white shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-restaurant-red/20 to-restaurant-orange/20 rounded-lg border border-restaurant-orange/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-restaurant-orange" />
              <span className="text-sm font-semibold text-white">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Get more features and premium support
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-restaurant-orange to-restaurant-red hover:from-restaurant-orange/90 hover:to-restaurant-red/90 text-white text-sm"
              size="sm"
            >
              Upgrade
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
