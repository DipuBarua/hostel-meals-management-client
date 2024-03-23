import { Link } from "react-router-dom";

const MealCart = ({ item }) => {
    return (
        <div>
            <div className="card glass rounded-none">
                <figure><img src={item.image} alt="meal" /></figure>
                <div className="card-body pl-2 pr-0 py-0">
                    <div className=" flex justify-between relative">
                        <div className="card-title ">{item.title}</div>
                        <div className=" relative right-0 top-0 text-center text-orange-500 ">
                            <span className=" px-5 bg-black">
                                {item.rating}*
                            </span>
                        </div>
                    </div>

                    <p className=" font-bold">${item.price}</p>

                    <div className="card-actions justify-end">
                        <Link to={`/mealDetails/${item._id}`}>
                            <button className=" btn rounded-none hover:bg-slate-400">Details</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCart;