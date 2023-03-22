import FileManager from "./fileManager.js";

export default class Cart {

    constructor() {
        this.fileManager = new FileManager("db_file/product.json")
    }

    get = async() => {
        return await this.fileManager.get()
    }

    getPaginate = async(search, options) => {
        const docs = await this.fileManager.get()

        return {
            totalDocs: docs.length,
            docs,
            limit: docs.length,
            page: 1,
            nextPage: null,
            prevPage: null,
            totalPages: 1,
            pagingCounter: 1,
            meta: 'paginator',
          }
    }

    create = async(data) => {
        return await this.fileManager.create(data)
    }

}