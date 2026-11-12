import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  Wheat,
  Trees,
  Mountain,
  Landmark,
  PartyPopper,
  Flame,
  Waves,
  Scroll,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { RegionId } from '../game/types';
import { CULTURAL_THEMES_OVERVIEW, REGIONS_DATA } from '../game/worldData';
import { soundManager } from '../game/audio';

interface CulturalThemeModalProps {
  regionId?: RegionId;
  initialRegionId?: RegionId;
  fragments?: Record<string, boolean>;
  onCollectFragment?: (fragmentId: string) => void;
  onClose: () => void;
  onVisitRegion?: (regionId: RegionId) => void;
}

export const CulturalThemeModal: React.FC<CulturalThemeModalProps> = ({
  regionId,
  initialRegionId,
  fragments = {},
  onCollectFragment,
  onClose
}) => {
  // Directly bind strictly to this specific region only
  const activeRegionId: RegionId = regionId || initialRegionId || 'highlands';
  const theme = CULTURAL_THEMES_OVERVIEW[activeRegionId] || CULTURAL_THEMES_OVERVIEW.highlands;
  const regionData = REGIONS_DATA[activeRegionId] || REGIONS_DATA.highlands;

  // Auto-collect cultural fragment when viewing this specific region's information board
  useEffect(() => {
    const fragId = `frag_${activeRegionId}`;
    if (onCollectFragment && !fragments[fragId]) {
      onCollectFragment(fragId);
      soundManager.playPluck(3);
    }
  }, [activeRegionId, onCollectFragment, fragments]);

  // Support ESC key to close modal quickly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const getRegionIcon = (id: RegionId, size: string = 'w-5 h-5') => {
    switch (id) {
      case 'highlands':
        return <Wheat className={size} />;
      case 'bamboo':
        return <Trees className={size} />;
      case 'mountains':
        return <Mountain className={size} />;
      case 'capital':
        return <Landmark className={size} />;
      case 'festival':
        return <PartyPopper className={size} />;
      case 'harbor':
        return <Flame className={size} />;
      case 'archipelago':
        return <Waves className={size} />;
      default:
        return <Scroll className={size} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md pointer-events-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden text-slate-200">
        {/* Glow Header Accent Background */}
        <div
          className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: theme.color }}
        />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-15 bg-amber-400 pointer-events-none" />

        {/* Top Header Bar: Title */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-800/80 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
              style={{ backgroundColor: theme.color }}
            >
              {getRegionIcon(activeRegionId, 'w-6 h-6')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Bảng Thông Tin Di Sản
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {regionData.nameKo}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-serif tracking-normal leading-snug">
                {regionData.nameVi} — {theme.titleVi}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            title="Đóng (ESC)"
            className="p-2 rounded-full bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer shrink-0 border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content: Comparison (VN vs KR) and Shared Harmony */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 relative z-10">
          {/* Dual Comparative Columns: Vietnam vs Korea */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* VIETNAM CULTURAL ASPECT */}
            <div className="rounded-2xl bg-gradient-to-br from-red-950/40 via-slate-950/70 to-slate-950 border border-red-500/30 p-5 flex flex-col justify-between shadow-lg">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-red-500/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇻🇳</span>
                    <span className="text-xs font-bold font-mono tracking-wider text-red-300 uppercase">
                      Văn Hóa Việt Nam
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/40 font-semibold">
                    Bản Sắc Việt
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-normal leading-snug mb-2">
                  {theme.vietnamAspect.headline}
                </h3>

                {/* Symbolic Relic */}
                <div className="mb-3 px-3 py-1.5 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold">{theme.vietnamAspect.symbolicRelic}</span>
                </div>

                {/* Narrative */}
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 mb-4 font-vietnam">
                  {theme.vietnamAspect.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-semibold mb-1">
                    Đặc trưng nổi bật:
                  </div>
                  {theme.vietnamAspect.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-vietnam">
                      <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* KOREA CULTURAL ASPECT */}
            <div className="rounded-2xl bg-gradient-to-br from-sky-950/40 via-slate-950/70 to-slate-950 border border-sky-500/30 p-5 flex flex-col justify-between shadow-lg">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-sky-500/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇰🇷</span>
                    <span className="text-xs font-bold font-mono tracking-wider text-sky-300 uppercase">
                      Văn Hóa Hàn Quốc
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/40 font-semibold">
                    한국 전통
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-normal leading-snug mb-2">
                  {theme.koreaAspect.headline}
                </h3>

                {/* Symbolic Relic */}
                <div className="mb-3 px-3 py-1.5 rounded-xl bg-sky-950/50 border border-sky-500/30 text-xs text-sky-200 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span className="font-semibold">{theme.koreaAspect.symbolicRelic}</span>
                </div>

                {/* Narrative */}
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 mb-4 font-vietnam">
                  {theme.koreaAspect.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold mb-1">
                    Đặc trưng nổi bật:
                  </div>
                  {theme.koreaAspect.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-vietnam">
                      <span className="text-cyan-400 shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SYNTHESIS & SHARED HARMONY BANNER (Điểm chung giữa cả 2) */}
          {theme.synthesisHarmony && (
            <div className="rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-sky-950/40 border border-amber-400/40 p-5 shadow-xl">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>Điểm Chung & Tinh Thần Giao Thoa</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white font-serif tracking-normal leading-snug mb-2">
                {theme.synthesisHarmony.headline}
              </h4>

              <p className="text-xs sm:text-[13px] leading-relaxed text-slate-200 mb-4 font-vietnam">
                {theme.synthesisHarmony.description}
              </p>

              {theme.synthesisHarmony.sharedValues && theme.synthesisHarmony.sharedValues.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {theme.synthesisHarmony.sharedValues.map((val, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-400/30 text-xs text-amber-200 font-vietnam"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-3 relative z-10">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
            <span>
              Bảng di sản: <strong className="text-white">{regionData.nameVi}</strong> ({regionData.nameKo})
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                soundManager.playPluck(1);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              Đã hiểu & Đóng (ESC)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
