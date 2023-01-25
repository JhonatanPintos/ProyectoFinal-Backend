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
    const newCart = await cartModel.create({})

    res.json({status: "Success", newCart})
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid
    const quantity= req.body.quantity || 1
    const cart = await cartModel.findById(cartID)

    let found = false
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].id == productID) {
            cart.products[i].quantity++
            found = true
            break
        }
    }
    if (found == false) {
        cart.products.push({ id: productID, quantity})
    }

    await cart.save()


    res.json({status: "Success", cart})
})

export default router