import {Router} from "express"
import { ProductService } from "../repository/index.js"

const router = Router()

router.get("/", async (req, res) => {

    const limit = req.query?.limit || 15
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
    res.render('products', {data, user})
})

export default router