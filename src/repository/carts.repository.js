import CartDTO from '../dao/DTO/carts.dto.js'

export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    create = async(data) => {
        const dataToInsert = new CartDTO(data)
        return await this.dao.create(dataToInsert)
    }

    update = async(id, data) => {
        return await this.dao.update(id, data)     
    }

    getById = async (id) => {
        return await this.dao.getById(id)
    }

    getByIdLean = async (id) => {
        return await this.dao.getByIdLean(id)
    }

    createTik = async(data) => {
        return await this.dao.createTik(data)     
    }

    getTik = async(code) => {
        return await this.dao.getTik(code)     
    }

    getTikEmail = async(purchaser) => {
        return await this.dao.getTikEmail(purchaser)     
    }

    updateTik = async(id, data) => {
        return await this.dao.updateTik(id, data)
    }
}