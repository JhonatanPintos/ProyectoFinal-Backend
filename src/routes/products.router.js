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
        res.json({ products })
    }
})

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await fileManager.getById(id)
    res.json({ product })
})

router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const productDeleted = await fileManager.deleteById(id)
    res.json({status: "Success", massage: "Product Deleted!", productDeleted})
})

router.post("/", async (req, res) => {
    const product = req.body
    const productAdded = await fileManager.add(product)

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

    res.json({status: "Success", product})
})

export default router