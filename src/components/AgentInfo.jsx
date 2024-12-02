import React, { useState } from 'react';
import { MoreVertical, Mail, Phone, UserCircle2 } from 'lucide-react';

const AgentInfo = ({ photo, firstName, lastName, brokerageName, emailAddress, displayPullDown = false }) => {
    const [showMenu, setShowMenu] = useState(displayPullDown);

    return (
        <div className="flex items-center p-3  rounded-lg  w-62">
            {/* Agent Photo */}
            <div className="w-12 h-12 mr-3">

                <img
                    src={photo || '/images/nophoto.png'}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full rounded-full object-cover"
                />

            </div>

            {/* Agent Details */}
            <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold truncate">
                    {firstName}, {lastName}
                </h3>
                <p className="text-sm  truncate">{brokerageName}</p>
            </div>

            {/* Dropdown Menu */}
            {displayPullDown &&
                <div className="relative ml-2">
                    <button
                        onClick={() => { if (!displayPullDown) return; setShowMenu(!showMenu) }}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                        <MoreVertical size={18} className="text-gray-600" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-10">
                            <ul className="py-1">
                                <li>
                                    <a
                                        href={`mailto:${emailAddress}`}
                                        className="w-full px-4 py-2 text-left text-sm flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        <Mail size={16} className="mr-2" />
                                        Email
                                    </a>
                                </li>
                                <li>
                                    <button
                                        className="w-full px-4 py-2 text-left text-sm flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        <Phone size={16} className="mr-2" />
                                        Call
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default AgentInfo;