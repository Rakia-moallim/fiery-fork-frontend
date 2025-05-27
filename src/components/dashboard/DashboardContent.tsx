
import { useDashboard } from "@/contexts/DashboardContext";
import { AdminDashboard } from "./AdminDashboard";
import { StaffDashboard } from "./StaffDashboard";
import { RolesView } from "./views/RolesView";
import { StaffView } from "./views/StaffView";
import { TablesView } from "./views/TablesView";
import { MenuView } from "./views/MenuView";
import { OrdersView } from "./views/OrdersView";
import { ReservationsView } from "./views/ReservationsView";
import { PaymentsView } from "./views/PaymentsView";
import { BankView } from "./views/BankView";

export const DashboardContent = () => {
  const { activeView } = useDashboard();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'roles':
        return <RolesView />;
      case 'staff':
        return <StaffView />;
      case 'add-staff':
        return <StaffView />;
      case 'reservations-team':
        return <div className="p-6">Reservations Team Table - Coming Soon</div>;
      case 'add-reservations-team':
        return <div className="p-6">Add Reservations Team Form - Coming Soon</div>;
      case 'delivery-team':
        return <div className="p-6">Delivery Team Table - Coming Soon</div>;
      case 'add-delivery-teams':
        return <div className="p-6">Add Delivery Teams Form - Coming Soon</div>;
      case 'tables':
        return <TablesView />;
      case 'add-tables':
        return <TablesView />;
      case 'view-table':
        return <div className="p-6">View Tables Grid - Coming Soon</div>;
      case 'menu-view':
        return <MenuView />;
      case 'menu-management':
        return <MenuView />;
      case 'kids-menu':
        return <div className="p-6">Kids Menu Table - Coming Soon</div>;
      case 'combo-menu':
        return <div className="p-6">Combo Menu Table - Coming Soon</div>;
      case 'payments':
        return <PaymentsView />;
      case 'bank':
        return <BankView />;
      case 'orders':
        return <OrdersView />;
      case 'reservations':
        return <ReservationsView />;
      case 'settings':
        return <div className="p-6">Settings - Coming Soon</div>;
      case 'help':
        return <div className="p-6">Help & Support - Coming Soon</div>;
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
