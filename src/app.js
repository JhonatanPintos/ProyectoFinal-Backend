import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import __dirname from "./utils.js"
//import mongoose from "mongoose";
import run from "./run.js";
//import MongoStore from "connect-mongo";
import session from "express-session";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { addLogger } from "./errors/logger.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from "swagger-ui-express"

const app = express()

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion del Proyecto",
            description: "Ejemplos y documentacion del proyecto"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(express.json())
app.use(cookieParser())
app.use(addLogger)
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

    const httpServer = app.listen(8080, () => console.log("Listening..."))
    const socketServer = new Server(httpServer)
    httpServer.on("error", () => console.log("ERROR"))
    run(socketServer, app)


    