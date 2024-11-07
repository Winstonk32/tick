// pages/HomePage.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from 'react-typed';

const HomePage = () => {
    
  
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-900">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-purple-400">
                            The Home of Movies
                        </span>
                    </h1>

                    <div className="mb-12 h-20">
                        <ReactTyped 
                            className="text-3xl md:text-4xl font-bold text-gray-200"
                            strings={[
                                "Discover Amazing Movies",
                                "Experience Unforgettable Moments",
                                
                            ]}
                            typeSpeed={80}
                            backSpeed={60}
                            loop
                        />
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Link 
                            to="/events" 
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-purple-900 focus:outline-none"
                        >
                            <span>Browse Movies</span>
                            <svg 
                                className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 transform group-hover:translate-x-1"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                        
                    
                    </div>

                    {/* Features Section */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-white max-w-6xl mx-auto px-4">
                        <div className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl">
                            <div className="mb-4">
                                <svg className="w-10 h-10 mx-auto text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
                            <p className="text-gray-300">Get instant notifications about event changes and updates</p>
                        </div>

                        <div className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl">
                            <div className="mb-4">
                                <svg className="w-10 h-10 mx-auto text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Secure Booking</h3>
                            <p className="text-gray-300">Safe and secure payment processing for all Movies</p>
                        </div>

                        <div className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl">
                            <div className="mb-4">
                                <svg className="w-10 h-10 mx-auto text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                            <p className="text-gray-300">Join a vibrant community of Movie enthusiasts</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;