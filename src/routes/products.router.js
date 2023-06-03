import {Router} from "express"
import { ProductService, UserService } from "../repository/index.js"
import { uploaderProduct } from "../config/multer.js"
import { passportCall } from "../utils.js"

const router = Router()

//GET
router.get("/", async (req, res) => {
    const products = await ProductService.get()
    const limit = req.query.limit
    if (limit) {
        res.json(products.slice(0, parseInt(limit)))
    } else {
        res.render("home", {
            products
        })
    }
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await ProductService.get()
    res.render('realTimeProducts', {
        data: products
    })
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const idU = req.user.user._id
    const user = await UserService.getOneByID(idU)
    const product = await ProductService.getOneByID(id)
    res.render("productDetail", {product, user: user})
})

//DELETE
router.delete("/:pid", async (req, res) => {
        const id = req.params.pid
        const user = req.user.user
        const productID = await ProductService.getOneByID(id)
        const owner = productID.owner.id
        if(owner == user._id || user.role == "admin"){
            console.log("si")
            const productDeleted = await ProductService.delete(id) 
            req.io.emit('updatedProducts', await ProductService.get());
            res.json({status: "Success", massage: "Product Deleted!", productDeleted})
    }else{
        req.logger.warning("No Owner")
    }
})

//POST
router.post("/", passportCall("jwt"), uploaderProduct, async (req, res) => {
    try {
        const user = req.user.user
        const product = req.body
        const imgDestination = req.file.destination
        const imgName = req.file.filename
        product.owner = {
            role: user.role,
            email: user.email,
            id: user._id
        }
        product.thumbnails = imgDestination + imgName
        if (!product.title) {
            return res.status(400).json({message: "Error Falta el nombre del producto"})
        }
        const productAdded = await ProductService.create(product)
        req.io.emit('updatedProducts', await ProductService.get());
        res.json({status: "Success", productAdded})
    } catch (error) {
        req.logger.error(error)
        res.json({error})
    }
})

//PUT
router.put("/:pid", async (req, res) => {
    const id = req.params.pid
    const productToUpdate = req.body

    const product = await ProductService.update({_id: id}, productToUpdate)
    req.io.emit('updatedProducts', await ProductService.get());
    res.json({status: "Success", product})
})


export default router