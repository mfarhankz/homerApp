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
        <div className="grid grid-cols-3 gap-4 mt-3 max-w-full">
            {/* Left side - Image */}
            <div className='col-span-1'>
                <div className="w-28 h-28 overflow-hidden">
                    {photo ? (
                        <img
                            src={photo}
                            alt={`${firstName} ${lastName}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-[rgb(223,88,74)] text-white flex items-center justify-center text-5xl">
                            {firstLetter}
                        </div>
                    )}
                </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full overflow-hidden col-span-2">
                {/* Name */}
                <h3 className="text-3xl text-white truncate">
                    {firstName} {lastName}
                </h3>

                {/* Brokerage Name */}
                <div className="text-xs md:text-sm text-white truncate font-light">
                    {brokerageName}
                </div>

                {/* Contact Info */}
                {(emailAddress || phone) && (
                    <div className="flex flex-col space-y-1 mt-2">
                        {emailAddress && (
                            <div className="grid grid-cols-[16px_1fr] gap-2 items-center">
                                <Mail className="text-white w-4 h-4 md:w-[18px] md:h-[18px]" />
                                <span className="text-sm md:text-base text-white truncate font-light">
                                    {emailAddress}
                                </span>
                            </div>
                        )}
                        {phone && (
                            <div className="grid grid-cols-[16px_1fr] gap-2 items-center">
                                <Phone className="text-white w-4 h-4 md:w-[18px] md:h-[18px]" />
                                <span className="text-sm md:text-base text-white truncate font-light">
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