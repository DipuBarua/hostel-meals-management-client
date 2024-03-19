import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
    const { user } = useAuth();
    return (

        <div className=" text-center bg-yellow-50 border-r-2 border-black items-center py-32 min-h-screen">
            <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt="" />
                </div>
            </div>
            <h3 className=" font-bold">{user?.displayName}</h3>

            <div className="  ">
            <h1 className=" font-semibold">{user.email}</h1>
            <h1 className=" font-semibold">Number of Added Meals : {''}</h1>
            </div>
        </div>

    );
};

export default AdminHome;