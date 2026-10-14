import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Post, CategoryType } from '../types';
import { PostCard } from './PostCard';

interface FeedSectionProps {
  posts: Post[];
  onReadPost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
  onOpenCreate: () => void;
}

const CATEGORIES: CategoryType[] = [
  'All Curations',
  'Haute Couture & Tailoring',
  'Sustainable & Raw Textiles',
  'Minimalist Spaces & Living',
  'Streetwear & Subcultures',
  'Capsule Wardrobe & Styling',
];

export const FeedSection: React.FC<FeedSectionProps> = ({
  posts,
  onReadPost,
  onToggleLike,
  onToggleSave,
  onOpenCreate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All Curations');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'likes' | 'comments'>('latest');

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesCategory =
          selectedCategory === 'All Curations' || post.category === selectedCategory;

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q) ||
          post.author.name.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q)) ||
          post.outfitBreakdown.some(
            (item) =>
              item.garment.toLowerCase().includes(q) ||
              item.textileMaterial.toLowerCase().includes(q) ||
              item.designerOrBrand.toLowerCase().includes(q)
          );

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'comments') return b.comments.length - a.comments.length;
        // Default latest: preserve original or array order
        return 0;
      });
  }, [posts, selectedCategory, searchQuery, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      {/* Section Header with Natural Editorial Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E7E5E4]">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#78716C] font-medium">
            Atelier Dispatch & Visual Essays
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1917] mt-1">
            Curated Runway & Lifestyle Chronicles
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
          <input
            type="text"
            placeholder="Search silhouettes, textiles, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] transition-colors placeholder:text-[#A8A29E]"
          />
        </div>
      </div>

      {/* Interactive Category Filter Bar (Buttons with click handlers) & Sort Select */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F5F4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end lg:self-auto shrink-0 text-xs text-[#78716C]">
          <span className="font-medium">Sort:</span>
          <div className="flex items-center bg-white border border-[#E7E5E4] rounded-md p-0.5">
            <button
              onClick={() => setSortBy('latest')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                sortBy === 'latest'
                  ? 'bg-[#FAF8F5] text-[#1C1917] font-medium shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setSortBy('likes')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                sortBy === 'likes'
                  ? 'bg-[#FAF8F5] text-[#1C1917] font-medium shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Most Applauded
            </button>
            <button
              onClick={() => setSortBy('comments')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                sortBy === 'comments'
                  ? 'bg-[#FAF8F5] text-[#1C1917] font-medium shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Most Discussed
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onReadPost={onReadPost}
              onToggleLike={onToggleLike}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white border border-[#E7E5E4] rounded-lg p-8 my-6">
          <p className="font-editorial text-2xl text-[#1C1917]">No editorial posts found</p>
          <p className="text-sm text-[#78716C] mt-2 max-w-md mx-auto">
            No entries match your search query or filter selection. Try adjusting your keywords or publish a new monograph to start the discussion.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All Curations');
              setSearchQuery('');
            }}
            className="mt-5 px-4 py-2 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#322E2B] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
