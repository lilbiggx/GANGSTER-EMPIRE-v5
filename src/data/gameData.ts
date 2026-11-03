export interface District {
  id: string;
  name: string;
  vibe: string;
}

export const DAILY_HUSTLE_CAP = 1000;

export interface Hustle {
  id: string;
  name: string;
  district: string;
  cost: number;
  income: number;
  min_income?: number;
  max_income?: number;
  real_range?: string;
  real_desc?: string;
  daily_cap?: number;
  unlock: number;
}

export interface Front {
  id: string;
  name: string;
  cost: number;
  cap: number;
  dur: number;
  unlock: number;
}

export interface Rival {
  id: string;
  name: string;
  district: string;
  boss: string;
  ally_id: string;
  bloc: string;
  personality: "Vindictive" | "Aggressive" | "Ruthless" | "Calculated" | "Honorable";
}

export interface Heist {
  id: string;
  name: string;
  dur: number;
  roles: string[];
  diff: number;
  reward: number;
  unlock: number;
  heat: number;
}

export interface GearItem {
  id: string;
  name: string;
  slot: "hat" | "top" | "bottom" | "shoes" | "melee" | "primary" | "secondary";
  model: string;
  rarity: "common" | "rare" | "legendary";
  price: number;
  stat?: string;
  mod?: number;
  power?: number;
  unlock?: number;
  color: string;
  style?: string;
  pattern?: string;
  graphic?: string;
  subcategory?: string;
  tier2?: string;
}

export interface Tier2Category {
  id: string;
  name: string;
  trait_name: string;
  desc: string;
  effect: string;
  bonus: number;
  stat_bonus?: { stat: string; mod: number };
  color: string;
}

export interface BoutiqueSubcategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

export interface GunShopSubcategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

export interface BoutiqueCatalogItem {
  id: string;
  name: string;
  subcategory: "tailoring" | "streetwear" | "jewelry" | "footwear" | "headwear" | "tactical" | "regalia" | "accessories";
  slot: "top" | "bottom" | "shoes" | "hat" | "melee" | "secondary";
  model: string;
  rarity: "common" | "rare" | "legendary";
  price: number;
  desc: string;
  color: string;
  style?: string;
  pattern?: string;
  graphic?: string;
  stat?: string;
  mod?: number;
  power?: number;
  unlock?: number;
  tier2_chance?: number;
  fixed_tier2?: string;
}

export interface BlackMarketItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  kind: string;
  value: number;
  max?: number;
}

export interface CosmeticItem {
  id: string;
  name: string;
  slot: "drip" | "car" | "decor";
  rarity: "common" | "rare" | "legendary";
  clean: number;
}

export interface FarmStrain {
  id: string;
  name: string;
  desc: string;
  unlock: number;
  seed: number;
  grow: number;
  yield: [number, number];
  price: number;
  heat: number;
  color: string;
}

export const DISTRICTS: District[] = [
  { id: "dockside", name: "Dockside", vibe: "Harbour smoke and fishing canoes" },
  { id: "market", name: "Market Circle", vibe: "Loudest trading floor in the city" },
  { id: "zongo", name: "Zongo Lanes", vibe: "Tight lanes, tighter loyalty" },
  { id: "osu", name: "Osu Strip", vibe: "Neon, nightlife, quick money" },
  { id: "hills", name: "Hills Estate", vibe: "Gated villas and big men" },
  { id: "kejetia", name: "Kejetia Junction", vibe: "Biggest junction up north" },
];

export const DISTRICT_MAP = Object.fromEntries(DISTRICTS.map((d) => [d.id, d]));

export interface AssassinContract {
  id: string;
  name: string;
  desc: string;
  cost_dirty: number;
  cost_clean: number;
  grudge_drop: number;
  lockdown_mins: number;
  power_cut_pct: number;
  duration_mins: number;
  recovers_loot?: boolean;
  neutralizes_boss?: boolean;
}

export const ASSASSIN_CONTACT = {
  id: "salifu_ghost",
  name: 'Salifu "The Ghost"',
  title: "Underworld Assassin Contact",
  location: "Bukom Beach Docks & Ga Mashie",
  bio: "Accra's premier ghost contractor. Accepts private assassination contracts to eliminate rival syndicate muscle, sever cartel supply lines, and take down archrival bosses.",
  contracts: [
    {
      id: "sabotage",
      name: "Supply Line Sabotage & Corner Sweep",
      desc: "Hitman team raids rival supply depots and corner runners. Locks down rival corner for 30m, cuts grudge by 30, cancels pending raids, and seizes dirty cash.",
      cost_dirty: 450,
      cost_clean: 0,
      grudge_drop: 30,
      lockdown_mins: 30,
      power_cut_pct: 0.15,
      duration_mins: 30,
      recovers_loot: true,
      neutralizes_boss: false,
    },
    {
      id: "kneecap",
      name: "Capo & Enforcer Kneecapping Strike",
      desc: "Sniper neutralizes the rival syndicate's chief enforcer. Cripples their combat muscle by 35% for 60m, shatters solidarity pacts, and drops grudge by 50.",
      cost_dirty: 1800,
      cost_clean: 150,
      grudge_drop: 50,
      lockdown_mins: 45,
      power_cut_pct: 0.35,
      duration_mins: 60,
      recovers_loot: false,
      neutralizes_boss: false,
    },
    {
      id: "boss_hit",
      name: "Archrival Supreme Boss Elimination",
      desc: "Full decapitation strike on the rival syndicate boss's armored convoy. Slashes rival power by 60%, zeroes their grudge (Syndicate Disarray for 2h), cancels compound raids, and seizes a rare boss stash drop!",
      cost_dirty: 12000,
      cost_clean: 1200,
      grudge_drop: 100,
      lockdown_mins: 120,
      power_cut_pct: 0.60,
      duration_mins: 120,
      recovers_loot: true,
      neutralizes_boss: true,
    },
  ],
};

export const HUSTLES: Hustle[] = [
  {
    id: "okada",
    name: "Okada Parcel Runs",
    district: "dockside",
    cost: 20,
    income: 10,
    min_income: 10,
    max_income: 14,
    real_range: "GH₵10 – GH₵14 / min",
    real_desc: "Pure water sachet & small parcel delivery on Okada bikes",
    daily_cap: 1000,
    unlock: 1,
  },
  {
    id: "phones",
    name: "Phone Unlock Stall",
    district: "market",
    cost: 350,
    income: 15,
    min_income: 14,
    max_income: 19,
    real_range: "GH₵14 – GH₵19 / min",
    real_desc: "Circle Tip-Toe Lane IMEI bypass and screen repairs",
    daily_cap: 1000,
    unlock: 1,
  },
  {
    id: "jerseys",
    name: "Fake Jersey Plug",
    district: "osu",
    cost: 1800,
    income: 20,
    min_income: 18,
    max_income: 25,
    real_range: "GH₵18 – GH₵25 / min",
    real_desc: "Guangzhou replica Black Stars & club jerseys in Osu",
    daily_cap: 1000,
    unlock: 1,
  },
  {
    id: "fuel",
    name: "Fuel Siphon Ring",
    district: "zongo",
    cost: 9500,
    income: 26,
    min_income: 24,
    max_income: 31,
    real_range: "GH₵24 – GH₵31 / min",
    real_desc: "Pipeline taps and 50L yellow jerrycan fuel resale",
    daily_cap: 1000,
    unlock: 1,
  },
  {
    id: "container",
    name: "Container Skim",
    district: "dockside",
    cost: 48000,
    income: 32,
    min_income: 30,
    max_income: 37,
    real_range: "GH₵30 – GH₵37 / min",
    real_desc: "Customs manifest skimming at Tema Port Quay 2",
    daily_cap: 1000,
    unlock: 1,
  },
  {
    id: "gold",
    name: "Gold Dust Runs",
    district: "kejetia",
    cost: 240000,
    income: 38,
    min_income: 36,
    max_income: 41,
    real_range: "GH₵36 – GH₵41 / min",
    real_desc: "Obuasi artisan gold dust smuggling via bush taxis",
    daily_cap: 1000,
    unlock: 1,
  },
  {
    id: "estate",
    name: "Estate Land Guards",
    district: "hills",
    cost: 1200000,
    income: 42,
    min_income: 40,
    max_income: 45,
    real_range: "GH₵40 – GH₵45 / min",
    real_desc: "Perimeter protection squads for disputed Cantonments plots",
    daily_cap: 1000,
    unlock: 1,
  },
];

export const HUSTLE_MAP = Object.fromEntries(HUSTLES.map((h) => [h.id, h]));

export const FRONTS: Front[] = [
  { id: "chopbar", name: "Auntie Esi's Chop Bar", cost: 30000, cap: 60000, dur: 300, unlock: 1 },
  { id: "spare", name: "Spare Parts Shop", cost: 95000, cap: 180000, dur: 900, unlock: 1 },
  { id: "momo", name: "MoMo Kiosk", cost: 280000, cap: 550000, dur: 1800, unlock: 1 },
  { id: "trotro", name: "Trotro Fleet", cost: 750000, cap: 1600000, dur: 3600, unlock: 1 },
  { id: "carwash", name: "Shine Shine Car Wash", cost: 2200000, cap: 5000000, dur: 7200, unlock: 1 },
  { id: "club", name: "Osu Night Club", cost: 6500000, cap: 18000000, dur: 14400, unlock: 1 },
];

export const FRONT_MAP = Object.fromEntries(FRONTS.map((f) => [f.id, f]));

export const HEAT_TIERS = [
  { tier: 1, name: "Police Patrol" },
  { tier: 2, name: "Task Force" },
  { tier: 3, name: "CID" },
  { tier: 4, name: "SWAT" },
  { tier: 5, name: "National Bureau" },
];

export const ROLES: Record<string, string> = { Hacker: "brains", Driver: "wheels", Enforcer: "muscle", Infiltrator: "stealth" };
export const ARCHETYPES: Record<string, string> = { hacker: "brains", driver: "wheels", enforcer: "muscle", infiltrator: "stealth" };
export const ROLE_ARCH: Record<string, string> = { Hacker: "hacker", Driver: "driver", Enforcer: "enforcer", Infiltrator: "infiltrator" };

export const STRENGTHS = [
  { id: "sharp_eyes", name: "Sharp Eyes", stat: "stealth", mod: 2 },
  { id: "lead_foot", name: "Lead Foot", stat: "wheels", mod: 2 },
  { id: "iron_chin", name: "Iron Chin", stat: "muscle", mod: 2 },
  { id: "code_wizard", name: "Code Wizard", stat: "brains", mod: 2 },
];

