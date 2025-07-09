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
          const res = await getAllCourses(); // since it's in public
          
          setCourses(res.courses);
        } catch (err) {
          console.error("Failed to fetch courses:", err);
        } finally {
          setLoading(false);
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
      PUBLISHED: "bg-green-100 text-green-800",
      DRAFT: "bg-yellow-100 text-yellow-800",
      ARCHIVED: "bg-gray-100 text-gray-800",
    };
    return `inline-flex px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`;
  };
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getLevelBadge = (level) => {
    const colors = {
      BEGINNER: "bg-blue-100 text-blue-800",
      INTERMEDIATE: "bg-orange-100 text-orange-800",
      ADVANCED: "bg-red-100 text-red-800",
    };
    return `inline-flex px-2 py-1 text-xs font-medium rounded-full ${colors[level]}`;
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
        payload.tags = payload?.tags.map(item => item.name)
        
        // Update existing course
        await updateCourse(editingCourse.id, payload);
        // toast.success("Course updated successfully!");
      } else {
        // Create new course
        await createCourse(payload);
        // toast.success("Course created successfully!");
      }

      // Refetch courses after update or creation
      await fetchCourses(); // assume this exists and reloads the data
      closeModal();
    } catch (err) {
      console.error("Course submission failed:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const deleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((course) => course.id !== id));
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Course Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your courses, content, and media
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add New Course
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Courses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {courses.filter((c) => c.status === "PUBLISHED").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Enrollments
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {courses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-yellow-600">
                  $
                  {courses
                    .reduce((sum, c) => sum + c.price * c.enrolledStudents, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, or categories..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="ALL">All Status</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="DRAFT">DRAFT</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={300}
                          height={200}
                          className="w-16 h-16 object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.instructor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${course.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(course?.status)}>
                        {course?.status?.charAt(0).toUpperCase() +
                          course?.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        {course.enrolledStudents}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {course.rating}
                        </div>
                      ) : (
                        <span className="text-gray-400">No ratings</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleStatus(course.id)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={
                            course.status === "PUBLISHED"
                              ? "UNPUBLISHED"
                              : "PUBLISH"
                          }
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openModal(course)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchTerm || filterStatus !== "all"
                  ? "No courses match your search criteria."
                  : "No courses found. Create your first course to get started."}
              </div>
            </div>
          )}
        </div>

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
  );
};

export default CourseAdminPanel;
