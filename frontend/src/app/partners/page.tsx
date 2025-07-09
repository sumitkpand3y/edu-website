"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Award,
  Calendar,
} from "lucide-react";

const PartnersPage = () => {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: "",
    contactName: "",
    email: "",
    phone: "",
    designation: "",
    hospitalBedCount: "",
    purposeForCollaboration: "",
  });

  // Hero section animations
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: "Empowering Healthcare Excellence",
      subtitle: "Together We Transform Medical Education",
      description:
        "Join our network of prestigious partners in revolutionizing healthcare education and training worldwide.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop",
    },
    {
      title: "Strategic Healthcare Partnerships",
      subtitle: "Building the Future of Medicine",
      description:
        "Collaborate with leading institutions to advance medical knowledge and improve patient care globally.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop",
    },
    {
      title: "Innovation Through Collaboration",
      subtitle: "Connecting Healthcare Leaders",
      description:
        "Our partnerships drive innovation, excellence, and accessibility in medical education and healthcare delivery.",
      image:
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=600&fit=crop",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Sample partner data
  const partnersData = {
    knowledge: [
      {
        id: 1,
        name: "NSDC",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=80&fit=crop",
        description:
          "National Skill Development Corporation (NSDC) is a premier institution working towards skill development and vocational training across India.",
        established: "2009",
        location: "New Delhi, India",
        website: "https://nsdcindia.org",
        email: "info@nsdcindia.org",
        phone: "+91-11-4141-4141",
        specialties: [
          "Skill Development",
          "Vocational Training",
          "Certification Programs",
          "Industry Partnerships",
        ],
        stats: { programs: "500+", students: "2M+", years: "15+" },
      },
      {
        id: 2,
        name: "XLRI",
        logo: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=120&h=80&fit=crop",
        description:
          "Xavier Labour Relations Institute is a premier management institute in India, known for its excellence in management education and research.",
        established: "1949",
        location: "Jamshedpur, India",
        website: "https://xlri.ac.in",
        email: "info@xlri.ac.in",
        phone: "+91-657-398-3000",
        specialties: [
          "Management Education",
          "HR Programs",
          "Executive Education",
          "Research",
        ],
        stats: { programs: "20+", students: "50K+", years: "75+" },
      },
      {
        id: 3,
        name: "NEMI",
        logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=80&fit=crop",
        description:
          "National Education Management Institute focuses on educational excellence and innovative learning methodologies.",
        established: "2005",
        location: "Mumbai, India",
        website: "https://nemi.edu.in",
        email: "contact@nemi.edu.in",
        phone: "+91-22-2020-3000",
        specialties: [
          "Educational Management",
          "Training Programs",
          "Certification",
          "Consulting",
        ],
        stats: { programs: "100+", students: "500K+", years: "19+" },
      },
      {
        id: 4,
        name: "IIT Indore",
        logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&h=80&fit=crop",
        description:
          "Indian Institute of Technology Indore is a premier engineering and technology institute known for innovation and research excellence.",
        established: "2009",
        location: "Indore, India",
        website: "https://iiti.ac.in",
        email: "info@iiti.ac.in",
        phone: "+91-731-660-3000",
        specialties: ["Engineering", "Technology", "Research", "Innovation"],
        stats: { programs: "30+", students: "10K+", years: "15+" },
      },
    ],
    hospital: [
      {
        id: 5,
        name: "Apollo Hospitals",
        logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=120&h=80&fit=crop",
        description:
          "Apollo Hospitals is one of India's leading healthcare providers, offering comprehensive medical services and advanced treatments.",
        established: "1983",
        location: "Chennai, India",
        website: "https://apollohospitals.com",
        email: "info@apollohospitals.com",
        phone: "+91-44-2829-3333",
        specialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Organ Transplant",
          "Emergency Care",
        ],
        stats: { hospitals: "70+", beds: "10K+", years: "40+" },
      },
      {
        id: 6,
        name: "KIMS Hospital",
        logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=120&h=80&fit=crop",
        description:
          "KIMS Hospital is a multi-specialty healthcare institution providing quality medical care with state-of-the-art facilities.",
        established: "2000",
        location: "Hyderabad, India",
        website: "https://kimshospitals.com",
        email: "info@kimshospitals.com",
        phone: "+91-40-4020-2020",
        specialties: [
          "Multi-specialty Care",
          "Critical Care",
          "Surgical Excellence",
          "Diagnostic Services",
        ],
        stats: { hospitals: "12+", beds: "3K+", years: "24+" },
      },
      {
        id: 7,
        name: "Fortis Healthcare",
        logo: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=120&h=80&fit=crop",
        description:
          "Fortis Healthcare is a leading integrated healthcare delivery service provider in India with a network of hospitals across the country.",
        established: "2001",
        location: "Gurugram, India",
        website: "https://fortishealthcare.com",
        email: "info@fortishealthcare.com",
        phone: "+91-124-492-2222",
        specialties: [
          "Cardiac Sciences",
          "Neurosciences",
          "Orthopedics",
          "Oncology",
          "Renal Sciences",
        ],
        stats: { hospitals: "36+", beds: "4K+", years: "23+" },
      },
      {
        id: 8,
        name: "Max Healthcare",
        logo: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=120&h=80&fit=crop",
        description:
          "Max Healthcare is one of India's leading private healthcare providers known for clinical excellence and patient care.",
        established: "2000",
        location: "New Delhi, India",
        website: "https://maxhealthcare.in",
        email: "info@maxhealthcare.in",
        phone: "+91-11-2651-5050",
        specialties: [
          "Heart & Vascular",
          "Cancer Care",
          "Neurosciences",
          "Orthopedics",
          "Mother & Child Care",
        ],
        stats: { hospitals: "17+", beds: "3.5K+", years: "24+" },
      },
    ],
    finance: [
      {
        id: 9,
        name: "EduVanz",
        logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=120&h=80&fit=crop",
        description:
          "EduVanz is a leading education financing platform that provides customized financial solutions for students pursuing higher education.",
        established: "2016",
        location: "Bangalore, India",
        website: "https://eduvanz.com",
        email: "support@eduvanz.com",
        phone: "+91-80-4718-2000",
        specialties: [
          "Education Loans",
          "Skill Development Financing",
          "Digital Lending",
          "Financial Technology",
        ],
        stats: { loans: "50K+", amount: "₹500Cr+", years: "8+" },
      },
      {
        id: 10,
        name: "FeeMonk",
        logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&h=80&fit=crop",
        description:
          "FeeMonk is a fintech platform that simplifies fee management and provides flexible payment solutions for educational institutions.",
        established: "2018",
        location: "Mumbai, India",
        website: "https://feemonk.com",
        email: "hello@feemonk.com",
        phone: "+91-22-4040-5000",
        specialties: [
          "Fee Management",
          "Payment Solutions",
          "Financial Planning",
          "Educational Fintech",
        ],
        stats: { institutions: "1K+", transactions: "10M+", years: "6+" },
      },
      {
        id: 11,
        name: "TGPL",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=80&fit=crop",
        description:
          "TGPL (Technology Group Private Limited) provides comprehensive financial and technology solutions for various industries.",
        established: "2012",
        location: "Pune, India",
        website: "https://tgpl.in",
        email: "info@tgpl.in",
        phone: "+91-20-2020-3000",
        specialties: [
          "Financial Solutions",
          "Technology Services",
          "Business Consulting",
          "Digital Transformation",
        ],
        stats: { clients: "500+", projects: "2K+", years: "12+" },
      },
    ],
  };

  const handlePartnerClick = (partner) => {
    setSelectedPartner(partner);
  };

  const handleClosePopup = () => {
    setSelectedPartner(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessMessage(true);
      setFormData({
        hospitalName: "",
        contactName: "",
        email: "",
        phone: "",
        designation: "",
        hospitalBedCount: "",
        purposeForCollaboration: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }, 2000);
  };

  const PartnerSection = ({
    title,
    partners,
    bgColor = "bg-gray-50",
    icon,
  }) => (
    <div className={`py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">{icon}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              onClick={() => handlePartnerClick(partner)}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 overflow-hidden rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {partner.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{partner.established}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{partner.location.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[100vh] min-h-[600px] max-h-[900px] sm:h-[80vh] md:h-[85vh] lg:h-[85vh] xl:h-[80vh] text-white overflow-hidden">
        {/* Background Slides */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-8 text-blue-100">
              {heroSlides[currentSlide].subtitle}
            </h2>
            <p className="text-lg sm:text-xl mb-12 leading-relaxed max-w-3xl mx-auto">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Explore Partnerships
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Global Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                100K+
              </div>
              <div className="text-gray-600">Healthcare Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Partners */}
      <PartnerSection
        title="Knowledge Partners"
        partners={partnersData.knowledge}
        bgColor="bg-gray-50"
        icon={<Award className="w-8 h-8 text-blue-600" />}
      />

      {/* Hospital Partners */}
      <PartnerSection
        title="Hospital Partners"
        partners={partnersData.hospital}
        bgColor="bg-white"
        icon={<Users className="w-8 h-8 text-green-600" />}
      />

      {/* Finance Partners */}
      <PartnerSection
        title="Finance Partners"
        partners={partnersData.finance}
        bgColor="bg-gray-50"
        icon={<Star className="w-8 h-8 text-purple-600" />}
      />

      {/* Become Our Partner Form */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Become Our Partner
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join our network of healthcare excellence and make a lasting
              impact on medical education worldwide.
            </p>
          </div>

          {!showSuccessMessage ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-300"
                    placeholder="Enter hospital name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-300"
                    placeholder="Enter contact person name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-300"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-300"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                  Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-300"
                  placeholder="Enter your designation"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    Hospital Bed Count *
                  </label>
                  <select
                    name="hospitalBedCount"
                    value={formData.hospitalBedCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-300"
                    required
                  >
                    <option value="">Select bed count</option>
                    <option value="1-50">1-50 beds</option>
                    <option value="51-100">51-100 beds</option>
                    <option value="101-250">101-250 beds</option>
                    <option value="251-500">251-500 beds</option>
                    <option value="500+">500+ beds</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    Purpose for Collaboration *
                  </label>
                  <select
                    name="purposeForCollaboration"
                    value={formData.purposeForCollaboration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-300"
                    required
                  >
                    <option value="">Select purpose</option>
                    <option value="training">Staff Training Programs</option>
                    <option value="technology">Technology Integration</option>
                    <option value="research">Research Partnership</option>
                    <option value="consulting">Healthcare Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-white to-blue-50 text-blue-600 font-semibold py-4 px-8 rounded-xl hover:from-blue-50 hover:to-white transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Partnership Request
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Partnership Request Submitted!
                </h3>
                <p className="text-blue-100 text-lg">
                  Thank you for your interest in partnering with us. Our team
                  will review your application and contact you within 24-48
                  hours.
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <h4 className="text-white font-semibold mb-2">
                  What happens next?
                </h4>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Our partnership team will review your application</li>
                  <li>• We'll schedule a consultation call within 48 hours</li>
                  <li>• Discuss collaboration opportunities and next steps</li>
                  <li>• Begin the partnership onboarding process</li>
                </ul>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors duration-300"
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Partner Details Popup */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedPartner.logo}
                    alt={selectedPartner.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {selectedPartner.name}
                    </h3>
                    <p className="text-gray-600">
                      Established: {selectedPartner.established}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  About
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedPartner.description}
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-gray-600">
                      {selectedPartner.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-gray-600">
                      {selectedPartner.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-gray-600">
                      {selectedPartner.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe size={16} className="text-gray-500" />
                    <a
                      href={selectedPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>{selectedPartner.website}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <a
                  href={selectedPartner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visit Website
                </a>
                <a
                  href={`mailto:${selectedPartner.email}`}
                  className="flex-1 bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Contact Partner
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersPage;
