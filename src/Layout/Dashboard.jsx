import { FaBookOpen, FaBookmark, FaEdit, FaHome, FaPenAlt, FaPizzaSlice, FaRunning, FaUser, FaUserAlt } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    console.log('admin', isAdmin);
    return (
        <div className="md:flex">

            <div className=" md:w-1/5 min-h-screen text-white bg-slate-500">
                <h2 className="menu-title text-xl font-semibold bg-slate-300">HOSTEL MEALS</h2>

                <ul className="menu w-full p-0 [&_li>*]:rounded-none [&_li>*]:py-4 [&_li>*]:font-semibold">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to={"adminHome"}>
                                        <FaUserAlt></FaUserAlt>
                                        Admin
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={"manageUsers"}>
                                        <FaEdit></FaEdit>
                                        Manage Users
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={"addMeal"}>
                                        <FaPenAlt></FaPenAlt>
                                        Add Meal
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={"allMeals"}>
                                        <FaBookOpen></FaBookOpen>
                                        All Meals
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={"allReviews"}>
                                        <FaBookmark></FaBookmark>
                                        All Reviews
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={"serveMeals"}>
                                        <FaRunning></FaRunning>
                                        Serve Meals
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={"upcomingMeals"}>
                                        <FaPizzaSlice></FaPizzaSlice>
                                        Upcoming Meals
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to={"userHome"}>
                                        <FaUser></FaUser>
                                        User
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={"requestedMeals"}>
                                        <FaBookOpen></FaBookOpen>
                                        Requested Meals
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={"myReviews"}>
                                        <FaBookmark></FaBookmark>
                                        My Reviews
                                    </NavLink>
                                </li>
                            </>
                    }

                    <div className=" divider p-2"></div>
                    <li>
                        <NavLink to={"/"}><FaHome></FaHome>Home</NavLink>
                    </li>

                </ul>
            </div>


            {/* components */}
            <div className="md:flex-1">
                <Outlet></Outlet>
            </div>


        </div>
    );
};

export default Dashboard;