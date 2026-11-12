import { RegionData, CulturalLoreEntry, CollectibleItem, CulturalFragment, NPCData, CulturalThemeOverview } from './types';

export const REGIONS_DATA: Record<string, RegionData> = {
  highlands: {
    id: 'highlands',
    order: 1,
    nameEn: 'The Golden Rice Highlands',
    nameVi: 'Cao Nguyên Lúa Vàng',
    nameKo: '황금 계단골 (Hwanggeum Gyedangol)',
    titleSubtitle: 'Mù Cang Chải Terraces & Jirisan Alpine Mist',
    color: '#D97706',
    accentColor: '#10B981',
    bgGradient: 'from-amber-900/40 to-emerald-950/30',
    center: { x: -48, y: 3.5, z: -46 },
    cameraOffset: { x: -34, y: 26, z: -32 },
    description: 'Expansive stepped terraced rice paddies cascading down green mountains. Clear alpine water rushes through bamboo aqueducts past Korean doldam stone walls, Jangdokdae earthenware jar terraces, and wooden stilt houses where water buffalos rest.',
    culturalFusionDescription: 'Vietnamese agricultural terracing (ruộng bậc thang) crafted with Korean dry-stone masonry (doldam). Village entrances feature wooden Jangseung spirit totems alongside Vietnamese bamboo Cây Nêu poles.',
    vietnameseInspirations: ['Mù Cang Chải & Sapa Rice Terraces', 'Tay & Hmong wooden stilt architecture (Nhà sàn)', 'Bamboo water wheels (Guồng nước)', 'Cây Nêu bamboo poles'],
    koreanInspirations: ['Jirisan mountain valleys', 'Jeju & Namhae dry stone walls (Doldam)', 'Jeongja open wooden pavilions', 'Jangdokdae earthenware platforms', 'Jangseung village totems'],
    landmarks: [
      { name: 'Seven-Tier Golden Cascade', description: 'Ancient terraced paddy field carved with precision to catch misty mountain run-off.', pos: { x: -48, y: 4.5, z: -46 } },
      { name: 'Bamboo Aqueduct & Waterwheel', description: 'Giant wooden wheel rotating slowly, scooping spring water into bamboo conduits.', pos: { x: -41.5, y: 3.2, z: -40 } },
      { name: 'Jangdokdae Onggi Terrace', description: 'Stone platform lined with earthenware jars fermenting paste and seasonal harvest.', pos: { x: -44, y: 4.4, z: -47 } },
      { name: 'Highland Hermitage Pavilion', description: 'Cliff-edge octagonal pavilion where mountain hermits brewed roasted green tea.', pos: { x: -51, y: 5.8, z: -47.5 } }
    ],
    quest: {
      id: 'quest_highlands',
      regionId: 'highlands',
      title: 'The Spring Water Aqueducts',
      titleVi: 'Dòng Nước Phù Sa',
      titleKo: '생명의 물길',
      summary: 'Rotate and redirect the bamboo sluices so pure alpine snowmelt can nourish the seven tiers of golden rice seedlings.',
      summaryVi: 'Điều chỉnh các van cống tre để dẫn dòng nước mát tưới đều khắp 7 bậc ruộng.',
      culturalLore: 'Rice is the shared sacred staple of both civilizations. Terracing symbolizes human harmony with steep mountains.',
      objective: 'Activate 3 Bamboo Sluice Gates along the mountain terrace.',
      progress: 0,
      target: 3,
      isCompleted: false,
      rewardName: 'Golden Grain Talisman',
      rewardArtifact: 'Harvest Spirit Vessel'
    },
    gameplayMechanic: 'Water diversion puzzle: rotating wooden aqueduct flumes to fill dry paddy basins.'
  },
  bamboo: {
    id: 'bamboo',
    order: 2,
    nameEn: 'The Bamboo Scholar Grove',
    nameVi: 'Trúc Lâm Văn Miếu',
    nameKo: '죽림 서원 (Jukrim Seowon)',
    titleSubtitle: 'Damyang Bamboo Groves & Văn Miếu Turtle Stele Academies',
    color: '#16A34A',
    accentColor: '#F59E0B',
    bgGradient: 'from-emerald-950/40 to-green-950/30',
    center: { x: -56, y: 1.4, z: 2 },
    cameraOffset: { x: -40, y: 24, z: 18 },
    description: 'A serene emerald bamboo sanctuary of ancient wisdom and poetry. Winding elevated bamboo footpaths lead past stone scholar turtles carrying royal doctorate steles, Korean Seowon wooden lecture pavilions, inkstone tables, and chattering wind chimes.',
    culturalFusionDescription: 'Hanoi’s Văn Miếu Quốc Tử Giám doctor turtle steles (Bia Rùa Tiến Sĩ) integrated into Damyang’s renowned Juknokwon bamboo forest and Korean Seowon neo-Confucian private academies.',
    vietnameseInspirations: ['Văn Miếu Quốc Tử Giám (Temple of Literature)', 'Trúc Lâm Zen bamboo monasteries of Yên Tử', 'Doctor Turtle Steles (Bia Tiến sĩ trên lưng rùa đá)', 'Traditional Calligraphy master booths'],
    koreanInspirations: ['Damyang Juknokwon Bamboo Forest', 'Byeongsan & Dosan Seowon scholar academies', 'Traditional ink painting (Sumuk-hwa) & Hanji calligraphy', 'Bamboo pavilion viewpoints (Sigyeongjeong)'],
    landmarks: [
      { name: 'Doctor Turtle Stele Pavilions', description: 'Carved blue stone turtles carrying tall granite steles honoring wisdom, modesty, and poetry.', pos: { x: -54, y: 2.2, z: -1 } },
      { name: 'Seowon Scholar Study Hall', description: 'Open timber academy with sliding paper doors overlooking rustling green bamboo culms.', pos: { x: -57, y: 2.3, z: 4 } },
      { name: 'Moonlit Inkstone Courtyard', description: 'Granite tables set with pine-soot inksticks, water droppers, and squirrel-hair calligraphy brushes.', pos: { x: -53, y: 1.9, z: 4 } },
      { name: 'Whispering Bamboo Canopy Walkway', description: 'Elevated split-bamboo boardwalk winding through thirty-foot tall golden-green bamboo stems.', pos: { x: -56, y: 2.0, z: -5 } }
    ],
    quest: {
      id: 'quest_bamboo',
      regionId: 'bamboo',
      title: 'Scroll of Eternal Verses',
      titleVi: 'Cuộn Tranh Thi Họa',
      titleKo: '천년의 시화',
      summary: 'Visit the four scholar turtle steles and gather the seasonal poetic verses written in classical gold calligraphy.',
      summaryVi: 'Tìm bốn văn bia rùa đá để thỉnh bốn câu thơ thi họa bốn mùa.',
      culturalLore: 'Scholars of both dynasties revered moral rectitude, filial duty, and the resilient grace of bamboo which bends in monsoon winds but never breaks.',
      objective: 'Honor the 4 Scholar Turtle Steles in the bamboo grove.',
      progress: 0,
      target: 4,
      isCompleted: false,
      rewardName: 'Scholar Jade Inkstone',
      rewardArtifact: 'Brush of Celestial Calligraphy'
    },
    gameplayMechanic: 'Calligraphy verse alignment and turtle stele resonance chime.'
  },
  mountains: {
    id: 'mountains',
    order: 3,
    nameEn: 'The Dragon & Tiger Mountains',
    nameVi: 'Dãy Núi Long Hổ',
    nameKo: '용호 신산 (Yong-Ho Sinsan)',
    titleSubtitle: 'Hạ Long Dragon Spines & Baekdusan Tiger Sanctuaries',
    color: '#059669',
    accentColor: '#D97706',
    bgGradient: 'from-emerald-950/40 to-slate-900/40',
    center: { x: -30, y: 4.2, z: 50 },
    cameraOffset: { x: -16, y: 28, z: 64 },
    description: 'A dramatic, sacred mountain range where colossal jade stone formations resemble the coiling spines of dragons emerging from mist, guarded by ancient stone tiger shrines, suspension rope bridges, and a five-tiered pagoda.',
    culturalFusionDescription: 'Vietnamese dragon folklore (Con Rồng Cháu Tiên) interwoven with Korean sacred tiger lore (Baekdusan Horangi). Misty peaks feature both Vietnamese tam quan gates and Korean Sanshin-gak mountain god shrines.',
    vietnameseInspirations: ['Bái Đính & Yên Tử sacred mountain pagodas', 'Hạ Long Bay descending dragon myths', 'Tràng An misty limestone caverns', 'Ancient banyan tree spirit shrines'],
    koreanInspirations: ['Mount Baekdu & Seoraksan craggy peaks', 'Korean Tiger folk art (Minhwa)', 'Sanshingak (Mountain Spirit pavilions)', 'Suspension cloud bridges (Gureumdari)'],
    landmarks: [
      { name: 'Five-Tier Cloud Pagoda', description: 'Majestic red-and-gold timber tower overlooking misty gorges with copper wind bells.', pos: { x: -33, y: 8.25, z: 48 } },
      { name: 'Cloud-Ascent Pilgrim Stairway', description: 'Winding ancient stone path carved through misty cliffs with resting pavilions, climbing from the foothills up to the summit pagoda.', pos: { x: -28.5, y: 4.88, z: 49.5 } },
      { name: 'Dragon Spine Ridge', description: 'Jagged limestone crest sculpted into vertebrae of a slumbering celestial dragon.', pos: { x: -36, y: 3.68, z: 42 } },
      { name: 'Shrine of the White Tiger Guardian', description: 'Carved stone grotto housing a whimsical tiger statue crowned with pine boughs.', pos: { x: -23, y: 5.65, z: 53 } },
      { name: 'Sky-Rope Suspension Bridge', description: 'Rope bridge swinging over a fathomless misty ravine connecting two sacred peaks.', pos: { x: -28, y: 6.95, z: 50.5 } }
    ],
    quest: {
      id: 'quest_mountains',
      regionId: 'mountains',
      title: 'Trial of the Twin Guardians',
      titleVi: 'Bảo Ngọc Song Thú',
      titleKo: '용과 호랑이의 시련',
      summary: 'Awaken the Dragon Pearl atop the limestone crest and the Tiger Jade Seal in the mountain shrine.',
      summaryVi: 'Kích hoạt Viên Ngọc Rồng và Ấn Bạch Hổ trong động thánh để xua tan sương mù.',
      culturalLore: 'In Asian cosmology, the Azure Dragon commands the waters while the White Tiger commands the earth.',
      objective: 'Align the Dragon Pearl and Tiger Jade orbs on the mountain altars.',
      progress: 0,
      target: 2,
      isCompleted: false,
      rewardName: 'Jade Beast Seal',
      rewardArtifact: 'Sky Dragon Pearl'
    },
    gameplayMechanic: 'Cliff ascent navigation, rope bridge crossing, and twin celestial orb pedestal puzzle.'
  },
  festival: {
    id: 'festival',
    order: 4,
    nameEn: 'Grand Cultural Festival Grounds',
    nameVi: 'Quảng Trường Đại Lễ',
    nameKo: '대동 축제 마당 (Daedong Chukje Madang)',
    titleSubtitle: 'The Celestial Confluence of Two Civilizations',
    color: '#8B5CF6',
    accentColor: '#F43F5E',
    bgGradient: 'from-purple-950/40 to-rose-950/30',
    center: { x: -8, y: 1.8, z: -38 },
    cameraOffset: { x: 6, y: 26, z: -24 },
    description: 'The monumental endgame celebration grounds where both worlds unite! A colossal Dragon-and-Tiger fountain monument stands framed by ceremonial đình-palace gates, performance pavilions, ascending sky lanterns, and an aromatic food street.',
    culturalFusionDescription: 'Vietnamese communal đình curved eaves blend with Korean Gwanghwamun palatial dancheong gates. Dual performance pavilions feature Áo Dài dancers alongside Hanbok fan dancers and Samulnori drummers.',
    vietnameseInspirations: ['Hội Lim & Tết Nguyên Đán festivities', 'Đình làng curved eave architecture', 'Phở, Bánh Mì & Nem rán culinary heritage', 'Quan Họ folk singing boats'],
    koreanInspirations: ['Chuseok & Daedong festival celebrations', 'Buchaechum fan dance & Talchum mask theatre', 'Tteokbokki, Hotteok & Korean street food streets', 'Gwanghwamun royal ceremonial gates'],
    landmarks: [
      { name: 'Celestial Dragon & Tiger Monument', description: 'Towering bronze fountain depicting the dragon and tiger in celestial balance.', pos: { x: -8, y: 3.5, z: -38 } },
      { name: 'Grand Harmonious Gate (Đại Môn Song Tộc)', description: 'Spectacular multi-tier ceremonial gate with sweeping winged eaves and dancheong woodwork.', pos: { x: -8, y: 2.6, z: -30 } },
      { name: 'Dual Arts Amphitheatre', description: 'Dual performance stages adorned with silk banners, lotus blossoms, and ribbon streamers.', pos: { x: -16, y: 2.3, z: -40 } },
      { name: 'Street Food Bazaar of Two Lands', description: 'Row of steaming food carts serving hot Phở, crispy Bánh Mì, and spicy Tteokbokki.', pos: { x: 0, y: 2.2, z: -38 } }
    ],
    quest: {
      id: 'quest_festival',
      regionId: 'festival',
      title: 'The Great Celestial Jubilee',
      titleVi: 'Đại Lễ Giao Hòa',
      titleKo: '천상 대동제',
      summary: 'Channel the cultural artifacts onto the Celestial Monument to ignite the grand fireworks and lantern spectacle.',
      summaryVi: 'Dâng các thánh vật văn hóa lên Tượng Đài Long Hổ để khai hội pháo hoa rực rỡ.',
      culturalLore: 'When two rich traditions meet as kin of the same earth, their legends interlock like the dragon and tiger.',
      objective: 'Channel the Regional Relics into the Central Monument.',
      progress: 0,
      target: 5,
      isCompleted: false,
      rewardName: 'Crown of the Dual Realm',
      rewardArtifact: 'Eternal Harmony Essence'
    },
    gameplayMechanic: 'Final relic coronation, fireworks launch sequence, and realm celebration cinematic.'
  },
  capital: {
    id: 'capital',
    order: 5,
    nameEn: 'The Twin Heritage Capital',
    nameVi: 'Thủ Phủ Song Long',
    nameKo: '쌍용 도읍 (Ssang-Yong Doseong)',
    titleSubtitle: 'Hanoi Tube Architecture & Bukchon Hanok Synthesis',
    color: '#E11D48',
    accentColor: '#F59E0B',
    bgGradient: 'from-rose-900/40 to-amber-900/30',
    center: { x: 2, y: 1.2, z: 6 },
    cameraOffset: { x: 16, y: 22, z: 22 },
    description: 'A bustling royal citadel blending the historic terracotta tube houses of Hanoi with the curved giwa eaves of a traditional Korean Hanok village. Features silk dyeing racks, water puppet theater on the lotus pond, and grand ceremonial drum courtyards.',
    culturalFusionDescription: 'Hanoi 36 Old Streets (Phố Cổ) narrow facades meet Bukchon Hanok open courtyards (Madang). Gilded red lacquer columns pair with royal five-colored Dancheong eaves and five-element festival flags.',
    vietnameseInspirations: ['Hanoi 36 Old Streets', 'Thăng Long Imperial Citadel', 'Đoan Môn Gate', 'Water Puppet Pavilion (Thủy đình)'],
    koreanInspirations: ['Bukchon Hanok Village', 'Gyeongbokgung Palace', 'Dancheong Architectural Painting', 'Royal Silk Dyeing'],
    landmarks: [
      { name: 'Grand Harmonious Gate (Cổng Thái Hòa)', description: 'Ceremonial archway blending curved đình roofs with Korean palace bracket systems.', pos: { x: 2, y: 1.5, z: 15.5 } },
      { name: 'Water Puppet Lotus Pavilion', description: 'Two-tier wooden pavilion sitting in a tranquil lotus pool for legendary dragon puppet performances.', pos: { x: -3.5, y: 1.2, z: 2.5 } },
      { name: 'Old Town Artisan Arcade', description: 'Winding alleys lined with silk weavers, tea houses, and calligraphy shops.', pos: { x: -4.5, y: 1.2, z: 10.5 } },
      { name: 'Central Festival Plaza', description: 'Granite flagstone courtyard where Đông Sơn bronze drums and Korean Buk drums meet.', pos: { x: 2, y: 1.2, z: 6 } }
    ],
    quest: {
      id: 'quest_capital',
      regionId: 'capital',
      title: 'Harmony of Rhythms',
      titleVi: 'Vũ Điệu Hòa Âm',
      titleKo: '화음의 북소리',
      summary: 'Restore the ceremonial drums in the Central Plaza by matching traditional Vietnamese Trống Đồng bronze motifs with Korean Samulnori Buk rhythms.',
      summaryVi: 'Hòa nhịp tiếng trống đồng Đông Sơn cùng tiếng trống Buk Hàn Quốc.',
      culturalLore: 'Percussion in both cultures commands celestial respect: Dong Son drums embody solar energy, while Korean Buk and Janggu mirror earth thunder.',
      objective: 'Align the 3 Sacred Drums around the Harmony Plaza.',
      progress: 0,
      target: 3,
      isCompleted: false,
      rewardName: 'Bronze Solar Chime',
      rewardArtifact: 'Artifact of Harmonic Resonance'
    },
    gameplayMechanic: 'Dancheong color matching & drum alignment puzzle on the central plaza tiles.'
  },
  harbor: {
    id: 'harbor',
    order: 6,
    nameEn: 'The Lantern & Lotus Harbor',
    nameVi: 'Bến Cảng Hoa Đăng',
    nameKo: '연등 나루 (Yeondeung Naru)',
    titleSubtitle: 'Hội An Riverside Romance & Jinju Lantern Waters',
    color: '#0284C7',
    accentColor: '#EC4899',
    bgGradient: 'from-cyan-950/40 to-pink-950/30',
    center: { x: 52, y: 0.9, z: -38 },
    cameraOffset: { x: 66, y: 22, z: -24 },
    description: 'A glowing canal port illuminated by hundreds of silk lanterns and floating paper lotus blossoms. Wooden sampans navigate beneath an arched covered bridge connecting bustling spice, tea, and ceramic wharves.',
    culturalFusionDescription: 'Hội An’s golden-ochre merchant facades draped in bougainvillea meet Korean Jinju river lanterns, floating paper lotuses, and Supyogyo-style stone covered bridge footings.',
    vietnameseInspirations: ['Hội An Ancient Town canal', 'Japanese-Vietnamese Covered Bridge (Chùa Cầu)', 'Hoài River night lantern releasing', 'Riverfront trading houses'],
    koreanInspirations: ['Jinju Namgang Yudeung Festival', 'Cheonggyecheon Lantern Procession', 'Lotus Lantern Festival (Yeondeunghoe)', 'Supyogyo stone covered bridge footings'],
    landmarks: [
      { name: 'Moonlit Covered Bridge (Chùa Cầu)', description: 'Elaborate wooden bridge with tiled eave roofs, protecting travelers from river gales.', pos: { x: 52, y: 1.5, z: -38 } },
      { name: 'Canal Promenade & Tea Quay', description: 'Ochre shopfronts draped in cascading pink bougainvillea and glowing red silk lanterns.', pos: { x: 47, y: 1.1, z: -33 } },
      { name: 'Lotus Sanctuary Pool', description: 'Quiet river basin where sacred pink lotus lanterns float and whisper wishes.', pos: { x: 57, y: 0.9, z: -43 } },
      { name: 'Old Harbor Sampan Wharf', description: 'Wooden pontoons where curved sampan boats moor alongside spice merchant warehouses.', pos: { x: 56, y: 1.0, z: -32 } }
    ],
    quest: {
      id: 'quest_harbor',
      regionId: 'harbor',
      title: 'River of Thousand Wishes',
      titleVi: 'Dòng Sông Ước Nguyện',
      titleKo: '소원의 강',
      summary: 'Collect and release the seasonal lantern offerings into the canal so their glowing reflections unlock the hidden gate beneath the Covered Bridge.',
      summaryVi: 'Thắp sáng và thả các ngọn đèn hoa đăng bốn mùa trôi dọc theo dòng kênh.',
      culturalLore: 'Releasing floating lanterns onto water carries prayers for peace and ancestral reverence into the quiet night.',
      objective: 'Light and release 4 Seasonal Lanterns along the river canal.',
      progress: 0,
      target: 4,
      isCompleted: false,
      rewardName: 'Luminous Silk Lantern',
      rewardArtifact: 'Eternal Lotus Core'
    },
    gameplayMechanic: 'Night lantern floating mechanic and canal water-gate unlocking sequence.'
  },
  archipelago: {
    id: 'archipelago',
    order: 7,
    nameEn: 'The Azure Island Archipelago & Crafts',
    nameVi: 'Quần Đảo Lam Ngọc & Gốm Sứ',
    nameKo: '푸른 해도와 도예 (Pureun Haedo)',
    titleSubtitle: 'Hạ Long Emerald Karsts, Jeju Basalt & Bát Tràng Pottery Kilns',
    color: '#0D9488',
    accentColor: '#38BDF8',
    bgGradient: 'from-teal-950/40 to-sky-950/30',
    center: { x: 44, y: 0.8, z: 36 },
    cameraOffset: { x: 58, y: 22, z: 50 },
    description: 'An idyllic sea sanctuary of emerald karst pillars rising from crystal turquoise lagoons, edged by black basalt reefs. Features wooden coracle boats (thuyền thúng), Dol Hareubang sea guardians, and stepped climbing pottery kilns (lò bầu) with Goryeo celadon and Bát Tràng vases.',
    culturalFusionDescription: 'Hạ Long Bay’s limestone sea towers seamlessly merge with Jeju Island’s dark volcanic rock coast, women diver shelters, Dol Hareubang statues, and traditional multi-chamber dragon kilns.',
    vietnameseInspirations: ['Hạ Long Bay limestone karsts & caves', 'Thuyền thúng (woven round basket boats)', 'Bát Tràng & Chu Đậu climbing pottery kilns (Lò Bầu)', 'Floating fishing villages & stilt huts'],
    koreanInspirations: ['Jeju Island basalt volcanic formations', 'Dol Hareubang grandfather stone statues', 'Goryeo celadon & Joseon moon jars', 'Haenyeo diving stone shelters'],
    landmarks: [
      { name: 'Twin Pillar Sea Gate', description: 'Colossal karst towers forming a majestic natural sea entrance for sailing junks.', pos: { x: 54, y: 2.8, z: 28 } },
      { name: 'Volcanic Basalt Lagoon & Kiln', description: 'Hexagonal black basalt column reef with wood-fired climbing pottery kiln.', pos: { x: 44, y: 0.7, z: 36 } },
      { name: 'Guardian Dol Hareubang Shrine', description: 'Ancient stone guardian figure wearing a bamboo conical hat, holding a pearl offering.', pos: { x: 40, y: 1.2, z: 33 } },
      { name: 'Floating Fishermen Wharf', description: 'Bamboo pontoons, drying fish nets, and moored wooden coracle craft.', pos: { x: 38, y: 0.8, z: 30 } }
    ],
    quest: {
      id: 'quest_archipelago',
      regionId: 'archipelago',
      title: 'The Island Sea Beacon',
      titleVi: 'Hải Đăng Cổ Tích',
      titleKo: '바다의 등불',
      summary: 'Hop across volcanic stepping stones and ignite the three pearl beacons across the karst archipelago.',
      summaryVi: 'Vượt qua bãi đá bazan và thắp sáng các ngọn đèn ngọc bích trên các đảo đá vôi.',
      culturalLore: 'Coastal communities in both countries revere the sea with intimate devotion, carving stone guardians to guide mariners safely home.',
      objective: 'Ignite 3 Sea Pearl Beacons across the karst islands.',
      progress: 0,
      target: 3,
      isCompleted: false,
      rewardName: 'Coracle Pearl Compass',
      rewardArtifact: 'Azure Ocean Core'
    },
    gameplayMechanic: 'Stepping-stone hopping, coracle boat crossing, and coastal pearl beacon ignition.'
  },
  crown_sanctuary: {
    id: 'crown_sanctuary',
    order: 8,
    nameEn: 'The Crown of Harmony Sanctuary',
    nameVi: 'Vương Đảo Hòa Hợp Văn Hóa',
    nameKo: '화합의 왕관도 (Hwahap-ui Wanggwando)',
    titleSubtitle: 'Vương Miện Tân La & Mặt Trời Đông Sơn - Đỉnh Cao Giao Thoa Việt - Hàn',
    color: '#F59E0B',
    accentColor: '#38BDF8',
    bgGradient: 'from-amber-950/60 via-slate-900/50 to-cyan-950/40',
    center: { x: 8, y: 3.2, z: 138 },
    cameraOffset: { x: 8, y: 15, z: 162 },
    description: 'Hòn đảo thiêng biệt lập hoàn toàn giữa vùng biển ngọc bích phương Nam, vinh danh sự thành công tìm hiểu và tinh hoa giao thoa giữa hai nền văn hóa Việt - Hàn. Bước qua Cổng Hoàng Gia Hàn Quốc (Hòa Hợp Môn), người hành hương sẽ chiêm ngưỡng Chiếc Vương Miện Hòa Hợp lơ lửng phát sáng trên đài sen bạch ngọc.',
    culturalFusionDescription: 'Sự hợp nhất đỉnh cao giữa nghệ thuật chế tác Vương miện vàng Tân La (Silla Geumgwan - biểu tượng cành cây vũ trụ, gạc hươu và ngọc bội khúc ngọc 곡옥) với Nghệ thuật đúc đồng Đông Sơn, hình tượng Chim Lạc và đài sen ngọc Đại Việt.',
    vietnameseInspirations: ['Mặt trời 14 tia sáng & họa tiết chim Lạc Đông Sơn', 'Đài sen bạch ngọc cung đình Thăng Long & Huế', 'Ngọc Rồng Thần Kim Quy hộ quốc', 'Hoành phi câu đối sơn son thếp vàng'],
    koreanInspirations: ['Vương miện vàng Tân La (Silla Cheonmachong Gold Crown)', 'Khúc ngọc 곡옥 (Gogok) & phiến vàng lấp lánh (Susu)', 'Cổng Hoàng Cung Gwanghwamun & Cổng Iljumun Hàn Quốc', 'Kiến trúc rui mè sơn thếp Dancheong cung đình'],
    landmarks: [
      { name: 'Korean Royal Harmony Gate (Hòa Hợp Môn)', description: 'Cổng hoàng gia Hàn Quốc uy nghiêm với mái ngói Giwa cong vút, hệ xà Dancheong ngũ sắc và hoành phi vàng "Hòa Hợp Môn".', pos: { x: 8, y: 2.8, z: 128 } },
      { name: 'Crown of Cultural Harmony (Vương Miện Hòa Hợp)', description: 'Bảo vật vương miện kết tinh giữa vàng Tân La, ngọc bội Gogok và mặt trời chim Lạc Đông Sơn lơ lửng tỏa sáng hào quang.', pos: { x: 8, y: 4.8, z: 140 } },
      { name: 'White Jade Lotus Altar (Đài Sen Bạch Ngọc)', description: 'Đài sen bát giác bằng đá cẩm thạch trắng chạm khắc hoa sen hoàng gia nâng đỡ vương miện thiêng.', pos: { x: 8, y: 2.8, z: 140 } },
      { name: 'Song Linh Hộ Quốc: Rồng Vàng Lý Triều & Bạch Hổ Baekdu', description: 'Cặp tượng thần thú hộ quốc chầu hai bên đài sen: Rồng vàng Đại Việt uốn khúc mềm mại ngậm minh châu đối xứng cùng Bạch Hổ oai vệ xứ Hàn.', pos: { x: 1.6, y: 2.8, z: 140 } },
      { name: 'Nhã Nhạc Song Tộc: Trống Đồng Đông Sơn & Trống Buk Samgomu', description: 'Đài trưng bày nhạc khí cung đình với Trống đồng Đông Sơn chạm mặt trời 14 tia sáng và Trống Buk cung đình ngũ sắc Dancheong.', pos: { x: 2.8, y: 2.8, z: 144.8 } },
      { name: 'Tinh Hoa Gốm Sứ & Thần Bảo Hộ Đảo Biển', description: 'Đài vọng cảnh phía bắc trưng bày Bình gốm hoa lam Bát Tràng, Bạch ngọc Moon Jar thuần khiết cùng Tượng thần đá Dol Hareubang đảo Jeju.', pos: { x: 8, y: 2.8, z: 148.6 } },
      { name: 'Khu Di Sản Nông Nghiệp Lúa Nước & Chum Sành Onggi', description: 'Thềm đá bậc thang trưng bày lúa vàng trĩu hạt, cối đá, máng tre cùng các hũ chum sành Đại Việt và chum Onggi lên men truyền thống.', pos: { x: 2.8, y: 2.8, z: 126.8 } },
      { name: 'Khu Văn Hiến Nho Học: Bia Rùa Tiến Sĩ & Viện Seowon', description: 'Bia rùa đá tiến sĩ Văn Miếu bên cạnh bàn nghiên mực thi họa, cuộn thư pháp chữ vàng và rặng trúc vàng Damyang thanh tao.', pos: { x: 13.2, y: 2.8, z: 126.8 } },
      { name: 'Bia Kỷ Niệm Đại Hòa Hợp Văn Hóa Việt - Hàn', description: 'Tấm bia ngọc bích chạm khắc trán rồng hổ và vầng thái dương ghi dấu sự giao thoa, tình hữu nghị vĩnh cửu giữa hai dân tộc.', pos: { x: 4.2, y: 2.8, z: 129.8 } }
    ],
    quest: {
      id: 'quest_crown',
      regionId: 'crown_sanctuary',
      title: 'Triumph of Cultural Synergy',
      titleVi: 'Kỳ Tích Giao Thoa Việt - Hàn',
      titleKo: '문화 화합의 완성',
      summary: 'Channel the wisdom discovered across all regions into the Crown of Harmony to awaken its eternal radiant aura.',
      summaryVi: 'Được vinh danh sau khi tìm hiểu trọn vẹn sự tương đồng và nét đẹp giao thoa văn hóa giữa hai dân tộc Việt - Hàn.',
      culturalLore: 'True harmony does not diminish individuality; it intertwines the finest virtues of both peoples into a shared radiant crown.',
      objective: 'Chiêm ngưỡng Vương Miện Giao Thoa trên hòn đảo biệt lập thiêng liêng.',
      progress: 1,
      target: 1,
      isCompleted: true,
      rewardName: 'Crown of Eternal Synergy',
      rewardArtifact: 'Dual Dynasty Imperial Seal'
    },
    gameplayMechanic: 'Sacred isolated sanctuary inspection, crown lore revelation, and celestial synergy illumination.'
  }
};

