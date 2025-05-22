
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MenuCard } from "@/components/MenuCard";
import { ReservationForm } from "@/components/ReservationForm";
import { RatingForm } from "@/components/RatingForm";
import { menuItems, comboItems, categories } from "@/data/menuData";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter menu items based on the active category
  const filteredMenuItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative h-screen bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="container-custom">
            <div className="max-w-xl animate-fade-in">
              <h1 className="text-white mb-4">
                Experience <span className="text-restaurant-orange">Culinary</span> Excellence
              </h1>
              <p className="text-gray-200 text-lg mb-8">
                Indulge in a symphony of flavors crafted with passion and the finest ingredients.
                Welcome to TasteHub, where every meal tells a story.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#menu">
                  <Button className="bg-restaurant-orange hover:bg-restaurant-orange/90 text-white px-8 py-6 text-lg">
                    Explore Menu
                  </Button>
                </a>
                <a href="#reservation">
                  <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 text-lg">
                    Reserve a Table
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Section */}
      <section id="menu" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-3">Our <span className="text-restaurant-orange">Menu</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully crafted menu featuring fresh ingredients and bold flavors.
              From timeless classics to innovative creations, there's something for everyone.
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={
                  activeCategory === category.id
                    ? "bg-restaurant-orange hover:bg-restaurant-orange/90"
                    : ""
                }
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenuItems.map(item => (
              <MenuCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                isPopular={item.isPopular}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Combo Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-3">Special <span className="text-restaurant-red">Combos</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get more value with our specially curated combo meals.
              Perfect for sharing with family and friends!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comboItems.map(combo => (
              <MenuCard
                key={combo.id}
                id={combo.id}
                name={combo.name}
                description={combo.description}
                price={combo.price}
                image={combo.image}
                isPopular={combo.isPopular}
                isCombo={true}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about" className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="mb-4">Our <span className="text-restaurant-orange">Story</span></h2>
              <p className="text-muted-foreground mb-6">
                TasteHub began with a simple dream: to create a place where food isn't just eaten, but experienced.
                Founded in 2010 by Chef Michael Rodriguez, our restaurant has been serving the community with 
                passion and dedication for over a decade.
              </p>
              <p className="text-muted-foreground mb-6">
                We believe in using only the freshest ingredients, sourced locally whenever possible,
                to create dishes that delight the senses and bring people together. Every recipe has been
                perfected over years of culinary exploration and innovation.
              </p>
              <p className="font-medium">
                Come join us and be part of our continuing story!
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Restaurant interior"
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-restaurant-orange text-white p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-heading font-bold text-xl">Est. 2010</p>
                  <p>12+ Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rate Us Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-3">Rate Your <span className="text-restaurant-orange">Experience</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your feedback helps us improve. Let us know how we're doing!
            </p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <RatingForm />
          </div>
        </div>
      </section>
      
      {/* Reservation Section */}
      <section id="reservation" className="section-padding bg-background relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <h2 className="mb-3">Make a <span className="text-restaurant-red">Reservation</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reserve your table to ensure a spot at TasteHub. 
              Special occasions, date nights, or family dinners — we've got you covered!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8">
            <ReservationForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
