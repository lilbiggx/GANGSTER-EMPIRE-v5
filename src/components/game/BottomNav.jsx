import { Building2, Users, Crosshair, Store, Menu } from "lucide-react";
import { useGame } from "../../store/game";

const ITEMS = [
  { id: "empire", label: "Empire", icon: Building2 },
  { id: "crew", label: "Crew", icon: Users },
  { id: "heists", label: "Heists", icon: Crosshair },
  { id: "market", label: "Market", icon: Store },
  { id: "more", label: "More", icon: Menu },
];

export default function BottomNav() {
  const { tab, setTab, player } = useGame();
  const ready = player.heists.some((h) => h.end <= Date.now() / 1000);
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 flex h-16 items-stretch border-t border-zinc-800 bg-ink" data-testid="bottom-nav">
      {ITEMS.map((it) => {
        const active = tab === it.id;
        return (
          <button
            key={it.id}
            onClick={() => setTab(it.id)}
            data-testid={`nav-${it.id}-btn`}
            className={`btn-press relative flex flex-1 flex-col items-center justify-center gap-1 ${active ? "text-gold" : "text-zinc-500"}`}
          >
            {active && <span className="absolute left-3 right-3 top-0 h-0.5 bg-gold" />}
            <it.icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">{it.label}</span>
            {it.id === "heists" && ready && <span className="absolute right-[30%] top-2 h-2 w-2 bg-blood" />}
          </button>
        );
      })}
    </nav>
  );
}
