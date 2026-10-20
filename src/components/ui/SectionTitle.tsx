import { FadeIn } from "./FadeIn";

interface SectionTitleProps {
  subtitle: string;
  title: string;
}

export function SectionTitle({ subtitle, title }: SectionTitleProps) {
  return (
    <FadeIn className="text-center mb-12">
      <p className="text-warm-500 text-sm font-medium tracking-widest uppercase mb-2">
        {subtitle}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-warm-900">
        {title}
      </h2>
      <div className="mt-4 mx-auto w-16 h-0.5 bg-warm-300" />
    </FadeIn>
  );
}
