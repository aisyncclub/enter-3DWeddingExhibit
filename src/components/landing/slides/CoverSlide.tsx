import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MarqueeText } from '../MarqueeText';

interface CoverSlideProps { active: boolean; }

export function CoverSlide({ active }: CoverSlideProps) {
  const navigate = useNavigate();
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const maskReveal = {
    hidden: { y: '110%' },
    visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };
  const imgReveal = {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 } },
  };

  return (
    <div className="w-screen h-screen bg-cream flex flex-col overflow-hidden select-none">
      {/* Top strip */}
      <div className="flex items-center justify-between px-8 pt-14 pb-0 shrink-0">
        <span className="font-display italic text-deep/40 text-sm tracking-wide">Issue 01</span>
        <span className="text-[11px] tracking-[0.3em] uppercase text-deep/35 font-sans">Wedding Gallery</span>
        <span className="font-sans text-deep/40 text-sm">2026</span>
      </div>

      {/* Main content */}
      <div className="flex flex-1 min-h-0">
        {/* Left: Text */}
        <div className="w-5/12 flex flex-col justify-between px-10 md:px-14 pb-8 pt-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="overflow-hidden mb-1">
              <motion.p variants={maskReveal} className="text-[11px] tracking-[0.3em] uppercase text-caramel font-sans mb-6">
                Invitique
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={maskReveal}
                className="font-sans text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.0] font-black text-deep"
              >
                청첩장을
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={maskReveal}
                className="font-sans text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.0] font-black text-caramel"
              >
                전시회로
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-4">
              <motion.p variants={maskReveal} className="text-deep/55 text-sm leading-relaxed max-w-xs font-sans">
                3D 갤러리 공간에 사진을 걸고,<br />
                링크 하나로 전달하는 새로운 청첩장
              </motion.p>
            </div>
            <div className="overflow-hidden mt-8">
              <motion.div variants={maskReveal}>
                <button
                  onClick={() => navigate('/demo')}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-[11px] tracking-[0.3em] uppercase text-deep font-semibold font-sans">
                    데모 체험
                  </span>
                  <div className="w-8 h-px bg-deep group-hover:w-16 transition-all duration-500" />
                  <ArrowRight size={14} className="text-deep" />
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Marquee at bottom */}
          <MarqueeText
            text="Wedding Gallery Experience"
            className="text-[11px] tracking-[0.15em] uppercase text-deep/25 font-sans"
          />
        </div>

        {/* Right: Hero image */}
        <div className="w-7/12 relative overflow-hidden">
          <motion.div
            variants={imgReveal}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="absolute inset-0"
          >
            <img
              src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/35cebb25-7ff8-4b.png"
              alt=""
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-center transition-transform duration-[6000ms] hover:scale-105"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-cream/20" />
          </motion.div>

          {/* Bottom-left photo tag */}
          <div className="absolute bottom-6 left-6 z-10">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/60">Wedding Gallery</p>
          </div>
        </div>
      </div>
    </div>
  );
}
