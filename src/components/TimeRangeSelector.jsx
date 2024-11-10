import React from 'react';
import { motion } from 'framer-motion';

const TimeRangeSelector = ({ selectedRange, onRangeSelect }) => {
    const timeRanges = [
        { id: '30days', label: '30 days', value: 30 },
        { id: '6months', label: '6 months', value: 180, recommended: true },
        { id: '1year', label: '1 year', value: 365 }
    ];

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
                    <span className="text-gray-900">{range.label}</span>
                    {range.recommended && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 recommended-text">
                            Recommended
                        </span>
                    )}
                </button>
            ))}
        </motion.div>
    );
};


export default TimeRangeSelector;