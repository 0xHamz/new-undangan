import { useEffect, useState } from "react";

export default function MusicButton() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const muted = localStorage.getItem("mute") === "true";
    setPlaying(!muted);
  }, []);

  const toggleMusic = () => {
    const audio = window.__bgMusic;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      localStorage.setItem("mute", "false");
      setPlaying(true);
    } else {
      audio.pause();
      localStorage.setItem("mute", "true");
      setPlaying(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[9999]
                   w-10 h-10 rounded-full
                   bg-white/80 backdrop-blur
                   shadow-lg flex items-center justify-center"
      >
        <i
          className={`bi bi-music-note-beamed text-xl ${
            playing ? "animate-spin-slow" : ""
          }`}
        ></i>
      </button>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
