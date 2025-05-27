
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BarChart3,
  ShoppingCart,
  CalendarDays,
  Users,
  FileText,
  Settings,
  HelpCircle,
  Crown,
  ChevronRight,
  UserCheck,
  Table,
  UtensilsCrossed,
  CreditCard,
  Building,
  UserPlus,
  Calendar,
  Truck,
  Eye,
  Baby,
  Package,
} from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    value: "dashboard" as const,
    isActive: true,
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    value: "orders" as const,
  },
  {
    title: "Reservations",
    icon: CalendarDays,
    value: "reservations" as const,
  },
];

const dropdownMenus = [
  {
    title: "Roles",
    icon: UserCheck,
    items: [
      { title: "Roles Table", value: "roles" as const, icon: Table },
    ],
  },
  {
    title: "Staff Management",
    icon: Users,
    items: [
      { title: "Staff Table", value: "staff" as const, icon: Users },
      { title: "Add Staff", value: "add-staff" as const, icon: UserPlus },
      { title: "Reservations Team", value: "reservations-team" as const, icon: Calendar },
      { title: "Add Reservations Team", value: "add-reservations-team" as const, icon: UserPlus },
      { title: "Delivery Team", value: "delivery-team" as const, icon: Truck },
      { title: "Add Delivery Teams", value: "add-delivery-teams" as const, icon: UserPlus },
    ],
  },
  {
    title: "Table Management",
    icon: Table,
    items: [
      { title: "Tables Table", value: "tables" as const, icon: Table },
      { title: "Add Tables", value: "add-tables" as const, icon: UserPlus },
      { title: "View Table", value: "view-table" as const, icon: Eye },
    ],
  },
  {
    title: "Menu Management",
    icon: UtensilsCrossed,
    items: [
      { title: "Menu View List", value: "menu-view" as const, icon: Eye },
      { title: "Menu Management", value: "menu-management" as const, icon: UtensilsCrossed },
      { title: "Kids Menu", value: "kids-menu" as const, icon: Baby },
      { title: "Combo Menu", value: "combo-menu" as const, icon: Package },
    ],
  },
  {
    title: "Transaction",
    icon: CreditCard,
    items: [
      { title: "Payments", value: "payments" as const, icon: CreditCard },
      { title: "Bank", value: "bank" as const, icon: Building },
    ],
  },
];

const bottomMenuItems = [
  {
    title: "Settings",
    icon: Settings,
    value: "settings" as const,
  },
  {
    title: "Help",
    icon: HelpCircle,
    value: "help" as const,
  },
];

export function AdminSidebar() {
  const { activeView, setActiveView } = useDashboard();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (title: string) => {
    setOpenDropdowns(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="p-6 bg-gradient-to-br from-restaurant-red to-red-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <span className="text-2xl font-bold text-white">TH</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Taste Hub</h2>
            <p className="text-red-100 text-sm">Restaurant Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900 text-slate-300">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Regular Menu Items */}
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.value)}
                    className={`w-full justify-start px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeView === item.value
                        ? "bg-gradient-to-r from-restaurant-orange to-restaurant-red text-white shadow-lg"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Dropdown Menu Items */}
              {dropdownMenus.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        onClick={() => toggleDropdown(menu.title)}
                        className="w-full justify-between px-4 py-3 rounded-lg transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <div className="flex items-center">
                          <menu.icon className="h-5 w-5 mr-3" />
                          <span className="font-medium">{menu.title}</span>
                        </div>
                        <ChevronRight 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openDropdowns.includes(menu.title) ? 'rotate-90' : ''
                          }`} 
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {menu.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              onClick={() => setActiveView(subItem.value)}
                              className={`w-full justify-start px-4 py-2 ml-4 rounded-lg transition-all duration-200 ${
                                activeView === subItem.value
                                  ? "bg-gradient-to-r from-restaurant-orange/20 to-restaurant-red/20 text-restaurant-orange border-l-2 border-restaurant-orange"
                                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                              }`}
                            >
                              <subItem.icon className="h-4 w-4 mr-3" />
                              <span className="text-sm font-medium">{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              ))}

              {/* Bottom Menu Items */}
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.value)}
                    className={`w-full justify-start px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeView === item.value
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="text-center">
          <p className="text-xs text-slate-400">
            © 2024 Taste Hub. All rights reserved.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
