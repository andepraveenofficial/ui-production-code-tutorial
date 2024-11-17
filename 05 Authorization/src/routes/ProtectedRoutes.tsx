import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserRole } from "../context/AuthContext";
import Unauthorized from "../pages/Unauthorized";

interface ProtectedRouteProps {
	allowedRoles?: UserRole[];
	requiredPermissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	allowedRoles = [],
	requiredPermissions = [],
}) => {
	const { isLoggedIn, hasRole, hasPermission } = useAuth();

	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	// Check if user has any of the allowed roles
	const hasAllowedRole =
		allowedRoles.length === 0 || allowedRoles.some((role) => hasRole(role));

	// Check if user has all required permissions
	const hasRequiredPermissions =
		requiredPermissions.length === 0 ||
		requiredPermissions.every((permission) => hasPermission(permission));

	if (!hasAllowedRole || !hasRequiredPermissions) {
		return <Unauthorized />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
