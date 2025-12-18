import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./src/configs/db.js";
import userRouter from "./src/routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/user',userRouter);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
