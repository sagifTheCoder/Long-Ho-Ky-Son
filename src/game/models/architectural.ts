import * as THREE from 'three';
import { getMaterials } from './materials';

/**
 * Procedural composite architectural models rich in Vietnamese & South Korean heritage
 */

/**
 * Vietnamese Tube House (Nhà Ống) & Korean Hanok Fusion House
 */
export function createDetailedFusionHouse(variant: 'hanoi_ochre' | 'hanok_white' | 'market_shophouse' = 'hanoi_ochre'): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const width = 2.4;
  const depth = 3.2;
  const height = 2.8;

  // 1. Stone Foundation Podium
  const base = new THREE.Mesh(new THREE.BoxGeometry(width + 0.35, 0.35, depth + 0.35), mats.stonePier);
  base.position.y = 0.175;
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  // 2. Main Wall Body
  const wallMat = variant === 'hanok_white' ? mats.whiteWall : mats.ochreWall;
  const wall = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), wallMat);
  wall.position.y = 0.35 + height / 2;
  wall.castShadow = true;
  wall.receiveShadow = true;
  group.add(wall);

  // 3. Wooden Timber Columns (4 corner posts)
  const colGeo = new THREE.CylinderGeometry(0.08, 0.08, height + 0.1, 8);
  [
    [-width / 2 + 0.05, -depth / 2 + 0.05],
    [width / 2 - 0.05, -depth / 2 + 0.05],
    [-width / 2 + 0.05, depth / 2 - 0.05],
    [width / 2 - 0.05, depth / 2 - 0.05]
  ].forEach(([cx, cz]) => {
    const col = new THREE.Mesh(colGeo, mats.timberWood);
    col.position.set(cx, 0.35 + height / 2, cz);
    col.castShadow = true;
    group.add(col);
  });

  // 4. Korean Hanok Raised Wooden Veranda (Toenmaru)
  const veranda = new THREE.Mesh(new THREE.BoxGeometry(width + 0.2, 0.15, 0.8), mats.timberWood);
  veranda.position.set(0, 0.42, depth / 2 + 0.35);
  group.add(veranda);

  // 5. Traditional Latticed Windows / Louvers
  const win = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.06), mats.agedWood);
  win.position.set(0, 1.8, depth / 2 + 0.04);
  group.add(win);

  // French-Hanoi Balcony Railing
  const rail = new THREE.Mesh(new THREE.BoxGeometry(width * 0.7, 0.4, 0.08), mats.redLacquer);
  rail.position.set(0, 1.3, depth / 2 + 0.4);
  group.add(rail);

  // Potted green plants
  [-0.5, 0.5].forEach(px => {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.18, 8), mats.terracottaRoof);
    pot.position.set(px, 0.58, depth / 2 + 0.35);
    group.add(pot);

    const plant = new THREE.Mesh(new THREE.SphereGeometry(0.15, 6, 6), mats.bambooGreen);
    plant.position.set(px, 0.75, depth / 2 + 0.35);
    group.add(plant);
  });

  // 6. Dancheong Bracket Frieze
  const dancheong = new THREE.Mesh(new THREE.BoxGeometry(width + 0.3, 0.25, depth + 0.3), mats.dancheongEaves);
  dancheong.position.y = 0.35 + height - 0.05;
  group.add(dancheong);

  // 7. Sweeping Curved Roof
  const roofMat = variant === 'hanoi_ochre' ? mats.terracottaRoof : mats.giwaRoof;
  const roofGeo = new THREE.ConeGeometry(width * 1.15, 1.3, 4);
  roofGeo.rotateY(Math.PI / 4);
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.scale.set(1.25, 0.85, 1.45);
  roof.position.y = 0.35 + height + 0.65;
  roof.castShadow = true;
  group.add(roof);

  // 8. Flared Roof Ridge Crest
  const crestGeo = new THREE.CylinderGeometry(0.07, 0.07, depth * 1.35, 8);
  crestGeo.rotateX(Math.PI / 2);
  const crest = new THREE.Mesh(crestGeo, mats.goldTrim);
  crest.position.set(0, 0.35 + height + 1.25, 0);
  group.add(crest);

  // 9. Hanging Silk Lanterns
  [-width / 2 - 0.15, width / 2 + 0.15].forEach((lx, idx) => {
    const lanternGeo = new THREE.SphereGeometry(0.18, 8, 8);
    lanternGeo.scale(0.9, 1.4, 0.9);
    const lanternMat = idx === 0 ? mats.lanternSilkRed : mats.lanternSilkYellow;
    const lantern = new THREE.Mesh(lanternGeo, lanternMat);
    lantern.position.set(lx, 0.35 + height - 0.35, depth / 2 + 0.1);
    group.add(lantern);

    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.3, 4), mats.agedWood);
    cord.position.set(lx, 0.35 + height - 0.1, depth / 2 + 0.1);
    group.add(cord);
  });

  return group;
}

/**
 * Traditional Highland Stilt House (Nhà Sàn Vùng Cao Tây Bắc / Tây Nguyên)
 * Features authentic carved wooden doors, prop-up shutter windows with warm interior glow,
 * front veranda (hiên nhà sàn), carved steps, "Khau Cút" roof horns, hanging harvest, and under-stilt life.
 */