export const CULTURAL_LORE_DATABASE: CulturalLoreEntry[] = [
  {
    id: 'lore_architecture',
    title: 'Sweeping Eaves & Curved Roofs',
    titleVi: 'Mái Cong Truyền Thống & Ngói Giwa',
    titleKo: '처마와 기와 (Curved Eaves & Tiled Roofs)',
    category: 'architecture',
    vietnameseAspect: 'Vietnamese traditional roofs curve gently upward at the corners (mái đình cong vút), inspired by the prow of boats and wings of birds (chim Lạc), decorated with dragon and phoenix terracotta relief.',
    koreanAspect: 'Korean Hanok roofs feature elegant curved eaves (Cheoma) that control sunlight and rainwater, lined with black clay tiles (Giwa) and rounded lotus pattern end-tiles (Sumaksae).',
    fusionInWorld: 'Throughout the capital and temples, roofs employ Korean black Giwa curved tiles supported by Vietnamese-style outward swept eaves, crowned with paired dragon-phoenix finials and Dancheong eaves.',
    iconName: 'Home'
  },
  {
    id: 'lore_scholars',
    title: 'Stone Scholar Turtles & Forest Academies',
    titleVi: 'Rùa Đá Văn Miếu & Viện Khổng Học Seowon',
    titleKo: '석비 거북과 서원 (Doctor Turtles & Seowon)',
    category: 'crafts',
    vietnameseAspect: 'Hanoi’s Temple of Literature (Văn Miếu) features 82 stone doctor steles mounted on the backs of stone turtles (Rùa cõng bia), enduring symbols of perseverance, longevity, and academic distinction.',
    koreanAspect: 'Korean Seowon were private neo-Confucian forest academies (such as Dosan and Byeongsan Seowon) where scholars retreated to pure nature to study philosophy, write poetry, and practice calligraphy.',
    fusionInWorld: 'In the Bamboo Scholar Grove, stone scholar turtles rest serenely beneath towering bamboo canopies beside open wooden Seowon study halls, honoring intellectual integrity in both cultures.',
    iconName: 'BookOpen'
  },
  {
    id: 'lore_ceramics',
    title: 'Master Ceramic Alchemy: Celadon & Blue-White',
    titleVi: 'Gốm Sứ Men Ngọc Celadon & Gốm Hoa Lam Bát Tràng',
    titleKo: '비색 청자와 청화백자 (Master Porcelain)',
    category: 'crafts',
    vietnameseAspect: 'Bát Tràng and Chu Đậu ceramics earned historic renown for cobalt blue-and-white porcelain (hoa lam) depicting soaring cranes and carp, fired in multi-chamber climbing kilns (lò bầu).',
    koreanAspect: 'Goryeo Celadon (Cheongja) achieved legendary status for its ethereal jade-green glaze (bisaek) and inlay technique (sanggam), followed by minimalist Joseon Moon Jars (Dalhangari).',
    fusionInWorld: 'In the Ceramic Valley, climbing kilns fire both jade-green Goryeo celadon urns and Bát Tràng blue-and-white dragon vases side by side, celebrating mutual mastery of earth and fire.',
    iconName: 'Sparkles'
  },
  {
    id: 'lore_folklore',
    title: 'The Celestial Dragon & Mountain Tiger',
    titleVi: 'Rồng Thiêng Lạc Long Quân & Hổ Núi Baekdu',
    titleKo: '용과 호랑이의 전설 (Dragon & Tiger Myths)',
    category: 'mythology',
    vietnameseAspect: 'The Vietnamese myth of Con Rồng Cháu Tiên honors the Lord Dragon of the Waters (Lạc Long Quân) and the Mountain Fairy (Âu Cơ), making dragons the eternal emblem of water, rivers, and benevolence.',
    koreanAspect: 'Korean culture venerates the Tiger (Horangi) as the sacred guardian of the mountains (Sanshin) and defender against evil, famously celebrated in humorous, wise folk paintings (Minhwa).',
    fusionInWorld: 'In the Dragon and Tiger Mountains, water waterfalls flow from dragon stone formations into tiger shrines, embodying the cosmic balance of Water and Mountain, Sky and Earth.',
    iconName: 'Sparkles'
  },
  {
    id: 'lore_lanterns',
    title: 'Lantern Reverence & Floating Lotuses',
    titleVi: 'Đèn Lồng Hội An & Lễ Hội Hoa Đăng Yeon Deung Hoe',
    titleKo: '연등과 호이안 등불 (Lantern Traditions)',
    category: 'festivals',
    vietnameseAspect: 'Hội An’s silk lanterns are crafted with pliable bamboo ribs wrapped in colorful silk fabrics, released onto the Hoài River on full moon nights with silent personal prayers.',
    koreanAspect: 'Korea’s Yeon Deung Hoe (Lotus Lantern Festival) dates back over 1,200 years to the Silla era, using layered pink hanji paper petals to craft vibrant glowing lotus blossom lanterns.',
    fusionInWorld: 'In the Lantern Harbor, the canal carries both Vietnamese silk lanterns and Korean paper lotus blossoms together, illuminating the stone covered bridge in warm peach and jade hues.',
    iconName: 'Flame'
  },
  {
    id: 'lore_totems',
    title: 'Village Spirit Guardians: Jangseung & Cây Nêu',
    titleVi: 'Thần Thổ Địa Jangseung & Cây Nêu Trừ Tà',
    titleKo: '장승과 솟대 (Village Guardians & Totems)',
    category: 'mythology',
    vietnameseAspect: 'During Tết, Vietnamese villagers erect Cây Nêu — a tall bamboo pole hung with clay bells, red banners, and pine branches at village entrances to guide ancestors home and repel malevolent spirits.',
    koreanAspect: 'Korean villages place carved wooden totem poles (Jangseung) representing the General of Heaven and Underworld, alongside wooden bird poles (Sotdae) to ensure protection and agricultural abundance.',
    fusionInWorld: 'At the entrances of the Golden Rice Highlands and Bamboo Grove, carved wooden Jangseung totems stand side-by-side with bamboo Cây Nêu poles fluttering in the mountain breeze.',
    iconName: 'Home'
  },
  {
    id: 'lore_culinary',
    title: 'Feast of Fragrance & Vitality',
    titleVi: 'Tinh Hoa Ẩm Thực Hai Miền',
    titleKo: '맛의 향연 (Culinary Harmony)',
    category: 'cuisine',
    vietnameseAspect: 'Vietnamese cuisine balances the five elements (Ngũ Hành) with fresh herbs, star anise beef broth in Phở, crispy baguettes filled with pâté in Bánh Mì, and delicate spring rolls.',
    koreanAspect: 'Korean street food delivers heartwarming vitality with sweet-spicy gochujang Tteokbokki, brown-sugar stuffed Hotteok pancakes, warming fish-cake broth, and shaved milk Bingsu.',
    fusionInWorld: 'The Food Bazaar in the Festival Grounds features stalls side-by-side where travelers can enjoy piping hot bowls of Phở followed by sizzling cinnamon Hotteok under festive lanterns.',
    iconName: 'Utensils'
  },
  {
    id: 'lore_crown_synergy',
    title: 'The Crown of Dual Heritage',
    titleVi: 'Vương Miện Hòa Hợp & Tinh Hoa Hai Dân Tộc',
    titleKo: '화합의 금관 (The Crown of Cultural Harmony)',
    category: 'culture',
    vietnameseAspect: 'Biểu tượng văn hóa Việt Nam cổ xưa với Mặt trời 14 tia sáng Đông Sơn soi rọi muôn loài, chim Lạc sải cánh tự do vươn cao, và đóa sen thuần khiết tượng trưng cho phẩm hạnh thanh cao, tấm lòng bao dung của người Việt.',
    koreanAspect: 'Vương miện vàng Tân La (Silla Gold Crown) từ thiên niên kỷ trước với ba nhánh cây vũ trụ kết nối trời đất, hai nhánh gạc hươu thần thoại và các hạt khúc ngọc (Gogok) biểu trưng cho mầm sống và linh khí non sông.',
    fusionInWorld: 'Trên hòn đảo thiêng biệt lập, Vương Miện Hòa Hợp kết tinh tất cả những biểu tượng cao quý nhất của hai dân tộc, khẳng định thành tựu vinh quang khi người khám phá thấu hiểu trọn vẹn mối duyên giao thoa Việt - Hàn.',
    iconName: 'Crown'
  }
];

