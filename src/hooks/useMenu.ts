import { useQuery } from '@tanstack/react-query';
import { menuService, MenuItem } from '@/lib/api';

// Custom hook for fetching all menu items
export const useMenuItems = () => {
  return useQuery({
    queryKey: ['menuItems'],
    queryFn: menuService.getAllItems,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for fetching menu items by category
export const useMenuItemsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['menuItems', 'category', category],
    queryFn: () => menuService.getItemsByCategory(category.toUpperCase()),
    enabled: category !== 'all' && category !== '',
    staleTime: 5 * 60 * 1000,
  });
};

// Custom hook for fetching popular menu items
export const usePopularMenuItems = () => {
  return useQuery({
    queryKey: ['menuItems', 'popular'],
    queryFn: menuService.getPopularItems,
    staleTime: 5 * 60 * 1000,
  });
};

// Custom hook for searching menu items
export const useSearchMenuItems = (searchTerm: string) => {
  return useQuery({
    queryKey: ['menuItems', 'search', searchTerm],
    queryFn: () => menuService.searchItems(searchTerm),
    enabled: searchTerm.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

// Custom hook for fetching a single menu item
export const useMenuItem = (id: number) => {
  return useQuery({
    queryKey: ['menuItem', id],
    queryFn: () => menuService.getItemById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for individual items
  });
};

// Custom hook for fetching available categories
export const useMenuCategories = () => {
  return useQuery({
    queryKey: ['menuCategories'],
    queryFn: menuService.getCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
  });
};

// Helper function to transform backend category to frontend format
export const transformCategory = (backendCategory: string): string => {
  const categoryMap: Record<string, string> = {
    'BURGERS': 'burgers',
    'PIZZA': 'pizza',
    'SALADS': 'salads',
    'APPETIZERS': 'appetizers',
    'MAINS': 'mains',
    'DESSERTS': 'desserts',
  };
  return categoryMap[backendCategory] || backendCategory.toLowerCase();
};

// Helper function to transform frontend category to backend format
export const transformCategoryToBackend = (frontendCategory: string): string => {
  const categoryMap: Record<string, string> = {
    'burgers': 'BURGERS',
    'pizza': 'PIZZA',
    'salads': 'SALADS',
    'appetizers': 'APPETIZERS',
    'mains': 'MAINS',
    'desserts': 'DESSERTS',
  };
  return categoryMap[frontendCategory] || frontendCategory.toUpperCase();
};

// Helper function to transform backend MenuItem to frontend format
export const transformMenuItem = (backendItem: MenuItem) => {
  return {
    id: backendItem.id.toString(),
    name: backendItem.name,
    description: backendItem.description,
    price: backendItem.price,
    image: backendItem.imageUrl || '',
    category: transformCategory(backendItem.category),
    isPopular: backendItem.isPopular,
    tags: backendItem.tags || [],
  };
};

// Categories for the frontend (keeping the existing structure)
export const categories = [
  { id: "all", name: "All" },
  { id: "burgers", name: "Burgers" },
  { id: "pizza", name: "Pizza" },
  { id: "salads", name: "Salads" },
  { id: "appetizers", name: "Appetizers" },
  { id: "mains", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
]; 