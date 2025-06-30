"use client";
// pages/index.js - Homepage Component
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCartActions } from "@/hooks/useCartActions";
import { useAuth } from "@/hooks/useAuth";
import { getAllCourses } from "@/hooks/courseApi"; // Adjust the import path as needed
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "@/utils/cartApi";
import { Minus, Plus } from "lucide-react";

const Homepage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // const { addToCart } = useCartActions(userId || "");
  const handleAddToCart = async (courseId: string) => {
    try {
      await addToCart({ userId: user.id, courseId });

      // ✅ Refetch the cart icon data
      queryClient.invalidateQueries({ queryKey: ["cartItems", user.id] });

      // 🔔 Optional: Show success toast
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const [data, setData] = useState({
    popularCourses: [],
    clinicalCourses: [],
    managementCourses: [],
    certificationCourses: [],
    testimonials: [],
  });

  const [loading, setLoading] = useState(true);
  // const [cart, setCart] = useState<(Course & { quantity: number })[]>([]);
  const { data: cartItems = [] } = useQuery({
    queryKey: ["cartItems", user?.id],
    queryFn: () => getCartItems(user.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60, // 1 min cache
  });
  const [likedCourses, setLikedCourses] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await getAllCourses();

        const clinicalCourses = result.courses.filter(
          (course) => course.category === "clinical"
        );

        const managementCourses = result.courses.filter(
          (course) => course.category === "management"
        );

        const certificationCourses = result.courses.filter(
          (course) => (course) => course.category === "practice-excellence"
        );

        const popularCourses = result.courses
          .filter((course) => course.rating >= 4.5)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6); // top 6 popular ones

        // Later you can fetch testimonials separately if needed
        setData({
          clinicalCourses,
          managementCourses,
          certificationCourses,
          popularCourses,
          testimonials: [], // or fetch and set separately
        });
      } catch (err) {
        console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const updateQuantity = async (courseId: string, quantity: number) => {
    try {
      if (quantity < 1) {
        // 👋 Remove item if quantity is zero or less
        await removeFromCart({ userId: user.id, courseId });
      } else {
        // ✅ Update item quantity
        await updateCartQuantity({ userId: user.id, courseId, quantity });
      }

      // 🔄 Refetch cart data so UI updates
      queryClient.invalidateQueries({ queryKey: ["cartItems", user.id] });
    } catch (err) {
      console.error("Failed to update quantity or remove item:", err);
    }
  };

  type Course = {
    id: number;
    title: string;
    slug: string;
    provider: string;
    duration: string;
    level: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    shortDescription: string;
    tags: string[];
    enrolledStudents: number;
    featured: boolean;
  };

  // Cart functions
  // const addToCart = (course: Course) => {
  // const existingItem = cart.find((item) => item.id === course.id);
  // if (existingItem) {
  //   setCart(
  //     cart.map((item) =>
  //       item.id === course.id
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     )
  //   );
  // } else {
  //   setCart([...cart, { ...course, quantity: 1 }]);
  // }
  // addToCart(course);
  // };

  // const removeFromCart = (courseId: number) => {
  //   setCart(cart.filter((item) => item.id !== courseId));
  // };

  // const updateCartQuantity = (courseId: number, quantity: number) => {
  //   if (quantity <= 0) {
  //     removeFromCart(courseId);
  //   } else {
  //     setCart(
  //       cart.map((item) =>
  //         item.id === courseId ? { ...item, quantity } : item
  //       )
  //     );
  //   }
  // };

  // const getCartTotal = () => {
  //   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  // const getCartItemCount = () => {
  //   return cart.reduce((total, item) => total + item.quantity, 0);
  // };

  const toggleLike = (courseId: number) => {
    const newLikedCourses = new Set(likedCourses);
    if (newLikedCourses.has(courseId)) {
      newLikedCourses.delete(courseId);
    } else {
      newLikedCourses.add(courseId);
    }
    setLikedCourses(newLikedCourses);
  };

  // Filter functions
  const getAllCourse = () => {
    return [
      ...data.popularCourses,
      ...data.clinicalCourses,
      ...data.managementCourses,
      ...data.certificationCourses,
    ];
  };

  const getFilteredCourses = () => {
    let courses = getAllCourse();

    // Filter by category
    if (activeFilter !== "all") {
      courses = courses.filter(
        (course) => course.category.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      courses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by level
    if (selectedLevel !== "all") {
      courses = courses.filter(
        (course) => course.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    // Filter by price range
    courses = courses.filter(
      (course) =>
        course.price >= priceRange.min && course.price <= priceRange.max
    );

    return courses;
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      activeFilter !== "all" ||
      searchQuery !== "" ||
      selectedLevel !== "all" ||
      priceRange.min !== 0 ||
      priceRange.max !== 1000000
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
    setSelectedLevel("all");
    setPriceRange({ min: 0, max: 1000000 });
  };

  const CourseCard: React.FC<Props> = ({
    course,
    cartItems,
    handleAddToCart,
    updateQuantity,
  }) => {
    const itemInCart = cartItems.some((item) => item.id === course.id);
    const getCartQuantity = cartItems.find((item) => {
      return item.id === course.id;
    });
    const isLiked = likedCourses.has(course.id);

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <Image
            src={course.image}
            alt={course.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
              {course.category}
            </span>
          </div>
          <button
            onClick={() => toggleLike(course.id)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isLiked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{course.provider}</p>

          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(course.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">({course.reviews})</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <span className="mr-4">📚 {course.level}</span>
              <span>⏱️ {course.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="font-bold text-lg text-blue-600">
                ${course.price}
              </span>
              {course.originalPrice > course.price && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${course.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {itemInCart ? (
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() =>
                    updateQuantity(course.id, getCartQuantity.quantity - 1)
                  }
                  className="p-2 hover:bg-gray-100 rounded-l-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
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
                className=" w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                🛒 Add to Cart
              </button>
            )}
            <Link href={`/course/${course.slug}`}>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200"></div>
        <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );

  const CourseCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="flex items-center space-x-2">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  // No courses found component
  const NoCourses = () => (
    <div className="col-span-full text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No courses available
        </h3>
        <p className="text-gray-600 mb-6">
          No courses match your current filters. Try adjusting your search
          criteria.
        </p>
        <button
          onClick={clearFilters}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Loading... - Aster Health Academy</title>
        </Head>

        {/* Hero Section Skeleton */}
        <section className="bg-gradient-to-r from-blue-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
              </div>
              <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Courses Section Skeleton */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  const filteredCourses = getFilteredCourses();

  return (
    <>
      <Head>
        <title>
          Aster Health Academy - Empowering Healthcare with Best-in-Class
          Professional Education
        </title>
        <meta
          name="description"
          content="Leading healthcare education platform offering professional courses, certifications, and training programs for healthcare professionals."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.9)), url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-800/80"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-4xl lg:text-4xl font-bold mb-6 leading-tight">
                  Empowering healthcare with{" "}
                  <span className="text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded">
                    best-in-class
                  </span>{" "}
                  professional education
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Advance your healthcare career with our comprehensive courses,
                  certifications, and training programs designed by industry
                  experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Explore Programs
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                    Watch Demo
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop"
                    alt="Healthcare professionals"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {["all", "clinical", "management", "certification"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  )
                )}
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  🔍 Filters
                </button>
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: parseInt(e.target.value) || 10000,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Filtered Results Section - Shows when filters are active */}
        {hasActiveFilters() && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Search Results
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {filteredCourses.length} course(s) found
                    {activeFilter !== "all" && ` in ${activeFilter}`}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear Filters
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      cartItems={cartItems}
                      handleAddToCart={handleAddToCart}
                      updateQuantity={updateQuantity}
                    />
                  ))
                ) : (
                  <NoCourses />
                )}
              </div>
            </div>
          </section>
        )}

        {/* Show original sections only when no filters are active */}
        {!hasActiveFilters() && (
          <>
            {/* Popular Courses Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Popular Courses
                  </h2>
                  <Link
                    href="/courses/popular"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.popularCourses.length > 0 ? (
                    data.popularCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        cartItems={cartItems}
                        handleAddToCart={handleAddToCart}
                        updateQuantity={updateQuantity}
                      />
                    ))
                  ) : (
                    <NoCourses />
                  )}
                </div>
              </div>
            </section>

            {/* Clinical Courses Section */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Clinical Courses
                  </h2>
                  <Link
                    href="/courses/clinical"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.clinicalCourses.length > 0 ? (
                    data.clinicalCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        cartItems={cartItems}
                        handleAddToCart={handleAddToCart}
                        updateQuantity={updateQuantity}
                      />
                    ))
                  ) : (
                    <NoCourses />
                  )}
                </div>
              </div>
            </section>

            {/* Management Courses Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Management Courses
                  </h2>
                  <Link
                    href="/courses/management"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.managementCourses.length > 0 ? (
                    data.managementCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        cartItems={cartItems}
                        handleAddToCart={handleAddToCart}
                        updateQuantity={updateQuantity}
                      />
                    ))
                  ) : (
                    <NoCourses />
                  )}
                </div>
              </div>
            </section>

            {/* Healthcare Practice Excellence Section */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Healthcare Practice Excellence
                  </h2>
                  <Link
                    href="/courses/certifications"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.certificationCourses.length > 0 ? (
                    data.certificationCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        cartItems={cartItems}
                        handleAddToCart={handleAddToCart}
                        updateQuantity={updateQuantity}
                      />
                    ))
                  ) : (
                    <NoCourses />
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Skills Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Here are skills that can help you grow in your role
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              We offer an exceptional industry first learning experience with
              the best academics and healthcare specialists training you in
              Managerial and Clinical leadership. First set of courses live, and
              plenty more in the works.
            </p>
            <Link href="/courses/all">
              <button className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors">
                View Courses
              </button>
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Students Say
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of healthcare professionals who have advanced
                their careers with us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;
