import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { useState } from "react";

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isAuthModalOpen) {
      setIsAuthModalOpen(true);
    }
  }, [isAuthenticated, isAuthModalOpen, navigate]);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to role-specific dashboard
      switch (user.role) {
        case 'ADMIN':
          navigate('/dashboard/admin', { replace: true });
          break;
        case 'STAFF':
          navigate('/dashboard/staff', { replace: true });
          break;
        case 'CUSTOMER':
          navigate('/dashboard/customer', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated) {
    return (
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    );
  }

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default DashboardPage;
