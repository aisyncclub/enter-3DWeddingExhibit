import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MarqueeText } from '../MarqueeText';

interface CTASlideProps { active: boolean; }

const PLANS = [
  { name: '무료 체험', price: '₩0', note: '데모 미리보기', highlight: false },
  { name: '스탠다드', price: '₩29,000', note: '청첩장 1건 · 링크 90일', highlight: true },
  { name: '프리미엄', price: '₩59,000', note: '커스텀 · 링크 1년', highlight: false },
];

export function CTASlide({ active }: CTASlideProps) {
  const navigate = useNavigate();
  const maskReveal = (delay: number) => ({
    hidden: { y: '110%' },
    visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay } },
  });

  return (
    <div className="w-screen h-screen bg-deep flex flex-col overflow-hidden select-none">
      {/* Top marquee */}
      <MarqueeText
        text="3D Wedding Gallery · 청첩장을 전시회로 · Invitique · Experience Now"
        className="text-[11px] tracking-[0.2em] uppercase text-cream/15 font-sans border-b border-cream/8 py-3"
      />

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-8 max-w-2xl">
          <div className="overflow-hidden mb-3">
            <motion.p
              variants={maskReveal(0.1)}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className="font-sans text-[11px] tracking-[0.4em] uppercase text-caramel"
            >
              Invitique — 2026
            </motion.p>
          </div>

          <div className="overflow-hidden mb-2">
            <motion.h2
              variants={maskReveal(0.2)}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className="font-display font-black italic text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-cream"
            >
              Experience
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              variants={maskReveal(0.3)}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className="font-display font-black text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-caramel"
            >
              Now
            </motion.h2>
          </div>

          <motion.div
            variants={maskReveal(0.45)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="mb-10"
          >
            <button
              onClick={() => navigate('/demo')}
              className="inline-flex items-center gap-3 border border-cream/25 text-cream px-8 py-3.5 text-sm font-semibold tracking-wide font-sans hover:bg-cream hover:text-deep transition-all duration-300 group"
            >
              데모 체험하기
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Pricing row */}
          <motion.div
            variants={maskReveal(0.55)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="grid grid-cols-3 gap-0 border border-cream/10"
          >
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                className={`px-6 py-5 text-center border-r border-cream/10 last:border-r-0 ${
                  plan.highlight ? 'bg-cream/6' : ''
                }`}
              >
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-2">{plan.name}</p>
                <p className="font-display font-bold text-xl text-cream">{plan.price}</p>
                <p className="font-sans text-[11px] text-cream/30 mt-1">{plan.note}</p>
                {plan.highlight && (
                  <span className="inline-block mt-2 text-[10px] tracking-[0.15em] uppercase text-caramel border border-caramel/30 px-2 py-0.5">
                    Popular
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
        <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-cream/25">© 2026</span>
      </div>
    </div>
  );
}
