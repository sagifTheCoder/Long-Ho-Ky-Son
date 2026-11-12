import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildWorldTerrain } from './models/terrain';
import {
  createDetailedFusionHouse,
  createStiltHouse,
  createScholarAcademyHall,
  createCeramicClimbingKiln,
  createCeramicDryingRack,
  createWaterPuppetPavilion,
  createSilkColorRacks,
  createCoveredBridge,
  createFiveTierPagoda,
  createGrandCeremonialGate,
  createJeongjaPavilion,
  createDetailedFoodCart
} from './models/architectural';
import {
  createBambooCluster,
  createAutumnMapleTree,
  createBlossomTree,
  createAncientPineTree,
  createLotusWaterCluster
} from './models/foliage';
import {
  createScholarTurtleStele,
  createVillageGuardianTotems,
  createGiantCeladonMoonJar,
  createIncenseBurnerTripod,
  createDetailedWaterBuffalo,
  createStoneTiger,
  createDragonStoneSpine,
  createDolHareubang,
  createSampanBoat,
  createThuyenThung,
  createFloatingLantern,
  createCeremonialDrum,
  createJangdokdaePlatform,
  createKoreanRoyalGate,
  createFusionHarmonyCrown,
  createBoatRestingWharf,
  createTraditionalSailingJunk,
  createCoastalTradingVessel,
  createNPCMesh,
  createScholarGatePillars,
  createKhueVanPavilion,
  createScholarBrushTowerAndInkstone,
  createScholarTeaAndCalligraphyDesk,
  createDoctorSteleShelterPavilion,
  createFoodFestivalBooths,
  createFestivalPerformersGroup,
  createTraditionalCraftsVillageComplex,
  createWhiteCloudTaoistOverlookTerrace,
  createPotteryWorkshopAtelier,
  createCeramicCargoPier,
  createBasaltPrayerStonesAndFlora,
  createFestivalCrowdAndLivelySquare,
  createCulturalInformationBoard,
  createCrownSynthesizedCultureExhibits
} from './models/props';
import { REGIONS_DATA, NPCS_DATA, CULTURAL_THEMES_OVERVIEW } from './worldData';
import { RegionId } from './types';

export class WorldScene {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private isDestroyed: boolean = false;
  private animFrameId: number | null = null;
  private clock: THREE.Clock = new THREE.Clock();

  // Lighting
  private sunLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private lanternLights: THREE.PointLight[] = [];

  // Animated elements
  private rotatingWaterwheel: THREE.Mesh | null = null;
  private floatingLanterns: THREE.Group[] = [];
  private floatingBoats: THREE.Group[] = [];
  private skyLanterns: THREE.Group[] = [];
  private particlePetals: THREE.Points | null = null;
  private particlePositions: Float32Array | null = null;

  // Camera damping state
  private targetCameraPos: THREE.Vector3 = new THREE.Vector3(45, 50, 45);
  private targetLookAt: THREE.Vector3 = new THREE.Vector3(0, 1.5, 6);
  private currentLookAt: THREE.Vector3 = new THREE.Vector3(0, 1.5, 6);
  private cameraDistance: number = 105;
  private cameraAngleAzimuth: number = Math.PI / 4;
  private cameraAngleElevation: number = 0.68;

  // Crown animation & click state
  private crownGroup: THREE.Group | null = null;
  private crownMesh: THREE.Group | null = null;
  private crownAura: THREE.Group | null = null;
  private crownGlowRing: THREE.Group | null = null;
  private crownInvertedTriangle: THREE.Group | null = null;
  public onCrownClick?: () => void;

  // NPC Meshes & Click Interaction
  private npcMeshes: {
    id: string;
    group: THREE.Group;
    marker: THREE.Object3D;
    glowRing?: THREE.Group;
    invertedTriangle?: THREE.Group;
  }[] = [];
  public onNpcClick?: (npcId: string) => void;

  // Cultural Heritage Information Boards (7 Lands except Crown) with interactive glowing cyan rings & inverted triangles
  private themeBoardMeshes: {
    regionId: RegionId;
    group: THREE.Group;
    basePos: THREE.Vector3;
    glowRing?: THREE.Group;
    invertedTriangle?: THREE.Group;
  }[] = [];
  public onInformationBoardClick?: (regionId: RegionId) => void;

  // Animated Festival Performers & Crowd
  private animatedFestivalMembers: { obj: THREE.Object3D; animType: 'drum' | 'ribbon' | 'dance' | 'sing' }[] = [];
  private animatedFestivalCrowd: { obj: THREE.Object3D; anim: 'cheer' | 'clap' | 'pinwheel' | 'drumstick' | 'bubble' }[] = [];

  // Animated Pottery Workshop Wheels
  private animatedPotteryWheels: THREE.Object3D[] = [];

  // Cinematic Sea Voyage to Crown Sanctuary
  private voyageShip: THREE.Group | null = null;
  private isVoyaging: boolean = false;
  private voyageProgress: number = 0;
  private voyageCallback?: () => void;

  // Cinematic Auto-Tour across all regions
  public isCinematicTour: boolean = false;
  private tourTime: number = 0;
  private tourRegionIndex: number = 0;
  private regionKeys: RegionId[] = [
    'highlands',
    'bamboo',
    'mountains',
    'capital',
    'festival',
    'harbor',
    'archipelago'
  ];

