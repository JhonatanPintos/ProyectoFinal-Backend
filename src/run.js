import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import chatRouter from "./routes/chat.router.js"
import { MessageService } from "./repository/index.js"
import productViewsRouter from './routes/products.views.router.js'
import sessionRouter from './routes/session.router.js'
import { passportCall, authorization } from "./utils.js";
import errorMiddlewares from "./errors/errorMiddlewares.js"
import mocksRouter from "./routes/mocks.router.js"
import loggerTest from "./routes/loggerTest.js"
import usersRouter from "./routes/users.router.js"

const run = (socketServer, app) => {
    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })

    app.use("/products", passportCall("jwt"), productViewsRouter)
    app.use("/session", sessionRouter)
    app.use("/api/products", passportCall("jwt"), productRouter)
    app.use("/api/carts", passportCall("jwt"), cartRouter)
    app.use("/api/chat", passportCall("jwt"), chatRouter)
    app.use("/api/mockingProducts", passportCall("jwt"), authorization('admin'), mocksRouter)
    app.use("/loggerTest", passportCall("jwt"), authorization('admin'), loggerTest)
    app.use("/api/users", passportCall("jwt"), usersRouter)

    socketServer.on("connection", socket => {
        console.log("New client connected")
        socket.on("message", async data => {
        await MessageService.create(data)
        let messages = await MessageService.get()
        socketServer.emit("logs", messages)
        })
    })

    app.use("/", (req, res) => res.redirect("/session/login"))
    app.use(errorMiddlewares)


}

export default run