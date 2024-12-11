import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { baseDataAPI } from '../services/api';
import LoadingScreen from '../components/LoadingScreen'

const TimeRangeSelector = ({ selectedRange, onRangeSelect, defaultValue, searchCriteria }) => {
    const [timeRanges, setTimeRanges] = useState([
        { id: 'count30Days', label: '30 days', value: 30, count: 0 },
        { id: 'count60Days', label: '60 days', value: 60, count: 0 },
        { id: 'count90Days', label: '90 days', value: 90, count: 0 },
        { id: 'count120Days', label: '120 days', value: 120, count: 0 },
        { id: 'count180Days', label: '6 months', value: 180, recommended: true, count: 0 },
        { id: 'count365Days', label: '1 year', value: 365, count: 0 }
    ]);
    const [loading, setLoading] = useState(true);
    const abortControllerRef = useRef(null);
    // Use the provided default value or find the recommended one
    useEffect(() => {
        const valueToUse = defaultValue || timeRanges.find(range => range.recommended)?.value;
        if (valueToUse && (!selectedRange || selectedRange === 30)) {
            onRangeSelect(valueToUse);
        }
    }, [defaultValue]);

    useEffect(() => {
        const getReportListingCount = async () => {
            try {
                setLoading(true);
                abortControllerRef.current = new AbortController();
                const countPayload = {
                    city: searchCriteria.city,
                    region: searchCriteria.cityRegion,
                    propertyType: searchCriteria.propertyType,
                    timeRange: searchCriteria.timeRange
                };


                var response = await baseDataAPI.getReportListingCount(countPayload, abortControllerRef.current.signal);
                if (!response.success) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseCount = await response.data;
                console.log(responseCount);
                // Update timeRanges with counts from response
                setTimeRanges(prevRanges =>
                    prevRanges.map(range => ({
                        ...range,
                        count: responseCount[range.id] || 0
                    }))
                );

            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Request was cancelled');
                } else {
                    console.error('Error generating report:', error);
                }
            } finally {
                abortControllerRef.current = null;
                setLoading(false);
            }
        };

        getReportListingCount();

    }, []);

    if (loading) {
        return (
            <LoadingScreen
                neighborhood='Loading...'
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.2,
                delay: 0.2,
                ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smooth motion
            }} className="space-y-3">
            {timeRanges.map((range) => (
                <button
                    key={range.id}
                    onClick={() => onRangeSelect(range.value)}
                    className={`
                        w-full px-4 py-3 rounded-lg border text-left relative
                        transition-all duration-200
                        ${selectedRange === range.value
                            ? 'date-range-item-selected'
                            : 'date-range-item-not-selected'
                        }
          `}
                >
                    <div className="flex justify-between items-center">
                        <span className="text-gray-900">{range.label}</span>
                        <div className="flex items-center gap-2">
                            {range.count > 0 && (
                                <span className={`text-sm ${selectedRange === range.value
                                    ? 'text-blue-600'
                                    : 'text-gray-500'
                                    }`}>
                                    {range.count} found
                                </span>
                            )}
                            {range.count === 0 && (
                                <span className={`text-sm ${selectedRange === range.value
                                    ? 'text-blue-600'
                                    : 'text-gray-500'
                                    }`}>
                                    Not found
                                </span>
                            )}
                            {range.recommended && (
                                <span className="text-sm text-blue-600 recommended-text">
                                    (Recommended)
                                </span>
                            )}
                        </div>
                    </div>
                </button>
            ))}
        </motion.div>
    );
};


export default TimeRangeSelector;