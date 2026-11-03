import React, { useState } from "react";
import { Wrench, Sparkles, Zap, DollarSign, ShieldAlert, Skull, RotateCcw, X, PlusCircle } from "lucide-react";
import { useGame } from "../../store/game";
import { Btn, Sheet } from "./ui";
import { toast } from "sonner";

export default function TestCheatsModal() {
  const [open, setOpen] = useState(false);
  const { act, createOfflineBoss, player, logout } = useGame();

  const handlePreset = (preset: "newbie" | "mid" | "kingpin", name: string) => {
    createOfflineBoss(name, "dockside", preset);
    toast.success(`Switched to test preset: ${name}`);
    setOpen(false);
  };

  return (
    <>
      {/* Floating Offline Test Mode / Dev Tools Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 flex items-center gap-1.5 border border-gold bg-[#121212] px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-gold shadow-lg shadow-black/80 hover:bg-gold hover:text-ink active:scale-95 transition-all"
        title="Open Offline Testing Cheats"
        data-testid="offline-test-tools-btn"
      >
        <Wrench className="h-3.5 w-3.5" />
        <span>Test Tools</span>
      </button>

      <Sheet open={open} onClose={() => setOpen(false)} testid="test-cheats-sheet">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Offline Testing Sandbox</div>
            <h3 className="font-display text-2xl uppercase text-zinc-100">Boss Cheat Toolbox</h3>
          </div>
          <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-zinc-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          {/* Quick Profile Switching */}
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">1-Click Test Boss Presets</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handlePreset("newbie", "Kofi Newbie")}
                className="border border-zinc-700 bg-surface2 p-2 text-left hover:border-gold"
              >
                <div className="font-display text-xs text-zinc-200">🔰 Rookie</div>
                <div className="text-[9px] text-zinc-500">Lv 1 · 50 Cedis</div>
              </button>
              <button
                onClick={() => handlePreset("mid", "Kwame General")}
                className="border border-zinc-700 bg-surface2 p-2 text-left hover:border-gold"
              >
                <div className="font-display text-xs text-gold">⚔️ Mid Boss</div>
                <div className="text-[9px] text-zinc-500">Lv 12 · 500k Cedis</div>
              </button>
              <button
                onClick={() => handlePreset("kingpin", "Kingpin Shatta")}
                className="border border-zinc-700 bg-surface2 p-2 text-left hover:border-gold"
              >
                <div className="font-display text-xs text-kgreen">👑 Kingpin</div>
                <div className="text-[9px] text-zinc-500">Lv 25 · 20M Cedis</div>
              </button>
            </div>
          </div>

          {/* Quick Resources */}
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Add Cash & Cedis</div>
            <div className="grid grid-cols-2 gap-2">
              <Btn
                variant="gold"
                onClick={() => act("dev_add_cash", { dirty: "50000", clean: "0" })}
                className="py-2.5"
              >
                <DollarSign className="h-3.5 w-3.5" /> +50,000 Dirty
              </Btn>
              <Btn
                variant="green"
                onClick={() => act("dev_add_cash", { dirty: "0", clean: "25000" })}
                className="py-2.5"
              >
                <Sparkles className="h-3.5 w-3.5" /> +25,000 Clean
              </Btn>
            </div>
          </div>

          {/* Timers & Events */}
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Timers & Threats</div>
            <div className="grid grid-cols-2 gap-2">
              <Btn
                variant="ghost"
                onClick={() => act("dev_speed_timers")}
                className="py-2.5 text-gold border-gold"
              >
                <Zap className="h-3.5 w-3.5" /> Finish All Timers
              </Btn>
              <Btn
                variant="red"
                onClick={() => {
                  act("dev_trigger_raid");
                  setOpen(false);
                }}
                className="py-2.5"
              >
                <ShieldAlert className="h-3.5 w-3.5" /> Trigger Solo Raid
              </Btn>
              <Btn
                variant="red"
                onClick={() => {
                  act("dev_trigger_alliance_raid");
                  setOpen(false);
                }}
                className="py-2 text-[10px]"
              >
                ⚔️ Trigger Alliance Raid
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => act("dev_set_grudges", { val: 65 })}
                className="py-2 text-[10px] text-amber-400 border-amber-500/40"
              >
                🔥 Set Grudges 65 (War Pact)
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => act("dev_assassin_hit")}
                className="py-2 text-[10px] text-purple-300 border-purple-500/50"
              >
                🎯 Test Assassin Hit (Ghost)
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => {
                  act("dev_clear_heat");
                  act("dev_set_grudges", { val: 0 });
                }}
                className="py-2 text-[10px] text-kgreen border-kgreen/40"
              >
                ❄️ Cool Grudges & Heat to 0
              </Btn>
            </div>
          </div>

          {/* Police Lockup & Crisis Events */}
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Police & Tactical Crisis</div>
            <div className="grid grid-cols-2 gap-2">
              <Btn
                variant="red"
                onClick={() => {
                  act("dev_trigger_arrest");
                  setOpen(false);
                }}
                className="py-2 text-[10px]"
              >
                🚨 Trigger Arrest (2h Lockup)
              </Btn>
              <Btn
                variant="green"
                onClick={() => act("dev_post_bail")}
                className="py-2 text-[10px]"
              >
                ⚖️ Post Bail (Instant Release)
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => act("dev_trigger_heist_event")}
                className="py-2 text-[10px] text-amber-300 border-amber-500/50"
              >
                📻 Trigger Heist Crisis Event
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => act("dev_reset_heist_limit")}
                className="py-2 text-[10px] text-zinc-200"
              >
                🔄 Reset Daily Heist Limit
              </Btn>
            </div>
          </div>

          {/* Crew, Morale & Boutique */}
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Crew, Boutique & Economy</div>
            <div className="grid grid-cols-2 gap-2">
              <Btn
                variant="gold"
                onClick={() => act("dev_add_crew_xp")}
                className="py-2 text-[10px]"
              >
                💪 +250 Crew EXP & Morale
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => act("dev_restock_boutique")}
                className="py-2 text-[10px] text-purple-300 border-purple-500/50"
              >
                ✨ Restock Boutique (Tier 2)
              </Btn>
              <Btn
                variant="gold"
                onClick={() => act("dev_add_cash", { dirty: "500000", clean: "250000" })}
                className="py-2 text-[10px]"
              >
                💰 +500k Dirty / +250k Clean
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => act("dev_add_xp", { xp: 1000, pass: 500 })}
                className="py-2 text-[10px] text-zinc-200"
              >
                ⭐ +1000 Boss XP / Point
              </Btn>
            </div>
          </div>

          {/* Reset */}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500">Current Boss: {player?.name} (Lv {player?.level})</span>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="flex items-center gap-1 text-[11px] text-blood hover:underline"
            >
              <RotateCcw className="h-3 w-3" /> Log Out
            </button>
          </div>
        </div>
      </Sheet>
    </>
  );
}
