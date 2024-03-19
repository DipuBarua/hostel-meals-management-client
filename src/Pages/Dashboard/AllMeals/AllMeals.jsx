import { Helmet } from "react-helmet-async";
import useMeals from "../../../hooks/useMeals";
import AllMealsTable from "./AllMealsTable";

const AllMeals = () => {
    const [meals, refetch] = useMeals();

    return (
        <div>
            <Helmet>
                <title>
                    HostelMeals | AllMeals
                </title>
            </Helmet>

            <div className=" flex justify-evenly mb-5 pt-5 bg-gray-300 text-black py-5 ml-10">
                <h2 className=" text-3xl font-bold">All Meals</h2>
                <h2 className=" text-3xl font-bold">Total:{meals.length} </h2>
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
                            <th>Distributor_Name</th>
                            <th>Distributor_Email</th>
                            <th>Update</th>
                            <th> Delete</th>
                            <th>View_Meal</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* For single row  */}
                        {
                            meals.map((meal, index) => <AllMealsTable
                                index={index}
                                key={meal._id}
                                item={meal}
                                refetch={refetch}
                            ></AllMealsTable>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllMeals;