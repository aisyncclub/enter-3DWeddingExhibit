import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Calendar, MapPin, Clock, Share2, Copy, Check,
  ChevronDown, Heart, Sparkles, Navigation, CreditCard,
} from 'lucide-react';
import { FilmGrain } from '@/components/landing/FilmGrain';

// ── Types ──────────────────────────────────────────────────────────────────
type TemplateKey = 'blanc' | 'lumiere' | 'nuit';
type RsvpPhase = 'form' | 'done';

// ── Template Definitions ──────────────────────────────────────────────────
interface TplConfig {
  label: string; labelKr: string; desc: string;
  outerBg: string; bg: string; surface: string;
  text: string; textMuted: string;
  accent: string; accentText: string;
  border: string; divider: string;
  heading: string; coverEnd: string;
  btnPrimary: string; btnSecondary: string;
  badgeBg: string; badgeText: string;
}

const TEMPLATES: Record<TemplateKey, TplConfig> = {
  blanc: {
    label: 'Blanc', labelKr: '블랑', desc: '순백 미니멀',
    outerBg: 'bg-[#ECE9E4]', bg: 'bg-white', surface: 'bg-[#F7F6F4]',
    text: 'text-[#2B1D15]', textMuted: 'text-[#2B1D15]/45',
    accent: 'bg-[#7B9E87]', accentText: 'text-[#7B9E87]',
    border: 'border-[#EBEBEB]', divider: 'bg-[#EBEBEB]',
    heading: 'font-sans', coverEnd: '#FFFFFF',
    btnPrimary: 'bg-[#2B1D15] text-white',
    btnSecondary: 'border border-[#EBEBEB] text-[#2B1D15]',
    badgeBg: 'bg-[#7B9E87]/8', badgeText: 'text-[#7B9E87]',
  },
  lumiere: {
    label: 'Lumière', labelKr: '뤼미에르', desc: '크림 웜톤',
    outerBg: 'bg-[#DED8D0]', bg: 'bg-[#F5EFE6]', surface: 'bg-[#EDE5D8]',
    text: 'text-[#2B1D15]', textMuted: 'text-[#2B1D15]/45',
    accent: 'bg-[#C4956A]', accentText: 'text-[#C4956A]',
    border: 'border-[#2B1D15]/10', divider: 'bg-[#C4956A]/20',
    heading: 'font-display', coverEnd: '#F5EFE6',
    btnPrimary: 'bg-[#2B1D15] text-[#F5EFE6]',
    btnSecondary: 'border border-[#2B1D15]/15 text-[#2B1D15]',
    badgeBg: 'bg-[#C4956A]/8', badgeText: 'text-[#C4956A]',
  },
  nuit: {
    label: 'Nuit', labelKr: '뉘이', desc: '다크 엘레강스',
    outerBg: 'bg-[#1A120D]', bg: 'bg-[#2B1D15]', surface: 'bg-[#1E1410]',
    text: 'text-[#F5EFE6]', textMuted: 'text-[#F5EFE6]/45',
    accent: 'bg-[#C9A84C]', accentText: 'text-[#C9A84C]',
    border: 'border-[#F5EFE6]/10', divider: 'bg-[#C9A84C]/25',
    heading: 'font-display', coverEnd: '#2B1D15',
    btnPrimary: 'bg-[#C9A84C] text-[#2B1D15]',
    btnSecondary: 'border border-[#F5EFE6]/15 text-[#F5EFE6]',
    badgeBg: 'bg-[#C9A84C]/10', badgeText: 'text-[#C9A84C]',
  },
};

// ── Content Data ───────────────────────────────────────────────────────────
const PHOTOS = [
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/35cebb25-7ff8-4b.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e85d4e93-e5c7-47.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/abc7c6d8-7010-41.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/3211278c-2ddc-43.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e84c9415-3a76-4a.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/5e49acda-11ff-4f.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/a90ff767-0071-4e.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/15be2420-ffdc-44.png',
];

const MSG_LINES = [
  '서로에게 가장 좋은 사람이 되기로 약속한',
  '두 사람이 이제 하나의 길을 걷게 됩니다.',
  '',
  '두 분의 귀한 걸음으로',
  '새로운 시작을 함께 축복해 주시면',
  '영원히 잊지 못할 소중한 날이 될 것입니다.',
];

