import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateMeal = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { data: meal = [] } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const result = await axiosSecure.get(`/meal/${id}`)
            return result.data
        }
    })

    const handleUpdateMeal = async (data) => {
        console.log(data);


        const updateInfo = {
            title: data.title,
            image: data.image,
            rating: parseFloat(data.rating),
            price: parseFloat(data.price),
            category: data.category,
            ingredients: data.ingredients,
            description: data.description,
            distributor_name: data.distributor_name,
            distributor_email: data.distributor_email
        }

        await axiosSecure.patch(`/meal/${id}`, updateInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Meal has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => console.log("update:", err))

    }

    return (
        <div>
            <Helmet>
                <title>
                    HostelMeal | UpdateMeal
                </title>
            </Helmet>

            {/* hook form  */}

            <div className="w-4/5 mx-auto shadow-2xl shadow-blue-200 bg-white mb-10">

                <h2 className=" pt-24 text-4xl font-bold text-center">ADD MEAL </h2>

                <form onSubmit={handleSubmit(handleUpdateMeal)} className=" card-body">

                    <div className=" flex justify-center items-center">
                        {/* Rating */}
                        <div className="rating">
                            <input
                                type="radio"
                                name="rating-2"
                                value={1}
                                {...register("rating")}
                                className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                value={2}
                                {...register("rating")}
                                className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                value={3}
                                {...register("rating")}
                                checked
                                className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                value={4}
                                {...register("rating")}
                                className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                value={5}
                                {...register("rating")}
                                className="mask mask-star-2 bg-orange-400" />
                        </div>
                    </div>


                    <div className=" md:flex gap-10 w-full">

                        <div className=" flex-1 space-y-2">
                            {/* Title  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    defaultValue={meal.title}
                                    type="text" {...register("title", { required: true })}
                                    placeholder="Title"
                                    className="input input-bordered"
                                />
                            </div>

                            {/* category  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    defaultValue={`${meal.category}`}
                                    {...register("category", { required: true })}
                                    className=" p-2">
                                    <option disabled value="default">change the category</option>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                </select>
                            </div>

                            {/* Image  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <input
                                    defaultValue={meal.image}
                                    type="url" {...register("image", { required: true })}
                                    className=" input input-bordered"
                                />
                                {/* <input type="file" {...register("image", { required: true })} className=" file-input" required /> */}
                            </div>

                            {/* Ingredients  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Ingredients</span>
                                </label>
                                <input
                                    defaultValue={meal.ingredients}
                                    type="text" {...register("ingredients", { required: true })}
                                    placeholder="chicken,beef,onion,salt,water,chilli,,,etc."
                                    className="input input-bordered"
                                />
                            </div>

                        </div>

                        <div className="flex-1 space-y-2">

                            {/* Price  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price $</span>
                                </label>
                                <input
                                    defaultValue={meal.price}
                                    type="text"
                                    {...register("price", { required: true })} placeholder="$$"
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Admin/distributor Name  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Distributor Name</span>
                                </label>
                                <input defaultValue={meal.distributor_name}
                                    type="text" {...register("distributor_name", { required: true })}
                                    placeholder="Distributor Name"
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Admin/distributor Email  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Distributor Email</span>
                                </label>
                                <input defaultValue={meal.distributor_email}
                                    type="email" {...register("distributor_email", { required: true })}
                                    placeholder="Distributor Email"
                                    className="input input-bordered"
                                />
                            </div>

                            {/* description  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    defaultValue={meal.description}
                                    type="text" {...register("description", { required: true })}
                                    placeholder="Description"
                                    className="textarea textarea-bordered textarea-md w-full max-w-xl"
                                />
                            </div>

                        </div>

                    </div>

                    <div className="form-control mt-6 flex flex-row justify-around gap-12">
                        {/* <button onClick={} className="btn btn-info flex-1">Add to Upcoming</button> */}
                        <button className="btn btn-secondary flex-1">Add Meal</button>
                    </div>

                </form>
            </div>


        </div>
    );
};

export default UpdateMeal;