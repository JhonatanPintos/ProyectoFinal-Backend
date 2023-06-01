import mongoose from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts"
        }
    },
    role: {
        type: String,
        enum: ["user", "premium", "admin"],
        default: "user",
      },
    documents: {
        type: [{
            name: String,
            reference: String
        }],
        default: []
    },
    lastConecction: Date
})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel