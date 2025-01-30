import jsonwebtoken from "jsonwebtoken";

import dotenv from 'dotenv';

dotenv.config();


function gerarToken( payload ){
    const token = jsonwebtoken.sign(payload, process.env.SEGREDO_TOKEN, {
        expiresIn: "1h"
    })
    return token;
}

export default gerarToken;