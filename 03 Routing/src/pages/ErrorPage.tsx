import React from "react";
import { useNavigate } from "react-router-dom"; // Updated for React Router v6
import "./ErrorPage.css"; // Import your CSS file if you have one

interface ErrorPageProps {
  error?: Error | null; // Optional error object
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  const navigate = useNavigate(); // Use the navigate hook

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      {error && <p>Error: {error.message}</p>}{" "}
      {/* Display error message if available */}
      <button onClick={handleGoBack}>Go Back</button>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  );
};

export default ErrorPage;
