import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./config/db.js";
import routerUsers from './routes/users.routes.js'
import routerTasks from './routes/tasks.routes.js'

// iniciar variables de entorno
dotenv.config();
// conectar DB
db();

// iniciar el server
const app = express();
// configuraciones
app.use(express.json());
// cors
const whiteList = [process.env.FRONT_URL];
const corsOptions = {
  origin: (origin, callBack) => {
    if (whiteList.includes(origin)) {
      callBack(null, true);
    } else {
      callBack(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
// rutas
app.use("/api/users", routerUsers);
app.use("/api/tasks", routerTasks);
// puerto
const PORT = process.env.PORT || 4000;
// escuchar server
app.listen(PORT, () => {
  console.log(`------ Server run in port ${PORT}`);
});
