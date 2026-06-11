import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MarqueeText } from '../MarqueeText';

interface ThemesSlideProps { active: boolean; }

const TEMPLATES = [
  {
    key: 'blanc',
    label: 'Blanc',
    kr: '블랑',
    desc: '순백의 미니멀 감성. 여백으로 말하는 절제된 아름다움.',
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/fc8b9a72-a323-40.png',
    swatch: '#EBEBEB',
    swatchLabel: '순백 미니멀',
    textColor: '#2B1D15',
  },
  {
    key: 'lumiere',
    label: 'Lumière',
    kr: '뤼미에르',
    desc: '따뜻한 크림 웜톤. 빛처럼 포근하고 우아한 분위기.',
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/3211278c-2ddc-43.png',
    swatch: '#C4956A',
    swatchLabel: '크림 웜톤',
    textColor: '#2B1D15',
  },
  {
    key: 'nuit',
    label: 'Nuit',
    kr: '뉘이',
    desc: '다크 엘레강스. 깊고 고요한 밤처럼 차분한 럭셔리.',
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e84c9415-3a76-4a.png',
    swatch: '#C9A84C',
    swatchLabel: '다크 엘레강스',
    textColor: '#F5EFE6',
  },
];

export function ThemesSlide({ active }: ThemesSlideProps) {
  const navigate = useNavigate();
  const imgReveal = (delay: number) => ({
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay } },
  });

  return (
    <div className="w-screen h-screen bg-cream flex flex-col overflow-hidden select-none">
      {/* Top label */}
      <div className="flex items-end justify-between px-8 pt-14 pb-5 border-b border-deep/8 shrink-0">
        <div>
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-caramel mb-1">Template Collection</p>
          <h2 className="font-display text-3xl font-black text-deep">Three Styles</h2>
        </div>
        <p className="font-sans text-xs text-deep/35 tracking-wide">클릭해서 미리보기</p>
      </div>

      {/* Marquee */}
      <MarqueeText
        text="Blanc · Lumière · Nuit · 블랑 · 뤼미에르 · 뉘이"
        className="text-[11px] tracking-[0.2em] uppercase text-deep/15 font-sans border-b border-deep/8 py-2"
        speed="slow"
      />

      {/* Three columns */}
      <div className="flex flex-1 min-h-0">
        {TEMPLATES.map((tpl, i) => (
          <motion.button
            key={tpl.key}
            onClick={() => navigate(`/demo?template=${tpl.key}`)}
            className="flex-1 flex flex-col overflow-hidden border-r border-deep/8 last:border-r-0 group text-left relative"
          >
            {/* Photo */}
            <motion.div
              variants={imgReveal(i * 0.18)}
              initial="hidden"
              animate={active ? 'visible' : 'hidden'}
              className="flex-1 overflow-hidden relative"
            >
              <img
                src={tpl.image}
                alt={tpl.kr}
                crossOrigin="anonymous"
                className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
              {/* Swatch */}
              <div
                className="absolute top-4 right-4 w-5 h-5 border-2 border-white/40"
                style={{ background: tpl.swatch }}
              />
            </motion.div>

            {/* Bottom info */}
            <div className="px-5 py-5 bg-cream border-t border-deep/8">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-deep/40 mb-0.5">{tpl.label}</p>
                  <h3 className="font-display font-bold text-xl text-deep">{tpl.kr}</h3>
                </div>
                <span className="font-sans text-[10px] tracking-wider uppercase text-caramel/70 border border-caramel/25 px-2 py-0.5 mt-1">
                  {tpl.swatchLabel}
                </span>
              </div>
              <p className="font-sans text-xs text-deep/45 leading-relaxed">{tpl.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
