import React from 'react';
import { motion } from 'framer-motion';
// Property type option component
const PropertyTypeOption = ({ type, icon, label, selected, onClick }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
            duration: 0.2,
            delay: 0.2,
            ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smooth motion
        }}
        onClick={onClick}
        className={`p-4 rounded-lg cursor-pointer transition-all w-full
      ${selected ? 'border-2 border-homer-propertytype-selected property-card' : 'border border-homer-propertytype-not-selected hover:border-coral-300 property-card'}
       flex flex-col items-center justify-between min-h-[160px]
    `}
    >
        <div className="flex flex-col items-center flex-1 justify-center w-full">
            <div className="w-[78px] h-[78px] flex items-center justify-center mb-3">
                <img
                    src={icon}
                    alt={label}
                    className="w-[78px] h-[78px] object-contain"
                />
            </div>
            <span className="text-homer-blue-600-12 text-center whitespace-nowrap">{label}</span>
        </div>
    </motion.div>
);

export default PropertyTypeOption;