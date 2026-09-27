import { useEffect, useRef, useState, useCallback } from "react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "٠:٠٠";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

/**
 * Custom romantic audio player.
 * - Never autoplays.
 * - Handles loading / ready / playing / paused / ended / error states.
 * - No fake duration or progress — everything is driven by real
 *   HTMLAudioElement events.
 */
export default function CustomAudioPlayer({
  src,
  label,
  missingMessage,
}) {
  const audioRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | playing | paused | ended | error
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [sourceExists, setSourceExists] = useState(true);

  // Verify the audio file is actually reachable before treating it as usable.
  useEffect(() => {
    let cancelled = false;
    if (!src) {
      setSourceExists(false);
      setStatus("error");
      return;
    }
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        if (!res.ok) {
          setSourceExists(false);
          setStatus("error");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSourceExists(false);
          setStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !sourceExists) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setStatus((s) => (s === "loading" ? "ready" : s));
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setStatus("playing");
    const handlePause = () => {
      setStatus((s) => (s === "ended" ? s : "paused"));
    };
    const handleEnded = () => {
      setStatus("ended");
      setCurrentTime(audio.duration || 0);
    };
    const handleError = () => {
      setStatus("error");
      setSourceExists(false);
    };
    const handleCanPlay = () => {
      setStatus((s) => (s === "loading" ? "ready" : s));
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [sourceExists]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !sourceExists) return;

    if (status === "playing") {
      audio.pause();
    } else if (status === "ended") {
      audio.currentTime = 0;
      audio.play().catch(() => setStatus("error"));
    } else {
      audio.play().catch(() => setStatus("error"));
    }
  }, [status, sourceExists]);

  const handleSeek = useCallback(
    (e) => {
      const audio = audioRef.current;
      if (!audio || !duration || !sourceExists) return;
      const value = Number(e.target.value);
      audio.currentTime = value;
      setCurrentTime(value);
    },
    [duration, sourceExists]
  );

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isPlaying = status === "playing";

  return (
    <div className="audio-player" dir="rtl">
      {sourceExists && (
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          aria-hidden="true"
        />
      )}

      <div className="audio-player__row">
        <button
          type="button"
          className="audio-player__play-btn"
          onClick={togglePlay}
          disabled={!sourceExists || status === "loading"}
          aria-label={
            isPlaying ? "إيقاف الرسالة الصوتية مؤقتًا" : label || "تشغيل الرسالة الصوتية"
          }
        >
          {status === "loading" ? (
            <span className="audio-spinner" aria-hidden="true" />
          ) : isPlaying ? (
            <PauseIcon />
          ) : status === "ended" ? (
            <ReplayIcon />
          ) : (
            <PlayIcon />
          )}
        </button>

        <div className="audio-player__body">
          <div className="audio-player__meta">
            <RoseGlyph />
            <span className="audio-player__label">
              {status === "error" || !sourceExists
                ? missingMessage
                : label}
            </span>
          </div>

          {sourceExists && (
            <div className="audio-player__progress-wrap">
              <input
                type="range"
                className="audio-player__progress"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                disabled={!duration}
                aria-label="موضع التشغيل في الرسالة الصوتية"
                style={{ "--progress": `${progressPercent}%` }}
              />
              <div className="audio-player__time" aria-hidden="true">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : "--:--"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
    </svg>
  );
}
function ReplayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12a8 8 0 1 1 2.6 5.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M4 17v-5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function RoseGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="audio-player__rose">
      <circle cx="20" cy="20" r="4.5" fill="#d98fa4" />
      <g stroke="#d98fa4" strokeWidth="1.3" opacity="0.85">
        <ellipse cx="20" cy="9" rx="4.6" ry="7" />
        <ellipse cx="20" cy="9" rx="4.6" ry="7" transform="rotate(72 20 20)" />
        <ellipse cx="20" cy="9" rx="4.6" ry="7" transform="rotate(144 20 20)" />
        <ellipse cx="20" cy="9" rx="4.6" ry="7" transform="rotate(216 20 20)" />
        <ellipse cx="20" cy="9" rx="4.6" ry="7" transform="rotate(288 20 20)" />
      </g>
    </svg>
  );
}
