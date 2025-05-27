
import { useDashboard } from "@/contexts/DashboardContext";
import { AdminDashboard } from "./AdminDashboard";
import { StaffDashboard } from "./StaffDashboard";
import { RolesView } from "./views/RolesView";

export const DashboardContent = () => {
  const { activeView } = useDashboard();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'roles':
        return <RolesView />;
      case 'staff':
        return <div className="p-6">Staff Table View - Coming Soon</div>;
      case 'add-staff':
        return <div className="p-6">Add Staff Form - Coming Soon</div>;
      case 'reservations-team':
        return <div className="p-6">Reservations Team Table - Coming Soon</div>;
      case 'add-reservations-team':
        return <div className="p-6">Add Reservations Team Form - Coming Soon</div>;
      case 'delivery-team':
        return <div className="p-6">Delivery Team Table - Coming Soon</div>;
      case 'add-delivery-teams':
        return <div className="p-6">Add Delivery Teams Form - Coming Soon</div>;
      case 'tables':
        return <div className="p-6">Tables Table - Coming Soon</div>;
      case 'add-tables':
        return <div className="p-6">Add Tables Form - Coming Soon</div>;
      case 'view-table':
        return <div className="p-6">View Tables Grid - Coming Soon</div>;
      case 'menu-view':
        return <div className="p-6">Menu View List - Coming Soon</div>;
      case 'menu-management':
        return <div className="p-6">Menu Management Table - Coming Soon</div>;
      case 'kids-menu':
        return <div className="p-6">Kids Menu Table - Coming Soon</div>;
      case 'combo-menu':
        return <div className="p-6">Combo Menu Table - Coming Soon</div>;
      case 'payments':
        return <div className="p-6">Payments Table - Coming Soon</div>;
      case 'bank':
        return <div className="p-6">Bank Info Table - Coming Soon</div>;
      case 'orders':
        return <div className="p-6">Orders Table - Coming Soon</div>;
      case 'reservations':
        return <div className="p-6">Reservations Table - Coming Soon</div>;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {renderContent()}
    </div>
  );
};
