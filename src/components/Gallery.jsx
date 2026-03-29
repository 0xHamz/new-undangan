"use client";

import { useEffect, useRef, useState } from "react";

export default function GallerySection() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setShow(e.isIntersecting),
      { threshold: 0.2 }
    );
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const photos = ["/_MG_4058.JPG", "/_MG_4099.JPG", "/_MG_4121.JPG", "/_MG_4129.JPG"];

  return (
    <section ref={ref} className="py-16 bg-gray-50 flex justify-center">
      <div
        className={`w-[500px] px-4 transition-all duration-700
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="flex items-center mb-8">
          <i className="bi bi-bookmark m-2 text-xl"></i>
          <h2
            style={{ fontFamily: "Great Vibes, sans-serif" }}
            className="ml-4 text-lg font-bold"
          >
            Gallery
          </h2>
          <div className="flex-grow ml-4 h-px bg-black" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((src, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`aspect-square rounded-xl shadow-lg overflow-hidden
              transition-all duration-1700
              ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              hover:scale-105`}
            >
              <img src={src} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
