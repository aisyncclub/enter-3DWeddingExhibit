export function FilmGrain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full animate-grain opacity-[0.028]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="1" />
      </svg>
    </div>
  );
}
