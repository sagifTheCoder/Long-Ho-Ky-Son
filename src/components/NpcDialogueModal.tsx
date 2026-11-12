import React from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Compass,
  CheckCircle2,
  Anchor,
  Ship,
  MapPin,
  Lock,
  Award
} from 'lucide-react';
import { NPCData, CulturalFragment } from '../game/types';
import { soundManager } from '../game/audio';

interface NpcDialogueModalProps {
  npc: NPCData;
  fragments: Record<string, boolean>;
  allFragments: CulturalFragment[];
  onClose: () => void;
  onCollectFragment: (fragmentId: string) => void;
  onEmbarkVoyage: () => void;
}

export const NpcDialogueModal: React.FC<NpcDialogueModalProps> = ({
  npc,
  fragments,
  allFragments,
  onClose,
  onCollectFragment,
  onEmbarkVoyage
}) => {
  const isFragmentCollected = npc.fragmentId ? !!fragments[npc.fragmentId] : false;
  const collectedCount = Object.values(fragments).filter(Boolean).length;
  const hasAllFragments = collectedCount >= 7;

  const handleQuestAction = () => {
    if (npc.fragmentId && !isFragmentCollected) {
      soundManager.playGong(true);
      onCollectFragment(npc.fragmentId);
    }
  };

  const handleEmbark = () => {
    soundManager.playGong(true);
    onClose();
    onEmbarkVoyage();
  };

  const getRoleBadge = () => {
    switch (npc.type) {
      case 'captain':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Anchor className="w-3.5 h-3.5" />
            <span>Thuyền Trưởng Hải Trình Nam Hải</span>
          </span>
        );
      case 'quest':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Sứ Giả Hướng Dẫn Mảnh Ghép</span>
          </span>
        );
      case 'lore':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nhân Vật Văn Hóa Điển Tích</span>
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md pointer-events-auto select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-900/95 border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative text-left overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: npc.color || '#F59E0B' }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Header Info */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl shrink-0 border border-slate-700/80"
            style={{ backgroundColor: `${npc.color}25` }}
          >
            {npc.type === 'captain' ? '⚓' : npc.type === 'quest' ? '📜' : '🪭'}
          </div>

          <div className="flex-1 pr-6">
            <div className="flex items-center gap-2 mb-1">
              {getRoleBadge()}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-cinzel">
              {npc.name}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-amber-300/80 font-mono mt-0.5">
              <span>{npc.title}</span>
              {npc.occupationVi && <span className="text-slate-400">• {npc.occupationVi}</span>}
              {npc.nameKo && <span className="text-amber-400/90 font-semibold">• {npc.nameKo}</span>}
            </div>
          </div>
        </div>

        {/* Scrollable Dialogue & Lore Content */}
        <div className="space-y-4 overflow-y-auto pr-1 flex-1">
          {/* Main Dialogue Quotes */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-200 space-y-2.5">
            {npc.dialogueVi.map((line, idx) => (
              <p key={idx} className="text-sm leading-relaxed text-slate-300 first:text-amber-200/90 first:font-medium">
                "{line}"
              </p>
            ))}
          </div>

          {/* Cultural Fact Box */}
          {npc.culturalFactVi && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  Giao Thoa Văn Hóa Việt - Hàn
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  {npc.culturalFactVi}
                </div>
              </div>
            </div>
          )}

          {/* QUEST NPC SECTION */}
          {npc.type === 'quest' && npc.fragmentId && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Nhiệm Vụ Nhận Mảnh Ghép
                </span>
                {isFragmentCollected ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã Thu Thập
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold">
                    Chưa Hoàn Thành
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 mb-3">
                <span className="font-semibold text-slate-200">Mục tiêu:</span> {npc.questObjectiveVi}
              </p>

              {npc.questRewardVi && (
                <div className="text-xs text-amber-200/90 mb-4 bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20 flex items-center gap-2">
                  <span>Phần thưởng:</span>
                  <span className="font-bold text-white">{npc.questRewardVi}</span>
                </div>
              )}

              {isFragmentCollected ? (
                <div className="w-full py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-center text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Bạn đã sở hữu Mảnh Ghép Di Sản của vùng đất này!
                </div>
              ) : (
                <button
                  onClick={handleQuestAction}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {npc.questActionPrompt || 'Thực Hiện Nhiệm Vụ & Nhận Mảnh Ghép'}
                </button>
              )}
            </div>
          )}

          {/* HARBOR CAPTAIN VOYAGE SECTION */}
          {npc.type === 'captain' && (
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Ship className="w-4 h-4" />
                  Hải Trình Vượt Biển Đến Vương Đảo
                </span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${hasAllFragments ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-amber-400'}`}>
                  Mảnh Ghép: {collectedCount} / 7
                </span>
              </div>

              {!hasAllFragments ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-200">
                    <p className="font-semibold mb-1 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                      Chưa đủ điều kiện khởi hành!
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Bạn cần có đủ 7 mảnh ghép để mở khóa hải trình này. Hãy tương tác với các Bảng Thông Tin Di Sản tại 7 vùng đất để tiếp nhận đủ 7 mảnh ghép.
                    </p>
                  </div>

                  {/* Checklist of 7 Fragments */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {allFragments.map((frag) => {
                      const isCollected = !!fragments[frag.id];
                      return (
                        <div
                          key={frag.id}
                          className={`flex items-center justify-between p-1.5 px-2.5 rounded-lg text-[11px] border ${isCollected ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}
                        >
                          <span className="truncate pr-1">{frag.nameVi}</span>
                          <span className="shrink-0 font-mono text-[10px]">
                            {isCollected ? '✓' : '✗'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-200">
                    <p className="font-bold mb-1 flex items-center gap-1.5 text-emerald-300">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Đủ điều kiện xuất phát!
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Bạn đã quy tụ đủ 7 Mảnh Ghép Di Sản. Thuyền buồm nan tre cánh dơi đã sẵn sàng giương buồm đưa bạn vượt biển sang Vương Đảo Hòa Hợp!
                    </p>
                  </div>

                  <button
                    onClick={handleEmbark}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Ship className="w-5 h-5" />
                    Lên Tàu Vượt Sóng Sang Vương Đảo Hòa Hợp
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundManager.playPluck(1);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
