import { useRef, useState } from 'react';
import { PHOTOS } from './data';

export interface TrailItem { id: number; x: number; y: number; src: string; rot: number; }

/**
 * Spawns wedding-photo thumbnails that follow the cursor and fade out.
 * `throttleMs` controls how often a new thumbnail appears (higher = slower).
 */
export function useMouseTrail(throttleMs = 160) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const last = useRef(0);
  const idRef = useRef(0);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const now = e.timeStamp;
    if (now - last.current < throttleMs) return;
    last.current = now;
    const rect = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    const item: TrailItem = {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      src: PHOTOS[id % PHOTOS.length],
      rot: ((id * 47) % 20) - 10,
    };
    setTrail((p) => [...p, item]);
    setTimeout(() => setTrail((p) => p.filter((t) => t.id !== id)), 1000);
  };

  return { trail, onMouseMove };
}

export function TrailImages({ trail, size = 'normal' }: { trail: TrailItem[]; size?: 'normal' | 'small' }) {
  const dim = size === 'small' ? 'w-20 h-28 md:w-24 md:h-32' : 'w-28 h-36';
  return (
    <>
      {trail.map((t) => (
        <img
          key={t.id} src={t.src} alt="" crossOrigin="anonymous"
          className={`v2-trail absolute ${dim} object-cover rounded-xl pointer-events-none shadow-lg z-0`}
          style={{ left: t.x, top: t.y, transform: `translate(-50%,-50%) rotate(${t.rot}deg)` }}
        />
      ))}
    </>
  );
}
