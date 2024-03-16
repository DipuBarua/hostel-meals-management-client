import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";


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
                element: <Meals></Meals>
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
