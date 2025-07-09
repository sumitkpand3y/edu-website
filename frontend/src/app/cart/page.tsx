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
  Tag,
  Sparkles,
  Gift,
  Lock,
  Award,
  TrendingUp,
  Zap,
  ShoppingBag,
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
  const [animatingItems, setAnimatingItems] = useState(new Set());

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

  // ✅ Update quantity with animation
  const updateQuantity = async (courseId: string, quantity: number) => {
    setAnimatingItems(prev => new Set(prev).add(courseId));
    try {
      await updateCartQuantity({ userId: user.id, courseId, quantity });
      refetch();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    } finally {
      setTimeout(() => {
        setAnimatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          return newSet;
        });
      }, 300);
    }
  };

  const removeFromCarts = async (courseId: string) => {
    setAnimatingItems(prev => new Set(prev).add(courseId));
    try {
      await removeFromCart({ userId: user.id, courseId });
      refetch();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded-lg w-64 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 bg-slate-200 rounded-xl"></div>
                      <div className="flex-1 space-y-4">
                        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                        <div className="h-8 bg-slate-200 rounded w-32"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="h-6 bg-slate-200 rounded w-32 mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-10 bg-slate-200 rounded-lg"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-12 bg-slate-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 scale-150"></div>
              <div className="relative bg-white rounded-full p-8 shadow-2xl mx-auto w-32 h-32 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-4">
              Your Learning Journey Awaits
            </h2>
            <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
              Discover amazing courses and start building your skills today. Your cart is ready for new adventures!
            </p>
            <button
              onClick={handleContinueShopping}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Explore Courses
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Shopping Cart
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                {cartItems.length} {cartItems.length === 1 ? "course" : "courses"} ready for checkout
              </p>
            </div>
          </div>
          <button
            onClick={handleContinueShopping}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center group"
          >
            <TrendingUp className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  animatingItems.has(item.id) ? 'scale-95 opacity-50' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Enhanced Course Image */}
                  <div className="flex-shrink-0 relative group">
                    <div className="relative w-full lg:w-56 h-36 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => toggleWishlist(item.id)}
                          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                            item.isWishlisted
                              ? "bg-red-500 text-white shadow-lg"
                              : "bg-white/80 text-slate-600 hover:text-red-500 hover:bg-white"
                          }`}
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        {item.originalPrice > item.price && (
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            <Tag className="w-3 h-3 inline mr-1" />
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Course Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 mb-2 flex items-center">
                          <Award className="w-4 h-4 mr-1 text-blue-500" />
                          {item.instructor}
                        </p>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCarts(item.id)}
                        className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all duration-200 group"
                      >
                        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>

                    {/* Enhanced Course Stats */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center text-sm text-slate-600 bg-yellow-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{item.rating}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 bg-blue-50 px-3 py-1 rounded-full">
                        <Users className="w-4 h-4 text-blue-500 mr-1" />
                        <span>{item?.students?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 bg-green-50 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4 text-green-500 mr-1" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 bg-purple-50 px-3 py-1 rounded-full">
                        <BookOpen className="w-4 h-4 text-purple-500 mr-1" />
                        <span>{item.lessons} lessons</span>
                      </div>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {item.level}
                      </span>
                    </div>

                    {/* Enhanced Price and Quantity */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-3 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-3 bg-slate-50 border-x-2 border-slate-200 font-semibold min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-3 hover:bg-slate-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-2 mb-1">
                          <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-lg text-slate-400 line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString()}
                            </span>
                          )}
                        </div>
                        {item.originalPrice > item.price && (
                          <div className="flex items-center justify-end">
                            <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                              <Zap className="w-3 h-3 inline mr-1" />
                              Save ₹{((item.originalPrice - item.price) * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-8">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
              </div>

              {/* Enhanced Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  <Gift className="w-4 h-4 inline mr-2" />
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={!!appliedPromo}
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={!promoCode || !!appliedPromo || isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-xl hover:from-slate-200 hover:to-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-3 flex items-center justify-between text-sm bg-green-50 p-3 rounded-xl border-2 border-green-200">
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Code "{appliedPromo.code}" applied!</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Enhanced Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600 bg-green-50 p-3 rounded-xl">
                    <span className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Course Savings
                    </span>
                    <span className="font-semibold">-₹{totalSavings.toLocaleString()}</span>
                  </div>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600 bg-green-50 p-3 rounded-xl">
                    <span className="flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      Promo Discount
                    </span>
                    <span className="font-semibold">-₹{promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t-2 border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-900">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ₹{finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold mb-4 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <CreditCard className="inline w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {user ? "Proceed to Checkout" : "Login to Purchase"}
              </button>

              {/* Enhanced Security Features */}
              <div className="space-y-3">
                <div className="flex items-center justify-center text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-center text-sm text-green-800 mb-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="font-semibold">30-day money-back guarantee</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Learn with confidence. Full refund if you're not satisfied.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center text-sm text-blue-800 mb-2">
                    <Lock className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Lifetime access included</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Access your courses anytime, anywhere, forever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}