export const FLAWS = [
  { id: "big_mouth", name: "Big Mouth", desc: "extra heat on heists" },
  { id: "lazy_bones", name: "Lazy Bones", desc: "learns 25% slower" },
  { id: "hothead", name: "Hothead", stat: "stealth", mod: -2, desc: "-2 stealth" },
  { id: "shaky_hands", name: "Shaky Hands", stat: "brains", mod: -2, desc: "-2 brains" },
];

export const FIRST_NAMES = ["Kofi", "Kwame", "Yaw", "Kojo", "Kwesi", "Fiifi", "Nii", "Selasi", "Alhassan", "Baba", "Kwaku", "Ebo"];
export const FEMALE_NAMES = ["Ama", "Akosua", "Abena", "Efua", "Adjoa", "Esi", "Naa", "Fati", "Ekua", "Dzifa", "Afua", "Yaa"];
export const NICKNAMES = ["Small Boy", "Sharp Sharp", "Taller", "Shatta", "One Man", "Dada", "Bra", "Smallie", "Kpakpa", "Fire Fire", "Slow Wine", "Gyata", "Obiaa", "Papa No"];

export interface CrewBackground {
  id: string;
  origin: string;
  arch: string;
  trait: string;
  specialty_biz: string;
  temperament: string;
  bio: string;
  trait_reason: string;
}

export const CREW_BACKGROUNDS: CrewBackground[] = [
  {
    id: "auditor",
    origin: "Ex-Barclays Senior Auditor",
    arch: "hacker",
    trait: "bookkeeper",
    specialty_biz: "momo",
    temperament: "Cold & Methodical",
    bio: "Fled a banking scandal in Airport City with encrypted ledger files. Keeps accounts clean down to the last pesewa.",
    trait_reason: "6 years auditing commercial bank transfers enables seamless double-entry laundering with zero paper trail.",
  },
  {
    id: "chop_queen",
    origin: "Makola Market Chop Queen",
    arch: "infiltrator",
    trait: "chop_master",
    specialty_biz: "chopbar",
    temperament: "Charismatic & Fierce",
    bio: "Ran Auntie Esi's rival kitchen in Makola before joining the syndicate. Can prep waakye for 300 customers before dawn.",
    trait_reason: "High customer turnover and market bulk-buying experience speed up food business laundering cycles by 40%.",
  },
  {
    id: "circle_hacker",
    origin: "Circle Tip-Toe Lane Hacker",
    arch: "hacker",
    trait: "tech_whiz",
    specialty_biz: "phones",
    temperament: "Caffeine-Fueled Genius",
    bio: "Bypasses iCloud locks and clones MoMo SIMs in under 3 minutes behind the Circle overhead bridge.",
    trait_reason: "Custom algorithmic scripts automate phone unlocking and maximize telecom cash skims by +40%.",
  },
  {
    id: "station_master",
    origin: "GPRTU Station Master",
    arch: "driver",
    trait: "fleet_captain",
    specialty_biz: "trotro",
    temperament: "Authoritative Boss",
    bio: "Controlled 45 sprinter trotros on the Kaneshie-Accra route. Drivers obey his whistle without hesitation.",
    trait_reason: "Mastery of transport routes and fuel dispatch cuts fleet downtime and boosts transit speed by 50%.",
  },
  {
    id: "tema_stevedore",
    origin: "Tema Container Port Stevedore",
    arch: "enforcer",
    trait: "customs_insider",
    specialty_biz: "container",
    temperament: "Quiet Heavyweight",
    bio: "Spent a decade working night shifts at Tema Port Quay 2. Knows which shipping containers hold high-value contraband.",
    trait_reason: "Deep understanding of customs manifest falsification boosts container skimming yield by +45%.",
  },
  {
    id: "suame_mechanic",
    origin: "Kumasi Suame Magazine Mechanic",
    arch: "driver",
    trait: "grease_monkey",
    specialty_biz: "spare",
    temperament: "Gritty Perfectionist",
    bio: "Can diagnose a blown gasket by sound alone. Rebuilt engines for cross-border gold runners for 8 years.",
    trait_reason: "Direct connections to scrap yards and salvage yards expand spare parts washing capacity by +50%.",
  },
  {
    id: "vip_bouncer",
    origin: "Osu VIP Lounge Bouncer",
    arch: "enforcer",
    trait: "high_society",
    specialty_biz: "club",
    temperament: "Suave & Intimidating",
    bio: "Guarded private booths where politicians and diplomats party. Knows who spends big and who owes money.",
    trait_reason: "Attracts high-roller patrons to upscale night venues and increases wash capacity by +60%.",
  },
  {
    id: "cid_fixer",
    origin: "Accra CID Forensic Fixer",
    arch: "infiltrator",
    trait: "cleaner",
    specialty_biz: "carwash",
    temperament: "Paranoid & Discreet",
    bio: "Former police records clerk who burned evidence files for cash. Knows exactly what detectives look for during audits.",
    trait_reason: "Routinely purges transaction records and wipes suspicious cash flows, slashing business heat by 75%.",
  },
  {
    id: "zongo_lender",
    origin: "Zongo Underground Moneylender",
    arch: "enforcer",
    trait: "loan_shark",
    specialty_biz: "gold",
    temperament: "Relentless & Hardened",
    bio: "Enforced informal interest rates across Nima and Fadama. Has a photographic memory for who took credit.",
    trait_reason: "Aggressive street collection tactics squeeze +35% higher cash returns out of local operations.",
  },
  {
    id: "okada_runner",
    origin: "Midnight Okada Courier",
    arch: "driver",
    trait: "night_owl",
    specialty_biz: "okada",
    temperament: "Nocturnal Daredevil",
    bio: "Never works in daylight. Navigates unmapped back alleys from Jamestown to Spintex with headlights dimmed.",
    trait_reason: "Nocturnal routing slips past daytime police checkpoints, keeping business processing fast overnight (+35%).",
  },
  {
    id: "market_broker",
    origin: "Kantanto Wholesale Broker",
    arch: "infiltrator",
    trait: "hustle_plug",
    specialty_biz: "jerseys",
    temperament: "Fast-Talking Dealmaker",
    bio: "Brokered counterfeit jersey bales from Guangzhou into Makola. Has the entire market guild on speed dial.",
    trait_reason: "Secures bulk buyer contracts and wholesale pricing, boosting hustle margins across the district (+35%).",
  },
  {
    id: "court_clerk",
    origin: "High Court Registrar Clerk",
    arch: "hacker",
    trait: "smooth_talker",
    specialty_biz: "estate",
    temperament: "Charming Bureaucrat",
    bio: "Spent years preparing judicial warrants and bail dockets. Speaks four local dialects and charms tax inspectors.",
    trait_reason: "Negotiates municipal exemptions and sweet-talks revenue collectors, reducing fees by 6% with +10% tips.",
  },
  {
    id: "bukom_boxer",
    origin: "Bukom Beach Boxing Champion",
    arch: "enforcer",
    trait: "iron_guard",
    specialty_biz: "estate",
    temperament: "Fearless Warrior",
    bio: "Undefeated in 22 bare-knuckle bouts on the Accra beachside. Rival street gangs clear the sidewalk when he steps in.",
    trait_reason: "Provides legendary street intimidation, granting +35 compound raid defense and repelling shakedowns.",
  },
  {
    id: "pipeline_tech",
    origin: "Tema Refinery Pipeline Tech",
    arch: "infiltrator",
    trait: "fuel_siphoner",
    specialty_biz: "fuel",
    temperament: "Calculated Risk-Taker",
    bio: "Trained at Tema Oil Refinery before going rogue. Installed secret tapping valves along underground fuel lines.",
    trait_reason: "Siphons industrial petroleum with zero spillage, yielding +50% dirty cash rate on fuel rings.",
  },
];

export const CREW_BACKGROUND_MAP = Object.fromEntries(CREW_BACKGROUNDS.map((b) => [b.id, b]));

export interface CrewFrontTrait {
  id: string;
  name: string;
  desc: string;
  effect: string;
  bonus: number;
  fee_discount?: number;
  clean_bonus?: number;
}

export const CREW_FRONT_TRAITS: CrewFrontTrait[] = [
  { id: "bookkeeper", name: "Ledger Cook", desc: "+40% wash capacity, -4% laundering fee, +15% clean payout bonus", effect: "cap", bonus: 0.40, fee_discount: 0.04, clean_bonus: 0.15 },
  { id: "chop_master", name: "Kitchen Maestro", desc: "Laundering runs 40% faster; +25% payout at food businesses", effect: "speed", bonus: 0.40 },
  { id: "night_owl", name: "Midnight Expeditor", desc: "+35% wash capacity, 30% faster offline processing", effect: "speed", bonus: 0.30 },
  { id: "cleaner", name: "Forensic Cleaner", desc: "Reduces heat generated by this business by 75%", effect: "heat", bonus: 0.75 },
  { id: "smooth_talker", name: "Street Diplomat", desc: "Reduces laundering fee by 6% and earns 10% customer tips", effect: "fee", bonus: 0.06 },
  { id: "hustle_plug", name: "District Plug", desc: "+35% income to assigned hustle, +15% to all district hustles", effect: "income", bonus: 0.35 },
  { id: "iron_guard", name: "Compound Sentry", desc: "Gives +35 compound raid defense and blocks rival shakedowns", effect: "defense", bonus: 35 },
  { id: "tech_whiz", name: "Circle Cyber Prodigy", desc: "+40% income on Phone & MoMo businesses, cuts transaction lag", effect: "tech", bonus: 0.40 },
  { id: "fleet_captain", name: "Trotro Fleet Master", desc: "Trotro & transit operations run 50% faster, generates clean dividends", effect: "fleet", bonus: 0.50 },
  { id: "high_society", name: "VIP Nightlife Icon", desc: "+60% wash capacity on Osu Night Club, attracts wealthy patrons", effect: "vip", bonus: 0.60 },
  { id: "customs_insider", name: "Dockside Smuggler", desc: "Container Skim & Harbour hustles gain +45% dirty rate with -50% heat", effect: "smuggle", bonus: 0.45 },
  { id: "grease_monkey", name: "Suame Auto Mechanic", desc: "Spare Parts Shop capacity +50% and car wash cycles run 40% faster", effect: "mechanic", bonus: 0.50 },
  { id: "loan_shark", name: "Microfinance Collector", desc: "+35% dirty cash collection yield, +10% interest accrual rate", effect: "lender", bonus: 0.35 },
  { id: "fuel_siphoner", name: "Pipeline Tap Engineer", desc: "Fuel Siphon Ring income +50%, zero fuel waste during transfers", effect: "fuel", bonus: 0.50 },
];

export const DAILY_HEIST_BASE_LIMIT = 4;

