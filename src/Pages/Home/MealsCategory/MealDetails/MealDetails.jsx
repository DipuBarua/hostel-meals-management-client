import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHeart } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const MealDetails = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();

    const { data: meal = [] } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meal/${id}`);
            return res.data;
        }
    })
    console.log("meal details", meal);

    // Requested Meal 
    const handleRequest = async () => {
        const requestedInfo = {
            title: meal.title,
            image: meal.image,
            rating: parseFloat(meal.rating),
            price: parseFloat(meal.price),
            category: meal.category,
            like: parseInt(meal.like),
            review: parseInt(meal.review),
            distributor_name: meal.distributor_name,
            distributor_email: meal.distributor_email,
            time: meal.time,
            name: user.displayName,
            email: user.email,
            status: "pending",
        }

        await axiosSecure.post("/request", requestedInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Meal has been requested",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => console.log(err))
    }

    // reviews 
    const reviewSubmit = async (data) => {
        console.log("review:", data.review);

        const reviewInfo = {
            meal_id: meal._id,
            name: user.displayName,
            image: user.photoURL,
            email: user.email,
            review: data.review,
        }

        await axiosSecure.post("/review", reviewInfo)
            .then(async res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    reset();

                    await axiosSecure.patch(`/meal/review/${id}`)
                        .then(res => {
                            console.log(res.data);
                        })

                }
            })
    };


    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', meal._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews/${meal._id}`);
            return res.data;
        }
    });


    // Like 
    const [bgLike, setBgLike] = useState("black");
    const [mood, setMood] = useState(false);

    const handleLike = async () => {
        await axiosSecure.patch(`/meal/like/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    setBgLike("red");
                    setMood(true);
                }
            })
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-xl rounded-none">
                <figure className=" rounded-none p-10"><img className="" src={meal.image} alt="meal.img" /></figure>
                <div className="card-body">
                    <div className=" flex justify-between">
                        <div className="card-title text-3xl">
                            {meal.title}
                            <div className="badge badge-outline bg-orange-500 p-3">{meal.rating}*</div>
                            <div className="badge badge-outline p-3">${meal.price}</div>
                            <div className="badge badge-outline badge-secondary p-3">Likes:{meal.like}</div>
                        </div>
                        <div className="card-actions justify-end">

                            <button onClick={() => handleLike()} className=" text-3xl" disabled={mood}>
                                <FaHeart
                                    style={{ color: `${bgLike}` }}
                                ></FaHeart>
                            </button>

                        </div>
                    </div>

                    <div className=" space-y-2">
                        <p><strong>Ingredients: </strong>{meal.ingredients}</p>
                        <p><strong>Meal Description: </strong>{meal.description}</p>
                        <div className=" md:flex justify-between">
                            <div className="flex gap-5 border border-black p-3 ">
                                <p><strong>Distributor: </strong>{meal.distributor_name}</p>
                                <p><strong>Post Time: </strong>{meal.time}</p>
                            </div>

                            <button onClick={() => handleRequest()} className=" mr-24 btn rounded-none hover:bg-green-600 border border-black">Meal request</button>
                        </div>
                    </div>

                    <div className=" my-5">
                        <form className=" flex gap-5 items-end" onSubmit={handleSubmit(reviewSubmit)}>
                            <div className=" form-control w-full">
                                <textarea type="text" {...register("review", { required: true })} placeholder="Share your review here..." className=" textarea rounded-none border-2 border-black mb-1" />
                            </div>
                            <div>
                                <button className="border border-black p-2 hover:bg-gray-400">Review</button>
                            </div>
                        </form>
                    </div>

                </div>


                {/* reviews  */}
                <div className=" bg-gray-400">
                    <div>
                        <h2 className=" text-2xl text-center font-bold p-2">ALL REVIEWS</h2>
                    </div>
                    {
                        reviews.map(item => <div key={item._id}>
                            <div className="chat chat-start mx-5">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="" src={item.image} />
                                    </div>
                                </div>
                                <div className="chat-bubble">{item.review}</div>
                            </div>
                        </div>)
                    }
                </div>

            </div>
        </div >
    );
};

export default MealDetails;