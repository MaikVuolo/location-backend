import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();


const cliente = new MongoClient(
  process.env.MONGODB_URL
);

let usuariosColecao;
let productCollection;
let cartCollection

try {
  await cliente.connect();

    const dataBase = cliente.db("loginLocation");
    usuariosColecao = dataBase.collection("users");
    productCollection = dataBase.collection("products");

    console.log("Conexão com o bando de dados feita com sucesso");
} catch (erro) {
  console.log(erro);
}

export { usuariosColecao, productCollection, cartCollection };