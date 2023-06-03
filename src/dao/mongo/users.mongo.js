import UserModel from "./models/user.model.js"
import CustomError from "../../errors/custom.errors.js"
import EErros from "../../errors/enums.js"
import {
    generateUserErrorInfoAge,
    generateUserErrorInfoFirstName,
    generateUserErrorInfoLastName
} from "../../errors/info.js"

export default class User {
    constructor() {}

    get = async () => {
        return await UserModel.find().lean().exec()
    }

    create = async (data) => {
        if (!data.first_name) {
            CustomError.createError({
                name: "FirstName creation error",
                cause: generateUserErrorInfoFirstName(),
                message: "Error trying to create user",
                code: EErros.INVALID_TYPES_ERROR
            })
        }

        if (!data.last_name) {
            CustomError.createError({
                name: "LastName creation error",
                cause: generateUserErrorInfoLastName(),
                message: "Error trying to create user",
                code: EErros.INVALID_TYPES_ERROR
            })
        }

        if (!data.age) {
            CustomError.createError({
                name: "Age creation error",
                cause: generateUserErrorInfoAge(),
                message: "Error trying to create user",
                code: EErros.INVALID_TYPES_ERROR
            })
        }
        return await UserModel.create(data)
    }

    getOneByID = async (id) => {
        return await UserModel.findById(id).lean().exec()
    }

    getOneByEmail = async (email) => {
        return await UserModel.findOne({email}).lean().exec()
    }

    update = async (id, data) => {
        return await UserModel.updateOne({_id: id}, data)
    }

    updatePass = async (id, password) => {
        return await UserModel.updateOne({_id: id}, {$set: {password: password}})
    }

    updateUserConection = async (id, date) => {
        return await UserModel.updateOne({_id: id}, {$set: {lastConecction: date}})
    }

    changeUserRole = async (uid) => {
        const user = await UserModel.findOne({_id: uid});
        await UserModel.updateOne({_id: uid}, {$set: {role: "premium"}});
        return {status: "success", newRole: "premium"};
    };

    delete = async (id) => {
        return await UserModel.deleteOne({_id: id})
    }

    deleteMany = async (cond) => {
        return await UserModel.deleteMany(cond)
    }

    addDoc = async (uid, docName, path) =>{
        try {
            const user = await UserModel.findOne({_id: uid});
            user.documents.push({name: docName, reference: path});
            user.save();
        } catch (error) {
            console.log(error);
        }
    }

    updateDoc = async (uid, index, docName, path) =>{
        try {
            const user = await UserModel.findOne({_id: uid});
            user.documents[index] = {name: docName, reference: path};
            user.save();
        } catch (error) {
            console.log(error);
        }
    }

}