
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChefHat } from "lucide-react";

interface Table {
  id: number;
  seats: number;
  status: string;
}

interface TablesGridProps {
  tables: Table[];
  onStatusChange: (tableId: number, status: string) => void;
}

export const TablesGrid = ({ tables, onStatusChange }: TablesGridProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-restaurant-orange to-orange-600 rounded-lg">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Table Management</CardTitle>
            <CardDescription>View and update table availability</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tables.map((table) => (
            <Card key={table.id} className="overflow-hidden border border-orange-200 dark:border-orange-800">
              <CardHeader className="pb-2">
                <CardTitle>Table {table.id}</CardTitle>
                <CardDescription>{table.seats} seats</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      table.status === "available"
                        ? "bg-green-500"
                        : table.status === "occupied"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="capitalize">{table.status}</span>
                </div>
              </CardContent>
              <div className="px-6 pb-4">
                <Select
                  value={table.status}
                  onValueChange={(value) => onStatusChange(table.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
