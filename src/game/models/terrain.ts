import * as THREE from 'three';
import { getMaterials, WorldMaterials } from './materials';

/**
 * 7-Island Archipelago matching the exact user layout:
 *
 *       (1) Highlands ---------- (4) Festival ---------- (6) Harbor
 *            |                          |                      |
 *            |                          |                      |
 *       (2) Bamboo                      |                      |
 *            \                      (5) Capital                |
 *             \                       /     \                  |
 *              \                     /       \                 |
 *            (3) Mountains ---------/         \--------- (7) Archipelago
 *
 * Graph Topology (7 nodes, 8 bridges):
 * 1. (1) Highlands <--> (2) Bamboo
 * 2. (2) Bamboo <--> (3) Mountains
 * 3. (1) Highlands <--> (4) Festival
 * 4. (4) Festival <--> (6) Harbor
 * 5. (4) Festival <--> (5) Capital
 * 6. (5) Capital <--> (3) Mountains
 * 7. (5) Capital <--> (7) Archipelago
 * 8. (6) Harbor <--> (7) Archipelago
 */

export interface TerrainComponents {
  terrainGroup: THREE.Group;
  waterGroup: THREE.Group;
  bridgesGroup: THREE.Group;
  landmarksGroup: THREE.Group;
}

export function buildWorldTerrain(): TerrainComponents {
  const mats = getMaterials();
  const terrainGroup = new THREE.Group();
  const waterGroup = new THREE.Group();
  const bridgesGroup = new THREE.Group();
  const landmarksGroup = new THREE.Group();

  // ==========================================
  // BASE SEA WATER BASIN (420x420)
  // Vast southern azure ocean separating the Crown Sanctuary Island
  // ==========================================
  const oceanGeo = new THREE.PlaneGeometry(420, 420, 32, 32);
  oceanGeo.rotateX(-Math.PI / 2);
  const ocean = new THREE.Mesh(oceanGeo, mats.waterSurface);
  ocean.position.y = 0.2;
  ocean.receiveShadow = true;
  waterGroup.add(ocean);

  // ==========================================
  // NODE 1: THE GOLDEN RICE HIGHLANDS (Top-Left: -48, -46)
  // 4-tier cascading stepped rice terrace mountain
  // ==========================================
  const terraceConfigs = [
    { rTop: 12.5, rBot: 14.0, h: 1.8, y: 1.5, x: -48, z: -46 },
    { rTop: 10.2, rBot: 11.5, h: 1.4, y: 3.0, x: -49, z: -46.5 },
    { rTop: 8.0, rBot: 9.2, h: 1.3, y: 4.3, x: -50, z: -47 },
    { rTop: 5.6, rBot: 7.0, h: 1.5, y: 5.7, x: -51, z: -47.5 }
  ];

  terraceConfigs.forEach((cfg) => {
    const cliff = new THREE.Mesh(new THREE.CylinderGeometry(cfg.rTop, cfg.rBot, cfg.h, 14), mats.limestoneKarst);
    cliff.position.set(cfg.x, cfg.y, cfg.z);
    cliff.receiveShadow = true;
    cliff.castShadow = true;
    terrainGroup.add(cliff);

    const paddy = new THREE.Mesh(new THREE.CylinderGeometry(cfg.rTop - 0.25, cfg.rTop, 0.08, 14), mats.ricePaddy);
    paddy.position.set(cfg.x, cfg.y + cfg.h / 2 + 0.04, cfg.z);
    paddy.receiveShadow = true;
    terrainGroup.add(paddy);
  });

  // Mountain stream flume from high terrace
  const stream = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 15), mats.waterSurface);
  stream.position.set(-41, 2.8, -40);
  stream.rotation.y = 0.65;
  waterGroup.add(stream);

  // ==========================================
  // NODE 2: THE BAMBOO SCHOLAR GROVE (Middle-Left: -56, 2)
  // Serene bamboo forest island with wooden deck
  // ==========================================
  const bambooBase = new THREE.Mesh(new THREE.CylinderGeometry(12, 13.5, 1.6, 16), mats.stonePier);
  bambooBase.position.set(-56, 0.8, 2);
  bambooBase.receiveShadow = true;
  bambooBase.castShadow = true;
  terrainGroup.add(bambooBase);

  const bambooDeck = new THREE.Mesh(new THREE.CylinderGeometry(10.5, 11.2, 0.35, 16), mats.timberWood);
  bambooDeck.position.set(-56, 1.7, 2);
  bambooDeck.receiveShadow = true;
  terrainGroup.add(bambooDeck);

  const scholarPlatform = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.4, 5.5), mats.stonePier);
  scholarPlatform.position.set(-56, 2.0, 2);
  terrainGroup.add(scholarPlatform);

  // ==========================================
  // NODE 3: THE DRAGON & TIGER MOUNTAINS (Bottom-Left: -30, 50)
  // Sacred granite peaks, five-tier pagoda plateau & tiger sanctuary
  // Engineered with strictly non-overlapping stepped tiers to eliminate all z-fighting & flickering
  // ==========================================

  // 1. COMPREHENSIVE ISLAND BASE & COASTAL BEDROCK (Đất nền toàn đảo)
  // Deep-set stone pier base rising from underwater
  const mtnIslandBase = new THREE.Mesh(new THREE.CylinderGeometry(21.5, 24.0, 1.8, 24), mats.stonePier);
  mtnIslandBase.position.set(-29, 0.7, 50); // top: 1.60
  mtnIslandBase.receiveShadow = true;
  mtnIslandBase.castShadow = true;
  terrainGroup.add(mtnIslandBase);

  // Basalt coastal rock fringe terrace
  const mtnCoastalFringe = new THREE.Mesh(new THREE.CylinderGeometry(20.0, 21.8, 0.5, 24), mats.basaltRock);
  mtnCoastalFringe.position.set(-29, 1.65, 50); // top: 1.90
  mtnCoastalFringe.receiveShadow = true;
  terrainGroup.add(mtnCoastalFringe);

  // Main walkable ground / green turf plateau (Đất nền chính)
  const mtnMainGround = new THREE.Mesh(new THREE.CylinderGeometry(18.5, 19.8, 0.45, 24), mats.cobblestonePath);
  mtnMainGround.position.set(-29, 2.05, 50); // top: 2.275
  mtnMainGround.receiveShadow = true;
  terrainGroup.add(mtnMainGround);

  // 2. DÃY NÚI XƯƠNG RỒNG & ĐẤT NỀN RIÊNG BIỆT (Dragon Spine Mountain Range Foundation)
  // Dedicated multi-tiered foundation beneath the western Dragon Spine range
  const dragonSpineBase = new THREE.Mesh(new THREE.CylinderGeometry(8.5, 10.0, 2.2, 16), mats.stonePier);
  dragonSpineBase.position.set(-36, 1.1, 42); // top: 2.20
  dragonSpineBase.receiveShadow = true;
  dragonSpineBase.castShadow = true;
  terrainGroup.add(dragonSpineBase);

  const dragonSpineTerrace = new THREE.Mesh(new THREE.CylinderGeometry(7.0, 8.2, 1.2, 16), mats.limestoneKarst);
  dragonSpineTerrace.position.set(-36, 2.7, 42); // top: 3.30
  dragonSpineTerrace.receiveShadow = true;
  dragonSpineTerrace.castShadow = true;
  terrainGroup.add(dragonSpineTerrace);

  const dragonRidgeCap = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 6.6, 0.45, 16), mats.cobblestonePath);
  dragonRidgeCap.position.set(-36, 3.45, 42); // top: 3.675
  dragonRidgeCap.receiveShadow = true;
  terrainGroup.add(dragonRidgeCap);

  // Welcoming bridge landing terrace for Bridge 2 (from Bamboo Grove)
  const bridge2Landing = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.8, 0.45, 12), mats.cobblestonePath);
  bridge2Landing.position.set(-38, 2.9, 42); // top: 3.125
  bridge2Landing.receiveShadow = true;
  terrainGroup.add(bridge2Landing);

  // 3. THỀM ĐẤT NỀN CẦU SỐ 6 (Eastern Foothills & Bridge 6 Landing from Capital)
  const eastFoothillsBase = new THREE.Mesh(new THREE.CylinderGeometry(6.6, 7.8, 2.0, 14), mats.stonePier);
  eastFoothillsBase.position.set(-22, 1.0, 40); // top: 2.00
  eastFoothillsBase.receiveShadow = true;
  eastFoothillsBase.castShadow = true;
  terrainGroup.add(eastFoothillsBase);

  const bridge6Landing = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 6.2, 0.5, 14), mats.cobblestonePath);
  bridge6Landing.position.set(-22, 2.25, 40); // top: 2.50
  bridge6Landing.receiveShadow = true;
  terrainGroup.add(bridge6Landing);

  // 4. DÃY NÚI TRUNG TÂM & 2 ĐỈNH NÚI HÙNG VĨ (Central Karst Massif & Dual Sacred Peaks)
  // Stepped limestone mountain body - sculpted so the southern rear terrace is open flat ground
  const karstMassifTier1 = new THREE.Mesh(new THREE.CylinderGeometry(12.5, 14.2, 2.4, 16), mats.limestoneKarst);
  karstMassifTier1.position.set(-30.5, 3.2, 48.0); // top: 4.40
  karstMassifTier1.castShadow = true;
  karstMassifTier1.receiveShadow = true;
  terrainGroup.add(karstMassifTier1);

  const karstMassifTier2 = new THREE.Mesh(new THREE.CylinderGeometry(10.5, 12.5, 2.2, 14), mats.limestoneKarst);
  karstMassifTier2.position.set(-31, 5.3, 49); // top: 6.40
  karstMassifTier2.castShadow = true;
  karstMassifTier2.receiveShadow = true;
  terrainGroup.add(karstMassifTier2);

  // Five-tier Pagoda High Summit Peak (Đỉnh Vân Phong Tháp)
  const pagodaPeakCliff = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 7.6, 1.8, 12), mats.limestoneKarst);
  pagodaPeakCliff.position.set(-33, 7.0, 48); // top: 7.90
  pagodaPeakCliff.castShadow = true;
  pagodaPeakCliff.receiveShadow = true;
  terrainGroup.add(pagodaPeakCliff);

  // Pagoda Courtyard elevated on top of pagodaPeakCliff (top: 8.25)
  const pagodaCourtyard = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.6, 0.35, 12), mats.dancheongEaves);
  pagodaCourtyard.position.set(-33, 8.075, 48); // bottom 7.90, top 8.25
  pagodaCourtyard.receiveShadow = true;
  terrainGroup.add(pagodaCourtyard);

  // White Tiger Sanctuary Peak (Đỉnh Bạch Hổ Điện)
  const tigerPeakCliff = new THREE.Mesh(new THREE.CylinderGeometry(5.0, 6.2, 1.8, 10), mats.limestoneKarst);
  tigerPeakCliff.position.set(-23, 4.4, 53); // top: 5.30
  tigerPeakCliff.castShadow = true;
  tigerPeakCliff.receiveShadow = true;
  terrainGroup.add(tigerPeakCliff);

  // Tiger Courtyard elevated on top of tigerPeakCliff (top: 5.65)
  const tigerCourtyard = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.6, 0.35, 10), mats.cobblestonePath);
  tigerCourtyard.position.set(-23, 5.475, 53); // bottom 5.30, top 5.65
  tigerCourtyard.receiveShadow = true;
  terrainGroup.add(tigerCourtyard);

  // 5. THỀM TRỒNG CÂY CẢNH CHUYÊN BIỆT (Dedicated Raised Tree Planters with zero collision)
  const planterConfigs = [
    { x: -42.5, y: 2.8, z: 38.5, r: 1.8 }, // Western Welcome Pine
    { x: -30.0, y: 2.28, z: 63.5, r: 1.9 }, // Southern Coast Overlook Pine 1
    { x: -20.5, y: 2.28, z: 63.0, r: 1.8 }, // Southern Coast Overlook Pine 2
    { x: -16.5, y: 2.28, z: 43.5, r: 1.8 }, // Eastern Autumn Maple
    { x: -18.0, y: 4.2, z: 56.0, r: 1.7 }, // Tiger Sanctuary Pine Ledge
    { x: -38.5, y: 6.8, z: 51.5, r: 1.6 }  // Pagoda High Lookout Pine
  ];

  planterConfigs.forEach(p => {
    // Stone retaining wall curb
    const curb = new THREE.Mesh(new THREE.CylinderGeometry(p.r, p.r + 0.2, 0.35, 12), mats.stonePier);
    curb.position.set(p.x, p.y + 0.175, p.z);
    curb.receiveShadow = true;
    curb.castShadow = true;
    terrainGroup.add(curb);

    // Soil inside curb
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(p.r - 0.15, p.r - 0.1, 0.12, 12), mats.bambooGreen);
    soil.position.set(p.x, p.y + 0.26, p.z);
    soil.receiveShadow = true;
    terrainGroup.add(soil);
  });

  // 6. ĐƯỜNG CỔ ĐẠO LEO NÚI LÊN CHÙA ĐỈNH (Dragon & Tiger Mountain Pilgrim Stairway)
  // Winding ancient stone stairway carved through misty cliffs with resting pavilions, lanterns & summit arch
  terrainGroup.add(createMountainPilgrimPath(mats));

  // ==========================================
  // NODE 4: THE GRAND FESTIVAL GROUNDS (Top-Middle: -8, -38)
  // Expansive celebratory plaza terrace
  // ==========================================
  const festBase = new THREE.Mesh(new THREE.CylinderGeometry(14, 15.5, 2.0, 16), mats.stonePier);
  festBase.position.set(-8, 1.0, -38);
  festBase.receiveShadow = true;
  festBase.castShadow = true;
  terrainGroup.add(festBase);

  const festPlaza = new THREE.Mesh(new THREE.CylinderGeometry(12, 13, 0.4, 16), mats.cobblestonePath);
  festPlaza.position.set(-8, 2.1, -38);
  festPlaza.receiveShadow = true;
  terrainGroup.add(festPlaza);

  const dais = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 5.2, 0.6, 12), mats.dancheongEaves);
  dais.position.set(-8, 2.5, -38);
  terrainGroup.add(dais);

  // ==========================================
  // NODE 5: THE TWIN HERITAGE CAPITAL (Center: 2, 6)
  // Royal palace citadel with Dancheong courtyard
  // ==========================================
  const capBase = new THREE.Mesh(new THREE.CylinderGeometry(13.0, 14.5, 2.0, 16), mats.stonePier);
  capBase.position.set(2, 0.9, 6);
  capBase.receiveShadow = true;
  capBase.castShadow = true;
  terrainGroup.add(capBase);

  const capPlaza = new THREE.Mesh(new THREE.CylinderGeometry(10.6, 11.2, 0.4, 16), mats.cobblestonePath);
  capPlaza.position.set(2, 2.05, 6);
  capPlaza.receiveShadow = true;
  terrainGroup.add(capPlaza);

  const sunken = new THREE.Mesh(new THREE.CylinderGeometry(4.0, 4.0, 0.15, 16), mats.dancheongEaves);
  sunken.position.set(2, 2.2, 6);
  terrainGroup.add(sunken);

  // ==========================================
  // NODE 6: THE LANTERN & LOTUS HARBOR (Top-Right: 52, -38)
  // Canal port with stone quays
  // ==========================================
  const harborBase = new THREE.Mesh(new THREE.CylinderGeometry(13.5, 14.8, 1.4, 16), mats.stonePier);
  harborBase.position.set(52, 0.65, -38);
  harborBase.receiveShadow = true;
  harborBase.castShadow = true;
  terrainGroup.add(harborBase);

  const harborPlaza = new THREE.Mesh(new THREE.CylinderGeometry(11.8, 12.5, 0.3, 16), mats.cobblestonePath);
  harborPlaza.position.set(52, 1.4, -38);
  harborPlaza.receiveShadow = true;
  terrainGroup.add(harborPlaza);

  // Canal cutting through
  const canal = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.3, 24), mats.waterSurface);
  canal.position.set(52, 0.85, -38);
  waterGroup.add(canal);

  [-2.9, 2.9].forEach(qx => {
    const quay = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 24), mats.stonePier);
    quay.position.set(52 + qx, 1.25, -38);
    quay.receiveShadow = true;
    terrainGroup.add(quay);
  });

  // ==========================================
  // NODE 7: THE AZURE ISLAND ARCHIPELAGO (Bottom-Right: 44, 36)
  // Karst sea pillars and basalt rock reefs (with pottery craft kilns)
  // ==========================================
  const islandMain = new THREE.Mesh(new THREE.CylinderGeometry(12.5, 14.0, 1.2, 16), mats.stonePier);
  islandMain.position.set(44, 0.55, 36);
  islandMain.receiveShadow = true;
  terrainGroup.add(islandMain);

  const basaltFringe = new THREE.Mesh(new THREE.CylinderGeometry(14.2, 15.5, 0.25, 16), mats.basaltRock);
  basaltFringe.position.set(44, 0.75, 36);
  terrainGroup.add(basaltFringe);

  // Karst Sea Towers around the archipelago
  const karstOffsets = [
    { x: 54, z: 28, h: 6.8, r: 1.8 },
    { x: 56, z: 44, h: 8.2, r: 2.2 },
    { x: 34, z: 48, h: 5.6, r: 1.6 },
    { x: 60, z: 36, h: 6.2, r: 1.7 }
  ];

  karstOffsets.forEach(k => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(k.r * 0.7, k.r, k.h, 7), mats.limestoneKarst);
    pillar.position.set(k.x, k.h / 2, k.z);
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    terrainGroup.add(pillar);

    const cap = new THREE.ConeGeometry(k.r * 0.9, 0.9, 7);
    const capMesh = new THREE.Mesh(cap, mats.bambooGreen);
    capMesh.position.set(k.x, k.h + 0.4, k.z);
    terrainGroup.add(capMesh);
  });

  // ==========================================
  // NODE 8: THE CROWN OF HARMONY SANCTUARY (Far South Sea: 8, 140)
  // Completely isolated mystical sanctuary island with zero bridges!
  // ==========================================
  const crownSanctuaryIsland = createCrownSanctuaryIsland(mats);
  terrainGroup.add(crownSanctuaryIsland);

  // ==========================================
  // THE 8 BRIDGES MATCHING THE EXACT USER DIAGRAM
  // (With scenic bends / dog-leg elbow platforms & lanterns)
  // ==========================================

  // (1) Highlands (-48, -46) <--> Bamboo Grove (-56, 2) [Left Edge 1]
  bridgesGroup.add(createCurvedScenicBridge([
    [-48, 2.2, -35],
    [-55, 1.8, -17],
    [-56, 1.5, -9]
  ], {
    deckMat: mats.timberWood,
    pierMat: mats.stonePier,
    width: 2.5,
    hasLanternPosts: true,
    hasCornerPavilion: true
  }));

  // (2) Bamboo Grove (-56, 2) <--> Dragon & Tiger Mountains (-30, 50) [Left Edge 2]
  bridgesGroup.add(createCurvedScenicBridge([
    [-52, 1.5, 12],
    [-46, 2.2, 28],
    [-38, 3.0, 42]
  ], {
    deckMat: mats.timberWood,
    pierMat: mats.limestoneKarst,
    width: 2.5,
    hasLanternPosts: true,
    hasCornerPavilion: true
  }));

  // (3) Highlands (-48, -46) <--> Festival Grounds (-8, -38) [Top Edge 1]
  bridgesGroup.add(createCurvedScenicBridge([
    [-37, 2.2, -44],
    [-26, 1.9, -40],
    [-19, 1.8, -39]
  ], {
    deckMat: mats.timberWood,
    pierMat: mats.stonePier,
    width: 2.6,
    hasLanternPosts: true,
    hasCornerPavilion: false
  }));

  // (4) Festival Grounds (-8, -38) <--> Lantern Harbor (52, -38) [Top Edge 2]
  bridgesGroup.add(createCurvedScenicBridge([
    [4, 1.8, -38],
    [22, 1.4, -39],
    [40, 1.1, -38]
  ], {
    deckMat: mats.stonePier,
    pierMat: mats.stonePier,
    width: 2.8,
    hasLanternPosts: true,
    hasCornerPavilion: true
  }));

  // (5) Festival Grounds (-8, -38) <--> Capital (2, 6) [Center Vertical Edge]
  bridgesGroup.add(createCurvedScenicBridge([
    [-6, 1.8, -26],
    [-2, 1.5, -10],
    [1, 1.3, -4]
  ], {
    deckMat: mats.stonePier,
    pierMat: mats.stonePier,
    width: 2.8,
    hasLanternPosts: true,
    hasCornerPavilion: false
  }));

  // (6) Capital (2, 6) <--> Dragon & Tiger Mountains (-30, 50) [Center to Bottom-Left Edge]
  bridgesGroup.add(createCurvedScenicBridge([
    [-6, 1.3, 16],
    [-15, 2.0, 29],
    [-23, 2.8, 41]
  ], {
    deckMat: mats.stonePier,
    pierMat: mats.stonePier,
    width: 2.6,
    hasLanternPosts: true,
    hasCornerPavilion: true
  }));

  // (7) Capital (2, 6) <--> Azure Archipelago (44, 36) [Center to Bottom-Right Edge]
  bridgesGroup.add(createCurvedScenicBridge([
    [12, 1.2, 12],
    [24, 1.0, 20],
    [34, 0.9, 29]
  ], {
    deckMat: mats.stonePier,
    pierMat: mats.stonePier,
    width: 2.6,
    hasLanternPosts: true,
    hasCornerPavilion: false
  }));

  // (8) Lantern Harbor (52, -38) <--> Azure Archipelago (44, 36) [Right Vertical Edge]
  bridgesGroup.add(createCurvedScenicBridge([
    [52, 1.0, -26],
    [50, 0.9, -1],
    [46, 0.8, 24]
  ], {
    deckMat: mats.timberWood,
    pierMat: mats.basaltRock,
    width: 2.6,
    hasLanternPosts: true,
    hasCornerPavilion: true
  }));

  // Internal Mountain Sky-Rope Suspension Bridge (High Peak to Tiger Shrine)
  bridgesGroup.add(createSuspensionRopeBridge(-33, 8.25, 48, -23, 5.65, 53, mats));

  // (10) Archipelago Stepping Stones hopping across the lagoon
  for (let step = 0; step < 12; step++) {
    const t = step / 11;
    const sx = 36 + Math.sin(t * Math.PI) * 5.0;
    const sz = 26 + t * 20;
    const stone = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.0, 0.45, 7), mats.basaltRock);
    stone.position.set(sx, 0.45, sz);
    stone.castShadow = true;
    bridgesGroup.add(stone);
  }

  return { terrainGroup, waterGroup, bridgesGroup, landmarksGroup };
}

