
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const cartItemCount = getTotalItems();

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-restaurant-red">
              Taste<span className="text-restaurant-orange">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-foreground hover:text-restaurant-orange transition-colors"
            >
              Home
            </Link>
            <a
              href="#menu"
              className="text-foreground hover:text-restaurant-orange transition-colors"
            >
              Menu
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-restaurant-orange transition-colors"
            >
              About
            </a>
            <a
              href="#reservation"
              className="text-foreground hover:text-restaurant-orange transition-colors"
            >
              Reservation
            </a>
          </nav>

          {/* Auth & Cart Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" className="font-medium">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={openAuthModal}
                variant="default"
                className="hidden md:inline-flex bg-restaurant-orange hover:bg-restaurant-orange/90"
              >
                Sign In
              </Button>
            )}

            <Link to="/cart" className="relative">
              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-restaurant-red text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden rounded-full"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md transition-all duration-300 shadow-md ${
            isMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden py-0"
          }`}
        >
          <div className="container-custom flex flex-col space-y-4">
            <Link
              to="/"
              className="text-foreground hover:text-restaurant-orange transition-colors py-2"
            >
              Home
            </Link>
            <a
              href="#menu"
              className="text-foreground hover:text-restaurant-orange transition-colors py-2"
            >
              Menu
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-restaurant-orange transition-colors py-2"
            >
              About
            </a>
            <a
              href="#reservation"
              className="text-foreground hover:text-restaurant-orange transition-colors py-2"
            >
              Reservation
            </a>

            {/* Mobile Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2 pt-2 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Signed in as {user?.name}
                </div>
                <Link to="/dashboard">
                  <Button variant="default" className="w-full bg-restaurant-orange hover:bg-restaurant-orange/90">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={logout} className="w-full">
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={openAuthModal}
                variant="default"
                className="mt-2 w-full bg-restaurant-orange hover:bg-restaurant-orange/90"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
};
