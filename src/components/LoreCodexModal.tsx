import React, { useState } from 'react';
import { X, Sparkles, Home, Flame, Wheat, Utensils, Crown } from 'lucide-react';
import { CULTURAL_LORE_DATABASE } from '../game/worldData';

interface LoreCodexModalProps {
  onClose: () => void;
}

export const LoreCodexModal: React.FC<LoreCodexModalProps> = ({ onClose }) => {
  const [selectedId, setSelectedId] = useState<string>(CULTURAL_LORE_DATABASE[0].id);
  const activeEntry = CULTURAL_LORE_DATABASE.find(e => e.id === selectedId) || CULTURAL_LORE_DATABASE[0];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'architecture': return <Home className="w-5 h-5 text-amber-400" />;
      case 'mythology': return <Sparkles className="w-5 h-5 text-rose-400" />;
      case 'festivals': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'crafts': return <Wheat className="w-5 h-5 text-emerald-400" />;
      case 'cuisine': return <Utensils className="w-5 h-5 text-pink-400" />;
      case 'culture': return <Crown className="w-5 h-5 text-amber-300" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 pointer-events-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category Icons Row */}
        <div className="flex justify-center gap-3 mb-6">
          {CULTURAL_LORE_DATABASE.map(entry => {
            const isSelected = entry.id === selectedId;
            return (
              <button
                key={entry.id}
                onClick={() => setSelectedId(entry.id)}
                title={entry.titleVi}
                className={`p-3 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 scale-110 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-white'
                }`}
              >
                {getCategoryIcon(entry.category)}
              </button>
            );
          })}
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white font-cinzel">
            {activeEntry.titleVi}
          </h3>
          <div className="text-xs text-amber-400 font-mono mt-0.5">
            {activeEntry.titleKo}
          </div>
        </div>

        {/* Fusion highlight */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/40 text-slate-200 text-xs md:text-sm leading-relaxed mb-4">
          {activeEntry.fusionInWorld}
        </div>

        {/* Dual Cultural Icons & Aspects */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/50 border border-red-500/30 text-slate-300 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-red-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>VN</span>
            </div>
            <p className="line-clamp-4">{activeEntry.vietnameseAspect}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-blue-500/30 text-slate-300 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-blue-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>KR</span>
            </div>
            <p className="line-clamp-4">{activeEntry.koreanAspect}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
