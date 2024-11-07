import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { role } = formValues;

    console.log("Form submitted with values:", formValues);

    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/homepage");
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
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-all"
        >
          Login/Signup
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UserProfile = ({ user }) => {
    // Initialize profile state with user data
    const [profile, setProfile] = useState(user || { bookings: [] });
    const location = useLocation();
    const { booking } = location.state || {}; // Get booking from the location state

    // Use useEffect to update bookings when the component mounts
    useEffect(() => {
        if (booking) {
            setProfile((prevProfile) => ({
                ...prevProfile,
                bookings: [
                    ...prevProfile.bookings,
                    { ...booking, id: Date.now(), upcoming: true } // Add a unique ID and mark it as upcoming
                ]
            }));
        }
    }, [booking]); // Dependency array ensures this runs only when booking changes

    const handleCancelBooking = (bookingId) => {
        alert(`Booking ${bookingId} canceled.`);
        setProfile((prevProfile) => ({
            ...prevProfile,
            bookings: prevProfile.bookings.filter(b => b.id !== bookingId)
        }));
    };

    const handleProfileUpdate = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    return (
        <div className="user-profile mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <label className="block mb-2">
                Name:
                <input
                    type="text"
                    name="name"
                    value={profile.name || ''} // Handle case where profile.name may be undefined
                    onChange={handleProfileUpdate}
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                />
            </label>
            <label className="block mb-4">
                Email:
                <input
                    type="email"
                    name="email"
                    value={profile.email || ''} // Handle case where profile.email may be undefined
                    onChange={handleProfileUpdate}
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                />
            </label>

            <h3 className="text-xl font-semibold mb-2">Past Bookings</h3>
            {profile.bookings.length > 0 ? ( // Check if there are any bookings to display
                <ul className="list-disc pl-5">
                    {profile.bookings.map(booking => (
                        <li key={booking.id} className="flex justify-between items-center mb-2">
                            <span>{booking.movieName} - {booking.date} at {booking.time}</span>
                            {booking.upcoming && (
                                <button 
                                    onClick={() => handleCancelBooking(booking.id)} 
                                    className="text-red-500 hover:underline"
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No past bookings available.</p> // Message when there are no bookings
            )}
        </div>
    );
};

export default UserProfile;