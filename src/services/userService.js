import { usuariosColecao } from "../database/dbConnect.js";
import { ObjectId } from 'mongodb';

class UserService {
    constructor(){

    }

    static async findUser (userId) {
        const idConvertido = new ObjectId(userId);
        const findUserDb = await usuariosColecao.findOne ({_id:idConvertido})
        return findUserDb;   
    }


}

export default UserService;