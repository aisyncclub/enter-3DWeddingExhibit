import { motion } from 'framer-motion';

interface ExperienceSlideProps { active: boolean; }

const STEPS = [
  { num: '01', title: '템플릿 선택', desc: 'Blanc · Lumière · Nuit 중 예식 분위기에 맞는 스타일을 고릅니다.' },
  { num: '02', title: '정보와 사진 입력', desc: '이름, 날짜, 장소, 스토리, 사진을 넣으면 초대장이 구성됩니다.' },
  { num: '03', title: 'RSVP와 링크 공유', desc: '참석 응답을 받고, 완성된 링크를 카카오톡·문자로 전달합니다.' },
];

const FEATURES = [
  { label: '모바일 초대장', desc: '하객이 바로 확인' },
  { label: '응답 관리', desc: '참석·식사·연락처 수집' },
  { label: '스타일 유지', desc: '사진·문구·테마 일관성' },
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
    <div className="w-screen h-screen bg-cream flex flex-col md:flex-row overflow-hidden select-none pt-14 md:pt-0">
      {/* Left: Steps */}
      <div className="w-full md:w-[55%] flex flex-col justify-center px-7 md:px-20 py-9 md:py-0 border-b md:border-b-0 md:border-r border-deep/8">
        <div className="overflow-hidden mb-2">
          <motion.p
            variants={maskReveal(0)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="font-sans text-xs tracking-[0.28em] uppercase text-caramel"
          >
            How It Works
          </motion.p>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h2
            variants={maskReveal(0.1)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="font-display font-black text-[clamp(2.2rem,11vw,4.5rem)] md:text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] text-deep"
          >
            제작 흐름
          </motion.h2>
        </div>

        <div className="glass-panel-quiet">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              variants={maskReveal(0.2 + i * 0.15)}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className="flex gap-5 md:gap-8 px-4 py-4 md:py-5 border-b border-deep/8 last:border-0"
            >
              <span className="font-display font-black text-[clamp(2rem,3.5vw,3rem)] text-deep/15 w-14 shrink-0 leading-none pt-1">
                {step.num}
              </span>
              <div>
                <h3 className="font-sans font-semibold text-deep text-base mb-1.5 tracking-tight">{step.title}</h3>
                <p className="font-sans text-base text-deep/58 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features row */}
        <motion.div
          variants={maskReveal(0.6)}
          initial="hidden"
          animate={active ? 'visible' : 'hidden'}
          className="glass-panel mt-6 grid grid-cols-3 gap-0"
        >
          {FEATURES.map((f, i) => (
            <div key={f.label} className={`px-3 py-4 md:px-5 ${i > 0 ? 'border-l border-deep/8' : ''}`}>
              <p className="font-sans text-xs tracking-[0.12em] uppercase text-caramel">{f.label}</p>
              <p className="font-sans text-sm text-deep/52 mt-1">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right: photo + label */}
      <div className="flex-1 hidden md:flex flex-col">
        <div className="flex items-center justify-center py-6 border-b border-deep/8">
          <span
            className="font-display italic font-bold text-[clamp(1.2rem,2vw,1.8rem)] text-deep/15 tracking-widest"
            style={{ writingMode: 'vertical-rl' }}
          >
            Digital Invitation
          </span>
        </div>
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
