import { Helmet } from "react-helmet-async";
import ServeTable from "./ServeTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allRequests = [], refetch } = useQuery({
        queryKey: ["requested-meals"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-meals`)
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>
                    HostelMeals | ServeMeals
                </title>
            </Helmet>

            <div className=" flex justify-evenly mb-5 pt-5 bg-gray-300 text-black py-5 ml-10">
                <h2 className=" text-3xl font-bold">Serve Meals</h2>
                <h2 className=" text-3xl font-bold">Total:{allRequests.length} </h2>
            </div>

            <div className="overflow-x-auto pl-8 pt-5">
                <table className="table table-xs table-pin-rows table-pin-cols table-zebra w-full">
                    {/* heading */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Meal_Title</th>
                            <th>Requester_Email</th>
                            <th>Requester_Name</th>
                            <th>Status</th>
                            <th>Serve</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* For single row  */}
                        {
                            allRequests.map((request, index) => <ServeTable
                                index={index}
                                key={request._id}
                                item={request}
                                refetch={refetch}
                            ></ServeTable>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ServeMeals;