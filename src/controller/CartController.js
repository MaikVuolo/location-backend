import { usuariosColecao } from "../database/dbConnect.js";
import UserService from "../services/userService.js";
import ProductsService from "../services/productService.js";
import { ObjectId } from 'mongodb';

class CartController {
    constructor (){
    }
    static async insertProductCart (req, res){
        const {product, userId} = req.body
        try {
            const user = await UserService.findUser(userId)
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            const idConverter = new ObjectId(userId);
            const findProduct = await ProductsService.qtdProduct(user.cart, product._id)
            if(findProduct){
                const index = findProduct.index;
                user.cart[index][1] += 1;
            }else{
                user.cart.push([product,1])
            }
                        
            const result = await usuariosColecao.updateOne(
                { _id: idConverter },
                { $set: { cart: user.cart} })

            if (result.modifiedCount === 0) {
                return res.status(400).json({ message: "Falha ao atualizar o carrinho" });
            }

            return res.status(200).json({ cart:user.cart });
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // static async getCart (req,res) {
    //     try {
    //         const { userId } = req.params
    //         const user = await UserService.findUser(userId)
    //         if (!user) {
    //             throw new Error("Usuário não encontrado")
    //         }
    //         const cart = user.cart
    //         let total = 0
    //         cart.forEach(itens => {
    //             itens.forEach( item => {
    //                 item[0].preco = parseFloat(item.preco)
    //                 total += (item[0].preco * item[1])
    //             })
    //         })
    //         res.status(200).json({cart, total})
    //     } catch (err) {
    //         res.status(500).send(err.message)
    //     }
    // }

    static async getCart(req, res) {
        try {
            const { userId } = req.params;
            const user = await UserService.findUser(userId);
    
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
    
            const cart = user.cart;
            let total = 0;

            for( let i = 0; i < cart.length; i++){
                const productArray = cart[i]
                const product = productArray[0];
                total += (product.preco * productArray[1]);
                
            }
    
            return res.status(200).json({ cart, total });
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
    

    static async removeItemCart (req, res) {
        try {
            const { userId, index } = req.body
            const user = await UserService.findUser(userId)
            
            if (!user) {
                throw new Error("Usuário não encontrado")
            }
            const idConverter = new ObjectId(userId);
            const cart = user.cart

            if(cart.length >= 2){
                const itemRemovido = cart.splice(index, 1)
                const newCart = cart
                const result = await usuariosColecao.updateOne(
                    { _id: idConverter },
                    { $set: { cart: newCart} })
                   
                res.status(200).json(newCart)
            }else{
                const newCart = []
                const result = await usuariosColecao.updateOne(
                    { _id: idConverter },
                    { $set: { cart: newCart} })
                   
                res.status(200).json(newCart)
            }
        } catch (err) {
            res.status(500).send(err.message)
        } 
    }

}

export default CartController;