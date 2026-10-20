# OUTDO 리뉴얼 시안

크로스핏 장비 브랜드 OUTDO(https://www.outdothebest.com/, 아임웹 쇼핑몰)의 홈 · 상세페이지 리뉴얼 시안을 Next.js로 만드는 프로젝트.
저장소 이름(cafe_sharing)과 `src/app/cafe`, `src/components/sections`, `src/data/menu.ts` 등은 초기 카페 홈페이지 작업의 흔적이고 현재 작업과 무관하다.

## 실행

```bash
yarn install
yarn dev          # http://localhost:4000 (포트 4000 고정)
yarn build        # 정적 export → out/
```

- 개발 서버를 띄운 뒤 `yarn build`를 하면 `.next` 캐시가 꼬여 turbopack runtime 오류가 난다 → `rm -rf .next` 후 다시 빌드.
- 작업 브랜치: `outdo-renewal-samples` (main에는 아직 병합 안 함).

## 큰 그림 (2026-10-20 기준)

- 시안은 **3가지 방향**, 방향마다 **홈 1개 + 상세 1개** 세트.
- **시안 1 완료**: 홈 `/samples/home`, 상세 `/samples/detail` (상품: 브리즈 벨트).
- **시안 2 · 3은 미정**. 사용자가 방향을 알려주기로 함. 정해지면 같은 방식(홈 + 상세 세트, 목록에 섹션 추가)으로 만든다.
- 샘플 목록 `/`(`src/app/page.tsx`)은 시안별 섹션 구조. `drafts` 배열에 시안을 추가하면 섹션이 생긴다. 각 섹션 = 왜 이 구조인지 요약 + 핵심 4가지 + 홈 · 상세 카드 2장.

### 시안 1 · 사람과 장비로 고르게 하는 구조

- 참고 원형은 나이키 스킴스 홈과 나이키 상품 페이지(IQ7158-601). **사용자에게 보이는 곳(목록, 페이지 라벨, 링크)에는 "SKIMS/스킴스"를 쓰지 않는다** — 사용자 요청. 코드 주석은 괜찮다.
- 홈: 선수 12컷 그리드 → 브랜드 한 줄 → 신제품 카드 2장 → BEST → 컬러별 → 그립 · 니슬리브 가이드 → 카테고리 → 종목별 → SUFF 파트너 → 박스 문의(B2B) → 알림 받기
- 상세: 갤러리(PC 세로 썸네일 / 모바일 스와이프) + 컬러 사진 칩 · 사이즈 버튼(허리 실측) · 구매 버튼 → 짧은 설명 + 핵심 수치 → "상품 상세 정보 보기" 팝업(특징 · 사양 · 리프팅 벨트 비교) → 접는 메뉴(`<details>`: 사이즈 & 팁, 배송 및 반품, 리뷰, FAQ, 추가 정보) → 함께 보면 좋은 상품

## 파일 지도

| 무엇 | 위치 |
|---|---|
| 샘플 목록 | `src/app/page.tsx` |
| 시안 1 홈 | `src/app/samples/home/page.tsx`, `src/components/home/SkimsHome.tsx`, 데이터 `src/data/samples/outdo-home.ts` |
| 시안 1 상세 | `src/app/samples/detail/page.tsx`, `src/components/product/SkimsProduct.tsx`, 데이터 `src/data/samples/skims-product.ts` |
| 검토 모드(PC: 폰 틀 iframe + 노란 메모 패널, 모바일: 메모 시트) | `src/components/renewal/ReviewMode.tsx`. 섹션에 `data-note="id"`를 달고 `SectionNote[]`(기존 · 바뀐 점 · 왜 · 참고)를 넘긴다 |
| OUTDO 헤더 · 푸터 클론 | `src/components/shop/ShopHeader.tsx`, `ShopFooter.tsx` |
| 브리즈 벨트 원본 데이터(가격 · 리뷰 · 배송) | `src/data/samples/breeze-belt.ts` |
| 브리즈 벨트 공통 재료(사진 크롭 · 컬러 · 사이즈 · 엠버서더 · FAQ · 비교) | `src/data/samples/breeze-renewal.ts` |
| 사진 | `public/assets/breeze-belt/`(원본 상세 18장 + `crops/`), `public/assets/outdo-home/products`(상품 · CDN이 WebP를 줘서 확장자와 실제 포맷이 다름), `site/`(배너), `standin/`(Pexels 대체 사진) |
| 이전 작업(목록에서는 뺐지만 페이지는 살아 있음) | `/samples/breeze-belt`(원본 클론), `/samples/v2/skims`, `/samples/v2/spec`, `/samples/layouts`, `/samples/renewal/[id]` |
| 리서치 문서 | `docs/reference-analysis.html`, `docs/outdo-renewal-brief.html`, `docs/references/` |

## 작업 원칙 (사용자와 합의된 것)

- **문구를 지어내지 않는다.** 현재 OUTDO 사이트 · 상세 이미지에 있는 문구 · 수치, 구매평 원문만 옮긴다. 출처를 데이터 파일 주석에 적는다. 근거 없는 주장(예: "교환 1순위")이나 없는 고시 항목을 채워 넣지 않는다.
- **사진이 없으면 무료 사진(Pexels)으로 채우고 노란 "대체 사진" 표시를 단다** (`Photo.standIn`). 실제 촬영이 필요한 자리 목록이 된다.
- **아임웹으로 옮길 수 있는지**를 항상 염두에 둔다. 상단 상품 영역 · 구매평 · Q&A는 아임웹 고정 영역이다.
- 사용자가 "코드 수정하지 말고 이야기만"이라고 하면 코드를 건드리지 않는다.
- 응답은 한국어, 개발 용어보다 결과 중심으로 설명한다.
- 커밋은 사용자가 요청할 때만. `.omc/`(OMC 작업 기록)는 커밋하지 않는다(`.gitignore` 처리됨).

## 검증 방법

- `npx tsc --noEmit && npx eslint src && yarn build`
- 화면 확인: `out/`을 `python3 -m http.server`로 띄우고 puppeteer-core(설치된 Chrome 사용)로 430px · 1440px 전체 캡처. PC는 검토 모드가 기본이라 "메모 끄고 전체 화면으로 보기" 버튼을 눌러야 실제 레이아웃이 보인다. 가로 넘침(`scrollWidth - innerWidth`)도 확인.

## 남은 일 · 결정 대기

- [ ] 시안 메모의 `ref`("참고 · 나이키 스킴스 ○○", 홈 9곳 · 상세 2곳)를 뺄지 — 사용자 답 대기
- [ ] 목록 맨 아래에 "이전 작업" 섹션을 둘지 — 사용자 답 대기
- [ ] 시안 2 · 3 방향 — 사용자가 알려주기로 함
- 확인 필요 사실: 리프팅 벨트 너비(원본 이미지는 "11mm", 시안은 11cm), 타사 벨트 수치(무게 381g 외)
- 실제 촬영 필요: 홈 그리드 대체 사진 7칸, 시너지 그립 착용컷, 브리즈 벨트 컬러별(특히 핑크) 착용컷
- 아임웹 상세 HTML에서 `<details>` · 가로 스크롤 동작 여부 미검증
