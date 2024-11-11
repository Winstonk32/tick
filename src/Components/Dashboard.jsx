import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, collection, getDocs } from "../Firebase/firebase"; // Import Firestore functions

function Dashboard() {
  const navigate = useNavigate();
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [bookedTickets, setBookedTickets] = useState([]);

  // Fetch booked tickets from Firestore
  useEffect(() => {
    const fetchBookedTickets = async () => {
      try {
        const bookedTicketsCollection = collection(db, "bookedTickets");
        const ticketsSnapshot = await getDocs(bookedTicketsCollection);
        const ticketsData = ticketsSnapshot.docs.map((doc) => doc.data());
        setBookedTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching booked tickets:", error);
      }
    };

    fetchBookedTickets();
  }, []);

  // Check if the user is visiting for the first time
  useEffect(() => {
    const firstTimeUser = localStorage.getItem("firstTimeUser");
    setIsFirstTime(!firstTimeUser);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to the admin dashboard. Here you can manage booked tickets.
        </p>

        <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Booked Tickets
          </h2>
          <ul className="mt-4">
            {bookedTickets.length > 0 ? (
              bookedTickets.map((ticket, index) => (
                <li key={index} className="border-b border-gray-200 py-4">
                  <p className="text-lg font-medium text-gray-900">
                    Title:{" "}
                    <span className="font-normal">{ticket.movieTitle}</span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    ShowTime:{" "}
                    <span className="font-normal">{ticket.showtime}</span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    Number of tickets booked:{" "}
                    <span className="font-normal">
                      {ticket.tickets} tickets
                    </span>
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    Time Booked:{" "}
                    <span className="font-normal">{ticket.timeBooked}</span>
                  </p>
                </li>
              ))
            ) : (
              <li className="py-4 text-gray-500 text-center">
                No booked tickets available.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
