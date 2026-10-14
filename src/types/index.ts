export type CategoryType = 
  | 'All Curations'
  | 'Haute Couture & Tailoring'
  | 'Sustainable & Raw Textiles'
  | 'Minimalist Spaces & Living'
  | 'Streetwear & Subcultures'
  | 'Capsule Wardrobe & Styling';

export interface GarmentTag {
  garment: string;
  designerOrBrand: string;
  textileMaterial: string;
  silhouetteNote: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    handle: string;
    role: string;
    avatar?: string;
  };
  category: CategoryType;
  image: string;
  date: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
  outfitBreakdown: GarmentTag[];
  palette: string[];
  comments: Comment[];
  readTime: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  senderAvatar?: string;
  isMe: boolean;
  content: string;
  timestamp: string;
  attachmentImage?: string;
  channelId?: string;
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  topic: string;
  unreadCount?: number;
}

export interface DesignerContact {
  id: string;
  name: string;
  handle: string;
  role: string;
  city: string;
  avatar: string;
  bio: string;
  recentTopic: string;
  status: 'active' | 'in atelier' | 'traveling';
}

export interface MoodboardItem {
  id: string;
  type: 'image' | 'text' | 'swatch' | 'textile';
  content: string;
  label?: string;
  x?: number;
  y?: number;
  color?: string;
}
