"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  BookOpen,
  LogOut,
  Settings,
  GraduationCap,
  Search,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const isActive = (href) => pathname === href;

  const router = useRouter();
  const [programsOpen, setProgramsOpen] = useState(false);

  // Mock cart data - replace with your actual cart state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Advanced Clinical Skills",
      price: 299,
      image: "/course1.jpg",
    },
    {
      id: 2,
      title: "Healthcare Management",
      price: 199,
      image: "/course2.jpg",
    },
  ]);

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter((item) => item.id !== courseId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=checkout");
    } else {
      router.push("/checkout");
    }
    setIsCartOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="section-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://asterhealthacademy.com/wp-content/uploads/2023/07/Logo-599x231.png"
              alt="Aster Health Academy"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <AnimatedLink href="/" isActive={isActive("/")}>
              Home
            </AnimatedLink>
            <AnimatedLink href="/about" isActive={isActive("/about")}>
              About
            </AnimatedLink>

            <div className="relative">
              <button
                onClick={() => setProgramsOpen(!programsOpen)}
                className={`flex items-center font-medium transition-colors duration-200 ${
                  pathname.startsWith("/courses")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Programs <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              {programsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <AnimatedDropdownLink
                    href="/courses/popular"
                    isActive={isActive("/courses/popular")}
                  >
                    Popular Courses
                  </AnimatedDropdownLink>
                  <AnimatedDropdownLink
                    href="/courses/clinical"
                    isActive={isActive("/courses/clinical")}
                  >
                    Clinical Courses
                  </AnimatedDropdownLink>
                  <AnimatedDropdownLink
                    href="/courses/management"
                    isActive={isActive("/courses/management")}
                  >
                    Management Courses
                  </AnimatedDropdownLink>
                  <AnimatedDropdownLink
                    href="/courses/practice-excellence"
                    isActive={isActive("/courses/practice-excellence")}
                  >
                    Healthcare Practice Excellence
                  </AnimatedDropdownLink>
                </div>
              )}
            </div>

            <AnimatedLink href="/partners" isActive={isActive("/partners")}>
              Partners
            </AnimatedLink>
            <AnimatedLink href="/blog" isActive={isActive("/blog")}>
              Blog
            </AnimatedLink>
            <AnimatedLink href="/contact" isActive={isActive("/contact")}>
              Contact
            </AnimatedLink>

            {user ? (
              <div className="flex items-center space-x-4">
               {/* Search Icon */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-gray-700 hover:text-blue-600 p-2"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Cart Icon */}
                <div className="relative">
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="text-gray-700 hover:text-blue-600 p-2 relative"
                  >
                    <Heart className="w-5 h-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </button>

                  {/* Cart Dropdown */}
                  {isCartOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">
                          Selected Courses ({cartItems.length})
                        </h3>
                      </div>
                      {cartItems.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No courses selected
                        </div>
                      ) : (
                        <>
                          <div className="max-h-48 overflow-y-auto">
                            {cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="p-4 border-b border-gray-100 flex items-center space-x-3"
                              >
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <BookOpen className="w-6 h-6 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm text-gray-900">
                                    {item.title}
                                  </h4>
                                  <p className="text-blue-600 font-semibold">
                                    ${item.price}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-semibold text-gray-900">
                                Total: ${getTotalPrice()}
                              </span>
                            </div>
                            <button
                              onClick={handleCheckout}
                              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {user
                                ? "Proceed to Checkout"
                                : "Login to Purchase"}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Link
                    href="/cart"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    <button className="text-gray-700 hover:text-blue-600 p-2 relative">
                      <ShoppingCart className="w-5 h-5" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </button>
                  </Link>
                </div>
                <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="h-5 w-5" />
                  <span>{user.firstName}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BookOpen className="inline h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin/courses"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="inline h-4 w-4 mr-2" />
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="inline h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
              </div>

            ) : (
              <div className="flex items-center space-x-4">

                {/* Login Button */}
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <button className="text-gray-700 hover:text-blue-600 p-2">
                    <User className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Search Bar (appears below main nav when opened) */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4">
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses, topics, or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="border-b border-gray-200 pb-4">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center space-x-2"
                >
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Mobile Cart */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">
                    Selected Courses
                  </span>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-gray-700" />
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  </div>
                </div>
                {cartItems.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{item.title}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600 font-semibold">
                            ${item.price}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">
                          Total: ${getTotalPrice()}
                        </span>
                        <button
                          onClick={handleCheckout}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          {user ? "Checkout" : "Login to Buy"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/programs"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Programs
              </Link>
              <Link
                href="/partners"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Partners
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <div className="flex flex-col space-y-3 pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-900 font-medium">
                    <User className="h-5 w-5" />
                    <span>{user.firstName}</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 pl-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 pl-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 pl-2 text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-2 border-t border-gray-200">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn-primary text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function AnimatedLink({ href, children, isActive }) {
  return (
    <Link
      href={href}
      className={`relative transition-colors font-medium ${
        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded animate-slide-in"></span>
      )}
    </Link>
  );
}

function AnimatedDropdownLink({ href, children, isActive }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 text-sm transition-colors ${
        isActive
          ? "bg-blue-100 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
