import React from 'react';
import collegeImage from './images/college.jpg'; // Adjust the path to your image

function Home() {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${collegeImage})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 text-center text-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    Welcome to <span className="text-blue-400">SAJA College's Alumni Network</span>
                </h1>
                <p className="text-lg md:text-xl italic mb-6">
                    Connecting Alumni, Students, and Faculty for a Stronger Tomorrow.
                </p>
                
            </div>
        </div>
    );
}

export default Home;
