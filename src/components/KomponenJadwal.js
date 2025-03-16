import { useJadwal } from "../context/JadwalContext";
import { useEffect, useState } from "react";

const KomponenJadwal = ({ jdwl }) => {
  const { hapusJadwal, editJadwal } = useJadwal();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(jdwl.tugas);

  useEffect(() => {
    console.log(`Tugas ditambahkan: ${jdwl.tugas}`);
    return () => console.log(`Tugas dihapus: ${jdwl.tugas}`);
  }, [jdwl.tugas]);

  if (!jdwl || !jdwl.tugas) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTask.trim() !== "") {
      editJadwal(jdwl.id, editedTask);
      setIsEditing(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
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
