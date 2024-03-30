import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import MyReviewsTable from "./MyReviewsTable";

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    console.log("user", user.email);

    const { data: mealReview = [], refetch } = useQuery({
        queryKey: ["meal-reviews", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal-reviews/${user.email}`)
            return res.data;
        }
    })
    console.log('mealReviews:',mealReview);

    return (
        <div>
            <Helmet>
                <title>
                    HostelMeals | MyReviews
                </title>
            </Helmet>

            <div className=" flex justify-evenly mb-5 pt-5 bg-gray-300 text-black py-5 ml-10">
                <h2 className=" text-3xl font-bold">My Reviews</h2>
                <h2 className=" text-3xl font-bold">Total:{mealReview.length} </h2>
            </div>

            <div className="overflow-x-auto pl-8 pt-5">
                <table className="table table-xs table-pin-rows table-pin-cols table-zebra w-full">
                    {/* heading */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Meal_Title</th>
                            <th>Likes_Count</th>
                            <th>Reviews_Count</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* For single row  */}
                        {
                            mealReview.map((review, index) => <MyReviewsTable
                                index={index}
                                key={review._id}
                                item={review}
                                refetch={refetch}
                            ></MyReviewsTable>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyReviews;