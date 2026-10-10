import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import type { CatGesture } from './catGesture';

/* Shared materials — created once, disposed by R3F on unmount via primitive? No:
   they live for the component lifetime; we dispose manually on unmount. */

interface ModelProps {
  reducedMotion: boolean;
  /** cross-component cat ↔ cursor state (pointer, proximity, hiss pulse) */
  gesture: CatGesture;
}

/**
 * Procedural low-poly cyber-cat head — no external assets.
 * Obsidian flat-shaded surfaces, ember emissive eyes with sprite glow,
 * flame rim light handled by the scene, holographic halo + orbiters.
 * The whole head watches the cursor (window-level gesture, so it works
 * through the pointer-events:none film) and hisses when you click near it:
 * jaw drops, fangs emerge, ears twitch, eyes flare.
 * Total budget: well under 2,000 triangles.
 */
export function CyberCatModel({ reducedMotion, gesture }: ModelProps) {
  const head = useRef<THREE.Group>(null!);
  const orbiters = useRef<THREE.Group>(null!);
  const halo = useRef<THREE.Mesh>(null!);
  const halo2 = useRef<THREE.Mesh>(null!);
  const eyeL = useRef<THREE.Mesh>(null!);
  const eyeR = useRef<THREE.Mesh>(null!);
  const earL = useRef<THREE.Group>(null!);
  const earR = useRef<THREE.Group>(null!);
  const jaw = useRef<THREE.Group>(null!);
  const fangL = useRef<THREE.Mesh>(null!);
  const fangR = useRef<THREE.Mesh>(null!);
  const { size } = useThree();

  const materials = useMemo(() => {
    const obsidian = new THREE.MeshStandardMaterial({
      color: '#2a130b',
      metalness: 0.6,
      roughness: 0.36,
      flatShading: true,
      emissive: '#190803',
      emissiveIntensity: 0.35,
    });
    const eye = new THREE.MeshStandardMaterial({
      color: '#ff8a1f',
      emissive: '#ff8a1f',
      emissiveIntensity: 2.0,
      roughness: 0.2,
      metalness: 0,
    });
    const innerEar = new THREE.MeshBasicMaterial({
      color: '#ff8a1f',
      transparent: true,
      opacity: 0.4,
    });
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#ff8a1f',
      transparent: true,
      opacity: 0.55,
    });
    const halo2Mat = new THREE.MeshBasicMaterial({
      color: '#ff3d00',
      transparent: true,
      opacity: 0.28,
    });
    const orbiterCyan = new THREE.MeshBasicMaterial({ color: '#ff8a1f' });
    const orbiterViolet = new THREE.MeshBasicMaterial({ color: '#ff3d00' });
    const fang = new THREE.MeshStandardMaterial({
      color: '#f6e2c0',
      emissive: '#8a4a12',
      emissiveIntensity: 0.35,
      roughness: 0.4,
    });
    return { obsidian, eye, innerEar, haloMat, halo2Mat, orbiterCyan, orbiterViolet, fang };
  }, []);

  /* soft radial glow texture for the eye sprites (canvas-generated) */
  const glowTexture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
    grad.addColorStop(0, 'rgba(255,138,31,0.85)');
    grad.addColorStop(0.4, 'rgba(255,138,31,0.25)');
    grad.addColorStop(1, 'rgba(255,138,31,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);

  /* almond "eye lens" shape */
  const eyeGeometry = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.105);
    s.quadraticCurveTo(0.16, 0.05, 0.2, 0);
    s.quadraticCurveTo(0.16, -0.05, 0, -0.105);
    s.quadraticCurveTo(-0.16, -0.05, -0.2, 0);
    s.quadraticCurveTo(-0.16, 0.05, 0, 0.105);
    return new THREE.ShapeGeometry(s, 6);
  }, []);

  /* geometries shared across meshes */
  const geoms = useMemo(
    () => ({
      skull: new THREE.IcosahedronGeometry(1, 1),
      ear: new THREE.ConeGeometry(0.3, 0.58, 4),
      earInner: new THREE.ConeGeometry(0.16, 0.34, 4),
      muzzle: new THREE.OctahedronGeometry(0.3),
      nose: new THREE.ConeGeometry(0.05, 0.09, 3),
      jaw: new THREE.BoxGeometry(0.54, 0.14, 0.4),
      fang: new THREE.ConeGeometry(0.034, 0.16, 4),
      halo: new THREE.TorusGeometry(1.42, 0.012, 6, 90),
      halo2: new THREE.TorusGeometry(1.68, 0.008, 6, 90),
      orbiter: new THREE.OctahedronGeometry(0.045),
    }),
    []
  );

  /* responsive scale from canvas size */
  const scale = THREE.MathUtils.clamp(size.width / 850, 0.62, 1.05);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const h = reducedMotion ? 0 : gesture.hiss;

    if (!reducedMotion) {
      /* the head watches the cursor — window-level gesture, so it works
         even though the film canvas never captures pointer events */
      const yaw = gesture.px * 0.4;
      const pitch = gesture.py * 0.22 - h * 0.14;
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, yaw, 4, delta);
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, pitch, 4, delta);
      head.current.rotation.z = THREE.MathUtils.damp(
        head.current.rotation.z,
        Math.sin(t * 0.4) * 0.02,
        3,
        delta
      );
      head.current.position.y = THREE.MathUtils.damp(head.current.position.y, Math.sin(t * 0.9) * 0.07, 3, delta);

      /* hiss reaction — jaw drops, fangs emerge, ears twitch, rings race */
      jaw.current.rotation.x = THREE.MathUtils.damp(jaw.current.rotation.x, h * 0.92, 9, delta);
      jaw.current.position.y = THREE.MathUtils.damp(jaw.current.position.y, -h * 0.07, 9, delta);
      const fs = 1 + h * 1.1;
      fangL.current.scale.y = THREE.MathUtils.damp(fangL.current.scale.y, fs, 9, delta);
      fangR.current.scale.y = THREE.MathUtils.damp(fangR.current.scale.y, fs, 9, delta);
      const tw = h * 0.34 * Math.sin(t * 24);
      earL.current.rotation.z = THREE.MathUtils.damp(earL.current.rotation.z, 0.34 - tw, 12, delta);
      earR.current.rotation.z = THREE.MathUtils.damp(earR.current.rotation.z, -0.34 + tw, 12, delta);

      halo.current.rotation.z += delta * (0.12 + h * 0.35);
      halo2.current.rotation.z -= delta * (0.08 + h * 0.2);
      orbiters.current.rotation.y += delta * (0.25 + h * 0.3);
    }

    /* eyes brighten near the cursor and flare while hissing */
    const glow = 2.6 + gesture.hover * 1.5 + h * 2.6;
    materials.eye.emissiveIntensity = THREE.MathUtils.damp(materials.eye.emissiveIntensity, glow, 6, delta);
    void eyeL;
    void eyeR;
  });

  return (
    <group scale={scale}>
      <group ref={head}>
        {/* skull — the whole head tracks the cursor via the window gesture */}
        <mesh material={materials.obsidian} geometry={geoms.skull} scale={[1.02, 0.92, 0.94]}>
          <Edges threshold={18} color="#7c3511" />
        </mesh>

        {/* muzzle */}
        <mesh geometry={geoms.muzzle} material={materials.obsidian} position={[0, -0.32, 0.62]} scale={[1.1, 0.7, 0.9]} />

        {/* nose */}
        <mesh geometry={geoms.nose} position={[0, -0.22, 0.86]} rotation={[Math.PI, 0, 0]} material={materials.orbiterViolet} />

        {/* jaw — pivots at its back edge so a hiss drops the front, with
            fangs riding it and emerging as the mouth opens */}
        <group ref={jaw} position={[0, -0.46, 0.42]}>
          <mesh geometry={geoms.jaw} material={materials.obsidian} position={[0, 0, 0.2]} />
          <mesh
            ref={fangL}
            geometry={geoms.fang}
            material={materials.fang}
            position={[-0.11, 0.02, 0.42]}
            rotation={[Math.PI, 0, 0]}
            scale={[1, 0, 1]}
          />
          <mesh
            ref={fangR}
            geometry={geoms.fang}
            material={materials.fang}
            position={[0.11, 0.02, 0.42]}
            rotation={[Math.PI, 0, 0]}
            scale={[1, 0, 1]}
          />
        </group>

        {/* ears (twitch on hiss) */}
        {[
          { x: 0.58, rot: -0.34, ref: earR },
          { x: -0.58, rot: 0.34, ref: earL },
        ].map((ear) => (
          <group
            key={ear.x}
            ref={ear.ref}
            position={[ear.x, 0.62, -0.08]}
            rotation={[0.06, 0, ear.rot]}
          >
            <mesh geometry={geoms.ear} material={materials.obsidian} />
            <mesh geometry={geoms.earInner} material={materials.innerEar} position={[0, -0.02, 0.07]} />
          </group>
        ))}

        {/* eyes + glow sprites */}
        {[
          { x: 0.36, rot: -0.26 },
          { x: -0.36, rot: 0.26 },
        ].map((eye) => (
          <group key={eye.x} position={[eye.x, 0.08, 0.88]} rotation={[0, 0, eye.rot]}>
            <mesh ref={eye.x > 0 ? eyeR : eyeL} geometry={eyeGeometry} material={materials.eye} />
            <sprite scale={[0.72, 0.5, 1]} position={[0, 0, 0.05]}>
              <spriteMaterial map={glowTexture} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
            </sprite>
          </group>
        ))}

        {/* whisker hints */}
        <lineSegments>
          <bufferGeometry
            attach="geometry"
            onUpdate={(g) => {
              const pts = [-0.5, 0.32, -0.62, 0.18, -0.5, -0.02, -0.62, -0.14].flatMap((x, i) => [
                x * 0.9, i % 2 === 0 ? 0.02 : -0.14, 0.78,
                x, i % 2 === 0 ? 0.05 : -0.1, 1.1,
              ]);
              g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
            }}
          />
          <lineBasicMaterial color="#5b2a12" transparent opacity={0.6} />
        </lineSegments>
      </group>

      {/* holographic halo — tilted high enough to read as luminous rings */}
      <mesh ref={halo} geometry={geoms.halo} material={materials.haloMat} rotation={[1.0, 0, 0]} />
      <mesh ref={halo2} geometry={geoms.halo2} material={materials.halo2Mat} rotation={[0.85, 0.5, 0]} />

      {/* orbital shards */}
      <group ref={orbiters} rotation={[0.35, 0, 0.1]}>
        <mesh geometry={geoms.orbiter} material={materials.orbiterCyan} position={[1.55, 0.3, 0]} />
        <mesh geometry={geoms.orbiter} material={materials.orbiterViolet} position={[-1.75, -0.2, 0.4]} />
        <mesh geometry={geoms.orbiter} material={materials.orbiterCyan} position={[0.2, 0.55, -1.6]} />
      </group>
    </group>
  );
}
