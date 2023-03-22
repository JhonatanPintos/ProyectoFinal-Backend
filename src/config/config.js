import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    jwtCookieName: process.env.JWT_COOKIE_NAME,
    mongoURI: process.env.MONGO_URI,
    mongoDBName: process.env.MONGO_DB_NAME
}