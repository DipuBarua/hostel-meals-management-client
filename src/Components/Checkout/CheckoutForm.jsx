import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";

const CheckoutForm = ({ item }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);

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

        setProcessing(true);

        // confirm payment 
        const { paymentIntent, error: payError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous",
                    phone: user?.phoneNumber || "anonymous",
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

                // save payment info in database 
                const paymentInfo = {
                    email: user.email,
                    price: item.price,
                    status: item.package_name,
                    transaction_id: paymentIntent.id,
                    time: moment().format('DD-MM-YYYY, h:mm:ss a'),
                }

                await axiosSecure.post("/payment", paymentInfo)
                    .then(async res => {
                        if (res?.data?.insertedId) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `Successfully you got ${item.package_name}  Membership`,
                                showConfirmButton: false,
                                timer: 2500
                            });

                            // update user membership status
                            await axiosSecure.patch(`/user-membership/${user.email}`, { status: item.package_name, })
                                .then(res => {
                                    console.log('user membership:', res.data);
                                })
                        }
                    })
                    .catch(err => console.log(err));


                setProcessing(false);
            }
        }

    }


    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: item.price })
            .then(res => {
                console.log("secret109:", res.data);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, item.price])
    console.log("prices", item.price);

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
                    disabled={!stripe || !clientSecret || processing}
                    type="submit"
                    className=" btn btn-outline my-7 w-1/2">
                    Pay
                </button>

                {/* Show any error or success messages */}
                {
                    processing ?
                        <div>
                            <span className="loading loading-spinner loading-xs"></span>
                        </div>
                        :
                        <div className=" py-2 bg-white">
                            <h2 className=" text-red-600">{errorMsg}</h2>
                            {transactionId &&
                                <p>
                                    <span className=" text-green-500">Transaction Id:  </span>
                                    <span className=" text-black font-medium">{transactionId}</span>
                                </p>
                            }
                        </div>
                }

            </form>
        </div>
    );
};

export default CheckoutForm;