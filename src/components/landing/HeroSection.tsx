import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HERO_IMAGES = [
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e85d4e93-e5c7-47.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/abc7c6d8-7010-41.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/5e49acda-11ff-4f.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/a90ff767-0071-4e.png',
];

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-deep px-6 pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle gold glow — left side only */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full opacity-[0.06] blur-3xl pointer-events-none" style={{ background: 'hsl(var(--gold))' }} />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
        {/* Left: Text content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 border border-gold/30 rounded-full px-4 py-1.5 mb-8 text-gold text-sm font-medium w-fit"
          >
            <Sparkles size={14} />
            3D 웨딩 갤러리 청첩장
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            청첩장을
            <br />
            <span className="text-gradient-gold">전시회</span>로
            <br />
            만드세요
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-white/50 max-w-md mb-10 leading-relaxed"
          >
            사진 한 장이 아니라, 3D 공간 경험으로.<br />
            채플·정원·밤하늘 테마 갤러리에 추억을 걸고<br />
            링크 하나로 어디서나 전달하세요.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => navigate('/demo')}
              className="flex items-center justify-center gap-2 bg-gold text-deep font-semibold px-7 py-3.5 rounded-full shadow-gold hover:shadow-float transition-all hover:scale-[1.03] active:scale-100"
            >
              데모 체험하기
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 border border-white/15 text-white/70 font-medium px-7 py-3.5 rounded-full hover:bg-white/5 transition-all"
            >
              기능 살펴보기
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8 mt-12"
          >
            {[
              { num: '3가지', label: '갤러리 테마' },
              { num: '8장', label: '사진 수용' },
              { num: '1개', label: '링크로 공유' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-gradient-gold">{s.num}</div>
                <div className="text-white/35 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Photo collage */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="hidden lg:grid grid-cols-2 gap-3"
        >
          {HERO_IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'row-span-2' : ''}`}
              style={{ aspectRatio: i === 0 ? '3/4' : '1/1' }}
            >
              <img
                src={src}
                alt=""
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
              {/* Gold frame highlight */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
