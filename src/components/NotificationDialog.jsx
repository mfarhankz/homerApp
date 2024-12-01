import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NotificationDialog = ({ message, isVisible, onClose }) => {
    const getNotificationStyle = (type) => {
        switch (type) {
            case 'info':
                return 'bg-[#0C1B3D]  text-white';
            case 'warning':
                return 'bg-[#F9E7D4]  text-white';
            case 'error':
                return 'bg-[#EE6F6F]  text-white';
            default:
                return 'bg-gray-50  text-gray-800';
        }
    };

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // Auto-close after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 w-80 z-50">
            <div className={`${getNotificationStyle(message.type || 'info')} p-4 rounded-lg shadow-lg border flex items-start justify-between`}>
                <p className="text-sm flex-1">{message.text}</p>
                <button
                    onClick={onClose}
                    className="ml-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default NotificationDialog;