export const HEISTS: Heist[] = [
  { id: "float", name: "MoMo Float Grab", dur: 1800, roles: ["Driver", "Infiltrator"], diff: 35, reward: 5000, unlock: 1, heat: 5 },
  { id: "betting", name: "Betting Shop Safe", dur: 3600, roles: ["Hacker", "Infiltrator", "Driver"], diff: 55, reward: 18000, unlock: 1, heat: 8 },
  { id: "port", name: "Harbour Container Lift", dur: 7200, roles: ["Hacker", "Driver", "Enforcer", "Enforcer (Support)"], diff: 85, reward: 65000, unlock: 1, heat: 12 },
  { id: "tanker", name: "Fuel Tanker Convoy", dur: 10800, roles: ["Driver", "Driver (Escort)", "Enforcer", "Enforcer (Gunner)"], diff: 120, reward: 220000, unlock: 1, heat: 15 },
  { id: "lockup", name: "Market Gold Lockup", dur: 14400, roles: ["Hacker", "Hacker (Cyber)", "Driver", "Enforcer", "Infiltrator"], diff: 180, reward: 750000, unlock: 1, heat: 18 },
  { id: "casino", name: "Strip Casino Vault", dur: 21600, roles: ["Hacker", "Hacker (Security)", "Driver", "Enforcer", "Enforcer (Muscle)", "Infiltrator"], diff: 260, reward: 2800000, unlock: 1, heat: 22 },
  { id: "central_bank", name: "Central Bank Gold Reserves", dur: 43200, roles: ["Hacker", "Hacker (Mainframe)", "Driver", "Driver (Convoy)", "Enforcer", "Enforcer (Heavy)", "Infiltrator"], diff: 450, reward: 12000000, unlock: 1, heat: 30 },
];

export const HEIST_MAP = Object.fromEntries(HEISTS.map((h) => [h.id, h]));

export const HEIST_APPROACHES: Record<string, { name: string; desc: string; chance: number; heat: number; reward: number; dur: number }> = {
  balanced: { name: "Balanced", desc: "No surprises", chance: 0, heat: 1.0, reward: 1.0, dur: 1.0 },
  quiet: { name: "Quiet", desc: "-40% heat, -10% payout", chance: 0.03, heat: 0.6, reward: 0.9, dur: 1.0 },
  loud: { name: "Loud", desc: "+8% chance, +50% heat", chance: 0.08, heat: 1.5, reward: 1.0, dur: 1.0 },
  smart: { name: "Smart", desc: "+15% payout, takes 25% longer", chance: 0.04, heat: 0.9, reward: 1.15, dur: 1.25 },
};

export const HEIST_PREP: Record<string, { name: string; desc: string; cost: number }> = {
  intel: { name: "Buy inside intel", desc: "+12% chance", cost: 0.10 },
  getaway: { name: "Rent getaway car", desc: "30% faster", cost: 0.08 },
};

export interface HeistEventChoice {
  id: string;
  label: string;
  desc: string;
  cost_clean?: number;
  cost_dirty?: number;
  req_role?: string;
  success_msg: string;
  chance_mod: number;
  heat_mod: number;
  payout_mod: number;
}

export interface HeistEvent {
  id: string;
  title: string;
  desc: string;
  radio_chatter: string;
  severity: "low" | "medium" | "critical";
  choices: HeistEventChoice[];
  fail_penalty: {
    chance_drop: number;
    heat_spike: number;
    morale_loss: number;
    desc: string;
  };
}

export const HEIST_EVENTS: HeistEvent[] = [
  {
    id: "police_checkpoint",
    title: "Police SWAT Roadblock Ahead",
    desc: "A heavy Ghana Police checkpoint with spike strips and tactical cruisers was abruptly positioned along the main escape route.",
    radio_chatter: "Boss! Police checkpoint 300 meters out at Tema Roundabout! They're checking boots with flashlights!",
    severity: "critical",
    fail_penalty: {
      chance_drop: 30,
      heat_spike: 25,
      morale_loss: 25,
      desc: "Van forced into a high-speed chase through roadblocks. Critical heat spike and severe chance loss!",
    },
    choices: [
      {
        id: "back_alley",
        label: "Kejetia Back-Alley Drift",
        desc: "Divert through maze-like narrow unpaved market alleys. Requires skilled Driver.",
        req_role: "Driver",
        chance_mod: 20,
        heat_mod: -5,
        payout_mod: 1.0,
        success_msg: "Driver slipped the van through narrow alleyways cleanly! Checkpoint bypassed.",
      },
      {
        id: "bribe_officer",
        label: "Quick Bribe Envelope",
        desc: "Pass GH₵400 clean cash to the sergeant at the barrier.",
        cost_clean: 400,
        chance_mod: 15,
        heat_mod: -15,
        payout_mod: 1.0,
        success_msg: "Sergeant took the envelope and waved the convoy through without inspection.",
      },
      {
        id: "ram_barrier",
        label: "Ram Roadblock with Muscle",
        desc: "Smash through the wooden barriers with raw horsepower. High noise and heat.",
        chance_mod: 8,
        heat_mod: 20,
        payout_mod: 1.0,
        success_msg: "Plowed straight through the wooden barriers! Escape underway but sirens are blaring.",
      },
    ],
  },
  {
    id: "silent_alarm",
    title: "Auxiliary Laser Sensor Tripped",
    desc: "A hidden infrared perimeter wire was triggered near the vault entryway, initiating a silent CID alert countdown.",
    radio_chatter: "Warning! Red light on the junction box. CID central dispatch received an automated ping!",
    severity: "critical",
    fail_penalty: {
      chance_drop: 35,
      heat_spike: 30,
      morale_loss: 20,
      desc: "CID Task Force scrambled to the site. Security locks engaged!",
    },
    choices: [
      {
        id: "loop_cameras",
        label: "Hacker Relay Loop",
        desc: "Overheat the relay hub and feed looped false security footage. Requires Hacker.",
        req_role: "Hacker",
        chance_mod: 25,
        heat_mod: -10,
        payout_mod: 1.0,
        success_msg: "Hacker patched into the telemetry box and cancelled the dispatch alarm!",
      },
      {
        id: "cut_power",
        label: "Sever District Power Line",
        desc: "Blackout the local power grid to kill alarm communications.",
        chance_mod: 12,
        heat_mod: 10,
        payout_mod: 1.0,
        success_msg: "Power cut plunging the compound into darkness. Alarm disabled.",
      },
      {
        id: "speed_grab",
        label: "Rush Extraction Now",
        desc: "Grab whatever cash is exposed and sprint for the doors before response arrives.",
        chance_mod: -10,
        heat_mod: 15,
        payout_mod: 0.8,
        success_msg: "Grabbed partial loot and retreated rapidly before police cruisers arrived.",
      },
    ],
  },
  {
    id: "corrupt_guard",
    title: "Night Sentry Standoff",
    desc: "A private security supervisor unexpectedly appeared in the hallway with a radio and shotgun.",
    radio_chatter: "Boss, night supervisor just walked around the corner! He's about to hit the panic button!",
    severity: "medium",
    fail_penalty: {
      chance_drop: 25,
      heat_spike: 20,
      morale_loss: 15,
      desc: "Guard tripped panic button! Sirens wailing across the district.",
    },
    choices: [
      {
        id: "silent_takedown",
        label: "Silent Enforcer Takedown",
        desc: "Drop the sentry quietly and secure him in the utility closet. Requires Enforcer.",
        req_role: "Enforcer",
        chance_mod: 20,
        heat_mod: 0,
        payout_mod: 1.0,
        success_msg: "Enforcer neutralized the sentry without a single gunshot. Clear to proceed.",
      },
      {
        id: "settle_cash",
        label: "Buy His Silence",
        desc: "Hand over GH₵500 dirty cash from the street purse.",
        cost_dirty: 500,
        chance_mod: 15,
        heat_mod: -5,
        payout_mod: 1.0,
        success_msg: "Guard quietly pocketed the stack and turned the other way.",
      },
      {
        id: "intimidate",
        label: "Syndicate Death Threat",
        desc: "Threaten his family with syndicate retribution if he touches that alarm.",
        chance_mod: 10,
        heat_mod: 5,
        payout_mod: 1.0,
        success_msg: "Guard threw his radio down and raised his hands in terror.",
      },
    ],
  },
  {
    id: "getaway_traffic",
    title: "Oxford Street Gridlock",
    desc: "A broken-down commercial trotro and street market crowd completely blocked the primary getaway intersection.",
    radio_chatter: "We're boxed in on Oxford Street! Taxis honking everywhere, siren sirens echoing from behind!",
    severity: "medium",
    fail_penalty: {
      chance_drop: 20,
      heat_spike: 18,
      morale_loss: 15,
      desc: "Stuck in traffic while squad cars converge. Massive delay and stress!",
    },
    choices: [
      {
        id: "okada_flank",
        label: "Okada Bike Flank",
        desc: "Call Okada courier squad to split the loot and ferry crew across sidewalks (GH₵300 dirty).",
        cost_dirty: 300,
        chance_mod: 20,
        heat_mod: -10,
        payout_mod: 1.1,
        success_msg: "Okada riders swept in, split the bags, and zipped through alleys effortlessly!",
      },
      {
        id: "curb_jump",
        label: "Curb-Jump Drift",
        desc: "Driver mounts the concrete sidewalk and roars through the gas station plaza. Requires Driver.",
        req_role: "Driver",
        chance_mod: 18,
        heat_mod: 8,
        payout_mod: 1.0,
        success_msg: "Driver jumped the curb with screeching tires and broke onto the highway!",
      },
      {
        id: "smoke_screen",
        label: "Smoke Grenade Diversion",
        desc: "Infiltrator pops military smoke to obscure the intersection. Requires Infiltrator.",
        req_role: "Infiltrator",
        chance_mod: 15,
        heat_mod: -5,
        payout_mod: 1.0,
        success_msg: "Dense white smoke engulfed the street, letting the van slip away unseen.",
      },
    ],
  },
  {
    id: "vault_fail",
    title: "Thermal Drill Bit Overheating",
    desc: "The reinforced tungsten door plating is tougher than blueprints indicated. Drill motor is smoking.",
    radio_chatter: "Drill motor is at 400 degrees! The magnetic locks are resisting the thermal charge!",
    severity: "medium",
    fail_penalty: {
      chance_drop: 30,
      heat_spike: 15,
      morale_loss: 20,
      desc: "Drill died! Forced to leave half the cash boxes behind in the vault.",
    },
    choices: [
      {
        id: "hack_override",
        label: "Firmware Voltage Spike",
        desc: "Hacker remotely injects an over-voltage command into the locking servo. Requires Hacker.",
        req_role: "Hacker",
        chance_mod: 25,
        heat_mod: -5,
        payout_mod: 1.15,
        success_msg: "Hacker popped the electronic deadbolts! Vault door swung wide open.",
      },
      {
        id: "crowbar_muscle",
        label: "Hydraulic Pry Leverage",
        desc: "Enforcers use hydraulic rescue jaws and steel pry bars. Requires Enforcer.",
        req_role: "Enforcer",
        chance_mod: 18,
        heat_mod: 8,
        payout_mod: 1.05,
        success_msg: "Enforcers wrenched the hinges apart with brute force and popped the door!",
      },
      {
        id: "coolant_boost",
        label: "Liquid Coolant Injector",
        desc: "Spend GH₵250 clean cash for specialized industrial cutting coolant.",
        cost_clean: 250,
        chance_mod: 15,
        heat_mod: 0,
        payout_mod: 1.1,
        success_msg: "Drill bit cooled rapidly and sliced cleanly through the inner locks.",
      },
    ],
  },
  {
    id: "civilian_witness",
    title: "Curious Market Bystander",
    desc: "A late-night street vendor stepped behind the back alley dumpster and spotted duffel bags being loaded into the van.",
    radio_chatter: "Boss, someone just popped out of the bakery back door with a phone in hand!",
    severity: "low",
    fail_penalty: {
      chance_drop: 15,
      heat_spike: 15,
      morale_loss: 10,
      desc: "Witness posted video online! Heat elevated and police alerted.",
    },
    choices: [
      {
        id: "smooth_talk",
        label: "Street Diplomat Settlement",
        desc: "Infiltrator smiles, passes GH₵150 clean cash, and convinces him to forget what he saw. Requires Infiltrator.",
        req_role: "Infiltrator",
        cost_clean: 150,
        chance_mod: 18,
        heat_mod: -10,
        payout_mod: 1.0,
        success_msg: "Infiltrator calmed the witness down with cash and a friendly pat on the shoulder.",
      },
      {
        id: "confiscate_phone",
        label: "Confiscate Phone",
        desc: "Snatch the phone, smash the SIM card, and lock him in the storeroom.",
        chance_mod: 12,
        heat_mod: 5,
        payout_mod: 1.0,
        success_msg: "Phone smashed and witness safely secured. No calls will be made tonight.",
      },
      {
        id: "ignore_run",
        label: "Speed Up & Ignore",
        desc: "Slam the doors and floor the gas pedal before he can dial.",
        chance_mod: 5,
        heat_mod: 12,
        payout_mod: 1.0,
        success_msg: "Spun tires and sped off into the night.",
      },
    ],
  },
];

