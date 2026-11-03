import { useState } from "react";
import { toast } from "sonner";
import {
  ShieldAlert,
  Wrench,
  Radio,
  Bed,
  Zap,
  Vault,
  Building2,
  HeartPulse,
  Award,
  Plus,
  Sparkles,
} from "lucide-react";
import { useGame } from "../../../store/game";
import { cedi, fmt } from "../../../lib/fmt";
import { Btn, Card, Bar, SectionTitle, Chip } from "../../../components/game/ui";

const FACILITY_ICONS = {
  infirmary: HeartPulse,
  armoury: Wrench,
  radio_tower: Radio,
  barracks: Bed,
  generator: Zap,
  vault: Vault,
  walls: Building2,
};

export default function Mansion() {
  const { player: p, derived: d, config, act } = useGame();
  const [activeTab, setActiveTab] = useState("facilities"); // "facilities" | "boss"
  const facilities = d?.facilities || [];
  const bossPerks = d?.boss_perks || [];

  const upgradeFac = (id) => {
    act("upgrade_facility", { facility_id: id }, {
      onResult: (res) => toast.success("Compound facility upgraded! Perks active."),
    });
  };

  const upgradePerk = (id) => {
    act("upgrade_boss_perk", { perk_id: id }, {
      onResult: () => toast.success("Boss perk unlocked! Mastery increased."),
    });
  };

  return (
    <div data-testid="mansion-compound-screen">
      <SectionTitle
        kicker="State of Decay Base Management"
        title="Syndicate Compound"
        right={<Chip className="border-gold text-gold">Defense {d?.defence || 15}</Chip>}
      />

      <div className="mb-3 grid grid-cols-2 gap-1.5" data-testid="mansion-subtabs">
        <button
          onClick={() => setActiveTab("facilities")}
          className={`border py-2 text-[10px] font-extrabold uppercase tracking-wider ${
            activeTab === "facilities" ? "border-gold bg-gold text-ink" : "border-zinc-800 bg-surface text-zinc-400"
          }`}
          data-testid="mansion-tab-facilities"
        >
          Compound Facilities ({facilities.length})
        </button>
        <button
          onClick={() => setActiveTab("boss")}
          className={`border py-2 text-[10px] font-extrabold uppercase tracking-wider ${
            activeTab === "boss" ? "border-gold bg-gold text-ink" : "border-zinc-800 bg-surface text-zinc-400"
          }`}
          data-testid="mansion-tab-boss"
        >
          Boss Skills (LV {p.level}) {p.skill_points > 0 && <span className="text-blood ml-1">+{p.skill_points}</span>}
        </button>
      </div>

      {activeTab === "facilities" && (
        <div className="grid gap-2">
          <p className="text-xs text-zinc-400 -mt-1 mb-2">
            State-of-decay compound infrastructure. Upgrade assets to bolster raid defenses, house larger crews, speed up laundering, and heal morale.
          </p>

          {facilities.map((fac) => {
            const Icon = FACILITY_ICONS[fac.id] || Building2;
            const canAfford =
              BigInt(p.dirty) >= BigInt(fac.cost_dirty) &&
              BigInt(p.clean) >= BigInt(fac.cost_clean);

            return (
              <Card
                key={fac.id}
                accent={fac.lvl > 0 ? "gold" : "none"}
                data-testid={`facility-card-${fac.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 border border-zinc-700 bg-ink rounded">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <div className="font-display text-base uppercase text-zinc-100 flex items-center gap-2">
                        {fac.name}
                        <span className="text-[10px] text-gold font-mono">
                          LV {fac.lvl}/{fac.max}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{fac.desc}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 border-t border-zinc-800/80 pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    Facility Perks
                  </div>
                  <div className="grid gap-1">
                    {fac.perks.map((perk, i) => (
                      <div
                        key={i}
                        className={`text-[10px] flex items-center gap-1.5 ${
                          fac.lvl > i ? "text-kgreen font-semibold" : "text-zinc-500"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${fac.lvl > i ? "bg-kgreen" : "bg-zinc-700"}`} />
                        {perk} {fac.lvl <= i && "(Locked)"}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-2">
                  <div className="text-[10px] text-zinc-400">
                    {fac.can_upgrade ? (
                      <>
                        Cost: <b className="text-zinc-200">{cedi(fac.cost_dirty)}</b> dirty +{" "}
                        <b className="text-kgreen">{cedi(fac.cost_clean)}</b> clean
                      </>
                    ) : (
                      <span className="text-gold font-bold">Facility Max Level Reached</span>
                    )}
                  </div>
                  {fac.can_upgrade && (
                    <Btn
                      disabled={!canAfford}
                      onClick={() => upgradeFac(fac.id)}
                      data-testid={`facility-upgrade-btn-${fac.id}`}
                      className="text-[11px] py-1"
                    >
                      Upgrade LV {fac.lvl + 1}
                    </Btn>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === "boss" && (
        <div className="grid gap-2">
          <Card accent="gold" className="mb-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Boss Street Rank</div>
                <div className="font-display text-4xl text-gold" data-testid="boss-uncapped-level">
                  Level {p.level}
                </div>
                <div className="text-[11px] text-zinc-400">Regular progression (No Level Cap)</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase text-zinc-500">Available Points</div>
                <div className="font-display text-3xl text-kgreen" data-testid="boss-skill-points">
                  {p.skill_points || 0}
                </div>
                <div className="text-[10px] text-zinc-500">+1 Point per Level Up</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                <span>XP Progress</span>
                <span>{fmt(p.xp)} / {fmt(d.xp_needed)} XP</span>
              </div>
              <Bar pct={(p.xp / d.xp_needed) * 100} color="gold" />
            </div>
          </Card>

          <SectionTitle kicker="Syndicate Leader Mastery" title="Boss Perks" />
          {bossPerks.map((bp) => {
            const hasPoints = (p.skill_points || 0) > 0;
            const canRank = bp.can_upgrade;

            return (
              <Card key={bp.id} accent={bp.rank > 0 ? "gold" : "none"} data-testid={`boss-perk-card-${bp.id}`}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-display text-base uppercase text-zinc-100 flex items-center gap-2">
                      {bp.name}
                      <span className="text-xs text-gold font-mono">Rank {bp.rank}/{bp.max}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">{bp.desc}</div>
                  </div>
                  <Btn
                    variant={canRank ? "gold" : "ghost"}
                    disabled={!canRank}
                    onClick={() => upgradePerk(bp.id)}
                    data-testid={`boss-perk-upgrade-${bp.id}`}
                  >
                    {bp.rank >= bp.max ? "Maxed" : hasPoints ? "+1 Rank" : "Need Points"}
                  </Btn>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
