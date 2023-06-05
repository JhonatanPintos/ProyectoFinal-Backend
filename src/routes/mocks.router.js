import { Router } from "express"
import { faker } from "../controllers/product.controlers.js"

const router = Router()

//FAKER
router.get("/", faker)

export default router