export const HEIST_EVENT_MAP = Object.fromEntries(HEIST_EVENTS.map((e) => [e.id, e]));

export const RIVALS: Rival[] = [
  { id: "kpakpa", name: "Kpakpa Crew", district: "dockside", boss: "Nii Kpakpa", ally_id: "coastal", bloc: "Harbour Brotherhood", personality: "Vindictive" },
  { id: "coastal", name: "Coastal Smugglers", district: "dockside", boss: "Captain Mensah", ally_id: "kpakpa", bloc: "Harbour Brotherhood", personality: "Aggressive" },
  { id: "lions", name: "Zongo Lions", district: "zongo", boss: "Alhaji Simba", ally_id: "nima", bloc: "Northern Front", personality: "Ruthless" },
  { id: "nima", name: "Nima Black Stars", district: "zongo", boss: "Commander Moro", ally_id: "lions", bloc: "Northern Front", personality: "Vindictive" },
  { id: "silk", name: "Osu Silk Syndicate", district: "osu", boss: "Madam Silk", ally_id: "cantonments", bloc: "High Society Pact", personality: "Calculated" },
  { id: "cantonments", name: "Cantonments Cartel", district: "hills", boss: "Nana Kwame", ally_id: "silk", bloc: "High Society Pact", personality: "Calculated" },
  { id: "kings", name: "Junction Kings", district: "kejetia", boss: "Opanin Kwabena", ally_id: "ashanti", bloc: "Gold Highway Bloc", personality: "Aggressive" },
  { id: "ashanti", name: "Ashanti Vipers", district: "kejetia", boss: "Yaw Barima", ally_id: "kings", bloc: "Gold Highway Bloc", personality: "Ruthless" },
  { id: "circle", name: "Circle Phone Mafia", district: "market", boss: "Slick Jerry", ally_id: "spintex", bloc: "Metro Tech Alliance", personality: "Calculated" },
  { id: "spintex", name: "Spintex Speedsters", district: "osu", boss: "Fire Fiifi", ally_id: "circle", bloc: "Metro Tech Alliance", personality: "Aggressive" },
  { id: "tema", name: "Tema Container Cartel", district: "dockside", boss: "Iron Salifu", ally_id: "lions", bloc: "Northern Front", personality: "Ruthless" },
];

export const RIVAL_MAP = Object.fromEntries(RIVALS.map((r) => [r.id, r]));

export const UPGRADES: Record<string, { name: string; group: "mansion" | "garage"; cost: number; max: number; desc: string }> = {
  vault: { name: "Vault", group: "mansion", cost: 200, max: 99, desc: "Protects more dirty cash from raids" },
  walls: { name: "Compound Walls", group: "mansion", cost: 300, max: 99, desc: "+15 raid defence per level" },
  safehouse: { name: "Village Safehouse", group: "mansion", cost: 5000, max: 99, desc: "Offline earnings cap 12h to 24h" },
  studio: { name: "Hiplife Studio", group: "mansion", cost: 1000, max: 99, desc: "+5% hustle income per level" },
  okada: { name: "Okada Squad", group: "garage", cost: 800, max: 99, desc: "Heists finish 5% faster per level" },
  trotro: { name: "Trotro Van", group: "garage", cost: 600, max: 99, desc: "+10% laundering batch size per level" },
  quarters: { name: "Crew Quarters", group: "mansion", cost: 2500, max: 99, desc: "+2 crew slots per level (base 12)" },
  cruiser: { name: "V8 Land Cruiser", group: "garage", cost: 1500, max: 99, desc: "+10 raid defence per level" },
};

export interface MansionFacility {
  id: string;
  name: string;
  desc: string;
  max: number;
  base_cost_dirty: number;
  base_cost_clean: number;
  perks: string[];
}

export const MANSION_FACILITIES: Record<string, MansionFacility> = {
  infirmary: {
    id: "infirmary",
    name: "Medical Clinic & Sickbay",
    desc: "Field clinic treating crew trauma. Recovers crew morale (+10/hr) and prevents desertion.",
    max: 99,
    base_cost_dirty: 3500,
    base_cost_clean: 1200,
    perks: ["+10 Crew Morale Recovery/hr", "Immunity to critical trauma", "Crew rehab cost -25%"],
  },
  armoury: {
    id: "armoury",
    name: "Armoury & Munitions Workshop",
    desc: "Weapon maintenance and bullet pressing. Bolsters compound security against rival invasions.",
    max: 99,
    base_cost_dirty: 4500,
    base_cost_clean: 1800,
    perks: ["+25 Compound Raid Defense per level", "+10% Weapon Power to all assigned crew", "Weapon upgrade cost -15%"],
  },
  radio_tower: {
    id: "radio_tower",
    name: "Intelligence & Radio Hub",
    desc: "Taps police dispatch and rival syndicate radio traffic. Detects alliance raids before they launch.",
    max: 99,
    base_cost_dirty: 5000,
    base_cost_clean: 2200,
    perks: ["2x Earlier Raid Warning Time", "Reveals rival alliance treaties & grudges", "+15% Heist Success Intel"],
  },
  barracks: {
    id: "barracks",
    name: "Crew Bunkhouse & Lounge",
    desc: "Comfortable air-conditioned bunks. Expands crew housing and prevents mutinous desertions.",
    max: 99,
    base_cost_dirty: 3000,
    base_cost_clean: 1000,
    perks: ["+3 Crew Roster Slots per level", "Minimum crew morale locked at 25%", "Recruits arrive with +1 Level"],
  },
  generator: {
    id: "generator",
    name: "Solar & Diesel Power Grid",
    desc: "Uninterruptible power system. Powers all processing, keeping laundering and grow farm lights humming.",
    max: 99,
    base_cost_dirty: 6000,
    base_cost_clean: 2500,
    perks: ["Laundering cycles 20% faster", "Grow Farm crops mature 25% faster", "-10% Business Heat"],
  },
  vault: {
    id: "vault",
    name: "Reinforced Underground Vault",
    desc: "Heavy blast-door subterranean vault. Protects dirty and clean cash from rival syndicate raids.",
    max: 99,
    base_cost_dirty: 4000,
    base_cost_clean: 1500,
    perks: ["Triples Vault Cash Protection per level", "Immune to safe-cracking during raids", "10% Interest on Stashed Clean Cash"],
  },
  walls: {
    id: "walls",
    name: "Perimeter High Walls & Razor Wire",
    desc: "Reinforced concrete perimeter with concertina wire and automatic searchlights.",
    max: 99,
    base_cost_dirty: 2500,
    base_cost_clean: 800,
    perks: ["+30 Raid Defence per level", "Repels opportunistic thief runs", "Decreases raid frequency by 20%"],
  },
};

export interface BossPerk {
  id: string;
  name: string;
  desc: string;
  max: number;
}

export const BOSS_PERKS: Record<string, BossPerk> = {
  negotiator: { id: "negotiator", name: "Master Negotiator", desc: "-2% laundering fee per rank", max: 99 },
  street_king: { id: "street_king", name: "Accra Street King", desc: "+12% all hustle income per rank", max: 99 },
  iron_jaw: { id: "iron_jaw", name: "Iron Will", desc: "+20 compound defense per rank", max: 99 },
  ghost: { id: "ghost", name: "Ghost Operator", desc: "-15% heat generated from operations", max: 99 },
  commander: { id: "commander", name: "Field Commander", desc: "+1 to all crew base stats and +10 base morale", max: 99 },
};

