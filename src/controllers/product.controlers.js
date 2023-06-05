import { generateProduct } from "../facker.utils.js"
import Mail from "../modules/mail.js"
import { MockService, ProductService, UserService } from "../repository/index.js"


export const allProds = async (req, res) => {
    const products = await ProductService.get()
    const limit = req.query.limit
    if (limit) {
        res.json(products.slice(0, parseInt(limit)))
    } else {
        res.render("home", {
            products
        })
    }
}

export const realtimeproducts = async (req, res) => {
    const products = await ProductService.get()
    res.render('realTimeProducts', {
        data: products
    })
}

export const oneProd = async (req, res) => {
    const id = req.params.id
    const idU = req.user.user._id
    const user = await UserService.getOneByID(idU)
    const product = await ProductService.getOneByID(id)
    res.render("productDetail", {product, user: user})
}

export const deleteProd = async (req, res) => {
    const id = req.params.pid
    const user = req.user.user
    const productID = await ProductService.getOneByID(id)
    const owner = productID.owner.id
    if(owner == user._id || user.role == "admin"){
        const productDeleted = await ProductService.delete(id) 
        req.io.emit('updatedProducts', await ProductService.get());
        if(productID.owner.email != "admin"){
            const mail = new Mail()
            const html = `
            <h1>Su producto fue eliminado</h1>
            <p>Hola 👋</p>
            <p>Su producto ${productID.title} (ID: ${id}) ha sido eliminado</p>
            `
        mail.send(productID.owner.email, "Producto eliminado", html)
        }
        res.json({status: "Success", massage: "Product Deleted!", productDeleted})
}else{
    req.logger.warning("No Owner")
}}

export const addProd = async (req, res) => {
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
        await ProductService.create(product)
        req.io.emit('updatedProducts', await ProductService.get());
        res.redirect("/products")
    } catch (error) {
        req.logger.error(error)
        res.json({error})
}}

export const updateProd = async (req, res) => {
    const id = req.params.pid
    const productToUpdate = req.body
    const product = await ProductService.update({_id: id}, productToUpdate)
    req.io.emit('updatedProducts', await ProductService.get());
    res.json({status: "Success", product})
}

export const prodView = async (req, res) => {
    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    const filter = req.query?.filter || ''
    const sortQuery = req.query?.sort || ''
    const sortQueryOrder = req.query?.sortorder || 'desc'
    const search = {}
    if(filter) {
        search.title = filter
    }
    const sort = {}
    if (sortQuery) {
        sort[sortQuery] = sortQueryOrder
    }
    const options = {
        limit, 
        page, 
        sort,
        lean: true
    }
    const data = await ProductService.getPaginate(search, options)
    const user = req.user.user
    const front_pagination = []
    for (let i = 1; i <= data.totalPages; i++) {
        front_pagination.push({
            page: i,
            active: i == data.page
        })
    }
    res.render('products', {data, user, front_pagination})
}

export const faker = async (req, res) => {
    const products = []
    for (let i = 0; i < 100; i++) {
        products.push(await MockService.create(generateProduct()))
    }
    res.send({status:'success', payload: products})
}