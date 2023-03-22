import {Router} from "express"
import { ProductService } from "../repository/index.js"

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
    const product = await ProductService.getById(id)
    res.render("productDetail", product)
})

//DELETE
router.delete("/:pid", async (req, res) => {
    const id = req.params.pid
    const productDeleted = await ProductService.delete(id)

    req.io.emit('updatedProducts', await ProductService.get());
    res.json({
        status: "Success",
        massage: "Product Deleted!",
        productDeleted
    })
})

//POST
router.post("/", async (req, res) => {
    try {
        const product = req.body
        if (!product.title) {
            return res.status(400).json({
                message: "Error Falta el nombre del producto"
            })
        }
        const productAdded = await ProductService.create(product)
        req.io.emit('updatedProducts', await ProductService.get());
        res.json({
            status: "Success",
            productAdded
        })
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
})

//PUT
router.put("/:pid", async (req, res) => {
    const id = req.params.pid
    const productToUpdate = req.body

    const product = await ProductService.update({_id: id}, productToUpdate)
    req.io.emit('updatedProducts', await ProductService.get());
    res.json({
        status: "Success",
        product
    })
})


export default router