export function createStiltHouse(variant: 'main' | 'village' = 'main'): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const width = variant === 'main' ? 3.0 : 2.5;
  const depth = variant === 'main' ? 4.0 : 3.4;
  const stiltHeight = 1.3;
  const houseHeight = 2.1;
  const porchDepth = 0.9;
  const enclosedDepth = depth - porchDepth;

  // 1. Sturdy Timber Stilt Columns with stone footings (Cột nhà sàn kê đá tảng)
  const colX = [-width / 2 + 0.25, 0, width / 2 - 0.25];
  const colZ = [-depth / 2 + 0.3, 0, depth / 2 - 0.3];
  
  colX.forEach(px => {
    colZ.forEach(pz => {
      // Stone base plinth (Đá kê chân cột chống ẩm)
      const stoneBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.22, 0.15, 8),
        mats.stonePier
      );
      stoneBase.position.set(px, 0.075, pz);
      stoneBase.castShadow = true;
      group.add(stoneBase);

      // Wooden column
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.11, stiltHeight - 0.08, 8),
        mats.timberWood
      );
      post.position.set(px, stiltHeight / 2 + 0.04, pz);
      post.castShadow = true;
      group.add(post);
    });
  });

  // Longitudinal & transverse tie-beams (Dầm ngang xà dọc đỡ sàn)
  const beamY = stiltHeight - 0.05;
  colX.forEach(px => {
    const girder = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, depth), mats.agedWood);
    girder.position.set(px, beamY, 0);
    group.add(girder);
  });
  [-depth / 2 + 0.3, 0, depth / 2 - 0.3].forEach(pz => {
    const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(width + 0.2, 0.14, 0.14), mats.agedWood);
    crossBeam.position.set(0, beamY + 0.08, pz);
    group.add(crossBeam);
  });

  // 2. Bamboo / Hardwood Floor Deck (Sàn gỗ & hiên nhà sàn)
  const floorY = stiltHeight + 0.15;
  const floorMesh = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.2, 0.12, depth + 0.2),
    mats.timberWood
  );
  floorMesh.position.set(0, floorY, 0);
  floorMesh.receiveShadow = true;
  group.add(floorMesh);

  // 3. Front Porch / Veranda Railings (Lan can hiên nhà đón khách)
  const porchFrontZ = depth / 2 + 0.05;
  const porchBackZ = depth / 2 - porchDepth;
  const railHeight = 0.55;

  // Railing Balustrades around the front veranda
  // Left railing
  const leftRail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, porchDepth), mats.timberWood);
  leftRail.position.set(-width / 2 + 0.1, floorY + railHeight, (porchFrontZ + porchBackZ) / 2);
  group.add(leftRail);

  // Right railing
  const rightRail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, porchDepth), mats.timberWood);
  rightRail.position.set(width / 2 - 0.1, floorY + railHeight, (porchFrontZ + porchBackZ) / 2);
  group.add(rightRail);

  // Front porch railings (leaving center opening for ladder entrance)
  const frontRailWidth = (width - 0.9) / 2;
  const frontRailLeft = new THREE.Mesh(new THREE.BoxGeometry(frontRailWidth, 0.06, 0.06), mats.timberWood);
  frontRailLeft.position.set(-width / 2 + frontRailWidth / 2 + 0.05, floorY + railHeight, porchFrontZ - 0.05);
  group.add(frontRailLeft);

  const frontRailRight = new THREE.Mesh(new THREE.BoxGeometry(frontRailWidth, 0.06, 0.06), mats.timberWood);
  frontRailRight.position.set(width / 2 - frontRailWidth / 2 - 0.05, floorY + railHeight, porchFrontZ - 0.05);
  group.add(frontRailRight);

  // Balusters (con tiện gỗ lan can)
  [-width / 2 + 0.35, -width / 2 + 0.7, width / 2 - 0.7, width / 2 - 0.35].forEach(bx => {
    const baluster = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, railHeight, 6), mats.agedWood);
    baluster.position.set(bx, floorY + railHeight / 2, porchFrontZ - 0.05);
    group.add(baluster);
  });

  // 4. Main Enclosed Living Quarters (Gian nhà chính)
  const wallCenterZ = -porchDepth / 2;
  const wallY = floorY + houseHeight / 2;

  // Main Wooden Enclosure Walls
  const mainWalls = new THREE.Mesh(
    new THREE.BoxGeometry(width, houseHeight, enclosedDepth),
    mats.agedWood
  );
  mainWalls.position.set(0, wallY, wallCenterZ);
  mainWalls.castShadow = true;
  group.add(mainWalls);

  // Interior warm amber illumination backdrop (Ánh đèn ấm cúng từ bên trong nhà)
  const warmGlowMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });

  // -----------------------------------------------------------------
  // 5. CỬA RA VÀO CHÍNH (Front Double Entrance Doors on Porch Facade)
  // -----------------------------------------------------------------
  const doorZ = wallCenterZ + enclosedDepth / 2 + 0.01;
  const doorWidth = 0.75;
  const doorHeight = 1.45;

  // Recessed Doorway Pocket (showing dark depth / warm glow)
  const doorAperture = new THREE.Mesh(
    new THREE.BoxGeometry(doorWidth, doorHeight, 0.05),
    new THREE.MeshBasicMaterial({ color: 0x271911 })
  );
  doorAperture.position.set(0, floorY + doorHeight / 2 + 0.05, doorZ);
  group.add(doorAperture);

  // Door Frame Trim (Khung bao cửa gỗ)
  const doorFrameTop = new THREE.Mesh(new THREE.BoxGeometry(doorWidth + 0.16, 0.08, 0.08), mats.timberWood);
  doorFrameTop.position.set(0, floorY + doorHeight + 0.08, doorZ + 0.02);
  group.add(doorFrameTop);

  [-doorWidth / 2 - 0.04, doorWidth / 2 + 0.04].forEach(fx => {
    const jamb = new THREE.Mesh(new THREE.BoxGeometry(0.08, doorHeight + 0.08, 0.08), mats.timberWood);
    jamb.position.set(fx, floorY + doorHeight / 2 + 0.04, doorZ + 0.02);
    group.add(jamb);
  });

  // Threshold Beam (Bậu cửa gỗ nhô cao truyền thống)
  const threshold = new THREE.Mesh(new THREE.BoxGeometry(doorWidth + 0.16, 0.08, 0.1), mats.timberWood);
  threshold.position.set(0, floorY + 0.04, doorZ + 0.03);
  group.add(threshold);

  // Double Wooden Door Leaves (2 cánh cửa mở hé chào đón)
  // Left leaf (slightly ajar inward)
  const leftLeaf = new THREE.Mesh(new THREE.BoxGeometry(doorWidth / 2 - 0.02, doorHeight - 0.06, 0.03), mats.timberWood);
  leftLeaf.position.set(-doorWidth / 4 + 0.02, floorY + doorHeight / 2 + 0.05, doorZ + 0.01);
  leftLeaf.rotation.y = 0.25; // Open inward
  group.add(leftLeaf);

  // Right leaf
  const rightLeaf = new THREE.Mesh(new THREE.BoxGeometry(doorWidth / 2 - 0.02, doorHeight - 0.06, 0.03), mats.timberWood);
  rightLeaf.position.set(doorWidth / 4 - 0.01, floorY + doorHeight / 2 + 0.05, doorZ + 0.015);
  rightLeaf.rotation.y = -0.15;
  group.add(rightLeaf);

  // Brass / Iron Door Knockers & Rings (Quai then cửa đồng)
  [-0.06, 0.06].forEach(kx => {
    const knocker = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.006, 6, 12), mats.goldTrim);
    knocker.position.set(kx, floorY + doorHeight * 0.55, doorZ + 0.04);
    group.add(knocker);
  });

  // -----------------------------------------------------------------
  // 6. CỬA SỔ HIÊN & MẶT TIỀN (Front Veranda Windows with Lattice Bars)
  // -----------------------------------------------------------------
  [-width / 2 + 0.5, width / 2 - 0.5].forEach(wx => {
    const winWidth = 0.5;
    const winHeight = 0.65;
    const winY = floorY + 1.1;

    // Window cutout backing with warm lantern glow
    const winBack = new THREE.Mesh(new THREE.BoxGeometry(winWidth, winHeight, 0.04), warmGlowMat);
    winBack.position.set(wx, winY, doorZ);
    group.add(winBack);

    // Outer Wooden Window Frame
    const winFrameTop = new THREE.Mesh(new THREE.BoxGeometry(winWidth + 0.1, 0.06, 0.06), mats.timberWood);
    winFrameTop.position.set(wx, winY + winHeight / 2 + 0.03, doorZ + 0.02);
    group.add(winFrameTop);

    const winSill = new THREE.Mesh(new THREE.BoxGeometry(winWidth + 0.12, 0.06, 0.1), mats.timberWood);
    winSill.position.set(wx, winY - winHeight / 2 - 0.03, doorZ + 0.04);
    group.add(winSill);

    // Vertical Bamboo / Wooden Lattice Bars (Chấn song cửa sổ tre/gỗ)
    [-0.15, 0, 0.15].forEach(bx => {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, winHeight, 6), mats.bambooGreen);
      bar.position.set(wx + bx, winY, doorZ + 0.02);
      group.add(bar);
    });
  });

  // -----------------------------------------------------------------
  // 7. CỬA SỔ HÔNG VỚI CÁNH LIẾP CHỐNG LÊN (Side Windows with Prop Shutters)
  // -----------------------------------------------------------------
  // Both Left & Right side walls have open awned shutter windows
  [-width / 2 - 0.01, width / 2 + 0.01].forEach((sideX, sideIdx) => {
    const isLeft = sideIdx === 0;
    const winZ = wallCenterZ;
    const winWidth = 0.75;
    const winHeight = 0.65;
    const winY = floorY + 1.15;

    // Window interior aperture with glowing lantern warmth
    const winGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, winHeight, winWidth),
      warmGlowMat
    );
    winGlow.position.set(sideX, winY, winZ);
    group.add(winGlow);

    // Frame surrounding window
    const topLintel = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, winWidth + 0.14), mats.timberWood);
    topLintel.position.set(sideX + (isLeft ? -0.02 : 0.02), winY + winHeight / 2 + 0.03, winZ);
    group.add(topLintel);

    const sill = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, winWidth + 0.14), mats.timberWood);
    sill.position.set(sideX + (isLeft ? -0.04 : 0.04), winY - winHeight / 2 - 0.03, winZ);
    group.add(sill);

    // Internal vertical security bars
    [-0.2, 0, 0.2].forEach(bz => {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, winHeight, 6), mats.agedWood);
      bar.position.set(sideX, winY, winZ + bz);
      group.add(bar);
    });

    // Traditional Propped Wooden / Bamboo Shutter (Cánh liếp cửa sổ mở chếch 45 độ)
    const shutter = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, winHeight + 0.05, winWidth + 0.06),
      mats.timberWood
    );
    shutter.position.set(
      sideX + (isLeft ? -0.22 : 0.22),
      winY + winHeight / 2 - 0.08,
      winZ
    );
    // Angle shutter outward
    shutter.rotation.z = isLeft ? -0.55 : 0.55;
    group.add(shutter);

    // Bamboo Prop Sticks holding up the shutter (Thanh que tre chống cửa)
    [-0.25, 0.25].forEach(pz => {
      const propStick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, 0.42, 4),
        mats.bambooGreen
      );
      propStick.position.set(
        sideX + (isLeft ? -0.16 : 0.16),
        winY - 0.05,
        winZ + pz
      );
      propStick.rotation.z = isLeft ? 0.45 : -0.45;
      group.add(propStick);
    });
  });

  // -----------------------------------------------------------------
  // 8. CẦU THANG GỖ NHÀ SÀN (Authentic Highland Ladder with Treads & Handrail)
  // -----------------------------------------------------------------
  const ladderGroup = new THREE.Group();
  ladderGroup.position.set(0, 0, porchFrontZ + 0.05);

  const ladderRun = 1.35;
  const ladderRise = floorY + 0.06;
  const numSteps = 7; // Số lẻ theo phong tục người Tày, Thái, Mường

  // Side stringers (Hai ván thành cầu thang gỗ dốc thoai thoải)
  const stringerLength = Math.sqrt(ladderRun * ladderRun + ladderRise * ladderRise);
  const stringerAngle = Math.atan2(ladderRise, ladderRun);

  [-0.32, 0.32].forEach(sx => {
    const stringer = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.16, stringerLength),
      mats.timberWood
    );
    stringer.position.set(sx, ladderRise / 2, ladderRun / 2);
    stringer.rotation.x = -stringerAngle;
    stringer.castShadow = true;
    ladderGroup.add(stringer);
  });

  // 7 Individual Flat Wooden Steps (Bậc thang gỗ phẳng chắc chắn)
  for (let s = 1; s <= numSteps; s++) {
    const t = s / (numSteps + 1);
    const stepY = t * ladderRise;
    const stepZ = (1 - t) * ladderRun;

    const tread = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.05, 0.18),
      mats.timberWood
    );
    tread.position.set(0, stepY, stepZ);
    tread.castShadow = true;
    ladderGroup.add(tread);
  }

  // Right Handrail (Tay vịn mộc mạc)
  const handrail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, stringerLength, 6),
    mats.agedWood
  );
  handrail.position.set(0.34, ladderRise / 2 + 0.42, ladderRun / 2);
  handrail.rotation.x = -stringerAngle;
  ladderGroup.add(handrail);

  // Handrail Support Posts
  [0.15, 0.85].forEach(pt => {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.48, 6),
      mats.timberWood
    );
    post.position.set(0.34, pt * ladderRise + 0.22, (1 - pt) * ladderRun);
    ladderGroup.add(post);
  });

  // Water Gourd / Foot Washing Basin at Ladder Foot (Ống bương nước rửa chân trước khi lên nhà)
  const waterBasin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.14, 0.24, 8),
    mats.terracottaRoof
  );
  waterBasin.position.set(-0.55, 0.12, ladderRun + 0.1);
  ladderGroup.add(waterBasin);

  const ladle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.35, 4), mats.bambooGreen);
  ladle.position.set(-0.55, 0.28, ladderRun + 0.1);
  ladle.rotation.z = 0.4;
  ladderGroup.add(ladle);

  group.add(ladderGroup);

  // -----------------------------------------------------------------
  // 9. TRUYỀN THỐNG: KHAU CÚT VÀ MÁI NHÀ SÀN (Roof Structure & Khau Cut Horns)
  // -----------------------------------------------------------------
  const roofStartY = floorY + houseHeight - 0.1;
  const roofOverhangW = width + 0.8;
  const roofOverhangD = depth + 0.9;
  const roofH = 1.35;

  // Main Thatched / Terracotta Gable-Hipped Roof (Mái dốc che hiên vươn dài)
  const roofGeo = new THREE.ConeGeometry(roofOverhangW * 0.95, roofH, 4);
  roofGeo.rotateY(Math.PI / 4);
  const roof = new THREE.Mesh(roofGeo, mats.terracottaRoof);
  roof.scale.set(1.2, 0.85, roofOverhangD / roofOverhangW * 1.3);
  roof.position.set(0, roofStartY + roofH * 0.72, wallCenterZ + porchDepth * 0.15);
  roof.castShadow = true;
  group.add(roof);

  // Eaves Under-Fascia Rim
  const fascia = new THREE.Mesh(
    new THREE.BoxGeometry(roofOverhangW, 0.08, roofOverhangD),
    mats.timberWood
  );
  fascia.position.set(0, roofStartY + 0.04, wallCenterZ + porchDepth * 0.15);
  group.add(fascia);

  // "Khau Cút" - Crossed Wooden Roof Horns on both gables (Biểu tượng khau cút thanh thoát)
  [wallCenterZ - enclosedDepth / 2 - 0.2, wallCenterZ + enclosedDepth / 2 + porchDepth + 0.15].forEach(gz => {
    const hornPeakY = roofStartY + roofH * 1.02;
    [-0.32, 0.32].forEach((hRot, hIdx) => {
      const horn = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.65, 0.04),
        mats.timberWood
      );
      horn.position.set(0, hornPeakY, gz);
      horn.rotation.z = hIdx === 0 ? 0.5 : -0.5;
      group.add(horn);
    });
  });

  // -----------------------------------------------------------------
  // 10. ĐỜI SỐNG SINH HOẠT VÙNG CAO: GẦM NHÀ SÀN & DƯỚI HIÊN
  // -----------------------------------------------------------------
  // Stacked Firewood under stilts (Đống củi xếp dưới gầm nhà)
  const firewoodGroup = new THREE.Group();
  firewoodGroup.position.set(-width / 2 + 0.65, 0, 0);
  for (let fx = -0.3; fx <= 0.3; fx += 0.14) {
    for (let fy = 0.08; fy <= 0.45; fy += 0.12) {
      const log = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 6),
        mats.agedWood
      );
      log.rotateX(Math.PI / 2);
      log.position.set(fx, fy, 0);
      firewoodGroup.add(log);
    }
  }
  group.add(firewoodGroup);

  // Traditional Rice Pounding Mortar & Pestle (Cối chày giã gạo chân gỗ)
  const mortar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.18, 0.38, 8),
    mats.agedWood
  );
  mortar.position.set(width / 2 - 0.6, 0.19, -0.4);
  mortar.castShadow = true;
  group.add(mortar);

  const pestle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.75, 6), mats.timberWood);
  pestle.position.set(width / 2 - 0.6, 0.45, -0.4);
  pestle.rotation.z = 0.25;
  group.add(pestle);

  // Hanging Golden Corn Bundles & Red Chilies under veranda roof (Ngô bắp & ớt khô phơi hiên)
  [-0.6, 0.6].forEach((hx, hIdx) => {
    const cornBundle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.04, 0.35, 6),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.6 })
    );
    cornBundle.position.set(hx, floorY + houseHeight + 0.05, porchFrontZ - 0.2);
    group.add(cornBundle);

    // Hanging string
    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.15, 4), mats.timberWood);
    string.position.set(hx, floorY + houseHeight + 0.25, porchFrontZ - 0.2);
    group.add(string);
  });

  // Woven Bamboo Back-Basket (Gùi tre đồng bào)
  const guiBasket = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.12, 0.36, 7),
    mats.bambooGreen
  );
  guiBasket.position.set(-width / 2 + 0.35, floorY + 0.18, porchFrontZ - 0.4);
  group.add(guiBasket);

  return group;
}

