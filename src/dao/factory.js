import config from "../config/config.js";
import mongoose from "mongoose";

export let Cart
export let Message
export let Product
export let User

console.log(`PERSISTENCE [${config.persistence}]`);
switch (config.persistence) {
    case 'FILE':
        
        const { default: ProductFile } = await import('./file/products.file.js')
        const { default: MessageFile } = await import('./file/messages.file.js')
        const { default: UserFile } = await import('./file/users.file.js')
        const { default: CartFile } = await import('./file/carts.file.js')

        Product = ProductFile
        Message = MessageFile
        Cart = CartFile
        User = UserFile

        break;
    case 'MONGO':
        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.mongoDBName
        }, () => console.log('Mongo connected'))
                
        const { default: ProductMongo } = await import('./mongo/products.mongo.js')
        const { default: MessageMongo } = await import('./mongo/messages.mongo.js')
        const { default: UserMongo } = await import('./mongo/users.mongo.js')
        const { default: CartMongo } = await import('./mongo/carts.mongo.js')

        Product = ProductMongo
        Message = MessageMongo
        Cart = CartMongo
        User = UserMongo

        break;
    default:
        break;
}