import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

extend({ RoundedBoxGeometry });

// ---------- procedural textures (cached) ----------
const texCache = new Map();
const seeded = (s) => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) | 0; return () => ((h = (h * 1103515245 + 12345) | 0) >>> 0) / 4294967296; };

function makeTex(pattern, base, graphic) {
  const key = `${pattern}|${base}|${graphic || ""}`;
  if (texCache.has(key)) return texCache.get(key);
  const cv = document.createElement("canvas");
  cv.width = cv.height = 128;
  const g = cv.getContext("2d");
  g.scale(2, 2);
  const r = seeded(key);
  g.fillStyle = base;
  g.fillRect(0, 0, 64, 64);
  if (pattern === "flowers") {
    const cols = ["#f59e0b", "#ef4444", "#84cc16", "#fbbf24", "#fb923c"];
    for (let i = 0; i < 9; i++) {
      const x = r() * 60, y = r() * 60, s = 3 + r() * 3;
      g.fillStyle = cols[i % cols.length];
      g.fillRect(x - s, y - 1.5, s * 2, 3); g.fillRect(x - 1.5, y - s, 3, s * 2);
      g.fillRect(x - s * 0.7, y - s * 0.7, s * 1.4, s * 1.4);
    }
  } else if (pattern === "kente") {
    const cols = ["#ffd700", "#d90429", "#00a86b", "#111111"];
    for (let y = 0; y < 64; y += 8) for (let x = 0; x < 64; x += 16) {
      g.fillStyle = cols[((x / 16) + (y / 8)) % 4];
      g.fillRect(x, y, 16, 8);
      g.fillStyle = "#111"; g.fillRect(x, y + 3, 16, 1);
    }
  } else if (pattern === "stripes") {
    g.fillStyle = "#f3f4f6";
    for (let y = 2; y < 64; y += 10) g.fillRect(0, y, 64, 3);
  } else if (pattern === "camo") {
    ["#3f4a2a", "#2b331e", "#6b6b3a"].forEach((c) => { g.fillStyle = c; for (let i = 0; i < 6; i++) g.fillRect(r() * 56, r() * 56, 6 + r() * 10, 5 + r() * 8); });
  }
  if (graphic === "skull") {
    g.fillStyle = "#f3f4f6";
    g.fillRect(24, 14, 16, 14); g.fillRect(27, 28, 10, 4);
    g.fillStyle = base; g.fillRect(27, 18, 4, 4); g.fillRect(33, 18, 4, 4); g.fillRect(31, 23, 2, 3);
    g.fillStyle = "#f3f4f6";
    for (let i = 0; i < 14; i++) { g.fillRect(19 + i * 1.8, 36 + i, 3, 2); g.fillRect(43 - i * 1.8, 36 + i, 3, 2); }
  }
  const t = new THREE.CanvasTexture(cv);
  t.anisotropy = 4;
  t.colorSpace = THREE.SRGBColorSpace;
  texCache.set(key, t);
  return t;
}

// ---------- primitives ----------
const Mat = ({ c, map, ...rest }) => <meshStandardMaterial color={map ? "#ffffff" : c} map={map || null} roughness={0.72} metalness={0.04} {...rest} />;
const Box = ({ s, p, c, r, map }) => (
  <mesh position={p} rotation={r}><roundedBoxGeometry args={[...s, 3, Math.min(...s) * 0.32]} /><Mat c={c} map={map} /></mesh>
);
const Cyl = ({ a, p, c, r, map }) => (
  <mesh position={p} rotation={r}><cylinderGeometry args={[a[0], a[1], a[2], Math.max(18, a[3] || 0)]} /><Mat c={c} map={map} /></mesh>
);
const Cap = ({ rad, len, p, c, r }) => (
  <mesh position={p} rotation={r}><capsuleGeometry args={[rad, len, 6, 16]} /><Mat c={c} /></mesh>
);
const Ball = ({ rad, p, c, sc }) => (<mesh position={p} scale={sc}><sphereGeometry args={[rad, 28, 20]} /><Mat c={c} /></mesh>);
const Cone = ({ a, p, c, r }) => (<mesh position={p} rotation={r}><coneGeometry args={[a[0], a[1], 14]} /><Mat c={c} /></mesh>);

