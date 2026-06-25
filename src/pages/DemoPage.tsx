import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftGlyph as ArrowLeft,
  CalendarGlyph as Calendar,
  PinGlyph as MapPin,
  ClockGlyph as Clock,
  ShareGlyph as Share2,
  CopyGlyph as Copy,
  CheckGlyph as Check,
  ChevronDownGlyph as ChevronDown,
  ChevronRightGlyph as ChevronRight,
  CompassGlyph as Navigation,
  EnvelopeGlyph as CreditCard,
  PenGlyph as MessageCircle,
  PersonGlyph as Users,
  PhoneGlyph as Phone,
  BloomGlyph,
} from '@/components/icons/EditorialIcons';
import { FilmGrain } from '@/components/landing/FilmGrain';

// ── Types & Templates ──────────────────────────────────────────────────────
type TemplateKey = 'blanc' | 'lumiere' | 'nuit';

interface Tpl {
  label: string; labelKr: string; desc: string;
  bg: string; surface: string; surface2: string;
  text: string; muted: string; subtle: string;
  accent: string; accentMuted: string;
  border: string; divider: string; coverEnd: string;
  headingFamily: string;
  btnPrimBg: string; btnPrimText: string;
  btnSecBg: string; btnSecText: string; btnSecBorder: string;
}

const TEMPLATES: Record<TemplateKey, Tpl> = {
  blanc: {
    label: 'Blanc', labelKr: '블랑', desc: '순백 미니멀',
    bg: '#FAFAF8', surface: '#F3F3F0', surface2: '#EBEBEA',
    text: '#2B1D15', muted: '#2B1D1570', subtle: '#2B1D1530',
    accent: '#7B9E87', accentMuted: '#7B9E8730',
    border: '#2B1D1512', divider: '#7B9E8730', coverEnd: '#FAFAF8',
    headingFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    btnPrimBg: '#2B1D15', btnPrimText: '#FAFAF8',
    btnSecBg: 'transparent', btnSecText: '#2B1D15', btnSecBorder: '#2B1D1520',
  },
  lumiere: {
    label: 'Lumière', labelKr: '뤼미에르', desc: '크림 웜톤',
    bg: '#F5EFE6', surface: '#EDE5D8', surface2: '#E4DACC',
    text: '#2B1D15', muted: '#2B1D1565', subtle: '#2B1D1528',
    accent: '#C4956A', accentMuted: '#C4956A28',
    border: '#2B1D1514', divider: '#C4956A25', coverEnd: '#F5EFE6',
    headingFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    btnPrimBg: '#2B1D15', btnPrimText: '#F5EFE6',
    btnSecBg: 'transparent', btnSecText: '#2B1D15', btnSecBorder: '#2B1D1518',
  },
  nuit: {
    label: 'Nuit', labelKr: '뉘이', desc: '다크 엘레강스',
    bg: '#2B1D15', surface: '#1E1410', surface2: '#160F0A',
    text: '#F5EFE6', muted: '#F5EFE665', subtle: '#F5EFE625',
    accent: '#C9A84C', accentMuted: '#C9A84C28',
    border: '#F5EFE614', divider: '#C9A84C28', coverEnd: '#2B1D15',
    headingFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    btnPrimBg: '#C9A84C', btnPrimText: '#2B1D15',
    btnSecBg: 'transparent', btnSecText: '#F5EFE6', btnSecBorder: '#F5EFE618',
  },
};

// ── Content ────────────────────────────────────────────────────────────────
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

const INTRO_LINES = [
  '서로 다른 길을 걷던 두 사람이 우연처럼 만나,',
  '어느새 같은 방향을 바라보게 되었습니다.',
  '',
  '함께한 계절마다 웃음과 위로가 쌓였고,',
  '이제 그 마음을 약속으로 이어가려 합니다.',
  '',
  '소중한 분들을 모시고 저희의 첫날을',
  '함께 나누고 싶습니다.',
];

const STORY_CHAPTERS = [
  {
    num: '01', title: '처음 만난 날',
    sub: '2022년 가을 전시회에서',
    text: '두 사람은 같은 사진 앞에서 오래 머물다 눈이 마주쳤습니다. 어색한 미소와 함께 건넨 첫 마디가, 두 시간의 이야기로 이어졌습니다.',
    photo: PHOTOS[1],
  },
  {
    num: '02', title: '함께 걷기 시작한 계절',
    sub: '2023년 봄, 비 오던 오후',
    text: '우산 하나를 나눠 쓰며 비 오는 골목을 걸었습니다. 발이 젖는 줄도 모르고 웃으며 걷다 보니, 어느새 집 앞에 다다랐습니다.',
    photo: PHOTOS[2],
  },
  {
    num: '03', title: '서로의 가족이 된 순간',
    sub: '2024년 여름, 부모님의 생신날',
    text: '서로의 생일보다 상대방 부모님의 안부를 먼저 챙기게 되었을 때, 두 사람은 이미 가족이 되어 있었습니다.',
    photo: PHOTOS[3],
  },
  {
    num: '04', title: '결혼을 약속한 밤',
    sub: '2025년 겨울, 별이 맑던 밤',
    text: '밤하늘 아래 작은 편지 한 장과 반지 하나. 말 대신 눈물이 먼저였습니다. 그날의 별빛이, 이제 두 사람의 약속이 되었습니다.',
    photo: PHOTOS[4],
  },
];

