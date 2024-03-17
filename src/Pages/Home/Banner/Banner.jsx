import img from "../../../assets/food.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { FaSearch } from "react-icons/fa";

const Banner = () => {
    return (
        <div>
            <div className=" absolute z-10 left-1/3 top-1/2 w-1/2 mx-auto">
                <h2 className=" text-5xl font-bold text-white shadow-black">Hostel Meals Management</h2>
                <p className=" text-white text-sm">hostel meals play a crucial role in fostering a sense of community, providing nourishment, and enhancing the overall hostel experience for residents. Whether it is a simple breakfast shared with newfound friends or a festive dinner celebrating cultural diversity, hostel meals bring people together in a shared space of warmth and camaraderie.</p>

                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />

                    <button className=" bg-gray-300 h-full px-5">
                        <FaSearch className=" mt-2"></FaSearch>
                    </button>
                </label>
            </div>

            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper max-h-screen"
            >
                <SwiperSlide>
                    <img className=" container" src={img} alt="" />
                </SwiperSlide>

                <SwiperSlide>
                    <img className=" container" src={img} alt="" />
                </SwiperSlide>

                <SwiperSlide>
                    <img className=" container" src={img} alt="" />
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Banner;