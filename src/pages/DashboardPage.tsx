
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CustomerDashboard } from "@/components/dashboard/CustomerDashboard";
import { StaffDashboard } from "@/components/dashboard/StaffDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { useState } from "react";

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isAuthModalOpen) {
      setIsAuthModalOpen(true);
    }
  }, [isAuthenticated, isAuthModalOpen, navigate]);

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case "admin":
        return <AdminDashboard />;
      case "staff":
        return <StaffDashboard />;
      case "customer":
        return <CustomerDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ThemeToggle />

      <main className="flex-grow pt-24 pb-12">
        <div className="container-custom">
          {isAuthenticated ? renderDashboard() : null}
        </div>
      </main>

      <Footer />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;
