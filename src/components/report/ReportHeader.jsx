// components/report/Header.jsx
import { PhoneIcon, MailIcon } from "lucide-react";

const ReportHeader = ({ location, propertyType, timeRange, agent }) => {
    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-2xl font-semibold text-blue-900">{location}</h1>
                <p className="text-gray-600">
                    {propertyType} homes for sale over the past {timeRange} months
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-white">{agent.initials}</span>
                    </div>
                    <div className="text-sm">
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-gray-500">{agent.brokerage}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <PhoneIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <MailIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportHeader;