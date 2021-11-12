const express = require("express");

const app = express();

app.use(express.json())

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-6106850900617467-110906-6a1010cb301a9877ecbec20a69859fe1-44380919",
});

app.post("/checkout", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: 100,
        quantity: 1,
      },
    ],
    back_urls: {
      success: 'https://eventin-app.herokuapp.com/success',
      failure: 'https://eventin-app.herokuapp.com/cancel'
    },
    auto_return: 'approved',
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {

      res.send(response.body.sandbox_init_point);

    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/success', (req, res) => {
  res.send('Approved')
})

app.get('/cancel', (req, res) => {
  res.send('Cancel')
})

app.listen( process.env.PORT || 3001, () => {
  console.log("Server Running");
});
