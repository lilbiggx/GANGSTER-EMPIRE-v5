import { useState } from "react";
import { CheckCircle2, Circle, ChevronRight, HelpCircle, AlertTriangle } from "lucide-react";
import { useGame } from "../../store/game";
import { cedi } from "../../lib/fmt";

const STEPS = [
  { id: "tap", label: "Tap HUSTLE for your first dirty cedis", done: (p) => Number(p.lifetime) >= 150, tab: "empire" },
  { id: "upgrade", label: "Upgrade Okada Parcel Runs to level 3", done: (p) => (p.hustles.okada?.lvl || 0) >= 3, tab: "empire" },
  { id: "front", label: "Buy Auntie Esi's Chop Bar (a front)", done: (p) => (p.fronts.chopbar || 0) >= 1, tab: "empire" },
  { id: "launder", label: "Launder dirty cash into clean cedis", done: (p) => Number(p.clean) > 0 || p.batches.length > 0, tab: "empire" },
  { id: "crew", label: "Hire a 3rd crew member (Market → Crew Agency)", done: (p) => p.crew.filter((c) => !c.merc).length >= 3, tab: "market" },
  { id: "heist", label: "Run your first heist", done: (p) => p.heists.length > 0 || p.log.some((l) => /Clean job|heist/i.test(l.msg)) || p.level >= 6, tab: "heists" },
  { id: "vault", label: "Upgrade the Vault (Market → Mansion)", done: (p) => p.upgrades.vault >= 1, tab: "market" },
];

export function nextAction(p, d) {
  const exposed = Math.max(0, Number(p.dirty) - Number(d.vault_cap));
  if (p.raid) return { tone: "danger", text: "Raid incoming! Open the red banner: fortify or put crew on defence." };
  if (p.heat >= 60) return { tone: "danger", text: `Heat is ${Math.round(p.heat)}/100. Laundering costs ${Math.round(d.fee * 100)}% now. Bribe, lie low or use a burner.` };
  if (p.heists.some((h) => h.end <= Date.now() / 1000)) return { tone: "good", text: "A heist is finished. Go to Heists and see what happened.", tab: "heists" };
  if (p.batches.some((b) => b.end <= Date.now() / 1000)) return { tone: "good", text: "Clean cedis are ready. Collect your laundering batch." };
  if ((p.farm?.plots || []).some((x) => x.strain && x.end <= Date.now() / 1000)) return { tone: "good", text: "Your farm is ready to harvest. Cut it and sell the stash.", more: "farm" };
  if (exposed > Number(d.vault_cap) * 2 && Object.keys(p.fronts).length) return { tone: "warn", text: `${cedi(exposed)} is outside your vault. Raids can take 20–35% of it. Launder it or upgrade the vault.` };
  if (!p.daily.login_claimed) return { tone: "good", text: "Claim today's streak reward (More → Daily).", more: "daily" };
  const step = STEPS.find((s) => !s.done(p));
  if (step) return { tone: "info", text: step.label, tab: step.tab };
  return { tone: "info", text: "Expand: grow fronts, hit rivals, climb the season board, then retire to the village at level 20." };
}

const TONE = { danger: "border-blood bg-blood/10 text-blood", warn: "border-orange-400 bg-orange-400/10 text-orange-300", good: "border-kgreen bg-kgreen/10 text-kgreen", info: "border-gold bg-gold/5 text-gold" };

export default function ObjectivePanel() {
  const { player: p, derived: d, setTab, openMore } = useGame();
  const [help, setHelp] = useState(false);
  const [open, setOpen] = useState(localStorage.getItem("uw_tut_hide") !== "1");
  const na = nextAction(p, d);
  const doneCount = STEPS.filter((s) => s.done(p)).length;
  const go = () => (na.more ? openMore(na.more) : na.tab && setTab(na.tab));
  const helpBtn = <button onClick={() => setHelp(!help)} className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-gold" data-testid="money-help-btn"><HelpCircle className="h-4 w-4" />How money works</button>;
  return (
    <div className="mt-3 grid gap-2" data-testid="objective-panel">
      <button onClick={go} className={`btn-press flex min-h-[52px] items-center gap-2 border-l-4 border px-3 py-2 text-left ${TONE[na.tone]}`} data-testid="next-action">
        {na.tone === "danger" || na.tone === "warn" ? <AlertTriangle className="h-5 w-5 shrink-0" /> : <ChevronRight className="h-5 w-5 shrink-0" />}
        <div className="min-w-0">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.25em] opacity-80">Next best move</div>
          <div className="text-sm font-bold leading-snug text-zinc-100" data-testid="next-action-text">{na.text}</div>
        </div>
      </button>
      {doneCount < STEPS.length ? (
        <div className="border border-zinc-800 bg-surface p-3" data-testid="tutorial-tracker">
          <div className="flex items-center justify-between">
            <button onClick={() => { setOpen(!open); localStorage.setItem("uw_tut_hide", open ? "1" : "0"); }} className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-300" data-testid="tutorial-toggle">
              Street Lessons · {doneCount}/{STEPS.length} {open ? "▾" : "▸"}
            </button>
            {helpBtn}
          </div>
          {open && (
            <ul className="mt-2 grid gap-1">
              {STEPS.map((s) => {
                const done = s.done(p);
                return (
                  <li key={s.id} className={`flex items-center gap-2 text-xs ${done ? "text-zinc-500 line-through" : "text-zinc-200"}`} data-testid={`tutorial-step-${s.id}`}>
                    {done ? <CheckCircle2 className="h-4 w-4 text-kgreen" /> : <Circle className="h-4 w-4 text-zinc-600" />}{s.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : <div className="flex justify-end">{helpBtn}</div>}
      {help && (
        <div className="grid gap-1.5 border border-zinc-800 bg-ink p-3 text-xs text-zinc-300" data-testid="money-help">
          <p><b className="text-gold">Dirty cedis</b> come from hustles and heists. Spend them on hustles, fronts, guns and crew. Raids can steal the part outside your vault.</p>
          <p><b className="text-kgreen">Clean cedis</b> come from laundering through fronts. They are safe from raids and pay for mansion upgrades, bribes and clothes.</p>
          <p><b className="text-blood">Heat</b> rises with every collection, heist and rival hit. Higher heat = bigger laundering fee (10% → 30%) and more raids. It cools by itself over time.</p>
          <p><b className="text-zinc-100">Vault</b> protects {cedi(d.vault_cap)} of dirty cash. Anything above that is exposed.</p>
        </div>
      )}
    </div>
  );
}
