import * as THREE from 'three';
import { getMaterials } from './materials';
import { NPCData, RegionId, CulturalThemeOverview } from '../types';

/**
 * Procedural cultural artifacts, folklore creatures, boats, and atmospheric props
 */

/**
 * Doctor Turtle Stele (Bia Rùa Tiến Sĩ - Văn Miếu & Korean Biseok)
 */
export function createScholarTurtleStele(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 1. Carved Stone Turtle Base (Rùa đá)
  const turtleBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.35, 10), mats.stonePier);
  turtleBody.scale.set(1.1, 0.8, 1.4);
  turtleBody.position.y = 0.18;
  turtleBody.castShadow = true;
  group.add(turtleBody);

  // Turtle Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.3), mats.stonePier);
  head.position.set(0, 0.22, 0.95);
  group.add(head);

  // 4 Turtle flippers
  [-0.45, 0.45].forEach(fx => {
    [-0.5, 0.5].forEach(fz => {
      const flipper = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.12, 6), mats.stonePier);
      flipper.position.set(fx, 0.08, fz);
      group.add(flipper);
    });
  });

  // 2. Tall Granite Doctor Stele on Turtle's Back
  const stele = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.5, 0.14), mats.stoneStatue);
  stele.position.set(0, 0.35 + 0.75, 0);
  stele.castShadow = true;
  group.add(stele);

  // Arched Stele Crown (Trán bia chạm rồng mây)
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.14, 12, 1, false, 0, Math.PI), mats.goldTrim);
  crown.rotateZ(Math.PI / 2);
  crown.position.set(0, 0.35 + 1.5, 0);
  group.add(crown);

  return group;
}

/**
 * Korean Jangseung Totem Poles & Vietnamese Cây Nêu Pole
 */
export function createVillageGuardianTotems(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Jangseung 1: Great General Under Heaven (Cheonha Daejanggun)
  const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.2, 8), mats.agedWood);
  post1.position.set(-0.6, 1.1, 0);
  post1.castShadow = true;
  group.add(post1);

  // Comical carved eyes & toothy mouth
  const eyes1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.12), mats.whiteWall);
  eyes1.position.set(-0.6, 1.8, 0.16);
  group.add(eyes1);

  // Jangseung 2: Female General of the Earth
  const post2 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 2.0, 8), mats.timberWood);
  post2.position.set(0.6, 1.0, 0);
  post2.castShadow = true;
  group.add(post2);

  const eyes2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.1, 0.12), mats.whiteWall);
  eyes2.position.set(0.6, 1.65, 0.15);
  group.add(eyes2);

  // Vietnamese Cây Nêu Bamboo Pole in center
  const bambooPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 4.2, 6), mats.bambooGreen);
  bambooPole.position.set(0, 2.1, 0.2);
  bambooPole.castShadow = true;
  group.add(bambooPole);

  // Ring with red festival ribbons and clay bells at top
  const ribbonRing = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 6, 12), mats.lanternSilkRed);
  ribbonRing.position.set(0, 4.0, 0.2);
  ribbonRing.rotateX(Math.PI / 2);
  group.add(ribbonRing);

  return group;
}

/**
 * Monumental Goryeo Celadon Moon Jar (Bình gốm ngọc bích)
 */
export function createGiantCeladonMoonJar(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Carved wooden pedestal
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 0.45, 12), mats.agedWood);
  stand.position.y = 0.225;
  stand.castShadow = true;
  group.add(stand);

  // Giant round celadon jar body
  const jar = new THREE.Mesh(new THREE.SphereGeometry(0.85, 16, 12), mats.jadeGlow);
  jar.scale.set(1, 1.15, 1);
  jar.position.y = 0.45 + 0.95;
  jar.castShadow = true;
  group.add(jar);

  // Flared porcelain neck & rim
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.35, 0.22, 16), mats.jadeGlow);
  rim.position.y = 0.45 + 1.95;
  group.add(rim);

  return group;
}

/**
 * Traditional Bronze Tripod Incense Burner (Lư Hương Đồng)
 */
export function createIncenseBurnerTripod(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Bronze bowl
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.3, 0.45, 12), mats.bronzeRelic);
  bowl.position.y = 0.55;
  bowl.castShadow = true;
  group.add(bowl);

  // 3 Tripod legs
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.45, 6), mats.bronzeRelic);
    leg.position.set(Math.cos(angle) * 0.3, 0.225, Math.sin(angle) * 0.3);
    group.add(leg);
  }

  // Incense sticks
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.6, 4), mats.redLacquer);
  stick.position.set(0, 0.85, 0);
  group.add(stick);

  return group;
}

/**
 * Korean Onggi Fermentation Jars on Stone Terrace (Jangdokdae - 장독대)
 */
export function createJangdokdaePlatform(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const platform = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 1.8), mats.stonePier);
  platform.position.y = 0.15;
  platform.castShadow = true;
  group.add(platform);

  const jarConfigs = [
    { x: -0.7, z: -0.4, r: 0.28, h: 0.65 },
    { x: 0, z: -0.4, r: 0.32, h: 0.75 },
    { x: 0.7, z: -0.4, r: 0.25, h: 0.6 },
    { x: -0.4, z: 0.35, r: 0.22, h: 0.5 },
    { x: 0.4, z: 0.35, r: 0.26, h: 0.55 }
  ];

  jarConfigs.forEach(j => {
    const jarBody = new THREE.Mesh(new THREE.SphereGeometry(j.r, 10, 8), mats.agedWood);
    jarBody.scale.set(1, 1.3, 1);
    jarBody.position.set(j.x, 0.3 + (j.h * 0.5), j.z);
    jarBody.castShadow = true;
    group.add(jarBody);

    const lid = new THREE.Mesh(new THREE.CylinderGeometry(j.r * 0.9, j.r * 1.05, 0.08, 10), mats.giwaRoof);
    lid.position.set(j.x, 0.3 + j.h, j.z);
    group.add(lid);
  });

  return group;
}

/**
 * Water Buffalo (Con Trâu) with gentle eyes and curved horns
 */
export function createDetailedWaterBuffalo(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.9), mats.waterBuffaloSkin);
  body.position.y = 0.9;
  body.castShadow = true;
  group.add(body);

  const legGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.7, 8);
  [
    [-0.5, -0.3],
    [0.5, -0.3],
    [-0.5, 0.3],
    [0.5, 0.3]
  ].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(legGeo, mats.waterBuffaloSkin);
    leg.position.set(lx, 0.35, lz);
    leg.castShadow = true;
    group.add(leg);
  });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 0.55), mats.waterBuffaloSkin);
  head.position.set(0.95, 1.05, 0);
  head.castShadow = true;
  group.add(head);

  const horn = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.08, 6, 16, Math.PI), mats.agedWood);
  horn.position.set(0.95, 1.38, 0);
  horn.rotation.x = Math.PI / 2;
  group.add(horn);

  const bird = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 5), mats.basaltRock);
  bird.position.set(1.3, 1.45, 0);
  bird.rotation.z = -0.6;
  group.add(bird);

  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, 0.6, 6), mats.waterBuffaloSkin);
  tail.position.set(-0.88, 0.75, 0);
  tail.rotation.z = 0.3;
  group.add(tail);

  return group;
}

/**
 * Baekdusan Sacred White Tiger (Hổ thần Baekdu)
 */
export function createStoneTiger(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const base = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 1.4), mats.stonePier);
  base.position.y = 0.275;
  base.castShadow = true;
  group.add(base);

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.1, 0.85), mats.stoneStatue);
  body.position.y = 1.05;
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.65, 0.72), mats.stoneStatue);
  head.position.set(0.12, 1.75, 0);
  group.add(head);

  [-0.25, 0.25].forEach(ez => {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.22, 5), mats.stoneStatue);
    ear.position.set(0.12, 2.12, ez);
    group.add(ear);
  });

  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.38), mats.whiteWall);
  snout.position.set(0.48, 1.65, 0);
  group.add(snout);

  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.05, 1.0, 6), mats.stoneStatue);
  tail.position.set(-0.5, 1.25, 0);
  tail.rotation.z = -0.45;
  group.add(tail);

  return group;
}

/**
 * Dragon Stone Spine
 */
export function createDragonStoneSpine(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const numSegments = 8;
  for (let i = 0; i < numSegments; i++) {
    const t = i / numSegments;
    const height = Math.sin(t * Math.PI) * 2.6 + 0.9;
    const width = 0.9 + Math.sin(t * Math.PI) * 0.7;

    const seg = new THREE.Mesh(new THREE.ConeGeometry(width, height, 5), mats.limestoneKarst);
    seg.position.set(i * 1.4 - 4.8, height / 2 - 0.08, Math.sin(t * Math.PI * 1.5) * 1.3);
    seg.rotation.y = t * 0.8;
    seg.castShadow = true;
    group.add(seg);

    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, height * 0.45, 0.45), mats.jadeGlow);
    fin.position.set(i * 1.4 - 4.8, height * 0.88, Math.sin(t * Math.PI * 1.5) * 1.3);
    group.add(fin);
  }

  return group;
}

/**
 * Jeju Dol Hareubang
 */
export function createDolHareubang(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 1.8, 12), mats.basaltRock);
  body.position.y = 0.9;
  body.castShadow = true;
  group.add(body);

  [-0.2, 0.2].forEach(ex => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mats.stoneStatue);
    eye.position.set(ex, 1.38, 0.42);
    group.add(eye);
  });

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.32, 0.16), mats.basaltRock);
  nose.position.set(0, 1.28, 0.46);
  group.add(nose);

  const handGeo = new THREE.BoxGeometry(0.2, 0.16, 0.35);
  const leftHand = new THREE.Mesh(handGeo, mats.basaltRock);
  leftHand.position.set(-0.38, 0.95, 0.22);
  leftHand.rotation.y = 0.4;
  group.add(leftHand);

  const rightHand = new THREE.Mesh(handGeo, mats.basaltRock);
  rightHand.position.set(0.38, 0.75, 0.22);
  rightHand.rotation.y = -0.4;
  group.add(rightHand);

  const hat = new THREE.Mesh(new THREE.ConeGeometry(0.78, 0.38, 16), mats.timberWood);
  hat.position.y = 1.9;
  hat.castShadow = true;
  group.add(hat);

  return group;
}

/**
 * Traditional Wooden Sampan Boat (Thuyền Tam Bản)
 */
export function createSampanBoat(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const hull = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 3.6), mats.timberWood);
  hull.position.y = 0.22;
  hull.castShadow = true;
  group.add(hull);

  const canopyGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.6, 12, 1, false, 0, Math.PI);
  canopyGeo.rotateZ(Math.PI / 2);
  const canopy = new THREE.Mesh(canopyGeo, mats.agedWood);
  canopy.position.set(0, 0.6, 0);
  group.add(canopy);

  const oar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.0, 6), mats.agedWood);
  oar.position.set(0.65, 0.35, -1.3);
  oar.rotation.x = 0.4;
  oar.rotation.z = -0.3;
  group.add(oar);

  const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), mats.lanternSilkYellow);
  lantern.position.set(0, 0.55, 1.7);
  group.add(lantern);

  return group;
}

/**
 * Vietnamese Thuyền Thúng
 */
export function createThuyenThung(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const bowlGeo = new THREE.SphereGeometry(0.8, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const bowl = new THREE.Mesh(bowlGeo, mats.timberWood);
  bowl.position.y = 0.42;
  bowl.castShadow = true;
  group.add(bowl);

  const rimGeo = new THREE.TorusGeometry(0.8, 0.06, 8, 24);
  rimGeo.rotateX(Math.PI / 2);
  const rim = new THREE.Mesh(rimGeo, mats.bambooGreen);
  rim.position.y = 0.42;
  group.add(rim);

  const plank = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.28), mats.agedWood);
  plank.position.y = 0.38;
  group.add(plank);

  return group;
}

/**
 * Floating River Lantern
 */
export function createFloatingLantern(type: 'silk_diamond' | 'lotus' = 'silk_diamond'): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  if (type === 'lotus') {
    const blossom = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.28, 8), mats.lanternLotusPink);
    blossom.position.y = 0.14;
    group.add(blossom);

    const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.16, 6), mats.lanternSilkYellow);
    candle.position.y = 0.2;
    group.add(candle);
  } else {
    const lanternGeo = new THREE.SphereGeometry(0.22, 8, 8);
    lanternGeo.scale(1, 1.4, 1);
    const lantern = new THREE.Mesh(lanternGeo, mats.lanternSilkRed);
    lantern.position.y = 0.25;
    group.add(lantern);

    const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.16, 6), mats.goldTrim);
    tassel.position.y = 0.02;
    group.add(tassel);
  }

  const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.03, 8), mats.agedWood);
  pad.position.y = 0.02;
  group.add(pad);

  return group;
}

/**
 * Ceremonial Drum
 */
export function createCeremonialDrum(type: 'dong_son' | 'korean_buk'): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  if (type === 'dong_son') {
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.75, 0.8, 16), mats.bronzeRelic);
    drum.position.y = 0.42;
    drum.castShadow = true;
    group.add(drum);

    const topDisk = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.06, 16), mats.goldTrim);
    topDisk.position.y = 0.84;
    group.add(topDisk);
  } else {
    const drumGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.75, 16);
    drumGeo.rotateZ(Math.PI / 2);
    const drum = new THREE.Mesh(drumGeo, mats.dancheongEaves);
    drum.position.y = 0.75;
    drum.castShadow = true;
    group.add(drum);

    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.48, 0.75), mats.agedWood);
    stand.position.y = 0.24;
    group.add(stand);
  }

  return group;
}

/**
 * Grand Korean Palatial Royal Gate (Hòa Hợp Môn / 화합문)
 * Authentic Korean architecture with Dancheong bracketing, Giwa hip-and-gable roof,
 * red lacquer columns on granite plinths, and royal calligraphy plaque.
 */
export function createKoreanRoyalGate(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 1. Granite Plinths (4 stone foundation bases)
  const colPositions = [
    { x: -2.2, z: -0.6 },
    { x: 2.2, z: -0.6 },
    { x: -2.2, z: 0.6 },
    { x: 2.2, z: 0.6 }
  ];

  colPositions.forEach(p => {
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.4, 0.45, 8), mats.stonePier);
    plinth.position.set(p.x, 0.225, p.z);
    plinth.castShadow = true;
    group.add(plinth);

    // Red lacquer pillars
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 3.6, 10), mats.redLacquer);
    col.position.set(p.x, 0.45 + 1.8, p.z);
    col.castShadow = true;
    group.add(col);
  });

  // 2. Dancheong Bracket System & Architraves (Gongpo)
  const mainLintel = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.28, 1.6), mats.timberWood);
  mainLintel.position.set(0, 3.9, 0);
  mainLintel.castShadow = true;
  group.add(mainLintel);

  // Multi-tier Dancheong painted eaves board
  const dancheongTier1 = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.22, 2.0), mats.dancheongEaves);
  dancheongTier1.position.set(0, 4.15, 0);
  group.add(dancheongTier1);

  const dancheongTier2 = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.2, 2.4), mats.dancheongEaves);
  dancheongTier2.position.set(0, 4.35, 0);
  group.add(dancheongTier2);

  // 3. Royal Calligraphy Inscription Tablet ("화합문" / Hòa Hợp Môn)
  const plaqueFrame = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 0.12), mats.agedWood);
  plaqueFrame.position.set(0, 3.55, 0.85);
  group.add(plaqueFrame);

  const plaqueGold = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 0.14), mats.goldTrim);
  plaqueGold.position.set(0, 3.55, 0.86);
  group.add(plaqueGold);

  // Korean characters tablet bar representing "화합문"
  const charMesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.24, 0.16), mats.redLacquer);
  charMesh.position.set(0, 3.55, 0.87);
  group.add(charMesh);

  // 4. Korean Sweeping Giwa Hip-and-Gable Roof (팔작지붕 Paljak-jibung)
  const lowerRoof = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.35, 3.2), mats.giwaRoof);
  lowerRoof.position.set(0, 4.6, 0);
  lowerRoof.castShadow = true;
  group.add(lowerRoof);

  // Upper pyramid hip roof with curved corners
  const upperRoof = new THREE.Mesh(new THREE.ConeGeometry(4.2, 1.4, 4), mats.giwaRoof);
  upperRoof.rotateY(Math.PI / 4);
  upperRoof.scale.set(1.4, 0.7, 0.85);
  upperRoof.position.set(0, 5.25, 0);
  upperRoof.castShadow = true;
  group.add(upperRoof);

  // Swept eave wing ends (curling up)
  [-3.5, 3.5].forEach(ex => {
    [-1.6, 1.6].forEach(ez => {
      const eaveWing = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.18, 0.5), mats.giwaRoof);
      eaveWing.position.set(ex, 4.75, ez);
      eaveWing.rotation.x = ez > 0 ? 0.3 : -0.3;
      eaveWing.rotation.z = ex > 0 ? -0.3 : 0.3;
      group.add(eaveWing);
    });
  });

  // Main Roof Ridge (Yongmaru) and Gold Dragon Crest Finials (Chimi)
  const ridgeBeam = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.25, 0.3), mats.stonePier);
  ridgeBeam.position.set(0, 5.85, 0);
  group.add(ridgeBeam);

  [-2.2, 2.2].forEach(rx => {
    const chimi = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.55, 6), mats.goldTrim);
    chimi.position.set(rx, 6.1, 0);
    chimi.rotation.z = rx > 0 ? 0.35 : -0.35;
    group.add(chimi);
  });

  const centerJewel = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), mats.goldTrim);
  centerJewel.position.set(0, 6.05, 0);
  group.add(centerJewel);

  // 5. Flanking Royal Stone Guardian Lanterns
  group.add(createPalaceStoneLantern(-3.4, 0, 1.2, mats));
  group.add(createPalaceStoneLantern(3.4, 0, 1.2, mats));

  return group;
}

function createPalaceStoneLantern(x: number, y: number, z: number, mats: ReturnType<typeof getMaterials>): THREE.Group {
  const g = new THREE.Group();
  g.position.set(x, y, z);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.36, 0.35, 8), mats.stonePier);
  base.position.y = 0.175;
  base.castShadow = true;
  g.add(base);

  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.75, 8), mats.stonePier);
  pillar.position.y = 0.725;
  pillar.castShadow = true;
  g.add(pillar);

  const chamber = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), mats.lanternSilkYellow);
  chamber.position.y = 1.3;
  g.add(chamber);

  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.46, 0.32, 4), mats.giwaRoof);
  cap.rotateY(Math.PI / 4);
  cap.position.y = 1.68;
  cap.castShadow = true;
  g.add(cap);

  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), mats.goldTrim);
  finial.position.y = 1.92;
  g.add(finial);

  return g;
}

/**
 * The Crown of Cultural Harmony (Vương Miện Giao Thoa Việt - Hàn)
 * Fuses the ancient Silla Golden Crown (Cheonmachong Gold Crown with tree uprights,
 * antler branches, hanging gold spangles, and jade Gogok pendants) with Vietnamese
 * Imperial & Dong Son motifs (14-ray Dong Son Sun, celestial soaring Chim Lạc cranes,
 * and white jade lotus pedestal).
 */
export function createFusionHarmonyCrown(): {
  group: THREE.Group;
  crownMesh: THREE.Group;
  auraSparkles: THREE.Group;
  glowRing: THREE.Group;
  invertedTriangle: THREE.Group;
} {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 1. WHITE JADE LOTUS ALTAR (Đài Sen Bạch Ngọc)
  const altarGroup = new THREE.Group();

  // Octagonal tiered marble altar plinth
  const plinthTier1 = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.9, 0.4, 8), mats.whiteWall);
  plinthTier1.position.y = 0.2;
  plinthTier1.castShadow = true;
  plinthTier1.receiveShadow = true;
  altarGroup.add(plinthTier1);

  const plinthTier2 = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 0.35, 8), mats.whiteWall);
  plinthTier2.position.y = 0.55;
  plinthTier2.castShadow = true;
  plinthTier2.receiveShadow = true;
  altarGroup.add(plinthTier2);

  // Gilded decorative ring with Dong Son geometric meanders
  const goldRing = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.08, 8, 32), mats.goldTrim);
  goldRing.rotateX(Math.PI / 2);
  goldRing.position.y = 0.72;
  altarGroup.add(goldRing);

  // 8 Royal Lotus Petals encircling the altar top
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const petal = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.6, 5), mats.lanternLotusPink);
    petal.position.set(Math.cos(angle) * 1.85, 0.85, Math.sin(angle) * 1.85);
    petal.rotation.y = angle;
    petal.rotation.x = 0.45;
    petal.castShadow = true;
    altarGroup.add(petal);

    // Inner gold tipped leaf
    const goldPetal = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.4, 4), mats.goldTrim);
    goldPetal.position.set(Math.cos(angle) * 1.6, 0.82, Math.sin(angle) * 1.6);
    goldPetal.rotation.y = angle;
    goldPetal.rotation.x = 0.35;
    altarGroup.add(goldPetal);
  }

  // Sacred inner pool reflecting the crown
  const innerWell = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.1, 16), mats.waterSurface);
  innerWell.position.y = 0.75;
  altarGroup.add(innerWell);

  group.add(altarGroup);

  // 2. THE FLOATING HARMONY CROWN (Vương Miện Hòa Hợp)
  const crownMesh = new THREE.Group();
  crownMesh.position.y = 1.85; // Floats above altar

  // (A) The Gilded Headband (Vành Đai Hoàng Kim)
  const headbandRadius = 0.88;
  const headband = new THREE.Mesh(
    new THREE.CylinderGeometry(headbandRadius, headbandRadius, 0.28, 32, 1, true),
    mats.goldTrim
  );
  headband.castShadow = true;
  crownMesh.add(headband);

  // Upper and lower beaded gold wire rims
  [-0.14, 0.14].forEach(ry => {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(headbandRadius, 0.04, 8, 32), mats.goldTrim);
    rim.rotateX(Math.PI / 2);
    rim.position.y = ry;
    crownMesh.add(rim);
  });

  // Hanging gold sequin spangles (Susu) along the headband perimeter
  const numSpangles = 16;
  for (let s = 0; s < numSpangles; s++) {
    const sAngle = (s * Math.PI * 2) / numSpangles;
    const spangle = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.015, 8), mats.goldTrim);
    spangle.position.set(
      Math.cos(sAngle) * (headbandRadius + 0.05),
      -0.22,
      Math.sin(sAngle) * (headbandRadius + 0.05)
    );
    spangle.rotateX(Math.PI / 2);
    crownMesh.add(spangle);
  }

  // (B) Three Tree-Shaped Uprights (Ba Trụ Cây Vũ Trụ Tân La - Chulja-yangsik)
  const treeAngles = [0, Math.PI / 2, -Math.PI / 2];
  treeAngles.forEach(tAngle => {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(
      Math.cos(tAngle) * headbandRadius,
      0.14,
      Math.sin(tAngle) * headbandRadius
    );
    treeGroup.rotation.y = -tAngle + Math.PI / 2;

    // Main vertical tree trunk
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.45, 0.05), mats.goldTrim);
    trunk.position.y = 0.725;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    // Three horizontal crossbars ('出' shape tiers)
    const tierHeights = [0.45, 0.85, 1.25];
    const tierWidths = [0.82, 0.68, 0.52];

    tierHeights.forEach((th, idx) => {
      const tw = tierWidths[idx];
      const crossbar = new THREE.Mesh(new THREE.BoxGeometry(tw, 0.08, 0.04), mats.goldTrim);
      crossbar.position.y = th;
      treeGroup.add(crossbar);

      // Upright hooks on branch tips
      [-tw / 2, tw / 2].forEach(bx => {
        const branchHook = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.04), mats.goldTrim);
        branchHook.position.set(bx, th + 0.06, 0);
        treeGroup.add(branchHook);

        // Hanging sacred jade Gogok pendant (Khúc ngọc 곡옥)
        const gogok = new THREE.Mesh(
          new THREE.TorusGeometry(0.08, 0.035, 8, 12, Math.PI * 1.3),
          mats.jadeGlow
        );
        gogok.position.set(bx, th - 0.12, 0.04);
        gogok.rotateZ(bx > 0 ? 0.4 : -0.4);
        gogok.castShadow = true;
        treeGroup.add(gogok);

        // Gold connector loop
        const loop = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), mats.goldTrim);
        loop.position.set(bx, th - 0.04, 0.02);
        treeGroup.add(loop);
      });
    });

    // Apex jewel on top of each tree upright
    const treeApex = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 5), mats.goldTrim);
    treeApex.position.y = 1.55;
    treeGroup.add(treeApex);

    crownMesh.add(treeGroup);
  });

  // (C) Two Antler-Shaped Spires (Hai Nhánh Gạc Hươu - Saseung-yangsik)
  const antlerAngles = [Math.PI * 0.75, -Math.PI * 0.75];
  antlerAngles.forEach(aAngle => {
    const antlerGroup = new THREE.Group();
    antlerGroup.position.set(
      Math.cos(aAngle) * headbandRadius,
      0.14,
      Math.sin(aAngle) * headbandRadius
    );
    antlerGroup.rotation.y = -aAngle + Math.PI / 2;

    // Curved antler main spine
    const antlerSpine = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.35, 0.04), mats.goldTrim);
    antlerSpine.position.y = 0.675;
    antlerSpine.rotation.z = aAngle > 0 ? -0.15 : 0.15;
    antlerSpine.castShadow = true;
    antlerGroup.add(antlerSpine);

    // Two antler tines
    [0.55, 0.95].forEach(ah => {
      const tine = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.06, 0.03), mats.goldTrim);
      tine.position.set(aAngle > 0 ? -0.18 : 0.18, ah, 0);
      tine.rotation.z = aAngle > 0 ? 0.35 : -0.35;
      antlerGroup.add(tine);

      // Hanging jade comma ornament
      const gogok = new THREE.Mesh(
        new THREE.TorusGeometry(0.07, 0.03, 8, 12, Math.PI * 1.3),
        mats.jadeGlow
      );
      gogok.position.set(aAngle > 0 ? -0.35 : 0.35, ah - 0.1, 0.03);
      antlerGroup.add(gogok);
    });

    crownMesh.add(antlerGroup);
  });

  // (D) Vietnamese Imperial & Dong Son Centerpiece (Mặt Trời 14 Tia Sáng & Chim Lạc Bay Lượn)
  const centerGroup = new THREE.Group();
  centerGroup.position.set(0, 0.52, headbandRadius + 0.12);

  // Dong Son Solar Core Disc
  const solarDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.05, 14), mats.goldTrim);
  solarDisc.rotateX(Math.PI / 2);
  solarDisc.castShadow = true;
  centerGroup.add(solarDisc);

  // Inner Ruby / Carmine Star
  const solarRuby = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), mats.redLacquer);
  solarRuby.position.z = 0.03;
  centerGroup.add(solarRuby);

  // 14 Radiating Solar Rays
  for (let r = 0; r < 14; r++) {
    const rayAngle = (r * Math.PI * 2) / 14;
    const ray = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.22, 4), mats.goldTrim);
    ray.position.set(Math.cos(rayAngle) * 0.32, Math.sin(rayAngle) * 0.32, 0);
    ray.rotation.z = rayAngle - Math.PI / 2;
    centerGroup.add(ray);
  }

  // Soaring Chim Lạc (Wings extending gracefully left & right)
  [-1, 1].forEach(side => {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.03), mats.bronzeRelic);
    wing.position.set(side * 0.42, 0.12, 0.02);
    wing.rotation.z = side * -0.32;
    centerGroup.add(wing);

    // Feathers tip
    const feather = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.25, 4), mats.goldTrim);
    feather.position.set(side * 0.68, 0.24, 0.02);
    feather.rotation.z = side * -0.7;
    centerGroup.add(feather);
  });

  crownMesh.add(centerGroup);

  // (E) Four Arching Celestial Diadems meeting at Apex (Bốn Dải Vòm Thái Hòa)
  for (let a = 0; a < 2; a++) {
    const archAngle = a * (Math.PI / 2);
    const arch = new THREE.Mesh(
      new THREE.TorusGeometry(headbandRadius * 0.95, 0.035, 8, 24, Math.PI),
      mats.goldTrim
    );
    arch.position.y = 0.14;
    arch.rotation.y = archAngle;
    crownMesh.add(arch);
  }

  // (F) Radiant Crown Apex Jewel: Pearl of Dragon & Turtle (Viên Ngọc Rồng Thần Kim Quy)
  const apexGroup = new THREE.Group();
  apexGroup.position.y = 1.15;

  // Gold Lotus Cup
  const goldCup = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.12, 0.16, 8), mats.goldTrim);
  apexGroup.add(goldCup);

  // Sacred Glowing Orb
  const apexPearl = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), mats.jadeGlow);
  apexPearl.position.y = 0.18;
  apexPearl.castShadow = true;
  apexGroup.add(apexPearl);

  // Outer gold orbital halo ring
  const haloRing = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.02, 8, 24), mats.goldTrim);
  haloRing.position.y = 0.18;
  haloRing.rotateX(0.4);
  apexGroup.add(haloRing);

  crownMesh.add(apexGroup);

  group.add(crownMesh);

  // 3. FLOATING AURA SPARKLES & CELESTIAL PARTICLES (Hào Quang Tinh Hoa)
  const auraSparkles = new THREE.Group();
  const particleCount = 28;
  for (let p = 0; p < particleCount; p++) {
    const pAngle = (p * Math.PI * 2) / particleCount;
    const pDist = 1.3 + (p % 4) * 0.35;
    const pY = 1.2 + Math.sin(p * 2.3) * 0.75;

    const particleMat = p % 2 === 0 ? mats.goldTrim : mats.jadeGlow;
    const particle = new THREE.Mesh(new THREE.SphereGeometry(0.04 + (p % 3) * 0.015, 6, 6), particleMat);
    particle.position.set(Math.cos(pAngle) * pDist, pY, Math.sin(pAngle) * pDist);
    auraSparkles.add(particle);
  }
  crownMesh.add(auraSparkles);

  // 4. INTERACTIVE BRIGHT CYAN GROUND GLOW RING (Bao quanh chân đài sen)
  const glowRing = new THREE.Group();
  glowRing.position.y = 0.05;

  const outerRingGeo = new THREE.RingGeometry(3.15, 3.42, 48);
  const outerRingMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.92
  });
  const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
  outerRing.rotateX(Math.PI / 2);
  glowRing.add(outerRing);

  const innerRingGeo = new THREE.RingGeometry(2.95, 3.08, 48);
  const innerRingMat = new THREE.MeshBasicMaterial({
    color: 0xe0f2fe,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.96
  });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  innerRing.rotateX(Math.PI / 2);
  glowRing.add(innerRing);

  group.add(glowRing);

  // 5. OVERHEAD ANIMATED INTERACTIVE INVERTED TRIANGLE (Tam giác ngược chúc trên đầu vương miện)
  const invertedTriangle = new THREE.Group();
  invertedTriangle.position.set(0, 3.65, 0);

  const halfW = 0.32;
  const topY = 0.30;
  const botY = -0.30;
  const triShape = new THREE.Shape();
  triShape.moveTo(-halfW, topY);
  triShape.lineTo(halfW, topY);
  triShape.lineTo(0, botY);
  triShape.closePath();

  const triGeo = new THREE.ExtrudeGeometry(triShape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03
  });
  triGeo.center();

  const triMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0x0891b2,
    emissiveIntensity: 0.95
  });
  const triMesh = new THREE.Mesh(triGeo, triMat);
  invertedTriangle.add(triMesh);

  // Top jewel
  const topGem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.1),
    new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.98 })
  );
  topGem.position.y = 0.42;
  invertedTriangle.add(topGem);

  const crownLight = new THREE.PointLight(0x00f0ff, 1.8, 6.0);
  invertedTriangle.add(crownLight);

  group.add(invertedTriangle);

  // Recursively tag all child meshes for click raycasting
  group.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.userData = {
        isCrown: true
      };
    }
  });

  return { group, crownMesh, auraSparkles, glowRing, invertedTriangle };
}