/**
 * Creates a curved / dog-leg multi-segment scenic bridge with supporting piers,
 * handrails, corner landings, and traditional lanterns / pavilions at bends.
 */
interface BridgeOptions {
  width?: number;
  deckMat: THREE.Material;
  pierMat: THREE.Material;
  hasLanternPosts?: boolean;
  hasCornerPavilion?: boolean;
}

function createCurvedScenicBridge(
  waypoints: [number, number, number][],
  options: BridgeOptions
): THREE.Group {
  const group = new THREE.Group();
  const mats = getMaterials();
  const width = options.width ?? 2.6;

  // 1. Bridge sections between consecutive waypoints
  for (let i = 0; i < waypoints.length - 1; i++) {
    const [x1, y1, z1] = waypoints[i];
    const [x2, y2, z2] = waypoints[i + 1];

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    const len = Math.sqrt(dx * dx + dz * dz);
    const angleY = Math.atan2(dx, dz);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const midZ = (z1 + z2) / 2;

    // Deck
    const deck = new THREE.Mesh(new THREE.BoxGeometry(width, 0.36, len), options.deckMat);
    deck.position.set(midX, midY, midZ);
    deck.rotation.y = angleY;
    deck.castShadow = true;
    deck.receiveShadow = true;
    group.add(deck);

    // Handrails
    const railGeo = new THREE.BoxGeometry(0.12, 0.52, len);
    [-width / 2 + 0.08, width / 2 - 0.08].forEach(rx => {
      const rail = new THREE.Mesh(railGeo, mats.redLacquer);
      rail.position.set(midX, midY + 0.42, midZ);
      rail.rotation.y = angleY;
      rail.translateX(rx);
      group.add(rail);
    });

    // Supporting Piers
    const numPiers = Math.max(1, Math.floor(len / 8));
    for (let p = 1; p <= numPiers; p++) {
      const t = p / (numPiers + 1);
      const px = x1 + dx * t;
      const py = y1 + dy * t;
      const pz = z1 + dz * t;
      const pierH = Math.max(1.2, py + 0.2);

      const pier = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, pierH, 8), options.pierMat);
      pier.position.set(px, py - pierH / 2 + 0.1, pz);
      pier.castShadow = true;
      pier.receiveShadow = true;
      group.add(pier);

      // Lantern Posts along spans
      if (options.hasLanternPosts) {
        [-width / 2 - 0.2, width / 2 + 0.2].forEach(offset => {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.05, 6), mats.agedWood);
          post.position.set(px, py + 0.52, pz);
          post.rotation.y = angleY;
          post.translateX(offset);
          group.add(post);

          const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.35, 6), mats.lanternSilkRed);
          lantern.position.set(px, py + 1.1, pz);
          lantern.rotation.y = angleY;
          lantern.translateX(offset);
          group.add(lantern);
        });
      }
    }
  }

  // 2. Elbow landings at intermediate bends
  for (let i = 1; i < waypoints.length - 1; i++) {
    const [cx, cy, cz] = waypoints[i];
    const isCornerPav = options.hasCornerPavilion && i === 1;
    const landingRadius = isCornerPav ? width * 1.4 : width * 0.9;
    const landingH = Math.max(1.4, cy + 0.2);

    const landing = new THREE.Mesh(new THREE.CylinderGeometry(landingRadius, landingRadius * 1.15, landingH, 8), options.pierMat);
    landing.position.set(cx, cy - landingH / 2 + 0.18, cz);
    landing.castShadow = true;
    landing.receiveShadow = true;
    group.add(landing);

    const landingCap = new THREE.Mesh(new THREE.CylinderGeometry(landingRadius + 0.1, landingRadius + 0.1, 0.12, 8), mats.dancheongEaves);
    landingCap.position.set(cx, cy + 0.18, cz);
    group.add(landingCap);

    if (isCornerPav) {
      const pav = createRestingPavilion(cx, cy + 0.2, cz, landingRadius, mats);
      group.add(pav);
    } else {
      const lantern = createStoneLantern(cx, cy + 0.25, cz, mats);
      group.add(lantern);
    }
  }

  return group;
}

