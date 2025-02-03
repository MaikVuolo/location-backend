import { usuariosColecao } from "../database/dbConnect.js";
import { ObjectId } from 'mongodb';
import { v2 as cloudinary } from 'cloudinary';

async function picUpload (req, res){
  
    const { userId } = req.body;

    const idConvertido = new ObjectId(userId);

    try {
      cloudinary.config({ 
        cloud_name: 'dz0ibw0qk', 
        api_key: '213537456819882', 
        api_secret: 'kxR6tRtFPNB0qMf2Oi92jfV6r0U'
    });
    
    // Upload an image
    const imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // Upload para o Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageBase64, {
      folder: 'locationShop',
    });

       console.log(uploadResult);
       
    
      // Atualizar o campo de foto de perfil do usuário
      const result = await usuariosColecao.updateOne(
        {_id: idConvertido},
        { $set: {profilePic: uploadResult.secure_url } }
      );
      
      
      
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
  
      res.json({ message: 'Foto de perfil atualizada com sucesso', profilePic: uploadResult.secure_url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

 

// (async function() {

//     // Configuration
    
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();


  export default picUpload;


