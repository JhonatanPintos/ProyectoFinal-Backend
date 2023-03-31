import UserModel from "./models/user.model.js"
import CustomError from "../../errors/custom.errors.js"
import EErros from "../../errors/enums.js"
import { generateUserErrorInfoAge, generateUserErrorInfoFirstName, generateUserErrorInfoLastName } from "../../errors/info.js"

export default class User {
    constructor() {}

    get = async() => {
        return await UserModel.find().lean().exec()
    }

    create = async(data) => {
        if(!data.first_name){
            CustomError.createError({
                name: "FirstName creation error",
                cause: generateUserErrorInfoFirstName(),
                message: "Error trying to create user",
                code: EErros.INVALID_TYPES_ERROR
            })
        }

        if(!data.last_name){
            CustomError.createError({
                name: "LastName creation error",
                cause: generateUserErrorInfoLastName(),
                message: "Error trying to create user",
                code: EErros.INVALID_TYPES_ERROR
            })
        }

        if(!data.age){
            CustomError.createError({
                name: "Age creation error",
                cause: generateUserErrorInfoAge(),
                message: "Error trying to create user",
                code: EErros.INVALID_TYPES_ERROR
            })
        }
       return await UserModel.create(data)
    }

    getOneByID = async(id) => {
        return await UserModel.findById(id).lean().exec()
    }

    getOneByEmail = async(email) => {
        return await UserModel.findOne({ email }).lean().exec()
    }
}