// 브리즈 벨트 상세페이지 레이아웃 시안 4종 (와이어프레임)
// 모든 시안은 같은 재료(휘영 필수 요소)를 쓰고, "무엇을 먼저 설득하느냐"만 다르다.
// 수치·후기 문장은 현재 상세페이지(src/data/samples/breeze-belt.ts)에서 가져온 것만 사용.

export type BlockKind = "copy" | "photo" | "spin" | "diagram" | "ui" | "review";

export type ReqKey = "spin" | "angles" | "material" | "structure" | "chip" | "copy" | "look" | "compare";

export const requirements: { key: ReqKey; label: string }[] = [
  { key: "spin", label: "360° 드래그 뷰" },
  { key: "angles", label: "모든 각도 (앞·뒤·옆·위·아래)" },
  { key: "structure", label: "확대샷 + 구조도" },
  { key: "material", label: "소재 클로즈업 (영상 X)" },
  { key: "chip", label: "컬러칩" },
  { key: "look", label: "착장 + 컬러 조합" },
  { key: "copy", label: "기억에 남는 카피" },
  { key: "compare", label: "모델 비교" },
];

export interface WireBlock {
  kind: BlockKind;
  stage: number;
  title: string;
  body: string;
  copy?: string;
  items?: string[];
  cols?: 1 | 2 | 3;
  size?: "sm" | "md" | "lg";
  /** OUTDO만의 차별 블록 */
  key?: boolean;
  req?: ReqKey[];
  why: string;
  marketing?: string;
  ref?: string;
  shoot?: string;
  note?: string;
}

export interface LayoutDraft {
  id: string;
  letter: string;
  name: string;
  tagline: string;
  target: string;
  firstScreen: string;
  message: string;
  stages: { name: string; goal: string }[];
  pros: string[];
  risks: string[];
  blocks: WireBlock[];
}

const sizeBlock: WireBlock = {
  kind: "ui",
  stage: 2,
  title: "사이즈 + 엠버서더 착용 사이즈",
  body: "허리둘레 표 + 키·체중별 실제 착용 예시",
  items: ["XS 68~83cm", "S 73~88cm", "M 80~93cm", "L 83~98cm"],
  cols: 2,
  size: "sm",
  why: "벨트는 사이즈 실패가 교환·반품으로 바로 이어집니다. 옵션을 고르기 직전에 한 번 더 확인시킵니다.",
  ref: "현재 상세 SIZE INFO · 엠버서더 착용 사이즈",
};

const materialBlock = (stage: number, why: string): WireBlock => ({
  kind: "photo",
  stage,
  title: "소재 클로즈업 카드",
  body: "부위별 확대 사진 + 소재명 + 한 줄 설명. 영상 대신 사진으로",
  items: ["외피 원단", "내부 패드", "벨크로", "버클 · 링"],
  cols: 2,
  size: "md",
  req: ["material"],
  why,
  ref: "나이키 스킴스 컬렉션 가이드, 핀 2eX96xpKR · 5yAMNGcUw (원단 스와치)",
  shoot: "부위별 매크로 촬영 4컷",
});