export const INITIAL_COLLECTIBLES: CollectibleItem[] = [];

/**
 * 7 Sacred Cultural Fragments corresponding to the 7 main cultural heritage regions
 */
export const CULTURAL_FRAGMENTS: CulturalFragment[] = [
  {
    id: 'frag_highlands',
    regionId: 'highlands',
    nameVi: 'Mảnh Ghép Nông Nghiệp & Ruộng Bậc Thang',
    descVi: 'Biểu trưng văn minh lúa nước sông Hồng và ngày hội tạ ơn mùa màng Chuseok xứ Hàn.',
    icon: '🌾',
    collected: false
  },
  {
    id: 'frag_bamboo',
    regionId: 'bamboo',
    nameVi: 'Mảnh Ghép Nho Học & Bia Rùa Tiến Sĩ',
    descVi: 'Tinh hoa hiếu học Văn Miếu Thăng Long và các viện Khổng học Seowon giữa rừng trúc.',
    icon: '🎋',
    collected: false
  },
  {
    id: 'frag_mountains',
    regionId: 'mountains',
    nameVi: 'Mảnh Ghép Long Thần & Bạch Hổ Trấn Sơn',
    descVi: 'Huyền thoại Rồng Lạc Long Quân miền sông nước và Thần Hổ Sanshin hộ quốc dũng mãnh.',
    icon: '⛰️',
    collected: false
  },
  {
    id: 'frag_festival',
    regionId: 'festival',
    nameVi: 'Mảnh Ghép Lễ Hội & Vũ Điệu Giao Hòa',
    descVi: 'Hòa tấu nhịp trống hội chèo Việt Nam và nghệ thuật gõ Samulnori dân gian Hàn Quốc.',
    icon: '🎉',
    collected: false
  },
  {
    id: 'frag_capital',
    regionId: 'capital',
    nameVi: 'Mảnh Ghép Trống Đồng & Trống Buk Hoàng Gia',
    descVi: 'Mặt trời Đông Sơn rạng ngời kết duyên cùng nhịp trống cung đình triều đại Joseon.',
    icon: '🏛️',
    collected: false
  },
  {
    id: 'frag_harbor',
    regionId: 'harbor',
    nameVi: 'Mảnh Ghép Hoa Đăng & Thuyền Cổ',
    descVi: 'Ánh hoa đăng lụa Hội An soi bóng cùng đèn sen giấy Jinju Namgang trên dòng sông ước nguyện.',
    icon: '🏮',
    collected: false
  },
  {
    id: 'frag_archipelago',
    regionId: 'archipelago',
    nameVi: 'Mảnh Ghép Men Ngọc Celadon & Hải Đăng',
    descVi: 'Lò gốm Bát Tràng trứ danh hòa cùng men ngọc bích Goryeo và tượng đá Dol Hareubang đảo Jeju.',
    icon: '🌊',
    collected: false
  }
];

