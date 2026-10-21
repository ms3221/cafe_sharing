"use client";

import { useEffect, useState } from "react";

// 발표자료 비밀번호 가림막
// 비밀번호는 사용자 요청으로 코드에 직접 둠 (혼자 보는 자료). .env.local 의 NEXT_PUBLIC_PITCH_PASSWORD가 있으면 그 값이 우선
// 정적 사이트라 진짜 보안은 아니다 — 우연히 보는 것을 막는 수준
// 한 번 맞히면 그 브라우저 창을 닫을 때까지(sessionStorage) 다시 묻지 않는다
const PASSWORD = process.env.NEXT_PUBLIC_PITCH_PASSWORD || "1234";
const KEY = "pitch-unlocked";

export function PitchGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    let ok = false;
    try {
      ok = sessionStorage.getItem(KEY) === "1";
    } catch {}
    setUnlocked(ok);
  }, []);

  if (unlocked === null) return <div className="min-h-screen bg-shop-navy" />;
  if (unlocked) return <>{children}</>;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (PASSWORD && value === PASSWORD) {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setUnlocked(true);
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-shop-navy px-6 text-white">
      <form onSubmit={submit} className="w-full max-w-[360px]">
        <p className="text-[15px] font-bold text-white/60">OUTDO 리뉴얼 · 발표자료</p>
        <h1 className="mt-2 text-[28px] font-black">비밀번호를 입력해 주세요</h1>
        {PASSWORD ? (
          <>
            <input
              type="password"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setWrong(false);
              }}
              aria-label="비밀번호"
              className="mt-6 h-12 w-full rounded-lg bg-white px-4 text-[16px] text-neutral-950 outline-none focus:ring-2 focus:ring-white/60"
            />
            {wrong && <p className="mt-2 text-[14px] text-[#ff8a8a]">비밀번호가 맞지 않습니다.</p>}
            <button type="submit" className="mt-4 h-12 w-full rounded-lg bg-white text-[16px] font-bold text-shop-navy hover:bg-neutral-200">
              들어가기
            </button>
          </>
        ) : (
          <p className="mt-6 text-[15px] leading-relaxed text-white/75">
            아직 비밀번호가 설정되지 않았습니다. 프로젝트 폴더의 .env.local 파일에 NEXT_PUBLIC_PITCH_PASSWORD=원하는비밀번호 한 줄을 넣어 주세요.
          </p>
        )}
      </form>
    </div>
  );
}
