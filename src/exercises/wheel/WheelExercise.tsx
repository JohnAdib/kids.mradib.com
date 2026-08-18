import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { WheelSpec } from "./WheelSpec";

type Props = {
  wheels: WheelSpec[];
};

export function WheelExercise({ wheels }: Props) {
  return (
    <section>
      <ExerciseHeading kind="wheel">
        Multiply the middle by the inner ring. Write the product in the outer
        ring.
      </ExerciseHeading>
      <div className="wheel-row">
        {wheels.map((wheel, index) => (
          <WheelSvg wheel={wheel} key={`${wheel.center}-${index}`} />
        ))}
      </div>
    </section>
  );
}

function WheelSvg({ wheel }: { wheel: WheelSpec }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const outer = 150;
  const mid = 100;
  const inner = 48;
  const sectors = wheel.sectors.length;
  return (
    <svg
      className="wheel-svg"
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`${wheel.center} times table wheel`}
    >
      <title>{`${wheel.center} times table wheel`}</title>
      {wheel.sectors.map((sector, index) => {
        const start = (index / sectors) * Math.PI * 2 - Math.PI / 2;
        const end = ((index + 1) / sectors) * Math.PI * 2 - Math.PI / 2;
        const labelAngle = start + (end - start) / 2;
        return (
          <g key={index}>
            <path
              className="wheel-fill"
              d={annulus(cx, cy, mid, outer, start, end)}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d={annulus(cx, cy, inner, mid, start, end)}
              fill="white"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x={cx + Math.cos(labelAngle) * ((mid + outer) / 2)}
              y={cy + Math.sin(labelAngle) * ((mid + outer) / 2)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
            >
              {sector.outer ?? ""}
            </text>
            <text
              x={cx + Math.cos(labelAngle) * ((inner + mid) / 2)}
              y={cy + Math.sin(labelAngle) * ((inner + mid) / 2)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="15"
            >
              {sector.inner ?? ""}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={inner} fill="white" stroke="currentColor" />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="22"
        fontWeight="700"
      >
        {wheel.center}×
      </text>
    </svg>
  );
}

function annulus(
  cx: number,
  cy: number,
  r1: number,
  r2: number,
  start: number,
  end: number,
) {
  const large = end - start > Math.PI ? 1 : 0;
  const p = (r: number, a: number) =>
    `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
  return `M ${p(r2, start)} A ${r2} ${r2} 0 ${large} 1 ${p(r2, end)} L ${p(r1, end)} A ${r1} ${r1} 0 ${large} 0 ${p(r1, start)} Z`;
}
