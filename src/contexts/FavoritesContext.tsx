
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  isCombo?: boolean;
}

interface FavoritesContextType {
  favoriteItems: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

  // Load favorites from localStorage on mount and when user changes
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`restaurant_favorites_${user.id}`);
      if (storedFavorites) {
        try {
          setFavoriteItems(JSON.parse(storedFavorites));
        } catch (error) {
          console.error('Failed to parse stored favorites:', error);
          localStorage.removeItem(`restaurant_favorites_${user.id}`);
        }
      }
    } else {
      // Clear favorites when user logs out
      setFavoriteItems([]);
    }
  }, [user]);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (user && favoriteItems.length > 0) {
      localStorage.setItem(`restaurant_favorites_${user.id}`, JSON.stringify(favoriteItems));
    } else if (user) {
      localStorage.removeItem(`restaurant_favorites_${user.id}`);
    }
  }, [favoriteItems, user]);

  // Add an item to favorites
  const addToFavorites = (item: FavoriteItem) => {
    if (!user) {
      toast.error('Please sign in to add items to your favorites');
      return;
    }

    setFavoriteItems(prevItems => {
      // Check if item already exists in favorites
      if (prevItems.some(favItem => favItem.id === item.id)) {
        toast.info(`${item.name} is already in your favorites`);
        return prevItems;
      } else {
        // Item doesn't exist, add it
        toast.success(`Added ${item.name} to your favorites`);
        return [...prevItems, item];
      }
    });
  };

  // Remove an item from favorites
  const removeFromFavorites = (itemId: string) => {
    setFavoriteItems(prevItems => {
      const item = prevItems.find(i => i.id === itemId);
      if (item) {
        toast.info(`Removed ${item.name} from your favorites`);
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  // Check if an item is in favorites
  const isFavorite = (itemId: string) => {
    return favoriteItems.some(item => item.id === itemId);
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavoriteItems([]);
    if (user) {
      localStorage.removeItem(`restaurant_favorites_${user.id}`);
    }
    toast.info('Your favorites have been cleared');
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteItems,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context;
};
