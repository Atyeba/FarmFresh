import {
  ShoppingCart,
  Menu,
  X,
  Sprout,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const getProductImage = (product) => {
    const imageMap = {
      Apple:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
      Banana:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
      Orange:
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      Tomato:
        "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop",
      Carrot:
        "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
      Potato:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
      Chicken:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop",
      Cow: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
      Eggs: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop",
    };
    return (
      imageMap[product?.name] ||
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
    );
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-900 font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white">FarmFresh</h1>
                <p className="text-sm text-green-400 font-semibold">
                  Premium South African Produce
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-300 hover:text-green-400 font-bold text-lg transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => (window.location.href = "/fruits")}
                className="text-gray-300 hover:text-green-400 font-bold text-lg transition-colors"
              >
                Fruits
              </button>
              <button
                onClick={() => (window.location.href = "/vegetables")}
                className="text-gray-300 hover:text-green-400 font-bold text-lg transition-colors"
              >
                Vegetables
              </button>
              <button
                onClick={() => (window.location.href = "/livestock")}
                className="text-gray-300 hover:text-green-400 font-bold text-lg transition-colors"
              >
                Livestock
              </button>
            </div>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-3 bg-green-600 hover:bg-green-500 rounded-xl transition-colors shadow-lg"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-3 hover:bg-gray-800 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
              <div className="flex flex-col space-y-4 pt-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-green-400 font-bold text-lg text-left"
                >
                  Our Story
                </button>
                <button
                  onClick={() => (window.location.href = "/fruits")}
                  className="text-gray-300 hover:text-green-400 font-bold text-lg text-left"
                >
                  Fruits
                </button>
                <button
                  onClick={() => (window.location.href = "/vegetables")}
                  className="text-gray-300 hover:text-green-400 font-bold text-lg text-left"
                >
                  Vegetables
                </button>
                <button
                  onClick={() => (window.location.href = "/livestock")}
                  className="text-gray-300 hover:text-green-400 font-bold text-lg text-left"
                >
                  Livestock
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Farm Scenery */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&h=1080&fit=crop"
            alt="Beautiful farm landscape"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
            FRESH FROM
            <br />
            <span className="text-green-400">SOUTH AFRICA</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed font-bold">
            Premium farm-to-table produce delivered across the nation
            <br />
            <span className="text-green-400">Since 1995</span>
          </p>
          <button
            onClick={() => scrollToSection("categories")}
            className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-500 text-white font-black py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <span>EXPLORE PRODUCTS</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-6xl font-black text-white mb-8">OUR STORY</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                Started in 1995 by the Mthembu family in the Eastern Cape,
                FarmFresh began as a small vegetable garden. Today, our
                200-hectare farm employs over 50 local community members and
                supplies premium produce nationwide.
              </p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed font-medium">
                We're committed to sustainable farming practices, supporting our
                local community, and delivering the freshest produce directly to
                your table.
              </p>
              <div className="flex items-center space-x-12">
                <div className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-4 shadow-lg">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-lg font-black text-white">Family Owned</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-4 shadow-lg">
                    <Sprout className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-lg font-black text-white">Organic</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-4 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-lg font-black text-white">Community</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&h=500&fit=crop"
                alt="Farm family"
                className="rounded-3xl shadow-2xl w-full border-4 border-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories - Large & Bold */}
      <section id="categories" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-white mb-8">
              CHOOSE YOUR CATEGORY
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-bold">
              Premium South African produce delivered fresh to your door
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fruits Category */}
            <div
              onClick={() => (window.location.href = "/fruits")}
              className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:scale-105 h-96"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=600&fit=crop"
                  alt="Fresh fruits"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-4xl font-black mb-4">FRESH FRUITS</h3>
                <p className="text-xl font-bold text-gray-200 mb-6">
                  Sweet, juicy, and vitamin-packed seasonal favorites
                </p>
                <div className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-black text-lg transition-colors group-hover:bg-green-400">
                  <span>SHOP FRUITS</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Vegetables Category */}
            <div
              onClick={() => (window.location.href = "/vegetables")}
              className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:scale-105 h-96"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
                  alt="Fresh vegetables"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-4xl font-black mb-4">VEGETABLES</h3>
                <p className="text-xl font-bold text-gray-200 mb-6">
                  Crisp, fresh, and nutrient-rich garden selections
                </p>
                <div className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-black text-lg transition-colors group-hover:bg-green-400">
                  <span>SHOP VEGETABLES</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Livestock Category */}
            <div
              onClick={() => (window.location.href = "/livestock")}
              className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:scale-105 h-96"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop"
                  alt="Farm animals"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-4xl font-black mb-4">LIVESTOCK</h3>
                <p className="text-xl font-bold text-gray-200 mb-6">
                  Ethically raised animals and farm-fresh dairy
                </p>
                <div className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-black text-lg transition-colors group-hover:bg-green-400">
                  <span>SHOP LIVESTOCK</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-black">FarmFresh</h3>
          </div>
          <p className="text-green-400 mb-6 text-xl font-bold">
            Premium South African Produce
          </p>
          <p className="text-gray-400 text-lg font-semibold">
            📍 Eastern Cape, South Africa | 📞 +27 43 123 4567 | ✉️
            hello@farmfresh.co.za
          </p>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-75"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-800 shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-2xl font-black text-white">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-700 rounded-xl text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center py-8 text-lg">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 bg-gray-700 p-4 rounded-xl"
                      >
                        <img
                          src={getProductImage(item)}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-white">{item.name}</h3>
                          <p className="text-sm text-gray-300">
                            R{item.price} {item.unit}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-lg flex items-center justify-center text-white font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-white font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-lg flex items-center justify-center text-white font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-700 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold text-white">Total:</span>
                    <span className="text-3xl font-black text-green-400">
                      R{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-xl text-lg transition-colors">
                    CHECKOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
