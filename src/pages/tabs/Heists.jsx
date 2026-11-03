import { useState } from "react";
import { AlertTriangle, Radio, Shield, Clock, Flame, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { useGame } from "../../store/game";
import { useNow } from "../../hooks/useNow";
import { dur, cedi } from "../../lib/fmt";
import { Btn, Card, Bar, SectionTitle, Chip, Sheet } from "../../components/game/ui";
import { HEIST_EVENT_MAP, ROLE_ARCH } from "../../data/gameData";

const DEFAULT_HEIST_DAILY_LIMIT = 3;

function chance(tpl, sel, crew, derived, roles, boost) {
  let score = 0;
  for (const [slotKey, cid] of Object.entries(sel)) {
    const role = slotKey.split("::")[1] || slotKey;
    const baseRole = role.split(" ")[0]; // handles "Enforcer (Gunner)" -> "Enforcer"
    const c = crew.find((x) => x.id === cid);
    if (!c) continue;
    const statKey = roles[baseRole] || "muscle";
    let s = ((derived?.crew_eff?.[cid]?.[statKey]) ?? (c.stats?.[statKey] || 5)) * 3 + c.lvl * 2 + (derived?.crew_wpow?.[cid] || 0) * 0.5;
    if (c.arch === ROLE_ARCH[baseRole]) s *= 1.25;
    score += s;
  }
  return Math.round(Math.max(0.15, Math.min(0.95, 0.5 + (score / tpl.diff - 1) * 0.6 + boost)) * 100);
}

function PlanSheet({ tpl, onClose }) {
  const { player: p, derived: d, config, act } = useGame();
  const [sel, setSel] = useState({});
  const [approach, setApproach] = useState("balanced");
  const [prep, setPrep] = useState([]);
  const free = p.crew.filter((c) => !c.assign);
  
  const slotKeys = tpl.roles.map((r, i) => `${i}::${r}`);
  const filled = slotKeys.every((k) => sel[k]);
  const reward = Math.floor(tpl.reward * (1 + 0.08 * p.level));
  const ap = config.approaches[approach];
  const owned = config.black_market.filter((i) => i.kind.startsWith("heist_") && p.inv[i.id] > 0);
  const itemMult = (k) => owned.filter((i) => i.kind === k).reduce((m, i) => m * i.value, 1);
  const boost = ap.chance + (prep.includes("intel") ? 0.12 : 0) + owned.filter((i) => i.kind === "heist_boost").reduce((s, i) => s + i.value, 0);
  const pct = chance(tpl, sel, p.crew, d, config.roles, boost);
  const prepCost = prep.reduce((s, k) => s + Math.floor(reward * config.prep[k].cost), 0);
  const durS = tpl.dur * (1 - 0.05 * (p.upgrades?.okada || 0)) * ap.dur * (prep.includes("getaway") ? 0.7 : 1) * itemMult("heist_speed");
  const togglePrep = (k) => setPrep(prep.includes(k) ? prep.filter((x) => x !== k) : [...prep, k]);

  return (
    <Sheet open onClose={onClose} testid="heist-plan-sheet">
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-blood">
        Tactical Syndicate Operation · ({d?.heist_count ?? 0}/{d?.heist_limit ?? DEFAULT_HEIST_DAILY_LIMIT} Today)
      </div>
      <h3 className="font-display text-2xl uppercase text-zinc-100">{tpl.name}</h3>
      <div className="mt-1 text-xs text-zinc-400" data-testid="heist-plan-summary">
        Takes {dur(durS)} · +{Math.round(tpl.heat * ap.heat * itemMult("heist_heat"))} heat
        {owned.length > 0 && ` · Boost items: ${owned.map((i) => i.name).join(", ")}`}
      </div>

      <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gold">Tactical Approach</div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        {Object.entries(config.approaches).map(([k, a]) => (
          <button
            key={k}
            onClick={() => setApproach(k)}
            data-testid={`heist-approach-${k}`}
            className={`btn-press border px-1 py-1.5 text-[10px] font-extrabold uppercase ${
              approach === k ? "border-gold bg-gold text-ink" : "border-zinc-700 text-zinc-300"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>
      <div className="mt-1 text-[11px] text-zinc-500">{ap.desc}</div>

      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {Object.entries(config.prep).map(([k, x]) => (
          <button
            key={k}
            onClick={() => togglePrep(k)}
            data-testid={`heist-prep-${k}`}
            className={`btn-press border p-2 text-left ${prep.includes(k) ? "border-kgreen bg-surface2" : "border-zinc-800"}`}
          >
            <div className={`text-[11px] font-bold ${prep.includes(k) ? "text-kgreen" : "text-zinc-200"}`}>{x.name}</div>
            <div className="text-[10px] text-zinc-500">{x.desc} · {cedi(Math.floor(reward * x.cost))}</div>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3">
        {slotKeys.map((slotKey) => {
          const role = slotKey.split("::")[1];
          const baseRole = role.split(" ")[0];
          const statKey = config.roles[baseRole] || "muscle";
          return (
            <div key={slotKey}>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                Slot: {role} <span className="text-zinc-500">({statKey})</span>
              </div>
              <div className="hide-scrollbar flex gap-1.5 overflow-x-auto">
                {free.map((c) => {
                  const taken = Object.entries(sel).some(([k, id]) => id === c.id && k !== slotKey);
                  const on = sel[slotKey] === c.id;
                  const statVal = d?.crew_eff?.[c.id]?.[statKey] ?? c.stats?.[statKey] ?? 5;
                  const isMatchingRole = c.arch === ROLE_ARCH[baseRole];

                  return (
                    <button
                      key={c.id}
                      disabled={taken}
                      onClick={() => setSel({ ...sel, [slotKey]: on ? undefined : c.id })}
                      data-testid={`heist-role-${role}-${c.id}`}
                      className={`btn-press shrink-0 border px-2.5 py-1.5 text-left text-[11px] disabled:opacity-30 ${
                        on ? "border-gold bg-gold text-ink" : "border-zinc-700 text-zinc-300"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1">
                        {c.name.split(" ")[0]}
                        {isMatchingRole && <span className="text-[9px] px-1 bg-gold/20 text-gold rounded font-normal">Expert</span>}
                      </div>
                      <div className="opacity-70 text-[10px]">
                        {c.arch} · {statKey} {statVal} · Morale {c.morale ?? 85}%
                      </div>
                    </button>
                  );
                })}
                {!free.length && <span className="text-xs text-zinc-500">No free crew available. Rest or hire at Agency.</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-zinc-800 pt-3">
        <div>
          <div className="text-[10px] uppercase text-zinc-500">Estimated Success Rate</div>
          <div className="font-display text-4xl text-gold" data-testid="heist-chance">
            {filled ? pct : "--"}%
          </div>
        </div>
        <div className="text-right text-xs text-zinc-400">
          Payout up to<br />
          <b className="text-gold font-display text-base">{cedi(Math.floor(reward * ap.reward))}</b>
          {prepCost > 0 && <div className="text-[10px] text-zinc-500">Prep: {cedi(prepCost)}</div>}
        </div>
      </div>

      <Btn
        className="mt-4 w-full py-3"
        disabled={!filled || Number(p.dirty) < prepCost}
        data-testid="heist-start-btn"
        onClick={() => {
          act("heist_start", {
            tpl: tpl.id,
            approach,
            prep,
            crew: Object.fromEntries(Object.entries(sel).filter(([, v]) => v)),
            pct,
          });
          onClose();
        }}
      >
        Launch Daily Heist Operation
      </Btn>
    </Sheet>
  );
}

