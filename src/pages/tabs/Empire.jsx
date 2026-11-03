import { useState } from "react";
import { toast } from "sonner";
import { Hand, Lock, Clock, Snowflake, Phone, Scale, Timer, Vault } from "lucide-react";
import { useGame } from "../../store/game";
import { useNow } from "../../hooks/useNow";
import { cedi, dur, fmt, big } from "../../lib/fmt";
import { Btn, Card, Bar, SectionTitle, Chip } from "../../components/game/ui";
import ObjectivePanel from "../../components/game/ObjectivePanel";
import TipSheet from "../../components/game/TipSheet";

const accruedOf = (p, d, hid, now) => {
  const hs = p?.hustles?.[hid];
  if (!hs || !d?.hustles?.[hid]) return 0;
  const hData = d.hustles[hid];
  const todayEarned = hData.today_earned || 0;
  const remainingToday = Math.max(0, (hData.daily_cap || 1000) - todayEarned);
  if (remainingToday <= 0) return 0;
  const capSecs = (d.offline_cap_h || 12) * 3600;
  // Elapsed time counted in minutes (rate in GH₵/min)
  const elapsedMins = Math.max(0, Math.min(now - hs.ts, capSecs)) / 60;
  const rawAccrued = Math.floor(Number(hData.rate || 0) * elapsedMins);
  return Math.min(rawAccrued, remainingToday);
};

function NewsTicker() {
  const news = useGame((s) => s.news);
  if (!news.length) return null;
  const line = news.join("   ·   ");
  return (
    <div className="-mx-4 overflow-hidden border-b border-zinc-800 bg-surface py-1.5" data-testid="street-news-ticker">
      <div className="ticker flex w-max whitespace-nowrap text-[11px] font-semibold text-zinc-400">
        <span className="px-4"><b className="text-blood">STREET NEWS</b> · {line}</span>
        <span className="px-4"><b className="text-blood">STREET NEWS</b> · {line}</span>
      </div>
    </div>
  );
}

function TapHustle({ pending }) {
  const { derived: d, tap, act, player: p } = useGame();
  const [pops, setPops] = useState([]);
  const onTap = () => {
    tap();
    const id = Math.random();
    setPops((x) => [...x.slice(-6), { id, left: 30 + Math.random() * 40 }]);
    setTimeout(() => setPops((x) => x.filter((y) => y.id !== id)), 800);
  };
  const collect = () =>
    act("collect", { hid: "all" }, {
      optimistic: (pl) => {
        const now = Date.now() / 1000 + useGame.getState().offset;
        let sum = 0n;
        Object.keys(pl.hustles).forEach((k) => { sum += BigInt(accruedOf(pl, d, k, now)); pl.hustles[k].ts = now; });
        pl.dirty = (big(pl.dirty) + sum).toString();
      },
    });
  return (
    <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
      <button
        onClick={onTap}
        data-testid="hustle-tap-btn"
        className="btn-press hard-shadow relative select-none overflow-visible border border-gold bg-gold px-4 py-5 text-left text-ink active:scale-95"
      >
        <div className="flex items-center gap-2 font-display text-3xl uppercase"><Hand className="h-7 w-7" />Hustle</div>
        <div className="text-[11px] font-extrabold uppercase tracking-wider">+{cedi(d.tap_value)} per tap · +{fmt(d.rate)}/min idle</div>
        {pops.map((x) => (
          <span key={x.id} className="float-up pointer-events-none absolute top-2 font-display text-xl text-ink" style={{ left: `${x.left}%` }}>
            +{fmt(d.tap_value)}
          </span>
        ))}
      </button>
      <button
        onClick={collect}
        disabled={pending <= 0}
        data-testid="collect-all-btn"
        className="btn-press flex w-28 flex-col items-center justify-center border border-kgreen bg-surface px-2 text-kgreen disabled:opacity-40"
      >
        <span className="text-[10px] font-extrabold uppercase tracking-wider">Collect</span>
        <span className="font-display text-lg leading-tight" data-testid="collect-all-amount">{cedi(pending)}</span>
      </button>
      {p.lie_low_until > Date.now() / 1000 && <div className="col-span-2 text-[11px] text-sky-300">Lying low: income at 50%, heat cools 4x faster.</div>}
    </div>
  );
}

