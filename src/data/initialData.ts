import { Post, ChatChannel, DesignerContact, ChatMessage } from '../types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Architectural Sculptural Wool & The Anatomy of the Winter Silhouette',
    subtitle: 'Autumn/Winter Haute Couture Discourse',
    content: `When proportion commands the room, ornamentation becomes redundant. This season’s exploration centers around monolithic overcoats engineered with structured raglan shoulders and exaggerated origami-fold lapels. 

The fabric choice is an unbrushed 720g double-faced camel melton wool, sourced from family-run mills in Biella. Notice how the internal canvas chest piece maintains structural crispness without adding rigidity, allowing the waist belt to create a kinetic, dramatic silhouette during movement. Paired against supple aniline calfskin boots and tapered leather trousers, the look balances raw brutalist architecture with tactile warmth.`,
    author: {
      name: 'Camille Dupont',
      handle: '@camille.couture',
      role: 'Master Patternmaker & Tailoring Lead, Paris',
    },
    category: 'Haute Couture & Tailoring',
    image: '/src/assets/images/hero_fashion_editorial_1791964916635.jpg',
    date: 'October 13, 2026',
    likes: 342,
    isLiked: false,
    isSaved: true,
    tags: ['SculpturalTailoring', 'CamelMelton', 'BiellaMills', 'OrigamiLapel'],
    outfitBreakdown: [
      {
        garment: 'Monolithic Sculptural Overcoat',
        designerOrBrand: 'Atelier Dupont No. 04',
        textileMaterial: '100% Double-Faced Camel Wool (720gsm)',
        silhouetteNote: 'Exaggerated dropped shoulders with architectural peaked cowl lapels',
      },
      {
        garment: 'Tapered Aniline Leather Trouser',
        designerOrBrand: 'Studio Vane',
        textileMaterial: 'Supple Vegetable-Tanned French Calfskin',
        silhouetteNote: 'Narrow tapered leg tucked into structured combat-riding hybrid boots',
      },
      {
        garment: 'Minimalist Chunky Lugged Chelsea',
        designerOrBrand: 'Maison Noir Lab',
        textileMaterial: 'Full-Grain Box Calf with Vibram Carrarmato Sole',
        silhouetteNote: 'Clean ankle silhouette with square toe profile',
      },
    ],
    palette: ['#B88E62', '#1C1917', '#DFD3C3', '#5D4037'],
    comments: [
      {
        id: 'c-1',
        authorName: 'Marcus Chen',
        authorRole: 'Creative Director, Tokyo',
        content: 'The drape of that collar is extraordinary. Did you pad-stitch the revers by hand or use an internal horsehair floating canvas?',
        timestamp: '2 hours ago',
        likes: 18,
        isLiked: false,
      },
      {
        id: 'c-2',
        authorName: 'Camille Dupont',
        authorRole: 'Master Patternmaker, Paris',
        content: '@Marcus Chen We used an artisanal bias-cut horsehair interlining with 1,200 hand stitches across the chest plate. It flexes with body heat while maintaining the geometric silhouette.',
        timestamp: '1 hour ago',
        likes: 24,
        isLiked: false,
      },
      {
        id: 'c-3',
        authorName: 'Elena Rostova',
        authorRole: 'Milan Fashion Atelier',
        content: 'The transition from the architectural wool to the gloss of the aniline leather grounds the visual weight impeccably. Pure poetry.',
        timestamp: '45 mins ago',
        likes: 7,
        isLiked: false,
      },
    ],
    readTime: '4 min read',
  },
  {
    id: 'post-2',
    title: 'Tactile Sanctuary: Parisian Haussmann Architecture & The Raw Linen Lifestyle',
    subtitle: 'Mindful Living & Interior Aesthetics',
    content: `True luxury in living spaces is not about gilded surplus; it is an exercise in sensory subtraction. When morning sunlight filters through floor-to-ceiling sheer linen drapery, the subtle play of warm shadows against original 19th-century plaster moldings creates an atmosphere of timeless stillness.

In this salon, the dialogue is between tactile organic materials: an unbleached Belgian linen sofa with down cushioning, a low coffee table carved from a single slab of raw open-pored travertine stone, and hand-thrown stoneware ceramics filled with dried eucalyptus and seed pods. The space breathes. It encourages quiet contemplation, slow reading, and intentional conversation.`,
    author: {
      name: 'Sofia Al-Mansoor',
      handle: '@sofia.atelier',
      role: 'Interior Architect & Textile Conservator',
    },
    category: 'Minimalist Spaces & Living',
    image: '/src/assets/images/lifestyle_minimal_interior_1791964918111.jpg',
    date: 'October 12, 2026',
    likes: 512,
    isLiked: true,
    isSaved: true,
    tags: ['OrganicMinimalism', 'TravertineStone', 'BelgianLinen', 'ParisianInteriors'],
    outfitBreakdown: [
      {
        garment: 'Deep Minimalist Sectional Lounger',
        designerOrBrand: 'Atelier Pierre & Chêne',
        textileMaterial: 'Heavy Unbleached Belgian Flax Linen (580gsm)',
        silhouetteNote: 'Low ground-hugging profile with relaxed feather-filled backrest cushions',
      },
      {
        garment: 'Rough-Hewn Monolith Low Table',
        designerOrBrand: 'Tivoli Stone Workshop',
        textileMaterial: 'Roman Unfilled Travertine with Chiseled Edge',
        silhouetteNote: 'Sculptural slab balancing on dual block pedestals',
      },
      {
        garment: 'Hand-Knotted Berber Textured Rug',
        designerOrBrand: 'Atlas Craft Collective',
        textileMaterial: 'Undyed High-Atlas Mountain Wool',
        silhouetteNote: 'Dense textured pile with subtle organic flecks and braided fringe',
      },
    ],
    palette: ['#F5EFE6', '#D6C7B2', '#8C7B6B', '#3E342B'],
    comments: [
      {
        id: 'c-4',
        authorName: 'Jean-Luc Vasseur',
        authorRole: 'Architectural Critic, Lyon',
        content: 'The low center of gravity in this layout changes the acoustic volume of the room entirely. Notice how the travertine table grounds the high Haussmann ceilings.',
        timestamp: '4 hours ago',
        likes: 12,
        isLiked: false,
      },
      {
        id: 'c-5',
        authorName: 'Elena Rostova',
        authorRole: 'Milan Fashion Atelier',
        content: 'I adore the undyed flax tone. It resonates so harmoniously with our Autumn/Winter palette.',
        timestamp: '3 hours ago',
        likes: 9,
        isLiked: false,
      },
    ],
    readTime: '3 min read',
  },
  {
    id: 'post-3',
    title: 'The Brutalist Uniform: Raw Selvedge Denim, Heavy Knits & Concrete Proportions',
    subtitle: 'Tokyo Subcultures & Architectural Streetwear',
    content: `Streetwear in its purest evolution has departed from loud logos to embrace the quiet precision of industrial patternmaking. This look examines the tension between heavy, unwashed 16oz Okayama raw selvedge denim and a softened wool-cashmere storm coat in concrete heather grey.

The hoodie underneath is knit on vintage Wakayama loopwheel machines from 500gsm ring-spun cotton fleece, providing an indestructible handfeel and crisp hood collar stance. By rolling the wide-leg selvedge cuffs over welted combat service boots, the silhouette achieves a sharp vertical break that complements the brutalist concrete stairwells of Shibuya’s civic architecture.`,
    author: {
      name: 'Marcus Chen',
      handle: '@tokyo.minimal',
      role: 'Creative Director & Technical Patternmaker, Tokyo',
    },
    category: 'Streetwear & Subcultures',
    image: '/src/assets/images/streetwear_tokyo_aesthetic_1791964918763.jpg',
    date: 'October 11, 2026',
    likes: 428,
    isLiked: false,
    isSaved: false,
    tags: ['OkayamaDenim', 'LoopwheelKnit', 'BrutalistFashion', 'SelvedgeBreak'],
    outfitBreakdown: [
      {
        garment: 'Relaxed Drop-Shoulder Storm Coat',
        designerOrBrand: 'KINTSUGI Atelier',
        textileMaterial: '80% Recycled Melange Wool / 20% Cashmere',
        silhouetteNote: 'Oversized knee-length silhouette with soft unpadded shoulder drape',
      },
      {
        garment: 'Type II Trucker Jacket & Wide Trouser',
        designerOrBrand: 'Kojima Craft Guild',
        textileMaterial: '16oz Indigo Pure Plant-Dyed Selvedge Denim',
        silhouetteNote: 'Relaxed straight cut with double turn-up cuff displaying pink selvedge ID',
      },
      {
        garment: 'Loopwheel Heavyweight Pullover',
        designerOrBrand: 'Tsuri-Ami Studio',
        textileMaterial: '100% Wakayama Loopwheel Tubular Cotton (500gsm)',
        silhouetteNote: 'Boxy torso with high double-layer structured collar hood',
      },
    ],
    palette: ['#2B3A4A', '#7A8288', '#383E42', '#181B1D'],
    comments: [
      {
        id: 'c-6',
        authorName: 'Kenzo Takahashi',
        authorRole: 'Denim Archivist, Osaka',
        content: 'That 16oz Kojima denim fades with such unique electric-blue whiskers over 18 months of wear. Splendid pairing with the heather overcoat.',
        timestamp: '5 hours ago',
        likes: 14,
        isLiked: false,
      },
    ],
    readTime: '5 min read',
  },
  {
    id: 'post-4',
    title: 'The Poetry of the Pin: Draping Uncut Organza on the Atelier Dress Form',
    subtitle: 'Couture Craftsmanship & Textile Preservation',
    content: `Before a garment is drafted in two dimensions on cardboard, it exists as a sculptural whisper on the dummy. In this study, we worked with 12 continuous meters of crêpe de chine and French silk organza, letting gravity and the natural bias dictate where the diagonal pleats settle.

Notice how the diagonal swath cascades across the clavicle, anchored only by invisible stay-stitches and fine brass pins. When fashion respects the natural tension of the fiber rather than forcing it into rigid geometric seams, the cloth becomes an extension of breath and human gesture. This is the living craft of haute couture that fast-fashion algorithms can never replicate.`,
    author: {
      name: 'Elena Rostova',
      handle: '@elena.atelier',
      role: 'Creative Director & Master Draper, Milan',
    },
    category: 'Sustainable & Raw Textiles',
    image: '/src/assets/images/textile_craft_couture_1791964918638.jpg',
    date: 'October 10, 2026',
    likes: 671,
    isLiked: true,
    isSaved: true,
    tags: ['MoulageDraping', 'SilkOrganza', 'HauteCoutureCraft', 'AtelierMethods'],
    outfitBreakdown: [
      {
        garment: 'Sculptural Bias-Draped Evening Corsage',
        designerOrBrand: 'Studio Seta Milan',
        textileMaterial: 'Pure Mulberry Silk Organza & Crêpe Chiffon',
        silhouetteNote: 'Asymmetrical architectural pleating molded seamlessly across the torso',
      },
      {
        garment: 'Vintage Tailor Dress Form (1964)',
        designerOrBrand: 'Stockman Paris Heritage',
        textileMaterial: 'Linen-Covered Papier-Mâché on Cast Iron Stand',
        silhouetteNote: 'Standard French proportion 36 with hand-marked pin guidelines',
      },
    ],
    palette: ['#FAF6F0', '#E2D5C3', '#9D8876', '#4A3E36'],
    comments: [
      {
        id: 'c-7',
        authorName: 'Camille Dupont',
        authorRole: 'Master Patternmaker, Paris',
        content: 'The spiral grain tension here is flawless, Elena. The way the light catches the bias pleats shows the hand of a true master draper.',
        timestamp: '1 day ago',
        likes: 31,
        isLiked: false,
      },
    ],
    readTime: '4 min read',
  },
];

