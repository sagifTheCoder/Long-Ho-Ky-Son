import * as THREE from 'three';
import {
  createDancheongTexture,
  createGiwaRoofTexture,
  createVietnameseTerracottaTexture,
  createWoodPlankTexture,
  createCobblestoneTexture,
  createTerraceRiceTexture,
  createWaterRipplesTexture
} from './textures';

export interface WorldMaterials {
  dancheongEaves: THREE.MeshStandardMaterial;
  giwaRoof: THREE.MeshStandardMaterial;
  terracottaRoof: THREE.MeshStandardMaterial;
  timberWood: THREE.MeshStandardMaterial;
  agedWood: THREE.MeshStandardMaterial;
  ochreWall: THREE.MeshStandardMaterial;
  whiteWall: THREE.MeshStandardMaterial;
  redLacquer: THREE.MeshStandardMaterial;
  goldTrim: THREE.MeshStandardMaterial;
  cobblestonePath: THREE.MeshStandardMaterial;
  stonePier: THREE.MeshStandardMaterial;
  basaltRock: THREE.MeshStandardMaterial;
  limestoneKarst: THREE.MeshStandardMaterial;
  ricePaddy: THREE.MeshStandardMaterial;
  waterSurface: THREE.MeshPhysicalMaterial;
  lanternSilkRed: THREE.MeshStandardMaterial;
  lanternSilkYellow: THREE.MeshStandardMaterial;
  lanternLotusPink: THREE.MeshStandardMaterial;
  bambooGreen: THREE.MeshStandardMaterial;
  leafPine: THREE.MeshStandardMaterial;
  leafCherry: THREE.MeshStandardMaterial;
  leafMaple: THREE.MeshStandardMaterial;
  waterBuffaloSkin: THREE.MeshStandardMaterial;
  stoneStatue: THREE.MeshStandardMaterial;
  bronzeRelic: THREE.MeshStandardMaterial;
  jadeGlow: THREE.MeshStandardMaterial;
}

let cachedMaterials: WorldMaterials | null = null;

export function getMaterials(): WorldMaterials {
  if (cachedMaterials) return cachedMaterials;

  const dancheongTex = createDancheongTexture();
  dancheongTex.repeat.set(4, 1);

  const giwaTex = createGiwaRoofTexture();
  giwaTex.repeat.set(2, 2);

  const terracottaTex = createVietnameseTerracottaTexture();
  terracottaTex.repeat.set(2, 2);

  const woodTex = createWoodPlankTexture();
  woodTex.repeat.set(2, 2);

  const cobbleTex = createCobblestoneTexture();
  cobbleTex.repeat.set(3, 3);

  const riceTex = createTerraceRiceTexture();
  riceTex.repeat.set(4, 4);

  const waterTex = createWaterRipplesTexture();
  waterTex.repeat.set(3, 3);

  cachedMaterials = {
    dancheongEaves: new THREE.MeshStandardMaterial({
      map: dancheongTex,
      roughness: 0.45,
      metalness: 0.1
    }),
    giwaRoof: new THREE.MeshStandardMaterial({
      map: giwaTex,
      roughness: 0.7,
      metalness: 0.15
    }),
    terracottaRoof: new THREE.MeshStandardMaterial({
      map: terracottaTex,
      roughness: 0.65,
      metalness: 0.05
    }),
    timberWood: new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.75,
      metalness: 0.05
    }),
    agedWood: new THREE.MeshStandardMaterial({
      color: 0x5c4033,
      roughness: 0.85,
      metalness: 0.05
    }),
    ochreWall: new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Hoi An ancient yellow ochre
      roughness: 0.8,
      metalness: 0.05
    }),
    whiteWall: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9, // Hanok white paper/lime plaster
      roughness: 0.85,
      metalness: 0.02
    }),
    redLacquer: new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.3,
      metalness: 0.2
    }),
    goldTrim: new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.25,
      metalness: 0.85
    }),
    cobblestonePath: new THREE.MeshStandardMaterial({
      map: cobbleTex,
      roughness: 0.9,
      metalness: 0.05
    }),
    stonePier: new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.85,
      metalness: 0.05
    }),
    basaltRock: new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Jeju dark volcanic basalt
      roughness: 0.92,
      metalness: 0.1
    }),
    limestoneKarst: new THREE.MeshStandardMaterial({
      color: 0x6b7280,
      roughness: 0.9,
      metalness: 0.05
    }),
    ricePaddy: new THREE.MeshStandardMaterial({
      map: riceTex,
      roughness: 0.85,
      metalness: 0.05
    }),
    waterSurface: new THREE.MeshPhysicalMaterial({
      map: waterTex,
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      opacity: 0.85,
      transparent: true,
      ior: 1.33
    }),
    lanternSilkRed: new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xd97706,
      emissiveIntensity: 0.45,
      roughness: 0.4,
      metalness: 0.05
    }),
    lanternSilkYellow: new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.45,
      roughness: 0.4,
      metalness: 0.05
    }),
    lanternLotusPink: new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      emissive: 0xec4899,
      emissiveIntensity: 0.45,
      roughness: 0.35,
      metalness: 0.05
    }),
    bambooGreen: new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      roughness: 0.5,
      metalness: 0.1
    }),
    leafPine: new THREE.MeshStandardMaterial({
      color: 0x14532d,
      roughness: 0.7,
      metalness: 0.05
    }),
    leafCherry: new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.6,
      metalness: 0.05
    }),
    leafMaple: new THREE.MeshStandardMaterial({
      color: 0xe11d48, // autumn red maple
      roughness: 0.6,
      metalness: 0.05
    }),
    waterBuffaloSkin: new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.75,
      metalness: 0.05
    }),
    stoneStatue: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.85,
      metalness: 0.05
    }),
    bronzeRelic: new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.35,
      metalness: 0.8
    }),
    jadeGlow: new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      roughness: 0.25,
      metalness: 0.2
    })
  };

  return cachedMaterials;
}
