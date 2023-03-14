import productModel from "../dao/models/products.model.js"

export default class ProductService {

    constructor(){}

    getAll = async () => {
        return await productModel.find().lean().exec()

    }

    getById = async (id) => {
        return await productModel.findOne({_id: id})
        
    }

    create = async (product) => {
        return await productModel.create(product)
        
    }

    update = async (id, productToUpdate) => {
        return await productModel.updateOne({_id: id}, productToUpdate)
        
    }

    delete = async (id) => {
        return await productModel.deleteOne({_id: id})
        
    }

    paginate = async (search, options) => {
        return await productModel.paginate(search, options)
        
    }
}