import { useState, useEffect, useRef } from "react";

export default function Acara() {
  const eventDate = new Date("2026-04-10T10:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const countdownRef = useRef(null);

  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [countdownVisible, setCountdownVisible] = useState(false);

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;
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

  // IntersectionObserver untuk animasi loop
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === titleRef.current) setTitleVisible(entry.isIntersecting);
          if (entry.target === subtitleRef.current) setSubtitleVisible(entry.isIntersecting);
          if (entry.target === countdownRef.current) setCountdownVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // 30% terlihat
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (countdownRef.current) observer.observe(countdownRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
      if (countdownRef.current) observer.unobserve(countdownRef.current);
    };
  }, []);

  return (
    <section className="relative flex justify-center items-center overflow-hidden bg-gray-100">
      <div
        className="relative w-[500px] max-w-[500px] h-[650px] flex flex-col justify-center items-center overflow-hidden"
        style={{
          backgroundImage: "url('/bg-utama.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <img src="/bg-133.png" alt="Lokasi Acara" className="absolute top-0 left-0 object-cover" />
        <img src="/bg-14.png" alt="Lokasi Acara" className="absolute bottom-0 h-[380px] w-full left-0 object-cover" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full bottom-0 space-y-6 pt-80">

          <img src="/logoacara.png" alt="Logo" className={`w-44 text-2xl drop-shadow-md transition-all duration-1000 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`} />

          {/* Judul */}
          <h2
            ref={titleRef}
            style={{ fontFamily: "Great Vibes, sans-serif" }}
            className={`text-2xl drop-shadow-md transition-all duration-1000 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Save The Date
          </h2>

          {/* Subtitle */}
          <h5
            ref={subtitleRef}
            className={`text-[12px] m-14 drop-shadow-md transition-all duration-1000 ${
              subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Dan kami bersyukur, dipertemukan Allah di waktu terbaik. Kini kami menanti hari istimewa kami.
          </h5>

          {/* Countdown */}
          <div
            ref={countdownRef}
            className={`flex gap-4 text-center transition-all duration-1000 ${
              countdownVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {["Hari", "Jam", "Menit", "Detik"].map((label, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center w-14 h-14 bg-white/80 border border-gray-300 rounded-lg shadow-md p-2"
              >
                <span className="text-sm font-bold">
                  {i === 0
                    ? timeLeft.days
                    : i === 1
                    ? timeLeft.hours
                    : i === 2
                    ? timeLeft.minutes
                    : timeLeft.seconds}
                </span>
                <span className="text-[10px]">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
