import React, { useState } from 'react';
import {
  Compass,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  MapPin,
  Eye,
  EyeOff,
  Landmark,
  Wheat,
  Flame,
  Mountain,
  Waves,
  PartyPopper,
  Trees,
  Gem,
  Play,
  Pause,
  Map,
  Crown,
  Lock
} from 'lucide-react';
import { RegionId, RegionData } from '../game/types';
import { REGIONS_DATA } from '../game/worldData';

interface GameHudProps {
  currentRegionId: RegionId;
  timeOfDay: 'day' | 'twilight';
  isMuted: boolean;
  isCinematicTour: boolean;
  fragments?: Record<string, boolean>;
  onToggleTimeOfDay: () => void;
  onToggleMute: () => void;
  onToggleCinematicTour: () => void;
  onOpenMapIllustration: () => void;
  onOpenLockedRealm?: () => void;
  onSelectRegion: (regionId: RegionId) => void;
  onCameraOverview: () => void;
}

export const GameHud: React.FC<GameHudProps> = ({
  currentRegionId,
  timeOfDay,
  isMuted,
  isCinematicTour,
  fragments = {},
  onToggleTimeOfDay,
  onToggleMute,
  onToggleCinematicTour,
  onOpenMapIllustration,
  onOpenLockedRealm,
  onSelectRegion,
  onCameraOverview
}) => {
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const region: RegionData = REGIONS_DATA[currentRegionId] || REGIONS_DATA.capital;

  const collectedCount = Object.values(fragments).filter(Boolean).length;
  const hasAllFragments = collectedCount >= 7;

  const getRegionIcon = (id: RegionId, size: string = "w-4 h-4") => {
    switch (id) {
      case 'capital': return <Landmark className={size} />;
      case 'highlands': return <Wheat className={size} />;
      case 'harbor': return <Flame className={size} />;
      case 'mountains': return <Mountain className={size} />;
      case 'archipelago': return <Waves className={size} />;
      case 'festival': return <PartyPopper className={size} />;
      case 'bamboo': return <Trees className={size} />;
      case 'ceramics': return <Gem className={size} />;
      case 'crown_sanctuary':
        // Converted directly into Lock icon and only Crown when having enough 7 fragments!
        return hasAllFragments ? (
          <Crown className={`${size} text-amber-300 animate-pulse`} />
        ) : (
          <Lock className={`${size} text-slate-400`} />
        );
      default: return <MapPin className={size} />;
    }
  };

  if (zenMode) {
    return (
      <div className="absolute top-4 right-4 z-40 pointer-events-auto">
        <button
          onClick={() => setZenMode(false)}
          title="Show Controls"
          className="p-3 rounded-full bg-slate-900/80 border border-slate-700/80 text-amber-300 hover:text-white shadow-2xl hover:scale-110 transition-all cursor-pointer"
        >
          <EyeOff className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between p-3 md:p-6 select-none">
      {/* TOP PERIMETER CLUSTER */}
      <div className="flex items-center justify-between w-full">
        {/* Current Region Icon Pill & Fragment Progress */}
        <div className="flex items-center gap-2">
          <div
            title={`${region.nameVi} (${region.nameEn})`}
            className="pointer-events-auto flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl"
          >
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: region.color }}
            >
              {getRegionIcon(currentRegionId, "w-4 h-4")}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-300">
              <span>#{region.order}</span>
              <span className="text-slate-100 font-sans text-xs font-semibold">
                {region.nameVi}
              </span>
            </div>
          </div>

          {/* Cultural Fragments Progress Pill */}
          <button
            onClick={() => {
              if (onOpenLockedRealm) onOpenLockedRealm();
            }}
            title="Tiến Độ 7 Mảnh Ghép Di Sản Mở Khóa Vương Đảo"
            className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-400/60 shadow-xl cursor-pointer transition-all"
          >
            <span className="text-sm">✨</span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
              <span className="text-slate-300 hidden sm:inline">Mảnh Ghép:</span>
              <span className={hasAllFragments ? "text-emerald-400 font-extrabold" : "text-amber-400"}>
                {collectedCount}/7
              </span>
            </div>
          </button>
        </div>

        {/* Top Right Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          {/* Day / Night Toggle */}
          <button
            onClick={onToggleTimeOfDay}
            title={timeOfDay === 'day' ? 'Twilight Night' : 'Day Sun'}
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-amber-400 transition-all cursor-pointer shadow-lg"
          >
            {timeOfDay === 'day' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          {/* Cinematic Auto-Tour Toggle */}
          <button
            onClick={onToggleCinematicTour}
            title={isCinematicTour ? 'Pause Cinematic Tour' : 'Start Cinematic Tour (7 Regions)'}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-lg ${
              isCinematicTour
                ? 'bg-amber-500 border-amber-300 text-slate-950 animate-pulse'
                : 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:text-amber-400'
            }`}
          >
            {isCinematicTour ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Traditional Music' : 'Mute Music'}
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-amber-400 transition-all cursor-pointer shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Map Illustration Button */}
          <button
            onClick={onOpenMapIllustration}
            title="Minh Họa Bản Đồ (M)"
            className="p-2.5 rounded-xl bg-cyan-700/90 hover:bg-cyan-600 border border-cyan-400/50 text-white transition-all cursor-pointer shadow-lg"
          >
            <Map className="w-4 h-4" />
          </button>


          {/* Zen Mode */}
          <button
            onClick={() => setZenMode(true)}
            title="Zen View (Hide UI)"
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-400 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BOTTOM REGION SELECTOR DOCK */}
      <div className="pointer-events-auto max-w-2xl mx-auto w-full transition-transform duration-300">
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            title={isDockCollapsed ? 'Show Dock' : 'Hide Dock'}
            className="p-1 rounded-t-lg bg-slate-900/90 border-t border-x border-slate-700 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {isDockCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {!isDockCollapsed && (
          <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-2 shadow-2xl flex items-center justify-between gap-2">
            {/* Regional Icon Shortcuts */}
            <div className="flex items-center gap-1.5 flex-1 justify-center sm:justify-start overflow-x-auto py-0.5">
              {(Object.values(REGIONS_DATA) as RegionData[])
                .sort((a, b) => a.order - b.order)
                .map((r) => {
                  const rId = r.id;
                  const isSelected = rId === currentRegionId;
                  const isCrown = rId === 'crown_sanctuary';

                  let btnStyle = isSelected
                    ? 'bg-amber-500 border-amber-300 text-slate-950 scale-110 shadow-lg shadow-amber-500/30'
                    : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700';

                  if (isCrown && !hasAllFragments) {
                    btnStyle = 'opacity-60 hover:opacity-85 bg-slate-900/60 border-dashed border-slate-700/80 text-slate-400 hover:text-slate-200';
                  } else if (isCrown && hasAllFragments) {
                    btnStyle = isSelected
                      ? 'bg-amber-500 border-amber-300 text-slate-950 scale-110 shadow-lg shadow-amber-500/40'
                      : 'bg-amber-500/20 border-amber-400/50 text-amber-300 hover:bg-amber-500/30';
                  }

                  const titleText = isCrown
                    ? hasAllFragments
                      ? `#${r.order} - ${r.nameVi} [Cần lên thuyền tại Bến Cảng Hoa Đăng]`
                      : `#${r.order} - ${r.nameVi} [Khóa - Cần 7 Mảnh Ghép (${collectedCount}/7)]`
                    : `#${r.order} - ${r.nameVi} (${r.nameEn})`;

                  return (
                    <button
                      key={rId}
                      onClick={() => onSelectRegion(rId)}
                      title={titleText}
                      className={`relative p-2.5 rounded-xl transition-all cursor-pointer border flex items-center justify-center shrink-0 ${btnStyle}`}
                    >
                      {getRegionIcon(rId, "w-4 h-4")}
                    </button>
                  );
                })}
            </div>

            <div className="w-[1px] h-6 bg-slate-700/80 shrink-0" />

            {/* Overview Camera View Button */}
            <button
              onClick={onCameraOverview}
              title="Full Isometric Overview"
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-amber-300 hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            >
              <Compass className="w-4 h-4" />
            </button>

            {/* Map Illustration Modal Button */}
            <button
              onClick={onOpenMapIllustration}
              title="Minh Họa Bản Đồ"
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-cyan-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
