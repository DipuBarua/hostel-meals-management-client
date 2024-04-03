import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ price }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [errorMsg, setErrorMsg] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log("payment error:", error);
            setErrorMsg(error.message);
        } else {
            console.log("method:", paymentMethod);
            setErrorMsg('');
        }

        // confirm payment 
        const { paymentIntent, error: payError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous",
                    // phone: user?.phoneNumber || "anonymous",
                }
            }
        })

        if (payError) {
            console.log('payment error:', payError);
            setErrorMsg(payError);
        }
        else {
            console.log("payment intent:", paymentIntent);
            console.log("payment status:", paymentIntent.status);

            if (paymentIntent.status === "succeeded") {
                console.log('trnx Id:', paymentIntent.id);
                setTransactionId(paymentIntent.id);
            }
        }

    }


    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, price])

    return (
        <div className=" min-h-screen text-center bg-gray-300 text-white">

            <form onSubmit={handleSubmit} className=" bg-orange-700 w-1/2 mx-auto p-24">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#ffffff',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />


                <button
                    // disabled={!stripe || !elements || !clientSecret}
                    type="submit"
                    className=" btn btn-outline my-7 w-1/2"
                >Pay
                </button>

                {/* Show any error or success messages */}
                <h2 className=" text-red-600 p-4">{errorMsg}</h2>
                {transactionId &&
                    <p className=" text-green-600 p-4">Your Transaction Id: {transactionId}</p>
                }

            </form>
        </div>
    );
};

export default CheckoutForm;