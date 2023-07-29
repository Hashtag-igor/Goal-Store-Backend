import mongoose from "mongoose"

//criando um schema de usuarios
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
//   createdAt = é responsavel por pegar a data de hoje, no momento que o usuario for criado;

})


export default mongoose.model("User", userSchema)