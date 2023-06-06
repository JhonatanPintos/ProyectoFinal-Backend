import {Router} from "express"
import { uploaderProduct } from "../config/multer.js"
import { authorization, passportCall } from "../utils.js"
import { addProd, allProds, deleteProd, oneProd, realtimeproducts, updateProd } from "../controllers/product.controlers.js"

const router = Router()

//GET
router.get("/", passportCall("jwt"), authorization(["admin", "premium"]), allProds)

router.get("/realtimeproducts", passportCall("jwt"), authorization("admin"), realtimeproducts)

router.get("/:id", passportCall("jwt"), oneProd)

//DELETE
router.delete("/:pid", passportCall("jwt"), authorization(["admin", "premium"]), deleteProd)

//POST
router.post("/", passportCall("jwt"), authorization(["admin", "premium"]), uploaderProduct, addProd)

//PUT
router.put("/:pid", passportCall("jwt"), authorization(["admin", "premium"]), updateProd)


export default router