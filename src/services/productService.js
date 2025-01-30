import { productCollection } from "../database/dbConnect.js";
import { ObjectId } from 'mongodb';

class ProductsService {
    constructor ( categoria, nome, preco, loja){
        id = this.id;
        categoria = this.categoria;
        nome = this.nome;
        loja = this.loja;
        preco = this.preco;
    }

    static async findProduct (id) {
        const idConvertido = new ObjectId(id);
        const findItem = await productCollection.findOne ({_id:idConvertido})
        return findItem;   
    }

    static async findItemByIdPublisher (userId){
        const itens = await productCollection.find({ publishedBy: userId}).toArray();
        return itens;
    }

    static async qtdProduct(cart, productId) {
        for(let i = 0; i < cart.length; i++){
            const productArray = cart[i]
            for(let j = 0; j < productArray.length; j++){
                // const product = productArray[j];
                const find = await productArray.find((product) => product._id === productId);
                
                if(find){
                    return { product:find, qtd:productArray[1], index:i} 
                } 
            }
        }
            return null;
    }



    static async listProducts () {
        const listItens = await productCollection.find({}).toArray()
        return listItens;
    }

    static async findProductCategory (categoria) {
        const findCategory = await productCollection.find({categoria: categoria}).toArray()
        return findCategory;
    }
}
export default ProductsService;