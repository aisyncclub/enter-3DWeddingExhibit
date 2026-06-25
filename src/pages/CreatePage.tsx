import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../v2/v2.css';
import { Button, SHADOW_CARD, SHADOW_SECONDARY } from '../v2/Button';
import {
  InvitationView, DEFAULT_DATA, type InvitationData,
  INK, MUTED, SUBTLE, LINE, SURF,
} from '../v2/invitation';
import {
  ArrowLeftGlyph, CheckGlyph, BloomGlyph, ShareGlyph,
} from '../components/icons/EditorialIcons';

const MIN_PHOTOS = 4;

export default function CreatePage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [groomName, setGroomName] = useState('지훈');
  const [brideName, setBrideName] = useState('서연');
  const [groomEng, setGroomEng] = useState('JIHOON');
  const [brideEng, setBrideEng] = useState('SEOYEON');
  const [dateLine, setDateLine] = useState('2026 · 10 · 24');
  const [fullDate, setFullDate] = useState('2026년 10월 24일 토요일');
  const [time, setTime] = useState('오후 2시 · 입장 13:30');
  const [hall, setHall] = useState('라움 채플홀');
  const [addr, setAddr] = useState('서울 강남구 언주로 564');
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  // revoke object URLs on unmount
  useEffect(() => () => { photos.forEach((u) => u.startsWith('blob:') && URL.revokeObjectURL(u)); }, [photos]);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).filter((f) => f.type.startsWith('image/')).map((f) => URL.createObjectURL(f));
    setPhotos((prev) => [...prev, ...urls]);
  };
  const removePhoto = (i: number) => setPhotos((prev) => prev.filter((_, idx) => idx !== i));

  const ready = photos.length >= MIN_PHOTOS;

  const data: InvitationData = {
    groomName: groomName || '지훈',
    brideName: brideName || '서연',
    groomEng: groomEng || 'JIHOON',
    brideEng: brideEng || 'SEOYEON',
    dateLine, fullDate, time, hall, addr,
    photos: photos.length ? photos : DEFAULT_DATA.photos,
  };

  const copyLink = () => {
    const text = window.location.origin + '/demo';
    const fallback = () => {
      const el = document.createElement('textarea');
      el.value = text; el.style.position = 'fixed'; el.style.opacity = '0';
      document.body.appendChild(el); el.select();
      try { document.execCommand('copy'); } catch { /* noop */ }
      document.body.removeChild(el);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).catch(fallback); else fallback();
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  /* ── completed view: full invitation preview ── */
  if (done) {
    return (
      <div className="min-h-screen relative" style={{ background: '#fff' }}>
        <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3.5 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.85)', borderBottom: `1px solid ${LINE}` }}>
          <button onClick={() => setDone(false)} className="flex items-center gap-1.5 hover:opacity-60 transition-opacity">
            <ArrowLeftGlyph size={15} style={{ color: MUTED }} />
            <span className="v2-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>편집</span>
          </button>
          <span className="v2-serif text-base" style={{ color: INK }}>Invitique</span>
          <button onClick={copyLink} className="flex items-center gap-1.5 hover:opacity-60 transition-opacity">
            {copied ? <CheckGlyph size={14} style={{ color: INK }} /> : <ShareGlyph size={14} style={{ color: MUTED }} />}
            <span className="v2-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>{copied ? '복사됨' : '공유'}</span>
          </button>
        </nav>
        <div className="text-center pt-10 px-6">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: SURF }}>
            <BloomGlyph size={13} style={{ color: INK }} />
            <span className="v2-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: MUTED }}>청첩장 완성</span>
          </div>
          <h1 className="v2-serif text-2xl" style={{ color: INK }}>나만의 청첩장이 완성됐어요</h1>
          <p className="text-sm mt-2" style={{ color: MUTED }}>아래 미리보기를 확인하고 링크로 공유하세요.</p>
        </div>
        <InvitationView data={data} />
      </div>
    );
  }

  /* ── editor view: split (form + live preview) ── */
  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3.5 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.85)', borderBottom: `1px solid ${LINE}` }}>
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 hover:opacity-60 transition-opacity">
          <ArrowLeftGlyph size={15} style={{ color: MUTED }} />
          <span className="v2-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>홈</span>
        </button>
        <span className="v2-serif text-base" style={{ color: INK }}>청첩장 만들기</span>
        <span className="w-10" />
      </nav>

      <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-10 px-5 md:px-8 py-8">
        {/* ── FORM ── */}
        <div className="space-y-9">
          <header>
            <p className="v2-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: SUBTLE }}>Step · 사진과 정보</p>
            <h1 className="v2-serif text-[28px] mt-2 leading-snug" style={{ color: INK }}>사진만 올리면<br /><span className="italic">샘플처럼</span> 완성됩니다</h1>
            <p className="text-sm mt-3" style={{ color: MUTED }}>스토리·문구·레이아웃은 자동으로 채워집니다. 사진과 기본 정보만 입력하세요.</p>
          </header>

          {/* photo uploader */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <span className="v2-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: INK }}>사진 업로드</span>
              <span className="v2-mono text-[11px]" style={{ color: photos.length >= MIN_PHOTOS ? INK : SUBTLE }}>{photos.length} / 최소 {MIN_PHOTOS}장</span>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => addFiles(e.target.files)} />
            <button onClick={() => fileRef.current?.click()}
              className="w-full rounded-2xl py-10 flex flex-col items-center gap-2 transition-colors"
              style={{ background: SURF, border: `1.5px dashed ${LINE}` }}>
              <BloomGlyph size={26} style={{ color: INK }} />
              <span className="text-sm font-medium" style={{ color: INK }}>사진 선택하기</span>
              <span className="text-xs" style={{ color: SUBTLE }}>여러 장을 한 번에 올릴 수 있어요</span>
            </button>
            {photos.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {photos.map((url, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg group" style={{ boxShadow: SHADOW_SECONDARY }}>
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(5,26,36,0.7)' }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* couple info */}
          <section className="space-y-4">
            <span className="v2-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: INK }}>신랑 · 신부</span>
            <div className="grid grid-cols-2 gap-3">
              <Field label="신랑 이름" value={groomName} onChange={setGroomName} placeholder="지훈" />
              <Field label="신부 이름" value={brideName} onChange={setBrideName} placeholder="서연" />
              <Field label="신랑 영문" value={groomEng} onChange={setGroomEng} placeholder="JIHOON" />
              <Field label="신부 영문" value={brideEng} onChange={setBrideEng} placeholder="SEOYEON" />
            </div>
          </section>

          {/* wedding info */}
          <section className="space-y-3">
            <span className="v2-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: INK }}>예식 정보</span>
            <Field label="날짜 (대표 표기)" value={dateLine} onChange={setDateLine} placeholder="2026 · 10 · 24" />
            <Field label="날짜 (상세)" value={fullDate} onChange={setFullDate} placeholder="2026년 10월 24일 토요일" />
            <Field label="시간" value={time} onChange={setTime} placeholder="오후 2시 · 입장 13:30" />
            <Field label="예식장" value={hall} onChange={setHall} placeholder="라움 채플홀" />
            <Field label="주소" value={addr} onChange={setAddr} placeholder="서울 강남구 언주로 564" />
          </section>

          <div className="pt-2 pb-4">
            <Button variant="primary" className="w-full" onClick={() => ready && setDone(true)}
              style={!ready ? { opacity: 0.4, pointerEvents: 'none' } : undefined}>
              {ready ? '청첩장 완성하기' : `사진을 ${MIN_PHOTOS}장 이상 올려주세요`}
            </Button>
          </div>
        </div>

        {/* ── LIVE PREVIEW ── */}
        <div className="hidden md:block">
          <div className="sticky top-24">
            <p className="v2-mono text-[10px] tracking-[0.25em] uppercase mb-3 text-center" style={{ color: SUBTLE }}>Live Preview</p>
            <div className="mx-auto overflow-hidden" style={{ width: 340, height: 680, borderRadius: 36, border: `9px solid ${INK}`, boxShadow: SHADOW_CARD }}>
              <div className="h-full overflow-y-auto" style={{ background: '#fff' }}>
                <div style={{ zoom: 0.78 } as React.CSSProperties}>
                  <InvitationView data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[11px]" style={{ color: SUBTLE }}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full mt-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-shadow focus:shadow-md"
        style={{ background: SURF, color: INK, border: `1px solid ${LINE}` }} />
    </label>
  );
}
