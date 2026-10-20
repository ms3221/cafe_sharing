import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RenewalShell } from "@/components/renewal/RenewalShell";
import { detailById } from "@/components/renewal/drafts";
import { drafts, findDraft } from "@/data/samples/breeze-layouts";

export const dynamicParams = false;

export function generateStaticParams() {
  return drafts.map((draft) => ({ id: draft.id }));
}

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const draft = findDraft((await params).id);
  return { title: draft ? `브리즈 벨트 | 시안 ${draft.letter} ${draft.name}` : "브리즈 벨트 시안" };
}

export default async function RenewalPage({ params }: Params) {
  const { id } = await params;
  const draft = findDraft(id);
  const Detail = detailById[id as keyof typeof detailById];
  if (!draft || !Detail) notFound();

  return (
    <RenewalShell
      label={`시안 ${draft.letter} · ${draft.name}`}
      links={[
        { href: `/samples/layouts/${draft.id}`, text: "배치 이유 보기" },
        { href: "/samples/layouts", text: "다른 시안" },
      ]}
    >
      <Detail />
    </RenewalShell>
  );
}