export const CHAT_CHANNELS: ChatChannel[] = [
  {
    id: 'channel-runway',
    name: 'runway-and-silhouettes',
    description: 'Critical dissection of collection premieres, proportion shifts, and garment anatomy',
    topic: 'Autumn/Winter tailoring, sculptural outerwear & hemline ratios',
    unreadCount: 2,
  },
  {
    id: 'channel-textiles',
    name: 'textile-and-sourcing',
    description: 'Deadstock silk finds, artisan dyeing, organic flax, and sustainable mill connections',
    topic: 'Biella wool mills & plant-based indigo fermentation recipes',
    unreadCount: 0,
  },
  {
    id: 'channel-spaces',
    name: 'minimal-lifestyle-spaces',
    description: 'Interiors, raw stone, architectural ceramics, and contemplative living environments',
    topic: 'Travertine finishes, unbleached linen & acoustic warmth',
    unreadCount: 1,
  },
  {
    id: 'channel-capsule',
    name: 'capsule-wardrobe-advice',
    description: 'Daily outfit formulas, timeless curation, tonal matching, and textile longevity',
    topic: 'The 7-piece uniform for transitional seasons',
    unreadCount: 0,
  },
];

export const DESIGNER_CONTACTS: DesignerContact[] = [
  {
    id: 'contact-camille',
    name: 'Camille Dupont',
    handle: '@camille.couture',
    role: 'Master Patternmaker',
    city: 'Paris, France',
    avatar: 'CD',
    bio: '20 years in Parisian haute couture pattern rooms. Obsessed with bias cuts, internal canvassing, and sculptural volume.',
    recentTopic: 'Floating canvas techniques for double-faced wools',
    status: 'in atelier',
  },
  {
    id: 'contact-elena',
    name: 'Elena Rostova',
    handle: '@elena.atelier',
    role: 'Creative Director & Draper',
    city: 'Milan, Italy',
    avatar: 'ER',
    bio: 'Directs Studio Seta in Milan. Specializes in direct moulage draping on live models and artisanal silk development.',
    recentTopic: 'Asymmetric organza pleating without stiff interlinings',
    status: 'active',
  },
  {
    id: 'contact-marcus',
    name: 'Marcus Chen',
    handle: '@tokyo.minimal',
    role: 'Technical Apparel Designer',
    city: 'Tokyo, Japan',
    avatar: 'MC',
    bio: 'Merging Japanese brutalist architecture with heavyweight loopwheel textiles and heritage Okayama selvedge denim.',
    recentTopic: 'Wakayama loopwheel tension and shrinkage formulas',
    status: 'active',
  },
  {
    id: 'contact-sofia',
    name: 'Sofia Al-Mansoor',
    handle: '@sofia.atelier',
    role: 'Interior Architect',
    city: 'London & Dubai',
    avatar: 'SA',
    bio: 'Crafting mindful, tactile spaces using raw limestone, untanned leather, and unbleached Belgian linen.',
    recentTopic: 'Acoustic absorption using textured raw wool wall tapestries',
    status: 'traveling',
  },
];

