import { Link } from "react-router-dom";

const MemberShipCart = ({ item }) => {
    return (
        <div>
            <div>
                <div data-aos="fade-up"
                    data-aos-duration="3000">
                    <Link to={"payment"}>
                        <div className="card bg-base-100 shadow-xl image-full rounded-none ">
                            <figure><img src={item.image} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-3xl">{item.package_name}</h2>
                                <p>Buy this {item.package_name} cart to get better service</p>
                                <p>Your Subscription valid for <span className=" text-xl font-bold">{item.duration_month} Month</span></p>
                                <div className=" border-2 rounded border-white text-center p-2">
                                    <p>${item.price}/Month</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MemberShipCart;