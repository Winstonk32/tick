// components/EventList.js
import React, { useState, useEffect } from "react";
import die from "../images/die.jpg";
import dis from "../images/dis.jpg";
import dog from "../images/dog.jpg";
import dune from "../images/dune.jpeg";
import et from "../images/et.jpg";
import ghost from "../images/ghost.jpeg";
import mat from "../images/mat.jpeg";
import spider from "../images/spider.jpeg";
import venom from "../images/thumb-1920-1364834.png";
import west from "../images/west.jpg";
import Cart from "./Cart";

const mockEvents = [
  {
    id: 1,
    name: "Venom 3",
    date: "Friday 15 Oct 2024",
    location: "Cinema Hall 1",
    category: "Sci-Fi",
    image: venom,
    price: 12.99,
    duration: "2h 10m",
    director: "Andy Serkis",
    cast: ["Tom Hardy", "Woody Harrelson", "Michelle Williams"],
    description:
      "The next installment in the Venom franchise, following Eddie Brock as he faces a new foe.",
    trailer: "hhttps://www.youtube.com/watch?v=HyIyd9joTTc",
  },
  {
    id: 2,
    name: "No Time to Die",
    date: "Friday 29 Nov 2024",
    location: "Cinema Hall 2",
    category: "Action",
    image: die,
    price: 14.99,
    duration: "2h 43m",
    director: "Cary Joji Fukunaga",
    cast: ["Daniel Craig", "Rami Malek", "Léa Seydoux"],
    description:
      "James Bond has left active service, but his peace is short-lived when his old friend Felix Leiter from the CIA turns up asking for help.",
    trailer: "https://www.youtube.com/watch?v=BIhNsAtPbPI",
  },
  {
    id: 3,
    name: "The French Dispatch",
    date: "Saturday 30 Nov 2024",
    location: "Cinema Hall 3",
    category: "Comedy",
    image: dis,
    price: 11.99,
    duration: "1h 47m",
    director: "Wes Anderson",
    cast: ["Benicio del Toro", "Adrien Brody", "Tilda Swinton"],
    description:
      "A love letter to journalists, set in an outpost of an American newspaper in a fictional 20th-century French city.",
    trailer: "https://www.youtube.com/watch?v=TcPk2p0Zaw4",
  },
  {
    id: 4,
    name: "Eternals",
    date: "Saturday 09 Nov 2024",
    location: "Cinema Hall 4",
    category: "Adventure",
    image: et,
    price: 13.99,
    duration: "2h 37m",
    director: "Chloé Zhao",
    cast: ["Gemma Chan", "Richard Madden", "Angelina Jolie"],
    description:
      "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.",
    trailer: "https://www.youtube.com/watch?v=0WVDKZJkGlY",
  },
  {
    id: 5,
    name: "The Matrix Resurrections",
    date: "Sunday 10 Nov 2024",
    location: "Cinema Hall 5",
    category: "Sci-Fi",
    image: mat,
    price: 12.99,
    duration: "2h 28m",
    director: "Lana Wachowski",
    cast: ["Keanu Reeves", "Carrie-Anne Moss", "Yahya Abdul-Mateen II"],
    description:
      "A continuation of the story of Neo and Trinity, exploring the nature of reality and choice.",
    trailer: "https://www.youtube.com/watch?v=9ix7TUGVYIo",
  },
  {
    id: 6,
    name: "West Side Story",
    date: "Thursday 19 Dec 2024",
    location: "Cinema Hall 6",
    category: "Musical",
    image: west,
    price: 15.99,
    duration: "2h 36m",
    director: "Steven Spielberg",
    cast: ["Ansel Elgort", "Rachel Zegler", "Ariana DeBose"],
    description:
      "A modern retelling of Romeo and Juliet set in 1957 New York City, featuring rival gangs and forbidden love.",
    trailer: "https://www.youtube.com/watch?v=A5GJLwWiYSg",
  },
  {
    id: 7,
    name: "Spider-Man: No Way Home",
    date: "Saturday 09 Nov 2024",
    location: "Cinema Hall 7",
    category: "Action",
    image: spider,
    price: 14.99,
    duration: "2h 28m",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    description:
      "Peter Parker's identity is revealed, leading him to seek help from Doctor Strange to restore his secret.",
    trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
  },
  {
    id: 8,
    name: "Ghostbusters: Afterlife",
    date: "Saturday 02 Nov 2024",
    location: "Cinema Hall 8",
    category: "Comedy",
    image: ghost,
    price: 11.99,
    duration: "2h 4m",
    director: "Jason Reitman",
    cast: ["Carrie Coon", "Paul Rudd", "Finn Wolfhard"],
    description:
      "A family discovers their connection to the original Ghostbusters and their legacy, leading to a new adventure.",
    trailer: "https://www.youtube.com/watch?v=ahZFCF--uRY",
  },
  {
    id: 9,
    name: "The Power of the Dog",
    date: "Monday December 30th",
    location: "Cinema Hall 9",
    category: "Drama",
    image: dog,
    price: 13.99,
    duration: "2h 6m",
    director: "Jane Campion",
    cast: ["Benedict Cumberbatch", "Kirsten Dunst", "Jesse Plemons"],
    description:
      "A rancher becomes unhinged when his brother brings home a new wife and her son, leading to a psychological battle.",
    trailer: "https://www.youtube.com/watch?v=8g1g0A",
  },
  {
    id: 10,
    name: "Dune: Part Two",
    date: "Friday December 06 2024",
    location: "Cinema Hall 10",
    category: "Sci-Fi",
    image: dune,
    price: 14.99,
    duration: "2h 35m",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    description:
      "The epic conclusion of Paul Atreides' journey as he seeks revenge against those who destroyed his family.",
    trailer: "https://www.youtube.com/watch?v=8g1g0A",
  },
];

