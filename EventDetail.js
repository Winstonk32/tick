import React, { useState } from 'react';

const EventDetail = ({ event }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
      setTotalPrice(totalPrice - seat.price);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setTotalPrice(totalPrice + seat.price);
    }
  };

  return (
    <div className="event-detail">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Date & Time:</strong> {event.date} at {event.time}</p>
      <p><strong>Tickets Available:</strong> {event.ticketsAvailable ? "Yes" : "No"}</p>

      <div className="seating-chart">
        <h3>Seating Chart</h3>
        <div className="seats">
          {event.seats.map(seat => (
            <button
              key={seat.id}
              className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
              onClick={() => handleSeatSelection(seat)}
            >
              {seat.label} - ${seat.price}
            </button>
          ))}
        </div>
      </div>

      <p><strong>Total Price:</strong> ${totalPrice}</p>
    </div>
  );
};

export default EventDetail;
