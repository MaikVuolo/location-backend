import jsonwebtoken from "jsonwebtoken";

import dotenv from 'dotenv';

dotenv.config();


export default function verifyJwt (req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    try {
        if (!token) {
            return res.status(401).send('Access token nao informado');
          }
        
          if (token == null) return res.status(401).send("Não autorizado");
    
           jsonwebtoken.verify(token, process.env.SEGREDO_TOKEN, (err, user) => {
            if (err) return res.status(403).send("Proibido"); 
            next();
          });
          
    } catch (err) {
      return res.status(401).json({ message: "Token inválido ou expirado." });
    }
    }




