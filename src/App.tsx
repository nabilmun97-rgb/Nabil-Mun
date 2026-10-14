import React, { useState, useEffect } from 'react';
import { Post, ChatChannel, DesignerContact, ChatMessage } from './types';
import {
  INITIAL_POSTS,
  CHAT_CHANNELS,
  DESIGNER_CONTACTS,
  INITIAL_CHANNEL_MESSAGES,
  INITIAL_DIRECT_MESSAGES,
} from './data/initialData';
import { Header } from './components/Header';
import { HeroFeatured } from './components/HeroFeatured';
import { FeedSection } from './components/FeedSection';
import { PostDetailModal } from './components/PostDetailModal';
import { CreatePostModal } from './components/CreatePostModal';
import { DesignLounges } from './components/DesignLounges';
import { MoodboardStudio } from './components/MoodboardStudio';
import { TrendRadar } from './components/TrendRadar';
import { ProfileView } from './components/ProfileView';
import { Footer } from './components/Footer';

export default function App() {
  // Posts state with localStorage hydration
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem('latelier_posts');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_POSTS;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<
    'feed' | 'lounges' | 'moodboard' | 'trends' | 'lookbook'
  >('feed');

  // Modals state
  const [activeDetailPost, setActiveDetailPost] = useState<Post | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Chat and communication state
  const [channelMessages, setChannelMessages] = useState<Record<string, ChatMessage[]>>(
    () => {
      try {
        const saved = localStorage.getItem('latelier_channel_messages');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
      return INITIAL_CHANNEL_MESSAGES;
    }
  );

  const [directMessages, setDirectMessages] = useState<Record<string, ChatMessage[]>>(
    () => {
      try {
        const saved = localStorage.getItem('latelier_direct_messages');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
      return INITIAL_DIRECT_MESSAGES;
    }
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('latelier_posts', JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  // Save chat to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'latelier_channel_messages',
        JSON.stringify(channelMessages)
      );
      localStorage.setItem(
        'latelier_direct_messages',
        JSON.stringify(directMessages)
      );
    } catch (e) {
      console.error(e);
    }
  }, [channelMessages, directMessages]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle Like on post
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newLiked = !p.isLiked;
          const updated = {
            ...p,
            isLiked: newLiked,
            likes: newLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
          if (activeDetailPost && activeDetailPost.id === postId) {
            setActiveDetailPost(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  // Toggle Bookmark/Save on post
  const handleToggleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newSaved = !p.isSaved;
          const updated = { ...p, isSaved: newSaved };
          if (activeDetailPost && activeDetailPost.id === postId) {
            setActiveDetailPost(updated);
          }
          showToast(newSaved ? 'Archived to your Lookbook' : 'Removed from Lookbook');
          return updated;
        }
        return p;
      })
    );
  };

  // Add Comment to post
  const handleAddComment = (postId: string, commentText: string, authorName: string) => {
    const newCommentObj = {
      id: `comm-${Date.now()}`,
      authorName,
      authorRole: 'Atelier Contributor',
      content: commentText,
      timestamp: 'Just now',
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updated = {
            ...p,
            comments: [newCommentObj, ...p.comments],
          };
          if (activeDetailPost && activeDetailPost.id === postId) {
            setActiveDetailPost(updated);
          }
          return updated;
        }
        return p;
      })
    );
    showToast('Critique posted to monograph');
  };

  // Publish new post
  const handlePublishPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setActiveDetailPost(newPost);
    showToast('Editorial essay published successfully');
  };

  // Send message in Design Lounges
  const handleSendMessage = (
    targetId: string,
    isChannel: boolean,
    content: string
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: 'You (Atelier Resident)',
      senderRole: 'Fashion & Lifestyle Curator',
      isMe: true,
      content,
      timestamp: timeStr,
    };

    if (isChannel) {
      setChannelMessages((prev) => ({
        ...prev,
        [targetId]: [...(prev[targetId] || []), userMsg],
      }));

      // Simulate thoughtful community / designer response
      setTimeout(() => {
        let responder = DESIGNER_CONTACTS[0]; // Camille Dupont
        let reply = `That is an insightful point regarding the drape. When you consider fabric grain tension, balancing that silhouette prevents the fabric from pulling awkwardly along the princess seam.`;

        if (targetId === 'channel-textiles') {
          responder = DESIGNER_CONTACTS[3]; // Sofia Al-Mansoor
          reply = `Precisely! In sustainable fiber production, keeping the spinning twist moderate allows the organic flax to retain its natural luster without synthetic silicone coatings.`;
        } else if (targetId === 'channel-spaces') {
          responder = DESIGNER_CONTACTS[3]; // Sofia Al-Mansoor
          reply = `The interaction of natural raking light across unpolished stone surfaces creates a calming sensory sanctuary. It transforms the feeling of the entire apartment.`;
        } else if (targetId === 'channel-capsule') {
          responder = DESIGNER_CONTACTS[1]; // Elena Rostova
          reply = `A wonderful styling observation! Pairing an architectural structured coat over relaxed fluid trousers creates the optimal tension between discipline and ease.`;
        } else if (targetId === 'channel-runway') {
          responder = DESIGNER_CONTACTS[2]; // Marcus Chen
          reply = `Notice also how the sleeve pitch must be set slightly forward when cutting an oversized coat. Otherwise, the cuffs will ride up when walking.`;
        }

        const replyMsg: ChatMessage = {
          id: `reply-${Date.now()}`,
          senderName: responder.name,
          senderRole: `${responder.role}, ${responder.city}`,
          isMe: false,
          content: reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setChannelMessages((prev) => ({
          ...prev,
          [targetId]: [...(prev[targetId] || []), replyMsg],
        }));
      }, 750);
    } else {
      // Direct message
      setDirectMessages((prev) => ({
        ...prev,
        [targetId]: [...(prev[targetId] || []), userMsg],
      }));

      // Find the designer
      const designer = DESIGNER_CONTACTS.find((d) => d.id === targetId);

      setTimeout(() => {
        const designerReply: ChatMessage = {
          id: `dm-reply-${Date.now()}`,
          senderName: designer ? designer.name : 'Atelier Master',
          senderRole: designer ? designer.role : 'Creative Lead',
          isMe: false,
          content: `Thank you for reaching out! I appreciate your eye for craftsmanship. I reviewed your query and completely agree with your direction—let us experiment with this in our next studio test.`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setDirectMessages((prev) => ({
          ...prev,
          [targetId]: [...(prev[targetId] || []), designerReply],
        }));
      }, 750);
    }
  };

  // Open create modal with moodboard data
  const handleOpenCreateWithMoodboard = (
    title: string,
    content: string,
    palette: string[]
  ) => {
    setIsCreateModalOpen(true);
    // You can also pass initial data if preferred
  };

  // Handle discussion join from trends
  const handleJoinTrendDiscussion = (topic: string) => {
    setActiveTab('lounges');
    showToast(`Jumped to Lounges to discuss "${topic}"`);
  };

  const featuredPost = posts[0] || INITIAL_POSTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] selection:bg-[#E2D5C3]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white text-xs px-4 py-2.5 rounded-md shadow-lg border border-white/10 transition-transform">
          {toastMessage}
        </div>
      )}

      {/* Top Bar Header with Strict 3-zone Contract */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        unreadCountTotal={3}
      />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'feed' && (
          <>
            {/* Split Screen Hero Monograph Showcase */}
            <HeroFeatured
              post={featuredPost}
              onReadPost={(p) => setActiveDetailPost(p)}
              onOpenCreate={() => setIsCreateModalOpen(true)}
            />

            {/* Curated Feed Section with Category Tabs & Grid */}
            <FeedSection
              posts={posts}
              onReadPost={(p) => setActiveDetailPost(p)}
              onToggleLike={handleToggleLike}
              onToggleSave={handleToggleSave}
              onOpenCreate={() => setIsCreateModalOpen(true)}
            />
          </>
        )}

        {activeTab === 'lounges' && (
          <DesignLounges
            channels={CHAT_CHANNELS}
            designers={DESIGNER_CONTACTS}
            channelMessages={channelMessages}
            directMessages={directMessages}
            onSendMessage={handleSendMessage}
          />
        )}

        {activeTab === 'moodboard' && (
          <MoodboardStudio
            onOpenCreateWithData={handleOpenCreateWithMoodboard}
          />
        )}

        {activeTab === 'trends' && (
          <TrendRadar
            onJoinDiscussion={handleJoinTrendDiscussion}
            onOpenCreate={() => setIsCreateModalOpen(true)}
          />
        )}

        {activeTab === 'lookbook' && (
          <ProfileView
            posts={posts}
            onReadPost={(p) => setActiveDetailPost(p)}
            onToggleLike={handleToggleLike}
            onToggleSave={handleToggleSave}
            onOpenCreate={() => setIsCreateModalOpen(true)}
          />
        )}
      </main>

      {/* Post Detail & Comments Modal */}
      <PostDetailModal
        post={activeDetailPost}
        onClose={() => setActiveDetailPost(null)}
        onToggleLike={handleToggleLike}
        onToggleSave={handleToggleSave}
        onAddComment={handleAddComment}
      />

      {/* Create / Publish Editorial Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPublishPost={handlePublishPost}
      />

      {/* Editorial Footer */}
      <Footer
        onSelectTab={setActiveTab}
        onOpenCreate={() => setIsCreateModalOpen(true)}
      />
    </div>
  );
}
