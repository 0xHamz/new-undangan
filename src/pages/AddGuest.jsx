import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

export default function AddGuest() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==========================
  // Ambil list tamu
  // ==========================
  const fetchGuests = async () => {
    try {
      const res = await fetch(`${API_URL}/api/guest`);
      const data = await res.json();
      setGuests(data);
    } catch (err) {
      console.error("Gagal ambil tamu", err);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  // ==========================
  // Submit tamu baru
  // ==========================
  const submit = async () => {
    if (!name.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch(`${API_URL}/api/guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      setResult(`${FRONTEND_URL}/?to=${data.slug}`);
      setName("");
      fetchGuests();
    } catch (err) {
      console.error("Gagal simpan tamu", err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Delete tamu
  // ==========================
  const handleDelete = async (id) => {
    if (!confirm("Hapus tamu ini?")) return;

    try {
      await fetch(`${API_URL}/api/guest/${id}`, {
        method: "DELETE",
      });
      fetchGuests();
    } catch (err) {
      console.error("Gagal hapus tamu", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold text-center">Tambah Tamu</h2>

      {/* FORM */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nama Tamu"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-gray-300"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setResult("");
          }}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>

        {result && (
          <div className="bg-gray-100 p-3 rounded text-sm break-all">
            <span className="font-medium">Link:</span>{" "}
            <a
              href={result}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {result}
            </a>
          </div>
        )}
      </div>

      {/* LIST TAMU */}
      <div>
        <h3 className="font-semibold mb-3">Daftar Tamu</h3>

        {guests.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            Belum ada tamu
          </p>
        ) : (
          <ul className="space-y-2">
            {guests.map((g) => (
              <li
                key={g._id}
                className="border rounded p-3 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{g.name}</span>
                  <a
                    href={`${FRONTEND_URL}/?to=${g.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 break-all"
                  >
                    {FRONTEND_URL}/?to={g.slug}
                  </a>
                </div>

                <button
                  onClick={() => handleDelete(g._id)}
                  className="text-red-600 hover:text-red-800 text-lg"
                  title="Hapus"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
