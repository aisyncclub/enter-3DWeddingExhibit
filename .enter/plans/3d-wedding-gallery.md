# Plan: 인증 + AI 청첩장 문구 자동 생성

## 구현 범위

### 1. 인증 (Authentication)
- Supabase email/password 로그인 + 회원가입
- `/auth` 페이지 (v2 디자인 시스템 적용)
- `/create` 라우트 → 비로그인 시 `/auth?redirect=/create` 로 리다이렉트
- AuthContext로 전역 세션 관리

### 2. AI 문구 생성 (MiniMax M3)
- Edge Function `generate-invitation-copy` — stream: false JSON 반환
- 입력: groomName, brideName, storyHint (선택적 짧은 설명)
- 출력: `{ introLines: string[], story: StoryChapter[] }`
- CreatePage에 "AI 문구 자동 생성" 섹션 + 생성 버튼 + 로딩 상태
- 생성된 인트로·스토리가 InvitationView 미리보기에 실시간 반영

### 3. 데이터 모델 확장
- `invitation.tsx`에 `customIntro?: string[]`, `customStory?: StoryChapter[]` 추가
- InvitationView 내부에서 `data.customIntro ?? INTRO_LINES` 방식으로 폴백

---

## 파일 변경 목록

| 파일 | 작업 |
|------|------|
| `src/contexts/AuthContext.tsx` | 신규 — Supabase auth 세션 관리 |
| `src/pages/AuthPage.tsx` | 신규 — 로그인/회원가입 UI |
| `src/v2/invitation.tsx` | 수정 — customIntro, customStory 필드 추가 |
| `src/pages/CreatePage.tsx` | 수정 — 인증 가드 + AI 생성 UI 추가 |
| `src/router.tsx` | 수정 — `/auth` 라우트 추가 |
| `supabase/functions/generate-invitation-copy/index.ts` | 신규 — Edge Function |
| `src/main.tsx` | 수정 — AuthProvider 래핑 |

---

## 검증
- `/create` 비로그인 접근 → `/auth`로 리다이렉트
- 로그인 후 `/create` 복귀
- AI 생성 버튼 클릭 → 로딩 → 인트로/스토리 자동 입력
- 생성된 문구가 우측 미리보기에 즉시 반영
