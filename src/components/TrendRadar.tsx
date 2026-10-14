import React from 'react';
import { TrendingUp, Sparkles, MessageSquare, ArrowRight, Layers } from 'lucide-react';
import { TREND_RADAR_ITEMS } from '../data/initialData';

interface TrendRadarProps {
  onJoinDiscussion: (topic: string) => void;
  onOpenCreate: () => void;
}

export const TrendRadar: React.FC<TrendRadarProps> = ({
  onJoinDiscussion,
  onOpenCreate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-[#E7E5E4] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#78716C] font-medium">
            Forecast & Aesthetic Movements
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1917] mt-1">
            The Atelier Trend Radar & Material Innovations
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            Tracking shifts across haute couture runways, artisanal mill techniques, and mindful lifestyle architecture.
          </p>
        </div>

        <button
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#322E2B] transition-colors cursor-pointer self-start md:self-auto shrink-0"
        >
          <span>Submit Trend Analysis</span>
        </button>
      </div>

      {/* Main Trends Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {TREND_RADAR_ITEMS.map((trend, idx) => (
          <div
            key={trend.id}
            className="flex flex-col justify-between bg-white border border-[#E7E5E4] rounded-xl p-6 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              {/* Unboxed Metadata Header */}
              <div className="flex items-center justify-between text-xs text-[#78716C]">
                <span className="font-mono tabular-nums text-[#8C5D3B] font-medium">
                  {trend.trendDirection}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{trend.timeline}</span>
              </div>

              {/* Title */}
              <h3 className="font-editorial text-2xl font-semibold text-[#1C1917] leading-snug">
                {trend.title}
              </h3>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                {trend.summary}
              </p>

              {/* Key Fabrics & Textiles */}
              <div className="pt-2 border-t border-[#F5F5F4]">
                <p className="text-[11px] uppercase tracking-wider text-[#78716C] font-medium mb-1.5">
                  Core Fabric Spec
                </p>
                <div className="space-y-1">
                  {trend.keyFabrics.map((fabric, i) => (
                    <div
                      key={i}
                      className="text-xs text-[#1C1917] flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 bg-[#8C5D3B] rounded-full inline-block" />
                      <span>{fabric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chromatic Palette */}
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider text-[#78716C] font-medium mb-1.5">
                  Chromatic Direction
                </p>
                <div className="flex items-center gap-2">
                  {trend.colorSpectrum.map((c, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span
                        className="w-4 h-4 rounded-sm border border-black/10 inline-block"
                        style={{ backgroundColor: c }}
                      />
                      <span className="text-[10px] font-mono text-[#78716C]">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-6 mt-6 border-t border-[#E7E5E4]">
              <button
                onClick={() => onJoinDiscussion(trend.title)}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-[#1C1917] bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#E7E5E4] rounded-md transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuss in Design Lounge</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Curated Editorial Note */}
      <div className="mt-12 p-8 bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#8C5D3B] font-medium">
            Atelier Quarterly Manifesto
          </p>
          <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            "Fashion is sculpture; lifestyle is the room in which it breathes."
          </h3>
          <p className="text-xs sm:text-sm text-[#78716C] max-w-2xl">
            We reject the disposable velocity of micro-trends in favor of heirloom textiles, artisanal pattern cutting, and architectural stillness.
          </p>
        </div>
      </div>
    </div>
  );
};
