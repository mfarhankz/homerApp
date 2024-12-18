import React from 'react';
import { X, Mail, MessageSquare } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, url, onCopy }) => {
    if (!isOpen) return null;

    const handleEmailShare = () => {
        window.location.href = `mailto:?subject=Check out this report&body=${encodeURIComponent(url)}`;
    };

    const handleWhatsAppShare = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
    };

    const handleTextShare = () => {
        // For mobile devices, this will open the native SMS app
        window.location.href = `sms:?&body=${encodeURIComponent(url)}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Share Report</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex space-x-2 mb-6">
                    <input
                        type="text"
                        value={url}
                        readOnly
                        className="flex-1 p-2 border rounded bg-gray-50 text-sm"
                    />
                    <button
                        onClick={onCopy}
                        className="px-4 py-2 button-blue text-white rounded transition-colors"
                    >
                        Copy
                    </button>
                </div>

                <div className="flex justify-center space-x-6">
                    <button
                        onClick={handleEmailShare}
                        className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm">Email</span>
                    </button>

                    <button
                        onClick={handleWhatsAppShare}
                        className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </div>
                        <span className="text-sm">WhatsApp</span>
                    </button>

                    <button
                        onClick={handleTextShare}
                        className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm">Text</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;