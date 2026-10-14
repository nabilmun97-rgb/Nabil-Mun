import React, { useState } from 'react';
import { Bookmark, FileText, Heart, Plus, Edit3, Check } from 'lucide-react';
import { Post } from '../types';
import { PostCard } from './PostCard';

interface ProfileViewProps {
  posts: Post[];
  onReadPost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
  onOpenCreate: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  posts,
  onReadPost,
  onToggleLike,
  onToggleSave,
  onOpenCreate,
}) => {
  const [profileTab, setProfileTab] = useState<'published' | 'saved'>('published');
  const [name, setName] = useState('Resident Curator & Stylist');
  const [handle, setHandle] = useState('@resident.curator');
  const [bio, setBio] = useState(
    'Exploring the synthesis between mid-century French haute couture, Japanese loopwheel textiles, and contemplative interior architecture.'
  );
  const [isEditingBio, setIsEditingBio] = useState(false);

  // Filter posts
  const myPosts = posts.filter((p) => p.author.handle === handle || p.id.startsWith('post-'));
  const savedPosts = posts.filter((p) => p.isSaved);

  const displayList = profileTab === 'published' ? myPosts : savedPosts;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Profile Header Card */}
      <div className="p-8 bg-white border border-[#E7E5E4] rounded-xl shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#1C1917] text-white font-editorial text-2xl flex items-center justify-center font-semibold shrink-0">
              {name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                  {name}
                </h2>
                <span className="text-xs font-mono text-[#8C5D3B]">{handle}</span>
              </div>
              <p className="text-xs text-[#78716C] mt-0.5">
                Paris / Milan Curation Fellow · Contributor to L'Atelier Journal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditingBio(!isEditingBio)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#57534E] hover:text-[#1C1917] bg-[#FAF8F5] border border-[#E7E5E4] rounded-md transition-colors cursor-pointer"
            >
              {isEditingBio ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditingBio ? 'Save Bio' : 'Edit Studio Bio'}</span>
            </button>

            <button
              onClick={onOpenCreate}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#322E2B] transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Post</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        {isEditingBio ? (
          <div className="pt-2">
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 text-xs bg-[#FAF8F5] border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
            />
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-[#44403C] max-w-3xl leading-relaxed font-serif italic">
            "{bio}"
          </p>
        )}

        {/* Studio Metrics */}
        <div className="pt-4 border-t border-[#F5F5F4] flex items-center gap-8 text-xs text-[#78716C]">
          <div>
            <span className="font-semibold text-[#1C1917] font-mono tabular-nums">
              {myPosts.length}
            </span>{' '}
            Monographs Published
          </div>
          <div>
            <span className="font-semibold text-[#1C1917] font-mono tabular-nums">
              {savedPosts.length}
            </span>{' '}
            Archived Looks
          </div>
          <div>
            <span className="font-semibold text-[#1C1917] font-mono tabular-nums">
              4
            </span>{' '}
            Active Design Lounges
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 pt-10 pb-6 border-b border-[#E7E5E4]">
        <button
          onClick={() => setProfileTab('published')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            profileTab === 'published'
              ? 'bg-[#1C1917] text-white shadow-xs'
              : 'bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Atelier Works ({myPosts.length})</span>
        </button>

        <button
          onClick={() => setProfileTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            profileTab === 'saved'
              ? 'bg-[#1C1917] text-white shadow-xs'
              : 'bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Curated Lookbook ({savedPosts.length})</span>
        </button>
      </div>

      {/* Posts Grid */}
      <div className="pt-6">
        {displayList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayList.map((post) => (
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
          <div className="py-16 text-center bg-white border border-[#E7E5E4] rounded-lg p-8">
            <p className="font-editorial text-2xl text-[#1C1917]">
              {profileTab === 'published'
                ? 'No published monographs yet'
                : 'No saved inspirations in your lookbook'}
            </p>
            <p className="text-xs text-[#78716C] mt-2 max-w-sm mx-auto">
              {profileTab === 'published'
                ? 'Publish your first analysis of garment draping, textile innovation, or lifestyle space.'
                : 'Explore the Curated Feed and click the bookmark icon on silhouettes you wish to archive.'}
            </p>
            {profileTab === 'published' && (
              <button
                onClick={onOpenCreate}
                className="mt-4 px-4 py-2 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#322E2B] transition-colors cursor-pointer"
              >
                Create New Monograph
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
