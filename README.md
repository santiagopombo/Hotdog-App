# Hotdog App README

**eCommerce Stripe Integration sample app**

![hotdogapp](https://user-images.githubusercontent.com/11928927/100178960-ddb5ab80-2e89-11eb-939d-265aae9303f2.png)

## About

This is a sample React app built to demonstrate how easy it is to embed a custom Stripe payment form in a website or application:
- create-react-app boilerplate 
- Stripe JS and Stripe APIs for the CheckoutForm and Server.js from: https://stripe.com/docs/payments/integration-builder
- an express server
- The HotdogPinCounter.js & TotalPrice.js components were respectfully "borrowed" from: https://github.com/beauxapps/hotdog-pins/tree/master/src

## Installation
- Clone repo or Download file and open in your IDE of choice.
- Go to your Stripe Dashboard, copy your API Test keys and update the files App.jsx with pk.test (line 12) & server.js with sk.test (line 6). Save.
- Open Terminal and cd into the updated project directory `Hotdog App`
- Install dependencies `npm install`
- Install Yarn `brew install yarn`
- Run server and client `yarn start-server` `yarn start-client` in separate terminal windows.
- Browse app in http://localhost:3000/checkout


## Testing
- In your browser, http://localhost:3000/checkout select the number of pins
- Enter payment information with the following test cards:
- `4242424242424242` -- no required authentication
- `4000002500003155` -- requires authentication
- `4000000000009995` -- declines codes for insufficient_funds
