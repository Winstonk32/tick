import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState(user);

  const handleCancelBooking = (bookingId) => {
    // Logic to cancel booking
    alert(`Booking ${bookingId} canceled.`);
  };

  const handleProfileUpdate = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="user-profile">
      <h2>My Profile</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileUpdate}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleProfileUpdate}
        />
      </label>

      <h3>Past Bookings</h3>
      <ul>
        {user.bookings.map(booking => (
          <li key={booking.id}>
            {booking.eventName} - {booking.date}
            {booking.upcoming && (
              <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
