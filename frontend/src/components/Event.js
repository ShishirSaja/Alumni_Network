import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventPage = () => {
    const [events, setEvents] = useState([]);

    // Fetch events from the database
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/alumni/events');
                setEvents(response.data);
            } catch (err) {
                console.error(err);
                alert('Error fetching events');
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="bg-blue-50 min-h-screen p-6">
            <h2 className="text-4xl font-bold text-center mb-8 text-blue-600">Upcoming Events</h2>
            <div className="max-w-4xl mx-auto">
                {events.length === 0 ? (
                    <p className="text-center text-blue-500 text-lg">No events available at the moment.</p>
                ) : (
                    <ul className="space-y-6">
                        {events.map((event) => (
                            <li key={event.event_id} className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-2xl font-semibold text-blue-700">{event.event_name}</h3>
                                <p className="text-blue-600 mt-2">
                                    <strong>Date:</strong> {event.event_date}
                                </p>
                                <p className="text-blue-600 mt-1">
                                    <strong>Venue:</strong> {event.venue}
                                </p>
                                <p className="text-gray-700 mt-4">{event.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EventPage;
