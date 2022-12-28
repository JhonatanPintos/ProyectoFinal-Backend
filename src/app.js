import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import __dirname from "./utils.js"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")


const httpServer = app.listen(8080, () => console.log("Listening..."))
const socketServer = new Server(httpServer)
httpServer.on("error", () => console.log("ERROR"))

app.use((req,res,next)=>{
    req.io = socketServer
    next()
})

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

app.use("/", (req, res) => res.send("HOME"))


