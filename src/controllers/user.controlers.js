import { UserService } from "../repository/index.js";


export const deleteUser = async (req, res) => {
    const uid = req.params.uid
    const deleted = await UserService.delete(uid)
    res.json({status: "Success", deleted})
}

export const deleteUserInactiv = async (req, res) => {
    try {
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