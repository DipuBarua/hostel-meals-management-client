import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
    const { package_name } = useParams();
    const axiosSecure = useAxiosSecure();
    const stripPromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);


    const { data: item = [] } = useQuery({
        queryKey: ["package", package_name],
        queryFn: async () => {
            const res = await axiosSecure.get(`/package/${package_name}`)
            return res.data;
        }
    })
    console.log(item.price);

    return (
        <div className=" bg-orange-700">
            <Helmet>
                <title>HostelMeals | Payment</title>
            </Helmet>

            <div className=" w-full text-4xl font-semibold text-white text-center items-center p-12 bg-black">
                <h2>Pay to Subscribe <span className=" text-amber-600 uppercase">{package_name}</span> Plan</h2>
            </div>

            <div className=" p-2 w-1/2 mx-auto text-center text-xl font-semibold text-black bg-gray-300">
                <h2>Total Amount: ${item?.price}</h2>
            </div>
            <Elements stripe={stripPromise}>
                <CheckoutForm
                    // price={item?.price}
                    item={item}
                ></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;