import config from "../config/config.js";
import Mail from "../modules/mail.js";
import { UserService } from "../repository/index.js";


export const deleteUser = async (req, res) => {
    const uid = req.params.uid
    const user = await UserService.getOneByID(uid)
    const deleted = await UserService.delete(uid)
    const mail = new Mail()
    const html = `
    <h1>Fuiste eliminado</h1>
    <p>Hola 👋</p>
    <a href=${config.BASE_URL}/session/register>Registrate de nuevo</a>
    <a></a>
    `
    mail.send(user.email, "Usuario Eliminado", html)

    res.json({status: "Success", deleted})
}

export const deleteUserInactiv = async (req, res) => {
    try {
        const users = await UserService.get()
        const Diff = date => {
            const today = new Date()
            const diff = today.getTime() - date.getTime()
            return diff / (1000 * 60 * 60 * 24)
        }
        const inactivUser = users.filter(({ lastConecction }) => !lastConecction || Diff(lastConecction) > 2)
        const emails = inactivUser.map(user => user.email)
        for (var i = 0; i < emails.length; i++) {
            const mail = new Mail()
            const html = `
            <h1>Fuiste eliminado</h1>
            <p>Hola 👋</p>
            <a href=${config.BASE_URL}/session/register>Registrate de nuevo</a>
            <a></a>
            `
                mail.send(emails[i], 'Usuario eliminado', html)
          }
        const conditions = {
            lastConecction: { $gt: 172800000 },
            role: { $ne: 'admin' }
        };
        const deletedUsers = await UserService.deleteMany(conditions)
        res.json({ status: 'success', deletedUsers })
    } catch (error) {
        res.json({ status: 'error', error })
    }
}

export const changeUserRoleAdm = async (req, res) => {
    const uid = req.params.uid;
    const user = await UserService.getOneByID(uid)
    const documents = user.documents
    if(!documents){
        console.log("Datos Vacios")
    }else{
        const identificacion = documents.find(({ name }) => name === "identificacion")
        const comprobantedeestadodecuenta = documents.find(({ name }) => name === "comprobantedeestadodecuenta")
        const comprobantededomicilio = documents.find(({ name }) => name === "comprobantededomicilio")
        if(!comprobantededomicilio || !identificacion || !comprobantedeestadodecuenta){
          console.log("Faltan Datos")
        }else {
          await UserService.changeUserRole(user)
          res.redirect("/api/users")
        }
    }
}