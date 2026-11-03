import { useState } from "react";
import { toast } from "sonner";
import { api, errMsg } from "../../lib/api";
import { useGame } from "../../store/game";
import { useNow } from "../../hooks/useNow";
import { dur, cedi, big } from "../../lib/fmt";
import { Btn, Card, Bar, SectionTitle, Chip, Sheet } from "../../components/game/ui";
import { MiniAvatar } from "../../lib/gear";

const STAT_LABEL = { brains: "BRN", wheels: "WHL", muscle: "MUS", stealth: "STL" };
const ARCH_COLOR = { hacker: "bg-sky-500", driver: "bg-gold", enforcer: "bg-blood", infiltrator: "bg-kgreen" };

export function statusOf(c, now) {
  if (!c.assign) return { label: "Free", cls: "text-kgreen" };
  if (c.assign === "defense") return { label: "On defence", cls: "text-gold" };
  if (c.assign.startsWith("heist")) return { label: "On a heist", cls: "text-blood" };
  if (c.assign.startsWith("listed")) return { label: "For rent", cls: "text-sky-300" };
  return { label: c.assign, cls: "text-zinc-400" };
}

export function CrewCard({ c, children }) {
  const { config, derived, act, player: p } = useGame();
  const now = useNow(10000);
  const eff = derived?.crew_eff?.[c.id] || c.stats || { brains: 5, wheels: 5, muscle: 5, stealth: 5 };
  
  // Check active business manager assignments
  const frontAssigned = Object.entries(p?.front_assign || {}).find(([, cid]) => cid === c.id);
  const frontObj = frontAssigned ? config.fronts?.find((f) => f.id === frontAssigned[0]) : null;
  const hustleAssigned = Object.entries(p?.hustle_assign || {}).find(([, cid]) => cid === c.id);
  const hustleObj = hustleAssigned ? config.hustles?.find((h) => h.id === hustleAssigned[0]) : null;

  let st = statusOf(c, now);
  if (frontObj) {
    const isSynergy = c.specialty_biz === frontObj.id;
    st = {
      label: `Managing ${frontObj.name}${isSynergy ? " ★" : ""}`,
      cls: isSynergy ? "text-gold font-black" : "text-kgreen",
    };
  } else if (hustleObj) {
    const isSynergy = c.specialty_biz === hustleObj.id;
    st = {
      label: `Running ${hustleObj.name}${isSynergy ? " ★" : ""}`,
      cls: isSynergy ? "text-gold font-black" : "text-sky-400",
    };
  }

  const strength = config.strengths?.find((x) => x.id === c.strength);
  const flaw = config.flaws?.find((x) => x.id === c.flaw);
  const frontTrait = config.crew_front_traits?.find((x) => x.id === c.front_trait);
  const specialtyName =
    config.fronts?.find((f) => f.id === c.specialty_biz)?.name ||
    config.hustles?.find((h) => h.id === c.specialty_biz)?.name ||
    c.specialty_biz;

  const morale = c.morale !== undefined ? c.morale : 85;
  const moraleColor = morale >= 80 ? "text-kgreen" : morale >= 40 ? "text-gold" : morale >= 15 ? "text-orange-400" : "text-blood";
  const moraleLabel = morale >= 80 ? "High (+15% stats / +10% biz)" : morale >= 40 ? "Content" : morale >= 15 ? "Low (-25% stats / -20% biz)" : "Critical (Desertion risk)";

  return (
    <Card accent="none" className="flex flex-col gap-2.5 sm:flex-row sm:gap-3" data-testid={`crew-card-${c.id}`}>
      <div className="relative shrink-0 flex items-start gap-3 sm:block">
        <div className="relative">
          <MiniAvatar look={c.look} size={54} testid={`crew-avatar-${c.id}`} />
          <span className={`absolute bottom-0 left-0 h-1.5 w-full ${ARCH_COLOR[c.arch]}`} />
        </div>
        <div className="sm:hidden min-w-0 flex-1">
          <div className="truncate font-display text-base uppercase text-zinc-100">{c.name}</div>
          <span className={`text-[10px] font-bold uppercase ${st.cls}`}>{st.label}</span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="hidden sm:flex items-center justify-between gap-2">
          <div className="truncate font-display text-sm uppercase text-zinc-100 font-bold">{c.name}</div>
          <span className={`shrink-0 text-[10px] font-bold uppercase ${st.cls}`} data-testid={`crew-status-${c.id}`}>
            {st.label}
          </span>
        </div>

        {/* Origin & Archetype Header */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-zinc-400">
          <span className="uppercase font-bold text-zinc-300">{c.arch} · LV {c.lvl}</span>
          {c.origin && (
            <span className="text-zinc-400 bg-surface2 px-1.5 py-0.5 rounded border border-zinc-800">
              📍 {c.origin}
            </span>
          )}
          {c.temperament && (
            <span className="text-amber-300/90 italic">
              · {c.temperament}
            </span>
          )}
          {c.merc && <Chip className="border-sky-700 text-sky-300">Merc · {dur(c.merc_until - now)}</Chip>}
          {c.elite && <span className="text-gold font-bold">· ELITE</span>}
        </div>

        {/* Street Bio Quote */}
        {c.bio && (
          <p className="mt-1 text-[10px] text-zinc-300 italic border-l-2 border-gold/50 pl-2 py-0.5 leading-snug">
            "{c.bio}"
          </p>
        )}

        {/* Daily Wage & Loadout Slot Status */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-[10px] rounded bg-zinc-950/60 p-1.5 border border-zinc-800">
          <div className="flex items-center gap-1 text-zinc-300">
            <span className="text-zinc-500 font-bold uppercase tracking-wider">Daily Wage:</span>
            <span className="font-mono font-bold text-gold">GH₵{c.daily_rate || 100}/day</span>
            <span className="text-[9px] text-zinc-500">(Avg GH₵100–800)</span>
          </div>
          {Object.keys(c.loadout || {}).length > 0 && (
            <div className="text-[9px] text-zinc-400">
              <span className="text-zinc-500 font-bold">Loadout: </span>
              <span className="text-sky-300 font-semibold">{Object.keys(c.loadout).length} gear slots equipped</span>
            </div>
          )}
        </div>

        {/* Equipped Loadout Chips */}
        {Object.keys(c.loadout || {}).length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1 text-[9px]">
            {Object.entries(c.loadout).map(([slot, uid]) => {
              const gi = p?.gear?.find((g) => g.uid === uid) || c.initial_gear?.find((g) => g.uid === uid);
              const def = config?.gear?.find((g) => g.id === gi?.id);
              return (
                <span key={slot} className="rounded bg-zinc-900 px-1.5 py-0.5 border border-zinc-700 text-zinc-300 font-mono">
                  {slot}: <b className="text-gold font-sans">{def?.name || "Equipped"}</b>
                </span>
              );
            })}
          </div>
        )}

        {/* Morale Status */}
        <div className="mt-2 flex items-center justify-between text-[9px]">
          <span className="text-zinc-400 font-bold uppercase">Morale:</span>
          <span className={`font-mono font-bold ${moraleColor}`}>{morale}% ({moraleLabel})</span>
        </div>
        <div className="mt-0.5">
          <Bar pct={morale} color={morale >= 80 ? "green" : morale >= 40 ? "gold" : "red"} />
        </div>

        {/* Base Stats */}
        <div className="mt-1.5 grid grid-cols-4 gap-1">
          {Object.entries(STAT_LABEL).map(([k, l]) => (
            <div key={k} className="text-[9px] font-bold text-zinc-500">
              {l} <span className="text-zinc-100">{eff[k]}</span>
              <Bar pct={eff[k] * 7} color={k === "muscle" ? "red" : k === "stealth" ? "green" : "gold"} />
            </div>
          ))}
        </div>

        {/* Strengths & Street Flaws */}
        <div className="mt-1.5 flex flex-wrap gap-1 text-[10px]">
          <span className="text-kgreen font-semibold">+ {strength?.name}</span>
          {flaw && flaw.id !== "none" && <span className="text-blood font-semibold">- {flaw.name}</span>}
        </div>

        {/* Business Trait Dossier Card */}
        {frontTrait && (
          <div className="mt-2 rounded border border-gold/40 bg-gold/5 p-2 text-[10px] space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="font-bold text-gold flex items-center gap-1 uppercase tracking-wide">
                ★ Business Trait: {frontTrait.name}
              </span>
              {c.specialty_biz && (
                <span className="text-[9px] font-bold text-kgreen bg-kgreen/15 px-1.5 py-0.5 rounded border border-kgreen/30">
                  ★ Best At: {specialtyName} (+15-20% Synergy)
                </span>
              )}
            </div>
            <div className="text-zinc-200 font-medium leading-tight">{frontTrait.desc}</div>
            {c.trait_reason && (
              <div className="text-[9px] text-zinc-400 leading-tight pt-0.5">
                <b className="text-zinc-500 uppercase tracking-wider">Street History:</b> {c.trait_reason}
              </div>
            )}
          </div>
        )}

        {/* EXP Bar (Crew grows with EXP, not cash) */}
        <div className="mt-2">
          <div className="flex justify-between text-[9px] text-zinc-500">
            <span>EXP Progression (Rises through field operations)</span>
            <span className="font-mono text-zinc-300">{c.xp} / {30 * c.lvl} XP</span>
          </div>
          <Bar pct={(c.xp / (30 * c.lvl)) * 100} color="gold" />
        </div>

        {children}
      </div>
    </Card>
  );
}

function RentOut({ c, onClose }) {
  const cap = 1000 * c.lvl + 100 * Object.values(c.stats).reduce((a, b) => a + b, 0);
  const [price, setPrice] = useState(Math.floor(cap / 2));
  const [hours, setHours] = useState(4);
  const submit = async () => {
    try {
      const { data } = await api.post("/market/list", { crew_id: c.id, price: Number(price), hours });
      useGame.getState().apply(data);
      toast.success(`${c.name} listed on the mercenary market`);
      onClose();
    } catch (e) { toast.error(errMsg(e)); }
  };
  return (
    <Sheet open onClose={onClose} testid="rent-out-sheet">
      <h3 className="font-display text-2xl uppercase text-zinc-100">Rent out {c.name}</h3>
      <p className="mt-1 text-xs text-zinc-400">Server holds the payment until the rental ends. Max price {cedi(cap)}.</p>
      <label className="mt-4 block text-[10px] uppercase tracking-widest text-zinc-500">Price (dirty GH₵)</label>
      <input type="number" min={1} max={cap} value={price} onChange={(e) => setPrice(e.target.value)} data-testid="rent-out-price-input"
        className="mt-1 w-full border border-zinc-700 bg-ink px-3 py-2 font-bold text-zinc-100 outline-none focus:border-gold" />
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[1, 4, 12].map((h) => <Btn key={h} variant={hours === h ? "gold" : "ghost"} onClick={() => setHours(h)} data-testid={`rent-out-hours-${h}`}>{h}h</Btn>)}
      </div>
      <Btn className="mt-5 w-full py-3" onClick={submit} disabled={!price || price > cap} data-testid="rent-out-submit-btn">List for rent</Btn>
    </Sheet>
  );
}

