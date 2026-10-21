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
- 작업 브랜치: `outdo-renewal-samples`. 2026-10-20 시안 2까지 main에 fast-forward 반영함(push는 안 함).

## 큰 그림 (2026-10-20 기준)

- 시안은 **3가지 방향**, 방향마다 **홈 1개 + 상세 1개** 세트.
- **시안 1 완료**: 홈 `/samples/home`, 상세 `/samples/detail` (상품: 브리즈 벨트).
- **시안 2 완료**: 홈 `/samples/draft2/home` (Velites 홈 참조), 상세 `/samples/draft2/detail` (Velites 상품 페이지 eu.velitessport.com/products/all-terrain 참조, 상품: 브리즈 벨트).
- **시안 3은 미정**. 사용자가 방향을 알려주기로 함.

### 시안 2 · 제품을 먼저 보여주고 이야기로 설득하는 구조

- 참고 원형: Velites 홈(eu.velitessport.com). 밝은 바탕 + 연회색 제품 카드(누끼 흰 바탕은 `mix-blend-multiply`로 지움).
- 홈: 공지 띠(흐름) → 제품 히어로 슬라이드 2장 → 파트너 로고 띠 → 제품 탭(BEST · 그립 · 벨트 · 니슬리브 · 손목 · 기타) → 카테고리 단색 타일 4장 → 종목 탭 → 브랜드 선언(큰 글씨) → TAILORED SERVICE 3단계(FIT SPACE · BRANDING MY BOX · COMING SOON) → SUFF 영상 → 알림 받기
- TAILORED 카드 이미지는 아임웹 CDN 주소 그대로(`cdn.imweb.me/thumbnail/20250410/…`). 이미지 한 장에 글자까지 박혀 있어 위쪽 사진만 보이게 자름(`STORY_PHOTO_RATIO`). WATCH는 영상이 아니라 현재 사이트 `/FitSpace` · `/BrandingMyBox` · `/41` 링크 (시안 1 홈 TAILORED 복원에도 같은 재료 사용 가능)
- 재료 대기(노란 '대체' 표시): 파트너 박스 로고(ABOUT PARTNER BOX) → `outdo-home-2.ts`의 `partners`에 넣으면 됨
- 컬러 점 색(`colorHex`)은 사진 보고 잡은 대략색 — 확인 필요
- 상세: 사진 2열 그리드(PC, 360 칸 포함) / 스와이프(모바일) + 따라오는 구매 패널(별점 · 두 색 스와치 · 허리 실측 사이즈 · 배송 상자) → 접는 메뉴(상세 정보 · 소재 · 특징 · 배송 및 반품) → 특징 카드 5장(상세 POINT · DETAIL 원문) → 사진 배너(제품 영상 자리, 노란 표시) → 벨트 비교표 → 리뷰 → 함께 보면 좋은 상품 → FAQ 2단. 구매 버튼을 지나치면 하단 고정 구매 바
- 예전 시안의 '가벼움 5 · 복압 4' 같은 점수 게이지(`breeze-renewal.ts`의 `gauges`)는 원본 근거가 없어 시안 2에서 쓰지 않음
- 샘플 목록 `/`(`src/app/page.tsx`)은 시안별 섹션 구조. `drafts` 배열에 시안을 추가하면 섹션이 생긴다. 각 섹션 = 왜 이 구조인지 요약 + 핵심 4가지 + 홈 · 상세 카드 2장.

### 시안 1 · 사람과 장비로 고르게 하는 구조

