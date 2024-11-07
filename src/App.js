
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Homepage";
import EventList from "./Components/Eventlist";
import Navbar from "./Components/Navbar";
import BookingPage from "./Components/OrderConfirmation";
import Booking from "./Components/Booking";
import UserProfile from "./Components/UserProfile";
import Dashboard from "./Components/Dashboard";
import PaymentDetailsForm from "./Components/PaymentDetailsForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isLoggedIn && <Navbar /> }
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/payment" element={<PaymentDetailsForm />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/book/:id" element={<Booking />} />
        </Routes>
      </div>
    </Router>

  );
};

export default App;