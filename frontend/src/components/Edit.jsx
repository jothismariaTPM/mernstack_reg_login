import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Edit = ({ guest, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // ✅ Initialize form when guest changes
  useEffect(() => {
    if (guest) {
      console.log("guest: ",guest)
      setFormData({
        name: guest.name,
        phone: guest.phone,
        email: guest.email
      });
    }
  }, [guest]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/guest/update/${guest._id}`,formData);
      toast.success("Guest updated successfully!");
      onClose(); // close popup after success
    } catch (err) {
      console.error("Error updating guest:", err);
    }
  };

  if (!guest) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[350px] space-y-2 p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-semibold mb-4 text-lg">Edit Guest</h3>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          className="border p-2 mb-2 w-full rounded"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Mobile"
          value={formData.phone}
          className="border p-2 mb-2 w-full rounded"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          className="border p-2 mb-2 w-full rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />


        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Edit;