import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "meals",
                element: <PrivateRoute><Meals></Meals></PrivateRoute>
            },
            {
                path: "logIn",
                element: <LogIn></LogIn>
            },
            {
                path: "signUp",
                element: <SignUp></SignUp>
            }
        ]
    },
]);

export default router;
