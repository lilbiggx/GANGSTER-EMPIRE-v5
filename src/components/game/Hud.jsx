import React from "react";
import { Shield, WifiOff, RefreshCw, AlertOctagon, Siren, Lock } from "lucide-react";
import { useGame } from "../../store/game";
import { cedi, dur } from "../../lib/fmt";
import { useNow } from "../../hooks/useNow";

const TIER_COLORS = ["text-kgreen", "text-gold", "text-orange-400", "text-blood", "text-blood"];

export default function Hud() {
  const { player: p, derived: d, online, queue = [], syncing = false, openLocker, act } = useGame();
  const now = useNow(1000);

  if (!p || !d) return null;

  const shielded = (p.shield_until || 0) > now || (p.newbie_until || 0) > now;
  const isArrested = p.arrested_until && now < p.arrested_until;
  const arrestTimeLeft = isArrested ? Math.max(0, p.arrested_until - now) : 0;
  const xpPct = d.xp_needed ? Math.min(100, Math.max(0, ((p.xp || 0) / d.xp_needed) * 100)) : 0;
  const tierIdx = Math.max(0, Math.min(4, (d.tier || 1) - 1));

  return (
    <header className="z-50 shrink-0 border-b border-gold bg-ink" data-testid="hud">
      {/* POLICE ARREST LOCKUP BANNER */}
      {isArrested && (
        <div
          className="border-b-2 border-blood bg-gradient-to-r from-blood via-ink to-blood px-3 py-2 text-zinc-100 flex items-center justify-between animate-pulse"
          data-testid="hud-arrest-banner"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-blood text-white shrink-0">
              <Siren className="h-4 w-4 animate-spin" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-wider text-red-300 flex items-center gap-1.5">
                <span>GHANA POLICE LOCKUP</span>
                <span className="font-mono bg-black/60 px-1.5 py-0.2 rounded text-gold">
                  {dur(arrestTimeLeft)}
                </span>
              </div>
              <div className="text-[9px] text-zinc-300 truncate">
                Businesses halted! Compound still vulnerable to raids.
              </div>
            </div>
          </div>
          <button
            onClick={() => act("post_bail")}
            className="btn-press shrink-0 border border-gold bg-gold px-2.5 py-1 text-[10px] font-extrabold uppercase text-ink hover:bg-yellow-400"
            data-testid="hud-bail-btn"
          >
            Post Bail (GH₵2,000)
          </button>
        </div>
      )}

      <div className="flex items-center justify-between px-4 pt-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => openLocker("boss")}
              className="truncate font-display text-sm uppercase text-zinc-100 hover:text-gold"
              data-testid="hud-name"
            >
              {p.name}
            </button>
            <span className="text-[10px] font-bold text-gold" data-testid="hud-level">
              LV {p.level}
            </span>
            {shielded && <Shield className="h-3 w-3 text-kgreen" data-testid="hud-shield-icon" />}
            {!online && <WifiOff className="h-3 w-3 text-blood" data-testid="hud-offline-icon" />}
            {(syncing || (queue && queue.length > 0)) && (
              <RefreshCw
                className={`h-3 w-3 text-zinc-500 ${syncing ? "animate-spin" : ""}`}
                data-testid="hud-sync-icon"
              />
            )}
          </div>
          <div className="mt-1 h-1 w-24 bg-zinc-800">
            <div className="h-full bg-gold" style={{ width: `${xpPct}%` }} />
          </div>
        </div>
        <div
          className={`text-right text-[10px] font-extrabold uppercase tracking-wider ${
            isArrested ? "text-blood animate-pulse" : TIER_COLORS[tierIdx]
          }`}
          data-testid="hud-heat-tier"
        >
          {isArrested ? "★ LOCKED UP IN CID CELLS ★" : `Heat ${d.tier || 1} · ${d.tier_name || "Police Patrol"}`}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px pb-2 pt-1.5">
        <div className="px-4">
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">Dirty Cedis</div>
          <div className="font-display text-xl leading-tight text-gold" data-testid="hud-dirty">
            {cedi(p.dirty)}
          </div>
        </div>
        <div className="border-l border-zinc-800 px-4">
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">Clean Cedis</div>
          <div className="font-display text-xl leading-tight text-kgreen" data-testid="hud-clean">
            {cedi(p.clean)}
          </div>
        </div>
      </div>
    </header>
  );
}
