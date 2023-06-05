import {Router} from "express"
import { uploaderProduct } from "../config/multer.js"
import { passportCall } from "../utils.js"
import { addProd, allProds, deleteProd, oneProd, realtimeproducts, updateProd } from "../controllers/product.controlers.js"

const router = Router()

//GET
router.get("/", allProds)

router.get("/realtimeproducts", realtimeproducts)

router.get("/:id", oneProd)

//DELETE
router.delete("/:pid", deleteProd)

//POST
router.post("/", passportCall("jwt"), uploaderProduct, addProd)

//PUT
router.put("/:pid", updateProd)


export default router