const BUILD = { slim: 0.88, regular: 1, heavy: 1.25 };
const HEIGHT = { short: 0.92, average: 1, tall: 1.08 };
export const BASE_OUTFIT = { top_style: "tee", pattern: "plain", top: "#2a2a2a", under: "#111111", graphic: "none", bottom_style: "shorts", bottom: "#3a4a3f", shoes: "#4a2c1a", socks: "#f3f4f6" };

export function outfitFrom(look, gear) {
  const o = { ...BASE_OUTFIT, ...(look.outfit || {}) };
  if (gear.top) Object.assign(o, { top: gear.top.color, top_style: gear.top.style || "tee", pattern: gear.top.pattern || "plain", graphic: gear.top.graphic || (gear.top.style === "open_shirt" ? o.graphic : "none") });
  if (gear.bottom) Object.assign(o, { bottom: gear.bottom.color, bottom_style: gear.bottom.style || "pants", bottom_pattern: gear.bottom.pattern });
  if (gear.shoes) o.shoes = gear.shoes.color;
  return o;
}

// ---------- body parts ----------
function Head({ look, hat }) {
  const skin = look.skin, hc = look.hair_color;
  const shape = { long: [1, 1.22, 1], round: [1.12, 1.05, 1.05], square: [1.08, 1.12, 1] }[look.face] || [1, 1.2, 1];
  const y = 1.86;
  return (
    <group>
      <Cap rad={0.047} len={0.14} p={[0, 1.66, 0]} c={skin} />
      {look.face === "square" ? <Box s={[0.34, 0.4, 0.34]} p={[0, y, 0]} c={skin} /> : <Ball rad={0.18} p={[0, y, 0]} c={skin} sc={shape} />}
      <Ball rad={0.13} p={[0, y - 0.1, 0.05]} c={skin} sc={[1, 0.8, 1]} />
      {[-1, 1].map((sd) => <Ball key={sd} rad={0.042} p={[sd * 0.185, y, -0.01]} c={skin} sc={[0.55, 1, 0.9]} />)}
      <Ball rad={0.032} p={[0, y - 0.03, 0.185]} c={skin} sc={[1, 1.2, 1]} />
      <Cap rad={0.011} len={0.06} p={[0, y - 0.11, 0.17]} r={[0, 0, Math.PI / 2]} c="#5b2a1f" />
      {[-0.075, 0.075].map((x) => (
        <group key={x}>
          <Ball rad={0.027} p={[x, y + 0.04, 0.162]} c="#f3f4f6" sc={[1.2, 0.85, 0.6]} />
          <Ball rad={0.014} p={[x, y + 0.04, 0.178]} c="#1a0f0a" />
          <Cap rad={0.008} len={0.05} p={[x, y + 0.085, 0.172]} r={[0, 0, Math.PI / 2 + (x > 0 ? -0.15 : 0.15)]} c={hc} />
        </group>
      ))}
      <Glasses kind={look.glasses} y={y + 0.04} />
      {look.beard === "goatee" && <Ball rad={0.045} p={[0, y - 0.16, 0.14]} c={hc} sc={[0.9, 1.1, 0.7]} />}
      {look.beard === "full" && <Ball rad={0.15} p={[0, y - 0.11, 0.07]} c={hc} sc={[1.05, 0.75, 0.85]} />}
      {hat ? <Hat g={hat} y={y} /> : <Hair look={look} y={y} />}
    </group>
  );
}

function Glasses({ kind, y }) {
  if (!kind || kind === "none") return null;
  const lens = kind === "shades" ? "#0a0a0a" : "#5aa9d6";
  return (
    <group position={[0, y, 0.19]}>
      {[-0.075, 0.075].map((x) => kind === "round" ? (
        <mesh key={x} position={[x, 0, 0]}><torusGeometry args={[0.042, 0.009, 10, 28]} /><Mat c="#111" /></mesh>
      ) : (
        <group key={x}>
          <Box s={[0.1, 0.075, 0.015]} p={[x, 0, 0]} c="#111" />
          <Box s={[0.08, 0.055, 0.018]} p={[x, 0, 0.002]} c={lens} />
        </group>
      ))}
      <Box s={[0.05, 0.015, 0.015]} p={[0, 0.01, 0]} c="#111" />
      {[-1, 1].map((sd) => <Box key={sd} s={[0.012, 0.015, 0.2]} p={[sd * 0.13, 0.01, -0.1]} c="#111" />)}
    </group>
  );
}

