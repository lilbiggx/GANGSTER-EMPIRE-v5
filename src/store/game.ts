import { create } from "zustand";
import { toast } from "sonner";
import {
  DISTRICTS,
  HUSTLES,
  FRONTS,
  HEISTS,
  RIVALS,
  UPGRADES,
  BLACK_MARKET,
  COSMETICS,
  GEAR,
  STRAINS,
  FARM,
  ROLES,
  ARCHETYPES,
  ROLE_ARCH,
  STRENGTHS,
  FLAWS,
  HEIST_APPROACHES,
  HEIST_PREP,
  FALLBACK_NEWS,
  AVATAR_OPTIONS,
  SELL_RATE,
  WEAPON_MAX_LVL,
  CREW_STAT_MAX,
  PASS_TIERS,
  PASS_XP_PER_TIER,
  CREW_FRONT_TRAITS,
  MANSION_FACILITIES,
  BOSS_PERKS,
  HEIST_EVENTS,
  TIER2_CATEGORIES,
  BOUTIQUE_SUBCATEGORIES,
  BOUTIQUE_CATALOG,
  ALL_GEAR_ITEMS,
  CREW_BACKGROUNDS,
  DAILY_HEIST_BASE_LIMIT,
  ASSASSIN_CONTACT,
} from "../data/gameData";
import {
  Player,
  createPlayer,
  calcDerived,
  executeAction,
  tickPlayer,
} from "../engine/gameEngine";
import { big } from "../lib/fmt";

const SAVE_KEY = "uw_offline_player_v2";
const callbacks: Record<string, (res: any) => void> = {};
let tapBuf = 0;
let tapTimer: any = null;

const GAME_CONFIG = {
  districts: DISTRICTS,
  hustles: HUSTLES,
  fronts: FRONTS,
  heists: HEISTS,
  rivals: RIVALS,
  upgrades: UPGRADES,
  black_market: BLACK_MARKET,
  cosmetics: COSMETICS,
  gear: ALL_GEAR_ITEMS,
  strains: STRAINS,
  farm: FARM,
  roles: ROLES,
  archetypes: ARCHETYPES,
  role_arch: ROLE_ARCH,
  strengths: STRENGTHS,
  flaws: FLAWS,
  approaches: HEIST_APPROACHES,
  prep: HEIST_PREP,
  avatar_options: AVATAR_OPTIONS,
  sell_rate: SELL_RATE,
  weapon_slots: ["melee", "primary", "secondary"],
  weapon_max_lvl: WEAPON_MAX_LVL,
  crew_stat_max: CREW_STAT_MAX,
  crew_front_traits: CREW_FRONT_TRAITS,
  crew_backgrounds: CREW_BACKGROUNDS,
  daily_heist_base_limit: DAILY_HEIST_BASE_LIMIT,
  mansion_facilities: MANSION_FACILITIES,
  boss_perks: BOSS_PERKS,
  tier2_categories: TIER2_CATEGORIES,
  boutique_subcategories: BOUTIQUE_SUBCATEGORIES,
  boutique_catalog: BOUTIQUE_CATALOG,
  heist_events: HEIST_EVENTS,
  assassin_contact: ASSASSIN_CONTACT,
  pass: {
    tiers: PASS_TIERS,
    xp_per_tier: PASS_XP_PER_TIER,
    free: Array.from({ length: PASS_TIERS }).map((_, i) => {
      const t = i + 1;
      if (t % 5 === 0) return { timeskip: true };
      return { clean: 300 * t };
    }),
    prem: Array.from({ length: PASS_TIERS }).map((_, i) => {
      const t = i + 1;
      if (t === 10) return { cosmetic: "car_v8" };
      if (t === 20) return { cosmetic: "drip_gold" };
      if (t === 30) return { cosmetic: "decor_stool" };
      if (t % 3 === 0) return { timeskip: true };
      return { clean: 1000 * t };
    }),
  },
};

interface GameState {
  config: typeof GAME_CONFIG;
  player: Player | null;
  derived: any;
  offset: number;
  welcome: any;
  news: string[];
  loaded: boolean;
  noPlayer: boolean;
  queue: any[];
  syncing: boolean;
  online: boolean;
  ad: string | null;
  tab: string;
  more: string | null;
  lockerTarget: string;
  now: () => number;
  setTab: (tab: string) => void;
  openMore: (more: string) => void;
  showAd: (kind: string) => void;
  closeAd: () => void;
  setLockerTarget: (target: string) => void;
  openLocker: (target: string) => void;
  dismissWelcome: () => void;
  load: () => Promise<void>;
  createOfflineBoss: (name?: string, district?: string, preset?: "newbie" | "mid" | "kingpin") => void;
  logout: () => void;
  apply: (res: any) => void;
  act: (type: string, payload?: any, opts?: { optimistic?: (p: any, state: any) => void; onResult?: (res: any) => void }) => string;
  tap: () => void;
  save: () => void;
}

