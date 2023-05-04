import mongoose from "mongoose";
import chai from "chai";
import config from "../src/config/config.js";
import Cart from "../src/DAO/mongo/carts.mongo.js";

mongoose.connect(config.TEST_MONGO_URI);
const expect = chai.expect;

describe("Testing Carts DAO", () => {
    before(function() {
        this.cartsDao = new Cart()
    })

    beforeEach(function() {
        mongoose.connection.collections.carts.drop()
        this.timeout(5000)
    })

    it("El DAO debe comprobar que no halla ningun carrito creado", async function() {
        const cart = await this.cartsDao.get()
        expect(cart).to.be.deep.equal([])
    })

    it("El DAO debe poder crear un carrito con una propiedad products que por defecto es un array vacío", async function() {
        const cart = await this.cartsDao.create()
        expect(cart._id).to.be.ok
        expect(cart.products).to.be.deep.equal([])
    })

    it("El DAO debe poder obtener un carrito mediante su ID", async function() {
        const cart = await this.cartsDao.create()
        const foundCart = await this.cartsDao.getById(cart._id)

        expect(foundCart._id).to.be.ok
        expect(foundCart.products).to.be.an("array")
    })

    it("El DAO debe poder traer todos los carritos creados", async function() {
        const cart = await this.cartsDao.get()
        expect(cart).to.be.deep.an("array")
    })
})