import * as THREE from 'three';

/**
 * Procedural texture generators using HTML5 Canvas (Zero external image dependencies)
 */

export function createDancheongTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Background jade green (Nok-saek)
  ctx.fillStyle = '#065F46';
  ctx.fillRect(0, 0, 512, 128);

  // Geometric Dancheong interlocking patterns (Geum-dancheong)
  const colors = ['#DC2626', '#F59E0B', '#2563EB', '#F8FAFC', '#10B981'];

  for (let x = 0; x < 512; x += 64) {
    // Red and yellow floral lotus cartouche
    ctx.beginPath();
    ctx.arc(x + 32, 64, 24, 0, Math.PI * 2);
    ctx.fillStyle = colors[0];
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 32, 64, 16, 0, Math.PI * 2);
    ctx.fillStyle = colors[1];
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 32, 64, 8, 0, Math.PI * 2);
    ctx.fillStyle = colors[2];
    ctx.fill();

    // Wave borders top and bottom
    ctx.fillStyle = colors[4];
    ctx.fillRect(x, 0, 64, 12);
    ctx.fillRect(x, 116, 64, 12);

    ctx.fillStyle = colors[3];
    ctx.fillRect(x + 4, 12, 56, 4);
    ctx.fillRect(x + 4, 112, 56, 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createGiwaRoofTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Dark slate-grey charcoal roof tile
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, 0, 256, 256);

  // Tile ridges
  for (let y = 0; y < 256; y += 32) {
    const gradient = ctx.createLinearGradient(0, y, 0, y + 32);
    gradient.addColorStop(0, '#334155');
    gradient.addColorStop(0.5, '#1E293B');
    gradient.addColorStop(1, '#0F172A');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, y, 256, 30);

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, y + 30, 256, 2);
  }

  // Vertical scallop seams
  for (let x = 0; x < 256; x += 32) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(x, 0, 2, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createVietnameseTerracottaTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Warm terracotta brick red
  ctx.fillStyle = '#991B1B';
  ctx.fillRect(0, 0, 256, 256);

  for (let y = 0; y < 256; y += 28) {
    const gradient = ctx.createLinearGradient(0, y, 0, y + 28);
    gradient.addColorStop(0, '#DC2626');
    gradient.addColorStop(0.6, '#B91C1C');
    gradient.addColorStop(1, '#7F1D1D');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, y, 256, 26);

    ctx.fillStyle = '#450A0A';
    ctx.fillRect(0, y + 26, 256, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createWoodPlankTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#78350F';
  ctx.fillRect(0, 0, 256, 256);

  // Planks
  for (let y = 0; y < 256; y += 32) {
    ctx.fillStyle = y % 64 === 0 ? '#92400E' : '#B45309';
    ctx.fillRect(0, y, 256, 30);
    // Grain lines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(0, y + 6 + i * 6, 256, 1);
    }
    // Joint
    ctx.fillStyle = '#451A03';
    ctx.fillRect(0, y + 30, 256, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createCobblestoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#475569';
  ctx.fillRect(0, 0, 256, 256);

  // Irregular paving stones
  for (let y = 0; y < 256; y += 32) {
    for (let x = 0; x < 256; x += 32) {
      const offsetX = (y % 64 === 0) ? 0 : 16;
      ctx.fillStyle = ((x + y) % 3 === 0) ? '#64748B' : '#334155';
      ctx.beginPath();
      ctx.roundRect((x + offsetX) % 256 + 2, y + 2, 28, 28, 6);
      ctx.fill();

      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createTerraceRiceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Lush golden-green rice field
  ctx.fillStyle = '#CA8A04';
  ctx.fillRect(0, 0, 256, 256);

  for (let x = 0; x < 256; x += 16) {
    for (let y = 0; y < 256; y += 16) {
      ctx.fillStyle = (x + y) % 32 === 0 ? '#EAB308' : '#84CC16';
      ctx.fillRect(x + 2, y + 2, 12, 12);
      // Subtle water shimmer in paddy
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fillRect(x + 6, y + 6, 4, 4);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createWaterRipplesTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0284C7';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 3;

  for (let y = 16; y < 256; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < 256; x += 32) {
      ctx.quadraticCurveTo(x + 16, y + 10, x + 32, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
