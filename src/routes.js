// src/routes.js
import { Router } from "express";
import { getUsers, createUser, deleteUser } from "./controller/UserController.js";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({
    sucess: true,
    message: "Sucesso!",
  });
});

// Rotas de Usuários
routes.get("/users", getUsers);
routes.post("/users", createUser);
routes.delete("/users/:id", deleteUser);


export default routes;
