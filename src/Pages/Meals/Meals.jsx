import { Helmet } from "react-helmet-async";
import useMeals from "../../hooks/useMeals";
import MealCart from "../../Components/MealCart/MealCart";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Meals = () => {
    const [meals] = useMeals();
    const { register, handleSubmit, reset } = useForm();
    const [searchedItem, setSearchedItem] = useState([])

    // filter 
    const filterSubmit = (data) => {
        console.log(data);
        const filteredCategory = data.categoy;
        const filteredPrice = data.priceRange;//need to update

        const filtered = meals.filter(meal => meal?.category.toLowerCase().includes(filteredCategory.toLowerCase()));
        setSearchedItem(filtered);
    }

    // search 
    const handleSearch = (e) => {
        e.preventDefault();
        const searchTitle = e.target.search.value;
        console.log(searchTitle);

        const searched = meals.filter(meal => meal?.title.toLowerCase().includes(searchTitle.toLowerCase()));
        setSearchedItem(searched);
    }

    return (
        <div>
            <Helmet>
                <title>
                    HostelMeals | Meals
                </title>
            </Helmet>

            <div className="md:flex justify-around mt-12 mx-12 items-center gap-32">
                {/* search  */}
                <form onSubmit={handleSearch} className=" flex-1">
                    <div className=" form-control w-full bg-blue-800">
                        <label className=" input input-bordered flex items-center gap-2 px-0 rounded-none">
                            <input type="text" name="search" className="grow pl-2" placeholder=" Search with Title" />

                            <button type="submit" className=" bg-gray-300 h-full px-5">
                                <FaSearch className=" mt-2"></FaSearch>
                            </button>
                        </label>
                    </div>
                </form>

                {/* filter  */}
                <form className=" flex gap-3 border-2 border-black p-4" onSubmit={handleSubmit(filterSubmit)}>
                    <div className=" flex gap-2">

                        <div className=" form-control">
                            <select defaultValue="default" {...register('categoy')}
                                className="select select-bordered w-full rounded-none">
                                <option disabled value="default">Category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>

                        <div className=" form-control">
                            <select defaultValue="default" {...register('priceRange')}
                                className="select select-bordered w-full rounded-none">
                                <option disabled value="default">Price Range</option>
                                <option value="low">Low to High</option>
                                <option value="high">High to Low</option>
                            </select>
                        </div>

                    </div>

                    <button className="border border-black px-2 hover:bg-gray-400">Filter</button>
                </form>

            </div>


                <div className=" grid grid-cols-2 md:grid-cols-3 gap-12 mx-12 my-24">
                    {
                        searchedItem.length > 0 ?
                            searchedItem.map(item => <MealCart
                                key={item._id}
                                item={item}
                            ></MealCart>)
                            :
                            meals.map(item => <MealCart
                                key={item._id}
                                item={item}
                            ></MealCart>)
                    }
                </div>


        </div>
    );
};

export default Meals;