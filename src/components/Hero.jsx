import { useState, useEffect } from "react";

export default function Hero() {
  const [displayedName, setDisplayedName] = useState("");
  const [showText, setShowText] = useState(false);
  const fullName = "Hamzah & Naila";

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 800);

    let index = 0;
    let typing;
    if (showText) {
      typing = setInterval(() => {
        setDisplayedName(fullName.slice(0, index + 1));
        index++;
        if (index === fullName.length) clearInterval(typing);
      }, 180);
    }

    return () => {
      clearTimeout(textTimer);
      clearInterval(typing);
    };
  }, [showText]);

  return (
    <section className="relative flex justify-center items-center w-full overflow-hidden bg-zinc-50">
      {/* Wrapper fixed size */}
      <div className="relative w-[500px] h-[700px] flex justify-center items-center">
        {/* Bingkai full */}
        <img
          src="/gunungan.webp"
          alt="Bingkai"
          className={`absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-1000 ${
            showText ? "scale-100" : "scale-0"
          }`}
        />

        <img
          src="/bingkai.png"
          alt="Bingkai"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Teks, ditempatkan agak bawah */}
        {showText && (
          <div className="relative z-10 flex flex-col items-center text-center space-y-2 justify-end pb-40 h-full">
            <h2
              style={{ fontFamily: "Great Vibes, sans-serif" }}
              className="text-2xl mb-12 animate-fadeIn"
            >
              Wedding of
            </h2>

            <h1
              style={{ fontFamily: "Tangerine, sans-serif" }}
              className="text-5xl font-bold drop-shadow-lg animate-fadeIn"
            >
              {displayedName.split(" & ")[0]} <br />
              & <br />
              {displayedName.split(" & ")[1]}
              <span className="border-r-2 border-white animate-pulse ml-1"></span>
            </h1>
          </div>
        )}
      </div>

      {/* Animasi fadeIn */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
