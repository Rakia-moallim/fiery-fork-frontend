
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { useState } from "react";

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  isCombo?: boolean;
}

export const MenuCard = ({
  id,
  name,
  description,
  price,
  image,
  isPopular,
  isCombo = false,
}: MenuCardProps) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isFav = isFavorite(id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    addToCart({
      id,
      name,
      price,
      image,
      isCombo,
    });
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (isFav) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        name,
        price,
        image,
        isCombo,
      });
    }
  };

  return (
    <>
      <Card className="overflow-hidden card-hover h-full flex flex-col">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          {isPopular && (
            <div className="absolute top-2 right-2 bg-restaurant-orange text-white text-xs font-bold py-1 px-2 rounded-full">
              Popular
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="text-lg font-bold text-restaurant-red">
            ${price.toFixed(2)}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 gap-2">
          <Button
            variant="default"
            className="flex-1 bg-restaurant-orange hover:bg-restaurant-orange/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add
          </Button>
          <Button
            variant={isFav ? "default" : "outline"}
            className={
              isFav
                ? "bg-restaurant-red hover:bg-restaurant-red/90"
                : "hover:text-restaurant-red hover:border-restaurant-red"
            }
            onClick={handleToggleFavorite}
          >
            <Heart
              className={`h-4 w-4 ${isFav ? "fill-white" : ""}`}
            />
          </Button>
        </CardFooter>
      </Card>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
