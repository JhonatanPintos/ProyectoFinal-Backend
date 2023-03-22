import FileManager from "./fileManager.js";

export default class Cart {

    constructor() {
        this.fileManager = new FileManager("db_file/carts.json")
    }

    get = async() => {
        return await this.fileManager.get()
    }

    create = async(data) => {
        return await this.fileManager.add(data)
    }

}