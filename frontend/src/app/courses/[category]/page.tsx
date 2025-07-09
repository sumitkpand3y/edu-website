"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Clock,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Minus,
  PlayCircle,
  Plus,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import { useCourses, Course } from "@/hooks/useCourses"; // Import your real hook
import { CourseQueryParams } from "@/services/course.service";
import Link from "next/link";

import {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "@/utils/cartApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const CoursesPage = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<CourseQueryParams>({
    category: "",
    level: "",
    search: "",
    sortBy: "popular",
    limit: 8,
    page: 1,
  });

  const queryClient = useQueryClient();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [likedCourses, setLikedCourses] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);

  // Use your real hook with current filters
  const {
    courses,
    loading,
    error,
    pagination,
    goToPage,
    nextPage,
    previousPage,
    changeItemsPerPage,
    refetch,
  } = useCourses(filters);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = [
    { value: "", label: "All Categories" },
    { value: "clinical", label: "Clinical Excellence" },
    { value: "management", label: "Healthcare Management" },
    { value: "popular", label: "Nursing & Care" },
    { value: "practice-excellence", label: "Emergency Medicine" },
  ];

  const levels = [
    { value: "", label: "All Levels" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Expert", label: "Expert" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  // Handle filter changes and trigger API call
  const handleFilterChange = (
    key: keyof CourseQueryParams,
    value: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handleAddToCart = async (courseId: string) => {
    console.log("user.id", user.id, courseId);

    try {
      await addToCart({ userId: user.id, courseId });
      queryClient.invalidateQueries({ queryKey: ["cartItems", user.id] });
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cartItems", user?.id],
    queryFn: () => getCartItems(user.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60, // 1 min cache
  });

  const updateQuantity = async (courseId: string, quantity: number) => {
    try {
      if (quantity < 1) {
        await removeFromCart({ userId: user.id, courseId });
      } else {
        await updateCartQuantity({ userId: user.id, courseId, quantity });
      }
      queryClient.invalidateQueries({ queryKey: ["cartItems", user.id] });
    } catch (err) {
      console.error("Failed to update quantity or remove item:", err);
    }
  };

  // Handle search with debounce
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    handleFilterChange("search", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleViewAll = () => {
    setShowAllCourses(true);
    setFilters((prev) => ({ ...prev, limit: pagination.totalItems }));
  };

  const handleViewLess = () => {
    setShowAllCourses(false);
    setFilters((prev) => ({ ...prev, limit: 8, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      level: "",
      search: "",
      sortBy: "popular",
      limit: 8,
      page: 1,
    });
    setSearchTerm("");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleLike = (courseId: string) => {
    const newLikedCourses = new Set(likedCourses);
    if (newLikedCourses.has(courseId)) {
      newLikedCourses.delete(courseId);
    } else {
      newLikedCourses.add(courseId);
    }
    setLikedCourses(newLikedCourses);
  };

  const CourseCard: React.FC<{
    course: Course;
    cartItems: any[];
    handleAddToCart: (courseId: string) => void;
    updateQuantity: (courseId: string, quantity: number) => void;
  }> = ({ course, cartItems, handleAddToCart, updateQuantity }) => {
    const itemInCart = cartItems.some((item) => item.id === course.id);
    const getCartQuantity = cartItems.find((item) => item.id === course.id);
    const isLiked = likedCourses.has(course.id);

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
        <div className="relative">
          <Image
            src={course.image}
            alt={course.title}
            width={300}
            height={200}
            className="w-full h-40 sm:h-48 md:h-52 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm">
              {course.category}
            </span>
          </div>
          <button
            onClick={() => toggleLike(course.id)}
            className={`absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full transition-colors ${
              isLiked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
            <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
              {course.level}
            </span>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <PlayCircle size={isMobile ? 32 : 48} className="text-white" />
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2 truncate">
            {course.provider}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                {course.rating}
              </span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-xs sm:text-sm text-gray-600 truncate">
              {course.reviews} reviews
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span className="hidden sm:inline">
                {course.enrolledStudents} students
              </span>
              <span className="sm:hidden">{course.enrolledStudents}</span>
            </div>
            {course.lessons && (
              <div className="flex items-center gap-1">
                <BookOpen size={12} />
                <span className="hidden sm:inline">
                  {course.lessons} lessons
                </span>
                <span className="sm:hidden">{course.lessons}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="font-bold text-lg text-blue-600">
                ₹{course.price}
              </span>
              {course.originalPrice > course.price && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{course.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {itemInCart ? (
              <div className="flex items-center border border-gray-300 rounded-lg flex-1 sm:flex-initial">
                <button
                  onClick={() =>
                    updateQuantity(course.id, getCartQuantity.quantity - 1)
                  }
                  className="p-2 hover:bg-gray-100 rounded-l-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300 text-center flex-1 sm:flex-initial">
                  {getCartQuantity.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(course.id, getCartQuantity.quantity + 1)
                  }
                  className="p-2 hover:bg-gray-100 rounded-r-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(course.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 flex-1 sm:flex-initial"
              >
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
                <ArrowRight size={16} />
              </button>
            )}
            <Link href={`/course/${course.slug}`}>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors flex-1 sm:flex-initial w-full sm:w-auto text-center">
                Preview
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const LoadingCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-pulse">
      <div className="h-40 sm:h-48 md:h-52 lg:h-48 bg-slate-200"></div>
      <div className="p-4 sm:p-6">
        <div className="h-6 bg-slate-200 rounded mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-slate-200 rounded w-24"></div>
          <div className="h-8 bg-slate-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Medical Courses
              </h1>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Advance your healthcare career with expert-led training programs
              </p>
            </div>

            <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-4">
              {/* View Mode Toggle - Hidden on mobile */}
              <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-slate-600 hover:text-teal-600"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-slate-600 hover:text-teal-600"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {/* Desktop Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="hidden sm:flex lg:hidden bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:col-span-1 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            {/* Mobile Filter Overlay */}
            {showFilters && (
              <div
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
            )}

            <div
              className={`
              ${
                showFilters
                  ? "fixed inset-y-0 left-0 w-80 max-w-[90vw] z-50 transform translate-x-0"
                  : "hidden"
              }
              lg:block lg:static lg:transform-none lg:w-auto lg:z-auto
              bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6
              lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] overflow-y-auto
              transition-transform duration-300 ease-in-out
            `}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-slate-800">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Search Courses
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by title, provider..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Difficulty Level
                </label>
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange("level", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  clearFilters();
                  setShowFilters(false);
                }}
                className="w-full bg-slate-100 text-slate-700 px-4 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Course Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
              <div className="text-center sm:text-left">
                <p className="text-slate-600 text-sm sm:text-base">
                  Showing{" "}
                  <span className="font-semibold text-slate-800">
                    {courses.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-800">
                    {pagination.totalItems}
                  </span>{" "}
                  courses
                </p>
                {!showAllCourses && pagination.totalItems > 8 && (
                  <button
                    onClick={handleViewAll}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm mt-1"
                  >
                    View All Courses
                  </button>
                )}
                {showAllCourses && (
                  <button
                    onClick={handleViewLess}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm mt-1"
                  >
                    View Less
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-end space-x-4">
                <span className="text-sm text-slate-600">Per page:</span>
                <select
                  value={pagination.itemsPerPage}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    changeItemsPerPage(value);
                    setFilters((prev) => ({ ...prev, limit: value, page: 1 }));
                  }}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                >
                  <option value={8}>8</option>
                  <option value={16}>16</option>
                  <option value={24}>24</option>
                </select>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 text-sm sm:text-base">
                      Error loading courses
                    </h3>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  </div>
                </div>
                <button
                  onClick={refetch}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, index) => (
                  <LoadingCard key={index} />
                ))}
              </div>
            )}

            {/* Course Cards */}
            {!loading && courses.length > 0 && (
              <>
                <div
                  className={`grid gap-4 sm:gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      cartItems={cartItems}
                      handleAddToCart={handleAddToCart}
                      updateQuantity={updateQuantity}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {!showAllCourses && pagination.totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          previousPage();
                          setFilters((prev) => ({
                            ...prev,
                            page: pagination.currentPage - 1,
                          }));
                        }}
                        disabled={!pagination.hasPreviousPage}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>

                      <div className="flex items-center space-x-2 mx-4">
                        {/* Show page numbers with ellipsis for large page counts */}
                        {pagination.totalPages <= 7 ? (
                          // Show all pages if total pages <= 7
                          [...Array(pagination.totalPages)].map((_, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                goToPage(index + 1);
                                setFilters((prev) => ({
                                  ...prev,
                                  page: index + 1,
                                }));
                              }}
                              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                pagination.currentPage === index + 1
                                  ? "bg-teal-600 text-white"
                                  : "text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              {index + 1}
                            </button>
                          ))
                        ) : (
                          // Show with ellipsis for large page counts
                          <>
                            {/* First page */}
                            <button
                              onClick={() => {
                                goToPage(1);
                                setFilters((prev) => ({ ...prev, page: 1 }));
                              }}
                              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                pagination.currentPage === 1
                                  ? "bg-teal-600 text-white"
                                  : "text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              1
                            </button>

                            {/* Ellipsis or pages near current */}
                            {pagination.currentPage > 3 && (
                              <span className="px-2">...</span>
                            )}

                            {/* Pages around current */}
                            {[...Array(3)].map((_, index) => {
                              const pageNum =
                                pagination.currentPage - 1 + index;
                              if (
                                pageNum > 1 &&
                                pageNum < pagination.totalPages
                              ) {
                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => {
                                      goToPage(pageNum);
                                      setFilters((prev) => ({
                                        ...prev,
                                        page: pageNum,
                                      }));
                                    }}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                      pagination.currentPage === pageNum
                                        ? "bg-teal-600 text-white"
                                        : "text-slate-600 hover:bg-slate-100"
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              }
                              return null;
                            })}

                            {/* Ellipsis or last page */}
                            {pagination.currentPage <
                              pagination.totalPages - 2 && (
                              <span className="px-2">...</span>
                            )}

                            {/* Last page */}
                            <button
                              onClick={() => {
                                goToPage(pagination.totalPages);
                                setFilters((prev) => ({
                                  ...prev,
                                  page: pagination.totalPages,
                                }));
                              }}
                              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                pagination.currentPage === pagination.totalPages
                                  ? "bg-teal-600 text-white"
                                  : "text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              {pagination.totalPages}
                            </button>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          nextPage();
                          setFilters((prev) => ({
                            ...prev,
                            page: pagination.currentPage + 1,
                          }));
                        }}
                        disabled={!pagination.hasNextPage}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* No Results */}
            {!loading && courses.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  No courses found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your search criteria or filters to find more
                  courses.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
