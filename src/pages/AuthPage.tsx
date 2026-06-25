import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent } from '@enter-pro/analytics-sdk';
import '../v2/v2.css';
import { INK, MUTED, SUBTLE, LINE, SURF } from '../v2/invitation';
import { BloomGlyph } from '../components/icons/EditorialIcons';

const BG = '#FAF8F5';

export default function AuthPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user, loading } = useAuth();
  const redirect = params.get('redirect') || '/create';

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate(redirect, { replace: true });
  }, [user, loading, navigate, redirect]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('이메일과 비밀번호를 입력해 주세요.'); return; }
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        trackEvent('signup_completed', { eventType: 'conversion', properties: { redirect: redirect } });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        trackEvent('login_completed', { eventType: 'custom', properties: { redirect: redirect } });
      }
      navigate(redirect, { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '오류가 발생했습니다. 다시 시도해 주세요.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: BG }}>
      {/* logo mark */}
      <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-12 opacity-70 hover:opacity-100 transition-opacity">
        <BloomGlyph size={18} style={{ color: INK }} />
        <span className="v2-mono text-[12px] tracking-[0.3em] uppercase" style={{ color: INK }}>Invitique</span>
      </button>

      <div className="w-full max-w-sm">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className="v2-serif text-[28px]" style={{ color: INK }}>
            {mode === 'login' ? '로그인' : '회원가입'}
          </h1>
          <p className="text-[13px] mt-2" style={{ color: MUTED }}>
            {mode === 'login'
              ? 'AI 청첩장 만들기를 이용하려면 로그인이 필요합니다.'
              : '계정을 만들고 나만의 청첩장을 시작하세요.'}
          </p>
        </div>

        {/* form */}
        <form onSubmit={submit} className="space-y-3">
          <label className="block">
            <span className="text-[11px]" style={{ color: SUBTLE }}>이메일</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              autoComplete="email"
              className="w-full mt-1 rounded-2xl px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md"
              style={{ background: '#fff', color: INK, border: `1px solid ${LINE}` }}
            />
          </label>
          <label className="block">
            <span className="text-[11px]" style={{ color: SUBTLE }}>비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              className="w-full mt-1 rounded-2xl px-4 py-3 text-sm outline-none transition-shadow focus:shadow-md"
              style={{ background: '#fff', color: INK, border: `1px solid ${LINE}` }}
            />
          </label>

          {error && (
            <p className="text-[12px] text-center px-2" style={{ color: '#C0392B' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl py-3.5 text-sm font-medium tracking-wide transition-opacity hover:opacity-80 mt-2"
            style={{
              background: INK,
              color: '#FAF8F5',
              opacity: submitting ? 0.6 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? '처리 중…' : mode === 'login' ? '로그인' : '계정 만들기'}
          </button>
        </form>

        {/* mode toggle */}
        <div className="text-center mt-6">
          <p className="text-[12px]" style={{ color: MUTED }}>
            {mode === 'login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
            {' '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              className="font-medium underline underline-offset-2"
              style={{ color: INK }}
            >
              {mode === 'login' ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>

        {/* divider back link */}
        <div className="mt-10 text-center">
          <button onClick={() => navigate('/')} className="text-[11px]" style={{ color: SUBTLE }}>
            ← 메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
