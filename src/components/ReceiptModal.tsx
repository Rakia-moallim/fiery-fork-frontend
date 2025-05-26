
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Receipt, Download, Share } from "lucide-react";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    items: ReceiptItem[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    date: string;
    paymentMethod: string;
  };
}

export const ReceiptModal = ({ isOpen, onClose, orderData }: ReceiptModalProps) => {
  const { user } = useAuth();

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    console.log("Downloading receipt...");
  };

  const handleShare = () => {
    // In a real app, this would open share options
    console.log("Sharing receipt...");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Receipt className="h-5 w-5" />
            <span>Order Receipt</span>
          </DialogTitle>
          <DialogDescription>
            Receipt for Order #{orderData.orderId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Restaurant Info */}
          <div className="text-center border-b pb-4">
            <h3 className="text-lg font-bold text-restaurant-orange">TasteHub Restaurant</h3>
            <p className="text-sm text-muted-foreground">123 Food Street, Flavor City</p>
            <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Order #:</p>
              <p className="text-muted-foreground">{orderData.orderId}</p>
            </div>
            <div>
              <p className="font-medium">Date:</p>
              <p className="text-muted-foreground">{orderData.date}</p>
            </div>
            <div>
              <p className="font-medium">Customer:</p>
              <p className="text-muted-foreground">{user?.name}</p>
            </div>
            <div>
              <p className="font-medium">Payment:</p>
              <p className="text-muted-foreground">{orderData.paymentMethod}</p>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h4 className="font-medium mb-3">Order Items</h4>
            <div className="space-y-2">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <span>{item.quantity}x {item.name}</span>
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>${orderData.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee:</span>
              <span>${orderData.deliveryFee.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${orderData.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleShare}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Thank you for dining with us!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
