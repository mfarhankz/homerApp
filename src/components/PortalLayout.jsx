import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, FileText, Settings, LogOut, Menu, X, } from 'lucide-react';
import CityRegionSearch from './CityRegionSearch'

export default function PortalLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/signin');
        } catch (error) {
            console.error('Failed to sign out:', error);
        }
    };

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseEnter = () => {
        if (isDesktop) {
            setIsNavOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (isDesktop) {
            setIsNavOpen(false);
        }
    };


    return (
        <div className="min-h-screen">
            {/* Homer Text - Increased z-index to stay on top */}
            {isDesktop &&
                <div className='absolute top-4 left-4 z-50'>
                    <span className="text-homer-homer-34 cursor-pointer" onMouseEnter={handleMouseEnter}>homer</span>
                </div>
            }
            {/* Hover Area for Desktop */}
            <div
                className="fixed top-0 left-0 w-16 h-full z-20 lg:block hidden"
                onMouseEnter={handleMouseEnter}
            />
            {/* Toggle Button - Only visible on mobile */}
            {!isNavOpen && !isDesktop && (
                <button
                    onClick={() => setIsNavOpen(true)}
                    className="fixed top-[25px]  z-20 w-12 h-12 flex items-center justify-center    transition-colors lg:hidden"
                    aria-label="Open navigation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 32 32"><path d="M26 16a1 1 0 0 1-1 1H5a1 1 0 0 1 0-2h20a1 1 0 0 1 1 1ZM5 9h18a1 1 0 1 0 0-2H5a1 1 0 0 0 0 2Zm16 14H5a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2Z"></path></svg>
                </button>
            )}

            {/* Overlay Background - Only for mobile */}
            {isNavOpen && !isDesktop && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden"
                    onClick={() => setIsNavOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`fixed top-4 left-0 h-[calc(100%-2rem)] transition-all duration-300 ease-in-out 
                ${isNavOpen ?
                    'w-64 backdrop-blur bg-gradient-to-b from-[#F4D7B7]/70 to-[#F4D7B7]/80  shadow-lg rounded-r-2xl z-40' :
                    'w-10'
                }`} onMouseLeave={handleMouseLeave}>

                {/* Close Button*/}
                <button
                    onClick={(e) => {
                        e.preventDefault();  // Prevent default navigation
                        setIsNavOpen(false);
                    }}
                    className={`absolute top-3 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-opacity lg:hidden duration-300 ${isNavOpen ? 'opacity-100' : 'opacity-0'}`}
                    aria-label="Close navigation">
                    <X className="w-5 h-5 text-white" />
                </button>
                {isNavOpen && !isDesktop && (
                    <div className="p-6 pt-2 z-40">
                        <span className="text-homer-homer-34 cursor-pointer">homer</span>
                    </div>
                )}


                {/* Navigation Links */}
                <nav className={`p-6 space-y-2 lg:mt-12 transition-opacity duration-300 pointer-events-auto ${isNavOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <NavLink


                        to="/"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors   ${isActive ? 'nav-item text-grey-600' : 'nav-item-selected text-gray-600 hover:bg-gray-50/50'}`
                        }
                        onClick={() => setIsNavOpen(false)}
                        end
                    >
                        <Home className="w-5 h-5 mr-3" />
                        <span>Home</span>
                    </NavLink>
                </nav>

                {/* User Section */}
                <div className="absolute bottom-4 w-full">
                    {isNavOpen ? (
                        <div className="button-homer-signin rounded-full p-2 mx-2 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-900 font-medium">
                                        {user?.displayName?.[0] || 'U'}
                                    </span>
                                </div>
                                <span className="ml-3 text-sm text-white">
                                    {user?.displayName}
                                </span>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="p-2 text-white hover:text-white-100 rounded-lg"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (isDesktop && (
                        <div className="w-10 mx-auto px-1">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer">
                                <span className="text-blue-900 font-medium">
                                    {user?.displayName?.[0] || 'U'}
                                </span>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="w-full mx-auto">
                <Outlet />
            </main>
        </div>
    );
}