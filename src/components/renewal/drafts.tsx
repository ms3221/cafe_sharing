import Image from "next/image";
import { faq, photos, quotes, reviewPhotos } from "@/data/samples/breeze-renewal";
import {
  Band,
  CompareTable,
  Eyebrow,
  Faq,
  Gauges,
  KeyNumbers,
  Lead,
  MaterialGrid,
  MultiAngle,
  Photo,
  Quote,
  ShootNote,
  SizeGuide,
  StructureMap,
  Title,
  WeightBars,
} from "./blocks";
import { ColorHero, ColorPicker, Spin360 } from "./interactive";

const looks = { 오렌지: photos.holdBelt, 블루: photos.athleteWod };

/* ───────── A. 증명형: 믿게 한다 → 확인시킨다 → 고르게 한다 ───────── */
export function DetailA() {
  const themes = [
    { title: "복압을 꽉 잡아준다", quote: quotes.pressure, photo: reviewPhotos[3] },
    { title: "가볍고 걸리적거리지 않는다", quote: quotes.light, photo: reviewPhotos[4] },
    { title: "벨크로가 안 풀린다", quote: quotes.velcro, photo: reviewPhotos[0] },
  ];
  return (
    <>
      <Band tone="dark" className="pb-0 md:pb-0">
        <p className="text-sm font-bold text-silver">
          <span className="text-cobalt">★★★★★</span> 5.0 · 구매평 48개
        </p>
        <p className="mt-6 text-[56px] leading-[1.02] font-black tracking-tighter md:text-[72px]">
          “얘만 차면
          <br />
          자꾸 PR해요”
        </p>
        <p className="mt-4 text-sm text-neutral-500">— 브리즈 벨트 실제 구매평</p>
        <Photo src={photos.athleteWod} alt="브리즈 벨트 착용" ratio="aspect-[5/4]" className="-mx-5 mt-12" />
      </Band>

      <Band>
        <Eyebrow>REAL REVIEW</Eyebrow>
        <Title>크로스핏터들이
          <br />
          반복해서 말한 3가지</Title>
        <ol className="mt-10 space-y-8">
          {themes.map((t, i) => (
            <li key={t.title} className="grid grid-cols-[1fr_88px] gap-4">
              <div>
                <p className="text-sm font-black text-cobalt">0{i + 1}</p>
                <p className="mt-1 text-xl font-black">{t.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">“{t.quote}”</p>
              </div>
              <Photo src={t.photo} alt="" ratio="aspect-square" className="rounded-lg" />
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="gray">
        <Eyebrow>360° VIEW</Eyebrow>
        <Title>들은 그대로인지
          <br />
          직접 돌려보세요</Title>
        <div className="mt-10">
          <Spin360 />
        </div>
        <MultiAngle />
        <ShootNote>회전 24~36컷 × 3컬러, 후면 · 위 · 아래 정지컷</ShootNote>
      </Band>

      <Band>
        <Eyebrow>WHY IT WORKS</Eyebrow>
        <Title>후기가 말한 이유,
          <br />
          여기 있습니다</Title>
        <Lead>복압, 가벼움, 고정력. 세 가지가 벨트의 어느 부분에서 나오는지 번호로 짚었습니다.</Lead>
        <StructureMap />
        <KeyNumbers />
      </Band>

      <Band tone="dark">
        <Eyebrow tone="dark">MATERIAL</Eyebrow>
        <Title>가까이서 보면
          <br />
          다릅니다</Title>
        <MaterialGrid tone="dark" />
        <ShootNote>부위별 매크로 촬영 (현재는 기존 상세 이미지 크롭)</ShootNote>
      </Band>

      <Band>
        <Eyebrow>COMPARE</Eyebrow>
        <Title>내 운동엔
          <br />
          어떤 벨트?</Title>
        <CompareTable />
      </Band>

      <Band tone="gray">
        <Eyebrow>COLOR</Eyebrow>
        <Title>이제 컬러만
          <br />
          고르면 됩니다</Title>
        <ColorPicker looks={looks} />
        <ShootNote>핑크 착용컷</ShootNote>
      </Band>

      <Band>
        <Eyebrow>SIZE</Eyebrow>
        <Title>사이즈 가이드</Title>
        <SizeGuide />
      </Band>

      <Band tone="gray">
        <Eyebrow>Q&amp;A</Eyebrow>
        <Title>자주 묻는 질문</Title>
        <Faq />
      </Band>
    </>
  );
}

/* ───────── B. 탐색형: 보여준다 → 이해시킨다 → 고르게 한다 ───────── */
export function DetailB() {
  return (
    <>
      <Band tone="dark">
        <Eyebrow tone="dark">360° VIEW</Eyebrow>
        <p className="mt-3 text-[48px] leading-[1.05] font-black tracking-tighter md:text-[64px]">
          숨긴 각도는
          <br />
          없습니다.
        </p>
        <div className="mt-10">
          <Spin360 tone="dark" full />
        </div>
      </Band>

      <Band>
        <Eyebrow>EVERY ANGLE</Eyebrow>
        <Title>멈춰서 보고 싶은 각도</Title>
        <MultiAngle />
        <ShootNote>후면 · 위 · 아래 정지컷</ShootNote>
      </Band>

      <Band tone="gray">
        <Eyebrow>STRUCTURE</Eyebrow>
        <Title>부위별로
          <br />
          뜯어보기</Title>
        <Lead>펼친 벨트 위 번호를 따라 내려가면, 아래 소재 카드에서 같은 부위를 더 가까이 볼 수 있습니다.</Lead>
        <StructureMap />
      </Band>

      <Band>
        <Eyebrow>MATERIAL</Eyebrow>
        <Title>같은 부위,
          <br />
          더 가까이</Title>
        <MaterialGrid />
        <ShootNote>부위별 매크로 촬영</ShootNote>
      </Band>

      <Band tone="dark">
        <Eyebrow tone="dark">PERFORMANCE</Eyebrow>
        <Title>한눈에 보는 브리즈</Title>
        <KeyNumbers tone="dark" />
        <Gauges tone="dark" />
      </Band>

      <Band>
        <Eyebrow>COLOR</Eyebrow>
        <Title>3가지 컬러</Title>
        <ColorPicker looks={looks} />
      </Band>

      <Band tone="gray">
        <Eyebrow>COMPARE</Eyebrow>
        <Title>리프팅 벨트와 비교</Title>
        <CompareTable />
      </Band>

      <Band>
        <Eyebrow>SIZE</Eyebrow>
        <Title>사이즈 가이드</Title>
        <SizeGuide />
      </Band>

      <Band tone="gray">
        <Eyebrow>Q&amp;A</Eyebrow>
        <Title>자주 묻는 질문</Title>
        <Faq />
      </Band>
    </>
  );
}

/* ───────── C. 문제해결형: 공감 → 해결 → 안심 ───────── */
export function DetailC() {
  const scenes = [
    { label: "SQUAT", photo: photos.squatBack },
    { label: "DEADLIFT", photo: photos.deadlift },
    { label: "WOD", photo: photos.athleteWod },
  ];
  const faqOrder = [faq[2], faq[3], faq[0], faq[1]];
  return (
    <>
      <Band tone="dark">
        <p className="text-[48px] leading-[1.08] font-black tracking-tighter md:text-[64px]">
          벨트 차고
          <br />
          갈비뼈 아팠던 적,
          <br />
          <span className="text-cobalt">있죠?</span>
        </p>
        <Lead tone="dark">버티는 대신 누르는 벨트. 세트 사이마다 풀었다 다시 차는 벨트. 그 불편함에서 브리즈 벨트가 시작됐습니다.</Lead>
      </Band>

      <Band>
        <Eyebrow>THE DIFFERENCE</Eyebrow>
        <Title>착용한 걸 잊게 만드는
          <br />
          가벼움</Title>
        <Lead>초경량화로 벨트 기능은 유지하고, 착용하지 않은 듯한 가벼운 착용감을 만들었습니다.</Lead>
        <WeightBars />
        <div className="mt-10 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-neutral-100 p-4">
            <p className="font-bold text-neutral-500">무겁고 두꺼운 벨트</p>
            <p className="mt-2 font-bold">누르고, 걸리적거리고, 세트마다 풀어야 함</p>
          </div>
          <div className="rounded-lg bg-cobalt p-4 text-white">
            <p className="font-bold text-white/70">브리즈 벨트</p>
            <p className="mt-2 font-bold">6.9mm 슬림 두께, 238g, WOD 내내 유지되는 지지력</p>
          </div>
        </div>
      </Band>

      <Band tone="gray">
        <Eyebrow>HOW</Eyebrow>
        <Title>얇은데
          <br />
          어떻게 잡아줄까?</Title>
        <StructureMap />
      </Band>

      <Band>
        <Eyebrow>MATERIAL</Eyebrow>
        <Title>얇아도 단단한 이유</Title>
        <MaterialGrid />
      </Band>

      <Band tone="dark">
        <Eyebrow tone="dark">IN ACTION</Eyebrow>
        <Title>움직임은 가볍게,
          <br />
          리프팅은 강하게</Title>
        <div className="-mx-5 mt-10 grid grid-cols-3 gap-1">
          {scenes.map((s) => (
            <div key={s.label} className="relative">
              <Photo src={s.photo} alt={s.label} ratio="aspect-[3/4]" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pt-6 pb-2 text-xs font-black tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Band>

      <Band tone="gray">
        <Eyebrow>360° VIEW</Eyebrow>
        <Title>직접 확인해보세요</Title>
        <div className="mt-10">
          <Spin360 />
        </div>
      </Band>

      <Band>
        <Eyebrow>SWITCHED</Eyebrow>
        <Title>먼저 갈아탄
          <br />
          사람들의 이야기</Title>
        <div className="mt-10 space-y-8">
          <Quote text={quotes.leather} size="lg" />
          <Quote text={quotes.velcro} />
        </div>
      </Band>

      <Band tone="gray">
        <Eyebrow>COLOR</Eyebrow>
        <Title>컬러 선택</Title>
        <ColorPicker />
      </Band>

      <Band>
        <Eyebrow>SIZE</Eyebrow>
        <Title>사이즈 가이드</Title>
        <SizeGuide />
      </Band>

      <Band tone="gray">
        <Eyebrow>Q&amp;A</Eyebrow>
        <Title>갈아타기 전에
          <br />
          많이 묻는 질문</Title>
        <Faq items={faqOrder} />
      </Band>
    </>
  );
}

/* ───────── D. 컬러·룩형: 끌린다 → 확인한다 → 결정한다 ───────── */
export function DetailD() {
  const lookbook = [
    { photo: photos.holdBelt, caption: "네이비 티 + 오렌지" },
    { photo: photos.athleteWod, caption: "블랙 + 블루" },
    { photo: photos.squatBack, caption: "그레이 저지 + 오렌지" },
  ];
  return (
    <>
      <ColorHero />

      <Band>
        <Eyebrow>LOOKBOOK</Eyebrow>
        <Title>벨트도
          <br />
          룩의 일부</Title>
        <div className="-mx-5 mt-10 grid grid-cols-2 gap-1">
          <div className="relative col-span-2">
            <Photo src={lookbook[0].photo} alt={lookbook[0].caption} ratio="aspect-[4/5]" />
            <span className="absolute bottom-3 left-5 bg-white px-2 py-1 text-xs font-black">{lookbook[0].caption}</span>
          </div>
          {lookbook.slice(1).map((l) => (
            <div key={l.caption} className="relative">
              <Photo src={l.photo} alt={l.caption} ratio="aspect-[3/4]" />
              <span className="absolute bottom-3 left-3 bg-white px-2 py-1 text-[11px] font-black">{l.caption}</span>
            </div>
          ))}
        </div>
        <ShootNote>핑크 착장 · 컬러별 코디 세트</ShootNote>
      </Band>

      <Band tone="gray">
        <Eyebrow>360° VIEW</Eyebrow>
        <Title>고른 컬러 그대로
          <br />
          돌려보기</Title>
        <div className="mt-10">
          <Spin360 initial={0} />
        </div>
      </Band>

      <Band tone="dark">
        <Eyebrow tone="dark">DETAIL</Eyebrow>
        <Title>예쁜데,
          <br />
          만듦새까지</Title>
        <Lead tone="dark">고급스러우면서도 힙한 로고 디자인. 어디서도 보지 못한 독보적인 디자인입니다.</Lead>
        <div className="-mx-5 mt-10 space-y-1">
          <Photo src={photos.logoPatch} alt="로고 패치 디테일" ratio="aspect-[3/2]" />
          <Photo src={photos.patchHand} alt="I'M THE BEST 패치" ratio="aspect-[3/2]" />
        </div>
        <MaterialGrid tone="dark" />
      </Band>

      <Band>
        <Eyebrow>SPEC</Eyebrow>
        <Title>가볍고, 얇고</Title>
        <KeyNumbers />
      </Band>

      <Band tone="gray">
        <Eyebrow>SIZE</Eyebrow>
        <Title>엠버서더는
          <br />
          이 사이즈</Title>
        <SizeGuide ambassadorFirst />
      </Band>

      <Band>
        <Eyebrow>REVIEW</Eyebrow>
        <Title>컬러 때문에
          <br />
          샀다는 후기</Title>
        <div className="mt-10 space-y-6">
          <Quote text={quotes.pink} size="lg" />
          <Quote text={quotes.both} />
          <Quote text={quotes.design} />
        </div>
        <div className="mt-8 grid grid-cols-4 gap-1.5">
          {reviewPhotos.slice(0, 4).map((src) => (
            <Image key={src} src={src} alt="" width={240} height={240} className="aspect-square w-full rounded object-cover" />
          ))}
        </div>
      </Band>

      <Band tone="gray">
        <Eyebrow>COMPARE · Q&amp;A</Eyebrow>
        <Title>더 궁금하다면</Title>
        <CompareTable rows={2} />
        <Faq />
      </Band>
    </>
  );
}

export const detailById = { a: DetailA, b: DetailB, c: DetailC, d: DetailD };
