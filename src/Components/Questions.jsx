import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Questions({ setIsFirstTimeUser }) {
  const [ticketTypes, setTicketTypes] = useState([
    { type: "Standard", ticketsBooked: "", peopleBooked: "" },
  ]);
  const [theaterName, setTheaterName] = useState("");
  const [movieName, setMovieName] = useState("");
  const navigate = useNavigate();

  const handleTicketChange = (index, field, value) => {
    const updatedTicketTypes = [...ticketTypes];
    updatedTicketTypes[index][field] = value;
    setTicketTypes(updatedTicketTypes);
  };

  const addTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      { type: "", ticketsBooked: "", peopleBooked: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      theaterName,
      movieName,
      ticketTypes,
    });

    setIsFirstTimeUser(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          Movie Theater Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={theaterName}
              onChange={(e) => setTheaterName(e.target.value)}
              placeholder="Theater Name"
              className="w-full p-2 border-b-2 border-gray-300 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              placeholder="Movie Name"
              className="w-full p-2 border-b-2 border-gray-300 outline-none"
              required
            />
          </div>

          <h3 className="text-xl font-semibold mb-4">Ticket Types</h3>

          {ticketTypes.map((ticket, index) => (
            <div key={index} className="mb-6 space-y-4">
              <input
                type="text"
                value={ticket.type}
                onChange={(e) =>
                  handleTicketChange(index, "type", e.target.value)
                }
                placeholder="Ticket Type (e.g., Standard, VIP)"
                className="w-full p-2 border-b-2 border-gray-300 outline-none"
                required
              />
              <input
                type="number"
                value={ticket.ticketsBooked}
                onChange={(e) =>
                  handleTicketChange(index, "ticketsBooked", e.target.value)
                }
                placeholder="Number of Tickets Booked"
                className="w-full p-2 border-b-2 border-gray-300 outline-none"
                required
              />
              <input
                type="number"
                value={ticket.peopleBooked}
                onChange={(e) =>
                  handleTicketChange(index, "peopleBooked", e.target.value)
                }
                placeholder="Number of People who Booked this Ticket"
                className="w-full p-2 border-b-2 border-gray-300 outline-none"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addTicketType}
            className="text-indigo-500 mb-4"
          >
            Add Another Ticket Type
          </button>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
          >
            Save and Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Questions;
