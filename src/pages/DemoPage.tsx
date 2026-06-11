import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, Heart, Share2, ChevronDown } from 'lucide-react';
import { GalleryCanvas } from '@/components/gallery/GalleryCanvas';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { PhotoUploader } from '@/components/PhotoUploader';
import { PhotoFocusModal } from '@/components/PhotoFocusModal';
import { FilmGrain } from '@/components/landing/FilmGrain';
import type { ThemeKey } from '@/components/gallery/backgrounds';

const SAMPLE_PHOTOS: (string | null)[] = [
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/35cebb25-7ff8-4b.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e85d4e93-e5c7-47.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/abc7c6d8-7010-41.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/3211278c-2ddc-43.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e84c9415-3a76-4a.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/5e49acda-11ff-4f.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/a90ff767-0071-4e.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/15be2420-ffdc-44.png',
];

export default function DemoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTheme = (searchParams.get('theme') as ThemeKey) || 'chapel';

  const [theme, setTheme] = useState<ThemeKey>(initialTheme);
  const [photos, setPhotos] = useState<(string | null)[]>(SAMPLE_PHOTOS);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => { setTheme(initialTheme); }, [initialTheme]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: '민준 & 서아의 결혼식', url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <FilmGrain />

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 py-3 bg-cream/85 backdrop-blur-md border-b border-deep/8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-deep/45 text-sm hover:text-deep transition-colors"
        >
          <ArrowLeft size={15} />
          <span className="font-sans text-[11px] tracking-[0.15em] uppercase">소개</span>
        </button>
        <span className="font-display italic text-deep/50 text-sm">Invitique</span>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-deep/45 text-sm hover:text-deep transition-colors"
        >
          <Share2 size={15} />
          <span className="font-sans text-[11px] tracking-[0.15em] uppercase">공유</span>
        </button>
      </nav>

      {/* ── Cover Section ── */}
      <section className="relative pt-14 min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/35cebb25-7ff8-4b.png"
            alt=""
            crossOrigin="anonymous"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-cream" />
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 flex items-center gap-4"
        >
          <div className="h-px w-14 bg-white/35" />
          <Heart size={12} className="text-white/60" fill="currentColor" />
          <div className="h-px w-14 bg-white/35" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative font-sans text-[11px] tracking-[0.35em] uppercase text-white/55 mb-5"
        >
          Wedding Invitation
        </motion.p>

        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative font-display font-black text-[clamp(3rem,10vw,6rem)] leading-[0.92] text-white drop-shadow-lg"
          >
            민준 <span className="italic font-normal text-white/50 text-[0.6em]">&amp;</span> 서아
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative font-sans text-white/45 text-xs tracking-[0.2em] mt-3 mb-7"
        >
          Kim Min-jun &amp; Lee Seo-ah
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative flex flex-col items-center gap-2 text-sm text-white/60 font-sans"
        >
          {[
            { Icon: Calendar, text: '2026년 10월 17일 토요일' },
            { Icon: Clock, text: '오후 1시 30분' },
            { Icon: MapPin, text: '더채플 at 청담 웨딩홀' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={13} className="text-caramel/70" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-8 flex flex-col items-center gap-1 text-white/35 text-[11px] font-sans tracking-widest uppercase animate-bounce z-10"
        >
          <ChevronDown size={16} />
          Gallery
        </motion.div>
      </section>

      {/* ── Message Section ── */}
      <section className="py-16 px-6 max-w-lg mx-auto text-center">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-deep/10" />
          <Heart size={11} className="text-caramel/50" fill="currentColor" />
          <div className="h-px flex-1 bg-deep/10" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-deep/55 leading-[2.1] text-sm"
        >
          서로를 알아가며 쌓아온 추억들,<br />
          앞으로 함께 만들어갈 새로운 이야기들.<br />
          두 사람이 하나가 되는 소중한 날을<br />
          함께 해주셔서 감사합니다.
        </motion.p>
        <div className="flex items-center gap-4 mt-8">
          <div className="h-px flex-1 bg-deep/10" />
          <Heart size={11} className="text-caramel/50" fill="currentColor" />
          <div className="h-px flex-1 bg-deep/10" />
        </div>
      </section>

      {/* ── 3D Gallery Section ── */}
      <section className="w-full">
        <div className="text-center mb-5 px-6">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-caramel mb-1">Gallery</p>
          <h2 className="font-display font-bold text-2xl text-deep">우리의 이야기</h2>
          <p className="font-sans text-deep/35 text-xs mt-1">드래그로 둘러보기 · 사진 클릭 확대</p>
        </div>

        <div className="relative" style={{ height: 'min(70vh, 560px)' }}>
          <GalleryCanvas theme={theme} photos={photos} onPhotoClick={setFocusIndex} />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <ThemeSwitcher current={theme} onChange={setTheme} />
          </div>
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md border border-white/20 text-white rounded-none px-3 py-2 text-[11px] font-sans tracking-wider hover:bg-black/50 transition-all"
            >
              + 사진
            </button>
          </div>
        </div>

        {showUpload && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 p-5 bg-card border border-deep/10 shadow-editorial"
          >
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-deep/40 mb-3">사진 관리</p>
            <PhotoUploader photos={photos} onPhotosChange={setPhotos} />
          </motion.div>
        )}
      </section>

      {/* ── Venue Section ── */}
      <section className="py-16 px-6 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-caramel mb-1">Venue</p>
          <h2 className="font-display font-bold text-2xl text-deep">오시는 길</h2>
        </div>

        <div className="w-full h-44 bg-muted flex items-center justify-center mb-6">
          <div className="text-center text-deep/35">
            <MapPin size={28} className="mx-auto mb-2 text-caramel/40" />
            <p className="font-sans text-sm font-medium text-deep/55">더채플 at 청담</p>
            <p className="font-sans text-xs mt-0.5">서울시 강남구 청담동 123-45</p>
          </div>
        </div>

        <div className="grid grid-cols-1">
          {[
            { label: '일시', value: '2026년 10월 17일 토요일 오후 1시 30분' },
            { label: '장소', value: '더채플 at 청담 웨딩홀' },
            { label: '주소', value: '서울시 강남구 청담동 123-45' },
            { label: '주차', value: '지하 주차장 이용 가능 (3시간 무료)' },
          ].map((item) => (
            <div key={item.label} className="flex gap-5 py-3.5 border-b border-deep/8 last:border-0">
              <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-caramel w-10 shrink-0 pt-0.5">{item.label}</span>
              <span className="font-sans text-sm text-deep/60 leading-relaxed">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Parents Section ── */}
      <section className="py-10 px-6 max-w-lg mx-auto">
        <div className="p-6 bg-card border border-deep/8 shadow-editorial text-center">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-deep/30 mb-5">혼주</p>
          <div className="grid grid-cols-2 gap-6">
            <div className="border-r border-deep/8">
              <p className="font-sans text-[11px] tracking-wider uppercase text-caramel mb-2">신랑측</p>
              <p className="font-sans text-sm text-deep/50">김○○ · 이○○의 장남</p>
              <p className="font-display font-semibold text-deep mt-1">김민준</p>
            </div>
            <div>
              <p className="font-sans text-[11px] tracking-wider uppercase text-brick mb-2">신부측</p>
              <p className="font-sans text-sm text-deep/50">이○○ · 박○○의 장녀</p>
              <p className="font-display font-semibold text-deep mt-1">이서아</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RSVP Section ── */}
      <section className="py-12 px-6 max-w-lg mx-auto text-center">
        <p className="font-sans text-deep/45 text-sm mb-7 leading-relaxed">
          참석 여부를 알려주세요.<br />
          소중한 자리에 함께해 주시길 기다리겠습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="flex-1 py-3.5 bg-deep text-cream font-sans font-semibold text-sm tracking-wide hover:bg-deep/85 transition-all">
            참석 의사 전달
          </button>
          <button
            onClick={handleShare}
            className="flex-1 py-3.5 border border-deep/15 font-sans font-medium text-sm text-deep/60 hover:bg-deep/5 transition-all flex items-center justify-center gap-2"
          >
            <Share2 size={14} />
            청첩장 공유
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 text-center border-t border-deep/8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-10 bg-deep/12" />
          <Heart size={11} className="text-caramel/40" fill="currentColor" />
          <div className="h-px w-10 bg-deep/12" />
        </div>
        <p className="font-sans text-xs text-deep/35">2026. 10. 17</p>
        <p className="font-sans text-xs text-deep/20 mt-1.5">
          Powered by <span className="text-caramel/50 font-display italic">Invitique</span>
        </p>
      </footer>

      <PhotoFocusModal
        photos={photos}
        currentIndex={focusIndex}
        onClose={() => setFocusIndex(null)}
        onNavigate={setFocusIndex}
      />
    </div>
  );
}
