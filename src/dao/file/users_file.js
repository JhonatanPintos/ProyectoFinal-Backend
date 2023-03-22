import FileManager from "./fileManager.js";

export default class User {

    constructor() {
        this.fileManager = new FileManager("db_file/messages.json")
    }

    get = async() => {
        return await this.fileManager.get()
    }

    getOneByID = async(id) => {
        return await this.fileManager.getOneByParam("id", id)
    }

    getOneByEmail = async(email) => {
        return await this.fileManager.getOneByParam("email", email)
    }

    create = async(data) => {
        return await this.fileManager.add(data)
    }

}