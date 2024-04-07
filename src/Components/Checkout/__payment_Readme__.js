/**
 * Build Stripe Payment Gateway
 * 
 * 1>> install stripe, stripe-js, react-stripe-js in client side. install stripe in server side.
 * 2>> need to open account in stripe and Get publishable key(use in client) and secret key(use in server) form stripe api.
 * 3>> use PK to get stripe promise
 * 4>> post data(price) from checkoutForm for payment-Intent
 * 5>> write payment-Intent api in server side and send client_secret [amount/price must be a number***]
 * 6>> receive and use client secret in client side.
 * 7>> create cardElemnet using react-stripe-js and use in checkoutForm.
 * 8>> then build the function to handle submit.
 * 9>> create payment method and confirm payment
 * 10>> write post api for payment collection in server.
 * 
 */