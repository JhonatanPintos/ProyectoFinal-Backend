import config from "../config/config.js";
import { UserService } from "../repository/index.js";
import { validateToken, isValidPassword as comparePasswords, createHash } from "../utils.js";


export const changePassword = async (req, res) => {
    try { 
      const { uid, token } = req.params
      const { newPassword, confirmation } = req.body
      const { err } = validateToken(token)
      const user = await UserService.getOneByID(uid)
      
      if(err?.name === "TokenExpiredError") return res.status(403).json({status: "error", error: "El token expiró"})
      else if(err) return res.json({status: "error", error: err})
  
      if(!newPassword || !confirmation) return res.status(400).json({status: "error", error: "Escriba y confirme la nueva contraseña"})
      if(comparePasswords(user, newPassword)) return res.json({status: "error", error: "La contraseña no puede ser igual a la anterior."})
      if(newPassword != confirmation) return res.json({status: "error", error: "Las contraseñas no coinciden."})
      
      const hashedPassword = createHash(newPassword)
      
      const newUser = await UserService.updateUser(uid, hashedPassword)
      res.redirect("/session/login")
    } catch(error) {
        req.logger.warning("Fail Login")
      res.json({status: "error", error});
    }
  };

  export const sendRecoveryMail = async (req, res) => {
    try {
      const { email } = req.body
      const result = await UserService.sendMail(email)
      res.json({status: "success", payload: result})
    } catch(error) {
        req.logger.warning("Fail Login")
      res.json({status: "error", error});
    }
  }

  export const changeUserRole = async (req, res) => {
    const uid = req.user.user;
    const documents = uid.documents

    if(!documents){
      console.log("Datos Vacios")
    }else{

      const identificacion = documents.find(({ name }) => name === "identificacion")
      const comprobantedeestadodecuenta = documents.find(({ name }) => name === "comprobantedeestadodecuenta")
      const comprobantededomicilio = documents.find(({ name }) => name === "comprobantededomicilio")
      
      if(!comprobantededomicilio || !identificacion || !comprobantedeestadodecuenta){
        console.log("Faltan Datos")
      }else {
        await UserService.changeUserRole(uid)
        res.redirect("/session/current");
      }
    }
};

export const login =  async (req, res) => {
  if (!req.user) {
      return res.status(400).send({status: "error", error: "Invalid credentiales"})
    }
  const user = req.user
  const dateU = user.lastConecction = Date.now()
  await UserService.updateUserConection(user._id, dateU)
  res.cookie(config.jwtCookieName, req.user.token).redirect('/products')
}

export const logout = async (req, res) => {
  res.clearCookie(config.jwtCookieName).redirect('/session/login');
}

export const current = async (req, res) => {
  const id = req.user.user._id
  const user = await UserService.getOneByID(id)
  res.render('sessions/profile', {user: user})
}