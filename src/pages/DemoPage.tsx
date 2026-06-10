import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, Heart, Share2, ChevronDown } from 'lucide-react';
import { GalleryCanvas } from '@/components/gallery/GalleryCanvas';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { PhotoUploader } from '@/components/PhotoUploader';
import { PhotoFocusModal } from '@/components/PhotoFocusModal';
import type { ThemeKey } from '@/components/gallery/backgrounds';

const EMPTY_PHOTOS: (string | null)[] = Array(8).fill(null);

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&q=80',
  null, null, null, null,
];

export default function DemoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTheme = (searchParams.get('theme') as ThemeKey) || 'chapel';

  const [theme, setTheme] = useState<ThemeKey>(initialTheme);
  const [photos, setPhotos] = useState<(string | null)[]>(SAMPLE_PHOTOS);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: '민준 ♥ 서아의 결혼식', url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-foreground">

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 bg-ivory/80 backdrop-blur-md border-b border-border/40">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          서비스 소개
        </button>
        <span className="text-xs font-semibold text-gold tracking-widest uppercase">Demo</span>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          <Share2 size={15} />
          공유
        </button>
      </nav>

      {/* ── Cover Section ── */}
      <section className="relative pt-14 min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blush-light/20 via-ivory to-ivory" />

        {/* Decorative line ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mb-8 flex items-center gap-4"
        >
          <div className="h-px w-16 bg-gold/40" />
          <Heart size={14} className="text-gold" fill="currentColor" />
          <div className="h-px w-16 bg-gold/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-4"
        >
          Wedding Invitation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-3"
        >
          <span className="text-foreground">민준</span>
          <span className="mx-4 text-gold text-3xl md:text-5xl font-light">&amp;</span>
          <span className="text-foreground">서아</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-base mt-4 mb-8 leading-relaxed"
        >
          Kim Min-jun &amp; Lee Seo-ah
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-2 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gold" />
            <span>2026년 10월 17일 토요일</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gold" />
            <span>오후 1시 30분</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gold" />
            <span>더채플 at 청담 웨딩홀</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 flex flex-col items-center gap-1 text-muted-foreground/50 text-xs animate-bounce"
        >
          <ChevronDown size={18} />
          갤러리 보기
        </motion.div>
      </section>

      {/* ── Message Section ── */}
      <section className="py-16 px-6 max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <Heart size={12} className="text-gold" fill="currentColor" />
          <div className="h-px flex-1 bg-border" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-foreground/75 leading-[2] text-sm md:text-base"
        >
          서로를 알아가며 쌓아온 추억들,<br />
          앞으로 함께 만들어갈 새로운 이야기들.<br />
          두 사람이 하나가 되는 소중한 날을<br />
          함께 해주셔서 감사합니다.
        </motion.p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px flex-1 bg-border" />
          <Heart size={12} className="text-gold" fill="currentColor" />
          <div className="h-px flex-1 bg-border" />
        </div>
      </section>

      {/* ── 3D Gallery Section ── */}
      <section className="w-full">
        <div className="text-center mb-6 px-6">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">Gallery</p>
          <h2 className="text-2xl font-bold text-foreground">우리의 이야기</h2>
          <p className="text-muted-foreground text-xs mt-1">드래그로 둘러보기 · 사진 클릭 확대</p>
        </div>

        {/* Gallery Container */}
        <div className="relative" style={{ height: 'min(70vh, 560px)' }}>
          <GalleryCanvas
            theme={theme}
            photos={photos}
            onPhotoClick={setFocusIndex}
          />

          {/* Theme switcher overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <ThemeSwitcher current={theme} onChange={setTheme} />
          </div>

          {/* Upload button overlay */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md border border-white/20 text-white rounded-full px-3 py-2 text-xs font-medium hover:bg-black/50 transition-all"
            >
              + 사진
            </button>
          </div>
        </div>

        {/* Upload panel */}
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 p-4 bg-card rounded-2xl border border-border shadow-soft"
          >
            <p className="text-sm font-semibold text-foreground mb-3">사진 관리</p>
            <PhotoUploader photos={photos} onPhotosChange={setPhotos} />
          </motion.div>
        )}
      </section>

      {/* ── Venue Section ── */}
      <section className="py-16 px-6 max-w-xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">Venue</p>
          <h2 className="text-2xl font-bold text-foreground">오시는 길</h2>
        </div>

        {/* Map placeholder */}
        <div className="w-full h-48 rounded-2xl bg-muted flex items-center justify-center mb-6 overflow-hidden">
          <div className="text-center text-muted-foreground/60">
            <MapPin size={32} className="mx-auto mb-2 text-gold/50" />
            <p className="text-sm font-medium">더채플 at 청담</p>
            <p className="text-xs">서울시 강남구 청담동 123-45</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { label: '일시', value: '2026년 10월 17일 토요일 오후 1시 30분' },
            { label: '장소', value: '더채플 at 청담 웨딩홀' },
            { label: '주소', value: '서울시 강남구 청담동 123-45' },
            { label: '주차', value: '지하 주차장 이용 가능 (3시간 무료)' },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 py-3 border-b border-border/50 last:border-0">
              <span className="text-xs text-gold font-semibold w-12 shrink-0 pt-0.5">{item.label}</span>
              <span className="text-sm text-foreground/75 leading-relaxed">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Parents Section ── */}
      <section className="py-12 px-6 max-w-xl mx-auto">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-card text-center">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">혼주</p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gold text-xs font-medium mb-2">신랑측</p>
              <p className="text-sm text-foreground/80">김○○ · 이○○의 장남</p>
              <p className="text-sm font-semibold text-foreground mt-1">김민준</p>
            </div>
            <div>
              <p className="text-blush text-xs font-medium mb-2">신부측</p>
              <p className="text-sm text-foreground/80">이○○ · 박○○의 장녀</p>
              <p className="text-sm font-semibold text-foreground mt-1">이서아</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RSVP / Share Section ── */}
      <section className="py-12 px-6 max-w-xl mx-auto text-center">
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          참석 여부를 알려주세요.<br />
          소중한 자리에 함께해 주시길 기다리겠습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="flex-1 py-3.5 bg-gold text-deep rounded-xl font-semibold text-sm shadow-gold hover:shadow-float transition-all hover:scale-[1.02]">
            참석 의사 전달
          </button>
          <button
            onClick={handleShare}
            className="flex-1 py-3.5 border border-border rounded-xl font-medium text-sm text-foreground/70 hover:bg-muted transition-all flex items-center justify-center gap-2"
          >
            <Share2 size={15} />
            청첩장 공유
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 text-center border-t border-border/40">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gold/30" />
          <Heart size={12} className="text-gold/60" fill="currentColor" />
          <div className="h-px w-12 bg-gold/30" />
        </div>
        <p className="text-xs text-muted-foreground">2026. 10. 17</p>
        <p className="text-xs text-muted-foreground/40 mt-2">
          Powered by <span className="text-gold/60">Invitique</span>
        </p>
      </footer>

      {/* ── Photo Focus Modal ── */}
      <PhotoFocusModal
        photos={photos}
        currentIndex={focusIndex}
        onClose={() => setFocusIndex(null)}
        onNavigate={setFocusIndex}
      />
    </div>
  );
}