const categories = [
  "All",
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Adventure",
  "Musical",
  "Animation",
  "Crime",
  "Horror",
  "Biography",
  "Fantasy",
];

const EventList = () => {
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");

  useEffect(() => {
    const filtered = mockEvents.filter(
      (event) =>
        (selectedCategory === "All" || event.category === selectedCategory) &&
        (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    setCart(Array.isArray(savedCart) ? savedCart : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleTicketChange = (eventId, value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 10) return;

    const updatedCart = cart.map((ticket) =>
      ticket.eventId === eventId ? { ...ticket, tickets: parsedValue } : ticket
    );
    setCart(updatedCart);
  };

  const handleBookNow = (event) => {
    const ticketCount = cart.find(
      (ticket) => ticket.eventId === event.id
    )?.tickets;

    if (ticketCount <= 0) {
      setError("Please select at least one ticket.");
      return;
    }

    const existingTicketIndex = cart.findIndex(
      (ticket) => ticket.eventId === event.id
    );

    if (existingTicketIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingTicketIndex].tickets += ticketCount;
      setCart(updatedCart);
    } else {
      const ticket = {
        eventId: event.id,
        image: event.image,
        name: event.name,
        tickets: ticketCount,
        date: new Date().toISOString(),
      };
      setCart((prevCart) => [...prevCart, ticket]);
    }

    setError("");
    setReply("Added to Cart");
    setTimeout(() => setReply(""), 2000);
  };

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalTickets = cart.reduce((sum, item) => sum + item.tickets, 0);

  const removeFromCart = (eventId) => {
    const updatedCart = cart.filter((ticket) => ticket.eventId !== eventId);
    setCart(updatedCart);
  };

  const handlePayout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add tickets to Proceed!");
      return;
    }

    alert("Proceeding to payout...");

    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <button
        onClick={toggleCart}
        className="bg-gray-800 text-white p-2 rounded fixed top-20 right-4 z-10"
      >
        View Cart ({cart.length})
      </button>

      {!showCart && (
        <div>
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Discover Movies
          </h1>

          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {filteredEvents.length === 0 ? (
            <p className="text-center text-gray-500">No events found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                      {event.name}
                    </h2>
                    <p className="text-gray-600 mb-2">{event.date}</p>
                    <p className="text-gray-600 mb-4">{event.location}</p>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={
                        cart.find((ticket) => ticket.eventId === event.id)
                          ?.tickets
                      }
                      onChange={(e) =>
                        handleTicketChange(event.id, e.target.value)
                      }
                      className="border p-2 w-48 hidden"
                    />

                    <button
                      onClick={() => handleBookNow(event)}
                      className="bg-blue-500 text-white p-2 rounded w-full"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showCart && (
        <div className="bg-gray bg-opacity-70 flex justify-center items-center inline-block">
          <div className="bg-gray-300 p-8 rounded-lg w-96 inline-block">
            <h3 className="text-2xl font-bold mb-2">My Cart</h3>
            <p className="font-extrabold">Total Tickets: {totalTickets}</p>

            <Cart
              cart={cart}
              mockEvents={mockEvents}
              handleTicketChange={handleTicketChange}
              removeFromCart={removeFromCart}
            />

            <button
              onClick={clearCart}
              className="bg-red-500 text-white p-2 rounded mt-4"
            >
              Clear Cart
            </button>
            <button
              onClick={handlePayout}
              className={`bg-green-500 text-white p-2 rounded mt-4 w-full ${
                cart.every((ticket) => ticket.tickets > 0)
                  ? ""
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!cart.every((ticket) => ticket.tickets > 0)}
            >
              Payout
            </button>
            <button
              onClick={toggleCart}
              className="bg-gray-800 text-white p-2 rounded mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
