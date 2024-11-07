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