import {Router} from "express"
import { MockService } from "../repository/index.js"
import { generateProduct } from "../facker.utils.js"

const router = Router()

//FAKER
router.get("/", async (req, res) => {
    const products = []
    for (let i = 0; i < 100; i++) {
        products.push(await MockService.create(generateProduct()))
    }
    res.send({status:'success', payload: products})
})

export default router
