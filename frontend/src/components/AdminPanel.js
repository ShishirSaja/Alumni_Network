import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [nameToDelete, setNameToDelete] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const [events, setEvents] = useState([]);
    const [deletionLogs, setDeletionLogs] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', file);

        try {
            const res = await axios.post('http://localhost:5000/api/alumni/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(res.data);
        } catch (err) {
            console.error(err);
            alert('Error uploading file');
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete('http://localhost:5000/api/alumni/delete', {
                data: { name: nameToDelete }
            });
            alert('Alumni deleted successfully');
            setNameToDelete('');
        } catch (err) {
            console.error(err);
            alert('Error deleting alumni');
        }
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        const eventData = { event_name: eventName, event_date: eventDate, venue, description };

        try {
            const response = await axios.post('http://localhost:5000/api/alumni/events', eventData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                alert('Event added successfully!');
                setEventName('');
                setEventDate('');
                setVenue('');
                setDescription('');
                fetchEvents();
            } else {
                alert('Error adding event');
            }
        } catch (err) {
            console.error(err);
            alert('Error adding event');
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/alumni/events');
            setEvents(response.data);
        } catch (err) {
            console.error(err);
            alert('Error fetching events');
        }
    };

    const fetchDeletionLogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/alumni/deletion-log');
            setDeletionLogs(response.data);
        } catch (err) {
            console.error(err);
            alert('Error fetching deletion logs');
        }
    };

    useEffect(() => {
        fetchEvents();
        fetchDeletionLogs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <div className="flex flex-col max-w-7xl mx-auto p-6 space-y-8">
            <header className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-blue-600">Admin Panel</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow"
                >
                    Logout
                </button>
            </header>

            {/* First Row: Upload Image & Delete Alumni */}
            <div className="flex space-x-8">
                {/* File Upload */}
                <section className="flex flex-col border-2 border-black w-1/2 justify-center items-center p-10 space-y-4">
                    <h3 className="text-xl font-bold text-blue-600">Upload Images</h3>
                    <form onSubmit={handleUpload} className="space-y-2">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full"
                            required
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow">
                            Upload
                        </button>
                    </form>
                </section>

                {/* Delete Alumni */}
                <section className="flex flex-col border-2 border-black w-1/2 justify-center items-center p-10 space-y-4">
                    <h3 className="text-xl font-bold text-blue-600">Delete Alumni</h3>
                    <form onSubmit={handleDelete} className="space-y-2">
                        <input
                            type="text"
                            placeholder="Name of Alumni to Delete"
                            value={nameToDelete}
                            onChange={(e) => setNameToDelete(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            required
                        />
                        <button type="submit" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow">
                            Delete
                        </button>
                    </form>
                </section>
            </div>

            {/* Second Row: Add Event & Existing Event */}
            <div className="flex space-x-8">
                {/* Add Event */}
                <section className="flex flex-col border-2 border-black w-1/2 justify-center items-center p-10 space-y-4">
                    <h3 className="text-xl font-bold text-blue-600">Add Event</h3>
                    <form onSubmit={handleEventSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            required
                        />
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            required
                        ></textarea>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow">
                            Add Event
                        </button>
                    </form>
                </section>

                {/* Existing Events */}
                <section className="flex flex-col border-2 border-black w-1/2 justify-center items-center p-10 space-y-4">
                    <h3 className="text-xl font-bold text-blue-600">Existing Events</h3>
                    <ul className="list-disc ml-6 space-y-2">
                        {events.map((event) => (
                            <li key={event.event_id}>
                                <strong>{event.event_name}</strong> on {event.event_date} at {event.venue}
                                <p>{event.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Third Row: Alumni Deletion Logs */}
            <section className="flex flex-col border-2 border-black w-full justify-center items-center p-10 space-y-4">
                <h3 className="text-xl font-bold text-blue-600">Alumni Deletion Logs</h3>
                <ul className="list-disc ml-6 space-y-1">
                    {deletionLogs.map((log) => (
                        <li key={log.id}>
                            <strong>{log.name}</strong> was deleted on {new Date(log.deleted_at).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminPanel;
