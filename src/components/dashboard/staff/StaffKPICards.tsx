
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Calendar, ChefHat, Users, TrendingUp } from "lucide-react";

interface StaffKPICardsProps {
  activeOrders: number;
  pendingReservations: number;
  availableTables: number;
  activeStaff: number;
}

export const StaffKPICards = ({ 
  activeOrders, 
  pendingReservations, 
  availableTables, 
  activeStaff 
}: StaffKPICardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-emerald-100 font-medium">Active Orders</CardDescription>
              <CardTitle className="text-3xl font-bold text-white">{activeOrders}</CardTitle>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1 text-emerald-100">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Current workload</span>
          </div>
        </CardContent>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-blue-100 font-medium">Pending Reservations</CardDescription>
              <CardTitle className="text-3xl font-bold text-white">{pendingReservations}</CardTitle>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1 text-blue-100">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Awaiting approval</span>
          </div>
        </CardContent>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-restaurant-orange to-orange-600">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-orange-100 font-medium">Available Tables</CardDescription>
              <CardTitle className="text-3xl font-bold text-white">{availableTables}</CardTitle>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1 text-orange-100">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Ready for seating</span>
          </div>
        </CardContent>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-restaurant-red to-red-600">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-red-100 font-medium">Staff On Duty</CardDescription>
              <CardTitle className="text-3xl font-bold text-white">{activeStaff}</CardTitle>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1 text-red-100">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Currently working</span>
          </div>
        </CardContent>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
      </Card>
    </div>
  );
};
