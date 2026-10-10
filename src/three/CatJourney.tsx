import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CyberCatModel } from './CyberCatModel';
import { ParticleField } from './ParticleField';
import { catGesture } from './catGesture';

/* ---------- WebGL capability probe (once) ---------- */
function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') ?? c.getContext('webgl'));
  } catch {
    return false;
  }
}

/* ---------- cinematic chapter keyframes ----------
   The camera flies through scenes as you scroll — one continuous film:
   K0 hero        face-on, cat anchored lower-right, big type above it
   K1 about       slow dolly right/down around the cat
   K2 skills      the camera swings low-left, rings expand into a tunnel
   K3 projects    wide pull-back: tiny cat over a glowing grid plane
   K4 experience  crane up, elevated side view
   K5 contact     wheel in for the close-up finale, fov widens
   Each key binds page-scroll progress p to camera pose, cat placement,
   ring intensity and ground-grid intensity. All damped, transform-only. */
interface Key {
  p: number;
  cam: [number, number, number];
  look: [number, number, number];
  fov: number;
  cat: [number, number, number];
  scale: number;
  rings: number;
  grid: number;
}

const KEYS: Key[] = [
  { p: 0.0, cam: [0.1, 0.3, 6.3], look: [0.4, 0, 0], fov: 42, cat: [2.35, -0.5, 0], scale: 0.92, rings: 0.5, grid: 0.3 },
  { p: 0.22, cam: [-0.6, 0.1, 5.6], look: [1.35, -0.5, 0], fov: 42, cat: [1.3, -0.85, 0], scale: 1.0, rings: 0.72, grid: 0.45 },
  { p: 0.42, cam: [-1.0, 0.05, 4.7], look: [0.5, -0.25, 0], fov: 40, cat: [0.6, -0.55, 0.2], scale: 1.02, rings: 1.0, grid: 0.4 },
  { p: 0.6, cam: [0, 0.45, 11.6], look: [0, -0.12, 0], fov: 36, cat: [0.1, -0.5, 0], scale: 0.45, rings: 0.5, grid: 1.0 },
  { p: 0.78, cam: [-1.2, 0.9, 5.6], look: [0.4, -0.2, 0], fov: 40, cat: [1.05, -0.15, 0], scale: 0.85, rings: 0.7, grid: 0.55 },
  { p: 0.93, cam: [-0.9, 0.05, 4.2], look: [0.1, 0.15, 0], fov: 47, cat: [0.9, 0.3, 0.2], scale: 1.3, rings: 0.95, grid: 0.25 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];
/* smoothstep — eases between keys so the film never jerks at chapter borders */
const ss = (t: number) => t * t * (3 - 2 * t);

function sampleKey(p: number): Key {
  const t = THREE.MathUtils.clamp(p, 0, 1);
  for (let i = 1; i < KEYS.length; i++) {
    const a = KEYS[i - 1];
    const b = KEYS[i];
    if (t <= b.p) {
      const k = ss((t - a.p) / (b.p - a.p));
      return {
        p: t,
        cam: lerp3(a.cam, b.cam, k),
        look: lerp3(a.look, b.look, k),
        fov: lerp(a.fov, b.fov, k),
        cat: lerp3(a.cat, b.cat, k),
        scale: lerp(a.scale, b.scale, k),
        rings: lerp(a.rings, b.rings, k),
        grid: lerp(a.grid, b.grid, k),
      };
    }
  }
  const last = KEYS[KEYS.length - 1];
  return { ...last, p: 1 };
}

/** shared, per-frame mutable state written by the rig, read by rings/grid */
interface Tune {
  rings: number;
  grid: number;
}
const TUNE: Tune = { rings: 0, grid: 0 };

/* ---------- frustum clamp ----------
   Keyframes are authored on a desktop-ish frustum. On narrow viewports the
   horizontal half-extent shrinks, so re-project the cat target into camera
   space and clamp its lateral offset to stay inside the visible frame (with
   the cat's halo margin) — keeps the film composed on any aspect ratio. */
function clampCatTarget(cam: THREE.PerspectiveCamera, look: THREE.Vector3, cat: THREE.Vector3, radius: number, aspect: number) {
  const fwd = new THREE.Vector3().subVectors(look, cam.position).normalize();
  const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
  const up = new THREE.Vector3().crossVectors(right, fwd).normalize();
  const rel = new THREE.Vector3().subVectors(cat, cam.position);
  const depth = Math.max(0.001, rel.dot(fwd));
  const halfH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * depth;
  const halfW = halfH * aspect;
  const sx = rel.dot(right);
  const sy = rel.dot(up);
  const m = radius * 0.92;
  const maxX = Math.max(0.2, halfW - m);
  const maxY = Math.max(0.2, halfH - m);
  cat
    .copy(cam.position)
    .addScaledVector(fwd, depth)
    .addScaledVector(right, THREE.MathUtils.clamp(sx, -maxX, maxX))
    .addScaledVector(up, THREE.MathUtils.clamp(sy, -maxY, maxY));
}

/* ---------- camera + cat rig ---------- */
const LAMBDA = 2.6;

function JourneyRig({ reducedMotion }: { reducedMotion: boolean }) {
  const catWrap = useRef<THREE.Group>(null!);
  const lookAt = useRef(new THREE.Vector3(0.4, 0, 0));
  const { size } = useThree();

  useFrame((state, delta) => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    const k = sampleKey(p);

    const cam = state.camera as THREE.PerspectiveCamera;
    const look = new THREE.Vector3(...k.look);
    const aspect = size.width / Math.max(1, size.height);
    const modelScale = THREE.MathUtils.clamp(size.width / 850, 0.62, 1.05);
    const radius = 1.78 * modelScale * k.scale;

    /* cat target (clamped into the visible frustum), then damp/snap the group */
    const catTarget = new THREE.Vector3(...k.cat);
    clampCatTarget(cam, look, catTarget, radius, aspect);
    const cat = catWrap.current;

    if (reducedMotion) {
      cam.position.set(...k.cam);
      cam.fov = k.fov;
      cam.updateProjectionMatrix();
      cam.lookAt(look);
      cat.position.copy(catTarget);
      cat.scale.setScalar(k.scale);
      TUNE.rings = k.rings;
      TUNE.grid = k.grid;
      return;
    }

    cam.position.x = THREE.MathUtils.damp(cam.position.x, k.cam[0], LAMBDA, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, k.cam[1], LAMBDA, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, k.cam[2], LAMBDA, delta);
    cam.fov = THREE.MathUtils.damp(cam.fov, k.fov, LAMBDA, delta);
    cam.updateProjectionMatrix();

    lookAt.current.x = THREE.MathUtils.damp(lookAt.current.x, look.x, LAMBDA, delta);
    lookAt.current.y = THREE.MathUtils.damp(lookAt.current.y, look.y, LAMBDA, delta);
    lookAt.current.z = THREE.MathUtils.damp(lookAt.current.z, look.z, LAMBDA, delta);
    cam.lookAt(lookAt.current);

    /* re-clamp against the now-damped camera so the target tracks correctly */
    catTarget.copy(new THREE.Vector3(...k.cat));
    clampCatTarget(cam, lookAt.current, catTarget, radius, aspect);
    cat.position.x = THREE.MathUtils.damp(cat.position.x, catTarget.x, LAMBDA, delta);
    cat.position.y = THREE.MathUtils.damp(cat.position.y, catTarget.y, LAMBDA, delta);
    cat.position.z = THREE.MathUtils.damp(cat.position.z, catTarget.z, LAMBDA, delta);
    cat.scale.x = THREE.MathUtils.damp(cat.scale.x, k.scale, LAMBDA, delta);
    cat.scale.y = cat.scale.x;
    cat.scale.z = cat.scale.x;

    TUNE.rings = k.rings;
    TUNE.grid = k.grid;

    /* cat ↔ cursor interaction (mirrors the reference film's hero cat):
       the head tilts toward the pointer (model side), the rig checks when
       the pointer is near the cat (poke telegraph) and promotes a click
       inside the cat's screen radius into a hiss pulse. */
    const world = new THREE.Vector3();
    cat.getWorldPosition(world);
    const ndc = world.clone().project(cam);
    const cx = ((ndc.x + 1) / 2) * size.width;
    const cy = ((1 - ndc.y) / 2) * size.height;
    const depth = Math.max(0.001, world.distanceTo(cam.position));
    const halfH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * depth;
    const pxPerUnit = (size.height / 2) / Math.max(0.001, halfH);
    const radiusPx = radius * pxPerUnit;
    const dx = catGesture.screenPx - cx;
    const dy = catGesture.screenPy - cy;
    const distPx = Math.hypot(dx, dy);

    catGesture.hover = THREE.MathUtils.damp(
      catGesture.hover,
      distPx < radiusPx * 1.5 ? 1 : 0,
      7,
      delta
    );
    if (catGesture.down) {
      catGesture.down = 0;
      if (distPx < radiusPx * 2) catGesture.hiss = 1;
    }
    if (catGesture.hiss > 0) catGesture.hiss = Math.max(0, catGesture.hiss - delta * 1.05);
  });

  return (
    <group ref={catWrap}>
      {/* the model applies its own responsive scale; this group adds the tour scale */}
      <group>
        <CyberCatModel reducedMotion={reducedMotion} gesture={catGesture} />
      </group>
      <Rings reducedMotion={reducedMotion} />
      <ParticleField count={260} reducedMotion={reducedMotion} />
      {/* ember kiss-light rides with the cat so the face is lit in every chapter */}
      <pointLight position={[0.7, 0.45, 2.6]} intensity={11} distance={9} color="#ff8a1f" />
    </group>
  );
}

