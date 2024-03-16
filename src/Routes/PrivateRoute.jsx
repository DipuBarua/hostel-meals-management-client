import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location);
    if (loading) {
        return <div className=" text-center py-36">
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-xs"></span>
        </div>
    }
    if (user) {
        return children;
    }

    return <Navigate to={"/logIn"} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;