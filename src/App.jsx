import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./pages/Landing";
import AddGuest from "./pages/AddGuest";
import Undangan from "./pages/Undangan";
import MusicButton from "./components/MusicButton";

export default function App() {
  useEffect(() => {
    if (!window.__bgMusic) {
      const audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.volume = 0.8;
      audio.preload = "auto";
      window.__bgMusic = audio;
    }

    const playOnFirstTouch = () => {
      const muted = localStorage.getItem("mute") === "true";
      if (muted) return;

      window.__bgMusic
        .play()
        .then(() => console.log("🎵 iOS Safari PLAY"))
        .catch(() => console.log("❌ Blocked"));

      window.removeEventListener("touchstart", playOnFirstTouch);
      window.removeEventListener("click", playOnFirstTouch);
    };

    window.addEventListener("touchstart", playOnFirstTouch, { once: true });
    window.addEventListener("click", playOnFirstTouch, { once: true });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/undangan" element={<Undangan />} />
        <Route path="/add-guest" element={<AddGuest />} />
      </Routes>

      <MusicButton />
    </BrowserRouter>
  );
}
