import { motion } from 'framer-motion';
import { Upload, Sliders, Share2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: <Upload size={24} />,
    title: '사진 업로드',
    desc: '커플 사진 최대 8장을 업로드하세요. 드래그 앤 드롭으로 간편하게.',
    color: 'hsl(var(--gold))',
  },
  {
    num: '02',
    icon: <Sliders size={24} />,
    title: '테마 & 정보 설정',
    desc: '채플·정원·밤하늘 중 테마를 선택하고, 이름·날짜·장소를 입력하세요.',
    color: 'hsl(var(--blush))',
  },
  {
    num: '03',
    icon: <Share2 size={24} />,
    title: '링크로 공유',
    desc: '생성된 링크를 카카오톡, 문자, SNS로 전달. 받는 분이 바로 3D 체험.',
    color: 'hsl(140 50% 55%)',
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-deep py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">3단계로 완성</h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-[calc(16.7%+16px)] right-[calc(16.7%+16px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}
                >
                  {s.icon}
                  <span
                    className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: s.color, color: 'hsl(var(--deep))' }}
                  >
                    {s.num.replace('0', '')}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
