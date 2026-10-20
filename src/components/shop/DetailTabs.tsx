"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "prod-detail", label: "상세정보" },
  { id: "prod-review", label: "구매평" },
  { id: "prod-qna", label: "Q&A" },
];

export function DetailTabs({ counts }: { counts: Record<string, number> }) {
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    tabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-20 mt-12 bg-white px-4 md:mt-14 md:px-5">
      <ul className="flex border-b border-shop-line">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1">
            <a
              href={`#${tab.id}`}
              className={cn(
                "-mb-px block border-b-2 py-3.5 text-center text-[13px] transition-colors",
                active === tab.id ? "border-shop-ink text-shop-ink" : "border-transparent text-shop-sub",
              )}
            >
              {tab.label}
              {counts[tab.id] !== undefined && <span className="ml-1 text-[11px]">({counts[tab.id]})</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
