"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StickyNote, X } from "lucide-react";
import type { SectionNote } from "@/data/samples/renewal-notes";
import { cn } from "@/lib/utils";

// 시안 검토 모드
// - PC: 시안을 iframe으로 핸드폰 틀(430px) 안에 띄우고, 메모는 틀 밖 포스트잇으로 → 사이트 일부로 오해하지 않게
// - 모바일: 메모는 기본 숨김, 맨 위 메모 띠를 눌러야 시트로 열림
// - iframe 안(틀 안에서 보이는 시안)에서는 안내 띠도 메모도 그리지 않는다

type Mode = "plain" | "stage" | "embedded";

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

function Stage({ title, notes, label, links, onExit }: { title: string; notes: SectionNote[]; label: string; links: { href: string; text: string }[]; onExit: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [index, setIndex] = useState(0);

  const attach = useCallback(() => {
    const win = frame.current?.contentWindow;
    if (!win) return;
    const update = () => setIndex(activeIn(win, notes));
    win.addEventListener("scroll", update, { passive: true });
    update();
  }, [notes]);

  const jump = (id: string) =>
    frame.current?.contentWindow?.document.querySelector(`[data-note="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="flex min-h-screen flex-col bg-[#d9dbe0]">
      <header className="flex items-center justify-between px-8 py-4 text-sm">
        <p className="font-bold text-neutral-800">{label} · 시안 검토 화면</p>
        <nav className="flex gap-4 text-neutral-600">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="underline underline-offset-2 hover:text-neutral-950">
              {l.text}
            </Link>
          ))}
        </nav>
      </header>
      <div className="flex flex-1 items-start justify-center gap-12 px-8 pb-8">
        <div className="shrink-0 rounded-[48px] bg-neutral-950 p-3 shadow-2xl">
          <iframe
            ref={frame}
            src={typeof window === "undefined" ? undefined : window.location.pathname}
            onLoad={attach}
            title="시안 미리보기"
            className="block h-[min(860px,calc(100vh-120px))] w-[430px] rounded-[38px] bg-white"
          />
        </div>

        <aside className="sticky top-8 w-[340px] -rotate-[0.6deg] rounded-sm bg-[#fff3b0] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <StickyNote className="h-4 w-4" />
            시안 메모 · {title}
          </div>
          <p className="mt-1 text-[11px] text-amber-900/70">실제 페이지에는 들어가지 않는 설명입니다.</p>
          <div className="mt-5">
            <NoteBody note={notes[index]} index={index} total={notes.length} />
          </div>
          <div className="mt-5 border-t border-amber-900/15 pt-4">
            <NoteList notes={notes} index={index} onJump={jump} />
          </div>
          <button onClick={onExit} className="mt-5 w-full rounded border border-amber-900/30 py-2 text-xs font-bold text-amber-950 hover:bg-amber-200/60">
            메모 끄고 전체 화면으로 보기
          </button>
        </aside>
      </div>
    </div>
  );
}

function MobileNotes({ title, notes }: { title: string; notes: SectionNote[] }) {
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
      <button onClick={() => setOpen(true)} className="flex w-full items-center justify-center gap-1.5 bg-[#fff3b0] py-2 text-xs font-bold text-amber-950">
        <StickyNote className="h-3.5 w-3.5" />
        시안 메모 보기 · 섹션별로 왜 이렇게 했는지
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end bg-black/30" onClick={() => setOpen(false)}>
          <div className="max-h-[75vh] w-full overflow-y-auto rounded-t-2xl bg-[#fff3b0] p-5 pb-8" onClick={(e) => e.stopPropagation()}>
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
  const [mode, setMode] = useState<Mode>("plain");

  useEffect(() => {
    if (window.self !== window.top) return setMode("embedded");
    if (rationale && window.matchMedia("(min-width: 1024px)").matches) setMode("stage");
  }, [rationale]);

  if (mode === "stage" && rationale) {
    return <Stage title={rationale.title} notes={rationale.notes} label={label} links={links} onExit={() => setMode("plain")} />;
  }

  return (
    <>
      {mode !== "embedded" && (
        <>
          {rationale && <MobileNotes title={rationale.title} notes={rationale.notes} />}
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
