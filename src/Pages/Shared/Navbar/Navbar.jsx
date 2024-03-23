import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaPizzaSlice } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleSignOut = () => {
        logOut();
    }

    const navLinks = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'meals'}>Meals</Link></li>
        <li><Link to={'upcomingMeals'} className=" hover:bg-purple-400">
            <span className="badge badge-sm">{"99"}+</span>
            upcoming
            <FaPizzaSlice></FaPizzaSlice>
        </Link></li>

        {
            user ? <>
                <div className="dropdown dropdown-end z-20">
                    <div tabIndex={0} role="button" className="btn btn-circle p-2 ring-1">
                        <img src={user.photoURL} alt="user/img.." />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <p className=" text-center font-semibold underline pb-2">{user.displayName}</p>
                        <li><Link to={'dashboard'}>Dashboard</Link></li>
                        <li><Link onClick={handleSignOut}>LogOUt</Link></li>
                    </ul>
                </div>

            </> : <>
                <li><Link to={'logIn'}>Join Us</Link></li>
                <li><Link to={'signUp'}>sign up</Link></li>
            </>
        }
    </>
    console.log("user:", user);
    return (
        <div className="drawer z-20">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        Hostel Meals
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal gap-2 items-center">
                            {/* Navbar menu content here */}
                            {navLinks}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
            </div>
            <div className="drawer-side absolute z-10">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    {navLinks}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;