/**
 * Scholar Academy Study Hall (Seowon & Văn Miếu style)

/**
 * Scholar Academy Study Hall (Seowon & Văn Miếu style)
 */
export function createScholarAcademyHall(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const width = 4.2;
  const depth = 3.0;
  const height = 2.4;

  // Granite base
  const base = new THREE.Mesh(new THREE.BoxGeometry(width + 0.4, 0.3, depth + 0.4), mats.stonePier);
  base.position.y = 0.15;
  base.castShadow = true;
  group.add(base);

  // Open timber post-and-beam construction (Seowon open hall)
  [-width / 2 + 0.2, -width / 6, width / 6, width / 2 - 0.2].forEach(px => {
    [-depth / 2 + 0.2, depth / 2 - 0.2].forEach(pz => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, height, 8), mats.timberWood);
      col.position.set(px, 0.3 + height / 2, pz);
      col.castShadow = true;
      group.add(col);
    });
  });

  // White paper partition walls at back
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(width - 0.2, height * 0.8, 0.08), mats.whiteWall);
  backWall.position.set(0, 0.3 + (height * 0.4), -depth / 2 + 0.25);
  group.add(backWall);

  // Low scholar reading tables with inkstones inside
  [-1.0, 1.0].forEach(tx => {
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.35, 0.5), mats.agedWood);
    table.position.set(tx, 0.3 + 0.175, 0);
    group.add(table);

    const book = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.05, 0.35), mats.lanternSilkYellow);
    book.position.set(tx, 0.3 + 0.38, 0);
    group.add(book);
  });

  // Dancheong under-eaves
  const dancheong = new THREE.Mesh(new THREE.BoxGeometry(width + 0.4, 0.2, depth + 0.4), mats.dancheongEaves);
  dancheong.position.y = 0.3 + height - 0.05;
  group.add(dancheong);

  // Sweeping Giwa roof
  const roof = new THREE.Mesh(new THREE.ConeGeometry(width * 0.75, 1.1, 4), mats.giwaRoof);
  roof.rotateY(Math.PI / 4);
  roof.scale.set(1.5, 0.7, 1.15);
  roof.position.y = 0.3 + height + 0.55;
  roof.castShadow = true;
  group.add(roof);

  return group;
}