/**
 * Coastal Boat Resting Shelter & Mooring Wharf (Nhà Bè & Bến Nghỉ Của Tàu Thuyền)
 * Features heavy timber stilts in water, wooden boardwalks, covered slipway pavilion
 * with Giwa tiled roof, mooring bollards, rope coils, hanging lanterns, and berthed boats.
 */
export function createBoatRestingWharf(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 1. Heavy Timber Stilts in water (Cọc gỗ chống nước)
  const stiltPositions = [
    { x: -2.8, z: -1.6 },
    { x: 0, z: -1.6 },
    { x: 2.8, z: -1.6 },
    { x: -2.8, z: 1.6 },
    { x: 0, z: 1.6 },
    { x: 2.8, z: 1.6 },
    { x: 4.8, z: 0 },
    { x: 4.8, z: 1.6 }
  ];

  stiltPositions.forEach(sp => {
    const stilt = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 2.2, 8), mats.agedWood);
    stilt.position.set(sp.x, 0.2, sp.z);
    stilt.castShadow = true;
    group.add(stilt);

    // Cross-beam bracing near water surface
    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.8), mats.agedWood);
    brace.position.set(sp.x, 0.4, sp.z);
    group.add(brace);
  });

  // 2. Main Pier Boardwalk Planking (Sàn gỗ bến tàu)
  const deck = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.22, 3.6), mats.timberWood);
  deck.position.set(0, 1.2, 0);
  deck.castShadow = true;
  deck.receiveShadow = true;
  group.add(deck);

  // Pier side timber borders
  [-1.75, 1.75].forEach(bz => {
    const border = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.28, 0.18), mats.agedWood);
    border.position.set(0, 1.25, bz);
    group.add(border);
  });

  // 3. Covered Boat Resting Slipway Pavilion (Nhà Mái Che Bến Thuyền)
  // 6 Upright roof pillars
  const pillarX = [-2.6, 0, 2.6];
  pillarX.forEach(px => {
    [-1.5, 1.5].forEach(pz => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 2.4, 8), mats.redLacquer);
      col.position.set(px, 2.3, pz);
      col.castShadow = true;
      group.add(col);
    });
  });

  // Roof longitudinal and transverse beams
  const longBeam1 = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.16, 0.18), mats.agedWood);
  longBeam1.position.set(0, 3.45, -1.5);
  group.add(longBeam1);

  const longBeam2 = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.16, 0.18), mats.agedWood);
  longBeam2.position.set(0, 3.45, 1.5);
  group.add(longBeam2);

  // Sloped Traditional Tiled Roof Awning (Mái ngói Giwa che mưa nắng)
  const roof = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.22, 4.4), mats.giwaRoof);
  roof.position.set(0, 3.65, 0);
  roof.castShadow = true;
  group.add(roof);

  const roofRidge = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.18, 0.25), mats.stonePier);
  roofRidge.position.set(0, 3.8, 0);
  group.add(roofRidge);

  // 4. Hanging Silk Fisherman's Lanterns under rafters
  [-2.2, 0, 2.2].forEach(lx => {
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.35, 8), mats.lanternSilkYellow);
    lantern.position.set(lx, 3.1, -1.4);
    group.add(lantern);

    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3, 4), mats.agedWood);
    string.position.set(lx, 3.35, -1.4);
    group.add(string);
  });

  // 5. Mooring Bollards & Cleats along the dock (Cọc neo buộc thuyền)
  [-2.8, -1.0, 1.0, 2.8].forEach(bx => {
    const bollard = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.38, 8), mats.agedWood);
    bollard.position.set(bx, 1.45, 1.65);
    group.add(bollard);

    // Coiled hemp rope ring
    const ropeRing = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 6, 12), mats.timberWood);
    ropeRing.rotateX(Math.PI / 2);
    ropeRing.position.set(bx, 1.34, 1.65);
    group.add(ropeRing);
  });

  // 6. Cargo crates & resting fishing baskets on the pier
  const crate1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.6), mats.agedWood);
  crate1.position.set(-2.2, 1.55, -0.8);
  group.add(crate1);

  const crate2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.5), mats.timberWood);
  crate2.position.set(-2.1, 2.0, -0.8);
  group.add(crate2);

  // 7. Attached Resting Sampan Berthed under the shelter (Thuyền đang neo đậu nghỉ)
  const berthedBoat = createSampanBoat();
  berthedBoat.scale.set(0.9, 0.9, 0.9);
  berthedBoat.position.set(0, 0.18, 2.4);
  berthedBoat.rotation.y = 0.05;
  group.add(berthedBoat);

  // Mooring rope from boat bow to bollard
  const moorRope = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.1, 6), mats.timberWood);
  moorRope.position.set(-0.6, 0.8, 2.0);
  moorRope.rotation.z = 0.8;
  moorRope.rotation.x = -0.4;
  group.add(moorRope);

  // 8. Connecting Extension Gangway Pier (Cầu tàu nối từ bờ đá ra)
  const gangway = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.18, 1.8), mats.timberWood);
  gangway.position.set(-4.8, 1.2, 0);
  group.add(gangway);

  return group;
}

/**
 * Traditional Vietnamese & East Asian Sailing Junk (Thuyền Buồm Tam Bản Cánh Dơi)
 * Features wooden curved hull, tall mast, bat-wing ribbed sail, stern rudder, and lanterns.
 */
export function createTraditionalSailingJunk(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 1. Main Wooden Hull
  const hullBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.65, 5.4), mats.timberWood);
  hullBase.position.y = 0.35;
  hullBase.castShadow = true;
  group.add(hullBase);

  // Raised Upswept Bow (Mũi thuyền vút cong)
  const bow = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.6, 4), mats.agedWood);
  bow.rotateX(Math.PI / 2);
  bow.position.set(0, 0.55, 3.2);
  bow.scale.set(1.1, 0.55, 0.75);
  bow.castShadow = true;
  group.add(bow);

  // Raised Stern Helm Deck (Đuôi lái nâng cao)
  const stern = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.85, 1.2), mats.agedWood);
  stern.position.set(0, 0.75, -2.2);
  stern.castShadow = true;
  group.add(stern);

  // Rudder / Steering Oar at stern
  const rudder = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.4, 0.45), mats.agedWood);
  rudder.position.set(0, 0.2, -3.0);
  rudder.rotation.x = -0.25;
  group.add(rudder);

  // 2. Midship Cabin Awning (Mui thuyền vòm nan tre)
  const cabinGeo = new THREE.CylinderGeometry(0.82, 0.82, 2.0, 10, 1, false, 0, Math.PI);
  cabinGeo.rotateZ(Math.PI / 2);
  const cabin = new THREE.Mesh(cabinGeo, mats.agedWood);
  cabin.position.set(0, 0.85, -0.5);
  group.add(cabin);

  // 3. Tall Mast (Cột buồm gỗ)
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 5.2, 8), mats.agedWood);
  mast.position.set(0, 2.9, 0.8);
  mast.castShadow = true;
  group.add(mast);

  // 4. Bat-wing Ribbed Sail (Cánh buồm nan dơi truyền thống)
  const sailGroup = new THREE.Group();
  sailGroup.position.set(0, 3.2, 0.8);
  sailGroup.rotation.y = 0.28; // Angled to breeze

  // Sail cloth
  const sailCloth = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.2, 2.2), mats.ochreWall);
  sailCloth.position.set(0, 0, -1.0);
  sailCloth.castShadow = true;
  sailGroup.add(sailCloth);

  // 4 Horizontal Bamboo Battens (Nan buồm)
  [-1.2, -0.4, 0.4, 1.2].forEach(by => {
    const batten = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.3, 6), mats.agedWood);
    batten.rotateX(Math.PI / 2);
    batten.position.set(0, by, -1.0);
    sailGroup.add(batten);
  });

  group.add(sailGroup);

  // 5. Bow Lantern & Mooring Gear
  const bowLantern = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), mats.lanternSilkRed);
  bowLantern.position.set(0, 0.8, 3.4);
  group.add(bowLantern);

  return group;
}

/**
 * Traditional Coastal Trader & Fishing Vessel (Thuyền Buôn Duyên Hải)
 * Flat-bottomed coastal vessel with deck cargo, resting sweeps, and hanging lantern.
 */
export function createCoastalTradingVessel(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Hull
  const hull = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 4.4), mats.timberWood);
  hull.position.y = 0.28;
  hull.castShadow = true;
  group.add(hull);

  // Pointed Bow Nose
  const bow = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.2, 4), mats.agedWood);
  bow.rotateX(Math.PI / 2);
  bow.position.set(0, 0.45, 2.6);
  bow.scale.set(1.0, 0.45, 0.65);
  group.add(bow);

  // Midship Cargo Crates & Earthenware Jars (Thùng hàng & chum vại)
  const cargo1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.5, 0.65), mats.agedWood);
  cargo1.position.set(-0.35, 0.65, 0.2);
  group.add(cargo1);

  const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.55, 8), mats.basaltRock);
  jar.position.set(0.4, 0.65, -0.5);
  group.add(jar);

  // Resting Oars on Gunwales (Mái chèo nghỉ gác hai bên mạn)
  [-0.95, 0.95].forEach((ox, idx) => {
    const oar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.4, 6), mats.agedWood);
    oar.position.set(ox, 0.55, -0.6);
    oar.rotation.x = 0.35;
    oar.rotation.z = idx === 0 ? -0.25 : 0.25;
    group.add(oar);
  });

  // Stern Mast Post with Lantern
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.6, 6), mats.agedWood);
  post.position.set(0, 1.1, -1.8);
  group.add(post);

  const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), mats.lanternSilkYellow);
  lantern.position.set(0, 1.8, -1.8);
  group.add(lantern);

  return group;
}

/**
 * Dynamic High-Contrast Billboard Nameplate Sprite
 * Generates a crisp 2D canvas texture displaying the NPC's title/occupation and name.
 */
function createNameplateSprite(title: string, name: string, colorHex: string, type: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 136;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Background pill with dark translucent slate and luminous border
    ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
    ctx.strokeStyle = colorHex || '#F59E0B';
    ctx.lineWidth = 5;

    const r = 26;
    ctx.beginPath();
    ctx.roundRect(8, 8, 496, 120, r);
    ctx.fill();
    ctx.stroke();

    // Subtle inner glow line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(14, 14, 484, 108, r - 6);
    ctx.stroke();

    // Type icon prefix
    const prefix = type === 'captain' ? '⚓ ' : type === 'quest' ? '★ ' : '✦ ';

    // Top Row: Title / Occupation
    ctx.fillStyle = colorHex || '#F59E0B';
    ctx.font = 'bold 24px "Be Vietnam Pro", system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${prefix}${title.toUpperCase()}`, 256, 46);

    // Bottom Row: Character Name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 34px "Be Vietnam Pro", system-ui, -apple-system, sans-serif';
    ctx.fillText(name, 256, 90);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(mat);
  sprite.renderOrder = 999;
  sprite.scale.set(1.65, 0.44, 1.0);
  sprite.position.set(0, 2.45, 0);
  return sprite;
}

/**
 * Procedural Interactive Cultural NPC Character Mesh
 * Generates distinct, specialized traditional Vietnamese & Korean characters
 * with authentic attire, headwear, hairstyles, props, and elevated glowing plinths.
 */
