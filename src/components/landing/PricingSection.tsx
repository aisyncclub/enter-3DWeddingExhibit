import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: '무료 체험',
    price: '₩0',
    period: '영구 무료',
    desc: '3D 갤러리 데모를 미리 체험',
    features: ['3D 갤러리 체험', '3가지 테마', '사진 4장', '사진 큐레이션', '—'],
    cta: '지금 체험',
    ctaLink: '/demo',
    highlight: false,
  },
  {
    name: '스탠다드',
    price: '₩29,000',
    period: '청첩장 1건',
    desc: '커플 청첩장 완성 + 링크 공유',
    features: ['3D 갤러리 청첩장', '3가지 테마', '사진 8장', '사진 큐레이션', '링크 공유 90일'],
    cta: '주문하기',
    ctaLink: '/demo',
    highlight: true,
  },
  {
    name: '프리미엄',
    price: '₩59,000',
    period: '청첩장 1건',
    desc: '특별한 커스텀 + 우선 제작',
    features: ['스탠다드 모두 포함', '커스텀 배경 색상', '음악 삽입', '링크 공유 1년', '우선 제작 지원'],
    cta: '문의하기',
    ctaLink: '/demo',
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section className="bg-deep-mid py-24 px-6" id="pricing">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">건당 판매</h2>
          <p className="mt-4 text-white/45 text-lg max-w-xl mx-auto">
            구독 없이, 청첩장 한 건씩. 필요할 때만 사용하세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-lg p-7 flex flex-col ${
                plan.highlight
                  ? 'border-2 border-gold/60 shadow-gold'
                  : 'border border-white/8'
              }`}
              style={{ background: plan.highlight ? 'hsl(var(--deep))' : 'hsl(var(--deep) / 0.6)' }}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-deep text-xs font-bold px-3 py-1 rounded-md">
                  추천
                </div>
              )}

              <div className="mb-6">
                <p className="text-white/50 text-sm font-medium mb-2">{plan.name}</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                </div>
                <p className="text-gold/70 text-sm">{plan.period}</p>
                <p className="text-white/35 text-sm mt-2">{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-2.5 text-sm ${f === '—' ? 'text-white/20' : 'text-white/65'}`}>
                    <Check size={15} className={f === '—' ? 'text-white/15' : 'text-gold'} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaLink}
                className={`w-full py-3 rounded-md font-semibold text-sm text-center transition-all ${
                  plan.highlight
                    ? 'bg-gold text-deep hover:shadow-gold hover:scale-[1.02]'
                    : 'border border-white/15 text-white/70 hover:bg-white/6'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
