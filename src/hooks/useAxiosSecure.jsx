import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000/",
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem("access-jwt");
        console.log('token get', token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // respose for error 401,403 
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        const status = error.response.status;
        console.log("secure status:", status);
        if (status === 401 || status === 403) {
            await logOut();
            navigate("/logIn");
        }
        return Promise.reject(error);
    });



    return axiosSecure;

};
export default useAxiosSecure;


//Note:
// 1 >> create jwt api in server side
// 2 >> then post request from authProvider for token.[token will get when user logged In]
// 3 >> then set token to user's localstorage
// 4 >> create axios Secure and build authrization system for secureUser/admin[who loggedIn] with getting token from localstorage.
// 5 >> this token will be checked for authrization in jwt middleware.
// 6 >> build admin-user api using jwt middleware/req.decoded.email
// 7 >> then create admin route and apply this for dashboard admin routes.
// 7 >> Must use axiosSecure for data featching in useAdmin hook and all admin components.*****