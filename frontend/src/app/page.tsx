"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useCourses } from "@/hooks/useCourses"; // Import the new hook
import { useQuery, useQueryClient } from "@tanstack/react-query";

import MedicalCaseDiscussions from "@/components/MedicalCaseDiscussions";
import {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "@/utils/cartApi";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Minus,
  Play,
  Plus,
  Shield,
  Star,
  Stethoscope,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const Homepage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPartnerSlide, setCurrentPartnerSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Use the new useCourses hook
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
  } = useCourses({
    category: activeCategory === "all" ? undefined : activeCategory,
    search: searchQuery || undefined,
    level: selectedLevel === "all" ? undefined : selectedLevel,
    minPrice: priceRange.min || undefined,
    maxPrice: priceRange.max || undefined,
    limit: 8, // Items per page
  });

  // Separate hooks for different sections
  const {
    courses: popularCourses,
    loading: popularLoading,
    pagination: popularPagination,
    nextPage: popularNextPage,
    previousPage: popularPreviousPage,
  } = useCourses({
    featured: true,
    limit: 4,
  });

  const {
    courses: clinicalCourses,
    loading: clinicalLoading,
    pagination: clinicalPagination,
    nextPage: clinicalNextPage,
    previousPage: clinicalPreviousPage,
  } = useCourses({
    category: "clinical",
    limit: 4,
  });

  const {
    courses: managementCourses,
    loading: managementLoading,
    pagination: managementPagination,
    nextPage: managementNextPage,
    previousPage: managementPreviousPage,
  } = useCourses({
    category: "management",
    limit: 4,
  });

  const {
    courses: certificationCourses,
    loading: certificationLoading,
    pagination: certificationPagination,
    nextPage: certificationNextPage,
    previousPage: certificationPreviousPage,
  } = useCourses({
    category: "practice-excellence",
    limit: 4,
  });

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

  const [likedCourses, setLikedCourses] = useState(new Set());

  const heroSlides = [
    {
      title: "Advanced AI-Powered Healthcare Solutions",
      subtitle:
        "Transforming patient care with intelligent diagnostic tools and seamless workflow integration",
      stats: [
        { icon: Activity, text: "99.7% Diagnostic Accuracy" },
        { icon: Users, text: "10,000+ Healthcare Professionals" },
        { icon: Shield, text: "HIPAA Compliant & Secure" },
      ],
      buttons: [
        { text: "Start Free Trial", primary: true },
        { text: "Watch Demo", primary: false },
      ],
      bgImage:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "Intelligent Patient Monitoring",
      subtitle:
        "Real-time AI analysis for proactive healthcare decisions and better patient outcomes",
      stats: [
        { icon: Heart, text: "24/7 Continuous Monitoring" },
        { icon: Brain, text: "AI-Driven Insights" },
        { icon: Zap, text: "Instant Alert System" },
      ],
      buttons: [
        { text: "Learn More", primary: true },
        { text: "Contact Sales", primary: false },
      ],
      bgImage:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "Seamless Electronic Health Records",
      subtitle:
        "Streamlined documentation and data management for enhanced clinical efficiency",
      stats: [
        { icon: Award, text: "Award-Winning Interface" },
        { icon: Shield, text: "Enterprise-Grade Security" },
        { icon: Users, text: "Multi-Specialty Support" },
      ],
      buttons: [
        { text: "Schedule Demo", primary: true },
        { text: "View Features", primary: false },
      ],
      bgImage:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop&crop=center",
    },
  ];

  const partners = [
    { name: "Microsoft", logo: "🏢", description: "Global technology leader" },
    {
      name: "Purdue University",
      logo: "🎓",
      description: "Top-ranked engineering school",
    },
    {
      name: "KPMG Academy",
      logo: "🏛️",
      description: "Professional services excellence",
    },
    {
      name: "Scaled Agile",
      logo: "📊",
      description: "Enterprise agility experts",
    },
    {
      name: "UC San Diego",
      logo: "🏫",
      description: "Leading research university",
    },
    { name: "IBM", logo: "💻", description: "AI and cloud innovation" },
    {
      name: "Amazon Web Services",
      logo: "☁️",
      description: "Cloud computing leader",
    },
    { name: "Google Cloud", logo: "🌐", description: "Cloud and AI platform" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsAnimating(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleSlideChange = (index) => {
    if (index !== currentSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  useEffect(() => {
    const partnerInterval = setInterval(() => {
      setCurrentPartnerSlide((prev) => (prev + 1) % partners.length);
    }, 3000);
    return () => clearInterval(partnerInterval);
  }, [partners.length]);

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

  type Course = {
    id: string;
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
    lessons?: number;
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

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      activeCategory !== "all" ||
      searchQuery !== "" ||
      selectedLevel !== "all" ||
      priceRange.min !== 0 ||
      priceRange.max !== 1000000
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setSelectedLevel("all");
    setPriceRange({ min: 0, max: 1000000 });
  };

  const CourseCard: React.FC<{
    course?: any;
    cartItems?: any[];
    handleAddToCart?: (courseId: string) => void;
    updateQuantity?: (courseId: string, quantity: number) => void;
  }> = ({
    course = sampleCourse,
    cartItems = [],
    handleAddToCart = () => {},
    updateQuantity = () => {},
  }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const itemInCart = cartItems.some((item) => item.id === course.id);
    const getCartQuantity = cartItems.find((item) => item.id === course.id);

    const toggleLike = (courseId: string) => {
      setIsLiked(!isLiked);
    };

    const discountPercentage = Math.round(
      ((course.originalPrice - course.price) / course.originalPrice) * 100
    );

    return (
      <div
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-blue-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            width={400}
            height={208}
            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
            style={{ width: "100%", height: "208px" }}
            priority={false}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {course.category}
            </span>
          </div>

          {/* Featured Badge */}
          {/* {course.featured && (
            <div className="absolute top-4 left-4 mt-8">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <Award size={12} />
                Featured
              </span>
            </div>
          )} */}

          {/* Discount Badge */}
          {/* {course.originalPrice > course.price && (
            <div className="absolute top-4 right-16">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                {discountPercentage}% OFF
              </span>
            </div>
          )} */}

          {/* Like Button */}
          <button
            onClick={() => toggleLike(course.id)}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 shadow-lg ${
              isLiked
                ? "bg-red-500 text-white hover:bg-red-600 scale-110"
                : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart size={16} className={isLiked ? "fill-current" : ""} />
          </button>

          {/* Level Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
              {course.level}
            </span>
          </div>

          {/* Play Button Overlay */}
          {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:scale-110 transition-transform duration-300">
              <PlayCircle size={48} className="text-white" />
            </div>
          </div> */}
        </div>

        {/* Content Section */}
        <div className="p-3">
          {/* Title and Provider */}
          <div className="mb-4">
            <h3 className="font-bold text-xl mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              {course.provider}
            </p>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="text-sm font-bold text-gray-900">
                {course.rating}
              </span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-600">
              {course.reviews} reviews
            </span>
            <div className="flex-1"></div>
            {course.certificate && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle size={14} />
                <span className="text-xs font-medium">Certificate</span>
              </div>
            )}
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-2 rounded-lg">
              <Clock size={14} className="text-blue-500" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-teal-50 p-2 rounded-lg">
              <Users size={14} className="text-teal-500" />
              <span>{course.enrolledStudents}</span>
            </div>
            {course.lessons && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-purple-50 p-2 rounded-lg">
                <BookOpen size={14} className="text-purple-500" />
                <span>{course.lessons} lessons</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-2 rounded-lg">
              <TrendingUp size={14} className="text-green-500" />
              <span>{course.difficulty}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                ₹{course.price.toLocaleString()}
              </span>
              {course.originalPrice > course.price && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{course.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {course.originalPrice > course.price && (
              <span className="text-xs text-green-600 font-semibold">
                Save ₹{(course.originalPrice - course.price).toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {itemInCart ? (
              <div className="flex items-center border-2 border-blue-200 rounded-xl bg-blue-50 flex-1">
                <button
                  onClick={() =>
                    updateQuantity(course.id, getCartQuantity.quantity - 1)
                  }
                  className="p-3 hover:bg-blue-100 rounded-l-xl transition-colors"
                >
                  <Minus className="w-4 h-4 text-blue-600" />
                </button>
                <span className="px-3 py-2 border-x-2 border-blue-200 flex-1 text-center font-semibold text-blue-600">
                  {getCartQuantity.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(course.id, getCartQuantity.quantity + 1)
                  }
                  className="p-3 hover:bg-blue-100 rounded-r-xl transition-colors"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(course.id)}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-2 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 text-sm font-semibold flex items-center gap-2 flex-1 justify-center transform hover:scale-105 shadow-lg"
              >
                Add to Cart <ArrowRight size={16} />
              </button>
            )}

             <Link href={`/course/${course.slug}`}>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors flex-1 sm:flex-initial w-full sm:w-auto text-center">
                Preview
              </button>
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Limited Time Offer</span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available Now
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaginatedCourseGrid = ({
    courses = [],
    loading = false,
    pagination,
    onPrevious,
    onNext,
    cartItems,
    handleAddToCart,
    updateQuantity,
    title = "",
  }: {
    courses: Course[];
    loading: boolean;
    pagination: any;
    onPrevious: () => void;
    onNext: () => void;
    cartItems: any[];
    handleAddToCart: (courseId: string) => void;
    updateQuantity: (courseId: string, quantity: number) => void;
    title?: string;
  }) => {
    if (loading) {
      return (
        <div className="flex items-center space-x-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
            {[...Array(4)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </div>
      );
    }

    if (courses.length === 0) {
      return <NoCourses />;
    }

    return (
      <div className="space-y-4">
        {title && (
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className="text-sm text-gray-500">
              Page {pagination.currentPage} of {pagination.totalPages} (
              {pagination.totalItems} total)
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {/* Left Arrow */}
          <button
            onClick={onPrevious}
            disabled={!pagination.hasPreviousPage}
            className={`p-2 rounded-full border ${
              !pagination.hasPreviousPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
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

          {/* Right Arrow */}
          <button
            onClick={onNext}
            disabled={!pagination.hasNextPage}
            className={`p-2 rounded-full border ${
              !pagination.hasNextPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const LoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <Stethoscope className="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <p className="text-gray-600 font-medium">
          Loading Medical Dashboard...
        </p>
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

  // Handle filter changes with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedLevel, priceRange, activeCategory]);

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
        {/* Hero Section with Auto-slide */}
        <section className="w-full overflow-hidden relative bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="grid grid-cols-12 gap-4 h-full animate-pulse">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-lg"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: "3s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating Medical Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-20 left-20 animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "4s" }}
            >
              <Heart className="h-8 w-8 text-red-300/30" />
            </div>
            <div
              className="absolute top-40 right-32 animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "5s" }}
            >
              <Stethoscope className="h-10 w-10 text-blue-300/30" />
            </div>
            <div
              className="absolute bottom-32 left-32 animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "6s" }}
            >
              <Brain className="h-12 w-12 text-purple-300/30" />
            </div>
            <div
              className="absolute bottom-20 right-20 animate-bounce"
              style={{ animationDelay: "3s", animationDuration: "4s" }}
            >
              <Activity className="h-6 w-6 text-green-300/30" />
            </div>
          </div>

          <div className="relative h-[100vh] min-h-[600px] max-h-[900px] sm:h-[80vh] md:h-[85vh] lg:h-[85vh] xl:h-[80vh] text-white">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  index === currentSlide && !isAnimating
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-0 scale-95 translate-x-8"
                }`}
              >
                <div className="flex items-center h-full">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <div className="flex-1 space-y-6">
                      {/* Title with Typewriter Effect */}
                      <div className="overflow-hidden">
                        <h1
                          className={`text-2xl md:text-4xl font-bold mb-2 leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent transition-all duration-1000 ${
                            index === currentSlide
                              ? "translate-y-0 opacity-100"
                              : "translate-y-8 opacity-0"
                          }`}
                        >
                          {slide.title}
                        </h1>
                      </div>

                      {/* Subtitle with Slide Animation */}
                      <div className="overflow-hidden">
                        <p
                          className={`text-xl md:text-2xl mb-4 opacity-90 text-blue-100 transition-all duration-1000 delay-300 ${
                            index === currentSlide
                              ? "translate-y-0 opacity-90"
                              : "translate-y-8 opacity-0"
                          }`}
                        >
                          {slide.subtitle}
                        </p>
                      </div>

                      {/* Stats with Staggered Animation */}
                      <div className="space-y-4 mb-8">
                        {slide.stats.map((stat, statIndex) => (
                          <div
                            key={statIndex}
                            className={`flex items-center space-x-4 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-700 hover:bg-white/10 hover:scale-105 ${
                              index === currentSlide
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                            }`}
                            style={{
                              transitionDelay: `${600 + statIndex * 200}ms`,
                            }}
                          >
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                              <stat.icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-medium">
                              {stat.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Buttons with Hover Effects */}
                      <div
                        className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${
                          index === currentSlide
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }`}
                      >
                        {slide.buttons.map((button, buttonIndex) => (
                          <button
                            key={buttonIndex}
                            className={`group px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 ${
                              button.primary
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-lg"
                                : "bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
                            }`}
                          >
                            <span>{button.text}</span>
                            {button.primary ? (
                              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            ) : (
                              <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Medical Imagery Section */}
                    <div className="hidden lg:block flex-1">
                      <div className="relative">
                        <div className="relative w-full max-w-lg mx-auto">
                          {/* Main Image Container */}
                          <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                            <img
                              src={slide.bgImage}
                              alt="Medical Technology"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-purple-900/40" />

                            {/* Floating Elements */}
                            <div className="absolute top-4 right-4 p-3 bg-white/90 rounded-full shadow-lg animate-pulse">
                              <Heart className="h-6 w-6 text-red-500" />
                            </div>
                            <div
                              className="absolute bottom-4 left-4 p-3 bg-white/90 rounded-full shadow-lg animate-pulse"
                              style={{ animationDelay: "1s" }}
                            >
                              <Activity className="h-6 w-6 text-green-500" />
                            </div>
                          </div>

                          {/* Orbiting Elements */}
                          <div
                            className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl animate-spin"
                            style={{ animationDuration: "20s" }}
                          >
                            <Shield className="h-8 w-8 text-white" />
                          </div>
                          <div
                            className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl animate-spin"
                            style={{
                              animationDuration: "15s",
                              animationDirection: "reverse",
                            }}
                          >
                            <Zap className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`relative w-12 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white shadow-lg"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{
                width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
              }}
            />
          </div>
        </section>

        {/* Partners Infinite Slide */}
        <section className="py-6 bg-blue-50">
          <div className="py-12 bg-white relative rounded-xl shadow-inner  mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-blue-800 mb-10 text-base font-semibold tracking-wide uppercase">
              Partnering with World-Class Institutions
            </p>

            <div className="overflow-hidden">
              <div
                className="flex space-x-12 animate-scroll-x w-max"
                style={{ animationDuration: `${partners.length * 2}s` }}
              >
                {[...partners, ...partners].map((partner, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center bg-white border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all w-48 sm:w-56"
                  >
                    <div className="mb-3 w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-2xl text-blue-700">
                        {partner.logo}
                      </span>
                    </div>
                    <div className="text-base font-semibold text-blue-900 text-center">
                      {partner.name}
                    </div>
                    <div className="text-xs text-gray-500 text-center mt-1">
                      {partner.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes scroll-x {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll-x {
              animation-name: scroll-x;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
            }
          `}</style>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {["all", "clinical", "management", "practice-excellence"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveCategory(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === filter
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {filter === "practice-excellence"
                        ? "Certification"
                        : filter.charAt(0).toUpperCase() + filter.slice(1)}
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

        {/* All Courses Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {activeCategory === "all"
                  ? "All Courses"
                  : `${
                      activeCategory.charAt(0).toUpperCase() +
                      activeCategory.slice(1)
                    } Courses`}
              </h2>
              <p className="text-lg text-gray-600">
                Discover our comprehensive collection of healthcare education
                courses
              </p>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 text-lg mb-4">
                  Failed to load courses. Please try again.
                </div>
                <button
                  onClick={refetch}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : courses.length === 0 ? (
              <NoCourses />
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={previousPage}
                    disabled={!pagination.hasPreviousPage}
                    className={`px-4 py-2 rounded-lg border ${
                      !pagination.hasPreviousPage
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    )
                      .slice(
                        Math.max(0, pagination.currentPage - 3),
                        Math.min(
                          pagination.totalPages,
                          pagination.currentPage + 2
                        )
                      )
                      .map((page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-3 py-1 rounded ${
                            page === pagination.currentPage
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={!pagination.hasNextPage}
                    className={`px-4 py-2 rounded-lg border ${
                      !pagination.hasNextPage
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Next
                  </button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  Showing{" "}
                  {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
                  to{" "}
                  {Math.min(
                    pagination.currentPage * pagination.itemsPerPage,
                    pagination.totalItems
                  )}{" "}
                  of {pagination.totalItems} courses
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Courses
              </h2>
              <p className="text-lg text-gray-600">
                Most enrolled courses by healthcare professionals
              </p>
            </div>

            <PaginatedCourseGrid
              courses={popularCourses}
              loading={popularLoading}
              pagination={popularPagination}
              onPrevious={popularPreviousPage}
              onNext={popularNextPage}
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              updateQuantity={updateQuantity}
            />
          </div>
        </section>

        {/* Clinical Excellence Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Clinical Excellence
              </h2>
              <p className="text-lg text-gray-600">
                Advanced clinical skills and specialized medical training
              </p>
            </div>

            <PaginatedCourseGrid
              courses={clinicalCourses}
              loading={clinicalLoading}
              pagination={clinicalPagination}
              onPrevious={clinicalPreviousPage}
              onNext={clinicalNextPage}
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              updateQuantity={updateQuantity}
            />
          </div>
        </section>

        {/* Healthcare Management Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Healthcare Management
              </h2>
              <p className="text-lg text-gray-600">
                Leadership and management skills for healthcare professionals
              </p>
            </div>

            <PaginatedCourseGrid
              courses={managementCourses}
              loading={managementLoading}
              pagination={managementPagination}
              onPrevious={managementPreviousPage}
              onNext={managementNextPage}
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              updateQuantity={updateQuantity}
            />
          </div>
        </section>

        {/* Professional Certifications Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Professional Certifications
              </h2>
              <p className="text-lg text-gray-600">
                Industry-recognized certifications to advance your career
              </p>
            </div>

            <PaginatedCourseGrid
              courses={certificationCourses}
              loading={certificationLoading}
              pagination={certificationPagination}
              onPrevious={certificationPreviousPage}
              onNext={certificationNextPage}
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              updateQuantity={updateQuantity}
            />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated with Healthcare Education
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Get the latest courses, industry insights, and career
                opportunities delivered to your inbox
              </p>
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                />
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  50,000+
                </div>
                <div className="text-gray-600">
                  Healthcare Professionals Trained
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  500+
                </div>
                <div className="text-gray-600">Expert-Led Courses</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  95%
                </div>
                <div className="text-gray-600">Course Completion Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  24/7
                </div>
                <div className="text-gray-600">Learning Support</div>
              </div>
            </div>
          </div>
        </section>
        <MedicalCaseDiscussions />

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Advance Your Healthcare Career?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of healthcare professionals who have transformed
              their careers with our expert-led courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Browse All Courses
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
                Talk to Advisor
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;