/**
 * Multi-Chamber Ceramic Climbing Kiln (Lò Bầu / Mangdaengi Gama)
 */
export function createCeramicClimbingKiln(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // 4 Stepped arched brick kiln chambers ascending the hillside
  const numChambers = 4;
  for (let i = 0; i < numChambers; i++) {
    const cx = i * 1.5 - 2.2;
    const cy = i * 0.45 + 0.4;
    const cz = 0;

    // Arched brick chamber body
    const chamberGeo = new THREE.CylinderGeometry(0.75, 0.9, 1.4, 12, 1, false, 0, Math.PI);
    chamberGeo.rotateZ(Math.PI / 2);
    const chamber = new THREE.Mesh(chamberGeo, mats.terracottaRoof);
    chamber.position.set(cx, cy, cz);
    chamber.castShadow = true;
    group.add(chamber);

    // Glowing firing port / stoke hole
    const fireHole = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.35), new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xf97316,
      emissiveIntensity: 0.9
    }));
    fireHole.position.set(cx, cy - 0.15, 0.85);
    group.add(fireHole);
  }

  // Brick Chimney stack at high end
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 2.2, 8), mats.terracottaRoof);
  chimney.position.set(numChambers * 1.5 - 2.0, numChambers * 0.45 + 1.1, 0);
  chimney.castShadow = true;
  group.add(chimney);

  return group;
}