export const BLACK_MARKET: BlackMarketItem[] = [
  { id: "burner", name: "Burner Phone", desc: "Drop 15 heat", price: 3000, kind: "heat", value: 15 },
  { id: "receipt", name: "Fake Receipt Book", desc: "Drop 10 heat", price: 3000, kind: "heat", value: 10 },
  { id: "envelope", name: "Brown Envelope", desc: "Quiet bribe: drop 25 heat", price: 4500, kind: "heat", value: 25 },
  { id: "donation", name: "Church Harvest Donation", desc: "Look holy: drop 40 heat", price: 7500, kind: "heat", value: 40 },
  { id: "vest", name: "Kevlar Vest", desc: "+5 raid defence each (max 10)", price: 3500, kind: "defence", value: 5, max: 10 },
  { id: "cctv", name: "CCTV Kit", desc: "+8 raid defence each (max 5)", price: 6000, kind: "defence", value: 8, max: 5 },
  { id: "spikes", name: "Spike Strips", desc: "+2 fortify during a raid (max 7)", price: 5000, kind: "fortify", value: 2 },
  { id: "dog", name: "Guard Dog 'Bullet'", desc: "+3 fortify during a raid (max 7)", price: 8500, kind: "fortify", value: 3 },
  { id: "radio", name: "Walkie-Talkie Set", desc: "+5% on your next heist", price: 3000, kind: "heist_boost", value: 0.05 },
  { id: "goggles", name: "Night Goggles", desc: "+8% on your next heist", price: 3800, kind: "heist_boost", value: 0.08 },
  { id: "scanner", name: "Police Scanner", desc: "+10% on your next heist", price: 4800, kind: "heist_boost", value: 0.10 },
  { id: "blueprints", name: "Stolen Blueprints", desc: "+12% on your next heist", price: 6500, kind: "heist_boost", value: 0.12 },
  { id: "lockpick", name: "Lock Pick Kit", desc: "+15% on your next heist", price: 3200, kind: "heist_boost", value: 0.15 },
  { id: "plates", name: "Fake Number Plates", desc: "Your next heist brings half the heat", price: 3600, kind: "heist_heat", value: 0.5 },
  { id: "okada_key", name: "Spare Okada Keys", desc: "Your next heist finishes 20% faster", price: 4200, kind: "heist_speed", value: 0.8 },
  { id: "energy", name: "Malt & Energy Crate", desc: "+40 XP to every free crew member", price: 5000, kind: "crew_xp", value: 40 },
  { id: "feast", name: "Jollof & Waakye Feast", desc: "+90 XP to every free crew member", price: 9000, kind: "crew_xp", value: 90 },
];

export const BM_MAP = Object.fromEntries(BLACK_MARKET.map((b) => [b.id, b]));

export const COSMETICS: CosmeticItem[] = [
  { id: "drip_fugu", name: "Smock Fugu Jacket", slot: "drip", rarity: "common", clean: 800 },
  { id: "drip_kente", name: "Kente Stole Fit", slot: "drip", rarity: "rare", clean: 2500 },
  { id: "drip_gold", name: "Gold Chain Drip", slot: "drip", rarity: "legendary", clean: 0 },
  { id: "car_corolla", name: "Corolla 'Bullet'", slot: "car", rarity: "common", clean: 1500 },
  { id: "car_benz", name: "Night Benz", slot: "car", rarity: "rare", clean: 6000 },
  { id: "car_v8", name: "Gold-Trim V8", slot: "car", rarity: "legendary", clean: 0 },
  { id: "decor_drum", name: "Fontomfrom Drums", slot: "decor", rarity: "common", clean: 1200 },
  { id: "decor_stool", name: "Golden Stool Replica", slot: "decor", rarity: "legendary", clean: 0 },
  { id: "decor_art", name: "Adinkra Wall Art", slot: "decor", rarity: "rare", clean: 3500 },
];

export const COSMETIC_MAP = Object.fromEntries(COSMETICS.map((c) => [c.id, c]));

export const GEAR: GearItem[] = [
  { id: "w_cutlass", name: "Farm Cutlass", slot: "melee", model: "blade", rarity: "common", price: 600, stat: "muscle", mod: 1, power: 4, unlock: 1, color: "#9ca3af" },
  { id: "w_bat", name: "Cricket Bat", slot: "melee", model: "bat", rarity: "common", price: 900, stat: "muscle", mod: 1, power: 5, unlock: 1, color: "#a16207" },
  { id: "w_machete", name: "Gold-Hilt Machete", slot: "melee", model: "blade", rarity: "rare", price: 6000, stat: "muscle", mod: 2, power: 10, unlock: 1, color: "#d4af37" },
  { id: "w_knuckles", name: "Kente Knuckles", slot: "melee", model: "knuckles", rarity: "legendary", price: 60000, stat: "muscle", mod: 3, power: 18, unlock: 1, color: "#ffd700" },
  { id: "w_9mm", name: "Street 9mm", slot: "secondary", model: "pistol", rarity: "common", price: 1500, stat: "stealth", mod: 1, power: 5, unlock: 1, color: "#27272a" },
  { id: "w_revolver", name: "Old Revolver", slot: "secondary", model: "pistol", rarity: "rare", price: 9000, stat: "stealth", mod: 2, power: 9, unlock: 1, color: "#52525b" },
  { id: "w_taser", name: "Silent Taser", slot: "secondary", model: "pistol", rarity: "legendary", price: 80000, stat: "stealth", mod: 3, power: 15, unlock: 1, color: "#0ea5e9" },
  { id: "w_shotgun", name: "Pump Shotgun", slot: "primary", model: "shotgun", rarity: "common", price: 4000, stat: "muscle", mod: 1, power: 9, unlock: 1, color: "#3f3f46" },
  { id: "w_smg", name: "Compact SMG", slot: "primary", model: "rifle", rarity: "rare", price: 25000, stat: "wheels", mod: 2, power: 14, unlock: 1, color: "#18181b" },
  { id: "w_rifle", name: "Hunter Rifle", slot: "primary", model: "rifle", rarity: "rare", price: 45000, stat: "brains", mod: 2, power: 17, unlock: 1, color: "#713f12" },
  { id: "w_gold_ar", name: "Gold-Plated Rifle", slot: "primary", model: "rifle", rarity: "legendary", price: 400000, stat: "muscle", mod: 3, power: 28, unlock: 1, color: "#ffd700" },
  { id: "w_chain", name: "Okada Chain", slot: "melee", model: "bat", rarity: "common", price: 1400, stat: "muscle", mod: 1, power: 6, unlock: 1, color: "#71717a" },
  { id: "w_cleaver", name: "Chop Bar Cleaver", slot: "melee", model: "blade", rarity: "rare", price: 15000, stat: "muscle", mod: 2, power: 12, unlock: 1, color: "#d4d4d8" },
  { id: "w_spear", name: "Ceremonial Spear", slot: "melee", model: "blade", rarity: "legendary", price: 150000, stat: "muscle", mod: 3, power: 22, unlock: 1, color: "#b45309" },
  { id: "w_flare", name: "Flare Pistol", slot: "secondary", model: "pistol", rarity: "common", price: 3500, stat: "wheels", mod: 1, power: 6, unlock: 1, color: "#ea580c" },
  { id: "w_380", name: "Compact .380", slot: "secondary", model: "pistol", rarity: "rare", price: 20000, stat: "stealth", mod: 2, power: 11, unlock: 1, color: "#3f3f46" },
  { id: "w_hawk", name: "Gold Desert Hawk", slot: "secondary", model: "pistol", rarity: "legendary", price: 250000, stat: "muscle", mod: 3, power: 20, unlock: 1, color: "#ffd700" },
  { id: "w_dbl", name: "Double Barrel", slot: "primary", model: "shotgun", rarity: "rare", price: 18000, stat: "muscle", mod: 2, power: 13, unlock: 1, color: "#27272a" },
  { id: "w_long", name: "Long Rifle", slot: "primary", model: "rifle", rarity: "legendary", price: 600000, stat: "brains", mod: 3, power: 32, unlock: 1, color: "#3f2a14" },
  { id: "w_lmg", name: "Heavy LMG", slot: "primary", model: "rifle", rarity: "legendary", price: 1200000, stat: "muscle", mod: 4, power: 40, unlock: 1, color: "#111111" },
  { id: "c_snapback", name: "Black Stars Snapback", slot: "hat", model: "cap", rarity: "common", price: 300, color: "#111111" },
  { id: "c_kufi", name: "Kente Kufi", slot: "hat", model: "kufi", rarity: "rare", price: 1200, color: "#d4af37" },
  { id: "c_beanie", name: "Red Beanie", slot: "hat", model: "beanie", rarity: "common", price: 400, color: "#d90429" },
  { id: "c_hoodie", name: "Night Hoodie", slot: "top", model: "top", style: "hoodie", pattern: "plain", rarity: "common", price: 500, color: "#1f1f1f" },
  { id: "c_skull_tee", name: "Skull & Bones Tee", slot: "top", model: "top", style: "tee", pattern: "plain", graphic: "skull", rarity: "common", price: 450, color: "#111111" },
  { id: "c_flower_shirt", name: "Holiday Flower Shirt", slot: "top", model: "top", style: "open_shirt", pattern: "flowers", graphic: "skull", rarity: "rare", price: 1600, color: "#1f6f8b" },
  { id: "c_kente_shirt", name: "Kente Print Shirt", slot: "top", model: "top", style: "open_shirt", pattern: "kente", rarity: "rare", price: 1800, color: "#e0a800" },
  { id: "c_smock", name: "Northern Smock", slot: "top", model: "top", style: "tee", pattern: "stripes", rarity: "rare", price: 2200, color: "#1e3a8a" },
  { id: "c_leather", name: "Red Leather Jacket", slot: "top", model: "top", style: "jacket", pattern: "plain", rarity: "legendary", price: 9000, color: "#9f1239" },
  { id: "c_tracksuit", name: "Black Stars Tracksuit", slot: "top", model: "top", style: "tee", pattern: "stripes", rarity: "rare", price: 2600, stat: "wheels", mod: 1, color: "#b91c1c" },
  { id: "c_undervest", name: "Kevlar Under-vest", slot: "top", model: "top", style: "tee", pattern: "plain", rarity: "rare", price: 6000, stat: "muscle", mod: 1, color: "#3f3f46" },
  { id: "c_ghost", name: "Ghost Hoodie", slot: "top", model: "top", style: "hoodie", pattern: "camo", rarity: "legendary", price: 12000, stat: "stealth", mod: 2, color: "#0f172a" },
  { id: "c_suit", name: "Big Man Suit", slot: "top", model: "top", style: "jacket", pattern: "plain", rarity: "legendary", price: 15000, stat: "brains", mod: 2, color: "#111827" },
  { id: "c_joggers", name: "Grey Joggers", slot: "bottom", model: "bottom", style: "pants", rarity: "common", price: 600, color: "#57534e" },
  { id: "c_tactical", name: "Tactical Pants", slot: "bottom", model: "bottom", style: "pants", rarity: "rare", price: 3000, stat: "stealth", mod: 1, color: "#27272a" },
  { id: "c_runners", name: "Getaway Runners", slot: "shoes", model: "shoes", rarity: "rare", price: 2500, stat: "wheels", mod: 1, color: "#16a34a" },
  { id: "c_loafers", name: "Gold Loafers", slot: "shoes", model: "shoes", rarity: "legendary", price: 8000, stat: "brains", mod: 1, color: "#d4af37" },
  { id: "c_bucket", name: "Bucket Hat", slot: "hat", model: "cap", rarity: "common", price: 350, color: "#4d5d2a" },
  { id: "c_durag", name: "Silk Durag", slot: "hat", model: "beanie", rarity: "rare", price: 900, stat: "stealth", mod: 1, color: "#6b21a8" },
  { id: "c_jeans", name: "Dark Jeans", slot: "bottom", model: "bottom", style: "pants", rarity: "common", price: 400, color: "#1e293b" },
  { id: "c_cargo", name: "Olive Cargo Shorts", slot: "bottom", model: "bottom", style: "cargo_shorts", rarity: "common", price: 500, color: "#3a4a3f" },
  { id: "c_camo_shorts", name: "Camo Shorts", slot: "bottom", model: "bottom", style: "shorts", pattern: "camo", rarity: "rare", price: 1100, color: "#4d5d2a" },
  { id: "c_kente_pants", name: "Kente Trousers", slot: "bottom", model: "bottom", style: "pants", pattern: "kente", rarity: "legendary", price: 7000, color: "#00a86b" },
  { id: "c_slides", name: "Chale Wote Slides", slot: "shoes", model: "shoes", rarity: "common", price: 200, color: "#f3f4f6" },
  { id: "c_sneakers", name: "Gold Sneakers", slot: "shoes", model: "shoes", rarity: "rare", price: 1500, color: "#ffd700" },
  { id: "c_boots", name: "Combat Boots", slot: "shoes", model: "shoes", rarity: "common", price: 700, color: "#3f2a14" },
];

