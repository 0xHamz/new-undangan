import { useState, useEffect } from "react";
import { useNavigate, useSearchParams  } from "react-router-dom";

export default function Landing() {
  const photos = [
    "/_MG_4099.JPG",
    "/_MG_4121.JPG",
    "/_MG_4129.JPG",
  ];


  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [animationStage, setAnimationStage] = useState({
    wedding: false,
    location: false,
    date: false,
    button: false,
  });

  const [searchParams] = useSearchParams();
  const [guestName, setGuestName] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
  const slug = searchParams.get("to");

  if (!slug) return;

  fetch(`${API_URL}/api/guest/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      if (data?.name) setGuestName(data.name);
    });
}, [searchParams]);



  // Animasi teks
  useEffect(() => {
    setTimeout(() => setAnimationStage((p) => ({ ...p, wedding: true, button: true })), 500);
    setTimeout(() => setAnimationStage((p) => ({ ...p, location: true, date: true })), 1200);
  }, []);

  // Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index);
      setFade(false);
      setTimeout(() => {
        setIndex((p) => (p + 1) % photos.length);
        setFade(true);
      }, 1500);
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  // Auto play music (iOS safe)
  useEffect(() => {
    const autoPlay = () => {
      const btn = document.getElementById("music-btn");
      const muted = localStorage.getItem("mute") === "true";
      if (btn && !muted) btn.click();
      window.removeEventListener("click", autoPlay);
      window.removeEventListener("touchstart", autoPlay);
    };
    window.addEventListener("click", autoPlay);
    window.addEventListener("touchstart", autoPlay);
    return () => {
      window.removeEventListener("click", autoPlay);
      window.removeEventListener("touchstart", autoPlay);
    };
  }, []);

  return (
    <section className="min-h-screen w-full flex justify-center items-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center block sm:hidden"
        style={{ backgroundImage: "url('/bg-utama.jpg')" }}
      />

      <div className="relative w-[500px] max-w-[500px] h-screen bg-black bg-opacity-80 shadow-xl text-white">
        <div className="absolute inset-0 bg-white/20" />

        <div className="relative z-10 p-6 pt-10 text-center space-y-6 w-full flex justify-center">
          <div className="w-full max-w-[300px]">

            {/* HEADER */}
            <div className="flex justify-between items-center w-full font-serif">
              <h2 className={`text-xs transition-all duration-1000 ${animationStage.date ? "opacity-100" : "opacity-0 -translate-x-6"}`}>
                10 • 04 • 2026
              </h2>

              <p className={`text-[10px] italic transition-all duration-1000 ${animationStage.wedding ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                Wedding Invitation
              </p>

              <p className={`text-xs transition-all duration-1000 ${animationStage.location ? "opacity-100" : "opacity-0 translate-x-6"}`}>
                <i className="bi bi-geo-alt-fill text-[8px]" /> Jawa Barat
              </p>
            </div>

            {/* FOTO SOBEKAN */}
            <div className="w-full flex justify-center mt-4">
              <div className="relative w-full max-w-[300px] h-[320px]">

                {/* BORDER PUTIH — TEBAL DI BAWAH + SHADOW */}
                <img
                  src="/bg-kw.png" // gambar sobekan putih
                  alt="border"
                  className="absolute bottom-0 top-0 left-0 w-full z-0"
                  style={{
                    filter: "drop-shadow(0 16px 8px rgba(0,0,0,0.25))",
                  }}
                />

                {/* FOTO TERPOTONG */}
                <div
                  className="relative w-full h-full z-10"
                  style={{
                    WebkitMaskImage: "url('/bg-asli.png')",
                    WebkitMaskSize: "99.5% 100%",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: "url('/bg-asli.png')",
                    maskPosition: "center",
                    maskSize: "99.5% 100%",
                    maskRepeat: "no-repeat",
                  }}
                >
                  <img
                    src={photos[index]}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity"
                    alt="new"
                  />
                  <img
                    src={photos[prevIndex]}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms]"
                    style={{ opacity: fade ? 0 : 1 }}
                    alt="old"
                  />
                </div>
              </div>
            </div>


            {/* FOOTER */}
            <div
              className="mt-12 flex items-top justify-center"
              style={{ gap: "6px" }}
            >
              {/* DEAR (kecil) */}
              <span
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "13px",
                  lineHeight: "1",
                  transform: "translateY(-8px)",
                  opacity: 0.8,
                }}
              >
                Dear
              </span>

              {/* NAMA (besar) */}
              <span
                className="text-2xl"
              >
                {guestName || "Tamu Undangan"}
              </span>
            </div>

            <div className={`flex justify-center transition-all duration-1000 ${animationStage.button ? "opacity-100" : "opacity-0 translate-y-4"}`}>
              <button
                onClick={() => navigate("/undangan")}
                className="mt-4 w-full max-w-[150px] py-2 text-xs text-black font-semibold bg-white/80 shadow-md hover:bg-white transition"
              >
                Buka Undangan <i className="bi bi-send" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