function createRestingPavilion(
  x: number, y: number, z: number,
  radius: number,
  mats: WorldMaterials
): THREE.Group {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const colDist = radius * 0.65;
  [
    [-colDist, -colDist],
    [colDist, -colDist],
    [-colDist, colDist],
    [colDist, colDist]
  ].forEach(([px, pz]) => {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.0, 8), mats.timberWood);
    col.position.set(px, 1.0, pz);
    col.castShadow = true;
    group.add(col);
  });

  const frieze = new THREE.Mesh(new THREE.BoxGeometry(radius * 1.5, 0.18, radius * 1.5), mats.dancheongEaves);
  frieze.position.y = 2.0;
  group.add(frieze);

  const roof = new THREE.Mesh(new THREE.ConeGeometry(radius * 1.25, 0.9, 4), mats.giwaRoof);
  roof.rotateY(Math.PI / 4);
  roof.position.y = 2.55;
  roof.castShadow = true;
  group.add(roof);

  const finial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.45, 6), mats.goldTrim);
  finial.position.y = 3.15;
  group.add(finial);

  const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.32, 6), mats.lanternSilkYellow);
  lantern.position.y = 1.4;
  group.add(lantern);

  return group;
}

function createStoneLantern(
  x: number, y: number, z: number,
  mats: WorldMaterials
): THREE.Group {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.35, 0.25, 6), mats.stoneStatue);
  base.position.y = 0.125;
  group.add(base);

  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.5, 6), mats.stoneStatue);
  pillar.position.y = 0.5;
  group.add(pillar);

  const chamber = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.3, 6), mats.lanternSilkYellow);
  chamber.position.y = 0.85;
  group.add(chamber);

  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.25, 6), mats.stoneStatue);
  cap.position.y = 1.08;
  group.add(cap);

  const jewel = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), mats.goldTrim);
  jewel.position.y = 1.25;
  group.add(jewel);

  return group;
}