const ACCOUNTS = [
  { side: '신랑', name: '박지훈', bank: '신한은행', number: '110-123-456789', holder: '박지훈' },
  { side: '신부', name: '이서연', bank: '카카오뱅크', number: '3333-01-2345678', holder: '이서연' },
];

// ── Utility Components ─────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

function AIBadge({ label, t }: { label: string; t: TplConfig }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] tracking-widest uppercase font-sans border ${t.border} ${t.badgeText} opacity-60`}>
      <Sparkles size={7} />
      {label}
    </span>
  );
}

function SectionDivider({ t }: { t: TplConfig }) {
  return (
    <div className="flex items-center justify-center gap-3 my-10">
      <div className={`h-px w-14 ${t.divider}`} />
      <Heart size={9} className={t.accentText} fill="currentColor" />
      <div className={`h-px w-14 ${t.divider}`} />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function DemoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const init = (searchParams.get('template') as TemplateKey) || 'lumiere';
  const [template, setTemplate] = useState<TemplateKey>(
    Object.keys(TEMPLATES).includes(init) ? init : 'lumiere',
  );
  const [rsvpPhase, setRsvpPhase] = useState<RsvpPhase>('form');
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [meal, setMeal] = useState<'yes' | 'no' | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [showAccount, setShowAccount] = useState(false);

  const t = TEMPLATES[template];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleShareLink = () => handleCopy(window.location.href, 'link');

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpPhase('done');
  };

  return (
    <>
      <FilmGrain />

      {/* Desktop outer bg */}
      <div className={`min-h-screen ${t.outerBg} transition-colors duration-700 flex flex-col items-center py-0 md:py-8`}>

        {/* ── Phone wrapper ── */}
        <div className={`relative w-full max-w-[390px] mx-auto ${t.bg} md:shadow-[0_12px_64px_rgba(0,0,0,0.28)] md:rounded-[2.5rem] md:overflow-hidden transition-colors duration-700`}>

          {/* ── Top Nav ── */}
          <nav className={`sticky top-0 z-40 flex items-center justify-between px-5 py-3 ${t.bg}/95 backdrop-blur-md border-b ${t.border} transition-colors duration-700`}>
            <button onClick={() => navigate('/')} className={`flex items-center gap-1.5 ${t.textMuted} hover:${t.text} transition-colors`}>
              <ArrowLeft size={15} />
              <span className="font-sans text-[10px] tracking-[0.15em] uppercase">소개</span>
            </button>
            <span className={`font-display italic ${t.textMuted} text-sm`}>Invitique</span>
            <button onClick={handleShareLink} className={`flex items-center gap-1.5 ${t.textMuted} transition-colors`}>
              {copied === 'link' ? <Check size={15} className={t.accentText} /> : <Share2 size={15} />}
              <span className="font-sans text-[10px] tracking-[0.15em] uppercase">공유</span>
            </button>
          </nav>

          {/* ── Template Switcher ── */}
          <div className={`flex border-b ${t.border} ${t.bg}/95 transition-colors duration-700`}>
            {(Object.keys(TEMPLATES) as TemplateKey[]).map((key) => (
              <button key={key} onClick={() => setTemplate(key)}
                className={`flex-1 py-2 text-center transition-all relative ${template === key ? t.text : t.textMuted}`}
              >
                <p className={`font-sans text-[10px] tracking-[0.18em] uppercase ${template === key ? t.accentText : ''}`}>
                  {TEMPLATES[key].label}
                </p>
                {template === key && (
                  <motion.div layoutId="tab-line" className={`absolute bottom-0 inset-x-0 h-px ${t.accent}`} />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={template} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>

              {/* ══ 1. COVER ══════════════════════════════════════════════ */}
              <section className="relative h-[92vh] flex flex-col items-center justify-end pb-14 overflow-hidden">
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 3, ease: [0.0, 0.0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <img src={PHOTOS[0]} alt="" crossOrigin="anonymous"
                    className="w-full h-full object-cover object-top" />
                </motion.div>

                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 50%, ${t.coverEnd}ee 100%)` }} />

                <div className="relative z-10 text-center px-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.9 }}
                  >
                    <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-white/55 mb-5">Wedding Invitation</p>
                    <h1 className={`${t.heading} font-black text-[clamp(2.6rem,11vw,5rem)] leading-[0.88] text-white`}>
                      지훈 <span className="font-normal italic opacity-40 text-[0.55em]">&amp;</span> 서연
                    </h1>
                    <p className="font-sans text-white/45 text-[10px] tracking-[0.35em] mt-2">
                      PARK JI-HUN · LEE SEO-YEON
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-6 text-white/50 text-[11px] font-sans">
                      <Calendar size={10} />
                      <span>2026년 10월 24일 토요일 오후 2시</span>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce"
                >
                  <ChevronDown size={14} />
                </motion.div>
              </section>

              {/* ══ 2. INVITATION MESSAGE ═══════════════════════════════ */}
              <section className={`px-8 pt-12 pb-2 ${t.bg} transition-colors duration-700`}>
                <div className="text-center">
                  <motion.div {...fadeUp(0)} className="mb-6 flex items-center justify-center gap-2">
                    <span className={`font-sans text-[10px] tracking-[0.3em] uppercase ${t.accentText}`}>
                      박지훈 · 이서연
                    </span>
                    <AIBadge label="AI 인사말 생성" t={t} />
                  </motion.div>

                  <div className="space-y-0.5">
                    {MSG_LINES.map((line, i) =>
                      line === '' ? <div key={i} className="h-4" /> : (
                        <motion.p key={i} {...fadeUp(i * 0.1)}
                          className={`font-sans ${t.textMuted} text-sm leading-[1.95]`}
                        >
                          {line}
                        </motion.p>
                      )
                    )}
                  </div>

                  <motion.p {...fadeUp(0.8)} className={`font-sans text-xs ${t.textMuted} mt-8 opacity-60 tracking-wide`}>
                    박지훈 · 이서연 올림
                  </motion.p>
                </div>
                <SectionDivider t={t} />
              </section>

              {/* ══ 3. WEDDING INFO ══════════════════════════════════════ */}
              <section className={`px-8 pb-10 ${t.bg} transition-colors duration-700`}>
                <motion.div {...fadeUp(0)} className="text-center mb-7">
                  <p className={`font-sans text-[10px] tracking-[0.35em] uppercase ${t.accentText} mb-1`}>Date &amp; Venue</p>
                  <h2 className={`${t.heading} font-bold text-xl ${t.text}`}>예식 안내</h2>
                </motion.div>

                <div className={`border ${t.border} divide-y ${t.border}`}>
                  {[
                    { Icon: Calendar, label: '날짜', value: '2026년 10월 24일 토요일' },
                    { Icon: Clock, label: '시간', value: '오후 2시 (1부 14:00)' },
                    { Icon: MapPin, label: '장소', value: '라움 채플홀 / 서울 중구' },
                  ].map(({ Icon, label, value }, i) => (
                    <motion.div key={label} {...fadeUp(i * 0.1)}
                      className={`flex items-center gap-4 px-5 py-4 ${t.surface}`}
                    >
                      <Icon size={14} className={t.accentText} />
                      <span className={`font-sans text-[10px] tracking-[0.2em] uppercase ${t.accentText} w-8 shrink-0`}>{label}</span>
                      <span className={`font-sans text-sm ${t.text}`}>{value}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button {...fadeUp(0.4)}
                  className={`w-full mt-4 py-3 flex items-center justify-center gap-2 font-sans text-sm font-medium ${t.btnSecondary} hover:opacity-70 transition-opacity`}
                >
                  <Calendar size={14} />
                  캘린더에 저장하기
                </motion.button>
                <SectionDivider t={t} />
              </section>

              {/* ══ 4. GALLERY ══════════════════════════════════════════ */}
              <section className={`pb-10 ${t.bg} transition-colors duration-700`}>
                <motion.div {...fadeUp(0)} className="text-center mb-6 px-8">
                  <p className={`font-sans text-[10px] tracking-[0.35em] uppercase ${t.accentText} mb-1`}>Gallery</p>
                  <div className="flex items-center justify-center gap-2">
                    <h2 className={`${t.heading} font-bold text-xl ${t.text}`}>우리의 이야기</h2>
                    <AIBadge label="AI 사진 정리" t={t} />
                  </div>
                </motion.div>

                {/* Editorial layout */}
                <div className="space-y-1 px-1">
                  {/* Row 1: Full wide */}
                  <motion.div {...fadeUp(0)} className="w-full h-64 overflow-hidden">
                    <img src={PHOTOS[1]} alt="" crossOrigin="anonymous"
                      className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                  </motion.div>

                  {/* Row 2: 55% + 45% */}
                  <div className="flex gap-1">
                    <motion.div {...fadeUp(0.1)} className="w-[55%] h-52 overflow-hidden">
                      <img src={PHOTOS[2]} alt="" crossOrigin="anonymous"
                        className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                    </motion.div>
                    <motion.div {...fadeUp(0.2)} className="flex-1 h-52 overflow-hidden">
                      <img src={PHOTOS[3]} alt="" crossOrigin="anonymous"
                        className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                    </motion.div>
                  </div>

                  {/* Row 3: Full editorial */}
                  <motion.div {...fadeUp(0.1)} className="w-full h-80 overflow-hidden">
                    <img src={PHOTOS[4]} alt="" crossOrigin="anonymous"
                      className="w-full h-full object-cover object-center transition-transform duration-[6000ms] hover:scale-105" />
                  </motion.div>

                  {/* Row 4: 40% + 60% */}
                  <div className="flex gap-1">
                    <motion.div {...fadeUp(0.15)} className="w-[40%] h-44 overflow-hidden">
                      <img src={PHOTOS[5]} alt="" crossOrigin="anonymous"
                        className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                    </motion.div>
                    <motion.div {...fadeUp(0.25)} className="flex-1 h-44 overflow-hidden">
                      <img src={PHOTOS[6]} alt="" crossOrigin="anonymous"
                        className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                    </motion.div>
                  </div>

                  {/* Row 5: Closing shot */}
                  <motion.div {...fadeUp(0.1)} className="w-full h-64 overflow-hidden">
                    <img src={PHOTOS[7]} alt="" crossOrigin="anonymous"
                      className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                  </motion.div>
                </div>
                <div className="px-8"><SectionDivider t={t} /></div>
              </section>

              {/* ══ 5. LOCATION ══════════════════════════════════════════ */}
              <section className={`px-8 pb-10 ${t.bg} transition-colors duration-700`}>
                <motion.div {...fadeUp(0)} className="text-center mb-6">
                  <p className={`font-sans text-[10px] tracking-[0.35em] uppercase ${t.accentText} mb-1`}>Location</p>
                  <h2 className={`${t.heading} font-bold text-xl ${t.text}`}>오시는 길</h2>
                </motion.div>

                {/* Map placeholder */}
                <motion.div {...fadeUp(0.1)} className={`${t.surface} h-48 flex flex-col items-center justify-center border ${t.border} mb-4`}>
                  <MapPin size={28} className={`${t.accentText} mb-2`} />
                  <p className={`font-sans font-medium text-sm ${t.text}`}>라움 채플홀</p>
                  <p className={`font-sans text-xs ${t.textMuted} mt-0.5`}>서울특별시 중구 장충단로 275</p>
                </motion.div>

                <motion.div {...fadeUp(0.2)} className={`border ${t.border} divide-y ${t.border} mb-4`}>
                  {[
                    { label: '주소', value: '서울특별시 중구 장충단로 275' },
                    { label: '지하철', value: '3호선 동대입구역 1번 출구 도보 5분' },
                    { label: '주차', value: '지하주차장 3시간 무료' },
                  ].map(({ label, value }) => (
                    <div key={label} className={`flex gap-4 px-4 py-3.5 ${t.surface}`}>
                      <span className={`font-sans text-[10px] tracking-[0.15em] uppercase ${t.accentText} w-10 shrink-0`}>{label}</span>
                      <span className={`font-sans text-xs ${t.text} leading-relaxed`}>{value}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.button {...fadeUp(0.3)}
                  className={`w-full py-3.5 flex items-center justify-center gap-2 font-sans text-sm font-semibold ${t.btnPrimary} hover:opacity-85 transition-opacity`}
                >
                  <Navigation size={14} />
                  길찾기
                </motion.button>
                <SectionDivider t={t} />
              </section>

              {/* ══ 6. RSVP ══════════════════════════════════════════════ */}
              <section className={`px-8 pb-10 ${t.bg} transition-colors duration-700`}>
                <motion.div {...fadeUp(0)} className="text-center mb-7">
                  <p className={`font-sans text-[10px] tracking-[0.35em] uppercase ${t.accentText} mb-1`}>RSVP</p>
                  <h2 className={`${t.heading} font-bold text-xl ${t.text}`}>참석 여부</h2>
                  <p className={`font-sans text-xs ${t.textMuted} mt-2`}>10월 10일까지 알려주시면 감사하겠습니다</p>
                </motion.div>

                <AnimatePresence mode="wait">
                  {rsvpPhase === 'form' ? (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onSubmit={handleRsvpSubmit} className="space-y-5"
                    >
                      {/* Attending */}
                      <div>
                        <p className={`font-sans text-xs ${t.textMuted} mb-2.5 tracking-wide`}>참석 여부 *</p>
                        <div className="flex gap-2">
                          {(['yes', 'no'] as const).map((v) => (
                            <button key={v} type="button" onClick={() => setAttending(v)}
                              className={`flex-1 py-2.5 font-sans text-sm border transition-all ${
                                attending === v ? `${t.btnPrimary} border-transparent` : `${t.btnSecondary}`
                              }`}
                            >
                              {v === 'yes' ? '참석합니다' : '참석이 어렵습니다'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {attending === 'yes' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                            {/* Meal */}
                            <div className="mb-5">
                              <p className={`font-sans text-xs ${t.textMuted} mb-2.5 tracking-wide`}>식사 여부 *</p>
                              <div className="flex gap-2">
                                {(['yes', 'no'] as const).map((v) => (
                                  <button key={v} type="button" onClick={() => setMeal(v)}
                                    className={`flex-1 py-2.5 font-sans text-sm border transition-all ${
                                      meal === v ? `${t.btnPrimary} border-transparent` : `${t.btnSecondary}`
                                    }`}
                                  >
                                    {v === 'yes' ? '식사 할게요' : '식사 안 할게요'}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Name & Phone */}
                            {[
                              { id: 'name', label: '이름', placeholder: '참석자 이름', value: guestName, onChange: setGuestName, type: 'text' },
                              { id: 'phone', label: '연락처', placeholder: '010-0000-0000', value: guestPhone, onChange: setGuestPhone, type: 'tel' },
                            ].map(({ id, label, placeholder, value, onChange, type }) => (
                              <div key={id} className="mb-3">
                                <p className={`font-sans text-xs ${t.textMuted} mb-1.5 tracking-wide`}>{label} *</p>
                                <input
                                  type={type} value={value} onChange={(e) => onChange(e.target.value)}
                                  placeholder={placeholder} required
                                  className={`w-full py-3 px-4 font-sans text-sm border ${t.border} ${t.surface} ${t.text} placeholder:${t.textMuted} focus:outline-none focus:ring-1 focus:ring-current bg-transparent`}
                                />
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button type="submit" disabled={!attending || (attending === 'yes' && (!meal || !guestName))}
                        className={`w-full py-3.5 font-sans text-sm font-semibold ${t.btnPrimary} hover:opacity-85 transition-opacity disabled:opacity-30`}
                      >
                        전달하기
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      className="text-center py-10"
                    >
                      <div className={`w-14 h-14 rounded-full ${t.accent} flex items-center justify-center mx-auto mb-4`}>
                        <Check size={22} className="text-white" />
                      </div>
                      <p className={`${t.heading} font-semibold text-lg ${t.text} mb-2`}>전달되었습니다</p>
                      <p className={`font-sans text-sm ${t.textMuted}`}>
                        {attending === 'yes' ? '소중한 날 함께해 주셔서 감사합니다.' : '마음만 받겠습니다. 감사합니다.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <SectionDivider t={t} />
              </section>

              {/* ══ 7. ACCOUNT ═══════════════════════════════════════════ */}
              <section className={`px-8 pb-10 ${t.bg} transition-colors duration-700`}>
                <motion.div {...fadeUp(0)} className="text-center mb-5">
                  <p className={`font-sans text-[10px] tracking-[0.35em] uppercase ${t.accentText} mb-1`}>Account</p>
                  <h2 className={`${t.heading} font-bold text-xl ${t.text}`}>마음 전하기</h2>
                </motion.div>

                <motion.button {...fadeUp(0.1)}
                  onClick={() => setShowAccount(!showAccount)}
                  className={`w-full py-3 flex items-center justify-center gap-2 font-sans text-sm border ${t.border} ${t.text} hover:opacity-70 transition-opacity mb-1`}
                >
                  <CreditCard size={14} className={t.accentText} />
                  계좌번호 보기
                  <motion.span animate={{ rotate: showAccount ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={13} className={t.textMuted} />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {showAccount && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 pt-2">
                        {ACCOUNTS.map((acc) => (
                          <div key={acc.side} className={`border ${t.border} ${t.surface} px-5 py-4 flex items-center justify-between`}>
                            <div>
                              <p className={`font-sans text-[10px] tracking-[0.2em] uppercase ${t.accentText} mb-0.5`}>{acc.side}</p>
                              <p className={`font-sans font-medium text-sm ${t.text}`}>{acc.bank}</p>
                              <p className={`font-sans text-xs ${t.textMuted} mt-0.5`}>{acc.number} ({acc.holder})</p>
                            </div>
                            <button
                              onClick={() => handleCopy(acc.number, acc.side)}
                              className={`flex items-center gap-1.5 px-3 py-2 font-sans text-xs border ${t.border} ${t.text} hover:opacity-70 transition-opacity shrink-0`}
                            >
                              {copied === acc.side ? <Check size={12} className={t.accentText} /> : <Copy size={12} />}
                              {copied === acc.side ? '복사됨' : '복사'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <SectionDivider t={t} />
              </section>

              {/* ══ 8. CLOSING ═══════════════════════════════════════════ */}
              <section className={`px-8 pb-16 ${t.bg} transition-colors duration-700 text-center`}>
                <motion.div {...fadeUp(0)} className="mb-3">
                  <AIBadge label="AI 추천 대표 커버" t={t} />
                </motion.div>
                <motion.h2 {...fadeUp(0.1)} className={`${t.heading} font-bold text-2xl ${t.text} mb-3`}>
                  함께해 주셔서 감사합니다
                </motion.h2>
                <motion.p {...fadeUp(0.2)} className={`font-sans text-sm ${t.textMuted} leading-relaxed mb-10`}>
                  지훈과 서연의 새로운 시작을<br />
                  따뜻하게 축복해 주세요.
                </motion.p>

                <motion.div {...fadeUp(0.3)} className="space-y-3">
                  {/* Kakao share */}
                  <button className="w-full py-3.5 font-sans text-sm font-semibold bg-[#FEE500] text-[#3C1E1E] hover:opacity-85 transition-opacity flex items-center justify-center gap-2">
                    <span className="text-base leading-none">💬</span>
                    카카오톡으로 공유하기
                  </button>
                  {/* Link copy */}
                  <button onClick={handleShareLink}
                    className={`w-full py-3.5 flex items-center justify-center gap-2 font-sans text-sm ${t.btnSecondary} hover:opacity-70 transition-opacity`}
                  >
                    {copied === 'link' ? <Check size={14} className={t.accentText} /> : <Copy size={14} />}
                    {copied === 'link' ? '링크가 복사되었습니다' : '링크 복사하기'}
                  </button>
                </motion.div>

                {/* Footer */}
                <motion.div {...fadeUp(0.5)} className={`mt-12 pt-8 border-t ${t.border}`}>
                  <p className={`font-sans text-[10px] tracking-[0.2em] uppercase ${t.textMuted} opacity-40`}>
                    Powered by <span className={`font-display italic ${t.accentText} opacity-100`}>Invitique</span>
                  </p>
                  <button onClick={() => navigate('/')}
                    className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-sans ${t.accentText} hover:opacity-70 transition-opacity tracking-wide`}
                  >
                    나만의 청첩장 만들기 <ChevronRight size={11} />
                  </button>
                </motion.div>
              </section>

            </motion.div>
          </AnimatePresence>
        </div>{/* /phone wrapper */}
      </div>{/* /outer */}
    </>
  );
}
