import { createContext, useState, useEffect, useContext } from "react";

const JadwalContext = createContext();

export const JadwalGlobal = ({ children }) => {
  const [jadwal, setJadwal] = useState([]);

  // Lifecycle: Memuat daftar tugas dari localStorage saat aplikasi pertama kali dijalankan (Mounting)
  useEffect(() => {
    const simpanJadwal = JSON.parse(localStorage.getItem("jadwal"));
    if (simpanJadwal) {
      setJadwal(simpanJadwal);
    }
  }, []);

  // Lifecycle: Menyimpan daftar tugas ke localStorage setiap kali todos berubah (Updating)
  useEffect(() => {
    localStorage.setItem("jadwal", JSON.stringify(jadwal));
  }, [jadwal]);

  const tambahJadwal = (tugas) => {
    if (!tugas || typeof tugas !== "string") return;
    console.log("Menambahkan tugas:", tugas); // Debugging
    setJadwal([...jadwal, { id: Date.now(), tugas: tugas.trim() }]);
  };

  const hapusJadwal = (id) => {
    setJadwal(jadwal.filter((jdwl) => jdwl.id !== id));
  };

  return (
    <JadwalContext.Provider value={{ jadwal, tambahJadwal, hapusJadwal }}>
      {children}
    </JadwalContext.Provider>
  );
};

export const useJadwal = () => useContext(JadwalContext);
