import {
  DISTRICTS,
  HUSTLES,
  HUSTLE_MAP,
  FRONTS,
  FRONT_MAP,
  HEAT_TIERS,
  ROLES,
  ARCHETYPES,
  ROLE_ARCH,
  STRENGTHS,
  FLAWS,
  FIRST_NAMES,
  FEMALE_NAMES,
  NICKNAMES,
  HEISTS,
  HEIST_MAP,
  HEIST_APPROACHES,
  HEIST_PREP,
  RIVALS,
  RIVAL_MAP,
  UPGRADES,
  BLACK_MARKET,
  BM_MAP,
  COSMETICS,
  COSMETIC_MAP,
  GEAR,
  GEAR_MAP,
  STRAINS,
  STRAIN_MAP,
  FARM,
  DEFAULT_AVATAR,
  AVATAR_OPTIONS,
  CONTRACT_TYPES,
  FALLBACK_TAUNTS,
  FALLBACK_NEWS,
  PASS_TIERS,
  PASS_XP_PER_TIER,
  SELL_RATE,
  WEAPON_MAX_LVL,
  CREW_STAT_MAX,
  CREW_FRONT_TRAITS,
  MANSION_FACILITIES,
  BOSS_PERKS,
  HEIST_EVENTS,
  HEIST_EVENT_MAP,
  TIER2_CATEGORIES,
  TIER2_LIST,
  BOUTIQUE_SUBCATEGORIES,
  BOUTIQUE_CATALOG,
  ALL_GEAR_ITEMS,
  CREW_BACKGROUNDS,
  CREW_BACKGROUND_MAP,
  DAILY_HEIST_BASE_LIMIT,
  Rival,
  ASSASSIN_CONTACT,
  DAILY_HUSTLE_CAP,
  GUN_SHOP_SUBCATEGORIES,
} from "../data/gameData";

const H = 3600;

export interface CrewMember {
  id: string;
  name: string;
  arch: string;
  stats: Record<string, number>;
  strength: string;
  flaw: string;
  front_trait: string;
  morale: number; // 0 to 100
  xp: number;
  lvl: number;
  assign: string | null;
  look: any;
  loadout: Record<string, string>;
  origin?: string;
  bio?: string;
  temperament?: string;
  specialty_biz?: string;
  trait_reason?: string;
  merc?: boolean;
  merc_until?: number;
  price?: number;
  clean_price?: number;
  elite?: boolean;
  daily_rate?: number;
  last_wage_day?: string;
  initial_gear?: Array<{ uid: string; id: string; slot: string; source: string; lvl?: number }>;
}

export interface Player {
  user_id: string;
  name: string;
  district: string;
  created: number;
  last_seen: number;
  version: number;
  age_confirmed: boolean;
  is_bot: boolean;
  dirty: string;
  clean: string;
  lifetime: string;
  xp: number;
  level: number;
  heat: number;
  heat_ts: number;
  arrested_until: number;
  lie_low_until: number;
  shield_until: number;
  newbie_until: number;
  hustles: Record<string, { lvl: number; ts: number }>;
  fronts: Record<string, number>;
  batches: Array<{
    id: string;
    front: string;
    dirty: number;
    clean: number;
    amount?: number;
    out?: number;
    start?: number;
    end: number;
  }>;
  build_slots: number;
  crew: CrewMember[];
  heists: Array<{
    id: string;
    tpl: string;
    sel: Record<string, string>;
    start?: number;
    end: number;
    pct: number;
    reward: number;
    heat: number;
    approach: string;
    events?: Array<{
      uid: string;
      event_id: string;
      trigger_at: number;
      expires_at: number;
      resolved: boolean;
      choice?: string;
      outcome?: string;
      chance_delta?: number;
      heat_delta?: number;
      penalty_applied?: boolean;
    }>;
  }>;
  upgrades: Record<string, number>;
  inv: Record<string, number>;
  cosmetics: string[];
  equipped: { drip: string | null; car: string | null; decor: string | null };
  raid: {
    rival: string;
    start: number;
    resolve_at: number;
    attack: number;
    fortify: number;
    taunt: string;
  } | null;
  raid_log: Array<{
    t: number;
    rival: string;
    defence: number;
    attack: number;
    won: boolean;
    amount: string;
    pct?: number;
    drop?: string | null;
  }>;
  grudges: Record<string, number>;
  rival_cd: Record<string, number>;
  store: { slot: number; offset: number; bought: string[]; agency?: CrewMember[] };
  ads: { day: string; double: boolean; restock: boolean };
  daily: {
    day: string;
    contracts: Array<{
      idx: number;
      type: string;
      label: string;
      target: number;
      progress: number;
      claimed: boolean;
      reward_clean: number;
      reward_pass: number;
    }>;
    login_claimed: boolean;
  };
  streak: { count: number; last_day: string; grace_used: boolean };
  prestige: { count: number; respect: number };
  pass: { season: string; xp: number; premium: boolean; free: number[]; prem: number[] };
  season: { id: string; points: number };
  lawyer_week: { week: string; count: number };
  tap_ts: number;
  pvp_cd: number;
  ledger_done: string[];
  offline_bonus: { amount: string; until: number; away: number } | null;
  flags: number;
  log: Array<{ t: number; msg: string; kind: "info" | "good" | "bad" }>;
  nw_score: number;
  power: number;
  avatar: any;
  loadout: Record<string, string>;
  gear: Array<{ uid: string; id: string; source: string; lvl?: number; tier2?: string | null }>;
  reward_cosmetics: string[];
  farm: {
    plots: Array<{ idx: number; strain: string | null; planted: number; end: number; yield: number; start?: number }>;
    stash: Record<string, number>;
    up: Record<string, number>;
  };
  last_heist_day: string;
  facilities: Record<string, number>;
  boss_perks: Record<string, number>;
  skill_points: number;
  front_assign: Record<string, string>;
  hustle_assign?: Record<string, string>;
  hustle_daily?: Record<string, { day: string; amount: number }>;
  heist_day?: { day: string; count: number; ad_extra: number };
  rentals?: Array<{
    id: string;
    crew_id: string;
    crew_name: string;
    arch: string;
    lvl: number;
    price: number;
    hours: number;
    start: number;
    end: number;
    status: "open" | "rented";
  }>;
  assassin_hits?: Record<string, {
    contract_type: string;
    power_cut: number;
    until: number;
  }>;
  last_wage_day?: string;
}

export const uid = () =>
  (typeof window !== "undefined" && window.crypto?.randomUUID
    ? window.crypto.randomUUID()
    : `${Date.now()}${Math.random()}`
  ).replace(/[^a-z0-9]/gi, "").slice(0, 10);

const dayKey = (t: number) => new Date(t * 1000).toISOString().slice(0, 10);
const weekKey = (t: number) => {
  const d = new Date(t * 1000);
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
};
const seasonKey = (t: number) => new Date(t * 1000).toISOString().slice(0, 7);

export function randomLook(seedStr?: string) {
  const hash = (seedStr || uid()).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pick = (arr: any[], offset = 0) => arr[(hash + offset) % arr.length];
  const gender = pick(AVATAR_OPTIONS.gender, 1);
  return {
    gender,
    skin: pick(AVATAR_OPTIONS.skin, 2),
    hair: pick(AVATAR_OPTIONS.hair, 3),
    hair_color: pick(AVATAR_OPTIONS.hair_color, 4),
    build: pick(AVATAR_OPTIONS.build, 5),
    height: pick(AVATAR_OPTIONS.height, 6),
    face: pick(AVATAR_OPTIONS.face, 7),
    nose: pick(AVATAR_OPTIONS.nose, 8),
    brows: pick(AVATAR_OPTIONS.brows, 9),
    ears: pick(AVATAR_OPTIONS.ears, 10),
    marks: pick(AVATAR_OPTIONS.marks, 11),
    glasses: pick(AVATAR_OPTIONS.glasses, 12),
    beard: gender === "female" ? "none" : pick(AVATAR_OPTIONS.beard, 13),
  };
}

export function calcCrewDailyRate(c: {
  lvl: number;
  xp?: number;
  front_trait?: string;
  strength?: string;
  arch?: string;
}): number {
  const lvl = Math.max(1, c.lvl || 1);
  // Base daily rate: Level 1 starts at ~100-120/day, scaling up with level
  let rate = 100 + (lvl - 1) * 55;

  // XP progression adds up to +120
  if (c.xp) {
    rate += Math.min(120, Math.floor(Math.sqrt(c.xp) * 6));
  }

  // Trait compensation: high-stake commercial & combat specialists command higher daily rates
  const highTierTraits = ["bookkeeper", "customs_insider", "circle_hacker", "high_society", "iron_guard", "fleet_captain", "fuel_siphoner"];
  const midTierTraits = ["chop_master", "cleaner", "smooth_talker", "grease_monkey", "loan_shark", "night_owl", "hustle_plug"];
  if (c.front_trait) {
    if (highTierTraits.includes(c.front_trait)) {
      rate += 110;
    } else if (midTierTraits.includes(c.front_trait)) {
      rate += 60;
    } else {
      rate += 40;
    }
  }

  if (c.strength && c.strength !== "none") {
    rate += 30;
  }

  // Clamped strictly to average between 100 and 800 a day
  return Math.max(100, Math.min(800, Math.round(rate)));
}

export function generateRandomCrewLoadout(lvl = 1): {
  loadout: Record<string, string>;
  initial_gear: Array<{ uid: string; id: string; slot: string; source: string; lvl?: number }>;
} {
  const possibleSlots: Array<"melee" | "primary" | "secondary" | "hat" | "top" | "bottom" | "shoes"> = [
    "melee", "primary", "secondary", "hat", "top", "bottom", "shoes"
  ];
  // Recruited crew randomly have 1 to 4 slots filled with pre-equipped items
  const numSlots = Math.floor(Math.random() * 4) + 1;
  const shuffledSlots = [...possibleSlots].sort(() => Math.random() - 0.5).slice(0, numSlots);

  const loadout: Record<string, string> = {};
  const initial_gear: Array<{ uid: string; id: string; slot: string; source: string; lvl?: number }> = [];

  shuffledSlots.forEach((slot) => {
    const matchingItems = GEAR.filter((g) => g.slot === slot && (g.unlock || 1) <= lvl + 2);
    const pool = matchingItems.length > 0 ? matchingItems : GEAR.filter((g) => g.slot === slot);
    if (pool.length > 0) {
      const picked = pool[Math.floor(Math.random() * pool.length)];
      const itemUid = uid();
      loadout[slot] = itemUid;
      initial_gear.push({
        uid: itemUid,
        id: picked.id,
        slot,
        source: "crew_recruit",
        lvl: 0,
      });
    }
  });

  return { loadout, initial_gear };
}

export function genCrew(arch?: string, level = 1, giveGear = true): CrewMember {
  const archKeys = Object.keys(ARCHETYPES);
  const pickedArch = arch || archKeys[Math.floor(Math.random() * archKeys.length)];
  const stats: Record<string, number> = {
    brains: Math.floor(Math.random() * 5) + 2,
    wheels: Math.floor(Math.random() * 5) + 2,
    muscle: Math.floor(Math.random() * 5) + 2,
    stealth: Math.floor(Math.random() * 5) + 2,
  };
  const primaryStat = ARCHETYPES[pickedArch];
  stats[primaryStat] = Math.floor(Math.random() * 5) + 6;
  const strength = STRENGTHS[Math.floor(Math.random() * STRENGTHS.length)].id;
  const flaw = FLAWS[Math.floor(Math.random() * FLAWS.length)].id;
  const matchingBgs = CREW_BACKGROUNDS.filter((b) => b.arch === pickedArch);
  const bg = matchingBgs.length > 0
    ? matchingBgs[Math.floor(Math.random() * matchingBgs.length)]
    : CREW_BACKGROUNDS[Math.floor(Math.random() * CREW_BACKGROUNDS.length)];
  const look = randomLook();
  const first = look.gender === "female"
    ? FEMALE_NAMES[Math.floor(Math.random() * FEMALE_NAMES.length)]
    : FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const nick = NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)];

  const member: CrewMember = {
    id: uid(),
    name: `${first} '${nick}'`,
    arch: pickedArch,
    stats,
    strength,
    flaw,
    front_trait: bg.trait,
    origin: bg.origin,
    bio: bg.bio,
    temperament: bg.temperament,
    specialty_biz: bg.specialty_biz,
    trait_reason: bg.trait_reason,
    morale: 85,
    xp: 0,
    lvl: level,
    assign: null,
    look,
    loadout: {},
    daily_rate: 100,
  };
  member.daily_rate = calcCrewDailyRate(member);

  if (giveGear) {
    const { loadout, initial_gear } = generateRandomCrewLoadout(level);
    member.loadout = loadout;
    member.initial_gear = initial_gear;
  }

  return member;
}

export function grantGear(p: Player, id: string, source = "shop", tier2?: string | null): { uid: string; id: string; lvl: number; tier2?: string | null } {
  const g: any = { uid: uid(), id, source, lvl: 0 };
  if (tier2) g.tier2 = tier2;
  p.gear.push(g);
  return g;
}

export function createPlayer(
  userId = "boss_offline_1",
  name = "Kofi Bullet",
  district = "dockside",
  preset: "newbie" | "mid" | "kingpin" = "newbie"
): Player {
  const now = Date.now() / 1000;
  const p: Player = {
    user_id: userId,
    name: name.slice(0, 24),
    district,
    created: now,
    last_seen: now,
    version: 1,
    age_confirmed: true,
    is_bot: false,
    dirty: preset === "kingpin" ? "250000" : preset === "mid" ? "4500" : "20",
    clean: preset === "kingpin" ? "80000" : preset === "mid" ? "1200" : "0",
    lifetime: preset === "kingpin" ? "750000" : preset === "mid" ? "15000" : "20",
    assassin_hits: {},
    xp: 0,
    level: preset === "kingpin" ? 25 : preset === "mid" ? 12 : 1,
    heat: 0,
    heat_ts: now,
    arrested_until: 0,
    lie_low_until: 0,
    shield_until: 0,
    newbie_until: now + 72 * H,
    hustles: {
      okada: { lvl: preset === "kingpin" ? 25 : preset === "mid" ? 10 : 1, ts: now },
      ...(preset !== "newbie" ? { phones: { lvl: preset === "kingpin" ? 20 : 8, ts: now } } : {}),
      ...(preset !== "newbie" ? { jerseys: { lvl: preset === "kingpin" ? 15 : 5, ts: now } } : {}),
      ...(preset === "kingpin" ? { fuel: { lvl: 12, ts: now }, container: { lvl: 8, ts: now } } : {}),
    },
    fronts: {
      ...(preset !== "newbie" ? { chopbar: preset === "kingpin" ? 8 : 4 } : {}),
      ...(preset !== "newbie" ? { spare: preset === "kingpin" ? 6 : 2 } : {}),
      ...(preset === "kingpin" ? { momo: 5, trotro: 3 } : {}),
    },
    batches: [],
    build_slots: preset === "kingpin" ? 2 : preset === "mid" ? 1 : 0,
    crew: [
      genCrew("driver", preset === "kingpin" ? 10 : preset === "mid" ? 5 : 1),
      genCrew("enforcer", preset === "kingpin" ? 10 : preset === "mid" ? 5 : 1),
      ...(preset !== "newbie"
        ? [
            genCrew("hacker", preset === "kingpin" ? 9 : 4),
            genCrew("infiltrator", preset === "kingpin" ? 9 : 4),
          ]
        : []),
      ...(preset === "kingpin"
        ? [genCrew("enforcer", 8), genCrew("driver", 8), genCrew("hacker", 7), genCrew("infiltrator", 7)]
        : []),
    ],
    heists: [],
    upgrades: {
      vault: preset === "kingpin" ? 6 : preset === "mid" ? 2 : 0,
      walls: preset === "kingpin" ? 8 : preset === "mid" ? 3 : 0,
      safehouse: preset === "kingpin" ? 1 : 0,
      studio: preset === "kingpin" ? 5 : preset === "mid" ? 2 : 0,
      okada: preset === "kingpin" ? 4 : preset === "mid" ? 1 : 0,
      trotro: preset === "kingpin" ? 5 : preset === "mid" ? 2 : 0,
      quarters: preset === "kingpin" ? 4 : preset === "mid" ? 1 : 0,
      cruiser: preset === "kingpin" ? 5 : preset === "mid" ? 1 : 0,
    },
    inv: {
      burner: preset === "kingpin" ? 5 : 2,
      timeskip: preset === "kingpin" ? 8 : 3,
      lawyer: preset === "kingpin" ? 2 : 1,
      envelope: preset === "kingpin" ? 3 : 0,
      vest: preset === "kingpin" ? 4 : 0,
      cctv: preset === "kingpin" ? 2 : 0,
      spikes: preset === "kingpin" ? 3 : 0,
      dog: preset === "kingpin" ? 1 : 0,
      energy: preset === "kingpin" ? 5 : 1,
      feast: preset === "kingpin" ? 3 : 0,
      donation: preset === "kingpin" ? 2 : 0,
      radio: 0,
      goggles: 0,
      scanner: 0,
      blueprints: 0,
      lockpick: 0,
      plates: 0,
      okada_key: 0,
      receipt: 0,
    },
    cosmetics: preset === "kingpin" ? ["drip_kente", "car_benz", "decor_art"] : [],
    equipped: {
      drip: preset === "kingpin" ? "drip_kente" : null,
      car: preset === "kingpin" ? "car_benz" : null,
      decor: preset === "kingpin" ? "decor_art" : null,
    },
    raid: null,
    raid_log: [],
    grudges: Object.fromEntries(RIVALS.map((r) => [r.id, 0])),
    rival_cd: {},
    store: { slot: 0, offset: 0, bought: [] },
    ads: { day: dayKey(now), double: false, restock: false },
    daily: {
      day: dayKey(now),
      contracts: generateDailyContracts(name, dayKey(now), preset === "kingpin" ? 25 : preset === "mid" ? 12 : 1),
      login_claimed: false,
    },
    streak: { count: preset === "kingpin" ? 14 : preset === "mid" ? 5 : 1, last_day: dayKey(now), grace_used: false },
    prestige: { count: preset === "kingpin" ? 2 : 0, respect: preset === "kingpin" ? 2 : 0 },
    pass: { season: seasonKey(now), xp: preset === "kingpin" ? 1400 : 150, premium: preset === "kingpin", free: [], prem: [] },
    season: { id: seasonKey(now), points: preset === "kingpin" ? 3500 : 400 },
    lawyer_week: { week: weekKey(now), count: 0 },
    tap_ts: now,
    pvp_cd: 0,
    ledger_done: [],
    offline_bonus: null,
    flags: 0,
    log: [
      { t: now, msg: `Welcome to the streets of Accra, Boss ${name}. Empire initialized!`, kind: "good" },
    ],
    nw_score: 50,
    power: 0,
    avatar: { ...DEFAULT_AVATAR },
    loadout: {},
    gear: [],
    reward_cosmetics: [],
    farm: {
      plots: [
        { idx: 0, strain: null, planted: 0, end: 0, yield: 0 },
        { idx: 1, strain: null, planted: 0, end: 0, yield: 0 },
        ...(preset === "kingpin"
          ? [
              { idx: 2, strain: null, planted: 0, end: 0, yield: 0 },
              { idx: 3, strain: null, planted: 0, end: 0, yield: 0 },
            ]
          : []),
      ],
      stash: {},
      up: { lights: preset === "kingpin" ? 2 : 0, irrigation: preset === "kingpin" ? 2 : 0, greenhouse: preset === "kingpin" ? 1 : 0 },
    },
    last_heist_day: "",
    heist_day: { day: dayKey(now), count: 0, ad_extra: 0 },
    facilities: {
      infirmary: preset === "kingpin" ? 3 : preset === "mid" ? 1 : 0,
      armoury: preset === "kingpin" ? 4 : preset === "mid" ? 1 : 0,
      radio_tower: preset === "kingpin" ? 2 : 0,
      barracks: preset === "kingpin" ? 3 : preset === "mid" ? 1 : 0,
      generator: preset === "kingpin" ? 2 : 0,
      vault: preset === "kingpin" ? 3 : preset === "mid" ? 1 : 0,
      walls: preset === "kingpin" ? 4 : preset === "mid" ? 1 : 0,
    },
    boss_perks: {
      negotiator: preset === "kingpin" ? 3 : 0,
      street_king: preset === "kingpin" ? 3 : 0,
      iron_jaw: preset === "kingpin" ? 2 : 0,
      ghost: preset === "kingpin" ? 2 : 0,
      commander: preset === "kingpin" ? 2 : 0,
    },
    skill_points: preset === "kingpin" ? 5 : preset === "mid" ? 2 : 0,
    front_assign: {},
    hustle_assign: {},
  };

  // Grant starting gear
  const cutlass = grantGear(p, "w_cutlass", "reward");
  const shirt = grantGear(p, "c_flower_shirt", "reward");
  const cargo = grantGear(p, "c_cargo", "reward");
  p.loadout.melee = cutlass.uid;
  p.loadout.top = shirt.uid;
  p.loadout.bottom = cargo.uid;

  if (preset === "kingpin") {
    const goldAr = grantGear(p, "w_gold_ar", "reward");
    const desertHawk = grantGear(p, "w_hawk", "reward");
    p.loadout.primary = goldAr.uid;
    p.loadout.secondary = desertHawk.uid;
  }

  // Register pre-equipped items on starting crew members into player inventory
  p.crew.forEach((c) => {
    if (c.initial_gear && c.initial_gear.length > 0) {
      c.initial_gear.forEach((ig) => {
        if (!p.gear.some((g) => g.uid === ig.uid)) {
          p.gear.push({
            uid: ig.uid,
            id: ig.id,
            source: "crew_recruit",
            lvl: ig.lvl || 0,
          });
        }
      });
    }
  });

  p.power = calcPower(p);
  return p;
}

export function generateDailyContracts(userId: string, day: string, level: number) {
  const hash = (userId + day).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...CONTRACT_TYPES].sort((a, b) => ((hash + a.type.length) % 7) - ((hash + b.type.length) % 7));
  const picks = shuffled.slice(0, 3);
  const targets: Record<string, number> = {
    collect: Math.max(15, 30 * level),
    launder: 2,
    heist: 1,
    tap: 40,
    hit: 1,
    upgrade: 1,
  };
  return picks.map((c, i) => {
    const t = targets[c.type] || 1;
    return {
      idx: i,
      type: c.type,
      label: c.label.replace("{t}", t.toLocaleString()),
      target: t,
      progress: 0,
      claimed: false,
      reward_clean: 5 * level + 15,
      reward_pass: 40,
    };
  });
}

export function mult(p: Player, now: number) {
  if (p.arrested_until && now < p.arrested_until) return 0;
  let m = 1 + (p.prestige?.respect || 0) * 0.1;
  m *= 1 + (p.upgrades?.studio || 0) * 0.05;
  if (p.lie_low_until > now) m *= 0.5;
  return m;
}

export function getHustleMarketRate(
  h: { id?: string; income: number; min_income?: number; max_income?: number },
  now = Date.now() / 1000
): number {
  const min = h.min_income ?? h.income;
  const max = h.max_income ?? Math.max(min, Math.round(min * 1.5));
  if (min === max) return min;

  // Real-world street rate fluctuation: cycles every 2 minutes with deterministic wave based on real numbers
  const cycle = Math.floor(now / 120);
  const idHash = (h.id || "okada").split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const wave = 0.5 + 0.5 * Math.sin((idHash * 11 + cycle * 7) * 0.45);
  const price = Math.round(min + (max - min) * wave);
  return Math.max(1, price);
}

export function hustleCost(
  h: { cost: number; id?: string },
  lvl: number,
  now = Date.now() / 1000
) {
  // Street hustles do not scale up exponentially; prices are randomized based on real market rates (+/- 6% variance based on 5-minute market shifts)
  const cycle = Math.floor(now / 300);
  const idSeed = (h.id || "okada").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const variance = 0.95 + 0.10 * Math.abs(Math.sin((idSeed * 13 + cycle * 5) * 1.618));
  // Flat real-world street price with very small linear maintenance (capped at +20%), no exponential explosion
  const base = Math.floor(h.cost * (1 + Math.min(10, lvl) * 0.04));
  return Math.max(1, Math.floor(base * variance));
}

export function hustleRate(
  h: { id?: string; income: number; min_income?: number; max_income?: number },
  lvl: number,
  p?: Player,
  now = Date.now() / 1000
) {
  // Street hustles DO NOT scale up: their income stays anchored to real randomized Ghana street numbers
  const realPrice = getHustleMarketRate(h, now);
  // Level only provides slight operational polish (+2% per lvl, capped at +20%), NOT exponential scaling
  let rate = Math.round(realPrice * (1 + Math.min(10, Math.max(0, lvl - 1)) * 0.02));
  rate = Math.max(1, rate);

  if (p && h.id) {
    const mgrId = p.hustle_assign?.[h.id];
    if (mgrId) {
      const mgr = p.crew.find((c) => c.id === mgrId);
      if (mgr) {
        let mult = 1.0;
        if (mgr.front_trait === "hustle_plug") mult += 0.35;
        if (mgr.front_trait === "customs_insider" && (h.id === "container" || h.id === "gold")) mult += 0.45;
        if (mgr.front_trait === "tech_whiz" && h.id === "phones") mult += 0.40;
        if (mgr.front_trait === "fleet_captain" && h.id === "okada") mult += 0.50;
        if (mgr.front_trait === "fuel_siphoner" && h.id === "fuel") mult += 0.50;
        if (mgr.front_trait === "loan_shark") mult += 0.35;
        if (mgr.front_trait === "grease_monkey" && h.id === "okada") mult += 0.30;
        if (mgr.specialty_biz === h.id) mult += 0.20; // Synergy
        const morale = mgr.morale !== undefined ? mgr.morale : 85;
        if (morale >= 80) mult += 0.10;
        else if (morale < 40) mult -= 0.20;
        rate = Math.floor(rate * mult);
      }
    }
    const anyPlug = Object.entries(p.hustle_assign || {}).some(([k, cid]) => {
      const cm = p.crew.find((c) => c.id === cid);
      return cm?.front_trait === "hustle_plug" && k !== h.id;
    });
    if (anyPlug) rate = Math.floor(rate * 1.15);
  }
  return Math.max(1, rate);
}

export function getHustleTodayEarned(p: Player, hid: string, now = Date.now() / 1000): number {
  const today = dayKey(now);
  if (p.hustle_daily?.[hid]?.day === today) {
    return p.hustle_daily[hid].amount;
  }
  return 0;
}

export function totalRate(p: Player, now: number) {
  if (p.arrested_until && now < p.arrested_until) return 0;
  let sum = 0;
  for (const [k, v] of Object.entries(p.hustles || {})) {
    const h = HUSTLE_MAP[k];
    if (h) {
      const todayEarned = getHustleTodayEarned(p, k, now);
      if (todayEarned < DAILY_HUSTLE_CAP) {
        sum += hustleRate(h, v.lvl, p, now);
      }
    }
  }
  return sum * mult(p, now);
}

export function offlineCap(p: Player) {
  return (p.upgrades?.safehouse ? 24 : 12) * H;
}

export function accrued(p: Player, hid: string, now: number) {
  if (p.arrested_until && now < p.arrested_until) return 0;
  const hs = p.hustles[hid];
  if (!hs) return 0;
  const h = HUSTLE_MAP[hid];
  if (!h) return 0;

  // Strict daily hustle cap: No side hustle gives more than 1000 cedis a day (cap at 1000 a day)
  const todayEarned = getHustleTodayEarned(p, hid, now);
  const remainingToday = Math.max(0, DAILY_HUSTLE_CAP - todayEarned);
  if (remainingToday <= 0) return 0;

  const secs = Math.max(0, Math.min(now - hs.ts, offlineCap(p)));
  // Side hustle revenue generates 10–45 cedis per minute
  const mins = secs / 60;
  const rawAccrued = Math.floor(hustleRate(h, hs.lvl, p, now) * mult(p, now) * mins);
  return Math.min(rawAccrued, remainingToday);
}

export function frontCost(f: { cost: number }, lvl: number) {
  return Math.floor(f.cost * Math.pow(1.6, lvl));
}

export function frontDuration(f: { id?: string; dur: number }, p?: Player) {
  let dur = f.dur;
  if (p && f.id && p.front_assign?.[f.id]) {
    const mgr = p.crew.find((c) => c.id === p.front_assign[f.id]);
    if (mgr) {
      let speedMult = 1.0;
      if (mgr.front_trait === "chop_master") speedMult -= 0.40;
      if (mgr.front_trait === "night_owl") speedMult -= 0.30;
      if (mgr.front_trait === "fleet_captain" && f.id === "trotro") speedMult -= 0.50;
      if (mgr.front_trait === "grease_monkey" && (f.id === "carwash" || f.id === "spare")) speedMult -= 0.35;
      if (mgr.specialty_biz === f.id) speedMult -= 0.10;
      dur = Math.max(10, Math.floor(dur * Math.max(0.35, speedMult)));
    }
  }
  return dur;
}

export function frontCapacity(p: Player, f: { id?: string; cap: number }, lvl: number) {
  let cap = Math.floor(f.cap * Math.pow(lvl, 1.3) * (1 + (p.upgrades?.trotro || 0) * 0.1));
  if (f.id && p.front_assign?.[f.id]) {
    const mgr = p.crew.find((c) => c.id === p.front_assign[f.id]);
    if (mgr) {
      let bonus = 0;
      if (mgr.front_trait === "bookkeeper") bonus += 0.40;
      if (mgr.front_trait === "night_owl") bonus += 0.35;
      if (mgr.front_trait === "high_society" && f.id === "club") bonus += 0.60;
      if (mgr.front_trait === "grease_monkey" && (f.id === "spare" || f.id === "carwash")) bonus += 0.50;
      if (mgr.front_trait === "chop_master" && f.id === "chopbar") bonus += 0.30;
      if (mgr.specialty_biz === f.id) bonus += 0.15;
      if ((mgr.morale ?? 85) >= 80) bonus += 0.10;
      cap = Math.floor(cap * (1 + bonus));
    }
  }
  return cap;
}

export function heatTier(heat: number) {
  return Math.min(5, 1 + Math.floor(heat / 20));
}

export function launderFee(heat: number, p?: Player, fid?: string) {
  let fee = 0.1 + 0.05 * (heatTier(heat) - 1);
  if (p) {
    if (p.boss_perks?.negotiator) fee = Math.max(0.02, fee - p.boss_perks.negotiator * 0.02);
    if (fid && p.front_assign?.[fid]) {
      const mgr = p.crew.find((c) => c.id === p.front_assign[fid]);
      if (mgr) {
        if (mgr.front_trait === "bookkeeper") fee = Math.max(0.02, fee - 0.04);
        if (mgr.front_trait === "smooth_talker") fee = Math.max(0.02, fee - 0.06);
        if (mgr.front_trait === "high_society") fee = Math.max(0.02, fee - 0.04);
        if (mgr.specialty_biz === fid) fee = Math.max(0.02, fee - 0.02);
      }
    }
  }
  return Number(fee.toFixed(3));
}

export function vaultCap(p: Player) {
  const facilityLevel = p.facilities?.vault || 0;
  const legacyLevel = p.upgrades?.vault || 0;
  return 500 * Math.pow(3, facilityLevel + legacyLevel);
}

export function crewStat(c: CrewMember, stat: string, p: Player) {
  let val = c.stats[stat] || 0;
  const strength = STRENGTHS.find((s) => s.id === c.strength);
  if (strength && strength.stat === stat) val += strength.mod;
  const flaw = FLAWS.find((f) => f.id === c.flaw);
  if (flaw && (flaw as any).stat === stat) val += (flaw as any).mod;
  // Gear bonuses
  Object.values(c.loadout || {}).forEach((uid) => {
    const gi = p.gear.find((g) => g.uid === uid);
    const def = gi && GEAR_MAP[gi.id];
    if (def && def.stat === stat) val += (def.mod || 0) + (gi.lvl || 0);
  });
  // Boss commander perk
  if (p.boss_perks?.commander) {
    val += p.boss_perks.commander;
  }
  // Morale effect
  const morale = c.morale !== undefined ? c.morale : 85;
  if (morale < 40) {
    val = Math.max(1, Math.floor(val * 0.75));
  } else if (morale >= 80) {
    val = Math.floor(val * 1.15);
  }
  return Math.min(CREW_STAT_MAX, Math.max(1, val));
}

export function loadoutPower(p: Player, loadout?: Record<string, string>) {
  if (!loadout) return 0;
  let pow = 0;
  Object.values(loadout).forEach((uid) => {
    const gi = p.gear.find((g) => g.uid === uid);
    const def = gi && GEAR_MAP[gi.id];
    if (def) pow += (def.power || 0) + (gi.lvl || 0) * 2;
  });
  return pow;
}

export function calcDefence(p: Player) {
  let d = 15;
  d += (p.facilities?.walls || 0) * 30;
  d += (p.facilities?.armoury || 0) * 25;
  d += (p.boss_perks?.iron_jaw || 0) * 20;
  d += (p.upgrades?.walls || 0) * 15;
  d += (p.upgrades?.cruiser || 0) * 10;
  BLACK_MARKET.filter((i) => i.kind === "defence").forEach((i) => {
    d += Math.min(i.max || 99, p.inv[i.id] || 0) * i.value;
  });
  p.crew.forEach((c) => {
    if (c.assign === "defense") {
      const m = (c.morale || 85) < 40 ? 0.75 : (c.morale || 85) >= 80 ? 1.2 : 1.0;
      d += Math.floor((crewStat(c, "muscle", p) * 3 + c.lvl * 3 + loadoutPower(p, c.loadout)) * m);
    }
  });
  // Iron Guard sentry bonus from assigned business managers
  Object.values(p.front_assign || {}).concat(Object.values(p.hustle_assign || {})).forEach((cid) => {
    const c = p.crew.find((x) => x.id === cid);
    if (c?.front_trait === "iron_guard") d += 35;
  });
  d += loadoutPower(p, p.loadout);
  if (p.raid) d += (p.raid.fortify || 0) * 15;
  return d;
}

export function calcPower(p: Player) {
  const crewPow = p.crew.reduce(
    (acc, c) => acc + (c.merc ? 0 : Object.values(c.stats).reduce((a, b) => a + b, 0) + c.lvl * 2),
    0
  );
  return (
    p.level * 4 +
    crewPow +
    (p.upgrades?.walls || 0) * 10 +
    (p.upgrades?.cruiser || 0) * 8 +
    loadoutPower(p, p.loadout)
  );
}

export function xpNeeded(level: number) {
  return Math.floor(50 * Math.pow(1.3, level - 1));
}

export function triggerArrest(p: Player, now: number) {
  p.heat = 100;
  p.arrested_until = now + 7200; // 2 hours
  p.heat_ts = now;
  p.log.unshift({
    t: now,
    msg: "ARRESTED BY GHANA POLICE! Heat hit 100%. CID & SWAT locked you up for 2 hours! All businesses frozen. Compound can still be raided!",
    kind: "bad",
  });
}

export function settleHeat(p: Player, now: number) {
  // Check if arrest timer completed
  if (p.arrested_until && now >= p.arrested_until) {
    p.arrested_until = 0;
    p.heat = 20;
    p.heat_ts = now;
    p.log.unshift({
      t: now,
      msg: "Released from police lockup after serving 2 hours! Businesses resumed.",
      kind: "good",
    });
  }

  // If currently arrested, heat stays pinned at 100
  if (p.arrested_until && now < p.arrested_until) {
    p.heat = 100;
    p.heat_ts = now;
    return;
  }

  const t0 = p.heat_ts;
  const fast = Math.max(0, Math.min(now, p.lie_low_until) - t0);
  const slow = Math.max(0, now - t0 - fast);

  // Realistic and palpable heat cooldown rates:
  // Base natural cooling: 35 heat/hr (~0.6 heat/minute)
  // Safehouse upgrade/facility: +15 to +25 heat/hr
  // Infirmary facility: +5 heat/hr per lvl
  // When lying low (fast): 180 heat/hr (3 heat/minute)
  const safehouseBonus = (p.upgrades?.safehouse ? 0 : 0) + ((p.facilities?.safehouse || 0) * 10);
  const infirmaryBonus = (p.facilities?.infirmary || 0) * 5;
  const naturalRate = 0 + safehouseBonus + infirmaryBonus;
  const lieLowRate = 20;

  p.heat = Math.max(0, p.heat - (fast * lieLowRate + slow * naturalRate) / H);
  p.heat_ts = now;

  if (p.heat >= 100 && (!p.arrested_until || now >= p.arrested_until)) {
    triggerArrest(p, now);
  }
}

export function getRivalPower(rival: Rival, p: Player): number {
  const districtPower: Record<string, number> = {
    dockside: 45,
    market: 85,
    zongo: 140,
    osu: 220,
    kejetia: 330,
    hills: 480,
  };
  const base = districtPower[rival.district] || 100;
  let mult = 1.0;
  if (rival.id === "kpakpa") mult = 0.9;
  if (rival.id === "coastal") mult = 1.1;
  if (rival.id === "lions") mult = 1.25;
  if (rival.id === "nima") mult = 1.15;
  if (rival.id === "silk") mult = 1.2;
  if (rival.id === "cantonments") mult = 1.35;
  if (rival.id === "ashanti") mult = 1.25;
  if (rival.id === "kings") mult = 1.15;
  if (rival.id === "tema") mult = 1.2;
  if (rival.id === "circle") mult = 1.0;
  if (rival.id === "spintex") mult = 1.05;

  const grudge = p.grudges?.[rival.id] || 0;
  const grudgeMod = 1 + (grudge / 100) * 0.25; // up to +25% power when grudge is high

  // Check active assassin contract debuff
  const assassinHit = p.assassin_hits?.[rival.id];
  let assassinMult = 1.0;
  if (assassinHit && assassinHit.until > (Date.now() / 1000)) {
    assassinMult = Math.max(0.2, 1.0 - assassinHit.power_cut);
  }

  return Math.round(base * mult * grudgeMod * assassinMult);
}

export function generateStore(p: Player, now: number) {
  const bought = p.store?.bought || [];
  const countBought = (id: string) => bought.filter((x) => x === id).length;
  const currentSlot = Math.floor(now / (12 * H)) + (p.store?.offset || 0);

  // Black Market: strictly limit to 4 items showing, quantity 1 per day, prices starting from 3,000+
  const bmShuffled = [...BLACK_MARKET].sort((a, b) => {
    const hA = (a.id + currentSlot).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const hB = (b.id + currentSlot).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return (hA % 17) - (hB % 17);
  });
  const bmList = bmShuffled.slice(0, 4).map((item) => ({
    ...item,
    price: Math.max(3000, item.price),
    left: Math.max(0, 1 - countBought(item.id)), // Quantity is 1 per day
  }));

  const weapons = GEAR.filter((g) => ["melee", "primary", "secondary"].includes(g.slot)).map((g) => ({
    ...g,
    subcategory: g.slot,
    left: Math.max(0, 3 - countBought(g.id)),
  }));

  const clothes = GEAR.filter((g) => ["hat", "top", "bottom", "shoes"].includes(g.slot)).map((g) => ({
    ...g,
    clean: g.price,
    left: Math.max(0, 2 - countBought(g.id)),
  }));

  // Store agency recruits persistently per store slot so IDs do not cycle on every tick
  if (!p.store) {
    p.store = { slot: currentSlot, offset: 0, bought: [] };
  }
  if (!p.store.agency || p.store.slot !== currentSlot) {
    p.store.slot = currentSlot;
    const baseRecruitCost = 5000;
    const recruitList = [
      { ...genCrew("driver", Math.max(1, p.level - 1)), price: baseRecruitCost + Math.max(0, p.level - 2) * 1200, clean_price: 1200, elite: false },
      { ...genCrew("enforcer", p.level), price: baseRecruitCost + (p.level - 1) * 1500, clean_price: 1500, elite: false },
      { ...genCrew("hacker", p.level + 1), price: baseRecruitCost + p.level * 1800, clean_price: 2000, elite: true },
      { ...genCrew("infiltrator", p.level + 1), price: baseRecruitCost + p.level * 2200, clean_price: 2400, elite: true },
    ];
    recruitList.forEach((r) => {
      r.daily_rate = calcCrewDailyRate(r);
    });
    p.store.agency = recruitList;
  }

  const agencyRecruits: CrewMember[] = (p.store.agency || []).map((c) => ({
    ...c,
    daily_rate: c.daily_rate || calcCrewDailyRate(c),
    hired: p.crew.some((x) => x.id === c.id) || bought.includes(c.id),
  } as any));

  const boutique = BOUTIQUE_CATALOG.map((item, idx) => {
    const seed = (item.id + (p.store?.offset || 0)).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const hasTier2 = (seed % 100) < Math.floor((item.tier2_chance || 0.65) * 100);
    const t2Key = hasTier2 ? TIER2_LIST[(seed + idx) % TIER2_LIST.length].id : null;
    return {
      ...item,
      tier2: t2Key,
      tier2_cat: t2Key ? TIER2_CATEGORIES[t2Key] : null,
      clean: item.price,
      left: Math.max(0, 1 - countBought(item.id)),
    };
  });

  return {
    black_market: bmList,
    gun_shop: weapons,
    gun_shop_subcategories: GUN_SHOP_SUBCATEGORIES,
    clothes: clothes,
    boutique: boutique,
    boutique_subcategories: BOUTIQUE_SUBCATEGORIES,
    agency: agencyRecruits,
  };
}

export function calcDerived(p: Player, now: number) {
  settleHeat(p, now);
  const tier = heatTier(p.heat);
  const tierObj = HEAT_TIERS[tier - 1] || HEAT_TIERS[0];
  const rate = totalRate(p, now);
  const vCap = vaultCap(p);
  const def = calcDefence(p);
  const pow = calcPower(p);
  const fee = launderFee(p.heat);

  const hustlesAcc: Record<string, {
    rate: number;
    next_rate: number;
    cost: number;
    today_earned: number;
    daily_cap: number;
    daily_capped: boolean;
    remaining_today: number;
    real_range: string;
    real_desc?: string;
  }> = {};
  HUSTLES.forEach((h) => {
    const lvl = p.hustles[h.id]?.lvl || 0;
    const todayEarned = getHustleTodayEarned(p, h.id, now);
    const isCapped = todayEarned >= DAILY_HUSTLE_CAP;
    hustlesAcc[h.id] = {
      rate: isCapped ? 0 : hustleRate(h, lvl || 1, p, now) * mult(p, now),
      next_rate: hustleRate(h, (lvl || 0) + 1, p, now) * mult(p, now),
      cost: hustleCost(h, lvl, now),
      today_earned: todayEarned,
      daily_cap: DAILY_HUSTLE_CAP,
      daily_capped: isCapped,
      remaining_today: Math.max(0, DAILY_HUSTLE_CAP - todayEarned),
      real_range: h.real_range || `GH₵${h.min_income || h.income} – GH₵${h.max_income || h.income}`,
      real_desc: h.real_desc,
    };
  });

  const frontsAcc: Record<string, { cap: number; cost: number }> = {};
  FRONTS.forEach((f) => {
    const lvl = p.fronts[f.id] || 0;
    frontsAcc[f.id] = {
      cap: frontCapacity(p, f, Math.max(1, lvl)),
      cost: frontCost(f, lvl),
    };
  });

  const upgradesAcc: Record<string, number> = {};
  Object.entries(UPGRADES).forEach(([k, up]) => {
    const current = p.upgrades[k] || 0;
    upgradesAcc[k] = Math.floor(up.cost * Math.pow(1.5, current));
  });

  const growTimes: Record<string, number> = {};
  const prices: Record<string, number> = {};
  const lightUp = p.farm?.up?.lights || 0;
  STRAINS.forEach((s) => {
    growTimes[s.id] = Math.max(10, Math.floor(s.grow * (1 - lightUp * 0.1)));
    prices[s.id] = s.price;
  });
  const upCost: Record<string, number> = {};
  Object.entries(FARM.upgrades).forEach(([k, up]) => {
    const lvl = p.farm?.up?.[k] || 0;
    upCost[k] = Math.floor(up.cost * Math.pow(1.8, lvl));
  });
  const plotCost = Math.floor(FARM.plot_cost * Math.pow(FARM.plot_growth, p.farm?.plots?.length || 0));

  const crewEff: Record<string, Record<string, number>> = {};
  const crewWpow: Record<string, number> = {};
  p.crew.forEach((c) => {
    crewEff[c.id] = {
      brains: crewStat(c, "brains", p),
      wheels: crewStat(c, "wheels", p),
      muscle: crewStat(c, "muscle", p),
      stealth: crewStat(c, "stealth", p),
    };
    crewWpow[c.id] = loadoutPower(p, c.loadout);
  });

  const store = generateStore(p, now);
  const storeNext = (Math.floor(now / (12 * H)) + 1) * (12 * H);

  return {
    tier,
    tier_name: tierObj.name,
    rate,
    tap_value: Math.max(1, Math.min(3, Math.floor(rate * 0.15) + 1)),
    fee,
    vault_cap: vCap,
    defence: def,
    power: pow,
    boss_power: loadoutPower(p, p.loadout),
    crew_cap: 12 + (p.upgrades?.quarters || 0) * 2,
    bribe_cost: 20000,
    heat_cooling_per_hour: p.lie_low_until > now ? 20 : (0 + (p.upgrades?.safehouse ? 0 : 0) + ((p.facilities?.safehouse || 0) * 10)),
    assassin_contact: ASSASSIN_CONTACT,
    daily_hustle_cap: DAILY_HUSTLE_CAP,
    xp_needed: xpNeeded(p.level),
    slots: 2 + (p.build_slots || 0),
    offline_cap_h: p.upgrades?.safehouse ? 24 : 12,
    hustles: hustlesAcc,
    fronts: frontsAcc,
    upgrades: upgradesAcc,
    farm: {
      grow: growTimes,
      prices: prices,
      up_cost: upCost,
      plot_cost: plotCost,
    },
    store: store,
    store_next: storeNext,
    restock_cost: 25,
    crew_eff: crewEff,
    crew_wpow: crewWpow,
    fortify_cost: 40 + (p.raid?.fortify || 0) * 25,
    lawyer_left: Math.max(0, 2 - (p.lawyer_week?.count || 0)),
    boss: RIVALS[Math.floor(now / (7 * 86400)) % RIVALS.length].id,
    respect_gain: Math.max(1, Math.floor(Math.sqrt(Math.max(0, Number(p.lifetime || 0) / 100000)))),
    mult: Number(mult(p, now).toFixed(2)),
    is_arrested: p.arrested_until ? now < p.arrested_until : false,
    arrest_left: p.arrested_until ? Math.max(0, p.arrested_until - now) : 0,
    bail_cost: 250,
    rival_powers: Object.fromEntries(RIVALS.map((r) => [r.id, getRivalPower(r, p)])),
    heist_count: (p.heist_day?.day === dayKey(now) ? p.heist_day.count : 0),
    heist_limit: DAILY_HEIST_BASE_LIMIT + (p.heist_day?.day === dayKey(now) ? (p.heist_day.ad_extra || 0) : 0),
    heist_ad_extra: (p.heist_day?.day === dayKey(now) ? (p.heist_day.ad_extra || 0) : 0),
    heist_limit_reached: (p.heist_day?.day === dayKey(now) ? p.heist_day.count : 0) >= (DAILY_HEIST_BASE_LIMIT + (p.heist_day?.day === dayKey(now) ? (p.heist_day.ad_extra || 0) : 0)),
    crew_daily_payroll: (p.crew || []).filter((c) => !c.merc).reduce((sum, c) => sum + (c.daily_rate || calcCrewDailyRate(c)), 0),
  };
}

export function tickPlayer(p: Player, now: number) {
  settleHeat(p, now);
  const sk = seasonKey(now);
  if (p.season?.id !== sk) p.season = { id: sk, points: 0 };
  if (p.pass?.season !== sk) p.pass = { season: sk, xp: 0, premium: false, free: [], prem: [] };
  const dk = dayKey(now);
  if (p.daily?.day !== dk) {
    p.daily = {
      day: dk,
      contracts: generateDailyContracts(p.name, dk, p.level),
      login_claimed: false,
    };
  }
  if (!p.heist_day || p.heist_day.day !== dk) {
    p.heist_day = { day: dk, count: 0, ad_extra: 0 };
  }
  if (p.ads?.day !== dk) p.ads = { day: dk, double: false, restock: false };

  // Daily crew wages payroll (averaging 100 to 800 cedis per member based on lvl, xp, traits)
  if (!p.last_wage_day) {
    p.last_wage_day = dk;
  } else if (p.last_wage_day !== dk) {
    p.last_wage_day = dk;
    const activeCrew = (p.crew || []).filter((c) => !c.merc);
    if (activeCrew.length > 0) {
      const totalPayroll = activeCrew.reduce((acc, c) => acc + (c.daily_rate || calcCrewDailyRate(c)), 0);
      if (BigInt(p.clean) >= BigInt(totalPayroll)) {
        p.clean = (BigInt(p.clean) - BigInt(totalPayroll)).toString();
        activeCrew.forEach((c) => {
          c.morale = Math.min(100, (c.morale || 85) + 5);
        });
        p.log.unshift({
          t: now,
          msg: `[DAILY PAYROLL] Paid GH₵${totalPayroll.toLocaleString()} clean wages to crew (${activeCrew.length} members). Morale sustained!`,
          kind: "good",
        });
      } else if (BigInt(p.dirty) >= BigInt(totalPayroll)) {
        p.dirty = (BigInt(p.dirty) - BigInt(totalPayroll)).toString();
        activeCrew.forEach((c) => {
          c.morale = Math.min(100, (c.morale || 85) + 3);
        });
        p.log.unshift({
          t: now,
          msg: `[DAILY PAYROLL] Paid GH₵${totalPayroll.toLocaleString()} dirty wages to crew (${activeCrew.length} members).`,
          kind: "info",
        });
      } else {
        activeCrew.forEach((c) => {
          c.morale = Math.max(10, (c.morale || 85) - 25);
        });
        p.log.unshift({
          t: now,
          msg: `[PAYROLL DEFAULT] Unable to pay GH₵${totalPayroll.toLocaleString()} daily crew wages! Crew morale plummeted!`,
          kind: "bad",
        });
      }
    }
  }

  // Rental completion check
  if (p.rentals && p.rentals.length > 0) {
    const expired: any[] = [];
    p.rentals = p.rentals.filter((l) => {
      if (now >= l.end) {
        expired.push(l);
        return false;
      }
      return true;
    });
    expired.forEach((l) => {
      const c = p.crew.find((x) => x.id === l.crew_id);
      if (c && c.assign === "listed") {
        c.assign = null;
      }
      p.dirty = (BigInt(p.dirty) + BigInt(l.price)).toString();
      p.log.unshift({
        t: now,
        msg: `Mercenary contract completed! ${l.crew_name} returned from duty. Collected GH₵${l.price.toLocaleString()} payment!`,
        kind: "good",
      });
    });
  }

  // Grudge natural settling: cool down by 1 point every ~20s of street calm when corner not on alert
  RIVALS.forEach((r) => {
    if ((p.grudges?.[r.id] || 0) > 0 && (p.rival_cd?.[r.id] || 0) < now) {
      if (Math.random() < 0.08) {
        p.grudges[r.id] = Math.max(0, (p.grudges[r.id] || 0) - 1);
      }
    }
  });

  // Check expired assassin hits
  if (p.assassin_hits) {
    for (const [rid, hit] of Object.entries(p.assassin_hits)) {
      if (hit.until <= now) {
        delete p.assassin_hits[rid];
        const rDef = RIVAL_MAP[rid];
        p.log.unshift({
          t: now,
          msg: `Assassin contract on ${rDef?.name || rid} completed and expired. Rival syndicate defenses normalizing.`,
          kind: "info",
        });
      }
    }
  }

  // Opportunistic raid when arrested OR angry alliance raid
  if (!p.raid && (p.shield_until || 0) <= now) {
    const isArrested = p.arrested_until ? now < p.arrested_until : false;
    // If arrested, rivals take advantage of you being in custody!
    if (isArrested && Math.random() < 0.05) {
      const attacker = RIVALS[Math.floor(Math.random() * RIVALS.length)];
      const basePow = Math.floor(getRivalPower(attacker, p) * 1.1) + 15;
      p.raid = {
        rival: attacker.id,
        start: now,
        resolve_at: now + 50,
        attack: basePow,
        fortify: 0,
        taunt: `[POLICE LOCKUP RAID] ${attacker.boss} (${attacker.name}): "Boss is in handcuffs! Strip their compound bare!"`,
      };
      p.log.unshift({
        t: now,
        msg: `COMPOUND RAIDED WHILE IN JAIL! ${attacker.name} attacked because you are in custody! Resolve in 50s.`,
        kind: "bad",
      });
    } else {
      // Check if any rival alliance is angry and triggers a raid
      const angryRivals = RIVALS.filter((r) => (p.grudges?.[r.id] || 0) >= 50);
      if (angryRivals.length > 0 && Math.random() < 0.04) {
        const angry = angryRivals[Math.floor(Math.random() * angryRivals.length)];
        const ally = RIVAL_MAP[angry.ally_id] || angry;
        const attackPow = Math.floor(getRivalPower(ally, p) * 1.15 + 15);
        p.raid = {
          rival: ally.id,
          start: now,
          resolve_at: now + 50,
          attack: attackPow,
          fortify: 0,
          taunt: `[ALLIANCE SOLIDARITY RAID] ${ally.boss} (${ally.name}): "Our ally ${angry.name} is at war with you! The ${angry.bloc} strikes back!"`,
        };
        p.log.unshift({
          t: now,
          msg: `ALLIANCE SOLIDARITY RAID! ${ally.name} launched a raid to back their ally ${angry.name}! Defend your compound!`,
          kind: "bad",
        });
      }
    }
  }

  // Resolve raid if time expired
  if (p.raid && now >= p.raid.resolve_at) {
    resolveRaid(p, now);
  }

  // Tick ongoing heists for crisis events
  p.heists?.forEach((h) => {
    if (!h.events) return;
    h.events.forEach((ev) => {
      // Check if unaddressed and expired
      if (!ev.resolved && now >= ev.expires_at) {
        const evDef = HEIST_EVENT_MAP[ev.event_id];
        if (evDef) {
          ev.resolved = true;
          ev.penalty_applied = true;
          ev.outcome = `CRISIS UNADDRESSED: ${evDef.fail_penalty.desc}`;
          h.pct = Math.max(5, h.pct - evDef.fail_penalty.chance_drop);
          h.heat = Math.min(100, h.heat + evDef.fail_penalty.heat_spike);
          p.heat = Math.min(100, p.heat + Math.floor(evDef.fail_penalty.heat_spike / 2));
          Object.values(h.sel || {}).forEach((cid) => {
            const c = p.crew.find((x) => x.id === cid);
            if (c) c.morale = Math.max(0, (c.morale || 85) - evDef.fail_penalty.morale_loss);
          });
          p.log.unshift({
            t: now,
            msg: `[HEIST CRISIS UNRESOLVED] ${evDef.title} timed out! Heist chance plunged by ${evDef.fail_penalty.chance_drop}% and heat surged!`,
            kind: "bad",
          });
        }
      }
    });
  });
}

export function resolveRaid(p: Player, now: number) {
  if (!p.raid) return;
  const r = p.raid;
  const rival = RIVAL_MAP[r.rival] || RIVALS[0];
  const def = calcDefence(p) * (0.9 + Math.random() * 0.2);
  const atk = r.attack * (0.9 + Math.random() * 0.2);
  const won = def >= atk;

  const vCap = BigInt(vaultCap(p));
  const dirtyTotal = BigInt(p.dirty);
  const exposed = dirtyTotal > vCap ? dirtyTotal - vCap : 0n;

  if (won) {
    const loot = Math.floor(r.attack * 25 + p.level * 60);
    p.dirty = (BigInt(p.dirty) + BigInt(loot)).toString();
    p.grudges[r.rival] = Math.max(0, (p.grudges[r.rival] || 0) - 15);
    p.log.unshift({
      t: now,
      msg: `Raid Defended! Crushed ${rival.name}'s assault force! Seized GH₵${loot.toLocaleString()} dirty cash and repelled the syndicate!`,
      kind: "good",
    });
    p.raid_log.unshift({
      t: now,
      rival: rival.name,
      defence: Math.round(def),
      attack: Math.round(atk),
      won: true,
      amount: loot.toString(),
    });
  } else {
    const pct = 0.2 + Math.random() * 0.15;
    const lost = (exposed * BigInt(Math.floor(pct * 100))) / 100n;
    p.dirty = (dirtyTotal - lost).toString();
    p.grudges[r.rival] = Math.max(0, (p.grudges[r.rival] || 0) - 20);
    p.log.unshift({
      t: now,
      msg: `Compound Breached! ${rival.name} broke perimeter and stole GH₵${lost.toLocaleString()} dirty cash. Vault was safe.`,
      kind: "bad",
    });
    p.raid_log.unshift({
      t: now,
      rival: rival.name,
      defence: Math.round(def),
      attack: Math.round(atk),
      won: false,
      amount: lost.toString(),
      pct: Math.round(pct * 100),
    });
  }

  p.crew.forEach((c) => {
    if (c.assign === "defense") {
      c.xp += won ? 25 : 10;
      c.morale = won ? Math.min(100, (c.morale || 85) + 15) : Math.max(0, (c.morale || 85) - 10);
      while (c.xp >= 30 * c.lvl) {
        c.xp -= 30 * c.lvl;
        c.lvl += 1;
        const prim = ARCHETYPES[c.arch] || "muscle";
        c.daily_rate = calcCrewDailyRate(c);
      }
    }
  });

  p.raid = null;
  p.shield_until = now + 4 * H;
}

