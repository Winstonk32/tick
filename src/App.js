// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EventProvider } from './Components/EventContext';
import HomePage from './Components/Homepage';
import EventList from './Components/Eventlist';
import EventDetail from './Components/detail';
import Navbar from './Components/Navbar'
import BookingPage from './Components/OrderConfirmation';

function App() {
  return (
    <Router>
      <EventProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/book/:id"  element={<BookingPage />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
          </Routes>
        </div>
      </EventProvider>
    </Router>
  );
};

export default App;
