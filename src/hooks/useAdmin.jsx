import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: isAdmin, isPending: adminLoading } = useQuery({
        queryKey: ['users/admin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        }
    })
    console.log("isAdmin hook", isAdmin);
    return [isAdmin, adminLoading];
};

export default useAdmin;