function Hair({ look, y }) {
  const c = look.hair_color;
  const cap = <Ball rad={0.19} p={[0, y + 0.08, -0.01]} c={c} sc={[1.05, 0.62, 1.08]} />;
  switch (look.hair) {
    case "fade": return cap;
    case "spiky":
      return (
        <group>
          {cap}
          {[[-0.08, 0.2], [0, -0.1], [0.08, 0.25], [0.02, 0.4], [-0.05, -0.3]].map(([x, rz], i) => <Cone key={i} a={[0.06, 0.16, 4]} p={[x, y + 0.24, 0.02 - i * 0.02]} r={[0.35, 0, rz]} c={c} />)}
        </group>
      );
    case "afro": return <Ball rad={0.25} p={[0, y + 0.13, -0.08]} c={c} sc={[1.05, 0.95, 0.9]} seg={9} />;
    case "dreads":
      return (
        <group>
          {cap}
          {[-0.15, -0.07, 0, 0.07, 0.15].map((x) => <Cyl key={x} a={[0.022, 0.022, 0.34, 5]} p={[x, y - 0.12, -0.17]} c={c} />)}
          {[-0.18, 0.18].map((x) => <Cyl key={x} a={[0.022, 0.022, 0.28, 5]} p={[x, y - 0.06, -0.04]} c={c} />)}
        </group>
      );
    case "braids":
      return <group>{cap}{[-0.08, 0, 0.08].map((x) => <Cyl key={x} a={[0.02, 0.014, 0.45, 5]} p={[x, y - 0.15, -0.18]} c={c} />)}</group>;
    case "cornrows":
      return <group>{[-0.1, -0.035, 0.035, 0.1].map((x) => <Box key={x} s={[0.035, 0.035, 0.36]} p={[x, y + 0.17, -0.02]} r={[0.2, 0, 0]} c={c} />)}</group>;
    default: return null;
  }
}

function Hat({ g, y }) {
  if (g.model === "cap") return <group><Ball rad={0.2} p={[0, y + 0.1, 0]} c={g.color} sc={[1.02, 0.55, 1.05]} /><Box s={[0.26, 0.02, 0.16]} p={[0, y + 0.07, 0.22]} c={g.color} /></group>;
  if (g.model === "kufi") return <group><Cyl a={[0.185, 0.19, 0.14, 10]} p={[0, y + 0.17, 0]} c={g.color} map={makeTex("kente", g.color)} /></group>;
  return <Ball rad={0.205} p={[0, y + 0.1, 0]} c={g.color} sc={[1, 0.68, 1.02]} />;
}

