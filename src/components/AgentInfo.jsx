import React from 'react';
import { Mail, Phone } from 'lucide-react';

const AgentProfile = ({
    firstName,
    lastName,
    brokerageName,
    emailAddress,
    phone,
    photo,
    firstLetter
}) => {
    return (
        <div className="grid grid-cols-[64px_1fr] gap-2 p-2 max-w-full">
            {/* Left side - Image */}
            <div>
                <div className="w-16 h-16 rounded-full overflow-hidden">
                    {photo ? (
                        <img
                            src={photo}
                            alt={`${firstName} ${lastName}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-3xl font-semibold">
                            {firstLetter}
                        </div>
                    )}
                </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full overflow-hidden">
                {/* Name */}
                <h3 className="text-lg md:text-2xl font-semibold text-white truncate">
                    {firstName} {lastName}
                </h3>

                {/* Brokerage Name */}
                <div className="text-xs md:text-sm text-white truncate">
                    {brokerageName}
                </div>

                {/* Contact Info */}
                {(emailAddress || phone) && (
                    <div className="flex flex-col space-y-1 mt-2">
                        {emailAddress && (
                            <div className="grid grid-cols-[16px_1fr] gap-2 items-center">
                                <Mail className="text-white w-4 h-4 md:w-[18px] md:h-[18px]" />
                                <span className="text-sm md:text-base text-white truncate">
                                    {emailAddress}
                                </span>
                            </div>
                        )}
                        {phone && (
                            <div className="grid grid-cols-[16px_1fr] gap-2 items-center">
                                <Phone className="text-white w-4 h-4 md:w-[18px] md:h-[18px]" />
                                <span className="text-sm md:text-base text-white truncate">
                                    {phone}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentProfile;