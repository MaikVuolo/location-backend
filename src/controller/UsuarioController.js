import { usuariosColecao } from "../database/dbConnect.js"
import gerarToken from "../utils/gerarTokenJwt.js"
import { scryptSync, timingSafeEqual } from 'crypto';

class UsuarioController {
    constructor (userName, password){
        this.userName = userName,
        this.password = password
    }

    static async autenticaLogin (req, res) {
        try {
            const { userName, password } = req.body
            const usuarioReq = {
                usuario: userName,
                senha: password
                }
                const encontradoUsuario = await usuariosColecao.findOne({usuario: usuarioReq.usuario})
                
                if(encontradoUsuario){
                            const senhaHashDigitada = scryptSync(usuarioReq.senha, encontradoUsuario.salt, 64);
                            const hashReal = Buffer.from(encontradoUsuario.hashPassword,'hex');
                
                            const comparacao = timingSafeEqual(senhaHashDigitada, hashReal)
                
                            if(comparacao){
                                
                                const acessToken = gerarToken({id: encontradoUsuario._id, role: encontradoUsuario.role})
                                console.log('Autenticado com sucesso');
                                
                                return res.status(200).json({acessToken, id:encontradoUsuario._id, nome:encontradoUsuario.usuario, profilePic:encontradoUsuario.profilePic})
                            }else{
                                console.log('Senha incorreta');
                                throw new Error ('Senha incorreta')
                            }
                        }else{
                            
                            throw new Error ('Login incorreto')
                        }

        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    static async testeFuncao (req, res) {
        try{

            res.status(200).json({"FUNCIONAA": "IRRU"})
        }catch (err){
            res.status(400).send(err.message)
        }
    }
}

export default UsuarioController;