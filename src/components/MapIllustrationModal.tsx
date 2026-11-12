import React, { useState } from 'react';
import {
  X,
  Compass,
  Navigation,
  Landmark,
  Wheat,
  Trees,
  Mountain,
  PartyPopper,
  Flame,
  Waves,
  MapPin,
  ExternalLink,
  Sparkles,
  Info,
  Crown,
  Lock,
  ShieldAlert
} from 'lucide-react';
import { RegionId, RegionData } from '../game/types';
import { REGIONS_DATA } from '../game/worldData';
import { soundManager } from '../game/audio';
import { LockedRealmModal } from './LockedRealmModal';

interface MapIllustrationModalProps {
  currentRegionId: RegionId;
  fragments?: Record<string, boolean>;
  onSelectRegion: (id: RegionId) => void;
  onClose: () => void;
}

interface IslandNode {
  id: RegionId;
  nameVi: string;
  nameKo: string;
  x: number; // percentage in SVG (0-100)
  y: number; // percentage in SVG (0-100)
  radius: number;
  color: string;
  border: string;
  icon: React.ReactNode;
  taglineVi: string;
}

export const MapIllustrationModal: React.FC<MapIllustrationModalProps> = ({
  currentRegionId,
  fragments = {},
  onSelectRegion,
  onClose
}) => {
  const [selectedIslandId, setSelectedIslandId] = useState<RegionId>(currentRegionId);
  const [showCulturalOverlay, setShowCulturalOverlay] = useState<boolean>(true);
  const [showLockedModal, setShowLockedModal] = useState<boolean>(false);

  const islands: IslandNode[] = [
    {
      id: 'highlands',
      nameVi: 'Cao Nguyên Lúa Vàng',
      nameKo: '황금 계단골',
      x: 20,
      y: 22,
      radius: 36,
      color: '#D97706',
      border: '#F59E0B',
      icon: <Wheat className="w-5 h-5 text-amber-200" />,
      taglineVi: 'Ruộng bậc thang Mù Cang Chải & Vách đá Doldam'
    },
    {
      id: 'bamboo',
      nameVi: 'Trúc Lâm Văn Miếu',
      nameKo: '죽림 서원',
      x: 15,
      y: 52,
      radius: 34,
      color: '#16A34A',
      border: '#34D399',
      icon: <Trees className="w-5 h-5 text-emerald-200" />,
      taglineVi: 'Rừng trúc Damyang & Bia rùa tiến sĩ Quốc Tử Giám'
    },
    {
      id: 'mountains',
      nameVi: 'Dãy Núi Long Hổ',
      nameKo: '용호 바위산',
      x: 28,
      y: 80,
      radius: 38,
      color: '#475569',
      border: '#94A3B8',
      icon: <Mountain className="w-5 h-5 text-slate-200" />,
      taglineVi: 'Cổ đạo bậc đá leo núi • Chùa mây 5 tầng & Miếu Hổ Thần'
    },
    {
      id: 'festival',
      nameVi: 'Quảng Trường Đại Lễ',
      nameKo: '달맞이 광장',
      x: 50,
      y: 18,
      radius: 36,
      color: '#E11D48',
      border: '#FB7185',
      icon: <PartyPopper className="w-5 h-5 text-rose-200" />,
      taglineVi: 'Sân khấu cồng chiêng Tây Nguyên & Lễ hội Chuseok'
    },
    {
      id: 'capital',
      nameVi: 'Thủ Phủ Song Long',
      nameKo: '쌍룡 왕도',
      x: 50,
      y: 52,
      radius: 42,
      color: '#D97706',
      border: '#FCD34D',
      icon: <Landmark className="w-6 h-6 text-amber-200" />,
      taglineVi: 'Nhà ống cổ Hà Nội & Cổng cung đình Gyeongbokgung'
    },
    {
      id: 'harbor',
      nameVi: 'Bến Cảng Hoa Đăng',
      nameKo: '초롱 등불항',
      x: 82,
      y: 22,
      radius: 36,
      color: '#EA580C',
      border: '#FB923C',
      icon: <Flame className="w-5 h-5 text-orange-200" />,
      taglineVi: 'Đèn lồng phố cổ Hội An & Thuyền rùa Geobukseon'
    },
    {
      id: 'archipelago',
      nameVi: 'Quần Đảo Lam Ngọc',
      nameKo: '청옥 군도',
      x: 78,
      y: 76,
      radius: 38,
      color: '#0891B2',
      border: '#38BDF8',
      icon: <Waves className="w-5 h-5 text-cyan-200" />,
      taglineVi: 'Lò gốm Bát Tràng & Tượng Dol Hareubang đảo Jeju'
    },
    {
      id: 'crown_sanctuary',
      nameVi: 'Vương Đảo Hòa Hợp',
      nameKo: '화합의 왕관도',
      x: 50,
      y: 94,
      radius: 36,
      color: '#D97706',
      border: '#F59E0B',
      icon: <Crown className="w-5 h-5 text-amber-200" />,
      taglineVi: 'Đảo thiêng biệt lập • Cổng Hoàng Gia & Vương Miện Giao Thoa Việt - Hàn'
    }
  ];

  // The 8 official bridges connecting the archipelago
  const bridges = [
    { from: 'highlands', to: 'bamboo', label: 'Cầu Rừng Tre' },
    { from: 'bamboo', to: 'mountains', label: 'Cầu Vách Núi' },
    { from: 'highlands', to: 'festival', label: 'Cầu Bắc Khởi Điểm' },
    { from: 'festival', to: 'harbor', label: 'Cầu Hoa Đăng Bắc' },
    { from: 'festival', to: 'capital', label: 'Cầu Cung Đình' },
    { from: 'capital', to: 'mountains', label: 'Cầu Tây Nam Long Hổ' },
    { from: 'capital', to: 'archipelago', label: 'Cầu Gốm Sứ Đông Nam' },
    { from: 'harbor', to: 'archipelago', label: 'Cầu Bờ Biển Đông' }
  ];

  const activeRegion: RegionData = REGIONS_DATA[selectedIslandId] || REGIONS_DATA.capital;

  const handleNavigateToSelected = (id: RegionId) => {
    onSelectRegion(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md pointer-events-auto select-none"
      onClick={onClose}
    >
      <div
        className="bg-slate-900/95 border border-amber-500/30 rounded-3xl max-w-5xl w-full h-[90vh] max-h-[820px] shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER BAR */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Minh Họa Bản Đồ Quần Đảo Long Hổ
              </h2>
              <p className="text-xs text-amber-400/80 font-mono">
                Long Hổ Kỳ Sơn • 7 Đảo Văn Hóa Việt - Hàn & Mạng Lưới 8 Cầu Nối
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCulturalOverlay(!showCulturalOverlay)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                showCulturalOverlay
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title="Bật/Tắt chú thích văn hóa"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chi tiết Văn Hóa</span>
            </button>

            <button
              onClick={onClose}
              title="Đóng bản đồ (Esc)"
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CONTENT AREA: 2-COLUMN LAYOUT ON LARGE SCREENS */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* MAP CANVAS (ILLUSTRATED SVG CARTOGRAPHY) */}
          <div className="relative flex-1 bg-gradient-to-b from-slate-950 via-[#071324] to-slate-950 flex items-center justify-center p-4 overflow-hidden">
            {/* Water ripples background pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="waves" width="60" height="20" patternUnits="userSpaceOnUse">
                    <path
                      d="M0 10 Q15 0 30 10 T60 10"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="1.2"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#waves)" />
              </svg>
            </div>

            {/* Traditional Compass Rose / Hoa Tiêu Cổ Phong */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-40 hidden sm:flex flex-col items-center">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-amber-400/40 border-dashed animate-spin-slow" />
                <div className="w-10 h-10 border border-amber-400/60 rotate-45" />
                <div className="absolute text-[9px] font-bold text-amber-300 top-0">BẮC (N)</div>
                <div className="absolute text-[8px] font-bold text-slate-400 bottom-0">NAM (S)</div>
                <div className="absolute text-[8px] font-bold text-slate-400 left-0">TÂY (W)</div>
                <div className="absolute text-[8px] font-bold text-slate-400 right-0">ĐÔNG (E)</div>
              </div>
            </div>

            {/* OPEN SEA CHANNEL ANNOTATION (Highlights the removed bridge area) */}
            <div className="absolute left-[36%] top-[38%] pointer-events-none bg-slate-950/70 border border-cyan-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] text-cyan-300/80 shadow-md">
              <Waves className="w-3 h-3 text-cyan-400" />
              <span>Vịnh biển mở • Luồng thuyền tự do</span>
            </div>

            {/* SVG CARTOGRAPHIC CHART */}
            <svg
              viewBox="0 0 1000 650"
              className="w-full h-full max-h-[560px] drop-shadow-2xl select-none"
            >
              <defs>
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                {/* Bridge Linear Gradient */}
                <linearGradient id="bridgeWood" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>

              {/* 1. BRIDGES (8 Connecting Lines with scenic curves) */}
              {bridges.map((bridge, idx) => {
                const start = islands.find((i) => i.id === bridge.from);
                const end = islands.find((i) => i.id === bridge.to);
                if (!start || !end) return null;

                const sx = start.x * 10;
                const sy = start.y * 6.5;
                const ex = end.x * 10;
                const ey = end.y * 6.5;

                // Subtle curvature for scenic bridge look
                const mx = (sx + ex) / 2 + (idx % 2 === 0 ? 15 : -15);
                const my = (sy + ey) / 2 + (idx % 2 === 0 ? -15 : 15);

                const isConnectedToSelected =
                  bridge.from === selectedIslandId || bridge.to === selectedIslandId;

                return (
                  <g key={`bridge-${idx}`}>
                    {/* Bridge Water Shadow */}
                    <path
                      d={`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`}
                      fill="none"
                      stroke="#020617"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Bridge Pier Base */}
                    <path
                      d={`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`}
                      fill="none"
                      stroke={isConnectedToSelected ? '#F59E0B' : '#64748B'}
                      strokeWidth={isConnectedToSelected ? '6' : '4'}
                      strokeLinecap="round"
                    />
                    {/* Bridge Planks / Lantern Dashes */}
                    <path
                      d={`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`}
                      fill="none"
                      stroke={isConnectedToSelected ? '#FEF08A' : '#CBD5E1'}
                      strokeWidth="2"
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                    />
                    {/* Midpoint Lantern Pier */}
                    <circle
                      cx={mx}
                      cy={my}
                      r={isConnectedToSelected ? 4.5 : 3.5}
                      fill={isConnectedToSelected ? '#F59E0B' : '#94A3B8'}
                      stroke="#0F172A"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}

              {/* 2. ISLAND ATYPICAL CONTOURS & LANDMASSES */}
              {islands.map((island) => {
                const cx = island.x * 10;
                const cy = island.y * 6.5;
                const isSelected = island.id === selectedIslandId;
                const isCurrent = island.id === currentRegionId;

                return (
                  <g
                    key={island.id}
                    className="cursor-pointer transition-transform duration-300"
                    onClick={() => {
                      setSelectedIslandId(island.id);
                      if (island.id === 'crown_sanctuary') {
                        soundManager.playPluck(0);
                        setShowLockedModal(true);
                      }
                    }}
                  >
                    {/* Pulsing indicator for active player position */}
                    {isCurrent && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={island.radius + 16}
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="animate-spin-slow opacity-60"
                      />
                    )}

                    {/* Outer Sandy Beach / Coastline */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={island.radius + 7}
                      fill="#F59E0B"
                      fillOpacity={isSelected ? 0.25 : 0.12}
                      stroke={isSelected ? island.border : '#334155'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      strokeDasharray={isSelected ? 'none' : '3 3'}
                    />

                    {/* Inner Lush Landmass */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={island.radius}
                      fill="#0F172A"
                      stroke={island.border}
                      strokeWidth={isSelected ? 3 : 2}
                      filter={isSelected ? 'url(#glow)' : undefined}
                    />

                    {/* Island Center Core */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={island.radius * 0.72}
                      fill={island.color}
                      fillOpacity={isSelected ? 0.35 : 0.2}
                    />

                    {/* Illustrated Mountain Pilgrim Trail & Peak Pagoda on Dragon & Tiger Mountains */}
                    {island.id === 'mountains' && (
                      <g pointerEvents="none" opacity={isSelected ? 0.95 : 0.75}>
                        {/* Winding mountain stair path */}
                        <path
                          d={`M ${cx + 14} ${cy + 16} Q ${cx + 4} ${cy + 8} ${cx - 2} ${cy + 2} T ${cx - 12} ${cy - 10}`}
                          fill="none"
                          stroke="#FCD34D"
                          strokeWidth="2.4"
                          strokeDasharray="2.5 2.5"
                        />
                        {/* Summit Cloud Pagoda icon */}
                        <polygon
                          points={`${cx - 12},${cy - 19} ${cx - 17},${cy - 13} ${cx - 7},${cy - 13}`}
                          fill="#F59E0B"
                        />
                        <rect
                          x={cx - 14}
                          y={cy - 13}
                          width="4"
                          height="4.5"
                          fill="#DC2626"
                        />
                        {/* Trail label */}
                        <text
                          x={cx + 12}
                          y={cy + 6}
                          fontSize="7"
                          fill="#FDE68A"
                          fontWeight="bold"
                        >
                          Cổ Đạo
                        </text>
                      </g>
                    )}

                    {/* Unique Island Feature: The Crown of Harmony & Korean Gate on Crown Sanctuary */}
                    {island.id === 'crown_sanctuary' && (
                      <g pointerEvents="none" opacity={isSelected ? 1.0 : 0.9}>
                        {/* Shrouded Lock Fog Ring */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={island.radius + 10}
                          fill="rgba(15, 23, 42, 0.45)"
                          stroke="#EF4444"
                          strokeWidth="1.5"
                          strokeDasharray="4 3"
                        />
                        {/* Traditional Korean Gate Eaves Silhouette */}
                        <path
                          d={`M ${cx - 16} ${cy - 8} Q ${cx} ${cy - 12} ${cx + 16} ${cy - 8} M ${cx - 12} ${cy - 8} L ${cx - 12} ${cy + 6} M ${cx + 12} ${cy - 8} L ${cx + 12} ${cy + 6}`}
                          stroke="#F87171"
                          strokeWidth="2.0"
                          strokeLinecap="round"
                        />
                        {/* Silla & Dong Son Gold Crown Silhouette */}
                        <polygon
                          points={`${cx - 10},${cy + 15} ${cx - 12},${cy + 1} ${cx - 6},${cy + 7} ${cx},${cy - 2} ${cx + 6},${cy + 7} ${cx + 12},${cy + 1} ${cx + 10},${cy + 15}`}
                          fill="#FCD34D"
                          stroke="#B45309"
                          strokeWidth="1"
                        />
                        {/* Radiant Apex Sun Jewel */}
                        <circle
                          cx={cx}
                          cy={cy - 2}
                          r="2.8"
                          fill="#38BDF8"
                          stroke="#F59E0B"
                          strokeWidth="1"
                        />
                        {/* Center Glowing Lock Emblem */}
                        <g transform={`translate(${cx - 9}, ${cy - 2})`}>
                          <rect x="0" y="6" width="18" height="12" rx="2" fill="#0F172A" stroke="#EF4444" strokeWidth="1.5" />
                          <path d="M 4 6 V 3 A 5 5 0 0 1 14 3 V 6" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
                          <circle cx="9" cy="11.5" r="1.5" fill="#EF4444" />
                        </g>
                        {/* Locked Badge Tag */}
                        <g transform={`translate(${cx - 44}, ${cy - island.radius - 22})`}>
                          <rect width="88" height="16" rx="8" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1" />
                          <text x="44" y="11" fontSize="8" fill="#FEF2F2" fontWeight="bold" textAnchor="middle">
                            🔒 CẦN 7 MẢNH GHÉP
                          </text>
                        </g>
                      </g>
                    )}

                    {/* Island Order Number Badge */}
                    <g transform={`translate(${cx - 16}, ${cy - island.radius - 12})`}>
                      <rect
                        width="32"
                        height="20"
                        rx="10"
                        fill={isSelected ? '#F59E0B' : '#1E293B'}
                        stroke={isSelected ? '#FEF08A' : '#475569'}
                        strokeWidth="1.5"
                      />
                      <text
                        x="16"
                        y="14"
                        textAnchor="middle"
                        fill={isSelected ? '#0F172A' : '#F1F5F9'}
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        #{REGIONS_DATA[island.id]?.order || 1}
                      </text>
                    </g>

                    {/* Island Label */}
                    <text
                      x={cx}
                      y={cy + island.radius + 18}
                      textAnchor="middle"
                      fill={isSelected ? '#FCD34D' : '#E2E8F0'}
                      fontSize={isSelected ? '13' : '11'}
                      fontWeight="bold"
                      className="tracking-wide"
                    >
                      {island.nameVi}
                    </text>

                    {/* Korean Sub-Label */}
                    <text
                      x={cx}
                      y={cy + island.radius + 30}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="sans-serif"
                    >
                      {island.nameKo}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* BOTTOM QUICK INSTRUCTIONS */}
            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Bấm vào từng đảo để xem kiến trúc văn hóa và dịch chuyển camera.</span>
            </div>
          </div>

          {/* SIDE DETAILS PANEL */}
          <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between p-5 overflow-y-auto max-h-[380px] lg:max-h-none">
            <div>
              {/* Selected Region Tag */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
                  ĐẢO SỐ #{activeRegion.order}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeRegion.id.toUpperCase()}
                </span>
              </div>

              {/* Title Header */}
              <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <span>{activeRegion.nameVi}</span>
              </h3>
              <p className="text-xs text-amber-400 font-mono mb-3">
                {activeRegion.nameKo} • {activeRegion.nameEn}
              </p>

              {/* Cultural Fusion Callout */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-amber-500/30 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Giao Thoa Văn Hóa Việt - Hàn</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeRegion.culturalFusionDescription}
                </p>
              </div>

              {/* Two Cultural Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                    🇻🇳 Dấu Ấn Việt Nam
                  </span>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {activeRegion.vietnameseInspirations.slice(0, 3).map((item, i) => (
                      <li key={i} className="truncate" title={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                    🇰🇷 Dấu Ấn Hàn Quốc
                  </span>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {activeRegion.koreanInspirations.slice(0, 3).map((item, i) => (
                      <li key={i} className="truncate" title={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Landmark Highlights */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Công Trình Tiêu Biểu Trên Đảo:
                </span>
                <div className="space-y-1.5">
                  {activeRegion.landmarks.map((landmark, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-slate-950/50 border border-slate-800 text-xs"
                    >
                      <div className="font-semibold text-amber-200">{landmark.name}</div>
                      <div className="text-[11px] text-slate-400">{landmark.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION BUTTON: FLY TO THIS REGION */}
            <div className="pt-3 border-t border-slate-800">
              {selectedIslandId === 'crown_sanctuary' ? (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-amber-300 font-bold text-xs mb-1">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>VÙNG ĐẤT ĐANG BỊ PHONG ẤN</span>
                    </div>
                    <div className="text-xs text-amber-200 font-semibold leading-relaxed">
                      Bạn cần có đủ 7 mảnh ghép để mở khóa vùng đất này
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundManager.playPluck(0);
                      setShowLockedModal(true);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-750"
                  >
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Xem Yêu Cầu 7 Mảnh Ghép</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigateToSelected(selectedIslandId)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Bay Tới {activeRegion.nameVi}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LOCKED REALM POPUP MODAL */}
      {showLockedModal && (
        <LockedRealmModal
          fragments={fragments}
          onClose={() => setShowLockedModal(false)}
          onGoToHarbor={() => {
            setShowLockedModal(false);
            onClose();
            onSelectRegion('harbor');
          }}
        />
      )}
    </div>
  );
};
