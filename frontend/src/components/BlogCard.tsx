import Link from 'next/link';

interface BlogPost {
  image?: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="blog-card">
      {post.image && (
        <div className="blog-card-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="category">{post.category}</span>
          <span className="date">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="learn-more">
          Learn more
        </Link>
      </div>
    </div>
  );
}
