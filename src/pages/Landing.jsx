import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const photos = [
    "/bg-utama.jpg",
    "/bg-profil.jpg",
    "/wanita.jpg",
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

  // Animasi teks muncul sekali saat halaman dibuka
  useEffect(() => {
    // Wedding Invitation & button
    setTimeout(() => setAnimationStage((prev) => ({ ...prev, wedding: true, button: true })), 500);
    // Lokasi + Tanggal
    setTimeout(() => setAnimationStage((prev) => ({ ...prev, location: true, date: true })), 1200);
  }, []);

  // Slideshow foto
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index);
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % photos.length);
        setFade(true);
      }, 1500);
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="min-h-screen w-full flex justify-center items-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center block sm:hidden"
        style={{ backgroundImage: "url('/bg-utama.jpg')" }}
      ></div>

      <div className="relative w-[500px] max-w-[500px] h-screen bg-black bg-opacity-80 shadow-xl text-white ">
        <div className="absolute inset-0 bg-white/20"></div>

        <div className="relative z-10 p-6 pt-10 text-center space-y-6 w-full flex justify-center">
          <div className="w-full max-w-[300px]">
            {/* Teks Atas: Tanggal, Wedding, Lokasi */}
            <div className="flex justify-between items-center w-full font-serif relative">
              {/* Tanggal (slide-left) */}
              <h2
                className={`text-xs font-medium tracking-wider text-left transition-all duration-1000 ease-out transform ${
                  animationStage.date ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                10 • 04 • 2026
              </h2>

              {/* Wedding Invitation (scale-up) */}
              <p
                className={`text-[10px] italic text-center flex-1 transition-all duration-1000 ease-out transform ${
                  animationStage.wedding ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              >
                Wedding Invitation
              </p>

              {/* Lokasi (slide-right) */}
              <p
                className={`text-xs font-medium tracking-widest text-right flex items-center gap-1 transition-all duration-1000 ease-out transform ${
                  animationStage.location ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <i className="bi bi-geo-alt-fill text-[8px]"></i>
                Jawa Barat
              </p>
            </div>

            {/* Foto slideshow */}
            <div className="w-full flex justify-center mt-4">
              <div className="relative w-full max-w-[300px] h-[350px] overflow-hidden shadow-lg">
                <img
                  src={photos[index]}
                  className="absolute w-full h-full object-cover opacity-100"
                  alt="new"
                />
                <img
                  src={photos[prevIndex]}
                  className={`absolute w-full h-full object-cover transition-opacity duration-[2000ms] ${
                    fade ? "opacity-0" : "opacity-100"
                  }`}
                  alt="old"
                />
              </div>
            </div>

            {/* Kepada Yth */}
            <p className="text-xs font-small mt-12">Kepada Yth. Bapak/Ibu/Saudara/i</p>

            {/* Buka Undangan (bersamaan dengan Wedding) */}
            <div
              className={`flex justify-center transition-all duration-1000 ease-out transform ${
                animationStage.button ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <button
                onClick={() => navigate("/undangan")}
                className="mt-4 w-full max-w-[150px] py-2 text-xs text-black font-semibold bg-white/80 shadow-md hover:bg-white/100 transition duration-300"
              >
                Buka Undangan <i className="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
