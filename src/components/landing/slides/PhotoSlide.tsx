import { motion } from 'framer-motion';
import { MarqueeText } from '../MarqueeText';

interface PhotoSlideProps { active: boolean; }

const PHOTOS = [
  { src: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/5e49acda-11ff-4f.png', span: 'row-span-2' },
  { src: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/a90ff767-0071-4e.png', span: '' },
  { src: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/15be2420-ffdc-44.png', span: '' },
];

export function PhotoSlide({ active }: PhotoSlideProps) {
  const imgReveal = (delay: number) => ({
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay } },
  });
  const maskReveal = (delay: number) => ({
    hidden: { y: '110%' },
    visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay } },
  });

  return (
    <div className="w-screen h-screen bg-cream flex flex-col overflow-hidden select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 pt-14 pb-4 border-b border-deep/8 shrink-0">
        <div className="overflow-hidden">
          <motion.div
            variants={maskReveal(0)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
          >
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-caramel">Gallery</p>
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            variants={maskReveal(0.1)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="font-display font-black text-2xl text-deep"
          >
            Sample Photos
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.p
            variants={maskReveal(0.15)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="font-sans text-xs text-deep/35"
          >
            3D Gallery Preview
          </motion.p>
        </div>
      </div>

      {/* Photo grid — asymmetric */}
      <div className="flex flex-1 min-h-0 gap-0">
        {/* Left: Tall photo */}
        <motion.div
          variants={imgReveal(0.1)}
          initial="hidden"
          animate={active ? 'visible' : 'hidden'}
          className="w-[40%] overflow-hidden border-r border-deep/8"
        >
          <img
            src={PHOTOS[0].src}
            alt=""
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105"
          />
        </motion.div>

        {/* Right: 2 rows */}
        <div className="flex-1 flex flex-col">
          <motion.div
            variants={imgReveal(0.25)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="flex-1 overflow-hidden border-b border-deep/8"
          >
            <img
              src={PHOTOS[1].src}
              alt=""
              crossOrigin="anonymous"
              className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105"
            />
          </motion.div>
          <motion.div
            variants={imgReveal(0.4)}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            className="flex-1 overflow-hidden"
          >
            <img
              src={PHOTOS[2].src}
              alt=""
              crossOrigin="anonymous"
              className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105"
            />
          </motion.div>
        </div>

        {/* Far right: text column */}
        <div className="w-16 flex flex-col items-center justify-center border-l border-deep/8 gap-4">
          <span
            className="font-display italic font-bold text-deep/12 text-xl tracking-widest"
            style={{ writingMode: 'vertical-rl' }}
          >
            Invitation
          </span>
        </div>
      </div>

      {/* Marquee bottom */}
      <MarqueeText
        text="나만의 사진으로 완성하는 청첩장 · Upload Your Photos · Customizable"
        className="text-[11px] tracking-[0.15em] uppercase text-deep/20 font-sans border-t border-deep/8 py-2"
        speed="slow"
      />
    </div>
  );
}
