import { useCallback, useRef, useState } from "react";
import { FloatingPetals, InlineBloom } from "./FlowerDecorations";

export default function LockGate({ content, onUnlock }) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const [wrongOnce, setWrongOnce] = useState(false);
  const inputRef = useRef(null);

  const attemptUnlock = useCallback(
    (e) => {
      e.preventDefault();
      const guess = value.trim().toLowerCase();
      const answer = (content.password || "").trim().toLowerCase();

      if (guess.length > 0 && guess === answer) {
        onUnlock();
        return;
      }

      setWrongOnce(true);
      setShake(true);
      window.setTimeout(() => setShake(false), 420);
      inputRef.current?.focus();
    },
    [value, content.password, onUnlock]
  );

  return (
    <section className="stage-container lock-stage">
      <FloatingPetals count={5} />

      <div className="lock-card fade-in-up">
        <div className="lock-box" aria-hidden="true">
          <InlineBloom size={26} />
        </div>

        <p className="lock-outside-label rtl fade-in-up delay-1">
          {content.outsideLabel}
        </p>

        <form
          className={`lock-form ${shake ? "lock-form--shake" : ""}`}
          onSubmit={attemptUnlock}
        >
          <label className="visually-hidden" htmlFor="gift-password">
            {content.inputAriaLabel}
          </label>
          <input
            ref={inputRef}
            id="gift-password"
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            className="lock-input"
            placeholder={content.inputPlaceholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (wrongOnce) setWrongOnce(false);
            }}
            dir="rtl"
          />
          <button type="submit" className="btn-primary lock-btn">
            {content.buttonLabel}
          </button>
        </form>

        <p
          className={`lock-wrong-message rtl ${
            wrongOnce ? "lock-wrong-message--visible" : ""
          }`}
          role="alert"
        >
          {wrongOnce ? content.wrongMessage : ""}
        </p>
      </div>
    </section>
  );
}