function TrainSheet({ c, onClose }) {
  const { player: p, config, act } = useGame();
  const live = p.crew.find((x) => x.id === c.id) || c;
  const cost = (s) => Math.floor(250 * live.stats[s] ** 2 * (1 + live.lvl / 10));
  return (
    <Sheet open onClose={onClose} testid="crew-train-sheet">
      <h3 className="font-display text-2xl uppercase text-zinc-100">Train {live.name}</h3>
      <p className="mt-1 text-xs text-zinc-400">Each point costs more than the last. Max {config.crew_stat_max} per stat (base).</p>
      <div className="mt-4 grid gap-2">
        {Object.entries(STAT_LABEL).map(([s]) => (
          <div key={s} className="flex items-center justify-between border border-zinc-800 p-2.5">
            <div><div className="text-sm font-bold uppercase text-zinc-100">{s}</div><div className="text-[11px] text-zinc-500">base {live.stats[s]}</div></div>
            <Btn disabled={live.stats[s] >= config.crew_stat_max || big(p.dirty) < big(cost(s))} onClick={() => act("crew_train", { crew_id: live.id, stat: s })} data-testid={`crew-train-btn-${s}`}>+1 · {cedi(cost(s))}</Btn>
          </div>
        ))}
        {live.flaw !== "none" && (
          <div className="flex items-center justify-between border border-blood/50 p-2.5">
            <div><div className="text-sm font-bold text-zinc-100">Rehab: fix "{config.flaws.find((f) => f.id === live.flaw)?.name}"</div><div className="text-[11px] text-zinc-500">Paid in clean cedis</div></div>
            <Btn variant="green" disabled={big(p.clean) < big(800 * live.lvl)} onClick={() => act("crew_rehab", { crew_id: live.id })} data-testid="crew-rehab-btn">{cedi(800 * live.lvl)}</Btn>
          </div>
        )}
        <div className="flex items-center justify-between border border-gold/40 p-2.5 bg-gold/5">
          <div><div className="text-sm font-bold text-gold">Morale Bonus</div><div className="text-[10px] text-zinc-400">Boost morale & loyalty</div></div>
          <div className="flex gap-1.5">
            <Btn variant="ghost" disabled={big(p.dirty) < big(1000) || (live.morale || 85) >= 100} onClick={() => act("crew_bonus", { crew_id: live.id, currency: "dirty" })} data-testid="crew-bonus-dirty-btn">GH₵1,000 Dirty (+25%)</Btn>
            <Btn variant="green" disabled={big(p.clean) < big(400) || (live.morale || 85) >= 100} onClick={() => act("crew_bonus", { crew_id: live.id, currency: "clean" })} data-testid="crew-bonus-clean-btn">GH₵400 Clean (+40%)</Btn>
          </div>
        </div>
        <Btn variant="ghost" className="mt-2 text-blood border-blood/30 hover:border-blood" onClick={() => { act("crew_dismiss", { crew_id: live.id }); onClose(); }} data-testid="crew-dismiss-btn">Dismiss {live.name.split(" ")[0]} from Syndicate</Btn>
      </div>
    </Sheet>
  );
}

