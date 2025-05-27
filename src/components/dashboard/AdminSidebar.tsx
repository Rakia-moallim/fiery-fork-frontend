
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
];

const dropdownMenus = [
  {
    title: "Roles",
    icon: UserCheck,
    items: [
      { title: "Roles Table", url: "#roles", icon: Table },
    ],
  },
  {
    title: "Staff Management",
    icon: Users,
    items: [
      { title: "Staff Table", url: "#staff", icon: Users },
      { title: "Add Staff", url: "#add-staff", icon: UserPlus },
      { title: "Reservations Team", url: "#reservations-team", icon: Calendar },
      { title: "Add Reservations Team", url: "#add-reservations-team", icon: UserPlus },
      { title: "Delivery Team", url: "#delivery-team", icon: Truck },
      { title: "Add Delivery Teams", url: "#add-delivery-teams", icon: UserPlus },
    ],
  },
  {
    title: "Table Management",
    icon: Table,
    items: [
      { title: "Tables Table", url: "#tables", icon: Table },
      { title: "Add Tables", url: "#add-tables", icon: UserPlus },
      { title: "View Table", url: "#view-table", icon: Eye },
    ],
  },
  {
    title: "Menu Management",
    icon: UtensilsCrossed,
    items: [
      { title: "Menu View List", url: "#menu-view", icon: Eye },
      { title: "Menu Management", url: "#menu-management", icon: UtensilsCrossed },
      { title: "Kids Menu", url: "#kids-menu", icon: Baby },
      { title: "Combo Menu", url: "#combo-menu", icon: Package },
    ],
  },
  {
    title: "Transaction",
    icon: CreditCard,
    items: [
      { title: "Payments", url: "#payments", icon: CreditCard },
      { title: "Bank", url: "#bank", icon: Building },
    ],
  },
];

const bottomMenuItems = [
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
                              onClick={() => setActiveItem(subItem.title)}
                              className={`w-full justify-start px-4 py-2 ml-4 rounded-lg transition-all duration-200 ${
                                activeItem === subItem.title
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
