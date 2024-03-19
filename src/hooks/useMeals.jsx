import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = () => {
    const axiosPublic = useAxiosPublic();

    const { data: meals = [], refetch } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const result = await axiosPublic.get("/meals");
            return result.data;
        }
    })
    console.log("meals:", meals);

    return [meals, refetch];
};

export default useMeals;