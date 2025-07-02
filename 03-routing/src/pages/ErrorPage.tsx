import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css"; // Import CSS module

interface ErrorPageProps {
  error?: Error | null;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.errorPage}>
      <h1 className={styles.errorHeading}>Oops! Something went wrong.</h1>
      {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
      <button className={styles.button} onClick={handleGoBack}>
        Go Back
      </button>
      <button
        className={styles.button}
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorPage;
