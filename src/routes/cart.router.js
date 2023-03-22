import { Router } from "express"
import { CartService } from "../repository/index.js"

const router = Router()

//GET
router.get("/", async (req, res) => {
    const carts = await CartService.get()
    res.json({ carts })
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const cart = await CartService.getByIdLean(id)
    const productsInCart = cart.products
    res.render("cart", {productsInCart})
})

//POST
router.post("/", async (req, res) => {
    const newCart = await CartService.create({})

    res.json({status: "Success", newCart})
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid
    const quantity= req.body.quantity || 1
    const cart = await CartService.getById(cartID)

    let found = false
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].id._id == productID) {
            
            cart.products[i].quantity++
            found = true
            break
        }
    }
    if (found == false) {
        cart.products.push({ id: productID, quantity})
    }

    await cart.save()


    res.redirect(`/api/carts/${cartID}`)
})

router.post("/:cid/purchase", async (req, res) => {
    const cartID = req.params.cid
})

//DELETE
router.delete("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid

    const cart = await CartService.getById(cartID)
    if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})

    const productIDX = cart.products.findIndex(p => p.id._id == productID)

    if(productIDX < 0) return res.status(404).json({status: "error", error: "Product Not Found on Cart"})

    cart.products.splice(productIDX, 1)
    await cart.save()

    res.json({status: "Success", cart})
})

router.delete("/:cid", async (req, res) => {
    const cartID = req.params.cid
    const cart = await CartService.getById(cartID)
    if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})

    cart.products = []
    await cart.save()    

    res.json({status: "Success", cart})
})

//PUT
router.put("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid
    const newQuantity = req.body.quantity

    const cart = await CartService.getById(cartID)
    if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})

    const productIDX = cart.products.find(p => p.id._id == productID)
    productIDX.quantity = newQuantity

    await cart.save()

    res.json({status: "Success", cart})
})

router.put("/:cid", async (req, res) => {
    const cartID = req.params.cid
    const cartUpdate = req.body

    const cart = await CartService.getById(cartID)
    if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})

    cart.products = cartUpdate
    await cart.save()

    res.json({status: "Success", cart})
})


export default router