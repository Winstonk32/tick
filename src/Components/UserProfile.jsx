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
  const [verificationCode, setVerificationCode] = useState(null);
  const [enteredCode, setEnteredCode] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
    sessionStorage.setItem("verificationCode", code); // Store it in session storage for demo
    alert(`Your verification code is: ${code}`); // In a real app, this would be sent via email
    return code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formValues;

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User  logged in:", email);

        if (role === "admin") {
          const code = generateVerificationCode();
          setVerificationCode(code);
          setVerificationStep(true); // Move to verification step
        } else {
          navigate("/homepage");
        }
      } else {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User  signed up:", email);
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Invalid user"); // Show error message
    }
  };

  const handleVerification = () => {
    const storedCode = sessionStorage.getItem("verificationCode"); // Retrieve stored code for validation

    if (enteredCode === storedCode) {
      alert("Verification successful!");
      sessionStorage.removeItem("verificationCode"); // Clear the code from session storage
      navigate("/dashboard"); // Redirect to admin dashboard
    } else {
      setErrorMessage("Incorrect verification code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#38a3a5]">
      {!verificationStep ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

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
              className="peer w-full               border-gray-300 p-2 outline-none focus:border-indigo-500"
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
              className="w-full border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-500 transition duration-200"
              required
            >
              <option value="user">User </option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 w-full text-indigo-600 hover:underline transition-all duration-200"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>

          <div className="flex flex-row text-center w-full mt-4">
            <div className="border-b-2 mb-2.5 mr-2 w-full"></div>
            <div className="text-sm font-bold w-fit">OR</div>
            <div className="border-b-2 mb-2.5 ml-2 w-full"></div>
          </div>
        </form>
      ) : (
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Verify Your Account
          </h2>
          <p className="mb-4">Please enter the verification code sent to your email.</p>
          <input
            type="text"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            className="w-full border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-500 mb-4"
            placeholder="Enter verification code"
            required
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            onClick={handleVerification}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;