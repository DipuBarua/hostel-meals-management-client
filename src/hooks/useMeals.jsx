import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useEffect, useState } from "react";

const useMeals = () => {
    // const axiosPublic = useAxiosPublic();

    // const { data: meals = [], refetch } = useQuery({
    //     queryKey: ['meals'],
    //     queryFn: async () => {
    //         const result = await axiosPublic.get("/meals");
    //         return result.data;
    //     }
    // })
    // console.log("meals:", meals);


    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/meals')
            .then(res => res.json())
            .then(data => {
                setMeals(data);
            })
    }, [])


    return [meals];
};

export default useMeals;