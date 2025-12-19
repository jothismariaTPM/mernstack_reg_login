import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Add = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  
  const handleAdd = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/guest/add`,formData);
      toast.success("Guest added successfully!");
      onClose(); // close popup after success
    } catch (err) {
      console.error("Error adding guest:", err);
    }
  };


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

        <h3 className="font-semibold mb-4 text-lg">Add Guest</h3>

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
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Add;