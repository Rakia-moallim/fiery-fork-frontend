import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed } from "lucide-react";

export function StaffMenuPage() {
  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UtensilsCrossed className="h-8 w-8 text-green-600" />
            Menu Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage menu items
          </p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Staff
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Management</CardTitle>
          <CardDescription>Staff menu interface coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <UtensilsCrossed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Menu management interface coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 