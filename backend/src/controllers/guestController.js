import Guest from "../models/Guest.js";

export const addGuest = async (req,res) => {
 try {
     const { name, email, phone} = req.body;
     await Guest.create({name,email,phone})
     res.json({success:true, message: "Added successfully" });
  } catch (err) {
    console.error("❌ Error adding guests:", err);
    res.status(500).json({ error: "Database error" });
  }

}

export const readGuest = async (req,res) => {
  try {
    const guests = await Guest.find({});
    res.json({success:true, guests})
  } catch (err) {
    console.error("❌ Error fetching guests:", err);
    res.status(500).json({ error: "Database error" });
  }
}

export const readEachGuest = async (req,res) => {
  try {
    const {id} = req.params;
    const guest = await Guest.findById(id);
    res.json({success:true, guest})
  } catch (err) {
    console.error("❌ Error fetching guests:", err);
    res.status(500).json({ error: "Database error" });
  }
}

export const updateGuest = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;

    // Check if guest exists
    const existingGuest = await Guest.findById(id);
    if (!existingGuest) {
      return res.status(404).json({success: false, message: "Guest not found"});
    }

    // Update guest
    const updatedGuest = await Guest.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    return res.status(200).json({success: true,message: "Updated Successfully", data: updatedGuest,});
  } catch (err) {
    console.error("❌ Error updating guest data:", err);
    return res.status(500).json({ success: false, error: "Database error" });
  }
};


export const deleteGuest = async (req,res) => {
  try {
   const { id } = req.params;

    await Guest.findByIdAndDelete(id);

    return res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting guests:", err);
    res.status(500).json({ error: "Database error" });
  }
}