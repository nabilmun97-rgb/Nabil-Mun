import React from 'react';
import { Heart, Bookmark, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onReadPost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onReadPost,
  onToggleLike,
  onToggleSave,
}) => {
  return (
    <article className="group flex flex-col bg-white border border-[#E7E5E4] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Visual media container with measured aspect ratio */}
      <div
        onClick={() => onReadPost(post)}
        className="relative w-full aspect-[4/3] bg-[#E7E5E4] overflow-hidden cursor-pointer"
      >
        <img
          src={post.image}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Quick Read Overlay Icon */}
        <div className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#1C1917] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        {/* Color Palette Micro-Strip */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 p-1 bg-white/85 backdrop-blur-sm rounded-md shadow-xs">
          {post.palette.map((color, idx) => (
            <span
              key={idx}
              title={`Swatch ${color}`}
              className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Clean unboxed metadata (NO PILLS) */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] flex-wrap">
            <span className="font-medium text-[#8C5D3B]">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{post.date}</span>
          </div>

          {/* Title */}
          <h2
            onClick={() => onReadPost(post)}
            className="font-editorial text-xl font-semibold text-[#1C1917] hover:text-[#8C5D3B] cursor-pointer transition-colors leading-snug line-clamp-2"
          >
            {post.title}
          </h2>

          {/* Subtitle / Excerpt */}
          <p className="text-xs sm:text-sm text-[#57534E] line-clamp-2 leading-relaxed">
            {post.content}
          </p>

          {/* Tags as clean unboxed text with hash */}
          <div className="flex items-center gap-2 pt-1 text-xs text-[#A8A29E] flex-wrap">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span key={i}>#{tag}</span>
            ))}
          </div>
        </div>

        {/* Card Footer: Author + Interactive Actions */}
        <div className="pt-4 mt-4 border-t border-[#F5F5F4] flex items-center justify-between">
          <div className="text-xs">
            <p className="font-medium text-[#1C1917]">{post.author.name}</p>
            <p className="text-[#78716C] text-[11px] truncate max-w-[140px] sm:max-w-[180px]">
              {post.author.role}
            </p>
          </div>

          {/* Functional Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleLike(post.id)}
              className={`flex items-center gap-1 text-xs font-mono tabular-nums p-1.5 rounded transition-colors cursor-pointer ${
                post.isLiked
                  ? 'text-[#DC2626] bg-[#FEF2F2]'
                  : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4]'
              }`}
              title="Like editorial post"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  post.isLiked ? 'fill-current text-[#DC2626]' : ''
                }`}
              />
              <span>{post.likes}</span>
            </button>

            <button
              onClick={() => onReadPost(post)}
              className="flex items-center gap-1 text-xs font-mono tabular-nums text-[#78716C] hover:text-[#1C1917] p-1.5 rounded hover:bg-[#F5F5F4] transition-colors cursor-pointer"
              title="View comments"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{post.comments.length}</span>
            </button>

            <button
              onClick={() => onToggleSave(post.id)}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                post.isSaved
                  ? 'text-[#8C5D3B] bg-[#FDF8F3]'
                  : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4]'
              }`}
              title={post.isSaved ? 'Saved in lookbook' : 'Save to lookbook'}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  post.isSaved ? 'fill-current text-[#8C5D3B]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
