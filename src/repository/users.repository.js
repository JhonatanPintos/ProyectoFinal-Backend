import UserDTO from '../dao/DTO/users.dto.js'
import CustomError from '../errors/custom.errors.js'
import EErros from '../errors/enums.js'
import {
    generateToken
} from '../utils.js'
import {
    generateProdErrorInfo
} from '../errors/info.js'
import config from '../config/config.js'
import Mail from '../modules/mail.js'


export default class UserRepository {
    constructor(dao) {
        this.dao = dao
        this.mail = new Mail()
    }

    get = async () => {
        return await this.dao.get()
    }

    getOneByID = async (id) => {
        return await this.dao.getOneByID(id)
    }

    getOneByEmail = async (email) => {
        return await this.dao.getOneByEmail(email)
    }

    create = async (data) => {
        const dataToInsert = new UserDTO(data)
        return await this.dao.create(dataToInsert)
    }

    updateUser = async (id, password) => {
        return await this.dao.updatePass(id, password)
    }

    updateUserConection = async (id, date) => {
        return await this.dao.updateUserConection(id, date)
    }

    changeUserRole = async(uid) => {
        return await this.dao.changeUserRole(uid)
    }

    delete = async (id) => {
        return await this.dao.delete(id)
    }

    deleteMany = async (cond) => {
        return await this.dao.deleteMany(cond)
    }

    sendMail = async (email) => {
        const user = await this.getOneByEmail(email)
        if (!user) {
            CustomError.createError({
                name: "Authentication error",
                cause: generateProdErrorInfo(),
                message: "Error trying to find user",
                code: EErros.INVALID_TYPES_ERROR
            })
        }

        const token = generateToken(user._id, "1h")

        const html = `<h1>Restauración de contraseña</h1>
        <p>Hola 👋</p>
        <p>Solicistaste un cambio de contraseña para tu cuenta</p>
        <p>Podés hacerlo desde acá:</p>
        <a href=${config.BASE_URL}/session/forgotPassword/${user.id || user._id}/${token}>Cambiar contraseña</a>
        <br>
        <p>¡Saludos!</p>`

        return await this.mail.send(email, "Restauración de contraseña", html)
    }

    addDocs = async (id, docName, path)=>{
        try {
            const user = await this.dao.getOneByID(id);
            const idx = user.documents.findIndex( doc => doc.name == docName);
            if(idx != -1) {
                return this.dao.updateDoc(id, idx, docName, path);
            }else{
                return await this.dao.addDoc(id, docName, path);
            }
        } catch (error) {
            console.log(error);
        }
    }

}