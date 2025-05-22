
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
  tags?: string[];
}

export interface ComboItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  items: string[];
  isPopular?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "burgers",
    isPopular: true,
    tags: ["beef", "cheese", "classic"],
  },
  {
    id: "m2",
    name: "Margherita Pizza",
    description: "Traditional pizza with fresh mozzarella, tomatoes, and basil on a crispy crust",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "pizza",
    isPopular: true,
    tags: ["vegetarian", "cheese", "classic"],
  },
  {
    id: "m3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and our homemade Caesar dressing",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "salads",
    tags: ["healthy", "chicken", "light"],
  },
  {
    id: "m4",
    name: "Spicy Chicken Wings",
    description: "Crispy wings tossed in our signature spicy sauce, served with blue cheese dip",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "appetizers",
    isPopular: true,
    tags: ["spicy", "chicken", "sharing"],
  },
  {
    id: "m5",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "mains",
    tags: ["seafood", "healthy", "grilled"],
  },
  {
    id: "m6",
    name: "Mushroom Risotto",
    description: "Creamy Arborio rice slowly cooked with wild mushrooms, finished with parmesan",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "mains",
    tags: ["vegetarian", "creamy", "rice"],
  },
  {
    id: "m7",
    name: "Beef Tacos",
    description: "Three soft corn tortillas filled with seasoned beef, fresh salsa, and guacamole",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "mains",
    tags: ["mexican", "spicy", "beef"],
  },
  {
    id: "m8",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1617651524211-23485a7aaff4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "desserts",
    isPopular: true,
    tags: ["chocolate", "dessert", "sweet"],
  },
];

export const comboItems: ComboItem[] = [
  {
    id: "c1",
    name: "Family Feast",
    description: "Perfect for 4 people: 1 large pizza, 4 burgers, fries, and drinks",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    items: ["1 Large Pizza", "4 Classic Cheeseburgers", "Family Size Fries", "4 Soft Drinks"],
    isPopular: true,
  },
  {
    id: "c2",
    name: "Date Night Special",
    description: "Romantic dinner for two: appetizers, main courses, dessert, and wine",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    items: ["Shared Appetizer", "2 Main Courses", "Dessert to Share", "Bottle of House Wine"],
    isPopular: true,
  },
  {
    id: "c3",
    name: "Lunch Special",
    description: "Perfect quick lunch: sandwich, side salad, and a drink",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    items: ["Choice of Sandwich", "Side Salad", "Soft Drink or Iced Tea"],
  },
  {
    id: "c4",
    name: "Game Day Bundle",
    description: "Wings, nachos, sliders, and beer - perfect for watching the game!",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1565299583225-401b6085127c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    items: ["24 Chicken Wings", "Loaded Nachos", "6 Mini Sliders", "6-Pack of Beer"],
    isPopular: true,
  },
];

export const categories = [
  { id: "all", name: "All" },
  { id: "burgers", name: "Burgers" },
  { id: "pizza", name: "Pizza" },
  { id: "salads", name: "Salads" },
  { id: "appetizers", name: "Appetizers" },
  { id: "mains", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
];
