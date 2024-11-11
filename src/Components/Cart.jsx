import React, { useEffect, useState } from "react";
import { db, collection, auth, addDoc, getDocs } from "../Firebase/firebase";

const Cart = ({ cart, mockEvents, handleTicketChange, removeFromCart }) => {
  const [history, setHistory] = useState([]); // State to store fetched cart history
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

  useEffect(() => {
    const saveCartToFirebase = async () => {
      try {
        const cartRef = collection(db, "cartItems");

        const cartItems = cart.map((ticket) => ({
          ...ticket,
          eventDetails: mockEvents.find((event) => event.id === ticket.eventId),
        }));

        const user = auth.currentUser;
        if (user) {
          // Saving cart with user's username and id
          await addDoc(cartRef, {
            cartItems,
            totalPrice,
            createdAt: new Date(),
            userId: user.uid, // Store the user's ID
            userName: user.displayName || "Anonymous", // Store the user's displayName or a default if not available
          });
        }
      } catch (error) {
        console.error("Error saving cart to Firebase:", error);
      }
    };

    if (cart.length > 0) {
      saveCartToFirebase();
    }
  }, [cart, mockEvents, totalPrice]);

  // Function to fetch cart history from Firebase
  const fetchCartHistory = async () => {
    try {
      const cartRef = collection(db, "cartItems");
      const currentUser = auth.currentUser; // Get the current user

      if (!currentUser) {
        console.error("No user logged in");
        return;
      }

      const snapshot = await getDocs(cartRef);
      const historyData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((historyItem) => historyItem.userId === currentUser.uid); // Filter by user ID

      setHistory(historyData);
    } catch (error) {
      console.error("Error fetching cart history from Firebase:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-lg shadow-2xl">
      <h2 className="text-4xl font-bold text-center text-[#e94560] mb-8">
        Your Cart
      </h2>

      <button
        onClick={fetchCartHistory}
        className="bg-[#46d369] text-white p-3 rounded mb-8 hover:bg-[#35b65c] transition"
      >
        View History
      </button>

      {history.length > 0 && (
        <div className="history mt-8">
          <h3 className="text-2xl font-bold text-center text-[#e94560] mb-4">
            Purchase History
          </h3>
          <ul className="space-y-6">
            {history.map((historyItem) => (
              <li
                key={historyItem.id}
                className="p-6 rounded-lg shadow-lg bg-[#0f3460]"
              >
                <h4 className="text-xl font-bold text-[#ffffff] mb-2">
                  Booked on:{" "}
                  {historyItem.createdAt.toDate().toLocaleDateString()}
                </h4>
                <p className="text-[#ffffff] font-bold">
                  Total Price: ${historyItem.totalPrice.toFixed(2)}
                </p>
                <ul className="list-disc ml-5 mt-2">
                  {historyItem.cartItems.map((item, index) => (
                    <li key={index} className="text-gray-300">
                      Name: {item.eventDetails.name} | Tickets: {item.tickets} |
                      Price per ticket: ${item.eventDetails.price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

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
                  <span className="font-bold">Description:</span>{" "}
                  {event.description}
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
