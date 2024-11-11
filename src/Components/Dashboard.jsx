import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../Firebase/firebase"; // Import Firestore functions
import { auth } from "../Firebase/firebase"; // Import Firebase auth to get the current user

function Dashboard() {
  const [cartHistory, setCartHistory] = useState([]); // State for cart history
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartHistory = async () => {
      try {
        const cartHistoryCollection = collection(db, "cartItems"); // Assuming cart history is saved in this collection
        const snapshot = await getDocs(cartHistoryCollection);
        const cartData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter cart history based on the logged-in user (userId)
        const currentUser = auth.currentUser; // Get the current logged-in user
        if (!currentUser) {
          console.error("No user logged in");
          return;
        }

        const userCartHistory = cartData.filter(
          (cart) => cart.userId === currentUser.uid // Filter by userId
        );

        setCartHistory(userCartHistory); // Set filtered cart history for this user
      } catch (error) {
        console.error("Error fetching cart history:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCartHistory();
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to the admin dashboard. Here you can manage the cart history.
        </p>

        <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Cart History (Booked Tickets)
          </h2>

          {/* Loading state */}
          {loading ? (
            <div className="py-4 text-center text-gray-500">
              Loading cart history...
            </div>
          ) : (
            <ul className="mt-4">
              {cartHistory.length > 0 ? (
                cartHistory.map((cartItem, index) => (
                  <li key={index} className="border-b border-gray-200 py-4">
                    {/* <h3 className="text-lg font-medium text-gray-900">
                      Booked by:{" "}
                      <span className="font-normal">{cartItem.userName}</span>{" "}
                      {/* Display user name */}
                    {/* </h3> */}
                    <p className="text-lg font-medium text-gray-900">
                      Total Price:{" "}
                      <span className="font-normal">
                        ${cartItem.totalPrice.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      Time of Booking:{" "}
                      <span className="font-normal">
                        {new Date(
                          cartItem.createdAt.seconds * 1000
                        ).toLocaleString()}
                      </span>{" "}
                      {/* Display formatted time */}
                    </p>
                    <ul className="mt-4">
                      {cartItem.cartItems.map((item, idx) => (
                        <li key={idx} className="border-b border-gray-100 py-2">
                          <p className="font-medium text-gray-800">
                            Event: {item.eventDetails.name}
                          </p>
                          <p className="text-gray-600">
                            Tickets: {item.tickets}
                          </p>
                          <p className="text-gray-600">
                            Price per ticket: ${item.eventDetails.price}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              ) : (
                <li className="py-4 text-gray-500 text-center">
                  No cart history available.
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