export default function Crew() {
  const { player: p, derived: d, config, act, openLocker } = useGame();
  const [renting, setRenting] = useState(null);
  const [training, setTraining] = useState(null);
  const own = p.crew.filter((c) => !c.merc);
  const mercs = p.crew.filter((c) => c.merc);
  return (
    <div>
      <SectionTitle kicker={`${own.length}/${d.crew_cap} members`} title="Your Crew" right={<Chip data-testid="crew-defence-total">Defence {d.defence}</Chip>} />
      <p className="-mt-1 mb-3 text-xs text-zinc-500">One place at a time: heist, compound defence, or rental. Hire more at the Crew Agency (Market).</p>
      {config.black_market.filter((i) => i.kind === "crew_xp" && p.inv[i.id] > 0).map((i) => (
        <Btn key={i.id} variant="ghost" className="mb-2 w-full" onClick={() => act("use_item", { item: i.id })} data-testid={`crew-item-btn-${i.id}`}>Share {i.name} (+{i.value} XP free crew) · {p.inv[i.id]}</Btn>
      ))}
      <div className="grid gap-2">
        {own.map((c) => (
          <CrewCard key={c.id} c={c}>
            <div className="mt-2 flex flex-wrap gap-2">
              {(!c.assign || c.assign === "defense") && (
                <Btn variant={c.assign === "defense" ? "gold" : "ghost"} onClick={() => act("assign", { crew_id: c.id, assign: c.assign === "defense" ? null : "defense" })} data-testid={`crew-defence-toggle-${c.id}`}>
                  {c.assign === "defense" ? "Off defence" : "Defend compound"}
                </Btn>
              )}
              {c.assign && (c.assign.startsWith("front:") || c.assign.startsWith("hustle:")) && (
                <Btn variant="ghost" className="text-amber-400 border-amber-500/40" onClick={() => act("unassign_business", { crew_id: c.id })} data-testid={`crew-unassign-btn-${c.id}`}>
                  Unassign from Business
                </Btn>
              )}
              {!c.assign && <Btn variant="ghost" onClick={() => setRenting(c)} data-testid={`crew-rent-out-btn-${c.id}`}>Rent out</Btn>}
              <Btn variant="ghost" onClick={() => openLocker(c.id)} data-testid={`crew-locker-btn-${c.id}`}>Gear up</Btn>
              {(!c.assign || c.assign === "defense") && <Btn variant="ghost" onClick={() => setTraining(c)} data-testid={`crew-train-open-btn-${c.id}`}>Train</Btn>}
            </div>
          </CrewCard>
        ))}
      </div>
      {mercs.length > 0 && (
        <>
          <SectionTitle kicker="Hired guns" title="Mercenaries" />
          <div className="grid gap-2">{mercs.map((c) => <CrewCard key={c.id} c={c} />)}</div>
        </>
      )}
      {renting && <RentOut c={renting} onClose={() => setRenting(null)} />}
      {training && <TrainSheet c={training} onClose={() => setTraining(null)} />}
    </div>
  );
}
