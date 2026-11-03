import { useState } from "react";
import { toast } from "sonner";
import { ShieldAlert, Users, Swords, AlertTriangle, Handshake, Siren, CheckCircle2, Shield, Crosshair, Target, Skull } from "lucide-react";
import { useGame } from "../../../store/game";
import { useNow } from "../../../hooks/useNow";
import { cedi, dur, big } from "../../../lib/fmt";
import { Btn, Card, Bar, SectionTitle, Chip, Sheet } from "../../../components/game/ui";

const mood = (g) => (g >= 70 ? "Blood feud (Allies mobilizing)" : g >= 50 ? "Solidarity war pact" : g >= 30 ? "Holding a grudge" : g >= 15 ? "Watching you" : "Calm");

function AssassinSheet({ r, onClose }) {
  const { player: p, config, act } = useGame();
  const contact = config.assassin_contact;
  const contracts = contact?.contracts || [];
  const g = p.grudges[r.id] || 0;

  const hireAssassin = (contract) => {
    act(
      "assassin_contract",
      { rival: r.id, contract: contract.id },
      {
        onResult: () => {
          toast.success(`Contract sealed! Salifu "The Ghost" deployed against ${r.name}.`);
          onClose();
        },
      }
    );
  };

  return (
    <Sheet open onClose={onClose} testid="assassin-sheet">
      <div className="flex items-center gap-2">
        <Crosshair className="h-4 w-4 text-purple-400" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400">
          Underworld Contract Killer
        </span>
      </div>
      <h3 className="font-display text-2xl uppercase text-zinc-100 flex items-center justify-between">
        <span>Target: {r.name}</span>
        <span className="text-xs font-mono text-zinc-400 font-normal">Boss: {r.boss}</span>
      </h3>
      <div className="mt-2 rounded border border-purple-900/60 bg-purple-950/20 p-2.5 text-xs text-purple-200">
        <div className="flex items-center gap-2 font-bold text-purple-300">
          <Skull className="h-4 w-4 text-purple-400" />
          <span>Salifu "The Ghost" (Bukom Shadow Broker)</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-300 leading-relaxed">
          Accra's premier clandestine operator. Eliminates targets quietly for cold, clean cash. Contracting a hit cuts rival power, pacifies grudges, or permanently breaks syndicate leadership.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {contracts.map((c) => {
          const hasClean = !c.cost_clean || big(p.clean) >= big(c.cost_clean);
          const hasDirty = !c.cost_dirty || big(p.dirty) >= big(c.cost_dirty);
          const canAfford = hasClean && hasDirty;
          const isBossHit = c.id === "boss_hit";
          const isKneecap = c.id === "kneecap";

          const costStr = [
            c.cost_dirty ? `${cedi(c.cost_dirty)} dirty` : null,
            c.cost_clean ? `${cedi(c.cost_clean)} clean` : null,
          ].filter(Boolean).join(" + ");

          return (
            <div
              key={c.id}
              className={`border p-3 ${
                isBossHit
                  ? "border-purple-600 bg-purple-950/30"
                  : isKneecap
                  ? "border-zinc-700 bg-surface"
                  : "border-zinc-800 bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-display text-sm uppercase text-zinc-100 flex items-center gap-1.5">
                    <span>{c.name}</span>
                    <span className="text-[10px] font-mono text-purple-400 border border-purple-800 px-1 py-0.2">
                      -{Math.round((c.power_cut_pct || 0.2) * 100)}% Muscle
                    </span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-zinc-300 font-medium">
                    {c.desc}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-zinc-400">
                    <span>⏳ Duration: <b>{dur((c.duration_mins || 60) * 60)}</b></span>
                    <span>💰 Fee: <b className="text-gold font-mono">{costStr}</b></span>
                  </div>
                </div>
                <Btn
                  variant={isBossHit ? "red" : "ghost"}
                  disabled={!canAfford}
                  onClick={() => hireAssassin(c)}
                  className="shrink-0 text-xs py-1.5"
                  data-testid={`hire-assassin-${c.id}`}
                >
                  {canAfford ? "Contract" : "Insufficient funds"}
                </Btn>
              </div>
            </div>
          );
        })}
      </div>
    </Sheet>
  );
}

function TruceSheet({ r, onClose }) {
  const { player: p, act } = useGame();
  const g = p.grudges[r.id] || 0;
  const costDirty = Math.floor(800 + g * 20);
  const costClean = Math.floor(250 + g * 10);

  const sendTruce = (kind) => {
    act("truce_rival", { rival: r.id, kind }, {
      onResult: () => {
        toast.success(`Tribute delivered to ${r.boss}! Tensions lowered.`);
        onClose();
      },
    });
  };

  return (
    <Sheet open onClose={onClose} testid="truce-sheet">
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Underworld Diplomacy</div>
      <h3 className="font-display text-2xl uppercase text-zinc-100">Peace Treaty with {r.name}</h3>
      <p className="mt-1 text-xs text-zinc-400">
        Current Grudge: <b className="text-blood">{g}/100</b> ({mood(g)}). Lowering their grudge will defuse alliance retaliation and solidarity raids.
      </p>

      <div className="mt-4 space-y-3">
        {/* Street Peace Gift */}
        <div className="border border-zinc-800 p-3 bg-surface">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-sm uppercase text-zinc-100">Street Cash Offering</div>
              <div className="text-[11px] text-zinc-400">-25 Grudge · Pay {cedi(costDirty)} dirty</div>
            </div>
            <Btn
              disabled={big(p.dirty) < big(costDirty)}
              onClick={() => sendTruce("gift")}
              data-testid="truce-gift-btn"
            >
              Send {cedi(costDirty)}
            </Btn>
          </div>
        </div>

        {/* Official Syndicate Treaty */}
        <div className="border border-gold/40 p-3 bg-gold/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-sm uppercase text-gold">Formal Syndicate Non-Aggression Pact</div>
              <div className="text-[11px] text-zinc-400">-50 Grudge & calms treaty ally · Pay {cedi(costClean)} clean</div>
            </div>
            <Btn
              variant="green"
              disabled={big(p.clean) < big(costClean)}
              onClick={() => sendTruce("treaty")}
              data-testid="truce-treaty-btn"
            >
              Sign ({cedi(costClean)} clean)
            </Btn>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

export default function Rivals() {
  const { player: p, derived: d, config, act } = useGame();
  const now = useNow(2000);
  const [truceRival, setTruceRival] = useState(null);
  const [assassinRival, setAssassinRival] = useState(null);

  const activeRaidRival = p.raid ? config.rivals.find((r) => r.id === p.raid.rival) : null;
  const raidTimeLeft = p.raid ? Math.max(0, p.raid.resolve_at - now) : 0;
  const contact = config.assassin_contact;

  const activeHitsCount = Object.keys(p.assassin_hits || {}).filter(
    (k) => (p.assassin_hits[k]?.until || 0) > now
  ).length;

  return (
    <div className="space-y-4">
      <div>
        <SectionTitle kicker="11 Syndicates · Diplomacy & Alliance Blocs" title="Rival Underworld Syndicates" />
        <p className="-mt-1 text-xs text-zinc-400">
          Accra's underworld is carved between 11 rival cartels tied into mutual defense treaties. When you hit a rival and their grudge reaches 50+, their treaty ally will launch solidarity raids against your compound!
        </p>
      </div>

      {/* HEAT & GRUDGE NATURAL COOLDOWN STATUS INDICATOR */}
      <div className="flex flex-wrap items-center justify-between gap-2 border border-zinc-800 bg-surface px-3 py-2 text-[11px] text-zinc-300">
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-kgreen shrink-0" />
          <span><b>Street Calm Active:</b> Grudges cool naturally by -1 every ~20s of peace. Heat dissipating steadily.</span>
        </div>
        heat_cooling_per_hour:
  p.lie_low_until > now
    ? 180
    : (35 + (p.upgrades?.safehouse ? 15 : 0) + ((p.facilities?.safehouse || 0) * 10) + ((p.facilities?.infirmary || 0) * 5)),
      </div>

      {/* ASSASSIN CONTACT DOSSIER BANNER */}
      <div className="border border-purple-800/80 bg-purple-950/25 p-3 relative overflow-hidden" data-testid="assassin-dossier-banner">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            <div className="h-9 w-9 rounded-sm border border-purple-500 bg-purple-900/40 flex items-center justify-center shrink-0">
              <Skull className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display uppercase text-sm text-purple-200">{contact?.name || "Salifu 'The Ghost'"}</span>
                <span className="text-[9px] font-mono font-bold bg-purple-900/60 text-purple-300 border border-purple-700 px-1 py-0.2">
                  {contact?.alias || "Bukom Shadow Broker"}
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 mt-0.5 line-clamp-2">
                {contact?.desc || "Accra's premier clandestine operator. Eliminates targets and cuts rival muscle for clean cash."}
              </p>
            </div>
          </div>
          {activeHitsCount > 0 && (
            <Chip className="border-purple-500 text-purple-300 bg-purple-950 font-bold shrink-0">
              <Crosshair className="h-3 w-3 inline mr-1 text-purple-400" />
              {activeHitsCount} Active Hit{activeHitsCount > 1 ? "s" : ""}
            </Chip>
          )}
        </div>
      </div>

      {/* ACTIVE COMPOUND RAID ALERT BANNER */}
      {p.raid && (
        <Card accent="red" className="p-3.5 border-blood bg-blood/10 space-y-2.5 animate-pulse" data-testid="active-raid-alert">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-blood animate-bounce" />
              <div>
                <span className="font-display text-sm uppercase text-white font-bold">
                  COMPOUND UNDER RAID: {activeRaidRival?.name || "Rival Raiders"}!
                </span>
                <div className="text-[11px] text-zinc-300">
                  Hits in <b className="font-mono text-gold">{dur(raidTimeLeft)}</b> · Attack: ~{p.raid.attack} vs Your Defence: {d.defence}
                </div>
              </div>
            </div>
            <Btn
              variant="red"
              className="py-1 px-3 text-xs font-bold"
              onClick={() => act("confront_raid")}
              data-testid="confront-raid-btn"
            >
              Engage Raiders Now
            </Btn>
          </div>
          <p className="text-[11px] italic text-zinc-300 border-l-2 border-blood pl-2">
            "{p.raid.taunt}"
          </p>
        </Card>
      )}

      <div className="grid gap-2.5">
        {config.rivals.map((r) => {
          const g = p.grudges[r.id] || 0;
          const cd = (p.rival_cd[r.id] || 0) - now;
          const isBossOfWeek = d.boss === r.id;
          const ally = config.rivals.find((x) => x.id === r.ally_id);
          const allianceActive = g >= 50;
          const rivalPow = d.rival_powers?.[r.id] || 80;
          const myPow = d.power || 50;

          const activeHit = p.assassin_hits?.[r.id];
          const hasActiveHit = activeHit && activeHit.until > now;
          const hitContractDef = hasActiveHit
            ? contact?.contracts?.find((c) => c.id === activeHit.contract_type)
            : null;

          const threatLevel =
            myPow >= rivalPow * 1.15
              ? { text: "Favorable Match", color: "text-kgreen", bg: "bg-kgreen/10 border-kgreen/30" }
              : myPow >= rivalPow * 0.9
              ? { text: "Even Match", color: "text-gold", bg: "bg-gold/10 border-gold/30" }
              : { text: "High Threat", color: "text-blood font-bold", bg: "bg-blood/10 border-blood/40" };

          return (
            <Card
              key={r.id}
              accent={hasActiveHit ? "none" : allianceActive ? "red" : isBossOfWeek ? "gold" : "none"}
              className={`p-3 relative ${hasActiveHit ? "border-purple-600/80 bg-purple-950/10" : allianceActive ? "border-blood/70 bg-blood/5" : ""}`}
              data-testid={`rival-card-${r.id}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-display text-base uppercase text-zinc-100 flex items-center gap-1.5 font-bold">
                    <span>{r.name}</span>
                    <span className="text-[9px] font-mono font-bold text-sky-400 bg-sky-950/50 border border-sky-800 px-1 py-0.2">
                      {r.bloc}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Boss: <b className="text-zinc-200">{r.boss}</b> · Stance: <span className="text-zinc-300 font-semibold">{r.personality}</span> · {config.districts.find((x) => x.id === r.district)?.name}
                  </div>
                  {ally && (
                    <div className="mt-0.5 text-[10px] text-zinc-400 flex items-center gap-1">
                      <Users className="h-3 w-3 text-gold" />
                      <span>Alliance Treaty: <b className="text-zinc-300">{ally.name}</b> ({ally.boss})</span>
                    </div>
                  )}
                </div>
                {isBossOfWeek && (
                  <Chip className="border-gold text-gold bg-gold/10 font-bold" data-testid={`rival-boss-week-${r.id}`}>
                    ★ Boss of Week · 2x Loot!
                  </Chip>
                )}
              </div>

              {/* Power and Threat comparison */}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-[10px] bg-zinc-900/60 p-1.5 border border-zinc-800">
                <div className="text-zinc-300">
                  Syndicate Muscle: <b className="font-mono text-zinc-100 font-bold">~{rivalPow} Pow</b> vs Your <b className="font-mono text-gold font-bold">{myPow} Pow</b>
                </div>
                <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded border ${threatLevel.bg} ${threatLevel.color}`}>
                  {threatLevel.text}
                </span>
              </div>

              {/* ACTIVE ASSASSIN DEBUFF BANNER */}
              {hasActiveHit && (
                <div className="mt-2 rounded border border-purple-500/60 bg-purple-950/30 p-2 text-[10px] text-purple-200 flex items-center justify-between" data-testid={`active-assassin-hit-${r.id}`}>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Crosshair className="h-4 w-4 text-purple-400 shrink-0 animate-pulse" />
                    <span>ASSASSIN HIT ACTIVE: {hitContractDef?.name || "Ghost Hit"} (-{Math.round((activeHit.power_cut || 0) * 100)}% Muscle)</span>
                  </div>
                  <span className="font-mono text-purple-300 font-bold shrink-0">{dur(activeHit.until - now)} left</span>
                </div>
              )}

              {/* Alliance Solidarity Raid Threat Alert */}
              {allianceActive && (
                <div className="mt-2 rounded border border-blood/50 bg-blood/10 p-2 text-[10px] text-blood flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-blood" />
                  <span>
                    <b>MUTUAL DEFENSE PACT ACTIVE:</b> Grudge is {g}/100! Ally <b>{ally?.name || "Allies"}</b> is pledged to retaliate against your compound!
                  </span>
                </div>
              )}

              <div className="mt-2 flex justify-between text-[10px] uppercase text-zinc-400">
                <span>Grudge & Tension</span>
                <span data-testid={`rival-grudge-${r.id}`} className={allianceActive ? "text-blood font-bold" : ""}>
                  {g}/100 · {mood(g)}
                </span>
              </div>
              <Bar pct={g} color={g >= 50 ? "red" : "gold"} />

              <div className="mt-3 flex flex-wrap gap-2">
                <Btn
                  variant="red"
                  className="flex-1 min-w-[130px] py-2 font-bold"
                  disabled={cd > 0 || d.is_arrested}
                  data-testid={`rival-hit-btn-${r.id}`}
                  onClick={() =>
                    act(
                      "hit_rival",
                      { rival: r.id },
                      {
                        onResult: (res) => {
                          if (res.won) {
                            toast.success(`Hit landed on ${r.name}! Grabbed ${cedi(res.loot)}${res.bossOfWeek ? " (2x Boss of Week Bonus!)" : ""}${res.drop ? ` + Loot: ${res.drop}!` : ""}`);
                            if (res.retaliated) {
                              toast.warning(`Retaliation! Their ally launched a solidarity raid against your compound!`);
                            }
                          } else {
                            toast.error(`Their boys were waiting! Repelled with elevated heat.`);
                            if (res.retaliated) {
                              toast.warning(`Retaliation raid launched by treaty ally!`);
                            }
                          }
                        },
                      }
                    )
                  }
                >
                  {d.is_arrested
                    ? "Arrested: Cannot Hit Corners"
                    : cd > 0
                    ? `Corner On Lockdown (${dur(cd)})`
                    : `Clash Corner: Hit ${r.name}`}
                </Btn>

                <Btn
                  variant="ghost"
                  className="shrink-0 text-xs text-purple-400 border-purple-800/80 hover:border-purple-500 hover:text-purple-300"
                  onClick={() => setAssassinRival(r)}
                  data-testid={`rival-assassin-btn-${r.id}`}
                >
                  <Crosshair className="h-3.5 w-3.5 inline mr-1 text-purple-400" />
                  {hasActiveHit ? "Active Hit" : "Assassin Hit"}
                </Btn>

                {g > 0 && (
                  <Btn
                    variant="ghost"
                    className="shrink-0 text-xs text-gold border-gold/40 hover:border-gold"
                    onClick={() => setTruceRival(r)}
                    data-testid={`rival-truce-btn-${r.id}`}
                  >
                    <Handshake className="h-3.5 w-3.5 inline mr-1" />
                    Peace Envoy
                  </Btn>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {p.raid_log.length > 0 && (
        <div className="space-y-2">
          <SectionTitle title="Raid Defense History" />
          <div className="grid gap-1.5" data-testid="raid-history">
            {p.raid_log.slice(0, 8).map((r, i) => (
              <div
                key={i}
                className={`border p-2.5 text-xs rounded-sm ${
                  r.won ? "border-kgreen/40 bg-kgreen/5 text-kgreen" : "border-blood/40 bg-blood/5 text-blood"
                }`}
              >
                <div className="flex justify-between font-bold">
                  <span>{r.won ? `Repelled ${r.rival}` : `Breached by ${r.rival}`}</span>
                  <span>{r.won ? `+${cedi(r.amount)} seized` : `-${cedi(r.amount)} lost`}</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  Your Defense {r.defence} vs Attack {r.attack}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <SectionTitle title="Underworld Street Wire" />
        <div className="grid gap-1" data-testid="street-log">
          {p.log.slice(0, 10).map((l, i) => (
            <div
              key={i}
              className={`border-l-2 px-3 py-1.5 text-xs ${
                l.kind === "good"
                  ? "border-kgreen bg-surface text-zinc-200"
                  : l.kind === "bad"
                  ? "border-blood bg-surface text-zinc-200"
                  : "border-zinc-700 bg-surface text-zinc-400"
              }`}
            >
              {l.msg}
            </div>
          ))}
        </div>
      </div>

      {truceRival && <TruceSheet r={truceRival} onClose={() => setTruceRival(null)} />}
      {assassinRival && <AssassinSheet r={assassinRival} onClose={() => setAssassinRival(null)} />}
    </div>
  );
}
