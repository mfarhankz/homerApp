// components/report/ListingsMap.jsx
import Map, {
    Marker,
    Popup,
    NavigationControl,
} from 'react-map-gl';
import { useState, useEffect,useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const ListingsMap = ({ listings = [], isMapExpanded }) => {
    const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const mapRef = useRef(null);
    // Add this prop to receive the expanded state    
    const [viewState, setViewState] = useState({
        latitude: 43.8078,
        longitude: -79.2652,
        zoom: 13
    });

    const [selectedGroup, setSelectedGroup] = useState(null);

    // Group listings by coordinates
    const groupedListings = listings.reduce((acc, property) => {
        const key = `${property.location.coordinates.latitude},${property.location.coordinates.longitude}`;
        if (!acc[key]) {
            acc[key] = {
                coordinates: {
                    latitude: property.location.coordinates.latitude,
                    longitude: property.location.coordinates.longitude
                },
                properties: []
            };
        }
        acc[key].properties.push(property);
        return acc;
    }, {});

    useEffect(() => {
        // Wait for the transition to complete before resizing
        const timer = setTimeout(() => {
            if (mapRef.current) {
                mapRef.current.resize();
            }
        }, 300); // match this with your transition duration

        return () => clearTimeout(timer);
    }, [isMapExpanded]);

    return (
        
        <Map
            {...viewState}
            ref={mapRef}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        >
            <NavigationControl position="top-right" />

            {Object.values(groupedListings).map(group => (
                <Marker
                    key={`${group.coordinates.latitude}-${group.coordinates.longitude}`}
                    latitude={group.coordinates.latitude}
                    longitude={group.coordinates.longitude}
                    onClick={() => setSelectedGroup(group)}
                >
                    <div style={{
                        position: 'relative',
                        width: '60px',
                        height: '60px',
                    }}>
                        {/* Circle background */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: group.properties.length > 1 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                            border: `2px solid ${group.properties.length > 1 ? '#EF4444' : '#3B82F6'}`,
                        }} />

                        {/* Number/Price */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: group.properties.length > 1 ? '#EF4444' : '#3B82F6',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            {group.properties.length > 1
                                ? group.properties.length
                                : `$${group.properties[0].formattedListPrice}`
                            }
                        </div>
                    </div>
                </Marker>
            ))}

            {selectedGroup && (
                <Popup
                    latitude={selectedGroup.coordinates.latitude}
                    longitude={selectedGroup.coordinates.longitude}
                    onClose={() => setSelectedGroup(null)}
                    closeButton={true}
                    closeOnClick={false}
                    maxWidth="300px"
                >
                    <div style={{
                        padding: '16px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        width: '100%'
                    }}>
                        <h3 style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginBottom: '12px',
                            color: '#1a1a1a',
                            borderBottom: '2px solid #e5e7eb',
                            paddingBottom: '8px'
                        }}>
                            {selectedGroup.properties.length > 1
                                ? `${selectedGroup.properties.length} Properties Available`
                                : 'Property Details'
                            }
                        </h3>

                        {selectedGroup.properties.map(property => (
                            <div key={property.listingKey} style={{
                                marginBottom: '16px',
                                paddingBottom: '16px',
                                borderBottom: '1px solid #e5e7eb',
                                lastChild: { borderBottom: 'none' }
                            }}>
                                <div style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#2563eb',
                                    marginBottom: '8px'
                                }}>
                                    ${property.formattedListPrice}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '8px'
                                }}>
                                    <span style={{
                                        backgroundColor: '#f3f4f6',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}>
                                        {property.bedroomsTotal} beds
                                    </span>
                                    <span style={{
                                        backgroundColor: '#f3f4f6',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}>
                                        {property.bathroomsTotalInteger} baths
                                    </span>
                                </div>

                                <div style={{
                                    color: '#4b5563',
                                    fontSize: '14px',
                                    marginBottom: '4px'
                                }}>
                                    {property.uiCity}, {property.province}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '8px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{
                                        color: '#059669',
                                        backgroundColor: '#ecfdf5',
                                        padding: '2px 6px',
                                        borderRadius: '4px'
                                    }}>
                                        {property.uiStatus}
                                    </span>
                                    <span style={{ color: '#6b7280' }}>
                                        {property.postalCode}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Popup>
            )}
        </Map>
    );
};

export default ListingsMap;