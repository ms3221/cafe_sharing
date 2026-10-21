import type { Metadata } from "next";
import { PitchDeck } from "@/components/pitch/PitchDeck";
import { PitchGate } from "@/components/pitch/PitchGate";

export const metadata: Metadata = {
  title: "발표자료 | OUTDO 리뉴얼",
  robots: { index: false, follow: false },
};

export default function PitchPage() {
  return (
    <PitchGate>
      <PitchDeck />
    </PitchGate>
  );
}
