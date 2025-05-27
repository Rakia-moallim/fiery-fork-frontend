
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Calendar, ChefHat, Users } from "lucide-react";
import { useStaffDashboard } from "@/hooks/useStaffDashboard";
import { StaffKPICards } from "./staff/StaffKPICards";
import { OrdersTable } from "./staff/OrdersTable";
import { ReservationsTable } from "./staff/ReservationsTable";
import { TablesGrid } from "./staff/TablesGrid";
import { TeamTable } from "./staff/TeamTable";

export const StaffDashboard = () => {
  const {
    orders,
    reservations,
    tables,
    staff,
    handleOrderStatusChange,
    handleReservationStatusChange,
    handleTableStatusChange,
  } = useStaffDashboard();

  // Calculate KPI values
  const activeOrders = orders.filter(o => o.status !== 'delivered').length;
  const pendingReservations = reservations.filter(r => r.status === 'pending').length;
  const availableTables = tables.filter(t => t.status === 'available').length;
  const activeStaff = staff.filter(s => s.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-red-950 dark:to-orange-950">
      <div className="space-y-8 p-6">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-restaurant-red via-red-600 to-restaurant-orange p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Staff Dashboard</h1>
                <p className="text-red-100 text-lg">
                  Manage daily operations and customer service
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-300/20 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* KPI Cards */}
        <StaffKPICards 
          activeOrders={activeOrders}
          pendingReservations={pendingReservations}
          availableTables={availableTables}
          activeStaff={activeStaff}
        />

        {/* Tabs Navigation */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full h-14 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-red-100 dark:border-red-900">
            <TabsTrigger 
              value="orders" 
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-restaurant-orange data-[state=active]:to-restaurant-red data-[state=active]:text-white transition-all duration-300"
            >
              <ClipboardList className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger 
              value="reservations"
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-restaurant-orange data-[state=active]:to-restaurant-red data-[state=active]:text-white transition-all duration-300"
            >
              <Calendar className="h-4 w-4" />
              Reservations
            </TabsTrigger>
            <TabsTrigger 
              value="tables"
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-restaurant-orange data-[state=active]:to-restaurant-red data-[state=active]:text-white transition-all duration-300"
            >
              <ChefHat className="h-4 w-4" />
              Tables
            </TabsTrigger>
            <TabsTrigger 
              value="team"
              className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-restaurant-orange data-[state=active]:to-restaurant-red data-[state=active]:text-white transition-all duration-300"
            >
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <OrdersTable orders={orders} onStatusChange={handleOrderStatusChange} />
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-6">
            <ReservationsTable reservations={reservations} onStatusChange={handleReservationStatusChange} />
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables" className="space-y-6">
            <TablesGrid tables={tables} onStatusChange={handleTableStatusChange} />
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <TeamTable staff={staff} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
