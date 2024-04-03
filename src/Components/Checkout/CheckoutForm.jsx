import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ price }) => {
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = () => {

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
                    disabled={!stripe || !elements || !clientSecret}
                    type="submit"
                    className=" btn btn-outline my-7 w-1/2"
                >Pay
                </button>

                {/* Show any error or success messages */}

            </form>
        </div>
    );
};

export default CheckoutForm;