import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Drawer component
const Drawer = ({ isOpen, onClose }) => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            {/* Add your drawer content here */}
            <nav>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">
                            <svg className="h-5 w-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span>Generate Report</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">
                            <svg className="h-5 w-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span>Clients</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">
                            <svg className="h-5 w-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
);

// Main LandingPage component
const LandingPage = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="relative w-full h-screen bg-gray-100 ">
            {/* Drawer toggle button */}
            <button
                onClick={toggleDrawer}
                className="absolute top-20 left-4 z-40 p-1 bg-white rounded-md shadow-md"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Drawer component */}
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Main content */}
            <div className="w-full h-full flex justify-center items-center p-6">
                <div className="w-full max-w-3xl text-center">
                    <h1 className="text-4xl font-bold mb-6">Welcome to the Landing Page</h1>
                    <p className="text-xl mb-4">This is the content of your landing page.</p>
                    {/* Add more content as needed */}
                </div>
            </div>

            {/* Overlay to close drawer when clicking outside */}
            {isDrawerOpen && (
                <div
                    className="absolute inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsDrawerOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default LandingPage;