function createSuspensionRopeBridge(
  x1: number, y1: number, z1: number,
  x2: number, y2: number, z2: number,
  mats: WorldMaterials
): THREE.Group {
  const group = new THREE.Group();
  const dx = x2 - x1;
  const dz = z2 - z1;
  const len = Math.sqrt(dx * dx + dz * dz);
  const angleY = Math.atan2(dx, dz);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 - 0.3;
  const midZ = (z1 + z2) / 2;

  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.16, len), mats.agedWood);
  deck.position.set(midX, midY, midZ);
  deck.rotation.y = angleY;
  deck.castShadow = true;
  group.add(deck);

  const ropeGeo = new THREE.CylinderGeometry(0.045, 0.045, len, 6);
  ropeGeo.rotateX(Math.PI / 2);
  [-0.75, 0.75].forEach(rx => {
    const rope = new THREE.Mesh(ropeGeo, mats.goldTrim);
    rope.position.set(midX, midY + 0.6, midZ);
    rope.rotation.y = angleY;
    rope.translateX(rx);
    group.add(rope);
  });

  // Mountain Anchor Stone Pillars at both ends
  [[x1, y1, z1], [x2, y2, z2]].forEach(([ax, ay, az]) => {
    [-0.8, 0.8].forEach(px => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.4, 6), mats.stonePier);
      post.position.set(ax, ay + 0.7, az);
      post.rotation.y = angleY;
      post.translateX(px);
      post.castShadow = true;
      group.add(post);
    });
  });

  return group;
}

