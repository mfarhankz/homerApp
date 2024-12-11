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
                        className="p-1 bg-gray-200 rounded-full transition-colors"
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                    </button>
                    <h1 className="text-xl font-semibold text-blue-900">{location}</h1>
                    {/* Details Section */}
                    <div>
                        <p className="text-xl font-semibold text-blue">
                            <b>{propertyType}</b> homes for sale over the past <b>{(timeRange / 30).toFixed()} months</b>
                        </p>
                    </div>
                </div>

                {/* Always visible agent name */}
                {agent && !isExpanded && (
                    <div className="text-right">
                        <span className="text-lg font-semibold">
                            {agent.firstName} {agent.lastName}
                        </span>
                    </div>
                )}
            </div>

            {/* Collapsible Content */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-2">
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