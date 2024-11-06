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
    <div>
      <ul>
        {cart.map((ticket, index) => {
          const event = mockEvents.find((event) => event.id === ticket.eventId);

          return event ? (
            <li key={index} className="mb-2">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-56 object-cover"
              />
              <p>
                Trailer:{" "}
                <a
                  href={event.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-gray-500 hover:text-gray-700"
                >
                  Watch here
                </a>
              </p>
              <p className="font-bold">Ticket: {event.name}</p>
              <p className="font-light">Date: {event.date}</p>
              <p className="font-light">Location: {event.location}</p>
              <p className="font-light">Price: ${event.price.toFixed(2)}</p>
              <p className="font-light">Duration: {event.duration}</p>
              <p className="font-light">Director: {event.director}</p>
              <p className="font-semibold">Cast: </p>
              <ul className="list-disc pl-5 font-light">
                {event.cast.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
              <p className="font-normal">Description: {event.description}</p>

              <p>
                Tickets:
                <input
                  type="number"
                  placeholder="No. of tickets"
                  min="1"
                  value={ticket.tickets}
                  onChange={(e) =>
                    handleTicketChange(ticket.eventId, e.target.value)
                  }
                  className="border p-2 w-48"
                />
              </p>
              <button
                onClick={() => removeFromCart(ticket.eventId)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Remove
              </button>
            </li>
          ) : null;
        })}
      </ul>
      <div className="mt-4 font-bold">
        Total Price: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
