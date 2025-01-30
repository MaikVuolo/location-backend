import { usuariosColecao } from "../database/dbConnect.js";

class criaLoginService {
    constructor(  userName, password  ) {
        this.userName = userName,
        this.password = password
    }

    static async insereUsuarioDb ( userName, salt, hashPassword, role, email){
   
        await usuariosColecao.insertOne({
            usuario: userName,
            salt: salt,
            hashPassword: hashPassword,
            email: email,
            profilePic: null,
            role: role,
            cart:[]
        })
    }
}

export default criaLoginService;

