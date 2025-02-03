import { Router } from "express";
import UsuarioController from "../controller/UsuarioController.js";

const route = Router()

route.get("/findusers", UsuarioController.findAllUsers)

export default route;