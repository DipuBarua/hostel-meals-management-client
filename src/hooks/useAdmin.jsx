import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useAdmin = () => {
    const axiosPublic = useAxiosPublic(); //secure
    const { user } = useAuth();

    const { data: isAdmin } = useQuery({
        queryKey: ['users/admin', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin];
};

export default useAdmin;