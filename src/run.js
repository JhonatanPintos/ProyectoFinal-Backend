import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import chatRouter from "./routes/chat.router.js"
//import productModel from "./dao/models/products.model.js";
//import cartModel from "./dao/models/cart.model.js";
import messagesModel from "./dao/models/messages.model.js";


const run = (socketServer, app) => {
    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })

    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/api/chat", chatRouter)

    const messages = []

    socketServer.on("connection", socket => {
        console.log("New client connected")
        socket.on("message", data => {
            messages.push(data)
            socketServer.emit("logs", messages)
        })
    })

    //app.use("/", (req, res) => res.send("HOME"))

    app.get("/", async (req, res) => {
        try {
            const message = await messagesModel.find()
            res.send({
                result: "success",
                payload: message
            })
        } catch (error) {
            console.log(error)
            res.send({
                result: "error",
                error
            })
        }
    })

    app.post("/", async (req, res) => {
        const result = await messagesModel.create(req.body)
        res.send({
            result: "success",
            payload: result
        })
    })

    app.put("/:mid", async (req, res) => {
        const mid = req.params.mid
        const messageToReplace = req.body
        const result = await messagesModel.updateOne({
            _id: mid
        }, messageToReplace)
        res.send({
            result: "success",
            payload: result
        })
    })

    app.delete("/:mid", async (req, res) => {
        const mid = req.params.mid
        const result = await messagesModel.deleteOne({
            _id: mid
        })
        res.send({
            result: "success",
            payload: result
        })
    })
}

export default run