/* ---------- holo rings that orbit the cat ---------- */
const RING_DEFS = [
  { radius: 2.05, tube: 0.012, rot: [1.45, 0, 0] as [number, number, number], color: '#ff8a1f', base: 0.5, spin: 0.12 },
  { radius: 2.58, tube: 0.009, rot: [1.15, 0.5, 0] as [number, number, number], color: '#ff3d00', base: 0.32, spin: -0.08 },
  { radius: 3.12, tube: 0.007, rot: [1.55, -0.35, 0.2] as [number, number, number], color: '#ff8a1f', base: 0.22, spin: 0.05 },
];

function Rings({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    group.current.rotation.y += delta * 0.14;
    group.current.rotation.x += delta * 0.02;
    for (let i = 0; i < mats.current.length; i++) {
      const m = mats.current[i];
      m.opacity = THREE.MathUtils.damp(m.opacity, RING_DEFS[i].base * TUNE.rings, 3, delta);
    }
  });

  return (
    <group ref={group}>
      {RING_DEFS.map((r, i) => (
        <mesh key={i} rotation={r.rot}>
          <torusGeometry args={[r.radius, r.tube, 6, 96]} />
          <meshBasicMaterial
            ref={(m) => {
              if (m) mats.current[i] = m;
            }}
            color={r.color}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- ground grid plane (fades in for the wide shots) ---------- */
function GroundGrid() {
  const ref = useRef<THREE.GridHelper>(null!);

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const mats = Array.isArray(g.material) ? g.material : [g.material];
    for (const m of mats) {
      m.transparent = true;
      m.opacity = THREE.MathUtils.damp(m.opacity, TUNE.grid * 0.16, 3, delta);
    }
  });

  return <gridHelper ref={ref} args={[46, 46, '#8a3a10', '#26120a']} position={[0, -2.45, 0]} />;
}

/* ---------- the film layer ---------- */
interface LayerProps {
  lite: boolean;
  reducedMotion: boolean;
  /** fired once the canvas has rendered its first frame */
  onReady?: () => void;
}

/**
 * Cinematic film behind the whole site: the camera flies between chapters
 * as the page scrolls, always at full intensity — the cyber-cat is the
 * signature centerpiece of every scene, lit by a proper key/rim/lime rig
 * (the travelling version had no lights, leaving the obsidian face near
 * black on black). Rings orbit the cat, a grid plane fades in on wide
 * shots, fog gives the pull-backs depth.
 * - pointer-events: none — it never captures input
 * - DPR capped 1.5 mobile / 1.75 desktop
 * - render loop paused when the tab is hidden
 * - hidden entirely in Lite Mode / no WebGL
 */
export function CatJourney({ lite, reducedMotion, onReady }: LayerProps) {
  const webgl = useMemo(hasWebGL, []);
  const [visible, setVisible] = useState(true);
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
    []
  );

  const skip3D = lite || !webgl;

  /* let the page loader know we're rendering (or that there's nothing to wait for) */
  useEffect(() => {
    if (skip3D) onReady?.();
  }, [skip3D, onReady]);

  /* pause rendering when the tab is hidden */
  useEffect(() => {
    if (skip3D) return;
    const onVis = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [skip3D]);

  /* window-level cat ↔ cursor gesture — the film canvas is pointer-events:none,
     so pointer events are tracked here instead (exactly like the reference:
     the cat watches the cursor and clicks near it make it hiss) */
  useEffect(() => {
    if (skip3D || reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      catGesture.px = (e.clientX / window.innerWidth) * 2 - 1;
      catGesture.py = (e.clientY / window.innerHeight) * 2 - 1;
      catGesture.screenPx = e.clientX;
      catGesture.screenPy = e.clientY;
    };
    const onDown = (e: PointerEvent) => {
      catGesture.down = 1;
      catGesture.screenPx = e.clientX;
      catGesture.screenPy = e.clientY;
    };
    const onLeave = () => {
      catGesture.px = 0;
      catGesture.py = 0;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [skip3D, reducedMotion]);

  if (skip3D) return null;

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, isMobile ? 1.5 : 1.75)}
        camera={{ position: [0.1, 0.3, 6.3], fov: 42 }}
        flat
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl, camera }) => {
          gl.setClearAlpha(0);
          (camera as THREE.PerspectiveCamera).lookAt(0.4, 0, 0);
          onReady?.();
        }}
        style={{ pointerEvents: 'none', touchAction: 'none' }}
      >
        <fog attach="fog" args={['#120400', 9, 26]} />

        {/* lighting rig — obsidian needs a key, a flame rim, and an ember kiss */}
        <ambientLight intensity={0.72} />
        <directionalLight position={[5, 7, 4]} intensity={2.6} />
        <directionalLight position={[-5, -1, 4]} intensity={0.9} color="#ff3d00" />

        <JourneyRig reducedMotion={reducedMotion} />
        <GroundGrid />
      </Canvas>
    </div>
  );
}