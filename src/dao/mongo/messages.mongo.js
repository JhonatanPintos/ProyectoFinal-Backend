import MessageModel from "./models/messages.model.js"

export default class Message {
    constructor() {}

    get = async() => {
        return await MessageModel.find().lean().exec()
    }

    create = async(data) => {
        return await MessageModel.create(data)
    }

}