  // Interaction
  private isDragging: boolean = false;
  private prevPointerX: number = 0;
  private prevPointerY: number = 0;
  private pointerDownX: number = 0;
  private pointerDownY: number = 0;
  private timeOfDay: 'day' | 'twilight' = 'twilight';

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene & Environment
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a101d);
    this.scene.fog = new THREE.FogExp2(0x0f172a, 0.0075);

    // 2. Camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(36, aspect, 1.0, 450);
    this.updateCameraOrbit();

    // 3. Renderer with PBR setup
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = !isHeadless;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);

    // Studio Environment map via PMREMGenerator
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // 4. Lighting Rig
    this.hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x1e1b4b, 0.5);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xf97316, 1.25);
    this.sunLight.position.set(45, 65, 35);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 1;
    this.sunLight.shadow.camera.far = 180;
    const shadowD = 75;
    this.sunLight.shadow.camera.left = -shadowD;
    this.sunLight.shadow.camera.right = shadowD;
    this.sunLight.shadow.camera.top = shadowD;
    this.sunLight.shadow.camera.bottom = -shadowD;
    this.sunLight.shadow.bias = -0.0001;
    this.sunLight.shadow.normalBias = 0.035;
    this.scene.add(this.sunLight);

    // 5. Populate All 8 Richly Detailed Cultural Regions
    this.buildEnrichedWorld();

    // 6. Ambient Petals & Sky Lanterns
    this.initParticlePetals();
    this.initSkyLanterns();

    // 7. Event Listeners
    this.bindEvents();

    // Apply initial lighting
    this.applyTimeOfDay(this.timeOfDay);

    // 8. Start Loop
    this.clock.start();
    this.animate();
  }

  private buildEnrichedWorld() {
    // ------------------------------------------
    // BASE TERRAIN, WATERWAYS & BRIDGES
    // ------------------------------------------
    const { terrainGroup, waterGroup, bridgesGroup } = buildWorldTerrain();
    this.scene.add(terrainGroup);
    this.scene.add(waterGroup);
    this.scene.add(bridgesGroup);

    // ==========================================
    // 1. REGION 1: THE TWIN HERITAGE CAPITAL (Center: 2, 6)
    // ==========================================
    const capitalHouses = [
      { x: -4.8, z: 3.5, rot: 0.35, variant: 'hanoi_ochre' as const },
      { x: -5.2, z: 9.2, rot: -0.35, variant: 'hanok_white' as const },
      { x: 6.8, z: 3.5, rot: 0.6, variant: 'hanoi_ochre' as const },
      { x: 7.6, z: 8.6, rot: -0.7, variant: 'hanok_white' as const },
      { x: -1.6, z: 11.6, rot: 0.15, variant: 'market_shophouse' as const },
      { x: 5.2, z: 11.6, rot: -0.2, variant: 'hanoi_ochre' as const }
    ];
    capitalHouses.forEach(h => {
      const house = createDetailedFusionHouse(h.variant);
      house.position.set(h.x, 2.1, h.z);
      house.rotation.y = h.rot;
      this.scene.add(house);
    });

    // Central Plaza: Bronze Dong Son Drum & Korean Buk Drum
    const dongSonDrum = createCeremonialDrum('dong_son');
    dongSonDrum.position.set(3.6, 2.2, 7.2);
    this.scene.add(dongSonDrum);

    const koreanBuk = createCeremonialDrum('korean_buk');
    koreanBuk.position.set(0.4, 2.2, 7.2);
    this.scene.add(koreanBuk);

    // Water Puppet Pavilion in Lotus Pool (Thủy đình)
    const puppetPavilion = createWaterPuppetPavilion();
    puppetPavilion.position.set(-3.5, 2.1, 2.5);
    this.scene.add(puppetPavilion);

    // Silk Dyeing Trestle Racks
    const silkRacks = createSilkColorRacks();
    silkRacks.position.set(7.5, 2.1, 2.5);
    silkRacks.rotation.y = -0.3;
    this.scene.add(silkRacks);

    // Trees & Lanterns
    const blossom1 = createBlossomTree(1.15);
    blossom1.position.set(-0.5, 2.1, 3.2);
    this.scene.add(blossom1);

    const maple1 = createAutumnMapleTree(1.2);
    maple1.position.set(4.5, 2.1, 2.8);
    this.scene.add(maple1);

    this.addLanternPointLight(2, 3.6, 6, 0xf59e0b, 2.8, 14);

    // ==========================================
    // 2. REGION 2: THE GOLDEN RICE HIGHLANDS (Northwest: -48, -46)
    // ==========================================
    const mountainPav = createJeongjaPavilion();
    mountainPav.position.set(-51, 5.8, -47.5);
    this.scene.add(mountainPav);

    // Traditional Stilt Houses (with doors, prop-up shutter windows, veranda, carved ladder, and hanging harvest)
    const stilt1 = createStiltHouse('main');
    stilt1.position.set(-47, 4.4, -43);
    stilt1.rotation.y = -0.3; // Veranda, doors, and ladder face toward the rice terraces and path
    this.scene.add(stilt1);

    const stilt2 = createStiltHouse('village');
    stilt2.position.set(-51, 3.5, -40);
    stilt2.rotation.y = 0.4; // Slightly rotated village home
    this.scene.add(stilt2);

    // Warm evening glow from stilt house porches and windows
    this.addLanternPointLight(-47, 5.8, -41.8, 0xf59e0b, 2.2, 12);
    this.addLanternPointLight(-51, 4.9, -38.8, 0xf59e0b, 2.0, 10);

    // Jangdokdae platform & Water Buffalo
    const jangdokdae = createJangdokdaePlatform();
    jangdokdae.position.set(-44, 4.4, -47);
    this.scene.add(jangdokdae);

    const buffalo = createDetailedWaterBuffalo();
    buffalo.position.set(-45, 3.3, -44);
    buffalo.rotation.y = 0.8;
    this.scene.add(buffalo);

    // Jangseung Village Totems & Cây Nêu Pole
    const totems = createVillageGuardianTotems();
    totems.position.set(-40, 2.6, -38);
    this.scene.add(totems);

    // Bamboo waterwheel
    const wheelGeo = new THREE.TorusGeometry(1.7, 0.16, 8, 16);
    this.rotatingWaterwheel = new THREE.Mesh(wheelGeo, new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 }));
    this.rotatingWaterwheel.position.set(-41.5, 3.2, -40);
    this.rotatingWaterwheel.rotation.y = Math.PI / 2;
    this.scene.add(this.rotatingWaterwheel);

    // Bamboo clusters
    [-50, -47, -53].forEach((bx, idx) => {
      const bamboo = createBambooCluster(1.0 + idx * 0.15);
      bamboo.position.set(bx, 4.5 + idx * 0.3, -49 + idx * 2.5);
      this.scene.add(bamboo);
    });

    this.addLanternPointLight(-48, 4.8, -46, 0xf59e0b, 2.8, 14);

    // ==========================================
    // 3. REGION 3: THE LANTERN & LOTUS HARBOR (Northeast: 52, -38)
    // ==========================================
    const coveredBridge = createCoveredBridge();
    coveredBridge.position.set(52, 1.4, -38);
    coveredBridge.rotation.y = Math.PI / 2;
    this.scene.add(coveredBridge);

    const harborHouses = [
      { x: 47.5, z: -33, rot: 0.4 },
      { x: 47.0, z: -43, rot: -0.2 },
      { x: 56.5, z: -33, rot: -0.5 },
      { x: 56.8, z: -43, rot: 0.3 }
    ];
    harborHouses.forEach(hh => {
      const house = createDetailedFusionHouse('hanoi_ochre');
      house.position.set(hh.x, 1.4, hh.z);
      house.rotation.y = hh.rot;
      this.scene.add(house);
    });

    // Sampan boats on canal
    const sampan1 = createSampanBoat();
    sampan1.position.set(52, 0.4, -31);
    this.floatingBoats.push(sampan1);
    this.scene.add(sampan1);

    const sampan2 = createSampanBoat();
    sampan2.position.set(52, 0.4, -45);
    sampan2.rotation.y = Math.PI;
    this.floatingBoats.push(sampan2);
    this.scene.add(sampan2);

    // Floating Silk & Lotus lanterns
    for (let l = 0; l < 20; l++) {
      const type = l % 2 === 0 ? 'silk_diamond' : 'lotus';
      const lantern = createFloatingLantern(type);
      const lz = -29 - l * 0.9;
      const lx = 52 + (Math.sin(l * 1.4) * 1.6);
      lantern.position.set(lx, 0.4, lz);
      this.floatingLanterns.push(lantern);
      this.scene.add(lantern);
    }

    // Coastal Boat Resting Wharf (Nhà Bè & Bến Neo Nghỉ Thuyền)
    const boatRestingWharf = createBoatRestingWharf();
    boatRestingWharf.position.set(63.5, 0.4, -36);
    boatRestingWharf.rotation.y = 0.2;
    this.scene.add(boatRestingWharf);

    // Traditional Vietnamese Sailing Junk anchored in the bay (Thuyền Buồm Tam Bản Cánh Dơi)
    const sailingJunk1 = createTraditionalSailingJunk();
    sailingJunk1.position.set(69.5, 0.35, -44);
    sailingJunk1.rotation.y = -0.45;
    this.floatingBoats.push(sailingJunk1);
    this.scene.add(sailingJunk1);

    // Traditional Coastal Trading Vessel anchored off the wharf (Thuyền Buôn Duyên Hải)
    const tradingVessel = createCoastalTradingVessel();
    tradingVessel.position.set(68.0, 0.35, -28);
    tradingVessel.rotation.y = 0.85;
    this.floatingBoats.push(tradingVessel);
    this.scene.add(tradingVessel);

    // Moored fishing sampans resting near the outer coastal waters
    const coastalBoat1 = createSampanBoat();
    coastalBoat1.position.set(60.0, 0.35, -50);
    coastalBoat1.rotation.y = 1.2;
    this.floatingBoats.push(coastalBoat1);
    this.scene.add(coastalBoat1);

    const coastalBoat2 = createSampanBoat();
    coastalBoat2.position.set(73.5, 0.35, -36);
    coastalBoat2.rotation.y = -1.1;
    this.floatingBoats.push(coastalBoat2);
    this.scene.add(coastalBoat2);

    this.addLanternPointLight(52, 2.8, -38, 0xf97316, 3.2, 16);
    this.addLanternPointLight(63.5, 3.2, -36, 0xf59e0b, 2.6, 14);
    this.addLanternPointLight(69.5, 2.6, -44, 0xf97316, 2.0, 10);

    // ==========================================
    // 4. REGION 4: THE DRAGON & TIGER MOUNTAINS (Southwest: -30, 50)
    // ==========================================
    const pagoda = createFiveTierPagoda();
    pagoda.position.set(-33, 8.25, 48);
    this.scene.add(pagoda);

    // White Tiger Guardian Statue & Bronze Incense Burner
    const tiger = createStoneTiger();
    tiger.position.set(-23, 5.65, 53);
    tiger.rotation.y = -Math.PI / 4;
    this.scene.add(tiger);

    const incense = createIncenseBurnerTripod();
    incense.position.set(-25, 5.65, 52);
    this.scene.add(incense);

    // Coiling Dragon Stone Spine - firmly seated on the dedicated bedrock foundation
    const dragonSpine = createDragonStoneSpine();
    dragonSpine.position.set(-36, 3.68, 42);
    dragonSpine.rotation.y = -0.5;
    this.scene.add(dragonSpine);

    // Ancient Twisted Pines & Mountain Maples with Dedicated Planters & Zero Clipping
    // 1. Western Welcome Solnamu Pine (Bến cầu Rừng Trúc - không chạm vách đá)
    const pine1 = createAncientPineTree(1.25);
    pine1.position.set(-42.5, 3.12, 38.5);
    pine1.rotation.y = 0.5;
    this.scene.add(pine1);

    // 2. Southern Coastline Overlook Pines (2 Cây thông cổ thụ đằng sau núi - không chạm vách đá)
    const pine2a = createAncientPineTree(1.3);
    pine2a.position.set(-30.0, 2.60, 63.5);
    pine2a.rotation.y = -1.2;
    this.scene.add(pine2a);

    const pine2b = createAncientPineTree(1.25);
    pine2b.position.set(-20.5, 2.60, 63.0);
    pine2b.rotation.y = 0.8;
    this.scene.add(pine2b);

    // Warm ambient lantern light near the 2 trees and the cultural information board
    this.addLanternPointLight(-25.2, 3.6, 63.0, 0xf59e0b, 2.2, 12);

    // 3. Eastern Foothills Autumn Crimson Maple (Thềm đón khách từ Kinh Đô)
    const maple = createAutumnMapleTree(1.2);
    maple.position.set(-16.5, 2.60, 43.5);
    maple.rotation.y = 0.8;
    this.scene.add(maple);

    // 4. White Tiger Sanctuary Sacred Pine (Thềm đền Bạch Hổ thoáng đãng)
    const pine3 = createAncientPineTree(1.2);
    pine3.position.set(-18.0, 4.52, 56.0);
    pine3.rotation.y = 1.8;
    this.scene.add(pine3);

    // 5. Pagoda Lookout Bonsai Pine (Mỏm vọng cảnh Vân Phong Tháp)
    const pine4 = createAncientPineTree(1.1);
    pine4.position.set(-38.5, 7.12, 51.5);
    pine4.rotation.y = -0.6;
    this.scene.add(pine4);

    // High Summit Pagoda Lantern Glow
    this.addLanternPointLight(-30, 9.2, 50, 0xf59e0b, 2.8, 16);

    // Mountain Pilgrim Stairway Atmospheric Lantern Glows
    this.addLanternPointLight(-23.0, 3.8, 42.0, 0xf59e0b, 2.0, 12); // Base trailhead gate
    this.addLanternPointLight(-28.5, 5.8, 49.5, 0xf59e0b, 2.4, 14); // Mid-mountain rest pavilion
    this.addLanternPointLight(-32.4, 9.2, 46.5, 0xf59e0b, 2.2, 12); // Summit gateway arch

    // Bạch Vân Tiên Đài - Dedicated White Cloud Overlook Terrace for Ẩn Sĩ Bạch Vân
    const taoistTerrace = createWhiteCloudTaoistOverlookTerrace();
    taoistTerrace.position.set(-26.0, 4.4, 44.5);
    this.scene.add(taoistTerrace);
    this.addLanternPointLight(-26.0, 5.8, 44.5, 0x818cf8, 2.2, 12);

    // ==========================================
    // 5. REGION 5: THE AZURE ISLAND ARCHIPELAGO & CRAFTS (Southeast: 44, 36)
    // ==========================================
    const dol1 = createDolHareubang();
    dol1.position.set(40, 1.35, 33);
    dol1.rotation.y = -0.6;
    this.scene.add(dol1);

    const dol2 = createDolHareubang();
    dol2.position.set(47, 1.35, 38);
    dol2.rotation.y = 0.8;
    this.scene.add(dol2);

    const thung1 = createThuyenThung();
    thung1.position.set(38, 0.3, 30);
    this.floatingBoats.push(thung1);
    this.scene.add(thung1);

    const thung2 = createThuyenThung();
    thung2.position.set(46, 0.3, 42);
    this.floatingBoats.push(thung2);
    this.scene.add(thung2);

    // Stepped Climbing Kiln (Lò Bầu)
    const kiln = createCeramicClimbingKiln();
    kiln.position.set(44, 1.0, 36);
    kiln.rotation.y = -0.4;
    this.scene.add(kiln);

    // Ceramic Drying Trestle Racks (Celadon & Blue-White)
    const dryingRack1 = createCeramicDryingRack();
    dryingRack1.position.set(41, 1.0, 39);
    this.scene.add(dryingRack1);

    const dryingRack2 = createCeramicDryingRack();
    dryingRack2.position.set(47, 1.0, 34);
    dryingRack2.rotation.y = 0.5;
    this.scene.add(dryingRack2);

    // Giant Celadon Moon Jar Centerpiece
    const moonJar = createGiantCeladonMoonJar();
    moonJar.position.set(45, 1.0, 32);
    this.scene.add(moonJar);

    // Lotus blooms
    [
      [40, 0.25, 32],
      [48, 0.25, 35],
      [43, 0.25, 42]
    ].forEach(([lx, ly, lz]) => {
      const lotus = createLotusWaterCluster();
      lotus.position.set(lx, ly, lz);
      this.scene.add(lotus);
    });

    // Traditional Crafts Village Complex (Đông Hồ woodblock prints, Minhwa folk art, Najeon mother-of-pearl lacquerware, Conical Hats & Hanji Fans, Bát Tràng blue-and-white porcelain)
    const craftsVillage = createTraditionalCraftsVillageComplex();
    craftsVillage.position.set(44, 1.15, 36);
    this.scene.add(craftsVillage);

    // Traditional Covered Pottery Artisan Atelier (bàn xoay vuốt gốm thủ công, chum ủ men tam sắc, ván phơi gốm mộc, củi nung lò)
    const workshop = createPotteryWorkshopAtelier();
    workshop.group.position.set(48.5, 1.0, 39.5);
    workshop.group.rotation.y = -0.35;
    this.animatedPotteryWheels = workshop.animatedWheels;
    this.scene.add(workshop.group);

    // Wooden Pottery Export & Fishing Cargo Pier (cầu tàu gỗ xuất khẩu gốm, kiện hàng, lưới đánh cá phơi nắng)
    const cargoPier = createCeramicCargoPier();
    cargoPier.position.set(39.0, 0.25, 41.5);
    cargoPier.rotation.y = 0.65;
    this.scene.add(cargoPier);

    // Jeju Basalt Prayer Stones (Bangsatap / Doltap) and Coastal Bonsai Pines
    const prayerFlora = createBasaltPrayerStonesAndFlora();
    prayerFlora.position.set(48.5, 1.0, 31.0);
    this.scene.add(prayerFlora);

    this.addLanternPointLight(44, 2.5, 36, 0x0d9488, 2.8, 14);
    this.addLanternPointLight(48.5, 2.6, 39.5, 0x14b8a6, 2.4, 12); // Workshop glow
    this.addLanternPointLight(39.0, 1.8, 41.5, 0xf59e0b, 2.0, 10); // Pier lantern glow

    // ==========================================
    // 6. REGION 6: THE GRAND FESTIVAL GROUNDS (North: -8, -38)
    // ==========================================
    const grandGate = createGrandCeremonialGate();
    grandGate.position.set(-8, 2.1, -30);
    this.scene.add(grandGate);

    const monument = this.buildCelestialMonument();
    monument.position.set(-8, 2.7, -38);
    this.scene.add(monument);

    // Food Bazaar Stalls
    const cartPho = createDetailedFoodCart('pho');
    cartPho.position.set(-12.5, 2.2, -37);
    cartPho.rotation.y = 0.5;
    this.scene.add(cartPho);

    const cartTteok = createDetailedFoodCart('tteokbokki');
    cartTteok.position.set(-3.5, 2.2, -37);
    cartTteok.rotation.y = -0.5;
    this.scene.add(cartTteok);

    const cartBanhMi = createDetailedFoodCart('banh_mi');
    cartBanhMi.position.set(-2.5, 2.2, -34);
    cartBanhMi.rotation.y = -1.2;
    this.scene.add(cartBanhMi);

    // Food Festival Booths: Kimchi crocks, Bánh chưng, skewers, sweet cakes, and dining tables
    const foodFestivalBooths = createFoodFestivalBooths();
    foodFestivalBooths.position.set(-8, 2.1, -38);
    this.scene.add(foodFestivalBooths);

    // Festival Folk Performers: Quan Họ singers, Samulnori drummers, and folk dancers
    const performers = createFestivalPerformersGroup();
    performers.group.position.set(-8, 2.7, -35.0);
    this.animatedFestivalMembers = performers.animatedMembers;
    this.scene.add(performers.group);

    // Bustling Festival Additions: Cheering crowd, kids with pinwheels, Lion Dance Head & Great War Drum, giant steaming Pho cauldron, sugarcane cart, sweet Hotteok griddle, overhead lantern garlands, and Royal Parasols
    const livelySquare = createFestivalCrowdAndLivelySquare();
    livelySquare.group.position.set(-8, 2.1, -38);
    this.animatedFestivalCrowd = livelySquare.animatedCrowd;
    this.scene.add(livelySquare.group);

    this.addLanternPointLight(-8, 4.6, -38, 0xd946ef, 3.4, 18);
    this.addLanternPointLight(-8, 3.6, -30, 0xf59e0b, 2.6, 12);
    this.addLanternPointLight(-8, 4.8, -44.5, 0xef4444, 2.8, 14); // Lion dance & Great War Drum
    this.addLanternPointLight(-15.5, 3.2, -35.6, 0xf97316, 2.6, 12); // Giant Pho Cauldron hearth
    this.addLanternPointLight(-0.5, 3.2, -35.6, 0xfacc15, 2.6, 12); // Hotteok pancake griddle

    // ==========================================
    // 7. REGION 7: THE BAMBOO SCHOLAR GROVE (West: -56, 2)
    // ==========================================
    // 1. Khổng Học Tứ Trụ Biểu Môn & Hongsalmun (Ceremonial Entrance Gate)
    const scholarGate = createScholarGatePillars();
    scholarGate.position.set(-53.0, 2.0, -5.5);
    scholarGate.rotation.y = 0.2;
    this.scene.add(scholarGate);

    // 2. Khuê Văn Các Pavilion (Pavilion of the Constellation of Literature)
    const khueVan = createKhueVanPavilion();
    khueVan.position.set(-62.0, 2.0, 1.2);
    khueVan.rotation.y = 0.5;
    this.scene.add(khueVan);

    // 3. Tiled Shelter Pavilion for Doctor Turtle Steles (Nhà Bia Tiến Sĩ)
    const stelePavilion = createDoctorSteleShelterPavilion();
    stelePavilion.position.set(-56.0, 2.0, -1.0);
    this.scene.add(stelePavilion);

    // Doctor Turtle Steles housed inside the pavilion (Bia Rùa Tiến Sĩ)
    const turtle1 = createScholarTurtleStele();
    turtle1.position.set(-54.5, 2.0, -1.0);
    turtle1.rotation.y = 0.2;
    this.scene.add(turtle1);

    const turtle2 = createScholarTurtleStele();
    turtle2.position.set(-57.5, 2.0, -1.0);
    turtle2.rotation.y = -0.2;
    this.scene.add(turtle2);

    // 4. Tháp Bút ("Tả Thanh Thiên") & Đại Nghiên Mực Hoa Sen (Stone Brush Tower & Lotus Inkstone)
    const brushAndInk = createScholarBrushTowerAndInkstone();
    brushAndInk.position.set(-50.5, 2.0, 1.0);
    brushAndInk.rotation.y = -0.4;
    this.scene.add(brushAndInk);

    // 5. Bàn Trà Đạo & Bút Nghiên Nho Sĩ (Scholar Tea & Calligraphy Desk under Bamboo)
    const teaDesk = createScholarTeaAndCalligraphyDesk();
    teaDesk.position.set(-58.5, 2.0, 5.2);
    this.scene.add(teaDesk);

    // 6. Scholar Academy Hall (Giảng Đường Viện Khổng Học Seowon)
    const academy = createScholarAcademyHall();
    academy.position.set(-55.5, 2.0, 5.5);
    this.scene.add(academy);

    // Dense Bamboo Grove around the sanctuary
    [-60, -56, -53, -61, -52].forEach((bx, idx) => {
      const bamboo = createBambooCluster(1.2 + (idx % 2) * 0.2);
      bamboo.position.set(bx, 2.0, -4 + idx * 2.8);
      this.scene.add(bamboo);
    });

    this.addLanternPointLight(-56, 3.2, 2, 0x10b981, 2.4, 14);
    this.addLanternPointLight(-62.0, 3.8, 1.2, 0xf59e0b, 2.0, 10); // Khuê Văn Các Lantern
    this.addLanternPointLight(-53.0, 3.5, -5.5, 0xef4444, 2.0, 10); // Gate Red Lantern

    // ==========================================
    // 8. REGION 8: THE CROWN OF HARMONY SANCTUARY (Far South Sea: 8, 140)
    // ==========================================
    // Korean Royal Palatial Gate (Hòa Hợp Môn / 화합문)
    const koreanRoyalGate = createKoreanRoyalGate();
    koreanRoyalGate.position.set(8, 2.72, 128);
    this.scene.add(koreanRoyalGate);

    // The Crown of Cultural Harmony (Vương Miện Hòa Hợp)
    const crownBundle = createFusionHarmonyCrown();
    crownBundle.group.position.set(8, 2.72, 140);
    this.crownGroup = crownBundle.group;
    this.crownMesh = crownBundle.crownMesh;
    this.crownAura = crownBundle.auraSparkles;
    this.crownGlowRing = crownBundle.glowRing;
    this.crownInvertedTriangle = crownBundle.invertedTriangle;
    this.scene.add(crownBundle.group);

    // Two Blossom & Ancient Pine trees flanking the sacred walkway
    const crownBlossom1 = createBlossomTree(1.1);
    crownBlossom1.position.set(4.8, 2.72, 134);
    this.scene.add(crownBlossom1);

    const crownBlossom2 = createAncientPineTree(1.15);
    crownBlossom2.position.set(11.2, 2.72, 134);
    crownBlossom2.rotation.y = 1.2;
    this.scene.add(crownBlossom2);

    // Glowing Sacred Lotuses around the altar water ring
    [
      [5.2, 2.68, 139],
      [10.8, 2.68, 139],
      [6.4, 2.68, 142.5],
      [9.6, 2.68, 142.5]
    ].forEach(([lx, ly, lz]) => {
      const lotus = createLotusWaterCluster();
      lotus.position.set(lx, ly, lz);
      this.scene.add(lotus);
    });

    // Atmospheric Lanterns & Radiant Celestial Crown Point Lights
    this.addLanternPointLight(8, 6.2, 128, 0xf59e0b, 2.8, 16); // Gate Lantern Light
    this.addLanternPointLight(8, 4.8, 140, 0xfbbf24, 3.8, 18); // Crown Radiant Aura Glow
    this.addLanternPointLight(8, 5.2, 140, 0x38bdf8, 2.2, 12); // Celestial Jade Glimmer

    // Synthesized Cultural Exhibits of all 7 Lands (Khu Trưng Bày Tổng Hợp Di Sản Giao Thoa Việt - Hàn)
    const crownExhibits = createCrownSynthesizedCultureExhibits();
    this.scene.add(crownExhibits);

    // ==========================================
    // 9. CULTURAL CHARACTERS & GUIDE NPCS (Across all regions)
    // ==========================================
    NPCS_DATA.forEach(npc => {
      const { group, marker, glowRing, invertedTriangle } = createNPCMesh(npc);
      group.position.set(npc.pos.x, npc.pos.y, npc.pos.z);
      if (npc.rotY !== undefined) {
        group.rotation.y = npc.rotY;
      }
      this.npcMeshes.push({
        id: npc.id,
        group,
        marker,
        glowRing,
        invertedTriangle
      });
      this.scene.add(group);
    });


    // ==========================================
    // 10. CULTURAL INFORMATION BOARDS (All 7 lands except Crown Sanctuary)
    // ==========================================
    Object.values(CULTURAL_THEMES_OVERVIEW).forEach(theme => {
      const boardGroup = createCulturalInformationBoard(theme.regionId, theme);
      boardGroup.position.set(theme.boardPos.x, theme.boardPos.y, theme.boardPos.z);
      if (theme.rotY !== undefined) {
        boardGroup.rotation.y = theme.rotY;
      }
      const glowRing = boardGroup.getObjectByName('glowRing') as THREE.Group | undefined;
      const invertedTriangle = boardGroup.getObjectByName('invertedTriangle') as THREE.Group | undefined;
      this.themeBoardMeshes.push({
        regionId: theme.regionId,
        group: boardGroup,
        basePos: new THREE.Vector3(theme.boardPos.x, theme.boardPos.y, theme.boardPos.z),
        glowRing,
        invertedTriangle
      });
      this.scene.add(boardGroup);
    });
  }

  private buildCelestialMonument(): THREE.Group {
    const group = new THREE.Group();
    const dais = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 4.0, 0.75, 16), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 }));
    dais.position.y = 0.38;
    group.add(dais);

    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.9, 3.6, 12), new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.3, metalness: 0.85 }));
    pillar.position.y = 2.15;
    group.add(pillar);

    const core = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xef4444,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.3
    }));
    core.position.y = 4.0;
    group.add(core);

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.1, 8, 24), new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.5 }));
    ring1.position.y = 4.0;
    ring1.rotation.x = 0.7;
    group.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.1, 8, 24), new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xe11d48, emissiveIntensity: 0.5 }));
    ring2.position.y = 4.0;
    ring2.rotation.y = 0.7;
    group.add(ring2);

    return group;
  }

  private addLanternPointLight(x: number, y: number, z: number, color: number, intensity: number, distance: number) {
    const light = new THREE.PointLight(color, intensity, distance, 1.8);
    light.position.set(x, y, z);
    this.lanternLights.push(light);
    this.scene.add(light);
  }

  private initParticlePetals() {
    const count = 160;
    const geometry = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      this.particlePositions[i * 3] = (Math.random() - 0.5) * 140;
      this.particlePositions[i * 3 + 1] = Math.random() * 30 + 2;
      this.particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 140;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xf472b6,
      size: 0.55,
      transparent: true,
      opacity: 0.75
    });

    this.particlePetals = new THREE.Points(geometry, material);
    this.scene.add(this.particlePetals);
  }

  private initSkyLanterns() {
    for (let i = 0; i < 18; i++) {
      const g = new THREE.Group();
      const geo = new THREE.CylinderGeometry(0.24, 0.3, 0.55, 8);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.75,
        roughness: 0.3
      });
      const mesh = new THREE.Mesh(geo, mat);
      g.add(mesh);

      g.position.set(
        (Math.random() - 0.5) * 60,
        Math.random() * 20 + 8,
        -35 - Math.random() * 25
      );
      this.skyLanterns.push(g);
      this.scene.add(g);
    }
  }

  public applyTimeOfDay(time: 'day' | 'twilight') {
    this.timeOfDay = time;
    if (time === 'day') {
      this.scene.background = new THREE.Color(0x7dd3fc);
      this.scene.fog = new THREE.FogExp2(0xbae6fd, 0.0065);
      this.hemiLight.color.setHex(0xffffff);
      this.hemiLight.groundColor.setHex(0x38bdf8);
      this.hemiLight.intensity = 0.95;
      this.sunLight.color.setHex(0xfef08a);
      this.sunLight.intensity = 2.2;
      this.lanternLights.forEach(l => {
        l.intensity = 0.8;
      });
    } else {
      this.scene.background = new THREE.Color(0x0a101d);
      this.scene.fog = new THREE.FogExp2(0x0f172a, 0.0075);
      this.hemiLight.color.setHex(0x38bdf8);
      this.hemiLight.groundColor.setHex(0x1e1b4b);
      this.hemiLight.intensity = 0.5;
      this.sunLight.color.setHex(0xf97316);
      this.sunLight.intensity = 1.0;
      this.lanternLights.forEach(l => {
        l.intensity = 3.2;
      });
    }
  }

  public focusRegion(regionId: RegionId) {
    this.isCinematicTour = false;
    const data = REGIONS_DATA[regionId];
    if (!data) return;
    this.targetLookAt.set(data.center.x, data.center.y, data.center.z);
    this.cameraDistance = 34;
    this.cameraAngleAzimuth = Math.PI / 4;
    this.cameraAngleElevation = 0.65;
    this.updateCameraOrbit();
  }

  public focusOverview() {
    this.isCinematicTour = false;
    this.targetLookAt.set(2, 1.5, 32);
    this.cameraDistance = 145;
    this.cameraAngleAzimuth = Math.PI / 4;
    this.cameraAngleElevation = 0.68;
    this.updateCameraOrbit();
  }

  public toggleCinematicTour() {
    this.isCinematicTour = !this.isCinematicTour;
    if (this.isCinematicTour) {
      this.tourTime = 0;
    }
  }

  private updateCameraOrbit() {
    const r = this.cameraDistance;
    const phi = this.cameraAngleElevation;
    const theta = this.cameraAngleAzimuth;

    this.targetCameraPos.set(
      this.currentLookAt.x + r * Math.cos(phi) * Math.sin(theta),
      this.currentLookAt.y + r * Math.sin(phi),
      this.currentLookAt.z + r * Math.cos(phi) * Math.cos(theta)
    );
  }

  private bindEvents() {
    const dom = this.renderer.domElement;

    dom.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isCinematicTour = false;
      this.isDragging = true;
      this.prevPointerX = e.clientX;
      this.prevPointerY = e.clientY;
      this.pointerDownX = e.clientX;
      this.pointerDownY = e.clientY;
    });

    dom.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isDragging) {
        // Hover cursor effect over NPCs and Cultural Information Boards
        const rect = dom.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        const targets = [
          ...this.npcMeshes.map(n => n.group),
          ...this.themeBoardMeshes.map(b => b.group)
        ];
        const intersects = raycaster.intersectObjects(targets, true);
        dom.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
        return;
      }
      const dx = e.clientX - this.prevPointerX;
      const dy = e.clientY - this.prevPointerY;
      this.prevPointerX = e.clientX;
      this.prevPointerY = e.clientY;

      if (e.buttons === 1) {
        this.cameraAngleAzimuth -= dx * 0.005;
        this.cameraAngleElevation = Math.max(0.2, Math.min(1.25, this.cameraAngleElevation + dy * 0.005));
        this.updateCameraOrbit();
      } else if (e.buttons === 2) {
        const panSpeed = 0.06;
        this.currentLookAt.x -= dx * panSpeed;
        this.currentLookAt.z += dy * panSpeed;
        this.targetLookAt.copy(this.currentLookAt);
        this.updateCameraOrbit();
      }
    });

    window.addEventListener('pointerup', (e: PointerEvent) => {
      if (this.isDragging) {
        // Check if it was a quick click rather than drag
        const dist = Math.hypot(e.clientX - this.pointerDownX, e.clientY - this.pointerDownY);
        if (dist < 6) {
          const rect = dom.getBoundingClientRect();
          const mouse = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
          );
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, this.camera);
          const interactiveTargets = [
            ...this.npcMeshes.map(n => n.group),
            ...this.themeBoardMeshes.map(b => b.group),
            ...(this.crownGroup ? [this.crownGroup] : [])
          ];
          const intersects = raycaster.intersectObjects(interactiveTargets, true);
          if (intersects.length > 0) {
            let curr: THREE.Object3D | null = intersects[0].object;
            while (curr && !curr.userData?.npcId && !curr.userData?.isInformationBoard && !curr.userData?.isCrown && curr.parent) {
              curr = curr.parent;
            }
            if (curr) {
              if (curr.userData?.isInformationBoard && this.onInformationBoardClick) {
                this.onInformationBoardClick(curr.userData.regionId);
              } else if (curr.userData?.npcId && this.onNpcClick) {
                this.onNpcClick(curr.userData.npcId);
              } else if (curr.userData?.isCrown && this.onCrownClick) {
                this.onCrownClick();
              }
            }
          }
        }
      }
      this.isDragging = false;
    });

    dom.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      this.isCinematicTour = false;
      this.cameraDistance = Math.max(18, Math.min(130, this.cameraDistance + e.deltaY * 0.05));
      this.updateCameraOrbit();
    }, { passive: false });

    window.addEventListener('resize', this.onResize);
  }

  public embarkVoyageToCrownSanctuary(onComplete: () => void) {
    if (this.isVoyaging) return;
    this.isCinematicTour = false;
    this.isVoyaging = true;
    this.voyageProgress = 0;
    this.voyageCallback = onComplete;

    if (!this.voyageShip) {
      this.voyageShip = createTraditionalSailingJunk();
      this.scene.add(this.voyageShip);
    }
    this.voyageShip.visible = true;
    this.voyageShip.position.set(62.5, 0.35, -34);
    this.voyageShip.rotation.y = Math.PI * 0.75;

    this.targetLookAt.set(62.5, 1.0, -34);
    this.cameraDistance = 34;
    this.cameraAngleElevation = 0.52;
    this.cameraAngleAzimuth = Math.PI / 4;
    this.updateCameraOrbit();
  }

  private onResize = () => {
    if (!this.container || this.isDestroyed) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private animate = () => {
    if (this.isDestroyed) return;
    this.animFrameId = requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.05);
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Cinematic Tour across 8 regions
    if (this.isCinematicTour) {
      this.tourTime += delta;
      this.cameraAngleAzimuth += delta * 0.1;

      if (this.tourTime > 8) {
        this.tourTime = 0;
        this.tourRegionIndex = (this.tourRegionIndex + 1) % this.regionKeys.length;
        const targetReg = REGIONS_DATA[this.regionKeys[this.tourRegionIndex]];
        this.targetLookAt.set(targetReg.center.x, targetReg.center.y, targetReg.center.z);
        this.cameraDistance = 36;
      }
      this.updateCameraOrbit();
    }

    // 2. Cinematic Sea Voyage Animation
    if (this.isVoyaging && this.voyageShip) {
      this.voyageProgress += delta / 4.2;
      const t = Math.min(1.0, this.voyageProgress);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      // Waypoints from Harbor (62.5, -34) through open sea down to Crown Sanctuary dock (8, 120)
      const p0 = new THREE.Vector3(62.5, 0.35, -34);
      const p1 = new THREE.Vector3(54.0, 0.35, 25);
      const p2 = new THREE.Vector3(28.0, 0.35, 85);
      const p3 = new THREE.Vector3(8.0, 0.35, 120);

      const shipPos = new THREE.Vector3()
        .copy(p0).multiplyScalar(Math.pow(1 - ease, 3))
        .add(p1.clone().multiplyScalar(3 * Math.pow(1 - ease, 2) * ease))
        .add(p2.clone().multiplyScalar(3 * (1 - ease) * Math.pow(ease, 2)))
        .add(p3.clone().multiplyScalar(Math.pow(ease, 3)));

      this.voyageShip.position.copy(shipPos);
      this.voyageShip.position.y = 0.35 + Math.sin(elapsedTime * 4.0) * 0.06;
      this.voyageShip.rotation.z = Math.sin(elapsedTime * 3.0) * 0.05;

      const nextT = Math.min(1.0, ease + 0.01);
      const nextPos = new THREE.Vector3()
        .copy(p0).multiplyScalar(Math.pow(1 - nextT, 3))
        .add(p1.clone().multiplyScalar(3 * Math.pow(1 - nextT, 2) * nextT))
        .add(p2.clone().multiplyScalar(3 * (1 - nextT) * Math.pow(nextT, 2)))
        .add(p3.clone().multiplyScalar(Math.pow(nextT, 3)));
      const dir = nextPos.clone().sub(shipPos).normalize();
      this.voyageShip.rotation.y = Math.atan2(dir.x, dir.z);

      this.targetLookAt.copy(shipPos);
      this.currentLookAt.lerp(shipPos, 5.0 * delta);
      this.cameraDistance = 30;
      this.updateCameraOrbit();

      if (this.voyageProgress >= 1.0) {
        this.isVoyaging = false;
        this.targetLookAt.set(8, 3.2, 138);
        this.cameraDistance = 34;
        this.cameraAngleAzimuth = Math.PI / 4;
        this.cameraAngleElevation = 0.65;
        this.updateCameraOrbit();

        if (this.voyageCallback) {
          const cb = this.voyageCallback;
          this.voyageCallback = undefined;
          cb();
        }
      }
    }

    // 3. Camera Interpolation
    this.currentLookAt.lerp(this.targetLookAt, 3.8 * delta);
    this.updateCameraOrbit();
    this.camera.position.lerp(this.targetCameraPos, 3.8 * delta);
    this.camera.lookAt(this.currentLookAt);

    // 4. Environmental Animations
    if (this.rotatingWaterwheel) {
      this.rotatingWaterwheel.rotation.x += delta * 1.2;
    }

    this.floatingBoats.forEach((boat, i) => {
      boat.rotation.z = Math.sin(elapsedTime * 1.5 + i) * 0.05;
      boat.position.y = 0.25 + Math.sin(elapsedTime * 2.0 + i) * 0.03;
    });

    this.floatingLanterns.forEach((lantern, i) => {
      lantern.position.y = 0.38 + Math.sin(elapsedTime * 2.5 + i * 0.8) * 0.02;
      lantern.rotation.y += delta * 0.2;
    });

    // NPC Overhead Markers & Glowing Circle Animation
    this.npcMeshes.forEach((npc, i) => {
      if (npc.invertedTriangle) {
        npc.invertedTriangle.rotation.y += delta * 1.5;
        npc.invertedTriangle.position.y = 3.05 + Math.sin(elapsedTime * 3.0 + i * 0.8) * 0.12;
      } else if (npc.marker) {
        npc.marker.rotation.y += delta * 1.5;
        npc.marker.position.y = 2.85 + Math.sin(elapsedTime * 2.8 + i * 0.6) * 0.08;
      }
      if (npc.glowRing) {
        npc.glowRing.rotation.y += delta * 0.4;
        const pulse = 1.0 + Math.sin(elapsedTime * 2.8 + i * 0.7) * 0.045;
        npc.glowRing.scale.set(pulse, 1.0, pulse);
      }
    });

    // Cultural Information Boards: Glowing Circle & Inverted Triangle Marker Animation
    // Rotates continuously and pulses gently to signal interactive clickability to players
    this.themeBoardMeshes.forEach((board, i) => {
      if (board.glowRing) {
        board.glowRing.rotation.y += delta * 0.4;
        const pulse = 1.0 + Math.sin(elapsedTime * 2.8 + i * 0.7) * 0.045;
        board.glowRing.scale.set(pulse, 1.0, pulse);
      }
      if (board.invertedTriangle) {
        // Continuous slow rotation + gentle floating bobbing up and down
        board.invertedTriangle.rotation.y += delta * 1.5;
        board.invertedTriangle.position.y = 3.55 + Math.sin(elapsedTime * 3.0 + i * 0.8) * 0.12;
      }
    });

    // Festival Performers Animation (Quan Họ singing, Samulnori ribbon twirling, drum beating, dancing)
    this.animatedFestivalMembers.forEach((member, i) => {
      if (member.animType === 'ribbon') {
        member.obj.rotation.y += delta * 4.2;
      } else if (member.animType === 'drum') {
        member.obj.rotation.y = Math.sin(elapsedTime * 6.0 + i) * 0.12;
      } else if (member.animType === 'dance') {
        member.obj.rotation.y = Math.sin(elapsedTime * 3.0) * 0.25;
        member.obj.position.y = Math.abs(Math.sin(elapsedTime * 4.0)) * 0.08;
      } else if (member.animType === 'sing') {
        member.obj.rotation.z = Math.sin(elapsedTime * 2.2 + i * 1.5) * 0.05;
        member.obj.rotation.x = Math.sin(elapsedTime * 1.8 + i) * 0.04;
      }
    });

    // Bustling Festival Crowd & Elements Animation (Cheering, clapping, spinning pinwheels, war drum, steam wisps)
    this.animatedFestivalCrowd.forEach((member, i) => {
      if (member.anim === 'cheer') {
        member.obj.position.y = Math.abs(Math.sin(elapsedTime * 4.2 + i * 1.4)) * 0.1;
        member.obj.rotation.z = Math.sin(elapsedTime * 2.4 + i) * 0.05;
      } else if (member.anim === 'clap') {
        member.obj.rotation.x = Math.sin(elapsedTime * 6.2 + i) * 0.08;
      } else if (member.anim === 'pinwheel') {
        member.obj.rotation.z += delta * 7.5;
      } else if (member.anim === 'drumstick') {
        member.obj.rotation.x = 0.4 + Math.sin(elapsedTime * 8.0) * 0.32;
      } else if (member.anim === 'bubble') {
        member.obj.position.y = 1.25 + Math.sin(elapsedTime * 2.0) * 0.08;
        member.obj.rotation.y += delta * 0.4;
      }
    });

    // Artisan Pottery Workshop Spinning Wheels Animation
    this.animatedPotteryWheels.forEach(wheel => {
      wheel.rotation.y += delta * 3.5;
    });

    // Crown of Cultural Harmony Rotation & Floating Oscillation
    if (this.crownMesh) {
      this.crownMesh.rotation.y += delta * 0.35;
      this.crownMesh.position.y = 1.85 + Math.sin(elapsedTime * 1.6) * 0.14;
    }
    if (this.crownAura) {
      this.crownAura.rotation.y -= delta * 0.45;
    }
    if (this.crownGlowRing) {
      this.crownGlowRing.rotation.y += delta * 0.4;
      const pulse = 1.0 + Math.sin(elapsedTime * 2.8) * 0.045;
      this.crownGlowRing.scale.set(pulse, 1.0, pulse);
    }
    if (this.crownInvertedTriangle) {
      this.crownInvertedTriangle.rotation.y += delta * 1.5;
      this.crownInvertedTriangle.position.y = 3.65 + Math.sin(elapsedTime * 3.0) * 0.12;
    }

    this.skyLanterns.forEach((sl, i) => {
      sl.position.y += delta * 0.6;
      sl.position.x += Math.sin(elapsedTime * 0.5 + i) * delta * 0.25;
      if (sl.position.y > 34) {
        sl.position.y = 8;
      }
    });

    if (this.particlePetals && this.particlePositions) {
      const positions = this.particlePositions;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] -= delta * 1.2;
        positions[i * 3] += Math.sin(elapsedTime + i) * delta * 0.8;
        if (positions[i * 3 + 1] < 0.5) {
          positions[i * 3 + 1] = 30;
        }
      }
      this.particlePetals.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public focusThemeBoard(regionId: RegionId) {
    const board = this.themeBoardMeshes.find(b => b.regionId === regionId);
    if (board) {
      this.isCinematicTour = false;
      this.targetLookAt.copy(board.basePos);
      this.cameraDistance = 32;
      this.cameraAngleElevation = 0.54;
      this.updateCameraOrbit();
    }
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
