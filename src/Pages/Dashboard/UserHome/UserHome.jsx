import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: client = [] } = useQuery({
        queryKey: ['user', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            return res.data;
        }
    });

    return (
        <div className=" text-center bg-yellow-50 border-r-2 border-black items-center py-20 min-h-screen">
            <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt="" />
                </div>
            </div>
            <h3 className=" font-bold">{user?.displayName}</h3>

            <div className="">
                <h1 className=" font-semibold">Email: {user.email}</h1>
                {
                    client.membership === "Silver" ?
                        <h1 className=" font-semibold badge badge-neutral">Badge: {client.membership}</h1>
                        :
                        <>
                            {client.membership === "Gold" ?
                                <h1 className=" font-semibold badge badge-warning">Badge: {client.membership}</h1>
                                :
                                <h1 className=" font-semibold badge badge-secondary">Badge: {client.membership}</h1>}
                        </>
                }
            </div>
        </div>
    );
};

export default UserHome;