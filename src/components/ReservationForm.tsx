import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthModal } from "./AuthModal";
import { toast } from "sonner";
import { useCreateReservation } from "@/hooks/useReservations";

export const ReservationForm = () => {
  const { isAuthenticated, user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Use the create reservation mutation
  const createReservationMutation = useCreateReservation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });

  // Update form data when user logs in
  useState(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    // Basic validation
    const requiredFields = ["name", "email", "phone", "date", "time", "guests"];
    const emptyFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Combine date and time into a single datetime string
      const reservationDateTime = `${formData.date}T${formData.time}:00`;
      
      // Create reservation request
      const reservationData = {
        reservationDateTime,
        numberOfGuests: parseInt(formData.guests),
        specialRequests: formData.specialRequests || undefined,
        phoneNumber: formData.phone,
      };

      // Submit the reservation
      await createReservationMutation.mutateAsync(reservationData);
      
      // Reset form on success
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        specialRequests: "",
      });
    } catch (error) {
      // Error is handled by the mutation's onError callback
      console.error('Reservation submission failed:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              disabled={createReservationMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              disabled={createReservationMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">
              Phone Number *
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your phone number"
              disabled={createReservationMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="text-foreground">
              Number of Guests *
            </Label>
            <Select
              value={formData.guests}
              onValueChange={(value) => handleSelectChange("guests", value)}
              disabled={createReservationMutation.isPending}
            >
              <SelectTrigger id="guests">
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "person" : "people"}
                  </SelectItem>
                ))}
                <SelectItem value="more">More than 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-foreground">
              Date *
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              disabled={createReservationMutation.isPending}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-foreground">
              Time *
            </Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
              disabled={createReservationMutation.isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequests" className="text-foreground">
            Special Requests
          </Label>
          <Textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="Any special requests or dietary requirements?"
            className="min-h-[100px]"
            disabled={createReservationMutation.isPending}
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto bg-restaurant-red hover:bg-restaurant-red/90"
          disabled={createReservationMutation.isPending}
        >
          {createReservationMutation.isPending ? "Submitting..." : "Reserve a Table"}
        </Button>
      </form>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
