
import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import HotdogPinCounter from "./HotdogPinCounter.js";
import TotalPrice from "./TotalPrice";
import "./App.css";



const promise = loadStripe("pk_test_51HmpekEmMY5cOmQYfDBYofwI6VQ4FAxoP41eFQsXsitRGYyQI1LA62mA0Dlt7PUDx3d3LUI1vxOTaGnwpmM4BgoM00kxtV9LMq");


export default function App() {
const [quantity, setQuantity] = useState(1);
  const fewerHotdogs = () => setQuantity(quantity => Math.max(0, quantity - 1));
  const moreHotdogs = () => setQuantity(quantity => Math.min(1000, quantity + 1));
  //entering the price in dollars here just for display. Properly handling price on the server to avoid nefariousness.
  const price = 12

  return (
    <div className="App">
    <h1> Rad HotDog Pins - $12 Bucks a pop</h1>
      <p>Choose your favorite pin and pay for it seemlessly, courtesy of Stripe! </p>
     

       <HotdogPinCounter
            onFewer={fewerHotdogs}
            quantity={quantity}
            onMore={moreHotdogs}
           />

      <TotalPrice
             quantity={quantity}
             price={price}
            />

      <Elements stripe={promise}>
        <CheckoutForm quantity={quantity} />
      </Elements>
    </div>
  );
}
