import CustomAudioPlayer from "./CustomAudioPlayer";
import { InlineBloom } from "./FlowerDecorations";

export default function PhotoVoiceSection({ content, onNext }) {
  return (
    <section className="stage-container photovoice-stage">
      <div className="photovoice-card fade-in-up">
        <div className="photovoice-photo-col">
          <div className="photo-frame">
            <img
              src="/images/menna-us.jpeg"
              alt={content.photoAlt}
              className="photo-frame__img"
            />
          </div>
          <p className="photo-caption rtl fade-in-up delay-1">
            {content.photoCaption}
          </p>
        </div>

        <div className="photovoice-audio-col">
          <div className="audio-heading rtl fade-in-up delay-2">
            <InlineBloom size={22} />
            <h2>{content.audioTitle}</h2>
          </div>
          <p className="audio-subtitle rtl fade-in-up delay-2">
            {content.audioSubtitle}
          </p>

          <div className="fade-in-up delay-3">
            <CustomAudioPlayer
              src="/audio/menna-message.mp3"
              label={content.playButtonLabel}
              missingMessage={content.audioMissingMessage}
            />
          </div>

          <button
            type="button"
            className="btn-primary photovoice-btn fade-in-up delay-4"
            onClick={onNext}
          >
            {content.continueButtonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
