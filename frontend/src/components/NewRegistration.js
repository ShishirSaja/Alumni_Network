import React, { useState } from "react";
import axios from "axios";

const NewRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
    company: "",
    year_of_passout: "",
    opportunities: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/alumni/register", formData);
    alert("Registration successful!");
  };

  return (
    <div className="border-2 broder-black w-1/2 justify p-10">
      <h3 className="text-2xl font-bold text-center mb-6 text-blue-600">
        New Registration
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <input
            name="department"
            placeholder="Department"
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <input name="company" placeholder="Company" onChange={handleChange} />
        </div>
        <br />
        <div>
          <input
            name="year_of_passout"
            placeholder="Year of Passout"
            type="number"
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <textarea
            name="opportunities"
            placeholder="Opportunities"
            onChange={handleChange}
          ></textarea>
        </div>
        <br />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default NewRegistration;
