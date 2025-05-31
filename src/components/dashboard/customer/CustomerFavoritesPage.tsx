import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

export function CustomerFavoritesPage() {
  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-600" />
            My Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Your saved favorite items
          </p>
        </div>
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Customer
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Favorite Items</CardTitle>
          <CardDescription>This page will contain your favorite menu items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Favorites management interface coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 