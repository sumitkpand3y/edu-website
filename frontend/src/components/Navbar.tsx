"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  BookOpen,
  LogOut,
  Settings,
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getCartItems } from "@/utils/cartApi";
import { useQuery } from "@tanstack/react-query";
import { useCourses } from "@/hooks/useCourses";

import { useGlobalAuthPopup } from "@/contexts/AuthPopupContext";



export function Navbar() {

  const { openLogin, openSignup } = useGlobalAuthPopup();
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef(null);
  const programsRef = useRef(null);
  const userMenuRef = useRef(null);
  const cartRef = useRef(null);

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { user, logout } = useAuth();
  const { courses } = useCourses();

  // Cart data
  const { data: cartItems = [] } = useQuery({
    queryKey: ["cartItems", user?.id],
    queryFn: () => getCartItems(user.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60,
  });

  const isActive = (href) => pathname === href;


  const handleProtectedAction = () => {
    if (!user) {
      // Show login popup if not authenticated
      openLogin();
    } else {
      // Proceed with the protected action
      console.log("Accessing protected feature...");
      // Your protected action here
    }
  };

  // Search functionality
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Filter courses based on search query
      const filteredCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase())
        // ||
        // (course.tags && course.tags.some(tag =>
        //   tag.toLowerCase().includes(query.toLowerCase())
        // ))
      );
      setSearchResults(filteredCourses.slice(0, 5)); // Limit to 5 results
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, courses]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (programsRef.current && !programsRef.current.contains(event.target)) {
        setProgramsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setProgramsOpen(false);
    setIsUserMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsUserMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const removeFromCart = (courseId) => {
    // Implementation for removing from cart
    console.log("Remove from cart:", courseId);
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

  const handleSearchResultClick = (course) => {
    router.push(`/course/${course.slug}`);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <>
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.2s ease-out forwards;
        }

        .medical-gradient {
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
        }

        .medical-shadow {
          box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.1),
            0 2px 4px -1px rgba(14, 165, 233, 0.06);
        }

        .hover-lift {
          transition: all 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.15);
        }

        .search-glow {
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .medical-bg {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
      `}</style>

      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-cyan-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 hover-lift rounded-lg px-2 py-1 transition-all duration-300"
            >
              <Image
                src="https://asterhealthacademy.com/wp-content/uploads/2023/07/Logo-599x231.png"
                alt="Aster Health Academy"
                width={150}
                height={40}
                className="h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <AnimatedLink href="/" isActive={isActive("/")}>
                Home
              </AnimatedLink>
              <AnimatedLink href="/about" isActive={isActive("/about")}>
                About
              </AnimatedLink>

              {/* Programs Dropdown */}
              <div className="relative" ref={programsRef}>
                <button
                  onClick={() => setProgramsOpen(!programsOpen)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    pathname.startsWith("/courses")
                      ? "text-cyan-600 bg-cyan-50"
                      : "text-slate-700 hover:text-cyan-600 hover:bg-cyan-50"
                  }`}
                >
                  Programs
                  <ChevronDown
                    className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                      programsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {programsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-cyan-100 rounded-xl shadow-xl py-3 z-50 animate-scale-in medical-shadow">
                    <AnimatedDropdownLink
                      href="/courses/popular"
                      isActive={isActive("/courses/popular")}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3"></div>
                        Popular Courses
                      </div>
                    </AnimatedDropdownLink>
                    <AnimatedDropdownLink
                      href="/courses/clinical"
                      isActive={isActive("/courses/clinical")}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full mr-3"></div>
                        Clinical Courses
                      </div>
                    </AnimatedDropdownLink>
                    <AnimatedDropdownLink
                      href="/courses/management"
                      isActive={isActive("/courses/management")}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-3"></div>
                        Management Courses
                      </div>
                    </AnimatedDropdownLink>
                    <AnimatedDropdownLink
                      href="/courses/practice-excellence"
                      isActive={isActive("/courses/practice-excellence")}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                        Healthcare Practice Excellence
                      </div>
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
              <AnimatedLink href="/career" isActive={isActive("/career")}>
                Career
              </AnimatedLink>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 ">
              {/* Search */}
              <div className="relative hidden md:block" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-lg text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-300 hover-lift"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-cyan-100 rounded-xl shadow-xl py-4 z-50 animate-scale-in medical-shadow">
                    <form onSubmit={handleSearchSubmit} className="px-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search courses, topics, or instructors..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent search-glow transition-all duration-300"
                          autoFocus
                        />
                      </div>
                    </form>

                    {/* Search Results */}
                    {searchQuery && (
                      <div className="mt-4 max-h-64 overflow-y-auto">
                        {isSearching ? (
                          <div className="px-4 py-3 text-center text-slate-500">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500 mx-auto"></div>
                            <p className="mt-2">Searching...</p>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <>
                            <div className="px-4 pb-2 text-sm font-medium text-slate-600 border-b border-slate-100">
                              Found {searchResults.length} courses
                            </div>
                            {searchResults.map((course) => (
                              <button
                                key={course.id}
                                onClick={() => handleSearchResultClick(course)}
                                className="w-full px-4 py-3 text-left hover:bg-cyan-50 transition-colors duration-200 border-b border-slate-50 last:border-b-0"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-slate-900 text-sm">
                                      {course.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                                      {course.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </>
                        ) : (
                          <div className="px-4 py-3 text-center text-slate-500">
                            <p>No courses found for "{searchQuery}"</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {user ? (
                <>
                  {/* Shopping Cart Link */}
                  <Link
                    href="/cart"
                    className="p-3 rounded-lg hidden md:block text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-300 hover-lift relative"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>

                  {/* User Menu */}
                  <div className="relative hidden md:block" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 p-1 rounded-lg text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-300 hover-lift"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium hidden md:block">
                        {user.firstName}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-cyan-100 py-2 animate-scale-in medical-shadow">
                        <Link
                          href="/dashboard"
                          className="flex items-center px-4 py-2 text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <BookOpen className="inline h-4 w-4 mr-3" />
                          Dashboard
                        </Link>
                        {user.role === "ADMIN" && (
                          <Link
                            href="/admin/courses"
                            className="flex items-center px-4 py-2 text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="inline h-4 w-4 mr-3" />
                            Admin Panel
                          </Link>
                        )}
                        <hr className="my-2 border-slate-100" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                        >
                          <LogOut className="inline h-4 w-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                   onClick={openLogin}
                    className="px-4 py-2 rounded-lg text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-300 font-medium"
                  >
                    Login
                  </button>
                  <Link
                    href="/register"
                    className="px-4 py-2 medical-gradient text-white rounded-lg hover:opacity-90 transition-all duration-300 font-medium hover-lift"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-cyan-50 transition-all duration-300"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-slate-700" />
                ) : (
                  <Menu className="h-6 w-6 text-slate-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-cyan-100 animate-slide-down">
              <div className="flex flex-col space-y-2">
                {/* Mobile Search */}
                <div className="px-4 pb-4 border-b border-slate-100">
                  <div className="flex">
                    <div>
                      <form onSubmit={handleSearchSubmit} className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 search-glow transition-all duration-300"
                        />
                      </form>
                    </div>
                    <div>
                      <MobileNavLink
                        href="/cart"
                        onClick={() => setIsOpen(false)}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        {cartItems.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItems.length}
                          </span>
                        )}
                      </MobileNavLink>
                    </div>
                  </div>

                  {/* Mobile Search Results */}
                  {searchQuery && searchResults.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {searchResults.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleSearchResultClick(course)}
                          className="w-full p-3 text-left bg-white border border-slate-200 rounded-lg hover:bg-cyan-50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900 text-sm">
                                {course.title}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-1 px-4">
                  <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
                    About
                  </MobileNavLink>
                  <MobileNavLink
                    href="/courses"
                    onClick={() => setIsOpen(false)}
                  >
                    Programs
                  </MobileNavLink>
                  <MobileNavLink
                    href="/partners"
                    onClick={() => setIsOpen(false)}
                  >
                    Partners
                  </MobileNavLink>
                  <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>
                    Blog
                  </MobileNavLink>
                  <MobileNavLink
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </MobileNavLink>
                </div>

                {/* Mobile User Menu */}
                {user ? (
                  <div className="px-4 pt-4 border-t border-slate-100 space-y-3">
                    <MobileNavLink
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                    >
                      <BookOpen className="h-4 w-4 mr-3" />
                      Dashboard
                    </MobileNavLink>
                    {user.role === "ADMIN" && (
                      <MobileNavLink
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Admin Panel
                      </MobileNavLink>
                    )}

                    {/* <Link
                      href="/cart"
                      className="p-2 rounded-lg text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-300 hover-lift relative"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )} Cart
                    </Link> */}

                    {/* <MobileNavLink
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </MobileNavLink> */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-300 font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="px-4 pt-4 border-t border-slate-100 space-y-3">
                    <Link
                      href="/login"
                      className="block w-full px-4 py-3 text-center text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-all duration-300 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full px-4 py-3 text-center medical-gradient text-white rounded-lg hover:opacity-90 transition-all duration-300 font-medium"
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
    </>
  );
}

// Animated Link Component
function AnimatedLink({ href, children, isActive }) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover-lift ${
        isActive
          ? "text-cyan-600 bg-cyan-50"
          : "text-slate-700 hover:text-cyan-600 hover:bg-cyan-50"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-600 rounded-full animate-pulse"></span>
      )}
    </Link>
  );
}

// Animated Dropdown Link Component
function AnimatedDropdownLink({ href, children, isActive }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-3 text-sm transition-all duration-300 hover-lift ${
        isActive
          ? "bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 border-l-4 border-cyan-500"
          : "text-slate-700 hover:bg-cyan-50 hover:text-cyan-600"
      }`}
    >
      {children}
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-3 text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-all duration-300 font-medium relative"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
