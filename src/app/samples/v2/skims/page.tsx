import type { Metadata } from "next";
import { RenewalShell } from "@/components/renewal/RenewalShell";
import { SkimsDetail } from "@/components/renewal/skims/SkimsDetail";
import { skimsNotes } from "@/data/samples/renewal-notes";

export const metadata: Metadata = {
  title: "브리즈 벨트 | v2 SKIMS",
};

export default function SkimsPage() {
  return (
    <RenewalShell
      label="리뉴얼 v2 · SKIMS"
      links={[
        { href: "/samples/v2/spec", text: "TECH SPEC" },
        { href: "/", text: "샘플 목록" },
      ]}
      rationale={{ title: "SKIMS", notes: skimsNotes }}
    >
      <SkimsDetail />
    </RenewalShell>
  );
}
