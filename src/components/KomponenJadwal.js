import { useJadwal } from "../context/JadwalContext";
import { useEffect, useState } from "react";

const KomponenJadwal = ({ jdwl }) => {
  if (!jdwl || !jdwl.tugas) return null; // Cegah error jika jdwl kosong

  const { hapusJadwal, editJadwal } = useJadwal();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(jdwl.tugas);

  useEffect(() => {
    setEditedTask(jdwl.tugas);
  }, [jdwl.tugas]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    if (editedTask.trim() !== "") {
      editJadwal(jdwl.id, editedTask); // Update data di Context
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSave}>Simpan</button>
        </>
      ) : (
        <>
          {jdwl.tugas}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => hapusJadwal(jdwl.id)}>Hapus</button>
        </>
      )}
    </li>
  );
};

export default KomponenJadwal;
