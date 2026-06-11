import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, MapPin, Calendar, Clock, Share2, ChevronRight } from 'lucide-react';
import { FilmGrain } from '@/components/landing/FilmGrain';

type TemplateKey = 'blanc' | 'lumiere' | 'nuit';

const TEMPLATES: Record<TemplateKey, {
  label: string; labelKr: string; desc: string;
  bg: string; surface: string; text: string; textMuted: string;
  accent: string; accentBg: string; border: string;
  headingFont: string; coverOverlay: string;
}> = {
  blanc: {
    label: 'Blanc', labelKr: '블랑', desc: '순백의 미니멀',
    bg: 'bg-white', surface: 'bg-[#F9F9F7]', text: 'text-[#2B1D15]', textMuted: 'text-[#2B1D15]/45',
    accent: 'text-[#7B9E87]', accentBg: 'bg-[#7B9E87]', border: 'border-[#EBEBEB]',
    headingFont: 'font-sans', coverOverlay: 'from-black/5 via-black/20 to-black/55',
  },
  lumiere: {
    label: 'Lumière', labelKr: '뤼미에르', desc: '따뜻한 크림 웜톤',
    bg: 'bg-[#F5EFE6]', surface: 'bg-[#EDE5D8]', text: 'text-[#2B1D15]', textMuted: 'text-[#2B1D15]/45',
    accent: 'text-[#C4956A]', accentBg: 'bg-[#C4956A]', border: 'border-[#2B1D15]/10',
    headingFont: 'font-display', coverOverlay: 'from-black/10 via-black/25 to-[#2B1D15]/80',
  },
  nuit: {
    label: 'Nuit', labelKr: '뉘이', desc: '다크 엘레강스',
    bg: 'bg-[#2B1D15]', surface: 'bg-[#1E1410]', text: 'text-[#F5EFE6]', textMuted: 'text-[#F5EFE6]/45',
    accent: 'text-[#C9A84C]', accentBg: 'bg-[#C9A84C]', border: 'border-[#F5EFE6]/10',
    headingFont: 'font-display', coverOverlay: 'from-transparent via-[#2B1D15]/40 to-[#2B1D15]/95',
  },
};

const PHOTOS = [
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/35cebb25-7ff8-4b.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e85d4e93-e5c7-47.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/abc7c6d8-7010-41.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/3211278c-2ddc-43.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e84c9415-3a76-4a.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/5e49acda-11ff-4f.png',
];

export default function DemoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTemplate = (searchParams.get('template') as TemplateKey) || 'lumiere';
  const [template, setTemplate] = useState<TemplateKey>(
    Object.keys(TEMPLATES).includes(initialTemplate) ? initialTemplate : 'lumiere'
  );
  const t = TEMPLATES[template];

  const handleShare = async () => {
    if (navigator.share) await navigator.share({ title: '민준 & 서아의 결혼식', url: window.location.href });
    else { await navigator.clipboard.writeText(window.location.href); alert('링크가 복사되었습니다!'); }
  };

  return (
    <div className={`min-h-screen ${t.bg} transition-colors duration-700`}>
      <FilmGrain />

      {/* ── Top Nav ── */}
      <nav className={`fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 py-3 ${t.bg}/90 backdrop-blur-md border-b ${t.border}`}>
        <button onClick={() => navigate('/')} className={`flex items-center gap-1.5 ${t.textMuted} hover:${t.text} transition-colors text-sm`}>
          <ArrowLeft size={15} />
          <span className="font-sans text-[11px] tracking-[0.15em] uppercase">소개</span>
        </button>
        <span className={`font-display italic ${t.textMuted} text-sm`}>Invitique</span>
        <button onClick={handleShare} className={`flex items-center gap-1.5 ${t.textMuted} hover:${t.text} transition-colors text-sm`}>
          <Share2 size={15} />
          <span className="font-sans text-[11px] tracking-[0.15em] uppercase">공유</span>
        </button>
      </nav>

      {/* ── Template Switcher ── */}
      <div className={`fixed top-[49px] inset-x-0 z-30 flex border-b ${t.border} ${t.bg}/95 backdrop-blur-md`}>
        {(Object.keys(TEMPLATES) as TemplateKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setTemplate(key)}
            className={`flex-1 py-2.5 text-center transition-all relative ${
              template === key ? t.text : t.textMuted
            }`}
          >
            <p className={`font-sans text-[11px] tracking-[0.2em] uppercase ${template === key ? t.accent : ''}`}>
              {TEMPLATES[key].label}
            </p>
            <p className={`font-sans text-[10px] mt-0.5 ${t.textMuted}`}>{TEMPLATES[key].desc}</p>
            {template === key && (
              <motion.div layoutId="tab-indicator" className={`absolute bottom-0 inset-x-0 h-px ${t.accentBg}`} />
            )}
          </button>
        ))}
      </div>

      {/* ── Invitation Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={template}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-[100px] pb-24"
        >
          {/* Cover */}
          <section className="relative h-[90vh] flex flex-col items-center justify-end pb-14 overflow-hidden">
            <img src={PHOTOS[0]} alt="" crossOrigin="anonymous"
              className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700" />
            <div className={`absolute inset-0 bg-gradient-to-b ${t.coverOverlay}`} />

            <div className="relative text-center z-10 px-8">
              <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-white/55 mb-4">Wedding Invitation</p>
              <h1 className={`${t.headingFont} font-black text-[clamp(2.8rem,10vw,5.5rem)] leading-[0.9] text-white mb-3`}>
                민준 <span className="font-normal italic opacity-50 text-[0.55em]">&amp;</span> 서아
              </h1>
              <p className="font-sans text-white/50 text-[11px] tracking-[0.3em]">KIM MIN-JUN · LEE SEO-AH</p>
              <div className={`flex items-center justify-center gap-3 mt-6 text-white/60 text-xs font-sans`}>
                <Calendar size={11} className="text-white/40" />
                <span>2026년 10월 17일 토요일</span>
                <span className="opacity-30">·</span>
                <Clock size={11} className="text-white/40" />
                <span>오후 1시 30분</span>
              </div>
            </div>
          </section>

          {/* Message */}
          <section className={`py-16 px-8 max-w-md mx-auto text-center ${t.bg}`}>
            <Divider t={t} />
            <p className={`font-sans ${t.textMuted} text-sm leading-[2.1] mt-8 mb-8`}>
              서로를 알아가며 쌓아온 추억들,<br />
              앞으로 함께 만들어갈 새로운 이야기들.<br />
              두 사람이 하나가 되는 소중한 날을<br />
              함께 해주셔서 감사합니다.
            </p>
            <Divider t={t} />
          </section>

          {/* Photos */}
          <section className={`px-4 ${t.bg}`}>
            <div className="grid grid-cols-2 gap-1 max-w-md mx-auto">
              {PHOTOS.slice(1, 5).map((src, i) => (
                <div key={i} className={`${i === 0 ? 'col-span-2 h-64' : 'h-44'} overflow-hidden`}>
                  <img src={src} alt="" crossOrigin="anonymous"
                    className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                </div>
              ))}
            </div>
          </section>

          {/* Info */}
          <section className={`py-14 px-8 max-w-md mx-auto ${t.bg}`}>
            <p className={`font-sans text-[11px] tracking-[0.3em] uppercase ${t.accent} text-center mb-8`}>Date &amp; Venue</p>
            <div className="space-y-0">
              {[
                { icon: Calendar, label: '일시', value: '2026년 10월 17일 토요일 오후 1시 30분' },
                { icon: MapPin, label: '장소', value: '더채플 at 청담 웨딩홀' },
                { icon: Clock, label: '주소', value: '서울시 강남구 청담동 123-45' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className={`flex gap-4 py-4 border-b ${t.border}`}>
                  <Icon size={13} className={`${t.accent} shrink-0 mt-0.5`} />
                  <div>
                    <span className={`font-sans text-[10px] tracking-[0.2em] uppercase ${t.accent} block mb-0.5`}>{label}</span>
                    <span className={`font-sans text-sm ${t.text}`}>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Map placeholder */}
          <section className={`px-4 ${t.bg} max-w-md mx-auto`}>
            <div className={`${t.surface} h-40 flex items-center justify-center border ${t.border}`}>
              <div className="text-center">
                <MapPin size={24} className={`${t.accent} mx-auto mb-2`} />
                <p className={`font-sans text-xs ${t.textMuted}`}>더채플 at 청담</p>
              </div>
            </div>
          </section>

          {/* Parents */}
          <section className={`py-12 px-8 max-w-md mx-auto`}>
            <div className={`p-6 border ${t.border} ${t.surface} text-center`}>
              <p className={`font-sans text-[10px] tracking-[0.3em] uppercase ${t.textMuted} mb-5`}>혼주</p>
              <div className="grid grid-cols-2 gap-0">
                <div className={`border-r ${t.border} pr-6`}>
                  <p className={`font-sans text-[10px] tracking-wider uppercase ${t.accent} mb-1`}>신랑측</p>
                  <p className={`font-sans text-xs ${t.textMuted}`}>김○○ · 이○○의 장남</p>
                  <p className={`${t.headingFont} font-semibold ${t.text} mt-1`}>김민준</p>
                </div>
                <div className="pl-6">
                  <p className={`font-sans text-[10px] tracking-wider uppercase ${t.accent} mb-1`}>신부측</p>
                  <p className={`font-sans text-xs ${t.textMuted}`}>이○○ · 박○○의 장녀</p>
                  <p className={`${t.headingFont} font-semibold ${t.text} mt-1`}>이서아</p>
                </div>
              </div>
            </div>
          </section>

          {/* RSVP */}
          <section className={`py-10 px-8 max-w-md mx-auto text-center ${t.bg}`}>
            <p className={`font-sans text-[11px] tracking-[0.3em] uppercase ${t.accent} mb-3`}>RSVP</p>
            <p className={`font-sans text-sm ${t.textMuted} mb-7 leading-relaxed`}>
              참석 여부를 알려주세요.<br />소중한 자리에 함께 해주시길 기다리겠습니다.
            </p>
            <button className={`w-full py-3.5 border ${t.border} ${t.text} font-sans text-sm font-medium hover:opacity-70 transition-opacity`}>
              참석 의사 전달
            </button>
          </section>

          {/* Footer */}
          <footer className={`py-10 text-center border-t ${t.border} ${t.bg}`}>
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className={`h-px w-8 ${t.accentBg} opacity-30`} />
              <Heart size={10} className={t.accent} fill="currentColor" />
              <div className={`h-px w-8 ${t.accentBg} opacity-30`} />
            </div>
            <p className={`font-sans text-xs ${t.textMuted}`}>2026. 10. 17</p>
            <p className={`font-sans text-[11px] ${t.textMuted} opacity-40 mt-1`}>
              Powered by <span className={`font-display italic ${t.accent}`}>Invitique</span>
            </p>
          </footer>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom CTA Bar ── */}
      <div className={`fixed bottom-0 inset-x-0 z-40 ${t.bg}/95 backdrop-blur-md border-t ${t.border} px-5 py-3 flex items-center justify-between`}>
        <div>
          <p className={`font-sans text-xs font-semibold ${t.text}`}>나만의 청첩장 만들기</p>
          <p className={`font-sans text-[11px] ${t.textMuted}`}>무료로 시작 · 3가지 템플릿</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 px-5 py-2.5 ${t.accentBg} text-white font-sans text-sm font-semibold hover:opacity-90 transition-opacity`}
        >
          시작하기
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function Divider({ t }: { t: typeof TEMPLATES[TemplateKey] }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className={`h-px w-12 ${t.accentBg} opacity-25`} />
      <Heart size={10} className={t.accent} fill="currentColor" />
      <div className={`h-px w-12 ${t.accentBg} opacity-25`} />
    </div>
  );
}
