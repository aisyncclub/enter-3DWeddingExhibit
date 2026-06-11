# 서비스 리디자인: 3D 갤러리 → 디지털 청첩장 제작 서비스

## 변경 이유
기존 3D 갤러리 청첩장 서비스에서 실제 온라인 청첩장 제작·쇼케이스 서비스로 전환.
3D 관련 코드 제거, 3가지 템플릿 기반 청첩장 쇼케이스 데모 신규 제작.

---

## 변경 범위

### 1. DemoPage (`src/pages/DemoPage.tsx`) — 완전 재작성
- 3D 갤러리 제거 (GalleryCanvas, ThemeSwitcher, PhotoUploader, PhotoFocusModal 임포트 삭제)
- 상단: 템플릿 탭 3개 (Blanc / Lumière / Nuit) — 선택 시 아래 청첩장 변경
- 본문: 해당 템플릿 스타일의 **완성된 샘플 청첩장** 스크롤 페이지
  - 커버 (사진 + 이름 + 날짜)
  - 초대 메시지
  - 일시·장소 정보
  - 사진 갤러리 (4장 그리드)
  - 혼주·RSVP
  - 푸터
- 하단 고정 바: "나만의 청첩장 만들기" CTA

### 2. 랜딩 슬라이드 — 문구/내용 업데이트

| 슬라이드 | 파일 | 변경 내용 |
|---|---|---|
| Cover (1) | `CoverSlide.tsx` | "청첩장을 / 아름답게" 문구, 부제 변경 |
| Concept (2) | `ConceptSlide.tsx` | "Beyond the Card" — 디지털 청첩장 제작 가치 |
| Templates (3) | `ThemesSlide.tsx` | 3D 테마 → 3가지 청첩장 템플릿 쇼케이스 |
| Features (4) | `ExperienceSlide.tsx` | 제작 단계 → 서비스 핵심 기능 3가지 |
| Gallery (5) | `PhotoSlide.tsx` | 문구만 청첩장 서비스 맥락으로 수정 |
| CTA (6) | `CTASlide.tsx` | 문구, 플랜 내용 업데이트 |

### 3. 3D 관련 파일 — 제거
- `src/components/gallery/` 폴더 전체 삭제
- `src/components/ThemeSwitcher.tsx` 삭제
- `src/components/PhotoUploader.tsx` 삭제
- `src/components/PhotoFocusModal.tsx` 삭제

---

## 3가지 템플릿 스펙

### Blanc (미니멀)
- 배경: 순백 `#FFFFFF`
- 텍스트: 딥브라운 `--deep`
- 포인트: 연한 세이지 라인
- 폰트: Pretendard 위주

### Lumière (크림 웜톤)
- 배경: 크림 `--cream`
- 텍스트: 딥브라운
- 포인트: 캐러멜 `--caramel`
- 폰트: Playfair Display 헤딩 + Pretendard 바디

### Nuit (다크 엘레강스)
- 배경: 딥브라운 `--deep`
- 텍스트: 크림 `--cream`
- 포인트: 골드 `--gold`
- 폰트: Playfair Display

---

## 재사용할 기존 요소
- `FilmGrain`, `MarqueeText` — 그대로 유지
- `LookbookLanding` 구조 — 슬라이드 내용만 교체
- 디자인 토큰 (index.css, tailwind.config.ts) — 변경 없음
- 실제 웨딩 사진 OSS URL 8개 — 그대로 활용

---

## 검증
1. `/` — 6슬라이드 네비 정상, 문구 업데이트 확인
2. `/demo` — 템플릿 탭 전환 시 청첩장 스타일 변경 확인
3. 3D 관련 임포트 오류 없음 (lint pass)
