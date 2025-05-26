
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

// Mock reservation data
const mockReservations = [
  {
    id: "RES-5001",
    date: "2025-05-26",
    time: "7:00 PM",
    guests: 4,
    status: "confirmed",
    table: "Table 5",
    specialRequests: "Window seat if possible",
    createdAt: "2025-05-20",
  },
  {
    id: "RES-5002",
    date: "2025-05-28",
    time: "8:30 PM",
    guests: 2,
    status: "pending",
    table: "Table 2",
    specialRequests: "Anniversary celebration",
    createdAt: "2025-05-21",
  },
];

const ReservationsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [reservations] = useState(mockReservations);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <ThemeToggle />
        
        <main className="flex-grow pt-24 pb-12">
          <div className="container-custom">
            <Card>
              <CardHeader>
                <CardTitle>Sign In Required</CardTitle>
                <CardDescription>
                  Please sign in to view your reservations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="bg-restaurant-orange hover:bg-restaurant-orange/90"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
        
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ThemeToggle />

      <main className="flex-grow pt-24 pb-12">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Reservations</h1>
            <p className="text-muted-foreground">
              Track and manage your restaurant reservations.
            </p>
          </div>

          {reservations.length > 0 ? (
            <div className="grid gap-6">
              {reservations.map((reservation) => (
                <Card key={reservation.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Reservation #{reservation.id}</CardTitle>
                        <CardDescription>
                          Booked on {new Date(reservation.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(reservation.status)}`}>
                        {reservation.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-restaurant-orange" />
                        <div>
                          <p className="text-sm font-medium">Date</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(reservation.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-restaurant-orange" />
                        <div>
                          <p className="text-sm font-medium">Time</p>
                          <p className="text-sm text-muted-foreground">
                            {reservation.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-restaurant-orange" />
                        <div>
                          <p className="text-sm font-medium">Guests</p>
                          <p className="text-sm text-muted-foreground">
                            {reservation.guests} people
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-restaurant-orange" />
                        <div>
                          <p className="text-sm font-medium">Table</p>
                          <p className="text-sm text-muted-foreground">
                            {reservation.table}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {reservation.specialRequests && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">Special Requests:</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.specialRequests}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end mt-4 space-x-2">
                      {reservation.status === "pending" && (
                        <Button variant="outline" size="sm">
                          Cancel Reservation
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Reservations</CardTitle>
                <CardDescription>
                  You haven't made any reservations yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="bg-restaurant-orange hover:bg-restaurant-orange/90"
                  onClick={() => window.location.href = "/"}
                >
                  Make a Reservation
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReservationsPage;
