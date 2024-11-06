import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Questions from "./Questions";

function Dashboard() {
  const navigate = useNavigate();
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const firstTimeUser = localStorage.getItem("firstTimeUser");
    if (!firstTimeUser) {
      // This is the first time user
      setIsFirstTime(true);
    } else {
      // If not first time, no need to show the first-time prompt
      setIsFirstTime(false);
    }
  }, []);

  const setIsFirstTimeUser = (status) => {
    setIsFirstTime(status);
    // Set firstTimeUser to false only once the onboarding is complete
    localStorage.setItem("firstTimeUser", "false");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  // If it's the first-time user, show the Questions component
  if (isFirstTime) {
    return <Questions setIsFirstTimeUser={setIsFirstTimeUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to the admin dashboard. Here you can manage various resources
          and settings.
        </p>

        <div className="mt-8">
          <button className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition-all">
            Manage Showtimes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