export const TIER2_CATEGORIES: Record<string, Tier2Category> = {
  shadow_silk: {
    id: "shadow_silk",
    name: "Shadow Silk",
    trait_name: "Chameleon Veil",
    desc: "-20% heat generation from all actions",
    effect: "heat_reduce",
    bonus: 0.20,
    stat_bonus: { stat: "stealth", mod: 2 },
    color: "#6366f1",
  },
  diamond_weave: {
    id: "diamond_weave",
    name: "Diamond Weave",
    trait_name: "Ballistic Deflection",
    desc: "+25 Compound & Boss raid defense",
    effect: "raid_defense",
    bonus: 25,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#38bdf8",
  },
  viper_leather: {
    id: "viper_leather",
    name: "Viper Leather",
    trait_name: "Venomous Retaliation",
    desc: "+15 weapon attack power in skirmishes",
    effect: "attack_power",
    bonus: 15,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#22c55e",
  },
  diplomatic_seal: {
    id: "diplomatic_seal",
    name: "Diplomatic Seal",
    trait_name: "Consular Immunity",
    desc: "Rival grudges decay 30% faster; heat cools 2x faster",
    effect: "grudge_decay",
    bonus: 0.30,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#eab308",
  },
  gold_standard: {
    id: "gold_standard",
    name: "Gold Standard",
    trait_name: "Midas Touch",
    desc: "15% chance to double clean payout upon laundering collection",
    effect: "double_clean",
    bonus: 0.15,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#ffd700",
  },
  bloodstone_obsidian: {
    id: "bloodstone_obsidian",
    name: "Bloodstone Obsidian",
    trait_name: "Intimidation Glare",
    desc: "+30% dirty cash seized when hitting rivals",
    effect: "rival_loot",
    bonus: 0.30,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#ef4444",
  },
  phantom_stitch: {
    id: "phantom_stitch",
    name: "Phantom Stitch",
    trait_name: "Silent Footsteps",
    desc: "Heists generate 40% less police heat",
    effect: "heist_heat",
    bonus: 0.40,
    stat_bonus: { stat: "stealth", mod: 2 },
    color: "#a855f7",
  },
  bulletproof_twill: {
    id: "bulletproof_twill",
    name: "Bulletproof Kevlar-Twill",
    trait_name: "Iron Body",
    desc: "Reduces dirty cash loss during failed raids by 50%",
    effect: "loss_protect",
    bonus: 0.50,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#64748b",
  },
  chameleon_fiber: {
    id: "chameleon_fiber",
    name: "Chameleon Fiber",
    trait_name: "Ghost Cloak",
    desc: "25% chance to completely negate heat gain on crimes",
    effect: "negate_heat",
    bonus: 0.25,
    stat_bonus: { stat: "stealth", mod: 2 },
    color: "#14b8a6",
  },
  solar_infused: {
    id: "solar_infused",
    name: "Solar Infused",
    trait_name: "Overclocked Drive",
    desc: "Grow farm plots mature 30% faster",
    effect: "farm_speed",
    bonus: 0.30,
    stat_bonus: { stat: "wheels", mod: 2 },
    color: "#f59e0b",
  },
  high_roller_velvet: {
    id: "high_roller_velvet",
    name: "High Roller Velvet",
    trait_name: "VIP Lounge Pass",
    desc: "+35% Front laundering capacity limit",
    effect: "front_cap",
    bonus: 0.35,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#ec4899",
  },
  ceremonial_royal_gold: {
    id: "ceremonial_royal_gold",
    name: "Ceremonial Royal Gold",
    trait_name: "Ancestral Authority",
    desc: "+35 Raid Defence & +15% respect multiplier",
    effect: "royal_defense",
    bonus: 35,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#d97706",
  },
  ghost_frequency: {
    id: "ghost_frequency",
    name: "Ghost Frequency",
    trait_name: "Scanner Jammer",
    desc: "Reveals rival ambushes & raid countdowns 45s earlier",
    effect: "raid_warning",
    bonus: 45,
    stat_bonus: { stat: "stealth", mod: 2 },
    color: "#8b5cf6",
  },
  smugglers_lining: {
    id: "smugglers_lining",
    name: "Smuggler's Lining",
    trait_name: "Hidden Pocket",
    desc: "Safeguards an extra GH₵10,000 dirty cash from raids",
    effect: "vault_boost",
    bonus: 10000,
    stat_bonus: { stat: "stealth", mod: 2 },
    color: "#059669",
  },
  titanium_rivet: {
    id: "titanium_rivet",
    name: "Titanium Rivet",
    trait_name: "Unbreakable Frame",
    desc: "Compound walls provide +30 additional fortification",
    effect: "wall_boost",
    bonus: 30,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#78716c",
  },
  guerilla_camo: {
    id: "guerilla_camo",
    name: "Guerilla Camo",
    trait_name: "Bush Ambush",
    desc: "Heist execution speed +20% faster",
    effect: "heist_speed",
    bonus: 0.20,
    stat_bonus: { stat: "wheels", mod: 2 },
    color: "#84cc16",
  },
  oud_al_malik: {
    id: "oud_al_malik",
    name: "Oud Al-Malik",
    trait_name: "Executive Charisma",
    desc: "Reduces front laundering transaction fees by 4%",
    effect: "fee_reduce",
    bonus: 0.04,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#b45309",
  },
  adinkra_blessing: {
    id: "adinkra_blessing",
    name: "Adinkra Blessing",
    trait_name: "Gye Nyame Ward",
    desc: "+15 Morale and +10% EXP to all crew in roster",
    effect: "crew_morale_exp",
    bonus: 15,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#f97316",
  },
  cybernetic_thread: {
    id: "cybernetic_thread",
    name: "Cybernetic Thread",
    trait_name: "Mainframe Tap",
    desc: "+12% flat bonus to heist success rate",
    effect: "heist_success",
    bonus: 0.12,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#06b6d4",
  },
  predator_wool: {
    id: "predator_wool",
    name: "Predator Wool",
    trait_name: "Apex Dominance",
    desc: "+18 Raid Defence and +12 Raid Attack",
    effect: "predator_combat",
    bonus: 18,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#dc2626",
  },
  subterranean_vaulted: {
    id: "subterranean_vaulted",
    name: "Subterranean Vaulted",
    trait_name: "Deep Bunker",
    desc: "Protects +GH₵25,000 dirty cash from all compound raids",
    effect: "vault_boost",
    bonus: 25000,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#475569",
  },
  mob_boss_pinstripe: {
    id: "mob_boss_pinstripe",
    name: "Mob Boss Pinstripe",
    trait_name: "Syndicate Chairman",
    desc: "+15% income to all Accra street hustles",
    effect: "hustle_income",
    bonus: 0.15,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#312e81",
  },
  night_hawk_carbon: {
    id: "night_hawk_carbon",
    name: "Night Hawk Carbon",
    trait_name: "Getaway Boost",
    desc: "Okada and Trotro transport runs cycle 25% faster",
    effect: "transport_speed",
    bonus: 0.25,
    stat_bonus: { stat: "wheels", mod: 2 },
    color: "#18181b",
  },
  bailout_seal: {
    id: "bailout_seal",
    name: "Bailout Seal",
    trait_name: "Fast-Track Release",
    desc: "Police arrest lockup time halved from 2 hours to 1 hour",
    effect: "arrest_half",
    bonus: 0.50,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#0284c7",
  },
  sovereign_kente: {
    id: "sovereign_kente",
    name: "Sovereign Kente",
    trait_name: "Kingpin Majesty",
    desc: "+25% XP gained by Boss across all game actions",
    effect: "boss_xp",
    bonus: 0.25,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#ca8a04",
  },
  iron_bastion: {
    id: "iron_bastion",
    name: "Iron Bastion",
    trait_name: "Impenetrable Citadel",
    desc: "Prevents opportunistic police raids when heat is above 75",
    effect: "prevent_police_raid",
    bonus: 1,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#52525b",
  },
  cashflow_magnet: {
    id: "cashflow_magnet",
    name: "Cashflow Magnet",
    trait_name: "Grease the Palms",
    desc: "Laundering batches process 25% faster",
    effect: "launder_speed",
    bonus: 0.25,
    stat_bonus: { stat: "wheels", mod: 2 },
    color: "#10b981",
  },
  silent_step_rubber: {
    id: "silent_step_rubber",
    name: "Silent Step Rubber",
    trait_name: "Shadow Tread",
    desc: "+3 Stealth to all crew members assigned to heists",
    effect: "crew_stealth",
    bonus: 3,
    stat_bonus: { stat: "stealth", mod: 2 },
    color: "#334155",
  },
  executive_crest: {
    id: "executive_crest",
    name: "Executive Crest",
    trait_name: "Boardroom Clout",
    desc: "Reduces bribe costs by 50% and shop restock costs by 50%",
    effect: "bribe_discount",
    bonus: 0.50,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#0d9488",
  },
  street_legend_crest: {
    id: "street_legend_crest",
    name: "Street Legend Crest",
    trait_name: "Zongo Vanguard",
    desc: "+2 to ALL base stats (Muscle, Brains, Wheels, Stealth)",
    effect: "all_stats",
    bonus: 2,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#e11d48",
  },
  anansi_trickster: {
    id: "anansi_trickster",
    name: "Anansi Trickster",
    trait_name: "Trickster Gambit",
    desc: "30% chance a failed heist triggers clean escape without heat",
    effect: "escape_heist",
    bonus: 0.30,
    stat_bonus: { stat: "stealth", mod: 2 },
    color: "#c026d3",
  },
  kejetia_broker: {
    id: "kejetia_broker",
    name: "Kejetia Broker",
    trait_name: "Market Arbitrage",
    desc: "Gear sold to boutique pays 40% more clean cedis",
    effect: "sell_bonus",
    bonus: 0.40,
    stat_bonus: { stat: "brains", mod: 2 },
    color: "#16a34a",
  },
  golden_stool_touch: {
    id: "golden_stool_touch",
    name: "Golden Stool Touch",
    trait_name: "Supreme Sovereign",
    desc: "+50 Raid Defence, +20% Hustle Income & crew morale locked at 100",
    effect: "supreme_sovereign",
    bonus: 50,
    stat_bonus: { stat: "muscle", mod: 2 },
    color: "#eab308",
  },
};

