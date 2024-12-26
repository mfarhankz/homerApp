import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CitySearch from './CitySearch';
import { baseDataAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Calendar, MapPin, Share2, Trash2, X } from 'lucide-react';
import ShareModal from './ShareModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import NotificationDialog from './NotificationDialog'



export default function MainContent({ isOpen }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const abortControllerRef = useRef(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('')

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

    const handleDelete = (e, reportId) => {
        e.stopPropagation(); // Prevent event bubbling
        setReportToDelete(reportId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await proceedWithDelete(reportToDelete);
            // await handleDelete(reportToDelete);
            setIsDeleteModalOpen(false);
            // setReportToDelete(null);
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    const proceedWithDelete = async (reportToDelete) => {
        try {
            abortControllerRef.current = new AbortController();
            const response = await baseDataAPI.deleteReportData(reportToDelete, abortControllerRef.current.signal);
            if (!response.success) {
                setNotificationMessage({ text: "Could not delete the report. try again later!", type: 'error' });
                setIsNotificationVisible(true);
            }

            const reportDeleteResponse = await response.data;

            if (reportDeleteResponse.count && reportDeleteResponse.count > 0) {
                setNotificationMessage({ text: "Report deleted successfully!", type: 'info' });
                setIsNotificationVisible(true);
                setReports(reportDeleteResponse.savedReports);
            }

        } catch (error) {
            console.error('Error deleting report:', error);
        } finally {
            abortControllerRef.current = null;
        }
    }

    const handleShare = (e, reportId) => {
        e.stopPropagation();
        const publicUrl = `${window.location.origin}/viewreport/${reportId}`;
        setShareUrl(publicUrl);
        setIsShareOpen(true);
    };

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setIsShareOpen(false);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) {
            return "Good morning";
        } else if (hour < 17) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-0 sm:px-4 mt-32 mt-11 ">
            <div className="w-full">
                <p className="greeting text-center ">{getGreeting()} {user?.displayName || 'REZA'}</p>
                <div className="content-center space-y-8 justify-center items-center">
                    <div className="start-report text-center flex flex-col">
                        <div className="flex-1 flex flex-col justify-center mb-6">
                            <p className="start-report-first-label">
                                Generate a neighbourhood report
                            </p>
                            <p className="start-report-second-label lg:mt-8">
                                Get instant market insights to share with your clients.
                            </p>
                        </div>
                        <div className="search-input-container max-w-4xl max-auto">
                            <CitySearch onSelect={handleCitySelect} onClicked={handleClick} />
                        </div>
                    </div>

                    {/* Reports Section */}
                    <div className="mt-16 px-4 sm:px-0">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4">My reports</h2>

                        {loading && (
                            <div className="text-center py-12">
                                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
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

                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                {reports.map((report) => (
                                    <div
                                        key={report.reportId}
                                        className="report-card  cursor-pointer"
                                    >
                                        <div
                                            className="flex items-center  pb-2 "
                                            onClick={() => navigate(`/report/${report.reportId}`)}
                                        >
                                            {/* Left side - Image with proper padding */}
                                            <div className="pl-0">
                                                <img
                                                    src={`/images/${report.propertyType}.avif`}
                                                    alt={`${report.propertyType} in ${report.city}`}
                                                    className="w-20 h-20 object-contain"
                                                />
                                            </div>

                                            {/* Right side - Content */}
                                            <div className="flex-1 mt-2 p-4 flex flex-col justify-between">
                                                <div>
                                                    <h2 className="text-homer-blue-2 text-sm">
                                                        {report.displayName || ''}
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h3 className="text-homer-blue text-sm">
                                                        {report.propertyType} in {report.city}
                                                    </h3>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Toolbar */}
                                        <div className="border-t flex justify-between items-center">
                                            <div className="text-homer-blue-9  px-2">
                                                {getTimeAgo(report.createdDate)}
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={(e) => handleShare(e, report.reportId)}
                                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                                    aria-label="Share report"
                                                >
                                                    <Share2 className="w-4 h-4 text-gray-600" color='#615E83' />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(e, report.reportId)}
                                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                                    aria-label="Delete report"
                                                >
                                                    <Trash2 className="w-4 h-4 text-gray-600" color='#EE6F6F' />
                                                </button>
                                            </div>
                                        </div>
                                        {/* Add the modal component */}
                                        <DeleteConfirmationModal
                                            isOpen={isDeleteModalOpen}
                                            onClose={() => {
                                                setIsDeleteModalOpen(false);
                                                setReportToDelete(null);
                                            }}
                                            onConfirm={handleConfirmDelete}
                                        />

                                        <NotificationDialog
                                            message={notificationMessage}
                                            isVisible={isNotificationVisible}
                                            onClose={() => setIsNotificationVisible(false)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Simple Modal */}
                            <ShareModal
                                isOpen={isShareOpen}
                                onClose={() => setIsShareOpen(false)}
                                url={shareUrl}
                                onCopy={handleCopyUrl}
                            />
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}