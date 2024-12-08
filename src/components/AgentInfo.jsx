import React from 'react';
import { Mail, Phone } from 'lucide-react';

const AgentInfo = ({
    photo,
    firstName,
    lastName,
    emailAddress,
    brokerageName,
    phone
}) => {
    const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : '?';
    return (
        <div className="flex items-start gap-4 p-2 w-[300px]">
            {/* Left side - Image */}
            <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                    {photo ? (
                        <img
                            src={photo}
                            alt={`${firstName} ${lastName}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
                            {firstLetter}
                        </div>
                    )}
                </div>
            </div>

            {/* Right side - Content */}
            <div className="flex flex-col">
                {/* Name */}
                <h3 className="text-lg font-semibold">
                    {firstName} {lastName}
                </h3>
                <span className="text-xs font-semibold">{brokerageName}</span>

                {/* Contact Info */}
                <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center text-sm">
                        <Mail size={14} className="mr-2" />
                        <span className="text-xs ">{emailAddress}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Phone size={14} className="mr-2" />
                        <span className="text-xs ">{phone}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentInfo;