import React, { useEffect, useState } from "react";
import axios from "axios";
import Read from "../components/Read";
import Edit from "../components/Edit";
import Add from "../components/Add"; // ✅ IMPORT ADD

const Dashboard = () => {
  const [guests, setGuests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editingGuestId, setEditingGuestId] = useState(null);
  const [addGuest, setAddGuest] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/guest/read");

    // ✅ THIS IS THE KEY FIX
    setGuests(res.data.guests);
  } catch (error) {
    console.error("Error fetching guests:", error);
    setGuests([]); // safety fallback
  }
};



  // ✅ DELETE Guest
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guest?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/guest/delete/${id}`);
      setGuests((prev) => prev.filter((guest) => guest._id !== id));
    } catch (err) {
      console.error("Error deleting guest:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Guest List</h1>
        <button
          onClick={() => setAddGuest(true)}
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
        >
          Add New Guest
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-10 rounded-xl shadow-md flex-1 overflow-x-auto">
        {guests.length === 0 ? (
          <p className="text-gray-500 text-center">No guests found.</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Mobile</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest._id} className="text-center">
                  <td className="border px-4 py-2">{guest.name}</td>
                  <td className="border px-4 py-2">{guest.phone}</td>
                  <td className="border px-4 py-2">{guest.email}</td>
                  <td className="border px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => setSelectedId(guest._id)}
                      className="px-3 py-1 bg-orange-500 text-white rounded"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => setEditingGuestId(guest._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(guest._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ADD */}
      {addGuest && (
        <Add
          onClose={() => setAddGuest(false)}
          onAdd={(newGuest) => {
            setGuests((prev) => [...prev, newGuest]);
            setAddGuest(false);
          }}
        />
      )}

      {/* EDIT */}
      {editingGuestId && (
        <Edit
          guest={guests.find((g) => g._id === editingGuestId)}
          onUpdate={(updatedGuest) => {
            setGuests((prev) =>
              prev.map((g) =>
                g._id === updatedGuest._id ? updatedGuest : g
              )
            );
            setEditingGuestId(null);
          }}
          onClose={() => setEditingGuestId(null)}
        />
      )}

      {/* READ */}
      {selectedId && (
        <Read id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
};

export default Dashboard;
