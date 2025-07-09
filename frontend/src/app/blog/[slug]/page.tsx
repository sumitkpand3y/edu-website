"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getAllBlogs,
  getBlogBySlug,
} from "@/hooks/blogApi";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    message: "",
  });

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const foundPost = await getBlogBySlug(slug);

        if (foundPost) {
          setPost(foundPost.post);
          setNotFound(false);

          const allRecentPosts = await getAllBlogs({ limit: 4 });
          const filteredRecentPosts = allRecentPosts.posts;

          setRecentPosts(filteredRecentPosts);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowContactForm(false);
    setShowSuccessMessage(true);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      qualification: "",
      message: "",
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === today.getTime()) {
      return 'Today';
    } else if (date.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 mx-auto mb-4"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              The article you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out animate-bounce">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
          </div>
        </div>
      )}

      {/* Contact Form Popup */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Get in Touch</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-blue-100 mt-2">We'd love to hear from you. Send us a message!</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@domain.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="flex items-center gap-2">
                    <img src="https://flagcdn.com/w20/in.png" alt="India flag" className="w-5 h-3" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="">Select Qualification</option>
                    <option value="MBBS">MBBS</option>
                    <option value="MD">MD</option>
                    <option value="MS">MS</option>
                    <option value="BDS">BDS</option>
                    <option value="MDS">MDS</option>
                    <option value="BAMS">BAMS</option>
                    <option value="BHMS">BHMS</option>
                    <option value="BUMS">BUMS</option>
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="D.Pharm">D.Pharm</option>
                    <option value="BSc Nursing">BSc Nursing</option>
                    <option value="MSc Nursing">MSc Nursing</option>
                    <option value="Physiotherapy">Physiotherapy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="xl:col-span-3">
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Article Header */}
              <div className="p-6 sm:p-8 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    Aster Health Academy
                  </span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {post.category}
                  </span>
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {formatDate(post.date)}
                  </span>
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {post.readTime} read
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Social Share Buttons */}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Share:</span>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="relative h-64 sm:h-80 lg:h-96">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}

              {/* Article Body */}
              <div className="p-6 sm:p-8">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-li:mb-2 prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Need Help?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get in touch with our healthcare experts for personalized guidance.
                </p>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </span>
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((recentPost, index) => (
                    <div
                      key={recentPost.id}
                      className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                    >
                      <Link
                        href={`/blog/${recentPost.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm leading-tight block group-hover:underline transition-colors duration-200"
                      >
                        {recentPost.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded-full">{recentPost.category}</span>
                        <span>•</span>
                        <span>{recentPost.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Stay Updated
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest healthcare insights and course updates delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="your.email@domain.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
                <button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Subscribe Now
                </button>
              </div>
            </div>

            {/* Academy Promo */}
            <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Join Academy</h3>
                <p className="text-orange-100 text-sm mb-4">
                  Advance your medical career with our comprehensive courses.
                </p>
                <button className="w-full bg-white text-orange-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  View Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}