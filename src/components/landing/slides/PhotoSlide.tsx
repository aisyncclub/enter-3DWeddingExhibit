import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRightGlyph as ArrowRight } from '@/components/icons/EditorialIcons';
import { MarqueeText } from '../MarqueeText';

interface PhotoSlideProps { active: boolean; }

const FEATURES = [
  { label: '커버 큐레이션', desc: '첫 화면에 어울리는 대표 사진을 정돈된 비율로 배치' },
  { label: '스토리 챕터', desc: '두 사람의 여정을 네 개의 장면으로 자연스럽게 구성' },
  { label: '갤러리 편집', desc: '포트레이트, 디테일, 이브닝 컷을 균형 있게 배열' },
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
      <div className="flex items-center justify-between px-5 md:px-8 pt-20 md:pt-24 pb-4 border-b border-deep/8 shrink-0">
        <div className="overflow-hidden">
          <motion.p variants={maskReveal(0)} initial="hidden" animate={active ? 'visible' : 'hidden'}
            className="font-sans text-xs tracking-[0.28em] uppercase text-caramel"
          >Live Preview</motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.h2 variants={maskReveal(0.08)} initial="hidden" animate={active ? 'visible' : 'hidden'}
            className="font-display font-black text-2xl text-deep"
          >완성된 청첩장</motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.p variants={maskReveal(0.14)} initial="hidden" animate={active ? 'visible' : 'hidden'}
            className="font-sans text-sm text-deep/42"
          >실제 샘플 미리보기</motion.p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
        {/* Left: copy */}
        <div className="w-full md:w-[42%] shrink-0 flex flex-col justify-center px-7 md:px-10 py-5 md:py-0 border-b md:border-b-0 md:border-r border-deep/8 gap-5 md:gap-7">
          <div className="hidden md:block">
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

          <div className="glass-panel-quiet grid grid-cols-1 sm:grid-cols-3 md:block md:space-y-0 gap-0">
            {FEATURES.map((f, i) => (
              <motion.div key={f.label} variants={fadeIn(0.35 + i * 0.1)} initial="hidden" animate={active ? 'visible' : 'hidden'}
                className={`flex items-start gap-3 px-4 py-4 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l md:border-l-0 md:border-t border-deep/8' : ''}`}
              >
                <span className="mt-0.5 shrink-0 font-display text-lg leading-none text-caramel/75">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-sans text-xs tracking-[0.04em] md:tracking-[0.12em] uppercase font-semibold text-deep/80 mb-1">{f.label}</p>
                  <p className="font-sans text-sm text-deep/52 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button variants={fadeIn(0.6)} initial="hidden" animate={active ? 'visible' : 'hidden'}
            onClick={() => navigate('/demo')}
            className="hidden md:flex items-center gap-2 font-sans text-xs text-caramel border border-caramel/30 px-4 py-2.5 w-fit hover:bg-caramel/8 transition-colors"
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
                width: 'min(264px, 68vw)',
                height: 'min(526px, 50vh)',
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
        className="hidden md:block text-[11px] tracking-[0.15em] uppercase text-deep/18 font-sans border-t border-deep/8 py-2"
        speed="slow"
      />
    </div>
  );
}
