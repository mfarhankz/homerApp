// components/report/Header.jsx
import React, { useState } from 'react';

import { PhoneIcon, MailIcon, MoreVertical } from "lucide-react";

const ReportHeader = ({ location, propertyType, timeRange, agent }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 p-4 sm:p-6 metric-card shadow rounded-lg">
            {/* Title Section */}
            <div>
                <h1 className="text-2xl font-semibold text-blue-900">{location}</h1>
                <p className="text-gray-600">
                    <b>{propertyType}</b> homes for sale over the past <b>{(timeRange / 30).toFixed()} months</b>
                </p>
            </div>

            {/* Agent Info Section */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-white">{agent.initials}</span>
                    </div>
                    <div className="text-sm">
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-gray-500">{agent.brokerage}</p>
                    </div>
                </div>

                {/* Dropdown Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        console.log('Call clicked');
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <PhoneIcon className="w-4 h-4 mr-2" />
                                    Call Agent
                                </button>
                                <button
                                    onClick={() => {
                                        console.log('Email clicked');
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <MailIcon className="w-4 h-4 mr-2" />
                                    Email Agent
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportHeader;