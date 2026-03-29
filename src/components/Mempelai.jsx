import React, { useEffect, useRef, useState } from "react";

export default function Mempelai() {
  const priaRef = useRef(null);
  const wanitaRef = useRef(null);
  const [priaVisible, setPriaVisible] = useState(false);
  const [wanitaVisible, setWanitaVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === priaRef.current) {
            setPriaVisible(entry.isIntersecting); // tetap true selama elemen terlihat
          }
          if (entry.target === wanitaRef.current) {
            setWanitaVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 } // animasi mulai ketika 30% terlihat
    );

    if (priaRef.current) observer.observe(priaRef.current);
    if (wanitaRef.current) observer.observe(wanitaRef.current);

    return () => {
      if (priaRef.current) observer.unobserve(priaRef.current);
      if (wanitaRef.current) observer.unobserve(wanitaRef.current);
    };
  }, []);

  return (
    <section className="overflow-x-hidden relative flex justify-center items-center min-h-screen bg-zinc-50">
      <div className="relative w-[500px] max-w-[500px] h-auto bg-zinc-50 shadow-xl flex flex-col justify-center items-center px-6 py-12 space-y-8">

        <div className="grid grid-cols-1 gap-8 justify-items-center">
          {/* Judul dengan garis kiri, icon, dan text */}
          <div className="flex items-center w-full">
            {/* Garis kiri */}
            <div className="-ml-16 flex-grow h-[1px] bg-black"></div>
            <h2
              style={{ fontFamily: "Great Vibes, sans-serif" }}
              className="text-xl font-semibold mx-4 text-gray-800"
            >
              Mempelai
            </h2>
            {/* Icon */}
            <i className="bi bi-people text-xl text-gray-800 -mr-16"></i>
            {/* Text */}
          </div>

          {/* Mempelai Wanita */}
          <div
            ref={wanitaRef}
            className={`flex flex-col items-center text-center p-4 transition-all duration-1000 ${
              wanitaVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="relative w-60 h-[300px] border border-white shadow-[0_10px_15px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.2)] transition-transform duration-500 hover:scale-105 overflow-hidden bg-white">
              <div className="absolute inset-0 top-3 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/_MG_4086.JPG')" }} />
              <div style={{ fontFamily: "Tangerine, sans-serif" }} className="absolute left-4 bottom-4 z-10 px-2 py-1 rounded text-3xl font-semibold">Naila</div>
              <img src="/bg-7.png" alt="Naila Farah" className="absolute bottom-0 w-full h-1/2 object-cover shadow-lg" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-800">Naila Farah, S.Pd</h3>
            <p className="mt-2 text-xs text-gray-400 max-w-xs">Putri dari Bapak Asan Nuryanto dan Ibu Rukoyah, S.Pd.I</p>
          </div>

          {/* Mempelai Pria */}
          <div
            ref={priaRef}
            className={`flex flex-col items-center text-center p-4 transition-all duration-1000 ${
              priaVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            <div className="relative w-60 h-[300px] border border-white shadow-[0_10px_15px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.2)] transition-transform duration-500 hover:scale-105 overflow-hidden bg-white">
              <div className="absolute top-3 inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/_MG_4082.JPG')" }} />
              <div style={{ fontFamily: "Tangerine, sans-serif" }} className="absolute left-4 bottom-4 z-10 px-2 py-1 rounded text-3xl font-semibold">Hamzah</div>
              <img src="/bg-7.png" alt="Hamzah Akbar Pratama" className="absolute bottom-0 w-full h-1/2 object-cover shadow-lg" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-800">Hamzah Akbar Pratama, S.Kom</h3>
            <p className="mt-2 text-xs text-gray-400 max-w-xs">Putra dari Bapak Dwi Suseno dan Ibu Sukasmi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
