"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Upload,
  Plus,
  Trash2,
  Save,
  Users,
  Clock,
  Star,
  DollarSign,
  Award,
  BookOpen,
  FileText,
  Settings,
  Info,
  Edit2,
  Edit,
  Search,
  Filter,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  TrendingUp,
  Calendar,
  Grid,
  List,
  Download,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import {
  createCourse,
  getAllCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
} from "@/hooks/courseApi";

const CourseAdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingCourse, setEditingCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [refreshing, setRefreshing] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [courseForm, setCourseForm] = useState({
    title: "",
    slug: "",
    provider: "",
    duration: "",
    description: "",
    level: "BEGINNER",
    rating: 0,
    reviews: 0,
    price: 0,
    originalPrice: 0,
    image: null,
    status: "DRAFT",
    category: "",
    shortDescription: "",
    subtitle: "",
    batchStartDate: "",
    nextReviewDate: "",
    tags: [],
    enrolledStudents: 0,
    featured: false,
    about: "",
    outcomes: [""],
    curriculum: [{ module: "", topics: [""] }],
    targetAudience: "",
    knowledgePartner: "",
    faculty: [{ name: "", title: "", department: "", bio: "" }],
    faqs: [{ question: "", answer: "" }],
    relatedCourses: [],
    prerequisites: "",
    passingPercent: 70,
  });

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Info },
    { id: "content", label: "Content", icon: BookOpen },
    { id: "curriculum", label: "Curriculum", icon: FileText },
    { id: "faculty", label: "Faculty", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setRefreshing(true);
      const res = await getAllCourses();
      setCourses(res.courses);
      setTotalItems(res.courses.length);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const resetForm = () => {
    setCourseForm({
      title: "",
      slug: "",
      provider: "",
      duration: "",
      description: "",
      level: "BEGINNER",
      rating: 0,
      reviews: 0,
      price: 0,
      originalPrice: 0,
      image: null,
      category: "",
      shortDescription: "",
      subtitle: "",
      batchStartDate: "",
      nextReviewDate: "",
      tags: [],
      enrolledStudents: 0,
      featured: false,
      about: "",
      outcomes: [""],
      curriculum: [{ module: "", topics: [""] }],
      targetAudience: "",
      knowledgePartner: "",
      faculty: [{ name: "", title: "", department: "", bio: "" }],
      faqs: [{ question: "", answer: "" }],
      relatedCourses: [],
      prerequisites: "",
      passingPercent: 70,
    });
  };

  const openModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setCourseForm({
        title: course.title || "",
        slug: course.slug || "",
        provider: course.provider || "",
        duration: course.duration || "",
        description: course.description || "",
        level: course.level || "BEGINNER",
        rating: course.rating || 0,
        reviews: course.reviews || 0,
        price: course.price || 0,
        originalPrice: course.originalPrice || 0,
        image: course.image || null,
        status: course.status || "DRAFT",
        category: course.category || "",
        shortDescription: course.shortDescription || "",
        subtitle: course.subtitle || "",
        batchStartDate: course.batchStartDate || "",
        nextReviewDate: course.nextReviewDate || "",
        tags: course.tags || [],
        enrolledStudents: course.enrolledStudents || 0,
        featured: course.featured || false,
        about: course.about || "",
        outcomes: course.outcomes || [""],
        curriculum: course.curriculum || [{ module: "", topics: [""] }],
        targetAudience: course.targetAudience || "",
        knowledgePartner: course.knowledgePartner || "",
        faculty: course.faculty || [
          { name: "", title: "", department: "", bio: "" },
        ],
        faqs: course.faqs || [{ question: "", answer: "" }],
        relatedCourses: course.relatedCourses || [],
        prerequisites: course.prerequisites || "",
        passingPercent: course.passingPercent || 70,
      });
    } else {
      setEditingCourse(null);
      resetForm();
    }
    setIsModalOpen(true);
    setActiveTab("basic");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setCourseForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field, defaultValue = "") => {
    setCourseForm((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const removeArrayItem = (field, index) => {
    setCourseForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleCurriculumChange = (moduleIndex, field, value) => {
    setCourseForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((module, i) =>
        i === moduleIndex ? { ...module, [field]: value } : module
      ),
    }));
  };

  const handleTopicChange = (moduleIndex, topicIndex, value) => {
    setCourseForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((module, i) =>
        i === moduleIndex
          ? {
              ...module,
              topics: module.topics.map((topic, j) =>
                j === topicIndex ? value : topic
              ),
            }
          : module
      ),
    }));
  };

  const addTopic = (moduleIndex) => {
    setCourseForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((module, i) =>
        i === moduleIndex
          ? { ...module, topics: [...module.topics, ""] }
          : module
      ),
    }));
  };

  const removeTopic = (moduleIndex, topicIndex) => {
    setCourseForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((module, i) =>
        i === moduleIndex
          ? {
              ...module,
              topics: module.topics.filter((_, j) => j !== topicIndex),
            }
          : module
      ),
    }));
  };

  const handleFacultyChange = (index, field, value) => {
    setCourseForm((prev) => ({
      ...prev,
      faculty: prev.faculty.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setCourseForm((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCourseForm((prev) => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setCourseForm((prev) => ({ ...prev, tags }));
  };

  const getStatusBadge = (status) => {
    const colors = {
      PUBLISHED: "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg",
      DRAFT: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg",
      ARCHIVED: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg",
    };
    return `inline-flex px-3 py-1 text-xs font-semibold rounded-full ${colors[status]} transform hover:scale-105 transition-all duration-200`;
  };

  const getLevelBadge = (level) => {
    const colors = {
      BEGINNER: "bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg",
      INTERMEDIATE: "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg",
      ADVANCED: "bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg",
    };
    return `inline-flex px-3 py-1 text-xs font-semibold rounded-full ${colors[level]} transform hover:scale-105 transition-all duration-200`;
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    return buttons;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...courseForm,
        price: Number(courseForm.price),
        rating: Number(courseForm.rating),
        reviews: Number(courseForm.reviews),
        originalPrice: Number(courseForm.originalPrice),
        duration: Number(courseForm.duration),
        passingPercent: Number(courseForm.passingPercent || 70),
        featured: Boolean(courseForm.featured),
      };
      
      if (editingCourse) {
        payload.tags = payload?.tags.map(item => item.name);
        await updateCourse(editingCourse.id, payload);
      } else {
        await createCourse(payload);
      }

      await fetchCourses();
      closeModal();
    } catch (err) {
      console.error("Course submission failed:", err);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        await fetchCourses();
      } catch (err) {
        console.error("Failed to delete course:", err);
      }
    }
  };

  const toggleStatus = (id) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? {
              ...course,
              status: course.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
            }
          : course
      )
    );
  };

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative">
        <Image
          src={course.image}
          alt={course.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={getStatusBadge(course.status)}>
            {course.status}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          {course.featured && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              <Star className="w-3 h-3 inline mr-1" />
              Featured
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => toggleStatus(course.id)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              {course.status === "PUBLISHED" ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            <button
              onClick={() => openModal(course)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDeleteCourse(course.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className={getLevelBadge(course.level)}>
            {course.level}
          </span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.shortDescription || course.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-gray-900">
              ${course.price}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              {course.enrolledStudents}
            </div>
          </div>
          
          {course.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Course Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your courses, content, and media with ease
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={fetchCourses}
                disabled={refreshing}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 disabled:opacity-50"
              >
                <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                Refresh
              </button>
              <button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                Add New Course
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold">{courses.length}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Published</p>
                <p className="text-3xl font-bold">
                  {courses.filter((c) => c.status === "PUBLISHED").length}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Enrollments</p>
                <p className="text-3xl font-bold">
                  {courses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold">
                  ${courses.reduce((sum, c) => sum + c.price * c.enrolledStudents, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, categories..."
                  className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[140px]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "table" ? "bg-white shadow-sm text-blue-600" : "text-gray-600"
                  }`}
                >
                  <List size={20} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-600"
                  }`}
                >
                  <Grid size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Instructor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Enrollments
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <Image
                              src={course.image}
                              alt={course.title}
                              width={64}
                              height={64}
                              className="w-16 h-16 rounded-xl object-cover shadow-md"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900 line-clamp-1">
                              {course.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {course.category}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={getLevelBadge(course.level)}>
                                {course.level}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {course.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {course.instructor || "Not assigned"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                        ${course.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(course.status)}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{course.enrolledStudents}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{course.enrolledStudents}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{course.rating}</span>
                            <span className="text-gray-400">({course.reviews})</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">No rating</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStatus(course.id)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title={course.status === "PUBLISHED" ? "Make Draft" : "Publish"}
                          >
                            {course.status === "PUBLISHED" ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button
                            onClick={() => openModal(course)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            title="Edit Course"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Delete Course"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          {filteredCourses.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredCourses.length)} of {filteredCourses.length} courses
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {getPaginationButtons().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-lg"
                          : "border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                <BookOpen className="h-24 w-24" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria." 
                  : "Get started by creating your first course."}
              </p>
              <button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg mx-auto"
              >
                <Plus size={20} />
                Add New Course
              </button>
            </div>
          )}

          {/* Modal */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {editingCourse ? "Edit Course" : "Create New Course"}
                          </h2>
                          <button
                            onClick={closeModal}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <X size={24} />
                          </button>
                        </div>
          
                        <form onSubmit={handleSubmit}>
                          {/* Tabs */}
                          <div className="border-b bg-gray-50">
                            <div className="flex overflow-x-auto">
                              {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                  <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                      activeTab === tab.id
                                        ? "border-blue-500 text-blue-600 bg-white"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                                  >
                                    <Icon size={16} />
                                    {tab.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
          
                          <div className="p-6 max-h-[60vh] overflow-y-auto">
                            {/* Basic Info Tab */}
                            {activeTab === "basic" && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Course Title *
                                    </label>
                                    <input
                                      type="text"
                                      name="title"
                                      value={courseForm.title}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="Enter course title"
                                      required
                                    />
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Slug
                                    </label>
                                    <input
                                      type="text"
                                      name="slug"
                                      value={courseForm.slug}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="course-slug"
                                    />
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Provider *
                                    </label>
                                    <input
                                      type="text"
                                      name="provider"
                                      value={courseForm.provider}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="Executive Education"
                                      required
                                    />
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Category *
                                    </label>
                                    <select
                                      name="category"
                                      value={courseForm.category}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      required
                                    >
                                      <option value="">Select category</option>
                                      <option value="popular">Popular</option>
                                      <option value="featured">Featured</option>
                                      <option value="new">New</option>
                                      <option value="healthcare">Healthcare</option>
                                      <option value="technology">Technology</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Status *
                                    </label>
                                    <select
                                      required
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      value={courseForm.status}
                                      onChange={handleInputChange}
                                    >
                                      <option value="DRAFT">DRAFT</option>
                                      <option value="PUBLISHED">PUBLISHED</option>
                                      <option value="ARCHIVED">ARCHIVED</option>
                                    </select>
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Level
                                    </label>
                                    <select
                                      name="level"
                                      value={courseForm.level}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                      <option value="Beginner">BEGINNER</option>
                                      <option value="Intermediate">INTERMEDIATE</option>
                                      <option value="Advanced">ADVANCED</option>
                                    </select>
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Duration
                                    </label>
                                    <input
                                      type="text"
                                      name="duration"
                                      value={courseForm.duration}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="6 Months"
                                    />
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Price (₹)
                                    </label>
                                    <input
                                      type="number"
                                      name="price"
                                      value={courseForm.price}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="250000"
                                      min="0"
                                    />
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Original Price (₹)
                                    </label>
                                    <input
                                      type="number"
                                      name="originalPrice"
                                      value={courseForm.originalPrice}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="300000"
                                      min="0"
                                    />
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Batch Start Date
                                    </label>
                                    <input
                                      type="datetime-local"
                                      name="batchStartDate"
                                      value={courseForm.batchStartDate}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="Coming Soon"
                                    />
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Next Review Date
                                    </label>
                                    <input
                                     type="datetime-local"
                                      name="nextReviewDate"
                                      value={courseForm.nextReviewDate}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="28th Jan, 2025"
                                    />
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Enrolled Students
                                    </label>
                                    <input
                                      type="number"
                                      name="enrolledStudents"
                                      value={courseForm.enrolledStudents}
                                      onChange={handleInputChange}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="1250"
                                      min="0"
                                    />
                                  </div>
          
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      name="featured"
                                      checked={courseForm.featured}
                                      onChange={handleInputChange}
                                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">
                                      Featured Course
                                    </label>
                                  </div>
                                </div>
          
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags (comma separated)
                                  </label>
                                  <input
                                    type="text"
                                    value={courseForm.tags.join(", ")}
                                    onChange={handleTagsChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Digital Health, Strategy, Innovation"
                                  />
                                </div>
          
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Image
                                  </label>
                                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    {courseForm.image ? (
                                      <div className="relative">
                                        <img
                                          src={courseForm.image}
                                          alt="Course preview"
                                          className="mx-auto max-h-48 rounded-lg"
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setCourseForm((prev) => ({
                                              ...prev,
                                              image: null,
                                            }))
                                          }
                                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                        >
                                          <X size={16} />
                                        </button>
                                      </div>
                                    ) : (
                                      <>
                                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <p className="text-gray-600 mb-2">
                                          Upload course image
                                        </p>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleImageUpload}
                                          className="hidden"
                                          id="courseImage"
                                        />
                                        <label
                                          htmlFor="courseImage"
                                          className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                                        >
                                          Choose File
                                        </label>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
          
                            {/* Content Tab */}
                            {activeTab === "content" && (
                              <div className="space-y-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Short Description
                                  </label>
                                  <textarea
                                    name="shortDescription"
                                    value={courseForm.shortDescription}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Master digital transformation strategies in healthcare organizations"
                                  />
                                </div>
          
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subtitle
                                  </label>
                                  <input
                                    type="text"
                                    name="subtitle"
                                    value={courseForm.subtitle}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Integrate AI in Healthcare for a Smarter Future"
                                  />
                                </div>
          
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    About This Course
                                  </label>
                                  <textarea
                                    name="about"
                                    value={courseForm.about}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="This comprehensive program is designed to equip healthcare professionals..."
                                  />
                                </div>
          
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Target Audience
                                  </label>
                                  <textarea
                                    name="targetAudience"
                                    value={courseForm.targetAudience}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="This course is tailored for healthcare professionals, data scientists..."
                                  />
                                </div>
          
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Knowledge Partner
                                  </label>
                                  <textarea
                                    name="knowledgePartner"
                                    value={courseForm.knowledgePartner}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="The Indian Institute of Science (IISc) is our knowledge partner..."
                                  />
                                </div>
          
                                <div>
                                  <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Learning Outcomes
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => addArrayItem("outcomes")}
                                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
                                    >
                                      <Plus size={14} />
                                      Add Outcome
                                    </button>
                                  </div>
                                  {courseForm.outcomes.map((outcome, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                      <input
                                        type="text"
                                        value={outcome}
                                        onChange={(e) =>
                                          handleArrayChange(
                                            "outcomes",
                                            index,
                                            e.target.value
                                          )
                                        }
                                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Learning outcome"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeArrayItem("outcomes", index)}
                                        className="text-red-600 hover:text-red-800 p-2"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
          
                            {/* Curriculum Tab */}
                            {activeTab === "curriculum" && (
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    Course Curriculum
                                  </h3>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      addArrayItem("curriculum", {
                                        module: "",
                                        topics: [""],
                                      })
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                  >
                                    <Plus size={16} />
                                    Add Module
                                  </button>
                                </div>
          
                                {courseForm.curriculum.map((module, moduleIndex) => (
                                  <div
                                    key={moduleIndex}
                                    className="border border-gray-200 rounded-lg p-4"
                                  >
                                    <div className="flex justify-between items-start mb-3">
                                      <h4 className="font-medium text-gray-900">
                                        Module {moduleIndex + 1}
                                      </h4>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeArrayItem("curriculum", moduleIndex)
                                        }
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                    <div className="mb-3">
                                      <input
                                        type="text"
                                        placeholder="Module title"
                                        value={module.module}
                                        onChange={(e) =>
                                          handleCurriculumChange(
                                            moduleIndex,
                                            "module",
                                            e.target.value
                                          )
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <div>
                                      <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700">
                                          Topics
                                        </label>
                                        <button
                                          type="button"
                                          onClick={() => addTopic(moduleIndex)}
                                          className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                                        >
                                          Add Topic
                                        </button>
                                      </div>
                                      {module.topics.map((topic, topicIndex) => (
                                        <div key={topicIndex} className="flex gap-2 mb-2">
                                          <input
                                            type="text"
                                            placeholder="Topic"
                                            value={topic}
                                            onChange={(e) =>
                                              handleTopicChange(
                                                moduleIndex,
                                                topicIndex,
                                                e.target.value
                                              )
                                            }
                                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeTopic(moduleIndex, topicIndex)
                                            }
                                            className="text-red-600 hover:text-red-800 p-2"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
          
                            {/* Faculty Tab */}
                            {activeTab === "faculty" && (
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    Faculty Members
                                  </h3>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      addArrayItem("faculty", {
                                        name: "",
                                        title: "",
                                        department: "",
                                        bio: "",
                                      })
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                  >
                                    <Plus size={16} />
                                    Add Faculty
                                  </button>
                                </div>
          
                                {courseForm.faculty.map((member, index) => (
                                  <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4"
                                  >
                                    <div className="flex justify-between items-start mb-3">
                                      <h4 className="font-medium text-gray-900">
                                        Faculty Member {index + 1}
                                      </h4>
                                      <button
                                        type="button"
                                        onClick={() => removeArrayItem("faculty", index)}
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                      <input
                                        type="text"
                                        placeholder="Faculty name"
                                        value={member.name}
                                        onChange={(e) =>
                                          handleFacultyChange(
                                            index,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Title"
                                        value={member.title}
                                        onChange={(e) =>
                                          handleFacultyChange(
                                            index,
                                            "title",
                                            e.target.value
                                          )
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <input
                                        type="text"
                                        placeholder="Department"
                                        value={member.department}
                                        onChange={(e) =>
                                          handleFacultyChange(
                                            index,
                                            "department",
                                            e.target.value
                                          )
                                        }
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <textarea
                                      placeholder="Bio"
                                      value={member.bio}
                                      onChange={(e) =>
                                        handleFacultyChange(index, "bio", e.target.value)
                                      }
                                      rows={3}
                                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                ))}
          
                                <div className="mt-8">
                                  <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                      Frequently Asked Questions
                                    </h3>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        addArrayItem("faqs", { question: "", answer: "" })
                                      }
                                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                      <Plus size={16} />
                                      Add FAQ
                                    </button>
                                  </div>
          
                                  {courseForm.faqs.map((faq, index) => (
                                    <div
                                      key={index}
                                      className="border border-gray-200 rounded-lg p-4 mb-4"
                                    >
                                      <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-medium text-gray-900">
                                          FAQ {index + 1}
                                        </h4>
                                        <button
                                          type="button"
                                          onClick={() => removeArrayItem("faqs", index)}
                                          className="text-red-600 hover:text-red-800"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                      <div className="mb-3">
                                        <input
                                          type="text"
                                          placeholder="Question"
                                          value={faq.question}
                                          onChange={(e) =>
                                            handleFaqChange(
                                              index,
                                              "question",
                                              e.target.value
                                            )
                                          }
                                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                      </div>
                                      <textarea
                                        placeholder="Answer"
                                        value={faq.answer}
                                        onChange={(e) =>
                                          handleFaqChange(index, "answer", e.target.value)
                                        }
                                        rows={3}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
          
                            {/* Settings Tab */}
                            {activeTab === "settings" && (
                              <div className="space-y-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Prerequisites
                                  </label>
                                  <textarea
                                    name="prerequisites"
                                    value={courseForm.prerequisites}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="List any prerequisites for this course..."
                                  />
                                </div>
          
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Passing Percentage
                                  </label>
                                  <input
                                    type="number"
                                    name="passingPercent"
                                    value={courseForm.passingPercent}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="100"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="70"
                                  />
                                  <p className="text-sm text-gray-500 mt-1">
                                    Minimum percentage required to pass the course
                                  </p>
                                </div>
          
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Rating
                                    </label>
                                    <input
                                      type="number"
                                      name="rating"
                                      value={courseForm.rating}
                                      onChange={handleInputChange}
                                      min="0"
                                      max="5"
                                      step="0.1"
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="4.8"
                                    />
                                  </div>
          
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Number of Reviews
                                    </label>
                                    <input
                                      type="number"
                                      name="reviews"
                                      value={courseForm.reviews}
                                      onChange={handleInputChange}
                                      min="0"
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="245"
                                    />
                                  </div>
                                </div>
          
                                <div className="border-t pt-6">
                                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                                    Course Status & Visibility
                                  </h4>
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                      <div>
                                        <h5 className="font-medium text-gray-900">
                                          Featured Course
                                        </h5>
                                        <p className="text-sm text-gray-600">
                                          Display this course prominently on the homepage
                                        </p>
                                      </div>
                                      <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                          type="checkbox"
                                          name="featured"
                                          checked={courseForm.featured}
                                          onChange={handleInputChange}
                                          className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
          
                                <div className="border-t pt-6">
                                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                                    Advanced Settings
                                  </h4>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Course ID
                                        </label>
                                        <input
                                          type="number"
                                          name="id"
                                          value={courseForm.id || ""}
                                          onChange={handleInputChange}
                                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                          placeholder="Auto-generated"
                                          disabled
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                          Auto-generated unique identifier
                                        </p>
                                      </div>
          
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Sort Order
                                        </label>
                                        <input
                                          type="number"
                                          name="sortOrder"
                                          value={courseForm.sortOrder || ""}
                                          onChange={handleInputChange}
                                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          placeholder="0"
                                          min="0"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                          Display order (lower numbers appear first)
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
          
                          {/* Footer */}
                          <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center">
                            <div className="text-sm text-gray-600">* Required fields</div>
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="px-6 py-2 text-blue-700 bg-blue-50 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                Save as Draft
                              </button>
                              <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                              >
                                <Save size={16} />
                                {editingCourse ? "Update Course" : "Create Course"}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
        </div>
      </div>
    </div>
  );
};

export default CourseAdminPanel;