/**
 * Ceramic Drying Trestle Racks with Vases & Moon Jars
 */
export function createCeramicDryingRack(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Wooden trestle table
  const rack = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 0.8), mats.timberWood);
  rack.position.y = 0.6;
  rack.castShadow = true;
  group.add(rack);

  // Legs
  [-1.3, 1.3].forEach(lx => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6), mats.agedWood);
    leg.position.set(lx, 0.3, 0);
    group.add(leg);
  });

  // Drying Vases: Goryeo Celadon & Blue-White Porcelain
  const vaseConfigs = [
    { x: -1.1, mat: mats.jadeGlow, type: 'vase' },
    { x: -0.5, mat: mats.whiteWall, type: 'moonjar' },
    { x: 0.1, mat: mats.jadeGlow, type: 'vase' },
    { x: 0.7, mat: mats.whiteWall, type: 'bowl' },
    { x: 1.2, mat: mats.jadeGlow, type: 'moonjar' }
  ];

  vaseConfigs.forEach(v => {
    if (v.type === 'moonjar') {
      const jar = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), v.mat);
      jar.position.set(v.x, 0.85, 0);
      jar.castShadow = true;
      group.add(jar);
    } else {
      const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.45, 10), v.mat);
      vase.position.set(v.x, 0.85, 0);
      vase.castShadow = true;
      group.add(vase);
    }
  });

  return group;
}

