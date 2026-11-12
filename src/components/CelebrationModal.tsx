import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Award, Crown, CheckCircle2, Heart } from 'lucide-react';
import { soundManager } from '../game/audio';

interface CelebrationModalProps {
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ onClose }) => {
  useEffect(() => {
    soundManager.playQuestComplete();

    // Fire continuous celebratory confetti fireworks
    const duration = 4.0 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#00f0ff', '#f59e0b', '#ef4444', '#ec4899', '#10b981']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#00f0ff', '#f59e0b', '#ef4444', '#ec4899', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md pointer-events-auto animate-fade-in font-sans">
      <div className="bg-gradient-to-b from-slate-900 via-purple-950/80 to-slate-950 border border-amber-400/80 rounded-3xl max-w-xl w-full p-6 md:p-8 text-center shadow-2xl shadow-cyan-950/50 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-36 bg-amber-400/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-400/20 blur-2xl pointer-events-none rounded-full" />

        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Crown Badge */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/30 via-yellow-400/20 to-cyan-400/30 border-2 border-amber-400 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-500/25 relative">
          <Crown className="w-10 h-10 text-amber-300 drop-shadow-md animate-pulse" />
          <div className="absolute -bottom-1 -right-1 p-1 bg-cyan-500 rounded-full text-slate-950">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Vương Đảo Hòa Hợp Văn Hóa · 天下大同</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2 drop-shadow-sm font-sans">
          Chúc Mừng Sứ Giả Hòa Hợp!
        </h3>

        <div className="text-sm md:text-base text-amber-200/95 font-semibold mb-4">
          Bạn Đã Chạm Vào Vương Miện Tinh Hoa Việt - Hàn
        </div>

        {/* Story Body */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-200 text-xs md:text-sm leading-relaxed mb-5 text-left space-y-2.5">
          <p>
            Vương Miện Hòa Hợp trên đài sen bạch ngọc là kết tinh thiêng liêng nhất của cuộc hành trình:
          </p>
          <ul className="space-y-1.5 text-slate-300 pl-1">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-amber-300 font-medium">Bản sắc Việt Nam:</strong> Mặt trời 14 tia sáng Đông Sơn chiếu rọi, chim Lạc sải cánh vươn cao và hoa sen thuần khiết tượng trưng cho đạo lý nhân nghĩa, hòa ái.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-cyan-300 font-medium">Di sản Hàn Quốc:</strong> Cành cây vũ trụ và gạc hươu vàng Tân La kết hợp cùng những hạt khúc ngọc Gogok xanh biếc, tượng trưng cho linh khí đất trời và sự trường tồn.
              </span>
            </li>
          </ul>
          <p className="text-slate-400 text-[11px] pt-1 italic">
            Người khám phá đã thấu hiểu sâu sắc mối lương duyên giao thoa kỳ diệu giữa hai dân tộc qua từng tấc đất, câu ca, nét kiến trúc và hạt gạo làng quê.
          </p>
        </div>

        {/* Title Bestowal */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-cyan-500/15 border border-amber-400/40 mb-6 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Danh Hiệu Trao Tặng
              </div>
              <div className="text-xs md:text-sm font-bold text-amber-200">
                Đại Sứ Song Tộc Hộ Mệnh · 双族护命使者
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 whitespace-nowrap">
            Hoàn Tất Viên Mãn
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-cyan-600 hover:from-amber-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-amber-950/40 cursor-pointer transition-all hover:scale-[1.01]"
        >
          Tiếp Tục Du Ngoạn Thế Giới
        </button>
      </div>
    </div>
  );
};
