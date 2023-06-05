import {Router} from "express"
import { prodView } from "../controllers/product.controlers.js"

const router = Router()

router.get("/", prodView)

export default router