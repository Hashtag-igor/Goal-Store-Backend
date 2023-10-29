import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from "path";
import ConnectDatabase from "./database/db.js";
import routes from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Rota para o favicon.ico
const faviconPath = path.join(__dirname, "../public", "favicon.ico");
app.get("/favicon.ico", (req, res) => {
  res.sendFile(faviconPath);
});

ConnectDatabase()
  .then(() => {
    app.listen(port, () => console.log("Banco de dados Conectado"));
  })
  .catch((error) => {
    console.log(error);
  });

