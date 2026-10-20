// 브리즈 벨트 도면 (SVG 라인 드로잉). 색은 currentColor를 따라가고 강조선만 코발트
// 치수는 상세 SIZE INFO · 비교표 기준: 폭 10cm, 두께 6.9mm, 허리 68~98cm

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, vectorEffect: "non-scaling-stroke" as const };
const thin = { ...line, strokeWidth: 0.8 };
const hidden = { ...thin, strokeDasharray: "3 3" };
const COBALT = "#2f6bff";

function Ticks({ x1, y1, x2, y2, label, vertical = false }: { x1: number; y1: number; x2: number; y2: number; label: string; vertical?: boolean }) {
  const t = 4;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={COBALT} strokeWidth={1} />
      <line x1={x1 - t} y1={y1 + t} x2={x1 + t} y2={y1 - t} stroke={COBALT} strokeWidth={1} />
      <line x1={x2 - t} y1={y2 + t} x2={x2 + t} y2={y2 - t} stroke={COBALT} strokeWidth={1} />
      <text
        x={(x1 + x2) / 2 + (vertical ? -6 : 0)}
        y={(y1 + y2) / 2 + (vertical ? 0 : -6)}
        fill={COBALT}
        fontSize={9}
        fontFamily="ui-monospace, monospace"
        textAnchor="middle"
        transform={vertical ? `rotate(-90 ${(x1 + x2) / 2 - 6} ${(y1 + y2) / 2})` : undefined}
      >
        {label}
      </text>
    </g>
  );
}

function Patterns({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`${id}-hatch`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      </pattern>
      <pattern id={`${id}-cross`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <path d="M0 0 L6 0 M0 0 L0 6" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      </pattern>
      <pattern id={`${id}-dots`} width="5" height="5" patternUnits="userSpaceOnUse">
        <circle cx="2.5" cy="2.5" r="0.8" fill="currentColor" opacity="0.6" />
      </pattern>
      <pattern id={`${id}-hook`} width="6" height="4" patternUnits="userSpaceOnUse">
        <path d="M1 3.5 L1 1 Q1 0.3 2 0.6" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
      </pattern>
    </defs>
  );
}

const Logo = ({ x, y, size = 30 }: { x: number; y: number; size?: number }) => (
  <g>
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={900} letterSpacing={size * 0.08} {...thin}>
      OUTDO
    </text>
    <text x={x} y={y + size * 0.45} textAnchor="middle" fontSize={size * 0.2} letterSpacing={size * 0.1} fill="currentColor" opacity={0.7}>
      OUTDO THE BEST.
    </text>
  </g>
);

/** 착용 상태 측면 (원통) + 폭 · 두께 치수 */
export function SideView({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 230" className={className} aria-label="측면 도면">
      <Patterns id="side" />
      <path d="M40 70 A140 34 0 0 1 320 70" {...line} />
      <path d="M48 72 A132 29 0 0 1 312 72" {...thin} />
      <path d="M40 70 A140 34 0 0 0 320 70" {...line} />
      <path d="M40 160 A140 34 0 0 0 320 160" {...line} />
      <path d="M40 160 A140 34 0 0 1 320 160" {...hidden} />
      <line x1="40" y1="70" x2="40" y2="160" {...line} />
      <line x1="320" y1="70" x2="320" y2="160" {...line} />
      <path d="M47 76 A133 30 0 0 0 313 76 M47 154 A133 30 0 0 0 313 154" {...hidden} />
      <path d="M268 98 L304 88 L304 178 L268 188 Z" fill="url(#side-hook)" stroke="currentColor" strokeWidth={0.8} />
      <Logo x={168} y={140} size={34} />
      <Ticks x1={344} y1={70} x2={344} y2={160} label="10 cm" vertical />
      <line x1="320" y1="70" x2="350" y2="40" stroke={COBALT} strokeWidth={1} />
      <circle cx="320" cy="70" r="5" fill="none" stroke={COBALT} />
      <text x="292" y="34" fill={COBALT} fontSize={9} fontFamily="ui-monospace, monospace">
        t = 6.9 mm
      </text>
    </svg>
  );
}

export function FrontView({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 150" className={className} aria-label="정면 도면">
      <rect x="24" y="30" width="312" height="90" rx="10" {...line} />
      <rect x="30" y="36" width="300" height="78" rx="6" {...hidden} />
      <Logo x={180} y={84} size={36} />
      <Ticks x1={10} y1={30} x2={10} y2={120} label="10 cm" vertical />
    </svg>
  );
}

export function BackView({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 150" className={className} aria-label="후면 도면">
      <Patterns id="back" />
      <rect x="24" y="30" width="312" height="90" rx="10" {...line} />
      <rect x="30" y="36" width="300" height="78" rx="6" {...hidden} />
      <rect x="160" y="22" width="14" height="106" rx="3" {...line} />
      <path d="M174 40 L336 40 L336 110 L174 110 Z" fill="url(#back-hook)" stroke="currentColor" strokeWidth={0.8} />
      <rect x="62" y="52" width="46" height="46" rx="3" {...thin} />
      <text x="85" y="72" textAnchor="middle" fontSize={9} fontWeight={900} fill="currentColor">
        I&apos;M THE
      </text>
      <text x="85" y="84" textAnchor="middle" fontSize={9} fontWeight={900} fill="currentColor">
        BEST
      </text>
      <text x="255" y="138" textAnchor="middle" fontSize={8} fill={COBALT} fontFamily="ui-monospace, monospace">
        VELCRO LOCK
      </text>
    </svg>
  );
}

export function TopView({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 200" className={className} aria-label="윗면 도면">
      <Patterns id="top" />
      <ellipse cx="180" cy="100" rx="150" ry="80" {...line} />
      <ellipse cx="180" cy="100" rx="143" ry="73" {...thin} />
      <path d="M318 62 A150 80 0 0 1 318 138 L326 140 A156 84 0 0 0 326 60 Z" fill="url(#top-hook)" stroke="currentColor" strokeWidth={0.8} />
      <line x1="30" y1="100" x2="37" y2="100" stroke={COBALT} strokeWidth={2} />
      <text x="44" y="103" fill={COBALT} fontSize={9} fontFamily="ui-monospace, monospace">
        6.9 mm
      </text>
      <text x="180" y="104" textAnchor="middle" fontSize={9} fill="currentColor" opacity={0.5} fontFamily="ui-monospace, monospace">
        TOP / BOTTOM
      </text>
    </svg>
  );
}

/** 펼친 상태 + 길이 치수 */
export function FlatView({ className, label = "68 – 98 cm  (XS – L)" }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 360 120" className={className} aria-label="펼친 상태 도면">
      <Patterns id="flat" />
      <rect x="10" y="44" width="16" height="44" rx="3" {...line} />
      <path d="M26 48 L300 48 L346 56 L346 76 L300 84 L26 84" {...line} />
      <path d="M30 52 L298 52 M30 80 L298 80" {...hidden} />
      <path d="M262 50 L300 50 L344 58 L344 74 L300 82 L262 82 Z" fill="url(#flat-hook)" stroke="none" />
      <rect x="40" y="54" width="22" height="24" rx="2" {...thin} />
      <text x="140" y="71" textAnchor="middle" fontSize={13} fontWeight={900} {...thin} letterSpacing={1}>
        OUTDO
      </text>
      <rect x="200" y="55" width="30" height="22" rx="2" {...thin} />
      <text x="215" y="70" textAnchor="middle" fontSize={9} fontWeight={900} fill="currentColor">
        OD
      </text>
      <Ticks x1={10} y1={24} x2={346} y2={24} label={label} />
      <Ticks x1={0} y1={48} x2={0} y2={84} label="10" vertical />
    </svg>
  );
}

