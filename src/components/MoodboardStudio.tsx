import React, { useState } from 'react';
import { Sparkles, Palette, Layers, Plus, Trash2, ArrowRight, Share2, Check } from 'lucide-react';
import { Post } from '../types';

interface MoodboardStudioProps {
  onOpenCreateWithData: (initialTitle: string, initialContent: string, palette: string[]) => void;
}

const PRESET_SILHOUETTES = [
  { id: 'sil-1', name: 'Monolithic Melton Coat', category: 'Outerwear', desc: 'Peaked cowl lapels with dropped raglan shoulder pitch' },
  { id: 'sil-2', name: 'Roman Travertine Table', category: 'Interior', desc: 'Monolithic open-pored chiseled stone slab' },
  { id: 'sil-3', name: 'Wide Selvedge Trouser', category: 'Bottoms', desc: 'Kojima 16oz raw indigo with double-cuff break' },
  { id: 'sil-4', name: 'Bias Organza Moulage', category: 'Couture', desc: 'Spiral grain drapery pinned on vintage Stockman form' },
  { id: 'sil-5', name: 'Loopwheel Heavy Crewneck', category: 'Knitwear', desc: 'Wakayama tubular ring-spun fleece 500gsm' },
];

const PRESET_TEXTILES = [
  { id: 'tex-1', name: '720g Double-Faced Camel Wool', mill: 'Biella Heritage Mill, Italy' },
  { id: 'tex-2', name: '580g Unbleached Belgian Flax', mill: 'Kortrijk Loom, Belgium' },
  { id: 'tex-3', name: '16oz Pure Plant Indigo Denim', mill: 'Okayama Shuttle Guild, Japan' },
  { id: 'tex-4', name: 'Mulberry Silk Organza & Crêpe', mill: 'Como Silk Weavers, Italy' },
];

