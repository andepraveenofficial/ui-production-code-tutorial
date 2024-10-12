import React, { useState } from "react";
import axios from "axios";

export interface SignupDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      /*
        {
        "statusCode": 200,
        "message": "Successfully Registered User",
        "success": true,
        "data": {
            "id": "62f7ea7d-3ddf-4ced-9677-1e8b34076d13",
            "firstName": "Praveen",
            "lastName": "Ande",
            "email": "praveenande@example.com",
            "password": "$2b$10$SEqSF80aA4Phf072qYJ9DutcURJgZZa0KovvvkQUSxnz4BQ5YJ4dW",
            "roleId": "c1f8b534-cf5b-4d39-be98-6ce19aa3e6bf",
            "refreshToken": null,
            "createdAt": "2024-10-11T12:58:45.896Z",
            "updatedAt": "2024-10-11T12:58:45.896Z",
            "deletedAt": null
        }
                */

      const response = await axios.post<SignupDto>(
        "http://localhost:5000/api/v1/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
          roleId, // Check roleId in database
        }
      );

      setSuccess("Signup successful!");
      setError("");

      // Optionally reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRoleId("");
    } catch (error) {
      setError("Signup failed! Please try again.");
      setSuccess("");
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
      <div>
        <button type="submit">Sign Up</button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </form>
  );
};

export default SignupForm;
