import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StaffSidebar } from "@/components/dashboard/staff/StaffSidebar";
import { StaffDashboardContent } from "@/components/dashboard/staff/StaffDashboardContent";
import { StaffOrdersPage } from "@/components/dashboard/staff/StaffOrdersPage";
import { StaffInventoryPage } from "@/components/dashboard/staff/StaffInventoryPage";
import { StaffMenuPage } from "@/components/dashboard/staff/StaffMenuPage";
import { StaffReservationsPage } from "@/components/dashboard/staff/StaffReservationsPage";
import { DashboardProvider } from "@/contexts/DashboardContext";

const StaffDashboard = () => {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-slate-50 dark:bg-slate-900">
          <StaffSidebar />
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route index element={<StaffDashboardContent />} />
              <Route path="orders" element={<StaffOrdersPage />} />
              <Route path="inventory" element={<StaffInventoryPage />} />
              <Route path="menu" element={<StaffMenuPage />} />
              <Route path="reservations" element={<StaffReservationsPage />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </DashboardProvider>
  );
};

export default StaffDashboard; 