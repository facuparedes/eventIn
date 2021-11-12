const express = require("express");
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-6106850900617467-110906-6a1010cb301a9877ecbec20a69859fe1-44380919",
});

app.post('/checkout', (req, res) => {
  let preference = {
    external_reference: '1234567890',
    items: [
      {
        title: req.body.title,
        unit_price: 100,
        quantity: 1,
      },
    ],
    back_urls: {
      success: 'http://192.168.0.10:3001/success',
      failure: 'http://192.168.0.10:3001/cancel'
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
  console.log('QUERYYYYY', req.query)
  console.log('PARAMSSSS', req.params)
  console.log('BODYYYYYY', req.body);
  res.send('Approved')
})

app.get('/cancel', (req, res) => {
  res.send('Cancel')
})

app.get('/payment', (req, res) => {
  const id = req.body.id;

})
app.listen(3001, () => {
  console.log("Server Running");
});
