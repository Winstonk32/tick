// components/EventList.js
import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import PaymentDetailsForm from "./PaymentDetailsForm";

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
import avatar_last_airbender from "../images/avatar_last_airbender.jpg";
import avatar from "../images/avatar.jpeg";
import batman from "../images/batman.jpeg";
import blackpanther from "../images/blackpanther.webp";
import dragon from "../images/dragon.avif";
import encanto2 from "../images/encanto2.jpg";
import flash from "../images/flash.webp";
import frozen3 from "../images/frozen3.jpg";
import guardians from "../images/guardians.jpg";
import indiana from "../images/indiana.webp";
import killers from "../images/killers.webp";
import littlemermaid from "../images/littlemermaid.jpeg";
import marvels from "../images/marvels.webp";
import mission from "../images/mission.jpeg";
import narnia from "../images/narnia.jpg";
import oppenheimer from "../images/oppenheimer.jpeg";
import puss_in_boots from "../images/puss-in-boots.webp";
import secret_garden from "../images/secret_garden.jpeg";
import secrets_of_dumbledore from "../images/secrets_of_dumbledore.jpg";
import spirited_away from "../images/spirited_away.jpg";

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
    {
      id: 11,
      name: "The Batman",
      date: "Friday 10 December 2024",
      location: "Cinema Hall 1",
      category: "Action",
      image: batman,
      price: 13.99,
      duration: "2h 55m",
      director: "Matt Reeves",
      cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
      description:
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing the serial killer known as the Riddler.",
      trailer: "https://youtu.be/mqqft2x_Aa4?si=F-bm8I3t8Rrr70TP",
    },
    {
      id: 12,
      name: "Avatar: The Way of Water",
      date: "Friday 16 October 2024",
      location: "Cinema Hall 2",
      category: "Sci-Fi",
      image: avatar,
      price: 15.99,
      duration: "3h 12m",
      director: "James Cameron",
      cast: ["Sam Worthington", "Zoe Saldana", "Kate Winslet"],
      description:
        "Jake Sully and Neytiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora.",
      trailer: "https://youtu.be/d9MyW72ELq0?si=P-OEeq4kq7n69Fuw",
    },
    {
      id: 13,
      name: "Black Panther: Wakanda Forever",
      date: "Saturday 11 Nov 2024",
      location: "Cinema Hall 3",
      category: "Action",
      image: blackpanther,
      price: 14.99,
      duration: "2h 41m",
      director: "Ryan Coogler",
      cast: ["Letitia Wright", "Lupita Nyong'o", "Danai Gurira"],
      description:
        "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
        trailer: "https://youtu.be/_Z3QKkl1WyM?si=ouF2MXurwEfxx0HL",
      },
      {
        id: 14,
        name: "Mission: Impossible – Dead Reckoning Part One",
        date: "Monday 14 Jnauary 2025",
        location: "Cinema Hall 4",
        category: "Action",
        image: mission,
        price: 14.99,
        duration: "2h 30m",
        director: "Christopher McQuarrie",
        cast: ["Tom Cruise", "Hayley Atwell", "Ving Rhames"],
        description:
          "Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.",
        trailer: "https://youtu.be/avz06PDqDbM?si=h6fJtxwxFXLQlpNe",
      },
      {
        id: 15,
        name: "The Flash",
        date: "Saturday 23 Nov 2024",
        location: "Cinema Hall 5",
        category: "Action",
        image: flash,
        price: 13.99,
        duration: "2h 24m",
        director: "Andy Muschietti",
        cast: ["Ezra Miller", "Michael Keaton", "Ben Affleck"],
        description:
          "Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without superheroes.",
        trailer: "https://youtu.be/hebWYacbdvc?si=EGGsx-qOUJ0LLQaA",
      },
      {
        id: 16,
        name: "Guardians of the Galaxy Vol. 3",
        date: "Tuesday 05 Dec 2024",
        location: "Cinema Hall 6",
        category: "Action",
        image: guardians,
        price: 14.99,
        duration: "2h 30m",
        director: "James Gunn",
        cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
        description:
          "The Guardians must fight to protect Rocket from his past while dealing with new threats to the galaxy.",
        trailer: "https://youtu.be/u3V5KDHRQvk?si=vGRV7KyRA7CMG55H",
      },
      {
        id: 17,
        name: "Indiana Jones and the Dial of Destiny",
        date: "Friday 30 Jan 2025",
        location: "Cinema Hall 7",
        category: "Adventure",
        image: indiana,
        price: 13.99,
        duration: "2h 22m",
        director: "James Mangold",
        cast: ["Harrison Ford", "Phoebe Waller-Bridge", "Mads Mikkelsen"],
        description:
          "Indiana Jones returns for one last adventure, facing off against a new generation of villains.",
        trailer: "https://youtu.be/eQfMbSe7F2g?si=f-emb7pwUWU6T7oy",
      },
      {
        id: 18,
        name: "The Marvels",
        date: "Friday 10 Nov 2024",
        location: "Cinema Hall 8",
        category: "Action",
        image: marvels,
        price: 14.99,
        duration: "2h 5m",
        director: "Nia DaCosta",
        cast: ["Brie Larson", "Teyonah Parris", "Zawe Ashton"],
        description:
          "Captain Marvel, Ms. Marvel, and Monica Rambeau team up to save the universe from a new threat.",
        trailer: "https://youtu.be/wS_qbDztgVY?si=HzZSBDqp9KH9ZMjJ",
      },
      {
        id: 19,
        name: "Oppenheimer",
        date: "Sunday 21 Jul 2024",
        location: "Cinema Hall 9",
        category: "Drama",
        image: oppenheimer,
        price: 12.99,
        duration: "3h 0m",
        director: "Christopher Nolan",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
        description:
          "The story of J. Robert Oppenheimer, the scientist who played a key role in the development of the atomic bomb.",
        trailer: "https://youtu.be/uYPbbksJxIg?si=8CFMuN-H5EMoe3ei",
      },
      {
        id: 20,
        name: "Killers of the Flower Moon",
        date: "Friday 20 Oct 2024",
        location: "Cinema Hall 10",
        category: "Crime",
        image: killers,
        price: 13.99,
        duration: "2h 40m",
        director: "Martin Scorsese",
        cast: ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone"],
        description:
        "In 1920s Oklahoma, a series of murders of wealthy Osage Nation members sparks a major FBI investigation.",
      trailer: "https://youtu.be/EP34Yoxs3FQ?si=VyKrLqAhiphar1he",
    },
    
    {
      id: 21,
      name: "Frozen III",
      date: "Friday 25 Nov 2025",
      location: "Cinema Hall 1",
      category: "Animation",
      image: frozen3,
      price: 12.99,
      duration: "1h 45m",
      director: "Jennifer Lee",
      cast: ["Kristen Bell", "Idina Menzel", "Josh Gad"],
      description:
        "Elsa, Anna, Kristoff, and Olaf embark on a new adventure to discover the origins of Elsa's powers.",
      trailer: "https://youtu.be/Zi4LMpSDccc?si=kQZOvAl0Inw2rrxt",
    },
    {
      id: 22,
      name: "The Little Mermaid",
      date: "Saturday 12 August 2024",
      location: "Cinema Hall 2",
      category: "Fantasy",
      image: littlemermaid,
      price: 13.99,
      duration: "2h 15m",
      director: "Rob Marshall",
      cast: ["Halle Bailey", "Jonah Hauer-King", "Melissa McCarthy"],
      description:
        "A live-action adaptation of Disney's animated classic about Ariel, a young mermaid who dreams of becoming human.",
      trailer: "https://youtu.be/kpGo2_d3oYE?si=dyCN27cmp5A1fHvq",
    },
    {
      id: 23,
      name: "How to Train Your Dragon: The Hidden World",
      date: "Friday 01 Nov 2024",
      location: "Cinema Hall 3",
      category: "Animation",
      image: dragon,
      price: 11.99,
      duration: "1h 44m",
      director: "Dean DeBlois",
      cast: ["Jay Baruchel", "America Ferrera", "Cate Blanchett"],
      description:
        "Hiccup and Toothless discover a hidden world and must protect it from a new threat.",
      trailer: "https://youtu.be/SkcucKDrbOI?si=Sky6KR4PLfzPr9Vr",
    },
    {
      id: 24,
      name: "Avatar: The Last Airbender",
      date: "Saturday 15 Dec 2024",
      location: "Cinema Hall 4",
      category: "Fantasy",
      image: avatar_last_airbender,
      price: 14.99,
      duration: "2h 30m",
      director: "M. Night Shyamalan",
      cast: ["Noah Ringer", "Dev Patel", "Nicola Peltz"],
      description:
        "A live-action adaptation of the beloved animated series, following Aang as he learns to master the four elements.",
      trailer: "https://youtu.be/ByAn8DF8Ykk?si=QPQU4_EAzkHB-v6O",
    },
    {
      id: 25,
      name: "The Secret Garden",
      date: "Friday 20 Mar 2025",
      location: "Cinema Hall 5",
      category: "Fantasy",
      image: secret_garden,
      price: 12.99,
      duration: "1h 39m",
      director: "Marc Munden",
      cast: ["Dixie Egerickx", "Colin Firth", "Julie Walters"],
      description:
        "A young girl discovers a hidden, neglected garden and transforms it into a place of beauty and healing.",
      trailer: "https://youtu.be/gHNOXDiD9Vk?si=IqswlEgkSeRO1REa",
    },
    {
      id: 26,
      name: "Puss in Boots: The Last Wish",
      date: "Tuesday 23 Jan 2025",
      location: "Cinema Hall 6",
      category: "Animation",
      image: puss_in_boots,
      price: 11.99,
      duration: "1h 42m",
      director: "Joel Crawford",
      cast: ["Antonio Banderas", "Salma Hayek", "Harvey Guillén"],
      description:
        "Puss in Boots discovers that his passion for adventure has taken its toll, and he sets out on a quest to restore his nine lives.",
      trailer: "https://youtu.be/RqrXhwS33yc?si=TSvNd6_-IGqps_iX",
    },
    {
      id: 27,
      name: "The Chronicles of Narnia: The Silver Chair",
      date: "Friday 15 March 2026",
      location: "Cinema Hall 7",
      category: "Fantasy",
      image: narnia,
      price: 13.99,
      duration: "2h 10m",
      director: "Joe Johnston",
      cast: ["Will Poulter", "Anna Popplewell", "Ben Barnes"],
      description:
        "In this new adventure, Eustace Scrubb and Jill Pole are sent to Narnia to rescue Prince Rilian, the son of King Caspian.",
      trailer: "https://youtu.be/EGReVtqijWA?si=YKeXQiGRH5G0zo1V",
    },
    {
      id: 28,
      name: "Encanto 2",
      date: "Friday 10 Nov 2025",
      location: "Cinema Hall 8",
      category: "Animation",
      image: encanto2,
      price: 12.99,
      duration: "1h 50m",
      director: "Jared Bush",
      cast: ["Stephanie Beatriz", "María Cecilia Botero", "John Leguizamo"],
      description:
        "The Madrigal family returns for another magical adventure in the vibrant world of Encanto.",
      trailer: "https://youtu.be/6LWraeO0sqk?si=4c15lmm9tcivFxqB",
    },
    {
      id: 29,
      name: "The Wizarding World: Secrets of Dumbledore",
      date: "Friday 15 Apr 2025",
      location: "Cinema Hall 9",
      category: "Fantasy",
      image: secrets_of_dumbledore,
      price: 14.99,
      duration: "2h 23m",
      director: "David Yates",
      cast: ["Eddie Redmayne", "Jude Law", "Mads Mikkelsen"],
      description:
        "Professor Albus Dumbledore assembles a team of wizards and witches to take on the dark wizard Grindelwald.",
      trailer: "https://youtu.be/Y9dr2zw-TXQ?si=lKE67Y2QowvTJBqi",
    },
    {
      id: 30,
      name: "Spirited Away: The Return",
      date: "Saturday 20 Aug 2024",
      location: "Cinema Hall 10",
      category: "Animation",
      image: spirited_away,
      price: 13.99,
      duration: "2h 5m",
      director: "Hayao Miyazaki",
      cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
      description:
        "Chihiro returns to the spirit world to help her friends and confront new challenges in this enchanting sequel.",
      trailer: "https://youtu.be/4UMyL9mvn-A?si=T6bzAn-sqi_uL_XF",
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
  const navigate = useNavigate()
 

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

  const handlePayOut = () => {
    const bookedTickets = cart.map((ticket) => {
      const event = mockEvents.find((event) => event.id === ticket.eventId);
      return {
        movieTitle: event.name,
        showtime: event.date,
        tickets: ticket.tickets,
        timeBooked: new Date().toLocaleString(),
      };
    });

    // Save booked tickets to local storage
    localStorage.setItem("bookedTickets", JSON.stringify(bookedTickets));

    // Navigate to the PaymentDetailsForm component
    navigate("/payment"); // Use navigate instead of history.push


    // Navigate to the PaymentDetailsForm component
   

    alert("Going to payment page!"); 
    localStorage.removeItem("cart");
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-500">
      <button
        onClick={toggleCart}
        className="bg-red-700 text-white p-2 rounded fixed top-20 right-4 z-10"
      >
        View Cart ({cart.length})
      </button>

      {!showCart && (
        <div>
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-1000">
            Discover Movies
          </h1>

          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full mb-4 bg-transparent"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded w-full mb-4 bg-transparent"
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
        <div className="flex justify-center items-center text-center">
          <div className="bg-gray-500 p-8 rounded-lg w-132 inline-block">
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
  className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 mt-4"
>
  Clear Cart
</button>

<br/>

<button
  onClick={handlePayOut}
  className={`bg-green-500 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 mt-4 w-auto ${
    cart.every((ticket) => ticket.tickets > 0) ? "" : "opacity-50 cursor-not-allowed"
  }`}
  disabled={!cart.every((ticket) => ticket.tickets > 0)}
>
  Payout
</button>

<br/>

<button
  onClick={toggleCart}
  className="bg-gray-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105 mt-2"
>
  Exit
</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;