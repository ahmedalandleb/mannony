import { FloatingPetals } from "./FlowerDecorations";

export default function FloralWelcome({ content, onNext }) {
  return (
    <section className="stage-container welcome-stage">
      <FloatingPetals count={6} />

      <div className="welcome-card fade-in-up">
        <div className="welcome-bouquet-wrap">
          <img
            src="/images/bouquet-main.jpg"
            alt="بوكيه ورد وردي وأبيض"
            className="welcome-bouquet-img soft-sway"
          />
          <div className="welcome-bouquet-glow" aria-hidden="true" />
        </div>

        <p className="eyebrow fade-in-up delay-1">{content.eyebrow}</p>
        <h1 className="welcome-title fade-in-up delay-2">{content.title}</h1>

        <p className="welcome-arabic rtl fade-in-up delay-3">
          {content.arabicMessage}
        </p>
        <p className="welcome-support rtl fade-in-up delay-3">
          {content.supportingLine}
        </p>

        <button
          type="button"
          className="btn-primary welcome-btn fade-in-up delay-4"
          onClick={onNext}
        >
          {content.buttonLabel}
        </button>
      </div>
    </section>
  );
}
