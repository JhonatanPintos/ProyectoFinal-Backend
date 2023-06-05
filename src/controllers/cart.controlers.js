import mercadopago from "mercadopago";
import config from "../config/config.js";
import { CartService, ProductService } from "../repository/index.js";
import EErros from "../errors/enums.js";
import { v4 as uuidv4 } from 'uuid';
import CustomError from "../errors/custom.errors.js";
import { generateCartErrorInfoStock } from "../errors/info.js";

mercadopago.configure({
    access_token: `${config.MERCADOPAGO}`
})

export const allCarts = async (req, res) => {
  const carts = await CartService.get()
  res.json({ carts })
}

export const purchase = async (req, res) => {
  const emailUser = req.user.user.email 
  const tickets = await CartService.getTikEmail(emailUser)
  res.render("purchase", {tickets})
}

export const addCart = async (req, res) => {
  const newCart = await CartService.create({})
  res.json({status: "Success", newCart})
}

export const cartID = async (req, res) => {
  const id = req.params.id
  const cart = await CartService.getByIdLean(id)
  const productsInCart = cart.products
  res.render("cart", {productsInCart, cart})
}

export const addProdToCart = async (req, res) => {
  const cartID = req.params.cid
  const productID = req.params.pid
  const quantity= req.body.quantity || 1
  try{
      const cart = await CartService.getById(cartID)
      const infoProd = await ProductService.getById(productID)
      if(infoProd.stock < quantity){
          await CustomError.createError({
              name: "Add product error",
              cause: generateCartErrorInfoStock(infoProd),
              message: "Error dont have Stock",
              code: EErros.INVALID_TYPES_ERROR
          })
      }
      let found = false
      for (let i = 0; i < cart.products.length; i++) {
          if (cart.products[i].id._id == productID) {
              cart.products[i].quantity++
              found = true
              break
          }
      }
      if (found == false) {
          cart.products.push({ id: productID, quantity})
      }
          await cart.save()
  } catch(error){
      req.logger.error(error)
  }
  res.redirect(`/api/carts/${cartID}`)
}

export const finalizarCompra =  async (req, res) => {
  const cartID = req.params.cid
  const cart = await CartService.getById(cartID)
  const userEmail = req.user.user.email
  let totalPrice = 0
  let code
  const noStock = []
  const comparation = cart.products
  await Promise.all(comparation.map( async p => {
      if(p.id.stock >= p.quantity){
          p.id.stock -= p.quantity;
          ProductService.update(p.id._id, p.id);
          totalPrice += p.id.price * p.quantity;
          const productIDX = comparation.findIndex(item => item.id._id == p.id._id)
          comparation.splice(productIDX, 1)
      } else {
          noStock.push({
              title: p.id.title,
              price: p.id.price,
              quantity: p.quantity
          })
      }
    }))
    await CartService.update(cartID, comparation)
   if(totalPrice > 0){
    await CartService.createTik({
        purchaser : userEmail,
        amount : totalPrice,
        code: code = uuidv4()
      })
  }
  await CartService.getTik(code)
  res.redirect("/api/carts/purchase")
}

export const deleteProdInCart = async (req, res) => {
  const cartID = req.params.cid
  const productID = req.params.pid
  const cart = await CartService.getById(cartID)
  if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})
  const productIDX = cart.products.findIndex(p => p.id._id == productID)
  if(productIDX < 0) return res.status(404).json({status: "error", error: "Product Not Found on Cart"})
  cart.products.splice(productIDX, 1)
  await cart.save()
  res.json({status: "Success", cart})
}

export const deleteAllProdInCart = async (req, res) => {
  const cartID = req.params.cid
  const cart = await CartService.getById(cartID)
  if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})
  cart.products = []
  await cart.save()    
  res.json({status: "Success", cart})
}

export const cambiarCantidadProd = async (req, res) => {
  const cartID = req.params.cid
  const productID = req.params.pid
  const newQuantity = req.body.quantity
  const cart = await CartService.getById(cartID)
  if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})
  const productIDX = cart.products.find(p => p.id._id == productID)
  productIDX.quantity = newQuantity
  await cart.save()
  res.json({status: "Success", cart})
}

export const changeAllProds = async (req, res) => {
  const cartID = req.params.cid
  const cartUpdate = req.body
  const cart = await CartService.getById(cartID)
  if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})
  cart.products = cartUpdate
  await cart.save()
  res.json({status: "Success", cart})
}

export const Pagar = async (req, res) => {
    try {
      if(req.body.estado != "Pagada"){
      res.cookie("id", req.body.id)
      let preference = {
        items: [
          {
            title: 'Coder Proyect',
            unit_price: parseInt(req.body.total),
            quantity: 1,
          }
        ],
        back_urls: {
          "success": `${config.BASE_URL}/api/carts/approved`,
          "failure": `${config.BASE_URL}/api/carts/purchase`,
          "pending": `${config.BASE_URL}/session/login`
        },
        auto_return: "approved",
      };

      mercadopago.preferences.create(preference)
        .then(async function (response) {
          res.redirect(response.body.init_point)
        }).catch(function (error) {
          console.log(error);
        });
      }else{
        console.log("Ticket ya pagado")
        res.redirect("/api/carts/purchase")
      }
    } catch (error) {
      res.send("Error en la aplicacion")
    }
  }

  export const approved = async (req, res) => {
    try {
      const id = req.cookies.id;
      await CartService.updateTik(id, { status: "Pagada" })
      res.clearCookie("id")
      res.redirect("/api/carts/purchase")
    } catch (error) {
      res.send("Error en la aplicacion")
    }
  };

  //TARJETAS DE PRUEBA
  //MASTERCARD ---- 5031 7557 3453 0604 ---- 123 ---- 11/25
  //VISA ---- 4509 9535 6623 3704 ---- 123 ---- 11/25
  //AMERICAN EXPRESS ---- 3711 803032 57522 ---- 1234 ---- 11/25