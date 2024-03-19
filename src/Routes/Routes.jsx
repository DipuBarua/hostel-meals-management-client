import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../Pages/Home/MealsCategory/MealDetails/MealDetails";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";


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
            },
            {
                path: "mealDetails/:id",
                element: <MealDetails></MealDetails>
            },
            {
                path: "upcomingMeals",
                element: <UpcomingMeals></UpcomingMeals>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin's routes 
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            // user's routes 
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            }
        ]
    }
]);

export default router;
