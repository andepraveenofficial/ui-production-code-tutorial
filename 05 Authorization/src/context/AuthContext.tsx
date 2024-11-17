import React, { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

// Define types for user roles and permissions
export type UserRole = "admin" | "user" | "guest";

interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	permissions: string[];
}

interface AuthContextType {
	isLoggedIn: boolean;
	user: User | null;
	login: (userData: User) => void;
	logout: () => void;
	hasPermission: (permission: string) => boolean;
	hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// Initialize state from cookies if available
	const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("jwtToken"));
	const [user, setUser] = useState<User | null>(() => {
		const userData = Cookies.get("userData");
		return userData ? JSON.parse(userData) : null;
	});

	const login = (userData: User) => {
		setIsLoggedIn(true);
		setUser(userData);
		// Store user data in cookie
		Cookies.set("userData", JSON.stringify(userData), { expires: 1 / 24 });
	};

	const logout = () => {
		Cookies.remove("jwtToken");
		Cookies.remove("userData");
		setIsLoggedIn(false);
		setUser(null);
	};

	const hasPermission = (permission: string): boolean => {
		return user?.permissions?.includes(permission) || false;
	};

	const hasRole = (role: UserRole): boolean => {
		return user?.role === role;
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				user,
				login,
				logout,
				hasPermission,
				hasRole,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