/**
 * Vietnamese Water Puppet Pavilion in Lotus Pool (Thủy Đình)
 */
export function createWaterPuppetPavilion(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // Stone pond base
  const pond = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.4, 3.6), mats.stonePier);
  pond.position.y = 0.2;
  group.add(pond);

  // Water surface in pond
  const pondWater = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 3.2), mats.waterSurface);
  pondWater.position.y = 0.4;
  group.add(pondWater);

  // Central Red Timber Pavilion standing in water
  const pavCols = [-1.1, 1.1];
  pavCols.forEach(px => {
    pavCols.forEach(pz => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8, 8), mats.redLacquer);
      col.position.set(px, 1.3, pz);
      col.castShadow = true;
      group.add(col);
    });
  });

  // Bamboo screen curtain (Tấm sáo che thủy đình)
  const screen = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.2, 0.05), mats.bambooGreen);
  screen.position.set(0, 1.5, 0.4);
  group.add(screen);

  // Double-tier sweeping roof
  const lowerRoof = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.25, 2.8), mats.terracottaRoof);
  lowerRoof.position.y = 2.25;
  lowerRoof.castShadow = true;
  group.add(lowerRoof);

  const upperRoof = new THREE.Mesh(new THREE.ConeGeometry(1.6, 0.9, 4), mats.terracottaRoof);
  upperRoof.rotateY(Math.PI / 4);
  upperRoof.scale.set(1.4, 0.7, 1.4);
  upperRoof.position.y = 2.85;
  upperRoof.castShadow = true;
  group.add(upperRoof);

  return group;
}

/**
 * Traditional Silk Dyeing Racks (Lụa tơ tằm)
 */
export function createSilkColorRacks(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  // High timber frame
  [-1.2, 1.2].forEach(fx => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 6), mats.timberWood);
    post.position.set(fx, 1.3, 0);
    group.add(post);
  });

  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 0.08), mats.timberWood);
  topBeam.position.set(0, 2.5, 0);
  group.add(topBeam);

  // Hanging cascading silk fabric bolts
  const fabrics = [
    { x: -0.7, mat: mats.lanternSilkRed },
    { x: -0.1, mat: mats.lanternSilkYellow },
    { x: 0.5, mat: mats.jadeGlow }
  ];

  fabrics.forEach(f => {
    const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.8, 0.04), f.mat);
    cloth.position.set(f.x, 1.5, 0);
    cloth.castShadow = true;
    group.add(cloth);
  });

  return group;
}

/**
 * Covered Bridge (Chùa Cầu & Supyogyo fusion)
 */
