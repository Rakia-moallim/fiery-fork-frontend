import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MenuCard } from "@/components/MenuCard";
import { ReceiptModal } from "@/components/ReceiptModal";
import { ShoppingCart, Clock, CheckCircle, Heart } from "lucide-react";

// Mock order data
const mockOrder = {
  orderId: "ORD-" + Math.floor(10000 + Math.random() * 90000),
  status: "preparing",
  items: [
    {
      name: "Classic Cheeseburger",
      quantity: 2,
      price: 12.99,
    },
    {
      name: "Caesar Salad",
      quantity: 1,
      price: 9.99,
    },
    {
      name: "Chocolate Lava Cake",
      quantity: 1,
      price: 8.99,
    },
  ],
  total: 44.96,
  estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000),
};

// Receipt data for the modal
const receiptData = {
  orderId: mockOrder.orderId,
  items: mockOrder.items,
  subtotal: 41.97,
  tax: 2.99,
  deliveryFee: 0.00,
  total: mockOrder.total,
  date: new Date().toLocaleDateString(),
  paymentMethod: "Credit Card ****1234",
};

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const { favoriteItems } = useFavorites();
  const [orderStatus, setOrderStatus] = useState(mockOrder.status);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Simulate order progress
  useEffect(() => {
    const statuses = ["preparing", "ready", "on-the-way", "delivered"];
    const currentIndex = statuses.indexOf(orderStatus);
    
    if (currentIndex < statuses.length - 1) {
      const timer = setTimeout(() => {
        setOrderStatus(statuses[currentIndex + 1]);
      }, 15000);
      
      return () => clearTimeout(timer);
    }
  }, [orderStatus]);

  // Update delivery progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Render step status based on current order status
  const getStepStatus = (step: string) => {
    const statuses = ["preparing", "ready", "on-the-way", "delivered"];
    const currentIndex = statuses.indexOf(orderStatus);
    const stepIndex = statuses.indexOf(step);
    
    if (stepIndex < currentIndex) {
      return "completed";
    } else if (stepIndex === currentIndex) {
      return "current";
    } else {
      return "upcoming";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h2>
        <p className="text-muted-foreground">
          View your orders, favorites, and manage your restaurant experience.
        </p>
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="orders">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Your Orders
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart className="mr-2 h-4 w-4" />
            Favorites
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <CardTitle>Order #{mockOrder.orderId}</CardTitle>
                  <CardDescription>
                    Estimated delivery:{" "}
                    {mockOrder.estimatedDelivery.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </CardDescription>
                </div>
                <div className="bg-muted px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {orderStatus.replace(/-/g, " ")}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Status Steps */}
              <div className="relative">
                <div className="flex justify-between mb-2">
                  {["preparing", "ready", "on-the-way", "delivered"].map(
                    (step) => {
                      const status = getStepStatus(step);
                      return (
                        <div
                          key={step}
                          className={`flex flex-col items-center w-1/4 z-10 ${
                            status === "upcoming"
                              ? "text-muted-foreground"
                              : status === "current"
                              ? "text-restaurant-orange"
                              : "text-restaurant-red"
                          }`}
                        >
                          <div
                            className={`rounded-full flex items-center justify-center w-10 h-10 mb-2 ${
                              status === "upcoming"
                                ? "border-2 border-muted-foreground"
                                : status === "current"
                                ? "bg-restaurant-orange text-white"
                                : "bg-restaurant-red text-white"
                            }`}
                          >
                            {status === "completed" ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : status === "current" ? (
                              <Clock className="h-6 w-6" />
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                            )}
                          </div>
                          <span className="text-xs font-medium text-center capitalize">
                            {step.replace(/-/g, " ")}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="h-1 bg-muted absolute top-5 left-0 right-0 z-0">
                  <div
                    className="h-full bg-restaurant-red"
                    style={{
                      width: `${deliveryProgress}%`,
                      transition: "width 1s ease-in-out",
                    }}
                  ></div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {mockOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50">
                      <td
                        colSpan={2}
                        className="px-4 py-3 whitespace-nowrap text-right font-bold"
                      >
                        Total:
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right font-bold">
                        ${mockOrder.total.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                variant="outline"
                onClick={() => setIsReceiptModalOpen(true)}
              >
                View Receipt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites">
          {favoriteItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteItems.map((item) => (
                <MenuCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description=""
                  price={item.price}
                  image={item.image}
                  isCombo={item.isCombo}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Favorites Yet</CardTitle>
                <CardDescription>
                  You haven't added any items to your favorites.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse our menu and click the heart icon on items you love to
                  add them to your favorites.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-restaurant-orange hover:bg-restaurant-orange/90"
                  onClick={() => window.location.href = "/"}
                >
                  Browse Menu
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        orderData={receiptData}
      />
    </div>
  );
};
