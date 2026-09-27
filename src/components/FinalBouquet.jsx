import { FloatingPetals, InlineBloom } from "./FlowerDecorations";

export default function FinalBouquet({ content, onRereadLetter, onRelisten }) {
  return (
    <section className="stage-container final-stage">
      <FloatingPetals count={5} />

      <div className="final-card fade-in-up">
        <div className="final-bouquet-wrap">
          <img
            src="/images/bouquet-peach.jpg"
            alt="بوكيه ورد كبير أبيض ووردي"
            className="final-bouquet-img"
          />
        </div>

        <h2 className="final-heading rtl fade-in-up delay-1">
          {content.heading}
        </h2>

        <div className="final-body rtl fade-in-up delay-2">
          {content.paragraphs.map((p, i) => (
            <p key={i} className="final-paragraph">
              {p}
            </p>
          ))}
        </div>

        <div className="final-signature fade-in-up delay-3">
          <InlineBloom size={18} />
          <span>{content.signature}</span>
        </div>
        <p className="final-note fade-in-up delay-3">{content.smallNote}</p>

        <div className="final-actions fade-in-up delay-4">
          <button
            type="button"
            className="btn-secondary"
            onClick={onRereadLetter}
          >
            {content.rereadButtonLabel}
          </button>
          <button type="button" className="btn-secondary" onClick={onRelisten}>
            {content.relistenButtonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
