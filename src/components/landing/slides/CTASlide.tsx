import { motion } from 'framer-motion';
import { ArrowRightGlyph as ArrowRight } from '@/components/icons/EditorialIcons';
import { useNavigate } from 'react-router-dom';
import { MarqueeText } from '../MarqueeText';

interface CTASlideProps { active: boolean; }

const PLANS = [
  { name: '무료 체험', price: '0원', note: '샘플 미리보기', detail: '템플릿과 모바일 흐름 확인', highlight: false },
  { name: '스탠다드', price: '29,000원', note: '청첩장 1건 · 90일', detail: '3D 갤러리, RSVP, 공유 링크', highlight: true },
  { name: '프리미엄', price: '59,000원', note: '커스텀 · 1년', detail: '색상 조정, 음악, 우선 제작', highlight: false },
];

export function CTASlide({ active }: CTASlideProps) {
  const navigate = useNavigate();
  const maskReveal = (delay: number) => ({
    hidden: { y: '110%' },
    visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay } },
  });

  return (
    <div className="w-screen h-screen bg-deep flex flex-col overflow-hidden select-none pt-16">
      {/* Top marquee */}
      <MarqueeText
        text="Digital Wedding Invitation · 나만의 청첩장 만들기 · Invitique · 5분 완성"
        className="hidden md:block text-[11px] tracking-[0.2em] uppercase text-cream/15 font-sans border-b border-cream/8 py-3"
      />

      {/* Main content */}
      <div className="flex-1 flex items-start md:items-center justify-start md:justify-center overflow-y-auto">
        <div className="text-center px-6 md:px-8 max-w-4xl py-8 md:py-12">
          <div className="overflow-hidden mb-3">
            <motion.p
              variants={maskReveal(0.1)}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className="font-sans text-xs tracking-[0.34em] uppercase text-caramel"
            >
              Service Plan
            </motion.p>
          </div>

          <div className="overflow-hidden mb-1">
            <motion.h2
              variants={maskReveal(0.2)}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className="font-sans font-black text-[clamp(2.15rem,7vw,6.5rem)] leading-[0.92] text-cream"
            >
              만들고
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-6 md:mb-8">
            <motion.h2
              variants={maskReveal(0.3)}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className="font-sans font-black text-[clamp(2.15rem,7vw,6.5rem)] leading-[0.92] text-caramel"
            >
              바로 공유
            </motion.h2>
          </div>
          <motion.p
            variants={maskReveal(0.38)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="mx-auto mb-6 md:mb-8 max-w-xl font-sans text-base leading-relaxed text-cream/62"
          >
            템플릿 선택부터 RSVP 수집까지 한 번에 연결됩니다. 먼저 샘플을 확인하고, 필요한 구성만 골라 시작하세요.
          </motion.p>

          <motion.div
            variants={maskReveal(0.45)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="mb-6 md:mb-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={() => navigate('/demo')}
              className="inline-flex min-h-11 items-center gap-3 bg-cream text-deep px-8 py-3.5 text-sm font-semibold tracking-wide font-sans hover:bg-caramel hover:text-deep transition-colors duration-300 group"
            >
              샘플 청첩장 보기
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/demo?template=lumiere')}
              className="inline-flex min-h-11 items-center border border-cream/20 px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-cream/75 hover:border-cream/45 hover:text-cream transition-colors"
            >
              뤼미에르로 시작
            </button>
          </motion.div>

          {/* Pricing row */}
          <motion.div
            variants={maskReveal(0.55)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="glass-panel-dark grid grid-cols-1 sm:grid-cols-3 gap-0 text-left"
          >
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`px-6 py-4 md:py-5 border-b sm:border-b-0 sm:border-r border-cream/10 last:border-r-0 last:border-b-0 ${
                  plan.highlight ? 'bg-cream/10' : ''
                }`}
              >
                <p className="font-sans text-xs tracking-[0.16em] uppercase text-cream/50 mb-2">{plan.name}</p>
                <p className="font-display font-bold text-xl text-cream">{plan.price}</p>
                <p className="font-sans text-sm text-cream/45 mt-1">{plan.note}</p>
                <p className="hidden md:block font-sans text-sm leading-relaxed text-cream/52 mt-4">{plan.detail}</p>
                {plan.highlight && (
                  <span className="inline-block mt-2 text-xs tracking-[0.12em] uppercase text-caramel border border-caramel/30 px-2 py-0.5">
                    Recommended
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between px-8 pb-6 pt-4 border-t border-cream/8">
        <span className="font-display italic text-cream/25 text-sm">Invitique</span>
        <span className="font-sans text-xs tracking-[0.18em] uppercase text-cream/35">© 2026</span>
      </div>
    </div>
  );
}
