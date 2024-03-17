import { Link } from "react-router-dom";

const MealCart = ({ item }) => {
    return (
        <div>
            <div className="card glass rounded-none">
                <figure><img src={item.image} alt="meal" /></figure>
                <div className="card-body pl-2 pr-0 py-0">
                    <div className=" flex justify-between">
                        <p className="card-title ">{item.title}</p>
                        <p className=" text-center text-orange-600 bg-black">{item.rating}*</p>
                    </div>

                    <p className=" font-bold">${item.price}</p>

                    <div className="card-actions justify-end">
                        <Link to={'/detai/${item._id}'}>
                            <button className=" btn rounded-none hover:bg-slate-400">Details</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCart;