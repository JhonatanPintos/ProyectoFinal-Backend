import {Router} from "express"
import { getAll, getAllRL, getById, deleteOne, create, updateOne } from "../controler/product.controler.js"

const router = Router()

//GET
router.get("/", getAll)

//GET REALTIME
router.get("/realtimeproducts", getAllRL)

//GET BY ID
router.get("/:id", getById)

//DELETE
router.delete("/:pid", deleteOne)

//POST
router.post("/", create)

//PUT
router.put("/:pid", updateOne)


export default router