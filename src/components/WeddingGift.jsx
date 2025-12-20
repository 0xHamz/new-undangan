import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://twumznwbegoeqcplklnm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dW16bndiZWdvZXFjcGxrbG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjU0MDAsImV4cCI6MjA3OTY0MTQwMH0.KpLgwbmBPVRE2ZImLdJP3tF_GwPUqU1XQ6dZERcGKYI"
);

export default function WeddingGift() {
  const [open, setOpen] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      const { data, error } = await supabase
        .from("wishes")
        .select("nama, pesan, created_at")
        .order("created_at", { ascending: false });

      if (!error) setWishes(data);
      setLoading(false);
    };

    fetchWishes();
  }, []);

  return (
    <div className="flex justify-center items-start w-full bg-gray-100 py-10">
      {/* Kontainer desktop tetap */}
      <div className="relative w-[500px] h-full flex flex-col text-center items-center">
        <h3 className="text-xs font-semibold text-[#0f5132] mb-5 px-10">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami, dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.
        </h3>
        {/* Tombol Wedding Gift */}
        <button
          onClick={() => setOpen(!open)}
          className="bg-[#0f5132] text-white px-6 py-2 rounded-full shadow-md text-sm hover:opacity-90 transition flex items-center gap-2"
        >
          <i className="bi bi-gift-fill text-white"></i>
          <span>Wedding Gift</span>
        </button>

        {/* Box rekening (animasi PURE Tailwind) */}
        <div
          className={`
            mt-8 w-[90%] max-w-[380px]
            transition-all duration-300 ease-out
            ${open 
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
              : "opacity-0 translate-y-3 scale-95 pointer-events-none absolute"
            }
            `}
        >
          {/* KARTU BSI */}
          <div
          className="w-[340px] h-[200px] rounded-xl shadow-lg bg-cover bg-center p-4 mb-4 mx-auto"
          style={{ backgroundImage: "url('/bg-bank.webp')" }}
          >
            <div className="flex justify-end items-center mb-6">
              <img src="/bsi.png" alt="BRI" className="h-5 opacity-90" />
            </div>
            <div className="flex justify-start items-center">
              <img src="/chip.png" alt="BRI" className="h-8 opacity-90" />
            </div>

            <p 
            style={{ fontFamily: "Jura, sans-serif" }}
            className="text-[14px] flex justify-between items-center mt-2 font-semibold">
              7206717941
            </p>

            <p 
            style={{ fontFamily: "Jura, sans-serif" }}
            className="text-[14px] flex justify-between items-center font-semibold">NAILA FARAH</p>

            {/* Tombol Copy di pojok kanan bawah */}
            <button
              onClick={() => navigator.clipboard.writeText("9876543210987654")}
              className="absolute bottom-13 right-10 text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition flex items-center gap-1 shadow"
            >
              <i class="bi bi-copy"></i> <span>Salin</span>
            </button>

          </div>
          {/* KARTU BRI */}
          <div
          className="w-[340px] h-[200px] rounded-xl shadow-lg bg-cover bg-center p-4 mb-4 mx-auto"
          style={{ backgroundImage: "url('/bg-bank.webp')" }}
          >
            <div className="flex justify-end items-center mb-6">
              <img src="/dana.png" alt="BRI" className="h-5 opacity-90" />
            </div>
            <div className="flex justify-start items-center">
              <img src="/chip.png" alt="BRI" className="h-8 opacity-90" />
            </div>

            <p 
            style={{ fontFamily: "Jura, sans-serif" }}
            className="text-[14px] flex justify-between items-center mt-2 font-semibold">
              9876 5432 1098 7654
            </p>

            <p 
            style={{ fontFamily: "Jura, sans-serif" }}
            className="text-[14px] flex justify-between items-center font-semibold">NAILA FARAH</p>

            {/* Tombol Copy di pojok kanan bawah */}
            <button
              onClick={() => navigator.clipboard.writeText("9876543210987654")}
              className="absolute bottom-13 right-10 text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition flex items-center gap-1 shadow"
            >
              <i class="bi bi-copy"></i> <span>Salin</span>
            </button>

          </div>
          {/* KARTU BNI */}
          <div
          className="w-[340px] h-[200px] rounded-xl shadow-lg bg-cover bg-center p-4 mb-4 mx-auto"
          style={{ backgroundImage: "url('/bg-bank.webp')" }}
          >
            <div className="flex justify-end items-center mb-6">
              <img src="/shopee.png" alt="BRI" className="h-5 opacity-90" />
            </div>
            <div className="flex justify-start items-center">
              <img src="/chip.png" alt="BRI" className="h-8 opacity-90" />
            </div>

            <p 
            style={{ fontFamily: "Jura, sans-serif" }}
            className="text-[14px] flex justify-between items-center mt-2 font-semibold">
              9876 5432 1098 7654
            </p>

            <p 
            style={{ fontFamily: "Jura, sans-serif" }}
            className="text-[14px] flex justify-between items-center font-semibold">NAILA FARAH</p>

            {/* Tombol Copy di pojok kanan bawah */}
            <button
              onClick={() => navigator.clipboard.writeText("9876543210987654")}
              className="absolute bottom-13 right-10 text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition flex items-center gap-1 shadow"
            >
              <i class="bi bi-copy"></i> <span>Salin</span>
            </button>

          </div>
          {/* KARTU ALAMAT */}
          <div
          className="w-[340px] h-[200px] rounded-xl shadow-lg bg-cover bg-center p-4 mb-4 mx-auto"
          style={{ backgroundImage: "url('/bg-bank.webp')" }}
          >
            <div className="flex justify-end items-center mb-6">
              <img src="/bni.png" alt="BRI" className="h-5 opacity-90" />
            </div>
            <div className="flex justify-start items-center">
              <img src="/chip.png" alt="BRI" className="h-8 opacity-90" />
            </div>

            <p 
            style={{ fontFamily: "Jura, sans-serif" }}
            className="text-[14px] flex justify-between items-center mt-2 font-semibold">
              9876 5432 1098 7654
            </p>

            <p 
            style={{ fontFamily: "Jura, sans-serif" }}
            className="text-[14px] flex justify-between items-center font-semibold">NAILA FARAH</p>

            {/* Tombol Copy di pojok kanan bawah */}
            <button
              onClick={() => navigator.clipboard.writeText("9876543210987654")}
              className="absolute bottom-15 right-14 text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition flex items-center gap-1 shadow"
            >
              <i class="bi bi-copy"></i> <span>Salin</span>
            </button>

          </div>
        </div>
            
        {/* Wishes */}
        <div
          className={`
            w-[90%] text-center max-w-[380px]
            transition-all duration-300
            ${open ? "mt-2" : "mt-3"}
          `}
        >
          <h3 className="text-lg font-semibold text-[#0f5132] mb-2 mt-20">Wishes</h3>
          <h3 className="text-xs font-semibold text-[#0f5132] mb-8">
            Berikan ucapan harapan dan do'a untuk kedua mempelai
          </h3>

          {/* Form kirim wishes + konfirmasi kehadiran */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const nama = e.target.nama.value.trim();
              const pesan = e.target.pesan.value.trim();
              const hadir = e.target.hadir.value === "Hadir"; // konversi ke boolean

              if (!nama || !pesan) return;

              const { data, error } = await supabase
                .from("wishes") // sesuaikan nama tabel
                .insert([{ nama, pesan, hadir }])
                .select();

              if (!error && data) {
                setWishes([data[0], ...wishes]); // update list
                e.target.reset();
              }
            }}
            className="flex flex-col gap-2 mb-3 items-center"
          >
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              className="p-2 rounded-lg border border-gray-300 text-sm w-[340px]"
              required
            />

            <textarea
              name="pesan"
              placeholder="Pesan"
              className="p-2 rounded-lg border border-gray-300 text-sm w-[340px] h-[200px]"
              required
            />

            <select
              name="hadir"
              className="p-2 rounded-lg border border-gray-300 text-sm w-[340px]"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Konfirmasi Kehadiran
              </option>
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>

            <button
              type="submit"
              className="bg-[#0f5132] text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition w-[340px]"
            >
              Kirim
            </button>
          </form>

          {/* Daftar wishes */}
          {loading ? (
            <p className="text-sm text-gray-600">Loading...</p>
          ) : wishes.length === 0 ? (
            <p className="text-sm text-gray-600">Belum ada ucapan.</p>
          ) : (
            <div className="space-y-3 max-h-[250px] overflow-y-auto p-1">
              {wishes.map((w, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-xl border shadow-sm text-left"
                >
                  <p className="text-sm font-semibold text-[#0f5132]">{w.nama}</p>
                  <p className="text-sm text-gray-700">{w.pesan}</p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {new Date(w.created_at).toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs mt-1">
                    Kehadiran: <span className="font-semibold">{w.hadir ? "Hadir" : "Tidak Hadir"}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
