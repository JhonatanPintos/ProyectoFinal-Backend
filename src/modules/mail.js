import nodemailer from "nodemailer"
import config from "../config/config.js"

const { USER_MAIL: user, USER_PASS: pass } = config

export default class Mail {
    constructor() {
        this.transport = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user,
                pass
            }
        })
    }

    send = async(user, subject, html) => {
        const result = await this.transport.sendMail({
            from: `CoderCommerce <${user}>`,
            to: user,
            subject,
            html
        })

        return result
    }
}