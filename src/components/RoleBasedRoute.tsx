import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { useState } from 'react';

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If not authenticated, show auth modal
  if (!isAuthenticated) {
    return (
      <AuthModal
        isOpen={true}
        onClose={() => setIsAuthModalOpen(false)}
      />
    );
  }

  // If authenticated but role not allowed, redirect to appropriate dashboard
  if (user && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to="/dashboard/admin" replace />;
      case 'STAFF':
        return <Navigate to="/dashboard/staff" replace />;
      case 'CUSTOMER':
        return <Navigate to="/dashboard/customer" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // If all checks pass, render the protected component
  return <>{children}</>;
}; 