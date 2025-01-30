import multer from 'multer';
import picUpload from "../controller/uploadPicUserController.js";
import ProductsController from '../controller/ProductController.js';
import { Router } from "express";

const route = Router()

const uploadDir = './Imagens/uploads'; 


// Configuração do multer para upload de fotos
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  });
  
  const upload = multer({ storage });

  route.post("/uploadItemPic", upload.single('itemPic'), ProductsController.uploadItemPic)
  route.post('/uploadProfilePic', upload.single('profilePic'), picUpload)

  export default route;