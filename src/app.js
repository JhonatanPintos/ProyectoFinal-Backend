import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import __dirname from "./utils.js"
import mongoose from "mongoose";
import run from "./run.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

mongoose.connect("mongodb+srv://jhonatan:jhonyp19@ecomerse.lzlwlcw.mongodb.net/?retryWrites=true&w=majority", {
    dbName: "myFirstDatabase"
}, (error) => {
    if(error){
        console.log("DB No conected...")
        return
    }
    const httpServer = app.listen(8080, () => console.log("Listening..."))
    const socketServer = new Server(httpServer)
    httpServer.on("error", () => console.log("ERROR"))
    run(socketServer, app)
})