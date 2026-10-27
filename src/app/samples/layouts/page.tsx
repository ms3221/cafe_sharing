import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { drafts, requirementPosition, requirements } from "@/data/samples/breeze-layouts";

export const metadata: Metadata = {
  title: "브리즈 벨트 레이아웃 시안 4종",
};

const rows = [
  { label: "타겟", get: (d: (typeof drafts)[number]) => d.target },
  { label: "첫 화면", get: (d: (typeof drafts)[number]) => d.firstScreen },
  { label: "설득 흐름", get: (d: (typeof drafts)[number]) => d.stages.map((s) => s.name).join(" → ") },
  { label: "핵심 메시지", get: (d: (typeof drafts)[number]) => d.message },
];

export default function LayoutsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900">
        ← 샘플 목록
      </Link>
      <p className="mt-6 text-sm font-bold text-cobalt">OUTDO 브리즈 벨트 · 상세페이지 레이아웃</p>
      <h1 className="mt-1 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">같은 재료, 다른 순서</h1>
      <p className="mt-3 max-w-2xl text-neutral-600">
        4개 시안 모두 필수 요소(360°, 모든 각도, 구조도, 소재, 컬러칩, 착장, 카피, 비교)를 전부 담았습니다. 다른 점은{" "}
        <b className="text-neutral-900">무엇을 먼저 설득하느냐</b>이고, 그 순서가 곧 마케팅 메시지가 됩니다.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {drafts.map((draft) => (
          <li key={draft.id}>
            <div className="flex h-full flex-col rounded-xl border border-neutral-200 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-lg font-black text-white">
                {draft.letter}
              </span>
              <h2 className="mt-4 text-xl font-black text-neutral-950">{draft.name}</h2>
              <p className="mt-1 text-sm text-neutral-600">{draft.tagline}</p>
              <p className="mt-4 flex-1 text-[15px] font-semibold text-neutral-900">{draft.message}</p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-bold">
                <Link
                  href={`/samples/renewal/${draft.id}`}
                  className="inline-flex items-center justify-center gap-1 rounded-md bg-neutral-950 py-2.5 text-white hover:bg-cobalt"
                >
                  실제 시안 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/samples/layouts/${draft.id}`}
                  className="inline-flex items-center justify-center rounded-md border border-neutral-300 py-2.5 text-neutral-900 hover:border-neutral-950"
                >
                  배치 이유
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-xl font-black text-neutral-950">한눈에 비교</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-neutral-950">
              <th className="w-28 py-3 pr-4" />
              {drafts.map((d) => (
                <th key={d.id} className="py-3 pr-4 font-black text-neutral-950">
                  {d.letter} · {d.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-neutral-200 align-top">
                <th className="py-3 pr-4 font-bold text-neutral-500">{row.label}</th>
                {drafts.map((d) => (
                  <td key={d.id} className="py-3 pr-4 text-neutral-800">
                    {row.get(d)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-b border-neutral-200 align-top">
              <th className="py-3 pr-4 font-bold text-neutral-500">강점</th>
              {drafts.map((d) => (
                <td key={d.id} className="py-3 pr-4 text-neutral-800">
                  {d.pros[0]}
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-200 align-top">
              <th className="py-3 pr-4 font-bold text-neutral-500">리스크</th>
              {drafts.map((d) => (
                <td key={d.id} className="py-3 pr-4 text-neutral-800">
                  {d.risks[0]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-16 text-xl font-black text-neutral-950">필수 요소가 몇 번째에 나오나</h2>
      <p className="mt-2 text-sm text-neutral-600">숫자는 상세정보에서 몇 번째 블록인지를 뜻합니다. 앞에 올수록 그 시안이 먼저 설득하는 것입니다.</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-neutral-950 text-left">
              <th className="py-3 pr-4">필수 요소</th>
              {drafts.map((d) => (
                <th key={d.id} className="py-3 pr-4 text-center font-black">
                  {d.letter}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requirements.map((req) => (
              <tr key={req.key} className="border-b border-neutral-200">
                <td className="py-2.5 pr-4 text-neutral-800">{req.label}</td>
                {drafts.map((d) => {
                  const position = requirementPosition(d, req.key);
                  return (
                    <td key={d.id} className="py-2.5 pr-4 text-center">
                      <span
                        className={
                          position !== null && position <= 2
                            ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-cobalt font-bold text-white"
                            : "font-semibold text-neutral-700"
                        }
                      >
                        {position ?? "–"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
