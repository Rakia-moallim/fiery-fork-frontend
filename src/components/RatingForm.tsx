
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AuthModal } from "./AuthModal";
import { toast } from "sonner";

export const RatingForm = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    // Simulate API request with timeout
    setTimeout(() => {
      toast.success("Thank you for your feedback!");
      setRating(0);
      setComment("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <h4 className="text-xl font-medium">How would you rate your experience?</h4>
          
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingClick(value)}
                onMouseEnter={() => handleMouseEnter(value)}
                onMouseLeave={handleMouseLeave}
                className="text-4xl transition-colors focus:outline-none"
                aria-label={`Rate ${value} stars`}
              >
                {value <= (hoverRating || rating) ? "★" : "☆"}
              </button>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground">
            {rating > 0 
              ? `You selected ${rating} ${rating === 1 ? "star" : "stars"}` 
              : "Click to rate"}
          </p>
        </div>

        <div className="space-y-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with us (optional)"
            className="min-h-[120px]"
            disabled={isSubmitting}
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto bg-restaurant-orange hover:bg-restaurant-orange/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Rating"}
        </Button>
      </form>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
