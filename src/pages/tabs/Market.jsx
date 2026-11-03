import { useState } from "react";
import { useGame } from "../../store/game";
import { useNow } from "../../hooks/useNow";
import { dur, cedi, big } from "../../lib/fmt";
import { Btn, Card, SectionTitle, Chip } from "../../components/game/ui";
import { CrewCard } from "./Crew";

const SUBS = [["black_market", "Black Market"], ["gun_shop", "Gun Shop"], ["boutique", "Boutique"], ["agency", "Crew Agency"], ["mansion", "Mansion"], ["garage", "Garage"]];
const RARITY = { common: "text-zinc-300", rare: "text-sky-300", legendary: "text-gold" };

function Restock() {
  const { player: p, derived: d, act, showAd } = useGame();
  const now = useNow();
  return (
    <div className="mt-3 flex items-center justify-between gap-2 border border-zinc-800 p-2 text-[11px]" data-testid="store-restock-bar">
      <span className="text-zinc-400">Restock in <b className="font-mono text-zinc-100" data-testid="store-restock-timer">{dur(d.store_next - now)}</b></span>
      <div className="flex gap-1.5">
        <Btn variant="ghost" disabled={big(p.clean) < big(d.restock_cost)} onClick={() => act("store_restock")} data-testid="store-bribe-restock-btn">Bribe {cedi(d.restock_cost)}</Btn>
        <Btn variant="ghost" disabled={p.ads.restock} onClick={() => showAd("restock")} data-testid="store-ad-restock-btn">Free (ad)</Btn>
      </div>
    </div>
  );
}

