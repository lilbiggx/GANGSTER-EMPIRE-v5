export function settleHeat(p: Player, now: number) {
  // Check if arrest timer completed
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

  // If currently arrested, heat stays pinned at 100
  if (p.arrested_until && now < p.arrested_until) {
    p.heat = 100;
    p.heat_ts = now;
    return;
  }

  const t0 = p.heat_ts;
  const fast = Math.max(0, Math.min(now, p.lie_low_until) - t0);
  const slow = Math.max(0, now - t0 - fast);

  // Heat cooldown tuning:
  // Normal cooling: 0 heat/hr
  // When lying low: 50 heat/hr (0.83 heat/minute)
  const naturalRate = 0;
  const lieLowRate = 50;

  p.heat = Math.max(0, p.heat - (fast * lieLowRate + slow * naturalRate) / H);
  p.heat_ts = now;

  if (p.heat >= 100 && (!p.arrested_until || now >= p.arrested_until)) {
    triggerArrest(p, now);
  }
}
