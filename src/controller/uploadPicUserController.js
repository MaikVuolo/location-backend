import { usuariosColecao } from "../database/dbConnect.js";
import { ObjectId } from 'mongodb';

async function picUpload (req, res){
    const { userId } = req.body;
    const profilePicPath = req.file.path;

    const idConvertido = new ObjectId(userId);

    try {
      
      // Atualizar o campo de foto de perfil do usuário
      const result = await usuariosColecao.updateOne(
        {_id: idConvertido},
        { $set: {profilePic: profilePicPath } }
      );
      
      
      
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
  
      res.json({ message: 'Foto de perfil atualizada com sucesso', profilePic: profilePicPath });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }


  export default picUpload;