function ResultSheet({ res, onClose }) {
  const color = res.outcome === "success" ? "text-kgreen" : res.outcome === "partial" ? "text-gold" : "text-blood";
  return (
    <Sheet open onClose={onClose} testid="heist-result-sheet">
      <div className={`font-display text-3xl uppercase ${color}`} data-testid="heist-result-outcome">
        {res.outcome === "success" ? "Clean Heist Extraction!" : res.outcome === "partial" ? "Partial Heist" : "Heist Botched!"}
      </div>
      <div className="text-sm text-zinc-400">
        Estimated chance was {res.chance}% · Loot secured: <b className="text-gold font-display">{cedi(res.reward)}</b>
      </div>
      {res.drop && (
        <div className="mt-3 border border-gold bg-gold/10 px-3 py-2 text-xs text-gold flex items-center gap-1.5" data-testid="heist-result-drop">
          <Zap className="h-4 w-4" />
          Rare Loot Acquired: {useGame.getState().config.gear.find((g) => g.id === res.drop)?.name || res.drop}. Check your Locker!
        </div>
      )}
      <div className="mt-4 border border-zinc-800 bg-black p-3 font-mono text-xs text-zinc-400 space-y-1" data-testid="heist-log">
        {res.log.map((l, i) => (
          <div key={i} className={l.startsWith("⚠️") ? "text-blood" : l.startsWith("✅") ? "text-kgreen" : i === res.log.length - 1 ? color : ""}>
            &gt; {l}
          </div>
        ))}
      </div>
      <Btn className="mt-5 w-full" onClick={onClose} data-testid="heist-result-close-btn">
        Return to Empire
      </Btn>
    </Sheet>
  );
}

