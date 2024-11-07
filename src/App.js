// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase/firebase'; // Import your Firebase configuration
import Login from './Components/auth/login';
import Register from './Components/auth/register';
import Header from './Components/header';
import HomePage from './Components/Homepage';
import EventList from './Components/Eventlist';
import Navbar from './Components/Navbar';
import BookingPage from './Components/OrderConfirmation';
import UserProfile from './Components/UserProfile';
import { AuthProvider } from "./contexts/authContext";
import Booking from "./Components/Booking";
const App = () => {
  const [user, setUser] = useState(null); // Initialize user as null to represent unauthenticated state

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state based on authentication status
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />; // Redirect to login if not authenticated
  };

  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
            <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
            <Route path="/events" element={<ProtectedRoute element={<EventList />} />} />
            <Route path="/book/:id" element={<ProtectedRoute element={<BookingPage />} />} />
            <Route path="/book/:id" element={<Booking />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
