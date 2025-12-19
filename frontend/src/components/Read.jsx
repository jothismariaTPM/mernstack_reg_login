import React, { useState, useEffect } from "react";
import axios from "axios";

const Read = ({ id, onClose }) => {
  const [guest, setGuest] = useState(null);


  useEffect(() => {
  const handleView = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/guest/read/${id}`);
      setGuest(res.data.guest);
    } catch (error) {
      console.error("Error fetching guest:", error);
    }
  };

  if (id) handleView();
}, [id]);


  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50  z-50">
      <div className="bg-white rounded-lg shadow-lg w-[350px] space-y-2  p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        {!guest ? (
          <p>Loading guest details...</p>
        ) : (
          <>
            <h3 className="font-bold text-center mb-6 text-2xl">Guest Details</h3>
            <p className="text-lg font-bold my-2">Basic Info: </p>
            <p>Name: {guest.name}</p>
            <p>Mobile: {guest.phone}</p>
            <p>Email: {guest.email}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Read;