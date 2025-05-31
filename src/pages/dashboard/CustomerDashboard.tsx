import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomerSidebar } from "@/components/dashboard/customer/CustomerSidebar";
import { CustomerDashboardContent } from "@/components/dashboard/customer/CustomerDashboardContent";
import { CustomerOrdersPage } from "@/components/dashboard/customer/CustomerOrdersPage";
import { CustomerPaymentsPage } from "@/components/dashboard/customer/CustomerPaymentsPage";
import { CustomerProfilePage } from "@/components/dashboard/customer/CustomerProfilePage";
import { CustomerReservationsPage } from "@/components/dashboard/customer/CustomerReservationsPage";
import { CustomerFavoritesPage } from "@/components/dashboard/customer/CustomerFavoritesPage";
import { DashboardProvider } from "@/contexts/DashboardContext";

const CustomerDashboard = () => {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-slate-50 dark:bg-slate-900">
          <CustomerSidebar />
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route index element={<CustomerDashboardContent />} />
              <Route path="orders" element={<CustomerOrdersPage />} />
              <Route path="payments" element={<CustomerPaymentsPage />} />
              <Route path="profile" element={<CustomerProfilePage />} />
              <Route path="reservations" element={<CustomerReservationsPage />} />
              <Route path="favorites" element={<CustomerFavoritesPage />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </DashboardProvider>
  );
};

export default CustomerDashboard; 