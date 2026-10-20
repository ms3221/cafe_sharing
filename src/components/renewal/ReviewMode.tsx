"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StickyNote, X } from "lucide-react";
import type { SectionNote } from "@/data/samples/renewal-notes";
import { cn } from "@/lib/utils";

// 시안 검토 모드
// - 시안은 늘 전체 화면으로 보여준다
// - 메모는 기본 숨김, 맨 위 메모 띠를 눌러야 시트로 열림 (PC · 모바일 같음) → 사이트 일부로 오해하지 않게
// - iframe 안에 들어간 시안에서는 안내 띠도 메모도 그리지 않는다

function activeIn(win: Window, notes: SectionNote[]) {
  let index = 0;
  notes.forEach((note, i) => {
    const el = win.document.querySelector(`[data-note="${note.id}"]`);
    if (el && el.getBoundingClientRect().top < win.innerHeight * 0.5) index = i;
  });
  return index;
}

function NoteBody({ note, index, total }: { note: SectionNote; index: number; total: number }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-widest text-amber-700">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <p className="mt-1 text-lg font-black text-neutral-950">{note.label}</p>
      <dl className="mt-4 space-y-3 text-[13px] leading-relaxed">
        <div>
          <dt className="text-[11px] font-bold text-amber-800/70">기존</dt>
          <dd className="mt-0.5 text-neutral-600">{note.before}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-bold text-amber-800/70">바뀐 점</dt>
          <dd className="mt-0.5 font-medium text-neutral-900">{note.after}</dd>
        </div>
        <div className="rounded-md bg-white/70 p-3">
          <dt className="text-[11px] font-bold text-neutral-950">왜</dt>
          <dd className="mt-0.5 text-neutral-800">{note.why}</dd>
        </div>
        {note.ref && <p className="text-[11px] text-amber-900/60">참고 · {note.ref}</p>}
      </dl>
    </div>
  );
}

function NoteList({ notes, index, onJump }: { notes: SectionNote[]; index: number; onJump: (id: string) => void }) {
  return (
    <ol className="space-y-0.5">
      {notes.map((n, i) => (
        <li key={n.id}>
          <button
            onClick={() => onJump(n.id)}
            className={cn(
              "flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs",
              i === index ? "bg-neutral-950 font-bold text-white" : "text-amber-950/70 hover:bg-amber-200/60",
            )}
          >
            <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
            {n.label}
          </button>
        </li>
      ))}
    </ol>
  );
}

function Notes({ title, notes }: { title: string; notes: SectionNote[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const update = () => setIndex(activeIn(window, notes));
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [notes]);
  const jump = (id: string) => {
    setOpen(false);
    document.querySelector(`[data-note="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex w-full items-center justify-center gap-1.5 bg-[#fff3b0] py-2 text-xs font-bold text-amber-950 hover:bg-amber-200">
        <StickyNote className="h-3.5 w-3.5" />
        시안 메모 보기 · 섹션별로 왜 이렇게 했는지
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/30" onClick={() => setOpen(false)}>
          <div className="max-h-[75vh] w-full overflow-y-auto rounded-t-2xl bg-[#fff3b0] p-5 pb-8 md:max-w-[560px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <StickyNote className="h-4 w-4" /> 시안 메모 · {title}
              </p>
              <button onClick={() => setOpen(false)} aria-label="닫기">
                <X className="h-5 w-5 text-amber-900" />
              </button>
            </div>
            <p className="mt-1 text-[11px] text-amber-900/70">실제 페이지에는 들어가지 않는 설명입니다.</p>
            <div className="mt-4">
              <NoteBody note={notes[index]} index={index} total={notes.length} />
            </div>
            <div className="mt-5 border-t border-amber-900/15 pt-4">
              <NoteList notes={notes} index={index} onJump={jump} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ReviewMode({
  label,
  links,
  rationale,
  children,
}: {
  label: string;
  links: { href: string; text: string }[];
  rationale?: { title: string; notes: SectionNote[] };
  children: React.ReactNode;
}) {
  const [embedded, setEmbedded] = useState(false);

  useEffect(() => {
    if (window.self !== window.top) setEmbedded(true);
  }, []);

  return (
    <>
      {!embedded && (
        <>
          {rationale && <Notes title={rationale.title} notes={rationale.notes} />}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-cobalt px-4 py-2 text-center text-xs font-bold text-white">
            <span>{label}</span>
            {links.map((link) => (
              <span key={link.href} className="flex items-center gap-2">
                <span className="opacity-50">|</span>
                <Link href={link.href} className="underline underline-offset-2">
                  {link.text}
                </Link>
              </span>
            ))}
          </div>
        </>
      )}
      {children}
    </>
  );
}
