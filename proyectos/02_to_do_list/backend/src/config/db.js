import { sequelize } from "./db.config.js";
import { modelRelations } from "../utils/modelRelations.js";

export const db = async () => {
  try {
    // autenticar DB
    await sequelize.authenticate();
    console.log("------ Authenticate to DB successful");
    // sincronizar DB
    await sequelize.sync();
    console.log("------ Sync to DB successful");
    // relacionar tablas
    await modelRelations();
    console.log('------ Table relations success')
    // mensaje de éxito
    console.log("------ Connect to DB successful");
  } catch (error) {
    console.log(`------ Error to connect to DB: ${error}`);
  }
};
