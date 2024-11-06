// context/EventContext.js
import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

const GOOGLE_API_KEY = '10d1b996ec6ee4e5e61781663ba08232bde60ad673cb2a86f1f040f823788275'; // Replace with your actual API key

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  const loadGoogleMapsScript = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      fetchEvents();
    };
    document.head.appendChild(script);
  };

  const fetchEvents = () => {
    setLoading(true);
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      query: 'events in Kenya',
      type: ['event'],
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setEvents(results);
      } else {
        setError('Failed to fetch events');
      }
      setLoading(false);
    });
  };

  const fetchEventById = (placeId) => {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject('Failed to fetch event details');
        }
      });
    });
  };

  return (
    <EventContext.Provider value={{ events, loading, error, fetchEventById }}>
      {children}
    </EventContext.Provider>
  );
};