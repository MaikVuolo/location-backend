import { productCollection, usuariosColecao } from "../database/dbConnect.js";
import ProductsService from "../services/productService.js";
import UserService from "../services/userService.js";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from 'cloudinary';

class ProductsController {
    constructor ( categoria, nome, preco, descricao){
        categoria = this.categoria;
        nome = this.nome;
        descricao = this.descricao;
        preco = this.preco;
    }

    static async productInsert (req, res) {
        try {
            const { categoria, nome, descricao, preco, itemPic, publishedBy } = req.body
            const product = {categoria, nome, descricao, preco, itemPic, publishedBy, createdAt: new Date(),
                updatedAt: new Date()}
            if(product.categoria && product.preco && product.nome && product.descricao){

                const saveProduct = await productCollection.insertOne(product)
                if(saveProduct){
                    res.status(200).json({saveProduct})
    
                }else{
                    throw new Error("Falha ao salvar item")
                }
            }else{
                throw new Error ("Alguma propriedade está faltando ser preenchida")
            }
            
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    static async searchProduct (req, res, next) {
        const {id} = req.params
        try {
            const product = await ProductsService.findProduct(id)
            if(!product){
                throw new Error("Produto não encontrado")
            }
            res.status(200).json(product)
            
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    static async searchBar (req, res) {
        const { search } = req.params;

        try {
            const items = await productCollection.find({
                $or: [
                { nome: { $regex: search, $options: "i" } },
                { categoria: { $regex: search, $options: "i" }}
              ]}).toArray();
            if(items){
                res.status(200).json(items)
            }else{
                res.status(404).send("Nenhum item encontrado")
            }
        } catch (err) {
            res.status(400).send("Problemas com a busca")
        }
    }

    static async listProducts (req, res, next) {
        try {
            const products = await ProductsService.listProducts()
            if(!products){
                throw new Error("Nenhum produto encontrado")
            }
            res.status(200).json(products)
            
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    static async uploadItemPic (req, res) {
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

               if(uploadResult.secure_url.length <= 1){
                throw new Error ("Erro ao realizar upload da imagem")
               }

               res.status(200).json({itemPic:uploadResult.secure_url})
           
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    static async findProductCaregory (req, res) {
        const {categoria} = req.params
        try {
            const product = await ProductsService.findProductCategory(categoria)
            if(!product){
                throw new Error("Produto não encontrado")
            }
            res.status(200).json(product)
            
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    static async findProductForUserId (req, res) {
        const { userId } = req.params;
        try {
            const items = await ProductsService.findItemByIdPublisher(userId)
            
            if(!items){
                res.status(404).json({error:"Não há nenhum produto registrado neste usuario"})
            }
            
            res.status(200).json({items})
        } catch (err) {
            console.log(err.message);
            
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    }

    static async editProduct (req, res){
        const {productId, update} = req.body;
        try {
            if (!productId || !update) {
                return res.status(400).json({ error: "ID do produto e dados de atualização são obrigatórios." });
            }
            const idConverter = new ObjectId(productId)
            const result = await productCollection.updateOne({_id:idConverter},
               { $set:{
                categoria:update.categoria,
                nome:update.nome, 
                descricao: update.descricao,
                preco: update.preco,
                itemPic:update.itemPic
            }})

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: "Produto não encontrado." });
            }

            res.status(200).json({ message: "Produto atualizado com sucesso." });
        } catch (err) {
            console.error("Erro ao atualizar o produto:", err);
            res.status(500).json({ error: "Erro interno no servidor." });
        }

        
    }

    static async removeItem (req, res){
        const { itemId } = req.params;
        try {
            if(!itemId){
                res.status(404).send("Necessario fornecer id do produto")
            }
            const item = await ProductsService.findProduct(itemId);
            if(!item){
                res.status(404).send("Nenhum item encontrado")
            }
            const itemIdConverter = new ObjectId(itemId)
            const deleteItem = await productCollection.deleteOne({_id:itemIdConverter})

            if(deleteItem.deletedCount > 0) {
                res.status(200).send("Item excluido com sucesso")
            }else{
                res.status(404).send("Falha na exclusao do item")
            }

            
        } catch (err) {
            res.status(404).send(err.message)
        }

    }

    static async removeAllItensCart (req, res) {
        const { userId } = req.params;
        const idConverter = new ObjectId(userId)
        try {
            const result = await usuariosColecao.updateOne({_id:idConverter},{$set: {cart: []}})
            if (result.matchedCount === 0) {
                return res.status(404).json({ error: "Produto não encontrado." });
            }
            res.status(200).json({ message: "Compra finalizada com sucesso" });
        } catch (err) {
            console.error("Erro ao finalizar compra:", err);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    }
}

export default ProductsController;