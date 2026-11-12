export type RegionId = 'capital' | 'highlands' | 'harbor' | 'mountains' | 'archipelago' | 'festival' | 'bamboo' | 'ceramics' | 'crown_sanctuary';

export interface WorldPosition {
  x: number;
  y: number;
  z: number;
}

export interface CollectibleItem {
  id: string;
  regionId: RegionId;
  name: string;
  nameVi: string;
  nameKo: string;
  description: string;
  position: WorldPosition;
  collected: boolean;
  type: 'spirit_lotus' | 'jade_talisman' | 'ancient_scroll' | 'dancheong_tile' | 'bronze_drum';
}

export interface RegionalQuest {
  id: string;
  regionId: RegionId;
  title: string;
  titleVi: string;
  titleKo: string;
  summary: string;
  summaryVi: string;
  culturalLore: string;
  objective: string;
  progress: number;
  target: number;
  isCompleted: boolean;
  rewardName: string;
  rewardArtifact: string;
}

export interface RegionData {
  id: RegionId;
  order: number;
  nameEn: string;
  nameVi: string;
  nameKo: string;
  titleSubtitle: string;
  color: string;
  accentColor: string;
  bgGradient: string;
  center: WorldPosition;
  cameraOffset: WorldPosition;
  description: string;
  culturalFusionDescription: string;
  vietnameseInspirations: string[];
  koreanInspirations: string[];
  landmarks: {
    name: string;
    description: string;
    pos: WorldPosition;
  }[];
  quest: RegionalQuest;
  gameplayMechanic: string;
}

export interface CulturalLoreEntry {
  id: string;
  title: string;
  titleVi: string;
  titleKo: string;
  category: 'architecture' | 'mythology' | 'cuisine' | 'festivals' | 'crafts' | 'culture';
  vietnameseAspect: string;
  koreanAspect: string;
  fusionInWorld: string;
  iconName: string;
}

export interface CulturalFragment {
  id: string;
  regionId: RegionId;
  nameVi: string;
  descVi: string;
  icon: string;
  collected: boolean;
}

export interface NPCData {
  id: string;
  name: string;
  nameKo?: string;
  title: string;
  regionId: RegionId;
  type: 'lore' | 'quest' | 'captain';
  outfit: 'ao_dai' | 'hanbok' | 'scholar' | 'artisan' | 'captain' | 'tho_cam' | 'nhat_binh' | 'tu_than' | 'ba_ba' | 'ao_tac';
  color: string;
  pos: WorldPosition;
  rotY?: number;
  occupationVi?: string;
  dialogueVi: string[];
  culturalFactVi: string;
  questObjectiveVi?: string;
  questActionPrompt?: string;
  questRewardVi?: string;
  fragmentId?: string;
}

export interface CulturalThemeOverview {
  regionId: RegionId;
  regionNameVi: string;
  regionNameKo: string;
  titleVi: string;
  titleKo: string;
  themeBadgeVi: string;
  color: string;
  vietnamAspect: {
    headline: string;
    description: string;
    highlights: string[];
    symbolicRelic: string;
  };
  koreaAspect: {
    headline: string;
    description: string;
    highlights: string[];
    symbolicRelic: string;
  };
  synthesisHarmony: {
    headline: string;
    description: string;
    sharedValues: string[];
  };
  boardPos: WorldPosition;
  rotY: number;
}