function Torso({ o, w, skin }) {
  const tex = o.pattern !== "plain" || (o.graphic === "skull" && o.top_style === "tee") ? makeTex(o.pattern, o.top, o.top_style === "tee" ? o.graphic : null) : null;
  const under = o.graphic === "skull" ? makeTex("plain", o.under, "skull") : null;
  const tw = 0.36 * w, y = 1.3;
  const longSleeve = o.top_style === "hoodie" || o.top_style === "jacket";
  const open = o.top_style === "open_shirt" || o.top_style === "jacket";
  return (
    <group>
      {open ? (
        <>
          <Box s={[tw * 0.7, 0.5, 0.2]} p={[0, y, 0]} c={o.under} map={under} />
          <Box s={[tw, 0.52, 0.04]} p={[0, y, -0.1]} c={o.top} map={tex} />
          {[-1, 1].map((sd) => (
            <group key={sd}>
              <Box s={[tw * 0.3, 0.52, 0.04]} p={[sd * tw * 0.36, y, 0.1]} c={o.top} map={tex} />
              <Box s={[0.04, 0.52, 0.2]} p={[sd * tw * 0.5, y, 0]} c={o.top} map={tex} />
              <Box s={[0.07, 0.1, 0.03]} p={[sd * 0.07, y + 0.24, 0.12]} r={[0, 0, sd * 0.5]} c={o.top} map={tex} />
            </group>
          ))}
        </>
      ) : (
        <Box s={[tw, 0.52, 0.21]} p={[0, y, 0]} c={o.top} map={tex} />
      )}
      <Ball rad={0.1} p={[0, y + 0.2, 0]} c={open ? o.under : o.top} sc={[tw * 4.4, 0.6, 1.05]} />
      {o.top_style === "hoodie" && <><Box s={[0.26, 0.1, 0.12]} p={[0, y + 0.3, -0.1]} c={o.top} /><Box s={[0.2, 0.12, 0.02]} p={[0, y - 0.14, 0.115]} c={o.top} /></>}
      {[-1, 1].map((sd) => {
        const x = sd * (tw / 2 + 0.05);
        return (
          <group key={sd}>
            <Cyl a={[0.07, 0.065, longSleeve ? 0.56 : 0.22, 6]} p={[x, longSleeve ? 1.27 : 1.43, 0]} c={o.top} map={tex} />
            {!longSleeve && <Cap rad={0.04} len={0.26} p={[x, 1.2, 0]} c={skin} />}
            <Cap rad={0.036} len={0.22} p={[x, 0.92, 0]} c={skin} />
            <Ball rad={0.042} p={[x, 0.76, 0.01]} c={skin} sc={[0.8, 1.15, 0.7]} />
          </group>
        );
      })}
    </group>
  );
}

function Legs({ o, w, skin }) {
  const btex = o.bottom_pattern ? makeTex(o.bottom_pattern, o.bottom) : null;
  const pants = o.bottom_style === "pants";
  return (
    <group>
      <Box s={[0.36 * w, 0.16, 0.22]} p={[0, 0.98, 0]} c={o.bottom} map={btex} />
      {[-1, 1].map((sd) => {
        const x = sd * 0.09 * w;
        return (
          <group key={sd}>
            {pants ? (
              <Cyl a={[0.085 * w, 0.065, 0.82, 6]} p={[x, 0.53, 0]} c={o.bottom} map={btex} />
            ) : (
              <>
                <Box s={[0.17 * w, 0.32, 0.21]} p={[x, 0.78, 0]} c={o.bottom} map={btex} />
                {o.bottom_style === "cargo_shorts" && <Box s={[0.03, 0.1, 0.1]} p={[sd * (0.09 * w + 0.095 * w), 0.74, 0]} c={o.bottom} />}
                <Cap rad={0.046} len={0.36} p={[x, 0.42, 0]} c={skin} />
              </>
            )}
            <Cyl a={[0.046, 0.046, 0.12, 6]} p={[x, 0.15, 0]} c={o.socks} />
            <Box s={[0.13, 0.08, 0.26]} p={[x, 0.06, 0.04]} c={o.shoes} />
            <Box s={[0.135, 0.025, 0.27]} p={[x, 0.012, 0.04]} c="#f3f4f6" />
            {[0, 0.04].map((dz) => <Box key={dz} s={[0.137, 0.012, 0.025]} p={[x, 0.07, 0.02 + dz]} r={[0.5, 0, 0]} c="#f3f4f6" />)}
          </group>
        );
      })}
    </group>
  );
}

