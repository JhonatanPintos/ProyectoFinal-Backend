import { Router } from "express";
import { uploaderDocument, uploaderProfile } from "../config/multer.js"
import { UserService } from "../repository/index.js";
import { authorization, passportCall } from "../utils.js";
import { changeUserRoleAdm, deleteUser, deleteUserInactiv } from "../controllers/user.controlers.js";
import { logout } from "../controllers/session.controlers.js";

const router = Router()

router.get("/", passportCall("jwt"), authorization("admin"), async (req, res) => {
    const users = await UserService.get()
    res.render("users", {users})
})

router.get("/delete", passportCall("jwt"), deleteUserInactiv)

router.get("/:uid", passportCall("jwt"), authorization("admin"), changeUserRoleAdm)


router.post("/documents", passportCall("jwt"), uploaderDocument, logout)

router.post("/imgProfile", passportCall("jwt"), uploaderProfile, logout)

router.delete("/:uid", passportCall("jwt"), authorization("admin"), deleteUser)

export default router