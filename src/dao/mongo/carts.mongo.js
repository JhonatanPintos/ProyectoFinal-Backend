import CartModel from "./models/cart.model.js"

export default class Cart {
    constructor() {}

    get = async() => {
        return await CartModel.find().lean().exec()
    }

    create = async(data) => {
        return await CartModel.create(data)
        
    }

    getById = async (id) => {
        return await CartModel.findOne({_id: id})
    }

    getByIdLean = async (id) => {
        return await CartModel.findOne({_id: id}).lean()
    }
}