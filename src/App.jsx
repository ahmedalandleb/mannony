import { useCallback, useState } from "react";
import mennaContent from "./content/mennaContent";
import LockGate from "./components/LockGate";
import FloralWelcome from "./components/FloralWelcome";
import ApologyLetter from "./components/ApologyLetter";
import PhotoVoiceSection from "./components/PhotoVoiceSection";
import FinalBouquet from "./components/FinalBouquet";
import EnvelopeTransition from "./components/EnvelopeTransition";

const STAGES = {
  WELCOME: "welcome",
  LETTER: "letter",
  PHOTO_VOICE: "photoVoice",
  FINAL: "final",
};

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [stage, setStage] = useState(STAGES.WELCOME);
  const [showEnvelope, setShowEnvelope] = useState(false);

  const goToLetterViaEnvelope = useCallback(() => {
    setShowEnvelope(true);
  }, []);

  const handleEnvelopeDone = useCallback(() => {
    setShowEnvelope(false);
    setStage(STAGES.LETTER);
  }, []);

  const goTo = useCallback((next) => {
    setStage(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="app-shell">
      {!unlocked && (
        <LockGate content={mennaContent.lock} onUnlock={() => setUnlocked(true)} />
      )}

      {unlocked && showEnvelope && <EnvelopeTransition onDone={handleEnvelopeDone} />}

      {unlocked && !showEnvelope && stage === STAGES.WELCOME && (
        <FloralWelcome
          key="welcome"
          content={mennaContent.welcome}
          onNext={goToLetterViaEnvelope}
        />
      )}

      {unlocked && !showEnvelope && stage === STAGES.LETTER && (
        <ApologyLetter
          key="letter"
          content={mennaContent.letter}
          onNext={() => goTo(STAGES.PHOTO_VOICE)}
        />
      )}

      {unlocked && !showEnvelope && stage === STAGES.PHOTO_VOICE && (
        <PhotoVoiceSection
          key="photo-voice"
          content={mennaContent.photoVoice}
          onNext={() => goTo(STAGES.FINAL)}
        />
      )}

      {unlocked && !showEnvelope && stage === STAGES.FINAL && (
        <FinalBouquet
          key="final"
          content={mennaContent.final}
          onRereadLetter={() => goTo(STAGES.LETTER)}
          onRelisten={() => goTo(STAGES.PHOTO_VOICE)}
        />
      )}
    </div>
  );
}
