import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUpcomingMeals = () => {
    const axiosPublic = useAxiosPublic();

    const { data: upcomingMeals = [], refetch } = useQuery({
        queryKey: ['upcoming-meals'],
        queryFn: async () => {
            const result = await axiosPublic.get("/upcoming-meals")
            return result.data;
        }
    })

    return [upcomingMeals, refetch]
};

export default useUpcomingMeals;