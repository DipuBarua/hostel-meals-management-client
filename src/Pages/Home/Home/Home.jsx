import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import MealsCategory from "../MealsCategory/MealsCategory/MealsCategory";
import MemberShip from "../MemberShip/MemberShip";

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
            <MemberShip></MemberShip>

        </div>
    );
};

export default Home;