export const TIER2_LIST = Object.values(TIER2_CATEGORIES);

export const GUN_SHOP_SUBCATEGORIES: GunShopSubcategory[] = [
  { id: "all", name: "All Arsenals", icon: "Crosshair", desc: "Complete syndicate armory: melee, sidearms & heavy firepower" },
  { id: "melee", name: "Melee & Blades", icon: "Sword", desc: "Cutlasses, iron chains, cleavers and machetes" },
  { id: "secondary", name: "Pistols & Sidearms", icon: "Target", desc: "Concealed 9mm pistols, revolvers, tasers and desert hawks" },
  { id: "primary", name: "Assault & Shotguns", icon: "Crosshair", desc: "Pump shotguns, compact SMGs, hunting rifles & heavy LMGs" },
];

export const BOUTIQUE_SUBCATEGORIES: BoutiqueSubcategory[] = [
  { id: "all", name: "All Wares", icon: "Sparkles", desc: "Complete haute couture and syndicate luxury collection" },
  { id: "tailoring", name: "Suits & Tailoring", icon: "Scissors", desc: "Bespoke suits, agbadas, tuxedos and senator fits" },
  { id: "streetwear", name: "Streetwear & Fits", icon: "Shirt", desc: "Urban drill tracksuits, luxury hoodies and graphic tees" },
  { id: "jewelry", name: "Gold & Watches", icon: "Watch", desc: "Cuban link chains, presidential watches & pendants" },
  { id: "footwear", name: "Designer Kicks", icon: "Footprints", desc: "Handcrafted loafers, tactical boots & slides" },
  { id: "headwear", name: "Hats & Shades", icon: "HardHat", desc: "Crown snapbacks, silk wave durags & gold aviators" },
  { id: "tactical", name: "Concealed Armor", icon: "Shield", desc: "Discreet ballistic vests, Kevlar linings & combat slacks" },
  { id: "regalia", name: "Royal Regalia", icon: "Crown", desc: "Ceremonial Kente, northern smocks & chieftain sashes" },
  { id: "accessories", name: "Executive Luxury", icon: "Briefcase", desc: "Nile croc leather briefcases, Oud colognes & gold clips" },
];

export const BOUTIQUE_CATALOG: BoutiqueCatalogItem[] = [
  // Tailoring
  { id: "b_agbada_gold", name: "Royal Gold Agbada", subcategory: "tailoring", slot: "top", model: "top", style: "jacket", pattern: "kente", rarity: "legendary", price: 6500, desc: "Hand-embroidered gold damask agbada worn by top-tier Accra power brokers.", color: "#d4af37", stat: "brains", mod: 3, tier2_chance: 0.8 },
  { id: "b_senator_navy", name: "Senator Navy Fit", subcategory: "tailoring", slot: "top", model: "top", style: "tee", pattern: "plain", rarity: "rare", price: 2800, desc: "Tailored deep navy senator kaftan fit with silver collar trim.", color: "#1e3a8a", stat: "brains", mod: 2, tier2_chance: 0.65 },
  { id: "b_kente_tux", name: "Kente Silk Tuxedo", subcategory: "tailoring", slot: "top", model: "top", style: "jacket", pattern: "kente", rarity: "legendary", price: 12000, desc: "Peak lapel black tuxedo woven with authentic Bonwire silk kente ribbons.", color: "#000000", stat: "brains", mod: 4, tier2_chance: 0.9 },
  { id: "b_velvet_blazer", name: "Crimson Velvet Blazer", subcategory: "tailoring", slot: "top", model: "top", style: "jacket", pattern: "plain", rarity: "rare", price: 4200, desc: "Rich burgundy velvet evening blazer favored in Osu VIP lounges.", color: "#831843", stat: "stealth", mod: 2, tier2_chance: 0.65 },
  { id: "b_boss_trouser", name: "Pleated Silk Trousers", subcategory: "tailoring", slot: "bottom", model: "bottom", style: "pants", pattern: "plain", rarity: "rare", price: 2200, desc: "Creased midnight wool-silk slacks that command instant boardroom respect.", color: "#0f172a", stat: "brains", mod: 1, tier2_chance: 0.6 },

  // Streetwear
  { id: "b_drill_hoodie", name: "Accra Midnight Hoodie", subcategory: "streetwear", slot: "top", model: "top", style: "hoodie", pattern: "camo", rarity: "rare", price: 1400, desc: "Heavyweight 500GSM black hoodie engineered for shadowy alley runs.", color: "#18181b", stat: "stealth", mod: 2, tier2_chance: 0.7 },
  { id: "b_blackstars_track", name: "Black Stars Gold Tracksuit", subcategory: "streetwear", slot: "top", model: "top", style: "tee", pattern: "stripes", rarity: "rare", price: 1800, desc: "Limited national team tribute tracksuit lined with liquid gold stripes.", color: "#b91c1c", stat: "wheels", mod: 2, tier2_chance: 0.65 },
  { id: "b_camo_cargo", name: "Zongo Utility Cargo", subcategory: "streetwear", slot: "bottom", model: "bottom", style: "cargo_shorts", pattern: "camo", rarity: "common", price: 950, desc: "Multi-pocket cargo pants with reinforced knees for fast escapes.", color: "#3f4a3c", stat: "muscle", mod: 1, tier2_chance: 0.5 },
  { id: "b_oversized_graphic", name: "Adinkra Street Graphic Tee", subcategory: "streetwear", slot: "top", model: "top", style: "tee", pattern: "plain", graphic: "skull", rarity: "common", price: 800, desc: "Boxy luxury tee featuring screen-printed Gye Nyame street art.", color: "#27272a", stat: "wheels", mod: 1, tier2_chance: 0.5 },
  { id: "b_leather_biker", name: "Onyx Biker Jacket", subcategory: "streetwear", slot: "top", model: "top", style: "jacket", pattern: "plain", rarity: "legendary", price: 5500, desc: "Full-grain calfskin leather jacket with asymmetrical gold zips.", color: "#09090b", stat: "muscle", mod: 2, power: 8, tier2_chance: 0.75 },

  // Jewelry & Watches
  { id: "b_cuban_chain", name: "Solid Gold Cuban Link", subcategory: "jewelry", slot: "top", model: "top", style: "open_shirt", pattern: "plain", rarity: "legendary", price: 8500, desc: "18-karat solid yellow gold 15mm Miami Cuban link chain.", color: "#ffd700", stat: "muscle", mod: 2, tier2_chance: 0.85 },
  { id: "b_diamond_chrono", name: "Presidential Gold Chrono", subcategory: "jewelry", slot: "hat", model: "cap", rarity: "legendary", price: 14000, desc: "Swiss automatic chronometer cased in 18k gold with diamond indices.", color: "#fbbf24", stat: "brains", mod: 3, tier2_chance: 0.9 },
  { id: "b_ashanti_pendant", name: "Ashanti Lion Gold Pendant", subcategory: "jewelry", slot: "top", model: "top", style: "tee", pattern: "plain", rarity: "rare", price: 6200, desc: "Heirloom gold lion pendant symbolizing the fearless warrior spirit.", color: "#d97706", stat: "brains", mod: 2, tier2_chance: 0.7 },
  { id: "b_signet_ring", name: "Black Obsidian Signet", subcategory: "jewelry", slot: "bottom", model: "bottom", style: "pants", rarity: "rare", price: 3400, desc: "Hand-carved volcanic obsidian ring engraved with syndicate crest.", color: "#18181b", stat: "stealth", mod: 1, tier2_chance: 0.65 },

  // Footwear
  { id: "b_italian_loafers", name: "Custom Python Loafers", subcategory: "footwear", slot: "shoes", model: "shoes", rarity: "rare", price: 3800, desc: "Hand-welted Italian leather loafers with genuine python vamp.", color: "#78350f", stat: "brains", mod: 2, tier2_chance: 0.65 },
  { id: "b_desert_boots", name: "Kejetia Combat Boots", subcategory: "footwear", slot: "shoes", model: "shoes", rarity: "common", price: 1600, desc: "Rugged desert nubuck boots built to outrun any tactical raid team.", color: "#a16207", stat: "muscle", mod: 1, tier2_chance: 0.5 },
  { id: "b_gold_kicks", name: "Air Kingpin Gold High-Tops", subcategory: "footwear", slot: "shoes", model: "shoes", rarity: "legendary", price: 7500, desc: "Limited edition metallic gold high-top sneakers with icy soles.", color: "#ffd700", stat: "wheels", mod: 3, tier2_chance: 0.8 },
  { id: "b_platinum_slides", name: "Chale Platinum Slides", subcategory: "footwear", slot: "shoes", model: "shoes", rarity: "common", price: 900, desc: "Heavy comfort molded foam slides with chrome strap badges.", color: "#e2e8f0", stat: "wheels", mod: 1, tier2_chance: 0.5 },

  // Headwear & Shades
  { id: "b_aviator_gold", name: "24K Gold Aviator Shades", subcategory: "headwear", slot: "hat", model: "cap", rarity: "rare", price: 2400, desc: "Double-bridge titanium aviator sunglasses dipped in 24k gold.", color: "#eab308", stat: "brains", mod: 1, tier2_chance: 0.65 },
  { id: "b_silk_durag", name: "Purple Silk Crown Durag", subcategory: "headwear", slot: "hat", model: "beanie", rarity: "common", price: 1200, desc: "High-grade mulberry silk durag that keeps wave patterns razor-sharp.", color: "#7e22ce", stat: "stealth", mod: 1, tier2_chance: 0.5 },
  { id: "b_kufi_handwoven", name: "Royal Handwoven Kufi", subcategory: "headwear", slot: "hat", model: "kufi", rarity: "rare", price: 1900, desc: "Intricately embroidered Islamic royal kufi cap from northern masters.", color: "#15803d", stat: "brains", mod: 2, tier2_chance: 0.65 },
  { id: "b_snapback_crown", name: "Underworld Crown Snapback", subcategory: "headwear", slot: "hat", model: "cap", rarity: "common", price: 850, desc: "Structured wool snapback featuring 3D embroidered golden crowns.", color: "#111827", stat: "muscle", mod: 1, tier2_chance: 0.5 },

  // Tactical Concealed Armor
  { id: "b_ballistic_vest", name: "Concealed Micro-Kevlar Vest", subcategory: "tactical", slot: "top", model: "top", style: "tee", pattern: "plain", rarity: "legendary", price: 7800, desc: "Ultra-thin Level IIIA ballistic vest worn invisibly under clothing.", color: "#374151", stat: "muscle", mod: 3, power: 14, tier2_chance: 0.85 },
  { id: "b_tactical_trench", name: "Armored Carbon Trenchcoat", subcategory: "tactical", slot: "top", model: "top", style: "jacket", pattern: "plain", rarity: "legendary", price: 9500, desc: "Waterproof storm trench reinforced with woven carbon-fiber panels.", color: "#1e293b", stat: "stealth", mod: 3, power: 16, tier2_chance: 0.85 },
  { id: "b_carbon_pants", name: "Reinforced Tactical Slacks", subcategory: "tactical", slot: "bottom", model: "bottom", style: "pants", pattern: "plain", rarity: "rare", price: 3200, desc: "Ripstop aramid slacks resistant to shrapnel, blade cuts, and scuffs.", color: "#1f2937", stat: "muscle", mod: 2, tier2_chance: 0.65 },

  // Royal Regalia
  { id: "b_fugu_emperor", name: "Dagbon Emperor Smock Fugu", subcategory: "regalia", slot: "top", model: "top", style: "tee", pattern: "stripes", rarity: "legendary", price: 11000, desc: "Heavy hand-spun northern fugu smock worn by revered Chieftains.", color: "#1e3a8a", stat: "muscle", mod: 3, power: 10, tier2_chance: 0.85 },
  { id: "b_kente_master", name: "Master Chief Ceremonial Kente", subcategory: "regalia", slot: "top", model: "top", style: "jacket", pattern: "kente", rarity: "legendary", price: 18000, desc: "Full ceremonial over-shoulder kente toga of kings, woven with gold threads.", color: "#d97706", stat: "brains", mod: 4, tier2_chance: 0.95 },
  { id: "b_royal_sash", name: "Golden Stool Adinkra Sash", subcategory: "regalia", slot: "bottom", model: "bottom", style: "pants", pattern: "kente", rarity: "legendary", price: 8200, desc: "Sacred velvet sash embroidered with traditional sovereign Adinkra symbols.", color: "#065f46", stat: "brains", mod: 3, tier2_chance: 0.8 },

  // Executive Luxuries & Accessories
  { id: "b_oud_cologne", name: "Oud Royal Extract Flacon", subcategory: "accessories", slot: "hat", model: "beanie", rarity: "rare", price: 4500, desc: "Aged Cambodian agarwood and amber oil that lingers in negotiation rooms.", color: "#451a03", stat: "brains", mod: 2, tier2_chance: 0.7 },
  { id: "b_croc_briefcase", name: "Nile Crocodile Briefcase", subcategory: "accessories", slot: "bottom", model: "bottom", style: "pants", rarity: "rare", price: 6800, desc: "Dual brass combination-locked briefcase that holds GH₵2,000,000 clean.", color: "#292524", stat: "brains", mod: 2, tier2_chance: 0.7 },
  { id: "b_gold_zippo", name: "Engraved Gold Lighter", subcategory: "accessories", slot: "top", model: "top", style: "tee", pattern: "plain", rarity: "rare", price: 2100, desc: "Heavy gold-plated windproof lighter with syndicate seal engraved.", color: "#ca8a04", stat: "stealth", mod: 1, tier2_chance: 0.65 },
];