export const useGame = create<GameState>((set, get) => ({
  config: GAME_CONFIG,
  player: null,
  derived: null,
  offset: 0,
  welcome: null,
  news: FALLBACK_NEWS,
  loaded: false,
  noPlayer: false,
  queue: [],
  syncing: false,
  online: true,
  ad: null,
  tab: localStorage.getItem("uw_tab") || "empire",
  more: null,
  lockerTarget: "boss",

  apply: (res: any) => {
    if (!res) return;
    set((st) => ({
      player: res.patch ? { ...st.player, ...res.patch } : st.player,
      derived: res.derived || st.derived,
    }));
    get().save();
  },

  now: () => Date.now() / 1000 + get().offset,

  setTab: (tab) => {
    localStorage.setItem("uw_tab", tab);
    set({ tab, more: null });
  },

  openMore: (more) => {
    localStorage.setItem("uw_tab", "more");
    set({ tab: "more", more });
  },

  showAd: (kind) => set({ ad: kind }),
  closeAd: () => set({ ad: null }),
  setLockerTarget: (lockerTarget) => set({ lockerTarget }),
  openLocker: (lockerTarget) => {
    localStorage.setItem("uw_tab", "more");
    set({ tab: "more", more: "locker", lockerTarget });
  },
  dismissWelcome: () => set({ welcome: null }),

  save: () => {
    const { player } = get();
    if (player) {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(player));
      } catch (e) {
        console.error("Save error:", e);
      }
    }
  },

  async load() {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (!saved) {
        set({
          config: GAME_CONFIG,
          player: null,
          derived: null,
          loaded: true,
          noPlayer: true,
        });
        return;
      }

      const p: Player = JSON.parse(saved);
      const now = Date.now() / 1000;
      tickPlayer(p, now);
      const d = calcDerived(p, now);

      set({
        config: GAME_CONFIG,
        player: p,
        derived: d,
        loaded: true,
        noPlayer: false,
      });
      get().save();
    } catch (err) {
      console.error("Error loading offline player:", err);
      set({ config: GAME_CONFIG, player: null, derived: null, loaded: true, noPlayer: true });
    }
  },

  createOfflineBoss(name = "Kojo Bullet", district = "dockside", preset = "newbie") {
    const p = createPlayer(`boss_${Date.now()}`, name, district, preset);
    const now = Date.now() / 1000;
    const d = calcDerived(p, now);
    set({
      config: GAME_CONFIG,
      player: p,
      derived: d,
      loaded: true,
      noPlayer: false,
      tab: "empire",
      more: null,
    });
    localStorage.setItem(SAVE_KEY, JSON.stringify(p));
    toast.success(`Akwaaba, Boss ${p.name}! Your offline empire is live.`);
  },

  logout() {
    localStorage.removeItem(SAVE_KEY);
    set({ player: null, derived: null, noPlayer: true });
    toast.info("Logged out from street command.");
  },

  act(type, payload = {}, { optimistic, onResult } = {}) {
    const actionId = Math.random().toString(36).slice(2);
    const state = get();
    if (!state.player) return actionId;

    if (optimistic) {
      const clone = JSON.parse(JSON.stringify(state.player));
      optimistic(clone, state);
      set({ player: clone, derived: calcDerived(clone, Date.now() / 1000) });
    }

    if (onResult) callbacks[actionId] = onResult;

    // Execute immediately in engine
    const now = Date.now() / 1000;
    const playerClone = JSON.parse(JSON.stringify(get().player));
    const outcome = executeAction(playerClone, type, payload, now);

    if (outcome.ok) {
      const d = calcDerived(playerClone, now);
      set({ player: playerClone, derived: d });
      get().save();
      if (callbacks[actionId]) {
        callbacks[actionId](outcome.result);
        delete callbacks[actionId];
      }
    } else {
      toast.error(outcome.error || "Action failed");
      // Revert optimistic if failed
      get().load();
    }

    return actionId;
  },

  tap() {
    const { player, derived } = get();
    if (!player || !derived) return;
    tapBuf += 1;
    const added = big(derived.tap_value);
    set({
      player: {
        ...player,
        dirty: (big(player.dirty) + added).toString(),
        lifetime: (big(player.lifetime) + added).toString(),
      },
    });

    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => {
      const count = tapBuf;
      tapBuf = 0;
      get().act("tap", { count });
    }, 600);
  },
}));

// Background tick every 1.5 seconds for timers, heat settling & idle accrual
setInterval(() => {
  const state = useGame.getState();
  if (state.player) {
    const now = Date.now() / 1000;
    tickPlayer(state.player, now);
    const d = calcDerived(state.player, now);
    useGame.setState({ derived: d });
  }
}, 1500);

// Auto-save every 10 seconds
setInterval(() => {
  useGame.getState().save();
}, 10000);
