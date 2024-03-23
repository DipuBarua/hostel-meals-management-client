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
import AdminRoute from "./AdminRoute";
import AddMeal from "../Pages/Dashboard/AddMeal/AddMeal";
import AllMeals from "../Pages/Dashboard/AllMeals/AllMeals";
import UpdateMeal from "../Components/UpdateMeal/UpdateMeal";


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
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "addMeal",
                element: <AdminRoute><AddMeal></AddMeal></AdminRoute>
            },
            {
                path: "allMeals",
                element: <AdminRoute><AllMeals></AllMeals></AdminRoute>
            },
            {
                path: "updateMeal/:id",
                element: <AdminRoute><UpdateMeal></UpdateMeal></AdminRoute>,
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
