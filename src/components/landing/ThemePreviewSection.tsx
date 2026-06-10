import { motion } from 'framer-motion';
import { Church, Leaf, Moon, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const THEMES = [
  {
    key: 'chapel',
    label: '채플',
    subtitle: 'Chapel',
    icon: <Church size={32} />,
    desc: '따뜻한 황금빛 조명, 스테인드글라스 분위기. 꽃잎이 흩날리는 신성한 공간.',
    gradient: 'linear-gradient(135deg, hsl(38 70% 20%), hsl(43 60% 35%))',
    accent: 'hsl(43 74% 58%)',
    particle: '🌸',
  },
  {
    key: 'garden',
    label: '정원',
    subtitle: 'Garden',
    icon: <Leaf size={32} />,
    desc: '싱그러운 초록빛 자연광, 야외 정원 속 갤러리. 봄날 꽃잎이 내리는 낭만.',
    gradient: 'linear-gradient(135deg, hsl(140 30% 15%), hsl(140 25% 28%))',
    accent: 'hsl(140 50% 55%)',
    particle: '🌿',
  },
  {
    key: 'night',
    label: '밤하늘',
    subtitle: 'Night Sky',
    icon: <Moon size={32} />,
    desc: '깊은 네이비 하늘, 반짝이는 별빛 아래. 달빛이 비추는 몽환적인 갤러리.',
    gradient: 'linear-gradient(135deg, hsl(228 50% 8%), hsl(228 40% 18%))',
    accent: 'hsl(220 80% 70%)',
    particle: '✦',
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {THEMES.map((t, i) => (
            <motion.button
              key={t.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              onClick={() => navigate(`/demo?theme=${t.key}`)}
              className="group text-left rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
              style={{ background: t.gradient }}
            >
              {/* Card content */}
              <div className="p-8 h-full min-h-[280px] flex flex-col">
                {/* Particle decoration */}
                <div className="text-2xl mb-auto opacity-40">{t.particle} {t.particle} {t.particle}</div>

                <div className="mt-6">
                  <div className="mb-4" style={{ color: t.accent }}>
                    {t.icon}
                  </div>
                  <div className="text-white/40 text-xs font-medium tracking-widest uppercase mb-1">{t.subtitle}</div>
                  <h3 className="text-white text-2xl font-bold mb-3">{t.label}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{t.desc}</p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3" style={{ color: t.accent }}>
                  이 테마로 체험
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
