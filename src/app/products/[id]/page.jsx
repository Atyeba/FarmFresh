import { ShoppingCart, ArrowLeft, Leaf, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ProductPage({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Fetch single product
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    },
  });

  // Fetch all products for related items
  const { data: allProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success(`Added another ${product.name} to cart!`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item,
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const getProductImage = (product) => {
    // Map products to real images
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-2xl text-green-700">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-red-600 mb-4">Product not found</div>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 font-inter">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-green-600" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-green-800">
                  Agri-Connect
                </span>
              </div>
            </button>

            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-green-700" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img
                src={getProductImage(product)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-green-600 font-semibold mb-2 uppercase tracking-wide">
                {product.category}
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-green-700">
                R{product.price}
              </span>
              <span className="text-lg text-gray-500">{product.unit}</span>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-semibold">
                  {product.stock_quantity} units in stock
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.min(product.stock_quantity, quantity + 1),
                      )
                    }
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setShowCart(true);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Farm Info */}
            <div className="bg-gradient-to-r from-green-100 to-yellow-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                🌾 From Our Farm
              </h3>
              <p className="text-gray-600">
                Fresh from our family-run farm in the Eastern Cape, South
                Africa. Sustainably grown and ethically produced since 1995.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              More {product.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/products/${relatedProduct.id}`)
                  }
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={getProductImage(relatedProduct)}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-700">
                        R{relatedProduct.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {relatedProduct.unit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cart Sidebar - Same as homepage */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                      >
                        <img
                          src={getProductImage(item)}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            R{item.price} {item.unit}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-green-700">
                      R
                      {cart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                    Checkout
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
