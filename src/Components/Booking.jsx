import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    alert(`Booking confirmed for ${state.movieName}!`);
    navigate("/confirmation");
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Booking for {state.movieName}
      </h1>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p className="text-xl font-semibold mb-2">Event ID: {id}</p>
        <p className="text-xl font-semibold mb-2">Movie: {state.movieName}</p>

        <button
          onClick={handleConfirmBooking}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-full mt-4 hover:bg-blue-600 transition duration-300"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
