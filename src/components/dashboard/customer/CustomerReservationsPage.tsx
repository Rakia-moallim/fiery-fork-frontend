import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export function CustomerReservationsPage() {
  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="h-8 w-8 text-purple-600" />
            My Reservations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your table reservations
          </p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Customer
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reservation History</CardTitle>
          <CardDescription>This page will contain reservation management features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Reservation management interface coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 