export default function Footer() {
  const waNumber = "6289524894875"; // ganti nomor WA
  const waMessage = encodeURIComponent("Halo, saya ingin mengirim doa dan ucapan selamat."); 
  const igUsername = "akbarpratamaaaaa"; // ganti username IG
  const igMessage = encodeURIComponent("Halo, saya ingin mengirim doa dan ucapan selamat."); 

  return (
    <footer className="py-2 px-2 bg-gray-100 text-center space-y-3">
      <p className="text-xs text-gray-700">© 2025 Undangan Online. All rights reserved.</p>

      <div className="flex justify-center gap-2">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${waNumber}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-xs hover:opacity-90 transition"
        >
          <i className="bi bi-whatsapp text-white"></i>
          <span>Pesan via WhatsApp</span>
        </a>

        {/* Instagram */}
        <a
          href={`https://instagram.com/${igUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full text-xs hover:opacity-90 transition"
        >
          <i className="bi bi-instagram text-white"></i>
          <span>Pesan via Instagram</span>
        </a>
      </div>
    </footer>
  );
}
