import { useRef } from 'react';
import { useGallery } from './useGallery';
import type { ThemeKey } from './backgrounds';

interface GalleryCanvasProps {
  theme: ThemeKey;
  photos: (string | null)[];
  onPhotoClick: (index: number) => void;
  className?: string;
}

export function GalleryCanvas({ theme, photos, onPhotoClick, className }: GalleryCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGallery({ canvasRef, theme, photos, onPhotoClick });

  return (
    <canvas
      ref={canvasRef}
      className={`gallery-canvas ${className ?? ''}`}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