export function createCoveredBridge(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const length = 7.6;
  const width = 2.8;

  // Weathered Stone Piers with Arch Openings (4 piers)
  const pierGeo = new THREE.BoxGeometry(0.7, 1.4, width + 0.5);
  [-2.8, -0.9, 0.9, 2.8].forEach(px => {
    const pier = new THREE.Mesh(pierGeo, mats.stonePier);
    pier.position.set(px, 0.5, 0);
    pier.castShadow = true;
    pier.receiveShadow = true;
    group.add(pier);
  });

  // Arched Wooden Bridge Deck
  const deck = new THREE.Mesh(new THREE.BoxGeometry(length, 0.3, width), mats.timberWood);
  deck.position.set(0, 1.1, 0);
  deck.castShadow = true;
  group.add(deck);

  // Central Temple Pavilion on Bridge
  const templeBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, width - 0.4), mats.ochreWall);
  templeBody.position.set(0, 1.9, 0);
  templeBody.castShadow = true;
  group.add(templeBody);

  // Red Columns
  [-2.6, -1.5, 1.5, 2.6].forEach(px => {
    [-width / 2 + 0.15, width / 2 - 0.15].forEach(pz => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.5, 8), mats.redLacquer);
      col.position.set(px, 1.85, pz);
      col.castShadow = true;
      group.add(col);
    });
  });

  // Continuous Tiled Roof along entire span
  const roof = new THREE.Mesh(new THREE.BoxGeometry(length * 0.92, 0.45, width + 0.9), mats.terracottaRoof);
  roof.position.set(0, 2.7, 0);
  roof.castShadow = true;
  group.add(roof);

  // Central Raised Pavilion Roof
  const centerRoof = new THREE.Mesh(new THREE.ConeGeometry(2.2, 1.0, 4), mats.terracottaRoof);
  centerRoof.rotateY(Math.PI / 4);
  centerRoof.scale.set(1.4, 0.7, 1.2);
  centerRoof.position.set(0, 3.25, 0);
  centerRoof.castShadow = true;
  group.add(centerRoof);

  // Dancheong under-eaves
  const dancheong = new THREE.Mesh(new THREE.BoxGeometry(length * 0.9, 0.15, width + 0.8), mats.dancheongEaves);
  dancheong.position.y = 2.45;
  group.add(dancheong);

  // Red Balustrades
  const railGeo = new THREE.BoxGeometry(length, 0.55, 0.09);
  [-width / 2 + 0.06, width / 2 - 0.06].forEach(rz => {
    const rail = new THREE.Mesh(railGeo, mats.redLacquer);
    rail.position.set(0, 1.45, rz);
    group.add(rail);
  });

  // Hanging Silk Lanterns along bridge
  [-2.2, -0.8, 0.8, 2.2].forEach(lx => {
    [-width / 2 - 0.25, width / 2 + 0.25].forEach((lz, idx) => {
      const lanternGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const lanternMat = idx === 0 ? mats.lanternSilkRed : mats.lanternSilkYellow;
      const lantern = new THREE.Mesh(lanternGeo, lanternMat);
      lantern.scale.set(0.9, 1.3, 0.9);
      lantern.position.set(lx, 2.15, lz);
      group.add(lantern);
    });
  });

  return group;
}

/**
 * Five-Tier Sacred Cloud Pagoda
 */
export function createFiveTierPagoda(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const base1 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.5, 4.8), mats.stonePier);
  base1.position.y = 0.25;
  base1.castShadow = true;
  group.add(base1);

  const base2 = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.45, 4.0), mats.stonePier);
  base2.position.y = 0.7;
  base2.castShadow = true;
  group.add(base2);

  let currentY = 0.95;
  let currentWidth = 3.2;

  for (let tier = 0; tier < 5; tier++) {
    const bodyHeight = 1.0 - tier * 0.08;
    const body = new THREE.Mesh(new THREE.BoxGeometry(currentWidth * 0.75, bodyHeight, currentWidth * 0.75), mats.redLacquer);
    body.position.y = currentY + bodyHeight / 2;
    body.castShadow = true;
    group.add(body);

    const bracket = new THREE.Mesh(new THREE.BoxGeometry(currentWidth * 0.86, 0.14, currentWidth * 0.86), mats.dancheongEaves);
    bracket.position.y = currentY + bodyHeight - 0.05;
    group.add(bracket);

    const roofGeo = new THREE.ConeGeometry(currentWidth * 0.8, 0.45, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, mats.giwaRoof);
    roof.scale.set(1.4, 0.85, 1.4);
    roof.position.y = currentY + bodyHeight + 0.25;
    roof.castShadow = true;
    group.add(roof);

    const cornerR = currentWidth * 0.72;
    [
      [-cornerR, -cornerR],
      [cornerR, -cornerR],
      [-cornerR, cornerR],
      [cornerR, cornerR]
    ].forEach(([bx, bz]) => {
      const bell = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6), mats.goldTrim);
      bell.position.set(bx, currentY + bodyHeight + 0.06, bz);
      group.add(bell);
    });

    currentY += bodyHeight + 0.4;
    currentWidth *= 0.82;
  }

  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.2, 1.6, 8), mats.goldTrim);
  spire.position.y = currentY + 0.8;
  spire.castShadow = true;
  group.add(spire);

  const lotusBud = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), mats.goldTrim);
  lotusBud.position.y = currentY + 1.6;
  group.add(lotusBud);

  return group;
}

