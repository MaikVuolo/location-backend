import ProductsController from "../controller/ProductController.js";
import CartController from "../controller/CartController.js";
import verifyJwt from "../middlewares/verifyJwt.js";
import { Router } from "express";

const route = Router()

route.get("/itens", ProductsController.listProducts)
route.get("/findproduct/:id", ProductsController.searchProduct)
route.get("/getcart/:userId",CartController.getCart)
route.get("/findproductcategory/:categoria", ProductsController.findProductCaregory)
route.get("/itemsforuser/:userId", ProductsController.findProductForUserId)
route.get("/pesquisa/:search", ProductsController.searchBar)
route.post("/removecartitem", CartController.removeItemCart)
route.post("/cartAdd", CartController.insertProductCart)
route.post("/addproduto", ProductsController.productInsert)
route.put("/edititem", ProductsController.editProduct)
route.delete("/removeitem/:itemId", ProductsController.removeItem)

export default route;