import {Router} from "express"
import productModel from "../dao/models/products.model.js"

const router = Router()

router.get("/", async (req, res) => {
    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    const filter = req.query?.filter || ""

    const serch = {}

    if(filter){
        serch.title = filter
    }

    const options = {limit, page, lean: true}

    const data = await productModel.paginate(serch, options)

    res.render("products", data)

})

export default router