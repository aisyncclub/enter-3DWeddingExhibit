import { motion } from 'framer-motion';
import { ArrowRightGlyph as ArrowRight } from '@/components/icons/EditorialIcons';
import { useNavigate } from 'react-router-dom';
import { MarqueeText } from '../MarqueeText';

interface CoverSlideProps { active: boolean; }

const SERVICE_POINTS = [
  { label: '3D 갤러리', desc: '사진을 전시형 모바일 초대장으로 구성' },
  { label: 'RSVP 관리', desc: '참석, 식사, 연락처 응답까지 한 화면' },
  { label: '공유 링크', desc: '카카오톡과 문자로 바로 전달' },
];

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
      <div className="flex items-center justify-between px-5 md:px-8 pt-20 md:pt-24 pb-0 shrink-0">
        <span className="font-display italic text-deep/40 text-sm tracking-wide">Issue 01</span>
        <span className="text-xs tracking-[0.28em] uppercase text-deep/40 font-sans">Wedding Service</span>
        <span className="font-sans text-deep/40 text-sm">2026</span>
      </div>

      {/* Main content */}
      <div className="flex flex-1 min-h-0 flex-col md:flex-row">
        {/* Left: Text */}
        <div className="w-full md:w-5/12 flex flex-col justify-between px-7 md:px-14 pb-6 md:pb-8 pt-7 md:pt-4 min-h-[43vh] md:min-h-0">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="overflow-hidden mb-1">
              <motion.p variants={maskReveal} className="text-xs tracking-[0.28em] uppercase text-caramel font-sans mb-6">
                Invitique Service
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={maskReveal}
                className="font-sans text-[clamp(2.55rem,13vw,4.4rem)] md:text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.0] font-black text-deep"
              >
                청첩장을
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={maskReveal}
                className="font-sans text-[clamp(2.55rem,13vw,4.4rem)] md:text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.0] font-black text-caramel"
              >
                아름답게
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-6">
              <motion.p variants={maskReveal} className="text-deep/62 text-base leading-relaxed max-w-sm font-sans">
                3D 갤러리, 모바일 청첩장, RSVP를<br />
                하나의 링크로 묶는 웨딩 초대 서비스.
              </motion.p>
            </div>
            <motion.div variants={maskReveal} className="glass-panel mt-7 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              {SERVICE_POINTS.map((item, i) => (
                <div key={item.label} className={`px-4 py-4 ${i > 0 ? 'sm:border-l md:border-l-0 lg:border-l border-deep/10' : ''}`}>
                  <p className="font-sans text-xs tracking-[0.14em] uppercase text-caramel mb-1.5">{item.label}</p>
                  <p className="font-sans text-sm leading-relaxed text-deep/58">{item.desc}</p>
                </div>
              ))}
            </motion.div>
            <div className="overflow-hidden mt-8">
              <motion.div variants={maskReveal}>
                <button
                  onClick={() => navigate('/demo')}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-xs tracking-[0.24em] uppercase text-deep font-semibold font-sans">
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
            text="Digital Wedding Invitation"
            className="hidden md:block text-[11px] tracking-[0.15em] uppercase text-deep/25 font-sans"
          />
        </div>

        {/* Right: Hero image */}
        <div className="w-full md:w-7/12 flex-1 relative overflow-hidden min-h-0">
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
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/60">Sample Invitation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