export const INITIAL_CHANNEL_MESSAGES: Record<string, ChatMessage[]> = {
  'channel-runway': [
    {
      id: 'm-1',
      senderName: 'Marcus Chen',
      senderRole: 'Creative Director, Tokyo',
      isMe: false,
      content: 'Has anyone inspected the shoulder construction in the recent Milan previews? It seems houses are moving completely away from stiff 80s shoulder pads toward soft raglan internal felts that slope naturally.',
      timestamp: '10:45 AM',
    },
    {
      id: 'm-2',
      senderName: 'Elena Rostova',
      senderRole: 'Creative Director & Draper, Milan',
      isMe: false,
      content: 'Exactly Marcus! In our atelier we removed the rigid shoulder caps and substituted a multi-layered bias fleece wedge. It gives 15% more shoulder projection while maintaining a fluid, relaxed drop.',
      timestamp: '10:52 AM',
    },
    {
      id: 'm-3',
      senderName: 'Camille Dupont',
      senderRole: 'Master Patternmaker, Paris',
      isMe: false,
      content: 'When you eliminate pad bulk, the garment drape depends 100% on the precision of the back yoke armhole pitch. If the pitch is off by even 5mm, the lapel will buckle forward.',
      timestamp: '11:04 AM',
    },
  ],
  'channel-textiles': [
    {
      id: 'm-4',
      senderName: 'Sofia Al-Mansoor',
      senderRole: 'Interior Architect & Textile Conservator',
      isMe: false,
      content: 'Just received a batch of organic European flax from Normandy. The fiber length is 45mm longer than average, meaning almost zero pilling when spun into heavy curtain weave.',
      timestamp: 'Yesterday at 4:20 PM',
    },
    {
      id: 'm-5',
      senderName: 'Marcus Chen',
      senderRole: 'Creative Director, Tokyo',
      isMe: false,
      content: 'That Normandy flax takes natural indigo vats extraordinarily well. The core of the yarn remains ecru, giving high-contrast patina over wash cycles.',
      timestamp: 'Yesterday at 4:35 PM',
    },
  ],
  'channel-spaces': [
    {
      id: 'm-6',
      senderName: 'Sofia Al-Mansoor',
      senderRole: 'Interior Architect',
      isMe: false,
      content: 'A golden rule for mindful living rooms: keep the furniture line below 75cm. When sightlines across the room stay open to the baseboards, the human mind perceives the space as 40% calmer.',
      timestamp: 'Yesterday at 2:15 PM',
    },
  ],
  'channel-capsule': [
    {
      id: 'm-7',
      senderName: 'Elena Rostova',
      senderRole: 'Creative Director, Milan',
      isMe: false,
      content: 'The core capsule for November: 1 unstructured wool trench, 2 relaxed poplin button-downs in cream and celadon, 1 pair of wide-leg double-pleated flannel trousers, and Goodyear-welted loafers.',
      timestamp: 'Yesterday at 9:10 AM',
    },
  ],
};

