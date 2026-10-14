import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, Image as ImageIcon, Eye, Check } from 'lucide-react';
import { Post, CategoryType, GarmentTag } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishPost: (newPost: Post) => void;
}

const CATEGORY_OPTIONS: CategoryType[] = [
  'Haute Couture & Tailoring',
  'Sustainable & Raw Textiles',
  'Minimalist Spaces & Living',
  'Streetwear & Subcultures',
  'Capsule Wardrobe & Styling',
];

const PRESET_IMAGES = [
  {
    name: 'Camel Sculptural Coat',
    url: '/src/assets/images/hero_fashion_editorial_1791964916635.jpg',
  },
  {
    name: 'Parisian Minimal Living',
    url: '/src/assets/images/lifestyle_minimal_interior_1791964918111.jpg',
  },
  {
    name: 'Raw Indigo & Concrete',
    url: '/src/assets/images/streetwear_tokyo_aesthetic_1791964918763.jpg',
  },
  {
    name: 'Atelier Silk Moulage',
    url: '/src/assets/images/textile_craft_couture_1791964918638.jpg',
  },
];

const PRESET_PALETTES = [
  { label: 'Camel & Obsidian', colors: ['#B88E62', '#1C1917', '#DFD3C3', '#5D4037'] },
  { label: 'Travertine & Flax', colors: ['#F5EFE6', '#D6C7B2', '#8C7B6B', '#3E342B'] },
  { label: 'Indigo & Concrete', colors: ['#2B3A4A', '#7A8288', '#383E42', '#181B1D'] },
  { label: 'Silk Organza & Ecru', colors: ['#FAF6F0', '#E2D5C3', '#9D8876', '#4A3E36'] },
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPublishPost,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Haute Couture & Tailoring');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('Resident Curator');
  const [authorRole, setAuthorRole] = useState('Fashion & Lifestyle Contributor');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState('Tailoring, Wool, Minimalism, Autumn2026');
  const [palette, setPalette] = useState<string[]>(PRESET_PALETTES[0].colors);
  const [showPreview, setShowPreview] = useState(false);

  // Garment breakdown items
  const [outfitItems, setOutfitItems] = useState<GarmentTag[]>([
    {
      garment: 'Sculptural Tailored Coat',
      designerOrBrand: 'Studio Independent',
      textileMaterial: '100% Melton Wool',
      silhouetteNote: 'Structured architectural shoulder with relaxed drape',
    },
  ]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOutfitItem = () => {
    setOutfitItems([
      ...outfitItems,
      { garment: '', designerOrBrand: '', textileMaterial: '', silhouetteNote: '' },
    ]);
  };

  const handleRemoveOutfitItem = (index: number) => {
    setOutfitItems(outfitItems.filter((_, i) => i !== index));
  };

  const handleOutfitChange = (index: number, field: keyof GarmentTag, value: string) => {
    const updated = [...outfitItems];
    updated[index][field] = value;
    setOutfitItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `${category} Editorial`,
      content: content.trim(),
      author: {
        name: authorName.trim() || 'Resident Curator',
        handle: `@${(authorName || 'curator').toLowerCase().replace(/\s+/g, '.')}`,
        role: authorRole.trim() || 'Fashion & Lifestyle Contributor',
      },
      category,
      image: selectedImage,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      likes: 1,
      isLiked: true,
      isSaved: false,
      tags: tags.length > 0 ? tags : ['LifestyleDesign', 'ModernAesthetic'],
      outfitBreakdown: outfitItems.filter((item) => item.garment.trim().length > 0),
      palette,
      comments: [
        {
          id: `c-${Date.now()}`,
          authorName: 'Camille Dupont',
          authorRole: 'Master Patternmaker, Paris',
          content: 'Fascinating perspective! The material pairing and proportion harmony are well articulated.',
          timestamp: 'Just now',
          likes: 0,
        },
      ],
      readTime: `${Math.max(2, Math.ceil(content.split(' ').length / 50))} min read`,
    };

    onPublishPost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E7E5E4] bg-white flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#78716C] font-medium">
              Publish to L'Atelier Community
            </p>
            <h2 className="font-editorial text-2xl font-semibold text-[#1C1917]">
              New Fashion & Lifestyle Essay
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#57534E] hover:text-[#1C1917] bg-[#FAF8F5] border border-[#E7E5E4] rounded-md transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showPreview ? 'Edit Form' : 'Preview'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-md hover:bg-[#F5F5F4] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 lg:p-8">
          {showPreview ? (
            /* Live Preview */
            <div className="space-y-6 bg-white p-6 border border-[#E7E5E4] rounded-lg">
              <div className="space-y-2">
                <span className="text-xs font-medium text-[#8C5D3B]">{category}</span>
                <h1 className="font-editorial text-3xl font-semibold text-[#1C1917]">
                  {title || 'Untitled Fashion Essay'}
                </h1>
                <p className="text-xs text-[#78716C]">
                  By {authorName || 'Anonymous'} · {authorRole}
                </p>
              </div>

              <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#E7E5E4]">
                <img
                  src={selectedImage}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2">
                {palette.map((c, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-md border border-black/10 inline-block"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              <p className="text-sm text-[#44403C] whitespace-pre-line leading-relaxed">
                {content || 'Enter your editorial writeup...'}
              </p>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category & Kicker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    Category Discourse
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    Subtitle / Series Kicker
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Autumn/Winter Silhouette Study"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                  Editorial Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sculptural Melton Wool and the Architecture of Modern Proportion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
                />
              </div>

              {/* Visual Media Selection */}
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                  Featured Imagery & Look
                </label>

                {/* Preset Editorial Images or Custom Upload */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {PRESET_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(img.url)}
                      className={`relative aspect-[4/3] rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedImage === img.url
                          ? 'border-[#1C1917] shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[10px] text-white truncate text-center">
                        {img.name}
                      </div>
                      {selectedImage === img.url && (
                        <div className="absolute top-1 right-1 bg-[#1C1917] text-white rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* File Upload Option */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white border border-[#E7E5E4] rounded-md hover:bg-[#F5F5F4] cursor-pointer transition-colors text-[#57534E]">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {customImage && (
                    <span className="text-xs text-emerald-700 font-medium">
                      Custom image loaded
                    </span>
                  )}
                </div>
              </div>

              {/* Editorial Essay / Analysis */}
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                  Editorial Essay & Design Critique
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Articulate the silhouette, garment construction, fabric drape, living philosophy, or cultural subtext..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 text-xs bg-white border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917] resize-none leading-relaxed"
                />
              </div>

              {/* Garment Anatomy Tagger */}
              <div className="p-4 bg-white border border-[#E7E5E4] rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1C1917]">
                    Garment & Object Breakdown (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddOutfitItem}
                    className="flex items-center gap-1 text-xs text-[#8C5D3B] hover:text-[#1C1917] font-medium cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {outfitItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-[#FAF8F5] p-2.5 rounded border border-[#E7E5E4] text-xs"
                    >
                      <input
                        type="text"
                        placeholder="Garment Name (e.g. Trench)"
                        value={item.garment}
                        onChange={(e) => handleOutfitChange(idx, 'garment', e.target.value)}
                        className="px-2 py-1.5 bg-white border border-[#E7E5E4] rounded focus:outline-none focus:border-[#1C1917]"
                      />
                      <input
                        type="text"
                        placeholder="Designer / Label"
                        value={item.designerOrBrand}
                        onChange={(e) =>
                          handleOutfitChange(idx, 'designerOrBrand', e.target.value)
                        }
                        className="px-2 py-1.5 bg-white border border-[#E7E5E4] rounded focus:outline-none focus:border-[#1C1917]"
                      />
                      <input
                        type="text"
                        placeholder="Fabric / Textile"
                        value={item.textileMaterial}
                        onChange={(e) =>
                          handleOutfitChange(idx, 'textileMaterial', e.target.value)
                        }
                        className="px-2 py-1.5 bg-white border border-[#E7E5E4] rounded focus:outline-none focus:border-[#1C1917]"
                      />
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          placeholder="Silhouette Note"
                          value={item.silhouetteNote}
                          onChange={(e) =>
                            handleOutfitChange(idx, 'silhouetteNote', e.target.value)
                          }
                          className="flex-1 px-2 py-1.5 bg-white border border-[#E7E5E4] rounded focus:outline-none focus:border-[#1C1917]"
                        />
                        {outfitItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOutfitItem(idx)}
                            className="p-1 text-[#DC2626] hover:bg-[#FEF2F2] rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Palette Selection */}
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                  Color Harmony Spectrum
                </label>
                <div className="flex flex-wrap gap-3">
                  {PRESET_PALETTES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPalette(preset.colors)}
                      className={`flex items-center gap-2 p-1.5 border rounded-md cursor-pointer transition-colors ${
                        JSON.stringify(palette) === JSON.stringify(preset.colors)
                          ? 'border-[#1C1917] bg-white shadow-xs'
                          : 'border-[#E7E5E4] bg-white hover:border-[#A8A29E]'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {preset.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#57534E] font-medium pr-1">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Author & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    Your Role / Studio
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1C1917] mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#E7E5E4] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#322E2B] transition-colors cursor-pointer shadow-sm active:translate-y-px"
                >
                  Publish Editorial Essay
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
