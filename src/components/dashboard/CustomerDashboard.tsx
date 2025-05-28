import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useMyOrders } from "@/hooks/useOrders";
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
import { ShoppingCart, Clock, CheckCircle, Heart, Package, Truck, ChefHat } from "lucide-react";
import { Order } from "@/lib/api";

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const { favoriteItems } = useFavorites();
  const { data: orders = [], isLoading: ordersLoading } = useMyOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Get the most recent order
  const latestOrder = orders.length > 0 ? orders[0] : null;

  // Render step status based on current order status
  const getStepStatus = (step: string, currentStatus: string) => {
    const statusOrder = ["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(step);
    
    if (stepIndex < currentIndex) {
      return "completed";
    } else if (stepIndex === currentIndex) {
      return "current";
    } else {
      return "upcoming";
    }
  };

  const getStatusIcon = (status: string, currentStatus: string) => {
    const stepStatus = getStepStatus(status, currentStatus);
    
    if (stepStatus === "completed") {
      return <CheckCircle className="h-6 w-6" />;
    } else if (stepStatus === "current") {
      switch (status) {
        case "PENDING":
          return <Clock className="h-6 w-6" />;
        case "CONFIRMED":
          return <Package className="h-6 w-6" />;
        case "PREPARING":
          return <ChefHat className="h-6 w-6" />;
        case "READY":
          return <Package className="h-6 w-6" />;
        case "DELIVERED":
          return <Truck className="h-6 w-6" />;
        default:
          return <Clock className="h-6 w-6" />;
      }
    } else {
      return <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>;
    }
  };

  const handleViewReceipt = (order: Order) => {
    setSelectedOrder(order);
    setIsReceiptModalOpen(true);
  };

  // Transform order data for receipt modal
  const getReceiptData = (order: Order) => {
    if (!order) return null;
    
    return {
      orderId: `ORD-${order.id}`,
      items: order.orderItems?.map(item => ({
        name: item.menuItem?.name || 'Unknown Item',
        quantity: item.quantity,
        price: item.unitPrice || 0,
      })) || [],
      subtotal: order.totalAmount || 0,
      tax: (order.totalAmount || 0) * 0.1, // Assuming 10% tax
      deliveryFee: order.orderType === 'DELIVERY' ? 5.00 : 0.00,
      total: order.totalAmount || 0,
      date: new Date(order.createdAt).toLocaleDateString(),
      paymentMethod: "Credit Card ****1234", // This would come from payment data
    };
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
          {ordersLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center items-center h-32">
                  <div className="text-muted-foreground">Loading your orders...</div>
                </div>
              </CardContent>
            </Card>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by browsing our menu and placing your first order!
                  </p>
                  <Button asChild>
                    <a href="/">Browse Menu</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Latest Order Status */}
              {latestOrder && latestOrder.status !== 'DELIVERED' && latestOrder.status !== 'CANCELLED' && (
                <Card>
                  <CardHeader>
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <CardTitle>Order #{latestOrder.id}</CardTitle>
                        <CardDescription>
                          {latestOrder.estimatedDeliveryTime ? (
                            <>
                              Estimated delivery:{" "}
                              {new Date(latestOrder.estimatedDeliveryTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </>
                          ) : (
                            `Order placed on ${new Date(latestOrder.createdAt).toLocaleDateString()}`
                          )}
                        </CardDescription>
                      </div>
                      <div className="bg-muted px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {latestOrder.status.toLowerCase().replace('_', ' ')}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Status Steps */}
                    <div className="relative">
                      <div className="flex justify-between mb-2">
                        {["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED"].map(
                          (step) => {
                            const status = getStepStatus(step, latestOrder.status);
                            return (
                              <div
                                key={step}
                                className={`flex flex-col items-center w-1/5 z-10 ${
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
                                  {getStatusIcon(step, latestOrder.status)}
                                </div>
                                <span className="text-xs font-medium text-center capitalize">
                                  {step.toLowerCase().replace('_', ' ')}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                      
                      {/* Progress Line */}
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
                        <div 
                          className="h-full bg-restaurant-orange transition-all duration-500"
                          style={{ 
                            width: `${(["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED"].indexOf(latestOrder.status) / 4) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    {/* Order Items Summary */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-3">Order Summary</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Item</th>
                              <th className="text-center py-2">Qty</th>
                              <th className="text-right py-2">Price</th>
                            </tr>
                          </thead>
                          <tbody className="bg-card divide-y divide-border">
                            {latestOrder.orderItems?.map((item, index) => (
                              <tr key={index}>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  {item.menuItem?.name || 'Unknown Item'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center">
                                  {item.quantity}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right">
                                  ${(item.totalPrice || 0).toFixed(2)}
                                </td>
                              </tr>
                            )) || (
                              <tr>
                                <td colSpan={3} className="px-4 py-3 text-center text-muted-foreground">
                                  No items found
                                </td>
                              </tr>
                            )}
                            <tr className="bg-muted/50">
                              <td
                                colSpan={2}
                                className="px-4 py-3 whitespace-nowrap text-right font-bold"
                              >
                                Total:
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right font-bold">
                                ${(latestOrder.totalAmount || 0).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleViewReceipt(latestOrder)}
                    >
                      View Receipt
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* All Orders History */}
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View all your past orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Order #{order.id}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()} • {order.orderType?.replace('_', ' ')}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                              order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status.toLowerCase().replace('_', ' ')}
                            </span>
                            <span className="font-medium">${(order.totalAmount || 0).toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                          {order.orderItems?.map(item => 
                            `${item.quantity}x ${item.menuItem?.name || 'Unknown Item'}`
                          ).join(', ') || 'No items'}
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewReceipt(order)}
                          >
                            View Receipt
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          {favoriteItems.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start adding items to your favorites by clicking the heart icon on menu items!
                  </p>
                  <Button asChild>
                    <a href="/">Browse Menu</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteItems.map((item) => (
                <MenuCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  category={item.category}
                  isPopular={item.isPopular}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Receipt Modal */}
      {selectedOrder && (
        <ReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          orderData={getReceiptData(selectedOrder)!}
        />
      )}
    </div>
  );
};
