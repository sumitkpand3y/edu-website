"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  X,
  Plus,
  Minus,
  Star,
  Clock,
  Users,
  BookOpen,
  ArrowLeft,
  Trash2,
  CreditCard,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  getCartItems,
  updateCartQuantity,
  removeFromCart,
} from "@/utils/cartApi";
import { useQuery } from "@tanstack/react-query";

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock cart data - replace with your actual cart state management
  const {
    data: cartItems = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["cartItems", user?.id],
    queryFn: () => getCartItems(user.id),
    enabled: !!user?.id,
  });

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalSavings = originalTotal - subtotal;
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0;
  const finalTotal = subtotal - promoDiscount;

  // const fetchCart = useCallback(async () => {
  //   if (!user?.id) return;
  //   try {
  //     setLoading(true);
  //     const items = await getCartItems(user.id);
  //     setCartItems(items);
  //   } catch (err) {
  //     console.error("Failed to load cart:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [user?.id]);

  // useEffect(() => {
  //   fetchCart();
  // }, [fetchCart]);

  // ✅ Update quantity
  const updateQuantity = async (courseId: string, quantity: number) => {
    try {
      await updateCartQuantity({ userId: user.id, courseId, quantity });
      refetch(); // refresh data from server
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const removeFromCarts = async (courseId: string) => {
    try {
      await removeFromCart({ userId: user.id, courseId });
      refetch(); // refresh data from server
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const toggleWishlist = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item
      )
    );
  };

  const applyPromoCode = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "save10") {
        setAppliedPromo({ code: promoCode, discount: 0.1 });
        setPromoCode("");
      } else {
        alert("Invalid promo code");
      }
      setIsLoading(false);
    }, 1000);
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=checkout");
    } else {
      router.push("/checkout");
    }
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any courses to your cart yet.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              Shopping Cart ({cartItems.length}{" "}
              {cartItems.length === 1 ? "course" : "courses"})
            </h1>
          </div>
          <button
            onClick={handleContinueShopping}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Course Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => toggleWishlist(item.id)}
                          className={`p-2 rounded-full ${
                            item.isWishlisted
                              ? "bg-red-500 text-white"
                              : "bg-white text-gray-600 hover:text-red-500"
                          }`}
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          by {item.instructor}
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCarts(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Course Stats */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-medium">{item.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{item?.students?.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        <span>{item.lessons} lessons</span>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {item.level}
                      </span>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-gray-100 rounded-l-lg"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-gray-100 rounded-r-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{item.price}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-lg text-gray-500 line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                        {item.originalPrice > item.price && (
                          <span className="text-green-600 text-sm font-medium">
                            Save ₹{item.originalPrice - item.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!!appliedPromo}
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={!promoCode || !!appliedPromo || isLoading}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "..." : "Apply"}
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-sm text-green-600">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>Code "{appliedPromo.code}" applied</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Course Savings</span>
                    <span>-₹{totalSavings}</span>
                  </div>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-₹{promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-4"
              >
                <CreditCard className="inline w-5 h-5 mr-2" />
                {user ? "Proceed to Checkout" : "Login to Purchase"}
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-2" />
                <span>Secure 256-bit SSL encryption</span>
              </div>

              {/* Money Back Guarantee */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="font-medium">
                    30-day money-back guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
