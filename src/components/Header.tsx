import React from 'react';
import { Plus, MessageSquareQuote } from 'lucide-react';

interface HeaderProps {
  activeTab: 'feed' | 'lounges' | 'moodboard' | 'trends' | 'lookbook';
  onSelectTab: (tab: 'feed' | 'lounges' | 'moodboard' | 'trends' | 'lookbook') => void;
  onOpenCreateModal: () => void;
  unreadCountTotal: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenCreateModal,
  unreadCountTotal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E5E4] px-6 lg:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in editorial face) */}
        <button
          onClick={() => onSelectTab('feed')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-editorial text-2xl lg:text-3xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 group-hover:text-[#8C5D3B] transition-colors">
            L'Atelier Mode
          </span>
        </button>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => onSelectTab('feed')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeTab === 'feed'
                ? 'text-[#1C1917] border-[#1C1917] font-semibold'
                : 'text-[#78716C] border-transparent hover:text-[#1C1917]'
            }`}
          >
            Curated Feed
          </button>

          <button
            onClick={() => onSelectTab('lounges')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer relative ${
              activeTab === 'lounges'
                ? 'text-[#1C1917] border-[#1C1917] font-semibold'
                : 'text-[#78716C] border-transparent hover:text-[#1C1917]'
            }`}
          >
            Design Lounges
            {unreadCountTotal > 0 && (
              <span className="ml-1.5 text-xs font-mono font-normal text-[#8C5D3B]">
                ({unreadCountTotal})
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('moodboard')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeTab === 'moodboard'
                ? 'text-[#1C1917] border-[#1C1917] font-semibold'
                : 'text-[#78716C] border-transparent hover:text-[#1C1917]'
            }`}
          >
            Moodboard Studio
          </button>

          <button
            onClick={() => onSelectTab('trends')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeTab === 'trends'
                ? 'text-[#1C1917] border-[#1C1917] font-semibold'
                : 'text-[#78716C] border-transparent hover:text-[#1C1917]'
            }`}
          >
            Trend Radar
          </button>

          <button
            onClick={() => onSelectTab('lookbook')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeTab === 'lookbook'
                ? 'text-[#1C1917] border-[#1C1917] font-semibold'
                : 'text-[#78716C] border-transparent hover:text-[#1C1917]'
            }`}
          >
            Lookbook & Studio
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1C1917] rounded-md hover:bg-[#322E2B] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:translate-y-px"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Editorial Post</span>
          </button>
        </div>
      </div>

      {/* Mobile subnavigation bar for small screens */}
      <div className="flex md:hidden overflow-x-auto gap-4 pt-3 mt-3 border-t border-[#E7E5E4] text-xs font-medium">
        <button
          onClick={() => onSelectTab('feed')}
          className={`whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'feed' ? 'text-[#1C1917] border-[#1C1917] font-semibold' : 'text-[#78716C] border-transparent'
          }`}
        >
          Feed
        </button>
        <button
          onClick={() => onSelectTab('lounges')}
          className={`whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'lounges' ? 'text-[#1C1917] border-[#1C1917] font-semibold' : 'text-[#78716C] border-transparent'
          }`}
        >
          Lounges {unreadCountTotal > 0 && `(${unreadCountTotal})`}
        </button>
        <button
          onClick={() => onSelectTab('moodboard')}
          className={`whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'moodboard' ? 'text-[#1C1917] border-[#1C1917] font-semibold' : 'text-[#78716C] border-transparent'
          }`}
        >
          Studio
        </button>
        <button
          onClick={() => onSelectTab('trends')}
          className={`whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'trends' ? 'text-[#1C1917] border-[#1C1917] font-semibold' : 'text-[#78716C] border-transparent'
          }`}
        >
          Trends
        </button>
        <button
          onClick={() => onSelectTab('lookbook')}
          className={`whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'lookbook' ? 'text-[#1C1917] border-[#1C1917] font-semibold' : 'text-[#78716C] border-transparent'
          }`}
        >
          Lookbook
        </button>
      </div>
    </header>
  );
};
