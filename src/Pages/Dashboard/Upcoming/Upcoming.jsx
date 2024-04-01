import { Helmet } from "react-helmet-async";
import useUpcomingMeals from "../../../hooks/useUpcomingMeals";
import UpcomingTable from "./UpcomingTable";

const Upcoming = () => {
    const [upcomingMeals, refetch] = useUpcomingMeals();

    return (
        <div>
            <Helmet>
                <title>
                    HostelMeals | AllMeals
                </title>
            </Helmet>

            <div className=" flex justify-evenly mb-5 pt-5 bg-gray-300 text-black py-5 ml-10">
                <h2 className=" text-3xl font-bold">Upcoming Meals</h2>
                <h2 className=" text-3xl font-bold">Total:{upcomingMeals.length} </h2>
            </div>

            <div className="overflow-x-auto pl-8 pt-5">
                <table className="table table-xs table-pin-rows table-pin-cols table-zebra w-full">
                    {/* heading */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Image</th>
                            <th>Meal_Title</th>
                            <th>Category</th>
                            <th>Likes_Count</th>
                            <th> Delete</th>
                            <th>Publish</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* For single row  */}
                        {
                            upcomingMeals.map((upcomingMeal, index) => <UpcomingTable
                                index={index}
                                key={upcomingMeal._id}
                                item={upcomingMeal}
                                refetch={refetch}
                            ></UpcomingTable>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Upcoming;