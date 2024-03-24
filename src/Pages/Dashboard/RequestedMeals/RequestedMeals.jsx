import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import RequestsTable from "./RequestsTable";

const RequestedMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: reqMeals = [], refetch } = useQuery({
        queryKey: ["requested-meals", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-meals/${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>
                    HostelMeals | RequestedMeals
                </title>
            </Helmet>

            <div className=" flex justify-evenly mb-5 pt-5 bg-gray-300 text-black py-5 ml-10">
                <h2 className=" text-3xl font-bold">All Requested Meals</h2>
                <h2 className=" text-3xl font-bold">Total:{reqMeals.length} </h2>
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
                            <th>Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* For single row  */}
                        {
                            reqMeals.map((reqMeal, index) => <RequestsTable
                                index={index}
                                key={reqMeal._id}
                                item={reqMeal}
                                refetch={refetch}
                            ></RequestsTable>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default RequestedMeals;