import express from "express";
import route from "./src/rotas/routes.js";
import "./src/database/dbConnect.js";

const app = express()
const PORT = 3000

route(app)

app.listen( PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`)
})