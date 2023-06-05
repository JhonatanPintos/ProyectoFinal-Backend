import { Router } from "express"
import { authorization, passportCall } from "../utils.js"
import { 
    Pagar, 
    addCart, 
    addProdToCart, 
    allCarts, 
    approved, 
    cambiarCantidadProd, 
    cartID, 
    changeAllProds, 
    deleteAllProdInCart, 
    deleteProdInCart, 
    finalizarCompra, 
    purchase 
} from "../controllers/cart.controlers.js";

const router = Router()

//GET
router.get("/", allCarts)

router.get("/purchase", purchase)

router.get("/approved", passportCall("jwt"), approved)

router.get("/:id", cartID)

//POST
router.post("/", authorization('user'), addCart)

router.post("/pagar", Pagar)

router.post("/:cid/product/:pid", addProdToCart)

router.post("/:cid/purchase", passportCall('jwt'), finalizarCompra)

//DELETE
router.delete("/:cid/product/:pid", deleteProdInCart)

router.delete("/:cid", authorization('admin'), deleteAllProdInCart)

//PUT ADMIN
router.put("/:cid/product/:pid", authorization('admin'), cambiarCantidadProd)

router.put("/:cid", authorization('admin'), changeAllProds)


export default router