export function createNPCMesh(npc: NPCData): {
  group: THREE.Group;
  marker: THREE.Object3D;
  glowRing: THREE.Group;
  invertedTriangle: THREE.Group;
} {
  const mats = getMaterials();
  const group = new THREE.Group();
  group.name = `NPC_${npc.id}`;
  group.userData = {
    isNPC: true,
    npcId: npc.id,
    npcName: npc.name,
    npcTitle: npc.title,
    npcType: npc.type,
    regionId: npc.regionId
  };

  const npcColorHex = parseInt((npc.color || '#F59E0B').replace('#', '0x'), 16);

  // 1. ELEVATED CARVED STONE PEDESTAL PLINTH (Makes character prominent & eliminates terrain clipping)
  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.88, 0.16, 20),
    mats.stonePier
  );
  plinth.position.y = 0.08;
  plinth.receiveShadow = true;
  group.add(plinth);

  const plinthCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.76, 0.06, 20),
    mats.cobblestonePath
  );
  plinthCap.position.y = 0.17;
  group.add(plinthCap);

  // Interactive High-Contrast Bright Cyan Ground Circle Ring (Vòng tròn sáng bao quanh nhân vật)
  const glowRing = new THREE.Group();
  glowRing.name = 'glowRing';

  // Outer primary bright cyan ring on the ground
  const ringGeoOuter = new THREE.RingGeometry(0.98, 1.25, 48);
  ringGeoOuter.rotateX(-Math.PI / 2);
  const ringMatOuter = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const ringMeshOuter = new THREE.Mesh(ringGeoOuter, ringMatOuter);
  ringMeshOuter.position.y = 0.035;
  glowRing.add(ringMeshOuter);

  // Concentric bright inner cyan-white ring
  const ringGeoInner = new THREE.RingGeometry(0.66, 0.76, 36);
  ringGeoInner.rotateX(-Math.PI / 2);
  const ringMatInner = new THREE.MeshBasicMaterial({
    color: 0xe0f2fe,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const ringMeshInner = new THREE.Mesh(ringGeoInner, ringMatInner);
  ringMeshInner.position.y = 0.205; // on top of plinth cap
  glowRing.add(ringMeshInner);

  group.add(glowRing);

  // Character Figure Sub-Group (scaled up to 1.35x for heroic, unmistakable readability)
  const charGroup = new THREE.Group();
  charGroup.position.y = 0.2; // resting cleanly on plinth
  charGroup.scale.set(1.35, 1.35, 1.35);
  group.add(charGroup);

  // 2. TAILORED ATTIRE & SILHOUETTE PER NPC
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.6 });
  const darkHairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
  const elderHairMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 });

  // Base head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), skinMat);
  head.position.y = 1.34;
  head.castShadow = true;
  charGroup.add(head);

  // Determine specialized costume parts by npc.id
  switch (npc.id) {
    // ----------------------------------------------------
    // 1. HIGHLANDS - Elder Điền (Peasant Village Elder)
    // ----------------------------------------------------
    case 'npc_highlands_lore': {
      // Rustic hemp brown peasant robe
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.38, 0.88, 12), mats.timberWood);
      robe.position.y = 0.46;
      robe.castShadow = true;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.25, 0.44, 10), mats.timberWood);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Dark bamboo sash
      const sash = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.08, 10), mats.agedWood);
      sash.position.y = 0.74;
      charGroup.add(sash);

      // Long elder white beard
      const beard = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.28, 8), elderHairMat);
      beard.position.set(0, 1.16, 0.16);
      beard.rotation.x = -0.15;
      charGroup.add(beard);

      // Weathered bamboo conical Nón Lá with woven rings
      const nonLa = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.34, 16), mats.timberWood);
      nonLa.position.set(0, 1.54, 0);
      charGroup.add(nonLa);

      const nonLaRim = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.02, 6, 16), mats.agedWood);
      nonLaRim.rotateX(Math.PI / 2);
      nonLaRim.position.set(0, 1.38, 0);
      charGroup.add(nonLaRim);

      // Wooden farmer walking staff with dried straw rice sheaf bundle
      const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 1.6, 6), mats.agedWood);
      staff.position.set(0.35, 0.8, 0.22);
      charGroup.add(staff);

      const riceSheaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.38, 6), mats.lanternSilkYellow);
      riceSheaf.position.set(0.35, 1.52, 0.22);
      charGroup.add(riceSheaf);
      break;
    }

    // ----------------------------------------------------
    // 1. HIGHLANDS - Min-jun (Young Korean Harvest Envoy)
    // ----------------------------------------------------
    case 'npc_highlands_quest': {
      // White Jeogori with sunny golden yellow vest & blue work pants
      const pants = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.44, 0.86, 12), mats.dancheongEaves);
      pants.position.y = 0.45;
      charGroup.add(pants);

      const vest = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.27, 0.46, 10), mats.lanternSilkYellow);
      vest.position.y = 0.96;
      charGroup.add(vest);

      // Korean straw Satgat conical hat with steep dome
      const satgat = new THREE.Mesh(new THREE.ConeGeometry(0.64, 0.26, 14), mats.timberWood);
      satgat.position.set(0, 1.52, 0);
      charGroup.add(satgat);

      // Wicker harvest basket on hip packed with golden ripe grain
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.15, 0.3, 8), mats.agedWood);
      basket.position.set(-0.35, 0.72, 0.05);
      charGroup.add(basket);

      const goldenRice = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 8), mats.goldTrim);
      goldenRice.position.set(-0.35, 0.88, 0.05);
      charGroup.add(goldenRice);

      // Korean harvest boots
      [-0.14, 0.14].forEach(bx => {
        const boot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 0.22), mats.agedWood);
        boot.position.set(bx, 0.075, 0.04);
        charGroup.add(boot);
      });
      break;
    }

    // ----------------------------------------------------
    // 1. HIGHLANDS - Sơn Nữ Mây Chiềng (Traditional Northwest Brocade Attire / Thổ Cẩm Dân Tộc Tây Bắc)
    // ----------------------------------------------------
    case 'npc_highlands_ethnic_maiden': {
      // Long indigo brocade skirt with geometric embroidered hem
      const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.46, 0.88, 12), mats.basaltRock);
      skirt.position.y = 0.46;
      skirt.castShadow = true;
      charGroup.add(skirt);

      const brocadeHem = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.46, 0.12, 12), mats.lanternSilkRed);
      brocadeHem.position.y = 0.12;
      charGroup.add(brocadeHem);

      // Fitted emerald green Áo Cóm blouse (Áo Cóm bó sát của đồng bào Thái / Mường)
      const aoCom = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.25, 0.46, 10), mats.bambooGreen);
      aoCom.position.y = 0.96;
      charGroup.add(aoCom);

      // Jade green silk sash (Thắt lưng lụa xanh ngọc)
      const greenSash = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 10), mats.jadeGlow);
      greenSash.position.y = 0.74;
      charGroup.add(greenSash);

      // Traditional silver butterfly buttons (Hàng cúc bướm bạc sáng lấp lánh)
      for (let b = 0; b < 4; b++) {
        const butterflyBtn = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.03, 0.02), mats.whiteWall);
        butterflyBtn.position.set(0, 0.84 + b * 0.08, 0.24);
        charGroup.add(butterflyBtn);
      }

      // Authentic Khăn Piêu headdress with colorful geometric embroidery
      const pieuCap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.12, 12), mats.basaltRock);
      pieuCap.position.set(0, 1.48, 0);
      charGroup.add(pieuCap);

      // Embroidered Piêu ends draped over shoulders
      [-0.14, 0.14].forEach(px => {
        const pieuDrape = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.38, 0.02), mats.lanternSilkRed);
        pieuDrape.position.set(px, 1.3, -0.05);
        charGroup.add(pieuDrape);
      });

      // Bronze harvest sickle (Liềm gặt lúa) and fragrant ripe rice sheaf
      const sickleHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.25, 6), mats.agedWood);
      sickleHandle.position.set(0.3, 0.85, 0.18);
      charGroup.add(sickleHandle);

      const sickleBlade = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.018, 4, 10, Math.PI), mats.stonePier);
      sickleBlade.position.set(0.3, 0.98, 0.18);
      sickleBlade.rotateZ(-0.5);
      charGroup.add(sickleBlade);

      const riceBundle = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.42, 6), mats.lanternSilkYellow);
      riceBundle.position.set(-0.28, 0.92, 0.22);
      riceBundle.rotation.z = 0.3;
      charGroup.add(riceBundle);
      break;
    }

    // ----------------------------------------------------
    // 2. BAMBOO - Master Văn (High Confucian Scholar)
    // ----------------------------------------------------
    case 'npc_bamboo_lore': {
      // Flowing dark jade & ink cyan scholar robe with wide sleeves
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.46, 0.92, 12), mats.jadeGlow);
      robe.position.y = 0.48;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.27, 0.48, 10), mats.jadeGlow);
      torso.position.y = 0.98;
      charGroup.add(torso);

      // Ivory white collar & black sash
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.1, 10), mats.whiteWall);
      collar.position.y = 1.2;
      charGroup.add(collar);

      // Korean Gat Hat with wide translucent brim & tall crown
      const gatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.02, 20), darkHairMat);
      gatBrim.position.set(0, 1.48, 0);
      charGroup.add(gatBrim);

      const gatCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 0.34, 12), darkHairMat);
      gatCrown.position.set(0, 1.65, 0);
      charGroup.add(gatCrown);

      // Dangling jade Gat-kkeun bead strings
      [-0.14, 0.14].forEach(bx => {
        const bead = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.35, 4), mats.jadeGlow);
        bead.position.set(bx, 1.35, 0.08);
        charGroup.add(bead);
      });

      // Open unrolled bamboo scroll manuscript in hands
      const scrollL = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.38, 6), mats.agedWood);
      scrollL.position.set(0.18, 0.9, 0.26);
      scrollL.rotation.z = Math.PI / 4;
      charGroup.add(scrollL);

      const scrollSheet = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.01), mats.whiteWall);
      scrollSheet.position.set(0.08, 0.9, 0.25);
      charGroup.add(scrollSheet);
      break;
    }

    // ----------------------------------------------------
    // 2. BAMBOO - Nho Sinh Do-hyun (Young Scholar Disciple)
    // ----------------------------------------------------
    case 'npc_bamboo_quest': {
      // Light celadon mint Hanbok with indigo trim
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.42, 0.88, 12), mats.bambooGreen);
      robe.position.y = 0.46;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.45, 10), mats.whiteWall);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Bokgeon (Korean Confucian student cloth cap with back drape)
      const bokgeon = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.28, 10), darkHairMat);
      bokgeon.position.set(0, 1.54, -0.02);
      charGroup.add(bokgeon);

      const drape = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.38, 0.03), darkHairMat);
      drape.position.set(0, 1.34, -0.18);
      charGroup.add(drape);

      // Giant calligraphy brush with horsehair tip
      const brushHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 1.15, 6), mats.agedWood);
      brushHandle.position.set(0.32, 0.85, 0.2);
      brushHandle.rotation.x = 0.2;
      charGroup.add(brushHandle);

      const brushTip = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.24, 8), darkHairMat);
      brushTip.position.set(0.32, 1.48, 0.28);
      charGroup.add(brushTip);
      break;
    }

    // ----------------------------------------------------
    // 2. BAMBOO - Viện Sĩ Nguyễn Khoa (Imperial Court Scholar in Áo Tấc & Mũ Cánh Chuồn)
    // ----------------------------------------------------
    case 'npc_bamboo_ao_tac_scholar': {
      // Dignified deep teal-cyan Áo Tấc with long flowing ceremonial sleeves
      const aoTacRobe = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.52, 0.94, 12), mats.dancheongEaves);
      aoTacRobe.position.y = 0.48;
      aoTacRobe.castShadow = true;
      charGroup.add(aoTacRobe);

      const torsoAT = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.48, 10), mats.dancheongEaves);
      torsoAT.position.y = 0.98;
      charGroup.add(torsoAT);

      // Wide hanging ceremonial sleeves
      [-0.35, 0.35].forEach(sx => {
        const wideSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.52, 8), mats.dancheongEaves);
        wideSleeve.position.set(sx, 0.85, 0);
        charGroup.add(wideSleeve);
      });

      // 5 Gold Buttons of Virtue (Ngũ thường khuy vàng)
      for (let b = 0; b < 5; b++) {
        const btn = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 6), mats.goldTrim);
        btn.position.set(0.06, 0.82 + b * 0.08, 0.26);
        charGroup.add(btn);
      }

      // Traditional Scholar Cap with Wing Extensions (Mũ Cánh Chuồn quan triều đình)
      const scholarCap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.26, 12), darkHairMat);
      scholarCap.position.set(0, 1.54, 0);
      charGroup.add(scholarCap);

      [-0.38, 0.38].forEach(wx => {
        const wing = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.035, 0.06), darkHairMat);
        wing.position.set(wx, 1.55, -0.06);
        charGroup.add(wing);
      });

      // Red lacquer manuscript poetry tube (Ống quyển sơn son)
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.46, 8), mats.redLacquer);
      tube.position.set(0.28, 0.92, 0.24);
      tube.rotation.z = -0.4;
      charGroup.add(tube);
      break;
    }

    // ----------------------------------------------------
    // 3. MOUNTAINS - Ẩn Sĩ Bạch Vân (Taoist Mountain Hermit)
    // ----------------------------------------------------
    case 'npc_mountains_lore': {
      // Ethereal cloud-white Taoist flowing robe with indigo lining
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.48, 0.94, 12), mats.whiteWall);
      robe.position.y = 0.48;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.27, 0.46, 10), mats.whiteWall);
      torso.position.y = 0.98;
      charGroup.add(torso);

      // Flowing Taoist sage beard
      const beard = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.36, 8), elderHairMat);
      beard.position.set(0, 1.15, 0.16);
      beard.rotation.x = -0.1;
      charGroup.add(beard);

      // Topknot with wooden Taoist hairpin
      const topknot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), elderHairMat);
      topknot.position.set(0, 1.55, -0.02);
      charGroup.add(topknot);

      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 4), mats.agedWood);
      pin.rotateZ(Math.PI / 2);
      pin.position.set(0, 1.55, -0.02);
      charGroup.add(pin);

      // Gourd flask canteen on hip
      const gourd = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mats.lanternSilkYellow);
      gourd.position.set(-0.32, 0.65, 0.08);
      charGroup.add(gourd);

      // Dragon Pilgrim Staff with glowing crystal orb on top
      const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 1.75, 6), mats.agedWood);
      staff.position.set(0.35, 0.88, 0.22);
      charGroup.add(staff);

      const staffOrb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), mats.jadeGlow);
      staffOrb.position.set(0.35, 1.78, 0.22);
      charGroup.add(staffOrb);
      break;
    }

    // ----------------------------------------------------
    // 3. MOUNTAINS - Võ Sư Seok-woo (Tiger Martial Guardian)
    // ----------------------------------------------------
    case 'npc_mountains_quest': {
      // Crimson & black warrior Gi/Dopo with tiger chest harness
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.42, 0.86, 12), mats.basaltRock);
      robe.position.y = 0.45;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.28, 0.46, 10), mats.redLacquer);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Tiger warrior headband (Băng đô võ sĩ)
      const headband = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 6, 16), mats.redLacquer);
      headband.rotateX(Math.PI / 2);
      headband.position.set(0, 1.38, 0);
      charGroup.add(headband);

      // Tiger-striped shoulder guard (Pauldron)
      const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.24), mats.goldTrim);
      pauldron.position.set(-0.32, 1.15, 0);
      charGroup.add(pauldron);

      // Martial Spear / Halberd with red silk tassel
      const spearShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.8, 6), mats.agedWood);
      spearShaft.position.set(0.35, 0.9, 0.18);
      charGroup.add(spearShaft);

      const spearBlade = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.36, 4), mats.goldTrim);
      spearBlade.position.set(0.35, 1.9, 0.18);
      charGroup.add(spearBlade);

      const tassel = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), mats.lanternSilkRed);
      tassel.position.set(0.35, 1.72, 0.18);
      charGroup.add(tassel);
      break;
    }

    // ----------------------------------------------------
    // 3. MOUNTAINS - Tiên Cô Giáng Hương (Mountain Fairy)
    // ----------------------------------------------------
    case 'npc_mountains_fairy': {
      // Ethereal lavender & sky-blue flowing celestial silk gown
      const fairyRobeMat = new THREE.MeshStandardMaterial({
        color: 0xa5b4fc,
        roughness: 0.35,
        metalness: 0.1
      });
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.46, 0.94, 12), fairyRobeMat);
      robe.position.y = 0.48;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.46, 10), fairyRobeMat);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Gold waistband sash with floating silk ribbons
      const sash = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 6, 16), mats.goldTrim);
      sash.rotateX(Math.PI / 2);
      sash.position.set(0, 0.88, 0);
      charGroup.add(sash);

      // Celestial hair bun with lotus hairpin
      const bun = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), darkHairMat);
      bun.position.set(0, 1.54, -0.06);
      charGroup.add(bun);

      const lotusPin = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 6), mats.lanternLotusPink);
      lotusPin.rotation.x = Math.PI / 3;
      lotusPin.position.set(0.12, 1.56, 0);
      charGroup.add(lotusPin);

      // Floating celestial silk lute / harp in hands
      const lute = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.08, 0.45, 8), mats.timberWood);
      lute.rotation.z = Math.PI / 4;
      lute.position.set(0.26, 0.95, 0.22);
      charGroup.add(lute);
      break;
    }

    // ----------------------------------------------------
    // 4. FESTIVAL - Cô Đào Hoa (Silk Fan Performer)
    // ----------------------------------------------------
    case 'npc_festival_lore': {
      // Shimmering hot magenta-pink royal Áo Dài with gold sash
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.44, 0.92, 12), mats.lanternLotusPink);
      robe.position.y = 0.48;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.45, 10), mats.lanternLotusPink);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Gold Imperial Sash
      const sash = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.1, 10), mats.goldTrim);
      sash.position.y = 0.74;
      charGroup.add(sash);

      // Northern velvet Khăn Vấn royal headwrap
      const khanVan = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 8, 16), mats.lanternSilkRed);
      khanVan.rotateX(Math.PI / 2.3);
      khanVan.position.set(0, 1.45, 0);
      charGroup.add(khanVan);

      // Dual-spread silk folding fan (Buchaechum / Quạt lụa) held proudly in front
      const fanSpread = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 0.02, 12, 1, false, -Math.PI / 3, (2 * Math.PI) / 3),
        mats.lanternLotusPink
      );
      fanSpread.position.set(0, 0.92, 0.32);
      fanSpread.rotation.x = Math.PI / 6;
      charGroup.add(fanSpread);

      const fanRim = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.015, 4, 12, (2 * Math.PI) / 3),
        mats.goldTrim
      );
      fanRim.position.set(0, 0.92, 0.32);
      fanRim.rotation.x = Math.PI / 6;
      charGroup.add(fanRim);
      break;
    }

    // ----------------------------------------------------
    // 4. FESTIVAL - Đầu Bếp Bà Jin (Street Food Master)
    // ----------------------------------------------------
    case 'npc_festival_quest': {
      // White chef jacket with striped linen apron
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.44, 0.86, 12), mats.whiteWall);
      robe.position.y = 0.45;
      charGroup.add(robe);

      const apron = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.52, 0.04), mats.redLacquer);
      apron.position.set(0, 0.68, 0.23);
      charGroup.add(apron);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.45, 10), mats.whiteWall);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Chef bandana / cloth headwrap
      const chefHat = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 12), mats.redLacquer);
      chefHat.position.set(0, 1.48, 0);
      charGroup.add(chefHat);

      // Steaming ceramic noodle bowl with wooden chopsticks
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.09, 0.12, 10), mats.whiteWall);
      bowl.position.set(0.24, 0.92, 0.25);
      charGroup.add(bowl);

      const soup = new THREE.Mesh(new THREE.CircleGeometry(0.12, 10), mats.lanternSilkYellow);
      soup.rotateX(-Math.PI / 2);
      soup.position.set(0.24, 0.98, 0.25);
      charGroup.add(soup);

      const chopstick = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.22, 4), mats.agedWood);
      chopstick.position.set(0.28, 1.05, 0.25);
      chopstick.rotation.z = -0.3;
      charGroup.add(chopstick);
      break;
    }

    // ----------------------------------------------------
    // 4. FESTIVAL - Liền Chị Thắm Duyên (Quan Họ Folk Singer in Áo Tứ Thân & Nón Quai Thao)
    // ----------------------------------------------------
    case 'npc_festival_quanho_singer': {
      // 4-panel flowing silk tunic (Áo Tứ Thân) with scarlet yếm & peach sash
      const outerFlaps = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.48, 0.92, 12), mats.timberWood);
      outerFlaps.position.y = 0.48;
      outerFlaps.castShadow = true;
      charGroup.add(outerFlaps);

      // Soft pink inner lining flap
      const innerSilk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.4, 0.9, 10), mats.lanternLotusPink);
      innerSilk.position.set(0, 0.48, 0.04);
      charGroup.add(innerSilk);

      // Scarlet Camisole (Yếm Cổ Xây màu đỏ thắm)
      const scarletYem = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.32, 8), mats.lanternSilkRed);
      scarletYem.position.set(0, 1.05, 0.22);
      scarletYem.rotation.x = 0.15;
      charGroup.add(scarletYem);

      // Peach Blossom Silk Sash tied gracefully in front (Dải lụa đào thắt lưng)
      const peachSash = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.02), mats.lanternLotusPink);
      peachSash.position.set(0.08, 0.65, 0.24);
      charGroup.add(peachSash);

      // Authentic Large Flat Nón Quai Thao Hat with bamboo rim
      const nonQuaiThao = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.04, 24), mats.timberWood);
      nonQuaiThao.position.set(0, 1.48, 0);
      charGroup.add(nonQuaiThao);

      const thaoCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.08, 16), mats.agedWood);
      thaoCrown.position.set(0, 1.54, 0);
      charGroup.add(thaoCrown);

      // Long pink silk ribbon ties (Quai thao bằng lụa rủ hai bên ngực)
      [-0.24, 0.24].forEach(rx => {
        const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.52, 0.01), mats.lanternLotusPink);
        ribbon.position.set(rx, 1.15, 0.08);
        charGroup.add(ribbon);
      });

      // Betel Lacquer Casket with Phoenix-shaped betel leaves (Cơi trầu têm cánh phượng)
      const betelBox = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.06, 10), mats.redLacquer);
      betelBox.position.set(0, 0.88, 0.28);
      charGroup.add(betelBox);
      break;
    }

    // ----------------------------------------------------
    // 5. CAPITAL - Thượng Thư Lý Đình (Court Minister)
    // ----------------------------------------------------
    case 'npc_capital_lore': {
      // Imperial crimson court robe with gold dragon rank square (Bổ tử)
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.48, 0.92, 12), mats.redLacquer);
      robe.position.y = 0.48;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.48, 10), mats.redLacquer);
      torso.position.y = 0.98;
      charGroup.add(torso);

      // Embroidered gold dragon chest rank badge (Bổ tử)
      const rankBadge = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.02), mats.goldTrim);
      rankBadge.position.set(0, 1.0, 0.26);
      charGroup.add(rankBadge);

      // Official Samo Winged Court Hat (Mũ Cánh Chuồn) with horizontal side wings
      const courtCap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.26, 12), darkHairMat);
      courtCap.position.set(0, 1.54, 0);
      charGroup.add(courtCap);

      // Horizontal side wings (Cánh chuồn)
      [-0.32, 0.32].forEach(wx => {
        const wing = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.06), darkHairMat);
        wing.position.set(wx, 1.52, -0.05);
        charGroup.add(wing);
      });

      // Imperial Jade Tablet (Thẻ Ngà / Hốt ngọc) held reverently in two hands
      const jadeTablet = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.36, 0.02), mats.whiteWall);
      jadeTablet.position.set(0, 1.05, 0.28);
      jadeTablet.rotation.x = -0.25;
      charGroup.add(jadeTablet);
      break;
    }

    // ----------------------------------------------------
    // 5. CAPITAL - Bác Thuận (Master Bronze Smith)
    // ----------------------------------------------------
    case 'npc_capital_quest': {
      // Leather blacksmith apron over indigo tunic
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.42, 0.86, 12), mats.dancheongEaves);
      robe.position.y = 0.45;
      charGroup.add(robe);

      const apron = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.54, 0.04), mats.agedWood);
      apron.position.set(0, 0.68, 0.22);
      charGroup.add(apron);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.28, 0.46, 10), mats.dancheongEaves);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Brass smith goggles pushed up on forehead
      const goggles = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.06), mats.goldTrim);
      goggles.position.set(0, 1.45, 0.16);
      charGroup.add(goggles);

      // Heavy forging mallet / hammer in hand
      const hammerShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.65, 6), mats.timberWood);
      hammerShaft.position.set(0.32, 0.82, 0.2);
      charGroup.add(hammerShaft);

      const hammerHead = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.22), mats.bronzeRelic);
      hammerHead.position.set(0.32, 1.15, 0.2);
      charGroup.add(hammerHead);
      break;
    }

    // ----------------------------------------------------
    // 5. CAPITAL - Quận Chúa Như Ngọc (Imperial Court Lady in Áo Nhật Bình & Khăn Vành)
    // ----------------------------------------------------
    case 'npc_capital_nhatbinh_lady': {
      // Royal crimson silk gown with iconic 5-color striped wide sleeves & Phoenix collar
      const nhatBinhRobe = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.52, 0.94, 12), mats.redLacquer);
      nhatBinhRobe.position.y = 0.48;
      nhatBinhRobe.castShadow = true;
      charGroup.add(nhatBinhRobe);

      const torsoNB = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.27, 0.48, 10), mats.redLacquer);
      torsoNB.position.y = 0.98;
      charGroup.add(torsoNB);

      // Rectangular Phoenix chest collar (Cổ áo Nhật Bình viền thêu phụng hoàng)
      const rectCollar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.03), mats.goldTrim);
      rectCollar.position.set(0, 1.05, 0.25);
      charGroup.add(rectCollar);

      // 5-Color Sleeves (Dải ngũ sắc trên tay áo Nhật Bình)
      [-0.34, 0.34].forEach(sx => {
        const sleeveWide = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.44, 8), mats.redLacquer);
        sleeveWide.position.set(sx, 0.88, 0);
        charGroup.add(sleeveWide);

        [0xfacc15, 0x2563eb, 0xffffff, 0xef4444, 0x0f172a].forEach((col, ci) => {
          const ring = new THREE.Mesh(
            new THREE.CylinderGeometry(0.162, 0.162, 0.02, 8),
            new THREE.MeshStandardMaterial({ color: col, roughness: 0.5 })
          );
          ring.position.set(sx, 0.7 + ci * 0.025, 0);
          charGroup.add(ring);
        });
      });

      // Majestic Golden Turban (Khăn Vành Dây Hoàng Tộc quấn kiêu sa)
      const khanVanh = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.07, 8, 20), mats.goldTrim);
      khanVanh.rotateX(Math.PI / 2.2);
      khanVanh.position.set(0, 1.48, 0);
      charGroup.add(khanVanh);

      // Lotus embroidered court fan
      const fan = new THREE.Mesh(new THREE.CircleGeometry(0.18, 12), mats.whiteWall);
      fan.position.set(0, 0.95, 0.3);
      charGroup.add(fan);

      const pendant = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), mats.jadeGlow);
      pendant.position.set(0.18, 0.72, 0.25);
      charGroup.add(pendant);
      break;
    }

    // ----------------------------------------------------
    // 6. HARBOR - Nàng Liên (Maiden of River Lanterns)
    // ----------------------------------------------------
    case 'npc_harbor_lore': {
      // Flowing aquamarine cyan silk Áo Dài with sheer pink ribbons
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.42, 0.92, 12), mats.dancheongEaves);
      robe.position.y = 0.48;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.45, 10), mats.dancheongEaves);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Hair braid with fresh lotus flower pin
      const hairPin = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), mats.lanternLotusPink);
      hairPin.position.set(0.15, 1.46, 0.12);
      charGroup.add(hairPin);

      // Glowing pink origami paper lotus lantern held gently in front
      const lotusBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.06, 8), mats.lanternLotusPink);
      lotusBase.position.set(0, 0.92, 0.32);
      charGroup.add(lotusBase);

      const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 6), mats.lanternSilkYellow);
      candle.position.set(0, 0.98, 0.32);
      charGroup.add(candle);

      const candleFlame = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b })
      );
      candleFlame.position.set(0, 1.04, 0.32);
      charGroup.add(candleFlame);
      break;
    }

    // ----------------------------------------------------
    // 6. HARBOR - Thương Nhân Ông Phúc (Spice Merchant)
    // ----------------------------------------------------
    case 'npc_harbor_quest': {
      // Rich merchant brocade coat with gold coin buttons
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.46, 0.88, 12), mats.dancheongEaves);
      robe.position.y = 0.46;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.29, 0.46, 10), mats.ochreWall);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Gold coin buttons down the front
      for (let b = 0; b < 3; b++) {
        const button = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), mats.goldTrim);
        button.position.set(0, 0.85 + b * 0.1, 0.27);
        charGroup.add(button);
      }

      // Merchant silk turban
      const turban = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 8, 16), mats.ochreWall);
      turban.rotateX(Math.PI / 2.2);
      turban.position.set(0, 1.46, 0);
      charGroup.add(turban);

      // Wooden abacus on hip & brass spice jar in hand
      const abacus = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.24, 0.04), mats.agedWood);
      abacus.position.set(-0.32, 0.72, 0.1);
      charGroup.add(abacus);

      const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.18, 8), mats.goldTrim);
      jar.position.set(0.32, 0.88, 0.24);
      charGroup.add(jar);
      break;
    }

    // ----------------------------------------------------
    // 6. HARBOR - Thuyền Trưởng Hải Triều (Captain Baek)
    // ----------------------------------------------------
    case 'npc_harbor_captain': {
      // Oceanic naval coat with double-breasted buttons & epaulettes
      const coat = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.46, 0.88, 12), mats.basaltRock);
      coat.position.y = 0.46;
      charGroup.add(coat);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.46, 10), mats.basaltRock);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Gold captain epaulettes on both shoulders
      [-0.32, 0.32].forEach(ex => {
        const epaulette = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.16), mats.goldTrim);
        epaulette.position.set(ex, 1.18, 0);
        charGroup.add(epaulette);
      });

      // Captain naval hat with gold anchor crest
      const capBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.54, 0.08, 16), mats.timberWood);
      capBrim.position.set(0, 1.5, 0);
      charGroup.add(capBrim);

      const anchorCrest = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 6, 12), mats.goldTrim);
      anchorCrest.position.set(0, 1.52, 0.46);
      charGroup.add(anchorCrest);

      // Brass navigation spyglass / telescope
      const telescope = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.02, 0.42, 8), mats.goldTrim);
      telescope.position.set(0.32, 0.95, 0.28);
      telescope.rotation.x = 0.45;
      charGroup.add(telescope);
      break;
    }

    // ----------------------------------------------------
    // 6. HARBOR - Cô Ba Sông Nước (Southern River Maiden in Áo Bà Ba & Khăn Rằn Nam Bộ)
    // ----------------------------------------------------
    case 'npc_harbor_baba_maiden': {
      // Black trousers & soft pastel rose-pink Áo Bà Ba with slit sides
      const baBaPants = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.42, 0.88, 12), mats.basaltRock);
      baBaPants.position.y = 0.45;
      charGroup.add(baBaPants);

      const baBaShirt = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.26, 0.48, 10), mats.lanternLotusPink);
      baBaShirt.position.y = 0.96;
      baBaShirt.castShadow = true;
      charGroup.add(baBaShirt);

      // Two patch pockets
      [-0.1, 0.1].forEach(px => {
        const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.01), mats.lanternLotusPink);
        pocket.position.set(px, 0.78, 0.25);
        charGroup.add(pocket);
      });

      // Iconic black-and-white checkered Khăn Rằn draped around neck
      const khanRanLeft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.46, 0.02), mats.whiteWall);
      khanRanLeft.position.set(-0.12, 1.05, 0.24);
      charGroup.add(khanRanLeft);

      const khanRanRight = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.46, 0.02), mats.basaltRock);
      khanRanRight.position.set(0.12, 1.05, 0.24);
      charGroup.add(khanRanRight);

      const khanRanCollar = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 4, 12), mats.whiteWall);
      khanRanCollar.position.set(0, 1.25, 0.05);
      charGroup.add(khanRanCollar);

      // Conical Nón Lá hat
      const nonLaBaBa = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.32, 16), mats.timberWood);
      nonLaBaBa.position.set(0, 1.54, 0);
      charGroup.add(nonLaBaBa);

      // Basket of lotus blooms & river lantern
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.2, 8), mats.agedWood);
      basket.position.set(0.28, 0.85, 0.22);
      charGroup.add(basket);

      const lotus = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), mats.lanternLotusPink);
      lotus.position.set(0.28, 0.96, 0.22);
      charGroup.add(lotus);
      break;
    }

    // ----------------------------------------------------
    // 7. ARCHIPELAGO - Ngư Phủ Bác Hải (Ha Long Fisherman)
    // ----------------------------------------------------
    case 'npc_archipelago_lore': {
      // Deep sea teal rolled tunic & fishnet shoulder sash
      const tunic = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.4, 0.86, 12), mats.dancheongEaves);
      tunic.position.y = 0.45;
      charGroup.add(tunic);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.45, 10), mats.dancheongEaves);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Fisherman conical bamboo hat with chin strap
      const hat = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.28, 16), mats.timberWood);
      hat.position.set(0, 1.54, 0);
      charGroup.add(hat);

      // Fish basket on hip
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.24, 8), mats.agedWood);
      basket.position.set(-0.32, 0.65, 0.08);
      charGroup.add(basket);

      // Long wooden boat oar (mái chèo thuyền thúng)
      const oarShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.6, 6), mats.timberWood);
      oarShaft.position.set(0.35, 0.85, 0.18);
      charGroup.add(oarShaft);

      const oarPaddle = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.45, 0.02), mats.timberWood);
      oarPaddle.position.set(0.35, 1.55, 0.18);
      charGroup.add(oarPaddle);
      break;
    }

    // ----------------------------------------------------
    // 7. ARCHIPELAGO - Thợ Gốm Kim (Master Celadon Potter)
    // ----------------------------------------------------
    case 'npc_archipelago_quest': {
      // Clay & celadon glaze smeared potter apron
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.42, 0.86, 12), mats.ochreWall);
      robe.position.y = 0.45;
      charGroup.add(robe);

      const apron = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.54, 0.03), mats.whiteWall);
      apron.position.set(0, 0.68, 0.22);
      charGroup.add(apron);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.27, 0.45, 10), mats.ochreWall);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // Artisan headband
      const headband = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 6, 16), mats.whiteWall);
      headband.rotateX(Math.PI / 2);
      headband.position.set(0, 1.42, 0);
      charGroup.add(headband);

      // Pristine glowing Celadon Jade Moon Jar in hands
      const moonJar = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), mats.jadeGlow);
      moonJar.scale.set(1.0, 1.15, 1.0);
      moonJar.position.set(0.28, 0.95, 0.26);
      charGroup.add(moonJar);
      break;
    }

    // ----------------------------------------------------
    // 7. ARCHIPELAGO - Nữ Thợ Lặn Haenyeo Ok-sun (Jeju Island Diver)
    // ----------------------------------------------------
    case 'npc_archipelago_haenyeo_diver': {
      // Dark rubber diving suit & white diving hood
      const suit = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.4, 0.88, 12), mats.basaltRock);
      suit.position.y = 0.45;
      charGroup.add(suit);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.46, 10), mats.basaltRock);
      torso.position.y = 0.96;
      charGroup.add(torso);

      // White cloth diving hood (Mul-sojungi)
      const hood = new THREE.Mesh(new THREE.SphereGeometry(0.21, 10, 10), mats.whiteWall);
      hood.position.set(0, 1.35, -0.02);
      charGroup.add(hood);

      // Brass round diving goggles pushed up on forehead (Nun-kkak-gi)
      const goggleFrame = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 4, 16), mats.goldTrim);
      goggleFrame.position.set(0, 1.48, 0.16);
      charGroup.add(goggleFrame);

      // Spherical buoy float & woven catch net basket (Tewak & Mangsari) with pearl shell
      const tewakBuoy = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), mats.lanternSilkYellow);
      tewakBuoy.position.set(-0.35, 0.72, 0.15);
      charGroup.add(tewakBuoy);

      const netBag = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.08, 0.32, 8), mats.agedWood);
      netBag.position.set(-0.35, 0.48, 0.15);
      charGroup.add(netBag);

      // Sparkling ocean pearl oyster in hand
      const pearlOyster = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), mats.jadeGlow);
      pearlOyster.position.set(0.28, 0.9, 0.22);
      charGroup.add(pearlOyster);
      break;
    }

    // ----------------------------------------------------
    // 8. CROWN SANCTUARY - Thần Hộ Mệnh Giao Thoa
    // ----------------------------------------------------
    case 'npc_crown_guardian':
    default: {
      // Radiant golden celestial robes woven with white silk
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.52, 0.96, 16), mats.goldTrim);
      robe.position.y = 0.5;
      charGroup.add(robe);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.48, 12), mats.whiteWall);
      torso.position.y = 1.0;
      charGroup.add(torso);

      // Celestial diadem crown with jade Gogok drops
      const diadem = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 8, 16), mats.goldTrim);
      diadem.rotateX(Math.PI / 2);
      diadem.position.set(0, 1.48, 0);
      charGroup.add(diadem);

      // Orbiting celestial halo ring behind head
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.025, 8, 24),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.85 })
      );
      halo.position.set(0, 1.45, -0.15);
      charGroup.add(halo);

      // Celestial harmony lotus scepter with radiant glowing sun jewel
      const scepter = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.8, 6), mats.goldTrim);
      scepter.position.set(0.35, 0.95, 0.2);
      charGroup.add(scepter);

      const scepterHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), mats.jadeGlow);
      scepterHead.position.set(0.35, 1.85, 0.2);
      charGroup.add(scepterHead);
      break;
    }
  }

  // 3. OVERHEAD ANIMATED INTERACTIVE INVERTED TRIANGLE (Hình tam giác ngược nổi bật trên đầu nhân vật)
  const invertedTriangleGroup = new THREE.Group();
  invertedTriangleGroup.name = 'invertedTriangle';
  invertedTriangleGroup.position.set(0, 3.05, 0); // elevated clearly above nameplate & headwear

  const halfW = 0.26;
  const topY = 0.24;
  const botY = -0.24;
  const triShape = new THREE.Shape();
  triShape.moveTo(-halfW, topY);
  triShape.lineTo(halfW, topY);
  triShape.lineTo(0, botY);
  triShape.closePath();

  const triGeo = new THREE.ExtrudeGeometry(triShape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025
  });
  triGeo.center();

  // Outer beveled prism in vivid electric cyan
  const triMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0x0891b2,
    emissiveIntensity: 0.95
  });
  const triMesh = new THREE.Mesh(triGeo, triMat);
  triMesh.castShadow = true;
  invertedTriangleGroup.add(triMesh);

  // Inner glowing cyan triangle faces on both front and back
  const inShape = new THREE.Shape();
  const inW = halfW * 0.68;
  const inTop = topY * 0.68;
  const inBot = botY * 0.68;
  inShape.moveTo(-inW, inTop);
  inShape.lineTo(inW, inTop);
  inShape.lineTo(0, inBot);
  inShape.closePath();

  const inGeo = new THREE.ShapeGeometry(inShape);
  inGeo.center();
  const inMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.98
  });

  const inFront = new THREE.Mesh(inGeo, inMat);
  inFront.position.z = 0.07;
  invertedTriangleGroup.add(inFront);

  const inBack = new THREE.Mesh(inGeo, inMat);
  inBack.position.z = -0.07;
  invertedTriangleGroup.add(inBack);

  // Top diamond finial
  const topGem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.08),
    new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.98 })
  );
  topGem.position.y = 0.33;
  invertedTriangleGroup.add(topGem);

  // Soft radiant cyan point light
  const triLight = new THREE.PointLight(0x00f0ff, 1.4, 4.0);
  invertedTriangleGroup.add(triLight);

  group.add(invertedTriangleGroup);

  // High-Contrast Floating Billboard Nameplate Sprite
  const nameplate = createNameplateSprite(
    npc.title || 'Nhân Vật',
    npc.name,
    npc.color || '#F59E0B',
    npc.type
  );
  group.add(nameplate);

  // Dedicated spotlight illuminating the NPC silhouette
  const npcLight = new THREE.PointLight(0x00f0ff, 1.6, 5.0);
  npcLight.position.set(0, 2.6, 0.5);
  group.add(npcLight);

  // Helper to attach userData to all descendants for reliable raycasting
  const markNPCClickable = (obj: THREE.Object3D) => {
    obj.userData = {
      isNPC: true,
      npcId: npc.id,
      npcName: npc.name,
      npcTitle: npc.title,
      npcType: npc.type,
      regionId: npc.regionId
    };
    obj.traverse(child => {
      child.userData = {
        isNPC: true,
        npcId: npc.id,
        npcName: npc.name,
        npcTitle: npc.title,
        npcType: npc.type,
        regionId: npc.regionId
      };
    });
  };
  markNPCClickable(group);

  return {
    group,
    marker: triMesh,
    glowRing,
    invertedTriangle: invertedTriangleGroup
  };
}

