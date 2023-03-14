import ProductService from "../services/product.service.js";

const productService = new ProductService()

//GET
export const getAll = async (req, res) => {
    const products = await productService.getAll()
    const limit = req.query.limit
    if (limit) {
        res.json(products.slice(0, parseInt(limit)))
    } else {
        res.render("home", {
            products
        })
    }
}

export const getAllRL = async (req, res) => {
    const products = await productService.getAll()
    res.render('realTimeProducts', {
        data: products
    })
}

export const getById = async (req, res) => {
    const id = req.params.id
    const product = await productService.getById(id)
    res.render("productDetail", product)
}

//DELETE
export const deleteOne = async (req, res) => {
    const id = req.params.id

    const deleted = await productService.delete(id)
    
    //Update realTime
    req.io.emit('updatedProducts', await productService.getAll())

    res.json({
        status: "Success",
        massage: "Product deleted",
        deleted
    })
}

//POST
export const create = async (req, res) => {
    try {
        const product = req.body
        if (!product.title) {
            return res.status(400).json({
                message: "Error Falta el nombre del producto"
            })
        }
        const productAdded = await productService.create(product)
        req.io.emit('updatedProducts', await productService.getAll());
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
}

//PUT
export const updateOne =  async (req, res) => {
    const id = req.params.pid
    const productToUpdate = req.body

    const product = await productService.update(id, productToUpdate)

    //Update realTime
    req.io.emit('updatedProducts', await productService.getAll());
    res.json({status: "Success", product})
}