// Gallery.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/alumni/images');
                setImages(res.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000/uploads/${image}`}
                            alt={`Uploaded ${index}`}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-600">No images available.</p>
                )}
            </div>
        </div>
    );
};

export default Gallery;