export const MoodboardStudio: React.FC<MoodboardStudioProps> = ({
  onOpenCreateWithData,
}) => {
  const [boardTitle, setBoardTitle] = useState('Autumn/Winter Form & Tactile Monoliths');
  const [designPhilosophy, setDesignPhilosophy] = useState(
    'A study in weight and subtraction: balancing heavy Biella melton wool with raw unfilled travertine stone and undyed Normandy linen.'
  );

  const [activeSilhouettes, setActiveSilhouettes] = useState<string[]>([
    'sil-1',
    'sil-2',
    'sil-4',
  ]);

  const [activeTextiles, setActiveTextiles] = useState<string[]>([
    'tex-1',
    'tex-2',
  ]);

  const [swatches, setSwatches] = useState<string[]>([
    '#B88E62',
    '#F5EFE6',
    '#2B3A4A',
    '#1C1917',
  ]);

  const [customColor, setCustomColor] = useState('#8C7B6B');

  const toggleSilhouette = (id: string) => {
    setActiveSilhouettes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleTextile = (id: string) => {
    setActiveTextiles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddColor = () => {
    if (!swatches.includes(customColor) && swatches.length < 6) {
      setSwatches([...swatches, customColor]);
    }
  };

  const handleRemoveColor = (color: string) => {
    setSwatches(swatches.filter((c) => c !== color));
  };

  const handleExportToPost = () => {
    const selectedSil = PRESET_SILHOUETTES.filter((s) => activeSilhouettes.includes(s.id))
      .map((s) => s.name)
      .join(', ');
    const selectedTex = PRESET_TEXTILES.filter((t) => activeTextiles.includes(t.id))
      .map((t) => t.name)
      .join(', ');

    const fullContent = `${designPhilosophy}\n\nKey Silhouettes Explored: ${selectedSil}.\nTextile Specimen Foundations: ${selectedTex}.\n\nThis moodboard synthesizes tactile materiality with unhurried living and architectural draping.`;

    onOpenCreateWithData(boardTitle, fullContent, swatches);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Editorial Section Header */}
      <div className="pb-6 mb-8 border-b border-[#E7E5E4] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#78716C] font-medium">
            Creative Atelier Canvas
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1917] mt-1">
            Fashion & Lifestyle Moodboard Studio
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            Compose silhouettes, curated color harmonies, and tactile textile recipes before drafting your editorial essay.
          </p>
        </div>

        <button
          onClick={handleExportToPost}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#322E2B] transition-colors cursor-pointer self-start md:self-auto shrink-0 shadow-sm"
        >
          <span>Draft Post from Moodboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Element Library */}
        <div className="lg:col-span-5 space-y-6">
          {/* Board Title & Notes */}
          <div className="p-5 bg-white border border-[#E7E5E4] rounded-lg space-y-3">
            <h3 className="font-editorial text-xl font-semibold text-[#1C1917]">
              Board Specifications
            </h3>
            <div>
              <label className="block text-xs font-medium text-[#78716C] mb-1">
                Collection / Concept Title
              </label>
              <input
                type="text"
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#78716C] mb-1">
                Aesthetic Philosophy & Mood
              </label>
              <textarea
                rows={3}
                value={designPhilosophy}
                onChange={(e) => setDesignPhilosophy(e.target.value)}
                className="w-full p-3 text-xs bg-[#FAF8F5] border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917] resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Silhouette Archetypes Selection */}
          <div className="p-5 bg-white border border-[#E7E5E4] rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-xl font-semibold text-[#1C1917]">
                Silhouette Library
              </h3>
              <span className="text-xs text-[#78716C]">
                {activeSilhouettes.length} selected
              </span>
            </div>
            <div className="space-y-2">
              {PRESET_SILHOUETTES.map((sil) => {
                const isSelected = activeSilhouettes.includes(sil.id);
                return (
                  <div
                    key={sil.id}
                    onClick={() => toggleSilhouette(sil.id)}
                    className={`p-3 rounded-md border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#1C1917] bg-[#FAF8F5]'
                        : 'border-[#E7E5E4] bg-white hover:border-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[#1C1917]">{sil.name}</p>
                      <span className="text-[11px] text-[#8C5D3B]">{sil.category}</span>
                    </div>
                    <p className="text-[11px] text-[#78716C] mt-1">{sil.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Textile Specimens Selection */}
          <div className="p-5 bg-white border border-[#E7E5E4] rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-xl font-semibold text-[#1C1917]">
                Textile Specimens
              </h3>
              <span className="text-xs text-[#78716C]">
                {activeTextiles.length} selected
              </span>
            </div>
            <div className="space-y-2">
              {PRESET_TEXTILES.map((tex) => {
                const isSelected = activeTextiles.includes(tex.id);
                return (
                  <div
                    key={tex.id}
                    onClick={() => toggleTextile(tex.id)}
                    className={`p-3 rounded-md border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#1C1917] bg-[#FAF8F5]'
                        : 'border-[#E7E5E4] bg-white hover:border-[#A8A29E]'
                    }`}
                  >
                    <p className="font-medium text-[#1C1917]">{tex.name}</p>
                    <p className="text-[11px] text-[#78716C] mt-0.5">{tex.mill}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Swatch Formulations */}
          <div className="p-5 bg-white border border-[#E7E5E4] rounded-lg space-y-3">
            <h3 className="font-editorial text-xl font-semibold text-[#1C1917]">
              Palette Formulations
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-8 h-8 rounded border border-[#E7E5E4] cursor-pointer"
              />
              <span className="text-xs font-mono tabular-nums text-[#57534E]">
                {customColor}
              </span>
              <button
                type="button"
                onClick={handleAddColor}
                className="ml-auto px-3 py-1.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded text-xs text-[#1C1917] hover:bg-[#EFECE6] cursor-pointer"
              >
                Add Swatch
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Curated Moodboard Canvas */}
        <div className="lg:col-span-7 bg-white border border-[#E7E5E4] rounded-xl p-8 shadow-sm space-y-8 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8C5D3B] font-medium">
                Atelier Moodboard View
              </p>
              <h1 className="font-editorial text-3xl font-semibold text-[#1C1917] mt-0.5">
                {boardTitle}
              </h1>
            </div>
            <div className="text-xs text-[#78716C] font-mono">
              CURATION NO. 08
            </div>
          </div>

          {/* Color Spectrum Bar on Canvas */}
          <div>
            <p className="text-xs text-[#78716C] uppercase tracking-wider mb-2 font-medium">
              Chromatic Harmony Spectrum
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {swatches.map((swatch, i) => (
                <div key={i} className="group relative flex flex-col items-center">
                  <div
                    className="w-16 h-20 rounded-md border border-black/10 shadow-xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: swatch }}
                  />
                  <span className="text-[11px] font-mono tabular-nums text-[#78716C] mt-1.5">
                    {swatch}
                  </span>
                  {swatches.length > 2 && (
                    <button
                      onClick={() => handleRemoveColor(swatch)}
                      className="absolute -top-1.5 -right-1.5 bg-white border border-[#E7E5E4] rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[#DC2626]"
                      title="Remove swatch"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy Monograph Card */}
          <div className="p-5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-lg">
            <p className="text-xs uppercase tracking-wider text-[#78716C] mb-1 font-medium">
              Curatorial Philosophy
            </p>
            <p className="font-serif text-lg text-[#292524] leading-relaxed italic">
              "{designPhilosophy}"
            </p>
          </div>

          {/* Selected Silhouette Cards */}
          <div>
            <p className="text-xs text-[#78716C] uppercase tracking-wider mb-3 font-medium">
              Structural Forms in Dialogue ({activeSilhouettes.length})
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESET_SILHOUETTES.filter((s) => activeSilhouettes.includes(s.id)).map(
                (item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-[#E7E5E4] rounded-lg shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1C1917]">{item.name}</span>
                      <span className="text-[#8C5D3B]">{item.category}</span>
                    </div>
                    <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Selected Textile Foundations */}
          <div>
            <p className="text-xs text-[#78716C] uppercase tracking-wider mb-3 font-medium">
              Textile & Material Foundations ({activeTextiles.length})
            </p>
            <div className="space-y-2">
              {PRESET_TEXTILES.filter((t) => activeTextiles.includes(t.id)).map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#FCFBF9] border border-[#E7E5E4] rounded-md flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-[#1C1917]">{item.name}</span>
                  <span className="text-[#78716C]">{item.mill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs text-[#78716C]">
            <span>Moodboard ready for editorial publication</span>
            <button
              onClick={handleExportToPost}
              className="text-[#8C5D3B] hover:text-[#1C1917] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Export to Post Builder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