// =========================================================================
// 1. TRÚC LÂM VĂN MIẾU DETAILED ARCHITECTURE & SCHOLAR PROPS
// =========================================================================

/**
 * Khổng Học Tứ Trụ Biểu Môn & Hongsalmun (Ceremonial Confucian Scholar Pillar Gate)
 */
export function createScholarGatePillars(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 4 Upright Pillars with stepped stone bases and red timber shafts
  const pillarOffsets = [-2.6, -0.9, 0.9, 2.6];
  pillarOffsets.forEach((px, idx) => {
    const isMain = idx === 1 || idx === 2;
    const h = isMain ? 3.4 : 2.7;

    // Stone Plinth
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.5), mats.stonePier);
    plinth.position.set(px, 0.2, 0);
    plinth.castShadow = true;
    group.add(plinth);

    // Pillar Column
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, h, 8), mats.redLacquer);
    col.position.set(px, 0.4 + h / 2, 0);
    col.castShadow = true;
    group.add(col);

    // Lotus Bud Pillar Cap (Chóp Hoa Sen Đá)
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.35, 6), mats.stoneStatue);
    cap.position.set(px, 0.4 + h + 0.175, 0);
    group.add(cap);
  });

  // Central Top Cross-Beams & Calligraphic Plaque
  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.16, 0.2), mats.dancheongEaves);
  topBeam.position.set(0, 3.25, 0);
  group.add(topBeam);

  const subBeam = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.14, 0.18), mats.redLacquer);
  subBeam.position.set(0, 2.75, 0);
  group.add(subBeam);

  // Red Hongsalmun arrow spires (Cọc đỏ tiễu trừ tà khí)
  for (let s = -0.9; s <= 0.9; s += 0.3) {
    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 4), mats.redLacquer);
    spire.position.set(s, 3.45, 0);
    group.add(spire);
  }

  // Wooden Plaque (Hoành phi "VĂN HIẾN QUỐC GIA")
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.38, 0.06), mats.agedWood);
  plaque.position.set(0, 3.0, 0.08);
  group.add(plaque);

  const plaqueGoldBorder = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.42, 0.04), mats.goldTrim);
  plaqueGoldBorder.position.set(0, 3.0, 0.07);
  group.add(plaqueGoldBorder);

  // Side Wings Tiled Eaves
  [-1.75, 1.75].forEach(wx => {
    const wingRoof = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.14, 0.6), mats.terracottaRoof);
    wingRoof.position.set(wx, 2.85, 0);
    wingRoof.castShadow = true;
    group.add(wingRoof);
  });

  return group;
}

/**
 * Khuê Văn Các Pavilion (Temple of Literature Pavilion of Constellation)
 */
export function createKhueVanPavilion(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 1. Lower Stone Terrace
  const stoneBase = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.4, 2.8), mats.stonePier);
  stoneBase.position.y = 0.2;
  stoneBase.castShadow = true;
  group.add(stoneBase);

  // 4 Robust Lower Timber Posts
  const postCoords = [-0.95, 0.95];
  postCoords.forEach(px => {
    postCoords.forEach(pz => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.6, 0.2), mats.timberWood);
      post.position.set(px, 1.2, pz);
      post.castShadow = true;
      group.add(post);
    });
  });

  // 2. Upper Wooden Pavilion Hall
  const floor = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.18, 2.6), mats.timberWood);
  floor.position.y = 2.05;
  group.add(floor);

  // Red Balustrades
  const railGeo = new THREE.BoxGeometry(2.4, 0.4, 0.05);
  [-1.15, 1.15].forEach(rz => {
    const rail = new THREE.Mesh(railGeo, mats.redLacquer);
    rail.position.set(0, 2.3, rz);
    group.add(rail);
  });
  [-1.15, 1.15].forEach(rx => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.4, 2.4), mats.redLacquer);
    rail.position.set(rx, 2.3, 0);
    group.add(rail);
  });

  // Upper Ochre/Red Walls with Iconic Round Sun Windows ("Khuê Tinh Cửa Tròn")
  const wallGeo = new THREE.BoxGeometry(2.1, 1.2, 0.08);
  [-0.95, 0.95].forEach(wz => {
    const wall = new THREE.Mesh(wallGeo, mats.redLacquer);
    wall.position.set(0, 2.9, wz);
    group.add(wall);

    // Round Window Cutout (Torus Frame)
    const windowRim = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 6, 16), mats.goldTrim);
    windowRim.position.set(0, 2.9, wz + (wz > 0 ? 0.04 : -0.04));
    group.add(windowRim);

    // Radiant sun rays inside window
    const rayH = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.03, 0.02), mats.timberWood);
    rayH.position.set(0, 2.9, wz + (wz > 0 ? 0.04 : -0.04));
    group.add(rayH);

    const rayV = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.68, 0.02), mats.timberWood);
    rayV.position.set(0, 2.9, wz + (wz > 0 ? 0.04 : -0.04));
    group.add(rayV);
  });

  // 3. Double-Tier Overlapping Tiled Roof (Mái Chồng Diêm)
  const lowerEaves = new THREE.Mesh(new THREE.ConeGeometry(2.3, 0.5, 4), mats.terracottaRoof);
  lowerEaves.rotateY(Math.PI / 4);
  lowerEaves.position.y = 3.65;
  lowerEaves.scale.set(1.4, 0.6, 1.4);
  lowerEaves.castShadow = true;
  group.add(lowerEaves);

  const upperEaves = new THREE.Mesh(new THREE.ConeGeometry(1.6, 0.5, 4), mats.terracottaRoof);
  upperEaves.rotateY(Math.PI / 4);
  upperEaves.position.y = 4.15;
  upperEaves.scale.set(1.4, 0.7, 1.4);
  upperEaves.castShadow = true;
  group.add(upperEaves);

  // Roof Finial Gourd Bottle
  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mats.goldTrim);
  finial.position.y = 4.55;
  group.add(finial);

  // Hanging Bronze Bell inside
  const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 0.35, 8), mats.bronzeRelic);
  bell.position.set(0, 2.65, 0);
  group.add(bell);

  return group;
}

/**
 * Tháp Bút ("Tả Thanh Thiên") & Đại Nghiên Mực Hoa Sen (Stone Brush Tower & Giant Inkstone Basin)
 */
export function createScholarBrushTowerAndInkstone(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 1. Tháp Bút Stone Tower (5 Stepped Tiers pointing to heaven)
  const towerBase = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.35, 1.1), mats.stonePier);
  towerBase.position.set(-1.2, 0.175, 0);
  towerBase.castShadow = true;
  group.add(towerBase);

  const towerShaft = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.2, 0.7), mats.stoneStatue);
  towerShaft.position.set(-1.2, 0.35 + 1.1, 0);
  towerShaft.castShadow = true;
  group.add(towerShaft);

  // Carved Calligraphy Brush Tip on Top (Ngọn Bút Lông Đá Tả Thanh Thiên)
  const brushBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 0.45, 8), mats.stonePier);
  brushBase.position.set(-1.2, 2.75, 0);
  group.add(brushBase);

  const stoneBrushTip = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.75, 8), mats.stoneStatue);
  stoneBrushTip.position.set(-1.2, 3.25, 0);
  stoneBrushTip.castShadow = true;
  group.add(stoneBrushTip);

  // 2. Đại Nghiên Mực Hoa Sen (Giant Lotus Inkstone Basin)
  const inkstoneBase = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.1, 0.35, 12), mats.basaltRock);
  inkstoneBase.position.set(1.1, 0.175, 0);
  inkstoneBase.castShadow = true;
  group.add(inkstoneBase);

  // Polished Black Glossy Ink Surface
  const inkPool = new THREE.Mesh(
    new THREE.CircleGeometry(0.82, 16),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.85 })
  );
  inkPool.rotateX(-Math.PI / 2);
  inkPool.position.set(1.1, 0.36, 0);
  group.add(inkPool);

  // Resting carved stone frog water dropper (Thủy trì hình thiềm thừ)
  const frog = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.25), mats.jadeGlow);
  frog.position.set(1.5, 0.42, 0.4);
  group.add(frog);

  return group;
}

/**
 * Bàn Trà Đạo & Bút Nghiên Nho Sĩ (Scholar Tea & Calligraphy Desk under Bamboo)
 */
export function createScholarTeaAndCalligraphyDesk(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Stone Study Table
  const tableTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.9), mats.timberWood);
  tableTop.position.set(0, 0.65, 0);
  tableTop.castShadow = true;
  group.add(tableTop);

  [-0.65, 0.65].forEach(tx => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.75), mats.agedWood);
    leg.position.set(tx, 0.3, 0);
    group.add(leg);
  });

  // 4 Round Stools (Đôn gỗ / Đôn đá)
  const stoolCoords = [
    [-0.6, -0.65],
    [0.6, -0.65],
    [-0.6, 0.65],
    [0.6, 0.65]
  ];
  stoolCoords.forEach(([sx, sz]) => {
    const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.38, 8), mats.stonePier);
    stool.position.set(sx, 0.19, sz);
    stool.castShadow = true;
    group.add(stool);
  });

  // Tea Set Tray with Celadon Teapot and Cups
  const tray = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.03, 0.32), mats.agedWood);
  tray.position.set(-0.35, 0.725, 0);
  group.add(tray);

  const teapot = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), mats.jadeGlow);
  teapot.position.set(-0.35, 0.8, 0);
  group.add(teapot);

  // Unrolled Bamboo Manuscript & Writing Brush Rest
  const scrollSheet = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.015, 0.35), mats.whiteWall);
  scrollSheet.position.set(0.3, 0.72, 0);
  group.add(scrollSheet);

  const brushRest = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.25), mats.jadeGlow);
  brushRest.position.set(0.62, 0.73, 0);
  group.add(brushRest);

  return group;
}

/**
 * Tiled Shelter Pavilion for Doctor Turtle Steles (Nhà Bia Tiến Sĩ Cổ Kính)
 */
export function createDoctorSteleShelterPavilion(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const width = 6.4;
  const depth = 3.6;

  // Granite Pavilion Platform
  const platform = new THREE.Mesh(new THREE.BoxGeometry(width + 0.6, 0.3, depth + 0.6), mats.stonePier);
  platform.position.y = 0.15;
  platform.receiveShadow = true;
  group.add(platform);

  // 4 Robust Corner Pillars
  const pillarX = [-width / 2 + 0.3, width / 2 - 0.3];
  const pillarZ = [-depth / 2 + 0.3, depth / 2 - 0.3];
  pillarX.forEach(px => {
    pillarZ.forEach(pz => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 2.6, 8), mats.redLacquer);
      col.position.set(px, 1.45, pz);
      col.castShadow = true;
      group.add(col);
    });
  });

  // Dancheong Eaves Beam System
  const eaves = new THREE.Mesh(new THREE.BoxGeometry(width + 0.4, 0.2, depth + 0.4), mats.dancheongEaves);
  eaves.position.y = 2.75;
  group.add(eaves);

  // Sloped Traditional Giwa Tiled Roof
  const roof = new THREE.Mesh(new THREE.BoxGeometry(width + 1.1, 0.3, depth + 1.1), mats.giwaRoof);
  roof.position.y = 2.95;
  roof.castShadow = true;
  group.add(roof);

  const ridge = new THREE.Mesh(new THREE.BoxGeometry(width + 1.2, 0.22, 0.3), mats.stonePier);
  ridge.position.y = 3.12;
  group.add(ridge);

  // Central Bronze Incense Tripod (Lư hương đồng trước gian nhà bia)
  const tripod = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.32, 8), mats.bronzeRelic);
  tripod.position.set(0, 0.45, 1.2);
  group.add(tripod);

  // 2 Stone Seowon Lanterns (Đèn đá Khổng học)
  [-width / 2 + 0.8, width / 2 - 0.8].forEach(lx => {
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.85, 6), mats.stoneStatue);
    lantern.position.set(lx, 0.725, 1.2);
    lantern.castShadow = true;
    group.add(lantern);
  });

  return group;
}

// =========================================================================
// 2. QUẢNG TRƯỜNG ĐẠI LỄ FOOD BOOTHS & FESTIVAL PERFORMERS
// =========================================================================

/**
 * Traditional Food Festival Stalls & Dining Setup
 */
export function createFoodFestivalBooths(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // -----------------------------------------------------------------
  // 1. SẠP BÁNH DÂN GIAN & CHUM KIMCHI ONGI (Traditional Cakes & Crocks)
  // -----------------------------------------------------------------
  const stall1 = new THREE.Group();
  stall1.position.set(-6.5, 0, 0);

  // Wooden Counter & Sloped Bamboo Mat Canopy
  const counter1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 1.0), mats.timberWood);
  counter1.position.set(0, 0.4, 0);
  counter1.castShadow = true;
  stall1.add(counter1);

  // Bamboo awning posts & sloped mat
  [-1.1, 1.1].forEach(px => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.8, 6), mats.agedWood);
    post.position.set(px, 1.3, -0.4);
    stall1.add(post);
  });
  const canopy1 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 1.4), mats.timberWood);
  canopy1.position.set(0, 2.15, 0.1);
  canopy1.rotation.x = 0.2;
  stall1.add(canopy1);

  // Onggi Kimchi Crocks (Chum sành muối kimchi & dưa muối)
  [-0.7, -0.3, 0.4].forEach((ox, i) => {
    const crock = new THREE.Mesh(new THREE.SphereGeometry(0.18 + i * 0.02, 10, 10), mats.terracottaRoof);
    crock.scale.set(1.0, 1.2, 1.0);
    crock.position.set(ox, 0.95, -0.1);
    crock.castShadow = true;
    stall1.add(crock);

    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.06, 8), mats.terracottaRoof);
    lid.position.set(ox, 1.18, -0.1);
    stall1.add(lid);
  });

  // Woven Trays of Bánh Chưng & Bánh Dày
  const tray1 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.04, 10), mats.bambooGreen);
  tray1.position.set(0.75, 0.83, 0.15);
  stall1.add(tray1);

  const banhChung = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.22), mats.bambooGreen);
  banhChung.position.set(0.75, 0.88, 0.15);
  stall1.add(banhChung);

  // Hanging Garlic & Chili Garlands
  [-1.0, 1.0].forEach(gx => {
    const garland = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.6, 6), mats.lanternSilkRed);
    garland.position.set(gx, 1.7, 0.35);
    stall1.add(garland);
  });
  group.add(stall1);

  // -----------------------------------------------------------------
  // 2. SẠP XIÊN NƯỚNG THAN HOA & CHẢ CÁ EOMUK (BBQ Skewers & Fish Cakes)
  // -----------------------------------------------------------------
  const stall2 = new THREE.Group();
  stall2.position.set(6.5, 0, 0);

  const counter2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 1.0), mats.timberWood);
  counter2.position.set(0, 0.4, 0);
  counter2.castShadow = true;
  stall2.add(counter2);

  // Red and Yellow Striped Awning
  [-1.1, 1.1].forEach(px => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.8, 6), mats.agedWood);
    post.position.set(px, 1.3, -0.4);
    stall2.add(post);
  });
  const canopy2 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 1.4), mats.lanternSilkRed);
  canopy2.position.set(0, 2.15, 0.1);
  canopy2.rotation.x = 0.2;
  stall2.add(canopy2);

  // Charcoal Brazier Grill with Glowing Skewers
  const grill = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.2, 0.45), mats.basaltRock);
  grill.position.set(-0.6, 0.9, 0.05);
  stall2.add(grill);

  const coals = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.05, 0.38),
    new THREE.MeshBasicMaterial({ color: 0xf97316 })
  );
  coals.position.set(-0.6, 1.01, 0.05);
  stall2.add(coals);

  // Metal Steaming Vat with Eomuk Skewers
  const soupPot = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.25, 0.45), mats.stoneStatue);
  soupPot.position.set(0.6, 0.92, 0.05);
  stall2.add(soupPot);

  // Skewers sticking out
  for (let sk = -0.2; sk <= 0.2; sk += 0.1) {
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.32, 4), mats.timberWood);
    stick.position.set(0.6 + sk, 1.15, 0.05);
    stick.rotation.z = sk * 0.5;
    stall2.add(stick);
  }
  group.add(stall2);

  // -----------------------------------------------------------------
  // 3. SẠP TRÀ SEN & BÁNH NGỌT DÂN GIAN (Songpyeon, Bánh Cốm, Yeot Taffy)
  // -----------------------------------------------------------------
  const stall3 = new THREE.Group();
  stall3.position.set(0, 0, 4.5);

  const counter3 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.8, 1.0), mats.dancheongEaves);
  counter3.position.set(0, 0.4, 0);
  stall3.add(counter3);

  // Confectionery display trays in pastel silk colors
  const traySongpyeon = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 0.4), mats.whiteWall);
  traySongpyeon.position.set(-0.65, 0.83, 0);
  stall3.add(traySongpyeon);

  // Mini 5-color songpyeon balls on tray
  const colors = [0xffffff, 0xf472b6, 0x4ade80, 0xfde047, 0xc084fc];
  colors.forEach((c, idx) => {
    const sweet = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), new THREE.MeshStandardMaterial({ color: c, roughness: 0.5 }));
    sweet.position.set(-0.85 + (idx % 3) * 0.1, 0.88, -0.1 + Math.floor(idx / 3) * 0.12);
    stall3.add(sweet);
  });

  // Copper Lotus Tea Kettle
  const kettle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.28, 8), mats.goldTrim);
  kettle.position.set(0.6, 0.94, 0);
  stall3.add(kettle);
  group.add(stall3);

  // -----------------------------------------------------------------
  // 4. BÀN ĂN ẨM THỰC LỄ HỘI NGOÀI TRỜI (Festival Dining Sets)
  // -----------------------------------------------------------------
  [-3.5, 3.5].forEach(bx => {
    const tableSet = new THREE.Group();
    tableSet.position.set(bx, 0, 2.2);

    const diningTable = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.55, 0.85), mats.timberWood);
    diningTable.position.set(0, 0.28, 0);
    diningTable.castShadow = true;
    tableSet.add(diningTable);

    // Stools
    [-0.5, 0.5].forEach(stx => {
      [-0.65, 0.65].forEach(stz => {
        const stool = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.3, 0.26), mats.agedWood);
        stool.position.set(stx, 0.15, stz);
        tableSet.add(stool);
      });
    });

    // Steaming Pho bowls and cups on table
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.1, 8), mats.whiteWall);
    bowl.position.set(-0.25, 0.61, 0);
    tableSet.add(bowl);

    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.08, 6), mats.jadeGlow);
    cup.position.set(0.28, 0.6, 0.1);
    tableSet.add(cup);

    group.add(tableSet);
  });

  return group;
}

