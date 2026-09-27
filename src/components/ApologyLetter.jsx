import { CornerRose, InlineBloom } from "./FlowerDecorations";

export default function ApologyLetter({ content, onNext }) {
  return (
    <section className="stage-container letter-stage">
      <div className="letter-card fade-in-up">
        <CornerRose className="letter-card__corner letter-card__corner--tl" />
        <CornerRose
          className="letter-card__corner letter-card__corner--br"
          flip
        />

        <h2 className="letter-heading rtl fade-in-up delay-1">
          {content.heading}
        </h2>

        <div className="letter-body rtl fade-in-up delay-2">
          {content.paragraphs.map((p, i) => (
            <p key={i} className="letter-paragraph">
              {p}
            </p>
          ))}
        </div>

        <div className="letter-signature rtl fade-in-up delay-3">
          <InlineBloom size={20} />
          <div>
            <span className="letter-signature__line">
              {content.signatureLine1}
            </span>
            <span className="letter-signature__name">
              {content.signatureLine2}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary letter-btn fade-in-up delay-4"
          onClick={onNext}
        >
          {content.buttonLabel}
        </button>
      </div>
    </section>
  );
}
