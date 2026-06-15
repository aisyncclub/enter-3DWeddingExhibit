import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeftGlyph as ChevronLeft, ChevronRightGlyph as ChevronRight } from '@/components/icons/EditorialIcons';
import { useNavigate } from 'react-router-dom';
import { FilmGrain } from './landing/FilmGrain';
import { CoverSlide } from './landing/slides/CoverSlide';
import { ConceptSlide } from './landing/slides/ConceptSlide';
import { ThemesSlide } from './landing/slides/ThemesSlide';
import { ExperienceSlide } from './landing/slides/ExperienceSlide';
import { PhotoSlide } from './landing/slides/PhotoSlide';
import { CTASlide } from './landing/slides/CTASlide';

const SLIDE_COUNT = 6;
const SLIDE_LABELS = ['Cover', 'Concept', 'Templates', 'Features', 'Gallery', 'Launch'];
const SERVICE_NAV = [
  { label: '템플릿', slide: 2 },
  { label: '제작 흐름', slide: 3 },
  { label: '샘플', slide: 4 },
  { label: '가격', slide: 5 },
];

export function LookbookLanding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const wheelCooldown = useRef(false);

  const go = useCallback((next: number) => {
    if (isAnimating) return;
    const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, next));
    if (clamped === current) return;
    setIsAnimating(true);
    setCurrent(clamped);
    setTimeout(() => setIsAnimating(false), 700);
  }, [current, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(current + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, go]);

  // Wheel navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (wheelCooldown.current) return;
      e.preventDefault();
      wheelCooldown.current = true;
      const delta = e.deltaY || e.deltaX;
      if (delta > 0) go(current + 1);
      else if (delta < 0) go(current - 1);
      setTimeout(() => { wheelCooldown.current = false; }, 800);
    };
    const el = containerRef.current;
    el?.addEventListener('wheel', onWheel, { passive: false });
    return () => el?.removeEventListener('wheel', onWheel);
  }, [current, go]);

  // Drag / touch
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) go(current + 1);
    else go(current - 1);
  };

  const slides = [
    <CoverSlide active={current === 0} />,
    <ConceptSlide active={current === 1} />,
    <ThemesSlide active={current === 2} />,
    <ExperienceSlide active={current === 3} />,
    <PhotoSlide active={current === 4} />,
    <CTASlide active={current === 5} />,
  ];

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden relative"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{ cursor: 'ew-resize' }}
    >
      <FilmGrain />

      <nav className={`fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-4 md:px-8 py-3 border-b backdrop-blur-md transition-colors ${
        current === SLIDE_COUNT - 1
          ? 'glass-panel-dark text-cream'
          : 'glass-panel-quiet text-deep'
      }`}>
        <button
          onClick={() => go(0)}
          onPointerDown={(e) => e.stopPropagation()}
          className="font-display italic text-xl leading-none"
        >
          Invitique
        </button>
        <div className="hidden sm:flex items-center gap-6">
          {SERVICE_NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => go(item.slide)}
              onPointerDown={(e) => e.stopPropagation()}
              className={`font-sans text-xs tracking-[0.16em] uppercase transition-colors ${
                current === item.slide
                  ? current === SLIDE_COUNT - 1 ? 'text-caramel' : 'text-caramel'
                  : current === SLIDE_COUNT - 1 ? 'text-cream/45 hover:text-cream' : 'text-deep/45 hover:text-deep'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate('/demo')}
          onPointerDown={(e) => e.stopPropagation()}
          className={`min-h-11 px-4 border font-sans text-xs font-semibold tracking-[0.12em] uppercase transition-colors ${
            current === SLIDE_COUNT - 1
              ? 'border-cream/25 text-cream hover:bg-cream hover:text-deep'
              : 'border-deep/20 text-deep hover:bg-deep hover:text-cream'
          }`}
        >
          데모 보기
        </button>
      </nav>

      {/* Slide strip */}
      <div
        className="flex h-full"
        style={{
          width: `${SLIDE_COUNT * 100}vw`,
          transform: `translateX(-${current * (100 / SLIDE_COUNT)}%)`,
          transition: 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-screen h-screen shrink-0 overflow-hidden">
            {slide}
          </div>
        ))}
      </div>

      {/* Page indicator */}
      {/* Adaptive color: cream text on dark CTA slide, deep text on light slides */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-50">
        {SLIDE_LABELS.map((label, i) => {
          const onDark = current === SLIDE_COUNT - 1;
          const active = i === current;
          return (
            <button key={i} onClick={() => go(i)} className="flex flex-col items-center gap-1 group">
              <div className={`h-px transition-all duration-500 ${
                active
                  ? onDark ? 'w-10 bg-cream' : 'w-10 bg-deep'
                  : onDark ? 'w-4 bg-cream/20 group-hover:bg-cream/50' : 'w-4 bg-deep/20 group-hover:bg-deep/40'
              }`} />
              <span className={`hidden sm:block font-sans text-[9px] tracking-[0.2em] uppercase transition-colors ${
                active
                  ? onDark ? 'text-cream' : 'text-deep'
                  : onDark ? 'text-cream/25 group-hover:text-cream/60' : 'text-deep/25 group-hover:text-deep/55'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Arrow nav */}
      {current > 0 && (
        <button
          onClick={() => go(current - 1)}
          className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 hidden md:flex items-center justify-center border transition-all ${
            current === SLIDE_COUNT - 1
              ? 'border-cream/20 text-cream/50 hover:text-cream hover:border-cream/50'
              : 'border-deep/15 text-deep/40 hover:text-deep hover:border-deep/40'
          }`}
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {current < SLIDE_COUNT - 1 && (
        <button
          onClick={() => go(current + 1)}
          className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 hidden md:flex items-center justify-center border transition-all ${
            current === SLIDE_COUNT - 1
              ? 'border-cream/20 text-cream/50 hover:text-cream hover:border-cream/50'
              : 'border-deep/15 text-deep/40 hover:text-deep hover:border-deep/40'
          }`}
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Slide number bottom-right */}
      <div className={`fixed bottom-5 right-6 z-50 hidden md:flex items-baseline gap-1 transition-colors ${current === SLIDE_COUNT - 1 ? 'text-cream/50' : 'text-deep/40'}`}>
        <span className="font-display font-black text-xl">{String(current + 1).padStart(2, '0')}</span>
        <span className="font-sans text-xs opacity-40">/ {String(SLIDE_COUNT).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
