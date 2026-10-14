import React from 'react';

interface FooterProps {
  onSelectTab: (tab: 'feed' | 'lounges' | 'moodboard' | 'trends' | 'lookbook') => void;
  onOpenCreate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenCreate }) => {
  return (
    <footer className="mt-20 border-t border-[#E7E5E4] bg-white py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-editorial text-2xl font-semibold text-[#1C1917] tracking-tight">
            L'Atelier Mode & Lifestyle
          </span>
          <p className="text-xs text-[#78716C] mt-1 max-w-md">
            An international platform dedicated to haute couture patternmaking, slow textiles, brutalist streetwear, and mindful interior architecture.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[#57534E]">
          <button
            onClick={() => onSelectTab('feed')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            Curated Feed
          </button>
          <button
            onClick={() => onSelectTab('lounges')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            Design Lounges
          </button>
          <button
            onClick={() => onSelectTab('moodboard')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            Moodboard Studio
          </button>
          <button
            onClick={() => onSelectTab('trends')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            Trend Radar
          </button>
          <button
            onClick={onOpenCreate}
            className="hover:text-[#1C1917] font-medium transition-colors cursor-pointer text-[#8C5D3B]"
          >
            Submit Monograph
          </button>
        </div>

        <div className="text-xs font-mono text-[#A8A29E]">
          © {new Date().getFullYear()} L'Atelier Mode. Paris · Milan · Tokyo.
        </div>
      </div>
    </footer>
  );
};
