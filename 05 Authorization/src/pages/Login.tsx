import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const { isLoggedIn, login } = useAuth();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn, navigate]);

	const handleLogin = async () => {
		// Simulate API call to get user data
		const userData = {
			id: "1",
			name: "John Doe",
			email: "john@example.com",
			role: "user" as const,
			permissions: ["read:profile", "edit:profile"],
		};

		// Set JWT token
		const token = "your-jwt-token";
		Cookies.set("jwtToken", token, { expires: 1 / 24 });

		// Call login with user data
		login(userData);
		navigate("/");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="p-8 bg-white rounded shadow-md">
				<h2 className="mb-6 text-2xl font-bold text-center">I am Login</h2>
				<button
					onClick={handleLogin}
					className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default Login;
