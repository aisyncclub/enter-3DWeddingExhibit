import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MarqueeText } from '../MarqueeText';

interface ThemesSlideProps { active: boolean; }

const THEMES = [
  {
    key: 'chapel',
    label: 'Chapel',
    kr: '채플',
    desc: '따뜻한 황금빛 조명과 스테인드글라스 분위기',
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/fc8b9a72-a323-40.png',
    tag: '꽃잎 파티클',
    swatch: '#C4956A',
  },
  {
    key: 'garden',
    label: 'Garden',
    kr: '정원',
    desc: '싱그러운 초록빛 자연 속 야외 갤러리',
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/3211278c-2ddc-43.png',
    tag: '꽃잎 파티클',
    swatch: '#8AAF7A',
  },
  {
    key: 'night',
    label: 'Night Sky',
    kr: '밤하늘',
    desc: '깊은 네이비 하늘, 반짝이는 별빛 아래',
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e84c9415-3a76-4a.png',
    tag: '별 파티클',
    swatch: '#6070A8',
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
      <div className="flex items-end justify-between px-8 pt-8 pb-5 border-b border-deep/8 shrink-0">
        <div>
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-caramel mb-1">Theme Collection</p>
          <h2 className="font-display text-3xl font-black text-deep">Three Worlds</h2>
        </div>
        <p className="font-sans text-xs text-deep/35 tracking-wide">클릭해서 체험하기</p>
      </div>

      {/* Marquee */}
      <MarqueeText
        text="Chapel · Garden · Night Sky · 채플 · 정원 · 밤하늘"
        className="text-[11px] tracking-[0.2em] uppercase text-deep/15 font-sans border-b border-deep/8 py-2"
        speed="slow"
      />

      {/* Three columns */}
      <div className="flex flex-1 min-h-0">
        {THEMES.map((theme, i) => (
          <motion.button
            key={theme.key}
            onClick={() => navigate(`/demo?theme=${theme.key}`)}
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
                src={theme.image}
                alt={theme.kr}
                crossOrigin="anonymous"
                className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
              {/* Swatch dot */}
              <div
                className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-white/40"
                style={{ background: theme.swatch }}
              />
            </motion.div>

            {/* Bottom info */}
            <div className="px-5 py-5 bg-cream border-t border-deep/8">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-deep/40 mb-0.5">{theme.label}</p>
                  <h3 className="font-display font-bold text-xl text-deep">{theme.kr}</h3>
                </div>
                <span className="font-sans text-[10px] tracking-wider uppercase text-caramel/70 border border-caramel/25 px-2 py-0.5 mt-1">
                  {theme.tag}
                </span>
              </div>
              <p className="font-sans text-xs text-deep/45 leading-relaxed">{theme.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
