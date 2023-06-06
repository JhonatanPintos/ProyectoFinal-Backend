import {Router} from "express"
import { prodView } from "../controllers/product.controlers.js"
import { passportCall } from "../utils.js"

const router = Router()

router.get("/", passportCall("jwt"), prodView)

export default router