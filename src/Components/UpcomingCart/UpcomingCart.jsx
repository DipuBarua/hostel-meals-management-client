import { FaLeaf, FaRegThumbsUp } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const UpcomingCart = ({ item }) => {
    const axiosSecure = useAxiosSecure();
    const [mood, setMood] = useState(false);
    const [bgLike, setBgLike] = useState("");

    const handleLike = async (id) => {
        await axiosSecure.patch(`/upcoming-meals/like/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    setMood(true);
                    setBgLike("white");
                }
            })
    }

    return (
        <div>
            <div className="card glass rounded-none">
                <figure>
                    <img src={item.image} alt="meal" />
                </figure>

                <button
                    onClick={() => handleLike(item._id)}
                    disabled={mood}
                    className="text-4xl text-black relative -top-12 left-1">
                    <FaRegThumbsUp
                        style={{ background: `${bgLike}` }}
                        className="absolute bg-gray-500 bg-opacity-30 hover:text-green-500 rounded-full p-1">
                    </FaRegThumbsUp>
                </button>


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