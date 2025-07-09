"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  X,
  MapPin,
  Phone,
  Mail,
  User,
  GraduationCap,
  Building,
  Calendar,
  Clock,
  Star,
  Users,
  Award,
  BookOpen,
  Target,
  Zap,
  CheckCircle,
  Eye,
  Download,
  Play,
} from "lucide-react";

// Import your hooks
import { useCourses } from "@/hooks/useCourses";

interface ExtendedCourse {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  duration: string;
  level: string;
  rating: number;
  price: number;
  originalPrice?: number;
  batchStartDate: string;
  nextReviewDate: string;
  outcomes: string[];
  about: string;
  curriculum: { module: string; topics: string[] }[];
  targetAudience: string;
  knowledgePartner: string;
  partnerLogo?: string;
  certificateImage?: string;
  faculty: {
    name: string;
    title: string;
    department: string;
    bio: string;
    image?: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedCourses: {
    title: string;
    description: string;
    level: string;
    duration: string;
    rating: number;
    price: number;
    slug: string;
  }[];
  features?: string[];
  totalStudents?: number;
  completionRate?: number;
}

const CourseDetailPage = () => {
  const { slug } = useParams();
  const { getCourseBySlug } = useCourses();

  const [courseData, setCourseData] = useState<ExtendedCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponCode, setCouponCode] = useState("");
  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    qualification: "",
    location: "",
    agreeToPromotions: false,
  });
  const [showStickyFooter, setShowStickyFooter] = useState(false);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getCourseBySlug(slug as string);
        if (response && response.course) {
          setCourseData(response.course);
        } else {
          setError("Course not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load course data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle enquiry form submission
    console.log("Enquiry submitted:", enquiryForm);
    alert("Thank you for your enquiry! We will contact you soon.");
    setShowEnquiryModal(false);
    setEnquiryForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      qualification: "",
      location: "",
      agreeToPromotions: false,
    });
  };

  const handleCouponApply = () => {
    // Handle coupon application logic
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode);
      // You can add actual coupon validation logic here
      alert(`Coupon "${couponCode}" applied successfully!`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyFooter(true);
      } else {
        setShowStickyFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const qualificationOptions = [
    "MBchB",
    "MBBS",
    "MD/MS/DNB",
    "Post Graduate - Medical",
    "MDS/BDS",
    "Alternative Medicine",
    "Nursing - GNM",
    "Management",
    "Others",
  ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">({rating})</span>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <X className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-lg text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
            {/* Left Column - Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium">Featured Course</span>
                </div>
                <StarRating rating={courseData.rating} />
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {courseData.title}
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {courseData.subtitle}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm opacity-90">Duration</p>
                  <p className="font-semibold">{courseData.duration}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm opacity-90">Level</p>
                  <p className="font-semibold">{courseData.level}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Award className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm opacity-90">Certificate</p>
                  <p className="font-semibold">IISc & Aster</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Target className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm opacity-90">Rating</p>
                  <p className="font-semibold">{courseData.rating}/5</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                  What You'll Learn
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {courseData.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed text-blue-100">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Course Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-lg font-semibold">Preview Course</p>
                      </div>
                    </div>
                    {courseData.originalPrice && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(
                          ((courseData.originalPrice - courseData.price) /
                            courseData.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(courseData.price)}
                        </span>
                        {courseData.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            {formatPrice(courseData.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{courseData.duration}</span>
                        <span>•</span>
                        <span>{courseData.level}</span>
                      </div>
                      <button
                        onClick={() => setShowBuyNowModal(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 mb-3"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => setShowEnquiryModal(true)}
                        className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200"
                      >
                        Enquire Now
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Batch Start Date
                          </p>
                          <p className="text-sm text-gray-600">
                            {courseData.batchStartDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Eye className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Next Review Date
                          </p>
                          <p className="text-sm text-gray-600">
                            {courseData.nextReviewDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
                About the Course
              </h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {courseData.about.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Enhanced Curriculum */}
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <GraduationCap className="w-8 h-8 mr-3 text-purple-600" />
                Curriculum
              </h2>
              <div className="space-y-4">
                {courseData.curriculum.map((module, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => handleToggle(index)}
                      className="flex items-center justify-between w-full p-6 text-left bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {module.module}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                          {module.topics.length} topics
                        </span>
                        {activeIndex === index ? (
                          <ChevronDown className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </button>

                    {activeIndex === index && (
                      <div className="p-6 bg-white border-t border-gray-100">
                        <div className="grid gap-3">
                          {module.topics.map((topic, topicIndex) => (
                            <div
                              key={topicIndex}
                              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-gray-700">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Target Audience */}
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-8 h-8 mr-3 text-green-600" />
                Who This Course Is For
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {courseData.targetAudience}
              </p>
            </section>

            {/* Enhanced Knowledge Partner */}
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Building className="w-8 h-8 mr-3 text-orange-600" />
                Knowledge Partner
              </h2>
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        IISc
                      </div>
                      <div className="text-xs text-orange-500">Bangalore</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {courseData.knowledgePartner.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {courseData.knowledgePartner.description}
                  </p>
                  <div className="mt-4 flex justify-center md:justify-start space-x-4">
                    <div className="bg-orange-100 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium text-orange-600">
                        Established 1909
                      </span>
                    </div>
                    <div className="bg-blue-100 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium text-blue-600">
                        Top Ranking
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sample Certificate with Image */}
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Award className="w-8 h-8 mr-3 text-purple-600" />
                Sample Certificate
              </h2>
              <div
                className="relative group cursor-pointer"
                onClick={() => setShowCertificateModal(true)}
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-300">
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>

                    <div className="flex justify-center space-x-8 mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">
                          ASTER
                        </span>
                      </div>
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-sm">
                          IISc
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        This is to certify that
                      </p>
                      <h3 className="text-2xl font-bold text-purple-600">
                        Name Surname
                      </h3>
                      <p className="text-sm text-gray-600">
                        has successfully completed
                      </p>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {courseData.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Completion of Certificate Programme from 01st October -
                        25th December 2024
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-8 pt-4 border-t border-gray-200">
                      <div className="text-left">
                        <p className="text-xs text-gray-600">
                          Prof. Programme Director
                        </p>
                        <p className="text-xs text-gray-600">
                          Indian Institute of Science
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">
                          Dr. Chief Executive
                        </p>
                        <p className="text-xs text-gray-600">
                          Aster Health Academy
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="bg-white bg-opacity-0 group-hover:bg-opacity-90 p-4 rounded-full transition-all duration-300">
                    <Eye className="w-6 h-6 text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                Click to view full certificate
              </p>
            </section>

            {/* Faculty Team */}
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Users className="w-8 h-8 mr-3 text-indigo-600" />
                Faculty Team
              </h2>
              <div className="grid md:grid-cols-1 gap-6">
                {courseData.faculty.map((faculty, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-blue-600 mb-1">
                          {faculty.name}
                        </h3>
                        <p className="text-gray-900 font-medium mb-1">
                          {faculty.title}
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                          {faculty.department}
                        </p>
                        <p className="text-gray-700 text-sm">{faculty.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        {/* FAQ Section */}
        <section className=" mt-16 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {courseData.faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="text-gray-700 pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Courses */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Related Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.relatedCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <BookOpen className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm font-medium">Featured Course</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      Level: {course.level}
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <StarRating rating={course.rating} />
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(course.price)}
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Course Enquiry
                </h2>
                <button
                  onClick={() => setShowEnquiryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={enquiryForm.firstName}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={enquiryForm.lastName}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={enquiryForm.email}
                    onChange={(e) =>
                      setEnquiryForm({ ...enquiryForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={enquiryForm.phone}
                    onChange={(e) =>
                      setEnquiryForm({ ...enquiryForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification
                  </label>
                  <select
                    value={enquiryForm.qualification}
                    onChange={(e) =>
                      setEnquiryForm({
                        ...enquiryForm,
                        qualification: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your qualification</option>
                    {qualificationOptions.map((q, i) => (
                      <option key={i} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={enquiryForm.location}
                    onChange={(e) =>
                      setEnquiryForm({
                        ...enquiryForm,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enquiryForm.agreeToPromotions}
                    onChange={(e) =>
                      setEnquiryForm({
                        ...enquiryForm,
                        agreeToPromotions: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    I agree to receive promotional emails.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showCertificateModal && courseData.certificateImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-lg max-w-3xl w-full">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={courseData.certificateImage}
              alt="Certificate Preview"
              className="w-full h-auto rounded-b-2xl"
            />
          </div>
        </div>
      )}

      {showStickyFooter && courseData && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] z-40 border-t border-gray-200 px-4 py-3 md:px-8  ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
              <p className="font-semibold text-gray-800 text-center md:text-left">
                {courseData.title}
              </p>
              <div className="flex items-center gap-2 text-center md:text-left">
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(courseData.price)}
                </span>
                {courseData.originalPrice && (
                  <span className="text-sm line-through text-gray-400">
                    {formatPrice(courseData.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowEnquiryModal(true)}
                className="flex-1 md:flex-none px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                Enquire
              </button>
              <button
                onClick={() => setShowBuyNowModal(true)}
                className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {showBuyNowModal && courseData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg relative">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Buy Course</h2>
                <button
                  onClick={() => setShowBuyNowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-lg font-medium text-gray-800">
                  {courseData.title}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {appliedCoupon
                      ? formatPrice(courseData.price * 0.9)
                      : formatPrice(courseData.price)}
                  </span>
                  {courseData.originalPrice && (
                    <span className="text-gray-400 line-through">
                      {formatPrice(courseData.originalPrice)}
                    </span>
                  )}
                  {appliedCoupon && (
                    <span className="text-green-600 font-medium text-sm ml-2">
                      10% OFF Applied
                    </span>
                  )}
                </div>
              </div>

              {/* Coupon Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Apply Coupon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleCouponApply}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  alert("Payment process would start here.");
                  setShowBuyNowModal(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
              >
                Proceed to Pay ₹
                {appliedCoupon
                  ? Math.round(courseData.price * 0.9)
                  : courseData.price}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CourseDetailPage;
