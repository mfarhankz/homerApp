import React, { useState } from 'react';
import AgentInfo from '../AgentInfo';
import { PhoneIcon, MailIcon, MoreVertical, ChevronDown, ChevronUp } from "lucide-react";

const ReportHeader = ({ location, propertyType, timeRange, agent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="flex flex-col metric-card shadow rounded-lg p-2 sm:p-3">
            {/* Header with Toggle */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                    </button>
                    <h1 className="text-2xl font-semibold text-blue-900">{location}</h1>
                </div>

                {/* Always visible agent name */}
                {agent && (
                    <div className="text-right">
                        <span className="font-medium">
                            {agent.firstName} {agent.lastName}
                        </span>
                    </div>
                )}
            </div>

            {/* Collapsible Content */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mt-2">
                    {/* Details Section */}
                    <div>
                        <p className="text-gray-600">
                            <b>{propertyType}</b> homes for sale over the past <b>{(timeRange / 30).toFixed()} months</b>
                        </p>
                    </div>

                    {/* Full Agent Info Section */}
                    {agent && (
                        <AgentInfo
                            photo={agent.photo}
                            firstName={agent.firstName}
                            lastName={agent.lastName}
                            brokerageName={agent.brokerageName}
                            displayPullDown={agent.displayPullDown}
                            phone={agent.phone}
                            emailAddress={agent.emailAddress}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportHeader;