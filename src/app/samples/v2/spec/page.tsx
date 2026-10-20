import type { Metadata } from "next";
import { RenewalShell } from "@/components/renewal/RenewalShell";
import { SpecDetail } from "@/components/renewal/spec/SpecDetail";

export const metadata: Metadata = {
  title: "브리즈 벨트 | v2 TECH SPEC",
};

export default function SpecPage() {
  return (
    <RenewalShell
      label="리뉴얼 v2 · TECH SPEC"
      links={[
        { href: "/samples/v2/skims", text: "SKIMS" },
        { href: "/", text: "샘플 목록" },
      ]}
    >
      <SpecDetail />
    </RenewalShell>
  );
}
