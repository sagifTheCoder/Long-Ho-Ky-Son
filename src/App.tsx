/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { WorldScene } from './game/WorldRenderer';
import { soundManager } from './game/audio';
import { RegionId } from './game/types';
import { GameHud } from './components/GameHud';
import { CelebrationModal } from './components/CelebrationModal';
import { MapIllustrationModal } from './components/MapIllustrationModal';
import { LockedRealmModal } from './components/LockedRealmModal';
import { NpcDialogueModal } from './components/NpcDialogueModal';
import { CulturalThemeModal } from './components/CulturalThemeModal';
import { NPCS_DATA, CULTURAL_FRAGMENTS } from './game/worldData';
import { Ship, Sparkles } from 'lucide-react';

export default function App() {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<WorldScene | null>(null);

  // Map state
  const [currentRegionId, setCurrentRegionId] = useState<RegionId>('capital');
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'twilight'>('twilight');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCinematicTour, setIsCinematicTour] = useState<boolean>(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState<boolean>(false);
  const [isMapIllustrationOpen, setIsMapIllustrationOpen] = useState<boolean>(false);
  const [isLockedNoticeOpen, setIsLockedNoticeOpen] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [themeModalRegionId, setThemeModalRegionId] = useState<RegionId>('highlands');

  // NPC and Fragments state
  const [selectedNpcId, setSelectedNpcId] = useState<string | null>(null);
  const [isVoyaging, setIsVoyaging] = useState<boolean>(false);
  const [fragments, setFragments] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cultural_fragments_collected');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const activeNpc = NPCS_DATA.find((n) => n.id === selectedNpcId) || null;

  // Initialize Three.js scene directly
  useEffect(() => {
    if (!canvasMountRef.current) return;

    const scene = new WorldScene(canvasMountRef.current);
    sceneRef.current = scene;

    // Connect raycasting click on NPCs
    scene.onNpcClick = (npcId: string) => {
      soundManager.playPluck(2);
      setSelectedNpcId(npcId);
    };

    // Connect raycasting click on Cultural Information Boards (all 7 non-crown regions)
    scene.onInformationBoardClick = (regionId: RegionId) => {
      soundManager.playGong(false);
      setThemeModalRegionId(regionId);
      setIsThemeModalOpen(true);
    };

    // Start gentle ambient traditional zither improvisation on first user gesture
    const startAudioOnce = () => {
      soundManager.setMuted(isMuted);
      soundManager.startAmbientMelody();
      window.removeEventListener('pointerdown', startAudioOnce);
      window.removeEventListener('keydown', startAudioOnce);
    };
    window.addEventListener('pointerdown', startAudioOnce);
    window.addEventListener('keydown', startAudioOnce);

    return () => {
      scene.destroy();
      sceneRef.current = null;
      window.removeEventListener('pointerdown', startAudioOnce);
      window.removeEventListener('keydown', startAudioOnce);
    };
  }, [isMuted]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsCodexOpen(false);
        setIsMapIllustrationOpen(false);
        setIsLockedNoticeOpen(false);
        setIsThemeModalOpen(false);
        setSelectedNpcId(null);
      }
      if (e.code === 'KeyM') {
        soundManager.playPluck(2);
        setIsMapIllustrationOpen((prev) => !prev);
      }
      if (e.code === 'Space') {
        handleToggleCinematicTour();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Time of Day Toggle
  const handleToggleTimeOfDay = () => {
    const next = timeOfDay === 'day' ? 'twilight' : 'day';
    setTimeOfDay(next);
    if (sceneRef.current) {
      sceneRef.current.applyTimeOfDay(next);
    }
    soundManager.playPluck(2);
  };

  // Audio Toggle
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  };

  // Cinematic Tour Toggle
  const handleToggleCinematicTour = () => {
    const next = !isCinematicTour;
    setIsCinematicTour(next);
    if (sceneRef.current) {
      sceneRef.current.toggleCinematicTour();
      soundManager.playGong(false);
    }
  };

  // Focus Region
  const handleSelectRegion = (regionId: RegionId) => {
    // Crown Sanctuary can never be teleported to instantly!
    if (regionId === 'crown_sanctuary') {
      soundManager.playPluck(0);
      setIsLockedNoticeOpen(true);
      return;
    }
    setCurrentRegionId(regionId);
    setIsCinematicTour(false);
    if (sceneRef.current) {
      soundManager.playPluck(1);
      sceneRef.current.focusRegion(regionId);
    }
  };

  // Focus Overview
  const handleCameraOverview = () => {
    setIsCinematicTour(false);
    if (sceneRef.current) {
      soundManager.playPluck(0);
      sceneRef.current.focusOverview();
    }
  };

  // Visit Theme Region & Focus Board in 3D
  const handleVisitThemeRegion = (regionId: RegionId) => {
    if (regionId === 'crown_sanctuary') return;
    setCurrentRegionId(regionId);
    setIsCinematicTour(false);
    if (sceneRef.current) {
      soundManager.playPluck(1);
      sceneRef.current.focusThemeBoard(regionId);
    }
  };

  // Collect Fragment from Quest NPC
  const handleCollectFragment = (fragmentId: string) => {
    setFragments((prev) => {
      const next = { ...prev, [fragmentId]: true };
      try {
        localStorage.setItem('cultural_fragments_collected', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Embark on Sea Voyage from Harbor to Crown Sanctuary
  const handleEmbarkVoyage = () => {
    setIsVoyaging(true);
    setSelectedNpcId(null);
    if (sceneRef.current) {
      sceneRef.current.embarkVoyageToCrownSanctuary(() => {
        setIsVoyaging(false);
        setCurrentRegionId('crown_sanctuary');
        soundManager.playGong(true);
      });
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans">
      {/* 3D ISOMETRIC WORLD MAP VIEWPORT */}
      <div
        ref={canvasMountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* MINIMALIST MAP HUD */}
      <GameHud
        currentRegionId={currentRegionId}
        timeOfDay={timeOfDay}
        isMuted={isMuted}
        isCinematicTour={isCinematicTour}
        fragments={fragments}
        onToggleTimeOfDay={handleToggleTimeOfDay}
        onToggleMute={handleToggleMute}
        onToggleCinematicTour={handleToggleCinematicTour}
        onOpenCodex={() => {
          soundManager.playPluck(3);
          setIsCodexOpen(true);
        }}
        onOpenMapIllustration={() => {
          soundManager.playPluck(2);
          setIsMapIllustrationOpen(true);
        }}
        onOpenLockedRealm={() => {
          soundManager.playPluck(1);
          setIsLockedNoticeOpen(true);
        }}
        onSelectRegion={handleSelectRegion}
        onCameraOverview={handleCameraOverview}
      />

      {/* VOYAGE CINEMATIC BANNER */}
      {isVoyaging && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in duration-300">
          <div className="px-6 py-3.5 rounded-2xl bg-cyan-950/90 border border-cyan-400/50 shadow-2xl backdrop-blur-md flex items-center gap-3 text-cyan-200">
            <Ship className="w-6 h-6 text-cyan-300 animate-bounce" />
            <div>
              <div className="text-sm font-bold text-white tracking-wide">
                Hải Trình Nam Hải Đang Diễn Ra...
              </div>
              <div className="text-xs text-cyan-300/80">
                Thuyền buồm đang vượt sóng đưa bạn đến Vương Đảo Hòa Hợp Văn Hóa
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NPC DIALOGUE & QUEST MODAL */}
      {activeNpc && (
        <NpcDialogueModal
          npc={activeNpc}
          fragments={fragments}
          allFragments={CULTURAL_FRAGMENTS}
          onClose={() => setSelectedNpcId(null)}
          onCollectFragment={handleCollectFragment}
          onEmbarkVoyage={handleEmbarkVoyage}
        />
      )}

      {/* CULTURAL THEME OVERVIEW MODAL (VIETNAM - KOREA HERITAGE INFORMATION BOARD) */}
      {isThemeModalOpen && (
        <CulturalThemeModal
          regionId={themeModalRegionId}
          fragments={fragments}
          onCollectFragment={handleCollectFragment}
          onClose={() => setIsThemeModalOpen(false)}
        />
      )}

      {/* CULTURAL LORE CODEX MODAL */}
      {isCodexOpen && (
        <LoreCodexModal onClose={() => setIsCodexOpen(false)} />
      )}

      {/* SCHEMATIC MAP ILLUSTRATION MODAL */}
      {isMapIllustrationOpen && (
        <MapIllustrationModal
          currentRegionId={currentRegionId}
          fragments={fragments}
          onSelectRegion={handleSelectRegion}
          onClose={() => setIsMapIllustrationOpen(false)}
        />
      )}

      {/* LOCKED REALM NOTICE MODAL */}
      {isLockedNoticeOpen && (
        <LockedRealmModal
          fragments={fragments}
          onClose={() => setIsLockedNoticeOpen(false)}
          onGoToHarbor={() => {
            setIsLockedNoticeOpen(false);
            handleSelectRegion('harbor');
          }}
        />
      )}
    </div>
  );
}
