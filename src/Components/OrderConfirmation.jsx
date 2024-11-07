import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const location = useLocation();
  const { movieName } = location.state || {}; // Get movie name from state passed by Link

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numTickets, setNumTickets] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Mock function to get movie details based on ID
  const getMovieDetails = (id) => {
    return {
      name: movieName || "Unknown Movie",
      date: "Some Date",
      location: "Some Location",
    };
  };

  const movieDetails = getMovieDetails(id);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seat)) {
        return prevSelected.filter((s) => s !== seat);
      } else {
        return [...prevSelected, seat];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Booking ${
        movieDetails.name
      } on ${date} at ${time} for ${numTickets} tickets, seats: ${selectedSeats.join(
        ", "
      )}`
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Book Your Movie
      </h1>
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        {movieDetails.name}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="time"
          >
            Select Time
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select a time
            </option>
            <option value="10:00 AM">Morning (10:00 AM)</option>
            <option value="1:30 PM">Afternoon (1:30 PM)</option>
            <option value="4:00 PM">Evening (4:00 PM)</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tickets"
          >
            Number of Tickets
          </label>
          <select
            id="tickets"
            value={numTickets}
            onChange={(e) => setNumTickets(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Seat Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Seats
          </label>
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 20 }, (_, index) => `Seat ${index + 1}`).map(
              (seat) => (
                <button
                  key={seat}
                  type="button"
                  onClick={() => handleSeatClick(seat)}
                  className={`border rounded-lg p-4 transition duration-300 text-lg font-semibold ${
                    selectedSeats.includes(seat)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-blue-300"
                  }`}
                >
                  {seat}
                </button>
              )
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;