export const INITIAL_DIRECT_MESSAGES: Record<string, ChatMessage[]> = {
  'contact-camille': [
    {
      id: 'dm-c-1',
      senderName: 'Camille Dupont',
      senderRole: 'Master Patternmaker',
      isMe: false,
      content: 'Bonjour! Welcome to L’Atelier. I loved your recent notes on winter silhouettes. Are you working on any outerwear patterns at the moment?',
      timestamp: '09:30 AM',
    },
  ],
  'contact-elena': [
    {
      id: 'dm-e-1',
      senderName: 'Elena Rostova',
      senderRole: 'Creative Director & Draper',
      isMe: false,
      content: 'Hello dear! If you ever need guidance on balancing bias organza on the dressmaker form, do let me know. Milan is buzzing this week.',
      timestamp: 'Yesterday',
    },
  ],
  'contact-marcus': [
    {
      id: 'dm-m-1',
      senderName: 'Marcus Chen',
      senderRole: 'Technical Apparel Designer',
      isMe: false,
      content: 'Hey! We just finished testing 16oz raw selvedge shrinkage rates. If you need any mill contacts in Kojima, I have the direct swatch book.',
      timestamp: 'Monday',
    },
  ],
  'contact-sofia': [
    {
      id: 'dm-s-1',
      senderName: 'Sofia Al-Mansoor',
      senderRole: 'Interior Architect',
      isMe: false,
      content: 'Greetings from London! I am curating our next series on raw travertine stone and acoustic textiles for peaceful living spaces.',
      timestamp: 'Oct 8',
    },
  ],
};