/**
 * Animated Festival Performers: Quan Họ Singers, Samulnori Drummers, Folk Dancers
 */
export function createFestivalPerformersGroup(): {
  group: THREE.Group;
  animatedMembers: { obj: THREE.Object3D; animType: 'drum' | 'ribbon' | 'dance' | 'sing' }[];
} {
  const mats = getMaterials();
  const group = new THREE.Group();
  const animatedMembers: { obj: THREE.Object3D; animType: 'drum' | 'ribbon' | 'dance' | 'sing' }[] = [];

  const skinMat = new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.6 });
  const darkHairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });

  // -----------------------------------------------------------------
  // 1. LIỀN ANH & LIỀN CHỊ HÁT QUAN HỌ (Vietnamese Folk Duet)
  // -----------------------------------------------------------------
  const quanHoGroup = new THREE.Group();
  quanHoGroup.position.set(-2.6, 0, -1.8);

  // Liền Anh (Male Singer)
  const lienAnh = new THREE.Group();
  lienAnh.position.set(-0.5, 0, 0);

  const anhRobe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.36, 1.0, 10), mats.dancheongEaves);
  anhRobe.position.y = 0.5;
  lienAnh.add(anhRobe);

  const anhHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), skinMat);
  anhHead.position.y = 1.15;
  lienAnh.add(anhHead);

  const anhTurban = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.04, 6, 16), darkHairMat);
  anhTurban.rotateX(Math.PI / 2.2);
  anhTurban.position.y = 1.25;
  lienAnh.add(anhTurban);

  // Folding fan held gracefully
  const anhFan = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.16), mats.timberWood);
  anhFan.position.set(0.22, 0.82, 0.2);
  lienAnh.add(anhFan);
  quanHoGroup.add(lienAnh);
  animatedMembers.push({ obj: lienAnh, animType: 'sing' });

  // Liền Chị (Female Singer in Áo Tứ Thân & Nón Quai Thao)
  const lienChi = new THREE.Group();
  lienChi.position.set(0.5, 0, 0);

  const chiRobe = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.38, 0.96, 10), mats.lanternSilkYellow);
  chiRobe.position.y = 0.48;
  lienChi.add(chiRobe);

  // Vibrant Pink Silk Sash
  const chiSash = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 10), mats.lanternLotusPink);
  chiSash.position.y = 0.65;
  lienChi.add(chiSash);

  const chiHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), skinMat);
  chiHead.position.y = 1.12;
  lienChi.add(chiHead);

  // Large flat Nón Quai Thao hat with silk ribbons
  const nonQuaiThao = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.05, 18), mats.timberWood);
  nonQuaiThao.position.set(0, 1.28, 0);
  lienChi.add(nonQuaiThao);

  const thaoRibbon = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.55, 0.01), mats.lanternLotusPink);
  thaoRibbon.position.set(0.35, 0.95, 0);
  lienChi.add(thaoRibbon);

  // Lacquer betel cơi trầu in hand
  const coiTrau = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 8), mats.redLacquer);
  coiTrau.position.set(-0.24, 0.72, 0.22);
  lienChi.add(coiTrau);
  quanHoGroup.add(lienChi);
  animatedMembers.push({ obj: lienChi, animType: 'sing' });

  group.add(quanHoGroup);

  // -----------------------------------------------------------------
  // 2. SAMULNORI DRUMMER WITH SANGMO RIBBON HAT (Korean Folk Drummer)
  // -----------------------------------------------------------------
  const samulnori = new THREE.Group();
  samulnori.position.set(2.8, 0, -1.8);

  const samRobe = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.38, 0.94, 10), mats.whiteWall);
  samRobe.position.y = 0.47;
  samulnori.add(samRobe);

  // Blue and yellow chest vest
  const samVest = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.42, 8), mats.dancheongEaves);
  samVest.position.y = 0.88;
  samulnori.add(samVest);

  const samHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), skinMat);
  samHead.position.y = 1.16;
  samulnori.add(samHead);

  // Sangmo Hat with tall pivot and rotating long white silk ribbon strip
  const sangmoCap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.14, 10), darkHairMat);
  sangmoCap.position.y = 1.32;
  samulnori.add(sangmoCap);

  const ribbonPivot = new THREE.Group();
  ribbonPivot.position.y = 1.42;

  const ribbon = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.025, 4, 18, Math.PI * 1.5), mats.whiteWall);
  ribbon.rotateX(Math.PI / 2.5);
  ribbonPivot.add(ribbon);
  samulnori.add(ribbonPivot);
  animatedMembers.push({ obj: ribbonPivot, animType: 'ribbon' });

  // Hourglass Janggu Drum slung across torso
  const janggu = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.08, 0.65, 8), mats.terracottaRoof);
  janggu.rotateZ(Math.PI / 2.3);
  janggu.position.set(0.1, 0.82, 0.28);
  samulnori.add(janggu);

  group.add(samulnori);
  animatedMembers.push({ obj: samulnori, animType: 'drum' });

  // -----------------------------------------------------------------
  // 3. VŨ CÔNG MÚA NÓN LỄ HỘI (Folk Dance Performer)
  // -----------------------------------------------------------------
  const dancer = new THREE.Group();
  dancer.position.set(0, 0, -2.4);

  const dancerRobe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.44, 0.92, 10), mats.lanternSilkRed);
  dancerRobe.position.y = 0.46;
  dancer.add(dancerRobe);

  const dancerHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), skinMat);
  dancerHead.position.y = 1.14;
  dancer.add(dancerHead);

  // Spinning ribbon fans in both hands
  [-0.38, 0.38].forEach((fx, idx) => {
    const fan = new THREE.Mesh(new THREE.CircleGeometry(0.24, 8), mats.goldTrim);
    fan.position.set(fx, 1.0, 0.25);
    fan.rotation.y = idx === 0 ? 0.4 : -0.4;
    dancer.add(fan);
  });
  group.add(dancer);
  animatedMembers.push({ obj: dancer, animType: 'dance' });

  return { group, animatedMembers };
}

// =========================================================================
// 3. QUẦN ĐẢO LAM NGỌC & GỐM SỨ TRADITIONAL CRAFTS VILLAGE
// =========================================================================

/**
 * Traditional Craft Village Exhibition Complex
 * Adds Dong Ho Woodblock Prints, Minhwa Folk Art, Najeon Mother-of-Pearl Lacquerware,
 * Conical Hats & Hanji Fans, Stone Carving, and Blue-and-White Bát Tràng Ceramics.
 */
export function createTraditionalCraftsVillageComplex(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // -----------------------------------------------------------------
  // 1. TRANH DÂN GIAN ĐÔNG HỒ & TRANH MINHWA HÀN QUỐC (Folk Print Drying Racks)
  // -----------------------------------------------------------------
  const folkArtStation = new THREE.Group();
  folkArtStation.position.set(-3.2, 0, -1.8);

  // Bamboo drying frame
  [-1.2, 1.2].forEach(px => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.9, 6), mats.agedWood);
    post.position.set(px, 0.95, 0);
    folkArtStation.add(post);
  });
  const topCrossbar = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 0.06), mats.timberWood);
  topCrossbar.position.set(0, 1.85, 0);
  folkArtStation.add(topCrossbar);

  const midCrossbar = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 0.06), mats.timberWood);
  midCrossbar.position.set(0, 1.05, 0);
  folkArtStation.add(midCrossbar);

  // 4 Drying Folk Woodblock Prints (Tranh Gà, Lợn, Cá Chép, Hổ Minhwa)
  const printColors = [0xfef08a, 0xfecdd3, 0xa7f3d0, 0xfde047];
  printColors.forEach((col, idx) => {
    const px = -0.9 + idx * 0.6;
    const printSheet = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.65, 0.01),
      new THREE.MeshStandardMaterial({ color: col, roughness: 0.8 })
    );
    printSheet.position.set(px, 1.45, 0.02);
    folkArtStation.add(printSheet);

    // Contrasting Folk Ink Stamp in center
    const inkPattern = new THREE.Mesh(
      new THREE.CircleGeometry(0.14, 8),
      new THREE.MeshStandardMaterial({ color: idx % 2 === 0 ? 0xbe123c : 0x0f172a, roughness: 0.6 })
    );
    inkPattern.position.set(px, 1.45, 0.03);
    folkArtStation.add(inkPattern);
  });

  // Carving bench with printing woodblocks & ink brayer
  const bench = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.6), mats.timberWood);
  bench.position.set(0, 0.225, 0.8);
  folkArtStation.add(bench);

  // Woodblock carving slabs
  [-0.45, 0.45].forEach(bx => {
    const block = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.06, 0.28), mats.agedWood);
    block.position.set(bx, 0.48, 0.8);
    folkArtStation.add(block);
  });
  group.add(folkArtStation);

  // -----------------------------------------------------------------
  // 2. KHẢM TRAI & SƠN MÀI (Najeon Chilgi & Mother-of-Pearl Inlay Table)
  // -----------------------------------------------------------------
  const lacquerStation = new THREE.Group();
  lacquerStation.position.set(3.2, 0, -1.8);

  const craftTable = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 0.9), mats.agedWood);
  craftTable.position.set(0, 0.275, 0);
  craftTable.castShadow = true;
  lacquerStation.add(craftTable);

  // Shimmering Black Lacquer Box with Abalone Mother-of-Pearl Inlay
  const lacquerBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.22, 0.32),
    new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.15, metalness: 0.8 })
  );
  lacquerBox.position.set(-0.45, 0.66, 0);
  lacquerStation.add(lacquerBox);

  // Iridescent Pearl Inlay Pattern
  const pearlInlay = new THREE.Mesh(
    new THREE.CircleGeometry(0.08, 6),
    new THREE.MeshBasicMaterial({ color: 0x67e8f9 })
  );
  pearlInlay.rotateX(-Math.PI / 2);
  pearlInlay.position.set(-0.45, 0.775, 0);
  lacquerStation.add(pearlInlay);

  // Abalone Shells (Vỏ ốc xà cừ phát quang)
  const abaloneShell = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5),
    new THREE.MeshStandardMaterial({ color: 0xa5f3fc, roughness: 0.3, metalness: 0.4 })
  );
  abaloneShell.position.set(0.4, 0.6, 0.1);
  lacquerStation.add(abaloneShell);

  // Lacquer Resin Urns (Chĩnh sơn ta)
  const resinPot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.22, 8), mats.terracottaRoof);
  resinPot.position.set(0.5, 0.66, -0.2);
  lacquerStation.add(resinPot);
  group.add(lacquerStation);

  // -----------------------------------------------------------------
  // 3. NÓN LÁ CHUÔNG & QUẠT GIẤY HANJI (Conical Hats & Folded Fan Display)
  // -----------------------------------------------------------------
  const hatFanStation = new THREE.Group();
  hatFanStation.position.set(-3.2, 0, 2.2);

  const displayRack = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.6), mats.timberWood);
  displayRack.position.set(0, 0.75, 0);
  hatFanStation.add(displayRack);

  [-0.7, 0.7].forEach(rx => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.75, 6), mats.agedWood);
    leg.position.set(rx, 0.375, 0);
    hatFanStation.add(leg);
  });

  // 2 Pristine Conical Nón Lá Hats
  [-0.45, 0.45].forEach((hx, idx) => {
    const nonLa = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.16, 12), mats.whiteWall);
    nonLa.position.set(hx, 0.88, -0.05);
    hatFanStation.add(nonLa);

    // Silk Chin Ribbon
    const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, 0.01), idx === 0 ? mats.lanternLotusPink : mats.jadeGlow);
    ribbon.position.set(hx, 0.75, 0.1);
    hatFanStation.add(ribbon);
  });

  // Upright Hanji Fans with Taegeuk Swirl Colors (Quạt giấy Thái Cực)
  const fanStand = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.02, 12, 1, false, 0, Math.PI), mats.lanternSilkRed);
  fanStand.rotateX(Math.PI / 2);
  fanStand.position.set(0, 0.95, 0.18);
  hatFanStation.add(fanStand);
  group.add(hatFanStation);

  // -----------------------------------------------------------------
  // 4. KỆ GỐM BÁT TRÀNG HOA LAM & MEN RẠN (Tiered Porcelain & Celadon Shelves)
  // -----------------------------------------------------------------
  const potteryShelf = new THREE.Group();
  potteryShelf.position.set(3.2, 0, 2.2);

  // Multi-tier wooden display shelf
  const shelfBack = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 0.08), mats.agedWood);
  shelfBack.position.set(0, 0.7, -0.3);
  potteryShelf.add(shelfBack);

  [0.2, 0.65, 1.1].forEach((sy, tier) => {
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.06, 0.6), mats.timberWood);
    board.position.set(0, sy, 0);
    potteryShelf.add(board);

    // Display Pots on each tier
    [-0.55, 0, 0.55].forEach((vx, vi) => {
      let vase: THREE.Mesh;
      if (tier === 2) {
        // Top tier: Elegant Blue-and-White Bát Tràng Porcelain Vases
        vase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.32, 8), mats.whiteWall);
        vase.position.set(vx, sy + 0.19, 0);
        // Blue cobalt accent rim
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 4, 8), mats.dancheongEaves);
        rim.rotateX(Math.PI / 2);
        rim.position.set(vx, sy + 0.35, 0);
        potteryShelf.add(rim);
      } else if (tier === 1) {
        // Middle tier: Goryeo Celadon Teapots & Urns
        vase = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mats.jadeGlow);
        vase.position.set(vx, sy + 0.14, 0);
      } else {
        // Bottom tier: Crackle-glaze bowls & terracotta jars
        vase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.09, 0.18, 8), mats.terracottaRoof);
        vase.position.set(vx, sy + 0.12, 0);
      }
      potteryShelf.add(vase);
    });
  });
  group.add(potteryShelf);

  return group;
}

// =========================================================================
// 4. WHITE CLOUD TAOIST OVERLOOK TERRACE (Bạch Vân Tiên Đài)
// =========================================================================

/**
 * Dedicated White Cloud Overlook Terrace on Dragon & Tiger Mountain
 * Elevated white granite cliff platform with cloud-dragon balustrade, stone lanterns,
 * and incense burner to showcase Ẩn Sĩ Bạch Vân clearly and completely.
 */
export function createWhiteCloudTaoistOverlookTerrace(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 1. Elevated Stepped White Granite Platform (Bạch Ngọc Thạch Đài)
  const mainPlinth = new THREE.Mesh(
    new THREE.CylinderGeometry(2.6, 2.9, 0.55, 18),
    mats.stonePier
  );
  mainPlinth.position.y = 0.275;
  mainPlinth.castShadow = true;
  mainPlinth.receiveShadow = true;
  group.add(mainPlinth);

  // Upper Polished Stone Courtyard Cap
  const upperCap = new THREE.Mesh(
    new THREE.CylinderGeometry(2.45, 2.55, 0.12, 18),
    mats.cobblestonePath
  );
  upperCap.position.y = 0.61;
  upperCap.receiveShadow = true;
  group.add(upperCap);

  // 2. Carved Cloud-Dragon Stone Balustrade (Lan can rồng đá mây cuộn quanh thềm sau)
  const railAngles = [-Math.PI * 0.8, -Math.PI * 0.5, -Math.PI * 0.2, 0, Math.PI * 0.2, Math.PI * 0.5, Math.PI * 0.8];
  railAngles.forEach(ang => {
    const rx = Math.sin(ang) * 2.35;
    const rz = Math.cos(ang) * 2.35;

    // Stone Balustrade Post
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.65, 0.16), mats.stoneStatue);
    post.position.set(rx, 0.6 + 0.325, rz);
    post.castShadow = true;
    group.add(post);

    // Lotus bud post finial
    const lotusCap = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.15, 6), mats.jadeGlow);
    lotusCap.position.set(rx, 0.6 + 0.725, rz);
    group.add(lotusCap);
  });

  // Connecting Railing Curbs
  const railSegment = new THREE.Mesh(
    new THREE.TorusGeometry(2.35, 0.05, 6, 16, Math.PI * 1.6),
    mats.stonePier
  );
  railSegment.rotateX(Math.PI / 2);
  railSegment.rotateZ(Math.PI * 0.2);
  railSegment.position.y = 0.95;
  group.add(railSegment);

  // 3. Antique Stone Pagoda Lanterns on Front Corners
  [-1.6, 1.6].forEach(lx => {
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.9, 6), mats.stoneStatue);
    lantern.position.set(lx, 0.6 + 0.45, 1.4);
    lantern.castShadow = true;
    group.add(lantern);

    const lanternRoof = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.2, 6), mats.stonePier);
    lanternRoof.position.set(lx, 0.6 + 0.98, 1.4);
    group.add(lanternRoof);
  });

  // 4. Ancient Bronze Incense Burner Cauldron (Lư hương cổ đỉnh đồng)
  const censer = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.32, 8), mats.bronzeRelic);
  censer.position.set(0, 0.6 + 0.18, 1.55);
  censer.castShadow = true;
  group.add(censer);

  // 5. Swirling Ethereal Cloud Discs below terrace edge
  [
    [-1.8, 0.15, -1.2],
    [1.9, 0.15, -1.0],
    [-2.2, 0.12, 1.0],
    [2.1, 0.12, 1.2]
  ].forEach(([cx, cy, cz]) => {
    const cloud = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 8, 6),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.65,
        roughness: 0.9
      })
    );
    cloud.scale.set(1.4, 0.4, 1.2);
    cloud.position.set(cx, cy, cz);
    group.add(cloud);
  });

  return group;
}

// =========================================================================
// 5. QUẦN ĐẢO LAM NGỌC & GỐM SỨ: POTTERY WORKSHOP ATELIER & CARGO PIER
// =========================================================================

/**
 * Covered Traditional Pottery Artisan Workshop (Xưởng Gốm Thủ Công Truyền Thống)
 * Features thatched roof pavilion, 2 potter's wheels with spinning clay pots,
 * glaze dipping vats (Bisaek Celadon, Cobalt Blue, Terracotta), drying boards,
 * raw clay blocks, and kiln firewood stacks.
 */
export function createPotteryWorkshopAtelier(): {
  group: THREE.Group;
  animatedWheels: THREE.Object3D[];
} {
  const mats = getMaterials();
  const group = new THREE.Group();
  const animatedWheels: THREE.Object3D[] = [];

  // 1. Open-air Thatched Artisan Workshop Pavilion
  const pavilionW = 4.2;
  const pavilionD = 3.2;
  const postH = 2.0;

  // 4 Corner Timber Posts
  const postCoords = [
    [-pavilionW / 2 + 0.3, -pavilionD / 2 + 0.3],
    [pavilionW / 2 - 0.3, -pavilionD / 2 + 0.3],
    [-pavilionW / 2 + 0.3, pavilionD / 2 - 0.3],
    [pavilionW / 2 - 0.3, pavilionD / 2 - 0.3]
  ];

  postCoords.forEach(([px, pz]) => {
    // Stone footing
    const footing = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.12, 8), mats.stonePier);
    footing.position.set(px, 0.06, pz);
    group.add(footing);

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, postH, 8), mats.agedWood);
    post.position.set(px, postH / 2 + 0.12, pz);
    post.castShadow = true;
    group.add(post);
  });

  // Roof Eaves Beams
  const beamFront = new THREE.Mesh(new THREE.BoxGeometry(pavilionW, 0.1, 0.1), mats.timberWood);
  beamFront.position.set(0, postH + 0.12, pavilionD / 2 - 0.3);
  group.add(beamFront);

  const beamBack = new THREE.Mesh(new THREE.BoxGeometry(pavilionW, 0.1, 0.1), mats.timberWood);
  beamBack.position.set(0, postH + 0.12, -pavilionD / 2 + 0.3);
  group.add(beamBack);

  // Slanted Thatched Palm Roof (Mái lá cọ che nắng mưa cho nghệ nhân gốm)
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(pavilionW * 0.72, 1.1, 4),
    mats.terracottaRoof
  );
  roof.rotateY(Math.PI / 4);
  roof.scale.set(1.15, 0.7, pavilionD / pavilionW * 1.35);
  roof.position.set(0, postH + 0.65, 0);
  roof.castShadow = true;
  group.add(roof);

  // Brick-paved workshop flooring
  const floorPaving = new THREE.Mesh(
    new THREE.BoxGeometry(pavilionW + 0.4, 0.08, pavilionD + 0.4),
    mats.terracottaRoof
  );
  floorPaving.position.set(0, 0.04, 0);
  floorPaving.receiveShadow = true;
  group.add(floorPaving);

  // 2. Manual Potter's Wheels (Bàn xoay vuốt gốm thủ công Bát Tràng / Goryeo)
  [-1.2, 0.8].forEach((wx, wIdx) => {
    const wheelStand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.42, 0.45, 12),
      mats.agedWood
    );
    wheelStand.position.set(wx, 0.225, 0.2);
    wheelStand.castShadow = true;
    group.add(wheelStand);

    // Rotating Pottery Wheel Top Disc
    const wheelDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.48, 0.06, 16),
      mats.timberWood
    );
    wheelDisc.position.set(wx, 0.48, 0.2);
    group.add(wheelDisc);
    animatedWheels.push(wheelDisc);

    // Clay Vessel in-progress being thrown on the wheel
    const potColor = wIdx === 0 ? mats.jadeGlow : mats.whiteWall;
    const wetPot = new THREE.Mesh(
      new THREE.CylinderGeometry(wIdx === 0 ? 0.14 : 0.18, 0.1, 0.32, 12),
      potColor
    );
    wetPot.position.set(0, 0.19, 0);
    wheelDisc.add(wetPot);

    // Artisan Stool (Ghế đẩu gỗ của thợ gốm)
    const stool = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.28, 0.3), mats.agedWood);
    stool.position.set(wx, 0.14, 0.85);
    group.add(stool);
  });

  // 3. Glaze Mixing & Dipping Vats (Chum ủ men gốm tam sắc)
  const glazeColors = [
    { name: 'Celadon Bisaek', col: 0x5eead4 }, // Jade celadon
    { name: 'Bát Tràng Cobalt', col: 0x2563eb }, // Blue and white
    { name: 'Iron Terracotta', col: 0xb45309 }  // Brown/red iron glaze
  ];

  glazeColors.forEach((g, gi) => {
    const gx = -1.5 + gi * 0.55;
    const vat = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.16, 0.55, 10),
      mats.terracottaRoof
    );
    vat.position.set(gx, 0.275, -1.0);
    vat.castShadow = true;
    group.add(vat);

    // Glaze liquid inside
    const glazeLiquid = new THREE.Mesh(
      new THREE.CircleGeometry(0.19, 10),
      new THREE.MeshStandardMaterial({ color: g.col, roughness: 0.15, metalness: 0.3 })
    );
    glazeLiquid.rotateX(-Math.PI / 2);
    glazeLiquid.position.set(gx, 0.53, -1.0);
    group.add(glazeLiquid);

    // Dipping wooden ladle
    const ladle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.5, 4), mats.bambooGreen);
    ladle.position.set(gx + 0.08, 0.65, -1.0);
    ladle.rotation.z = 0.35;
    group.add(ladle);
  });

  // 4. Raw Kaolin Clay Mounds & Shaping Table (Khối đất sét trắng cao lanh)
  const clayTable = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.45, 0.7), mats.timberWood);
  clayTable.position.set(1.2, 0.225, -1.0);
  group.add(clayTable);

  // Raw clay blocks on table
  [-0.35, 0.35].forEach((cx, ci) => {
    const clayBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.18, 0.24),
      new THREE.MeshStandardMaterial({ color: ci === 0 ? 0xe2e8f0 : 0xa8a29e, roughness: 0.9 })
    );
    clayBlock.position.set(1.2 + cx, 0.54, -1.0);
    group.add(clayBlock);
  });

  // 5. Greenware Pottery Drying Boards (Ván dài phơi gốm mộc ngoài hiên)
  const dryingBoard = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 0.4), mats.timberWood);
  dryingBoard.position.set(0, 0.65, 1.4);
  group.add(dryingBoard);

  // Board legs
  [-0.9, 0.9].forEach(lx => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.65, 0.35), mats.agedWood);
    leg.position.set(lx, 0.325, 1.4);
    group.add(leg);
  });

  // Rows of unglazed tea bowls and vases drying in sea breeze
  for (let bx = -0.8; bx <= 0.8; bx += 0.32) {
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.05, 0.08, 8), mats.whiteWall);
    bowl.position.set(bx, 0.72, 1.4);
    group.add(bowl);
  }

  // 6. Kiln Firewood Stacks (Đống củi nung lò gốm)
  const woodStack = new THREE.Group();
  woodStack.position.set(-pavilionW / 2 - 0.6, 0, 0);
  for (let fx = -0.3; fx <= 0.3; fx += 0.15) {
    for (let fy = 0.08; fy <= 0.5; fy += 0.12) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 6), mats.agedWood);
      log.rotateX(Math.PI / 2);
      log.position.set(fx, fy, 0);
      woodStack.add(log);
    }
  }
  group.add(woodStack);

  return { group, animatedWheels };
}

/**
 * Traditional Wooden Pottery Cargo Pier & Fishing Boardwalk (Cầu Tàu Gốm Sứ & Bến Ngư Phủ)
 * Extends over turquoise lagoon water with cargo crates packed with export ceramics,
 * drying fishing nets, mooring bollards, rope coils, and lanterns.
 */
