import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const [isAdmin, adminLoading] = useAdmin();
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading || adminLoading) {
        return <div className=" text-center py-36">
            <span className="loading loading-ball loading-lg"></span>
        </div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={'/logIn'} state={{ from: location }} replace></Navigate>

};

export default AdminRoute;