export function executeAction(
  p: Player,
  type: string,
  payload: any = {},
  now = Date.now() / 1000
): { ok: boolean; result?: any; error?: string } {
  tickPlayer(p, now);

  const gainXp = (amt: number) => {
    p.xp += amt;
    while (p.xp >= xpNeeded(p.level)) {
      p.xp -= xpNeeded(p.level);
      p.level += 1;
      p.skill_points = (p.skill_points || 0) + 1;
      p.log.unshift({ t: now, msg: `Level Up! Boss is now Level ${p.level}. Street respect increased! +1 Boss Skill Point!`, kind: "good" });
    }
  };

  const progress = (ctype: string, amt = 1) => {
    p.daily?.contracts?.forEach((c) => {
      if (c.type === ctype && !c.claimed) {
        c.progress = Math.min(c.target, c.progress + amt);
      }
    });
  };

  try {
    switch (type) {
      case "tap": {
        const count = Math.max(1, payload.count || 1);
        const rate = totalRate(p, now);
        const perTap = Math.max(1, Math.min(3, Math.floor(rate * 0.15) + 1));
        const earned = perTap * count;
        p.dirty = (BigInt(p.dirty) + BigInt(earned)).toString();
        p.lifetime = (BigInt(p.lifetime) + BigInt(earned)).toString();
        gainXp(count / 10);
        progress("tap", count);
        return { ok: true, result: { earned: earned.toString(), count } };
      }

      case "collect": {
        let total = 0;
        const today = dayKey(now);
        if (!p.hustle_daily) p.hustle_daily = {};
        const hid = payload.hid || "all";

        const collectHustle = (k: string) => {
          const amt = accrued(p, k, now);
          if (amt > 0) {
            total += amt;
            const currentToday = p.hustle_daily![k]?.day === today ? p.hustle_daily![k].amount : 0;
            p.hustle_daily![k] = { day: today, amount: Math.min(DAILY_HUSTLE_CAP, currentToday + amt) };
          }
          p.hustles[k].ts = now;
        };

        if (hid === "all") {
          Object.keys(p.hustles).forEach(collectHustle);
        } else if (p.hustles[hid]) {
          collectHustle(hid);
        }

        if (total > 0) {
          p.dirty = (BigInt(p.dirty) + BigInt(total)).toString();
          p.lifetime = (BigInt(p.lifetime) + BigInt(total)).toString();
          progress("collect", total);
          p.heat = Math.min(100, p.heat + Math.min(4, total / 150));
          p.log.unshift({
            t: now,
            msg: `Collected GH₵${total.toLocaleString()} dirty cash from Accra street hustles (Capped at GH₵1,000/day per hustle).`,
            kind: "good",
          });
        }
        return { ok: true, result: { collected: total.toString() } };
      }

      case "buy_hustle": {
        const hid = payload.hid;
        const h = HUSTLE_MAP[hid];
        if (!h) throw new Error("Hustle not found");
        const currentLvl = p.hustles[hid]?.lvl || 0;
        const cost = hustleCost(h, currentLvl);
        if (BigInt(p.dirty) < BigInt(cost)) throw new Error("Not enough dirty cedis, chale!");
        p.dirty = (BigInt(p.dirty) - BigInt(cost)).toString();
        p.hustles[hid] = { lvl: currentLvl + 1, ts: now };
        gainXp(5);
        progress("upgrade", 1);
        p.log.unshift({ t: now, msg: `Upgraded ${h.name} to Level ${currentLvl + 1}`, kind: "good" });
        return { ok: true, result: { lvl: currentLvl + 1 } };
      }

      case "buy_front": {
        const fid = payload.fid;
        const f = FRONT_MAP[fid];
        if (!f) throw new Error("Front not found");
        const currentLvl = p.fronts[fid] || 0;
        const cost = frontCost(f, currentLvl);
        if (BigInt(p.dirty) < BigInt(cost)) throw new Error("Not enough dirty cedis to expand front");
        p.dirty = (BigInt(p.dirty) - BigInt(cost)).toString();
        p.fronts[fid] = currentLvl + 1;
        gainXp(10);
        progress("upgrade", 1);
        p.log.unshift({ t: now, msg: `Expanded front: ${f.name} (Lvl ${currentLvl + 1})`, kind: "good" });
        return { ok: true, result: { lvl: currentLvl + 1 } };
      }

      case "launder": {
        const fid = payload.fid;
        const f = FRONT_MAP[fid];
        if (!f) throw new Error("Front not found");
        const lvl = p.fronts[fid] || 0;
        if (lvl < 1) throw new Error("Front not owned yet");
        const maxSlots = 2 + (p.build_slots || 0);
        if (p.batches.length >= maxSlots) throw new Error("All laundering slots are busy");

        const cap = frontCapacity(p, f, lvl);
        const amount = Math.min(cap, parseInt(p.dirty));
        if (amount <= 0) throw new Error("No dirty cedis to wash");

        const feeRate = launderFee(p.heat);
        const cleanEarned = Math.floor(amount * (1 - feeRate));

        p.dirty = (BigInt(p.dirty) - BigInt(amount)).toString();
        p.batches.push({
          id: uid(),
          front: fid,
          dirty: amount,
          clean: cleanEarned,
          amount: amount,
          out: cleanEarned,
          start: now,
          end: now + f.dur,
        });
        progress("launder", 1);
        p.heat = Math.min(100, p.heat + 2);
        p.log.unshift({
          t: now,
          msg: `Washing GH₵${amount.toLocaleString()} through ${f.name}. Yields GH₵${cleanEarned.toLocaleString()} clean.`,
          kind: "info",
        });
        return { ok: true, result: { clean: cleanEarned, duration: f.dur } };
      }

      case "collect_batch": {
        const bid = payload.bid || payload.id;
        const idx = p.batches.findIndex((b) => b.id === bid);
        if (idx === -1) throw new Error("Batch not found");
        const b = p.batches[idx];
        if (now < b.end) throw new Error("Batch still being laundered");
        p.batches.splice(idx, 1);
        const amt = b.clean || (b as any).out || 0;
        p.clean = (BigInt(p.clean) + BigInt(amt)).toString();
        gainXp(15);
        p.log.unshift({ t: now, msg: `Clean cash in the bag! Collected GH₵${amt.toLocaleString()}`, kind: "good" });
        return { ok: true, result: { clean: amt } };
      }

      case "bribe": {
        const cost = 20000;
        if (BigInt(p.clean) < BigInt(cost)) {
          throw new Error(`Need GH₵${cost.toLocaleString()} clean cedis to bribe Accra Police Command`);
        }
        if (p.heat <= 0) throw new Error("No heat to drop");
        p.clean = (BigInt(p.clean) - BigInt(cost)).toString();
        p.heat = Math.max(0, p.heat - 25);
        p.log.unshift({
          t: now,
          msg: `High-level payoff delivered to CID Command (GH₵${cost.toLocaleString()} clean). Dropped 25 Heat!`,
          kind: "good",
        });
        return { ok: true, result: { heat: p.heat, cost } };
      }

      case "lie_low": {
        p.lie_low_until = now + 1800; // 30 minutes
        p.log.unshift({ t: now, msg: "Lying low in the safehouse for 30 minutes. Heat cools 4x faster.", kind: "info" });
        return { ok: true, result: { until: p.lie_low_until } };
      }

      case "use_item": {
        const itemId = payload.item;
        if ((p.inv[itemId] || 0) <= 0) throw new Error("Item not in inventory");
        p.inv[itemId] -= 1;

        if (itemId === "burner") {
          p.heat = Math.max(0, p.heat - 15);
        } else if (itemId === "envelope") {
          p.heat = Math.max(0, p.heat - 25);
        } else if (itemId === "receipt") {
          p.heat = Math.max(0, p.heat - 10);
        } else if (itemId === "donation") {
          p.heat = Math.max(0, p.heat - 40);
        } else if (itemId === "timeskip") {
          p.batches.forEach((b) => (b.end = Math.max(now, b.end - 3600)));
          p.heists.forEach((h) => (h.end = Math.max(now, h.end - 3600)));
          p.farm?.plots?.forEach((pl) => (pl.end = Math.max(now, pl.end - 3600)));
          p.log.unshift({ t: now, msg: "Time Skip activated: pushed all operations 1 hour ahead!", kind: "good" });
        } else if (itemId === "lawyer") {
          p.heat = Math.max(0, p.heat - 20);
          p.shield_until = now + 4 * H;
          if (p.raid) p.raid = null;
          p.log.unshift({ t: now, msg: "Lawyer stepped in! Raid cancelled & 4hr shield active.", kind: "good" });
        } else if (itemId === "energy") {
          p.crew.forEach((c) => {
            if (!c.assign) {
              c.xp += 40;
              while (c.xp >= 30 * c.lvl) {
                c.xp -= 30 * c.lvl;
                c.lvl += 1;
              }
            }
          });
          p.log.unshift({ t: now, msg: "Crew refreshed with Malt & Energy! +40 XP given.", kind: "good" });
        } else if (itemId === "feast") {
          p.crew.forEach((c) => {
            if (!c.assign) {
              c.xp += 90;
              while (c.xp >= 30 * c.lvl) {
                c.xp -= 30 * c.lvl;
                c.lvl += 1;
              }
            }
          });
          p.log.unshift({ t: now, msg: "Jollof feast shared! +90 XP to all free crew members.", kind: "good" });
        } else if (itemId === "spikes" || itemId === "dog") {
          if (p.raid) p.raid.fortify = Math.min(7, (p.raid.fortify || 0) + (itemId === "dog" ? 3 : 2));
        }
        return { ok: true, result: { item: itemId } };
      }

      case "assign": {
        const cid = payload.crew_id || payload.cid;
        const assign = payload.assign;
        const c = p.crew.find((x) => x.id === cid);
        if (!c) throw new Error("Crew member not found");
        if (c.assign?.startsWith("heist")) throw new Error("Crew member is currently on a heist");
        if (c.assign?.startsWith("listed")) throw new Error("Crew member is currently listed on the mercenary market");
        
        if (assign === "defense") {
          // If assigned to front or hustle, remove from business assignment
          Object.keys(p.front_assign || {}).forEach((fid) => {
            if (p.front_assign[fid] === cid) delete p.front_assign[fid];
          });
          Object.keys(p.hustle_assign || {}).forEach((hid) => {
            if (p.hustle_assign[hid] === cid) delete p.hustle_assign[hid];
          });
        }
        c.assign = assign || null;
        p.log.unshift({
          t: now,
          msg: assign === "defense"
            ? `${c.name} assigned to Compound Defense perimeter (+Muscle/Gear to Defense).`
            : `${c.name} relieved from defense duty. Now free.`,
          kind: "info",
        });
        return { ok: true, result: { assign: c.assign } };
      }

      case "unassign_business": {
        const cid = payload.crew_id || payload.cid;
        const c = p.crew.find((x) => x.id === cid);
        if (!c) throw new Error("Crew member not found");
        Object.keys(p.front_assign || {}).forEach((fid) => {
          if (p.front_assign[fid] === cid) delete p.front_assign[fid];
        });
        Object.keys(p.hustle_assign || {}).forEach((hid) => {
          if (p.hustle_assign[hid] === cid) delete p.hustle_assign[hid];
        });
        c.assign = null;
        p.log.unshift({ t: now, msg: `Unassigned ${c.name} from business. Ready for operations.`, kind: "info" });
        return { ok: true, result: { unassigned: true } };
      }

      case "heist_start": {
        const hid = payload.tpl || payload.hid;
        const sel = payload.crew || payload.sel || {};
        const { approach = "balanced", prep = [] } = payload;
        const today = dayKey(now);
        if (!p.heist_day || p.heist_day.day !== today) {
          p.heist_day = { day: today, count: 0, ad_extra: 0 };
        }
        const maxAllowed = DAILY_HEIST_BASE_LIMIT + (p.heist_day.ad_extra || 0);
        if (p.heist_day.count >= maxAllowed) {
          throw new Error(`Daily Heist Limit reached (${p.heist_day.count}/${maxAllowed})! Watch a street broadcast ad to unlock another heist operation.`);
        }
        const tpl = HEIST_MAP[hid];
        if (!tpl) throw new Error("Heist target not found");

        const crewIds: string[] = Object.values(sel);
        if (crewIds.length < tpl.roles.length) throw new Error("Fill all required roles for this operation");

        crewIds.forEach((cid) => {
          const c = p.crew.find((x) => x.id === cid);
          if (!c) throw new Error("Invalid crew selection");
          if (c.assign) throw new Error(`${c.name} is already busy (${c.assign})`);
          c.assign = `heist:${hid}`;
        });

        p.heist_day.count += 1;
        p.last_heist_day = today;
        const ap = HEIST_APPROACHES[approach] || HEIST_APPROACHES.balanced;
        const generatorLvl = p.facilities?.generator || 0;
        const durSeconds = Math.max(
          15,
          Math.floor(tpl.dur * (1 - 0.05 * (p.upgrades?.okada || 0) - generatorLvl * 0.05) * ap.dur * (prep.includes("getaway") ? 0.7 : 1))
        );

        const ev1Time = now + Math.max(10, Math.floor(durSeconds * 0.35));
        const ev2Time = now + Math.max(20, Math.floor(durSeconds * 0.70));
        const shuffledEvs = [...HEIST_EVENTS].sort(() => Math.random() - 0.5);
        const plannedEvents = [
          {
            uid: uid(),
            event_id: shuffledEvs[0].id,
            trigger_at: ev1Time,
            expires_at: ev1Time + Math.max(30, Math.floor(durSeconds * 0.35)),
            resolved: false,
          },
          ...(durSeconds > 60 && shuffledEvs.length > 1
            ? [
                {
                  uid: uid(),
                  event_id: shuffledEvs[1].id,
                  trigger_at: ev2Time,
                  expires_at: ev2Time + Math.max(30, Math.floor(durSeconds * 0.35)),
                  resolved: false,
                },
              ]
            : []),
        ];

        p.heists.push({
          id: uid(),
          tpl: hid,
          sel,
          start: now,
          end: now + durSeconds,
          pct: payload.pct || 75,
          reward: Math.floor(tpl.reward * (1 + 0.08 * p.level) * ap.reward),
          heat: Math.round(tpl.heat * ap.heat),
          approach,
          events: plannedEvents,
        });

        p.log.unshift({ t: now, msg: `Deployed crew on Daily Heist: ${tpl.name}! High-stakes operation underway.`, kind: "info" });
        return { ok: true, result: { heist: hid } };
      }

      case "resolve_heist_event": {
        const { hid, event_uid, choice_id } = payload;
        const h = p.heists.find((x) => x.id === hid || x.tpl === hid);
        if (!h) throw new Error("Heist not found");
        const ev = h.events?.find((e) => e.uid === event_uid);
        if (!ev) throw new Error("Crisis event not found");
        if (ev.resolved) throw new Error("Crisis event already resolved");
        const evDef = HEIST_EVENT_MAP[ev.event_id];
        if (!evDef) throw new Error("Event definition missing");
        const choice = evDef.choices.find((c) => c.id === choice_id);
        if (!choice) throw new Error("Invalid tactical choice");

        // Role check
        if (choice.req_role) {
          const req = choice.req_role;
          const hasRole = Object.values(h.sel || {}).some((cid) => {
            const crewM = p.crew.find((c) => c.id === cid);
            return crewM && (crewM.arch === ROLE_ARCH[req] || crewM.arch === req.toLowerCase());
          });
          if (!hasRole) {
            throw new Error(`Requires a ${req} on the heist team!`);
          }
        }

        // Cost check
        if (choice.cost_clean && BigInt(p.clean) < BigInt(choice.cost_clean)) {
          throw new Error(`Need GH₵${choice.cost_clean} clean cedis`);
        }
        if (choice.cost_dirty && BigInt(p.dirty) < BigInt(choice.cost_dirty)) {
          throw new Error(`Need GH₵${choice.cost_dirty} dirty cedis`);
        }

        if (choice.cost_clean) p.clean = (BigInt(p.clean) - BigInt(choice.cost_clean)).toString();
        if (choice.cost_dirty) p.dirty = (BigInt(p.dirty) - BigInt(choice.cost_dirty)).toString();

        ev.resolved = true;
        ev.choice = choice.id;
        ev.outcome = choice.success_msg;
        ev.chance_delta = choice.chance_mod;
        ev.heat_delta = choice.heat_mod;

        h.pct = Math.min(99, Math.max(5, h.pct + choice.chance_mod));
        h.heat = Math.max(0, h.heat + choice.heat_mod);
        h.reward = Math.floor(h.reward * choice.payout_mod);

        p.log.unshift({
          t: now,
          msg: `[HEIST TACTICAL SAVE] ${choice.label}: ${choice.success_msg} (${choice.chance_mod >= 0 ? "+" : ""}${choice.chance_mod}% success chance)`,
          kind: "good",
        });

        return { ok: true, result: { outcome: choice.success_msg, chance: h.pct } };
      }

      case "heist_claim": {
        const hid = payload.hid || payload.id;
        const idx = p.heists.findIndex((h) => h.id === hid || h.tpl === hid);
        if (idx === -1) throw new Error("Heist not found");
        const h = p.heists[idx];
        if (now < h.end) throw new Error("Heist still in progress");

        p.heists.splice(idx, 1);
        const crewList = Object.values(h.sel)
          .map((cid) => p.crew.find((x) => x.id === cid))
          .filter(Boolean) as CrewMember[];

        crewList.forEach((c) => (c.assign = null));

        const roll = Math.random() * 100;
        const won = roll <= h.pct;

        const eventLogs: string[] = [];
        (h.events || []).forEach((ev) => {
          const evDef = HEIST_EVENT_MAP[ev.event_id];
          if (ev.penalty_applied) {
            eventLogs.push(`⚠️ Crisis: ${evDef?.title || "Incident"} was ignored! Major setback occurred.`);
          } else if (ev.resolved && ev.outcome) {
            eventLogs.push(`✅ Tactical Save: ${ev.outcome}`);
          }
        });

        if (won) {
          p.dirty = (BigInt(p.dirty) + BigInt(h.reward)).toString();
          p.lifetime = (BigInt(p.lifetime) + BigInt(h.reward)).toString();
          gainXp(40);
          p.pass.xp += 60;
          p.season.points += 50;
          p.heat = Math.min(100, p.heat + h.heat);
          if (p.heat >= 100) triggerArrest(p, now);
          progress("heist", 1);

          crewList.forEach((c) => {
            c.xp += 40;
            c.morale = Math.min(100, (c.morale || 85) + 20);
            while (c.xp >= 30 * c.lvl) {
              c.xp -= 30 * c.lvl;
              c.lvl += 1;
              const prim = ARCHETYPES[c.arch] || "muscle";
              c.stats[prim] = Math.min(CREW_STAT_MAX, (c.stats[prim] || 5) + 1);
            }
          });

          let dropId: string | null = null;
          let dropName = "";
          if (Math.random() < 0.4) {
            const pool = GEAR.filter((g) => (g.unlock || 1) <= p.level + 2);
            const drop = pool[Math.floor(Math.random() * pool.length)];
            grantGear(p, drop.id, "reward");
            dropId = drop.id;
            dropName = drop.name;
          }

          p.log.unshift({
            t: now,
            msg: `Heist Success! Hit the score for GH₵${h.reward.toLocaleString()} dirty.${dropName ? ` Loot drop: ${dropName}!` : ""}`,
            kind: "good",
          });
          return {
            ok: true,
            result: {
              outcome: "success",
              chance: h.pct,
              reward: h.reward,
              drop: dropId,
              log: [
                "Target security systems bypassed by crew",
                `Vault cracked: extracted GH₵${h.reward.toLocaleString()} cash`,
                ...eventLogs,
                dropName ? `Secured rare loot drop: ${dropName}` : "Crew extracted cleanly without casualties",
              ],
            },
          };
        } else {
          p.heat = Math.min(100, p.heat + Math.floor(h.heat * 1.5));
          if (p.heat >= 100) triggerArrest(p, now);
          crewList.forEach((c) => {
            c.xp += 15;
            c.morale = Math.max(0, (c.morale || 85) - 20);
          });
          p.log.unshift({
            t: now,
            msg: "Alarm sounded during heist! Crew slipped away with no loot, and heat increased.",
            kind: "bad",
          });
          return {
            ok: true,
            result: {
              outcome: "botched",
              chance: h.pct,
              reward: 0,
              drop: null,
              log: [
                "Alarm tripped during breach phase",
                ...eventLogs,
                "Police Task Force converged on the location",
                "Crew forced to abandon loot and flee via back alleys",
              ],
            },
          };
        }
      }

      case "store_buy": {
        const id = payload.id || payload.item;
        const storeType = payload.store;

        if (storeType === "agency") {
          const maxCrew = 12 + (p.upgrades?.quarters || 0) * 2;
          const ownCount = p.crew.filter((c) => !c.merc).length;
          if (ownCount >= maxCrew) {
            throw new Error(`Crew quarters full (${ownCount}/${maxCrew}). Upgrade Quarters in Mansion!`);
          }
          calcDerived(p, now);
          const recruit = p.store?.agency?.find((c: any) => c.id === id);
          if (!recruit) throw new Error("Recruit no longer available");
          if (p.crew.some((x) => x.id === recruit.id) || p.store.bought.includes(recruit.id)) {
            throw new Error("Recruit already hired!");
          }
          const recruitDirtyCost = Math.max(5000, recruit.price || 5000);
          const recruitCleanCost = Math.max(1200, recruit.clean_price || 1200);

          if (recruit.elite) {
            if (BigInt(p.clean) < BigInt(recruitCleanCost)) throw new Error(`Need GH₵${recruitCleanCost.toLocaleString()} clean cedis for elite recruit`);
            p.clean = (BigInt(p.clean) - BigInt(recruitCleanCost)).toString();
          } else {
            if (BigInt(p.dirty) < BigInt(recruitDirtyCost)) throw new Error(`Recruit costs GH₵${recruitDirtyCost.toLocaleString()} dirty cedis`);
            p.dirty = (BigInt(p.dirty) - BigInt(recruitDirtyCost)).toString();
          }

          // Transfer recruit's randomly equipped gear items into player's inventory
          if (recruit.initial_gear && recruit.initial_gear.length > 0) {
            recruit.initial_gear.forEach((ig: any) => {
              if (!p.gear.some((g) => g.uid === ig.uid)) {
                p.gear.push({
                  uid: ig.uid,
                  id: ig.id,
                  source: "crew_recruit",
                  lvl: ig.lvl || 0,
                });
              }
            });
          }

          const dailyWage = recruit.daily_rate || calcCrewDailyRate(recruit);
          const hiredMember: CrewMember = {
            id: recruit.id,
            name: recruit.name,
            arch: recruit.arch,
            stats: { ...recruit.stats },
            strength: recruit.strength,
            flaw: recruit.flaw,
            front_trait: recruit.front_trait,
            origin: recruit.origin,
            bio: recruit.bio,
            temperament: recruit.temperament,
            specialty_biz: recruit.specialty_biz,
            trait_reason: recruit.trait_reason,
            morale: 90,
            xp: 0,
            lvl: recruit.lvl,
            assign: null,
            look: recruit.look,
            loadout: { ...(recruit.loadout || {}) },
            elite: recruit.elite,
            daily_rate: dailyWage,
            initial_gear: recruit.initial_gear,
          };
          p.crew.push(hiredMember);
          p.store.bought.push(id);
          gainXp(20);
          const equippedCount = Object.keys(hiredMember.loadout || {}).length;
          p.log.unshift({
            t: now,
            msg: `Hired ${recruit.name} (${recruit.arch.toUpperCase()}, Lv ${recruit.lvl})! Daily wage: GH₵${dailyWage}/day. Joined with ${equippedCount} pre-equipped item${equippedCount === 1 ? "" : "s"}!`,
            kind: "good",
          });
          return { ok: true, result: { crew: recruit.id, daily_rate: dailyWage } };
        }

        const bm = BM_MAP[id];
        const gear = GEAR_MAP[id];
        const cos = COSMETIC_MAP[id];

        if (storeType === "black_market" || bm) {
          const item = bm || BLACK_MARKET.find((x) => x.id === id);
          if (!item) throw new Error("Item not found");
          if (BigInt(p.dirty) < BigInt(item.price)) throw new Error("Not enough dirty cedis");
          p.dirty = (BigInt(p.dirty) - BigInt(item.price)).toString();
          p.inv[item.id] = (p.inv[item.id] || 0) + 1;
          p.store.bought.push(id);
          p.log.unshift({ t: now, msg: `Bought ${item.name} from Black Market`, kind: "good" });
          return { ok: true, result: { item: id } };
        }

        if (storeType === "gun_shop" || (gear && ["melee", "primary", "secondary"].includes(gear.slot))) {
          if (!gear) throw new Error("Weapon not found");
          if (BigInt(p.dirty) < BigInt(gear.price)) throw new Error("Not enough dirty cedis");
          p.dirty = (BigInt(p.dirty) - BigInt(gear.price)).toString();
          grantGear(p, gear.id, "shop");
          p.store.bought.push(id);
          p.log.unshift({ t: now, msg: `Acquired weapon: ${gear.name}! Check Locker.`, kind: "good" });
          return { ok: true, result: { item: id } };
        }

        if (storeType === "boutique") {
          const derived = calcDerived(p, now);
          const bItem = derived.store?.boutique?.find((b: any) => b.id === id);
          if (!bItem) throw new Error("Item not in Boutique catalog");
          const price = bItem.clean || 500;
          if (BigInt(p.clean) < BigInt(price)) throw new Error("Not enough clean cedis for designer item");
          p.clean = (BigInt(p.clean) - BigInt(price)).toString();
          grantGear(p, bItem.id, "boutique", bItem.tier2);
          if (!p.cosmetics.includes(bItem.id)) p.cosmetics.push(bItem.id);
          p.store.bought.push(id);
          gainXp(30);
          p.log.unshift({
            t: now,
            msg: `Purchased ${bItem.name}${bItem.tier2_cat ? ` [★ Tier 2: ${bItem.tier2_cat.name}]` : ""}! Check Locker.`,
            kind: "good",
          });
          return { ok: true, result: { item: id, tier2: bItem.tier2 } };
        }

        if (gear && ["hat", "top", "bottom", "shoes"].includes(gear.slot) || cos) {
          const price = gear?.price || cos?.clean || 500;
          if (BigInt(p.clean) < BigInt(price)) throw new Error("Not enough clean cedis");
          p.clean = (BigInt(p.clean) - BigInt(price)).toString();
          if (gear) grantGear(p, gear.id, "shop");
          if (cos && !p.cosmetics.includes(cos.id)) p.cosmetics.push(cos.id);
          p.store.bought.push(id);
          p.log.unshift({ t: now, msg: `Purchased fit: ${gear?.name || cos?.name}`, kind: "good" });
          return { ok: true, result: { item: id } };
        }

        throw new Error("Item not available in store");
      }

      case "dev_trigger_arrest": {
        triggerArrest(p, now);
        return { ok: true, result: { arrested: true, until: p.arrested_until } };
      }

      case "dev_post_bail": {
        p.arrested_until = 0;
        p.heat = 20;
        p.log.unshift({ t: now, msg: "Bail granted by Judge! Released from lockup.", kind: "good" });
        return { ok: true, result: { bailed: true } };
      }

      case "dev_trigger_heist_event": {
        if (!p.heists || p.heists.length === 0) throw new Error("No active heist running. Start a heist first!");
        const h = p.heists[0];
        if (!h.events) h.events = [];
        const evChoice = HEIST_EVENTS[Math.floor(Math.random() * HEIST_EVENTS.length)];
        const ev = {
          uid: uid(),
          event_id: evChoice.id,
          trigger_at: now,
          expires_at: now + 120,
          resolved: false,
        };
        h.events.unshift(ev);
        p.log.unshift({ t: now, msg: `[TACTICAL CRISIS TEST] ${evChoice.title} triggered!`, kind: "bad" });
        return { ok: true, result: { event: evChoice.title } };
      }

      case "dev_reset_heist_limit": {
        p.last_heist_day = "";
        p.log.unshift({ t: now, msg: "Daily Heist limit reset! Ready to start another heist today.", kind: "good" });
        return { ok: true, result: { reset: true } };
      }

      case "dev_add_crew_xp": {
        p.crew.forEach((c) => {
          c.xp += 250;
          c.morale = Math.min(100, (c.morale || 85) + 30);
          while (c.xp >= 30 * c.lvl) {
            c.xp -= 30 * c.lvl;
            c.lvl += 1;
            const prim = ARCHETYPES[c.arch] || "muscle";
            c.stats[prim] = Math.min(CREW_STAT_MAX, (c.stats[prim] || 5) + 1);
          }
        });
        p.log.unshift({ t: now, msg: "+250 EXP and +30 Morale granted to all crew members!", kind: "good" });
        return { ok: true, result: { xp_added: 250 } };
      }

      case "dev_restock_boutique": {
        p.store.offset = (p.store.offset || 0) + 1;
        p.store.bought = [];
        p.log.unshift({ t: now, msg: "Boutique restocked with fresh designer pieces and Tier 2 rolls!", kind: "good" });
        return { ok: true, result: { offset: p.store.offset } };
      }

      case "store_restock": {
        const cost = 250;
        if (BigInt(p.clean) < BigInt(cost)) throw new Error("Need GH₵250 clean cedis to restock");
        p.clean = (BigInt(p.clean) - BigInt(cost)).toString();
        p.store.offset = (p.store.offset || 0) + 1;
        p.store.bought = [];
        p.store.agency = undefined;
        p.log.unshift({ t: now, msg: "Bribed market runner to bring fresh stock & new recruits!", kind: "good" });
        return { ok: true, result: { restocked: true } };
      }

      case "gear_upgrade": {
        const uid = payload.uid;
        const g = p.gear.find((x) => x.uid === uid);
        if (!g) throw new Error("Gear not found");
        const def = GEAR_MAP[g.id];
        if (!def) throw new Error("Gear definition not found");
        if ((g.lvl || 0) >= WEAPON_MAX_LVL) throw new Error(`Weapon already at maximum level (+${WEAPON_MAX_LVL})`);
        const cost = Math.floor(def.price * 0.75 * Math.pow(1.5, g.lvl || 0));
        if (BigInt(p.dirty) < BigInt(cost)) throw new Error("Not enough dirty cedis for upgrade");
        p.dirty = (BigInt(p.dirty) - BigInt(cost)).toString();
        g.lvl = (g.lvl || 0) + 1;
        gainXp(10);
        p.log.unshift({ t: now, msg: `Upgraded ${def.name} to +${g.lvl}! Power increased.`, kind: "good" });
        return { ok: true, result: { lvl: g.lvl } };
      }

      case "sell_gear": {
        const uid = payload.uid;
        const idx = p.gear.findIndex((x) => x.uid === uid);
        if (idx === -1) throw new Error("Gear not found");
        const g = p.gear[idx];
        const def = GEAR_MAP[g.id];
        if (!def) throw new Error("Gear definition not found");

        const payout = Math.floor(def.price * SELL_RATE * (1 + 0.3 * (g.lvl || 0)));
        p.clean = (BigInt(p.clean) + BigInt(payout)).toString();
        p.gear.splice(idx, 1);

        // Remove from boss loadout
        Object.entries(p.loadout).forEach(([slot, itemUid]) => {
          if (itemUid === uid) delete p.loadout[slot];
        });
        // Remove from crew loadouts
        p.crew.forEach((c) => {
          Object.entries(c.loadout || {}).forEach(([slot, itemUid]) => {
            if (itemUid === uid) delete c.loadout[slot];
          });
        });

        p.log.unshift({ t: now, msg: `Sold ${def.name} for GH₵${payout.toLocaleString()} clean cash.`, kind: "good" });
        return { ok: true, result: { payout } };
      }

      case "sell_cosmetic": {
        const cosId = payload.id;
        const cos = COSMETIC_MAP[cosId];
        const idx = p.cosmetics.indexOf(cosId);
        if (idx === -1) throw new Error("Cosmetic not owned");
        p.cosmetics.splice(idx, 1);
        const payout = Math.floor((cos?.clean || 500) * 0.5);
        p.clean = (BigInt(p.clean) + BigInt(payout)).toString();
        Object.entries(p.equipped).forEach(([slot, equippedId]) => {
          if (equippedId === cosId) (p.equipped as any)[slot] = null;
        });
        p.log.unshift({ t: now, msg: `Sold cosmetic ${cos?.name || cosId} for GH₵${payout.toLocaleString()} clean.`, kind: "good" });
        return { ok: true, result: { payout } };
      }

      case "upgrade": {
        const key = payload.key;
        const up = UPGRADES[key];
        if (!up) throw new Error("Upgrade not found");
        const current = p.upgrades[key] || 0;
        if (current >= up.max) throw new Error("Already maxed level");
        const cost = Math.floor(up.cost * Math.pow(1.5, current));
        const cur = up.group === "mansion" ? "clean" : "dirty";
        if (BigInt(p[cur]) < BigInt(cost)) throw new Error(`Not enough ${cur} cedis for ${up.name}`);
        p[cur] = (BigInt(p[cur]) - BigInt(cost)).toString();
        p.upgrades[key] = current + 1;
        gainXp(12);
        progress("upgrade", 1);
        p.log.unshift({ t: now, msg: `Upgraded ${up.name} to Level ${current + 1}`, kind: "good" });
        return { ok: true, result: { lvl: current + 1 } };
      }

      case "hit_rival": {
        const rid = payload.rival || payload.rid;
        const rival = RIVAL_MAP[rid];
        if (!rival) throw new Error("Rival syndicate not found");
        if ((p.rival_cd[rid] || 0) > now) throw new Error("Rival corner is still on alert. Regrouping.");
        
        const myPower = calcPower(p);
        const rivalBasePower = getRivalPower(rival, p);
        const rivalVariance = 0.9 + Math.random() * 0.2; // 0.9 - 1.1
        const playerVariance = 0.95 + Math.random() * 0.15; // 0.95 - 1.1
        const effectiveRivalPower = Math.round(rivalBasePower * rivalVariance);
        const effectivePlayerPower = Math.round(myPower * playerVariance);
        const won = effectivePlayerPower >= effectiveRivalPower;

        progress("hit", 1);
        p.heat = Math.min(100, p.heat + 10);
        p.grudges[rid] = Math.min(100, (p.grudges[rid] || 0) + 15);
        p.rival_cd[rid] = now + 900; // 15 min corner lockdown

        const isBossOfWeek = RIVALS[Math.floor(now / (7 * 86400)) % RIVALS.length].id === rid;

        // Alliance solidarity pact: if grudge hits 50+, ally prepares or triggers counter-raid
        const currentGrudge = p.grudges[rid];
        let retaliated = false;
        const ally = RIVAL_MAP[rival.ally_id];

        if (currentGrudge >= 50 && ally) {
          p.grudges[ally.id] = Math.min(100, (p.grudges[ally.id] || 0) + 10);
          if (!p.raid && (p.shield_until || 0) <= now) {
            retaliated = true;
            const raidAttack = Math.floor(getRivalPower(ally, p) * 1.15 + 15);
            p.raid = {
              rival: ally.id,
              start: now,
              resolve_at: now + 50,
              attack: raidAttack,
              fortify: 0,
              taunt: `[MUTUAL DEFENSE PACT] ${ally.boss} (${ally.name}): "You assaulted our brothers ${rival.name}! The ${rival.bloc} will tear your compound apart!"`,
            };
            p.log.unshift({
              t: now,
              msg: `ALLIANCE SOLIDARITY RAID TRIGGERED! ${ally.name} mobilized to retaliate for ${rival.name}! Raid hits in 50s.`,
              kind: "bad",
            });
          }
        }

        if (won) {
          let loot = Math.floor(effectiveRivalPower * 18 + p.level * 100);
          if (isBossOfWeek) {
            loot *= 2; // Double loot for Boss of the Week!
          }
          p.dirty = (BigInt(p.dirty) + BigInt(loot)).toString();
          p.lifetime = (BigInt(p.lifetime) + BigInt(loot)).toString();
          gainXp(isBossOfWeek ? 45 : 20);
          p.season.points += isBossOfWeek ? 50 : 25;

          let dropName = "";
          const dropChance = isBossOfWeek ? 0.65 : 0.35;
          if (Math.random() < dropChance) {
            const pool = GEAR;
            const drop = pool[Math.floor(Math.random() * pool.length)];
            grantGear(p, drop.id, "reward");
            dropName = drop.name;
          }

          p.log.unshift({
            t: now,
            msg: `Hit landed on ${rival.name}! Defeated their crew (Your Pow: ${effectivePlayerPower} vs ${effectiveRivalPower}). Seized GH₵${loot.toLocaleString()} dirty cash${isBossOfWeek ? " (2x Boss of Week Bonus!)" : ""}.${dropName ? ` Loot drop: ${dropName}!` : ""}`,
            kind: "good",
          });
          return {
            ok: true,
            result: {
              won: true,
              loot,
              drop: dropName,
              bossOfWeek: isBossOfWeek,
              retaliated,
              playerPower: effectivePlayerPower,
              rivalPower: effectiveRivalPower,
            },
          };
        } else {
          p.log.unshift({
            t: now,
            msg: `Clashed with ${rival.name}! Their squad was too heavy (Your Pow: ${effectivePlayerPower} vs ${effectiveRivalPower}). Retreated under fire.`,
            kind: "bad",
          });
          return {
            ok: true,
            result: {
              won: false,
              retaliated,
              playerPower: effectivePlayerPower,
              rivalPower: effectiveRivalPower,
            },
          };
        }
      }

      case "truce_rival": {
        const rid = payload.rival || payload.rid;
        const rival = RIVAL_MAP[rid];
        if (!rival) throw new Error("Rival syndicate not found");
        const currentGrudge = p.grudges[rid] || 0;
        if (currentGrudge <= 0) throw new Error(`${rival.name} currently holds no grudge against you.`);
        
        const kind = payload.kind || "gift";
        if (kind === "treaty") {
          const costClean = Math.floor(250 + currentGrudge * 10);
          if (BigInt(p.clean) < BigInt(costClean)) {
            throw new Error(`Need GH₵${costClean.toLocaleString()} clean cedis for official diplomatic peace treaty`);
          }
          p.clean = (BigInt(p.clean) - BigInt(costClean)).toString();
          p.grudges[rid] = Math.max(0, currentGrudge - 50);
          if (rival.ally_id && p.grudges[rival.ally_id]) {
            p.grudges[rival.ally_id] = Math.max(0, p.grudges[rival.ally_id] - 25);
          }
          p.log.unshift({
            t: now,
            msg: `Signed peace treaty with ${rival.name}! Handed GH₵${costClean.toLocaleString()} clean tribute. Grudge dropped by 50 to ${p.grudges[rid]}/100.`,
            kind: "good",
          });
        } else {
          const costDirty = Math.floor(800 + currentGrudge * 20);
          if (BigInt(p.dirty) < BigInt(costDirty)) {
            throw new Error(`Need GH₵${costDirty.toLocaleString()} dirty cedis for street peace gift`);
          }
          p.dirty = (BigInt(p.dirty) - BigInt(costDirty)).toString();
          p.grudges[rid] = Math.max(0, currentGrudge - 25);
          p.log.unshift({
            t: now,
            msg: `Sent street peace offering to ${rival.name} (GH₵${costDirty.toLocaleString()} dirty). Grudge lowered to ${p.grudges[rid]}/100.`,
            kind: "good",
          });
        }
        return { ok: true, result: { grudge: p.grudges[rid] } };
      }

      case "assassin_contract": {
        const rid = payload.rival || payload.rid;
        const contractType = payload.contract || payload.contract_type || "sabotage";
        const rival = RIVAL_MAP[rid];
        if (!rival) throw new Error("Rival syndicate not found");
        const contract = ASSASSIN_CONTACT.contracts.find((c) => c.id === contractType);
        if (!contract) throw new Error("Invalid assassin contract tier");
        if (contract.cost_clean > 0 && BigInt(p.clean) < BigInt(contract.cost_clean)) {
          throw new Error(`Need GH₵${contract.cost_clean.toLocaleString()} clean cedis to contract ${ASSASSIN_CONTACT.name}`);
        }
        if (contract.cost_dirty > 0 && BigInt(p.dirty) < BigInt(contract.cost_dirty)) {
          throw new Error(`Need GH₵${contract.cost_dirty.toLocaleString()} dirty cedis to contract ${ASSASSIN_CONTACT.name}`);
        }
        if (contract.cost_clean > 0) p.clean = (BigInt(p.clean) - BigInt(contract.cost_clean)).toString();
        if (contract.cost_dirty > 0) p.dirty = (BigInt(p.dirty) - BigInt(contract.cost_dirty)).toString();
        if (!p.assassin_hits) p.assassin_hits = {};
        const durationSecs = (contract.duration_mins || 60) * 60;
        p.assassin_hits[rid] = {
          contract_type: contract.id,
          power_cut: contract.power_cut_pct,
          until: now + durationSecs,
        };

        if (contract.id === "sabotage") {
          p.grudges[rid] = Math.max(0, (p.grudges[rid] || 0) - (contract.grudge_drop || 30));
          p.rival_cd[rid] = Math.max(p.rival_cd[rid] || 0, now + (contract.lockdown_mins * 60));
          p.log.unshift({
            t: now,
            msg: `[ASSASSIN CONTRACT] Salifu "The Ghost" raided ${rival.name}'s supply depots! Power cut by 15%, corner locked down 30m, and grudge calmed (-${contract.grudge_drop}).`,
            kind: "good",
          });
        } else if (contract.id === "kneecap") {
          p.rival_cd[rid] = Math.max(p.rival_cd[rid] || 0, now + (contract.lockdown_mins * 60));
          p.grudges[rid] = Math.max(0, (p.grudges[rid] || 0) - (contract.grudge_drop || 50));
          p.log.unshift({
            t: now,
            msg: `[ASSASSIN CONTRACT] Salifu "The Ghost" neutralized key enforcers of ${rival.name}! Combat muscle slashed by 35% for 60m! Corner locked down 45m.`,
            kind: "good",
          });
        } else if (contract.id === "boss_hit") {
          p.grudges[rid] = 0;
          if (rival.ally_id && p.grudges[rival.ally_id]) {
            p.grudges[rival.ally_id] = Math.max(0, p.grudges[rival.ally_id] - 50);
          }
          p.rival_cd[rid] = Math.max(p.rival_cd[rid] || 0, now + (contract.lockdown_mins * 60));
          p.prestige.respect = (p.prestige.respect || 0) + 15;
          gainXp(50);
          p.log.unshift({
            t: now,
            msg: `[ARCHRIVAL HIT EXECUTED] Salifu "The Ghost" eliminated top command of ${rival.name}! Power gutted by 60%, grudge wiped clean, corner locked down 2 hours, +15 Syndicate Respect!`,
            kind: "good",
          });
        }
        return { ok: true, result: { rival: rid, contract: contract.id, until: p.assassin_hits[rid].until } };
      }

      case "confront_raid": {
        if (!p.raid) throw new Error("No active raid incoming");
        resolveRaid(p, now);
        return { ok: true, result: { resolved: true } };
      }

      case "fortify": {
        if (!p.raid) throw new Error("No active raid");
        if (p.raid.fortify >= 5) throw new Error("Max fortify reached for this raid");
        const cost = 500 + p.raid.fortify * 300;
        if (BigInt(p.dirty) < BigInt(cost)) throw new Error("Not enough dirty cedis to fortify");
        p.dirty = (BigInt(p.dirty) - BigInt(cost)).toString();
        p.raid.fortify += 1;
        p.log.unshift({ t: now, msg: `Fortified gates! +15 Defence against incoming raid.`, kind: "good" });
        return { ok: true, result: { fortify: p.raid.fortify } };
      }

      case "daily_claim": {
        if (p.daily?.login_claimed) throw new Error("Already claimed today");
        p.daily.login_claimed = true;
        const streak = p.streak.count + 1;
        p.streak.count = streak;
        p.streak.last_day = dayKey(now);
        const cleanReward = 100 * streak;
        p.clean = (BigInt(p.clean) + BigInt(cleanReward)).toString();
        p.pass.xp += 50;
        p.log.unshift({ t: now, msg: `Day ${streak} streak reward: +GH₵${cleanReward.toLocaleString()} clean & +50 Pass XP!`, kind: "good" });
        return { ok: true, result: { reward: cleanReward, clean: cleanReward, streak, grace_used: false } };
      }

      case "contract_claim": {
        const idx = payload.idx;
        const c = p.daily?.contracts?.[idx];
        if (!c) throw new Error("Contract not found");
        if (c.progress < c.target) throw new Error("Contract requirements not met");
        if (c.claimed) throw new Error("Already claimed");
        c.claimed = true;
        p.clean = (BigInt(p.clean) + BigInt(c.reward_clean)).toString();
        p.pass.xp += c.reward_pass;
        p.log.unshift({ t: now, msg: `Contract fulfilled: +GH₵${c.reward_clean.toLocaleString()} clean & +${c.reward_pass} Pass XP!`, kind: "good" });
        return { ok: true, result: { reward: c.reward_clean } };
      }

      case "pass_claim": {
        const { tier, track } = payload;
        const unlockedTier = Math.floor(p.pass.xp / PASS_XP_PER_TIER);
        if (tier > unlockedTier) throw new Error("Tier not reached yet");
        const isPrem = track === "prem" || track === "premium";
        if (isPrem && !p.pass.premium) throw new Error("Street Pass Premium required");

        const claimedList = isPrem ? p.pass.prem : p.pass.free;
        if (claimedList.includes(tier)) throw new Error("Already claimed");
        claimedList.push(tier);

        const cleanGift = tier * 300 + 200;
        p.clean = (BigInt(p.clean) + BigInt(cleanGift)).toString();
        p.log.unshift({ t: now, msg: `Street Pass Tier ${tier} (${track}) claimed: +GH₵${cleanGift.toLocaleString()} Clean!`, kind: "good" });
        return { ok: true, result: { tier, clean: cleanGift } };
      }

      case "prestige": {
        const gain = Math.max(1, Math.floor(Math.sqrt(Math.max(0, Number(p.lifetime || 0) / 1000000))));
        if (Number(p.lifetime || 0) < 500000) throw new Error("Need at least GH₵500,000 lifetime earnings to establish respect when retiring");
        p.prestige.count += 1;
        p.prestige.respect += gain;
        p.level = 1;
        p.xp = 0;
        p.dirty = "200";
        p.heat = 0;
        p.hustles = { okada: { lvl: 1, ts: now } };
        p.fronts = {};
        p.batches = [];
        p.heists = [];
        p.log.unshift({ t: now, msg: `Retired to the village. Gained +${gain} Syndicate Respect!`, kind: "good" });
        return { ok: true, result: { respect: gain } };
      }

      case "equip": {
        const { slot } = payload;
        const id = payload.cosmetic !== undefined ? payload.cosmetic : payload.id;
        if (p.equipped && slot in p.equipped) {
          (p.equipped as any)[slot] = id || null;
        }
        return { ok: true, result: { equipped: p.equipped } };
      }

      case "equip_gear": {
        const { target, slot, uid: itemUid } = payload;
        if (target === "boss") {
          p.loadout[slot] = itemUid || null;
        } else {
          const c = p.crew.find((x) => x.id === target);
          if (c) c.loadout[slot] = itemUid || null;
        }
        return { ok: true, result: { target, slot } };
      }

      case "set_avatar": {
        p.avatar = { ...p.avatar, ...payload };
        return { ok: true, result: { avatar: p.avatar } };
      }

      case "ad_reward": {
        const kind = payload.kind;
        if (kind === "double") {
          const bonus = Math.floor(parseInt(p.dirty) * 0.25) || 500;
          p.dirty = (BigInt(p.dirty) + BigInt(bonus)).toString();
          p.ads.double = true;
          return { ok: true, result: { earned: bonus.toString() } };
        } else if (kind === "heist_slot") {
          const today = dayKey(now);
          if (!p.heist_day || p.heist_day.day !== today) {
            p.heist_day = { day: today, count: 0, ad_extra: 0 };
          }
          p.heist_day.ad_extra = (p.heist_day.ad_extra || 0) + 1;
          p.log.unshift({
            t: now,
            msg: `Street broadcast ad viewed! +1 Heist Slot unlocked for today (${p.heist_day.count}/${DAILY_HEIST_BASE_LIMIT + p.heist_day.ad_extra}).`,
            kind: "good",
          });
          return { ok: true, result: { heist_slot: true, count: p.heist_day.count, max: DAILY_HEIST_BASE_LIMIT + p.heist_day.ad_extra } };
        } else {
          p.store.bought = [];
          p.ads.restock = true;
          return { ok: true, result: { restocked: true } };
        }
      }

      // Farm actions
      case "farm_buy_plot": {
        const plots = p.farm.plots || [];
        if (plots.length >= FARM.max_plots) throw new Error("Max farm plots reached");
        const cost = Math.floor(FARM.plot_cost * Math.pow(FARM.plot_growth, plots.length));
        if (BigInt(p.dirty) < BigInt(cost)) throw new Error("Not enough dirty cedis for farm plot");
        p.dirty = (BigInt(p.dirty) - BigInt(cost)).toString();
        plots.push({ idx: plots.length, strain: null, planted: 0, end: 0, yield: 0 });
        p.farm.plots = plots;
        p.log.unshift({ t: now, msg: `Cleared plot #${plots.length} for organic crops!`, kind: "good" });
        return { ok: true, result: { plots: plots.length } };
      }

      case "farm_upgrade": {
        const key = payload.key;
        const up = FARM.upgrades[key as keyof typeof FARM.upgrades];
        if (!up) throw new Error("Farm upgrade not found");
        const current = p.farm?.up?.[key] || 0;
        if (current >= up.max) throw new Error("Already maxed level");
        const cost = Math.floor(up.cost * Math.pow(1.8, current));
        if (BigInt(p.dirty) < BigInt(cost)) throw new Error("Not enough dirty cedis for greenhouse upgrade");
        p.dirty = (BigInt(p.dirty) - BigInt(cost)).toString();
        if (!p.farm.up) p.farm.up = {};
        p.farm.up[key] = current + 1;
        gainXp(10);
        p.log.unshift({ t: now, msg: `Upgraded ${up.name} to Level ${current + 1}`, kind: "good" });
        return { ok: true, result: { lvl: current + 1 } };
      }

      case "farm_plant": {
        const idx = payload.plot !== undefined ? payload.plot : payload.idx;
        const strain = payload.strain;
        const pl = p.farm.plots[idx];
        if (!pl) throw new Error("Plot not found");
        if (pl.strain) throw new Error("Plot already planted");
        const str = STRAIN_MAP[strain];
        if (!str) throw new Error("Strain not found");
        if (BigInt(p.dirty) < BigInt(str.seed)) throw new Error("Not enough dirty cedis for seeds");
        p.dirty = (BigInt(p.dirty) - BigInt(str.seed)).toString();

        const lightUp = p.farm.up?.lights || 0;
        const dur = Math.max(10, Math.floor(str.grow * (1 - lightUp * 0.1)));
        const irrUp = p.farm.up?.irrigation || 0;
        const yieldAmt = Math.floor((str.yield[0] + Math.random() * (str.yield[1] - str.yield[0])) * (1 + irrUp * 0.15));

        pl.strain = strain;
        pl.start = now;
        pl.planted = now;
        pl.end = now + dur;
        pl.yield = yieldAmt;
        p.log.unshift({ t: now, msg: `Planted ${str.name} on plot #${idx + 1}.`, kind: "info" });
        return { ok: true, result: { plot: idx, strain } };
      }

      case "farm_harvest": {
        if (payload.plot === "all") {
          const harvestMap: Record<string, number> = {};
          let totalYield = 0;
          p.farm.plots.forEach((pl, i) => {
            if (pl.strain && now >= pl.end) {
              const s = pl.strain;
              const y = pl.yield;
              p.farm.stash[s] = (p.farm.stash[s] || 0) + y;
              harvestMap[s] = (harvestMap[s] || 0) + y;
              totalYield += y;
              pl.strain = null;
              pl.start = 0;
              pl.planted = 0;
              pl.end = 0;
              pl.yield = 0;
            }
          });
          gainXp(25);
          p.log.unshift({ t: now, msg: `Harvested all crops (${totalYield} total units) into stash!`, kind: "good" });
          return { ok: true, result: { harvest: harvestMap, total: totalYield } };
        }

        const idx = payload.plot !== undefined ? payload.plot : payload.idx;
        const pl = p.farm.plots[idx];
        if (!pl || !pl.strain) throw new Error("Nothing to harvest");
        if (now < pl.end) throw new Error("Crops still maturing");
        const s = pl.strain;
        const y = pl.yield;
        p.farm.stash[s] = (p.farm.stash[s] || 0) + y;
        pl.strain = null;
        pl.start = 0;
        pl.planted = 0;
        pl.end = 0;
        pl.yield = 0;
        gainXp(15);
        p.log.unshift({ t: now, msg: `Harvested ${y} bunches of ${STRAIN_MAP[s]?.name || s}! Stashed for sale.`, kind: "good" });
        return { ok: true, result: { strain: s, amount: y, harvest: { [s]: y } } };
      }

      case "farm_sell": {
        const { strain } = payload;
        const count = p.farm.stash[strain] || 0;
        if (count <= 0) throw new Error("No crop in stash to sell");
        const str = STRAIN_MAP[strain];
        const earned = count * str.price;
        // Farm revenue is street cash / dirty money!
        p.dirty = (BigInt(p.dirty) + BigInt(earned)).toString();
        p.lifetime = (BigInt(p.lifetime) + BigInt(earned)).toString();
        p.farm.stash[strain] = 0;
        const ghUp = p.farm.up?.greenhouse || 0;
        const heatGain = Math.max(1, Math.floor(str.heat * (1 - ghUp * 0.2)));
        p.heat = Math.min(100, p.heat + heatGain);
        gainXp(15);
        p.log.unshift({
          t: now,
          msg: `Sold ${count} units of ${str.name} on the street for GH₵${earned.toLocaleString()} dirty cedis! Wash it through your fronts.`,
          kind: "good",
        });
        return { ok: true, result: { earned, cash: earned, dirty: earned } };
      }

      // Crew actions
      case "crew_train": {
        const cid = payload.crew_id || payload.cid;
        const stat = payload.stat;
        if (!stat || !["brains", "wheels", "muscle", "stealth"].includes(stat)) {
          throw new Error("Invalid stat to train. Choose Brains, Wheels, Muscle, or Stealth.");
        }
        const c = p.crew.find((x) => x.id === cid);
        if (!c) throw new Error("Crew member not found");
        if ((c.stats[stat] || 0) >= CREW_STAT_MAX) {
          throw new Error(`${stat.toUpperCase()} is already maxed at ${CREW_STAT_MAX}!`);
        }
        const currentVal = c.stats[stat] || 1;
        const cost = Math.floor(250 * (currentVal ** 2) * (1 + (c.lvl || 1) / 10));
        if (BigInt(p.dirty) < BigInt(cost)) {
          throw new Error(`Need GH₵${cost.toLocaleString()} dirty cedis to train ${c.name}`);
        }
        p.dirty = (BigInt(p.dirty) - BigInt(cost)).toString();
        c.stats[stat] = currentVal + 1;
        c.xp = (c.xp || 0) + 15;
        while (c.xp >= 30 * c.lvl) {
          c.xp -= 30 * c.lvl;
          c.lvl += 1;
        }
        c.morale = Math.min(100, (c.morale || 85) + 5);
        p.log.unshift({
          t: now,
          msg: `Trained ${c.name}! ${stat.toUpperCase()} upgraded to ${c.stats[stat]} (+15 EXP).`,
          kind: "good",
        });
        return { ok: true, result: { stat, value: c.stats[stat], xp: c.xp, lvl: c.lvl } };
      }

      case "crew_bonus": {
        const cid = payload.crew_id || payload.cid;
        const c = p.crew.find((x) => x.id === cid);
        if (!c) throw new Error("Crew member not found");
        const isClean = payload.currency === "clean";
        if (isClean) {
          const cost = 400;
          if (BigInt(p.clean) < BigInt(cost)) throw new Error(`Need GH₵${cost.toLocaleString()} clean cedis for luxury bonus`);
          p.clean = (BigInt(p.clean) - BigInt(cost)).toString();
          c.morale = Math.min(100, (c.morale || 85) + 40);
        } else {
          const cost = 1000;
          if (BigInt(p.dirty) < BigInt(cost)) throw new Error(`Need GH₵${cost.toLocaleString()} dirty cedis for street bonus`);
          p.dirty = (BigInt(p.dirty) - BigInt(cost)).toString();
          c.morale = Math.min(100, (c.morale || 85) + 25);
        }
        p.log.unshift({
          t: now,
          msg: `Paid bonus to ${c.name}! Morale rose to ${c.morale}%. Loyalty strengthened!`,
          kind: "good",
        });
        return { ok: true, result: { morale: c.morale } };
      }

      case "assign_front": {
        const { fid, cid } = payload;
        const f = FRONT_MAP[fid];
        if (!f) throw new Error("Front business not found");
        if (cid) {
          const c = p.crew.find((x) => x.id === cid);
          if (!c) throw new Error("Crew member not found");
          if (c.assign && !c.assign.startsWith("front:")) {
            throw new Error(`${c.name} is already busy (${c.assign})`);
          }
          // Remove previous manager of this front if any
          const prevCid = p.front_assign?.[fid];
          if (prevCid) {
            const prev = p.crew.find((x) => x.id === prevCid);
            if (prev) prev.assign = null;
          }
          c.assign = `front:${fid}`;
          if (!p.front_assign) p.front_assign = {};
          p.front_assign[fid] = cid;
          const trait = CREW_FRONT_TRAITS.find((t) => t.id === c.front_trait);
          const isSynergy = c.specialty_biz === fid;
          p.log.unshift({
            t: now,
            msg: `Assigned ${c.name} (${c.origin || "Operative"}) as manager of ${f.name}! Active trait: ${trait?.name || "Manager"} (${trait?.desc || ""})${isSynergy ? " ★ PERFECT FIT SYNERGY (+15%)" : ""}`,
            kind: "good",
          });
          return { ok: true, result: { front: fid, crew: cid } };
        } else {
          const prevCid = p.front_assign?.[fid];
          if (prevCid) {
            const prev = p.crew.find((x) => x.id === prevCid);
            if (prev) prev.assign = null;
            delete p.front_assign[fid];
          }
          p.log.unshift({ t: now, msg: `Unassigned manager from ${f.name}.`, kind: "info" });
          return { ok: true, result: { front: fid, crew: null } };
        }
      }

      case "assign_hustle": {
        const { hid, cid } = payload;
        const h = HUSTLE_MAP[hid];
        if (!h) throw new Error("Hustle business not found");
        if (cid) {
          const c = p.crew.find((x) => x.id === cid);
          if (!c) throw new Error("Crew member not found");
          if (c.assign && !c.assign.startsWith("hustle:")) {
            throw new Error(`${c.name} is already busy (${c.assign})`);
          }
          const prevCid = p.hustle_assign?.[hid];
          if (prevCid) {
            const prev = p.crew.find((x) => x.id === prevCid);
            if (prev) prev.assign = null;
          }
          c.assign = `hustle:${hid}`;
          if (!p.hustle_assign) p.hustle_assign = {};
          p.hustle_assign[hid] = cid;
          const trait = CREW_FRONT_TRAITS.find((t) => t.id === c.front_trait);
          const isSynergy = c.specialty_biz === hid;
          p.log.unshift({
            t: now,
            msg: `Assigned ${c.name} (${c.origin || "Operative"}) to run ${h.name}! Active trait: ${trait?.name || "Manager"}${isSynergy ? " ★ PERFECT MATCH SYNERGY (+20%)" : ""}`,
            kind: "good",
          });
          return { ok: true, result: { hustle: hid, crew: cid } };
        } else {
          const prevCid = p.hustle_assign?.[hid];
          if (prevCid) {
            const prev = p.crew.find((x) => x.id === prevCid);
            if (prev) prev.assign = null;
            delete p.hustle_assign[hid];
          }
          p.log.unshift({ t: now, msg: `Unassigned manager from ${h.name}.`, kind: "info" });
          return { ok: true, result: { hustle: hid, crew: null } };
        }
      }

      case "heist_ad_slot": {
        const today = dayKey(now);
        if (!p.heist_day || p.heist_day.day !== today) {
          p.heist_day = { day: today, count: 0, ad_extra: 0 };
        }
        p.heist_day.ad_extra = (p.heist_day.ad_extra || 0) + 1;
        p.log.unshift({
          t: now,
          msg: `Street broadcast ad viewed! +1 Heist Slot unlocked for today (${p.heist_day.count}/${DAILY_HEIST_BASE_LIMIT + p.heist_day.ad_extra}).`,
          kind: "good",
        });
        return { ok: true, result: { count: p.heist_day.count, max: DAILY_HEIST_BASE_LIMIT + p.heist_day.ad_extra } };
      }

      case "post_bail": {
        if (!p.arrested_until || now >= p.arrested_until) throw new Error("You are not currently in police custody");
        const cost = 2000;
        if (BigInt(p.clean) < BigInt(cost) && (p.inv.lawyer || 0) < 1) {
          throw new Error(`Need GH₵${cost.toLocaleString()} clean cedis or 1 Lawyer Shield to post bail`);
        }
        if ((p.inv.lawyer || 0) >= 1) {
          p.inv.lawyer -= 1;
          p.log.unshift({ t: now, msg: "Your attorney filed an emergency bail motion! Released from custody immediately.", kind: "good" });
        } else {
          p.clean = (BigInt(p.clean) - BigInt(cost)).toString();
          p.log.unshift({ t: now, msg: `Bail of GH₵${cost.toLocaleString()} clean cedis posted with the court. Released from custody!`, kind: "good" });
        }
        p.arrested_until = 0;
        p.heat = 20;
        p.heat_ts = now;
        return { ok: true, result: { released: true } };
      }

      case "upgrade_facility": {
        const fid = payload.facility_id;
        const fac = MANSION_FACILITIES[fid];
        if (!fac) throw new Error("Compound facility not found");
        if (!p.facilities) p.facilities = {};
        const curLvl = p.facilities[fid] || 0;
        if (curLvl >= fac.max) throw new Error(`${fac.name} is already at maximum level (${fac.max})`);
        const costDirty = Math.floor(fac.base_cost_dirty * Math.pow(1.7, curLvl));
        const costClean = Math.floor(fac.base_cost_clean * Math.pow(1.8, curLvl));
        if (BigInt(p.dirty) < BigInt(costDirty)) throw new Error(`Need GH₵${costDirty.toLocaleString()} dirty cash for construction materials`);
        if (BigInt(p.clean) < BigInt(costClean)) throw new Error(`Need GH₵${costClean.toLocaleString()} clean cash for city permits and specialist contractors`);
        p.dirty = (BigInt(p.dirty) - BigInt(costDirty)).toString();
        p.clean = (BigInt(p.clean) - BigInt(costClean)).toString();
        p.facilities[fid] = curLvl + 1;
        gainXp(35);
        p.log.unshift({
          t: now,
          msg: `Expanded compound! ${fac.name} upgraded to Level ${curLvl + 1}. Base perks unlocked!`,
          kind: "good",
        });
        return { ok: true, result: { facility: fid, lvl: p.facilities[fid] } };
      }

      case "upgrade_boss_perk": {
        const perkId = payload.perk_id;
        const perk = BOSS_PERKS[perkId];
        if (!perk) throw new Error("Boss perk not found");
        if ((p.skill_points || 0) < 1) throw new Error("No Boss Skill Points available. Level up to earn more!");
        if (!p.boss_perks) p.boss_perks = {};
        const curRank = p.boss_perks[perkId] || 0;
        if (curRank >= perk.max) throw new Error(`${perk.name} already at maximum rank (${perk.max})`);
        p.skill_points -= 1;
        p.boss_perks[perkId] = curRank + 1;
        p.log.unshift({
          t: now,
          msg: `Boss unlocked rank ${curRank + 1} in ${perk.name}! ${perk.desc}.`,
          kind: "good",
        });
        return { ok: true, result: { perk: perkId, rank: p.boss_perks[perkId], skill_points: p.skill_points } };
      }

      case "crew_rehab": {
        const cid = payload.crew_id || payload.cid;
        const c = p.crew.find((x) => x.id === cid);
        if (!c) throw new Error("Crew member not found");
        const infirmaryLvl = p.facilities?.infirmary || 0;
        const discount = infirmaryLvl > 0 ? 0.75 : 1.0;
        const cost = Math.floor(800 * c.lvl * discount);
        if (BigInt(p.clean) < BigInt(cost)) throw new Error(`Need GH₵${cost.toLocaleString()} clean cedis for specialist rehab`);
        p.clean = (BigInt(p.clean) - BigInt(cost)).toString();
        c.flaw = "none";
        c.morale = Math.min(100, (c.morale || 85) + 30);
        p.log.unshift({ t: now, msg: `${c.name} completed rehab and cleared their street flaw!`, kind: "good" });
        return { ok: true, result: { cleared: true } };
      }

      case "crew_dismiss": {
        const cid = payload.crew_id || payload.cid;
        if (p.crew.length <= 1) throw new Error("Cannot dismiss your last crew member");
        const dismissed = p.crew.find((x) => x.id === cid);
        p.crew = p.crew.filter((x) => x.id !== cid);
        Object.keys(p.front_assign || {}).forEach((fid) => {
          if (p.front_assign[fid] === cid) delete p.front_assign[fid];
        });
        Object.keys(p.hustle_assign || {}).forEach((hid) => {
          if (p.hustle_assign[hid] === cid) delete p.hustle_assign[hid];
        });
        if (p.rentals) {
          p.rentals = p.rentals.filter((l) => l.crew_id !== cid);
        }
        p.log.unshift({ t: now, msg: `Dismissed ${dismissed?.name || "crew member"} from the syndicate.`, kind: "info" });
        return { ok: true, result: { dismissed: true } };
      }

      // DEV CHEATS / TESTING SHORTCUTS
      case "dev_add_cash": {
        const amt = payload.dirty ? payload.dirty : "50000";
        const cleanAmt = payload.clean ? payload.clean : "25000";
        p.dirty = (BigInt(p.dirty) + BigInt(amt)).toString();
        p.clean = (BigInt(p.clean) + BigInt(cleanAmt)).toString();
        p.lifetime = (BigInt(p.lifetime) + BigInt(amt)).toString();
        p.log.unshift({ t: now, msg: `[TEST CHEAT] Added GH₵${parseInt(amt).toLocaleString()} dirty & GH₵${parseInt(cleanAmt).toLocaleString()} clean!`, kind: "good" });
        return { ok: true, result: { dirty: p.dirty, clean: p.clean } };
      }

      case "dev_speed_timers": {
        p.batches.forEach((b) => (b.end = now - 1));
        p.heists.forEach((h) => (h.end = now - 1));
        p.farm?.plots?.forEach((pl) => (pl.end = now - 1));
        p.log.unshift({ t: now, msg: `[TEST CHEAT] Finished all active timers instantly!`, kind: "good" });
        return { ok: true, result: { ready: true } };
      }

      case "dev_trigger_raid": {
        const rival = RIVALS[Math.floor(Math.random() * RIVALS.length)];
        p.raid = {
          rival: rival.id,
          start: now,
          resolve_at: now + 45,
          attack: Math.floor(calcPower(p) * 0.95) + 15,
          fortify: 0,
          taunt: FALLBACK_TAUNTS[Math.floor(Math.random() * FALLBACK_TAUNTS.length)],
        };
        p.log.unshift({ t: now, msg: `[TEST CHEAT] Triggered test raid from ${rival.name}! Incoming in 45s.`, kind: "bad" });
        return { ok: true, result: { raid: p.raid } };
      }

      case "dev_trigger_arrest": {
        triggerArrest(p, now);
        return { ok: true, result: { arrested_until: p.arrested_until } };
      }

      case "dev_trigger_alliance_raid": {
        const r = RIVALS[Math.floor(Math.random() * RIVALS.length)];
        const ally = RIVAL_MAP[r.ally_id] || RIVALS[0];
        const combinedPow = Math.floor(calcPower(p) * 1.3) + 25;
        p.raid = {
          rival: ally.id,
          start: now,
          resolve_at: now + 45,
          attack: combinedPow,
          fortify: 0,
          taunt: `[ALLIANCE RAID] ${ally.boss} (${ally.name}) & ${r.boss} (${r.name}): "You messed with the ${r.bloc}! Our alliance strikes together!"`,
        };
        p.log.unshift({
          t: now,
          msg: `[TEST CHEAT] Triggered Alliance Raid from ${ally.name} & ${r.name}!`,
          kind: "bad",
        });
        return { ok: true, result: { raid: p.raid } };
      }

      case "dev_reset_heist_limit": {
        p.last_heist_day = "";
        p.log.unshift({ t: now, msg: "[TEST CHEAT] Reset daily heist limit. You can launch another heist now!", kind: "good" });
        return { ok: true, result: { ready: true } };
      }

      case "dev_add_crew_xp": {
        p.crew.forEach((c) => {
          c.xp += payload.xp || 100;
          c.morale = Math.min(100, (c.morale || 85) + 20);
          while (c.xp >= 30 * c.lvl) {
            c.xp -= 30 * c.lvl;
            c.lvl += 1;
            const prim = ARCHETYPES[c.arch] || "muscle";
            c.stats[prim] = Math.min(CREW_STAT_MAX, (c.stats[prim] || 5) + 1);
          }
        });
        p.log.unshift({ t: now, msg: `[TEST CHEAT] Granted +${payload.xp || 100} EXP to all crew members!`, kind: "good" });
        return { ok: true, result: { crew: p.crew } };
      }

      case "dev_clear_heat": {
        p.heat = 0;
        p.arrested_until = 0;
        p.log.unshift({ t: now, msg: `[TEST CHEAT] Cleared all heat and ended any police arrest.`, kind: "good" });
        return { ok: true, result: { heat: 0 } };
      }

      case "dev_add_xp": {
        gainXp(payload.xp || 200);
        p.pass.xp += payload.pass || 150;
        p.log.unshift({ t: now, msg: `[TEST CHEAT] Added ${payload.xp || 200} XP & ${payload.pass || 150} Pass XP.`, kind: "good" });
        return { ok: true, result: { level: p.level } };
      }

      case "dev_set_grudges": {
        const val = payload.val !== undefined ? payload.val : 60;
        RIVALS.forEach((r) => {
          p.grudges[r.id] = val;
        });
        p.log.unshift({ t: now, msg: `[TEST CHEAT] Set all rival grudges to ${val}/100! Alliance war pacts active.`, kind: val >= 50 ? "bad" : "good" });
        return { ok: true, result: { grudges: p.grudges } };
      }

      case "dev_assassin_hit": {
        const rid = payload.rival || RIVALS[0].id;
        if (!p.assassin_hits) p.assassin_hits = {};
        p.assassin_hits[rid] = {
          contract_type: "boss_hit",
          power_cut: 0.60,
          until: now + 3600,
        };
        p.log.unshift({ t: now, msg: `[TEST CHEAT] Assassin contract (Boss Hit) applied to ${rid} for 1 hour!`, kind: "good" });
        return { ok: true, result: { hit: p.assassin_hits[rid] } };
      }

      default:
        throw new Error(`Unknown action: ${type}`);
    }
  } catch (err: any) {
    return { ok: false, error: err.message || "Action failed" };
  }
}
