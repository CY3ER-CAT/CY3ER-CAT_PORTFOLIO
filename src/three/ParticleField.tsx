import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Ambient dust drifting around the cat. Counts stay tiny: 550 desktop / 220 mobile. */
export function ParticleField({ count = 550, reducedMotion = false }: { count?: number; reducedMotion?: boolean }) {
  const points = useRef<THREE.Points>(null!);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // shallow spherical shell around the subject
      const r = 2.2 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.7;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 0.6;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: new THREE.Color('#ff8a1f'),
      size: 0.028,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    return { geometry, material };
  }, [count]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    points.current.rotation.y += delta * 0.02;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