const GALLERY_GROUPS = [
  { label: '대표 커버', tag: 'Cover', photos: [PHOTOS[0]], layout: 'full-tall' },
  { label: '커플 포트레이트', tag: 'Portrait', photos: [PHOTOS[1], PHOTOS[5]], layout: 'two-equal' },
  { label: '디테일 컷', tag: 'Details', photos: [PHOTOS[2], PHOTOS[6]], layout: 'asymmetric' },
  { label: '패밀리 무드', tag: 'Family', photos: [PHOTOS[3]], layout: 'full-short' },
  { label: '이브닝 씬', tag: 'Evening', photos: [PHOTOS[4], PHOTOS[7]], layout: 'two-equal' },
];

interface GuestMsg { name: string; msg: string; date: string; }
const SAMPLE_MSGS: GuestMsg[] = [
  { name: '이수진', msg: '두 분의 아름다운 시작을 진심으로 축하드려요! 항상 서로에게 따뜻한 사람이 되어 주세요 ❤️', date: '09.12' },
  { name: '박민재', msg: '지훈아, 드디어 결혼하는구나! 서연씨 잘 부탁해. 행복하게 살아라 👏', date: '09.14' },
  { name: '김지영', msg: '서연아 정말 부럽다! 두 분 너무 잘 어울려요. 오래오래 사랑하세요 🌸', date: '09.15' },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

function EditorialLabel({ label, t }: { label: string; t: Tpl }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-sans border backdrop-blur-sm"
      style={{ borderColor: t.divider, color: t.accent, backgroundColor: t.bg }}
    >
      {label}
    </span>
  );
}

function Divider({ t }: { t: Tpl }) {
  return (
    <div className="flex items-center justify-center gap-3.5 my-12">
      <span className="h-1 w-1 rotate-45" style={{ backgroundColor: t.divider }} />
      <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${t.divider})` }} />
      <BloomGlyph size={16} strokeWidth={1} style={{ color: t.accent }} />
      <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${t.divider})` }} />
      <span className="h-1 w-1 rotate-45" style={{ backgroundColor: t.divider }} />
    </div>
  );
}

function SectionLabel({ en, kr, t }: { en: string; kr: string; t: Tpl }) {
  return (
    <div className="text-center mb-8">
      <p className="font-sans text-[11px] tracking-[0.32em] uppercase mb-1.5" style={{ color: t.accent }}>{en}</p>
      <h2 className="font-sans font-bold text-xl" style={{ color: t.text, fontFamily: t.headingFamily, fontWeight: 600, fontSize: '1.5rem' }}>{kr}</h2>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function DemoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const init = (searchParams.get('template') as TemplateKey) || 'lumiere';
  const themeAlias = searchParams.get('theme');
  const normalizedInit = themeAlias === 'chapel' ? 'lumiere' : themeAlias === 'garden' ? 'blanc' : themeAlias === 'night' ? 'nuit' : init;
  const [template, setTemplate] = useState<TemplateKey>(
    Object.keys(TEMPLATES).includes(normalizedInit) ? normalizedInit as TemplateKey : 'lumiere',
  );
  // RSVP state
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [meal, setMeal] = useState<'yes' | 'no' | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);
  // Account
  const [showAcct, setShowAcct] = useState<'groom' | 'bride' | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  // Guestbook
  const [guestMsgs, setGuestMsgs] = useState<GuestMsg[]>(SAMPLE_MSGS);
  const [gbName, setGbName] = useState('');
  const [gbMsg, setGbMsg] = useState('');
  const [gbDone, setGbDone] = useState(false);

  const t = TEMPLATES[template];

  const copy = (text: string, key: string) => {
    const fallback = () => {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* noop */ }
      document.body.removeChild(el);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(fallback);
    } else {
      fallback();
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const submitRsvp = (e: React.FormEvent) => { e.preventDefault(); setRsvpDone(true); };

  const submitGb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gbName.trim() || !gbMsg.trim()) return;
    setGuestMsgs(prev => [{ name: gbName, msg: gbMsg, date: new Date().toLocaleDateString('ko', { month: '2-digit', day: '2-digit' }).replace('. ', '.').replace('.', '') }, ...prev]);
    setGbName(''); setGbMsg(''); setGbDone(true);
    setTimeout(() => setGbDone(false), 3000);
  };

  return (
    <>
      <FilmGrain />
      {/* Desktop outer */}
      <div className="min-h-screen flex flex-col items-center py-0 md:py-8 transition-colors duration-700"
        style={{ backgroundColor: template === 'nuit' ? '#1A120D' : template === 'lumiere' ? '#DED8D0' : '#E8E8E5' }}
      >
        {/* Phone frame wrapper */}
        <div className="relative w-full max-w-[390px] mx-auto md:shadow-[0_16px_80px_rgba(0,0,0,0.35)] md:rounded-[2.5rem] md:overflow-hidden transition-colors duration-700"
          style={{ backgroundColor: t.bg }}
        >
          {/* ── Nav ── */}
          <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 border-b backdrop-blur-md"
            style={{ backgroundColor: t.bg + 'F0', borderColor: t.border }}
          >
            <button onClick={() => navigate('/')} className="flex items-center gap-1.5 transition-opacity hover:opacity-60">
              <ArrowLeft size={15} style={{ color: t.muted }} />
              <span className="font-sans text-xs tracking-[0.12em] uppercase" style={{ color: t.muted }}>소개</span>
            </button>
            <span className="text-sm" style={{ color: t.muted, fontFamily: t.headingFamily, fontStyle: 'italic' }}>Invitique</span>
            <button onClick={() => copy(window.location.href, 'nav-share')} className="flex items-center gap-1.5 hover:opacity-60 transition-opacity">
              {copied === 'nav-share' ? <Check size={14} style={{ color: t.accent }} /> : <Share2 size={14} style={{ color: t.muted }} />}
              <span className="font-sans text-xs tracking-[0.12em] uppercase" style={{ color: t.muted }}>공유</span>
            </button>
          </nav>

          {/* ── Template Tabs ── */}
          <div className="flex border-b" style={{ borderColor: t.border, backgroundColor: t.bg }}>
            {(Object.keys(TEMPLATES) as TemplateKey[]).map((key) => (
              <button key={key} onClick={() => setTemplate(key)}
                className="flex-1 py-2 text-center transition-all relative"
              >
                <p className="font-sans text-[10px] tracking-[0.18em] uppercase transition-colors"
                  style={{ color: template === key ? t.accent : t.muted }}>{TEMPLATES[key].label}</p>
                {template === key && (
                  <motion.div layoutId="tab-line" className="absolute bottom-0 inset-x-0 h-px"
                    style={{ backgroundColor: t.accent }} />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={template} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >

              {/* ══ 1. COVER ═══════════════════════════════════════════════ */}
              <section className="relative h-[95vh] flex flex-col items-center justify-end pb-16 overflow-hidden">
                <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }}
                  transition={{ duration: 3.5, ease: [0.0, 0.0, 0.2, 1] }} className="absolute inset-0"
                >
                  <img src={PHOTOS[0]} alt="" crossOrigin="anonymous" className="w-full h-full object-cover object-center" />
                </motion.div>
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.52) 62%, rgba(0,0,0,0.78) 82%, ${t.coverEnd} 100%)` }} />

                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 text-center px-6 w-full"
                >
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.5))' }} />
                    <BloomGlyph size={14} strokeWidth={1} style={{ color: 'rgba(255,255,255,0.82)' }} />
                    <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.5))' }} />
                  </div>
                  <p className="font-sans text-[10px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Wedding Invitation
                  </p>
                  <h1 className="leading-[0.9] mb-3 whitespace-nowrap" style={{
                    fontFamily: t.headingFamily, fontWeight: 400,
                    fontSize: 'clamp(2.6rem, 9.5vw, 4rem)', color: '#FFFFFF',
                    letterSpacing: '0.02em',
                  }}>
                    지훈 &amp; 서연
                  </h1>
                  <p className="font-sans text-[11px] tracking-[0.4em] mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    JIHOON &amp; SEOYEON
                  </p>
                  <p className="font-sans text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.82)' }}>
                    서로의 계절이 되어,<br />이제 하나의 집을 이룹니다.
                  </p>
                  <p className="text-sm" style={{ fontFamily: t.headingFamily, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.15em' }}>
                    2026 · 10 · 24
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  <ChevronDown size={14} />
                </motion.div>
              </section>

              {/* ══ 2. INTRO LETTER ══════════════════════════════════════ */}
              <section className="px-8 pt-14 pb-2" style={{ backgroundColor: t.bg }}>
                <motion.div {...fadeUp(0)} className="text-center mb-8 flex flex-col items-center gap-2">
                  <p className="font-sans text-[11px] tracking-[0.32em] uppercase" style={{ color: t.accent }}>박지훈 · 이서연</p>
                  <EditorialLabel label="custom note" t={t} />
                </motion.div>
                <div className="text-center space-y-0.5 max-w-xs mx-auto">
                  {INTRO_LINES.map((line, i) =>
                    line === '' ? <div key={i} className="h-4" /> : (
                      <motion.p key={i} {...fadeUp(i * 0.09)}
                        className="font-sans text-[13.5px] leading-[2]" style={{ color: t.muted }}
                      >{line}</motion.p>
                    )
                  )}
                </div>
                <motion.p {...fadeUp(0.9)} className="text-center font-sans text-xs mt-8 tracking-wide" style={{ color: t.subtle }}>
                  박지훈 · 이서연 올림
                </motion.p>
                <Divider t={t} />
              </section>

              {/* ══ 3. OUR STORY ══════════════════════════════════════════ */}
              <section className="pb-4" style={{ backgroundColor: t.bg }}>
                <motion.div {...fadeUp(0)} className="text-center mb-10 px-8">
                  <p className="font-sans text-[11px] tracking-[0.32em] uppercase mb-2" style={{ color: t.accent }}>Our Story</p>
                  <h2 style={{ fontFamily: t.headingFamily, fontWeight: 400, fontSize: '1.75rem', color: t.text }}>두 사람의 이야기</h2>
                </motion.div>

                {STORY_CHAPTERS.map((ch, i) => (
                  <div key={ch.num} className={`flex ${i % 2 === 0 ? 'flex-col' : 'flex-col'} mb-1`}>
                    {i % 2 === 0 ? (
                      <>
                        <motion.div {...scaleIn(0)} className="w-full h-72 overflow-hidden">
                          <img src={ch.photo} alt="" crossOrigin="anonymous"
                            className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                        </motion.div>
                        <motion.div {...fadeUp(0.1)} className="px-8 py-8" style={{ backgroundColor: t.surface }}>
                          <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: t.accent }}>{ch.num}</p>
                          <h3 className="mb-1" style={{ fontFamily: t.headingFamily, fontWeight: 500, fontSize: '1.25rem', color: t.text }}>{ch.title}</h3>
                          <p className="font-sans text-xs mb-3 tracking-wide" style={{ color: t.subtle }}>{ch.sub}</p>
                          <p className="font-sans text-sm leading-[1.9]" style={{ color: t.muted }}>{ch.text}</p>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div {...fadeUp(0)} className="px-8 py-8" style={{ backgroundColor: t.surface2 }}>
                          <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: t.accent }}>{ch.num}</p>
                          <h3 className="mb-1" style={{ fontFamily: t.headingFamily, fontWeight: 500, fontSize: '1.25rem', color: t.text }}>{ch.title}</h3>
                          <p className="font-sans text-xs mb-3 tracking-wide" style={{ color: t.subtle }}>{ch.sub}</p>
                          <p className="font-sans text-sm leading-[1.9]" style={{ color: t.muted }}>{ch.text}</p>
                        </motion.div>
                        <motion.div {...scaleIn(0.05)} className="w-full h-72 overflow-hidden">
                          <img src={ch.photo} alt="" crossOrigin="anonymous"
                            className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                        </motion.div>
                      </>
                    )}
                  </div>
                ))}
                <div className="px-8"><Divider t={t} /></div>
              </section>

              {/* ══ 4. WEDDING DAY ════════════════════════════════════════ */}
              <section className="px-8 pb-10" style={{ backgroundColor: t.bg }}>
                <SectionLabel en="Wedding Day" kr="예식 안내" t={t} />
                <div className="border divide-y" style={{ borderColor: t.border }}>
                  {[
                    { Icon: Calendar, label: '날짜', value: '2026년 10월 24일 토요일' },
                    { Icon: Clock, label: '시간', value: '오후 2시 (입장 13:30)' },
                    { Icon: MapPin, label: '장소', value: '라움 채플홀' },
                    { Icon: MapPin, label: '주소', value: '서울 강남구 언주로 564' },
                  ].map(({ Icon, label, value }, i) => (
                    <motion.div key={label} {...fadeUp(i * 0.08)}
                      className="flex items-center gap-4 px-5 py-4" style={{ backgroundColor: t.surface, borderColor: t.border }}
                    >
                      <Icon size={13} style={{ color: t.accent }} />
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase w-8 shrink-0" style={{ color: t.accent }}>{label}</span>
                      <span className="font-sans text-sm" style={{ color: t.text }}>{value}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 gap-2 mt-3">
                  <button className="py-3 flex items-center justify-center gap-2 font-sans text-xs border transition-opacity hover:opacity-70"
                    style={{ borderColor: t.border, color: t.text, backgroundColor: t.surface }}
                  >
                    <Calendar size={12} style={{ color: t.accent }} />
                    캘린더 저장
                  </button>
                  <button className="py-3 flex items-center justify-center gap-2 font-sans text-xs transition-opacity hover:opacity-70"
                    style={{ backgroundColor: t.btnPrimBg, color: t.btnPrimText }}
                  >
                    <Navigation size={12} />
                    길찾기
                  </button>
                </motion.div>
                <Divider t={t} />
              </section>

              {/* ══ 5. GALLERY ═══════════════════════════════════════════ */}
              <section className="pb-4" style={{ backgroundColor: t.bg }}>
                <motion.div {...fadeUp(0)} className="text-center mb-6 px-8">
                  <p className="font-sans text-[11px] tracking-[0.32em] uppercase mb-2" style={{ color: t.accent }}>Gallery</p>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h2 style={{ fontFamily: t.headingFamily, fontWeight: 400, fontSize: '1.75rem', color: t.text }}>우리의 이야기</h2>
                    <EditorialLabel label="curated moments" t={t} />
                  </div>
                </motion.div>

                {GALLERY_GROUPS.map((grp, i) => (
                  <div key={grp.tag} className="mb-1">
                    {/* Group label */}
                    <div className="mx-3 my-1 flex items-center justify-between px-5 py-4 border backdrop-blur-md" style={{ backgroundColor: t.bg + 'B8', borderColor: t.border, boxShadow: '0 16px 36px rgba(0,0,0,0.06)' }}>
                      <div>
                        <span className="font-sans text-[11px] tracking-[0.22em] uppercase block mb-1" style={{ color: t.subtle }}>
                          {String(i + 1).padStart(2, '0')} / {grp.tag}
                        </span>
                        <span className="font-sans text-sm tracking-[0.12em] uppercase" style={{ color: t.accent }}>{grp.label}</span>
                      </div>
                      <div className="h-px w-14" style={{ backgroundColor: t.divider }} />
                    </div>
                    {/* Photos */}
                    {grp.layout === 'full-tall' && (
                      <motion.div {...scaleIn(0)} className="w-full h-[70vw] max-h-80 overflow-hidden">
                        <img src={grp.photos[0]} alt="" crossOrigin="anonymous"
                          className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                      </motion.div>
                    )}
                    {grp.layout === 'full-short' && (
                      <motion.div {...scaleIn(0)} className="w-full h-52 overflow-hidden">
                        <img src={grp.photos[0]} alt="" crossOrigin="anonymous"
                          className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                      </motion.div>
                    )}
                    {grp.layout === 'two-equal' && (
                      <div className="flex gap-0.5">
                        {grp.photos.map((src, j) => (
                          <motion.div key={j} {...scaleIn(j * 0.1)} className="flex-1 h-52 overflow-hidden">
                            <img src={src} alt="" crossOrigin="anonymous"
                              className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {grp.layout === 'asymmetric' && (
                      <div className="flex gap-0.5">
                        <motion.div {...scaleIn(0)} className="w-[58%] h-56 overflow-hidden">
                          <img src={grp.photos[0]} alt="" crossOrigin="anonymous"
                            className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                        </motion.div>
                        <motion.div {...scaleIn(0.12)} className="flex-1 h-56 overflow-hidden">
                          <img src={grp.photos[1]} alt="" crossOrigin="anonymous"
                            className="w-full h-full object-cover transition-transform duration-[6000ms] hover:scale-105" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-8"><Divider t={t} /></div>
              </section>

              {/* ══ 6. PARENTS ═══════════════════════════════════════════ */}
              <section className="px-8 pb-10" style={{ backgroundColor: t.bg }}>
                <SectionLabel en="Parents" kr="혼주 소개" t={t} />
                <motion.div {...fadeUp(0)} className="border" style={{ borderColor: t.border }}>
                  {[
                    { side: '신랑측', father: '박○○', mother: '이○○', child: '의 장남 지훈', color: t.accent },
                    { side: '신부측', father: '이○○', mother: '김○○', child: '의 장녀 서연', color: t.accent },
                  ].map((p, i) => (
                    <div key={p.side} className={`px-6 py-5 ${i === 0 ? 'border-b' : ''}`}
                      style={{ borderColor: t.border, backgroundColor: i === 0 ? t.surface : t.surface2 }}
                    >
                      <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: p.color }}>{p.side}</p>
                      <p className="font-sans text-sm" style={{ color: t.muted }}>
                        {p.father} · {p.mother}{p.child}
                      </p>
                    </div>
                  ))}
                </motion.div>
                <motion.p {...fadeUp(0.15)} className="text-center font-sans text-[12.5px] leading-[2] mt-7" style={{ color: t.muted }}>
                  저희 두 사람이 걸어온 길에<br />
                  늘 곁에서 응원해 주신 부모님께<br />
                  이 자리를 빌려 깊은 감사의 말씀을 드립니다.
                </motion.p>
                <Divider t={t} />
              </section>

              {/* ══ 7. LOCATION ══════════════════════════════════════════ */}
              <section className="px-8 pb-10" style={{ backgroundColor: t.bg }}>
                <SectionLabel en="Location" kr="오시는 길" t={t} />

                <motion.div {...scaleIn(0)} className="h-44 flex flex-col items-center justify-center border mb-4"
                  style={{ backgroundColor: t.surface, borderColor: t.border }}
                >
                  <MapPin size={26} className="mb-2" style={{ color: t.accent }} />
                  <p className="font-sans font-medium text-sm mb-0.5" style={{ color: t.text }}>라움 채플홀</p>
                  <p className="font-sans text-xs" style={{ color: t.muted }}>서울 강남구 언주로 564</p>
                </motion.div>

                <div className="border divide-y mb-4" style={{ borderColor: t.border }}>
                  {[
                    { label: '지하철', value: '7호선 학동역 1번 출구 도보 7분' },
                    { label: '버스', value: '간선 146, 341 · 지선 4412 "언주역" 하차' },
                    { label: '주차', value: '건물 지하주차장 3시간 무료' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4 px-4 py-3.5" style={{ backgroundColor: t.surface, borderColor: t.border }}>
                      <span className="font-sans text-[10px] tracking-[0.15em] uppercase w-10 shrink-0" style={{ color: t.accent }}>{label}</span>
                      <span className="font-sans text-xs leading-relaxed" style={{ color: t.text }}>{value}</span>
                    </div>
                  ))}
                </div>

                <motion.button {...fadeUp(0.3)} className="w-full py-3.5 flex items-center justify-center gap-2 font-sans text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: t.btnPrimBg, color: t.btnPrimText }}
                >
                  <Navigation size={14} />
                  카카오맵으로 길찾기
                </motion.button>
                <Divider t={t} />
              </section>

              {/* ══ 8. RSVP ══════════════════════════════════════════════ */}
              <section className="px-8 pb-10" style={{ backgroundColor: t.bg }}>
                <SectionLabel en="RSVP" kr="참석 여부" t={t} />
                <p className="text-center font-sans text-xs mb-7" style={{ color: t.muted }}>
                  10월 10일까지 알려주시면 감사하겠습니다
                </p>

                <AnimatePresence mode="wait">
                  {!rsvpDone ? (
                    <motion.form key="rsvp-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onSubmit={submitRsvp} className="space-y-5"
                    >
                      {/* Attending */}
                      <div>
                        <p className="font-sans text-xs mb-2.5" style={{ color: t.muted }}>참석 여부 *</p>
                        <div className="flex gap-2">
                          {(['yes', 'no'] as const).map((v) => (
                            <button key={v} type="button" onClick={() => setAttending(v)}
                              className="flex-1 py-3 font-sans text-sm border transition-all"
                              style={{
                                backgroundColor: attending === v ? t.btnPrimBg : t.surface,
                                color: attending === v ? t.btnPrimText : t.text,
                                borderColor: attending === v ? t.btnPrimBg : t.border,
                              }}
                            >
                              {v === 'yes' ? '참석합니다' : '불참합니다'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {attending === 'yes' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden"
                          >
                            {/* Meal */}
                            <div>
                              <p className="font-sans text-xs mb-2.5" style={{ color: t.muted }}>식사 여부 *</p>
                              <div className="flex gap-2">
                                {(['yes', 'no'] as const).map((v) => (
                                  <button key={v} type="button" onClick={() => setMeal(v)}
                                    className="flex-1 py-3 font-sans text-sm border transition-all"
                                    style={{
                                      backgroundColor: meal === v ? t.btnPrimBg : t.surface,
                                      color: meal === v ? t.btnPrimText : t.text,
                                      borderColor: meal === v ? t.btnPrimBg : t.border,
                                    }}
                                  >
                                    {v === 'yes' ? '식사할게요' : '안 할게요'}
                                  </button>
                                ))}
                              </div>
                            </div>
                            {/* Guest count */}
                            <div>
                              <p className="font-sans text-xs mb-2.5" style={{ color: t.muted }}>동행 인원 (본인 포함)</p>
                              <div className="flex gap-1.5">
                                {[1, 2, 3, 4].map((n) => (
                                  <button key={n} type="button" onClick={() => setGuestCount(n)}
                                    className="flex-1 py-2.5 font-sans text-sm border transition-all"
                                    style={{
                                      backgroundColor: guestCount === n ? t.btnPrimBg : t.surface,
                                      color: guestCount === n ? t.btnPrimText : t.text,
                                      borderColor: guestCount === n ? t.btnPrimBg : t.border,
                                    }}
                                  >{n}명</button>
                                ))}
                              </div>
                            </div>
                            {/* Name */}
                            {[
                              { id: 'name', label: '이름', Icon: Users, placeholder: '홍길동', val: guestName, set: setGuestName, type: 'text' },
                              { id: 'phone', label: '연락처', Icon: Phone, placeholder: '010-0000-0000', val: guestPhone, set: setGuestPhone, type: 'tel' },
                            ].map(({ id, label, Icon, placeholder, val, set, type }) => (
                              <div key={id}>
                                <p className="font-sans text-xs mb-1.5" style={{ color: t.muted }}>{label} *</p>
                                <div className="flex items-center border px-3 py-3 gap-3"
                                  style={{ borderColor: t.border, backgroundColor: t.surface }}
                                >
                                  <Icon size={13} style={{ color: t.accent }} />
                                  <input type={type} value={val} onChange={(e) => set(e.target.value)}
                                    placeholder={placeholder} required
                                    className="flex-1 bg-transparent font-sans text-sm outline-none"
                                    style={{ color: t.text }}
                                  />
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button type="submit"
                        disabled={!attending || (attending === 'yes' && (!meal || !guestName))}
                        className="w-full py-4 font-sans text-sm font-medium transition-opacity hover:opacity-85 disabled:opacity-30"
                        style={{ backgroundColor: t.btnPrimBg, color: t.btnPrimText }}
                      >
                        전달하기
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div key="rsvp-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: t.accentMuted }}>
                        <Check size={24} style={{ color: t.accent }} />
                      </div>
                      <p className="font-sans font-medium text-lg mb-2" style={{ color: t.text, fontFamily: t.headingFamily }}>전달되었습니다</p>
                      <p className="font-sans text-sm" style={{ color: t.muted }}>
                        {attending === 'yes' ? `${guestCount}명 참석 · ` : ''}{attending === 'yes' ? '소중한 날 함께해 주셔서 감사합니다.' : '마음만 받겠습니다. 감사합니다.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Divider t={t} />
              </section>

              {/* ══ 9. ACCOUNT ═══════════════════════════════════════════ */}
              <section className="px-8 pb-10" style={{ backgroundColor: t.bg }}>
                <SectionLabel en="Account" kr="마음 전하기" t={t} />
                <p className="text-center font-sans text-xs mb-6" style={{ color: t.muted }}>
                  참석이 어려우신 분들을 위해 안내드립니다.<br />부담 갖지 마세요.
                </p>
                <div className="space-y-2">
                  {[
                    { key: 'groom', side: '신랑측', name: '박지훈', bank: '신한은행', num: '110-123-456789' },
                    { key: 'bride', side: '신부측', name: '이서연', bank: '카카오뱅크', num: '3333-01-2345678' },
                  ].map((acc) => (
                    <div key={acc.key} className="border overflow-hidden" style={{ borderColor: t.border }}>
                      <button
                        onClick={() => setShowAcct(showAcct === acc.key as 'groom' | 'bride' ? null : acc.key as 'groom' | 'bride')}
                        className="w-full flex items-center justify-between px-5 py-4 transition-opacity hover:opacity-70"
                        style={{ backgroundColor: t.surface }}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard size={14} style={{ color: t.accent }} />
                          <span className="font-sans text-sm" style={{ color: t.text }}>{acc.side} — {acc.name}</span>
                        </div>
                        <motion.span animate={{ rotate: showAcct === acc.key ? 180 : 0 }} transition={{ duration: 0.22 }}>
                          <ChevronDown size={14} style={{ color: t.muted }} />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {showAcct === acc.key && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-4 border-t" style={{ borderColor: t.border, backgroundColor: t.surface2 }}>
                              <div>
                                <p className="font-sans text-[11px] mb-0.5" style={{ color: t.muted }}>{acc.bank}</p>
                                <p className="font-sans text-sm font-medium" style={{ color: t.text }}>{acc.num}</p>
                                <p className="font-sans text-xs mt-0.5" style={{ color: t.subtle }}>예금주 {acc.name}</p>
                              </div>
                              <button onClick={() => copy(acc.num, acc.key)}
                                className="flex items-center gap-1.5 px-3 py-2 border font-sans text-xs transition-opacity hover:opacity-70"
                                style={{ borderColor: t.border, color: t.text }}
                              >
                                {copied === acc.key ? <Check size={11} style={{ color: t.accent }} /> : <Copy size={11} />}
                                {copied === acc.key ? '복사됨' : '복사'}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
                <Divider t={t} />
              </section>

              {/* ══ 10. GUESTBOOK ═════════════════════════════════════════ */}
              <section className="px-8 pb-10" style={{ backgroundColor: t.bg }}>
                <SectionLabel en="Guestbook" kr="축하 메시지" t={t} />

                {/* Sample messages */}
                <div className="space-y-3 mb-7">
                  <AnimatePresence>
                    {guestMsgs.map((m, i) => (
                      <motion.div key={`${m.name}-${i}`}
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i < 3 ? i * 0.08 : 0 }}
                        className="px-5 py-4 border" style={{ backgroundColor: t.surface, borderColor: t.border }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-sans text-xs font-medium" style={{ color: t.text }}>{m.name}</span>
                          <span className="font-sans text-[10px]" style={{ color: t.subtle }}>{m.date}</span>
                        </div>
                        <p className="font-sans text-sm leading-relaxed" style={{ color: t.muted }}>{m.msg}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Input form */}
                <form onSubmit={submitGb} className="space-y-3">
                  <div className="flex items-center border px-3 py-3 gap-2" style={{ borderColor: t.border, backgroundColor: t.surface }}>
                    <MessageCircle size={12} style={{ color: t.accent }} />
                    <input value={gbName} onChange={(e) => setGbName(e.target.value)}
                      placeholder="이름" required
                      className="w-24 bg-transparent font-sans text-sm outline-none border-r pr-3 mr-1"
                      style={{ color: t.text, borderColor: t.border }}
                    />
                    <input value={gbMsg} onChange={(e) => setGbMsg(e.target.value)}
                      placeholder="축하 메시지를 남겨주세요"
                      className="flex-1 bg-transparent font-sans text-sm outline-none"
                      style={{ color: t.text }}
                    />
                  </div>
                  <button type="submit"
                    className="w-full py-3 font-sans text-sm border transition-opacity hover:opacity-70"
                    style={{ borderColor: t.border, color: t.text, backgroundColor: t.surface }}
                  >
                    {gbDone ? '✓ 등록되었습니다' : '메시지 남기기'}
                  </button>
                </form>
                <Divider t={t} />
              </section>

              {/* ══ 11. SHARE ════════════════════════════════════════════ */}
              <section className="px-8 pb-10" style={{ backgroundColor: t.bg }}>
                <SectionLabel en="Share" kr="함께 나눠요" t={t} />
                <p className="text-center font-sans text-sm mb-7" style={{ color: t.muted }}>
                  지훈과 서연의 소식을<br />소중한 분들께 전해주세요
                </p>
                <div className="space-y-3">
                  <button className="w-full py-4 font-sans text-sm font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
                    style={{ backgroundColor: '#FEE500', color: '#3C1E1E' }}
                  >
                    <span className="text-base leading-none">💬</span>
                    카카오톡으로 공유하기
                  </button>
                  <button onClick={() => copy(window.location.href, 'share-link')}
                    className="w-full py-4 flex items-center justify-center gap-2 font-sans text-sm border transition-opacity hover:opacity-70"
                    style={{ borderColor: t.border, color: t.text, backgroundColor: t.surface }}
                  >
                    {copied === 'share-link' ? <Check size={14} style={{ color: t.accent }} /> : <Copy size={14} />}
                    {copied === 'share-link' ? '링크가 복사되었습니다' : '링크 복사하기'}
                  </button>
                </div>
                <Divider t={t} />
              </section>

              {/* ══ 12. CLOSING ══════════════════════════════════════════ */}
              <section style={{ backgroundColor: t.bg }}>
                <div className="w-full h-72 overflow-hidden">
                  <img src={PHOTOS[7]} alt="" crossOrigin="anonymous"
                    className="w-full h-full object-cover" />
                </div>
                <div className="px-8 py-14 text-center">
                  <motion.div {...fadeUp(0)}>
                    <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: t.accent }}>Thank You</p>
                    <h2 className="mb-3 leading-snug" style={{
                      fontFamily: t.headingFamily, fontWeight: 400,
                      fontSize: '1.65rem', color: t.text,
                    }}>
                      함께해 주셔서<br />감사합니다
                    </h2>
                    <p className="font-sans text-sm leading-[2] mb-8" style={{ color: t.muted }}>
                      두 사람의 새로운 계절에<br />
                      소중한 발걸음이 되어 주셔서<br />
                      진심으로 감사드립니다.
                    </p>
                    <p className="mb-1" style={{ fontFamily: t.headingFamily, fontSize: '1.35rem', fontWeight: 400, color: t.text }}>
                      지훈 &amp; 서연
                    </p>
                    <p className="font-sans text-xs tracking-[0.3em]" style={{ color: t.subtle }}>2026 · 10 · 24</p>
                  </motion.div>

                  {/* Footer */}
                  <div className="mt-14 pt-8 border-t" style={{ borderColor: t.border }}>
                    <p className="font-sans text-[10px] tracking-[0.25em] uppercase" style={{ color: t.subtle }}>
                      Powered by{' '}
                      <span style={{ fontFamily: t.headingFamily, fontStyle: 'italic', color: t.accent }}>Invitique</span>
                    </p>
                    <button onClick={() => navigate('/')}
                      className="mt-3 inline-flex items-center gap-1.5 font-sans text-[11px] transition-opacity hover:opacity-60"
                      style={{ color: t.accent }}
                    >
                      나만의 청첩장 만들기 <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              </section>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