/**
 * Creates the Mountain Pilgrim Stairway & Trail (Đường Cổ Đạo Leo Núi Vân Phong)
 * A winding ancient stone mountain path with steps, timber railings, stone lanterns,
 * mid-mountain resting pavilion, and summit arrival gate leading up to the Five-Tier Pagoda.
 */
function createMountainPilgrimPath(mats: WorldMaterials): THREE.Group {
  const group = new THREE.Group();

  // 1. TRAILHEAD PORTAL AT MOUNTAIN BASE (Cổng Cổ Đạo Chân Núi: -23.0, 2.50, 42.0)
  const gateX = -23.0;
  const gateY = 2.50;
  const gateZ = 42.0;
  const gateAngle = Math.atan2(-1.6, 2.0); // angled along initial trail vector

  const gateGroup = new THREE.Group();
  gateGroup.position.set(gateX, gateY, gateZ);
  gateGroup.rotation.y = gateAngle;

  // Stone plinths & red timber columns
  [-1.35, 1.35].forEach(gx => {
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.4, 8), mats.stonePier);
    plinth.position.set(gx, 0.2, 0);
    plinth.castShadow = true;
    gateGroup.add(plinth);

    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.4, 8), mats.redLacquer);
    col.position.set(gx, 1.4, 0);
    col.castShadow = true;
    gateGroup.add(col);
  });

  // Crossbeams & Signboard ("VÂN PHONG CỔ ĐẠO")
  const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.18, 0.24), mats.timberWood);
  crossBeam.position.set(0, 2.4, 0);
  crossBeam.castShadow = true;
  gateGroup.add(crossBeam);

  const signBoard = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.08), mats.agedWood);
  signBoard.position.set(0, 2.15, 0.1);
  gateGroup.add(signBoard);

  const signGold = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 0.09), mats.goldTrim);
  signGold.position.set(0, 2.15, 0.11);
  gateGroup.add(signGold);

  // Gate Roof Eaves
  const dancheong = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 0.9), mats.dancheongEaves);
  dancheong.position.set(0, 2.56, 0);
  gateGroup.add(dancheong);

  const gateRoof = new THREE.Mesh(new THREE.ConeGeometry(2.4, 0.7, 4), mats.giwaRoof);
  gateRoof.rotateY(Math.PI / 4);
  gateRoof.scale.set(1.5, 0.6, 0.8);
  gateRoof.position.set(0, 2.95, 0);
  gateRoof.castShadow = true;
  gateGroup.add(gateRoof);

  // Gold ridge finial
  const finial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 6), mats.goldTrim);
  finial.position.set(0, 3.4, 0);
  gateGroup.add(finial);

  group.add(gateGroup);

  // 2 flanking stone lanterns at the trailhead gate
  group.add(createStoneLantern(gateX - 1.6, gateY, gateZ - 0.4, mats));
  group.add(createStoneLantern(gateX + 1.6, gateY, gateZ + 0.4, mats));

  // 2. STAIRWAY SEGMENTS & WAYPOINTS (Bậc Thang Đá Xẻ Vách Núi)
  const waypoints: [number, number, number][] = [
    [-23.0, 2.50, 42.0], // Trailhead Base Gate
    [-24.6, 3.15, 44.0], // Lower Mountain Slope
    [-26.2, 3.85, 46.2], // East Cliff Turn
    [-27.4, 4.55, 47.8], // Mid-mountain Ridge
    [-28.5, 4.88, 49.5], // Rest Terrace & Lookout Pavilion
    [-29.8, 5.75, 50.2], // Karst Cliffside Ascent
    [-31.0, 6.70, 49.2], // Upper Limestone Shoulder
    [-31.8, 7.55, 47.8], // Cloud Stairway
    [-32.4, 8.25, 46.5]  // Pagoda Courtyard Apron Entrance
  ];

  // Build steps, foundation brackets and safety railings for each segment
  for (let w = 0; w < waypoints.length - 1; w++) {
    const [x1, y1, z1] = waypoints[w];
    const [x2, y2, z2] = waypoints[w + 1];

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    const horizDist = Math.sqrt(dx * dx + dz * dz);
    const stepCount = Math.max(3, Math.round(horizDist / 0.5));
    const angleY = Math.atan2(dx, dz);

    const stepWidth = 2.1;
    const stepTreadDepth = Math.max(0.55, (horizDist / stepCount) * 1.15);
    const stepRiserH = 0.16;

    for (let s = 0; s < stepCount; s++) {
      const t = (s + 0.5) / stepCount;
      const sx = x1 + dx * t;
      const sz = z1 + dz * t;
      const sy = y1 + dy * (s / stepCount);

      // Stone step tread
      const stepMesh = new THREE.Mesh(
        new THREE.BoxGeometry(stepWidth, stepRiserH, stepTreadDepth),
        mats.cobblestonePath
      );
      stepMesh.position.set(sx, sy + stepRiserH / 2, sz);
      stepMesh.rotation.y = angleY;
      stepMesh.castShadow = true;
      stepMesh.receiveShadow = true;
      group.add(stepMesh);

      // Solid stone bracket/wedge underneath to firmly seat step into mountain rock
      const bracketMesh = new THREE.Mesh(
        new THREE.BoxGeometry(stepWidth * 0.94, 0.38, stepTreadDepth * 0.94),
        mats.stonePier
      );
      bracketMesh.position.set(sx, sy - 0.12, sz);
      bracketMesh.rotation.y = angleY;
      bracketMesh.castShadow = true;
      bracketMesh.receiveShadow = true;
      group.add(bracketMesh);

      // Outer cliffside safety timber rail post (on every other step)
      if (s % 2 === 0) {
        const post = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.06, 0.8, 6),
          mats.timberWood
        );
        post.position.set(sx, sy + stepRiserH + 0.4, sz);
        post.rotation.y = angleY;
        post.translateX(stepWidth / 2 - 0.12);
        post.castShadow = true;
        group.add(post);

        const railCap = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 6, 6),
          mats.dancheongEaves
        );
        railCap.position.set(sx, sy + stepRiserH + 0.8, sz);
        railCap.rotation.y = angleY;
        railCap.translateX(stepWidth / 2 - 0.12);
        group.add(railCap);
      }
    }

    // Continuous handrail beam along the outer edge of this segment
    const railBeam = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, horizDist),
      mats.timberWood
    );
    railBeam.position.set((x1 + x2) / 2, (y1 + y2) / 2 + 0.75, (z1 + z2) / 2);
    railBeam.rotation.y = angleY;
    railBeam.translateX(stepWidth / 2 - 0.12);
    group.add(railBeam);
  }

  // 3. MID-MOUNTAIN REST TERRACE & OVERLOOK PAVILION (Chiếu Nghỉ Vọng Hải: -28.5, 4.88, 49.5)
  const terraceX = -28.5;
  const terraceY = 4.88;
  const terraceZ = 49.5;
  const terraceR = 2.4;

  // Foundation rock under terrace
  const terracePier = new THREE.Mesh(
    new THREE.CylinderGeometry(terraceR * 0.95, terraceR * 1.1, 1.4, 12),
    mats.stonePier
  );
  terracePier.position.set(terraceX, terraceY - 0.7, terraceZ);
  terracePier.castShadow = true;
  terracePier.receiveShadow = true;
  group.add(terracePier);

  // Walkable terrace stone floor
  const terraceFloor = new THREE.Mesh(
    new THREE.CylinderGeometry(terraceR, terraceR, 0.28, 12),
    mats.cobblestonePath
  );
  terraceFloor.position.set(terraceX, terraceY + 0.14, terraceZ);
  terraceFloor.receiveShadow = true;
  group.add(terraceFloor);

  // Outer safety stone balustrade curb
  const balustrade = new THREE.Mesh(
    new THREE.TorusGeometry(terraceR - 0.15, 0.12, 6, 16, Math.PI * 1.4),
    mats.stonePier
  );
  balustrade.position.set(terraceX, terraceY + 0.35, terraceZ);
  balustrade.rotateX(Math.PI / 2);
  balustrade.rotateZ(0.6);
  group.add(balustrade);

  // Rustic Mountain Rest Pavilion (Vọng Nguyệt Đình)
  const pavilion = createRestingPavilion(terraceX, terraceY + 0.28, terraceZ, 1.4, mats);
  group.add(pavilion);

  // Stone Tea Table & 2 Stools inside pavilion
  const teaTable = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.45, 8), mats.stoneStatue);
  teaTable.position.set(terraceX, terraceY + 0.28 + 0.225, terraceZ);
  teaTable.castShadow = true;
  group.add(teaTable);

  [-0.65, 0.65].forEach(sx => {
    const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.3, 6), mats.stoneStatue);
    stool.position.set(terraceX + sx, terraceY + 0.28 + 0.15, terraceZ);
    stool.castShadow = true;
    group.add(stool);
  });

  // Stone Lantern at the overlook edge
  group.add(createStoneLantern(terraceX + 1.6, terraceY + 0.28, terraceZ + 1.2, mats));

  // 4. LANTERNS AT KEY TURNS ALONG THE WAY
  group.add(createStoneLantern(-26.2, 3.85, 46.2, mats)); // East cliff turn
  group.add(createStoneLantern(-31.0, 6.70, 49.2, mats)); // Upper limestone shoulder

  // 5. SUMMIT GATE ARCHWAY AT PAGODA COURTYARD (Cổng Thượng Vân: -32.4, 8.25, 46.5)
  const summitGate = new THREE.Group();
  summitGate.position.set(-32.4, 8.25, 46.5);
  summitGate.rotation.y = Math.atan2(-0.6, -1.3); // facing towards the approaching stairs

  // Stone plinths & posts
  [-1.1, 1.1].forEach(sx => {
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.3, 6), mats.stonePier);
    plinth.position.set(sx, 0.15, 0);
    summitGate.add(plinth);

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.0, 6), mats.redLacquer);
    post.position.set(sx, 1.15, 0);
    post.castShadow = true;
    summitGate.add(post);
  });

  // Cross lintel & Dancheong eave
  const sBeam = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.14, 0.18), mats.timberWood);
  sBeam.position.set(0, 2.05, 0);
  summitGate.add(sBeam);

  const sEave = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.15, 0.6), mats.dancheongEaves);
  sEave.position.set(0, 2.2, 0);
  summitGate.add(sEave);

  const sRoof = new THREE.Mesh(new THREE.ConeGeometry(1.8, 0.55, 4), mats.giwaRoof);
  sRoof.rotateY(Math.PI / 4);
  sRoof.scale.set(1.5, 0.6, 0.7);
  sRoof.position.set(0, 2.5, 0);
  sRoof.castShadow = true;
  summitGate.add(sRoof);

  // Hanging bronze prayer wind bell
  const bell = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.22, 6), mats.bronzeRelic);
  bell.position.set(0, 1.85, 0);
  summitGate.add(bell);

  group.add(summitGate);

  // Lantern flanking summit arrival
  group.add(createStoneLantern(-31.6, 8.25, 45.8, mats));

  return group;
}

