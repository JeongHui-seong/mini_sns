import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";

export const RouteWrapper = ({ children, requireAuth }) => {
    const { user } = useContext(AuthContext);

    if (requireAuth && !user) {
        return <Navigate to="/login" replace />;
    }

    if (!requireAuth && user) {
        return <Navigate to="/" replace />;
    }

    return children;
}