function HustleCard({ h, now }) {
  const { player: p, derived: d, config, act } = useGame();
  const [pickerOpen, setPickerOpen] = useState(false);
  const owned = p.hustles[h.id];
  const hData = d.hustles?.[h.id] || {};
  const cost = hData.cost || h.cost;
  const acc = accruedOf(p, d, h.id, now);
  const capPct = owned ? (Math.min(now - owned.ts, d.offline_cap_h * 3600) / (d.offline_cap_h * 3600)) * 100 : 0;
  const district = useGame((s) => s.config.districts.find((x) => x.id === h.district)?.name);

  const mgrId = p.hustle_assign?.[h.id];
  const mgr = p.crew.find((c) => c.id === mgrId);
  const trait = config.crew_front_traits?.find((t) => t.id === mgr?.front_trait);
  const isSynergy = mgr?.specialty_biz === h.id;

  const todayEarned = hData.today_earned || 0;
  const dailyCap = hData.daily_cap || 1000;
  const isDailyCapped = hData.daily_capped;

  return (
    <Card accent={owned ? "gold" : "red"} data-testid={`hustle-card-${h.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-display text-base uppercase text-zinc-100">{h.name}</div>
          <div className="text-[10px] uppercase tracking-wider text-zinc-500">
            {district} · LV {owned?.lvl || 0}
          </div>
          {h.real_desc && (
            <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
              {h.real_desc}
            </div>
          )}
        </div>
        {owned && (
          <div className="text-right shrink-0">
            <div className="font-display text-lg text-gold" data-testid={`hustle-accrued-${h.id}`}>{cedi(acc)}</div>
            <div className="text-[10px] text-zinc-400 font-mono">
              {isDailyCapped ? (
                <span className="text-blood font-bold">Capped</span>
              ) : (
                <span>+{fmt(hData.rate)}/min</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Daily Cap & Revenue Status */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-[10px] rounded bg-zinc-950/70 p-1.5 border border-zinc-800/80">
        <div className="text-zinc-400">
          <span className="text-zinc-500">Revenue: </span>
          <b className="text-zinc-200">+{fmt(hData.rate)}/min</b>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <span className="text-zinc-500">Day Limit: </span>
          {isDailyCapped ? (
            <span className="text-blood font-bold bg-blood/10 px-1 rounded">
              GH₵1,000/1,000 Capped
            </span>
          ) : (
            <span className="text-gold font-bold">
              GH₵{todayEarned}/{dailyCap}
            </span>
          )}
        </div>
      </div>

      {owned && <div className="mt-2"><Bar pct={isDailyCapped ? 100 : capPct} color={isDailyCapped ? "red" : "gold"} /></div>}

      {/* Hustle Manager Assignment */}
      {owned && (
        <div className="mt-2.5 rounded border border-zinc-800/80 bg-zinc-950/60 p-2 text-[10px]">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 pr-1">
              <span className="text-zinc-500 uppercase tracking-wider font-bold">Manager: </span>
              {mgr ? (
                <span className="text-gold font-bold">
                  {mgr.name.split(" ")[0]} ({trait?.name || "Operative"})
                </span>
              ) : (
                <span className="text-zinc-400">None assigned</span>
              )}
            </div>
            <button
              onClick={() => setPickerOpen(true)}
              className="btn-press shrink-0 border border-zinc-700 bg-surface px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-zinc-300 hover:border-gold hover:text-gold"
              data-testid={`hustle-assign-btn-${h.id}`}
            >
              {mgr ? "Change" : "+ Assign Manager"}
            </button>
          </div>

          {mgr && (
            <div className="mt-1 space-y-0.5">
              <div className="flex flex-wrap items-center gap-1.5 text-[9px] text-zinc-400">
                {mgr.origin && <span>📍 {mgr.origin}</span>}
                <span className="text-zinc-300 font-medium">· {trait?.desc}</span>
              </div>
              {isSynergy && (
                <div className="mt-1 inline-flex items-center gap-1 rounded border border-gold/40 bg-gold/15 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-gold">
                  ★ Perfect Match Synergy (+20% Hustle Income)
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-[10px] text-zinc-500">
          {isDailyCapped ? (
            <span className="text-blood font-semibold">Capped for today</span>
          ) : (
            <span>Street Price: {cedi(cost)}</span>
          )}
        </span>
        <Btn
          variant={owned ? "ghost" : "gold"}
          disabled={big(p.dirty) < big(cost)}
          onClick={() => act("buy_hustle", { hid: h.id })}
          data-testid={`hustle-upgrade-btn-${h.id}`}
        >
          {owned ? "Upgrade" : "Start"} {cedi(cost)}
        </Btn>
      </div>

      {/* Hustle Manager Picker Modal */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-sm border border-gold bg-ink p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="font-display uppercase text-sm text-gold">Assign Manager: {h.name}</span>
              <button onClick={() => setPickerOpen(false)} className="text-xs text-zinc-400 hover:text-white">✕</button>
            </div>
            <p className="text-[11px] text-zinc-400">
              Assign a crew member to manage this street hustle. Specialists boost yield, expand production speed, and generate district synergy!
            </p>
            <div className="max-h-64 overflow-y-auto space-y-1.5">
              <button
                onClick={() => {
                  act("assign_hustle", { hid: h.id, cid: null });
                  setPickerOpen(false);
                }}
                className="w-full text-left p-2 border border-zinc-800 text-xs text-zinc-400 hover:border-gold"
              >
                No Manager (Clear assignment)
              </button>
              {p.crew.filter((c) => !c.merc).map((c) => {
                const tr = config.crew_front_traits?.find((t) => t.id === c.front_trait);
                const assignedHustle = Object.entries(p.hustle_assign || {}).find(([k, v]) => v === c.id && k !== h.id);
                const assignedFront = Object.entries(p.front_assign || {}).find(([, v]) => v === c.id);
                const isMatch = c.specialty_biz === h.id;

                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      act("assign_hustle", { hid: h.id, cid: c.id });
                      setPickerOpen(false);
                    }}
                    className={`w-full text-left p-2 border text-xs flex items-center justify-between ${
                      mgrId === c.id ? "border-gold bg-gold/10" : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-zinc-100 flex flex-wrap items-center gap-1.5">
                        <span>{c.name}</span>
                        {tr && <span className="text-[10px] text-gold font-normal">[{tr.name}]</span>}
                        {isMatch && (
                          <span className="text-[9px] bg-gold/20 text-gold font-bold px-1 rounded border border-gold/40">
                            ★ Perfect Match (+20%)
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate">{tr?.desc || "Standard operations"}</div>
                      {c.origin && <div className="text-[9px] text-zinc-500">📍 {c.origin}</div>}
                      {assignedHustle && (
                        <div className="text-[9px] text-orange-400">Currently running: {config.hustles.find((x) => x.id === assignedHustle[0])?.name}</div>
                      )}
                      {assignedFront && (
                        <div className="text-[9px] text-amber-400">Currently at front: {config.fronts.find((x) => x.id === assignedFront[0])?.name}</div>
                      )}
                    </div>
                    <span className="text-[10px] text-kgreen font-mono shrink-0">Morale {c.morale ?? 85}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function HeatPanel({ now }) {
  const { player: p, derived: d, config, act } = useGame();
  const coolingRate = d.heat_cooling_per_hour || (p.lie_low_until > now ? 180 : 35);
  const heat = Math.max(0, p.heat - ((now - p.heat_ts) * coolingRate) / 3600);
  return (
    <Card accent="red" data-testid="heat-panel">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Heat tier {d.tier}/5 · Cooling -{coolingRate}/hr</div>
          <div className="font-display text-xl uppercase text-blood" data-testid="heat-tier-name">{d.tier_name}</div>
        </div>
        <div className="text-right text-[11px] text-zinc-400">Laundering fee <b className="text-zinc-100" data-testid="launder-fee">{Math.round(d.fee * 100)}%</b></div>
      </div>
      <div className="mt-2"><Bar pct={heat} color="red" testid="heat-bar" /></div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Btn variant="ghost" onClick={() => act("bribe")} disabled={heat < 1 || big(p.clean) < big(d.bribe_cost)} data-testid="heat-bribe-btn"><Scale className="h-3 w-3" />Bribe {cedi(d.bribe_cost)}</Btn>
        <Btn variant="ghost" onClick={() => act("lie_low")} disabled={p.lie_low_until > now} data-testid="heat-lielow-btn">
          <Snowflake className="h-3 w-3" />{p.lie_low_until > now ? dur(p.lie_low_until - now) : "Lie low 1h"}
        </Btn>
        <Btn variant="ghost" onClick={() => act("use_item", { item: "burner" })} disabled={!p.inv.burner} data-testid="heat-burner-btn"><Phone className="h-3 w-3" />Burner ×{p.inv.burner}</Btn>
        <Btn variant="ghost" onClick={() => act("use_item", { item: "lawyer" })} disabled={!p.inv.lawyer || d.lawyer_left <= 0} data-testid="heat-lawyer-btn"><Scale className="h-3 w-3" />Lawyer ×{p.inv.lawyer}</Btn>
        {config.black_market.filter((i) => i.kind === "heat" && i.id !== "burner" && p.inv[i.id] > 0).map((i) => (
          <Btn key={i.id} variant="ghost" className="col-span-2" onClick={() => act("use_item", { item: i.id })} data-testid={`heat-item-btn-${i.id}`}>{i.name} (-{i.value} heat) ×{p.inv[i.id]}</Btn>
        ))}
      </div>
    </Card>
  );
}

function FrontCard({ f, now }) {
  const { player: p, derived: d, config, act } = useGame();
  const [pickerOpen, setPickerOpen] = useState(false);
  const lvl = p.fronts[f.id] || 0;
  const batch = p.batches.find((b) => b.front === f.id);
  const cap = d.fronts[f.id].cap;
  const washAmt = big(p.dirty) < big(cap) ? big(p.dirty) : big(cap);
  const full = p.batches.length >= d.slots;

  const mgrId = p.front_assign?.[f.id];
  const mgr = p.crew.find((c) => c.id === mgrId);
  const trait = config.crew_front_traits?.find((t) => t.id === mgr?.front_trait);

  return (
    <Card accent={batch ? "green" : lvl ? "gold" : "none"} data-testid={`front-card-${f.id}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="font-display text-base uppercase text-zinc-100">{f.name}</div>
          <div className="text-[10px] uppercase tracking-wider text-zinc-500">
            LV {lvl} · washes {cedi(cap)} in {dur(f.dur)}
          </div>
        </div>
        <Btn
          variant="ghost"
          disabled={big(p.dirty) < big(d.fronts[f.id].cost)}
          onClick={() => act("buy_front", { fid: f.id })}
          data-testid={`front-buy-btn-${f.id}`}
        >
          {lvl ? "+1" : "Buy"} {cedi(d.fronts[f.id].cost)}
        </Btn>
      </div>

      {/* Front Manager Assignment */}
      {lvl > 0 && (
        <div className="mt-2.5 rounded border border-zinc-800/80 bg-zinc-950/60 p-2 text-[10px]">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 pr-1">
              <span className="text-zinc-500 uppercase tracking-wider font-bold">Manager: </span>
              {mgr ? (
                <span className="text-gold font-bold">
                  {mgr.name.split(" ")[0]} ({trait?.name || "Operative"})
                </span>
              ) : (
                <span className="text-zinc-400">None assigned</span>
              )}
            </div>
            <button
              onClick={() => setPickerOpen(true)}
              className="btn-press shrink-0 border border-zinc-700 bg-surface px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-zinc-300 hover:border-gold hover:text-gold"
              data-testid={`front-assign-btn-${f.id}`}
            >
              {mgr ? "Change" : "+ Assign"}
            </button>
          </div>

          {mgr && (
            <div className="mt-1 space-y-0.5">
              <div className="flex flex-wrap items-center gap-1.5 text-[9px] text-zinc-400">
                {mgr.origin && <span>📍 {mgr.origin}</span>}
                <span className="text-zinc-300 font-medium">· {trait?.desc}</span>
              </div>
              {mgr.specialty_biz === f.id && (
                <div className="mt-1 inline-flex items-center gap-1 rounded border border-gold/40 bg-gold/15 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-gold">
                  ★ Perfect Fit Synergy (+15% Wash Capacity & Speed)
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {batch ? (
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[11px]">
            <span className="text-zinc-400">{cedi(batch.amount)} → <b className="text-kgreen">{cedi(batch.out)}</b></span>
            <span className="font-mono text-zinc-300">{batch.end > now ? dur(batch.end - now) : "Ready"}</span>
          </div>
          <Bar pct={((now - batch.start) / (batch.end - batch.start)) * 100} color="green" />
          {batch.end <= now && (
            <Btn variant="green" className="mt-2 w-full" onClick={() => act("collect_batch", { bid: batch.id })} data-testid={`batch-collect-btn-${f.id}`}>
              Collect clean cedis
            </Btn>
          )}
        </div>
      ) : lvl > 0 && (
        <Btn
          variant="green"
          className="mt-3 w-full"
          disabled={washAmt <= 0n || full || d.is_arrested}
          onClick={() => act("launder", { fid: f.id, amount: washAmt.toString() })}
          data-testid={`launder-btn-${f.id}`}
        >
          {d.is_arrested
            ? "Halted by Ghana Police"
            : full
            ? "All slots busy"
            : `Launder ${cedi(washAmt)} (-${Math.round(d.fee * 100)}% fee)`}
        </Btn>
      )}

      {/* Manager Picker Modal */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-sm border border-gold bg-ink p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="font-display uppercase text-sm text-gold">Assign Manager: {f.name}</span>
              <button onClick={() => setPickerOpen(false)} className="text-xs text-zinc-400 hover:text-white">✕</button>
            </div>
            <p className="text-[11px] text-zinc-400">
              Assign a crew member to manage this front. Their unique street trait boosts laundering speed, capacity, or reduces transaction fees!
            </p>
            <div className="max-h-64 overflow-y-auto space-y-1.5">
              <button
                onClick={() => {
                  act("assign_front", { fid: f.id, cid: null });
                  setPickerOpen(false);
                }}
                className="w-full text-left p-2 border border-zinc-800 text-xs text-zinc-400 hover:border-gold"
              >
                No Manager (Clear assignment)
              </button>
              {p.crew.filter((c) => !c.merc).map((c) => {
                const tr = config.crew_front_traits?.find((t) => t.id === c.front_trait);
                const assignedFront = Object.entries(p.front_assign || {}).find(([k, v]) => v === c.id && k !== f.id);
                const assignedHustle = Object.entries(p.hustle_assign || {}).find(([, v]) => v === c.id);
                const isMatch = c.specialty_biz === f.id;

                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      act("assign_front", { fid: f.id, cid: c.id });
                      setPickerOpen(false);
                    }}
                    className={`w-full text-left p-2 border text-xs flex items-center justify-between ${
                      mgrId === c.id ? "border-gold bg-gold/10" : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-zinc-100 flex flex-wrap items-center gap-1.5">
                        <span>{c.name}</span>
                        {tr && <span className="text-[10px] text-gold font-normal">[{tr.name}]</span>}
                        {isMatch && (
                          <span className="text-[9px] bg-gold/20 text-gold font-bold px-1 rounded border border-gold/40">
                            ★ Perfect Fit (+15%)
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate">{tr?.desc || "Standard oversight"}</div>
                      {c.origin && <div className="text-[9px] text-zinc-500">📍 {c.origin}</div>}
                      {assignedFront && (
                        <div className="text-[9px] text-orange-400">Currently at front: {config.fronts.find((x) => x.id === assignedFront[0])?.name}</div>
                      )}
                      {assignedHustle && (
                        <div className="text-[9px] text-amber-400">Currently running hustle: {config.hustles.find((x) => x.id === assignedHustle[0])?.name}</div>
                      )}
                    </div>
                    <span className="text-[10px] text-kgreen font-mono shrink-0">Morale {c.morale ?? 85}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function Empire() {
  const { player: p, derived: d, config, act } = useGame();
  const now = useNow();
  const pending = Object.keys(p.hustles).reduce((s, k) => s + accruedOf(p, d, k, now), 0);
  const exposed = Math.max(0, Number(p.dirty) - Number(d.vault_cap));
  return (
    <div>
      <NewsTicker />
      {p.newbie_until > now && <div className="mt-3 border border-kgreen px-3 py-2 text-[11px] text-kgreen" data-testid="newbie-protection-note">Newbie protection: {dur(p.newbie_until - now)} left. No raids, no PvP on you.</div>}
      <ObjectivePanel />
      <TipSheet />
      <TapHustle pending={pending} />
      <div className="mt-3 flex items-center justify-between border border-zinc-800 px-3 py-2 text-[11px]" data-testid="vault-info">
        <span className="flex items-center gap-1.5 text-zinc-400"><Vault className="h-3.5 w-3.5 text-gold" />Vault protects {cedi(d.vault_cap)}</span>
        <span className={exposed > 0 ? "text-blood" : "text-kgreen"}>{exposed > 0 ? `${cedi(exposed)} exposed` : "All safe"}</span>
      </div>
      <SectionTitle kicker="Every few minutes" title="Street Hustles" right={<Chip><Clock className="h-3 w-3" />cap {d.offline_cap_h}h</Chip>} />
      <div className="grid gap-2">{config.hustles.map((h) => <HustleCard key={h.id} h={h} now={now} />)}</div>
      <SectionTitle kicker="Wash the money" title="Front Businesses" right={<Chip data-testid="launder-slots">{p.batches.length}/{d.slots} slots</Chip>} />
      {p.inv.timeskip > 0 && p.batches.length > 0 && (
        <Btn variant="ghost" className="mb-2 w-full" onClick={() => act("use_item", { item: "timeskip" }, { onResult: () => toast.success("Skipped 1 hour ahead") })} data-testid="timeskip-btn">
          <Timer className="h-3 w-3" />Use time skip (1h) · {p.inv.timeskip} left
        </Btn>
      )}
      <div className="grid gap-2">{config.fronts.map((f) => <FrontCard key={f.id} f={f} now={now} />)}</div>
      <SectionTitle kicker="Keep cool" title="Heat" />
      <HeatPanel now={now} />
    </div>
  );
}
