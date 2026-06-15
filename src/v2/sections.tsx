import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Quote, Star, ChevronLeft, ChevronRight, ArrowUpRight,
} from 'lucide-react';
import { Button, SHADOW_PRIMARY, SHADOW_SECONDARY, SHADOW_CARD } from './Button';
import { useInViewAnimation } from './useInViewAnimation';
import { useMouseTrail, TrailImages } from './MouseTrail';
import { PHOTOS, TEMPLATES, TESTIMONIALS } from './data';

/* ── Scroll-reveal wrapper ───────────────────────────────────── */
function Reveal({
  children, delay = 0, className = '', style,
}: { children: ReactNode; delay?: number; className?: string; style?: CSSProperties }) {
  const { ref, inView } = useInViewAnimation();
  return (
    <div
      ref={ref}
      className={`${inView ? 'animate-fade-in-up' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

const Serif = ({ children, italic = true }: { children: ReactNode; italic?: boolean }) => (
  <span className={`v2-serif ${italic ? 'italic' : ''}`}>{children}</span>
);

const HEADING = 'text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight';

/* ════════════════════════════════════════════════════════════════
   3. TESTIMONIAL QUOTE  — with parallax image
   ════════════════════════════════════════════════════════════════ */
function useParallax(max = 120) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let active = false;
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; });
    io.observe(el);
    const onScroll = () => {
      if (!active) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = (vh - rect.top) / (vh + rect.height); // 0..1
        setOffset((Math.min(1, Math.max(0, progress)) - 0.5) * max);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [max]);
  return { ref, offset };
}

export function TestimonialQuote() {
  const { ref, offset } = useParallax(80);
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal delay={0.1}>
          <Quote className="w-6 h-6 mx-auto text-[#0D212C]" strokeWidth={1.5} />
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="text-[30px] md:text-[38px] lg:text-[40px] leading-[1.18] tracking-tight lg:whitespace-nowrap mt-6"
            style={{ color: '#0D212C', wordBreak: 'keep-all' }}
          >
            종이 청첩장을 넘어, <Serif>Invitique</Serif>를 택한 이유.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="italic text-sm mt-6" style={{ color: '#273C46' }}>— 박지훈 · 이서연 부부</p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex items-center justify-center gap-8 mt-8 text-[#0D212C]">
            {TEMPLATES.map((t) => (
              <span key={t.name} className="v2-serif text-2xl font-medium">{t.name}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.5} className="mt-12 flex justify-center">
          <div ref={ref} className="w-full max-w-xs overflow-hidden rounded-2xl" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.14)' }}>
            <img
              src={PHOTOS[3]} alt="Invitique 청첩장 미리보기" crossOrigin="anonymous"
              className="w-full h-[420px] object-cover"
              style={{ transform: `translateY(${offset}px) scale(1.12)`, transition: 'transform 0.1s linear' }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   4. PRICING
   ════════════════════════════════════════════════════════════════ */
export function Pricing() {
  const navigate = useNavigate();
  return (
    <section className="py-12 md:py-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:max-w-4xl md:ml-auto">
        {/* Dark */}
        <Reveal delay={0.1}>
          <div className="rounded-[40px] pl-10 pr-10 md:pr-20 pt-8 pb-10 h-full flex flex-col"
            style={{ background: '#051A24', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 30px 60px -20px rgba(5,26,36,0.5)' }}>
            <p className="text-[22px] font-medium" style={{ color: '#F6FCFF' }}>프리미엄 맞춤 제작</p>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: '#E0EBF0' }}>
              전담 디자이너와 1:1로,<br />세상에 하나뿐인 청첩장을.
            </p>
            <div className="mt-8 mb-8">
              <p className="text-2xl font-medium" style={{ color: '#F6FCFF' }}>₩99,000</p>
              <p className="text-sm mt-1" style={{ color: '#E0EBF0' }}>1회 제작</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Button variant="primary" onClick={() => navigate('/demo')}
                className="!bg-white !text-[#051A24]">상담 시작</Button>
              <Button variant="secondary" onClick={() => navigate('/demo')}
                className="!bg-transparent !text-[#F6FCFF] !shadow-none border border-white/20">제작 과정</Button>
            </div>
          </div>
        </Reveal>
        {/* Light */}
        <Reveal delay={0.2}>
          <div className="rounded-[40px] pl-10 pr-10 md:pr-20 pt-8 pb-10 h-full flex flex-col bg-white"
            style={{ boxShadow: SHADOW_CARD }}>
            <p className="text-[22px] font-medium" style={{ color: '#0D212C' }}>셀프 제작</p>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: '#273C46' }}>
              3가지 시그니처 템플릿으로,<br />10분이면 완성.
            </p>
            <div className="mt-8 mb-8">
              <p className="text-2xl font-medium" style={{ color: '#0D212C' }}>무료</p>
              <p className="text-sm mt-1" style={{ color: '#273C46' }}>Self-serve</p>
            </div>
            <div className="mt-auto">
              <Button variant="tertiary" onClick={() => navigate('/demo')}>바로 만들기</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   5. TESTIMONIAL CAROUSEL  — infinite auto-scroll
   ════════════════════════════════════════════════════════════════ */
const QuoteMark = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="mb-5" aria-hidden>
    <path d="M11 22V12C11 5.4 6.6 1.1 0 0v4.4C3.3 5.1 5 7 5 11H1v11h10ZM28 22V12c0-6.6-4.4-10.9-11-12v4.4C20.3 5.1 22 7 22 11h-4v11h10Z" fill="#0D212C" fillOpacity="0.12" />
  </svg>
);

export function Carousel() {
  const N = TESTIMONIALS.length;
  const loop = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  const [i, setI] = useState(N); // start in the middle copy
  const [withTransition, setWithTransition] = useState(true);
  const [step, setStep] = useState(451); // card width + gap fallback
  const cardRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (cardRef.current) setStep(cardRef.current.offsetWidth + 24);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const id = setInterval(() => { if (!paused.current) setI((p) => p + 1); }, 3000);
    return () => clearInterval(id);
  }, []);

  const onEnd = () => {
    if (i >= 2 * N) { setWithTransition(false); setI(i - N); }
    else if (i < N) { setWithTransition(false); setI(i + N); }
  };
  useEffect(() => {
    if (!withTransition) {
      const r = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(r);
    }
  }, [withTransition]);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="px-6 md:max-w-4xl md:ml-auto mb-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className={HEADING} style={{ color: '#0D212C' }}>
            What <Serif>couples</Serif> say
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 md:w-5 md:h-5 fill-black text-black" />)}
            </div>
            <span className="text-sm font-medium text-[#0D212C] whitespace-nowrap">네이버 4.9/5</span>
          </div>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
      >
        <div
          className="flex gap-6 pl-6"
          style={{
            transform: `translateX(-${i * step}px)`,
            transition: withTransition ? 'transform 0.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
          onTransitionEnd={onEnd}
        >
          {loop.map((t, idx) => (
            <div
              key={idx}
              ref={idx === 0 ? cardRef : undefined}
              className="shrink-0 w-[calc(100vw-48px)] md:w-[427px] bg-white rounded-[32px] md:rounded-[40px] px-6 md:pl-10 md:pr-16 py-8"
              style={{ boxShadow: SHADOW_CARD }}
            >
              <QuoteMark />
              <p className="text-base leading-relaxed" style={{ color: '#0D212C' }}>{t.quote}</p>
              <div className="flex items-center gap-3 mt-7">
                <img src={t.avatar} alt={t.name} crossOrigin="anonymous" className="w-12 h-12 rounded-full object-cover bg-[#0D212C]/5" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#0D212C' }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#273C46' }}>→ {t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 px-6 md:max-w-4xl md:ml-auto mt-8">
          <button onClick={() => { setI(i - 1); }} aria-label="이전"
            className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-[#0D212C] hover:text-white transition-colors"
            style={{ borderColor: 'rgba(13,33,44,0.2)' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => { setI(i + 1); }} aria-label="다음"
            className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-[#0D212C] hover:text-white transition-colors"
            style={{ borderColor: 'rgba(13,33,44,0.2)' }}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   6. TEMPLATES SHOWCASE  (Projects equivalent)
   ════════════════════════════════════════════════════════════════ */
export function Templates() {
  const navigate = useNavigate();
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
      <Reveal delay={0.1} className="ml-20 md:ml-28 mb-10">
        <p className="v2-mono text-xs uppercase tracking-widest" style={{ color: '#273C46' }}>Signature collection</p>
        <h2 className={`${HEADING} mt-2`} style={{ color: '#051A24' }}>
          세 가지 <Serif>템플릿</Serif>
        </h2>
      </Reveal>
      <div className="flex flex-col gap-16 md:gap-20">
        {TEMPLATES.map((t, idx) => (
          <Reveal key={t.name} delay={0.1 + idx * 0.05}>
            <button onClick={() => navigate(t.href)} className="block w-full text-left group">
              <div className="ml-20 md:ml-28 mb-5">
                <div className="flex items-baseline gap-3">
                  <span className="v2-serif text-2xl md:text-3xl font-semibold" style={{ color: '#051A24' }}>{t.name}</span>
                  <span className="text-sm" style={{ color: 'rgba(5,26,36,0.45)' }}>{t.kr}</span>
                </div>
                <p className="text-sm md:text-base mt-1 max-w-md" style={{ color: 'rgba(5,26,36,0.7)' }}>{t.desc}</p>
              </div>
              <div className="overflow-hidden rounded-2xl" style={{ boxShadow: '0 14px 40px rgba(0,0,0,0.12)' }}>
                <img src={t.photo} alt={t.name} crossOrigin="anonymous"
                  className="w-full h-[300px] md:h-[440px] object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   7. PARTNER  — mouse-trail CTA
   ════════════════════════════════════════════════════════════════ */
export function Partner() {
  const navigate = useNavigate();
  const { trail, onMouseMove } = useMouseTrail(160);

  return (
    <section className="py-12 md:py-16 px-6">
      <div
        onMouseMove={onMouseMove}
        className="relative max-w-7xl mx-auto py-40 md:py-56 rounded-[40px] overflow-hidden bg-white"
        style={{ boxShadow: SHADOW_SECONDARY }}
      >
        <TrailImages trail={trail} />
        <div className="relative z-10 text-center pointer-events-none">
          <h2 className="v2-serif text-[48px] md:text-[64px] lg:text-[80px] leading-none mb-12" style={{ color: '#0D212C' }}>
            Begin your story
          </h2>
          <div className="pointer-events-auto inline-block">
            <Button variant="primary" onClick={() => navigate('/demo')} className="!py-2 !pl-2 !pr-6"
              leading={<img src={PHOTOS[0]} alt="" crossOrigin="anonymous" className="w-10 h-10 rounded-full object-cover" />}>
              청첩장 만들기 시작
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   8–9. FOOTER + COPYRIGHT
   ════════════════════════════════════════════════════════════════ */
export function Footer() {
  const navigate = useNavigate();
  const link = 'text-base hover:opacity-70 transition-opacity';
  return (
    <>
      <footer className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <Button variant="primary" onClick={() => navigate('/demo')}>청첩장 만들기</Button>
          <div className="flex items-start gap-6">
            <ArrowUpRight className="w-6 h-6 mt-1 shrink-0" style={{ color: '#051A24' }} />
            <div className="flex gap-14" style={{ color: '#051A24' }}>
              <div className="flex flex-col gap-3">
                <a href="#templates" className={link}>템플릿</a>
                <a href="/demo" className={link}>데모</a>
                <a href="#pricing" className={link}>가격</a>
              </div>
              <div className="flex flex-col gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={link}>Instagram</a>
                <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer" className={link}>카카오채널</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="max-w-[1200px] mx-auto px-6 py-4 border-t" style={{ borderColor: 'rgba(5,26,36,0.08)' }}>
        <div className="flex items-center justify-between text-sm" style={{ color: 'rgba(5,26,36,0.7)' }}>
          <span className="v2-serif text-base" style={{ color: '#051A24' }}>Invitique</span>
          <span>Built on Enter · Seoul</span>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   10. FIXED BOTTOM NAV
   ════════════════════════════════════════════════════════════════ */
export function BottomNav() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-white rounded-full pl-6 pr-2 py-2"
        style={{ boxShadow: `${SHADOW_SECONDARY}, ${SHADOW_PRIMARY}` }}>
        <button onClick={() => navigate('/')} className="v2-serif text-2xl font-semibold leading-none" style={{ color: '#051A24' }}>I</button>
        <Button variant="primary" onClick={() => navigate('/demo')} className="!px-5 !py-2">청첩장 만들기</Button>
      </div>
    </div>
  );
}
