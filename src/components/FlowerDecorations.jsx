import { useMemo } from "react";

/**
 * Soft floating petals used as ambient decoration.
 * Purely decorative — aria-hidden, and disabled entirely under
 * prefers-reduced-motion via CSS (see animations.css).
 */
export function FloatingPetals({ count = 7, className = "" }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(100 / count) * i + Math.random() * 6}%`,
        size: 14 + Math.random() * 12,
        duration: 14 + Math.random() * 10,
        delay: Math.random() * 10,
        drift: `${Math.random() > 0.5 ? "" : "-"}${20 + Math.random() * 40}px`,
        opacity: 0.5 + Math.random() * 0.3,
        hue: Math.random() > 0.5 ? "#e7a9bc" : "#f3cfdb",
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      className={`floating-petals-layer ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="floating-petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.8,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            "--drift": p.drift,
          }}
        >
          <svg viewBox="0 0 32 26" width="100%" height="100%">
            <path
              d="M16 0C22 4 32 8 30 16C28 24 18 26 16 26C14 26 4 24 2 16C0 8 10 4 16 0Z"
              fill={p.hue}
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** A single delicate rose line-illustration, used in letter corners etc. */
export function CornerRose({ className = "", flip = false }) {
  return (
    <svg
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      width="86"
      height="86"
      viewBox="0 0 86 86"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M43 20c7 3 12 9 11 16-1 7-8 11-15 10-6-1-10-6-9-12"
        stroke="#d98fa4"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M35 34c-3-6-1-13 5-16 6-3 13 0 15 6"
        stroke="#d98fa4"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="40" cy="30" r="5.5" stroke="#a94f68" strokeWidth="1.3" />
      <path
        d="M40 35c-2 10-7 18-16 24"
        stroke="#a6b49a"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M28 47c-4 1-8 0-10-3"
        stroke="#a6b49a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M32 55c-4 2-8 2-11 0"
        stroke="#a6b49a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small inline flower glyph used near headings/signatures. */
export function InlineBloom({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="4.5" fill="#d98fa4" />
      <g stroke="#d98fa4" strokeWidth="1.3" opacity="0.85">
        <ellipse cx="20" cy="9" rx="4.6" ry="7" />
        <ellipse cx="20" cy="9" rx="4.6" ry="7" transform="rotate(72 20 20)" />
        <ellipse
          cx="20"
          cy="9"
          rx="4.6"
          ry="7"
          transform="rotate(144 20 20)"
        />
        <ellipse
          cx="20"
          cy="9"
          rx="4.6"
          ry="7"
          transform="rotate(216 20 20)"
        />
        <ellipse
          cx="20"
          cy="9"
          rx="4.6"
          ry="7"
          transform="rotate(288 20 20)"
        />
      </g>
    </svg>
  );
}
