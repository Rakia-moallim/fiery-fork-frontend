
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "lucide-react";

interface Reservation {
  id: string;
  customer: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  specialRequests: string;
}

interface ReservationsTableProps {
  reservations: Reservation[];
  onStatusChange: (reservationId: string, status: string) => void;
}

export const ReservationsTable = ({ reservations, onStatusChange }: ReservationsTableProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-restaurant-red to-red-600 rounded-lg">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Upcoming Reservations</CardTitle>
            <CardDescription>Approve or reject reservation requests</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-restaurant-orange/10 to-restaurant-red/10 border-restaurant-orange/20">
                <TableHead className="font-semibold">Reservation ID</TableHead>
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Time</TableHead>
                <TableHead className="font-semibold">Guests</TableHead>
                <TableHead className="font-semibold">Special Requests</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors">
                  <TableCell className="font-medium">{reservation.id}</TableCell>
                  <TableCell>{reservation.customer}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>{reservation.guests}</TableCell>
                  <TableCell>
                    {reservation.specialRequests || "None"}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${
                      reservation.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}>
                      {reservation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {reservation.status === "pending" ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => onStatusChange(reservation.id, "confirmed")}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => onStatusChange(reservation.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onStatusChange(reservation.id, "pending")}
                      >
                        Reset
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
