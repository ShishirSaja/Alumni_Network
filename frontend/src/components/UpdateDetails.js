import React, { useState } from 'react';
import axios from 'axios';

const UpdateDetails = () => {
    const [name, setName] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        company: '',
        opportunities: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/alumni/update', { name, ...formData });
        alert('Update successful!');
    };

    return (
        <div className="border-2 broder-black w-1/2 justify p-10">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-600">Update Details</h3>
            <div>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <br/>
            <form onSubmit={handleSubmit}>
                <div>
                <input name="email" placeholder="Email" type="email" onChange={handleChange} />
                </div>
                <br/>
                <div>
                <input name="company" placeholder="Company" onChange={handleChange} />
                </div>
                <br/>
                <div>
                <textarea name="opportunities" placeholder="Opportunities" onChange={handleChange}></textarea>
                </div>
                <br/>
                <div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
                </div>
                <br/>
            </form>
        </div>
    );
};

export default UpdateDetails;