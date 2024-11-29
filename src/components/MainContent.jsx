import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CitySearch from './CitySearch';
import { baseDataAPI } from '../services/api';
import { Building2, Calendar, MapPin } from 'lucide-react';

export default function MainContent({ user, isOpen }) {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);
    useEffect(() => {
        const fetchReports = async () => {
            try {
                abortControllerRef.current = new AbortController();
                setLoading(true);
                const response = await baseDataAPI.getUserReports(abortControllerRef.current.signal);
                if (!response.success) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const reportResponse = await response.data;
                setReports(reportResponse);
                setError(null);
            } catch (err) {
                setError('Failed to load reports');
                console.error('Error fetching reports:', err);
            } finally {
                setLoading(false);
                abortControllerRef.current = null;
            }
        };

        fetchReports();
    }, []);

    const handleCitySelect = (city) => {
        console.log('Selected city:', city);
    };

    const handleClick = (city) => {
        const encodedLocation = encodeURIComponent(city);
        navigate(`/report/generate/${encodedLocation}`, {
            state: { location: city }
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTimeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInSeconds = Math.floor((now - past) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) return `${years} ${years === 1 ? 'year' : 'years'} ago`;
        if (months > 0) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        if (hours > 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        if (minutes > 0) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        return 'Just now';
    };


    return (
        <div className="w-full max-w-5xl mx-auto px-0 sm:px-4 mt-32">
            <div className="w-full">
                <div className="content-center space-y-8 justify-center items-center">
                    <div className="start-report text-center flex flex-col">
                        <div className="flex-1 flex flex-col justify-center mb-12">
                            <h1 className="start-report-first-label">
                                Generate a neighbourhood report
                            </h1>
                            <p className="start-report-second-label mt-2">
                                Get instant market insights to share with your clients.
                            </p>
                        </div>
                        <div className="transform -translate-y-4 px-4 sm:px-0">
                            <CitySearch onSelect={handleCitySelect} onClicked={handleClick} />
                        </div>
                    </div>

                    {/* Reports Section */}
                    <div className="mt-16 px-4 sm:px-0">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4">My reports</h2>

                        {loading && (
                            <div className="text-center py-8">
                                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500 text-center py-4">
                                {error}
                            </div>
                        )}

                        {!loading && !error && reports.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No reports were found!
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reports.map((report) => (
                                <div
                                    key={report.reportId}
                                    className="report-card rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                    onClick={() => navigate(`/report/${report.reportId}`)}
                                >
                                    <div className="flex h-24 items-center">
                                        {/* Left side - Image with proper padding */}
                                        <div className="pl-4">
                                            <img
                                                src={`/images/${report.propertyType}.png`}
                                                alt={`${report.propertyType} in ${report.city}`}
                                                className="w-[64px] h-[64px] object-contain"
                                            />
                                        </div>

                                        {/* Right side - Content */}
                                        <div className="flex-1 p-4 flex flex-col justify-between">
                                            <div>
                                                <h2 className="text-homer-blue-2 font-13">
                                                    {report.displayName || ''}
                                                </h2>
                                            </div>
                                            <div>
                                                <h3 className="text-homer-blue font-13">
                                                    {report.propertyType} in {report.city}
                                                </h3>
                                            </div>
                                            <div className="text-homer-blue-9">
                                                {getTimeAgo(report.createdDate)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}