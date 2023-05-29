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
      res.json({status: "success", payload: newUser})
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
    const result = await UserService.changeUserRole(uid);

    res.redirect("/session/current");
};