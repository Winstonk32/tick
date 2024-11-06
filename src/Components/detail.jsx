// components/EventList.js
import React from 'react';
import { Link } from 'react-router-dom';

const mockEvents = [
  { id: 1, name: "Nairobi International Trade Fair", date: "2023-10-02", location: "Nairobi, Kenya" },
  { id: 2, name: "Lamu Cultural Festival", date: "2023-11-15", location: "Lamu, Kenya" },
  { id: 3, name: "Rusinga Festival", date: "2023-12-20", location: "Rusinga Island, Kenya" },
  { id: 4, name: "Mombasa Carnival", date: "2023-11-25", location: "Mombasa, Kenya" },
  { id: 5, name: "Maralal International Camel Derby", date: "2023-08-25", location: "Maralal, Kenya" },
  { id: 6, name: "Lake Turkana Cultural Festival", date: "2023-06-10", location: "Loiyangalani, Kenya" },
  { id: 7, name: "Nairobi Film Festival", date: "2023-09-05", location: "Nairobi, Kenya" },
  { id: 8, name: "Koroga Festival", date: "2023-07-30", location: "Nairobi, Kenya" },
  { id: 9, name: "Safaricom Jazz Festival", date: "2023-10-15", location: "Nairobi, Kenya" },
  { id: 10, name: "Rift Valley Festival", date: "2023-08-20", location: "Naivasha, Kenya" },
  { id: 11, name: "Lewa Marathon", date: "2023-06-24", location: "Lewa Wildlife Conservancy, Kenya" },
  { id: 12, name: "Kikwetu Festival", date: "2023-12-10", location: "Nairobi, Kenya" },
  { id: 13, name: "Kisumu Fashion Week", date: "2023-11-05", location: "Kisumu, Kenya" },
  { id: 14, name: "Nairobi Coffee Festival", date: "2023-09-30", location: "Nairobi, Kenya" },
  { id: 15, name: "Mombasa Food Festival", date: "2023-10-20", location: "Mombasa, Kenya" },
  { id: 16, name: "Nairobi Tech Week", date: "2023-07-15", location: "Nairobi, Kenya" },
  { id: 17, name: "Kilifi New Year", date: "2023-12-31", location: "Kilifi, Kenya" },
  { id: 18, name: "Marsabit Lake Turkana Cultural Festival", date: "2023-06-28", location: "Loiyangalani, Kenya" },
  { id: 19, name: "Nairobi Wine Festival", date: "2023-11-10", location: "Nairobi, Kenya" },
  { id: 20, name: "Kenya Music Festival", date: "2023-08-10", location: "Nairobi, Kenya" },
];

const EventList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events in Kenya</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
            <p className="text-gray-600 mb-2">Date: {event.date}</p>
            <p className="text-gray-600 mb-4">Location: {event.location}</p>
            <Link 
              to={`/events/${event.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;