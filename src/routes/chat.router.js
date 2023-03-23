import { Router } from "express"
import { authorization } from "../utils.js"

const router = Router()

router.get("/", authorization('user'), (req, res) => {
    res.render("chat", {})
})

export default router