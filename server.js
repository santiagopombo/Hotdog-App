const express = require("express");
const app = express();
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")(
  "sk_test_51HmpekEmMY5cOmQYEKs5UaFbozbqnh14dZXrJlsHEXVNBYmNryrknOpnJ490pmu39WCFsMa480JVT1TIUZ8Xuh5R00KgOOUYZE"
);
app.use(express.static("."));
app.use(express.json());
var cors = require('cors')
app.use(cors());
var morgan = require('morgan')
//const bodyParser = require('body-parser');
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
var fs = require('fs')
var path = require('path')

const port = 4242
const priceInCents = 1200

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))


const calculateOrderAmount = (quantity) => {
  const priceInCents = 1200
  var totalAmount = priceInCents * quantity

  return (
    totalAmount
  );

  console.log(totalAmount);
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, quantity } = (req.body);
  const totalChargePrice = quantity.quantity * priceInCents;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(quantity.quantity),
    currency: "usd",
    metadata: {integration_check: 'accept_a_payment'},
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntentID: paymentIntent.id
  });
  console.log('creating a payment intent')
  console.log('client secret: ' + paymentIntent.client_secret)
  console.log('payment Intent ID: ' + paymentIntent.id)
});
app.listen(4242, () => console.log("Node server listening on port 4242!"));

// Match the raw body to content type application/json
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event;

  try {
    event = JSON.parse(request.body);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSuccess = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_intent.created':
      const paymentIntentCreate = event.data.object;
      console.log('PaymentIntent was created!');
      break;
    case 'charge.succeeded':
      const chargeSuccess = event.data.object;
      console.log('Charge succeeded!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});
