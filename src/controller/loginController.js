import criaLoginService from "../services/criaLoginService.js";
import criaHashESal from "../utils/criaHash.js";
import { usuariosColecao } from "../database/dbConnect.js";

class Login {
    constructor(){
    }
    static async login (req, res){
        const { userName, password, role, email} = req.body
        try {
            const newUser = {
                usuario: userName,
                password,
                role,
                email
            }
            const findUser = await usuariosColecao.findOne({usuario:newUser.usuario});
            
            if(findUser){
                return res.status(404).send("Este usuario já existe !")
            }
            if(newUser.email.includes("@" && ".")){
                return res.status(404).send("É necessario fornecer um email válido")
            }
            const [salt, hashPassword] = criaHashESal(password).split(":")

            const usuarioSalvo = await criaLoginService.insereUsuarioDb( userName, salt, hashPassword, role, email ) 
            
            res.status(200).json ({message:"usuario salvo:"})
        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

export default Login;