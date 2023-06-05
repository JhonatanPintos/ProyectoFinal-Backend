import MessageDTO from '../dao/DTO/messages.dto.js'

export default class MessageRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    create = async(data) => {
        const dataToInsert = new MessageDTO(data)
        
        return await this.dao.create(dataToInsert)
    }
}