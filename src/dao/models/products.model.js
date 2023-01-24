import mongoose from "mongoose";

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: Array,
})

mongoose.set("strictQuery", false)
const productModel = mongoose.model(productCollection, productSchema)

export default productModel