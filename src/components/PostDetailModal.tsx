import React, { useState } from 'react';
import { X, Heart, Bookmark, MessageSquare, Send, Share2, Tag, Check } from 'lucide-react';
import { Post, Comment } from '../types';

interface PostDetailModalProps {
  post: Post | null;
  onClose: () => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
  onAddComment: (postId: string, commentText: string, authorName: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
  onToggleLike,
  onToggleSave,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('Resident Designer');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!post) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(post.id, newComment.trim(), authorName.trim() || 'Atelier Contributor');
    setNewComment('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div
        className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#E7E5E4] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <span className="font-medium text-[#1C1917]">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{post.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-md hover:bg-[#F5F5F4] transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-md hover:bg-[#F5F5F4] transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 lg:p-10 space-y-8">
          {/* Title Header */}
          <div className="space-y-3">
            <p className="text-xs tracking-widest uppercase text-[#8C5D3B] font-medium">
              {post.subtitle}
            </p>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1917] leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#78716C]">
              <div>
                <span className="font-semibold text-[#1C1917]">{post.author.name}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>{post.author.role}</span>
              </div>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{post.readTime}</span>
            </div>
          </div>

          {/* Full High-Resolution Image Container */}
          <div className="relative rounded-lg overflow-hidden bg-[#E7E5E4] max-h-[560px] w-full flex items-center justify-center">
            <img
              src={post.image}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover max-h-[560px]"
            />
          </div>

          {/* Color Palette Strip */}
          <div className="p-4 bg-white border border-[#E7E5E4] rounded-lg">
            <p className="text-xs font-medium text-[#78716C] uppercase tracking-wider mb-2.5">
              Curated Color Spectrum & Textile Palette
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {post.palette.map((color, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-md border border-black/10 inline-block shadow-xs"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs font-mono tabular-nums text-[#57534E]">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Article Prose */}
          <div className="prose prose-stone max-w-none">
            <div className="text-base sm:text-lg text-[#292524] leading-relaxed whitespace-pre-line font-serif">
              {post.content}
            </div>
          </div>

          {/* Garment & Outfit Anatomy Breakdown */}
          {post.outfitBreakdown && post.outfitBreakdown.length > 0 && (
            <div className="p-6 bg-white border border-[#E7E5E4] rounded-lg space-y-4">
              <h3 className="font-editorial text-2xl font-semibold text-[#1C1917]">
                Garment Anatomy & Materiality
              </h3>
              <div className="divide-y divide-[#E7E5E4]">
                {post.outfitBreakdown.map((item, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs">
                    <div className="sm:w-1/3">
                      <p className="font-semibold text-sm text-[#1C1917]">{item.garment}</p>
                      <p className="text-[#8C5D3B]">{item.designerOrBrand}</p>
                    </div>
                    <div className="sm:w-1/3 text-[#57534E]">
                      <span className="font-medium text-[#1C1917]">Textile: </span>
                      {item.textileMaterial}
                    </div>
                    <div className="sm:w-1/3 text-[#78716C]">
                      <span className="font-medium text-[#1C1917]">Silhouette: </span>
                      {item.silhouetteNote}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono text-[#78716C] bg-white border border-[#E7E5E4] px-2.5 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Interactions Bar */}
          <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onToggleLike(post.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  post.isLiked
                    ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FCA5A5]'
                    : 'bg-white border border-[#E7E5E4] text-[#1C1917] hover:bg-[#F5F5F4]'
                }`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="font-mono tabular-nums">{post.likes} Applaud</span>
              </button>

              <button
                onClick={() => onToggleSave(post.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  post.isSaved
                    ? 'bg-[#FDF8F3] text-[#8C5D3B] border border-[#F5D8BD]'
                    : 'bg-white border border-[#E7E5E4] text-[#1C1917] hover:bg-[#F5F5F4]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
                <span>{post.isSaved ? 'In Your Lookbook' : 'Save to Lookbook'}</span>
              </button>
            </div>

            <div className="text-xs font-mono tabular-nums text-[#78716C] flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments.length} Critiques & Notes</span>
            </div>
          </div>

          {/* Live Comments & Communication Section */}
          <div className="space-y-6 pt-6 border-t border-[#E7E5E4]">
            <h3 className="font-editorial text-2xl font-semibold text-[#1C1917]">
              Atelier Discussion ({post.comments.length})
            </h3>

            {/* Post a Comment Form */}
            <form onSubmit={handleSubmitComment} className="p-4 bg-white border border-[#E7E5E4] rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Your Name / Studio Tag"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E7E5E4] rounded focus:outline-none focus:border-[#1C1917] w-48 text-[#1C1917]"
                />
                <span className="text-xs text-[#78716C]">Contributing to critique</span>
              </div>
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="Share your perspective on the silhouette, drape, fabric composition, or styling..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 text-xs bg-[#FAF8F5] border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] resize-none text-[#1C1917] placeholder:text-[#A8A29E]"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#322E2B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Critique</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-white border border-[#E7E5E4] rounded-lg space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#1C1917]">{comment.authorName}</span>
                      <span className="mx-1.5 text-[#A8A29E]" aria-hidden="true">·</span>
                      <span className="text-[#78716C]">{comment.authorRole}</span>
                    </div>
                    <span className="font-mono tabular-nums text-[#A8A29E] text-[11px]">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-[#44403C] leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
