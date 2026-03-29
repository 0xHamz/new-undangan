import { useState, useEffect, useRef } from "react";

export default function LokasiAcara() {
  const eventDate = new Date("2026-04-10T10:00:00");

  // refs untuk kedua gambar
  const akadRef = useRef(null);
  const ngunduhRef = useRef(null);

  const [visible, setVisible] = useState({ akad: false, ngunduh: false });

  // Countdown (tetap seperti sebelumnya)
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = eventDate - new Date();
      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // IntersectionObserver untuk animasi muncul saat scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === akadRef.current) setVisible(v => ({ ...v, akad: entry.isIntersecting }));
          if (entry.target === ngunduhRef.current) setVisible(v => ({ ...v, ngunduh: entry.isIntersecting }));
        });
      },
      { threshold: 0.1 } // muncul saat 20% terlihat
    );

    if (akadRef.current) observer.observe(akadRef.current);
    if (ngunduhRef.current) observer.observe(ngunduhRef.current);

    return () => {
      if (akadRef.current) observer.unobserve(akadRef.current);
      if (ngunduhRef.current) observer.unobserve(ngunduhRef.current);
    };
  }, []);

  // class animasi
  const animClass = (show) => 
    `transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  return (
    <section className="relative flex justify-center items-center h-full w-full overflow-hidden bg-gray-100">
      <div className="relative w-[500px] max-w-[500px] h-[850px] flex flex-col items-center overflow-hidden">

        {/* Akad Nikah */}
        <div ref={akadRef} className={`relative w-[400px] h-[400px] rounded-lg overflow-hidden shadow-xl top-0 ${animClass(visible.akad)}`}>
          <img src="/logo2.png" alt="Lokasi" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center">
            <h2 style={{ fontFamily: "Great Vibes, sans-serif", color: "#C9A227" }} className="pt-20 text-2xl font-bold drop-shadow-md">Akad Nikah & Resepsi</h2>
            <img src="/logo1.png" alt="Logo Lokasi" className="w-[180px] p-1" />
            <div className="p-4 text-center leading-tight">
              <h2 style={{ fontFamily: "Great Vibes, sans-serif" }} className="text-2xl drop-shadow-md">Jum'at, 10 April 2026</h2>
              <h2 className="m-2 text-xs drop-shadow-md">Pukul : 09:00 WIB - Selesai</h2>
              <p className="pt-6 text-[10px] drop-shadow-md mx-4 text-center" style={{ color: "#0f5132" }}>Tempat : Japura Kidul, Kec. Astanajapura</p>
              <p className="text-[10px] drop-shadow-md mx-6 text-center" style={{ color: "#0f5132" }}>Kabupaten Cirebon, Jawa Barat</p>
              <a href="https://maps.app.goo.gl/GtDyVy1igoCcLcRt8" target="_blank" rel="noopener noreferrer">
                <button className="mt-4 bg-[#0f5132] text-white px-4 py-2 rounded-full shadow-md text-[10px] hover:opacity-90 transition gap-1">
                  <i className="bi bi-geo-alt-fill text-white text-[12px]"></i> <span>Lihat Lokasi</span>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Ngunduh Mantu */}
        <div ref={ngunduhRef} className={`relative w-[400px] h-[400px] rounded-lg overflow-hidden shadow-xl top-0 pt-8 ${animClass(visible.ngunduh)}`}>
          <img src="/logo2.png" alt="Lokasi" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center">
            <h2 style={{ fontFamily: "Great Vibes, sans-serif", color: "#C9A227" }} className="pt-24 text-2xl font-bold drop-shadow-md">Ngunduh Mantu</h2>
            <img src="/logo1.png" alt="Logo Lokasi" className="w-[180px] p-1" />
            <div className="p-4 text-center leading-tight">
              <h2 style={{ fontFamily: "Great Vibes, sans-serif" }} className="text-2xl drop-shadow-md">Sabtu, 18 April 2026</h2>
              <h2 className="m-2 text-xs drop-shadow-md">Pukul : 09:00 WIB - Selesai</h2>
              <p className="pt-6 text-[10px] drop-shadow-md mx-24 text-center" style={{ color: "#0f5132" }}>Tempat : Mutihan RT 5 RW 11 Sondakan Laweyan</p>
              <p className="text-[10px] drop-shadow-md mx-6 text-center" style={{ color: "#0f5132" }}>Kota Surakarta, Jawa Tengah</p>
              <a href="https://maps.app.goo.gl/JNBUmsPg28GatJNX6" target="_blank" rel="noopener noreferrer">
                <button className="mt-4 bg-[#0f5132] text-white px-4 py-2 rounded-full shadow-md text-[10px] hover:opacity-90 transition gap-1">
                  <i className="bi bi-geo-alt-fill text-white text-[12px]"></i> <span>Lihat Lokasi</span>
                </button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
