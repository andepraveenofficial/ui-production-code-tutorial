import React, { useState } from "react";
import { Api, ContentType } from "./../api/myApi"; // Adjust this import based on your generated OpenAPI client

interface SignupDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
}

interface SignupResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

const SignupForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    const signupData: SignupDto = {
      firstName,
      lastName,
      email,
      password,
      roleId,
    };

    try {
      const apiClient = new Api({
        baseUrl: "http://localhost:5000", // Ensure this matches your backend URL
      });

      const response = await apiClient.api.v1AuthSignupCreate({
        body: signupData,
        type: ContentType.Json,
      });

      if (response && response.data) {
        const signupResponse = response.data as SignupResponse;

        if (signupResponse.success) {
          setSuccess(signupResponse.message);
          // Reset form fields
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setRoleId("");
        } else {
          setError(
            signupResponse.message || "Signup failed! Please try again."
          );
        }
      } else {
        console.error("Unexpected response structure:", response);
        setError("Received an unexpected response from the server.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.response) {
        console.error("Error response:", error.response);
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      setError(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Role ID:</label>
        <input
          type="text"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </form>
  );
};

export default SignupForm;
