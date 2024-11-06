// components/EventList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import die from '../images/die.jpg';
import dis from '../images/dis.jpg';
import dog from '../images/dog.jpg';
import dune from '../images/dune.jpeg';
import et from '../images/et.jpg';
import ghost from '../images/ghost.jpeg';
import mat from '../images/mat.jpeg';
import spider from '../images/spider.jpeg';
import venom from '../images/thumb-1920-1364834.png';
import west from '../images/west.jpg';
import BookingPage from './OrderConfirmation';

const mockEvents = [
    { id: 1, name: "Venom 3", date: "Friday 15 Oct 2024", location: "Cinema Hall 1", Category: "Sci-Fi", image: venom },
    { id: 2, name: "No Time to Die", date: "Friday 29 Nov 2024", location: "Cinema Hall 2", Category: "Action", image: die },
    { id: 3, name: "The French Dispatch", date: "Saturday 30 Nov 2024", location: "Cinema Hall 3", Category: "Comedy", image: dis },
    { id: 4, name: "Eternals", date: "Saturday 09 Nov 2024", location: "Cinema Hall 4", Category: "Adventure", image: et },
    { id: 5, name: "The Matrix Resurrections", date: "Sunday 10 Nov 2024", location: "Cinema Hall 5", Category: "Sci-Fi", image: mat },
    { id: 6, name: "West Side Story", date: "Thursday 19 Dec 2024", location: "Cinema Hall 6", Category: "Musical", image: west },
    { id: 7, name: "Spider-Man: No Way Home", date: "Saturday 09 Nov 2024", location: "Cinema Hall 7", Category: "Action", image: spider },
    { id: 8, name: "Ghostbusters: Afterlife", date: "Saturday 02 Nov 2024", location: "Cinema Hall 8", Category: "Comedy", image: ghost },
    { id: 9, name: "The Power of the Dog", date: "Monday December 30th", location: "Cinema Hall 9", Category: "Drama", image: dog },
    { id: 10, name: "Dune: Part Two", date: "Friday December 06 2024", location: "Cinema Hall 10", Category: "Sci-Fi", image: dune },
    {id : 11 ,name: ""}
    // Additional mock events...
];

const Categories = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Adventure", "Musical", "Animation", "Crime", "Horror", "Biography", "Fantasy"];

const EventList = () => {
    const [filteredEvents, setFilteredEvents] = useState(mockEvents);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); // Initialize history

    useEffect(() => {
        const filtered = mockEvents.filter(event => 
            (selectedCategory === "All" || event.Category === selectedCategory) &&
            (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             event.location.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredEvents(filtered);
    }, [selectedCategory, searchTerm]);

    const handleBookNow = (event) => {
        // Navigate to the booking page with the event id
        navigate(`/book/${event.id}`);
    };

    return (
        <div className="container mx-auto px-4 py-12 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Discover Movies</h1>

                        {/* Search Bar */}
                        <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map(movie => (
                    <Link 
                        key={movie.id}
                        to={`/booking/${movie.id}`} 
                        className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <h2 className="text-2xl font-semibold">{movie.name}</h2>
                    </Link>
                ))}
            </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    {Categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="relative">
                            <img src={event.image} alt={event.name} className="w-full h-56 object-cover" />
                            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                                {event.Category}
                            </div>
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{event.name}</h2>
                            <p className="text-gray-600 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                {event.date}
                            </p>
                            <p className="text-gray-600 mb-4 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                {event.location}
                            </p>
                            <button 
                                onClick={() => handleBookNow(event)} // Call handleBookNow with the event
                                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Render OrderConfirmation if booking is set */}
            {/* Uncomment below if you have a booking state to manage */}
            {/* {booking && (
                <OrderConfirmation booking={booking} />
            )} */}
        </div>
    );
};

export default EventList;