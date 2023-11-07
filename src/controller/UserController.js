import User from "../models/User.js"
import jwt from "jsonwebtoken";

async function getUsers(req, res){
  const users = await User.find({}, '_id name'); // Retorna apenas os IDs e nomes dos usuários
  return res.json(users);
}

async function createUser(req, res){
    const user = req.body

    //pega as informações passadas na requisição do body, informações passadas com base no schema pré definido no "User.js"
    //..e salva essas informações na variavel abaixo, para ser chamada e transformada em JSON, e ser enviada para o database; 
    const newUser = await User.create(user)

    //chama a resposta e envia o conteúdo da variavel acima em forma de JSON pro banco de dados mongo salvar-lo;
    return res.json(newUser)
}

async function deleteUser(req, res){
    //params.id é o id do User que foi passado no metodo DELETE do Insomnia para ser deletado.
    //req.params.id pega o id desse user 
    const id = req.params.id

    await User.findByIdAndDelete({_id: id}) //{_id: id} = nesse caso é porque o ID no mongo tem o "_" antes. Então ai está falando que "_id" é igual ao id;

    return res.status(200).json({res: "User was deleted"})
}

async function loginToken(req, res) {
  const { email, password } = req.body;

  // Verifique as credenciais do usuário no banco de dados
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  // Gere um token de autenticação
  const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Tempo de expiração do token
  });

  res.json({ token });
}

//para exportar mais de um
export {createUser, getUsers, deleteUser, loginToken}
