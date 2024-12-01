// ShareModal.jsx
import React from 'react';
import { X } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, url, onCopy }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Copy Report URL to Share it</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex space-x-2 mb-4">
                    <input
                        type="text"
                        value={url}
                        readOnly
                        className="flex-1 p-2 border rounded bg-gray-50 text-sm"
                    />
                    <button
                        onClick={onCopy}
                        className="px-4 py-2 button-blue text-white rounded  transition-colors"
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;