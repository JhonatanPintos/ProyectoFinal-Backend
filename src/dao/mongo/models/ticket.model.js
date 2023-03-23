import mongoose from "mongoose";

const ticketCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: String,
    purchease_datetime: {
        type: Date,
        default: Date.now
    },
    amount: Number,
    purchaser: String
})

mongoose.set("strictQuery", false)
const TicketModel = mongoose.model(ticketCollection, ticketSchema)

export default TicketModel