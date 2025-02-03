import multer from 'multer';
import picUpload from "../controller/uploadPicUserController.js";
import ProductsController from '../controller/ProductController.js';
import { Router } from "express";

const route = Router()

const uploadDir = './Imagens/uploads'; 


// Configuração do multer para upload de fotos
const storage = multer.memoryStorage(); // Salva os arquivos na memória

  
const upload = multer({ storage });

route.post("/uploadItemPic", upload.single('itemPic'), ProductsController.uploadItemPic)
route.post('/uploadProfilePic',upload.single('profilePic'), picUpload)

export default route;