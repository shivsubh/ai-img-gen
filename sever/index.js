import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", aiRoutes);

app.get("/", (req, res) => {
  res.send("Hello From your lovable AI");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(8080, () =>
      console.log("Server has started running on port http://localhost:8080")
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