/**
 * Isolated Crown Sanctuary Island (Đảo Vương Miện Giao Thoa Việt - Hàn)
 * Completely separated in the southern azure sea (x: 8, z: 92) with zero bridges,
 * rising gracefully with tiered white limestone, basalt reefs, sacred lotus pools,
 * ceremonial approach flagstones, and framing sea spires.
 */
function createCrownSanctuaryIsland(mats: WorldMaterials): THREE.Group {
  const group = new THREE.Group();
  const cx = 8;
  const cz = 140; // Pulled significantly further South into the deep azure sea

  // 1. Outer Dark Basalt & Volcanic Reef Ring
  const outerReef = new THREE.Mesh(
    new THREE.CylinderGeometry(17.5, 19.5, 1.4, 24),
    mats.basaltRock
  );
  outerReef.position.set(cx, 0.5, cz);
  outerReef.receiveShadow = true;
  group.add(outerReef);

  // 2. Sandy Beach & Granite Shoreline Rim
  const beachRim = new THREE.Mesh(
    new THREE.CylinderGeometry(16.0, 17.5, 0.45, 24),
    mats.stonePier
  );
  beachRim.position.set(cx, 1.0, cz);
  beachRim.receiveShadow = true;
  group.add(beachRim);

  // 3. Main Elevated Sacred Plateau
  const plateau = new THREE.Mesh(
    new THREE.CylinderGeometry(13.8, 15.5, 1.8, 24),
    mats.stonePier
  );
  plateau.position.set(cx, 1.8, cz);
  plateau.receiveShadow = true;
  plateau.castShadow = true;
  group.add(plateau);

  // Lush Emerald Grass Top Surface
  const grassTop = new THREE.Mesh(
    new THREE.CylinderGeometry(13.2, 13.8, 0.22, 24),
    mats.bambooGreen
  );
  grassTop.position.set(cx, 2.7, cz);
  grassTop.receiveShadow = true;
  group.add(grassTop);

  // 4. Ceremonial Sacred Approach Walkway (Đường Đá Ngự Đạo)
  // Connects southern arrival terrace (z: cz - 17) through the Korean Gate (z: cz - 12) to the Lotus Altar (z: cz + 2)
  const walkway = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 0.26, 26),
    mats.cobblestonePath
  );
  walkway.position.set(cx, 2.72, cz - 6);
  walkway.receiveShadow = true;
  group.add(walkway);

  // Lateral curb trim stones
  [-2.3, 2.3].forEach(sideX => {
    const curb = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.32, 26),
      mats.stonePier
    );
    curb.position.set(cx + sideX, 2.75, cz - 6);
    curb.receiveShadow = true;
    group.add(curb);
  });

  // Southern Arrival Sea Steps (Thềm Đón Thuyền cập đảo)
  for (let s = 0; s < 4; s++) {
    const stepMesh = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.25, 0.95),
      mats.stonePier
    );
    stepMesh.position.set(cx, 2.4 - s * 0.4, (cz - 19) - s * 0.85);
    stepMesh.receiveShadow = true;
    group.add(stepMesh);
  }

  // 5. Sacred Lotus Ring Water Basin encircling the Altar
  const lotusCanal = new THREE.Mesh(
    new THREE.CylinderGeometry(4.4, 4.6, 0.22, 24),
    mats.stonePier
  );
  lotusCanal.position.set(cx, 2.65, cz + 2);
  group.add(lotusCanal);

  const lotusWater = new THREE.Mesh(
    new THREE.CylinderGeometry(4.0, 4.0, 0.12, 24),
    mats.waterSurface
  );
  lotusWater.position.set(cx, 2.72, cz + 2);
  group.add(lotusWater);

  // 6. Four Majestic Karst Spires guarding the sanctuary perimeter
  const spires = [
    { x: cx - 15, z: cz - 12, h: 9.8, r: 2.2 },
    { x: cx + 15, z: cz - 12, h: 9.0, r: 2.0 },
    { x: cx - 14, z: cz + 12, h: 8.5, r: 1.9 },
    { x: cx + 14, z: cz + 12, h: 10.2, r: 2.3 }
  ];

  spires.forEach(sp => {
    const spireMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(sp.r * 0.65, sp.r, sp.h, 7),
      mats.limestoneKarst
    );
    spireMesh.position.set(sp.x, sp.h / 2, sp.z);
    spireMesh.castShadow = true;
    spireMesh.receiveShadow = true;
    group.add(spireMesh);

    const foliage = new THREE.Mesh(
      new THREE.ConeGeometry(sp.r * 0.9, 1.2, 7),
      mats.leafPine
    );
    foliage.position.set(sp.x, sp.h + 0.6, sp.z);
    group.add(foliage);
  });

  return group;
}


