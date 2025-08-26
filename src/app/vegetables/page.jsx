import { ShoppingCart, ArrowLeft, Sprout, Plus, Minus, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function VegetablesPage() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Fetch vegetables from backend
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["vegetables"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const allProducts = await response.json();
      return allProducts.filter((product) => product.category === "vegetables");
    },
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success(`Added another ${product.name} to cart!`, {
          style: {
            background: "#1f2937",
            color: "#ffffff",
            border: "1px solid #374151",
          },
        });
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      toast.success(`${product.name} added to cart!`, {
        style: {
          background: "#1f2937",
          color: "#ffffff",
          border: "1px solid #374151",
        },
      });
      return [...prev, { ...product, quantity: 1 }];
    });
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

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getProductImage = (product) => {
    const imageMap = {
      Tomato:
        "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&h=400&fit=crop",
      Carrot:
        "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600&h=400&fit=crop",
      Potato:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=400&fit=crop",
    };
    return (
      imageMap[product?.name] ||
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-3xl text-green-400 font-black">
          Loading fresh vegetables...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-inter">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center space-x-4 hover:bg-gray-700 p-3 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-green-400" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-white">
                  FarmFresh
                </span>
              </div>
            </button>

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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=600&fit=crop"
            alt="Fresh vegetables"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-7xl md:text-8xl font-black text-white mb-6">
            VEGETABLES
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 font-bold max-w-3xl mx-auto">
            Crisp, fresh, and nutrient-rich garden selections harvested daily
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-700 rounded-2xl overflow-hidden shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className="h-64 overflow-hidden cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/products/${product.id}`)
                  }
                >
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-2xl font-black text-white mb-3 cursor-pointer hover:text-green-400 transition-colors"
                    onClick={() =>
                      (window.location.href = `/products/${product.id}`)
                    }
                  >
                    {product.name}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-green-400">
                      R{product.price}
                    </span>
                    <span className="text-gray-400 font-semibold">
                      {product.unit}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-green-600 hover:bg-green-500 text-white font-black py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                      ADD TO CART
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `/products/${product.id}`)
                      }
                      className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-black py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                            <Minus className="w-4 h-4" />
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
                            <Plus className="w-4 h-4" />
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

      <style jsx global>{`
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}
