import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return user ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;