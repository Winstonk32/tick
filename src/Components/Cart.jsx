import React from "react";

const Cart = ({ cart, mockEvents, handleTicketChange, removeFromCart }) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, ticket) => {
      const event = mockEvents.find((event) => event.id === ticket.eventId);
      if (event) {
        return total + ticket.tickets * event.price;
      }
      return total;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-1000 mb-4">
        Your Cart
      </h2>
      <ul className="space-y-4">
        {cart.map((ticket, index) => {
          const event = mockEvents.find((event) => event.id === ticket.eventId);

          return event ? (
            <li
              key={index}
              className="bg-blue-400 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-300 transition-transform transform hover:scale-105"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-auto h-56 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800 mb-1">
                  Movie: {event.name}
                </p>
                <p className="text-gray-600 mb-2">
                  Trailer:{" "}
                  <a
                    href={event.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-500 hover:text-blue-700"
                  >
                    Watch here
                  </a>
                </p>
                <p className="text-gray-700">Air Date: {event.date}</p>
                <p className="text-gray-700">Location: {event.location}</p>
                <p className="text-gray-700">
                  Price:{" "}
                  <span className="font-bold text-green-600">
                    ${event.price.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-700">Duration: {event.duration}</p>
                <p className="text-gray-700">Director: {event.director}</p>
                <p className="font-semibold mt-2">Cast:</p>
                <ul className="list-none pl-5 font-light mb-2">
                  {event.cast.map((member, index) => (
                    <li key={index} className="text-gray-700">
                      {member}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 mb-2">
                  Description: {event.description}
                </p>

                <p className="mt-2">
                  Tickets:
                  <input
                    type="number"
                    placeholder="No. of tickets"
                    min="1"
                    value={ticket.tickets}
                    onChange={(e) =>
                      handleTicketChange(ticket.eventId, e.target.value)
                    }
                    className="border border-gray-300 p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </p>
                <button
                  onClick={() => removeFromCart(ticket.eventId)}
                  className="bg-red-500 text-white p-2 rounded w-full mt-3 hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ) : null;
        })}
      </ul>
      <div className="mt-4 font-bold text-lg text-center text-gray-800">
        Total Price:{" "}
        <span className="text-green-600">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;
