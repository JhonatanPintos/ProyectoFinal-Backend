import { Router } from "express"
import FileManager from "../manager/fileManager.js"

const fileManager = new FileManager("products.json")
const router = Router()

router.get("/", async (req, res) => {
    const products = await fileManager.get()
    const limit = req.query.limit
    if(limit){
        res.json(products.slice(0,parseInt(limit)))
    } else {
        res.render("index", {
            products
        })
    }
})

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await fileManager.getById(id)

    req.io.emit('updatedProducts', await manager.getProducts());
    res.json({ product })
})

router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const productDeleted = await fileManager.deleteById(id)

    req.io.emit('updatedProducts', await manager.getProducts());
    res.json({status: "Success", massage: "Product Deleted!", productDeleted})
})

router.post("/", async (req, res) => {
    const product = req.body
    const productAdded = await fileManager.add(product)

    req.io.emit('updatedProducts', await manager.getProducts());
    res.json({status: "Success", productAdded})
})

router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const productToUpdate = req.body

    const product = await fileManager.getById(id)
    if(!product) return res.status(404).send("Product Not Found")

    for (const key of Object.keys(productToUpdate)) {
        product[key] = productToUpdate[key]
    }

    await fileManager.update(id, product)

    req.io.emit('updatedProducts', await manager.getProducts());
    res.json({status: "Success", product})
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await manager.getProducts()
    res.render('realTimeProducts',{
        products
    })
})


export default router