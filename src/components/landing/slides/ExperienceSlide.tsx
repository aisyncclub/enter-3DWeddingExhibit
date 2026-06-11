import { motion } from 'framer-motion';

interface ExperienceSlideProps { active: boolean; }

const STEPS = [
  { num: '01', title: '사진 업로드', desc: '커플 사진 최대 8장을 업로드. 드래그 앤 드롭으로 간편하게.' },
  { num: '02', title: '테마 선택', desc: '채플·정원·밤하늘 중 분위기에 맞는 공간을 선택하세요.' },
  { num: '03', title: '링크 공유', desc: '생성된 링크를 카카오톡·문자·SNS로. 받는 분이 바로 3D 체험.' },
];

export function ExperienceSlide({ active }: ExperienceSlideProps) {
  const maskReveal = (delay: number) => ({
    hidden: { y: '110%' },
    visible: { y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay } },
  });
  const imgReveal = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
  };

  return (
    <div className="w-screen h-screen bg-cream flex overflow-hidden select-none">
      {/* Left: Steps */}
      <div className="w-[55%] flex flex-col justify-center px-12 md:px-20 border-r border-deep/8">
        <div className="overflow-hidden mb-2">
          <motion.p
            variants={maskReveal(0)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="font-sans text-[11px] tracking-[0.3em] uppercase text-caramel"
          >
            How It Works
          </motion.p>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h2
            variants={maskReveal(0.1)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] text-deep"
          >
            The Experience
          </motion.h2>
        </div>

        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              variants={maskReveal(0.2 + i * 0.15)}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className="flex gap-8 py-7 border-b border-deep/8 last:border-0"
            >
              <span className="font-display font-black text-[clamp(2rem,3.5vw,3rem)] text-deep/15 w-14 shrink-0 leading-none pt-1">
                {step.num}
              </span>
              <div>
                <h3 className="font-sans font-semibold text-deep text-base mb-1.5 tracking-tight">{step.title}</h3>
                <p className="font-sans text-sm text-deep/50 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: "THE EXPERIENCE" vertical text + photo */}
      <div className="flex-1 flex flex-col">
        {/* Vertical label */}
        <div className="flex items-center justify-center py-6 border-b border-deep/8">
          <span
            className="font-display italic font-bold text-[clamp(1.2rem,2vw,1.8rem)] text-deep/15 tracking-widest"
            style={{ writingMode: 'vertical-rl' }}
          >
            3D Gallery
          </span>
        </div>

        {/* Photo */}
        <motion.div
          variants={imgReveal}
          initial="hidden"
          animate={active ? 'visible' : 'hidden'}
          className="flex-1 overflow-hidden"
        >
          <img
            src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/eb20ccc0-23d1-49.png"
            alt=""
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105"
          />
        </motion.div>
      </div>
    </div>
  );
}
