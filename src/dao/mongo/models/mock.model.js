import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const mockCollection = "mocks"

const mockSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: Array,
})

mongoose.set("strictQuery", false)
mockSchema.plugin(mongoosePaginate)
const MockModel = mongoose.model(mockCollection, mockSchema)

export default MockModel