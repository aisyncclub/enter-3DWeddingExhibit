# 3D 웨딩 갤러리 — 서비스 랜딩 + 데모 플랜

## Context
"청첩장을 3D 전시회로" 서비스를 소개하는 랜딩페이지와, 실제 체험 가능한 3D 갤러리 데모 페이지 두 가지를 제작.
- `/` → 서비스 랜딩 페이지 (서비스 소개, 기능 하이라이트, 데모 CTA)
- `/demo` → 3D 웨딩 갤러리 데모 (실제 체험)

---

## Design Direction
- **Aesthetic**: Luxury editorial — Art Deco 금(Gold) + 딥 네이비 + 블러시(Blush Rose)
- **Font**: `Cormorant Garamond` (display, 우아한 세리프) + `Lato` (body)
- **Color Tokens**:
  - `--gold: 43 74% 58%` — 골드 강조
  - `--gold-light: 43 74% 75%`
  - `--blush: 347 55% 78%` — 블러시 핑크
  - `--deep: 228 32% 8%` — 다크 배경
  - `--cream: 38 40% 94%` — 밝은 섹션 배경
  - `--ivory: 42 30% 97%`
  - `--shadow-gold: 0 8px 32px -8px hsl(43 74% 58% / 0.4)`

---

## Routes
```
/        → LandingPage  (서비스 소개)
/demo    → DemoPage     (3D 갤러리 체험)
```

---

## File Structure

### New Pages
```
src/pages/
  Index.tsx          ← 랜딩 페이지 (전면 재작성)
  DemoPage.tsx       ← 3D 갤러리 데모 페이지
```

### New Components
```
src/components/
  landing/
    HeroSection.tsx           ← 풀스크린 히어로 (타이틀 + CTA)
    FeaturesSection.tsx       ← 3대 기능 소개 (3D갤러리, 배경전환, 파티클)
    ThemePreviewSection.tsx   ← 채플/정원/밤하늘 3가지 테마 미리보기 카드
    HowItWorksSection.tsx     ← 3단계 사용 플로우 (업로드→커스텀→공유)
    PricingSection.tsx        ← 건당 판매 플랜 (기본/프리미엄)
    FooterSection.tsx         ← 푸터
  gallery/
    GalleryCanvas.tsx         ← Three.js 캔버스
    useGallery.ts             ← Three.js scene 훅
    backgrounds.ts            ← Chapel/Garden/Night 설정
    particles.ts              ← 꽃잎·별 파티클
  WeddingHero.tsx             ← 커플 이름·날짜 오버레이
  ThemeSwitcher.tsx           ← 테마 전환 버튼
  PhotoUploader.tsx           ← 사진 업로드 UI
  PhotoFocusModal.tsx         ← 사진 클릭 확대 모달
```

---

## Landing Page (`/`) — Sections

### 1. HeroSection
- 풀스크린, 딥 네이비 배경
- 중앙: `"청첩장을 전시회로"` 대형 Cormorant Garamond 타이포
- 서브: `"사진 한 장이 아니라, 3D 공간 경험으로 전달하세요"`
- CTA 버튼: `"데모 체험하기"` → `/demo` 이동
- 배경: Three.js 미니 파티클 (별/꽃잎 떠다니는 효과) 또는 CSS 파티클
- framer-motion stagger reveal 애니메이션

### 2. FeaturesSection
- 3개 피처 카드:
  - **3D 갤러리**: 원형 전시 공간에 사진 배치
  - **3가지 테마**: 채플·정원·밤하늘 배경 전환
  - **파티클 효과**: 꽃잎·별 파티클 앰비언스
- 카드 hover → 금색 글로우 테두리

### 3. ThemePreviewSection
- 채플 / 정원 / 밤하늘 — 3개 세로 카드
- 각각 테마 특색 색상 그라디언트 + 아이콘
- 클릭 시 `/demo?theme=chapel` 등으로 이동