export function createCeramicCargoPier(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const pierLength = 6.2;
  const pierWidth = 1.8;
  const pierDeckH = 0.55;

  // 1. Water Pilings / Stilts (Cọc gỗ lim cắm dưới nước ngọc bích)
  for (let pz = -pierLength / 2 + 0.6; pz <= pierLength / 2 - 0.4; pz += 1.3) {
    [-pierWidth / 2 + 0.15, pierWidth / 2 - 0.15].forEach(px => {
      const pile = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.11, 1.4, 8),
        mats.agedWood
      );
      pile.position.set(px, 0.15, pz);
      pile.castShadow = true;
      group.add(pile);
    });

    // Cross brace
    const brace = new THREE.Mesh(new THREE.BoxGeometry(pierWidth, 0.08, 0.08), mats.timberWood);
    brace.position.set(0, 0.4, pz);
    group.add(brace);
  }

  // 2. Pier Boardwalk Planks (Sàn gỗ cầu tàu mộc mạc)
  const boardwalk = new THREE.Mesh(
    new THREE.BoxGeometry(pierWidth, 0.12, pierLength),
    mats.timberWood
  );
  boardwalk.position.set(0, pierDeckH, 0);
  boardwalk.receiveShadow = true;
  group.add(boardwalk);

  // 3. Mooring Bollards with Coiled Ropes (Cọc buộc thuyền & cuộn dây thừng)
  [-pierLength / 2 + 0.8, pierLength / 2 - 0.8].forEach(bz => {
    [-pierWidth / 2 + 0.12, pierWidth / 2 - 0.12].forEach(bx => {
      const bollard = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.45, 8), mats.agedWood);
      bollard.position.set(bx, pierDeckH + 0.22, bz);
      group.add(bollard);

      // Coiled hemp rope around bollard
      const rope = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 4, 12), mats.timberWood);
      rope.rotateX(Math.PI / 2);
      rope.position.set(bx, pierDeckH + 0.08, bz);
      group.add(rope);
    });
  });

  // 4. Ceramic Export Cargo Crates with Straw Cushioning (Thùng gỗ xuất khẩu bình gốm)
  [-0.4, 0.35].forEach((cx, ci) => {
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 0.65), mats.timberWood);
    crate.position.set(cx, pierDeckH + 0.275, -1.4 + ci * 0.8);
    crate.castShadow = true;
    group.add(crate);

    // Celadon vase peeking out of open crate
    const exportVase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.14, 0.38, 8),
      ci === 0 ? mats.jadeGlow : mats.whiteWall
    );
    exportVase.position.set(cx, pierDeckH + 0.62, -1.4 + ci * 0.8);
    group.add(exportVase);
  });

  // 5. Drying Fishing Nets (Lưới đánh cá phơi nắng trên giàn tre)
  const netFrame = new THREE.Group();
  netFrame.position.set(-pierWidth / 2 + 0.15, pierDeckH, 1.2);

  const netPost1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 6), mats.bambooGreen);
  netPost1.position.set(0, 0.7, -0.7);
  netFrame.add(netPost1);

  const netPost2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 6), mats.bambooGreen);
  netPost2.position.set(0, 0.7, 0.7);
  netFrame.add(netPost2);

  const netBar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.5, 6), mats.bambooGreen);
  netBar.rotateX(Math.PI / 2);
  netBar.position.set(0, 1.35, 0);
  netFrame.add(netBar);

  // Woven netting drape (Lưới nâu gụ phơi nắng)
  const netCloth = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 0.9),
    new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.95,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    })
  );
  netCloth.position.set(0, 0.85, 0);
  netCloth.rotation.y = Math.PI / 2;
  netFrame.add(netCloth);
  group.add(netFrame);

  // 6. Pier Warning Beacon / Silk Lantern at dock end
  const beaconPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.8, 6), mats.timberWood);
  beaconPost.position.set(0, pierDeckH + 0.9, pierLength / 2 - 0.2);
  group.add(beaconPost);

  const dockLantern = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.24, 8), mats.lanternSilkYellow);
  dockLantern.position.set(0, pierDeckH + 1.8, pierLength / 2 - 0.2);
  group.add(dockLantern);

  return group;
}

/**
 * Jeju Basalt Prayer Stones (Bangsatap / Doltap) and Coastal Bonsai Pines
 */
export function createBasaltPrayerStonesAndFlora(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 1. Jeju Stepped Basalt Stone Tower (Tháp đá nguyện cầu Doltap đảo Jeju)
  const towerTiers = [
    { r: 0.85, h: 0.35, y: 0.175 },
    { r: 0.65, h: 0.3, y: 0.5 },
    { r: 0.45, h: 0.28, y: 0.79 },
    { r: 0.25, h: 0.22, y: 1.04 },
    { r: 0.12, h: 0.18, y: 1.24 }
  ];

  towerTiers.forEach(t => {
    const tier = new THREE.Mesh(new THREE.CylinderGeometry(t.r * 0.85, t.r, t.h, 7), mats.basaltRock);
    tier.position.y = t.y;
    tier.castShadow = true;
    group.add(tier);
  });

  // Top wishing pebble
  const topStone = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), mats.stoneStatue);
  topStone.position.y = 1.4;
  group.add(topStone);

  // 2. Coastal Cliffside Bonsai Pine (Tùng la hán bám đá)
  const pineTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 1.2, 7), mats.agedWood);
  pineTrunk.position.set(1.4, 0.55, 0.4);
  pineTrunk.rotation.z = -0.35;
  group.add(pineTrunk);

  // Tiered dark pine foliage pads
  [
    { x: 1.2, y: 1.0, z: 0.4, r: 0.45 },
    { x: 1.6, y: 1.25, z: 0.5, r: 0.55 },
    { x: 1.8, y: 1.45, z: 0.3, r: 0.38 }
  ].forEach(fp => {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(fp.r * 0.6, fp.r, 0.16, 7), mats.leafPine);
    pad.position.set(fp.x, fp.y, fp.z);
    group.add(pad);
  });

  return group;
}

// =========================================================================
// 6. QUẢNG TRƯỜNG ĐẠI LỄ: BUSTLING FESTIVAL CROWD, DRAGON DANCE & FOOD ELEMENTS
// =========================================================================

/**
 * Lively Festival Additions:
 * - Lion/Dragon Dance head stand & Great Festival War Drum (Trống Hội Thăng Long)
 * - Cheering crowd groups (villagers, children with pinwheels, festival-goers)
 * - Giant Steaming Pho Broth Cauldron on brick hearth
 * - Sugarcane Juice press cart & Hotteok sweet pancake griddle
 * - Overhead festive lantern garlands (Dây đèn hoa đăng chăng qua quảng trường)
 * - Royal Ceremonial Parasols (Lọng ngũ sắc)
 */
export function createFestivalCrowdAndLivelySquare(): {
  group: THREE.Group;
  animatedCrowd: { obj: THREE.Object3D; anim: 'cheer' | 'clap' | 'pinwheel' | 'drumstick' | 'bubble' }[];
} {
  const mats = getMaterials();
  const group = new THREE.Group();
  const animatedCrowd: { obj: THREE.Object3D; anim: 'cheer' | 'clap' | 'pinwheel' | 'drumstick' | 'bubble' }[] = [];

  const skinMat = new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.6 });
  const darkHairMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

  // -----------------------------------------------------------------
  // 1. ĐOÀN LÂN SƯ RỒNG & TRỐNG HỘI THĂNG LONG (Lion Dance Head & Great War Drum)
  // -----------------------------------------------------------------
  const lionStand = new THREE.Group();
  lionStand.position.set(0, 0, -6.5);

  // Red Lacquer Stage Plinth
  const stagePlinth = new THREE.Mesh(
    new THREE.CylinderGeometry(1.6, 1.8, 0.32, 12),
    mats.redLacquer
  );
  stagePlinth.position.y = 0.16;
  stagePlinth.castShadow = true;
  lionStand.add(stagePlinth);

  // Great Festival War Drum (Trống Hội Đại sơn son bọc da trâu viền đinh tán vàng)
  const drum = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.7, 0.95, 16),
    mats.redLacquer
  );
  drum.position.set(-0.6, 0.85, 0);
  drum.castShadow = true;
  lionStand.add(drum);

  // Drum leather heads (Mặt trống da trâu)
  [-0.48, 0.48].forEach(dy => {
    const drumSkin = new THREE.Mesh(new THREE.CylinderGeometry(0.71, 0.71, 0.04, 16), mats.timberWood);
    drumSkin.position.set(-0.6, 0.85 + dy, 0);
    lionStand.add(drumSkin);

    // Brass stud rim
    const studRim = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.02, 6, 16), mats.goldTrim);
    studRim.rotateX(Math.PI / 2);
    studRim.position.set(-0.6, 0.85 + dy, 0);
    lionStand.add(studRim);
  });

  // Heavy timber drum stand legs
  [-0.95, -0.25].forEach(lx => {
    [-0.4, 0.4].forEach(lz => {
      const dLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.7, 6), mats.timberWood);
      dLeg.position.set(lx, 0.35, lz);
      lionStand.add(dLeg);
    });
  });

  // Animated Drumsticks (Dùi trống hội nhấp nhô)
  const drumstick1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.5, 6), mats.goldTrim);
  drumstick1.position.set(-0.6, 1.45, 0.15);
  drumstick1.rotation.x = 0.4;
  lionStand.add(drumstick1);
  animatedCrowd.push({ obj: drumstick1, anim: 'drumstick' });

  // Imperial Lion Dance Head (Đầu Lân Rồng rực rỡ hoàng kim & chu sa)
  const lionHeadGroup = new THREE.Group();
  lionHeadGroup.position.set(0.65, 0.32, 0);

  // Display pedestal
  const lionPedestal = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.55, 0.75), mats.goldTrim);
  lionPedestal.position.y = 0.275;
  lionHeadGroup.add(lionPedestal);

  // Lion head helmet
  const lionMask = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 10), mats.redLacquer);
  lionMask.scale.set(1.1, 0.9, 1.0);
  lionMask.position.set(0, 0.85, 0);
  lionHeadGroup.add(lionMask);

  // Golden Horn / Mirror Finial (Sừng lân & gương bát quái trán lân)
  const lionHorn = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 8), mats.goldTrim);
  lionHorn.position.set(0, 1.25, 0.08);
  lionHeadGroup.add(lionHorn);

  const mirrorBrow = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.02, 10), mats.goldTrim);
  mirrorBrow.rotateX(Math.PI / 2.5);
  mirrorBrow.position.set(0, 1.05, 0.36);
  lionHeadGroup.add(mirrorBrow);

  // Bulging expressive eyes (Mắt lân chớp rực rỡ)
  [-0.18, 0.18].forEach(ex => {
    const eyeSocket = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), mats.goldTrim);
    eyeSocket.position.set(ex, 0.95, 0.32);
    lionHeadGroup.add(eyeSocket);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), mats.basaltRock);
    pupil.position.set(ex, 0.95, 0.39);
    lionHeadGroup.add(pupil);
  });

  // Furry silk beard / tongue drape (Râu lân lụa đỏ thắm)
  const beard = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.35, 0.06), mats.lanternSilkYellow);
  beard.position.set(0, 0.65, 0.3);
  lionHeadGroup.add(beard);

  lionStand.add(lionHeadGroup);
  group.add(lionStand);

  // -----------------------------------------------------------------
  // 2. KHÁN GIẢ TRẨY HỘI & TRẺ EM CẦM CHONG CHÓNG (Bustling Spectator Crowd)
  // -----------------------------------------------------------------
  // Group A: Left crowd near food stalls (Người dân hào hứng cổ vũ)
  const crowdLeft = new THREE.Group();
  crowdLeft.position.set(-5.2, 0, -3.2);

  // Person 1: Cheering spectator in cyan áo dài
  const person1 = new THREE.Group();
  person1.position.set(-0.4, 0, -0.3);
  const p1Robe = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.32, 0.95, 10), mats.dancheongEaves);
  p1Robe.position.y = 0.475;
  person1.add(p1Robe);
  const p1Head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), skinMat);
  p1Head.position.y = 1.1;
  person1.add(p1Head);
  const p1Hair = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 8), darkHairMat);
  p1Hair.position.y = 1.2;
  person1.add(p1Hair);
  crowdLeft.add(person1);
  animatedCrowd.push({ obj: person1, anim: 'cheer' });

  // Person 2: Happy child with spinning 5-color pinwheel (Em bé cầm chong chóng ngũ sắc)
  const child = new THREE.Group();
  child.position.set(0.4, 0, 0.2);
  const chRobe = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.24, 0.65, 8), mats.lanternLotusPink);
  chRobe.position.y = 0.325;
  child.add(chRobe);
  const chHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), skinMat);
  chHead.position.y = 0.78;
  child.add(chHead);
  // Top-knot bun (Chỏm tóc đào)
  const bun = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), darkHairMat);
  bun.position.y = 0.92;
  child.add(bun);

  // Pinwheel stick in child's hand
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.55, 4), mats.bambooGreen);
  stick.position.set(0.18, 0.65, 0.15);
  stick.rotation.z = -0.3;
  child.add(stick);

  // Spinning 4-blade colorful Pinwheel (Chong chóng xoay tít)
  const pinwheel = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.02), mats.goldTrim);
  pinwheel.position.set(0.26, 0.88, 0.15);
  child.add(pinwheel);
  animatedCrowd.push({ obj: pinwheel, anim: 'pinwheel' });

  crowdLeft.add(child);
  group.add(crowdLeft);

  // Group B: Right crowd enjoying festival music (Nhóm khán giả vỗ tay tán thưởng)
  const crowdRight = new THREE.Group();
  crowdRight.position.set(5.2, 0, -3.2);

  // Person 3: Woman in saffron Áo Dài holding silk handkerchief
  const person3 = new THREE.Group();
  person3.position.set(0.4, 0, -0.2);
  const p3Robe = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.34, 0.96, 10), mats.lanternSilkYellow);
  p3Robe.position.y = 0.48;
  person3.add(p3Robe);
  const p3Head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), skinMat);
  p3Head.position.y = 1.1;
  person3.add(p3Head);
  const p3Scarf = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 4, 12), mats.lanternLotusPink);
  p3Scarf.position.set(0, 1.05, 0);
  p3Scarf.rotateX(Math.PI / 2);
  person3.add(p3Scarf);
  crowdRight.add(person3);
  animatedCrowd.push({ obj: person3, anim: 'clap' });

  // Person 4: Korean scholar in white Hanbok enjoying the songs
  const person4 = new THREE.Group();
  person4.position.set(-0.35, 0, 0.3);
  const p4Robe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.36, 0.98, 10), mats.whiteWall);
  p4Robe.position.y = 0.49;
  person4.add(p4Robe);
  const p4Head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), skinMat);
  p4Head.position.y = 1.12;
  person4.add(p4Head);
  // Black Gat hat
  const gatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.02, 16), darkHairMat);
  gatBrim.position.y = 1.25;
  person4.add(gatBrim);
  const gatCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.18, 12), darkHairMat);
  gatCrown.position.y = 1.34;
  person4.add(gatCrown);
  crowdRight.add(person4);
  animatedCrowd.push({ obj: person4, anim: 'cheer' });

  group.add(crowdRight);

  // -----------------------------------------------------------------
  // 3. NỒI PHỞ KHỔNG LỒ NGHI NGÚT KHÓI & XE NƯỚC MÍA (Giant Pho Cauldron & Drinks)
  // -----------------------------------------------------------------
  const culinaryDelight = new THREE.Group();
  culinaryDelight.position.set(-7.5, 0, 2.4);

  // Brick Hearth Fireplace (Bếp gạch nung đỏ lửa)
  const hearth = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.72, 0.45, 12), mats.terracottaRoof);
  hearth.position.y = 0.225;
  culinaryDelight.add(hearth);

  // Glowing charcoal embers inside hearth
  const hearthGlow = new THREE.Mesh(
    new THREE.CircleGeometry(0.48, 10),
    new THREE.MeshBasicMaterial({ color: 0xf97316 })
  );
  hearthGlow.rotateX(-Math.PI / 2);
  hearthGlow.position.y = 0.46;
  culinaryDelight.add(hearthGlow);

  // Giant Iron / Copper Broth Cauldron (Nồi nước dùng phở thơm lừng)
  const cauldron = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.48, 0.7, 14), mats.bronzeRelic);
  cauldron.position.y = 0.75;
  cauldron.castShadow = true;
  culinaryDelight.add(cauldron);

  // Steaming aromatic broth surface
  const broth = new THREE.Mesh(
    new THREE.CircleGeometry(0.52, 12),
    new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.2 })
  );
  broth.rotateX(-Math.PI / 2);
  broth.position.y = 1.08;
  culinaryDelight.add(broth);

  // Rising steam wisps (Cột hơi nước phở ngào ngạt)
  const steamGroup = new THREE.Group();
  steamGroup.position.set(0, 1.25, 0);
  for (let si = 0; si < 3; si++) {
    const puff = new THREE.Mesh(
      new THREE.SphereGeometry(0.18 + si * 0.06, 6, 6),
      new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 - si * 0.12, roughness: 1.0 })
    );
    puff.position.set((si - 1) * 0.12, si * 0.22, 0);
    steamGroup.add(puff);
  }
  culinaryDelight.add(steamGroup);
  animatedCrowd.push({ obj: steamGroup, anim: 'bubble' });

  // Traditional Sugarcane Juice Cart (Xe nước mía ép tay với bó mía tím/xanh)
  const caneCart = new THREE.Group();
  caneCart.position.set(1.6, 0, 0);

  const cartBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.75, 0.8), mats.timberWood);
  cartBody.position.y = 0.45;
  caneCart.add(cartBody);

  // Hand crank wheel (Tay quay máy ép mía)
  const crank = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.02, 6, 12), mats.goldTrim);
  crank.position.set(0.62, 0.82, 0);
  crank.rotateY(Math.PI / 2);
  caneCart.add(crank);

  // Bundles of tall sugarcane stalks (Bó cây mía ngọt lịm)
  [-0.2, 0, 0.2].forEach(cz => {
    const caneStalk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 6), mats.bambooGreen);
    caneStalk.position.set(-0.35, 0.9, cz);
    caneCart.add(caneStalk);
  });
  culinaryDelight.add(caneCart);

  group.add(culinaryDelight);

  // -----------------------------------------------------------------
  // 4. CHẢO RÁN HOTTEOK HÀN QUỐC & BÀN CỖ LỄ HỘI (Hotteok Griddle & Feast Table)
  // -----------------------------------------------------------------
  const hotteokStand = new THREE.Group();
  hotteokStand.position.set(7.5, 0, 2.4);

  const griddleTable = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 0.9), mats.timberWood);
  griddleTable.position.y = 0.4;
  hotteokStand.add(griddleTable);

  // Sizzling flat cast iron griddle (Chảo gang rán bánh)
  const griddle = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 12), mats.basaltRock);
  griddle.position.set(-0.35, 0.83, 0);
  hotteokStand.add(griddle);

  // Golden Sweet Hotteok Pancakes (Bánh rán quế mật ong)
  [-0.15, 0.15].forEach(hx => {
    const hotteok = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.025, 8), mats.goldTrim);
    hotteok.position.set(-0.35 + hx, 0.87, 0);
    hotteokStand.add(hotteok);
  });

  // Stainless steel pancake press (Dụng cụ ấn bánh)
  const press = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.14, 8), mats.stoneStatue);
  press.position.set(-0.35, 0.92, 0.2);
  hotteokStand.add(press);

  // Sweet Honey & Cinnamon Bowl
  const honeyBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.1, 0.12, 8), mats.whiteWall);
  honeyBowl.position.set(0.4, 0.88, 0);
  hotteokStand.add(honeyBowl);

  group.add(hotteokStand);

  // -----------------------------------------------------------------
  // 5. HOÀNG LỌNG NGŨ SẮC & CỜ HỘI RỰC RỠ (Royal Parasols & Five-Color Festival Flags)
  // -----------------------------------------------------------------
  // Twin Royal Ceremonial Parasols (Lọng vàng kim tuyến che đàn tế)
  [-3.8, 3.8].forEach(lx => {
    const parasolGroup = new THREE.Group();
    parasolGroup.position.set(lx, 0, -5.2);

    // Tall Red Lacquered Pole
    const pPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 3.2, 8), mats.redLacquer);
    pPole.position.y = 1.6;
    pPole.castShadow = true;
    parasolGroup.add(pPole);

    // Multi-tier Embroidered Silk Canopy (Tán lọng vàng óng đính tua rua)
    const pCanopy = new THREE.Mesh(new THREE.ConeGeometry(0.85, 0.45, 12), mats.goldTrim);
    pCanopy.position.y = 3.1;
    parasolGroup.add(pCanopy);

    // Silk fringe tassels (Tua rua lụa đỏ quanh lọng)
    const tasselRim = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.04, 6, 16), mats.lanternSilkRed);
    tasselRim.rotateX(Math.PI / 2);
    tasselRim.position.y = 2.95;
    parasolGroup.add(tasselRim);

    // Golden Spear Finial (Đỉnh chóp búp sen kim loại)
    const finial = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 6), mats.goldTrim);
    finial.position.y = 3.42;
    parasolGroup.add(finial);

    group.add(parasolGroup);
  });

  // Tall 5-Color Festival Banners (Cờ ngũ sắc lễ hội phấp phới bốn góc)
  [
    [-6.8, -1.5, 0.2],
    [6.8, -1.5, -0.2],
    [-6.8, 4.5, 0.3],
    [6.8, 4.5, -0.3]
  ].forEach(([fx, fz, fRot]) => {
    const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 3.8, 6), mats.timberWood);
    flagPole.position.set(fx, 1.9, fz);
    flagPole.castShadow = true;
    group.add(flagPole);

    // 5-Color Square Banner Cloth (Viền răng cưa ngũ sắc)
    const banner = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 1.2, 0.85),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.6 })
    );
    banner.position.set(fx + 0.45, 3.0, fz);
    banner.rotation.y = fRot;
    group.add(banner);

    // Gold central square
    const bannerCenter = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.6, 0.45),
      mats.goldTrim
    );
    bannerCenter.position.set(fx + 0.45, 3.0, fz);
    bannerCenter.rotation.y = fRot;
    group.add(bannerCenter);
  });

  // -----------------------------------------------------------------
  // 6. DÂY ĐÈN LỒNG HOA ĐĂNG CHĂNG QUA QUẢNG TRƯỜNG (Overhead Lantern Garlands)
  // -----------------------------------------------------------------
  // Catenary overhead line spanning across the plaza with glowing lanterns
  for (let lx = -5.0; lx <= 5.0; lx += 1.4) {
    const catenaryY = 3.8 - Math.sin(((lx + 5.0) / 10.0) * Math.PI) * 0.45;
    const lColor = (Math.abs(Math.round(lx)) % 2 === 0) ? mats.lanternSilkRed : mats.lanternSilkYellow;

    // Silk lantern body
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.28, 8), lColor);
    lantern.position.set(lx, catenaryY, 0);
    group.add(lantern);

    // Hanging string
    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.25, 4), mats.timberWood);
    string.position.set(lx, catenaryY + 0.24, 0);
    group.add(string);

    // Bottom tassel
    const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 0.18, 6), mats.goldTrim);
    tassel.position.set(lx, catenaryY - 0.22, 0);
    group.add(tassel);
  }

  return { group, animatedCrowd };
}

// =========================================================================
// 7. BẢNG THÔNG TIN VĂN HÓA VIỆT - HÀN (Cultural Heritage Information Board)
// =========================================================================

/**
 * Traditional Cultural Heritage Information Board (Bảng Thông Tin Di Sản Văn Hóa Việt - Hàn)
 * Placed naturally on the ground in an open area with few props, without creating artificial land.
 * Features a carved stone pedestal base with lotus band, twin upright red lacquer timber pillars,
 * illuminated calligraphic parchment board with Vietnam & Korea cultural emblems,
 * and a traditional curved Giwa roof canopy with Dancheong painted eaves. (No floating icon).
 */
