// components/report/Header.jsx
import React, { useState } from 'react';
import AgentInfo from '../AgentInfo';

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
            {agent && <AgentInfo
                photo={agent.photo}
                firstName={agent.firstName}
                lastName={agent.lastName}
                brokerageName={agent.brokerageName}
                displayPullDown={agent.displayPullDown}
                phone={agent.phone}
                emailAddress={agent.emailAddress}
            />}
        </div>
    );
};

export default ReportHeader;