function Upgrades({ group }) {
  const { player: p, derived: d, config, act } = useGame();
  return (
    <div className="grid gap-2">
      {Object.entries(config.upgrades).filter(([, u]) => u.group === group).map(([k, u]) => {
        const lvl = p.upgrades[k];
        const max = lvl >= u.max;
        return (
          <Card key={k} accent={lvl ? "gold" : "none"} data-testid={`upgrade-card-${k}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-display text-base uppercase text-zinc-100">{u.name} <span className="text-xs text-gold">{lvl}/{u.max}</span></div>
                <div className="text-[11px] text-zinc-400">{u.desc}</div>
              </div>
              <Btn variant="green" disabled={max || big(p.clean) < big(d.upgrades[k])} onClick={() => act("upgrade", { key: k })} data-testid={`upgrade-btn-${k}`}>
                {max ? "Max" : cedi(d.upgrades[k])}
              </Btn>
            </div>
          </Card>
        );
      })}
      <p className="text-[11px] text-zinc-500">Upgrades cost Clean Cedis. Clean money is never sold for real cash.</p>
    </div>
  );
}

function BoutiqueShop() {
  const { player: p, derived: d, act, openLocker } = useGame();
  const [subcat, setSubcat] = useState("all");
  const [query, setQuery] = useState("");
  const [tier2Only, setTier2Only] = useState(false);

  const boutiqueItems = d.store?.boutique || [];
  const subcats = d.store?.boutique_subcategories || [
    { id: "all", name: "All Wares" },
    { id: "tailoring", name: "Suits & Tailoring" },
    { id: "streetwear", name: "Streetwear & Fits" },
    { id: "jewelry", name: "Gold & Watches" },
    { id: "footwear", name: "Designer Kicks" },
    { id: "headwear", name: "Hats & Shades" },
    { id: "tactical", name: "Concealed Armor" },
    { id: "regalia", name: "Royal Regalia" },
    { id: "accessories", name: "Executive Luxury" },
  ];

  const filtered = boutiqueItems.filter((o) => {
    if (subcat !== "all" && o.subcategory !== subcat) return false;
    if (tier2Only && !o.tier2_cat) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      const matchName = o.name?.toLowerCase().includes(q);
      const matchT2 = o.tier2_cat?.name?.toLowerCase().includes(q) || o.tier2_cat?.trait_name?.toLowerCase().includes(q);
      const matchDesc = o.desc?.toLowerCase().includes(q);
      if (!matchName && !matchT2 && !matchDesc) return false;
    }
    return true;
  });

  const isGearOwned = (id) => p.gear.some((g) => g.id === id);

  return (
    <div className="space-y-3" data-testid="boutique-shop">
      <div>
        <SectionTitle
          kicker="Accra Haute Couture & Syndicate Wardrobe · Clean Cedis Only"
          title="Executive Underworld Boutique"
          right={
            <button
              onClick={() => openLocker("boss")}
              className="text-[11px] font-bold uppercase tracking-wider text-gold hover:underline"
            >
              Open Locker →
            </button>
          }
        />
        <p className="-mt-1 text-xs text-zinc-400">
          Exclusive designer apparel, tailored suits, solid gold chronometers and tactical regalia. Items have a chance to possess rare <b className="text-gold font-bold">Tier 2 Traits (33 Categories)</b> with game-changing combat, laundering, and heist perks.
        </p>
      </div>

      {/* Subcategory Pills */}
      <div className="hide-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1">
        {subcats.map((sc) => {
          const count = sc.id === "all" ? boutiqueItems.length : boutiqueItems.filter((b) => b.subcategory === sc.id).length;
          const active = subcat === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setSubcat(sc.id)}
              className={`btn-press shrink-0 flex items-center gap-1.5 border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
                active
                  ? "border-gold bg-gold text-ink"
                  : "border-zinc-800 bg-surface text-zinc-300 hover:border-zinc-700"
              }`}
              data-testid={`boutique-subcat-${sc.id}`}
            >
              <span>{sc.name}</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[9px] ${active ? "bg-ink text-gold" : "bg-zinc-800 text-zinc-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items, traits, perks..."
          className="min-w-[180px] flex-1 border border-zinc-800 bg-ink px-2.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:border-gold focus:outline-none"
        />
        <button
          onClick={() => setTier2Only(!tier2Only)}
          className={`flex items-center gap-1 border px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
            tier2Only ? "border-gold bg-gold/15 text-gold" : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
          }`}
        >
          <span>★ Tier 2 Traits Only</span>
        </button>
      </div>

      {/* Item Catalog Grid */}
      <div className="grid gap-2.5">
        {filtered.map((o) => {
          const owned = isGearOwned(o.id);
          const t2 = o.tier2_cat;
          const hasClean = big(p.clean) >= big(o.clean);

          return (
            <Card
              key={o.id}
              accent={t2 ? "gold" : "none"}
              className={`p-3 relative transition-all ${t2 ? "border-gold/60 bg-gradient-to-r from-surface to-zinc-900/60" : ""}`}
              data-testid={`boutique-item-${o.id}`}
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex gap-2.5 min-w-0">
                  <div
                    className="h-10 w-10 shrink-0 border border-zinc-700 flex items-center justify-center font-display text-sm font-bold shadow-inner"
                    style={{ background: o.color || "#222" }}
                  >
                    <span className="text-[10px] font-mono opacity-80 uppercase text-white drop-shadow">
                      {o.slot?.[0]}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display uppercase text-sm text-zinc-100 font-bold truncate">
                        {o.name}
                      </span>
                      <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 border ${RARITY[o.rarity] || "text-zinc-400"} border-zinc-800 bg-ink`}>
                        {o.rarity}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">
                        {o.subcategory} · {o.slot}
                      </span>
                    </div>

                    <p className="mt-0.5 text-[11px] text-zinc-400 line-clamp-2">
                      {o.desc}
                    </p>

                    {/* Stats */}
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
                      {o.stat && (
                        <span className="font-bold text-kgreen bg-kgreen/10 px-1.5 py-0.5 border border-kgreen/20">
                          +{o.mod} {o.stat}
                        </span>
                      )}
                      {o.power && (
                        <span className="font-bold text-blood bg-blood/10 px-1.5 py-0.5 border border-blood/20">
                          +{o.power} Power
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1">
                  <Btn
                    variant="green"
                    disabled={owned || !hasClean}
                    onClick={() => act("store_buy", { store: "boutique", id: o.id })}
                    data-testid={`boutique-buy-btn-${o.id}`}
                    className="min-w-[100px]"
                  >
                    {owned ? "In Locker" : cedi(o.clean)}
                  </Btn>
                  <span className="text-[9px] text-zinc-500">Clean Cedis</span>
                </div>
              </div>

              {/* TIER 2 SPECIAL TRAIT CHIP */}
              {t2 && (
                <div
                  className="mt-2.5 rounded-sm border border-gold/40 bg-ink/90 p-2 text-[11px]"
                  style={{ borderLeftColor: t2.color || "#ffd700", borderLeftWidth: 3 }}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 font-bold text-gold uppercase tracking-wider text-[10px]">
                      <span>★ TIER 2: {t2.name}</span>
                      <span className="text-zinc-400 font-normal">·</span>
                      <span className="text-zinc-200">{t2.trait_name}</span>
                    </div>
                    {t2.stat_bonus && (
                      <span className="text-[9px] font-mono font-bold text-sky-400 bg-sky-950/60 px-1 py-0.5 border border-sky-800">
                        +{t2.stat_bonus.mod} {t2.stat_bonus.stat}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[10px] text-zinc-300">
                    {t2.desc}
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-500">
            No boutique items matching your department or search query. Check back after next restock!
          </div>
        )}
      </div>
    </div>
  );
}

function GunShop() {
  const { player: p, derived: d, act, openLocker } = useGame();
  const [subcat, setSubcat] = useState("all");
  const [query, setQuery] = useState("");

  const weapons = d.store?.gun_shop || [];
  const subcats = d.store?.gun_shop_subcategories || [
    { id: "all", name: "All Arsenals" },
    { id: "melee", name: "Melee & Blades" },
    { id: "secondary", name: "Pistols & Sidearms" },
    { id: "primary", name: "Assault & Shotguns" },
  ];

  const filtered = weapons.filter((o) => {
    if (subcat !== "all" && o.slot !== subcat && o.subcategory !== subcat) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      const matchName = o.name?.toLowerCase().includes(q);
      const matchSlot = o.slot?.toLowerCase().includes(q);
      const matchRarity = o.rarity?.toLowerCase().includes(q);
      if (!matchName && !matchSlot && !matchRarity) return false;
    }
    return true;
  });

  return (
    <div className="space-y-3" data-testid="gun-shop">
      <div>
        <SectionTitle
          kicker="Syndicate Armory · Pay with Dirty Cedis · Resets every 12h"
          title="Underground Gun Shop"
          right={
            <button
              onClick={() => openLocker("boss")}
              className="text-[11px] font-bold uppercase tracking-wider text-gold hover:underline"
            >
              Open Locker →
            </button>
          }
        />
        <p className="-mt-1 text-xs text-zinc-400">
          Heavy firepower, street blades, and tactical handguns for boss and crew loadouts. Equipping weapons grants lethal attack power and stat bonuses during compound defense and heists.
        </p>
      </div>

      {/* Subcategory Pills */}
      <div className="hide-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1">
        {subcats.map((sc) => {
          const count = sc.id === "all" ? weapons.length : weapons.filter((w) => w.slot === sc.id || w.subcategory === sc.id).length;
          const active = subcat === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setSubcat(sc.id)}
              className={`btn-press shrink-0 flex items-center gap-1.5 border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
                active
                  ? "border-blood bg-blood text-white"
                  : "border-zinc-800 bg-surface text-zinc-300 hover:border-zinc-700"
              }`}
              data-testid={`gun-subcat-${sc.id}`}
            >
              <span>{sc.name}</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[9px] ${active ? "bg-black text-white" : "bg-zinc-800 text-zinc-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search arsenals, models, calibers..."
          className="w-full border border-zinc-800 bg-ink px-2.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:border-blood focus:outline-none"
        />
      </div>

      {/* Weapon Cards Grid */}
      <div className="grid gap-2.5">
        {filtered.map((o) => {
          const locked = o.unlock > p.level;
          const hasDirty = big(p.dirty) >= big(o.price);

          return (
            <Card key={o.id} accent="red" className="p-3" data-testid={`gun-item-${o.id}`}>
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex gap-2.5 min-w-0">
                  <div
                    className="h-10 w-10 shrink-0 border border-zinc-700 flex items-center justify-center font-display text-sm font-bold shadow-inner"
                    style={{ background: o.color || "#333" }}
                  >
                    <span className="text-[10px] font-mono opacity-80 uppercase text-white drop-shadow">
                      {o.slot?.[0]}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display uppercase text-sm text-zinc-100 font-bold truncate">
                        {o.name}
                      </span>
                      <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 border ${RARITY[o.rarity] || "text-zinc-400"} border-zinc-800 bg-ink`}>
                        {o.rarity}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">
                        {o.slot} · {o.model}
                      </span>
                    </div>

                    {/* Stats & Modifiers */}
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
                      {o.power && (
                        <span className="font-bold text-blood bg-blood/10 px-1.5 py-0.5 border border-blood/20">
                          +{o.power} Power
                        </span>
                      )}
                      {o.stat && (
                        <span className="font-bold text-kgreen bg-kgreen/10 px-1.5 py-0.5 border border-kgreen/20">
                          +{o.mod} {o.stat}
                        </span>
                      )}
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {locked ? `Requires LV ${o.unlock}` : `${o.left} left in stock`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1">
                  <Btn
                    variant="red"
                    disabled={locked || o.left <= 0 || !hasDirty}
                    onClick={() => act("store_buy", { store: "gun_shop", id: o.id })}
                    data-testid={`gun-buy-btn-${o.id}`}
                    className="min-w-[100px]"
                  >
                    {locked ? `LV ${o.unlock}` : o.left <= 0 ? "Sold out" : cedi(o.price)}
                  </Btn>
                  <span className="text-[9px] text-zinc-500">Dirty Cedis</span>
                </div>
              </div>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-500">
            No weapons found matching your criteria. Check back after next restock!
          </div>
        )}
      </div>
      <p className="mt-2 text-[11px] text-zinc-500">
        Equip weapons on your boss or crew in More → Boss & Locker.
      </p>
    </div>
  );
}

export default function Market() {
  const [sub, setSub] = useState("black_market");
  const { player: p, derived: d, act } = useGame();
  const s = d.store;
  return (
    <div>
      <div className="hide-scrollbar -mx-4 mt-3 flex gap-1 overflow-x-auto px-4">
        {SUBS.map(([id, l]) => (
          <button key={id} onClick={() => setSub(id)} data-testid={`market-sub-${id}`}
            className={`btn-press shrink-0 border px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider ${sub === id ? "border-gold bg-gold text-ink" : "border-zinc-800 text-zinc-400"}`}>{l}</button>
        ))}
      </div>
      {["black_market", "gun_shop", "boutique", "agency"].includes(sub) && <Restock />}
      {sub === "black_market" && (
        <>
          <SectionTitle kicker="Pay with dirty cash · 4 exclusive items daily · Limit 1 per day · Starts from GH₵3,000" title="Black Market" />
          <div className="grid gap-2">
            {s.black_market.map((o) => {
              const own = p.inv[o.id] || 0;
              const maxed = o.max && own >= o.max;
              return (
                <Card key={o.id} accent="red" data-testid={`bm-item-${o.id}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-display uppercase text-zinc-100">{o.name}</div>
                      <div className="text-[11px] text-zinc-400">
                        {o.desc} · own {own}{o.max ? `/${o.max}` : ""} · <b className="text-zinc-300">{o.left} left today (Limit 1/day)</b>
                      </div>
                    </div>
                    <Btn
                      disabled={maxed || o.left <= 0 || big(p.dirty) < big(o.price)}
                      onClick={() => act("store_buy", { store: "black_market", id: o.id })}
                      data-testid={`bm-buy-btn-${o.id}`}
                    >
                      {maxed ? "Maxed" : o.left <= 0 ? "Sold out" : cedi(o.price)}
                    </Btn>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
      {sub === "gun_shop" && <GunShop />}
      {sub === "boutique" && <BoutiqueShop />}
      {sub === "agency" && (
        <>
          <SectionTitle
            kicker="Hire with dirty cash · Recruits start from GH₵5,000 · Daily rates GH₵100-800/day · Arrive with pre-equipped loadouts"
            title="Crew Agency"
            right={<Chip>{p.crew.filter((c) => !c.merc).length}/{d.crew_cap}</Chip>}
          />
          <div className="grid gap-2">
            {s.agency.map((c) => {
              const equippedSlots = Object.keys(c.loadout || {}).length;
              return (
                <CrewCard key={c.id} c={{ ...c, xp: 0 }}>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-800/60">
                    <div className="text-[10px] text-zinc-400">
                      <span className="text-zinc-500 font-bold uppercase">Contract: </span>
                      <span className="font-mono font-bold text-gold">GH₵{c.daily_rate || 100}/day</span>
                      {equippedSlots > 0 && (
                        <span className="ml-2 text-sky-400">({equippedSlots} pre-equipped items included)</span>
                      )}
                    </div>
                    <Btn
                      className="min-w-[120px]"
                      disabled={c.hired || (c.elite ? big(p.clean) < big(c.clean_price) : big(p.dirty) < big(c.price))}
                      onClick={() => act("store_buy", { store: "agency", id: c.id })}
                      data-testid={`agency-hire-btn-${c.id}`}
                    >
                      {c.hired ? "Hired" : c.elite ? `Hire elite ${cedi(c.clean_price)} clean` : `Hire ${cedi(c.price)}`}
                    </Btn>
                  </div>
                </CrewCard>
              );
            })}
          </div>
        </>
      )}
      {sub === "mansion" && (<><SectionTitle kicker="Your compound" title="Mansion" /><Upgrades group="mansion" /></>)}
      {sub === "garage" && (<><SectionTitle kicker="Your rides" title="Garage" /><Upgrades group="garage" /></>)}
    </div>
  );
}
