import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/dashboard/admin/AdminSidebar";
import { AdminDashboardContent } from "@/components/dashboard/admin/AdminDashboardContent";
import { AdminCustomersPage } from "@/components/dashboard/admin/AdminCustomersPage";
import { AdminStaffPage } from "@/components/dashboard/admin/AdminStaffPage";
import { AdminOrdersPage } from "@/components/dashboard/admin/AdminOrdersPage";
import { AdminInventoryPage } from "@/components/dashboard/admin/AdminInventoryPage";
import { AdminMenuPage } from "@/components/dashboard/admin/AdminMenuPage";
import { AdminReportsPage } from "@/components/dashboard/admin/AdminReportsPage";
import { DashboardProvider } from "@/contexts/DashboardContext";

const AdminDashboard = () => {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-slate-50 dark:bg-slate-900">
          <AdminSidebar />
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route index element={<AdminDashboardContent />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="staff" element={<AdminStaffPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="inventory" element={<AdminInventoryPage />} />
              <Route path="menu" element={<AdminMenuPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </DashboardProvider>
  );
};

export default AdminDashboard; 