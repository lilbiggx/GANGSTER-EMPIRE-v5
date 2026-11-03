export const getHeatCoolingPerHour = (p: Player, now: number) => {
  if (p.lie_low_until > now) return 180;
  return 35 + (p.upgrades?.safehouse ? 15 : 0) + (p.facilities?.safehouse || 0) * 10 + (p.facilities?.infirmary || 0) * 5;
};

export function settleHeat(p: Player, now: number) {
  if (p.arrested_until && now >= p.arrested_until) {
    p.arrested_until = 0;
    p.heat = 20;
    p.heat_ts = now;
    p.log.unshift({
      t: now,
      msg: "Released from police lockup after serving 2 hours! Businesses resumed.",
      kind: "good",
    });
  }

  if (p.arrested_until && now < p.arrested_until) {
    p.heat = 100;
    p.heat_ts = now;
    return;
  }

  const lastTs = p.heat_ts ?? now;
  const elapsed = Math.max(0, now - lastTs);
  const coolingRate = getHeatCoolingPerHour(p, now);

  p.heat = Math.max(0, p.heat - (elapsed * coolingRate) / H);
  p.heat_ts = now;

  if (p.heat >= 100) {
    triggerArrest(p, now);
  }
}
