import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export function StaffReservationsPage() {
  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="h-8 w-8 text-blue-600" />
            Reservations Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage table reservations
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Staff
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reservations Management</CardTitle>
          <CardDescription>Staff reservations interface coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Reservations management interface coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 