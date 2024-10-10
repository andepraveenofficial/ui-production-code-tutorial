// Login.tsx
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth(); // Get auth state and login method

  // Check if the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to Home if already logged in
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    const token = "jwtTokenCode"; // Example JWT token
    // Set the token to expire in 1 hour (1 hour = 1/24th of a day)
    Cookies.set("jwtToken", token, { expires: 1 / 24 });

    login(); // Call login from context
    navigate("/"); // Redirect to Home after logging in
  };

  return (
    <div>
      <h2>I am Login Component</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
