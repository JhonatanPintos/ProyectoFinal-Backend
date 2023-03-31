import MockModel from "./models/mock.model.js";

export default class Mock{
    constructor() {}

    get = async () => {
        return await MockModel.find().lean().exec()
    }

    create = async(data) => {
        return await MockModel.create(data)
    }
}