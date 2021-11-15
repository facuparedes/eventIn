const express = require("express");
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "APP_USR-8797079102082173-111305-a9e47385ea6a686ea7b8fc22a1da2125-1018242337",
});

app.post('/checkout', (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: req.body.price,
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
      console.log(response.body);
      res.send(response.body.sandbox_init_point);

    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/success', (req, res) => {
  console.log('QUERYYYYY', req.query);
  res.send('Approved')
})

app.get('/cancel', (req, res) => {
  res.send('Cancel')
})
app.get('/payment', (req, res) => {
  const id = req.body.id;

})

app.listen(process.env.PORT || 3001, () => {

  console.log("Server Running");

})
