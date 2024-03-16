import { Helmet } from "react-helmet-async";

const Meals = () => {
    return (
        <div>
            <Helmet>
                <title>
                    HostelMeals | Meals
                </title>
            </Helmet>
            <p>all meals are here with category and search option</p>
        </div>
    );
};

export default Meals;