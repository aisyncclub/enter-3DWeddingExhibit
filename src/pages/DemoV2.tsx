import { useState, useMemo, type ReactNode, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import '../v2/v2.css';
import { Button, SHADOW_CARD, SHADOW_SECONDARY } from '../v2/Button';
import { useInViewAnimation } from '../v2/useInViewAnimation';
import { useMouseTrail, TrailImages } from '../v2/MouseTrail';
import { PHOTOS } from '../v2/data';
import {
  CalendarGlyph, ClockGlyph, PinGlyph, CompassGlyph, EnvelopeGlyph,
  PenGlyph, PersonGlyph, PhoneGlyph, ShareGlyph, CopyGlyph, CheckGlyph,
  ChevronDownGlyph, ArrowLeftGlyph, BloomGlyph,
} from '../components/icons/EditorialIcons';

/* ── v2 tone tokens (white / ink, matching the landing) ──────── */
const INK = '#051A24';
const INK2 = '#0D212C';
const MUTED = '#273C46';
const SUBTLE = 'rgba(5,26,36,0.45)';
const LINE = 'rgba(5,26,36,0.10)';
const SURF = '#F7F6F3';

/* ── content (mirrors the original demo) ─────────────────────── */
const INTRO_LINES = [
  '서로 다른 길을 걷던 두 사람이 우연처럼 만나,',
  '어느새 같은 방향을 바라보게 되었습니다.',
  '',
  '함께한 계절마다 웃음과 위로가 쌓였고,',
  '이제 그 마음을 약속으로 이어가려 합니다.',
];

const STORY = [
  { num: '01', title: '처음 만난 날', sub: '2022년 가을 전시회에서', text: '두 사람은 같은 사진 앞에서 오래 머물다 눈이 마주쳤습니다. 어색한 미소와 함께 건넨 첫 마디가, 두 시간의 이야기로 이어졌습니다.', photo: PHOTOS[1] },
  { num: '02', title: '함께 걷기 시작한 계절', sub: '2023년 봄, 비 오던 오후', text: '우산 하나를 나눠 쓰며 비 오는 골목을 걸었습니다. 발이 젖는 줄도 모르고 웃으며 걷다 보니, 어느새 집 앞에 다다랐습니다.', photo: PHOTOS[2] },
  { num: '03', title: '서로의 가족이 된 순간', sub: '2024년 여름, 부모님의 생신날', text: '서로의 생일보다 상대방 부모님의 안부를 먼저 챙기게 되었을 때, 두 사람은 이미 가족이 되어 있었습니다.', photo: PHOTOS[3] },
  { num: '04', title: '결혼을 약속한 밤', sub: '2025년 겨울, 별이 맑던 밤', text: '밤하늘 아래 작은 편지 한 장과 반지 하나. 말 대신 눈물이 먼저였습니다. 그날의 별빛이, 이제 두 사람의 약속이 되었습니다.', photo: PHOTOS[4] },
];

const GALLERY = [PHOTOS[0], PHOTOS[5], PHOTOS[2], PHOTOS[6], PHOTOS[3], PHOTOS[7]];

const SAMPLE_MSGS = [
  { name: '이수진', msg: '두 분의 아름다운 시작을 진심으로 축하드려요! 항상 서로에게 따뜻한 사람이 되어 주세요.', date: '09.12' },
  { name: '박민재', msg: '지훈아, 드디어 결혼하는구나! 서연씨 잘 부탁해. 행복하게 살아라.', date: '09.14' },
  { name: '김지영', msg: '서연아 정말 부럽다! 두 분 너무 잘 어울려요. 오래오래 사랑하세요.', date: '09.15' },
];

const ACCOUNTS = [
  { key: 'groom', side: '신랑측', name: '박지훈', bank: '신한은행', num: '110-123-456789' },
  { key: 'bride', side: '신부측', name: '이서연', bank: '카카오뱅크', num: '3333-01-2345678' },
] as const;

/* ── helpers ─────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', style }: { children: ReactNode; delay?: number; className?: string; style?: CSSProperties }) {
  const { ref, inView } = useInViewAnimation();
  return (
    <div ref={ref} className={`${inView ? 'animate-fade-in-up' : 'opacity-0'} ${className}`} style={{ animationDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

const Serif = ({ children, italic = false }: { children: ReactNode; italic?: boolean }) => (
  <span className={`v2-serif ${italic ? 'italic' : ''}`}>{children}</span>
);

function Label({ en }: { en: string }) {
  return <p className="v2-mono text-[11px] tracking-[0.32em] uppercase" style={{ color: SUBTLE }}>{en}</p>;
}

function SectionHead({ en, kr }: { en: string; kr: string }) {
  return (
    <div className="text-center mb-9">
      <Label en={en} />
      <h2 className="v2-serif text-[28px] md:text-[32px] mt-2" style={{ color: INK }}>{kr}</h2>
    </div>
  );
}

/* Gentle falling-petal backdrop. Petal configs computed once so they don't
   reset on the page's many state re-renders (rsvp / accordion / guestbook). */
const PETAL_COLORS = ['#E7C9C9', '#DDBBA9', '#ECE2D2', '#C9D6C6', '#E6CBD2'];
function FallingPetals() {
  const petals = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({
      left: Math.random() * 100,
      size: 9 + Math.random() * 11,
      fall: 9 + Math.random() * 9,
      delay: -Math.random() * 18,
      sway: 2.4 + Math.random() * 2.6,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      opacity: 0.4 + Math.random() * 0.35,
    })),
    [],
  );
  return (
    <div className="v2-petals" aria-hidden>
      {petals.map((p, i) => (
        <span key={i} className="v2-petal-fall" style={{ left: `${p.left}%`, animationDuration: `${p.fall}s`, animationDelay: `${p.delay}s` }}>
          <span className="v2-petal-sway" style={{ animationDuration: `${p.sway}s` }}>
            <svg width={p.size} height={p.size * 1.7} viewBox="0 0 12 22" style={{ opacity: p.opacity, display: 'block' }}>
              <path d="M6 0.5 C10 5 10.5 14.5 6 21.5 C1.5 14.5 2 5 6 0.5Z" fill={p.color} />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3.5 my-14">
      <span className="h-1 w-1 rotate-45" style={{ backgroundColor: LINE }} />
      <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${LINE})` }} />
      <BloomGlyph size={16} strokeWidth={1} style={{ color: MUTED }} />
      <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${LINE})` }} />
      <span className="h-1 w-1 rotate-45" style={{ backgroundColor: LINE }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function DemoV2() {
  const navigate = useNavigate();
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);
  const [openAcct, setOpenAcct] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [msgs, setMsgs] = useState(SAMPLE_MSGS);
  const [gbName, setGbName] = useState('');
  const [gbMsg, setGbMsg] = useState('');

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
  const submitGb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gbName.trim() || !gbMsg.trim()) return;
    setMsgs((p) => [{ name: gbName, msg: gbMsg, date: '오늘' }, ...p]);
    setGbName(''); setGbMsg('');
  };

  const { trail, onMouseMove } = useMouseTrail(160);

  return (
    <div className="v2-root relative min-h-screen w-full overflow-x-hidden pb-28" onMouseMove={onMouseMove}>
      <FallingPetals />
      <TrailImages trail={trail} size="small" />
      {/* ── nav ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-3.5 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: LINE }}>
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 hover:opacity-60 transition-opacity">
          <ArrowLeftGlyph size={15} style={{ color: MUTED }} />
          <span className="v2-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>소개</span>
        </button>
        <span className="v2-serif text-lg" style={{ color: INK }}>Invitique</span>
        <button onClick={() => copy(window.location.href, 'nav')} className="flex items-center gap-1.5 hover:opacity-60 transition-opacity">
          {copied === 'nav' ? <CheckGlyph size={14} style={{ color: INK }} /> : <ShareGlyph size={14} style={{ color: MUTED }} />}
          <span className="v2-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>공유</span>
        </button>
      </nav>

      <div className="relative z-10 max-w-[480px] mx-auto px-6">
        {/* ── 1. COVER ── */}
        <header className="pt-16 pb-4 text-center">
          <p className="animate-fade-in-up v2-mono text-[11px] tracking-[0.5em] uppercase mb-6" style={{ color: SUBTLE, animationDelay: '0.1s' }}>
            Wedding Invitation
          </p>
          <h1 className="animate-fade-in-up text-[40px] md:text-[48px] font-semibold tracking-tight leading-[1.05]" style={{ color: INK, animationDelay: '0.2s' }}>
            지훈 &amp; 서연
          </h1>
          <p className="animate-fade-in-up v2-serif text-base tracking-[0.3em] mt-3" style={{ color: MUTED, animationDelay: '0.3s' }}>
            JIHOON &amp; SEOYEON
          </p>
          <p className="animate-fade-in-up v2-serif text-lg mt-5" style={{ color: INK2, animationDelay: '0.4s' }}>
            2026 · 10 · 24
          </p>
        </header>
        <Reveal delay={0.1} className="overflow-hidden rounded-[28px] mt-6" style={{ boxShadow: '0 18px 50px rgba(5,26,36,0.16)' }}>
          <img src={PHOTOS[0]} alt="" crossOrigin="anonymous" className="w-full h-[440px] object-cover" />
        </Reveal>

        {/* ── 2. INVITATION ── */}
        <section className="pt-16">
          <Reveal className="text-center mb-7"><Label en="Invitation" /></Reveal>
          <div className="text-center space-y-1">
            {INTRO_LINES.map((line, i) => line === ''
              ? <div key={i} className="h-4" />
              : <Reveal key={i} delay={i * 0.06}><p className="text-[14px] leading-[2]" style={{ color: MUTED }}>{line}</p></Reveal>)}
          </div>
          <Reveal delay={0.4}><p className="text-center v2-serif text-sm mt-8" style={{ color: SUBTLE }}>박지훈 · 이서연 올림</p></Reveal>
          <Ornament />
        </section>

        {/* ── 3. OUR STORY ── */}
        <section>
          <SectionHead en="Our Story" kr="두 사람의 이야기" />
          <div className="space-y-12">
            {STORY.map((ch, i) => (
              <Reveal key={ch.num} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl" style={{ boxShadow: SHADOW_CARD }}>
                  <img src={ch.photo} alt="" crossOrigin="anonymous" className="w-full h-64 object-cover" />
                </div>
                <div className="mt-5">
                  <span className="v2-serif text-2xl" style={{ color: SUBTLE }}>{ch.num}</span>
                  <h3 className="v2-serif text-xl mt-1" style={{ color: INK }}>{ch.title}</h3>
                  <p className="v2-mono text-[11px] tracking-[0.12em] mt-1.5 uppercase" style={{ color: SUBTLE }}>{ch.sub}</p>
                  <p className="text-sm leading-[1.9] mt-3" style={{ color: MUTED }}>{ch.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Ornament />
        </section>

        {/* ── 4. WEDDING DAY ── */}
        <section>
          <SectionHead en="Wedding Day" kr="예식 안내" />
          <Reveal className="rounded-[28px] overflow-hidden" style={{ background: SURF, boxShadow: SHADOW_CARD }}>
            {[
              { Icon: CalendarGlyph, label: 'Date', value: '2026년 10월 24일 토요일' },
              { Icon: ClockGlyph, label: 'Time', value: '오후 2시 · 입장 13:30' },
              { Icon: PinGlyph, label: 'Hall', value: '라움 채플홀' },
              { Icon: PinGlyph, label: 'Addr', value: '서울 강남구 언주로 564' },
            ].map(({ Icon, label, value }, i) => (
              <div key={label} className="flex items-center gap-4 px-6 py-4" style={{ borderTop: i ? `1px solid ${LINE}` : 'none' }}>
                <Icon size={15} style={{ color: INK }} />
                <span className="v2-mono text-[10px] tracking-[0.18em] uppercase w-12 shrink-0" style={{ color: SUBTLE }}>{label}</span>
                <span className="text-sm" style={{ color: INK }}>{value}</span>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="grid grid-cols-2 gap-3 mt-3">
            <button className="flex items-center justify-center gap-2 rounded-full py-3 text-sm transition-transform hover:-translate-y-0.5"
              style={{ background: SURF, color: INK, boxShadow: SHADOW_SECONDARY }}>
              <CalendarGlyph size={14} style={{ color: INK }} /> 캘린더 저장
            </button>
            <button className="flex items-center justify-center gap-2 rounded-full py-3 text-sm text-white transition-transform hover:-translate-y-0.5"
              style={{ background: INK }}>
              <CompassGlyph size={14} /> 길찾기
            </button>
          </Reveal>
          <Ornament />
        </section>

        {/* ── 5. GALLERY ── */}
        <section>
          <SectionHead en="Gallery" kr="우리의 순간" />
          <div className="grid grid-cols-2 gap-2.5">
            {GALLERY.map((src, i) => (
              <Reveal key={i} delay={(i % 2) * 0.06} className={i === 0 ? 'col-span-2' : ''}>
                <div className="overflow-hidden rounded-xl" style={{ boxShadow: SHADOW_CARD }}>
                  <img src={src} alt="" crossOrigin="anonymous" className={`w-full object-cover ${i === 0 ? 'h-72' : 'h-44'}`} />
                </div>
              </Reveal>
            ))}
          </div>
          <Ornament />
        </section>

        {/* ── 6. LOCATION ── */}
        <section>
          <SectionHead en="Location" kr="오시는 길" />
          <Reveal className="rounded-[28px] flex flex-col items-center justify-center py-12" style={{ background: SURF }}>
            <PinGlyph size={28} style={{ color: INK }} />
            <p className="font-medium text-sm mt-3" style={{ color: INK }}>라움 채플홀</p>
            <p className="text-xs mt-1" style={{ color: MUTED }}>서울 강남구 언주로 564</p>
          </Reveal>
          <div className="rounded-[28px] overflow-hidden mt-3" style={{ background: SURF }}>
            {[
              { label: '지하철', value: '7호선 학동역 1번 출구 도보 7분' },
              { label: '버스', value: '간선 146, 341 · 지선 4412 언주역 하차' },
              { label: '주차', value: '건물 지하주차장 3시간 무료' },
            ].map(({ label, value }, i) => (
              <div key={label} className="flex gap-4 px-5 py-3.5" style={{ borderTop: i ? `1px solid ${LINE}` : 'none' }}>
                <span className="v2-mono text-[10px] tracking-[0.12em] uppercase w-10 shrink-0 pt-0.5" style={{ color: SUBTLE }}>{label}</span>
                <span className="text-xs leading-relaxed" style={{ color: INK }}>{value}</span>
              </div>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-4">
            <button onClick={() => copy('라움 채플홀', 'map')}
              className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              style={{ background: INK }}>
              <CompassGlyph size={15} /> 카카오맵으로 길찾기
            </button>
          </Reveal>
          <Ornament />
        </section>

        {/* ── 7. RSVP ── */}
        <section>
          <SectionHead en="RSVP" kr="참석 여부" />
          <p className="text-center text-xs mb-7" style={{ color: MUTED }}>10월 10일까지 알려주시면 감사하겠습니다</p>
          {!rsvpDone ? (
            <form onSubmit={(e) => { e.preventDefault(); setRsvpDone(true); }} className="space-y-5">
              <div>
                <p className="text-xs mb-2.5" style={{ color: MUTED }}>참석 여부 *</p>
                <div className="flex gap-2.5">
                  {(['yes', 'no'] as const).map((v) => (
                    <button key={v} type="button" onClick={() => setAttending(v)}
                      className="flex-1 py-3 rounded-full text-sm transition-all"
                      style={attending === v ? { background: INK, color: '#fff' } : { background: SURF, color: INK, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
                      {v === 'yes' ? '참석합니다' : '불참합니다'}
                    </button>
                  ))}
                </div>
              </div>
              {attending === 'yes' && (
                <>
                  <div>
                    <p className="text-xs mb-2.5" style={{ color: MUTED }}>동행 인원 (본인 포함)</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((n) => (
                        <button key={n} type="button" onClick={() => setGuestCount(n)}
                          className="flex-1 py-2.5 rounded-full text-sm transition-all"
                          style={guestCount === n ? { background: INK, color: '#fff' } : { background: SURF, color: INK, boxShadow: `inset 0 0 0 1px ${LINE}` }}>{n}명</button>
                      ))}
                    </div>
                  </div>
                  {[
                    { Icon: PersonGlyph, ph: '이름', val: guestName, set: setGuestName, type: 'text' },
                    { Icon: PhoneGlyph, ph: '010-0000-0000', val: guestPhone, set: setGuestPhone, type: 'tel' },
                  ].map(({ Icon, ph, val, set, type }) => (
                    <div key={ph} className="flex items-center gap-3 rounded-full px-5 py-3" style={{ background: SURF, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
                      <Icon size={14} style={{ color: INK }} />
                      <input type={type} value={val} onChange={(e) => set(e.target.value)} placeholder={ph}
                        className="flex-1 bg-transparent text-sm outline-none" style={{ color: INK }} />
                    </div>
                  ))}
                </>
              )}
              <Button variant="primary" className="w-full">전달하기</Button>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: SURF }}>
                <CheckGlyph size={24} style={{ color: INK }} />
              </div>
              <p className="v2-serif text-lg" style={{ color: INK }}>전달되었습니다</p>
              <p className="text-sm mt-2" style={{ color: MUTED }}>소중한 날 함께해 주셔서 감사합니다.</p>
            </div>
          )}
          <Ornament />
        </section>

        {/* ── 8. ACCOUNT ── */}
        <section>
          <SectionHead en="Account" kr="마음 전하기" />
          <div className="space-y-2.5">
            {ACCOUNTS.map((acc) => (
              <div key={acc.key} className="rounded-2xl overflow-hidden" style={{ background: SURF }}>
                <button onClick={() => setOpenAcct(openAcct === acc.key ? null : acc.key)} className="w-full flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <EnvelopeGlyph size={15} style={{ color: INK }} />
                    <span className="text-sm" style={{ color: INK }}>{acc.side} — {acc.name}</span>
                  </div>
                  <span style={{ transform: openAcct === acc.key ? 'rotate(180deg)' : 'none', transition: 'transform .25s', display: 'inline-flex' }}>
                    <ChevronDownGlyph size={15} style={{ color: MUTED }} />
                  </span>
                </button>
                {openAcct === acc.key && (
                  <div className="flex items-center justify-between px-5 py-4 border-t" style={{ borderColor: LINE }}>
                    <div>
                      <p className="text-[11px]" style={{ color: MUTED }}>{acc.bank}</p>
                      <p className="text-sm font-medium" style={{ color: INK }}>{acc.num}</p>
                    </div>
                    <button onClick={() => copy(acc.num, acc.key)} className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs" style={{ background: '#fff', color: INK, boxShadow: SHADOW_SECONDARY }}>
                      {copied === acc.key ? <CheckGlyph size={12} /> : <CopyGlyph size={12} />}{copied === acc.key ? '복사됨' : '복사'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Ornament />
        </section>

        {/* ── 9. GUESTBOOK ── */}
        <section>
          <SectionHead en="Guestbook" kr="축하 메시지" />
          <div className="space-y-3 mb-6">
            {msgs.map((m, i) => (
              <div key={i} className="px-5 py-4 rounded-2xl" style={{ background: SURF }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold" style={{ color: INK }}>{m.name}</span>
                  <span className="v2-mono text-[10px]" style={{ color: SUBTLE }}>{m.date}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{m.msg}</p>
              </div>
            ))}
          </div>
          <form onSubmit={submitGb} className="space-y-3">
            <div className="flex items-center gap-2.5 rounded-full px-5 py-3" style={{ background: SURF, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
              <PenGlyph size={13} style={{ color: INK }} />
              <input value={gbName} onChange={(e) => setGbName(e.target.value)} placeholder="이름" className="w-20 bg-transparent text-sm outline-none border-r pr-2.5" style={{ color: INK, borderColor: LINE }} />
              <input value={gbMsg} onChange={(e) => setGbMsg(e.target.value)} placeholder="축하 메시지를 남겨주세요" className="flex-1 bg-transparent text-sm outline-none" style={{ color: INK }} />
            </div>
            <Button variant="tertiary" className="w-full">메시지 남기기</Button>
          </form>
          <Ornament />
        </section>

        {/* ── 10. CLOSING ── */}
        <section className="text-center pb-10">
          <Reveal className="overflow-hidden rounded-[28px] mb-10" style={{ boxShadow: SHADOW_CARD }}>
            <img src={PHOTOS[7]} alt="" crossOrigin="anonymous" className="w-full h-72 object-cover" />
          </Reveal>
          <Reveal>
            <Label en="Thank You" />
            <h2 className="v2-serif text-[26px] mt-3 leading-snug" style={{ color: INK }}>함께해 주셔서<br />감사합니다</h2>
            <p className="text-sm leading-[2] mt-5" style={{ color: MUTED }}>
              두 사람의 새로운 계절에<br />소중한 발걸음이 되어 주셔서<br />진심으로 감사드립니다.
            </p>
            <p className="v2-serif text-xl mt-7" style={{ color: INK }}>지훈 &amp; 서연</p>
          </Reveal>
          <div className="mt-12 pt-8 border-t" style={{ borderColor: LINE }}>
            <p className="v2-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: SUBTLE }}>
              Powered by <Serif>Invitique</Serif>
            </p>
            <button onClick={() => navigate('/create')} className="mt-4 v2-mono text-[11px] tracking-[0.1em] hover:opacity-60 transition-opacity" style={{ color: INK }}>
              나만의 청첩장 만들기 →
            </button>
          </div>
        </section>
      </div>

      {/* ── fixed bottom CTA ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 bg-white rounded-full pl-6 pr-2 py-2" style={{ boxShadow: SHADOW_SECONDARY }}>
          <span className="v2-serif text-2xl leading-none" style={{ color: INK }}>I</span>
          <Button variant="primary" onClick={() => navigate('/create')} className="!px-5 !py-2">청첩장 만들기</Button>
        </div>
      </div>
    </div>
  );
}
