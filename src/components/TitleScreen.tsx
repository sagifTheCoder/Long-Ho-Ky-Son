import React from 'react';
import {
  Play,
  Landmark,
  Wheat,
  Flame,
  Mountain,
  Waves,
  PartyPopper,
  Keyboard,
  MousePointer,
  Space,
  Trees,
  Crown
} from 'lucide-react';
import { RegionId } from '../game/types';
import { REGIONS_DATA } from '../game/worldData';

interface TitleScreenProps {
  onStart: () => void;
  onSelectRegionPreview: (regionId: string) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, onSelectRegionPreview }) => {
  const getRegionIcon = (id: RegionId) => {
    switch (id) {
      case 'capital': return <Landmark className="w-5 h-5" />;
      case 'highlands': return <Wheat className="w-5 h-5" />;
      case 'harbor': return <Flame className="w-5 h-5" />;
      case 'mountains': return <Mountain className="w-5 h-5" />;
      case 'archipelago': return <Waves className="w-5 h-5" />;
      case 'festival': return <PartyPopper className="w-5 h-5" />;
      case 'bamboo': return <Trees className="w-5 h-5" />;
      case 'crown_sanctuary': return <Crown className="w-5 h-5 text-amber-300" />;
      default: return null;
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-between p-6 md:p-12 pointer-events-none select-none bg-radial from-transparent via-slate-950/40 to-slate-950/80">
      {/* Top minimal emblem */}
      <div className="flex justify-center pointer-events-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-widest font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 drop-shadow-lg">
            LONG HỔ KỲ SƠN
          </h1>
          <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-400/90 mt-1">
            龍虎奇山 · 2.5D Dual Realm
          </div>
        </div>
      </div>

      {/* Center Minimal Start Button */}
      <div className="flex flex-col items-center justify-center pointer-events-auto">
        <button
          onClick={onStart}
          title="Play (Space / Enter)"
          className="group relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-amber-600 via-rose-600 to-amber-500 hover:from-amber-500 hover:to-rose-500 text-white flex items-center justify-center shadow-2xl shadow-amber-500/40 border-2 border-amber-300/80 hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1 group-hover:scale-110 transition-transform" />
          <span className="absolute -inset-2 rounded-full border border-amber-400/40 animate-ping pointer-events-none" />
        </button>

        {/* Minimal Control Icons bar */}
        <div className="mt-8 flex items-center gap-4 text-slate-400 text-xs font-mono bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-full">
          <span className="flex items-center gap-1.5" title="Move: WASD / Arrows">
            <Keyboard className="w-3.5 h-3.5 text-amber-400" />
            <span>WASD</span>
          </span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5" title="Click to Navigate">
            <MousePointer className="w-3.5 h-3.5 text-amber-400" />
            <span>Click</span>
          </span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5" title="Action: Space">
            <Space className="w-3.5 h-3.5 text-amber-400" />
            <span>Space</span>
          </span>
        </div>
      </div>

      {/* Six Regions Icon Bar at Bottom */}
      <div className="flex justify-center gap-3 pointer-events-auto">
        {(Object.keys(REGIONS_DATA) as RegionId[]).map((rId) => {
          const r = REGIONS_DATA[rId];
          return (
            <button
              key={rId}
              onClick={() => {
                onSelectRegionPreview(rId);
                onStart();
              }}
              title={`${r.nameVi} (${r.nameEn})`}
              className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/80 text-slate-300 hover:text-amber-300 hover:scale-110 transition-all cursor-pointer shadow-lg"
            >
              {getRegionIcon(rId)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
