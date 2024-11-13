// components/report/ListingsMap.jsx
import React from 'react';

const ListingsMap = () => {
    return (
        <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 bg-white">
            {/* Replace with actual Google Maps implementation */}
            <iframe
                src="https://www.google.com/maps/embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Google attribution */}
            <div className="absolute bottom-2 right-2 text-xs text-gray-600">
                Map data ©2024 Google
            </div>
        </div>
    );
};

export default ListingsMap;