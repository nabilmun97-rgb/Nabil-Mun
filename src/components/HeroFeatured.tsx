import React from 'react';
import { ArrowRight, Bookmark, Heart, MessageSquare } from 'lucide-react';
import { Post } from '../types';

interface HeroFeaturedProps {
  post: Post;
  onReadPost: (post: Post) => void;
  onOpenCreate: () => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  post,
  onReadPost,
  onOpenCreate,
}) => {
  return (
    <section className="border-b border-[#E7E5E4] bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Quiet unboxed kicker */}
              <div className="flex items-center gap-2 text-xs font-medium text-[#78716C] tracking-widest uppercase">
                <span>Featured Monograph</span>
                <span aria-hidden="true">·</span>
                <span>Autumn/Winter Haute Couture</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>

              {/* Refined Display Headline */}
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1917] leading-[1.12] tracking-tight text-balance">
                {post.title}
              </h1>

              {/* Lead Editorial Copy */}
              <p className="text-[#57534E] text-base lg:text-lg leading-relaxed line-clamp-4">
                {post.content}
              </p>
            </div>

            {/* Author Credit & Garment Breakdown Preview */}
            <div className="space-y-4 pt-4 border-t border-[#E7E5E4]">
              <div className="flex items-center justify-between text-xs text-[#78716C]">
                <div>
                  <span className="font-medium text-[#1C1917]">{post.author.name}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{post.author.role}</span>
                </div>
                <span className="font-mono tabular-nums">{post.date}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onReadPost(post)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#322E2B] transition-colors cursor-pointer group"
                >
                  <span>Read Full Analysis & Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={onOpenCreate}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D6D3D1] text-[#1C1917] text-xs font-medium rounded-md hover:bg-[#F5F5F4] transition-colors cursor-pointer"
                >
                  <span>Share Your Look or Journal</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Container at Matching Height */}
          <div className="lg:col-span-6 relative flex flex-col">
            <div
              onClick={() => onReadPost(post)}
              className="relative w-full h-80 sm:h-96 lg:h-full min-h-[380px] rounded-lg overflow-hidden cursor-pointer group shadow-sm bg-[#E7E5E4]"
            >
              <img
                src={post.image}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Overlay Metadata Tagging */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#E7E5E4] font-medium">
                    {post.outfitBreakdown[0]?.designerOrBrand || 'Haute Couture Studio'}
                  </p>
                  <p className="font-editorial text-lg text-white font-medium">
                    {post.outfitBreakdown[0]?.garment || 'Tailored Monolith'}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-white/90">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current text-white/80" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {post.comments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Editorial Metrics Strip in Full-Width Row below split */}
        <div className="mt-12 pt-8 border-t border-[#E7E5E4] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <div className="font-editorial text-2xl lg:text-3xl font-semibold text-[#1C1917] tabular-nums">
              1,420+
            </div>
            <p className="text-xs text-[#78716C] mt-1">Couture & Lifestyle Posts</p>
          </div>
          <div>
            <div className="font-editorial text-2xl lg:text-3xl font-semibold text-[#1C1917] tabular-nums">
              88
            </div>
            <p className="text-xs text-[#78716C] mt-1">Independent Design Houses</p>
          </div>
          <div>
            <div className="font-editorial text-2xl lg:text-3xl font-semibold text-[#1C1917] tabular-nums">
              24
            </div>
            <p className="text-xs text-[#78716C] mt-1">Sustainable Textile Mills</p>
          </div>
          <div>
            <div className="font-editorial text-2xl lg:text-3xl font-semibold text-[#1C1917] tabular-nums">
              4.9/5
            </div>
            <p className="text-xs text-[#78716C] mt-1">Editorial Curation Standard</p>
          </div>
        </div>
      </div>
    </section>
  );
};
