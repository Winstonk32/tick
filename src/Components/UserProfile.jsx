import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase"; // Import the Firebase auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Fixed import statement

function UserProfile() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User  logged in:", email);
      } else {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User  signed up:", email);
      }
      // Navigate based on role
      if (formValues.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Invalid user"); // Show error message
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg"
      >
        <div className="relative mb-6">
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-500"
            required
          />
          <label className="absolute left-0 top-0 text-gray-500 transform -translate-y-4 scale-75 transition-all peer-focus:text-indigo-500 peer-focus:-translate-y-4 peer-focus:scale-75 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100">
            Username
          </label>
        </div>
        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-500"
            required
          />
          <label className="absolute left-0 top-0 text-gray-500 transform -translate-y-4 scale-75 transition-all peer-focus:text-indigo-500 peer-focus:-translate-y-4 peer-focus:scale-75 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100">
            Email
          </label>
        </div>
        <div className="relative mb-6">
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-500"
            required
          />
          <label className="absolute left-0 top-0 text-gray-500 transform -translate-y-4 scale-75 transition-all peer-focus:text-indigo-500 peer-focus:-translate-y-4 peer-focus:scale-75 peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100">
            Password
          </label>
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-gray-600">Role</label>
          <select
            name="role"
            value={formValues.role}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-500"
            required
          >
            <option value="user">User </option>
            <option value="admin">Admin</option>
          </select>
        </div>
         
          <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-all"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 w-full text-indigo-500 hover:underline"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
}

export default UserProfile;