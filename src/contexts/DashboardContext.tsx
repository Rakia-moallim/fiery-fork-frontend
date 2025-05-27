
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ViewType = 
  | 'dashboard'
  | 'roles'
  | 'staff'
  | 'add-staff'
  | 'reservations-team'
  | 'add-reservations-team'
  | 'delivery-team'
  | 'add-delivery-teams'
  | 'tables'
  | 'add-tables'
  | 'view-table'
  | 'menu-view'
  | 'menu-management'
  | 'kids-menu'
  | 'combo-menu'
  | 'payments'
  | 'bank'
  | 'orders'
  | 'reservations';

interface DashboardContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  return (
    <DashboardContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </DashboardContext.Provider>
  );
};