/** 분해도. 레이어 구성은 상세 문구(폼+텍스타일 결합 구조) 기준의 예시 */
export function ExplodedView({ className }: { className?: string }) {
  const plane = (y: number) => `M10 ${y + 50} L170 ${y} L230 ${y + 25} L70 ${y + 75} Z`;
  const layers = [
    { y: 10, fill: "none", label: "로고 패치", sub: "LOGO PATCH", patch: true },
    { y: 85, fill: "url(#ex-cross)", label: "외피 텍스타일", sub: "OUTER TEXTILE", stitch: true },
    { y: 160, fill: "url(#ex-dots)", label: "폼 코어", sub: "FOAM CORE" },
    { y: 235, fill: "url(#ex-hook)", label: "벨크로 락", sub: "VELCRO LOCK" },
  ];
  return (
    <svg viewBox="0 0 360 330" className={className} aria-label="분해도">
      <Patterns id="ex" />
      {[10, 70, 170, 230].map((x, i) => {
        const ys = [50, 75, 0, 25][i];
        return <line key={x} x1={x} y1={10 + ys} x2={x} y2={235 + ys} {...hidden} opacity={0.5} />;
      })}
      {layers.map((l, i) => (
        <g key={l.label}>
          <path d={plane(l.y)} fill={l.fill} stroke="currentColor" strokeWidth={1.2} className="text-silver" />
          {l.patch && <path d={`M95 ${l.y + 32} L135 ${l.y + 21} L150 ${l.y + 28} L110 ${l.y + 39} Z`} {...line} />}
          {l.stitch && <path d={`M22 ${l.y + 50} L170 ${l.y + 6} L218 ${l.y + 25} L70 ${l.y + 69} Z`} fill="none" stroke={COBALT} strokeWidth={1} strokeDasharray="4 3" />}
          <line x1="230" y1={l.y + 25} x2="248" y2={l.y + 25} stroke={COBALT} strokeWidth={1} />
          <circle cx="252" cy={l.y + 25} r="7" fill={COBALT} />
          <text x="252" y={l.y + 28} textAnchor="middle" fontSize={8} fontWeight={900} fill="#fff">
            {i + 1}
          </text>
          <text x="264" y={l.y + 24} fontSize={11} fontWeight={800} fill="currentColor">
            {l.label}
          </text>
          <text x="264" y={l.y + 36} fontSize={7} fill="currentColor" opacity={0.55} fontFamily="ui-monospace, monospace">
            {l.sub}
          </text>
        </g>
      ))}
      <text x="264" y={85 + 50} fontSize={7} fill={COBALT} fontFamily="ui-monospace, monospace">
        - - 단일 압축 라인
      </text>
    </svg>
  );
}
