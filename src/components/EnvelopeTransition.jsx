import { useEffect, useState } from "react";
import { InlineBloom } from "./FlowerDecorations";

/**
 * A brief, refined envelope-opening animation shown between the
 * welcome stage and the letter stage. Purely decorative — calls
 * onDone automatically once finished (or immediately under
 * prefers-reduced-motion, handled by the shorter CSS timing).
 */
export default function EnvelopeTransition({ onDone }) {
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const openTimer = requestAnimationFrame(() =>
      setTimeout(() => setOpening(true), 60)
    );
    const doneTimer = setTimeout(() => onDone?.(), 1050);
    return () => {
      cancelAnimationFrame(openTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className="envelope-overlay fade-in" role="status" aria-live="polite">
      <span className="visually-hidden">جاري فتح الهدية</span>
      <div className="envelope-scene">
        <div className="envelope-box">
          <div className="envelope-letter-peek is-rising">
            <InlineBloom size={26} />
          </div>
          <div
            className={`envelope-flap ${opening ? "is-opening" : ""}`}
            aria-hidden="true"
          />
          <div className="envelope-body" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