export const TREND_RADAR_ITEMS = [
  {
    id: 'trend-1',
    title: 'The Monolithic Overcoat: Zero-Hardware Tailoring',
    trendDirection: '+84% Editorial Coverage',
    timeline: 'Autumn/Winter 2026/27',
    summary: 'Buttons and zippers are concealed beneath cleanly topstitched fly fronts. The silhouette lets the raw drape of double-faced wool speak without metallic hardware interruption.',
    keyFabrics: ['720g Camel Melton', 'Unfinished Cashmere Flannel', 'Pressed Alpaca'],
    colorSpectrum: ['#B88E62', '#2D2825', '#EFE9E1'],
  },
  {
    id: 'trend-2',
    title: 'Biophilic Interiors & Tactile Subtraction',
    trendDirection: '+65% Curated Living Spaces',
    timeline: 'Year-Round Lifestyle',
    summary: 'A migration away from synthetic high-gloss surfaces toward open-pored Roman travertine, undyed organic flax, and acoustic felt tapestries that soothe the nervous system.',
    keyFabrics: ['Heavy Normandy Flax (580gsm)', 'Undyed High-Atlas Mountain Wool', 'Raw Travertine Stone'],
    colorSpectrum: ['#F5EFE6', '#D6C7B2', '#4A3E36'],
  },
  {
    id: 'trend-3',
    title: 'Architectural Selvedge & Loopwheel Heavyweights',
    trendDirection: '+48% Streetwear Formulations',
    timeline: 'Perpetual Modern Classic',
    summary: 'The pairing of slow-made Japanese loopwheel fleece with structured raw selvedge denim in sculptural wide-leg proportions.',
    keyFabrics: ['Wakayama 500gsm Cotton Fleece', '16oz Pure Indigo Okayama Denim', 'Recycled Wool Storm Cloth'],
    colorSpectrum: ['#2B3A4A', '#7A8288', '#181B1D'],
  },
];
