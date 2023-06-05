import CartModel from "./models/cart.model.js"
import TicketModel from "./models/ticket.model.js"

export default class Cart {
    constructor() {}

    get = async() => {
        return await CartModel.find().lean().exec()
    }

    create = async(data) => {
        return await CartModel.create(data)     
    }

    update = async(id, data) => {
        return await CartModel.findByIdAndUpdate(id, {products: data})     
    }

    getById = async (id) => {
        return await CartModel.findOne({_id: id})
    }

    getByIdLean = async (id) => {
        return await CartModel.findOne({_id: id}).lean()
    }

    createTik = async(data) => {
        return await TicketModel.create(data)     
    }

    getTik = async(code) => {
        return await TicketModel.findOne({code}).lean().exec()
    }


    getTikEmail = async(purchaser) => {
        return await TicketModel.find({purchaser}).lean().exec()
    }

    updateTik = async(id, data) => {
        return await TicketModel.updateOne({_id: id}, {$set: data})
    }
}