import { useNavigate } from 'react-router-dom';
import '../v2/v2.css';
import { Button } from '../v2/Button';
import { PHOTOS } from '../v2/data';
import { useMouseTrail, TrailImages } from '../v2/MouseTrail';
import {
  TestimonialQuote, Pricing, Carousel, Templates, Partner, Footer, BottomNav,
} from '../v2/sections';
import { trackEvent } from '@enter-pro/analytics-sdk';

const fade = (delay: number) => ({ animationDelay: `${delay}s` });

/* Video backdrop for the hero, softened by a white wash so the footage
   reads subtly behind the content and the page stays white-dominant. */
function HeroBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      <video
        className="w-full h-full object-cover"
        src="/hero-bg.mp4"
        autoPlay muted loop playsInline preload="auto"
      />
      {/* white veil — strong enough to keep it subtle, with extra fade at the
          edges so the centered copy stays effortlessly readable */}
      <div className="absolute inset-0 bg-white/72" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 40%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0) 30%, rgba(255,255,255,0.85) 100%)',
        }}
      />
    </div>
  );
}

export default function LandingV2() {
  const navigate = useNavigate();
  const marquee = [...PHOTOS, ...PHOTOS];
  const { trail, onMouseMove } = useMouseTrail(160);

  return (
    <div className="v2-root min-h-screen w-full overflow-x-hidden pb-28">
      {/* ── 1. HERO (floral backdrop + mouse-trail) ─────────── */}
      <section className="relative overflow-hidden" onMouseMove={onMouseMove}>
        <HeroBackdrop />
        <TrailImages trail={trail} size="small" />
        <header className="relative z-10 max-w-[460px] mx-auto px-6 pt-14 md:pt-20 text-center">
        <h1 className="v2-serif animate-fade-in-up text-[32px] md:text-[40px] lg:text-[44px] font-semibold tracking-tight mb-4"
          style={{ color: '#051A24', ...fade(0.1) }}>
          Invitique
        </h1>
        <p className="v2-mono animate-fade-in-up text-xs md:text-sm mb-2" style={{ color: '#051A24', ...fade(0.2) }}>
          디지털 청첩장 스튜디오
        </p>
        <h2 className="animate-fade-in-up text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight whitespace-nowrap"
          style={{ color: '#0D212C', ...fade(0.3) }}>
          Tell your <span className="v2-serif italic">love story,</span><br />
          the <span className="v2-serif italic">beautiful way.</span>
        </h2>

        <div className="animate-fade-in-up flex flex-col gap-6 text-sm md:text-base leading-relaxed mt-5 md:mt-6"
          style={{ color: '#051A24', ...fade(0.4) }}>
          <p>
            3D 갤러리부터 모바일 청첩장, RSVP까지. Invitique는 두 사람의 이야기를
            하나의 링크에 담아내는 디지털 청첩장 스튜디오입니다.
          </p>
          <p>
            세 가지 시그니처 템플릿 — Blanc · Lumière · Nuit. 사진과 문구만 넣으면,
            매거진처럼 완성된 청첩장이 만들어집니다.
          </p>
          <p>제작은 무료로 시작합니다.</p>
        </div>

        <div className="animate-fade-in-up flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-6"
          style={fade(0.5)}>
          <Button variant="primary" onClick={() => { trackEvent('create_cta_clicked', { eventType: 'custom', properties: { source: 'landing_hero' } }); navigate('/create'); }}>청첩장 만들기</Button>
          <Button variant="secondary" onClick={() => navigate('/demo')}>데모 보기</Button>
        </div>
        </header>
      </section>

      {/* ── 2. MARQUEE ──────────────────────────────────────── */}
      <div className="mt-16 md:mt-20 mb-12 w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {marquee.map((src, i) => (
            <img
              key={i} src={src} alt="" crossOrigin="anonymous"
              className="h-[280px] md:h-[500px] w-auto object-cover mx-3 rounded-2xl shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* ── 3–7 sections ────────────────────────────────────── */}
      <TestimonialQuote />
      <div id="pricing"><Pricing /></div>
      <Carousel />
      <div id="templates"><Templates /></div>
      <Partner />

      {/* ── 8–9 footer ──────────────────────────────────────── */}
      <Footer />

      {/* ── 10 fixed nav ────────────────────────────────────── */}
      <BottomNav />
    </div>
  );
}