export function createCulturalInformationBoard(
  regionId: RegionId,
  themeData?: CulturalThemeOverview
): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();
  group.userData = { isInformationBoard: true, regionId };

  // Helper to attach userData to all descendants for reliable raycasting
  const markClickable = (obj: THREE.Object3D) => {
    obj.userData = { isInformationBoard: true, regionId };
    obj.traverse((child) => {
      child.userData = { isInformationBoard: true, regionId };
    });
  };

  const boardCenterZ = 0;

  // 1. Tiered Stone Pedestal Base (Bệ đá hoa sen đặt trực tiếp trên mặt đất)
  const baseSub = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.22, 0.8), mats.stonePier);
  baseSub.position.set(0, 0.11, boardCenterZ);
  baseSub.receiveShadow = true;
  group.add(baseSub);

  const baseTop = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.16, 0.7), mats.stonePier);
  baseTop.position.set(0, 0.3, boardCenterZ);
  baseTop.castShadow = true;
  group.add(baseTop);

  const lotusBand = new THREE.Mesh(new THREE.BoxGeometry(1.96, 0.06, 0.74), mats.goldTrim);
  lotusBand.position.set(0, 0.41, boardCenterZ);
  group.add(lotusBand);

  // 2. Twin Upright Timber Pillars (Đôi Cột Gỗ Sơn Son)
  const pillarHeight = 2.3;
  const pillarSpacing = 0.8;
  [-pillarSpacing, pillarSpacing].forEach((px) => {
    // Bronze collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.16, 8), mats.bronzeRelic);
    collar.position.set(px, 0.51, boardCenterZ);
    group.add(collar);

    // Main column
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, pillarHeight, 8), mats.redLacquer);
    column.position.set(px, 0.44 + pillarHeight / 2, boardCenterZ);
    column.castShadow = true;
    group.add(column);

    // Decorative side brackets
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, 0.25), mats.timberWood);
    bracket.position.set(px, 2.25, boardCenterZ + 0.08);
    group.add(bracket);

    // Side hanging lantern arm
    const lanternArm = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.25, 6), mats.bronzeRelic);
    lanternArm.position.set(px + (px > 0 ? 0.18 : -0.18), 2.15, boardCenterZ);
    lanternArm.rotation.z = px > 0 ? -Math.PI / 4 : Math.PI / 4;
    group.add(lanternArm);

    // Miniature hanging silk lantern
    const lanternMat = px > 0 ? mats.lanternSilkYellow : mats.lanternSilkRed;
    const miniLantern = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.16, 8), lanternMat);
    miniLantern.position.set(px + (px > 0 ? 0.28 : -0.28), 1.95, boardCenterZ);
    group.add(miniLantern);
  });

  // 3. Horizontal Tie Beams
  const bottomBeam = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.1, 0.14), mats.redLacquer);
  bottomBeam.position.set(0, 0.72, boardCenterZ);
  group.add(bottomBeam);

  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.14, 0.16), mats.redLacquer);
  topBeam.position.set(0, 2.38, boardCenterZ);
  group.add(topBeam);

  // 4. The Display Board Panel (Tấm Biển Khắc Chữ & Biểu Trưng)
  const boardWidth = 1.44;
  const boardHeight = 1.42;
  const boardCenterY = 1.55;

  // Outer gold frame
  const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(boardWidth + 0.1, boardHeight + 0.1, 0.08), mats.goldTrim);
  boardFrame.position.set(0, boardCenterY, boardCenterZ);
  group.add(boardFrame);

  // Inner dark wood
  const backboard = new THREE.Mesh(new THREE.BoxGeometry(boardWidth, boardHeight, 0.07), mats.agedWood);
  backboard.position.set(0, boardCenterY, boardCenterZ);
  group.add(backboard);

  // Parchment surface
  const canvasMesh = new THREE.Mesh(new THREE.PlaneGeometry(boardWidth - 0.06, boardHeight - 0.06), mats.whiteWall);
  canvasMesh.position.set(0, boardCenterY, boardCenterZ + 0.04);
  group.add(canvasMesh);

  // Cultural Header Plate
  const headerPlaque = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.2, 0.05), mats.redLacquer);
  headerPlaque.position.set(0, 2.08, boardCenterZ + 0.055);
  group.add(headerPlaque);

  const plaqueGoldBorder = new THREE.Mesh(new THREE.BoxGeometry(1.29, 0.22, 0.02), mats.goldTrim);
  plaqueGoldBorder.position.set(0, 2.08, boardCenterZ + 0.045);
  group.add(plaqueGoldBorder);

  // Dual Emblems: Vietnam Lotus on left, Korea Taeguk on right
  const vnEmblem = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.025, 16), mats.lanternSilkRed);
  vnEmblem.rotation.x = Math.PI / 2;
  vnEmblem.position.set(-0.32, 1.76, boardCenterZ + 0.06);
  group.add(vnEmblem);

  const vnEmblemInner = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.035, 8), mats.goldTrim);
  vnEmblemInner.rotation.x = Math.PI / 2;
  vnEmblemInner.position.set(-0.32, 1.76, boardCenterZ + 0.065);
  group.add(vnEmblemInner);

  const krEmblem = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.025, 16), mats.dancheongEaves);
  krEmblem.rotation.x = Math.PI / 2;
  krEmblem.position.set(0.32, 1.76, boardCenterZ + 0.06);
  group.add(krEmblem);

  const krEmblemInner = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.035, 8), mats.jadeGlow);
  krEmblemInner.rotation.x = Math.PI / 2;
  krEmblemInner.position.set(0.32, 1.76, boardCenterZ + 0.065);
  group.add(krEmblemInner);

  const harmonyKnot = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.018, 6, 16), mats.goldTrim);
  harmonyKnot.position.set(0, 1.76, boardCenterZ + 0.06);
  group.add(harmonyKnot);

  // Inscribed calligraphic text lines
  [-0.08, -0.25, -0.42, -0.58].forEach((lineY, idx) => {
    const lineVn = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.03, 0.012), idx === 0 ? mats.redLacquer : mats.agedWood);
    lineVn.position.set(-0.32, 1.76 + lineY, boardCenterZ + 0.055);
    group.add(lineVn);

    const lineKr = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.03, 0.012), idx === 0 ? mats.dancheongEaves : mats.agedWood);
    lineKr.position.set(0.32, 1.76 + lineY, boardCenterZ + 0.055);
    group.add(lineKr);
  });

  // Royal seal stamp
  const royalSeal = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.015), mats.lanternSilkRed);
  royalSeal.position.set(0, 0.98, boardCenterZ + 0.055);
  group.add(royalSeal);

  // 5. Traditional Tiled Roof Canopy
  const roofGroup = new THREE.Group();
  roofGroup.position.set(0, 2.45, boardCenterZ);

  // Eaves beam with Dancheong pattern
  const eaveBeam = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 0.45), mats.dancheongEaves);
  roofGroup.add(eaveBeam);

  // Main curved Giwa roof slope
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.3, 0.5, 4), mats.giwaRoof);
  roof.scale.set(1.6, 0.65, 0.7);
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 0.32;
  roof.castShadow = true;
  roofGroup.add(roof);

  // Ridge tile cap
  const ridge = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.07, 0.12), mats.terracottaRoof);
  ridge.position.y = 0.5;
  roofGroup.add(ridge);

  // Traditional golden finials on roof ridge ends
  [-1.05, 1.05].forEach((rx) => {
    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.05, 0.15, 6), mats.goldTrim);
    finial.position.set(rx, 0.56, 0);
    roofGroup.add(finial);
  });

  group.add(roofGroup);

  // Soft ambient lantern point light illuminating the signpost
  const warmLight = new THREE.PointLight(0xfef08a, 0.8, 4.5);
  warmLight.position.set(0, 1.7, boardCenterZ + 0.5);
  group.add(warmLight);

  // 6. Glowing Cyan Interactive Ground Circle Surrounding the Information Board
  // (Vòng tròn sáng bao bọc xung quanh bảng thông tin bằng màu xanh cyan sáng nổi bật)
  const glowRingGroup = new THREE.Group();
  glowRingGroup.name = 'glowRing';
  glowRingGroup.position.set(0, 0.04, boardCenterZ);

  const cyanBright = 0x00f0ff; // Vibrant electric cyan
  const cyanCore = 0x67e8f9;   // Luminous bright cyan
  const cyanDeep = 0x0891b2;   // Deep neon cyan
  const cyanWhite = 0xe0f2fe;  // Bright crystal cyan-white

  // Primary luminous ground ring in vivid bright cyan
  const ringGeo1 = new THREE.RingGeometry(1.82, 2.15, 64);
  ringGeo1.rotateX(-Math.PI / 2);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: cyanBright,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
  glowRingGroup.add(ringMesh1);

  // Concentric bright inner ring in electric cyan-white
  const ringGeoInner = new THREE.RingGeometry(1.68, 1.76, 64);
  ringGeoInner.rotateX(-Math.PI / 2);
  const ringMatInner = new THREE.MeshBasicMaterial({
    color: cyanWhite,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const ringMeshInner = new THREE.Mesh(ringGeoInner, ringMatInner);
  glowRingGroup.add(ringMeshInner);

  // Secondary outer pulsating halo ring in cyan deep
  const ringGeo2 = new THREE.RingGeometry(2.32, 2.45, 64);
  ringGeo2.rotateX(-Math.PI / 2);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: cyanDeep,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
  glowRingGroup.add(ringMesh2);

  // Soft translucent floor aura disk in glowing cyan
  const diskGeo = new THREE.RingGeometry(0.2, 1.68, 48);
  diskGeo.rotateX(-Math.PI / 2);
  const diskMat = new THREE.MeshBasicMaterial({
    color: cyanCore,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const diskMesh = new THREE.Mesh(diskGeo, diskMat);
  glowRingGroup.add(diskMesh);

  // 4 Radiant Cardinal Glyphs / Gems in cyan-white
  const gemGeo = new THREE.OctahedronGeometry(0.13);
  const gemMat = new THREE.MeshBasicMaterial({
    color: cyanWhite,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });
  [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((angle) => {
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(Math.cos(angle) * 1.98, 0.06, Math.sin(angle) * 1.98);
    gem.rotation.y = angle;
    glowRingGroup.add(gem);
  });

  // 8 Concentric Orbit Pips in cyan
  const pipGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 8);
  const pipMat = new THREE.MeshBasicMaterial({
    color: cyanCore,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending
  });
  for (let i = 0; i < 8; i++) {
    const ang = (i * Math.PI) / 4 + Math.PI / 8;
    const pip = new THREE.Mesh(pipGeo, pipMat);
    pip.position.set(Math.cos(ang) * 1.98, 0.04, Math.sin(ang) * 1.98);
    glowRingGroup.add(pip);
  }

  // Ground ambient interactive point light in bright cyan
  const ringPointLight = new THREE.PointLight(cyanBright, 1.5, 6.0);
  ringPointLight.position.set(0, 0.5, 0);
  glowRingGroup.add(ringPointLight);

  group.add(glowRingGroup);

  // 7. Floating Inverted Triangle Marker Above Information Board (Màu xanh cyan sáng nổi bật)
  const invertedTriangleGroup = new THREE.Group();
  invertedTriangleGroup.name = 'invertedTriangle';
  invertedTriangleGroup.position.set(0, 3.55, boardCenterZ);

  // Inverted triangle shape (flat top, pointing down at the bottom)
  const triShape = new THREE.Shape();
  const halfW = 0.38;
  const topY = 0.28;
  const botY = -0.34;
  triShape.moveTo(-halfW, topY);
  triShape.lineTo(halfW, topY);
  triShape.lineTo(0, botY);
  triShape.closePath();

  const extrudeSettings = {
    depth: 0.09,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03
  };
  const triGeo = new THREE.ExtrudeGeometry(triShape, extrudeSettings);
  triGeo.center();

  // Outer beveled prism in vivid electric cyan
  const triMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0x0891b2,
    emissiveIntensity: 0.85
  });
  const triMesh = new THREE.Mesh(triGeo, triMat);
  triMesh.castShadow = true;
  invertedTriangleGroup.add(triMesh);

  // Inner glowing cyan triangle faces on both front and back
  const innerShape = new THREE.Shape();
  const inW = halfW * 0.68;
  const inTop = topY * 0.68;
  const inBot = botY * 0.68;
  innerShape.moveTo(-inW, inTop);
  innerShape.lineTo(inW, inTop);
  innerShape.lineTo(0, inBot);
  innerShape.closePath();

  const innerGeo = new THREE.ShapeGeometry(innerShape);
  innerGeo.center();
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95
  });

  const innerFront = new THREE.Mesh(innerGeo, innerMat);
  innerFront.position.z = 0.075;
  invertedTriangleGroup.add(innerFront);

  const innerBack = new THREE.Mesh(innerGeo, innerMat);
  innerBack.position.z = -0.075;
  invertedTriangleGroup.add(innerBack);

  // Glowing diamond finial right above the top base of the inverted triangle
  const topGem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.09),
    new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.98 })
  );
  topGem.position.y = 0.40;
  invertedTriangleGroup.add(topGem);

  // Soft radiant cyan point light centered on the inverted triangle
  const triLight = new THREE.PointLight(cyanBright, 1.4, 4.5);
  invertedTriangleGroup.add(triLight);

  group.add(invertedTriangleGroup);

  // Ensure all objects in group have userData for raycasting
  markClickable(group);

  return group;
}

// ============================================================================
// REGION 8: SYNTHESIZED CULTURAL EXHIBITS ON CROWN SANCTUARY ISLAND
// (Vương Đảo Hòa Hợp Văn Hóa - Kết tinh di sản 7 vùng đất Việt - Hàn)
// ============================================================================

/**
 * 1. Highlands Agriculture & Fermentation Synthesis Exhibit
 * (Nông Nghiệp Lúa Nước & Chum Sành - Onggi)
 */
export function createHighlandsSynthesisExhibit(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Tiered Doldam Stone Platform
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.32, 2.2), mats.stonePier);
  plinth.position.y = 0.16;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Traditional Vietnamese Glazed Earthenware Jars (Chum Sành Đại Việt)
  const jarCoords = [
    { x: -0.65, z: -0.45, r: 0.32, h: 0.72, color: 0x854d0e },
    { x: -0.75, z: 0.35, r: 0.28, h: 0.62, color: 0x78350f },
    { x: -0.15, z: 0.55, r: 0.24, h: 0.52, color: 0x92400e }
  ];

  jarCoords.forEach(j => {
    const jarMat = new THREE.MeshStandardMaterial({ color: j.color, roughness: 0.55, metalness: 0.15 });
    const jarBody = new THREE.Mesh(new THREE.SphereGeometry(j.r, 12, 10), jarMat);
    jarBody.scale.set(1.0, 1.25, 1.0);
    jarBody.position.set(j.x, 0.32 + j.h * 0.55, j.z);
    jarBody.castShadow = true;
    group.add(jarBody);

    // Flared Jar Rim & Earthenware Lid
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(j.r * 0.75, j.r * 0.9, 0.08, 12), mats.terracottaRoof);
    lid.position.set(j.x, 0.32 + j.h * 1.05, j.z);
    lid.castShadow = true;
    group.add(lid);
  });

  // Korean Onggi Fermentation Jars with Dark Clay Glaze (Hũ Onggi)
  const onggiCoords = [
    { x: 0.55, z: -0.4, r: 0.34, h: 0.76 },
    { x: 0.68, z: 0.32, r: 0.26, h: 0.58 }
  ];
  onggiCoords.forEach(o => {
    const onggiMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.45, metalness: 0.2 });
    const onggiBody = new THREE.Mesh(new THREE.SphereGeometry(o.r, 14, 10), onggiMat);
    onggiBody.scale.set(1.1, 1.3, 1.1);
    onggiBody.position.set(o.x, 0.32 + o.h * 0.52, o.z);
    onggiBody.castShadow = true;
    group.add(onggiBody);

    const onggiLid = new THREE.Mesh(new THREE.CylinderGeometry(o.r * 0.85, o.r * 0.98, 0.09, 12), mats.giwaRoof);
    onggiLid.position.set(o.x, 0.32 + o.h * 1.02, o.z);
    onggiLid.castShadow = true;
    group.add(onggiLid);
  });

  // Golden Ripe Rice Sheaves (Bó lúa vàng trĩu hạt)
  const riceCoords = [
    { x: -0.1, z: -0.55, rot: 0.1 },
    { x: 0.25, z: -0.15, rot: -0.15 }
  ];
  const goldRiceMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.7, metalness: 0.1 });
  riceCoords.forEach(rc => {
    const bundleBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 0.55, 8), goldRiceMat);
    bundleBase.position.set(rc.x, 0.32 + 0.28, rc.z);
    bundleBase.rotation.z = rc.rot;
    bundleBase.castShadow = true;
    group.add(bundleBase);

    // Flared drooping rice ears
    for (let e = 0; e < 6; e++) {
      const eAngle = (e * Math.PI * 2) / 6;
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.4, 5), goldRiceMat);
      ear.position.set(
        rc.x + Math.cos(eAngle) * 0.15,
        0.32 + 0.58,
        rc.z + Math.sin(eAngle) * 0.15
      );
      ear.rotation.set(Math.cos(eAngle) * 0.4, 0, Math.sin(eAngle) * 0.4);
      ear.castShadow = true;
      group.add(ear);
    }
  });

  // Bamboo Water Flume & Stone Rice Mortar (Máng tre & Cối giã gạo)
  const mortar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.32, 10), mats.stoneStatue);
  mortar.position.set(0.15, 0.32 + 0.16, 0.55);
  mortar.castShadow = true;
  group.add(mortar);

  const bambooPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 6), mats.bambooGreen);
  bambooPipe.rotation.z = Math.PI / 4;
  bambooPipe.position.set(-0.25, 0.32 + 0.42, 0.2);
  group.add(bambooPipe);

  // Exhibit Stone Label Plaque
  const plaqueStand = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 0.12), mats.stoneStatue);
  plaqueStand.position.set(0, 0.32 + 0.22, 1.15);
  plaqueStand.castShadow = true;
  group.add(plaqueStand);

  const plaqueGold = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.36, 0.04), mats.goldTrim);
  plaqueGold.position.set(0, 0.32 + 0.24, 1.21);
  group.add(plaqueGold);

  return group;
}

/**
 * 2. Scholar Confucianism & Doctorate Stele Synthesis Exhibit
 * (Đạo Học Văn Miếu & Viện Nho Học Seowon)
 */
export function createScholarSynthesisExhibit(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Tiered Granite Platform
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.32, 2.2), mats.stonePier);
  plinth.position.y = 0.16;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Doctor Turtle Stele (Bia Rùa Tiến Sĩ Văn Miếu)
  const steleGroup = createScholarTurtleStele();
  steleGroup.position.set(-0.45, 0.32, -0.2);
  steleGroup.scale.set(1.0, 1.0, 1.0);
  group.add(steleGroup);

  // Wooden Scholar Calligraphy Study Table (Bàn học Nho sĩ)
  const desk = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 0.65), mats.timberWood);
  desk.position.set(0.65, 0.32 + 0.38, -0.1);
  desk.castShadow = true;
  group.add(desk);

  // 4 Table Legs
  [-0.42, 0.42].forEach(dx => {
    [-0.22, 0.22].forEach(dz => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.08), mats.agedWood);
      leg.position.set(0.65 + dx, 0.32 + 0.19, -0.1 + dz);
      leg.castShadow = true;
      group.add(leg);
    });
  });

  // Calligraphy Inkstone (Nghiên Mực Đá) & Squirrel-hair Brush
  const inkstone = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.16), mats.basaltRock);
  inkstone.position.set(0.42, 0.32 + 0.45, -0.1);
  group.add(inkstone);

  const brush = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 6), mats.agedWood);
  brush.rotation.z = Math.PI / 2;
  brush.position.set(0.42, 0.32 + 0.48, 0.04);
  group.add(brush);

  // Open Hanji/Dó Parchment Scroll with Golden Verses
  const scroll = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.02, 0.35), mats.whiteWall);
  scroll.position.set(0.82, 0.32 + 0.44, -0.1);
  group.add(scroll);

  const textDecal = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.022, 0.28), mats.goldTrim);
  textDecal.position.set(0.82, 0.32 + 0.445, -0.1);
  group.add(textDecal);

  // Slender Golden Bamboo Grove (Trúc Vàng Damyang & Yên Tử)
  const bambooCoords = [
    { x: -0.9, z: 0.65, h: 2.2 },
    { x: -0.65, z: 0.78, h: 2.6 },
    { x: 0.95, z: 0.72, h: 2.4 }
  ];
  bambooCoords.forEach(b => {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, b.h, 6), mats.bambooGreen);
    stem.position.set(b.x, 0.32 + b.h / 2, b.z);
    stem.castShadow = true;
    group.add(stem);

    // Golden nodal rings
    for (let ny = 0.3; ny < b.h; ny += 0.4) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.046, 0.008, 4, 8), mats.goldTrim);
      ring.rotateX(Math.PI / 2);
      ring.position.set(b.x, 0.32 + ny, b.z);
      group.add(ring);
    }
  });

  // Plaque Stand
  const plaqueStand = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 0.12), mats.stoneStatue);
  plaqueStand.position.set(0, 0.32 + 0.22, 1.15);
  plaqueStand.castShadow = true;
  group.add(plaqueStand);

  const plaqueGold = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.36, 0.04), mats.goldTrim);
  plaqueGold.position.set(0, 0.32 + 0.24, 1.21);
  group.add(plaqueGold);

  return group;
}

/**
 * 3. Folk Festivals, Five-Element Banners & Traditional Attire Exhibit
 * (Lễ Hội Dân Gian, Cờ Ngũ Sắc & Nón Quai Thao / Quạt Múa Buchaechum)
 */
export function createFestivalAttireSynthesisExhibit(side: 'left' | 'right'): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Granite Pedestal Base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 0.35, 12), mats.stonePier);
  base.position.y = 0.175;
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  // Five-Element Sacred Festival Banner Pole (Cột Cờ Ngũ Sắc Thần)
  const bannerPole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 3.8, 8), mats.redLacquer);
  bannerPole.position.set(-0.35, 0.35 + 1.9, 0);
  bannerPole.castShadow = true;
  group.add(bannerPole);

  const finial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 8), mats.goldTrim);
  finial.position.set(-0.35, 0.35 + 3.85, 0);
  group.add(finial);

  // Tiered Five-Element Silk Banner Flag (Cờ Thần Răng Cưa Ngũ Hành)
  const flagFrame = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.95, 1.05), mats.lanternSilkRed);
  flagFrame.position.set(-0.35, 0.35 + 3.1, 0.55);
  group.add(flagFrame);

  const flagYellowInner = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.65, 0.75), mats.lanternSilkYellow);
  flagYellowInner.position.set(-0.35, 0.35 + 3.1, 0.55);
  group.add(flagYellowInner);

  const flagGreenCore = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.35, 0.42), mats.bambooGreen);
  flagGreenCore.position.set(-0.35, 0.35 + 3.1, 0.55);
  group.add(flagGreenCore);

  // Lacquered Display Stand for Attire / Heritage Accessory
  const standColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.2, 8), mats.redLacquer);
  standColumn.position.set(0.25, 0.35 + 0.6, 0);
  standColumn.castShadow = true;
  group.add(standColumn);

  const standTop = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.08, 12), mats.goldTrim);
  standTop.position.set(0.25, 0.35 + 1.22, 0);
  group.add(standTop);

  if (side === 'left') {
    // VIETNAMESE NÓN QUAI THAO (Broad Palm Conical Hat with Silk Ribbons)
    const hatDome = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.08, 24), mats.timberWood);
    hatDome.position.set(0.25, 0.35 + 1.3, 0);
    hatDome.castShadow = true;
    group.add(hatDome);

    const hatBrim = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.03, 6, 24), mats.goldTrim);
    hatBrim.rotateX(Math.PI / 2);
    hatBrim.position.set(0.25, 0.35 + 1.28, 0);
    group.add(hatBrim);

    // Pink & Purple Silk Ribbon Straps (Quai Thao Lụa Đào)
    [-0.15, 0.15].forEach(rx => {
      const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.65, 0.015), mats.lanternLotusPink);
      ribbon.position.set(0.25 + rx, 0.35 + 0.95, 0);
      group.add(ribbon);
    });
  } else {
    // KOREAN BUCHAECHUM FAN DANCE (Múa Quạt Hoa Bướm Triều Tiên)
    // Paired open silk folding fans with floral peony painted motifs
    const fanMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0.4,
      metalness: 0.1
    });

    [-0.2, 0.2].forEach(fx => {
      const fanGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.02, 16, 1, false, 0, Math.PI * 0.7);
      const fanMesh = new THREE.Mesh(fanGeo, fanMat);
      fanMesh.position.set(0.25 + fx, 0.35 + 1.45, 0);
      fanMesh.rotation.x = Math.PI / 2;
      fanMesh.rotation.z = fx > 0 ? 0.3 : -0.3;
      fanMesh.castShadow = true;
      group.add(fanMesh);

      // Fan handle with silk tassel
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 6), mats.agedWood);
      handle.position.set(0.25 + fx, 0.35 + 1.3, 0);
      group.add(handle);

      const tassel = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.14, 6), mats.lanternSilkYellow);
      tassel.position.set(0.25 + fx, 0.35 + 1.18, 0);
      group.add(tassel);
    });
  }

  return group;
}

/**
 * 4. Imperial Lý Dynasty Coiled Golden Dragon Monument
 * (Đại Tượng Rồng Vàng Đại Việt Thời Lý - Cương Nhu Hòa Hợp)
 */
export function createLyDynastyGoldenDragon(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Tiered White Marble Lotus Pedestal
  const plinth1 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.35, 8), mats.whiteWall);
  plinth1.position.y = 0.175;
  plinth1.castShadow = true;
  plinth1.receiveShadow = true;
  group.add(plinth1);

  const plinth2 = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.3, 0.28, 8), mats.whiteWall);
  plinth2.position.y = 0.35 + 0.14;
  plinth2.castShadow = true;
  group.add(plinth2);

  // Lotus Petals encircling pedestal
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const petal = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.38, 5), mats.lanternLotusPink);
    petal.position.set(Math.cos(angle) * 1.05, 0.62, Math.sin(angle) * 1.05);
    petal.rotation.y = angle;
    petal.rotation.x = 0.35;
    group.add(petal);
  }

  // Sinuous, Slender Lý-Era Golden Dragon Body (Thân Rồng Hình Sin Uốn Khúc Mềm Mại)
  const dragonMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.25,
    metalness: 0.85,
    emissive: 0xd97706,
    emissiveIntensity: 0.35
  });

  const numLoops = 12;
  const loopRadius = 0.55;
  for (let s = 0; s < numLoops; s++) {
    const t = s / (numLoops - 1);
    const theta = t * Math.PI * 2.8;
    const sx = Math.cos(theta) * loopRadius * (1 - t * 0.35);
    const sz = Math.sin(theta) * loopRadius * (1 - t * 0.35);
    const sy = 0.68 + Math.sin(t * Math.PI * 3.2) * 0.35 + t * 0.95;

    const segR = 0.18 * (1 - t * 0.45);
    const seg = new THREE.Mesh(new THREE.SphereGeometry(segR, 10, 8), dragonMat);
    seg.position.set(sx, sy, sz);
    seg.castShadow = true;
    group.add(seg);

    // Golden dorsal fins along spine
    const fin = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 4), mats.goldTrim);
    fin.position.set(sx, sy + segR + 0.06, sz);
    fin.rotation.z = 0.2;
    group.add(fin);
  }

  // Majestic Lý Dragon Head with Flowing Moustache & Antlers
  const headGroup = new THREE.Group();
  headGroup.position.set(0.35, 1.95, 0.2);

  const headMain = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.32, 0.55), dragonMat);
  headGroup.add(headMain);

  // Snout & open jaw
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.35), mats.goldTrim);
  snout.position.set(0, -0.05, 0.38);
  headGroup.add(snout);

  // Sacred Flaming Pearl in mouth (Ngọc Minh Châu Bất Diệt)
  const pearl = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 12, 10),
    new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.1,
      metalness: 0.4,
      emissive: 0x059669,
      emissiveIntensity: 0.8
    })
  );
  pearl.position.set(0, -0.05, 0.62);
  headGroup.add(pearl);

  // Pearl flame halo
  const flame = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.18),
    new THREE.MeshBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.85 })
  );
  flame.position.set(0, -0.05, 0.62);
  headGroup.add(flame);

  // Flowing dragon antlers & mane
  [-0.14, 0.14].forEach(hx => {
    const horn = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.05, 0.48, 6), mats.goldTrim);
    horn.position.set(hx, 0.28, -0.15);
    horn.rotation.x = -0.55;
    headGroup.add(horn);

    const whisker = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 4), mats.goldTrim);
    whisker.position.set(hx * 1.5, -0.12, 0.45);
    whisker.rotation.z = hx > 0 ? 0.6 : -0.6;
    headGroup.add(whisker);
  });

  group.add(headGroup);

  // Golden Glow Point Light
  const glowLight = new THREE.PointLight(0xf59e0b, 2.2, 6.0);
  glowLight.position.set(0, 1.8, 0.2);
  group.add(glowLight);

  return group;
}