- 참고 원형은 나이키 스킴스 홈과 나이키 상품 페이지(IQ7158-601). **사용자에게 보이는 곳(목록, 페이지 라벨, 링크)에는 "SKIMS/스킴스"를 쓰지 않는다** — 사용자 요청. 코드 주석은 괜찮다.
- 홈(바탕 남색 `shop-navy` 하나, 가격은 BEST에만): 선수 12컷 그리드 → 브랜드 한 줄 → SUFF 영상(현재 홈 유튜브 배경 영상 `xOGnQCl-Dzs`, 포스터는 아임웹 CDN 주소 그대로 — 내려받지 않음) → 신제품 카드 2장 → BEST → 컬러별(색 블록) → 기어 가이드 → 카테고리(착용 사진 가로 넘김) → 종목별 → 박스 문의(B2B) → 알림 받기
- 홈 TAILORED SERVICE 3단계(FIT SPACE · BRANDING MY BOX · COMING SOON, WATCH 영상) 복원 예정 — 카드 사진 CDN 주소 · WATCH 유튜브 링크를 사용자에게 받는 중. 현재는 박스 문의 한 블록
- 상세: 갤러리(첫 장 착용컷, 360도 보기 칸 포함 / PC 세로 썸네일 / 모바일 스와이프) + 컬러 사진 칩 · 사이즈 버튼(허리 실측) · 구매 버튼 → 짧은 설명 + 핵심 수치 → "상품 상세 정보 보기" 팝업(특징 · 사양 · 리프팅 벨트 비교) → 접는 메뉴(`<details>`: 사이즈 & 팁, 배송 및 반품, 리뷰, FAQ, 추가 정보) → 함께 보면 좋은 상품

## 파일 지도

| 무엇 | 위치 |
|---|---|
| 샘플 목록 | `src/app/page.tsx` |
| 시안 1 홈 | `src/app/samples/home/page.tsx`, `src/components/home/SkimsHome.tsx`, 데이터 `src/data/samples/outdo-home.ts` |
| 시안 1 상세 | `src/app/samples/detail/page.tsx`, `src/components/product/SkimsProduct.tsx`, 데이터 `src/data/samples/skims-product.ts` |
| 시안 2 홈 | `src/app/samples/draft2/home/page.tsx`, `src/components/home/VelitesHome.tsx`, 데이터 `src/data/samples/outdo-home-2.ts` (상품은 `outdo-home.ts` 공유) |
| 시안 2 상세 | `src/app/samples/draft2/detail/page.tsx`, `src/components/product/VelitesProduct.tsx`, 데이터 `src/data/samples/velites-product.ts` (브리즈 벨트 재료는 시안 1 데이터 공유) |
| 발표자료 비밀번호 | `src/components/pitch/PitchGate.tsx` — `.env.local`의 `NEXT_PUBLIC_PITCH_PASSWORD`(git 제외, 사용자가 직접 입력). 맞히면 그 창을 닫을 때까지 안 물음. 정적 사이트라 가림막 수준 — 인터넷에 올리면 호스팅 비밀번호 보호 필요 |
| 발표자료 (마케터 대상 PT, 16장 — 10/21 critic 검토 반영: 예시 캠페인은 오렌지(핑크는 벨트 2종뿐), 시안 2 홈 = 브랜드 검색 · 직접 방문 · 신제품 광고용(본 상품 광고는 상세로), '공식' 파트너 · 조건 없는 당일 출고 · '광고비 없이' · '매주' 표현 금지, 데이터는 '쇼핑몰 데이터로도 시작 · 측정 켜면 더 · 빠른 곳은 1~2주지만 데이터 충분할 때만'. 그 외 — 사용자 피드백(10/21): '당신 상황이 이러니까'(진단형)가 아니라 '이런 광고는 이런 페이지에서 잘 된다'(플레이북형)로. 3 · 4장 광고별 도착 페이지 플레이북, 12장 '내부 데이터는 모르니 숫자로 OUTDO에 맞는 조합을 찾는다'. 그 외 — 13장 대회 캘린더(HYROX 서울 11/13~15 킨텍스 · CrossFit Open 2027 보도 기준 · SUFF 발표 전, 2026-10-21 확인, D-day 자동 계산), 14장 운영 · 유지보수: 아임웹 AI 도구 + Claude 주간 개선 제안) | `src/app/samples/pitch/page.tsx`, `src/components/pitch/PitchDeck.tsx` — 한 장 = 한 화면, 키보드 → · 스페이스로 넘김, 시안 화면은 휴대폰 크기 iframe. 개발 이야기 없이 '왜 이 구조가 광고 → 구매로 이어지나'만. 효과 수치 약속 안 함 |
| 360 보기 (시안 1 · 2 공용) | `src/components/product/Spin360.tsx` — 회전판 사진은 `skims-product.ts`의 `spinFrames` |
| 검토 모드(항상 전체 화면. 맨 위 노란 띠 → 메모 시트, PC · 모바일 같음. 폰 틀 화면 · '샘플 목록' 링크는 발표용으로 뺌. **메모 띠는 사용자 요청으로 꺼 둠 — `SHOW_NOTES = false`, 사용자가 다시 켜자고 할 때만 true.** 메모는 마케팅 형식(누구 · 하게 만드는 일 · 연결 광고 · 확인 지표)이고 '보기 어렵다'는 피드백이 있어 다시 켤 때 화면 정리 필요) | `src/components/renewal/ReviewMode.tsx`. 섹션에 `data-note="id"`를 달고 `SectionNote[]`(기존 · 바뀐 점 · 왜 · 참고)를 넘긴다 |
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

