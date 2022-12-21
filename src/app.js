import express from "express";
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static("public"))

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

app.use("/", (req, res) => res.send("HOME"))



const server = app.listen(8080)
server.on("error", () => console.log("ERROR"))