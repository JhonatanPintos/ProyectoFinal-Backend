import MockDTO from "../dao/DTO/mock.dto.js"

export default class Mock{
    constructor(dao) {
        this.dao = dao
    }

    get = async () => {
        return await this.dao.get()
    }

    create = async(data) => {
        const dataToInsert = new MockDTO(data)
        return await this.dao.create(dataToInsert)
    }
}