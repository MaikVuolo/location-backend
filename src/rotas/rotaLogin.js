import Login from "../controller/loginController.js";
import UsuarioController from "../controller/UsuarioController.js";
import verifyJwt from "../middlewares/verifyJwt.js";
import { Router } from "express";

const route = Router()

route.post("/login", Login.login);
route.post("/autenticar",UsuarioController.autenticaLogin )
route.get("/verificar", verifyJwt, UsuarioController.testeFuncao )

export default route;