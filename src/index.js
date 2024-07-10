import express from "express";

import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

const app = express();
app.use(express.json());

const port = 8001;

app.use("/api", userRoutes);
app.use("/api", teamRoutes);

app.listen(port, () => {
  console.log("Servidor rodando 🔥");
});