export const ALL_GEAR_ITEMS: GearItem[] = [
  ...GEAR,
  ...BOUTIQUE_CATALOG.map((b) => ({
    id: b.id,
    name: b.name,
    slot: b.slot,
    model: b.model,
    rarity: b.rarity,
    price: b.price,
    color: b.color,
    style: b.style,
    pattern: b.pattern,
    graphic: b.graphic,
    stat: b.stat,
    mod: b.mod,
    power: b.power,
    unlock: b.unlock || 1,
    subcategory: b.subcategory,
  })),
];

export const GEAR_MAP = Object.fromEntries(ALL_GEAR_ITEMS.map((g) => [g.id, g]));

export const STRAINS: FarmStrain[] = [
  { id: "wee", name: "Kumasi Wee", desc: "Classic street green. Quick and cheap.", unlock: 1, seed: 40, grow: 600, yield: [6, 10], price: 25, heat: 1, color: "#4ade80" },
  { id: "kush", name: "Osu Kush", desc: "Premium buds the Osu Strip pays for.", unlock: 1, seed: 250, grow: 1800, yield: [5, 9], price: 180, heat: 2, color: "#a3e635" },
  { id: "miraa", name: "Zongo Miraa", desc: "Chewing leaves for the night-shift crowd.", unlock: 1, seed: 900, grow: 3600, yield: [5, 8], price: 520, heat: 3, color: "#65a30d" },
  { id: "shrooms", name: "Forest Shrooms", desc: "Magic caps from the Ashanti bush.", unlock: 1, seed: 2500, grow: 7200, yield: [4, 8], price: 1500, heat: 3, color: "#f59e0b" },
  { id: "lotus", name: "Blue Lotus", desc: "Rare flowers the Hills Estate parties want.", unlock: 1, seed: 6000, grow: 10800, yield: [4, 7], price: 3400, heat: 4, color: "#60a5fa" },
  { id: "poppy", name: "Red Poppy", desc: "Big money, big attention.", unlock: 1, seed: 15000, grow: 14400, yield: [3, 6], price: 9500, heat: 6, color: "#ef4444" },
  { id: "coca", name: "Hills Coca Leaf", desc: "Top shelf. The cartel connect only buys the best.", unlock: 1, seed: 40000, grow: 21600, yield: [3, 6], price: 26000, heat: 8, color: "#16a34a" },
];

export const STRAIN_MAP = Object.fromEntries(STRAINS.map((s) => [s.id, s]));

export const FARM = {
  plot_cost: 300,
  plot_growth: 2.4,
  max_plots: 24,
  upgrades: {
    lights: { name: "Grow Lights", desc: "-10% grow time per level", cost: 800, max: 99 },
    irrigation: { name: "Drip Irrigation", desc: "+15% harvest per level", cost: 1200, max: 99 },
    greenhouse: { name: "Hidden Greenhouse", desc: "-20% heat when you sell, per level", cost: 1500, max: 99 },
  },
};

export const DEFAULT_AVATAR = {
  gender: "male",
  skin: "#5a3825",
  hair: "fade",
  hair_color: "#111111",
  build: "regular",
  height: "average",
  face: "oval",
  nose: "broad",
  brows: "thick",
  ears: "normal",
  marks: "none",
  glasses: "none",
  beard: "none",
};

export const AVATAR_OPTIONS = {
  gender: ["male", "female"],
  skin: ["#3b2219", "#5a3825", "#7a4b2f", "#9a6440", "#c18a5e"],
  hair: ["bald", "fade", "spiky", "afro", "dreads", "braids", "cornrows", "long", "ponytail"],
  hair_color: ["#111111", "#2b1a10", "#5a3a1a", "#d4af37", "#b22222"],
  build: ["skinny", "slim", "regular", "muscular", "brute", "heavy", "belly", "chubby", "curvy"],
  height: ["tiny", "short", "average", "tall", "towering"],
  face: ["oval", "long", "round", "square", "heavy_jaw", "narrow"],
  nose: ["button", "broad", "hook", "big", "pointy"],
  brows: ["thin", "thick", "bushy", "unibrow"],
  ears: ["small", "normal", "big"],
  marks: ["none", "scar", "mole", "wrinkles", "freckles", "warpaint"],
  glasses: ["none", "square", "round", "shades"],
  beard: ["none", "stubble", "goatee", "moustache", "full"],
};

export const CONTRACT_TYPES = [
  { type: "collect", label: "Collect GH₵{t} dirty cash" },
  { type: "launder", label: "Finish {t} laundering batches" },
  { type: "heist", label: "Complete {t} heist" },
  { type: "tap", label: "Tap the hustle {t} times" },
  { type: "hit", label: "Hit a rival syndicate {t} time" },
  { type: "upgrade", label: "Buy {t} hustle or front upgrades" },
];

export const FALLBACK_TAUNTS = [
  "Chale, you think you fit us? We dey come for your corner.",
  "Your boys dey sleep. Tonight we go wake them up.",
  "Small boy with big mouth. We go collect your cedis small small.",
  "Wahala dey your side. Keep your gate locked, oo.",
  "Ei! You dey disturb our hustle? We no dey forget.",
  "Tell your crew say the street no be your papa house.",
];

export const FALLBACK_NEWS = [
  "Wahala for Zongo Lanes as two crews clash over fuel route",
  "Chale, police dey come! Task Force spotted near Market Circle",
  "Osu Strip club owners deny any link to 'dirty cedis'",
  "Dockside canoes carry more than fish, says street source",
  "Central Bank warns about rapid rise of counterfeit Cedis in Accra",
  "Makola Market traders report smooth business despite gang tensions",
];

export const PRODUCTS = {
  street_pass: { name: "Street Pass (Season)", price: 25, desc: "Unlocks the paid reward track this season" },
  timeskip_pack: { name: "Time Skip x3", price: 5, desc: "Each skip pushes laundering and heists 1 hour ahead" },
  lawyer: { name: "Lawyer Shield", price: 8, desc: "Drops Heat 20 and blocks raids 4h. Max 2 per week" },
  build_slot: { name: "Extra Build Slot", price: 15, desc: "+1 laundering batch at the same time (max 3)" },
  car_v8: { name: "Gold-Trim V8 (cosmetic)", price: 12, desc: "Looks only, no stats" },
  drip_gold: { name: "Gold Chain Drip (cosmetic)", price: 10, desc: "Looks only, no stats" },
  decor_stool: { name: "Golden Stool Replica (cosmetic)", price: 10, desc: "Looks only, no stats" },
  drip_crate: { name: "Drip Crate (cosmetic)", price: 6, desc: "One random cosmetic. Exact odds shown", odds: { common: 0.6, rare: 0.3, legendary: 0.1 } },
};

export const PASS_TIERS = 30;
export const PASS_XP_PER_TIER = 100;
export const SELL_RATE = 0.5;
export const WEAPON_MAX_LVL = 99;
export const CREW_STAT_MAX = 99;
