import "dotenv/config";
import express from "express";
import conn from "./config/conn.js";

import Usuario from "./models/model.js";

import './routes/router.js'
import usuariosRouter from "./routes/router.js";

const PORT = process.env.PORT || 9090;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//conexão com o banco
conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error(error));

  app.use("/usuarios", usuariosRouter);

  app.use((req, res) => {
    res.status(404).json({ msg: "Rota não encontrada" });
  });