function Weapons({ gear, w }) {
  const hx = 0.36 * w / 2 + 0.05;
  const m = gear.melee, s = gear.secondary, pr = gear.primary;
  return (
    <group>
      {m && (m.model === "knuckles" ? (
        <mesh position={[hx, 0.74, 0.04]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.045, 0.016, 10, 24]} /><Mat c={m.color} metalness={0.6} roughness={0.35} /></mesh>
      ) : m.model === "bat" ? (
        <Cyl a={[0.04, 0.022, 0.62, 6]} p={[hx, 0.92, 0.12]} r={[0.55, 0, 0]} c={m.color} />
      ) : (
        <group position={[hx, 0.74, 0.06]} rotation={[0.55, 0, 0]}>
          <Box s={[0.03, 0.12, 0.04]} p={[0, 0, 0]} c="#3f2a14" />
          <Box s={[0.012, 0.46, 0.07]} p={[0, 0.29, 0]} c={m.color} />
        </group>
      ))}
      {s && (
        <group position={[-(0.36 * w / 2 + 0.01), 0.9, 0.05]}>
          <Box s={[0.05, 0.1, 0.04]} p={[0, -0.03, 0]} c="#3f2a14" />
          <Box s={[0.045, 0.04, 0.15]} p={[0, 0.03, 0.04]} c={s.color} />
        </group>
      )}
      {pr && (
        <group position={[0, 1.3, -0.15]} rotation={[0, 0, 0.75]}>
          {pr.model === "shotgun" ? (
            <><Cyl a={[0.025, 0.025, 0.72, 5]} p={[0.028, 0.06, 0]} c={pr.color} /><Cyl a={[0.025, 0.025, 0.72, 5]} p={[-0.028, 0.06, 0]} c={pr.color} /><Box s={[0.09, 0.24, 0.05]} p={[0, -0.38, 0]} c="#713f12" /></>
          ) : (
            <><Box s={[0.06, 0.8, 0.055]} p={[0, 0, 0]} c={pr.color} /><Box s={[0.05, 0.13, 0.1]} p={[0, -0.06, 0.05]} c="#18181b" /><Box s={[0.07, 0.2, 0.06]} p={[0, -0.46, 0]} c={pr.color} /></>
          )}
          <Box s={[0.4 * w, 0.025, 0.012]} p={[0, 0, 0.03]} r={[0, 0, -0.75]} c="#1f1f1f" />
        </group>
      )}
    </group>
  );
}

function Figure({ look, gear, spin }) {
  const ref = useRef();
  useFrame((st) => {
    if (!ref.current) return;
    const t = st.clock.elapsedTime;
    ref.current.rotation.y = spin.current + Math.sin(t * 0.5) * 0.18;
    ref.current.children[1].position.y = Math.sin(t * 1.8) * 0.008;
  });
  const w = BUILD[look.build] || 1;
  const hgt = HEIGHT[look.height] || 1;
  const o = outfitFrom(look, gear);
  const body = (
    <group scale={[1, hgt, 1]}>
      <Legs o={o} w={w} skin={look.skin} />
      <Torso o={o} w={w} skin={look.skin} />
      <group scale={[1, 1 / hgt, 1]} position={[0, (hgt - 1) * 1.6, 0]}><Head look={look} hat={gear.hat} /></group>
      <Weapons gear={gear} w={w} />
    </group>
  );
  return (
    <group ref={ref} position={[0, -1.15, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}><circleGeometry args={[0.42, 16]} /><meshBasicMaterial color="#000" transparent opacity={0.45} /></mesh>
      <group>{body}</group>
    </group>
  );
}

export default function Character3D({ look, gear = {}, height = 300, testid = "character-3d" }) {
  const spin = useRef(0.35);
  const drag = useRef(null);
  return (
    <div
      className="relative w-full touch-pan-y select-none border border-zinc-800 bg-[radial-gradient(circle_at_50%_35%,#2b2b2b,#141414_75%)]"
      style={{ height }}
      data-testid={testid}
      onPointerDown={(e) => { drag.current = e.clientX; }}
      onPointerMove={(e) => { if (drag.current !== null) { spin.current += (e.clientX - drag.current) * 0.012; drag.current = e.clientX; } }}
      onPointerUp={() => { drag.current = null; }}
      onPointerLeave={() => { drag.current = null; }}
    >
      <Canvas dpr={[1, 1.75]} gl={{ antialias: true, powerPreference: "low-power" }} camera={{ position: [0, 0.1, 3.45], fov: 36 }}>
        <hemisphereLight args={["#fff6e0", "#1a1a1a", 0.9]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[2.5, 3, 2.5]} intensity={1.6} />
        <directionalLight position={[-2, 1.5, -2]} intensity={0.6} color="#ffd700" />
        <Figure look={look} gear={gear} spin={spin} />
      </Canvas>
      <div className="pointer-events-none absolute bottom-1.5 right-2 text-[9px] uppercase tracking-widest text-zinc-500">drag to turn</div>
    </div>
  );
}
