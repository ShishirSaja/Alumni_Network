// AlumniPanel.js
import React from 'react';
import NewRegistration from './NewRegistration';
import UpdateDetails from './UpdateDetails';

const AlumniPanel = () => {
    return (
        <div>
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Alumni Panel</h2>
        <div class="flex flex-row">
            
            <NewRegistration />
            <UpdateDetails />
        </div>
        </div>
    );
};

export default AlumniPanel;