/**
 * Build Stripe Payment Gateway
 * 
 * 1>> install stripe, stripe-js, react-stripe-js in client side.
 * 2>> need to open account in stripe and Get publishable key(use in client) and secret key(use in server) form stripe api.
 * 3>> use PK to get stripe promise
 * 4>> post data(price) from checkoutForm
 * 5>> write payment Intent api in server side and send client secret
 * 6>> receive and use client secret in client side.
 * 7>> create cardElemnet using react-stripe-js and use in checkoutForm.
 * 
 */