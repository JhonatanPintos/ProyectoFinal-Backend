import { Router } from "express"
import CartManager from "../dao/manager/cart_manager.js"
import cartModel from "../dao/models/cart.model.js"

const cartManager = new CartManager("carts.json")
const router = Router()

router.get("/", async (req, res) => {
    const carts = await cartModel.find().lean().exec()
    res.json({ carts })
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const cart = await cartModel.findOne({_id: id})
    res.json({ cart })
})

router.post("/", async (req, res) => {
    const newCart = await cartModel.create({products: {}})

    res.json({status: "Success", newCart})
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid

    const cart = await cartManager.addProduct(cartID, productID)

    res.json({status: "Success", cart})
})

export default router