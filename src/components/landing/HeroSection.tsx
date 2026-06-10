import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-deep px-6 text-center">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'hsl(var(--gold))' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: 'hsl(var(--blush))' }} />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 border border-gold/30 rounded-full px-4 py-1.5 mb-8 text-gold text-sm font-medium"
      >
        <Sparkles size={14} />
        3D 웨딩 갤러리 청첩장 서비스
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-4xl"
      >
        청첩장을
        <br />
        <span className="text-gradient-gold">전시회</span>로 만드세요
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-white/55 max-w-xl mb-10 leading-relaxed"
      >
        사진 한 장이 아니라, 3D 공간 경험으로.<br />
        채플·정원·밤하늘 테마 갤러리에 추억을 걸고<br />
        링크 하나로 모바일·PC 어디서나 전달하세요.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <button
          onClick={() => navigate('/demo')}
          className="flex items-center justify-center gap-2 bg-gold text-deep font-semibold px-8 py-3.5 rounded-full shadow-gold hover:shadow-float transition-all hover:scale-[1.03] active:scale-100"
        >
          데모 체험하기
          <ArrowRight size={18} />
        </button>
        <button
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center justify-center gap-2 border border-white/20 text-white/80 font-medium px-8 py-3.5 rounded-full hover:bg-white/5 transition-all"
        >
          기능 살펴보기
        </button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-white/30 text-xs"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20" />
        scroll
      </motion.div>
    </section>
  );
}
