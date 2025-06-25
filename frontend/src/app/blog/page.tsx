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

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  // const posts = getAllPosts();
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Aster Health Blogs</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            The healthcare industry is a vast and diverse field that includes a wide range of professions,
            services, and products. Stay informed about the latest developments and updates relevant to
            you. The Academy's curated blogs can help you stay ahead of the curve.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: any }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
        {/* Read Time Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
            <span className="text-sm font-bold text-gray-700">{post.readTime.split(' ')[0]}</span>
          </div>
          <div className="text-center mt-1">
            <span className="text-xs text-white font-medium">MIN</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}