import { motion } from 'framer-motion';

interface ConceptSlideProps { active: boolean; }

export function ConceptSlide({ active }: ConceptSlideProps) {
  const maskReveal = {
    hidden: { y: '110%' },
    visible: (i: number) => ({
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
    }),
  };
  const imgReveal = (delay: number) => ({
    hidden: { clipPath: 'inset(0 0 100% 0)' },
    visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay } },
  });

  return (
    <div className="w-screen h-screen bg-cream flex flex-col md:flex-row overflow-hidden select-none">
      {/* Left: Vertical label */}
      <div className="hidden md:flex w-12 shrink-0 items-center justify-center border-r border-deep/8">
        <span
          className="font-sans text-[10px] tracking-[0.4em] uppercase text-deep/30 whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Concept 01 — Digital Invitation
        </span>
      </div>

      {/* Center: Headline */}
      <div className="flex-1 flex flex-col justify-center px-7 md:px-16 pt-20 md:pt-0 pb-8 md:pb-0 md:border-r border-deep/8">
        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-caramel mb-8">The Concept</p>

        {['Beyond the', 'Card'].map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h2
              custom={i}
              variants={maskReveal}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className={`font-display font-black text-[clamp(2.7rem,14vw,5.5rem)] md:text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.95] text-deep ${i === 1 ? 'italic text-caramel' : ''}`}
            >
              {line}
            </motion.h2>
          </div>
        ))}

        <div className="mt-10 overflow-hidden">
          <motion.p
            custom={2.5}
            variants={maskReveal}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="text-deep/55 text-sm leading-[1.9] max-w-sm font-sans"
          >
            청첩장은 단순한 안내문이 아닙니다.<br />
            두 사람의 이야기를 담은 공간입니다.<br />
            3가지 아름다운 템플릿 중 하나를 골라<br />
            나만의 디지털 청첩장을 완성하세요.
          </motion.p>
        </div>

        <motion.div
          custom={3.5}
          variants={maskReveal}
          initial="hidden"
          animate={active ? 'visible' : 'hidden'}
          className="mt-10"
        >
          <div className="grid grid-cols-3 gap-4 md:flex md:items-center md:gap-6">
            {[
              { num: '3', label: '가지 템플릿' },
              { num: '5', label: '분 제작' },
              { num: '1', label: '개 링크' },
            ].map((s) => (
              <div key={s.label} className="border-t border-deep/15 pt-4 md:pr-6">
                <div className="font-display text-3xl font-black text-deep">{s.num}</div>
                <div className="font-sans text-[11px] tracking-[0.08em] md:tracking-[0.15em] uppercase text-deep/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right: Two photos */}
      <div className="hidden md:flex w-[38%] shrink-0 flex-col gap-0">
        <motion.div
          variants={imgReveal(0.2)}
          initial="hidden"
          animate={active ? 'visible' : 'hidden'}
          className="flex-1 overflow-hidden"
        >
          <img
            src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/abc7c6d8-7010-41.png"
            alt=""
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105"
          />
        </motion.div>
        <motion.div
          variants={imgReveal(0.45)}
          initial="hidden"
          animate={active ? 'visible' : 'hidden'}
          className="flex-1 overflow-hidden"
        >
          <img
            src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e85d4e93-e5c7-47.png"
            alt=""
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105"
          />
        </motion.div>
      </div>
    </div>
  );
}
