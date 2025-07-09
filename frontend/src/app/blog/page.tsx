'use client'
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { useEffect, useState } from 'react';
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "@/hooks/blogApi";

import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const postsPerPage = 20;

  useAuthGuard()

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const postsData = await getAllBlogs();
      setPosts(postsData.posts);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
    setLoading(false);
  };

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['All', ...new Set(posts.map(post => post.category))];

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Reset time to compare dates only
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === today.getTime()) {
      return 'Today';
    } else if (date.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Aster Health 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Insights
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover the latest in healthcare innovation, expert insights, and industry trends. 
              Stay ahead with our curated collection of professional healthcare content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Explore Latest
              </button>
              <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
                <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                {filteredPosts.length} Articles Found
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {currentPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {currentPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} formatDate={formatDate} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} results
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      page === currentPage
                        ? 'bg-teal-500 text-white shadow-lg'
                        : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BlogCard({ post, index, formatDate }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 ${
      index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
    }`}>
      {/* Image */}
      <div className={`relative overflow-hidden ${index === 0 ? 'h-64' : 'h-48'}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category and Tags */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
          <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            {post.category}
          </span>
          {post.tags.slice(0, 2).map((tag, tagIndex) => (
            <span key={tagIndex} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              {tag.name}
            </span>
          ))}
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
            <span className="text-xs font-bold text-gray-700">
              {formatDate(post.publishDate || post.createdAt)}
            </span>
          </div>
        </div>
        
        {/* Read Time */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div className="text-center">
              <span className="text-sm font-bold text-gray-700 block leading-tight">
                {post.readTime?.split(' ')[0] || '5'}
              </span>
              <span className="text-xs text-gray-500 font-medium">MIN</span>
            </div>
          </div>
        </div>

        {/* Trending Badge */}
        {index < 3 && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              🔥 Trending
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
        <h3 className={`font-bold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-teal-600 transition-colors duration-300 ${
          index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>
        
        <p className={`text-gray-600 mb-4 line-clamp-3 leading-relaxed ${
          index === 0 ? 'text-base' : 'text-sm'
        }`}>
          {post.excerpt}
        </p>
        
        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {post.author?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {post.author?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">
                {post.author?.role || 'Healthcare Writer'}
              </p>
            </div>
          </div>
          
          {/* Likes */}
          <div className="flex items-center gap-1 text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span className="text-sm font-medium">{post.likes || '0'}</span>
          </div>
        </div>
        
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Read More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}