export default function Heists() {
  const { player: p, derived: d, config, act } = useGame();
  const now = useNow(1000);
  const [plan, setPlan] = useState(null);
  const [res, setRes] = useState(null);

  const heistLimit = d?.heist_limit ?? DEFAULT_HEIST_DAILY_LIMIT;
  const todayHeistDone = (d?.heist_count ?? 0) >= heistLimit;

  return (
    <div className="space-y-4">
      {/* Active Running Heists */}
      {p.heists.length > 0 && (
        <div>
          <SectionTitle kicker="Operation in Progress" title="Live Tactical Heists" />
          <div className="grid gap-3">
            {p.heists.map((h) => {
              const tpl = config.heists.find((t) => t.id === h.tpl) || { name: h.tpl, dur: 1800 };
              const ready = h.end <= now;
              const elapsed = now - (h.start || (h.end - tpl.dur));
              const total = h.end - (h.start || (h.end - tpl.dur));
              const progressPct = Math.min(100, Math.max(0, (elapsed / (total || 1)) * 100));

              // Find active unaddressed events
              const activeEvents = (h.events || []).filter((e) => now >= e.trigger_at && !e.resolved);
              const resolvedEvents = (h.events || []).filter((e) => e.resolved);

              return (
                <Card key={h.id} accent={ready ? "green" : activeEvents.length > 0 ? "red" : "gold"} data-testid={`active-heist-${h.tpl}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display uppercase text-base text-zinc-100 font-bold">{tpl.name}</span>
                      <div className="text-[10px] text-zinc-400">
                        Approach: <b className="capitalize text-gold">{h.approach || "balanced"}</b> · Est. Success: <b className="text-zinc-100">{h.pct}%</b>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-gold">
                      {ready ? "Ready for Extraction" : dur(h.end - now)}
                    </span>
                  </div>

                  <div className="my-2">
                    <Bar pct={progressPct} color={ready ? "green" : activeEvents.length > 0 ? "red" : "gold"} />
                  </div>

                  <div className="text-[10px] text-zinc-500 font-mono">
                    Roster: {Object.values(h.sel || {}).map((cid) => p.crew.find((c) => c.id === cid)?.name.split(" ")[0]).filter(Boolean).join(" · ")}
                  </div>

                  {/* LIVE CRISIS EVENTS ALERT BANNER */}
                  {activeEvents.map((ev) => {
                    const evDef = HEIST_EVENT_MAP[ev.event_id];
                    if (!evDef) return null;
                    const timeLeft = Math.max(0, ev.expires_at - now);

                    return (
                      <div
                        key={ev.uid}
                        className="mt-3 rounded border-2 border-blood bg-gradient-to-b from-blood/20 to-ink p-3 space-y-2 animate-pulse"
                        data-testid={`heist-crisis-${ev.event_id}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-blood">
                            <AlertTriangle className="h-4 w-4 shrink-0 text-blood animate-bounce" />
                            <span>CRISIS: {evDef.title}</span>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-blood bg-blood/20 px-2 py-0.5 border border-blood">
                            ⚠️ {dur(timeLeft)} LEFT
                          </span>
                        </div>

                        {/* Radio Chatter */}
                        <div className="rounded border border-zinc-800 bg-black/80 p-2 text-xs text-amber-300 font-mono flex items-start gap-2">
                          <Radio className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Radio Intercept</span>
                            "{evDef.radio_chatter}"
                          </div>
                        </div>

                        <div className="text-[11px] text-zinc-300">
                          {evDef.desc}
                        </div>

                        <div className="text-[10px] text-blood">
                          Failure warning: If ignored, success chance drops by {evDef.fail_penalty.chance_drop}% and heat surges!
                        </div>

                        {/* Interactive Choices */}
                        <div className="grid gap-1.5 pt-1">
                          {evDef.choices.map((choice) => {
                            const req = choice.req_role;
                            const hasRole = !req || Object.values(h.sel || {}).some((cid) => {
                              const cm = p.crew.find((c) => c.id === cid);
                              return cm && (cm.arch === ROLE_ARCH[req] || cm.arch === req.toLowerCase());
                            });
                            const hasCleanCost = !choice.cost_clean || BigInt(p.clean) >= BigInt(choice.cost_clean);
                            const hasDirtyCost = !choice.cost_dirty || BigInt(p.dirty) >= BigInt(choice.cost_dirty);
                            const canDo = hasRole && hasCleanCost && hasDirtyCost;

                            return (
                              <button
                                key={choice.id}
                                disabled={!canDo}
                                onClick={() => act("resolve_heist_event", { hid: h.id, event_uid: ev.uid, choice_id: choice.id })}
                                className="btn-press flex items-center justify-between border border-zinc-700 bg-zinc-900/90 p-2 text-left hover:border-gold disabled:opacity-40 transition-colors"
                                data-testid={`heist-choice-${choice.id}`}
                              >
                                <div className="min-w-0 pr-2">
                                  <div className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                                    <span>{choice.label}</span>
                                    {req && (
                                      <span className={`text-[9px] px-1 rounded ${hasRole ? "bg-kgreen/20 text-kgreen" : "bg-blood/20 text-blood"}`}>
                                        Requires {req}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-zinc-400 mt-0.5">{choice.desc}</div>
                                </div>
                                <div className="shrink-0 text-right">
                                  <span className="text-[10px] font-bold text-kgreen block">
                                    {choice.chance_mod >= 0 ? `+${choice.chance_mod}%` : `${choice.chance_mod}%`} chance
                                  </span>
                                  {choice.cost_clean && <span className="text-[9px] text-zinc-400 block">{cedi(choice.cost_clean)} clean</span>}
                                  {choice.cost_dirty && <span className="text-[9px] text-zinc-400 block">{cedi(choice.cost_dirty)} dirty</span>}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Resolved Events History */}
                  {resolvedEvents.length > 0 && (
                    <div className="mt-2 space-y-1 text-[10px]">
                      {resolvedEvents.map((e, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-zinc-400">
                          {e.penalty_applied ? (
                            <span className="text-blood">⚠️ {e.outcome}</span>
                          ) : (
                            <span className="text-kgreen flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              {e.outcome}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {ready && (
                    <Btn
                      variant="green"
                      className="mt-3 w-full py-2.5 font-bold"
                      onClick={() => act("heist_claim", { hid: h.id }, { onResult: setRes })}
                      data-testid={`heist-claim-btn-${h.tpl}`}
                    >
                      Inspect Scores & Claim Loot
                    </Btn>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Daily Heist Targets */}
      <div>
        <SectionTitle
          kicker="High Stakes Underworld Operations"
          title="Daily Heist Targets"
          right={
            todayHeistDone ? (
              <Chip className="bg-blood/20 text-blood border-blood/30">{heistLimit}/{heistLimit} Done Today</Chip>
            ) : (
              <Chip className="bg-kgreen/20 text-kgreen border-kgreen/30">Available ({d?.heist_count ?? 0}/{heistLimit})</Chip>
            )
          }
        />
        <p className="-mt-1 mb-3 text-xs text-zinc-400">
          Coordinated multi-slot syndicate operations across Accra. During a heist, random interactive crises happen on radio frequencies—failing to intervene in time heavily degrades success and spikes police heat!
        </p>

        {todayHeistDone && p.heists.length === 0 && (
          <div className="mb-3 border border-zinc-800 bg-surface p-3 text-xs text-zinc-400 flex items-center justify-between">
            <span>Daily Heist Limit reached for today. Syndicate cooldown resets at midnight.</span>
            <button
              onClick={() => act("dev_reset_heist_limit")}
              className="text-[10px] text-gold font-bold uppercase underline"
            >
              Reset for testing
            </button>
          </div>
        )}

        <div className="grid gap-2.5">
          {config.heists.map((t) => {
            const running = p.heists.some((h) => h.tpl === t.id);
            const rewardAmt = Math.floor(t.reward * (1 + 0.08 * p.level));

            return (
              <Card
                key={t.id}
                accent="gold"
                data-testid={`heist-card-${t.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-display text-base uppercase text-zinc-100 font-bold">{t.name}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {t.roles.map((r, i) => (
                        <Chip key={i} className="text-zinc-300 bg-ink">
                          {r}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-zinc-400">
                    <div className="font-display text-lg text-gold font-bold">{cedi(rewardAmt)}</div>
                    <div className="flex items-center justify-end gap-1 font-mono text-[10px]">
                      <Clock className="h-3 w-3 text-zinc-500" />
                      {dur(t.dur)}
                    </div>
                  </div>
                </div>

                <Btn
                  className="mt-3 w-full"
                  disabled={running || todayHeistDone}
                  onClick={() => setPlan(t)}
                  data-testid={`heist-plan-btn-${t.id}`}
                >
                  {running
                    ? "Operation Active"
                    : todayHeistDone
                    ? `Daily Limit Reached (${heistLimit}/${heistLimit})`
                    : "Plan & Assign Crew"}
                </Btn>
              </Card>
            );
          })}
        </div>
      </div>

      {plan && <PlanSheet tpl={plan} onClose={() => setPlan(null)} />}
      {res && <ResultSheet res={res} onClose={() => setRes(null)} />}
    </div>
  );
}
