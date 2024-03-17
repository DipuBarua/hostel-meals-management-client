import { Link } from "react-router-dom";
import img from "../../../assets/food.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';

const MemberShip = () => {

    AOS.init();

    return (
        <div className=" mb-24">
            <div className=" bg-black p-12 text-center">
                <h2 className=" text-white text-5xl font-semibold">SUBSCRIVE</h2>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 mx-10 ">
                {/* silver  */}


                <div data-aos="fade-up"
                    data-aos-duration="3000">
                    <Link>
                        <div className="card bg-base-100 shadow-xl image-full rounded-none ">
                            <figure><img src={img} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-3xl">Silver</h2>
                                <p>Buy this Silver cart to get better service</p>
                                <p>Your Subscription valid for <span className=" text-xl font-bold">1 Month</span></p>
                                <div className=" border-2 rounded border-white text-center p-2">
                                    <p>$20/Month</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>


                {/* gold  */}
                <div data-aos="fade-up" data-aos-duration="6000">
                    <Link>
                        <div className="card bg-base-100 shadow-xl image-full rounded-none ">
                            <figure><img src={img} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-3xl">Gold</h2>
                                <p>Buy this gold cart to get better service</p>
                                <p>Your Subscription valid for <span className=" text-xl font-bold">1 Month</span></p>
                                <div className=" border-2 rounded border-white text-center p-2">
                                    <p>$30/Month</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>


                {/* platinum  */}
                <div data-aos="fade-up" data-aos-duration="3000">
                    <Link>
                        <div className="card bg-base-100 shadow-xl image-full rounded-none ">
                            <figure><img src={img} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-3xl">Platinum</h2>
                                <p>Buy this platinum cart to get better service</p>
                                <p>Your Subscription valid for <span className=" text-xl font-bold">1 Month</span></p>
                                <div className=" border-2 rounded border-white text-center p-2">
                                    <p>$40/Month</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default MemberShip;