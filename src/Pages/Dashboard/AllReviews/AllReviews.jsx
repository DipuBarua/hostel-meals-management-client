import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllReviewsTable from "./AllReviewsTable";

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>HostelMeals | AllReviews</title>
            </Helmet>

            <div className=" flex justify-evenly mb-5 pt-5 bg-gray-300 text-black py-5 ml-10">
                <h2 className=" text-3xl font-bold">All Reviews</h2>
                <h2 className=" text-3xl font-bold">Total:{AllReviews.length} </h2>
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
                            <th> Delete</th>
                            <th>View_Meal</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* For single row  */}
                        {
                            reviews.map((review, index) => <AllReviewsTable
                                index={index}
                                key={review._id}
                                item={review}
                                refetch={refetch}
                            ></AllReviewsTable>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllReviews;