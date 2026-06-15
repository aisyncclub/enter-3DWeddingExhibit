import { motion } from 'framer-motion';
import { Church, Leaf, Moon, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const THEMES = [
  {
    key: 'chapel',
    template: 'lumiere',
    label: '채플',
    subtitle: 'Chapel',
    icon: <Church size={28} />,
    desc: '따뜻한 황금빛 조명, 스테인드글라스 분위기. 꽃잎이 흩날리는 신성한 공간.',
    accent: 'hsl(43 74% 58%)',
    overlay: 'from-amber-950/80 via-amber-900/40 to-transparent',
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/fc8b9a72-a323-40.png',
  },
  {
    key: 'garden',
    template: 'blanc',
    label: '정원',
    subtitle: 'Garden',
    icon: <Leaf size={28} />,
    desc: '싱그러운 초록빛 자연광, 야외 정원 속 갤러리. 봄날 꽃잎이 내리는 낭만.',
    accent: 'hsl(140 50% 55%)',
    overlay: 'from-green-950/80 via-green-900/40 to-transparent',
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/3211278c-2ddc-43.png',
  },
  {
    key: 'night',
    template: 'nuit',
    label: '밤하늘',
    subtitle: 'Night Sky',
    icon: <Moon size={28} />,
    desc: '깊은 네이비 하늘, 반짝이는 별빛 아래. 달빛이 비추는 몽환적인 갤러리.',
    accent: 'hsl(220 80% 70%)',
    overlay: 'from-slate-950/85 via-slate-900/50 to-transparent',
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e84c9415-3a76-4a.png',
  },
];

export function ThemePreviewSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-deep-mid py-24 px-6" id="themes">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">Themes</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">분위기를 고르세요</h2>
          <p className="mt-4 text-white/45 text-lg max-w-xl mx-auto">
            세 가지 테마 중 커플만의 감성에 어울리는 공간을 선택하세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {THEMES.map((t, i) => (
            <motion.button
              key={t.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              onClick={() => navigate(`/demo?template=${t.template}`)}
              className="group text-left rounded-lg overflow-hidden hover:scale-[1.01] hover:shadow-float transition-all duration-300 relative"
              style={{ minHeight: '340px' }}
            >
              {/* Background photo */}
              <img
                src={t.image}
                alt={t.label}
                crossOrigin="anonymous"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${t.overlay}`} />
              {/* Bottom content */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/18 bg-white/8" style={{ color: t.accent }}>
                  {t.icon}
                </div>
                <div className="text-white/50 text-xs font-medium tracking-widest uppercase mb-0.5">{t.subtitle}</div>
                <h3 className="text-white text-xl font-bold mb-2">{t.label}</h3>
                <p className="text-white/60 text-xs leading-relaxed mb-4">{t.desc}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5" style={{ color: t.accent }}>
                  이 테마로 체험
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
