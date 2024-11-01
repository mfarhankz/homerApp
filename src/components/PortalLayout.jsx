import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, FileText, Settings, LogOut, Menu, X } from 'lucide-react';

export default function PortalLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/signin');
        } catch (error) {
            console.error('Failed to sign out:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className='absolute top-4 left-4'>
                <span className="text-homer-homer-34">homer</span>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsNavOpen(true)}
                className="fixed bottom-6 left-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                aria-label="Open navigation"
            >
                <Menu className="w-6 h-6 text-blue-900" />
            </button>

            {/* Overlay Background */}
            {isNavOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
                    onClick={() => setIsNavOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`
                fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 
                transform transition-transform duration-300 ease-in-out
                ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Close Button */}
                <button
                    onClick={() => setIsNavOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
                    aria-label="Close navigation"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Logo */}
                <div className="p-6 border-b">
                    <span className="text-blue-900 text-xl font-medium">homer</span>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 space-y-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'
                            }`
                        }
                        onClick={() => setIsNavOpen(false)}
                        end
                    >
                        <Home className="w-5 h-5 mr-3" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'
                            }`
                        }
                        onClick={() => setIsNavOpen(false)}
                    >
                        <FileText className="w-5 h-5 mr-3" />
                        <span>Reports</span>
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'
                            }`
                        }
                        onClick={() => setIsNavOpen(false)}
                    >
                        <Settings className="w-5 h-5 mr-3" />
                        <span>Settings</span>
                    </NavLink>
                </nav>

                {/* User Section */}
                <div className="absolute bottom-0 w-full p-4 border-t bg-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-900 font-medium">
                                    {user?.displayName?.[0] || 'U'}
                                </span>
                            </div>
                            <span className="ml-3 text-sm text-gray-700">{user?.displayName}</span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="w-full max-w-7xl mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
}