import { motion } from 'framer-motion';
import { Box, Images, Palette, Share2, Upload, Smartphone } from 'lucide-react';

const FEATURES = [
  {
    icon: <Box size={28} />,
    title: '3D 갤러리',
    desc: '원형 전시 공간에 사진을 배치. 드래그로 360° 둘러보고, 클릭으로 확대 감상.',
    color: 'hsl(var(--gold))',
    bg: 'hsl(var(--gold) / 0.08)',
  },
  {
    icon: <Palette size={28} />,
    title: '3가지 테마',
    desc: '채플의 따뜻함, 정원의 싱그러움, 밤하늘의 로맨틱함. 커플 분위기에 맞게.',
    color: 'hsl(var(--dusty-rose))',
    bg: 'hsl(var(--dusty-rose) / 0.08)',
  },
  {
    icon: <Images size={28} />,
    title: '사진 큐레이션',
    desc: '대표 컷, 포트레이트, 디테일 컷을 전시 흐름에 맞게 정돈.',
    color: 'hsl(165 26% 48%)',
    bg: 'hsl(165 26% 48% / 0.08)',
  },
  {
    icon: <Upload size={28} />,
    title: '사진 업로드',
    desc: '최대 8장. 드래그 업로드로 즉시 갤러리에 반영. 직관적인 편집 경험.',
    color: 'hsl(220 70% 65%)',
    bg: 'hsl(220 70% 65% / 0.08)',
  },
  {
    icon: <Smartphone size={28} />,
    title: '모바일 청첩장',
    desc: '3D 갤러리가 내장된 스크롤 청첩장. 날짜·장소·메시지를 한 페이지에.',
    color: 'hsl(var(--gold))',
    bg: 'hsl(var(--gold) / 0.08)',
  },
  {
    icon: <Share2 size={28} />,
    title: '링크 공유',
    desc: '링크 하나로 PC·모바일 어디서나 전달. 누구나 바로 체험 가능.',
    color: 'hsl(var(--dusty-rose))',
    bg: 'hsl(var(--dusty-rose) / 0.08)',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-deep py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">기존 청첩장과 다릅니다</h2>
          <p className="mt-4 text-white/45 text-lg max-w-xl mx-auto">
            스크롤 카드 형식을 벗어나, 공간 경험으로 전달하는 새로운 청첩장
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg p-6 border border-white/8 hover:border-white/18 transition-all group"
              style={{ background: 'hsl(var(--deep-mid))' }}
            >
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                style={{ color: f.color, background: f.bg }}
              >
                {f.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
