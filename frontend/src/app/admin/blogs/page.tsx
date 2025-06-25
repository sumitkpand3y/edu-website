"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Calendar,
  Tag,
  BookOpen,
  Save,
  X,
  Clock,
  Image as ImageIcon,
  Bold,
  Italic,
  Link,
  List,
  Quote,
  Code,
} from "lucide-react";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "@/hooks/blogApi";

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder }) => {
  const [isPreview, setIsPreview] = useState(false);

  const insertTag = (openTag, closeTag = "") => {
    const textarea = document.getElementById("content-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const newText =
      value.substring(0, start) +
      openTag +
      selectedText +
      closeTag +
      value.substring(end);
    onChange({ target: { name: "content", value: newText } });

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + openTag.length,
        start + openTag.length + selectedText.length
      );
    }, 0);
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      const altText = prompt("Enter alt text (optional):") || "Image";
      const imageTag = `<img src="${url}" alt="${altText}" class="w-full rounded-lg my-6" />`;
      insertTag(imageTag);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      const linkText = prompt("Enter link text:") || url;
      insertTag(
        `<a href="${url}" class="text-blue-600 hover:underline">`,
        `</a>`
      );
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 p-3 border-b border-gray-200 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => insertTag("<strong>", "</strong>")}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag("<em>", "</em>")}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            insertTag('<h2 class="text-2xl font-bold mt-8 mb-4">', "</h2>")
          }
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded text-sm font-bold"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            insertTag('<h3 class="text-xl font-semibold mt-6 mb-3">', "</h3>")
          }
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded text-sm font-bold"
          title="Heading 3"
        >
          H3
        </button>
        <div className="w-px bg-gray-300 mx-1 my-1"></div>
        <button
          type="button"
          onClick={insertLink}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
          title="Link"
        >
          <Link className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={insertImage}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
          title="Image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            insertTag(
              '<ul class="list-disc pl-6 my-4">\n  <li>',
              "</li>\n</ul>"
            )
          }
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            insertTag(
              '<blockquote class="border-l-4 border-blue-500 pl-4 italic my-6">',
              "</blockquote>"
            )
          }
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            insertTag(
              '<code class="bg-gray-100 px-2 py-1 rounded text-sm">',
              "</code>"
            )
          }
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </button>
        <div className="flex-1"></div>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className={`px-3 py-2 text-sm rounded ${
            isPreview
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {/* Editor/Preview */}
      <div className="min-h-[400px]">
        {isPreview ? (
          <div className="p-4 max-h-96 overflow-y-auto">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        ) : (
          <textarea
            id="content-editor"
            name="content"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full h-96 p-4 resize-none focus:outline-none font-mono text-sm"
          />
        )}
      </div>
    </div>
  );
};

// Helper functions
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const estimateReadTime = (content) => {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, "");
  const wordCount = textContent.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min`;
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const [previewPost, setPreviewPost] = useState(null);

  const [postForm, setPostForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content:
      '<div class="prose prose-lg max-w-none">\n  <p>Start writing your blog post here...</p>\n</div>',
    category: "",
    tags: "",
    image: "",
    status: "DRAFT",
  });

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (postForm.title && !editingPost) {
      setPostForm((prev) => ({
        ...prev,
        slug: generateSlug(prev.title),
      }));
    }
  }, [postForm.title, editingPost]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const postData = {
        ...postForm,
        tags: postForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        readTime: estimateReadTime(postForm.content),
        date: editingPost
          ? editingPost.date
          : new Date().toISOString().split("T")[0],
      };

      if (editingPost) {
        // 🛠 Update existing blog post
        await updateBlog(editingPost.id, postData);
      } else {
        // 🆕 Create new blog post
        await createBlog(postData);
      }

      resetForm();
      loadPosts();
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setPostForm({
      title: "",
      slug: "",
      excerpt: "",
      content:
        '<div class="prose prose-lg max-w-none">\n  <p>Start writing your blog post here...</p>\n</div>',
      category: "",
      tags: "",
      image: "",
      status: "DRAFT",
    });
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(", "),
      image: post.image,
      status: post.status,
    });
    setShowPostForm(true);
  };

  const handleDeletePost = async (postId) => {
    if (
      confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      try {
        await deleteBlog(postId);
        loadPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handlePreviewPost = (post) => {
    setPreviewPost(post);
  };

  const filteredPosts = posts?.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesFilter =
      filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Blog Management
              </h1>
              <p className="text-gray-600 mt-1">
                Create and manage your blog posts with rich formatting
              </p>
            </div>
            <button
              onClick={() => setShowPostForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center font-semibold"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Post
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search posts by title, category, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
            >
              <option value="all">All Posts</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filters."
                  : "Get started by creating your first blog post."}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <button
                  onClick={() => setShowPostForm(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create First Post
                </button>
              )}
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="md:flex">
                  {post.image && (
                    <div className="md:w-48 h-48 md:h-auto">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              post.status === "PUBLISHED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.status}
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                          {post.title}
                        </h2>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handlePreviewPost(post)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                          title="Preview post"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Post Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={postForm.title}
                    onChange={handleInputChange}
                    placeholder="Enter your blog post title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={postForm.slug}
                    onChange={handleInputChange}
                    placeholder="url-friendly-slug"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This will be used in the URL: /blog/{postForm.slug}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={postForm.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Brief description of your post..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *{" "}
                    <span className="text-sm font-normal text-gray-500">
                      - Use the toolbar to format text and add images
                    </span>
                  </label>
                  <RichTextEditor
                    value={postForm.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={postForm.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Healthcare, Digital Health"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={postForm.tags}
                      onChange={handleInputChange}
                      placeholder="Healthcare, Technology, Innovation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Separate tags with commas
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={postForm.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={postForm.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    saving ||
                    !postForm.title ||
                    !postForm.content ||
                    !postForm.category
                  }
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingPost ? "Update Post" : "Create Post"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Preview: {previewPost.title}
              </h3>
              <button
                onClick={() => setPreviewPost(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Post Header */}
              <div className="mb-6">
                {previewPost.image && (
                  <img
                    src={previewPost.image}
                    alt={previewPost.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}

                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      previewPost.status === "PUBLISHED"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {previewPost.status}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {previewPost.category}
                  </span>
                  {previewPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {previewPost.title}
                </h1>

                <div className="flex items-center text-sm text-gray-500 space-x-6 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(previewPost.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {previewPost.readTime} read
                  </div>
                </div>

                {previewPost.excerpt && (
                  <p className="text-lg text-gray-600 italic border-l-4 border-blue-500 pl-4 mb-6">
                    {previewPost.excerpt}
                  </p>
                )}
              </div>

              {/* Post Content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: previewPost.content }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
