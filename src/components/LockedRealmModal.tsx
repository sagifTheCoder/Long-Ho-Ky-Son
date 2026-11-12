import React from 'react';
import { X, Lock, ShieldAlert, Sparkles, CheckCircle2, Ship, MapPin } from 'lucide-react';
import { soundManager } from '../game/audio';
import { CULTURAL_FRAGMENTS } from '../game/worldData';

interface LockedRealmModalProps {
  fragments?: Record<string, boolean>;
  onClose: () => void;
  onGoToHarbor?: () => void;
}

export const LockedRealmModal: React.FC<LockedRealmModalProps> = ({
  fragments = {},
  onClose,
  onGoToHarbor
}) => {
  const collectedCount = CULTURAL_FRAGMENTS.filter(f => !!fragments[f.id]).length;
  const hasAll7 = collectedCount >= 7;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md pointer-events-auto select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-900/95 border border-amber-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Emblem */}
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-xl ${hasAll7 ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-gradient-to-br from-amber-500/20 via-rose-500/20 to-amber-500/10 border border-amber-500/40 text-amber-400 shadow-amber-500/10'}`}>
          {hasAll7 ? <Ship className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
        </div>

        {/* Title */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 ${hasAll7 ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'}`}>
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{hasAll7 ? 'ĐÃ ĐỦ ĐIỀU KIỆN RA KHƠI' : 'VÙNG ĐẤT ĐANG BỊ PHONG ẤN'}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white font-cinzel">
          Vương Đảo Hòa Hợp Văn Hóa
        </h3>

        {/* Notice Message */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 my-4 text-center">
          <p className="text-sm sm:text-base font-bold text-amber-200 leading-relaxed">
            Bạn cần có đủ 7 mảnh ghép để mở khóa vùng đất này
          </p>
          <p className="text-xs text-slate-300 mt-1.5">
            {hasAll7
              ? 'Vương đảo nằm biệt lập giữa biển sâu ngàn trùng. Không thể di chuyển tức thời! Hãy tới Bến Cảng Hoa Đăng để lên tàu ra khơi.'
              : 'Hãy khám phá và gặp gỡ các NPC trên khắp bản đồ để hoàn thành nhiệm vụ và nhận đủ 7 mảnh ghép di sản.'}
          </p>
        </div>

        {/* 7 Fragments Live Status */}
        <div className="text-left mb-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Tiến Độ 7 Mảnh Ghép Di Sản:</span>
            <span className="font-mono text-amber-400 font-bold">{collectedCount} / 7</span>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {CULTURAL_FRAGMENTS.map((frag) => {
              const isCollected = !!fragments[frag.id];
              return (
                <div
                  key={frag.id}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs border ${isCollected ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' : 'bg-slate-950/60 border-slate-800 text-slate-300'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{frag.icon}</span>
                    <div>
                      <div className="font-semibold text-slate-200">{frag.nameVi}</div>
                      <div className="text-[10px] text-slate-400">{frag.descVi}</div>
                    </div>
                  </div>
                  {isCollected ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      Đã có
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                      Chưa mở
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        {hasAll7 && onGoToHarbor ? (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                soundManager.playGong(true);
                onClose();
                onGoToHarbor();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Ship className="w-4 h-4" />
              Đến Bến Cảng Hoa Đăng Gặp Thuyền Trưởng
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              soundManager.playPluck(1);
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-all cursor-pointer"
          >
            Đã Hiểu • Tiếp Tục Khám Phá ({collectedCount}/7)
          </button>
        )}
      </div>
    </div>
  );
};
