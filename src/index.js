// src/index.js
import express from "express";
import cors from "cors";
import ConnectDatabase from "./database/db.js";
import routes from "./routes.js";

const port = process.env.Port || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

ConnectDatabase()
  .then(() => {
    app.listen(port, () => console.log("Banco de dados Conectado"));
  })
  .catch((error) => {
    console.log(error);
  });

export default app;

