// ViewAlumni.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAlumni = () => {
    const [alumni, setAlumni] = useState([]);

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/alumni/view');
                setAlumni(response.data);
            } catch (error) {
                console.error('Error fetching alumni:', error);
            }
        };
        fetchAlumni();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Alumni List</h2>
            {alumni.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Department</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Company</th>
                                <th className="py-2 px-4 border-b">Year of Passout</th>
                                <th className="py-2 px-4 border-b">Opportunities</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumni.map((alum, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{alum.name}</td>
                                    <td className="py-2 px-4 border-b">{alum.department}</td>
                                    <td className="py-2 px-4 border-b">{alum.email}</td>
                                    <td className="py-2 px-4 border-b">{alum.company}</td>
                                    <td className="py-2 px-4 border-b">{alum.year_of_passout}</td>
                                    <td className="py-2 px-4 border-b">{alum.opportunities}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600">No alumni available.</p>
            )}
        </div>
    );
};

export default ViewAlumni;