## 쓸 수 있는 스킬 (2026-10-20 전역 설치, `~/.claude/skills/`)

- `commerce-detail-page-planner` — 상세 기획(정보 순서 · 사용할 사진 · 추가 촬영 목록 · 빠진 근거). 시안 2 · 3 기획 단계에서.
- `commerce-product-detail` — 상세페이지 코드 작성. 기존 프로젝트 구조를 재사용하는 원칙이라 이 저장소와 맞음.
- `commerce-detail-page-copy` — 상세 문구. 근거 없는 문구는 생략하는 원칙(우리 "문구 지어내지 않기"와 같음).
- `commerce-ad-claim-compliance-kr` — 표시광고법 · 전자상거래법 필수 고지 점검. 시안 마무리 전에.
- `design-taste-frontend` (taste-skill) — 디자인 방향 3안 제시 + 브라우저 캡처로 보고 고치기. 시안 방향 잡을 때.
- 위 스킬들은 스마트스토어 · 쿠팡 기준 설명이 많다. 아임웹 고정 영역(상단 상품 영역 · 구매평 · Q&A)과 상세 HTML 제약은 우리가 따로 따진다.

## 검증 방법

- `npx tsc --noEmit && npx eslint src && yarn build`
- 화면 확인: `out/`을 `python3 -m http.server`로 띄우고 puppeteer-core(설치된 Chrome 사용)로 430px · 1440px 전체 캡처. 메모는 맨 위 노란 띠 "시안 메모 보기"를 눌러야 시트로 열린다. 정적 export라 주소는 `/samples/home.html` 형식. 가로 넘침(`scrollWidth - innerWidth`)도 확인.

## 남은 일 · 결정 대기

- [ ] 시안 메모의 `ref`("참고 · 나이키 스킴스 ○○", 홈 9곳 · 상세 2곳)를 뺄지 — 사용자 답 대기
- [ ] 목록 맨 아래에 "이전 작업" 섹션을 둘지 — 사용자 답 대기
- [ ] 시안 2 · 3 방향 — 사용자가 알려주기로 함
- 확인 필요 사실: 리프팅 벨트 너비(원본 이미지는 "11mm", 시안은 11cm), 타사 벨트 수치(무게 381g 외)
- 실제 촬영 필요: 홈 그리드 대체 사진 7칸, 시너지 그립 착용컷, 브리즈 벨트 컬러별(특히 핑크) 착용컷, 홈 카테고리 대체 사진 6칸, 홈 컬러별 착용컷(지금은 색 블록), 상세 360도 회전판 사진(컬러별 24~36장 → `skims-product.ts`의 `spinFrames`에 경로만 넣으면 실제 회전으로 바뀜)
- 아임웹 상세 HTML에서 `<details>` · 가로 스크롤 동작 여부 미검증
