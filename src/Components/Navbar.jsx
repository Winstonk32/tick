import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // Remove the login state from localStorage
    setIsLoggedIn(false); // Update state to reflect logout
    navigate("/"); // Redirect to login page
  };

  // Check if the user is logged in (on page load)
  useEffect(() => {
    const loginState = localStorage.getItem("loggedIn");
    if (loginState) {
      setIsLoggedIn(true); // Update state if logged in
    }
  }, []);

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold">
          TicketMaster
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="hover:text-gray-200">
            Home
          </NavLink>
          <NavLink to="/events" className="hover:text-gray-200">
            Movies
          </NavLink>
          <NavLink to="/contact" className="hover:text-gray-200">
            Contact
          </NavLink>

          {/* If logged in, show Logout button */}
          {isLoggedIn && (
            <button onClick={handleLogout} className="hover:text-gray-200">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black">
          <NavLink to="/" className="block px-4 py-2 hover:bg-black">
            Home
          </NavLink>
          <NavLink to="/events" className="block px-4 py-2 hover:bg-black">
            Movies
          </NavLink>
          <NavLink to="/contact" className="block px-4 py-2 hover:bg-black">
            Contact
          </NavLink>

          {/* If logged in, show Logout button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-black"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;