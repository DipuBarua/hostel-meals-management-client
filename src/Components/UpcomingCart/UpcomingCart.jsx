import { FaLeaf } from "react-icons/fa";

const UpcomingCart = ({ item }) => {
    return (
        <div>
            <div className="card glass rounded-none">
                <figure><img src={item.image} alt="meal" /></figure>


                <div className="relative left-1/2 -top-44 bg-gray-700 bg-opacity-40 py-4 w-1/2">
                    <div className=" text-xl font-semibold text-white text-opacity-50 flex justify-center gap-1">
                        <span>Coming SOOn </span>
                        <FaLeaf className=" text-green-500"></FaLeaf>
                    </div>
                </div>

                <div className=" flex justify-around px-4 pb-10">
                    <div className="card-title flex-1">{item.title}</div>
                    <p className=" font-bold">${item.price}</p>
                </div>

            </div>
        </div>
    );
};

export default UpcomingCart;