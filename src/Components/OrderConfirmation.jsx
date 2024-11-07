import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const BookingPage = ({ user }) => {
    const { id } = useParams();
    const location = useLocation();
    const { movieName } = location.state || {};
    const navigate = useNavigate();

    const [date, setDate] = useState('');
const [time, setTime] = useState('');
const [numTickets, setNumTickets] = useState(1);
const [selectedSeats, setSelectedSeats] = useState([]);

const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelected) => {
        if (prevSelected.includes(seat)) {
            return prevSelected.filter(s => s !== seat);
        } else {
            return [...prevSelected, seat];
        }
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Booking ${movieName} on ${date} at ${time} for ${numTickets} tickets, seats: ${selectedSeats.join(', ')}`);
   
    // After booking, navigate to the Order Confirmation page
    navigate('/UserProfile', {
        state: {
            booking: {
                movieName,
                date,
                time,
                numTickets,
                selectedSeats
            }
        }
    });
};

return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center">Book Your Movie</h1>
        <h2 className="text-2xl font-semibold mb-4 text-center">{movieName}</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Select Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Select Time</label>
                <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="" disabled>Select a time</option>
                    <option value="10:00 AM">Morning (10:00 AM)</option>
                    <option value="1:30 PM">Afternoon (1:30 PM)</option>
                    <option value="4:00 PM">Evening (4:00 PM)</option>
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tickets">Number of Tickets</label>
                <select
                    id="tickets"
                    value={numTickets}
                    onChange={(e) => setNumTickets(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                    required
                >
                    {[...Array(10).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
            </div>

            {/* Seat Selection */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Seats</label>
                <div className="grid grid-cols-5 gap-4">
                    {Array.from({ length: 20 }, (_, index) => `Seat ${index + 1}`).map(seat => (
                        <button
                            key={seat}
                            type="button"
                            onClick={() => handleSeatClick(seat)}
                            className={`border rounded-lg p-4 transition duration-300 text-lg font-semibold ${selectedSeats.includes(seat) ? 'bg-blue-500 text-white'                                 : 'bg-gray-200 hover:bg-blue-300'}`}
                            >
                                {seat}
                            </button>
                        ))}
                    </div>
                </div>
                
                <button onClick={handleSubmit} 
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default BookingPage;