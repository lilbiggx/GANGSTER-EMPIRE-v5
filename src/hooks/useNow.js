import { useEffect, useState } from "react";
import { useGame } from "../store/game";

export function useNow(ms = 1000) {
  const now = useGame((s) => s.now);
  const [t, setT] = useState(now());
  useEffect(() => {
    const id = setInterval(() => setT(now()), ms);
    return () => clearInterval(id);
  }, [now, ms]);
  return t;
}
