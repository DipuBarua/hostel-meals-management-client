import { useState } from "react";
import useMeals from "../../../../hooks/useMeals";
import 'react-tabs/style/react-tabs.css';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import MealCart from "../../../../Components/MealCart/MealCart";

const MealsCategory = () => {
    const [meals] = useMeals();
    const [tabIndex, setTabIndex] = useState(0);

    const breakfast = meals.filter(meal => meal.category === "breakfast")
    const lunch = meals.filter(meal => meal.category === "lunch")
    const dinner = meals.filter(meal => meal.category === "dinner")

    return (
        <div className=" mb-24 mx-10">

            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="text-center bg-slate-400 mb-10 pt-2">
                    <Tab>All Meals</Tab>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                </TabList>

                <TabPanel>
                    <div className=" grid grid-cols-2 md:grid-cols-4 gap-10">
                        {
                            meals.map(item => <MealCart key={item._id} item={item}></MealCart>)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className=" grid grid-cols-2 md:grid-cols-4 gap-10">
                        {
                            breakfast.map(item => <MealCart key={item._id} item={item}></MealCart>)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className=" grid grid-cols-2 md:grid-cols-4 gap-10">
                        {
                            lunch.map(item => <MealCart key={item._id} item={item}></MealCart>)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className=" grid grid-cols-2 md:grid-cols-4 gap-10">
                        {
                            dinner.map(item => <MealCart key={item._id} item={item}></MealCart>)
                        }
                    </div>
                </TabPanel>

            </Tabs>

        </div>
    );
};

export default MealsCategory;