/**
 * Cultural NPCs distributed across all regions on the map:
 * - Lore NPCs: Share poetic insights and cultural connections between Vietnam and Korea
 * - Quest NPCs: Guide the player through quests to earn that region's Cultural Fragment
 * - Harbor Captain: Guides the player and provides the ship voyage to the Crown Sanctuary
 * - Crown Guardian: Welcomes the traveler at the Crown Sanctuary
 */
export const NPCS_DATA: NPCData[] = [
  // 1. HIGHLANDS
  {
    id: 'npc_highlands_lore',
    name: 'Cụ Già Làng Điền Viên',
    nameKo: '디엔 장로',
    title: 'Trưởng Lão Lúa Nước',
    occupationVi: 'Trưởng Lão Bản Làng & Canh Nông Miền Cao',
    regionId: 'highlands',
    type: 'lore',
    outfit: 'ao_dai',
    color: '#F59E0B',
    pos: { x: -42.0, y: 3.3, z: -43.5 },
    rotY: 0.4,
    dialogueVi: [
      'Ruộng bậc thang Mù Cang Chải là kỳ quan nông nghiệp lúa nước ngàn đời, nơi hạt gạo được người Việt trân quý như hạt ngọc của trời.',
      'Vào dịp Tết Chuseok, người Hàn Quốc cũng làm bánh Songpyeon từ gạo mới dâng cúng tổ tiên để tạ ơn đất trời và cầu mùa no ấm.'
    ],
    culturalFactVi: 'Người Việt xem "Hạt gạo là hạt ngọc trời", trong khi người Hàn Quốc có tục làm bánh Songpyeon hình trăng khuyết dâng tổ tiên vào rằm tháng 8 để cầu mong sự ấm no, trọn vẹn.'
  },
  {
    id: 'npc_highlands_quest',
    name: 'Chàng Nông Min-jun',
    nameKo: '농부 민준',
    title: 'Sứ Giả Canh Nông',
    occupationVi: 'Nông Gia Trẻ Hội Mùa Chuseok',
    regionId: 'highlands',
    type: 'quest',
    outfit: 'hanbok',
    color: '#D97706',
    pos: { x: -46.5, y: 3.75, z: -37.5 },
    rotY: 0.65,
    dialogueVi: [
      'Bờ tường đá Doldam và giàn vò Onggi lên men tương đậu là nét văn hóa ẩm thực truyền thống lâu đời của người nông dân xứ Hàn.',
      'Hai dân tộc ta đều gắn bó máu thịt với cây lúa nước và luôn gửi gắm ước vọng mưa thuận gió hòa vào từng vụ mùa.'
    ],
    culturalFactVi: 'Cả hai nền văn hóa đều phát triển từ nền tảng nông nghiệp lúa nước, chia sẻ niềm tin thiêng liêng vào sự che chở của Mẹ Thiên Nhiên.',
    questObjectiveVi: 'Khám phá đỉnh ruộng bậc thang và tiếp thu linh khí mùa vàng.',
    questActionPrompt: 'Niệm Ước Mùa Vàng & Nhận Mảnh Ghép',
    questRewardVi: 'Mảnh Ghép Nông Nghiệp & Ruộng Bậc Thang',
    fragmentId: 'frag_highlands'
  },
  {
    id: 'npc_highlands_ethnic_maiden',
    name: 'Sơn Nữ Mây Chiềng',
    nameKo: '마이치엥 산골처녀',
    title: 'Sơn Nữ Bản Làng',
    occupationVi: 'Người Đẹp Mùa Vàng Thổ Cẩm Tây Bắc',
    regionId: 'highlands',
    type: 'lore',
    outfit: 'tho_cam',
    color: '#10B981',
    pos: { x: -43.0, y: 3.3, z: -40.5 },
    rotY: 0.4,
    dialogueVi: [
      'Chiếc Áo Cóm cúc bướm bạc và Khăn Piêu thêu chỉ ngũ sắc này là biểu tượng cho nét duyên dáng, tình yêu thủy chung của người phụ nữ vùng cao Tây Bắc.'
    ],
    culturalFactVi: 'Trang phục thổ cẩm Tây Bắc với Áo Cóm cúc bướm bạc và Khăn Piêu thêu tay là biểu tượng của sự khéo léo, nét duyên dáng và tình yêu chung thủy son sắt của người phụ nữ vùng cao Việt Nam.'
  },

  // 2. BAMBOO SCHOLAR GROVE
  {
    id: 'npc_bamboo_lore',
    name: 'Học Giả Mặc Khách',
    nameKo: '반 학자',
    title: 'Tiên Sinh Viện Khổng Học',
    occupationVi: 'Đại Học Giả Nho Gia (Thầy Đồ Viện Seowon)',
    regionId: 'bamboo',
    type: 'lore',
    outfit: 'scholar',
    color: '#10B981',
    pos: { x: -53.5, y: 2.1, z: 4.5 },
    rotY: -0.2,
    dialogueVi: [
      'Bia rùa tiến sĩ tại Văn Miếu Thăng Long cõng trên lưng đạo học nghìn năm, khẳng định hiền tài là nguyên khí quốc gia.',
      'Cũng như các viện Nho học Seowon xứ Hàn, cây tre cây trúc uốn mình trước gió bão nhưng không bao giờ chịu gãy gập.'
    ],
    culturalFactVi: 'Cả hai quốc gia đều có truyền thống hiếu học sâu sắc. Văn Miếu Hà Nội có 82 bia tiến sĩ, còn Hàn Quốc có 9 viện Seowon cổ kính được UNESCO vinh danh.'
  },
  {
    id: 'npc_bamboo_quest',
    name: 'Nho Sinh Do-hyun',
    nameKo: '유생 도현',
    title: 'Học Trò Trúc Lâm',
    occupationVi: 'Thư Sinh Khổng Học Trẻ Tuổi',
    regionId: 'bamboo',
    type: 'quest',
    outfit: 'hanbok',
    color: '#059669',
    pos: { x: -56.0, y: 2.1, z: -3.5 },
    rotY: 0.3,
    dialogueVi: [
      'Mài mực thông sa trên phiến nghiên đá cổ và viết chữ lên giấy Dó hay giấy Hanji là đạo tu dưỡng tâm tính của người quân tử phương Đông.'
    ],
    culturalFactVi: 'Rùa đá là biểu tượng của sự trường tồn, kiên định và trí tuệ bất diệt trong cả văn hóa Nho giáo Việt Nam lẫn Hàn Quốc.',
    questObjectiveVi: 'Thành tâm chiêm bái tấm bia rùa đá tiến sĩ giữa rừng trúc.',
    questActionPrompt: 'Chiêm Bái Bia Rùa & Nhận Mảnh Ghép',
    questRewardVi: 'Mảnh Ghép Nho Học & Bia Rùa Tiến Sĩ',
    fragmentId: 'frag_bamboo'
  },
  {
    id: 'npc_bamboo_ao_tac_scholar',
    name: 'Viện Sĩ Nguyễn Khoa',
    nameKo: '응우옌 학사',
    title: 'Hàn Lâm Viện Sĩ',
    occupationVi: 'Học Giả Triều Đình Mặc Áo Tấc & Mũ Cánh Chuồn',
    regionId: 'bamboo',
    type: 'lore',
    outfit: 'ao_tac',
    color: '#0284C7',
    pos: { x: -58.5, y: 2.0, z: 4.5 },
    rotY: 0.5,
    dialogueVi: [
      'Chiếc Áo Tấc năm thân tay thụng cùng Mũ Cánh Chuồn là quốc phục đại triều, biểu trưng cho sự thanh liêm và chính trực của kẻ sĩ triều đình.'
    ],
    culturalFactVi: 'Áo Tấc (áo ngũ thân tay thụng) là quốc phục trang trọng bậc nhất của các bậc học giả, quan viên thời phong kiến Việt Nam trong các dịp lễ nghi trọng đại, tế tự và đại triều.'
  },

  // 3. MOUNTAINS
  {
    id: 'npc_mountains_lore',
    name: 'Ẩn Sĩ Bạch Vân',
    nameKo: '백운 은자',
    title: 'Đạo Sĩ Núi Thiêng',
    occupationVi: 'Đạo Sĩ Tu Tiên Núi Thần',
    regionId: 'mountains',
    type: 'lore',
    outfit: 'ao_dai',
    color: '#6366F1',
    pos: { x: -34.2, y: 8.25, z: 46.6 },
    rotY: 0.8,
    dialogueVi: [
      'Người Việt tự hào dòng giống Con Rồng Cháu Tiên cai quản sông biển, hòa nhịp cùng Thần Hổ Sơn Thần Sanshin dũng mãnh trấn giữ non ngàn xứ Hàn.',
      'Thế núi Long Hổ giao thoa tạo nên sự hòa hợp toàn bích giữa Nước và Lửa, Trời và Đất.'
    ],
    culturalFactVi: 'Rồng nước Việt Nam uyển chuyển hòa nhịp cùng Hổ núi Hàn Quốc dũng mãnh, tạo nên biểu tượng toàn bích của Thủy và Sơn, Trời và Đất.'
  },
  {
    id: 'npc_mountains_quest',
    name: 'Võ Sư Seok-woo',
    nameKo: '무사 석우',
    title: 'Thủ Hộ Giả Núi Cao',
    occupationVi: 'Võ Sư Hộ Vệ Thần Hổ Sanshin',
    regionId: 'mountains',
    type: 'quest',
    outfit: 'hanbok',
    color: '#4F46E5',
    pos: { x: -22.0, y: 5.7, z: 54.5 },
    rotY: -0.4,
    dialogueVi: [
      'Tượng Hổ đá trên vách núi mang ánh mắt tinh anh và nụ cười hóm hỉnh, là linh vật trừ tà và đem lại phước lành trong tranh dân gian Minhwa Hàn Quốc.'
    ],
    culturalFactVi: 'Tượng Hổ đá Hàn Quốc thường có nụ cười hóm hỉnh và ánh mắt tinh anh, mang tính bảo hộ thân thiện cho muôn dân.',
    questObjectiveVi: 'Hòa hợp linh khí Rồng nước và Hổ núi trên đỉnh vách đá.',
    questActionPrompt: 'Đón Nhận Linh Khí & Nhận Mảnh Ghép',
    questRewardVi: 'Mảnh Ghép Long Thần & Bạch Hổ Trấn Sơn',
    fragmentId: 'frag_mountains'
  },
  {
    id: 'npc_mountains_fairy',
    name: 'Tiên Cô Giáng Hương',
    nameKo: '장향 선녀',
    title: 'Tiên Nữ Mây Ngàn',
    occupationVi: 'Tiên Nữ Cung Đàn Huyền Thoại',
    regionId: 'mountains',
    type: 'lore',
    outfit: 'ao_dai',
    color: '#818CF8',
    pos: { x: -31.0, y: 8.25, z: 49.4 },
    rotY: -0.5,
    dialogueVi: [
      'Tiếng chuông đồng từ ngôi bảo tháp năm tầng vọng qua vách đá Hạ Long và rặng thông Baekdusan, gột rửa bụi trần cho lữ khách viếng cảnh tiên bồng.',
      'Mỗi tảng đá nơi đây đều mang hình hài vảy rồng giáng thế, chở che cho cuộc sống muôn đời thái bình.'
    ],
    culturalFactVi: 'Huyền tích Vịnh Hạ Long kể về Rồng Mẹ và đàn Rồng Con hạ phàm phun ngọc dựng nên các đảo đá che chở cho đất nước, rất gần gũi với thần thoại lập quốc trên núi thiêng Baekdu xứ Hàn.'
  },

  // 4. FESTIVAL GROUNDS
  {
    id: 'npc_festival_lore',
    name: 'Nghệ Nhân Cô Đào Hoa',
    nameKo: '예인 다오화',
    title: 'Nghệ Nhân Múa Quạt Lụa',
    occupationVi: 'Vũ Công Cung Đình & Lễ Hội Dân Gian',
    regionId: 'festival',
    type: 'lore',
    outfit: 'ao_dai',
    color: '#EC4899',
    pos: { x: -8.0, y: 2.35, z: -43.2 },
    rotY: 3.14,
    dialogueVi: [
      'Điệu múa quạt lụa Buchaechum rực rỡ sắc hoa hòa nhịp cùng tiếng trống hội chèo miền Bắc, mang lại điềm lành và niềm hân hoan sum vầy cho ngày hội lớn.'
    ],
    culturalFactVi: 'Cả hai dân tộc đều dùng quạt lụa và tiếng trống rộn rã trong lễ hội để biểu đạt niềm hân hoan, sự sum vầy và lời chúc phúc trường thọ.'
  },
  {
    id: 'npc_festival_quest',
    name: 'Đầu Bếp Bà Jin',
    nameKo: '진 주모',
    title: 'Chủ Quán Ẩm Thực Hai Miền',
    occupationVi: 'Bếp Trưởng Ẩm Thực Cổ Truyền',
    regionId: 'festival',
    type: 'quest',
    outfit: 'artisan',
    color: '#DB2777',
    pos: { x: -14.2, y: 2.35, z: -36.5 },
    rotY: 0.5,
    dialogueVi: [
      'Nồi Phở bò bốc khói ngát hương hồi quế bên cạnh chảo bánh Hotteok ngọt ngào, minh chứng cho triết lý cân bằng ngũ hành âm dương trong ẩm thực hai nước.'
    ],
    culturalFactVi: 'Ẩm thực Việt Nam cân bằng theo Ngũ Hành âm dương (chua, cay, mặn, ngọt, đắng), tương đồng với triết lý Obangsaek ngũ sắc trong ẩm thực Hàn Quốc.',
    questObjectiveVi: 'Thưởng thức hương vị ẩm thực giao thoa tại các gian hàng hội chợ.',
    questActionPrompt: 'Hòa Vị Ẩm Thực & Nhận Mảnh Ghép',
    questRewardVi: 'Mảnh Ghép Lễ Hội & Vũ Điệu Giao Hòa',
    fragmentId: 'frag_festival'
  },
  {
    id: 'npc_festival_quanho_singer',
    name: 'Liền Chị Thắm Duyên',
    nameKo: '탐주옌 소리꾼',
    title: 'Nghệ Nhân Dân Ca Quan Họ',
    occupationVi: 'Liền Chị Quan Họ Mặc Áo Tứ Thân & Nón Quai Thao',
    regionId: 'festival',
    type: 'lore',
    outfit: 'tu_than',
    color: '#F43F5E',
    pos: { x: -1.8, y: 2.35, z: -33.5 },
    rotY: -0.4,
    dialogueVi: [
      'Áo Tứ Thân thắt dải lụa đào và chiếc Nón Quai Thao lớn là nét duyên thắm đượm nghĩa tình của người con gái Kinh Bắc trong câu ca Quan Họ.'
    ],
    culturalFactVi: 'Áo Tứ Thân phối cùng Yếm thắm, dải thắt lưng lụa đào và chiếc Nón Quai Thao lớn là biểu tượng đỉnh cao của trang phục dân gian phụ nữ đồng bằng Bắc Bộ Việt Nam.'
  },

  // 5. CAPITAL
  {
    id: 'npc_capital_lore',
    name: 'Thượng Thư Lý Đình',
    nameKo: '이정 대감',
    title: 'Quan Chưởng Lễ Cung Đình',
    occupationVi: 'Đại Thần Bộ Lễ Hoàng Gia',
    regionId: 'capital',
    type: 'lore',
    outfit: 'scholar',
    color: '#E11D48',
    pos: { x: 1.0, y: 2.25, z: 5.0 },
    rotY: 0.2,
    dialogueVi: [
      'Mái ngói ống đất nung rêu phong của 36 phố phường Hà Nội kề bên những ngôi nhà Hanok gỗ mộc Bukchon, kiến tạo nên một kinh kỳ ngàn năm văn vật.'
    ],
    culturalFactVi: 'Hệ thống xà cồ chồng rường và các họa tiết hoa sen, mây nước trên di tích Đoan Môn Hà Nội có nhiều điểm tương đồng với kỹ thuật đấu củng cung điện Gyeongbokgung.'
  },
  {
    id: 'npc_capital_quest',
    name: 'Nghệ Nhân Bác Thuận',
    nameKo: '장인 투안',
    title: 'Bậc Thầy Đúc Đồng',
    occupationVi: 'Nghệ Nhân Đúc Đồng Đông Sơn',
    regionId: 'capital',
    type: 'quest',
    outfit: 'artisan',
    color: '#BE123C',
    pos: { x: 4.2, y: 2.25, z: 5.5 },
    rotY: -0.3,
    dialogueVi: [
      'Mặt trống đồng Đông Sơn khắc hình đàn chim Lạc bay quanh vầng thái dương, hòa nhịp cùng tiếng trống Buk Samgomu trong các nghi lễ hoàng gia.'
    ],
    culturalFactVi: 'Trống đồng Đông Sơn là bảo vật biểu trưng cho quyền lực và mặt trời, trong khi trống Buk và Janggu Hàn Quốc tượng trưng cho tiếng sấm trời và nhịp đập của đất mẹ.',
    questObjectiveVi: 'Gióng vang hồi trống đồng hòa nhịp cùng tiếng trống Buk.',
    questActionPrompt: 'Gióng Hồi Trống Hội & Nhận Mảnh Ghép',
    questRewardVi: 'Mảnh Ghép Trống Đồng & Trống Buk Hoàng Gia',
    fragmentId: 'frag_capital'
  },
  {
    id: 'npc_capital_nhatbinh_lady',
    name: 'Quận Chúa Như Ngọc',
    nameKo: '여옥 옹주',
    title: 'Tôn Nữ Cung Đình',
    occupationVi: 'Tiểu Thư Hoàng Tộc Mặc Áo Nhật Bình & Khăn Vành',
    regionId: 'capital',
    type: 'lore',
    outfit: 'nhat_binh',
    color: '#E11D48',
    pos: { x: 6.5, y: 2.25, z: 6.5 },
    rotY: -0.5,
    dialogueVi: [
      'Chiếc Áo Nhật Bình thêu chim phượng với dải viền ngũ sắc trên cổ tay là trang phục tôn quý bậc nhất của các bậc công chúa triều Nguyễn.'
    ],
    culturalFactVi: 'Áo Nhật Bình là thường phục tôn quý của các bậc Hoàng hậu, Công chúa và mệnh phụ triều đình thời Nguyễn, nổi tiếng với hoa văn thêu tinh xảo và dải ngũ sắc ngũ hành trên cổ tay.'
  },

  // 6. HARBOR
  {
    id: 'npc_harbor_lore',
    name: 'Nàng Thiếu Nữ Liên',
    nameKo: '연 아가씨',
    title: 'Người Giữ Hồn Hoa Đăng',
    occupationVi: 'Thiếu Nữ Thả Đèn Phố Cảng Hội An',
    regionId: 'harbor',
    type: 'lore',
    outfit: 'ao_dai',
    color: '#0284C7',
    pos: { x: 49.5, y: 1.4, z: -35.5 },
    rotY: 0.3,
    dialogueVi: [
      'Mỗi ngọn đèn hoa đăng Hội An trôi trên sông Hoài mang theo ước nguyện bình an, tựa như lễ hội đèn lồng Jinju Namgang lung linh nghìn năm xứ Hàn.'
    ],
    culturalFactVi: 'Lễ hội hoa đăng Yeon Deung Hoe Hàn Quốc đã có hơn 1200 năm tuổi, song hành với nét đẹp thả đèn hoa đăng trên dòng sông Hoài phố cổ Hội An.'
  },
  {
    id: 'npc_harbor_quest',
    name: 'Thương Nhân Ông Phúc',
    nameKo: '상단 복 대행',
    title: 'Trưởng Thương Điếm Cảng Khẩu',
    occupationVi: 'Trưởng Thương Đoàn Tơ Lụa & Gia Vị',
    regionId: 'harbor',
    type: 'quest',
    outfit: 'artisan',
    color: '#0369A1',
    pos: { x: 54.5, y: 1.4, z: -35.5 },
    rotY: -0.4,
    dialogueVi: [
      'Cây cầu ngói có mái che cổ kính đã che chở cho bao thế hệ thương nhân cập bến giao thương tơ lụa, gốm sứ và thảo mộc suốt các thế kỷ hoàng kim.'
    ],
    culturalFactVi: 'Cầu ngói mái che cổ kính là nét kiến trúc giao thương độc đáo che mưa nắng cho các thương nhân qua lại bến sông.'
    ,questObjectiveVi: 'Thả ngọn đèn hoa đăng ước nguyện trôi dưới chân Cầu Cổ.',
    questActionPrompt: 'Thả Đèn Ước Nguyện & Nhận Mảnh Ghép',
    questRewardVi: 'Mảnh Ghép Hoa Đăng & Thuyền Cổ',
    fragmentId: 'frag_harbor'
  },
  {
    id: 'npc_harbor_baba_maiden',
    name: 'Cô Ba Sông Nước',
    nameKo: '바바 처녀',
    title: 'Thiếu Nữ Sông Hoài',
    occupationVi: 'Cô Gái Nam Bộ Mặc Áo Bà Ba, Khăn Rằn & Nón Lá',
    regionId: 'harbor',
    type: 'lore',
    outfit: 'ba_ba',
    color: '#0EA5E9',
    pos: { x: 48.0, y: 1.5, z: -43.0 },
    rotY: -0.6,
    dialogueVi: [
      'Chiếc Áo Bà Ba lụa mềm, khăn rằn vắt vai và nón lá nghiêng che là biểu tượng cho nét đẹp hồn hậu, phóng khoáng của người dân miền sông nước phương Nam.'
    ],
    culturalFactVi: 'Áo Bà Ba kết hợp cùng Khăn Rằn caro và chiếc Nón Lá là biểu tượng văn hóa bình dị, hào sảng và phóng khoáng đậm chất Nam Bộ Việt Nam.'
  },
  {
    id: 'npc_harbor_captain',
    name: 'Thuyền Trưởng Hải Triều',
    nameKo: '백 선장 (Captain Baek)',
    title: 'Thuyền Trưởng Hải Trình Nam Hải',
    occupationVi: 'Thuyền Trưởng Thuyền Buồm Viễn Dương',
    regionId: 'harbor',
    type: 'captain',
    outfit: 'captain',
    color: '#0284C7',
    pos: { x: 61.5, y: 1.72, z: -35.2 },
    rotY: -0.6,
    dialogueVi: [
      'Khi thu thập đủ 7 Mảnh Ghép Di Sản, hãy lên thuyền buồm viễn dương! Ta sẽ đưa ngươi vượt muôn trùng sóng lớn sang Vương Đảo Hòa Hợp Văn Hóa.'
    ],
    culturalFactVi: 'Thuyền buồm nan tre cánh dơi truyền thống là kiệt tác hàng hải của người Việt xưa, có thể lướt đi vững vàng trên những luồng hải lưu xoáy mạnh nhất để tới các hải đảo xa xôi.',
    questObjectiveVi: 'Thu thập đủ 7 Mảnh Ghép Di Sản từ 7 Bảng Thông Tin, sau đó tới bến tàu gặp Thuyền Trưởng để lên thuyền ra khơi sang Vương Đảo Hòa Hợp!',
    questActionPrompt: 'Lên Tàu Vượt Biển Đến Vương Đảo'
  },

  // 7. ARCHIPELAGO
  {
    id: 'npc_archipelago_lore',
    name: 'Ngư Phủ Bác Hải',
    nameKo: '해 어부',
    title: 'Lão Ngư Thuyền Thúng',
    occupationVi: 'Lão Ngư Dân Thuyền Thúng Vịnh Biển',
    regionId: 'archipelago',
    type: 'lore',
    outfit: 'ao_dai',
    color: '#0D9488',
    pos: { x: 37.5, y: 1.15, z: 32.5 },
    rotY: 0.5,
    dialogueVi: [
      'Chiếc thuyền thúng đan tre trét dầu rái lướt nhẹ giữa những cột đá vôi Hạ Long, vững vàng trước mọi đầu sóng ngọn gió biển khơi.'
    ],
    culturalFactVi: 'Thuyền thúng đan tre trét dầu rái của ngư dân Việt Nam là sự sáng tạo độc nhất vô nhị, bền bỉ trước sóng to gió lớn như ý chí của những nữ thợ lặn Haenyeo Jeju.'
  },
  {
    id: 'npc_archipelago_quest',
    name: 'Nghệ Nhân Thợ Gốm Kim',
    nameKo: '도예가 김씨',
    title: 'Bậc Thầy Lò Bầu Men Ngọc',
    occupationVi: 'Nghệ Nhân Nung Gốm Men Ngọc Celadon',
    regionId: 'archipelago',
    type: 'quest',
    outfit: 'artisan',
    color: '#0F766E',
    pos: { x: 43.5, y: 1.2, z: 32.5 },
    rotY: -0.2,
    dialogueVi: [
      'Từ bàn xoay và ngọn lửa lò bầu, bàn tay tài hoa đã tôi luyện nên gốm hoa lam Bát Tràng tráng lệ cùng sắc men ngọc bích Celadon Goryeo huyền thoại.'
    ],
    culturalFactVi: 'Kỹ thuật nung men ngọc bích Bisaek thời Goryeo và gốm men lam Bát Tràng - Chu Đậu đều là đỉnh cao của sự hòa hợp giữa Đất, Nước và Lửa.',
    questObjectiveVi: 'Nhóm lên ngọn lửa luyện gốm cổ trên hòn đảo đá vôi.',
    questActionPrompt: 'Nhóm Lửa Lò Gốm & Nhận Mảnh Ghép',
    questRewardVi: 'Mảnh Ghép Men Ngọc Celadon & Hải Đăng',
    fragmentId: 'frag_archipelago'
  },
  {
    id: 'npc_archipelago_haenyeo_diver',
    name: 'Nữ Thợ Lặn Ok-sun',
    nameKo: '해녀 옥순 (Haenyeo Ok-sun)',
    title: 'Nữ Thợ Lặn Biển Đảo',
    occupationVi: 'Nữ Thợ Lặn Haenyeo Đảo Jeju',
    regionId: 'archipelago',
    type: 'lore',
    outfit: 'artisan',
    color: '#14B8A6',
    pos: { x: 40.5, y: 1.2, z: 37.0 },
    rotY: -0.5,
    dialogueVi: [
      'Tượng đá Dol Hareubang hiền từ che chắn bão giông cho những người phụ nữ Haenyeo lặn sâu tìm ngọc trai và hải sản dưới đáy biển ngọc.',
      'Sự bền bỉ kiên cường trước sóng gió đại dương là nét đẹp ngàn đời của cư dân làng chài hai nước.'
    ],
    culturalFactVi: 'Văn hóa thợ lặn Haenyeo đảo Jeju được UNESCO vinh danh Di sản văn hóa phi vật thể, đại diện cho tinh thần quật cường hòa hợp với biển cả như những ngư dân làng chài Việt Nam.'
  },

  // 8. CROWN SANCTUARY ISLAND
  {
    id: 'npc_crown_guardian',
    name: 'Thần Hộ Mệnh Giao Thoa',
    nameKo: '화합의 수호신',
    title: 'Hộ Pháp Vương Đảo Hòa Hợp',
    occupationVi: 'Linh Thần Hộ Trì Di Sản Giao Thoa',
    regionId: 'crown_sanctuary',
    type: 'lore',
    outfit: 'scholar',
    color: '#F59E0B',
    pos: { x: 8.0, y: 2.8, z: 133.5 },
    rotY: 0.0,
    dialogueVi: [
      'Vinh quang thay! Ngươi đã hoàn thành trọn vẹn chuyến hải trình vĩ đại, vượt qua biển sâu trên con thuyền buồm từ Bến Cảng Hoa Đăng để bước chân lên thánh địa này!',
      'Chiếc Vương Miện Hòa Hợp trên đài sen bạch ngọc kia chính là kết tinh cao quý nhất của hai nền văn hóa: ba cành cây vũ trụ và gạc hươu vàng Tân La, ngọc bội Gogok linh thiêng, vầng thái dương 14 tia sáng và chim Lạc Đông Sơn bất diệt.',
      'Ngươi đã trở thành Sứ Giả Văn Hóa chân chính, thấu hiểu rằng tình hữu nghị và sự hòa hợp giữa hai dân tộc Việt - Hàn sẽ mãi mãi trường tồn như ngọn lửa soi đường!'
    ],
    culturalFactVi: 'Vương Miện Hòa Hợp là bảo vật duy nhất quy tụ trọn vẹn tinh hoa hoàng gia Tân La (Silla) và biểu tượng đúc đồng Đông Sơn Đại Việt trên đài sen ngọc thanh cao.'
  }
];

export const CULTURAL_THEMES_OVERVIEW: Record<string, CulturalThemeOverview> = {
  highlands: {
    regionId: 'highlands',
    regionNameVi: 'Cao Nguyên Lúa Vàng',
    regionNameKo: '황금 계단골',
    titleVi: 'Chủ Đề 1: Nông Nghiệp Lúa Nước & Lễ Hội Tạ Mùa',
    titleKo: '농경 문화와 추석 추수 감사',
    themeBadgeVi: 'Văn Hóa Lúa Nước & Tết Trung Thu / Chuseok',
    color: '#D97706',
    boardPos: { x: -36.5, y: 2.44, z: -46.0 },
    rotY: 0.8,
    vietnamAspect: {
      headline: 'Hạt Ngọc Trời & Ruộng Bậc Thang Tây Bắc',
      description: 'Nền văn minh lúa nước là cội rễ tinh thần ngàn đời của người Việt. Các triền ruộng bậc thang kỳ vĩ tại Mù Cang Chải, Hoàng Su Phì là minh chứng cho sự cần cù và hòa hợp tuyệt đối giữa con người với núi rừng hiểm trở.',
      highlights: [
        'Triết lý "Hạt gạo là hạt ngọc của trời" nuôi dưỡng cả thể xác lẫn tâm hồn Việt.',
        'Lễ hội Mừng Cơm Mới tạ ơn trời đất, thần lúa đã ban cho mùa vàng no ấm.',
        'Nhà sàn gỗ mộc mạc của đồng bào Tày, Thái, Mường với bếp lửa ấm cúng và phong tục giã gạo chày đôi.',
        'Các nông cụ truyền thống: Guồng nước tre (noria), cày bắp, cối đá và con trâu là đầu cơ nghiệp.'
      ],
      symbolicRelic: 'Bông Lúa Nếp Nương & Nhà Sàn Khau Cút'
    },
    koreaAspect: {
      headline: 'Tết Chuseok & Bánh Songpyeon Trăng Khuyết',
      description: 'Tại Hàn Quốc, tết Trung Thu Chuseok (Hangawi) vào rằm tháng 8 âm lịch là ngày lễ tạ ơn quan trọng bậc nhất. Toàn thể gia đình tề tựu cúng bái tổ tiên bằng những hạt gạo mới thu hoạch và cầu chúc cho sự viên mãn.',
      highlights: [
        'Nghi lễ Charye (trà lễ) tạ ơn trời đất và tổ tiên với mâm lễ vật từ nông sản vụ mùa mới.',
        'Phong tục làm bánh Songpyeon hình bán nguyệt dẻo thơm hấp trên lá thông rừng tươi mát.',
        'Vũ điệu vòng tròn thiếu nữ Ganggangsullae dưới ánh trăng rằm cầu mong mùa màng bội thu.',
        'Tường đá khô Doldam và thềm chum sành Jangdokdae ủ tương, bảo quản nông sản vượt qua mùa đông tuyết giá.'
      ],
      symbolicRelic: 'Bánh Gạo Songpyeon & Tường Đá Doldam'
    },
    synthesisHarmony: {
      headline: 'Lòng Biết Ơn Nguồn Cội & Sự Gắn Kết Cộng Đồng',
      description: 'Cả Việt Nam và Hàn Quốc đều khởi sinh từ cái nôi văn minh nông nghiệp lúa nước. Hai dân tộc cùng chia sẻ niềm tin thiêng liêng vào đất mẹ, nếp sống nghĩa tình tương trợ "tắt lửa tối đèn có nhau", và phong tục sum vầy tạ ơn tổ tiên mỗi độ trăng tròn mùa thu.',
      sharedValues: [
        'Tôn kính hạt gạo như quà tặng vô giá của Đất Trời',
        'Lễ hội tạ ơn mùa màng và lòng hiếu đạo đối với tiền nhân',
        'Nếp sống cộng đồng bền chặt qua các hội làng và ngày mùa'
      ]
    }
  },

  bamboo: {
    regionId: 'bamboo',
    regionNameVi: 'Văn Miếu Trúc Lâm',
    regionNameKo: '대나무 숲 서원',
    titleVi: 'Chủ Đề 2: Truyền Thống Nho Học & Tôn Sư Trọng Đạo',
    titleKo: '유교 서원과 과거 시험 전통',
    themeBadgeVi: 'Khoa Bảng, Bia Rùa & Khí Phách Kẻ Sĩ',
    color: '#059669',
    boardPos: { x: -48.0, y: 1.95, z: 3.5 },
    rotY: -0.7,
    vietnamAspect: {
      headline: 'Văn Miếu - Quốc Tử Giám & Bia Rùa Tiến Sĩ',
      description: 'Đạo học nước Việt rực rỡ từ thế kỷ 11 với Văn Miếu - Quốc Tử Giám Hà Nội. Tinh thần khoa bảng đề cao đạo đức và tri thức, coi trọng bậc hiền tài làm rường cột xây dựng non sông thái bình.',
      highlights: [
        '82 Bia Rùa Tiến Sĩ bằng đá thanh (UNESCO) khắc ghi tên tuổi các bậc đại khoa thời Lê - Mạc.',
        'Tư tưởng bất hủ của Thân Nhân Trung: "Hiền tài là nguyên khí của quốc gia, nguyên khí thịnh thì thế nước mạnh".',
        'Truyền thống "Tôn sư trọng đạo", người thầy được tôn kính bậc nhất trong bậc thang giá trị xã hội.',
        'Trang phục học giới: Áo Tấc trang trọng, áo ngũ thân tay thụng và Mũ Cánh Chuồn liêm chính.'
      ],
      symbolicRelic: 'Bia Rùa Tiến Sĩ & Khuê Văn Các'
    },
    koreaAspect: {
      headline: 'Viện Khổng Học Seowon & Đạo Quân Tử Seonbi',
      description: 'Thời Goryeo và Joseon, các viện Seowon (UNESCO) được xây dựng giữa chốn thiên nhiên u tịch, rừng trúc, suối trong để các nho sinh rèn giũa nhân cách thanh cao, phẩm hạnh trong sạch tựa ngọc.',
      highlights: [
        'Kỳ thi khoa cử Gwageo tuyển chọn nhân tài giúp vua trị quốc an dân.',
        'Hình mẫu kẻ sĩ Seonbi: Giữ khí tiết thanh bạch, bất khuất trước quyền uy, sống hòa hợp với thiên nhiên.',
        'Cây trúc (Juk) trong bộ tứ hữu "Tùng - Cúc - Trúc - Mai" biểu tượng cho lòng trung trinh, ngay thẳng.',
        'Mũ Gat đen thanh nhã, áo Dopo trắng và dải ngọc Gat-kkeun của bậc nho sĩ đĩnh đạc.'
      ],
      symbolicRelic: 'Viện Khổng Học Seowon & Mũ Gat Đen'
    },
    synthesisHarmony: {
      headline: 'Đạo Làm Người & Tinh Thần Khuyến Học Ngàn Đời',
      description: 'Hai quốc gia sở hữu bề dày khoa cử Nho học tương đồng sâu sắc. Hình tượng rùa đá cõng bia và cây trúc biếc là biểu tượng chung cho sự trường tồn của tri thức, sự khiêm nhường và đạo làm người chính trực.',
      sharedValues: [
        'Coi giáo dục và hiền tài là nền tảng chấn hưng quốc gia',
        'Đạo lý Tôn sư trọng đạo và tinh thần hiếu học vượt khó',
        'Khí phách thanh cao, tiết tháo của bậc trí thức nho gia'
      ]
    }
  },

  mountains: {
    regionId: 'mountains',
    regionNameVi: 'Dãy Núi Long Hổ',
    regionNameKo: '용호 영산',
    titleVi: 'Chủ Đề 3: Tín Ngưỡng Núi Thiêng, Đạo Giáo & Võ Thuật',
    titleKo: '영산 신앙, 도교와 전통 무예',
    themeBadgeVi: 'Rồng Thiêng, Bạch Hổ & Non Ngàn Tiên Cảnh',
    color: '#6366F1',
    boardPos: { x: -25.2, y: 2.28, z: 63.0 },
    rotY: 0.15,
    vietnamAspect: {
      headline: 'Núi Thiêng Yên Tử & Hình Tượng Rồng Việt',
      description: 'Đỉnh thiêng Yên Tử là kinh đô Phật giáo - Đạo giáo Trúc Lâm, nơi vua Trần Nhân Tông rũ bỏ ngai vàng để tu hành nhập thế. Dãy núi linh thiêng gắn liền với truyền thuyết Rồng thiêng bay lượn che chở giang sơn.',
      highlights: [
        'Tín ngưỡng thờ Thần Núi (Tản Viên Sơn Thánh / Sơn Tinh đứng đầu Tứ Bất Tử).',
        'Hình tượng Rồng Việt mềm mại thời Lý - Trần uốn khúc như ngọn sóng, tượng trưng cho nguồn nước và phúc lành.',
        'Tháp Phật nhiều tầng và các am Đạo quán ẩn mình giữa biển mây trắng bồng bềnh.',
        'Võ cổ truyền Việt Nam linh hoạt, dẻo dai, lấy nhu thắng cương, biến hóa khôn lường.'
      ],
      symbolicRelic: 'Bạch Vân Tiên Đài & Rồng Đá Uốn Khúc'
    },
    koreaAspect: {
      headline: 'Núi Thần Bạch Đầu & Bạch Hổ Tranh Minhwa',
      description: 'Núi Bạch Đầu (Baegdusan) và núi Jirisan là khởi nguồn của thần thoại lập quốc Dangun. Người Hàn tôn sùng Bạch Hổ (Hổ trắng) như linh thú dũng mãnh bảo vệ giang sơn, xua đuổi tà ma và mang lại điềm lành.',
      highlights: [
        'Thần thoại Sanshin (Thần Núi) ngự trị trên đỉnh thiêng cùng hổ trắng và cây thông ngàn năm.',
        'Tranh dân gian Minhwa vẽ Hổ và Chim Ác Là (Kkachi Hobangi) tràn đầy vẻ dí dỏm, trừ tà diệt ác.',
        'Võ thuật truyền thống Taekkyeon (UNESCO) và Subak với những thế tấn dũng mãnh của loài mãnh hổ.',
        'Ẩn sĩ Đạo giáo tu tiên trên các mỏm đá granite ngắm trăng thưởng trà.'
      ],
      symbolicRelic: 'Tượng Bạch Hổ Hộ Quốc & Đạo Quán Sanshin'
    },
    synthesisHarmony: {
      headline: 'Thế Cân Bằng Âm Dương Giữa Rồng Và Hổ',
      description: 'Rồng (Long) đại diện cho Nước, Mây mưa, sự Mềm dẻo và Trí tuệ; Hổ (Hổ) đại diện cho Núi rừng, Đất mẹ, Sức mạnh kiên cường và Dũng khí hộ quốc. Sự kết hợp Long - Hổ tạo nên thế cân bằng hoàn mỹ của vũ trụ và tinh thần quật cường chống ngoại xâm của hai dân tộc.',
      sharedValues: [
        'Tôn kính các dãy núi thiêng như linh hồn che chở đất nước',
        'Triết lý cân bằng Âm Dương - Nhu Cương trong võ học và đời sống',
        'Lòng quả cảm, tinh thần bảo vệ chủ quyền non sông gấm vóc'
      ]
    }
  },

  capital: {
    regionId: 'capital',
    regionNameVi: 'Thủ Phủ Song Long',
    regionNameKo: '쌍용 도읍',
    titleVi: 'Chủ Đề 4: Kiến Trúc Cung Đình Hoàng Gia & Phố Cổ',
    titleKo: '궁궐 건축과 한옥·전통 가옥',
    themeBadgeVi: 'Hoàng Thành Thăng Long & Cung Điện Gyeongbokgung',
    color: '#E11D48',
    boardPos: { x: 2.0, y: 2.05, z: 14.2 },
    rotY: 2.35,
    vietnamAspect: {
      headline: 'Hoàng Thành Thăng Long & 36 Phố Phường Hà Nội',
      description: 'Kinh đô Thăng Long nghìn năm văn hiến là sự kết hợp tài tình giữa thành quách uy nghiêm với nhịp sống buôn bán phố thị sầm uất. Các ngôi nhà ống mái ngói đất nung rêu phong tạo nên linh hồn phố cổ.',
      highlights: [
        'Kỳ tích Hoàng thành Thăng Long (UNESCO) với Đoan Môn, thềm rồng Điện Kính Thiên sơn son thếp vàng.',
        'Kiến trúc nhà ống phố cổ Hà Nội: Mặt tiền hẹp, chiều sâu dài, có sân trời giếng trời đón gió tự nhiên.',
        'Nghệ thuật chạm khắc gỗ đình làng, hoa sen Đại Việt và nghệ thuật đúc đồng Đông Sơn.',
        'Trang phục cung đình lộng lẫy: Áo Nhật Bình cổ vuông dải ngũ sắc và Áo Bổ Tử hoàng tộc.'
      ],
      symbolicRelic: 'Cổng Đoan Môn & Nhà Ống Phố Cổ Rêu Phong'
    },
    koreaAspect: {
      headline: 'Cung Điện Gyeongbokgung & Làng Cổ Bukchon Hanok',
      description: 'Các cung điện hoàng gia Joseon được xây dựng thuận theo phong thủy "Tọa sơn hướng thủy". Mái ngói Giwa cong vút và kỹ thuật sơn Dancheong ngũ sắc bảo vệ gỗ trước thời tiết khắc nghiệt.',
      highlights: [
        'Cung điện Gyeongbokgung và Changdeokgung với vườn cấm Huwon hòa quyện hoàn mỹ cùng thiên nhiên.',
        'Làng cổ Bukchon Hanok với hệ thống sưởi sàn Ondol ấm áp và sân trong Madang đón gió mát mùa hè.',
        'Nghệ thuật sơn vẽ kiến trúc Dancheong ngũ sắc (Obangsaek) thể hiện trật tự vũ trụ ngũ hành.',
        'Trang phục hoàng gia: Lễ phục Dangui thêu chỉ vàng và hoàng bào Hongryongpo quyền uy.'
      ],
      symbolicRelic: 'Mái Ngói Giwa & Rui Mè Sơn Dancheong'
    },
    synthesisHarmony: {
      headline: 'Kiến Trúc Thuận Phong Thủy & Tôn Trọng Tự Nhiên',
      description: 'Cả Thăng Long và Seoul xưa đều chọn thế đất rồng cuộn hổ ngồi để định đô. Kiến trúc truyền thống của cả hai nước không lấn át tự nhiên mà nép mình hài hòa cùng cây cỏ, trời mây, tôn vinh nếp sống gia đình đầm ấm.',
      sharedValues: [
        'Nguyên lý phong thủy "Tọa sơn hướng thủy" trong quy hoạch kinh đô',
        'Sử dụng vật liệu tự nhiên: Gỗ lim, đá tảng, ngói đất nung nung rơm',
        'Bảo tồn di sản kiến trúc lịch sử song hành cùng đời sống đương đại'
      ]
    }
  },

  festival: {
    regionId: 'festival',
    regionNameVi: 'Quảng Trường Đại Lễ',
    regionNameKo: '천상 대동제',
    titleVi: 'Chủ Đề 5: Lễ Hội Dân Gian, Âm Nhạc & Tinh Hoa Ẩm Thực',
    titleKo: '민속 축제, 전통 음악과 음식 문화',
    themeBadgeVi: 'Dân Ca Quan Họ, Samulnori & Ẩm Thực Ngũ Vị - Ngũ Sắc',
    color: '#D946EF',
    boardPos: { x: 1.8, y: 2.15, z: -37.0 },
    rotY: 2.1,
    vietnamAspect: {
      headline: 'Dân Ca Quan Họ Bắc Ninh & Ẩm Thực Cân Bằng Ngũ Vị',
      description: 'Lễ hội làng quê Việt Nam tưng bừng với câu ca quan họ mượt mà, tiếng trống đồng vang dội, múa Lân Sư Rồng và mâm cỗ Tết truyền thống đậm đà bản sắc tình nghĩa xóm làng.',
      highlights: [
        'Dân ca Quan họ Bắc Ninh (UNESCO): Lối hát đối đáp trao duyên tao nhã, cơi trầu têm cánh phượng nghĩa tình.',
        'Áo Tứ Thân thướt tha, yếm thắm lụa đào và chiếc Nón Quai Thao rộng vành che nụ cười duyên.',
        'Trống hội Thăng Long, múa lân sư rồng cầu may mắn, tài lộc cho cả cộng đồng.',
        'Ẩm thực Ngũ Vị: Nồi Phở bò ninh hồi quế, Bánh Chưng lá dong vuông vắn tượng trưng cho Đất Mẹ.'
      ],
      symbolicRelic: 'Nón Quai Thao, Cơi Trầu & Nồi Phở Nghi Ngút'
    },
    koreaAspect: {
      headline: 'Nhạc Hội Samulnori & Ẩm Thực Ngũ Sắc Obangsaek',
      description: 'Nghệ thuật dân gian Hàn Quốc bùng nổ năng lượng với tứ tấu gõ Samulnori, điệu múa quay dải lụa Sangmo trên không trung và nền ẩm thực lên men trứ danh thế giới.',
      highlights: [
        'Samulnori (4 nhạc cụ tượng trưng cho Sấm - Mưa - Mây - Gió) khuấy động hào khí lễ hội.',
        'Điệu múa quạt lụa Buchaechum và nghệ thuật hát kể chuyện kịch tính Pansori (UNESCO).',
        'Văn hóa làm Kimchi muối (Kimjang - UNESCO) trong chum đất nung Onggi gắn kết tình làng nghĩa xóm.',
        'Ẩm thực Obangsaek ngũ sắc: Bánh rán Hotteok mật ong, bánh gạo Tteokbokki và cơm trộn Bibimbap.'
      ],
      symbolicRelic: 'Trống Janggu, Chum Onggi & Chảo Bánh Hotteok'
    },
    synthesisHarmony: {
      headline: 'Âm Nhạc Gắn Kết Trái Tim & Ẩm Thực Triết Lý Âm Dương',
      description: 'Âm nhạc dân gian và ẩm thực truyền thống là hai chiếc chìa khóa vạn năng mở cánh cửa tâm hồn của hai dân tộc. Sự cân bằng Ngũ Hành (Chua - Cay - Mặn - Ngọt - Đắng ở Việt Nam tương ứng với Kim - Mộc - Thủy - Hỏa - Thổ ở Hàn Quốc) tạo nên nét độc đáo trường tồn.',
      sharedValues: [
        'Lễ hội là không gian sum họp, sẻ chia niềm vui và xua tan nhọc nhằn',
        'Triết lý âm dương ngũ hành hòa quyện trong từng món ăn truyền thống',
        'Tình yêu thương gia đình và tình làng nghĩa xóm sâu sắc'
      ]
    }
  },

  harbor: {
    regionId: 'harbor',
    regionNameVi: 'Bến Cảng Hội An',
    regionNameKo: '등불 항구',
    titleVi: 'Chủ Đề 6: Con Đường Tơ Lụa Biển & Đèn Hoa Đăng',
    titleKo: '해상 실크로드와 연등 문화',
    themeBadgeVi: 'Đô Thị Cổ Hội An & Hải Trình Tơ Lụa Viễn Dương',
    color: '#0284C7',
    boardPos: { x: 43.0, y: 1.4, z: -38.0 },
    rotY: 1.57,
    vietnamAspect: {
      headline: 'Đô Thị Cổ Hội An & Thuyền Buồm Cánh Dơi',
      description: 'Thế kỷ 16-17, Hội An là thương cảng quốc tế sầm uất bậc nhất châu Á trên Con đường Tơ lụa Biển. Nơi đây từng là điểm giao thoa thương mại thịnh vượng của các đoàn thương thuyền Đông Tây.',
      highlights: [
        'Chùa Cầu (Lai Viễn Kiều - UNESCO) vắt qua sông Hoài, kiến trúc ngói âm dương trầm mặc.',
        'Lễ hội đêm rằm thả đèn hoa đăng lấp lánh trên sông, cầu chúc bình an, phúc lộc cho muôn nhà.',
        'Thuyền buồm nan tre cánh dơi vượt sóng biển Đông, xuất khẩu trầm hương, tơ lụa và đồ gốm sứ.',
        'Trang phục Áo Bà Ba Nam Bộ mềm mại, khăn rằn caro và nón lá duyên dáng bên bến sông.'
      ],
      symbolicRelic: 'Chùa Cầu Hội An & Đèn Hoa Đăng Sông Hoài'
    },
    koreaAspect: {
      headline: 'Thương Cảng Byeokrando & Lễ Hội Đèn Hoa Sen Yeondeunghoe',
      description: 'Từ thời Goryeo, thương cảng Byeokrando trên sông Yeseong đã đón tiếp thương nhân quốc tế. Người Hàn Quốc có truyền thống hàng hải rực rỡ và lễ hội lồng đèn hoa sen lung linh.',
      highlights: [
        'Thương thuyền Joseon buôn bán sâm quý, giấy Hanji cao cấp và vải lụa tơ tằm.',
        'Chiến thuyền Thuyền Rùa (Geobukseon) bọc sắt huyền thoại của Đô đốc Yi Sun-sin.',
        'Lễ hội đèn lồng hoa sen Yeondeunghoe (UNESCO) thắp sáng đêm rằm cầu trí tuệ và hòa bình.',
        'Áo choàng thương nhân Dopo gấm hoa và mũ nón đi biển kiên cố của người miền duyên hải.'
      ],
      symbolicRelic: 'Thuyền Thương Mại Cổ & Đèn Lồng Hoa Sen'
    },
    synthesisHarmony: {
      headline: 'Tinh Thần Rộng Mở & Khát Vọng Kết Nối Năm Châu',
      description: 'Cả hai quốc gia đều có bờ biển dài hun hút và truyền thống kinh tế biển phong phú. Những ngọn đèn hoa đăng thả trôi trên dòng nước tượng trưng cho ước nguyện hòa bình, tình hữu nghị và khát vọng vươn ra biển lớn.',
      sharedValues: [
        'Lòng hiếu khách, tinh thần cởi mở và giao lưu thương mại hòa bình',
        'Tín ngưỡng thả đèn hoa đăng cầu an cho người đi biển và gia đình',
        'Ý chí kiên cường chế ngự sóng gió đại dương bảo vệ vùng biển thiêng'
      ]
    }
  },

  archipelago: {
    regionId: 'archipelago',
    regionNameVi: 'Quần Đảo Lam Ngọc & Gốm Sứ',
    regionNameKo: '푸른 해도 và 도예',
    titleVi: 'Chủ Đề 7: Vịnh Biển Đảo Đá Vôi & Đỉnh Cao Nghệ Thuật Gốm Sứ',
    titleKo: '해양 석회암 절경과 도예의 정수',
    themeBadgeVi: 'Vịnh Hạ Long, Đảo Jeju & Men Ngọc Celadon, Gốm Bát Tràng',
    color: '#0D9488',
    boardPos: { x: 35.0, y: 0.85, z: 30.0 },
    rotY: 0.9,
    vietnamAspect: {
      headline: 'Kỳ Quan Vịnh Hạ Long & Gốm Sứ Bát Tràng - Chu Đậu',
      description: 'Vịnh Hạ Long với hàng nghìn đảo đá vôi karst xanh ngọc bích sừng sững giữa trời mây. Nơi đây kết hợp cùng dòng gốm hoa lam Bát Tràng và Chu Đậu nức tiếng xuất khẩu khắp năm châu.',
      highlights: [
        'Vịnh Hạ Long (Kỳ quan Thiên nhiên UNESCO) – huyền thoại Rồng mẹ hạ cánh phun châu nhả ngọc.',
        'Thuyền thúng đan tre trét dầu rái – sáng tạo độc nhất vô nhị lướt nhẹ nhàng trên rạn đá ngầm.',
        'Gốm hoa lam Chu Đậu và gốm men rạn Bát Tràng: Nét vẽ phóng khoáng, cốt đất trắng thanh tao.',
        'Lò Bầu (lò rồng leo dốc) nung củi truyền thống đạt nhiệt độ trên 1200°C tạo nên lớp men bóng sâu thẳm.'
      ],
      symbolicRelic: 'Thuyền Thúng Đan Tre & Lò Bầu Nung Gốm'
    },
    koreaAspect: {
      headline: 'Đảo Núi Lửa Jeju & Men Ngọc Bích Celadon Goryeo',
      description: 'Đảo núi lửa Jeju (UNESCO) với những bờ đá bazan đen tuyền ngoạn mục, tượng đá Dol Hareubang hiền hòa và nghệ thuật nung men ngọc bích Celadon Goryeo đạt đến tầm tuyệt tác thế giới.',
      highlights: [
        'Tượng ông già đá Dol Hareubang đục từ đá nham thạch bảo vệ ngư dân và làng chài bình yên.',
        'Gốm men ngọc bích Celadon Goryeo (Bisaek) với sắc xanh trong vắt như ngọc bích và kỹ thuật khảm Sanggam tinh diệu.',
        'Bình gốm Mặt Trăng (Joseon Moon Jar) bằng sứ trắng tinh khôi biểu trưng cho tâm hồn thuần khiết.',
        'Văn hóa nữ thợ lặn Haenyeo (UNESCO) lặn biển không cần bình dưỡng khí kiên cường trước sóng dữ.'
      ],
      symbolicRelic: 'Tượng Đá Dol Hareubang & Bình Men Ngọc Celadon'
    },
    synthesisHarmony: {
      headline: 'Sự Hòa Hợp Của Đất - Nước - Lửa & Tình Yêu Biển Đảo',
      description: 'Kỹ nghệ gốm sứ là sự thăng hoa kỳ diệu giữa Đất sét tinh tuyển, Nước tôi luyện và Lửa nung rực rỡ. Bên cạnh đó, tình yêu biển đảo thiêng liêng và ý chí bất khuất của cư dân miền duyên hải là sợi dây vô hình gắn kết bền chặt hai dân tộc.',
      sharedValues: [
        'Tôn vinh bàn tay vàng của người thợ thủ công qua hàng ngàn năm lịch sử',
        'Lòng tôn kính biển cả và các kỳ quan thiên nhiên vô giá',
        'Ý thức gìn giữ bí quyết làng nghề truyền thống cho muôn đời sau'
      ]
    }
  }
};