export const drafts: LayoutDraft[] = [
  {
    id: "a",
    letter: "A",
    name: "증명형",
    tagline: "써본 사람의 말로 시작한다",
    target: "광고·인스타로 처음 알게 된 크로스핏터. OUTDO를 아직 잘 모르는 사람",
    firstScreen: "실제 구매평 한 문장 + 별점",
    message: "“얘만 차면 자꾸 PR해요” — 구매평 5.0 · 48개",
    stages: [
      { name: "믿게 한다", goal: "상세까지 온 사람의 첫 질문 '진짜 좋아?'에 먼저 답한다" },
      { name: "확인시킨다", goal: "후기에서 들은 말을 제품으로 직접 증명한다" },
      { name: "고르게 한다", goal: "비교·컬러·사이즈로 결정 직전의 망설임을 없앤다" },
    ],
    pros: [
      "이미 가진 자산(구매평 48개, 평균 5.0)을 바로 쓴다",
      "광고 문구와 상세 첫 화면을 똑같이 맞추기 쉽다",
      "첫 화면에 신규 촬영이 필요 없다",
    ],
    risks: ["구매평 수가 더 쌓이기 전에는 숫자가 약해 보일 수 있다", "BOLD 브랜드 감도는 가장 약하게 드러난다"],
    blocks: [
      {
        kind: "copy",
        stage: 0,
        title: "후기 한 문장 히어로",
        copy: "“얘만 차면\n자꾸 PR해요”",
        body: "실제 구매평 인용 + ★5.0 · 구매평 48개 + 착용컷 1장",
        size: "lg",
        req: ["copy"],
        why: "현재 상세는 후기가 4번째 이미지에서야 나옵니다. 상세까지 내려온 사람은 이미 관심이 있고, 남은 질문은 '진짜 좋아?' 하나라서 그 답을 맨 위로 올렸습니다.",
        marketing: "광고 문구를 이 문장과 똑같이 맞춥니다. 광고에서 본 말이 첫 화면에 그대로 있으면 들어오자마자 나가는 비율이 줄어듭니다.",
        ref: "현재 상세 '써본 사람들이 인정한 리얼 후기', 핀 36xoGv6DI (볼드 카피)",
      },
      {
        kind: "review",
        stage: 0,
        title: "후기 3가지 주제",
        body: "주제별 대표 후기 1개 + 포토리뷰 썸네일",
        items: ["복압을 꽉 잡아준다", "가볍고 걸리적거리지 않는다", "벨크로가 안 풀린다"],
        cols: 1,
        size: "md",
        why: "후기 48개를 많이 보여주는 것보다, 반복해서 나오는 말 3개로 묶는 게 기억에 남습니다. 이 3개가 아래 구조도의 번호 3개와 그대로 이어집니다.",
        marketing: "주제 3개 = 광고 세트 3개. 어떤 주제의 반응이 가장 좋은지 테스트해서 히어로 문장을 고릅니다.",
      },
      {
        kind: "spin",
        stage: 1,
        title: "360° 드래그 뷰",
        body: "둘레 한 바퀴 회전 + 컬러 전환 버튼 3개",
        size: "lg",
        key: true,
        req: ["spin"],
        why: "후기를 읽고 나면 '정말 그런지 직접 보자'는 마음이 생깁니다. 360°를 맨 위가 아니라 여기에 둔 이유입니다.",
        shoot: "턴테이블 회전 촬영 24~36컷 × 3컬러",
      },
      {
        kind: "photo",
        stage: 1,
        title: "멀티앵글 정지컷",
        body: "360°가 못 보여주는 위·아래와 멈춰서 볼 각도",
        items: ["정면", "후면", "측면", "위", "아래", "펼친 상태"],
        cols: 3,
        size: "md",
        req: ["angles"],
        why: "360°는 둘레만 돕니다. 위·아래와 펼친 모습은 정지컷으로 보충합니다.",
        ref: "핀 2FcOXBDas (발렌시아가 멀티앵글), 3rh1g1JZa (ARES)",
        shoot: "정지컷 6컷",
      },
      {
        kind: "diagram",
        stage: 1,
        title: "후기 ↔ 부위 구조도",
        body: "펼친 벨트 확대컷 위에 번호 콜아웃",
        items: ["① 고밀도 외피 → 복압", "② 슬림 두께 6.9mm → 가벼움", "③ 벨크로 락 → 안 풀림", "④ 링 · 버클"],
        cols: 1,
        size: "lg",
        key: true,
        req: ["structure"],
        why: "위의 후기 3가지가 벨트 어느 부위에서 나오는지 이어줍니다. '좋다더라'가 '이래서 좋구나'로 바뀌는 지점입니다.",
        ref: "핀 183xm30pO (Nothing 분해도), 4nFudRgUE (스펙 라인 드로잉)",
      },
      materialBlock(1, "구조도에서 짚은 부위를 손으로 만질 거리까지 당겨 보여줍니다. 온라인에서 '만져보고 싶다'를 대신하는 블록입니다."),
      {
        kind: "ui",
        stage: 2,
        title: "리프팅 벨트 vs 브리즈 벨트",
        body: "같은 브랜드 두 모델 비교표. 각 상세로 이동",
        items: ["두께 9mm vs 6.9mm", "주 용도", "이런 분께 추천"],
        cols: 1,
        size: "md",
        req: ["compare"],
        why: "확신이 생긴 뒤 마지막 고민은 '내 운동엔 어떤 게 맞지?'입니다. 비교표로 답하고, 리프팅 벨트가 맞는 사람도 OUTDO 안에서 잡습니다.",
        marketing: "두 벨트 함께 사기(번들) 프로모션의 근거가 됩니다.",
        ref: "Velites 그립 Compare models 표, 현재 상세 '아웃두 벨트 한눈에 비교하기'",
      },
      {
        kind: "ui",
        stage: 2,
        title: "컬러칩 + 컬러별 착용컷",
        body: "큰 컬러칩을 누르면 그 컬러 착용컷으로 바뀜",
        items: ["오렌지", "블루", "핑크"],
        cols: 3,
        size: "md",
        req: ["chip", "look"],
        why: "여기까지 왔으면 남은 선택은 컬러입니다. 구매 직전에 둬서 옵션 선택으로 바로 이어지게 했습니다.",
        ref: "핀 6juqTcFk5 (컬러 팔레트 칩)",
      },
      sizeBlock,
      {
        kind: "review",
        stage: 2,
        title: "전체 구매평 · FAQ",
        body: "구매평 목록 + 자주 묻는 질문 접기/펼치기",
        size: "sm",
        why: "아직 망설이는 사람을 위한 마지막 안전망입니다. 더 읽고 싶은 사람만 내려옵니다.",
      },
    ],
  },
  {
    id: "b",
    letter: "B",
    name: "탐색형",
    tagline: "말보다 제품을 먼저 돌려보게 한다",
    target: "브랜드 사이트로 직접 들어와 제품을 꼼꼼히 뜯어보는 사람, 글로벌 방문자",
    firstScreen: "풀폭 360° 드래그 뷰",
    message: "“직접 돌려보세요. 숨긴 각도가 없습니다.”",
    stages: [
      { name: "보여준다", goal: "설명 없이 제품부터 손으로 돌려보게 한다" },
      { name: "이해시킨다", goal: "전체 → 부위 → 소재 → 성능 순으로 좁혀 들어간다" },
      { name: "고르게 한다", goal: "컬러·모델·사이즈를 정하게 한다" },
    ],
    pros: [
      "가장 강한 차별점(360°)이 첫 화면에 온다",
      "휘영 님 필수 요소를 가장 많이, 순서대로 담는다",
      "글로벌 사이트로 그대로 확장할 수 있다",
    ],
    risks: ["360° 촬영·구현이 안 되면 첫 화면이 무너진다", "처음 보는 사람에겐 '왜 사야 하는지'가 늦게 나온다"],
    blocks: [
      {
        kind: "spin",
        stage: 0,
        title: "360° 드래그 뷰 (풀폭)",
        copy: "숨긴 각도는\n없습니다.",
        body: "첫 화면 전체를 회전 뷰로. 컬러 버튼으로 바로 전환. '드래그해서 돌려보세요' 안내",
        size: "lg",
        key: true,
        req: ["spin", "copy"],
        why: "휘영 님 필수 1순위이고, 열어본 경쟁사·레퍼런스 어디에도 없던 요소입니다. 가장 강한 차별점을 가장 먼저 둡니다. 손가락으로 돌리기 시작하면 페이지에 머무는 시간이 늘어납니다.",
        marketing: "360° 화면을 그대로 녹화해 릴스·쇼츠 광고로 씁니다. '사이트에서 직접 돌려보세요'가 클릭할 이유가 됩니다.",
        shoot: "턴테이블 회전 촬영 24~36컷 × 3컬러",
      },
      {
        kind: "photo",
        stage: 0,
        title: "멀티앵글 6컷",
        body: "멈춰서 보고 싶은 각도를 정지컷 그리드로",
        items: ["정면", "후면", "좌측", "우측", "위", "아래"],
        cols: 3,
        size: "md",
        req: ["angles"],
        why: "360°는 둘레만 돕니다. 위·아래와 멈춰서 보고 싶은 각도를 정지컷으로 채워, '모든 각도' 요구를 여기서 끝냅니다.",
        ref: "핀 2FcOXBDas (발렌시아가 멀티앵글), 3rh1g1JZa (ARES), Velites 2×2 갤러리",
        shoot: "정지컷 6컷",
      },
      {
        kind: "diagram",
        stage: 1,
        title: "확대샷 + 구조도",
        body: "펼친 벨트 위 번호 콜아웃, 번호를 누르면 해당 부위 확대",
        items: ["① 외피", "② 내부 패드", "③ 벨크로 락", "④ 링 · 버클", "⑤ 로고 라벨"],
        cols: 1,
        size: "lg",
        key: true,
        req: ["structure"],
        why: "전체를 다 본 다음 부위로 쪼갭니다. 넓게 보고 좁혀 들어가는 순서라 읽는 흐름이 자연스럽습니다.",
        ref: "핀 183xm30pO (Nothing 분해도), 5EJ03vIiP (제품 콜아웃 UI)",
      },
      materialBlock(1, "구조도와 같은 번호를 달아, 위에서 본 부위를 아래에서 확대해 보는 흐름으로 만듭니다."),
      {
        kind: "ui",
        stage: 1,
        title: "성능 게이지",
        body: "막대·도트로 상대 수치를 표시, 리프팅 벨트와 겹쳐 보기",
        items: ["지지력", "가벼움", "유연성", "움직임 편함"],
        cols: 1,
        size: "md",
        why: "부위·소재 설명을 '그래서 어떤 벨트냐'로 한 번에 요약합니다. 글을 안 읽는 사람도 게이지는 봅니다.",
        ref: "핀 jWmBGJUbw (스펙 슬라이더), 1shJ5DwWK (도트 평점), Velites 그립 게이지",
        note: "게이지 수치 기준은 브랜드에서 정해야 함",
      },
      {
        kind: "ui",
        stage: 2,
        title: "컬러칩 + 착장 컬러 조합",
        body: "컬러칩 3개 + 컬러별 추천 코디 착용컷",
        items: ["오렌지", "블루", "핑크"],
        cols: 3,
        size: "md",
        req: ["chip", "look"],
        why: "제품을 다 이해한 뒤에야 '어떤 걸로 살까'를 고민합니다. 컬러는 결정 단계에 둡니다.",
        ref: "핀 6juqTcFk5 (컬러칩), 1hmWkCh5g (Shop-the-look)",
      },
      {
        kind: "ui",
        stage: 2,
        title: "모델 비교표",
        body: "리프팅 벨트 / 브리즈 벨트 나란히",
        items: ["두께 9mm vs 6.9mm", "주 용도", "이런 분께 추천"],
        cols: 1,
        size: "sm",
        req: ["compare"],
        why: "꼼꼼히 보는 사람은 다른 모델과 비교까지 해야 결정합니다.",
        ref: "Velites 그립 Compare models 표",
      },
      sizeBlock,
      {
        kind: "review",
        stage: 2,
        title: "구매평 + FAQ 접기/펼치기",
        body: "FAQ는 질문만 보이고 눌러야 펼쳐짐",
        size: "sm",
        why: "Velites처럼 FAQ를 접어서 페이지 길이를 줄입니다. 탐색형은 앞쪽이 길기 때문에 뒤쪽은 짧게 끝냅니다.",
        ref: "Velites FAQ 12개 아코디언",
      },
    ],
  },
  {
    id: "c",
    letter: "C",
    name: "문제해결형",
    tagline: "지금 쓰는 벨트의 불편함에서 시작한다",
    target: "이미 가죽·일반 벨트를 쓰고 있는 크로스핏터 (갈아탈 사람)",
    firstScreen: "고객이 겪는 불편 한 문장",
    message: "“벨트 차고 갈비뼈 아팠던 적, 있죠?”",
    stages: [
      { name: "공감한다", goal: "제품 이야기 전에 고객의 경험을 먼저 꺼낸다" },
      { name: "해결을 보여준다", goal: "'얇은데 괜찮아?'라는 의심을 구조와 장면으로 푼다" },
      { name: "안심시킨다", goal: "먼저 갈아탄 사람의 말과 FAQ로 마무리한다" },
    ],
    pros: [
      "갈아탈 사람이라는, 살 확률이 가장 높은 타겟을 정확히 겨냥한다",
      "마케팅 메시지가 가장 선명하다 (문제 → 해결)",
      "코치·박스 협업 콘텐츠로 이어가기 쉽다",
    ],
    risks: ["벨트를 안 써본 입문자에게는 공감이 안 된다", "비교 표현은 과장 없이 사실만 써야 한다 (표시광고 주의)"],
    blocks: [
      {
        kind: "copy",
        stage: 0,
        title: "문제 제기 히어로",
        copy: "벨트 차고\n갈비뼈 아팠던 적,\n있죠?",
        body: "검은 배경 + 큰 카피 + 기존 벨트에 눌린 장면",
        size: "lg",
        req: ["copy"],
        why: "실제 구매평에 '가죽 벨트가 골반과 갈비뼈를 눌러 멍이 들었다'는 말이 있습니다. 벨트를 이미 쓰는 사람에게는 제품 소개보다 자기 경험이 먼저 꽂힙니다.",
        marketing: "광고 타겟을 '이미 벨트를 쓰는 사람'으로 좁히고, 같은 질문형 문장으로 광고합니다.",
        ref: "구매평 (가죽 벨트 → 브리즈 교체 후기), 핀 36xoGv6DI (볼드 카피)",
      },
      {
        kind: "ui",
        stage: 0,
        title: "기존 벨트 vs 브리즈",
        body: "좌우 2단 비교, 브리즈 쪽만 코발트 강조",
        items: ["두께: 두껍고 딱딱함 vs 6.9mm 슬림", "착용감: 눌림 vs 몸 따라 휘어짐", "WOD 중: 풀었다 찼다 vs 차고 그대로"],
        cols: 1,
        size: "md",
        req: ["compare"],
        why: "문제를 꺼냈으면 해결은 바로 붙어 있어야 합니다. 공감 바로 다음에 '그럼 뭐가 다른데?'에 답합니다.",
        note: "특정 경쟁 제품명은 쓰지 않고 '일반 가죽 벨트'로 표현. 'WOD 중 차고 그대로'는 브랜드 확인 필요",
      },
      {
        kind: "diagram",
        stage: 1,
        title: "얇은데 왜 잡아주나 — 구조도",
        body: "단면·부위 콜아웃으로 지지력이 나오는 이유 설명",
        items: ["① 고밀도 외피", "② 내부 패드", "③ 벨크로 락", "④ 링 · 버클"],
        cols: 1,
        size: "lg",
        key: true,
        req: ["structure"],
        why: "갈아탈 사람의 가장 큰 의심은 '얇으면 약하지 않아?'입니다. 부위별로 이유를 보여줘서 그 의심을 풉니다.",
        ref: "핀 183xm30pO (분해도), 4nFudRgUE (스펙 라인 드로잉)",
      },
      materialBlock(1, "구조도의 설명을 실제 질감으로 확인시킵니다. '얇아도 단단하다'를 눈으로 보게 합니다."),
      {
        kind: "photo",
        stage: 1,
        title: "상황별 착용컷",
        body: "같은 벨트로 고중량과 움직임 둘 다 되는 장면",
        items: ["스쿼트", "데드리프트", "WOD · 박스점프"],
        cols: 3,
        size: "md",
        req: ["look"],
        why: "현재 카피 '움직임은 가볍게, 리프팅은 강하게'를 사진으로 증명합니다. 두 상황을 나란히 둬야 '둘 다 된다'가 보입니다.",
        shoot: "상황별 착용 촬영 3컷",
      },
      {
        kind: "spin",
        stage: 1,
        title: "360° 드래그 뷰",
        body: "둘레 회전 + 컬러 전환",
        size: "md",
        key: true,
        req: ["spin", "angles"],
        why: "이 시안에서 360°는 주인공이 아니라 확인용입니다. 해결 방법을 이해한 뒤 실물을 돌려보며 납득하게 합니다.",
        shoot: "턴테이블 회전 촬영 24~36컷 × 3컬러 + 위·아래 정지컷",
      },
      {
        kind: "review",
        stage: 2,
        title: "갈아탄 사람의 후기",
        body: "기존 벨트에서 바꾼 후기만 모아서",
        items: ["“브리즈벨트로 바꾸고 나서는 그런 통증이 싹 사라졌네요”", "“벨크로가 풀릴까 걱정했는데 고중량에도 단단하게 유지돼요”"],
        cols: 1,
        size: "md",
        why: "같은 문제를 겪던 사람이 바꾼 결과라서, 첫 화면의 질문에 대한 답이 됩니다. 처음과 끝이 이어지게 했습니다.",
        marketing: "'갈아탄 후기' 리뷰 이벤트로 같은 유형의 후기를 계속 모읍니다.",
      },
      {
        kind: "ui",
        stage: 2,
        title: "컬러칩",
        body: "컬러칩 3개 + 컬러별 착용컷",
        items: ["오렌지", "블루", "핑크"],
        cols: 3,
        size: "sm",
        req: ["chip"],
        why: "갈아타기로 마음먹은 다음에 고르는 것이 컬러입니다.",
      },
      sizeBlock,
      {
        kind: "review",
        stage: 2,
        title: "갈아탈 때 묻는 FAQ",
        body: "질문만 보이고 눌러야 펼쳐짐",
        items: ["고중량에도 괜찮나요?", "리프팅 벨트랑 뭐가 달라요?", "벨크로 오래 써도 괜찮나요?"],
        cols: 1,
        size: "sm",
        why: "갈아타는 사람의 걱정은 거의 정해져 있어서 미리 답해 둡니다.",
      },
    ],
  },
  {
    id: "d",
    letter: "D",
    name: "컬러·룩형",
    tagline: "벨트를 장비가 아니라 룩으로 보이게 한다",
    target: "디자인과 착장을 중시하는 사람, 여성 크로스핏터, 글로벌 방문자",
    firstScreen: "컬러별 풀스크린 비주얼",
    message: "“오렌지 · 블루 · 핑크, 오늘 WOD 컬러는?”",
    stages: [
      { name: "끌린다", goal: "기능보다 먼저 컬러와 착장으로 시선을 잡는다" },
      { name: "확인한다", goal: "고른 컬러 그대로 돌려보고 디테일로 품질을 보여준다" },
      { name: "결정한다", goal: "사이즈와 컬러 후기로 마무리한다" },
    ],
    pros: [
      "브랜드 키워드 BOLD를 가장 직접적으로 보여준다",
      "인스타·SNS 착장 콘텐츠와 연결이 가장 쉽다",
      "글로벌 사이트 감도와 잘 맞는다",
    ],
    risks: ["컬러별 연출 촬영이 가장 많이 필요하다", "기능 설득이 짧아 고중량 리프터에게는 가볍게 보일 수 있다"],
    blocks: [
      {
        kind: "photo",
        stage: 0,
        title: "컬러 히어로 (좌우 스와이프)",
        body: "컬러마다 배경색까지 바뀌는 풀스크린 컷 + 큰 컬러명",
        items: ["ORANGE", "BLUE", "PINK"],
        cols: 3,
        size: "lg",
        req: ["copy"],
        why: "벨트 기능은 다 비슷하다고 느끼는 사람에게 OUTDO가 다른 점은 '보이는 것'입니다. BOLD를 첫 화면에서 가장 직접적으로 보여줍니다.",
        marketing: "컬러별로 광고 소재를 따로 만들고, 시즌 한정 컬러 출시로 이어갑니다.",
        ref: "Velites 홈 단색 컬러 블록, 핀 xtxb6Dewl (모노톤 + 포인트 컬러)",
        shoot: "컬러별 연출컷 3컷 (배경 컬러 세트)",
      },
      {
        kind: "photo",
        stage: 0,
        title: "착장 컬러 조합",
        body: "모델 착장으로 벨트 컬러 × 의류 조합 예시",
        items: ["블랙 + 오렌지", "그레이 + 블루", "화이트 + 핑크"],
        cols: 3,
        size: "md",
        req: ["look"],
        why: "휘영 님이 말한 '모델 착장 + 컬러 조합 예시'입니다. 벨트를 장비가 아니라 룩의 일부로 보이게 합니다.",
        marketing: "인스타 착장 콘텐츠를 그대로 가져다 쓰고, 반대로 상세 컷을 인스타에 올릴 수도 있습니다.",
        ref: "핀 1hmWkCh5g (Shop-the-look), 나이키 스킴스 Shop by Color",
        shoot: "모델 착장 3컷",
      },
      {
        kind: "ui",
        stage: 0,
        title: "컬러칩 바",
        body: "큰 컬러칩 + 컬러명 + 무드 한 줄. 누르면 아래 360°가 같은 컬러로 바뀜",
        items: ["오렌지", "블루", "핑크"],
        cols: 3,
        size: "sm",
        req: ["chip"],
        why: "끌린 컬러를 정확한 색으로 확인시키는 칩입니다. 아래 블록과 연결돼 고른 컬러가 계속 이어집니다.",
        ref: "핀 6juqTcFk5 (컬러 팔레트 칩)",
      },
      {
        kind: "spin",
        stage: 1,
        title: "선택한 컬러 360°",
        body: "위에서 고른 컬러로 바로 회전 뷰",
        size: "lg",
        key: true,
        req: ["spin", "angles"],
        why: "고른 컬러 그대로 돌려보게 해서 컬러 선택의 흐름을 끊지 않습니다.",
        shoot: "턴테이블 회전 촬영 24~36컷 × 3컬러 + 위·아래 정지컷",
      },
      {
        kind: "diagram",
        stage: 1,
        title: "디테일 확대 + 간단 구조",
        body: "확대컷 위주, 콜아웃은 짧게",
        items: ["로고 라벨", "버클 · 링", "벨크로", "두께 6.9mm 단면"],
        cols: 2,
        size: "md",
        key: true,
        req: ["structure"],
        why: "이 시안은 기능을 짧게 갑니다. 디자인 디테일 확대컷으로 '예쁜데 만듦새도 좋다'를 함께 보여줍니다.",
        ref: "핀 3rh1g1JZa (ARES 디테일), 183xm30pO",
      },
      materialBlock(1, "디테일 확대 다음에 소재까지 보여줘서, 디자인 제품이라도 품질이 가볍지 않다는 걸 확인시킵니다."),
      { ...sizeBlock, why: "착장 중심 시안이라 '저 사람이 이 사이즈'가 가장 잘 통합니다. 엠버서더 착용 사이즈를 크게 보여줍니다." },
      {
        kind: "review",
        stage: 2,
        title: "컬러 이야기 후기 먼저",
        body: "컬러를 언급한 후기를 맨 위로",
        items: ["“핑크색 벨트라니 너무 좋아용”", "“핑크랑 네이비 중에 고민하다가 둘 다 사버렸어요”"],
        cols: 1,
        size: "md",
        why: "컬러로 들어온 사람에게는 컬러 이야기 후기가 가장 설득력 있습니다. 두 개 샀다는 후기는 여러 개 구매로도 이어집니다.",
        marketing: "'2컬러 함께 사기' 할인의 근거가 됩니다.",
      },
      {
        kind: "ui",
        stage: 2,
        title: "모델 비교 · FAQ",
        body: "리프팅 벨트 비교표 + FAQ 접기/펼치기",
        size: "sm",
        req: ["compare"],
        why: "기능이 궁금한 사람을 위한 마무리입니다. 이 시안에선 뒤로 뺐습니다.",
      },
    ],
  },
];

export function findDraft(id: string) {
  return drafts.find((draft) => draft.id === id);
}

/** 각 요구사항이 시안에서 몇 번째 블록에 처음 나오는지 */
export function requirementPosition(draft: LayoutDraft, key: ReqKey) {
  const index = draft.blocks.findIndex((block) => block.req?.includes(key));
  return index === -1 ? null : index + 1;
}
