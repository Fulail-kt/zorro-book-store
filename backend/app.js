import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import { connectDb } from "./config/db.js";

import userRoute from "./routes/userRoutes.js";
import bookRoute from "./routes/bookRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import cors from 'cors';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*"
}))

//@ routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/order", orderRoute);

const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
  console.log(`server connected at ${PORT}. Check http://localhost:${PORT}`);
  connectDb();
});