/**
 * Grand Harmonious Ceremonial Gate
 */
export function createGrandCeremonialGate(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const width = 6.8;

  const stoneBase = new THREE.Mesh(new THREE.BoxGeometry(width, 1.8, 2.0), mats.stonePier);
  stoneBase.position.y = 0.9;
  stoneBase.castShadow = true;
  group.add(stoneBase);

  [-2.0, 0, 2.0].forEach(px => {
    const portal = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.45, 2.06), mats.agedWood);
    portal.position.set(px, 0.75, 0);
    group.add(portal);

    const door = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.35, 0.1), mats.redLacquer);
    door.position.set(px, 0.7, 0.95);
    group.add(door);
  });

  const deck = new THREE.Mesh(new THREE.BoxGeometry(width + 0.8, 0.35, 2.6), mats.timberWood);
  deck.position.y = 1.95;
  group.add(deck);

  [-2.8, -1.4, 1.4, 2.8].forEach(cx => {
    [-1.0, 1.0].forEach(cz => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.7, 8), mats.redLacquer);
      col.position.set(cx, 2.85, cz);
      group.add(col);
    });
  });

  const dancheong = new THREE.Mesh(new THREE.BoxGeometry(width + 1.0, 0.3, 2.8), mats.dancheongEaves);
  dancheong.position.y = 3.65;
  group.add(dancheong);

  const lowerRoof = new THREE.Mesh(new THREE.BoxGeometry(width + 1.6, 0.4, 3.4), mats.giwaRoof);
  lowerRoof.position.y = 3.9;
  lowerRoof.castShadow = true;
  group.add(lowerRoof);

  const upperBody = new THREE.Mesh(new THREE.BoxGeometry(width * 0.65, 0.9, 1.8), mats.ochreWall);
  upperBody.position.y = 4.45;
  group.add(upperBody);

  const upperRoof = new THREE.Mesh(new THREE.ConeGeometry(width * 0.8, 1.2, 4), mats.giwaRoof);
  upperRoof.rotateY(Math.PI / 4);
  upperRoof.scale.set(1.55, 0.75, 0.9);
  upperRoof.position.y = 5.25;
  upperRoof.castShadow = true;
  group.add(upperRoof);

  const ridgeCrest = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, width * 0.9, 8), mats.goldTrim);
  ridgeCrest.rotateZ(Math.PI / 2);
  ridgeCrest.position.set(0, 5.8, 0);
  group.add(ridgeCrest);

  [-width * 0.42, width * 0.42].forEach(dx => {
    const dragon = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.5, 6), mats.goldTrim);
    dragon.rotateZ(dx > 0 ? -Math.PI / 4 : Math.PI / 4);
    dragon.position.set(dx, 5.9, 0);
    group.add(dragon);
  });

  return group;
}

/**
 * Korean Jeongja / Mountain Tea Pavilion
 */
export function createJeongjaPavilion(): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.0, 0.4, 8), mats.stonePier);
  base.position.y = 0.2;
  group.add(base);

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8, 8), mats.timberWood);
    col.position.set(Math.cos(angle) * 1.3, 1.2, Math.sin(angle) * 1.3);
    col.castShadow = true;
    group.add(col);
  }

  const table = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.6, 8), mats.stoneStatue);
  table.position.y = 0.5;
  group.add(table);

  const ring = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.15, 8), mats.dancheongEaves);
  ring.position.y = 2.15;
  group.add(ring);

  const roof = new THREE.Mesh(new THREE.ConeGeometry(2.1, 1.2, 8), mats.giwaRoof);
  roof.position.y = 2.8;
  roof.castShadow = true;
  group.add(roof);

  const spire = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.5, 8), mats.goldTrim);
  spire.position.y = 3.55;
  group.add(spire);

  return group;
}

/**
 * Food Bazaar Cart
 */
export function createDetailedFoodCart(foodType: 'pho' | 'banh_mi' | 'tteokbokki'): THREE.Group {
  const mats = getMaterials();
  const group = new THREE.Group();

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.75, 1.1), mats.timberWood);
  body.position.y = 0.55;
  body.castShadow = true;
  group.add(body);

  [-0.6, 0.6].forEach(wx => {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 6, 16), mats.agedWood);
    wheel.position.set(wx, 0.3, 0.58);
    group.add(wheel);
  });

  [-0.7, 0.7].forEach(px => {
    [-0.45, 0.45].forEach(pz => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.4, 6), mats.agedWood);
      pole.position.set(px, 1.3, pz);
      group.add(pole);
    });
  });

  const awningMat = foodType === 'pho' ? mats.lanternSilkRed : (foodType === 'tteokbokki' ? mats.lanternSilkYellow : mats.lanternLotusPink);
  const awning = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.15, 1.3), awningMat);
  awning.position.y = 2.05;
  awning.rotateX(-0.1);
  group.add(awning);

  const cauldron = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.3, 12), mats.stoneStatue);
  cauldron.position.set(-0.35, 1.05, 0);
  group.add(cauldron);

  const steam = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), mats.whiteWall);
  steam.position.set(-0.35, 1.35, 0);
  group.add(steam);

  [0.2, 0.45].forEach(bx => {
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.1, 8), mats.whiteWall);
    bowl.position.set(bx, 0.98, 0.1);
    group.add(bowl);
  });

  return group;
}

