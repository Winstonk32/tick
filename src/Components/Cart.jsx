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
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-lg shadow-2xl">
      <h2 className="text-4xl font-bold text-center text-[#e94560] mb-8">
        Your Cart
      </h2>
      <ul className="space-y-6">
        {cart.map((ticket, index) => {
          const event = mockEvents.find((event) => event.id === ticket.eventId);

          return event ? (
            <li
              key={index}
              className="bg-[#0f3460] p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center border border-[#e94560] transition-transform transform hover:scale-105"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-64 object-cover rounded-md mb-4 md:mb-0 md:w-1/3 shadow-md"
              />
              <div className="flex-1 md:ml-4">
                <h3 className="text-2xl font-semibold text-[#ffffff] mb-2">
                  {event.name}
                </h3>
                <p className="text-[#e94560] mb-2">
                  <span className="font-bold">Trailer:</span>{" "}
                  <a
                    href={event.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#46d369] hover:text-[#35b65c] transition"
                  >
                    Watch here
                  </a>
                </p>
                <p className="text-gray-300">Air Date: {event.date}</p>
                <p className="text-gray-300">Location: {event.location}</p>
                <p className="text-[#ffffff]">
                  Price:{" "}
                  <span className="font-bold text-[#46d369]">
                    ${event.price.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-300">Duration: {event.duration}</p>
                <p className="text-gray-300">Director: {event.director}</p>
                <p className="font-semibold mt-2 text-[#ffffff]">Cast:</p>
                <ul className="list-none pl-5 font-light mb-2">
                  {event.cast.map((member, index) => (
                    <li key={index} className="text-gray-300">
                      {member}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-300 mb-2">
                  <span className="font-bold">Description:</span> {event.description}
                </p>

                <div className="mt-4">
                  <label className="text-[#ffffff]">Tickets:</label>
                  <input
                    type="number"
                    placeholder="No. of tickets"
                    min="1"
                    value={ticket.tickets}
                    onChange={(e) =>
                      handleTicketChange(ticket.eventId, e.target.value)
                    }
                    className="border border-[#e94560] p-3 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-[#46d369] bg-[#0f3460] text-[#ffffff]"
                  />
                </div>
                <button
                  onClick={() => removeFromCart(ticket.eventId)}
                  className="bg-blue-800 text-white p-3 rounded w-full mt-4 hover:bg-[#c9302c] transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ) : null;
        })}
      </ul>
      <div className="mt-8 font-bold text-2xl text-center text-[#ffffff]">
        Total Price:{" "}
        <span className="text-[#46d369]">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;