### 4. HowItWorksSection
- 3단계 타임라인:
  1. 사진 업로드 (최대 8장)
  2. 테마·커플 정보 설정
  3. 링크 공유
- 심플한 넘버링 + 아이콘

### 5. PricingSection
- 기본 (무료 체험) / 스탠다드 / 프리미엄 플랜 카드
- 프리미엄에 골드 강조

### 6. FooterSection
- 로고 + 링크 + 카피라이트

---

## Demo Page (`/demo`) — 3D Gallery

### Layout
```
DemoPage (full screen)
├── GalleryCanvas (Three.js, full screen)
│     ├── background (Chapel/Garden/Night)
│     ├── photo frames (PlaneGeometry + textures, circular layout)
│     ├── gold frame edges (EdgesGeometry)
│     ├── spotlights per frame
│     ├── OrbitControls (drag/pinch)
│     └── particles (petals or stars)
├── WeddingHero (overlay, top-center)
│     └── 커플 이름·날짜·장소 (클릭 편집 가능)
├── ThemeSwitcher (overlay, bottom-center)
├── PhotoUploader (overlay, bottom-right FAB)
├── PhotoFocusModal (portal, on frame click)
└── Back to Landing (overlay, top-left)
```

### GalleryCanvas.tsx & useGallery.ts
- Three.js `WebGLRenderer` → `<canvas>` ref 마운트
- Photo Frames: `PlaneGeometry(2, 2.8)` + `MeshStandardMaterial`(texture)
  - 원형 배치: 반지름 6, 최대 8장 각도 분할
  - 금색 테두리 (`EdgesGeometry` + `LineSegments`)
  - 각 프레임 상단 `SpotLight`
- OrbitControls: 드래그 회전, 핀치 줌, 수직 패닝 제한
- Raycasting: 클릭 → `onPhotoClick(index)` 콜백
- Placeholder: 사진 없을 때 블러시 톤 + 업로드 안내

### backgrounds.ts
- **Chapel**: warm ambient (#fff3c4), creamy fog, 마블 바닥
- **Garden**: soft green ambient, 절차적 grass 바닥, 나무 실루엣
- **Night Sky**: deep blue ambient, 별 파티클 대량, 달 SpotLight

### particles.ts
- Chapel/Garden: 꽃잎(blush/pink) — BufferGeometry, 중력 낙하
- Night Sky: 별(white/gold) — opacity oscillation twinkle

---

## Dependencies (추가 설치)
- `three` + `@types/three`

## Files to Modify
- `src/pages/Index.tsx` — 랜딩 페이지로 전면 재작성
- `src/router.tsx` — `/demo` 라우트 추가
- `src/index.css` — 디자인 토큰 추가
- `tailwind.config.ts` — gold/blush/deep/cream/ivory 색상 확장
- `index.html` — Google Fonts (Cormorant Garamond + Lato) 링크

## Files to Create
- `src/pages/DemoPage.tsx`
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/FeaturesSection.tsx`
- `src/components/landing/ThemePreviewSection.tsx`
- `src/components/landing/HowItWorksSection.tsx`
- `src/components/landing/PricingSection.tsx`
- `src/components/landing/FooterSection.tsx`
- `src/components/gallery/GalleryCanvas.tsx`
- `src/components/gallery/useGallery.ts`
- `src/components/gallery/backgrounds.ts`
- `src/components/gallery/particles.ts`
- `src/components/WeddingHero.tsx`
- `src/components/ThemeSwitcher.tsx`
- `src/components/PhotoUploader.tsx`
- `src/components/PhotoFocusModal.tsx`

---

## Verification
1. `/` 랜딩 페이지 — 모든 섹션 렌더링, CTA 클릭 시 `/demo` 이동
2. `/demo` — Three.js canvas 전체화면, 드래그 회전
3. 배경 테마 3가지 전환 동작
4. 사진 업로드 → 갤러리 프레임 텍스처 적용
5. 프레임 클릭 → PhotoFocusModal 열림
6. 파티클 테마별 동작
7. 모바일 터치/핀치 동작
