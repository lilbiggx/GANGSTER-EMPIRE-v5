import { lazy, Suspense } from "react";
import { ArrowLeft, CalendarCheck, Skull, Swords, Sword, Trophy, Handshake, Map, Ticket, ShoppingBag, Shirt, Settings, Home, Sprout } from "lucide-react";
import { useGame } from "../../store/game";

const VIEWS = {
  locker: { label: "Boss & Locker", icon: Sword, C: lazy(() => import("./more/Locker")) },
  mansion: { label: "Compound & Base", icon: Home, C: lazy(() => import("./more/Mansion")) },
  farm: { label: "Grow Farm", icon: Sprout, C: lazy(() => import("./more/Farm")) },
  daily: { label: "Daily & Streak", icon: CalendarCheck, C: lazy(() => import("./more/Daily")) },
  rivals: { label: "Rival Syndicates", icon: Skull, C: lazy(() => import("./more/Rivals")) },
  pvp: { label: "Turf War (PvP)", icon: Swords, C: lazy(() => import("./more/Turf")) },
  leaderboard: { label: "Leaderboards", icon: Trophy, C: lazy(() => import("./more/Leaderboard")) },
  mercs: { label: "Mercenary Market", icon: Handshake, C: lazy(() => import("./more/Mercs")) },
  season: { label: "Season Map", icon: Map, C: lazy(() => import("./more/Season")) },
  pass: { label: "Street Pass", icon: Ticket, C: lazy(() => import("./more/Pass")) },
  shop: { label: "Shop", icon: ShoppingBag, C: lazy(() => import("./more/Shop")) },
  wardrobe: { label: "Drip & Rides", icon: Shirt, C: lazy(() => import("./more/Wardrobe")) },
  prestige: { label: "Retire to the Village", icon: Home, C: lazy(() => import("./more/Prestige")) },
  settings: { label: "Settings & Alerts", icon: Settings, C: lazy(() => import("./more/Settings")) },
};

export default function More() {
  const { more, openMore, player: p } = useGame();
  const v = VIEWS[more];
  if (v) {
    return (
      <div>
        <button onClick={() => openMore(null)} className="btn-press mt-3 flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 hover:text-gold" data-testid="more-back-btn">
          <ArrowLeft className="h-4 w-4" />Back
        </button>
        <Suspense fallback={<div className="p-6 text-xs text-zinc-500">Loading...</div>}><v.C /></Suspense>
      </div>
    );
  }
  const now = Date.now() / 1000;
  const badge = {
    daily: !p.daily.login_claimed || p.daily.contracts.some((c) => c.progress >= c.target && !c.claimed),
    farm: (p.farm?.plots || []).some((x) => x.strain && x.end <= now),
  };
  return (
    <div className="mt-4 grid grid-cols-2 gap-2" data-testid="more-menu">
      {Object.entries(VIEWS).map(([id, x], i) => (
        <button key={id} onClick={() => openMore(id)} data-testid={`more-item-${id}`} style={{ animationDelay: `${i * 30}ms` }}
          className="btn-press rise relative flex min-h-[84px] flex-col justify-between border border-zinc-800 bg-surface p-3 text-left hover:border-gold">
          <x.icon className="h-5 w-5 text-gold" />
          <span className="font-display text-sm uppercase leading-tight text-zinc-100">{x.label}</span>
          {badge[id] && <span className="absolute right-2 top-2 h-2 w-2 bg-blood" />}
        </button>
      ))}
    </div>
  );
}
