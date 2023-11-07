// src/routes.js
import { Router } from "express";
import { createUser, deleteUser, loginToken } from "./controller/UserController.js";
import { getProducts, createProduct, deleteProduct, searchProducts,} from "./controller/ProductController.js";
import User from './models/User.js'; // Verifique o caminho correto para o seu modelo User.

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
routes.get('/users/search', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email não fornecido.' });
  }

  try {
    // Consulta o banco de dados para verificar se o email existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Retorna os detalhes do usuário encontrado (incluindo a senha)
    return res.json({ _id: user._id, name: user.name, email: user.email, password: user.password });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});
routes.post("/users", createUser);
routes.delete("/users/:id", deleteUser);

// Rotas de Produtos
routes.get("/products", getProducts);
routes.post("/products", createProduct);
routes.delete("/products/:id", deleteProduct);
routes.get("/products/search", searchProducts);

//Rota de Login
routes.post("/login", loginToken);

export default routes;