/**
 * 5. Baekdusan Sacred White Tiger Guardian Monument
 * (Đại Tượng Thần Thú Bạch Hổ Triều Tiên - Hộ Quốc An Dân)
 */
export function createBaekduWhiteTiger(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Tiered Granite Pedestal with Dancheong Cloud Relief
  const plinth1 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.35, 8), mats.stonePier);
  plinth1.position.y = 0.175;
  plinth1.castShadow = true;
  plinth1.receiveShadow = true;
  group.add(plinth1);

  const plinth2 = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.3, 0.28, 8), mats.stoneStatue);
  plinth2.position.y = 0.35 + 0.14;
  plinth2.castShadow = true;
  group.add(plinth2);

  // Dancheong Cloud border
  const cloudRing = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.06, 6, 24), mats.dancheongEaves);
  cloudRing.rotateX(Math.PI / 2);
  cloudRing.position.y = 0.64;
  group.add(cloudRing);

  // Majestic White Tiger Sculpture (Tượng Bạch Hổ Oai Vệ)
  const tigerMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.35,
    metalness: 0.15
  });
  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.6,
    metalness: 0.1
  });

  // Seated Torso & Shoulders
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.15, 0.72), tigerMat);
  torso.position.set(0, 0.64 + 0.65, 0);
  torso.castShadow = true;
  group.add(torso);

  // Black Guardian Tiger Stripes across flanks
  [-0.22, 0.05, 0.32].forEach(sy => {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.06, 0.74), stripeMat);
    stripe.position.set(0, 0.64 + 0.65 + sy, 0);
    group.add(stripe);
  });

  // Front Paws resting on base
  [-0.26, 0.26].forEach(px => {
    const paw = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.55, 0.35), tigerMat);
    paw.position.set(px, 0.64 + 0.28, 0.32);
    paw.castShadow = true;
    group.add(paw);
  });

  // Noble Tiger Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.62, 0.65), tigerMat);
  head.position.set(0, 0.64 + 1.35, 0.12);
  head.castShadow = true;
  group.add(head);

  // Tiger Snout & Whiskers
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.26, 0.34), mats.whiteWall);
  snout.position.set(0, 0.64 + 1.25, 0.44);
  group.add(snout);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.08), stripeMat);
  nose.position.set(0, 0.64 + 1.32, 0.61);
  group.add(nose);

  // Ears
  [-0.24, 0.24].forEach(ex => {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.24, 5), tigerMat);
    ear.position.set(ex, 0.64 + 1.72, 0.08);
    group.add(ear);

    // Inner ear dark marking
    const earInner = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 5), stripeMat);
    earInner.position.set(ex, 0.64 + 1.72, 0.11);
    group.add(earInner);
  });

  // Character "King" (王) Mark on forehead in Gold
  const wangMark = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.03), mats.goldTrim);
  wangMark.position.set(0, 0.64 + 1.52, 0.45);
  group.add(wangMark);

  // Arched Tail curled elegantly around base
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 1.1, 8), tigerMat);
  tail.position.set(0.35, 0.64 + 0.65, -0.42);
  tail.rotation.x = -0.6;
  tail.rotation.z = 0.4;
  group.add(tail);

  // Celestial Jade Collar
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 6, 16), mats.jadeGlow);
  collar.rotateX(Math.PI / 2);
  collar.position.set(0, 0.64 + 1.05, 0.1);
  group.add(collar);

  // Cool Celestial Light
  const whiteLight = new THREE.PointLight(0xe0f2fe, 2.0, 6.0);
  whiteLight.position.set(0, 1.8, 0.2);
  group.add(whiteLight);

  return group;
}

/**
 * 6. Imperial Court Music & Đông Sơn Bronze Drum Exhibit
 * (Nhã Nhạc & Trống Đồng Đông Sơn)
 */
export function createDongSonBronzeDrumExhibit(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Octagonal Carved Teakwood Stand
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.3, 0.35, 8), mats.agedWood);
  plinth.position.y = 0.175;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Authentic Đông Sơn Drum Geometry (Thân trống đồng Đông Sơn)
  const drumGroup = new THREE.Group();
  drumGroup.position.y = 0.35;

  // Drum base foot
  const baseFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.88, 0.32, 24), mats.bronzeRelic);
  baseFoot.position.y = 0.16;
  baseFoot.castShadow = true;
  drumGroup.add(baseFoot);

  // Hollow waist (Lưng trống thon)
  const waist = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.42, 24), mats.bronzeRelic);
  waist.position.y = 0.32 + 0.21;
  waist.castShadow = true;
  drumGroup.add(waist);

  // Flared mantle (Tang trống nở rộng)
  const mantle = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.72, 0.34, 24), mats.bronzeRelic);
  mantle.position.y = 0.32 + 0.42 + 0.17;
  mantle.castShadow = true;
  drumGroup.add(mantle);

  // Flat Tympanum Top (Mặt Trống Đồng)
  const tympanum = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.06, 24), mats.bronzeRelic);
  tympanum.position.y = 0.32 + 0.42 + 0.34 + 0.03;
  tympanum.castShadow = true;
  drumGroup.add(tympanum);

  // Central 14-Point Solar Sunburst Star (Mặt trời 14 tia sáng)
  const sunCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.07, 14), mats.goldTrim);
  sunCenter.position.y = 0.32 + 0.42 + 0.34 + 0.04;
  drumGroup.add(sunCenter);

  // Concentric decorative gold rings with stylized flying Chim Lạc motifs
  [0.45, 0.68, 0.82].forEach(r => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.018, 4, 32), mats.goldTrim);
    ring.rotateX(Math.PI / 2);
    ring.position.y = 0.32 + 0.42 + 0.34 + 0.045;
    drumGroup.add(ring);
  });

  // Four Sacred Bronze Frogs at the 4 quadrants (Cóc thiêng gọi mưa)
  for (let f = 0; f < 4; f++) {
    const fAngle = (f * Math.PI) / 2 + Math.PI / 4;
    const frog = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.11), mats.goldTrim);
    frog.position.set(
      Math.cos(fAngle) * 0.74,
      0.32 + 0.42 + 0.34 + 0.07,
      Math.sin(fAngle) * 0.74
    );
    frog.rotation.y = fAngle;
    drumGroup.add(frog);
  }

  // 4 Bronze Strap Handles (Quai trống)
  for (let h = 0; h < 4; h++) {
    const hAngle = (h * Math.PI) / 2;
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 4, 12, Math.PI), mats.bronzeRelic);
    handle.position.set(Math.cos(hAngle) * 0.72, 0.68, Math.sin(hAngle) * 0.72);
    handle.rotation.y = hAngle;
    drumGroup.add(handle);
  }

  group.add(drumGroup);

  // Point Light for Specular Metallic Sheen
  const bronzeLight = new THREE.PointLight(0xd97706, 1.8, 5.0);
  bronzeLight.position.set(0, 1.6, 0);
  group.add(bronzeLight);

  return group;
}

/**
 * 7. Korean Royal Court Buk & Samgomu Dancheong Drum Exhibit
 * (Nhã Nhạc & Trống Cung Đình Buk / Samgomu)
 */
export function createKoreanBukDrumExhibit(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Tiered Granite Plinth
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.3, 0.35, 8), mats.stonePier);
  plinth.position.y = 0.175;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Royal Dancheong Wooden Drum Frame & Rooflet (Khung Treo Trống Sơn Dancheong)
  const frameGroup = new THREE.Group();
  frameGroup.position.y = 0.35;

  // 2 Vertical Wooden Uprights with Dancheong Brackets
  [-0.75, 0.75].forEach(ux => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 1.9, 8), mats.redLacquer);
    post.position.set(ux, 0.95, 0);
    post.castShadow = true;
    frameGroup.add(post);

    const baseStone = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.2, 8), mats.stoneStatue);
    baseStone.position.set(ux, 0.1, 0);
    frameGroup.add(baseStone);
  });

  // Top Crossbeam with curved Dancheong eaves rooflet
  const beam = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.16, 0.28), mats.dancheongEaves);
  beam.position.set(0, 1.9, 0);
  beam.castShadow = true;
  frameGroup.add(beam);

  const rooflet = new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.3, 4), mats.giwaRoof);
  rooflet.rotation.y = Math.PI / 4;
  rooflet.position.set(0, 2.12, 0);
  frameGroup.add(rooflet);

  // Korean Royal Buk Drum (Barrel Drum rotated horizontally)
  const drumGroup = new THREE.Group();
  drumGroup.position.set(0, 1.05, 0);

  // Drum barrel wood body
  const drumBodyGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.75, 24);
  drumBodyGeo.rotateZ(Math.PI / 2);
  const drumBody = new THREE.Mesh(drumBodyGeo, mats.dancheongEaves);
  drumBody.castShadow = true;
  drumGroup.add(drumBody);

  // Dual Cowhide Drum Heads (Mặt trống da bò)
  [-0.38, 0.38].forEach(dx => {
    const headGeo = new THREE.CircleGeometry(0.66, 24);
    headGeo.rotateY(dx > 0 ? Math.PI / 2 : -Math.PI / 2);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.6, metalness: 0.05 });
    const drumHead = new THREE.Mesh(headGeo, headMat);
    drumHead.position.x = dx;
    drumGroup.add(drumHead);

    // Gilded Metal Studs encircling the drum rim
    const rimStud = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.025, 4, 24), mats.goldTrim);
    rimStud.rotateY(Math.PI / 2);
    rimStud.position.x = dx;
    drumGroup.add(rimStud);

    // Tri-color Sam-Taegeuk swirl center (Vòng Thái Cực Tam Sắc: Đỏ, Xanh, Vàng)
    const taegeukInner = new THREE.Mesh(
      new THREE.CircleGeometry(0.24, 16),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 })
    );
    taegeukInner.rotateY(dx > 0 ? Math.PI / 2 : -Math.PI / 2);
    taegeukInner.position.x = dx + (dx > 0 ? 0.005 : -0.005);
    drumGroup.add(taegeukInner);

    const taegeukBlue = new THREE.Mesh(
      new THREE.RingGeometry(0.12, 0.24, 16, 1, 0, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 })
    );
    taegeukBlue.rotateY(dx > 0 ? Math.PI / 2 : -Math.PI / 2);
    taegeukBlue.position.x = dx + (dx > 0 ? 0.01 : -0.01);
    drumGroup.add(taegeukBlue);
  });

  // Drumsticks (Dùi trống Buk) hanging from side
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.55, 6), mats.agedWood);
  stick.position.set(-0.78, 0.95, 0.18);
  stick.rotation.z = -0.2;
  frameGroup.add(stick);

  frameGroup.add(drumGroup);
  group.add(frameGroup);

  // Dancheong Accent Point Light
  const drumLight = new THREE.PointLight(0xef4444, 1.8, 5.0);
  drumLight.position.set(0, 1.6, 0);
  group.add(drumLight);

  return group;
}

/**
 * 8. Ceramics Heritage & Jeju Sea Guardian Belvedere Exhibit
 * (Gốm Hoa Lam Bát Tràng, Bạch Ngọc Moon Jar & Tượng Thần Dol Hareubang)
 */
export function createCeramicsAndHareubangExhibit(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Wide Semicircular Exhibition Terrace
  const terrace = new THREE.Mesh(
    new THREE.CylinderGeometry(4.2, 4.4, 0.35, 16, 1, false, 0, Math.PI),
    mats.stonePier
  );
  terrace.rotation.y = -Math.PI / 2;
  terrace.position.y = 0.175;
  terrace.castShadow = true;
  terrace.receiveShadow = true;
  group.add(terrace);

  // Cobblestone inlay surface
  const floorInlay = new THREE.Mesh(
    new THREE.CylinderGeometry(3.9, 3.9, 0.04, 16, 1, false, 0, Math.PI),
    mats.cobblestonePath
  );
  floorInlay.rotation.y = -Math.PI / 2;
  floorInlay.position.y = 0.36;
  group.add(floorInlay);

  // 1. CENTER: JEJU DOL HAREUBANG (Tượng Thần Đá Ông Harubang Bảo Hộ Biển Khơi)
  const hareubang = createDolHareubang();
  hareubang.position.set(0, 0.35, 0);
  hareubang.scale.set(1.15, 1.15, 1.15);
  group.add(hareubang);

  // 2. LEFT: BÁT TRÀNG COBALT BLUE-AND-WHITE PORCELAIN DRAGON VASE
  // (Bình Gốm Hoa Lam Bát Tràng - Men Lam Hoàng Gia)
  const batTrangStand = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.6, 12), mats.agedWood);
  batTrangStand.position.set(-1.8, 0.35 + 0.3, 0.2);
  batTrangStand.castShadow = true;
  group.add(batTrangStand);

  const porcelainWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.15,
    metalness: 0.1
  });
  const cobaltBlueMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8, // Royal cobalt blue pigment
    roughness: 0.25,
    metalness: 0.15
  });

  // Vase bulbous body
  const vaseBody = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), porcelainWhiteMat);
  vaseBody.scale.set(1.0, 1.35, 1.0);
  vaseBody.position.set(-1.8, 0.35 + 0.6 + 0.62, 0.2);
  vaseBody.castShadow = true;
  group.add(vaseBody);

  // Cobalt dragon cloud bands encircling vase
  [-0.15, 0.05, 0.25].forEach(vy => {
    const cobaltRing = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.025, 6, 24), cobaltBlueMat);
    cobaltRing.rotateX(Math.PI / 2);
    cobaltRing.position.set(-1.8, 0.35 + 0.6 + 0.62 + vy, 0.2);
    group.add(cobaltRing);
  });

  // Flared neck & rim
  const vaseNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.42, 16), porcelainWhiteMat);
  vaseNeck.position.set(-1.8, 0.35 + 0.6 + 1.25, 0.2);
  group.add(vaseNeck);

  const vaseRim = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.035, 6, 16), cobaltBlueMat);
  vaseRim.rotateX(Math.PI / 2);
  vaseRim.position.set(-1.8, 0.35 + 0.6 + 1.45, 0.2);
  group.add(vaseRim);

  // 3. RIGHT: JOSEON PURE WHITE MOON JAR (Bạch Ngọc Moon Jar / Dalhangari)
  // (Đường Cong Tròn Đầy Như Vầng Trăng Rằm - Vẻ Đẹp Thuần Khiết)
  const moonJarStand = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.6, 12), mats.timberWood);
  moonJarStand.position.set(1.8, 0.35 + 0.3, 0.2);
  moonJarStand.castShadow = true;
  group.add(moonJarStand);

  const moonJarMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.18,
    metalness: 0.05
  });

  // Characteristic organic two-piece joined sphere silhouette of Moon Jar
  const moonJarBody = new THREE.Mesh(new THREE.SphereGeometry(0.62, 24, 18), moonJarMat);
  moonJarBody.scale.set(1.02, 0.98, 1.0);
  moonJarBody.position.set(1.8, 0.35 + 0.6 + 0.62, 0.2);
  moonJarBody.castShadow = true;
  group.add(moonJarBody);

  // Short lip neck
  const moonLip = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.35, 0.14, 20), moonJarMat);
  moonLip.position.set(1.8, 0.35 + 0.6 + 1.22, 0.2);
  group.add(moonLip);

  // Ambient Soft Glow Light illuminating the craft trio
  const craftLight = new THREE.PointLight(0x38bdf8, 2.0, 7.0);
  craftLight.position.set(0, 2.2, 0.5);
  group.add(craftLight);

  return group;
}

/**
 * 9. Traditional Korean Cheongsachorong Silk Lantern Post
 * (Đèn Lồng Lụa Xanh - Đỏ Cheongsachorong Hòa Hợp)
 */
export function createCheongsachorongPost(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Granite base plinth
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.3, 8), mats.stonePier);
  base.position.y = 0.15;
  base.castShadow = true;
  group.add(base);

  // Curved Wooden Lantern Post (Cột Gỗ Cong Treo Đèn)
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 2.8, 8), mats.timberWood);
  post.position.set(0, 1.55, 0);
  post.castShadow = true;
  group.add(post);

  // Curved hanging arm
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.65, 6), mats.agedWood);
  arm.rotation.z = Math.PI / 3;
  arm.position.set(0.24, 2.85, 0);
  group.add(arm);

  // Cheongsachorong Silk Lantern (Top Red / Bottom Blue)
  const lanternGroup = new THREE.Group();
  lanternGroup.position.set(0.48, 2.45, 0);

  // Wooden lantern cap & base frame
  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.04, 0.34), mats.agedWood);
  cap.position.y = 0.38;
  lanternGroup.add(cap);

  const botFrame = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.04, 0.34), mats.agedWood);
  botFrame.position.y = -0.38;
  lanternGroup.add(botFrame);

  // Top half: Red silk (Yang / Năng lượng Thái Dương)
  const redSilk = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.36, 0.3), mats.lanternSilkRed);
  redSilk.position.y = 0.18;
  lanternGroup.add(redSilk);

  // Bottom half: Blue silk (Yin / Năng lượng Thái Âm)
  const blueSilkMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // Royal Korean silk blue
    roughness: 0.35,
    metalness: 0.1,
    emissive: 0x0369a1,
    emissiveIntensity: 0.3
  });
  const blueSilk = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.36, 0.3), blueSilkMat);
  blueSilk.position.y = -0.18;
  lanternGroup.add(blueSilk);

  // Red Tassel hanging from bottom
  const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.24, 6), mats.lanternSilkRed);
  tassel.position.y = -0.52;
  lanternGroup.add(tassel);

  // Lantern Warm Candle Light
  const lanternLight = new THREE.PointLight(0xf59e0b, 1.2, 3.8);
  lanternLight.position.set(0, 0, 0);
  lanternGroup.add(lanternLight);

  group.add(lanternGroup);

  return group;
}

/**
 * 10. Monumental Harmony Inscription Stele
 * (Bia Kỷ Niệm Đại Hòa Hợp Văn Hóa Việt - Hàn)
 */
export function createHarmonyMonumentStele(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Tiered Lotus Base
  const base1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.32, 1.2), mats.stonePier);
  base1.position.y = 0.16;
  base1.castShadow = true;
  base1.receiveShadow = true;
  group.add(base1);

  const base2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.25, 0.95), mats.stoneStatue);
  base2.position.y = 0.32 + 0.125;
  base2.castShadow = true;
  group.add(base2);

  // Carved Dark Jade Inscription Slab
  const slab = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.6, 0.22), mats.jadeGlow);
  slab.position.y = 0.445 + 0.8;
  slab.castShadow = true;
  group.add(slab);

  // Gold Trim Border Frame
  const frameTop = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.08, 0.24), mats.goldTrim);
  frameTop.position.y = 0.445 + 1.62;
  group.add(frameTop);

  [-0.52, 0.52].forEach(fx => {
    const frameSide = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.6, 0.24), mats.goldTrim);
    frameSide.position.set(fx, 0.445 + 0.8, 0);
    group.add(frameSide);
  });

  // Gold Crest Finial with Twin Dragon-Tiger & Solar Emblem
  const crest = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.24, 16, 1, false, 0, Math.PI), mats.goldTrim);
  crest.rotateZ(Math.PI / 2);
  crest.position.y = 0.445 + 1.66;
  group.add(crest);

  // Inscribed Gold Plaque Center
  const inscription = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.35, 0.02), mats.goldTrim);
  inscription.position.set(0, 0.445 + 0.8, 0.12);
  group.add(inscription);

  // Soft Jade Glow
  const steleLight = new THREE.PointLight(0x10b981, 1.6, 4.5);
  steleLight.position.set(0, 1.5, 0.3);
  group.add(steleLight);

  return group;
}

/**
 * MASTER GROUP: Synthesized Cultural Exhibits of all 7 Lands on Crown Sanctuary Island
 * (Tổng Hợp Toàn Bộ Các Nét Đẹp Văn Hóa Việt - Hàn Tại Vương Đảo)
 */
export function createCrownSynthesizedCultureExhibits(): THREE.Group {
  const masterGroup = new THREE.Group();

  // 1. Highlands Agriculture & Earthenware Jars (Southwest Terrace)
  const highlandsExhibit = createHighlandsSynthesisExhibit();
  highlandsExhibit.position.set(2.8, 2.72, 126.8);
  highlandsExhibit.rotation.y = 0.35;
  masterGroup.add(highlandsExhibit);

  // 2. Scholar Confucianism & Turtle Stele (Southeast Terrace)
  const scholarExhibit = createScholarSynthesisExhibit();
  scholarExhibit.position.set(13.2, 2.72, 126.8);
  scholarExhibit.rotation.y = -0.35;
  masterGroup.add(scholarExhibit);

  // 3. Folk Festivals, Five-Element Flags & Traditional Attire (Entrance Flanks)
  const attireLeft = createFestivalAttireSynthesisExhibit('left');
  attireLeft.position.set(4.6, 2.72, 123.5);
  attireLeft.rotation.y = 0.2;
  masterGroup.add(attireLeft);

  const attireRight = createFestivalAttireSynthesisExhibit('right');
  attireRight.position.set(11.4, 2.72, 123.5);
  attireRight.rotation.y = -0.2;
  masterGroup.add(attireRight);

  // 4. Lý Dynasty Coiled Golden Dragon (West Wing of Altar)
  const lyDragon = createLyDynastyGoldenDragon();
  lyDragon.position.set(1.6, 2.72, 140.0);
  lyDragon.rotation.y = Math.PI / 2; // Facing towards Crown Altar
  masterGroup.add(lyDragon);

  // 5. Baekdusan Sacred White Tiger (East Wing of Altar)
  const baekduTiger = createBaekduWhiteTiger();
  baekduTiger.position.set(14.4, 2.72, 140.0);
  baekduTiger.rotation.y = -Math.PI / 2; // Facing towards Crown Altar
  masterGroup.add(baekduTiger);

  // 6. Imperial Court Music & Đông Sơn Bronze Drum (Northwest Shore)
  const dongSonDrum = createDongSonBronzeDrumExhibit();
  dongSonDrum.position.set(2.8, 2.72, 144.8);
  dongSonDrum.rotation.y = 0.8;
  masterGroup.add(dongSonDrum);

  // 7. Korean Royal Court Buk & Samgomu Drum (Northeast Shore)
  const koreanBuk = createKoreanBukDrumExhibit();
  koreanBuk.position.set(13.2, 2.72, 144.8);
  koreanBuk.rotation.y = -0.8;
  masterGroup.add(koreanBuk);

  // 8. Ceramics Heritage & Jeju Dol Hareubang (North Belvedere Overlook)
  const ceramicsExhibit = createCeramicsAndHareubangExhibit();
  ceramicsExhibit.position.set(8.0, 2.72, 148.6);
  ceramicsExhibit.rotation.y = Math.PI; // Facing south towards Altar
  masterGroup.add(ceramicsExhibit);

  // 9. Monumental Harmony Inscription Stele (Beside Entrance Walkway)
  const harmonyStele = createHarmonyMonumentStele();
  harmonyStele.position.set(4.2, 2.72, 129.8);
  harmonyStele.rotation.y = 0.45;
  masterGroup.add(harmonyStele);

  // 10. Korean Cheongsachorong Silk Lantern Posts (Flanking the Sacred Avenue)
  const lanternPostCoords = [
    { x: 5.4, z: 126.0, rot: 0.2 },
    { x: 10.6, z: 126.0, rot: -Math.PI + 0.2 },
    { x: 5.4, z: 131.0, rot: 0.2 },
    { x: 10.6, z: 131.0, rot: -Math.PI + 0.2 },
    { x: 5.4, z: 136.5, rot: 0.2 },
    { x: 10.6, z: 136.5, rot: -Math.PI + 0.2 }
  ];

  lanternPostCoords.forEach(lp => {
    const post = createCheongsachorongPost();
    post.position.set(lp.x, 2.72, lp.z);
    post.rotation.y = lp.rot;
    masterGroup.add(post);
  });

  // 11. Additional Floating Lotus Lanterns Drifting in the Sacred Moat
  const canalLotusCoords = [
    { x: 4.6, z: 141.5 },
    { x: 11.4, z: 141.5 },
    { x: 8.0, z: 145.8 },
    { x: 8.0, z: 137.8 }
  ];

  canalLotusCoords.forEach(cl => {
    const floatLotus = createFloatingLantern('lotus');
    floatLotus.position.set(cl.x, 2.68, cl.z);
    masterGroup.add(floatLotus);
  });

  return masterGroup;
}

