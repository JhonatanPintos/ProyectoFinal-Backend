import mercadopago from "mercadopago";
import config from "../config/config.js";

mercadopago.configure({
    access_token: `${config.MERCADOPAGO}`
})

export const Pagar = async (req, res) => {
    try {
      let preference = {
        items: [
          {
            title: 'Coder Proyect',
            unit_price: parseInt(req.body.total),
            quantity: 1,
          }
        ],
        back_urls: {
          "success": `${config.BASE_URL}/products`,
          "failure": `${config.BASE_URL}/session/current`,
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
    } catch (error) {
      res.send("Error en la aplicacion")
    }

  }

  //TARJETAS DE PRUEBA
  //MASTERCARD ---- 5031 7557 3453 0604 ---- 123 ---- 11/25
  //VISA ---- 4509 9535 6623 3704 ---- 123 ---- 11/25
  //AMERICAN EXPRESS ---- 3711 803032 57522 ---- 1234 ---- 11/25