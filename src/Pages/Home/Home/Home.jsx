import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import MealsCategory from "../MealsCategory/MealsCategory/MealsCategory";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                    HostelMeals | Home
                </title>
            </Helmet>

            <Banner></Banner>
            <MealsCategory></MealsCategory>

        </div>
    );
};

export default Home;