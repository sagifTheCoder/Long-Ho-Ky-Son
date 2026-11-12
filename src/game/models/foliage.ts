import * as THREE from 'three';
import { getMaterials } from './materials';

/**
 * Procedural stylized foliage (Bamboo, Pines, Blossom Trees, Maples, Lotus Plants)
 */

export function createBambooCluster(scale: number = 1.0): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const numCulms = 5;
  for (let i = 0; i < numCulms; i++) {
    const angle = (i / numCulms) * Math.PI * 2 + Math.random() * 0.4;
    const r = 0.2 + Math.random() * 0.35;
    const height = (2.8 + Math.random() * 1.4) * scale;
    const thickness = (0.04 + Math.random() * 0.02) * scale;

    const culmGeo = new THREE.CylinderGeometry(thickness, thickness, height, 6);
    const culm = new THREE.Mesh(culmGeo, mats.bambooGreen);
    culm.position.set(Math.cos(angle) * r, height / 2, Math.sin(angle) * r);
    culm.rotation.z = (Math.random() - 0.5) * 0.15;
    culm.castShadow = true;
    group.add(culm);

    // Leaf cluster near top
    const leafGeo = new THREE.ConeGeometry(0.35 * scale, 0.6 * scale, 5);
    const leaf = new THREE.Mesh(leafGeo, mats.bambooGreen);
    leaf.position.set(Math.cos(angle) * r, height * 0.9, Math.sin(angle) * r);
    leaf.rotation.x = (Math.random() - 0.5) * 0.5;
    group.add(leaf);
  }

  return group;
}

export function createAutumnMapleTree(scale: number = 1.0): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Gnarled Trunk
  const trunkGeo = new THREE.CylinderGeometry(0.18 * scale, 0.32 * scale, 1.8 * scale, 8);
  const trunk = new THREE.Mesh(trunkGeo, mats.agedWood);
  trunk.position.y = 0.9 * scale;
  trunk.castShadow = true;
  group.add(trunk);

  // Maple Foliage clusters (crimson-orange cloud volumes)
  const foliageOffsets = [
    [0, 2.2, 0, 1.2],
    [0.7, 2.5, 0.3, 0.9],
    [-0.6, 2.4, -0.4, 0.95],
    [0.2, 3.1, -0.2, 0.85]
  ];

  foliageOffsets.forEach(([fx, fy, fz, fr]) => {
    const folGeo = new THREE.DodecahedronGeometry(fr * scale, 1);
    const folMesh = new THREE.Mesh(folGeo, mats.leafMaple);
    folMesh.position.set(fx * scale, fy * scale, fz * scale);
    folMesh.castShadow = true;
    group.add(folMesh);
  });

  return group;
}

export function createBlossomTree(scale: number = 1.0): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const trunkGeo = new THREE.CylinderGeometry(0.16 * scale, 0.28 * scale, 1.6 * scale, 8);
  const trunk = new THREE.Mesh(trunkGeo, mats.agedWood);
  trunk.position.y = 0.8 * scale;
  trunk.castShadow = true;
  group.add(trunk);

  const foliageOffsets = [
    [0, 1.9, 0, 1.1],
    [0.6, 2.2, 0.2, 0.85],
    [-0.5, 2.0, -0.3, 0.8],
    [0, 2.7, 0, 0.8]
  ];

  foliageOffsets.forEach(([fx, fy, fz, fr]) => {
    const folGeo = new THREE.DodecahedronGeometry(fr * scale, 1);
    const folMesh = new THREE.Mesh(folGeo, mats.leafCherry);
    folMesh.position.set(fx * scale, fy * scale, fz * scale);
    folMesh.castShadow = true;
    group.add(folMesh);
  });

  return group;
}

export function createAncientPineTree(scale: number = 1.0): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Curving Bonsai/Solnamu trunk
  const trunkGeo = new THREE.CylinderGeometry(0.2 * scale, 0.35 * scale, 2.4 * scale, 8);
  const trunk = new THREE.Mesh(trunkGeo, mats.agedWood);
  trunk.position.set(0.2 * scale, 1.2 * scale, 0);
  trunk.rotation.z = -0.15;
  trunk.castShadow = true;
  group.add(trunk);

  // Stepped flattened pine needle clouds
  const pinePads = [
    [0.6, 1.8, 0.2, 1.1, 0.3],
    [-0.4, 2.4, -0.2, 1.0, 0.28],
    [0.3, 3.0, 0.1, 0.85, 0.25],
    [0.1, 3.6, 0.0, 0.65, 0.22]
  ];

  pinePads.forEach(([px, py, pz, pr, ph]) => {
    const padGeo = new THREE.CylinderGeometry(pr * scale, (pr + 0.1) * scale, ph * scale, 8);
    const pad = new THREE.Mesh(padGeo, mats.leafPine);
    pad.position.set(px * scale, py * scale, pz * scale);
    pad.castShadow = true;
    group.add(pad);
  });

  return group;
}

export function createLotusWaterCluster(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 3-4 Floating green round pads
  const padOffsets = [
    [0, 0, 0.45],
    [0.5, 0.2, 0.38],
    [-0.4, 0.3, 0.42],
    [0.1, -0.4, 0.35]
  ];

  padOffsets.forEach(([px, pz, pr]) => {
    const padGeo = new THREE.CylinderGeometry(pr, pr, 0.02, 12);
    const pad = new THREE.Mesh(padGeo, mats.bambooGreen);
    pad.position.set(px, 0.02, pz);
    group.add(pad);
  });

  // Central pink Lotus blossom
  const blossomGeo = new THREE.ConeGeometry(0.22, 0.28, 8);
  const blossom = new THREE.Mesh(blossomGeo, mats.lanternLotusPink);
  blossom.position.set(0.1, 0.15, 0.05);
  group.add(blossom);

  // Golden stamen core
  const stamen = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), mats.goldTrim);
  stamen.position.set(0.1, 0.22, 0.05);
  group.add(stamen);

  return group;
}
