import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import { RoleBasedRoute } from "@/components/RoleBasedRoute";

import HomePage from "@/pages/HomePage";
import CartPage from "@/pages/CartPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import StaffDashboard from "@/pages/dashboard/StaffDashboard";
import CustomerDashboard from "@/pages/dashboard/CustomerDashboard";
import ReservationsPage from "@/pages/ReservationsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute>
                        <CartPage />
                      </PrivateRoute>
                    }
                  />
                  {/* Legacy dashboard route - redirects based on role */}
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <DashboardPage />
                      </PrivateRoute>
                    }
                  />
                  {/* Role-based dashboard routes */}
                  <Route
                    path="/dashboard/admin/*"
                    element={
                      <RoleBasedRoute allowedRoles={['ADMIN']}>
                        <AdminDashboard />
                      </RoleBasedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/staff/*"
                    element={
                      <RoleBasedRoute allowedRoles={['STAFF', 'ADMIN']}>
                        <StaffDashboard />
                      </RoleBasedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/customer/*"
                    element={
                      <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                        <CustomerDashboard />
                      </RoleBasedRoute>
                    }
                  />
                  <Route path="/reservations" element={<ReservationsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
