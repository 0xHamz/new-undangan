"use client";

import { useState, useEffect } from "react";



const images = ["/_MG_4129.JPG",
    "/_MG_4121.JPG",
    "/_MG_4099.JPG"]; // letakkan di /public

export default function Hero() {
  const fullName = "Naila & Hamzah";
  const [bgIndex, setBgIndex] = useState(0);

  const [showName, setShowName] = useState(false);
const [showOthers, setShowOthers] = useState(false);

useEffect(() => {
  const t1 = setTimeout(() => setShowName(true), 600);   // nama dulu
  const t2 = setTimeout(() => setShowOthers(true), 1400); // lainnya
  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
  };
}, []);


  // Ganti background tiap beberapa detik
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 8000); // ganti tiap 8 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex justify-center items-center overflow-hidden bg-gray-100">
      <div className="relative w-[500px] h-[650px] flex flex-col justify-center items-center overflow-hidden ">
        {/* Background sliding */}
        <div
          className="absolute inset-0 flex transition-transform duration-[8000ms] ease-linear"
          style={{ transform: `translateX(-${bgIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`bg-${idx}`}
              className="w-[500px] h-[650px] object-cover flex-shrink-0"
            />
          ))}
          {images.map((img, idx) => (
            <img
              key={`dup-${idx}`}
              src={img}
              alt={`bg-dup-${idx}`}
              className="w-[500px] h-[650px] object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Overlay tipis di atas bg sliding */}
        <div className="absolute inset-0 pointer-events-none
          bg-gradient-to-b
          from-black/40 via-black/50 to-white/50
        ">
        </div>

        {/* Overlay teks */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-4 pb-28">

          {/* Wedding Invitation */}
          <h2
            style={{ fontFamily: "Montserrat, Sans-serif" }}
            className={`text-sm text-white transition-all duration-[1600ms] ease-in-out
              ${showOthers
                ? "opacity-100 scale-100 scale-x-100"
                : "opacity-0 scale-[0.97] scale-x-[0.9]"
              }
            `}
          >
            Akad Nikah & Resepsi
          </h2>

          {/* Nama (tetap, smooth fade) */}
          <h1
            style={{
              fontFamily: "Tangerine, sans-serif",
              textShadow: "6px 6px 6px rgba(0,0,0,0.8)",
            }}
            className={`text-5xl text-white font-bold drop-shadow-lg m-4
              transition-opacity duration-[2000ms] ease-in-out
              ${showName ? "opacity-100" : "opacity-0"}
            `}
          >
            {fullName}
          </h1>

          {/* Garis (memanjang super halus) */}
          <div
            className={`h-[1px] bg-white origin-center transition-all duration-[1800ms] ease-in-out
              ${showOthers
                ? "opacity-80 w-64 scale-x-100"
                : "opacity-0 w-24 scale-x-[0.4]"
              }
            `}
          ></div>

          {/* Tanggal */}
          <h3
            style={{ fontFamily: "Reem Kufi Ink, Sans-serif" }}
            className={`text-sm m-4 text-white font-bold transition-all duration-[1600ms] ease-in-out
              ${showOthers
                ? "opacity-100 scale-100 scale-x-100"
                : "opacity-0 scale-[0.97] scale-x-[0.9]"
              }
            `}
          >
            10 ・ 04 ・ 2026
          </h3>
        </div>

        {/* Gelombang 3 layer full width */}
        <div className="absolute bottom-0 w-full overflow-hidden h-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 310"
            className="w-1500 h-full block"
            preserveAspectRatio="none"
          >
            {/* Layer tipis */}
            <path
              fill="#fafafa33"
              d="M0,160 C360,280 720,40 1080,160 C1260,220 1440,140 1440,160 L1440,320 L0,320 Z"
              className="animate-wave-slow"
            />
            {/* Layer sedang */}
            <path
              fill="#fafafa66"
              d="M0,180 C360,300 720,60 1080,180 C1260,240 1440,160 1440,180 L1440,320 L0,320 Z"
              className="animate-wave-medium"
            />
            {/* Layer tebal */}
            <path
              fill="#fafafa"
              d="M0,200 C360,320 720,80 1080,200 C1260,260 1440,180 1440,200 L1440,320 L0,320 Z"
              className="animate-wave-fast"
            />
          </svg>

          <style jsx>{`
            @keyframes waveSlow {
              0% { transform: translateX(0); }
              100% { transform: translateX(-560px); }
            }
            @keyframes waveMedium {
              0% { transform: translateX(0); }
              100% { transform: translateX(-550px); }
            }
            @keyframes waveFast {
              0% { transform: translateX(0); }
              100% { transform: translateX(-560px); }
            }

            .animate-wave-slow {
              animation: waveSlow 60s linear infinite;
            }
            .animate-wave-medium {
              animation: waveMedium 45s linear infinite;
            }
            .animate-wave-fast {
              animation: waveFast 30s linear infinite;
            }
          `}</style>
        </div>

      </div>
    </section>
  );
}
