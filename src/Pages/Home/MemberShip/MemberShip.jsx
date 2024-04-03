import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import MemberShipCart from './MemberShipCart';



const MemberShip = () => {
    const axiosPublic = useAxiosPublic();

    const { data: packages = [] } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axiosPublic.get("/packages")
            return res.data;
        }
    })

    AOS.init();

    return (
        <div className=" mb-24">
            <div className=" bg-black p-12 text-center">
                <h2 className=" text-white text-5xl font-semibold">SUBSCRIVE</h2>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 mx-10 ">
                {/* silver  */}

                {
                    packages.map(item => <MemberShipCart
                        key={item._id}
                        item={item}>
                    </MemberShipCart>)
                }

            </div>

        </div>
    );
};

export default MemberShip;