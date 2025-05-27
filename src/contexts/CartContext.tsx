
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isCombo?: boolean;
  specialInstructions?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount and when user changes
  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`restaurant_cart_${user.id}`);
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (error) {
          console.error('Failed to parse stored cart:', error);
          localStorage.removeItem(`restaurant_cart_${user.id}`);
        }
      }
    } else {
      // Clear cart when user logs out
      setCartItems([]);
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user && cartItems.length > 0) {
      localStorage.setItem(`restaurant_cart_${user.id}`, JSON.stringify(cartItems));
    } else if (user) {
      localStorage.removeItem(`restaurant_cart_${user.id}`);
    }
  }, [cartItems, user]);

  // Add an item to the cart
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    if (!user) {
      toast.error('Please sign in to add items to your cart');
      return;
    }

    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        toast.success(`Added another ${item.name} to your cart`);
        return updatedItems;
      } else {
        // Item doesn't exist, add it with quantity 1
        toast.success(`Added ${item.name} to your cart`);
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.id === itemId);
      if (item) {
        toast.info(`Removed ${item.name} from your cart`);
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  // Update the quantity of an item
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    if (user) {
      localStorage.removeItem(`restaurant_cart_${user.id}`);
    }
    toast.info('Your cart has been cleared');
  };

  // Get total number of items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of all items in cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
