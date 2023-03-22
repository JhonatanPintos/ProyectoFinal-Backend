import ProductModel from "./models/products.model.js"

export default class Product {
    constructor() {}

    get = async() => {
        return await ProductModel.find().lean().exec()
    }

    getPaginate = async(search, options) => {
        return await ProductModel.paginate(search, options)
    }

    create = async(data) => {
        return await ProductModel.create(data)
    }

    getById = async (id) => {
        return await ProductModel.findOne({_id: id})    
    }

    delete = async (id) => {
        return await ProductModel.deleteOne({_id: id})
    }

    update = async (id, productToUpdate) => {
        return await ProductModel.updateOne({_id: id}, productToUpdate)
    }

}