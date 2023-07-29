import User from "../models/User.js"

async function getUsers(req, res){
    //Espera a resposta e procura dentro dos JSONs criados com padrão pré definido do tipo "USER" do arquivo "User.js", 
    //..e os que forem encontrados serão salvos dentro da variavel "users", para serem mostrados;
    const users = await User.find()
        
    //Vai mostrar os JSONs que foram criados na variavel;
    return res.json(users)
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


//para exportar mais de um
export {createUser, getUsers, deleteUser}
