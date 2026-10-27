import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WireBox } from "@/components/wire/WireBox";
import { drafts, findDraft } from "@/data/samples/breeze-layouts";

export const dynamicParams = false;

export function generateStaticParams() {
  return drafts.map((draft) => ({ id: draft.id }));
}

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const draft = findDraft((await params).id);
  return { title: draft ? `시안 ${draft.letter} ${draft.name} | 브리즈 벨트` : "레이아웃 시안" };
}

export default async function LayoutDraftPage({ params }: Params) {
  const draft = findDraft((await params).id);
  if (!draft) notFound();

  const others = drafts.filter((d) => d.id !== draft.id);
  let blockNumber = 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <Link href="/samples/layouts" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" /> 시안 4종 비교
      </Link>

      <header className="mt-6">
        <p className="text-sm font-bold text-cobalt">브리즈 벨트 상세 · 시안 {draft.letter}</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">{draft.name}</h1>
        <p className="mt-2 text-lg text-neutral-600">{draft.tagline}</p>
        <Link
          href={`/samples/renewal/${draft.id}`}
          className="mt-5 inline-flex items-center gap-1 rounded-md bg-neutral-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-cobalt"
        >
          실제 시안 보기 <ArrowRight className="h-4 w-4" />
        </Link>

        <dl className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            { label: "타겟", value: draft.target },
            { label: "첫 화면", value: draft.firstScreen },
            { label: "핵심 마케팅 메시지", value: draft.message },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-neutral-200 p-4">
              <dt className="text-xs font-bold text-neutral-500">{item.label}</dt>
              <dd className="mt-1 text-[15px] font-semibold text-neutral-900">{item.value}</dd>
            </div>
          ))}
        </dl>

        <ol className="mt-4 grid gap-2 md:grid-cols-3">
          {draft.stages.map((stage, i) => (
            <li key={stage.name} className="rounded-lg bg-neutral-950 p-4 text-white">
              <p className="text-xs font-bold text-silver">STEP {i + 1}</p>
              <p className="mt-1 font-bold">{stage.name}</p>
              <p className="mt-1 text-sm text-neutral-300">{stage.goal}</p>
            </li>
          ))}
        </ol>
      </header>

      <p className="mt-12 text-sm text-neutral-500">
        왼쪽은 모바일 상세정보 영역의 블록 순서, 오른쪽은 그 자리에 둔 이유입니다. 사진은 박스로 대신했습니다. 상단 상품정보(갤러리·가격·옵션)는
        아임웹 고정 영역이라 모든 시안에서 같습니다.
      </p>

      <section className="mt-6">
        {draft.stages.map((stage, stageIndex) => (
          <div key={stage.name}>
            <div className="grid md:grid-cols-[390px_1fr] md:gap-10">
              <div className="border-x border-t border-neutral-300 bg-neutral-100 px-3 pt-4 pb-2">
                <p className="text-xs font-black tracking-wider text-neutral-500">
                  STEP {stageIndex + 1} · {stage.name}
                </p>
              </div>
              <p className="hidden pt-4 text-sm font-semibold text-neutral-400 md:block">{stage.goal}</p>
            </div>

            {draft.blocks
              .filter((block) => block.stage === stageIndex)
              .map((block) => {
                blockNumber += 1;
                return (
                  <div key={block.title} className="grid md:grid-cols-[390px_1fr] md:gap-10">
                    <div className="border-x border-neutral-300 bg-neutral-100 px-3 py-1.5">
                      <WireBox block={block} index={blockNumber} />
                    </div>
                    <aside className="mb-6 rounded-b-lg border border-t-0 border-neutral-200 bg-white p-4 text-sm leading-relaxed md:mb-0 md:self-start md:border-0 md:px-0 md:py-3">
                      <p className="font-bold text-neutral-950">
                        <span className="mr-1.5 text-cobalt">{String(blockNumber).padStart(2, "0")}</span>왜 여기에
                      </p>
                      <p className="mt-1 text-neutral-700">{block.why}</p>
                      {block.marketing && (
                        <p className="mt-3 rounded-md bg-cobalt/5 p-3 text-neutral-800">
                          <b className="text-cobalt">마케팅 연결</b> {block.marketing}
                        </p>
                      )}
                      <div className="mt-3 space-y-1 text-[13px] text-neutral-500">
                        {block.ref && <p>참고: {block.ref}</p>}
                        {block.shoot && <p>필요 촬영: {block.shoot}</p>}
                        {block.note && <p className="text-amber-700">확인 필요: {block.note}</p>}
                      </div>
                    </aside>
                  </div>
                );
              })}
          </div>
        ))}
        <div className="grid md:grid-cols-[390px_1fr] md:gap-10">
          <div className="rounded-b-xl border-x border-b border-neutral-300 bg-neutral-100 px-3 pt-1.5 pb-3">
            <div className="rounded-md bg-neutral-950 py-3 text-center text-sm font-bold text-white">하단 고정 구매하기 버튼</div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 p-5">
          <h2 className="font-bold text-neutral-950">강점</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            {draft.pros.map((pro) => (
              <li key={pro}>{pro}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-200 p-5">
          <h2 className="font-bold text-neutral-950">리스크</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            {draft.risks.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </div>
      </section>

      <nav className="mt-10 grid gap-3 sm:grid-cols-3">
        {others.map((d) => (
          <Link
            key={d.id}
            href={`/samples/layouts/${d.id}`}
            className="group flex items-center justify-between rounded-lg border border-neutral-200 p-4 hover:border-neutral-900"
          >
            <span>
              <span className="text-xs font-bold text-cobalt">시안 {d.letter}</span>
              <span className="block font-bold text-neutral-900">{d.name}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-900" />
          </Link>
        ))}
      </nav>
    </main>
  );
}
