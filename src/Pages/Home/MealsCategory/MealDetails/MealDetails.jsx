import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHeart } from "react-icons/fa";

const MealDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm()

    const { data: meal = [] } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meal/${id}`);
            return res.data;
        }
    })
    console.log("meal details", meal);

    const reviewSubmit = (data) => {
        console.log("review:", data);
        reset();
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure className=" rounded-none p-10"><img className="" src={meal.image} alt="meal.img" /></figure>
                <div className="card-body">
                    <div className=" flex justify-between">
                        <div className="card-title text-3xl">
                            {meal.title}
                            <div className="badge badge-outline bg-orange-500 p-3">{meal.rating}*</div>
                            <div className="badge badge-outline p-3">${meal.price}</div>
                            <div className="badge badge-outline badge-secondary p-3">Likes: {meal.like}</div>
                        </div>
                        <div className="card-actions justify-end">
                            {
                                meal.like === 0 ?
                                    <button onClick={""} className=" text-3xl">
                                        <FaHeart className=" "></FaHeart>
                                    </button>
                                    :
                                    <button className=" text-3xl">
                                        <FaHeart className=" text-red-600"></FaHeart>
                                    </button>
                            }
                        </div>
                    </div>

                    <div>
                        <p><strong>Ingredients: </strong>{meal.ingredients}</p>
                        <p><strong>Meal Description: </strong>{meal.description}</p>
                        <div className=" flex border border-black p-1 ">
                            <p><strong>Distributor: </strong>{meal.distributor_name}</p>
                            <p><strong>Post Time: </strong>{meal.time}</p>
                        </div>
                    </div>

                    <div className=" md:flex justify-between">

                        <button className=" mr-24 btn rounded-none hover:bg-green-600 border border-black">Meal request</button>


                        <form className=" ml-24 flex-1" onSubmit={handleSubmit(reviewSubmit)}>
                            <div className=" form-control w-full">
                                <textarea type="text" {...register("review", { required: true })} placeholder="Share your review here..." className=" textarea rounded-none border-2 border-black mb-1" />
                            </div>
                            <button className="border border-black p-1 hover:bg-gray-400">Review</button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default MealDetails;