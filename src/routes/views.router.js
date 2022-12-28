import { Router } from "express"
import FileManager from "../manager/fileManager.js"

const fileManager = new FileManager("products.json")
const router = Router()

router.get("/", async (req, res) => {
    const products = await fileManager.get()
    const limit = req.query.limit
    if(limit){
        res.json(products.slice(0,parseInt(limit)))
    } else {
        res.render("index", {
            products
        })
    }
})

export default router
