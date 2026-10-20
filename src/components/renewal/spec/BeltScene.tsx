"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { colors } from "@/data/samples/breeze-renewal";
import { cn } from "@/lib/utils";

// 브리즈 벨트 3D (스타일라이즈드 렌더). 실제 촬영본이 아니라 코드로 그린 텍스처를 입힌 모형
// hero: 드래그 회전 + 시점 버튼 / explode: 스크롤에 따라 레이어가 바깥으로 벌어짐

const RADIUS = 1;
// 폭 10cm : 허리 지름 약 25cm 비율
const HEIGHT = 0.8;
const VIEWS = {
  정면: { theta: 0, phi: 0.18 },
  측면: { theta: Math.PI / 2, phi: 0.18 },
  후면: { theta: Math.PI, phi: 0.18 },
  위: { theta: 0, phi: 1.35 },
  아래: { theta: 0, phi: -1.2 },
} as const;
type ViewName = keyof typeof VIEWS;

function beltTexture(base: string, logo: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 4096;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  const { width: w, height: h } = canvas;

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  // 원단 결
  ctx.globalAlpha = 0.07;
  for (let i = 0; i < 9000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
    ctx.fillRect(Math.random() * w, Math.random() * h, 6, 1.5);
  }
  ctx.globalAlpha = 1;
  // 테두리 바인딩 + 스티치
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, w, 34);
  ctx.fillRect(0, h - 34, w, 34);
  ctx.strokeStyle = "rgba(0,0,0,0.45)";
  ctx.lineWidth = 3;
  ctx.setLineDash([18, 12]);
  [52, h - 52].forEach((y) => {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // 정면 로고 (u = 0.25 근처가 카메라 정면)
  const cx = w * 0.25;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 230px Pretendard, Arial Black, sans-serif";
  ctx.lineJoin = "round";
  ctx.lineWidth = 34;
  ctx.strokeStyle = logo;
  ctx.strokeText("OUTDO", cx, h / 2 - 28);
  ctx.lineWidth = 12;
  ctx.strokeStyle = base;
  ctx.strokeText("OUTDO", cx, h / 2 - 28);
  ctx.font = "700 46px Pretendard, Arial, sans-serif";
  ctx.fillStyle = logo;
  ctx.fillText("O U T D O   T H E   B E S T .", cx, h / 2 + 132);

  // OD 패치
  const od = w * 0.47;
  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(od - 120, h / 2 - 95, 240, 190);
  ctx.strokeStyle = logo;
  ctx.lineWidth = 8;
  ctx.strokeRect(od - 96, h / 2 - 72, 192, 144);
  ctx.font = "900 92px Pretendard, Arial Black, sans-serif";
  ctx.fillStyle = logo;
  ctx.fillText("OD", od, h / 2 + 4);

  // I'M THE BEST 패치
  const best = w * 0.03 + w;
  [best - w, best].forEach((x) => {
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(x - 110, h / 2 - 110, 220, 220);
    ctx.fillStyle = "#f2f2f2";
    ctx.font = "900 60px Pretendard, Arial Black, sans-serif";
    ["I'M", "THE", "BEST"].forEach((t, i) => ctx.fillText(t, x, h / 2 - 62 + i * 62));
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function velcroTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#151515";
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function buildBelt(texture: THREE.Texture) {
  const group = new THREE.Group();
  // CylinderGeometry의 u=0 은 +z 방향에서 시작하지 않으므로 thetaStart로 로고를 정면(+z)에 맞춘다
  const outer = new THREE.Mesh(
    new THREE.CylinderGeometry(RADIUS, RADIUS, HEIGHT, 160, 1, true, -Math.PI / 2, Math.PI * 2),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.75, metalness: 0.05 }),
  );
  const foam = new THREE.Mesh(
    new THREE.CylinderGeometry(RADIUS - 0.012, RADIUS - 0.012, HEIGHT - 0.01, 160, 1, true),
    new THREE.MeshStandardMaterial({ color: "#7d838e", roughness: 0.95, side: THREE.DoubleSide }),
  );
  const inner = new THREE.Mesh(
    new THREE.CylinderGeometry(RADIUS - 0.03, RADIUS - 0.03, HEIGHT, 160, 1, true),
    new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.9, side: THREE.BackSide }),
  );
  const rimMaterial = new THREE.MeshStandardMaterial({ color: "#0f0f0f", roughness: 0.8, side: THREE.DoubleSide });
  const rims = [HEIGHT / 2, -HEIGHT / 2].map((y) => {
    const rim = new THREE.Mesh(new THREE.RingGeometry(RADIUS - 0.03, RADIUS + 0.002, 160), rimMaterial);
    rim.rotation.x = -Math.PI / 2;
    rim.position.y = y;
    return rim;
  });
  const velcro = new THREE.Mesh(
    new THREE.CylinderGeometry(RADIUS + 0.018, RADIUS + 0.018, HEIGHT * 0.78, 64, 1, true, Math.PI * 0.62, Math.PI * 0.5),
    new THREE.MeshStandardMaterial({ map: velcroTexture(), roughness: 1, side: THREE.DoubleSide }),
  );
  const buckle = new THREE.Mesh(
    new THREE.TorusGeometry(HEIGHT * 0.5, 0.012, 12, 4, Math.PI * 2),
    new THREE.MeshStandardMaterial({ color: "#d7dae0", metalness: 0.9, roughness: 0.25 }),
  );
  buckle.position.set(Math.sin(Math.PI * 0.62) * (RADIUS + 0.03), 0, Math.cos(Math.PI * 0.62) * (RADIUS + 0.03));
  buckle.lookAt(0, 0, 0);
  buckle.rotateZ(Math.PI / 4);
  buckle.scale.set(0.35, 1.25, 1);

  group.add(outer, foam, inner, velcro, buckle, ...rims);
  group.scale.set(1.1, 1, 0.9);
  return { group, outer, foam, inner, velcro, buckle, rims };
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "200px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

export function BeltScene({ mode = "hero", className }: { mode?: "hero" | "explode"; className?: string }) {
  const [wrapRef, inView] = useInView<HTMLDivElement>();
  const mountRef = useRef<HTMLDivElement>(null);
  const [colorIndex, setColorIndex] = useState(1);
  const [view, setView] = useState<ViewName>("정면");
  const [progress, setProgress] = useState(0);
  const api = useRef<{ setColor: (i: number) => void; setView: (v: ViewName) => void } | null>(null);
  const inViewRef = useRef(inView);
  inViewRef.current = inView;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.35;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 50);

    scene.add(new THREE.AmbientLight("#ffffff", 0.25));
    const key = new THREE.DirectionalLight("#fff4e8", 2.4);
    key.position.set(-3, 3, 4);
    const rim = new THREE.PointLight("#2f6bff", 40, 12);
    rim.position.set(2.6, 1.2, -2.4);
    const under = new THREE.PointLight("#2f6bff", 12, 8);
    under.position.set(-2, -2.2, 1);
    scene.add(key, rim, under);

    const textures = colors.map((c) => beltTexture(c.base, c.logo));
    const belt = buildBelt(textures[1]);
    scene.add(belt.group);

    // 바닥 반사광 원
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(1.6, 64),
      new THREE.MeshBasicMaterial({ color: "#2f6bff", transparent: true, opacity: 0.12 }),
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -HEIGHT / 2 - 0.25;
    scene.add(glow);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startPhi = mode === "explode" ? 0.42 : 0.22;
    const orbit = { theta: 0.5, phi: startPhi, targetTheta: 0.5, targetPhi: startPhi };
    // 세로로 긴 모바일 화면에서도 벨트가 잘리지 않도록 화면비에 맞춰 거리를 늘린다
    const fitDistance = () => (mode === "explode" ? 7.2 : 5) / Math.min(1, (width / height) * 1.15);
    let distance = fitDistance();
    let dragging = false;
    let lastX = 0;
    let idle = 0;

    const onDown = (e: PointerEvent) => {
      if (mode !== "hero") return;
      dragging = true;
      lastX = e.clientX;
      idle = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      orbit.targetTheta -= (e.clientX - lastX) * 0.012;
      lastX = e.clientX;
    };
    const onUp = () => (dragging = false);
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    let explode = 0;
    const onScroll = () => {
      if (mode !== "explode") return;
      const rect = mount.getBoundingClientRect();
      const p = THREE.MathUtils.clamp((window.innerHeight * 0.85 - rect.top) / (rect.height * 1.1), 0, 1);
      explode = p;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    api.current = {
      setColor: (i) => {
        (belt.outer.material as THREE.MeshStandardMaterial).map = textures[i];
        (belt.outer.material as THREE.MeshStandardMaterial).needsUpdate = true;
      },
      setView: (v) => {
        const target = VIEWS[v];
        // 가까운 방향으로 돌도록 현재 각도 기준으로 맞춘다
        const turns = Math.round((orbit.targetTheta - target.theta) / (Math.PI * 2));
        orbit.targetTheta = target.theta + turns * Math.PI * 2;
        orbit.targetPhi = target.phi;
        idle = -240;
      },
    };

    const clock = new THREE.Clock();
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!inViewRef.current) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      idle += 1;
      if (mode === "hero" && !dragging && idle > 120 && !reduced) orbit.targetTheta += dt * 0.35;
      if (mode === "explode" && !reduced) orbit.targetTheta += dt * 0.15;
      orbit.theta += (orbit.targetTheta - orbit.theta) * 0.08;
      orbit.phi += (orbit.targetPhi - orbit.phi) * 0.08;

      camera.position.set(
        Math.sin(orbit.theta) * Math.cos(orbit.phi) * distance,
        Math.sin(orbit.phi) * distance,
        Math.cos(orbit.theta) * Math.cos(orbit.phi) * distance,
      );
      camera.lookAt(0, 0, 0);

      if (mode === "explode") {
        const e = THREE.MathUtils.smoothstep(explode, 0.05, 0.9);
        // 레이어를 위아래로 띄워서 보여준다 (외피 → 폼 → 안감, 벨크로는 바깥으로)
        const gap = HEIGHT * 1.35;
        belt.outer.position.y = e * gap;
        belt.velcro.position.y = e * gap * 2;
        belt.velcro.scale.set(1 + e * 0.12, 1, 1 + e * 0.12);
        belt.buckle.visible = e < 0.05;
        belt.inner.position.y = -e * gap;
        belt.inner.material.side = THREE.DoubleSide;
        belt.rims.forEach((r) => (r.visible = e < 0.05));
      }
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      distance = fitDistance();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      textures.forEach((t) => t.dispose());
      pmrem.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [mode]);

  const layers = [
    { no: 1, name: "외피 텍스타일", sub: "OUTER TEXTILE" },
    { no: 2, name: "폼 코어", sub: "FOAM CORE" },
    { no: 3, name: "안감", sub: "INNER LINING" },
    { no: 4, name: "벨크로 락", sub: "VELCRO LOCK" },
  ];

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <div ref={mountRef} className="absolute inset-0 touch-pan-y [&>canvas]:cursor-grab [&>canvas]:active:cursor-grabbing" />

      {mode === "hero" && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-28 flex justify-center">
            <p className="font-mono text-[11px] tracking-[0.2em] text-silver/70">← DRAG TO ROTATE →</p>
          </div>
          <div className="absolute inset-x-0 bottom-14 flex justify-center gap-1.5">
            {(Object.keys(VIEWS) as ViewName[]).map((v) => (
              <button
                key={v}
                onClick={() => {
                  setView(v);
                  api.current?.setView(v);
                }}
                className={cn(
                  "border px-3 py-1.5 text-xs font-bold transition",
                  view === v ? "border-cobalt-bright bg-cobalt-bright text-white" : "border-silver/30 text-silver hover:border-silver",
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-5">
            {colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => {
                  setColorIndex(i);
                  api.current?.setColor(i);
                }}
                aria-label={c.name}
                className="flex items-center gap-1.5 text-xs font-bold"
              >
                <span
                  className={cn("h-5 w-5 rounded-full ring-offset-2 ring-offset-[#07080a]", i === colorIndex ? "ring-2 ring-cobalt-bright" : "")}
                  style={{ background: `linear-gradient(${c.base} 62%, ${c.logo} 62%)` }}
                />
                <span className={i === colorIndex ? "text-white" : "text-silver/50"}>{c.en}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {mode === "explode" && (
        <ol className="pointer-events-none absolute right-0 bottom-0 left-0 grid grid-cols-2 gap-x-4 gap-y-3">
          {layers.map((l, i) => (
            <li
              key={l.no}
              className="flex items-center gap-2 transition-all duration-500"
              style={{ opacity: progress > 0.2 + i * 0.12 ? 1 : 0, transform: `translateY(${progress > 0.2 + i * 0.12 ? 0 : 12}px)` }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt-bright text-xs font-black text-white">{l.no}</span>
              <span>
                <span className="block text-sm font-black text-white">{l.name}</span>
                <span className="block font-mono text-[10px] tracking-widest text-silver/60">{l.sub}</span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
