import { createContext, useContext, useState, useEffect } from "react";

const JadwalContext = createContext();

export const useJadwal = () => useContext(JadwalContext);

export const JadwalProvider = ({ children }) => {
  const [jadwalList, setJadwalList] = useState([]);

  useEffect(() => {
    const savedJadwal = JSON.parse(localStorage.getItem("jadwalList"));
    if (savedJadwal) setJadwalList(savedJadwal);
  }, []);

  useEffect(() => {
    localStorage.setItem("jadwalList", JSON.stringify(jadwalList));
  }, [jadwalList]);

  const editJadwal = (id, newTask) => {
    setJadwalList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, tugas: newTask } : item))
    );
  };

  const hapusJadwal = (id) => {
    setJadwalList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <JadwalContext.Provider value={{ jadwalList, editJadwal, hapusJadwal }}>
      {children}
    </JadwalContext.Provider>
  );
};
