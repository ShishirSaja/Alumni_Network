import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; 
import About from './components/About';
import Gallery from './components/Gallery';
import AlumniPanel from './components/AlumniPanel';
import AdminPanel from './components/AdminPanel';
import ViewAlumni from './components/ViewAlumni';
import Event from './components/Event';
import AuthPage from './components/Login';
import logo from './components/images/logo.png';
function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <div className="min-h-screen bg-blue-50 text-blue-900 flex flex-col justify-between">
                
                <header className="bg-blue-600 text-white py-4 shadow-md">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-4">
                            <img
                                src={logo}
                                alt="College Logo"
                                className="w-20 h-20 md:w-24 md:h-24 object-contain"
                            />
                            <h1 className="text-2xl md:text-4xl font-bold">
                                SAJA Alumni Network
                            </h1>
                        </div>
                        <nav className="mt-4 md:mt-0">
                            <ul className="flex flex-col md:flex-row gap-4">
                                <li>
                                    <a
                                        href="/"
                                        className="text-white hover:bg-blue-700 py-2 px-4 rounded-md transition"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/about"
                                        className="text-white hover:bg-blue-700 py-2 px-4 rounded-md transition"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/gallery"
                                        className="text-white hover:bg-blue-700 py-2 px-4 rounded-md transition"
                                    >
                                        Gallery
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/event"
                                        className="text-white hover:bg-blue-700 py-2 px-4 rounded-md transition"
                                    >
                                        Events
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/alumni-panel"
                                        className="text-white hover:bg-blue-700 py-2 px-4 rounded-md transition"
                                    >
                                        Alumni
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/admin-panel"
                                        className="text-white hover:bg-blue-700 py-2 px-4 rounded-md transition"
                                    >
                                        Admin
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/view-alumni"
                                        className="text-white hover:bg-blue-700 py-2 px-4 rounded-md transition"
                                    >
                                        View Alumni List
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

            
                <main className="container mx-auto px-4 py-8 flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} /> 
                        <Route path="/about" element={<About />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/event" element={<Event />} />
                        <Route path="/alumni-panel" element={<AlumniPanel />} />
                        <Route path="/admin-panel" element={isAuthenticated ? <AdminPanel /> : <AuthPage />} />
                        <Route path="/view-alumni" element={<ViewAlumni />} />
                        <Route path="/auth" element={<AuthPage />} />
                    </Routes>
                </main>

                
                <footer className="bg-blue-600 text-white py-4 shadow-md">
                    <div className="container mx-auto px-4 text-center">
                        <p>&copy; {new Date().getFullYear()} SAJA Alumni Network. All Rights Reserved.</p>
                        <p>Developed by Shishir saja</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
