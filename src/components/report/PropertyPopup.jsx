
import React, { useEffect, useState } from 'react';
import { X, TrendingUp, TrendingDown, BedIcon, BathIcon } from 'lucide-react';

const PropertyPopup = ({ property, currentPropertyIndex, currentImage, handleClose, markerPosition }) => { 
    const renderPrice = (property) => {
        const isSold = property.uiStatus === 'Sold';
        const hasClosePrice = property.soldPrice && property.listPrice !== property.soldPrice;

        if (isSold && hasClosePrice) {
            const soldHigher = property.soldPrice > property.listPrice;
            return (
                <div className="space-y-1">
                    <div className="text-sm font-bold text-gray-600 relative">
                        List:  <span className="relative">
                            <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-900 transform -rotate-180"></span>
                            ${property.formattedListPrice}
                        </span>
                    </div>
                    <div className="text-sm font-bold text-green-600 flex items-center gap-1">
                        <span>Sold: ${property.soldPrice.toLocaleString()}</span>
                        {soldHigher ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                    </div>

                </div>
            );
        }

        return (
            <div className="text-xl font-bold text-blue-600">
                ${property.formattedListPrice}
            </div>
        );
    };

    return (
        <div className="absolute w-96 lg:w-[32rem] bg-white shadow-lg rounded-xl transform 
                        transition-transform duration-300 ease-in-out z-30"
                        
            style={{
                // Position popup relative to marker
                left: '50%',
                transform: 'translateX(-50%)',
                top: '44px', // Fixed distance from top to match the line
                marginTop: '8px'
            }}>
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="p-2 border-b  flex justify-between items-center">
                    <h3 className="text-base font-bold text-gray-900">
                        Property Details - MLS®{property.listingKey}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close dialog">
                        <X className="w-3 h-3 text-gray-500" />
                    </button>
                </div>

                {/* Content with Image */}
                <div className="p-4 flex flex-row gap-4">
                    {/* Property Details */}
                    <div className="flex-1 space-y-3">
                        <div className="text-xl font-bold text-blue-600">
                            {renderPrice(property)}

                        </div>

                        <div className="flex text-center">
                            <span className="bg-gray-100 px-2 py-1 rounded text-sm  text-center">
                                <BedIcon />{property.bedroomsTotal} beds
                            </span>
                            <span className="bg-gray-100 px-2 py-1 rounded text-sm  text-center">
                                <BathIcon />{property.bathroomsTotalInteger} baths
                            </span>
                        </div>
                        <div className="text-gray-600 text-xs">
                            {property.address}
                        </div>
                        <div className="text-gray-600 text-xs">
                            {property.uiCity},
                            {property.province}
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                                {property.uiStatus}
                            </span>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex-1">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden">
                            <img
                                src={currentImage}
                                alt={`Property ${property.listingKey}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PropertyPopup;