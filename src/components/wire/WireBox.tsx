import { Image as ImageIcon, LayoutList, MessageSquareQuote, PenTool, RotateCw, Type } from "lucide-react";
import type { BlockKind, WireBlock } from "@/data/samples/breeze-layouts";
import { cn } from "@/lib/utils";

const kindMeta: Record<BlockKind, { label: string; icon: typeof ImageIcon; box: string; item: string }> = {
  copy: { label: "COPY", icon: Type, box: "bg-neutral-950 text-white", item: "border-white/20" },
  photo: { label: "PHOTO", icon: ImageIcon, box: "bg-neutral-200 text-neutral-800", item: "border-neutral-400 bg-neutral-300/60" },
  spin: {
    label: "360°",
    icon: RotateCw,
    box: "border-2 border-dashed border-cobalt bg-cobalt/5 text-neutral-900",
    item: "border-cobalt/40",
  },
  diagram: {
    label: "DIAGRAM",
    icon: PenTool,
    box: "border border-neutral-300 bg-white bg-[linear-gradient(#eee_1px,transparent_1px),linear-gradient(90deg,#eee_1px,transparent_1px)] bg-[size:16px_16px] text-neutral-900",
    item: "border-neutral-400 bg-white",
  },
  ui: { label: "UI", icon: LayoutList, box: "border border-neutral-300 bg-white text-neutral-900", item: "border-neutral-300 bg-neutral-50" },
  review: {
    label: "REVIEW",
    icon: MessageSquareQuote,
    box: "border border-neutral-200 bg-neutral-50 text-neutral-900",
    item: "border-neutral-300 bg-white",
  },
};

const sizeClass = { sm: "min-h-28", md: "min-h-44", lg: "min-h-72" };
const colsClass = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3" };

export function WireBox({ block, index }: { block: WireBlock; index: number }) {
  const meta = kindMeta[block.kind];
  const Icon = meta.icon;

  return (
    <div className={cn("relative flex flex-col rounded-md p-4", meta.box, sizeClass[block.size ?? "md"])}>
      <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider opacity-70">
        <span>{String(index).padStart(2, "0")}</span>
        <Icon className="h-3.5 w-3.5" />
        <span>{meta.label}</span>
        {block.key && (
          <span className="ml-auto rounded bg-cobalt px-1.5 py-0.5 text-[10px] tracking-normal text-white opacity-100">
            OUTDO 차별
          </span>
        )}
      </div>

      <h3 className="mt-2 text-[15px] font-bold">{block.title}</h3>
      {block.copy && (
        <p className="mt-4 whitespace-pre-line text-[28px] leading-tight font-black tracking-tight">{block.copy}</p>
      )}
      {block.kind === "spin" && (
        <div className="my-4 flex flex-1 items-center justify-center">
          <RotateCw className="h-14 w-14 text-cobalt" strokeWidth={1.5} />
        </div>
      )}
      <p className="mt-2 text-[12px] leading-relaxed opacity-75">{block.body}</p>

      {block.items && (
        <ul className={cn("mt-3 grid gap-1.5", colsClass[block.cols ?? 1])}>
          {block.items.map((item) => (
            <li key={item} className={cn("rounded border px-2 py-2 text-[12px] font-medium", meta.item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
