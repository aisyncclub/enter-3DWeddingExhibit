import * as THREE from 'three';
import type { ThemeKey } from './backgrounds';

const PETAL_COUNT = 60;
const STAR_COUNT = 200;
const SPREAD = 12;

export interface ParticleSystem {
  points: THREE.Points;
  update: (delta: number) => void;
  dispose: () => void;
}

export function createParticles(theme: ThemeKey, color: number): ParticleSystem {
  if (theme === 'night') {
    return createStarParticles(color);
  }
  return createPetalParticles(color);
}

function createPetalParticles(color: number): ParticleSystem {
  const positions = new Float32Array(PETAL_COUNT * 3);
  const velocities = new Float32Array(PETAL_COUNT * 3);
  const phases = new Float32Array(PETAL_COUNT);

  for (let i = 0; i < PETAL_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * SPREAD * 2;
    positions[i * 3 + 1] = Math.random() * 6 + 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 2;
    velocities[i * 3] = (Math.random() - 0.5) * 0.3;
    velocities[i * 3 + 1] = -(0.3 + Math.random() * 0.5);
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color,
    size: 0.08,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);

  let time = 0;
  const update = (delta: number) => {
    time += delta;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < PETAL_COUNT; i++) {
      const x = pos.getX(i) + velocities[i * 3] * delta + Math.sin(time + phases[i]) * 0.01;
      const y = pos.getY(i) + velocities[i * 3 + 1] * delta;
      const z = pos.getZ(i) + velocities[i * 3 + 2] * delta;
      if (y < -1) {
        pos.setXYZ(i, (Math.random() - 0.5) * SPREAD * 2, 6 + Math.random() * 2, (Math.random() - 0.5) * SPREAD * 2);
      } else {
        pos.setXYZ(i, x, y, z);
      }
    }
    pos.needsUpdate = true;
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
  };

  return { points, update, dispose };
}

function createStarParticles(color: number): ParticleSystem {
  const positions = new Float32Array(STAR_COUNT * 3);
  const phases = new Float32Array(STAR_COUNT);

  for (let i = 0; i < STAR_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 8 + Math.random() * 4;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color,
    size: 0.06,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  let time = 0;

  const update = (delta: number) => {
    time += delta;
    material.opacity = 0.5 + 0.4 * Math.sin(time * 0.8);
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
  };

  return { points, update, dispose };
}
