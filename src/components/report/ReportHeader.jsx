import React, { useState } from 'react';
import AgentInfo from '../AgentInfo';
import { PhoneIcon, MailIcon, MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import CardBox from '../shared/CardBox'
const ReportHeader = ({ location, propertyType, timeRange, agent }) => {
    return (
        <div className="w-full">
            <div className="flex items-start justify-between gap-4">               
                {/* Right side - Agent Info */}
                {agent && (
                    <div className="flex-shrink-0">
                        <AgentInfo
                            photo={agent.photo}
                            firstName={agent.firstName}
                            lastName={agent.lastName}
                            brokerageName={agent.brokerageName}
                            displayPullDown={agent.displayPullDown}
                            phone={agent.phone}
                            emailAddress={agent.emailAddress}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportHeader;