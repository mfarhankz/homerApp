import React from 'react';

const TimeRangeSlider = ({ value, onChange }) => (
    <div className="w-full max-w-xl mx-auto">
        <input
            type="range"
            min={7}
            max={365}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-4 py-1 bg-coral-500 text-white rounded-full">
                {value} days
            </div>
        </div>
    </div>
);

export default TimeRangeSlider;