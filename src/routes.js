// src/routes.js
import { Router } from "express";
import { getUsers, createUser, deleteUser } from "./controller/UserController.js";
import { getProducts, createProduct, deleteProduct, searchProducts } from "./controller/ProductController.js";

const routes = Router();

//Primeiro acesse a rota padrão ("/"), para depois poder acessar as rotas "/products" ou "/users" lá em baixo.
//Eu coloquei return e resposta para que a gente possa saber se entrou na rota padrão.
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

// Rotas de Produtos
routes.get("/products", getProducts);
routes.post("/products", createProduct);
routes.delete("/products/:id", deleteProduct);
routes.get("/products/search", searchProducts);

export default routes;
