import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MarqueeText } from '../MarqueeText';

interface PhotoSlideProps { active: boolean; }

const FEATURES = [
  { label: 'AI 커버 추천', desc: '분위기에 맞는 대표 사진 자동 선별' },
  { label: '스토리 구성', desc: '4챕터 연애 이야기 자동 생성' },
  { label: '갤러리 정리', desc: '분위기별 사진 그룹 자동 배열' },
];

export function PhotoSlide({ active }: PhotoSlideProps) {
  const navigate = useNavigate();
  const maskReveal = (delay: number) => ({
    hidden: { y: '110%' },
    visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay } },
  });
  const fadeIn = (delay: number) => ({
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay } },
  });

  return (
    <div className="w-screen h-screen bg-cream flex flex-col overflow-hidden select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 pt-14 pb-4 border-b border-deep/8 shrink-0">
        <div className="overflow-hidden">
          <motion.p variants={maskReveal(0)} initial="hidden" animate={active ? 'visible' : 'hidden'}
            className="font-sans text-[11px] tracking-[0.3em] uppercase text-caramel"
          >Live Preview</motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.h2 variants={maskReveal(0.08)} initial="hidden" animate={active ? 'visible' : 'hidden'}
            className="font-display font-black text-2xl text-deep"
          >완성된 청첩장</motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.p variants={maskReveal(0.14)} initial="hidden" animate={active ? 'visible' : 'hidden'}
            className="font-sans text-xs text-deep/35"
          >실제 샘플 미리보기</motion.p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: copy */}
        <div className="w-[42%] shrink-0 flex flex-col justify-center px-10 border-r border-deep/8 gap-7">
          <div>
            <div className="overflow-hidden mb-3">
              <motion.p variants={maskReveal(0.2)} initial="hidden" animate={active ? 'visible' : 'hidden'}
                className="font-display italic text-caramel text-5xl font-bold leading-none"
              >지훈<br />&amp; 서연</motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p variants={maskReveal(0.32)} initial="hidden" animate={active ? 'visible' : 'hidden'}
                className="font-sans text-xs text-deep/40 tracking-[0.3em] uppercase"
              >2026 · 10 · 24</motion.p>
            </div>
          </div>

          <div className="space-y-4">
            {FEATURES.map((f, i) => (
              <motion.div key={f.label} variants={fadeIn(0.35 + i * 0.1)} initial="hidden" animate={active ? 'visible' : 'hidden'}
                className="flex items-start gap-3"
              >
                <Sparkles size={11} className="mt-0.5 shrink-0 text-caramel" />
                <div>
                  <p className="font-sans text-[11px] font-semibold text-deep/80 mb-0.5">{f.label}</p>
                  <p className="font-sans text-[10px] text-deep/40 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button variants={fadeIn(0.6)} initial="hidden" animate={active ? 'visible' : 'hidden'}
            onClick={() => navigate('/demo')}
            className="flex items-center gap-2 font-sans text-xs text-caramel border border-caramel/30 px-4 py-2.5 w-fit hover:bg-caramel/8 transition-colors"
          >
            전체 청첩장 보기
            <ArrowRight size={11} />
          </motion.button>
        </div>

        {/* Right: Phone mockup with iframe */}
        <div className="flex-1 flex items-center justify-center py-4 overflow-hidden">
          <motion.div
            variants={fadeIn(0.25)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="relative"
            style={{ filter: 'drop-shadow(0 24px 60px rgba(43,29,21,0.22))' }}
          >
            {/* Phone outer shell */}
            <div
              className="relative overflow-hidden bg-deep/5"
              style={{
                width: 264,
                height: 526,
                borderRadius: '2.4rem',
                border: '8px solid rgba(43,29,21,0.10)',
                boxShadow: 'inset 0 0 0 1px rgba(43,29,21,0.07)',
              }}
            >
              {/* Status bar */}
              <div className="absolute top-0 inset-x-0 h-7 z-10 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(245,239,230,0.95)' }}
              >
                <div className="w-16 h-3.5 rounded-full bg-deep/15" />
              </div>

              {/* iframe scaled to fit */}
              <div className="absolute inset-0 overflow-hidden" style={{ top: 28 }}>
                <iframe
                  src="/demo?template=lumiere"
                  title="청첩장 샘플"
                  style={{
                    width: 390,
                    height: 844,
                    border: 'none',
                    transformOrigin: 'top left',
                    transform: `scale(${248 / 390})`,
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-0 inset-x-0 h-5 z-10 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(245,239,230,0.95)' }}
              >
                <div className="w-20 h-1 rounded-full bg-deep/20" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee bottom */}
      <MarqueeText
        text="지훈 & 서연 · 2026.10.24 · 라움 채플홀 · Wedding Invitation · Scroll to Experience"
        className="text-[11px] tracking-[0.15em] uppercase text-deep/18 font-sans border-t border-deep/8 py-2"
        speed="slow"
      />
    </div>
  );
}
