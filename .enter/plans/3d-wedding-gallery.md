# 3D 웨딩 갤러리 청첩장 플랜

## Context
"청첩장을 3D 전시회로" — 커플 사진을 Three.js 원형 갤러리에 걸고, 채플·정원·밤하늘 배경을 전환, 꽃잎/별 파티클, 드래그 둘러보기·클릭 포커스·사진 업로드를 제공하는 프론트엔드 전용 체험.

---

## Design Direction
- **Aesthetic**: Luxury/refined — 금(Gold) + 블러시(Blush Rose) + 딥 네이비, Art Deco 라인
- **Font**: `Cormorant Garamond` (display/heading, 세리프 우아함) + `Lato` (body, 가독성)
- **Color Tokens**:
  - `--gold: 43 74% 58%` → 골드 프레임, 강조
  - `--blush: 347 55% 78%` → 블러시 핑크, 파티클
  - `--cream: 38 40% 94%` → 밝은 배경 텍스트 영역
  - `--deep: 228 32% 8%` → 전체 배경 베이스
  - `--ivory: 42 30% 97%` → 카드/패널 배경
- **Motion**: 프레이머 모션 stagger 인트로, Three.js OrbitControls, 부드러운 배경 전환
- **Memorable Detail**: 원형 벽에 액자 형태로 걸린 사진들 — 실제 갤러리처럼 소프트 스포트라이트 조명

---

## File Structure

### New Files
```
src/
  pages/Index.tsx                          ← 전체 앱 Shell (리팩터)
  components/
    gallery/
      GalleryCanvas.tsx                    ← Three.js 캔버스 컴포넌트
      useGallery.ts                        ← Three.js scene 관리 훅
      backgrounds.ts                       ← 3가지 배경 설정 (Chapel/Garden/Night)
      particles.ts                         ← 꽃잎·별 파티클 시스템
    WeddingHero.tsx                        ← 커플 이름·날짜·장소 헤더
    ThemeSwitcher.tsx                      ← 배경 테마 버튼 (3개)
    PhotoUploader.tsx                      ← 드래그&클릭 업로드 UI
    PhotoFocusModal.tsx                    ← 클릭 시 사진 확대 모달
  index.css                               ← 디자인 토큰 재정의
  tailwind.config.ts                      ← wedding 색상 확장
```

---

## Implementation Details

### 1. Dependencies (추가 설치)
- `three` + `@types/three` — 3D 렌더링
- Google Fonts: Cormorant Garamond + Lato (index.html `<link>` 태그)

### 2. Design Tokens (index.css)
```css
:root {
  --gold: 43 74% 58%;
  --gold-light: 43 74% 75%;
  --blush: 347 55% 78%;
  --deep: 228 32% 8%;
  --cream: 38 40% 94%;
  --ivory: 42 30% 97%;
  --shadow-gold: 0 8px 32px -8px hsl(43 74% 58% / 0.4);
  --gradient-hero: linear-gradient(160deg, hsl(228 32% 8%), hsl(228 28% 14%));
}
```
tailwind.config.ts에 `gold`, `blush`, `cream`, `deep`, `ivory` 색상 토큰 추가.

### 3. GalleryCanvas.tsx & useGallery.ts
- Three.js `WebGLRenderer` → `<canvas>` ref에 마운트
- **Photo Frames**: `PlaneGeometry(2, 2.8)` + `MeshStandardMaterial`(texture)
  - 원형 배치: 반지름 6, 각도 분할 (최대 8장)
  - 각 액자 주변에 얇은 금색 테두리 박스(`EdgesGeometry`)
  - 스포트라이트(`SpotLight`) 각 액자 상단에 배치
- **OrbitControls**: 드래그 회전, 핀치 줌, 수직 패닝 제한
- **Raycasting**: 클릭 시 가장 가까운 사진 맞추면 `onPhotoClick(index)` 콜백
- **Placeholder Frames**: 사진 없을 때 흰/블러시 placeholder + "+" 아이콘

### 4. backgrounds.ts
세 테마 정의:
- **Chapel**: ambientLight warm (#fff3c4), fog creamy, 바닥 마블 텍스처(절차적 생성), 스테인드글라스 컬러 포인트 라이트
- **Garden**: ambientLight soft green (#d4edda), 바닥 grass(절차적), 멀리 흐릿한 나무 실루엣 원기둥
- **Night Sky**: ambientLight deep blue (#0a0a2e), 별 파티클 대량, 달 SpotLight, 바닥 dark stone

### 5. particles.ts
- Chapel/Garden: 꽃잎(blush/pink) — BufferGeometry points, 위에서 아래 중력 애니메이션
- Night Sky: 별(white/gold) — 화면 가득 twinkle(opacity oscillation)

### 6. WeddingHero.tsx
- 커플 이름 (편집 가능 input — 클릭하면 이름 수정)
- 웨딩 날짜 + 장소 텍스트
- Cormorant Garamond 폰트, 금색 데코 라인

### 7. ThemeSwitcher.tsx
- Chapel(교회아이콘) / Garden(잎아이콘) / Night(별아이콘) 버튼
- 선택 시 Three.js scene 배경 전환 + 파티클 전환

### 8. PhotoUploader.tsx
- 드래그&드롭 영역 또는 파일 선택 버튼
- `FileReader` API로 base64 로컬 URL 생성
- 업로드된 이미지를 `Three.TextureLoader`로 갤러리 프레임에 적용
- 최대 8장 제한

### 9. PhotoFocusModal.tsx
- 사진 클릭 시 전체화면 모달
- 부드러운 framer-motion scale 애니메이션
- 좌/우 화살표로 이전/다음 탐색

---

## Key Technical Approach

```
WeddingPage (Index.tsx)
├── GalleryCanvas (full-screen Three.js)
│     ├── background (Chapel/Garden/Night)
│     ├── photo frames (PlaneGeometry + textures)
│     ├── gold frame edges (EdgesGeometry)
│     ├── spotlights per frame
│     ├── OrbitControls
│     └── particles
├── WeddingHero (overlay, top-center)
├── ThemeSwitcher (overlay, bottom-center)
├── PhotoUploader (overlay, bottom-right)
└── PhotoFocusModal (portal, on frame click)
```

All overlay UI는 `position: fixed/absolute`, Three.js canvas 위에 layering.

---

## Files to Modify
- `src/pages/Index.tsx` — 전면 재작성
- `src/index.css` — 디자인 토큰 추가
- `tailwind.config.ts` — 색상 확장
- `index.html` — Google Fonts 링크 추가

## Files to Create
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
1. Three.js canvas가 전체 화면을 채우고 드래그로 회전되는지
2. 3가지 배경 테마가 전환 시 부드럽게 바뀌는지
3. 사진 업로드 후 갤러리 프레임에 텍스처 적용되는지
4. 프레임 클릭 시 PhotoFocusModal 열리는지
5. 꽃잎/별 파티클이 테마에 맞게 동작하는지
6. 모바일(터치 드래그, 핀치 줌) 동작 확인
