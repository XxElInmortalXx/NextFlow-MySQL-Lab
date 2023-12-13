import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRouter from "./router/users.router.js";
import { db } from "./config/db.js";

// cargar variables de entorno
dotenv.config();
// conectar a la DB
db();

// iniciar servidor
const app = express();
// configurar
app.use(express.json());
// coors
const whiteList = [process.env.FRONTEND_URL, undefined];
const coorsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(coorsOptions));
// definir rutas
app.use("/api/users", usersRouter);
// definir puerto
const PORT = process.env.PORT || 4000;

// escuchar puerto
app.listen(PORT, () => {
  console.log(`------ Server running on port ${PORT}`);
});
