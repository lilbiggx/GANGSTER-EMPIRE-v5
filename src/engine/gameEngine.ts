export function settleHeat(p: Player, now: number) {
  if (!p) return;

  if (p.arrested_until) {
    if (now >= p.arrested_until) {
      p.arrested_until = 0;
      p.heat = 20;
      p.heat_ts = now;
      p.log?.unshift({
        t: now,
        msg: "Released from police lockup after serving 2 hours! Businesses resumed.",
        kind: "good",
      });
    } else {
      p.heat = 100;
      p.heat_ts = now;
      return;
    }
  }

  const lastTs = p.heat_ts ?? now;
  const elapsed = Math.max(0, now - lastTs);

  if (elapsed <= 0) return;

  const lieLowActive = p.lie_low_until > now;
  const heatLossPerHour = lieLowActive ? 20 : 0;

  p.heat = Math.max(0, p.heat - (heatLossPerHour * elapsed) / H);
  p.heat_ts = now;

  if (p.heat >= 100) {
    triggerArrest(p, now);
  }
}
