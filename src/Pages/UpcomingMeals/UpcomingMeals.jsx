import { Helmet } from "react-helmet-async";
import useUpcomingMeals from "../../hooks/useUpcomingMeals";
import UpcomingCart from "../../Components/UpcomingCart/UpcomingCart";

const UpcomingMeals = () => {
    const [upcomingMeals] = useUpcomingMeals();
    return (
        <div>
            <Helmet>
                <title>
                    HostelMeals | UpcomingMeals
                </title>
            </Helmet>

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-12 m-12">
                {
                    upcomingMeals.map(upcomingMeal => <UpcomingCart
                        key={upcomingMeal._id}
                        item={upcomingMeal}
                    ></UpcomingCart>)
                }
            </div>
        </div>
    );
};

export default UpcomingMeals;