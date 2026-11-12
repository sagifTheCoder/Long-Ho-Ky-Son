import React, { useState } from 'react';
import {
  X,
  Trophy,
  Sparkles,
  CheckCircle2,
  Landmark,
  Wheat,
  Flame,
  Mountain,
  Waves,
  PartyPopper,
  Trees,
  Crown
} from 'lucide-react';
import { RegionId, RegionData } from '../game/types';
import { soundManager } from '../game/audio';

interface QuestModalProps {
  region: RegionData;
  onClose: () => void;
  onCompleteQuest: (regionId: RegionId) => void;
}

export const QuestModal: React.FC<QuestModalProps> = ({ region, onClose, onCompleteQuest }) => {
  const quest = region.quest;
  const [step, setStep] = useState<number>(quest.isCompleted ? quest.target : 0);
  const [isDone, setIsDone] = useState<boolean>(quest.isCompleted);

  const getRegionIcon = (id: RegionId) => {
    switch (id) {
      case 'capital': return <Landmark className="w-6 h-6" />;
      case 'highlands': return <Wheat className="w-6 h-6" />;
      case 'harbor': return <Flame className="w-6 h-6" />;
      case 'mountains': return <Mountain className="w-6 h-6" />;
      case 'archipelago': return <Waves className="w-6 h-6" />;
      case 'festival': return <PartyPopper className="w-6 h-6" />;
      case 'bamboo': return <Trees className="w-6 h-6" />;
      case 'crown_sanctuary': return <Crown className="w-6 h-6" />;
      default: return null;
    }
  };

  const handleAction = () => {
    soundManager.playPluck(step);
    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep >= quest.target) {
      setIsDone(true);
      soundManager.playQuestComplete();
      onCompleteQuest(region.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 pointer-events-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Region Big Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white shadow-lg"
          style={{ backgroundColor: region.color }}
        >
          {getRegionIcon(region.id)}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white font-cinzel mb-1">
          {quest.titleVi}
        </h3>
        <div className="text-xs text-amber-400 font-mono mb-4">
          {step} / {quest.target}
        </div>

        {/* Visual Progress Nodes */}
        <div className="flex justify-center gap-3 mb-6">
          {Array.from({ length: quest.target }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i < step
                  ? 'bg-amber-400 scale-125 shadow-md shadow-amber-400/50'
                  : 'bg-slate-800 border border-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        {!isDone ? (
          <button
            onClick={handleAction}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-sm shadow-xl shadow-amber-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2 text-emerald-300">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {quest.rewardName}
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-center text-slate-500">
          <Trophy className="w-4 h-4 text-amber-400/60" />
        </div>
      </div>
    </div>
  );
};
